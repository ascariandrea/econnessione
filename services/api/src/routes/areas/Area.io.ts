import { io } from "@econnessione/shared";
import { ControllerError, DecodeError } from "@io/ControllerError";
import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";
import { AreaEntity } from "../../entities/Area.entity";

export const toAreaIO = (
  a: AreaEntity
): E.Either<ControllerError, io.http.Area.Area> => {
  return pipe(
    io.http.Area.Area.decode({
      ...a,
      createdAt: a.createdAt.toISOString(),
      updatedAt: a.updatedAt.toISOString(),
    }),
    E.mapLeft(DecodeError)
  );
};