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
        <Script id="zsiq-init">
          {`window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}`}
        </Script>
        <Script
          id="zsiqscript"
          src="https://salesiq.zohopublic.com/widget?wc=siqd5d519e30938f1448b5f10dec156d50be64f42207855e1ce022a7d79da27309c"
        />
      </div>
    </>
  );
};

export default Layout;
