import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const server = new ApolloClient({
  link: new HttpLink({
    uri: 'http://tokenheadline-wordpress/graphql',
  }),
  cache: new InMemoryCache(),
  ssrMode: true,
})

export default server
