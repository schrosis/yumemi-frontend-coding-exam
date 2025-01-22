import {
  type PopulationCompositionRepository,
  PrefectureId,
} from "@frontend-coding-exam/domain";
import { type Result, safeTry } from "neverthrow";
import { AppError } from "../error";

export class GetPopulationCompositionsUsecase {
  constructor(
    private readonly populationCompositionRepository: PopulationCompositionRepository,
  ) {}

  async execute(prefectureId: number): Promise<Result<OutputData, AppError>> {
    const findPopulationComposition =
      this.populationCompositionRepository.findByPrefectureId;

    return safeTry(async function* () {
      const id = yield* PrefectureId.of(prefectureId).mapErr(
        (e) => new AppError(e.message, { cause: e }),
      );

      return (await findPopulationComposition(id))
        .mapErr((e) => new AppError(e.message, { cause: e }))
        .map(
          (populationComposition): OutputData => ({
            prefectureId,
            compositions: populationComposition
              .get("compositions")
              .map((composition) => ({
                year: composition.get("year").getRaw(),
                totalPopulation: composition.get("totalPopulation").getRaw(),
                youngPopulation: composition.get("youngPopulation").getRaw(),
                workingAgePopulation: composition
                  .get("workingAgePopulation")
                  .getRaw(),
                olderPopulation: composition.get("olderPopulation").getRaw(),
              })),
          }),
        );
    });
  }
}

type OutputData = {
  prefectureId: number;
  compositions: {
    year: number;
    totalPopulation: number;
    youngPopulation: number;
    workingAgePopulation: number;
    olderPopulation: number;
  }[];
};
