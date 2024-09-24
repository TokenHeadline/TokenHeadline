import { gql } from '@apollo/client'

export const GET_TODAY = gql`
  query MyQuery {
    articles(first: 1) {
      title
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
export const GET_ARTICLES = gql`
  query MyQuery {
    articles(first: 7) {
      author {
        name
      }
      slug
      category {
        category
      }
      subheading
      id
    }
  }
`
export const GET_ARTICLE = gql`
  query MyQuery($slug: String!) {
    articles(where: { slug: $slug }) {
      category {
        category
      }
      title
      author {
        name
        image {
          url
        }
      }
      content {
        raw
      }
      date
    }
  }
`
