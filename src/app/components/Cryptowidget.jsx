'use client'
import { useEffect } from 'react'

const CryptoWidget = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src =
      'https://price-static.crypto.com/latest/public/static/widget/index.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup: Remove the script if the component unmounts
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div
      id='crypto-widget-CoinList'
      data-design='modern'
      data-coin-ids='1,166,136,382,1986,1120,20,29,418'
    ></div>
  )
}

export default CryptoWidget
