import { ByGroupOrActor } from "@models/Common/ByGroupOrActor"
import * as t from "io-ts"
import { DateFromISOString } from "io-ts-types/lib/DateFromISOString"
import { BaseFrontmatter } from "./Frontmatter"

export const TRANSACTION_FRONTMATTER = t.literal('TransactionFrontmatter')

export const TransactionFrontmatter = t.strict(
  {
    ...BaseFrontmatter.type.props,
    type: TRANSACTION_FRONTMATTER,
    uuid: t.string,
    amount: t.number,
    by: ByGroupOrActor,
    to: ByGroupOrActor,
    sources: t.array(t.string),
    date: DateFromISOString,
    createdAt: DateFromISOString
  },
  TRANSACTION_FRONTMATTER.value
)

export type TransactionFrontmatter = t.TypeOf<typeof TransactionFrontmatter>