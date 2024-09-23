import { gql } from '@apollo/client'

export const GET_TODAY = gql`
  query MyQuery {
    articles(first: 1) {
      excerpt
      featuredImage {
        url
      }
      author {
        name
      }
      slug
      category {
        category
      }
      date
      subheading
    }
  }
`
