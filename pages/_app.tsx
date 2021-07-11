import type { AppProps } from "next/app";
import { Global, css } from "@emotion/react";
import { GlobalStyle } from "common/GlobalStyle";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </Head>
      <GlobalStyle />
      <Global
        styles={css`
          html,
          body {
            padding: 0;
            margin: 0;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          * {
            box-sizing: border-box;
          }
        `}
      />
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;
