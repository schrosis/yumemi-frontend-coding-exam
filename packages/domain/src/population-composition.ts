import { type Result, type ResultAsync, err, ok } from "neverthrow";
import { Aggregate, Entity, ValueObject } from "types-ddd";
import { DomainError } from "./error";
import type { PrefectureId } from "./prefecture";

export interface PopulationCompositionRepository {
  findByPrefectureId(
    prefectureId: PrefectureId,
  ): ResultAsync<PopulationComposition | null, DomainError>;
}

type PopulationCompositionProps = {
  prefectureId: PrefectureId;
  compositions: Composition[];
};

export class PopulationComposition extends Aggregate<PopulationCompositionProps> {
  private constructor(props: PopulationCompositionProps) {
    super(props);
  }

  static reconstruct(
    props: PopulationCompositionProps,
  ): Result<PopulationComposition, DomainError> {
    return ok(new PopulationComposition(props));
  }
}

type CompositionProps = {
  year: Year;
  totalPopulation: Population;
  youngPopulation: Population;
  workingAgePopulation: Population;
  olderPopulation: Population;
};

export class Composition extends Entity<CompositionProps> {
  private constructor(props: CompositionProps) {
    super(props);
  }

  static reconstruct(
    props: CompositionProps,
  ): Result<Composition, DomainError> {
    return ok(new Composition(props));
  }
}

export class Year extends ValueObject<number> {
  private constructor(value: number) {
    super(value);
  }

  static of(value: number): Result<Year, DomainError> {
    return ok(new Year(value));
  }
}

export class Population extends ValueObject<number> {
  private constructor(value: number) {
    super(value);
  }

  static of(value: number): Result<Population, DomainError> {
    if (value < 0) {
      return err(new DomainError("人口は0以上である必要があります"));
    }

    return ok(new Population(value));
  }
}
