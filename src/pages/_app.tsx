import 'react-phone-number-input/style.css'
import '../styles/styles.scss';
import { Open_Sans } from '@next/font/google';
import type { AppProps } from 'next/app';
import { Layout } from '../components/Layouts';
import { initialUserAuthState, UserAuthReducer, UserAuthStateProvider } from '../_contexts/userAuth.context';
import { initialCostSummaryState, CostSummaryReducer, CostSummaryStateProvider } from '../_contexts/costSummary.context';
import { useReducer } from 'react';
import { SSRProvider } from 'react-bootstrap';
import BookingContextProvider from 'src/_contexts/booking.context';

const OpenSans = Open_Sans({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
});

export default function App({ Component, pageProps }: AppProps) {
    const [UserAuthState, dispatchUserAuth] = useReducer(UserAuthReducer, initialUserAuthState);
    const [CostSummaryState, dispatchCostSummary] = useReducer(CostSummaryReducer, initialCostSummaryState);

    return (
        <SSRProvider>
            <UserAuthStateProvider value={{ UserAuthState, dispatchUserAuth }}>
                <BookingContextProvider>
                    <CostSummaryStateProvider value={{ CostSummaryState, dispatchCostSummary }}>
                        <main className={`${OpenSans.className} container-fluid`}>
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </main>
                    </CostSummaryStateProvider>
                </BookingContextProvider>
            </UserAuthStateProvider>
        </SSRProvider>
    )
}
