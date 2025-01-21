import { PrefectureId } from "@frontend-coding-exam/domain";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { api } from "../api";
import { PopulationCompositionApiRepository } from "./population-composition-repository";

describe("PopulationCompositionApiRepository", () => {
  let repository: PopulationCompositionApiRepository;

  beforeEach(() => {
    repository = new PopulationCompositionApiRepository(api);
  });

  test("都道府県IDで人口構成を取得できる", async () => {
    api.getApiv1populationcompositionperYear = vi.fn(async () => {
      return {
        message: null,
        result: {
          boundaryYear: 2020,
          data: [
            {
              label: "総人口",
              data: [
                { year: 2010, value: 5506419 },
                { year: 2015, value: 5381733 },
                { year: 2020, value: 5224614 },
              ],
            },
            {
              label: "年少人口",
              data: [
                { year: 2010, value: 1205692 },
                { year: 2015, value: 1358068 },
                { year: 2020, value: 1664023 },
              ],
            },
            {
              label: "生産年齢人口",
              data: [
                { year: 2010, value: 1358068 },
                { year: 2015, value: 1558387 },
                { year: 2020, value: 1664023 },
              ],
            },
            {
              label: "老年人口",
              data: [
                { year: 2010, value: 1358068 },
                { year: 2015, value: 1558387 },
                { year: 2020, value: 1664023 },
              ],
            },
          ],
        },
      };
    });

    const result = await repository.findByPrefectureId(
      PrefectureId.of(1)._unsafeUnwrap(),
    );

    expect(result.isOk()).toBe(true);
    const populationComposition = result._unsafeUnwrap();
    expect(populationComposition.get("prefectureId").getRaw()).toBe(1);
    expect(populationComposition.get("compositions").length).toBe(3);

    let composition = populationComposition.get("compositions")[0];
    expect(composition).toBeTruthy();
    expect(composition?.get("year").getRaw()).toBe(2010);
    expect(composition?.get("totalPopulation").getRaw()).toBe(5506419);
    expect(composition?.get("youngPopulation").getRaw()).toBe(1205692);
    expect(composition?.get("workingAgePopulation").getRaw()).toBe(1358068);
    expect(composition?.get("olderPopulation").getRaw()).toBe(1358068);

    composition = populationComposition.get("compositions")[1];
    expect(composition).toBeTruthy();
    expect(composition?.get("year").getRaw()).toBe(2015);
    expect(composition?.get("totalPopulation").getRaw()).toBe(5381733);
    expect(composition?.get("youngPopulation").getRaw()).toBe(1358068);
    expect(composition?.get("workingAgePopulation").getRaw()).toBe(1558387);
    expect(composition?.get("olderPopulation").getRaw()).toBe(1558387);

    composition = populationComposition.get("compositions")[2];
    expect(composition).toBeTruthy();
    expect(composition?.get("year").getRaw()).toBe(2020);
    expect(composition?.get("totalPopulation").getRaw()).toBe(5224614);
    expect(composition?.get("youngPopulation").getRaw()).toBe(1664023);
    expect(composition?.get("workingAgePopulation").getRaw()).toBe(1664023);
    expect(composition?.get("olderPopulation").getRaw()).toBe(1664023);
  });

  test("人口構成の取得に失敗した場合、エラーを返す", async () => {
    api.getApiv1populationcompositionperYear = vi.fn(async () => {
      return {
        message: "人口構成の取得に失敗しました。",
        result: {
          boundaryYear: 2020,
          data: [],
        },
      };
    });

    const result = await repository.findByPrefectureId(
      PrefectureId.of(1)._unsafeUnwrap(),
    );

    expect(result.isErr()).toBe(true);
    const error = result._unsafeUnwrapErr();
    expect(error.message).toBe("人口構成の取得に失敗しました。");
  });
});
