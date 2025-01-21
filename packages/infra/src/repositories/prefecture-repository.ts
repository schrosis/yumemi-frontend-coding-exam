import {
  DomainError,
  Prefecture,
  PrefectureId,
  PrefectureName,
  type PrefectureRepository,
} from "@frontend-coding-exam/domain";
import { Result, err, safeTry } from "neverthrow";
import type { ApiClient } from "../api";

export class PrefectureApiRepository implements PrefectureRepository {
  constructor(private readonly apiClient: ApiClient) {}

  async all(): Promise<Result<Prefecture[], DomainError>> {
    const res = await this.apiClient.getApiv1prefectures();

    if (typeof res.message === "string" && res.message.length > 0) {
      return err(new DomainError(res.message));
    }

    const prefectures = Result.combine(
      res.result.map((pref) =>
        safeTry(function* () {
          return Prefecture.reconstruct({
            prefectureId: yield* PrefectureId.of(pref.prefCode),
            name: yield* PrefectureName.of(pref.prefName),
          });
        }),
      ),
    );

    return prefectures;
  }
}
