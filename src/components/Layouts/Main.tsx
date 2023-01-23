import { Header, Footer } from '.';
import Head from "next/head";
import Script from 'next/script';

const Layout = ({ children }: any) => {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            </Head>
            <div className='row'>
                <Header />
                {children}
                <Footer />
                <Script id="zsiqchat" src="./js/salesiq.js" />
            </div>
        </>
    )
}

export default Layout
