import Head from "next/head";
import Script from "next/script";
import { Footer, Header } from ".";

const Layout = ({ children }: any) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="row">
        <Header />
        {children}
        <Footer />
        <Script id="zsiqchat" src="./js/salesiq.js" />
      </div>
    </>
  );
};

export default Layout;
