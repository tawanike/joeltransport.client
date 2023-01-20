import '../styles/styles.scss';

import { Open_Sans } from '@next/font/google';
import type { AppProps } from 'next/app';
import { Layout } from '../components/Layouts';
import { initialUserAuthState, UserAuthReducer, UserAuthStateProvider } from '../_contexts/userAuth.context';
import { useReducer } from 'react';

const OpenSans = Open_Sans({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
});

export default function App({ Component, pageProps }: AppProps) {
    const [UserAuthState, dispatchUserAuth] = useReducer(UserAuthReducer, initialUserAuthState);

    return <UserAuthStateProvider value={{ UserAuthState, dispatchUserAuth }}>
        <main className={`${OpenSans.className} container-fluid`}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </main>
    </UserAuthStateProvider>
}
