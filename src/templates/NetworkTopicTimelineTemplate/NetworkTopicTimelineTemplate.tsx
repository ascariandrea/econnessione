import EventList from "@components/EventList/EventList"
import Layout from "@components/Layout"
import SEO from "@components/SEO"
import TimelineNavigator from "@components/TimelineNavigator/TimelineNavigator"
import { ActorPageContentFileNode } from "@models/actor"
import { EventFileNode, EventData } from "@models/event"
import { ImageFileNode } from "@models/image"
import { NetworkPageContentFileNode } from "@models/networks"
import renderMarkdownAST from "@utils//renderMarkdownAST"
import { FlexGrid, FlexGridItem } from "baseui/flex-grid"
import { Theme } from "baseui/theme"
import { HeadingXLarge } from "baseui/typography"
import * as E from "fp-ts/lib/Either"
import * as O from "fp-ts/lib/Option"
import { pipe } from "fp-ts/lib/pipeable"
import { graphql, navigate } from "gatsby"
import * as t from "io-ts"
import { ThrowReporter } from "io-ts/lib/ThrowReporter"
import React from "react"

interface NetworkTopicTimelineTemplatePageProps {
  // `data` prop will be injected by the GraphQL query below.
  data: {
    pageContent: NetworkPageContentFileNode
    actors: {
      nodes: ActorPageContentFileNode[]
    }
    events: {
      nodes: EventFileNode[]
    }
    images: {
      nodes: ImageFileNode[]
    }
  }
}

export const NetworkTopicTimelineTemplate: React.FunctionComponent<NetworkTopicTimelineTemplatePageProps> = ({
  data,
}) => {
  const {
    pageContent: {
      childMarkdownRemark: { frontmatter, htmlAst },
    },
    actors,
    events,
  } = data

  return pipe(
    t.array(EventFileNode).decode(events.nodes),
    E.map(nodes =>
      t.array(EventData).encode(
        nodes.map(n => {
          const eventDataNode: EventData = {
            id: n.childMarkdownRemark.id,
            frontmatter: {
              ...n.childMarkdownRemark.frontmatter,
              links: O.fromNullable(n.childMarkdownRemark.frontmatter.links),
              cover: n.childMarkdownRemark.frontmatter.cover,
              actors: pipe(
                O.fromNullable(n.childMarkdownRemark.frontmatter.actors),
                O.map(actorIds =>
                  actors.nodes.reduce<ActorPageContentFileNode[]>((acc, n) => {
                    const actor = actorIds.includes(
                      n.childMarkdownRemark.frontmatter.username
                    )
                    return actor ? acc.concat(acc) : acc
                  }, [])
                )
              ),
              type: O.fromNullable(n.childMarkdownRemark.frontmatter.type),
            },
            fill: "#fff",
            topicLabel: "",
            topicSlug: "",
            topicFill: "#fff",
            htmlAst: n.childMarkdownRemark.htmlAst,
          }

          return eventDataNode
        })
      )
    ),
    E.fold(
      errs => {
        // eslint-disable-next-line no-console
        console.log(ThrowReporter.report(E.left(errs)))
        return null
      },
      events => {
        return (
          <Layout>
            <SEO title={frontmatter.title} />
            <FlexGrid flexGridColumnCount={3}>
              <FlexGridItem>
                <TimelineNavigator
                  events={events}
                  onEventClick={async e => {
                    await navigate(`${window.location.href}?#${e.id}`)
                  }}
                />
              </FlexGridItem>
              <FlexGridItem
                overrides={{
                  Block: {
                    style: ({ $theme }: { $theme: Theme }) => ({
                      width: `calc((200% - ${$theme.sizing.scale800}) / 3)`,
                    }),
                  },
                }}
              >
                <HeadingXLarge>{frontmatter.title}</HeadingXLarge>
                {renderMarkdownAST(htmlAst)}
                <EventList events={events} />
              </FlexGridItem>
              <FlexGridItem display="none" />
            </FlexGrid>
          </Layout>
        )
      }
    )
  )
}

export const pageQuery = graphql`
  query NetworkTopicTimelineTemplatePage(
    $relativeDirectory: String!
    $imagesRelativeDirectoryPath: String!
  ) {
    pageContent: file(
      relativeDirectory: { eq: $relativeDirectory }
      name: { eq: "index" }
    ) {
      childMarkdownRemark {
        frontmatter {
          title
          path
          date
          icon
          cover
          type
        }
        htmlAst
      }
    }
    actors: allFile(
      filter: {
        relativeDirectory: { glob: "events/actors/*" }
        name: { eq: "index" }
      }
    ) {
      nodes {
        id
        relativeDirectory
        childMarkdownRemark {
          frontmatter {
            title
            cover
            avatar
            username
          }
          htmlAst
        }
      }
    }

    events: allFile(
      filter: {
        relativeDirectory: { eq: $relativeDirectory }
        name: { ne: "index" }
      }
      sort: { order: DESC, fields: [childMarkdownRemark___frontmatter___date] }
    ) {
      nodes {
        relativeDirectory
        childMarkdownRemark {
          id
          frontmatter {
            title
            icon
            type
            date
            cover
            actors
            links
          }
          htmlAst
        }
      }
    }
    images: allFile(
      filter: { relativeDirectory: { eq: $imagesRelativeDirectoryPath } }
    ) {
      nodes {
        childImageSharp {
          fixed {
            src
          }
        }
        relativeDirectory
        relativePath
      }
    }
  }
`
export default NetworkTopicTimelineTemplate
