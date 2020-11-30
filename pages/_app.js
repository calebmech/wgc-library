import "../styles/index.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>WGC Library</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.85"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
