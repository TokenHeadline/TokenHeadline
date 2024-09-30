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
        name
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
        name
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
        name
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
export const GET_BANNER = gql`
  query MyQuery {
    articles(orderBy: publishedAt_ASC, first: 6) {
      id
      title
      featuredImage {
        url
      }
      slug
    }
  }
`
export const GET_ALL_ARTICLES = gql`
  query GetAllArticles($limit: Int, $offset: Int) {
    articles(orderBy: publishedAt_ASC, first: $limit, skip: $offset) {
      id
      title
      featuredImage {
        url
      }
      slug
      author {
        name
      }
      date
      excerpt
      category {
        name
      }
    }
    totalCount: articlesConnection {
      aggregate {
        count
      }
    }
  }
`
export const GET_CATEGORY_ARTICLE = gql`
  query GetAllArticles($limit: Int, $offset: Int, $category: String) {
    articles(
      orderBy: publishedAt_ASC
      first: $limit
      skip: $offset
      where: { category: { slug: $category } }
    ) {
      id
      title
      featuredImage {
        url
      }
      slug
      author {
        name
      }
      date
      excerpt
      category {
        name
      }
    }
    totalCount: articlesConnection {
      aggregate {
        count
      }
    }
  }
`
export const GET_CATEGORY_COUNT = gql`
  query GetAllArticles($slug: String) {
    totalCount: articlesConnection(where: { category: { slug: $slug } }) {
      aggregate {
        count
      }
    }
  }
`
export const GET_CATEGORIES = gql`
  query MyQuery {
    categories {
      name
      slug
      imageUrl {
        url
      }
    }
  }
`
export const BREAKING_NEWS = gql`
  query MyQuery {
    articles {
      breakingNews
      title
    }
  }
`
export const GET_LATEST = gql`
  query MyQuery {
    articles(first: 1) {
      slug
      title
      excerpt
      featuredImage {
        url
      }
      author {
        name
        image {
          url
        }
      }
    }
  }
`
export const GET_ARTICLE_FOR_GRID = gql`
  query MyQuery {
    articles(first: 6) {
      title
      excerpt
      featuredImage {
        url
      }
      author {
        name
      }
      slug
      date
    }
  }
`
