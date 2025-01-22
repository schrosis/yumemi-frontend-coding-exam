import type { PrefectureRepository } from "@frontend-coding-exam/domain";
import type { Result } from "neverthrow";
import { AppError } from "../error";

export class GetPrefectureUsecase {
  constructor(private readonly prefectureRepository: PrefectureRepository) {}

  async execute(): Promise<Result<OutputData, AppError>> {
    return (await this.prefectureRepository.all())
      .mapErr((e) => new AppError(e.message, { cause: e }))
      .map(
        (prefectures): OutputData =>
          prefectures.map((prefecture) => ({
            prefectureId: prefecture.get("prefectureId").getRaw(),
            name: prefecture.get("name").getRaw(),
          })),
      );
  }
}

export type OutputData = {
  prefectureId: number;
  name: string;
}[];
