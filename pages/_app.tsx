import { ChakraProvider, CSSReset, extendTheme, ThemeOverride } from '@chakra-ui/react';
import { AppProps } from 'next/dist/shared/lib/router/router';
import Head from 'next/head';
import './index.css';

function MyApp({ Component, pageProps }: AppProps) {
  const config: ThemeOverride = {
    config: {
      useSystemColorMode: true,
    },
  };

  const customTheme = extendTheme(config);

  return (
    <ChakraProvider theme={customTheme}>
      <CSSReset />
      <Head>
        <title>WGC Library</title>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
