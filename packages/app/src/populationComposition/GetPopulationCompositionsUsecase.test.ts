import {
  Composition,
  type DomainError,
  Population,
  PopulationComposition,
  type PopulationCompositionRepository,
  type PrefectureId,
  Year,
} from "@frontend-coding-exam/domain";
import { type Result, safeTry } from "neverthrow";
import { describe, expect, test } from "vitest";
import { GetPopulationCompositionsUsecase } from "./GetPopulationCompositionsUsecase";

class MockPopulationCompositionRepository
  implements PopulationCompositionRepository
{
  async findByPrefectureId(
    prefectureId: PrefectureId,
  ): Promise<Result<PopulationComposition, DomainError>> {
    // モックデータを返す
    return safeTry(function* () {
      return PopulationComposition.reconstruct({
        prefectureId,
        compositions: [
          yield* Composition.reconstruct({
            year: yield* Year.of(2020),
            totalPopulation: yield* Population.of(100000),
            youngPopulation: yield* Population.of(20000),
            workingAgePopulation: yield* Population.of(60000),
            olderPopulation: yield* Population.of(20000),
          }),
          yield* Composition.reconstruct({
            year: yield* Year.of(2021),
            totalPopulation: yield* Population.of(99000),
            youngPopulation: yield* Population.of(19000),
            workingAgePopulation: yield* Population.of(59000),
            olderPopulation: yield* Population.of(21000),
          }),
        ],
      });
    });
  }
}

describe("GetPopulationCompositionsUsecase", () => {
  test("都道府県の人口構成を取得できる", async () => {
    const populationCompositionRepository =
      new MockPopulationCompositionRepository();
    const usecase = new GetPopulationCompositionsUsecase(
      populationCompositionRepository,
    );

    const result = await usecase.execute(1); // 1は都道府県IDの例

    expect(result.isOk()).toBe(true);
    expect(result._unsafeUnwrap()).toEqual({
      prefectureId: 1,
      compositions: [
        {
          year: 2020,
          totalPopulation: 100000,
          youngPopulation: 20000,
          workingAgePopulation: 60000,
          olderPopulation: 20000,
        },
        {
          year: 2021,
          totalPopulation: 99000,
          youngPopulation: 19000,
          workingAgePopulation: 59000,
          olderPopulation: 21000,
        },
      ],
    });
  });
});
