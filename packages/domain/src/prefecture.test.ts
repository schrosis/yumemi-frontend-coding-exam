import { describe, expect, test } from "vitest";
import { Prefecture, PrefectureId, PrefectureName } from "./prefecture";

describe("PrefectureId", () => {
  test("都道府県IDを作成できる", () => {
    const id = PrefectureId.of(13)._unsafeUnwrap();
    expect(id.getRaw()).toBe(13);
  });

  test.each([0, 48])(
    "都道府県IDが1から47の間でない場合はエラーを返す",
    (id) => {
      const result = PrefectureId.of(id);
      expect(result.isErr()).toBe(true);
    },
  );
});

describe("PrefectureName", () => {
  test("正しい値で名前を作成できる", () => {
    const name = PrefectureName.of("東京都")._unsafeUnwrap();
    expect(name.getRaw()).toBe("東京都");
  });

  test("空文字ではエラーを返す", () => {
    const result = PrefectureName.of("");
    expect(result.isErr()).toBe(true);
  });
});

describe("Prefecture", () => {
  describe("reconstruct", () => {
    test("正しいパラメータで都道府県を作成できる", () => {
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
