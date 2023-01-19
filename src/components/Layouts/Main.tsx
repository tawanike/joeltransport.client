import { Header, Footer } from '.';
import Head from "next/head";
import Script from 'next/script';

function Layout({ font, children }: any) {
  return (
    <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
    </Head>
        <div className='container-fluid p-0' style={{ margin: '0 auto' }}>
            <Header />
            {children}
            <Footer />
            <Script id="zsiqchat" src="./js/salesiq.js" />
        </div>
    </>
  )
}

export default Layout
