import { endpoints, utils } from "@econnessione/shared";
import { sequenceS } from "fp-ts/lib/Apply";
import * as A from "fp-ts/lib/Array";
import * as E from "fp-ts/lib/Either";
import * as TE from "fp-ts/lib/TaskEither";
import { pipe } from "fp-ts/lib/pipeable";
import { Route } from "routes/route.types";
import { AddEndpoint } from "ts-endpoint-express";
import { ArticleEntity } from "./article.entity";
import { toArticleIO } from "./article.io";

export const MakeListArticlesRoute: Route = (r, { env, db }) => {
  AddEndpoint(r)(endpoints.Article.ListArticles, ({ query }) => {
    // console.log('here')
    return pipe(
      sequenceS(TE.taskEither)({
        data: pipe(
          db.find(ArticleEntity, {
            ...utils.getORMOptions(query, env.DEFAULT_PAGE_SIZE),
          }),
          TE.chainEitherK(A.traverse(E.either)(toArticleIO))
        ),
        total: db.count(ArticleEntity),
      }),
      TE.map(({ data, total }) => ({
        body: {
          data,
          total,
        },
        statusCode: 200,
      }))
    );
  });
};
