// queries/getNews.js

import { gql } from '@apollo/client'

export const GET_NEWS = gql`
  query MyQuery {
    articles {
      slug
      subheading
      title
      breakingNews
      author {
        name
        image {
          url
        }
      }
      content {
        html
        raw
      }
      category {
        category
      }
    }
  }
`
