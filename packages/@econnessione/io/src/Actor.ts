import * as t from "io-ts"
import { optionFromNullable } from "io-ts-types/lib/optionFromNullable"
import { BaseFrontmatter } from "./Common/BaseFrontmatter"
import { Color } from "./Common/Color"
import { markdownRemark } from "./Common/Markdown"
import { ImageFileNode } from "./Image"

export const ACTOR_FRONTMATTER = t.literal('ActorFrontmatter');
export const ActorFrontmatter = t.strict(
  {
    ...BaseFrontmatter.type.props,
    type: ACTOR_FRONTMATTER,
    fullName: t.string,
    username: t.string,
    avatar: optionFromNullable(ImageFileNode),
    color: Color,
  },
  ACTOR_FRONTMATTER.value
)

export type ActorFrontmatter = t.TypeOf<typeof ActorFrontmatter>

export const ActorMD = markdownRemark(
  ActorFrontmatter,
  "ActorMD"
)

export type ActorMD = t.TypeOf<typeof ActorMD>