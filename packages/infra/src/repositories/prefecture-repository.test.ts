import { beforeEach, describe, expect, test, vi } from "vitest";
import { api } from "../api";
import { PrefectureApiRepository } from "./prefecture-repository";

describe("PrefectureResasApiRepository", () => {
  let repository: PrefectureApiRepository;

  beforeEach(() => {
    repository = new PrefectureApiRepository(api);
  });
  test("都道府県の一覧を取得できる", async () => {
    api.getApiv1prefectures = vi.fn(async () => {
      return {
        result: [
          { prefCode: 1, prefName: "北海道" },
          { prefCode: 2, prefName: "青森県" },
        ],
      };
    });

    const result = await repository.all();

    expect(result.isOk()).toBe(true);
    const prefectures = result._unsafeUnwrap();
    expect(prefectures.length).toBe(2);
    expect(prefectures[0]?.get("prefectureId")?.getRaw()).toBe(1);
    expect(prefectures[0]?.get("name")?.getRaw()).toBe("北海道");
    expect(prefectures[1]?.get("prefectureId")?.getRaw()).toBe(2);
    expect(prefectures[1]?.get("name")?.getRaw()).toBe("青森県");
  });

  test("都道府県の取得に失敗した場合、エラーを返す", async () => {
    api.getApiv1prefectures = vi.fn(async () => {
      return {
        message: "都道府県の取得に失敗しました。",
        result: [],
      };
    });

    const result = await repository.all();

    expect(result.isErr()).toBe(true);
    const error = result._unsafeUnwrapErr();
    expect(error.message).toBe("都道府県の取得に失敗しました。");
  });
});
