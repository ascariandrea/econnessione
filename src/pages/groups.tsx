import { Layout } from "@components/Layout"
import { MainContent } from "@components/MainContent"
import { PageContent } from "@components/PageContent"
import SEO from "@components/SEO"
import SearchableInput from "@components/SearchableInput"
import { GroupListItem } from "@components/lists/GroupList"
import { GroupFrontmatter } from "@models/group"
import { PageContentFileNode } from "@models/page"
import { navigateTo } from "@utils/links"
import { throwValidationErrors } from "@utils/throwValidationErrors"
import { sequenceS } from "fp-ts/lib/Apply"
import * as E from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/pipeable"
import { useStaticQuery, graphql, PageProps } from "gatsby"
import * as t from "io-ts"
import React from "react"

interface Results {
  groups: { nodes: unknown[] }
  pageContent: PageContentFileNode
}

const GroupsPage: React.FC<PageProps> = ({ navigate }) => {
  const results = useStaticQuery<Results>(graphql`
    query GroupsPage {
      groups: allGroupFrontmatter {
        nodes {
          ...Group
        }
      }

      pageContent: file(
        childMdx: { fields: { collection: { eq: "pages" } } }
        name: { eq: "groups" }
      ) {
        ...PageFileNode
      }
    }
  `)

  return pipe(
    sequenceS(E.either)({
      groups: t.array(GroupFrontmatter).decode(results.groups.nodes),
      pageContent: PageContentFileNode.decode(results.pageContent),
    }),
    E.fold(throwValidationErrors, ({ groups, pageContent }) => {
      return (
        <Layout>
          <SEO title={pageContent.childMdx.frontmatter.title} />
          <MainContent>
            <PageContent {...pageContent.childMdx} />
            <SearchableInput
              items={groups.map((a) => ({
                ...a,
                selected: true,
              }))}
              selectedItems={[]}
              getValue={(g) => g.name}
              onSelectItem={async (item) => {
                await navigateTo(navigate, "groups", item)
              }}
              onUnselectItem={() => {}}
              itemRenderer={(item, props, index) => (
                <GroupListItem
                  item={item}
                  index={index}
                  avatarScale="scale1600"
                  onClick={async (item) => {
                    await navigateTo(navigate, "groups", item)
                  }}
                />
              )}
            />
          </MainContent>
        </Layout>
      )
    })
  )
}

export default GroupsPage
