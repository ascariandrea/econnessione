import * as t from "io-ts";
import { DateFromISOString } from "io-ts-types/lib/DateFromISOString";
import { nonEmptyArray } from "io-ts-types/lib/nonEmptyArray";
import { BaseFrontmatter } from "../Common/BaseFrontmatter";
import { ByGroupOrActor } from "../Common/ByGroupOrActor";

export const STUDY_PUBLISHED = "StudyPublished";

export const StudyPublished = t.strict(
  {
    ...BaseFrontmatter.type.props,
    title: t.string,
    date: DateFromISOString,
    type: t.literal(STUDY_PUBLISHED),
    from: nonEmptyArray(ByGroupOrActor),
    source: t.string,
  },
  STUDY_PUBLISHED
);

export type StudyPublished = t.TypeOf<typeof StudyPublished>;
