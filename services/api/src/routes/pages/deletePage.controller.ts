import { Endpoints, AddEndpoint } from "@econnessione/shared/endpoints";
import { NotFoundError } from "@io/ControllerError";
import { Router } from "express";
import * as TE from "fp-ts/lib/TaskEither";
import { pipe } from "fp-ts/lib/pipeable";
import { RouteContext } from "routes/route.types";
import { PageEntity } from "../../entities/Page.entity";

export const MakeDeletePageRoute = (r: Router, ctx: RouteContext): void => {
  AddEndpoint(r)(Endpoints.Page.Delete, ({ params: { id } }) => {
    return pipe(
      ctx.db.findOne(PageEntity, { where: { id } }),
      TE.chain(TE.fromOption(() => NotFoundError("Page"))),
      TE.chainFirst(() => ctx.db.delete(PageEntity, id)),
      TE.map((page) => ({
        body: {
          data: page,
        },
        statusCode: 200,
      }))
    );
  });
};
