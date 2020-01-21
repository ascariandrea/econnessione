/**
 * @TODO
 * - add related topic to events
 */

import * as t from "io-ts"
import React from "react"
import { graphql } from "gatsby"
import "./actorTimelineTemplate.scss"
import Layout from "../../components/Layout"
import SEO from "../../components/SEO"
import { Columns, Image } from "react-bulma-components"
import { pipe } from "fp-ts/lib/pipeable"
import { ThrowReporter } from "io-ts/lib/ThrowReporter"
import * as E from "fp-ts/lib/Either"
import * as A from "fp-ts/lib/Array"
import * as Eq from "fp-ts/lib/Eq"
import TimelineNavigator from "../../components/TimelineNavigator/TimelineNavigator"
import { EventFileNode } from "../../types/event"
import { ImageFileNode } from "../../types/image"
import { ordEventFileNodeDate } from "../../utils/event"
import * as Ord from "fp-ts/lib/Ord"
import { ActorPageContentFileNode } from "../../types/actor"
import EventList from "../../components/EventList/EventList"

interface ActorTimelineTemplatePageProps {
  // `data` prop will be injected by the GraphQL query below.
  data: {
    pageContent: ActorPageContentFileNode
    events: {
      nodes: EventFileNode[]
    }
    eventsAsActor: {
      nodes: EventFileNode[]
    }
    images: {
      nodes: ImageFileNode[]
    }
  }
}

const byId = Eq.contramap((n: EventFileNode) => n.childMarkdownRemark.id)(
  Eq.eqString
)

export default function ActorTimelineTemplate({
  data,
}: ActorTimelineTemplatePageProps) {
  const {
    pageContent: {
      childMarkdownRemark: { frontmatter, html },
    },
    events,
    eventsAsActor,
    images,
  } = data

  return pipe(
    E.right(A.union(byId)(events.nodes, eventsAsActor.nodes)),
    E.chain(t.array(EventFileNode).decode),
    E.map(events =>
      A.sortBy([Ord.getDualOrd(ordEventFileNodeDate)])(events).map(
        e => e.childMarkdownRemark
      )
    ),
    E.fold(
      errs => {
        console.log(ThrowReporter.report(E.left(errs)))
        return null
      },
      timelineEvents => {

        const coverImage = images.nodes.find(i =>
          Eq.eqString.equals(`${i.name}${i.ext}`, frontmatter.avatar)
        )

        return (
          <Layout>
            <SEO title={frontmatter.title} />
            <Columns>
              <Columns.Column size={3}>
                <TimelineNavigator events={timelineEvents} />
              </Columns.Column>
              <Columns.Column size={9}>
                <div className="content">
                  <div></div>
                  <div className="blog-post-container">
                    <div className="blog-post">
                      <h1>{frontmatter.title}</h1>
                      {coverImage ? (
                        <Image
                          size={128}
                          src={coverImage.childImageSharp.fixed.src}
                        />
                      ) : (
                        <div />
                      )}
                      <div
                        className="blog-post-content"
                        dangerouslySetInnerHTML={{ __html: html }}
                      />
                    </div>
                  </div>
                </div>
                <Columns.Column>
                  <div>
                    <EventList events={timelineEvents} />
                    {/* <Timeline events={timelineEvents.right} /> */}
                  </div>
                </Columns.Column>
              </Columns.Column>
            </Columns>
          </Layout>
        )
      }
    )
  )
}

export const pageQuery = graphql`
  query ActorTimelineTemplatePage(
    $subject: String!
    $relativeDirectory: String!
    $imagesRelativeDirectoryGlob: String!
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
          avatar
        }
        html
      }
    }

    eventsAsActor: allFile(
      filter: {
        childMarkdownRemark: { frontmatter: { actors: { eq: $subject } } }
      }
      sort: { order: DESC, fields: childMarkdownRemark___frontmatter___date }
    ) {
      nodes {
        id
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
          }
          html
        }
      }
    }

    events: allFile(
      filter: {
        relativeDirectory: { eq: $relativeDirectory }
        name: { ne: "index" }
      }
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
          }
          html
        }
      }
    }

    images: allFile(
      filter: { relativePath: { glob: $imagesRelativeDirectoryGlob } }
    ) {
      nodes {
        childImageSharp {
          fixed {
            src
          }
        }
        relativeDirectory
        relativePath
        name
        ext
      }
    }
  }
`