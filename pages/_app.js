import Head from 'next/head'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/Sparrow Favicon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
