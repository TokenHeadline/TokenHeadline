import { newsFetcher } from './newsfetcher' // Adjust the path as necessary
import Banner from './Banner'

const BannerServer = async () => {
  const news = await newsFetcher()

  return <Banner news={news} />
}

export default BannerServer
