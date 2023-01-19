import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styles.scss';

import { Open_Sans } from '@next/font/google';
import type { AppProps } from 'next/app';
import { Layout } from '../components/Layouts';

const OpenSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={OpenSans.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  )
}
