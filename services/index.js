import { gql } from '@apollo/client'

export const GET_TODAY = gql`
  query MyQuery {
    articles(first: 1, orderBy: publishedAt_DESC, where: { opinion: false }) {
      subheading
      excerpt
      featuredImage {
        url
      }
      slug
      category {
        name
      }
      date
      author {
        name
      }
    }
  }
`
export const GET_ARTICLES = gql`
  query MyQuery {
    articles(orderBy: publishedAt_DESC) {
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
        html
      }
      featuredImage {
        url
      }
      date
      seoTitle
      metaDescription
    }
  }
`
export const GET_RECENT_ARTICLES = gql`
  query MyQuery($slug: String!) {
    articles(orderBy: updatedAt_DESC, where: { slug_not: $slug }, first: 8) {
      title
      featuredImage {
        url
      }
      slug
      date
    }
  }
`
export const GET_BANNER = gql`
  query MyQuery {
    articles(first: 6, orderBy: publishedAt_DESC, where: { opinion: false }) {
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
    articles(
      orderBy: updatedAt_DESC
      where: { opinion: false }
      first: $limit
      skip: $offset
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
    totalCount: articlesConnection(where: { opinion: false }) {
      aggregate {
        count
      }
    }
  }
`
export const GET_CATEGORY_ARTICLE = gql`
  query GetAllArticles($category: String, $limit: Int, $offset: Int) {
    articles(
      orderBy: updatedAt_DESC
      where: { category: { slug: $category }, opinion: false }
      first: $limit
      skip: $offset
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
    totalCount: articlesConnection(where: { category: { slug: $category } }) {
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
    articles(
      first: 6
      orderBy: publishedAt_DESC
      where: { breakingNews: true, opinion: false }
    ) {
      breakingNews
      title
    }
  }
`
export const GET_LATEST = gql`
  query MyQuery {
    articles(first: 1, orderBy: updatedAt_DESC, where: { opinion: true }) {
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
    articles(orderBy: publishedAt_DESC, where: { opinion: false }, first: 3) {
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
export const GET_OPINION = gql`
  query GetAllOpinion($limit: Int, $offset: Int) {
    articles(
      orderBy: updatedAt_DESC
      where: { opinion: true }
      first: $limit
      skip: $offset
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
    totalCount: articlesConnection(where: { opinion: true }) {
      aggregate {
        count
      }
    }
  }
`
