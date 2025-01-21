import {
  Composition,
  DomainError,
  Population,
  PopulationComposition,
  type PopulationCompositionRepository,
  type PrefectureId,
  Year,
} from "@frontend-coding-exam/domain";
import { Result, err, safeTry } from "neverthrow";
import type { ApiClient } from "../api";

export class PopulationCompositionApiRepository
  implements PopulationCompositionRepository
{
  constructor(private readonly apiClient: ApiClient) {}

  async findByPrefectureId(
    prefectureId: PrefectureId,
  ): Promise<Result<PopulationComposition, DomainError>> {
    const res = await this.apiClient.getApiv1populationcompositionperYear({
      queries: {
        prefCode: prefectureId.getRaw().toString(),
      },
    });

    if (typeof res.message === "string" && res.message.length > 0) {
      return err(new DomainError(res.message));
    }

    const totalPopulations = res.result.data.find((p) => p.label === "総人口");
    const youngPopulations = res.result.data.find(
      (p) => p.label === "年少人口",
    );
    const workingAgePopulations = res.result.data.find(
      (p) => p.label === "生産年齢人口",
    );
    const olderPopulations = res.result.data.find(
      (p) => p.label === "老年人口",
    );

    if (
      !totalPopulations ||
      !youngPopulations ||
      !workingAgePopulations ||
      !olderPopulations
    ) {
      return err(new DomainError("Population composition data is not found"));
    }

    const compositions = Result.combine(
      totalPopulations.data.map((totalPopulation) =>
        safeTry(function* () {
          const year = totalPopulation.year;
          const youngPopulation = youngPopulations.data.find(
            (p) => p.year === year,
          );
          const workingAgePopulation = workingAgePopulations.data.find(
            (p) => p.year === year,
          );
          const olderPopulation = olderPopulations.data.find(
            (p) => p.year === year,
          );

          if (!youngPopulation || !workingAgePopulation || !olderPopulation) {
            return err(
              new DomainError("Population composition data is not found"),
            );
          }

          return Composition.reconstruct({
            year: yield* Year.of(year),
            totalPopulation: yield* Population.of(totalPopulation.value),
            youngPopulation: yield* Population.of(youngPopulation.value),
            workingAgePopulation: yield* Population.of(
              workingAgePopulation.value,
            ),
            olderPopulation: yield* Population.of(olderPopulation.value),
          });
        }),
      ),
    );

    return compositions.andThen((compositions) =>
      PopulationComposition.reconstruct({
        prefectureId,
        compositions: compositions.sort(
          (a, b) => a.get("year").getRaw() - b.get("year").getRaw(),
        ),
      }),
    );
  }
}
