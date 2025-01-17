import { describe, expect, it } from "vitest";
import { Prefecture, PrefectureId, PrefectureName } from "./prefecture";

describe("PrefectureId", () => {
  it("正しい値でIDを作成できる", () => {
    const id = PrefectureId.of(13)._unsafeUnwrap();
    expect(id.getRaw()).toBe(13);
  });
});

describe("PrefectureName", () => {
  it("正しい値で名前を作成できる", () => {
    const name = PrefectureName.of("東京都")._unsafeUnwrap();
    expect(name.getRaw()).toBe("東京都");
  });
});

describe("Prefecture", () => {
  describe("reconstruct", () => {
    it("正しいパラメータで都道府県を作成できる", () => {
      const prefectureId = PrefectureId.of(13)._unsafeUnwrap();
      const prefectureName = PrefectureName.of("東京都")._unsafeUnwrap();

      const prefecture = Prefecture.reconstruct({
        prefectureId,
        name: prefectureName,
      })._unsafeUnwrap();

      expect(prefecture.get("prefectureId").getRaw()).toBe(13);
      expect(prefecture.get("name").getRaw()).toBe("東京都");
    });
  });
});
