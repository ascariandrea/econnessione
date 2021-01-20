import { graphql } from "gatsby"

export const query = graphql`
  fragment Project on ProjectFrontmatter {
    uuid
    name
    type
    color
    startDate
    areas
    endDate
    images {
      description
      image {
        publicURL
        childImageSharp {
          fluid(maxWidth: 600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }

    createdAt
    updatedAt
  }

  fragment ProjectMD on Mdx {
    frontmatter {
      ... on ProjectFrontmatter {
        ...Project
      }
    }
    timeToRead
    tableOfContents
    body
  }
`