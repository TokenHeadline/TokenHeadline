// src/lib/apolloClient.js
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://ap-south-1.cdn.hygraph.com/content/cm1adzv1802sy07ut097esnry/master', // Replace with your Hygraph API endpoint
  }),
  cache: new InMemoryCache(),
})

export default client
