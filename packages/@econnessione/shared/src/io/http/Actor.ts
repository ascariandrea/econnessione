import * as t from "io-ts";
import { BaseFrontmatter } from "./Common/BaseFrontmatter";
import { Color } from "./Common/Color";
import { markdownRemark } from "./Common/Markdown";

export const ACTOR_FRONTMATTER = t.literal("ActorFrontmatter");
export const ActorFrontmatter = t.strict(
  {
    ...BaseFrontmatter.type.props,
    fullName: t.string,
    username: t.string,
    avatar: t.union([t.undefined, t.string]),
    color: Color,
  },
  ACTOR_FRONTMATTER.value
);

export type ActorFrontmatter = t.TypeOf<typeof ActorFrontmatter>;

export const Actor = t.strict(
  {
    ...ActorFrontmatter.type.props,
    avatar: t.union([t.undefined, t.string]),
    body: t.string,
  },
  "Actor"
);

export type Actor = t.TypeOf<typeof Actor>;

export const ActorMD = markdownRemark(ActorFrontmatter, "ActorMD");

export type ActorMD = t.TypeOf<typeof ActorMD>;
