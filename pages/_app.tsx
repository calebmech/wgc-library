import Head from 'next/head';
import { ChakraProvider, CSSReset, extendTheme, ThemeOverride } from '@chakra-ui/react';
import type { AppProps } from 'next/dist/next-server/lib/router/router';

function MyApp({ Component, pageProps }: AppProps) {
  const config: ThemeOverride = {
    config: {
      useSystemColorMode: false,
      // initialColorMode: "light",
    },
    styles: {
      global: {
        body: {
          bg: 'gray.50',
        },
      },
    },
  };

  const customTheme = extendTheme(config);

  return (
    <ChakraProvider theme={customTheme}>
      <CSSReset />
      <Head>
        <title>WGC Library</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
