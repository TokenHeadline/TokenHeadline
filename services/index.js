import { gql } from '@apollo/client'

export const GET_TODAY = gql`
  query MyQuery {
   articles(
      orderBy: updatedAt_DESC
      where: { opinion: false }
      first: 1
    ) {
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
     articles(
      orderBy: updatedAt_DESC
      where: { opinion: false }
     
    )  {
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
      date
      seoTitle
      metaDescription
    }
  }
`
export const GET_BANNER = gql`
  query MyQuery {
    articles(first: 6, orderBy: updatedAt_DESC, where: { opinion: false }) {
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
      orderBy: updatedAt_DESC
      where: { opinion: false }
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
    articles(
      where: { breakingNews: true, opinion: false }
      orderBy: updatedAt_DESC
      first: 5
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
    articles(first: 3, orderBy: updatedAt_DESC, where: { opinion: false }) {
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
