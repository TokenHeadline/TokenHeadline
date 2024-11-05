import { gql } from '@apollo/client'

export const GET_TODAY = gql`
  query GetToday {
    posts(first: 1, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        title
        excerpt
        slug
        date
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`

export const GET_ARTICLES = gql`
  query NewQuery {
    posts(where: { orderby: { field: DATE, order: DESC } }, first: 8) {
      nodes {
        id
        slug
        title
        categories {
          nodes {
            name
          }
        }
        author {
          node {
            name
          }
        }
      }
    }
  }
`

export const GET_ARTICLE = gql`
  query MyQuery($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      seo {
        title
        metaDesc
      }
      categories {
        nodes {
          name
        }
      }
      title
      author {
        node {
          name
        }
      }
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
      date
    }
  }
`
export const GET_RECENT_ARTICLES = gql`
  query GetRecentArticles {
    posts(first: 9, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
        slug
        date
      }
    }
  }
`
export const GET_BANNER = gql`
  query MyQuery {
    posts(first: 6, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        slug
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`
export const GET_ALL_ARTICLES = gql`
  query GetArticles {
    posts {
      nodes {
        id
        title
        excerpt
        slug
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            name
          }
        }
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
    posts(first: 6, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        title
      }
    }
  }
`
export const GET_LATEST = gql`
  query MyQuery {
    opinions(first: 1, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        author {
          node {
            name
            id
            avatar {
              url
            }
          }
        }
        slug
        title
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`
export const GET_ARTICLE_FOR_GRID = gql`
  query MyQuery {
    posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        title
        excerpt
        date
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
        slug
      }
    }
  }
`

export const GET_OPINIONS = gql`
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
export const GET_PRESS_RELEASES = gql`
  query MyQuery {
    pressReleases(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        title
        excerpt
        date
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
        slug
      }
    }
  }
`
export const GET_ALL_PRESS_RELEASES = gql`
  query GetAllArticles($limit: Int, $offset: Int) {
    pressResleases(
      orderBy: updatedAt_DESC
      first: $limit
      skip: $offset
      where: { interview: false }
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
    }
    pressResleasesConnection {
      aggregate {
        count
      }
    }
  }
`
export const GET_PRESS_RELEASE = gql`
  query MyQuery($slug: ID!) {
    pressRelease(id: $slug, idType: SLUG) {
      seo {
        title
        metaDesc
      }
      title
      author {
        node {
          name
        }
      }
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
      date
    }
  }
`
export const GET_OPINION = gql`
  query MyQuery($slug: ID!) {
    opinion(id: $slug, idType: SLUG) {
      seo {
        title
        metaDesc
      }
      title
      author {
        node {
          name
        }
      }
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
      date
    }
  }
`
export const GET_INTERVIEW = gql`
  query MyQuery($slug: ID!) {
    interview(id: $slug, idType: SLUG) {
      seo {
        title
        metaDesc
      }
      title
      author {
        node {
          name
        }
      }
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
      date
    }
  }
`
export const GET_COURSES = gql`
  query MyQuery {
    courses(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        slug
        featuredImage {
          node {
            sourceUrl
          }
        }
        level {
          level
        }
      }
    }
  }
`

export const GET_ALL_COURSES = gql`
  query GetAllCourses($limit: Int, $offset: Int) {
    courses(first: $limit, skip: $offset) {
      id
      title
      slug
      featuredImage {
        url
      }
      courselevel
      courseDescription
    }
    coursesConnection {
      aggregate {
        count
      }
    }
  }
`
export const GET_COURSE = gql`
  query MyQuery($slug: ID!) {
    course(id: $slug, idType: SLUG) {
      seo {
        title
        metaDesc
      }
      id
      featuredImage {
        node {
          sourceUrl
        }
      }
      level {
        level
      }
      slug
      title
      content
    }
  }
`
export const GET_RECENT_COURSES = gql`
  query MyQuery($slug: String) {
    courses(where: { slug_not: $slug }, first: 4) {
      id
      title
      slug
      featuredImage {
        url
      }
      courselevel
    }
  }
`
export const GET_INTERVIEWS = gql`
  query GetAllArticles($limit: Int, $offset: Int) {
    pressResleases(
      orderBy: updatedAt_DESC
      first: $limit
      skip: $offset
      where: { interview: true }
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
    }
    pressResleasesConnection(where: { interview: true }) {
      aggregate {
        count
      }
    }
  }
`
