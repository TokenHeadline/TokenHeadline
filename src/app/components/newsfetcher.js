import { GET_BANNER } from '../../../services/index'
import client from '../../lib/apolloClient'

export const newsFetcher = async () => {
  const { data } = await client.query({
    query: GET_BANNER,
  })

  return data.articles
}
