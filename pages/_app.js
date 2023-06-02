import Head from 'next/head'
import GTM from '@/components/scripts/gtm'
import Userway from '@/components/scripts/userway'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GTM id={process.env.NEXT_PUBLIC_GTM_ID} />
      <Userway id={process.env.NEXT_PUBLIC_USERWAY_ID} />
      <Head>
        <link rel="shortcut icon" href="/images/Sparrow Favicon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
