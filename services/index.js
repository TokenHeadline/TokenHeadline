// queries/getNews.js

import { gql } from '@apollo/client'

export const GET_NEWS = gql`
  query MyQuery {
    articles(orderBy: publishedAt_ASC) {
      excerpt
      featuredImage {
        url
      }
      author {
        name
      }
      title
      slug
      category {
        category
      }
    }
  }
`
