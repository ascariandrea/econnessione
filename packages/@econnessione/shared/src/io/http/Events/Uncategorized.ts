import * as t from "io-ts";
import { nonEmptyArray } from "io-ts-types";
import { DateFromISOString } from "io-ts-types/lib/DateFromISOString";
import { optionFromNullable } from "io-ts-types/lib/optionFromNullable";
import { nonEmptyRecordFromType } from "../../Common/NonEmptyRecord";
import { BaseFrontmatter, JSONFromString, Point } from "../Common";
import { markdownRemark } from "../Common/Markdown";
import { ImageSource } from "../Image";
import { EventLink } from "./EventLink";

export const CreateEventBody = t.strict(
  {
    title: t.string,
    images: optionFromNullable(
      nonEmptyArray(
        t.strict({
          location: t.string,
          description: t.string,
        })
      )
    ),
    startDate: DateFromISOString,
    endDate: optionFromNullable(DateFromISOString),
    body: t.string,
  },
  "CreateEventBody"
);

export const EditEventBody = nonEmptyRecordFromType({
  title: optionFromNullable(t.string),
  images: optionFromNullable(
    t.array(
      t.strict({
        location: t.string,
        description: t.string,
      })
    )
  ),
  links: optionFromNullable(
    t.array(
      t.strict({
        url: t.string,
        description: t.string,
      })
    )
  ),
  startDate: optionFromNullable(DateFromISOString),
  endDate: optionFromNullable(DateFromISOString),
  body: optionFromNullable(t.string),
});

export const UNCATEGORIZED = t.literal("Uncategorized");
export const UncategorizedFrontmatter = t.strict(
  {
    ...BaseFrontmatter.type.props,
    type: UNCATEGORIZED,
    title: t.string,
    startDate: t.string,
    endDate: t.union([t.string, t.undefined]),
    date: DateFromISOString,
    location: t.union([t.undefined, JSONFromString.pipe(Point)]),
    images: t.array(ImageSource),
    links: t.array(EventLink),
    // todo: remove
    actors: t.array(t.string),
    groups: t.array(t.string),
    topics: t.array(t.string),
  },
  UNCATEGORIZED.value
);

export type UncategorizedFrontmatter = t.TypeOf<
  typeof UncategorizedFrontmatter
>;
export const Uncategorized = t.strict(
  {
    ...UncategorizedFrontmatter.type.props,
    body: t.string,
  },
  "Uncategorized"
);
export type Uncategorized = t.TypeOf<typeof Uncategorized>;

export const UncategorizedMD = markdownRemark(
  UncategorizedFrontmatter,
  "UncategorizedMD"
);
export type UncategorizedMD = t.TypeOf<typeof UncategorizedMD>;
