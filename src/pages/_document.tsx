import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <Script
                    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBZfdpoBUniKbSIq_5YWdykaoOnADrsPjs&libraries=places"
                    strategy="beforeInteractive"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
