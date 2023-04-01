import { Open_Sans } from "@next/font/google";
import type { AppProps } from "next/app";
import { useReducer } from "react";
import { SSRProvider } from "react-bootstrap";
import "react-phone-number-input/style.css";
import BookingContextProvider from "src/_contexts/booking.context";
import {
  CostSummaryReducer,
  CostSummaryStateProvider,
  initialCostSummaryState,
} from "../_contexts/costSummary.context";

import { Layout } from "../components/Layouts";
import "../styles/styles.scss";

const OpenSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  const [CostSummaryState, dispatchCostSummary] = useReducer(
    CostSummaryReducer,
    initialCostSummaryState
  );

  return (
    <SSRProvider>
      <CostSummaryStateProvider
        value={{ CostSummaryState, dispatchCostSummary }}
      >
        <BookingContextProvider>
          <main className={`${OpenSans.className} container-fluid`}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </main>
        </BookingContextProvider>
      </CostSummaryStateProvider>
    </SSRProvider>
  );
}
