import { type Result, type ResultAsync, ok } from "neverthrow";
import { Aggregate, ValueObject } from "types-ddd";
import type { DomainError } from "./error";

export interface PrefectureRepository {
  all(): ResultAsync<Prefecture[], DomainError>;
}

type PrefectureProps = {
  prefectureId: PrefectureId;
  name: PrefectureName;
};

export class Prefecture extends Aggregate<PrefectureProps> {
  private constructor(props: PrefectureProps) {
    super(props);
  }

  static reconstruct(props: PrefectureProps): Result<Prefecture, DomainError> {
    return ok(new Prefecture(props));
  }
}

export class PrefectureId extends ValueObject<number> {
  private constructor(value: number) {
    super(value);
  }

  static of(value: number): Result<PrefectureId, DomainError> {
    return ok(new PrefectureId(value));
  }
}

export class PrefectureName extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  static of(value: string): Result<PrefectureName, DomainError> {
    return ok(new PrefectureName(value));
  }
}
