export class Left<L> {
  constructor(public readonly value: L) {}

  isLeft(): this is Left<L> {
    return true;
  }

  isRight(): this is Right<never> {
    return false;
  }
}

export class Right<R> {
  constructor(public readonly value: R) {}

  isLeft(): this is Left<never> {
    return false;
  }

  isRight(): this is Right<R> {
    return true;
  }
}

export type Either<L, R> = Left<L> | Right<R>;

export const left = <L>(value: L): Either<L, never> => new Left(value);

export const right = <R>(value: R): Either<never, R> => new Right(value);

export const tryCatch = async <L, R>(fn: () => Promise<R>): Promise<Either<L, R>> => {
  try {
    const result = await fn();
    return right(result);
  } catch (error) {
    return left(error as L);
  }
};
