import {
  Prefecture,
  PrefectureId,
  PrefectureName,
  type PrefectureRepository,
} from "@frontend-coding-exam/domain";
import { type Result, ok } from "neverthrow";
import { describe, expect, test } from "vitest";
import { GetPrefectureUsecase } from "./GetPrefectureUsecase";

class MockPrefectureRepository implements PrefectureRepository {
  async all(): Promise<Result<Prefecture[], Error>> {
    return ok([
      Prefecture.reconstruct({
        prefectureId: PrefectureId.of(1)._unsafeUnwrap(),
        name: PrefectureName.of("Tokyo")._unsafeUnwrap(),
      })._unsafeUnwrap(),
      Prefecture.reconstruct({
        prefectureId: PrefectureId.of(2)._unsafeUnwrap(),
        name: PrefectureName.of("Osaka")._unsafeUnwrap(),
      })._unsafeUnwrap(),
    ]);
  }
}

describe("GetPrefectureUsecase", () => {
  test("都道府県一覧を取得できる", async () => {
    const prefectureRepository = new MockPrefectureRepository();
    const usecase = new GetPrefectureUsecase(prefectureRepository);

    const result = await usecase.execute();

    expect(result.isOk()).toBe(true);
    expect(result._unsafeUnwrap()).toEqual([
      { prefectureId: 1, name: "Tokyo" },
      { prefectureId: 2, name: "Osaka" },
    ]);
  });
});
