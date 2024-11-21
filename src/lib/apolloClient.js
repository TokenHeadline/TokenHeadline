import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://cms.tokenheadline.com/graphql',
  }),
  cache: new InMemoryCache(),
  ssrMode: true,
})

export default client
