import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/app.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>🤖 Botway Core</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
