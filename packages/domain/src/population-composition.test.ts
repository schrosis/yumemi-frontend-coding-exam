import { describe, expect, it } from "vitest";
import {
  Composition,
  Population,
  PopulationComposition,
  Year,
} from "./population-composition";
import { PrefectureId } from "./prefecture";

describe("PopulationComposition", () => {
  describe("reconstruct", () => {
    it("正しいPropsで再構築できる", () => {
      const prefectureId = PrefectureId.of(1)._unsafeUnwrap();
      const year = Year.of(2020)._unsafeUnwrap();
      const totalPopulation = Population.of(1000)._unsafeUnwrap();
      const youngPopulation = Population.of(200)._unsafeUnwrap();
      const workingAgePopulation = Population.of(500)._unsafeUnwrap();
      const olderPopulation = Population.of(300)._unsafeUnwrap();

      const composition = Composition.reconstruct({
        year,
        totalPopulation,
        youngPopulation,
        workingAgePopulation,
        olderPopulation,
      })._unsafeUnwrap();

      const result = PopulationComposition.reconstruct({
        prefectureId,
        compositions: [composition],
      });

      expect(result.isOk()).toBe(true);
    });
  });
});

describe("Composition", () => {
  describe("reconstruct", () => {
    it("正しいPropsで再構築できる", () => {
      const year = Year.of(2020)._unsafeUnwrap();
      const totalPopulation = Population.of(1000)._unsafeUnwrap();
      const youngPopulation = Population.of(200)._unsafeUnwrap();
      const workingAgePopulation = Population.of(500)._unsafeUnwrap();
      const olderPopulation = Population.of(300)._unsafeUnwrap();

      const result = Composition.reconstruct({
        year,
        totalPopulation,
        youngPopulation,
        workingAgePopulation,
        olderPopulation,
      });

      expect(result.isOk()).toBe(true);
    });
  });
});

describe("Population", () => {
  describe("of", () => {
    it("0以上の値で作成できる", () => {
      const result = Population.of(100);
      expect(result.isOk()).toBe(true);
    });

    it("0未満の値ではエラーになる", () => {
      const result = Population.of(-1);
      expect(result.isErr()).toBe(true);
      expect(result._unsafeUnwrapErr().message).toBe(
        "人口は0以上である必要があります",
      );
    });
  });
});

describe("Year", () => {
  describe("of", () => {
    it("数値で作成できる", () => {
      const result = Year.of(2020);
      expect(result.isOk()).toBe(true);
    });
  });
});
