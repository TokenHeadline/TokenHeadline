import { fetchNews } from './newsfetcher'
import Banner from './Banner'

const BannerServer = async () => {
  const news = await fetchNews()

  return <Banner news={news} />
}

export default BannerServer
