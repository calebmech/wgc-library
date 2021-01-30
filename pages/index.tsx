import {
  Box,
  Button,
  CloseButton,
  Container,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Spinner,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import algoliasearch from 'algoliasearch/lite';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import Cards from '../components/Cards';
import CategoriesSelector from '../components/CategoriesSelector';
import Header from '../components/Header';
import BookBagProvider from '../context/bookBag';
import { useIsDesktop } from '../hooks/useIsMobile';
import { Kind, Volume } from '../types';

const LazyMobileBookBag = dynamic(() => import('../components/MobileBookBag'), {
  ssr: false,
});

const LazyDesktopBookBag = dynamic(() => import('../components/DesktopBookBag'), {
  loading: () => (
    <Box width="full" textAlign="center">
      <Spinner />
    </Box>
  ),
  ssr: false,
});

export interface Facet {
  value: string;
  count: number;
}

const getQueryValue = (queryValue: string | string[] | undefined): string => {
  return Array.isArray(queryValue) ? queryValue[0] : queryValue ?? '';
};

const createQueryObject = (query: { [key: string]: string }): { [key: string]: string } => {
  const entries = Object.entries(query);

  return Object.fromEntries(entries.filter(([key, value]) => value.trim().length > 0));
};

export default function Home({ initialResults, categories }: { initialResults: Volume[]; categories: Facet[] }) {
  const router = useRouter();

  const [query, setQuery] = React.useState(getQueryValue(router.query.q));
  const [category, setCategory] = React.useState(getQueryValue(router.query.category));
  const [format, setFormat] = React.useState(getQueryValue(router.query.format));

  React.useEffect(() => {
    setQuery(getQueryValue(router.query.q));
    setCategory(getQueryValue(router.query.category));
    setFormat(getQueryValue(router.query.format));
  }, [router.query]);

  React.useEffect(() => {
    const id = setTimeout(() => {
      router.push({ query: createQueryObject({ ...router.query, q: query, category, format }) }, undefined, {
        shallow: true,
      });
    }, 500);

    return () => clearTimeout(id);
  }, [query, category, format]);

  const isDesktop = useIsDesktop();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <BookBagProvider>
      <Flex background={useColorModeValue('gray.50', 'gray.800')} minHeight="100%">
        <Container maxW="768px" mt={3}>
          <Header bagOpen={isOpen} setBagOpen={onOpen} />

          <VStack mb={6} mt={2} spacing={3}>
            <InputGroup>
              <Input
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                size="lg"
                background={useColorModeValue('white', 'gray.700')}
              />
              {query.length > 0 && (
                <InputRightElement>
                  <CloseButton alignSelf="flex-end" onClick={() => setQuery('')} />
                </InputRightElement>
              )}
            </InputGroup>
            <HStack spacing={2} width="100%">
              {' '}
              <Select
                background={useColorModeValue('white', 'gray.700')}
                value={format}
                onChange={(event) => setFormat(event.target.value)}
                width="100%"
              >
                <option value="">All formats</option>
                <option value={Kind.BooksVolume}>Book</option>
                <option value={Kind.CD}>CD</option>
                <option value={Kind.DVD}>DVD</option>
              </Select>
              <CategoriesSelector
                categories={categories}
                category={category}
                setCategory={setCategory}
                format={format}
              />
            </HStack>
            {(format.length || category.length) && (
              <Box w="full" textAlign="center">
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => {
                    setCategory('');
                    setFormat('');
                  }}
                >
                  Clear filters
                </Button>
              </Box>
            )}
          </VStack>

          <Cards
            query={query}
            setQuery={setQuery}
            category={category}
            setCategory={setCategory}
            format={format}
            initialResults={initialResults}
          />
        </Container>
        {isDesktop ? (
          <Container
            flex="0 0 33vw"
            mx={0}
            p={7}
            w="full"
            background={useColorModeValue('white', 'gray.900')}
            top="0"
            position="sticky"
            minWidth="max-content"
            display="flex"
            flexDirection="column"
            height="100vh"
            borderLeftWidth="1px"
          >
            <LazyDesktopBookBag />
          </Container>
        ) : (
          <LazyMobileBookBag isOpen={isOpen} onClose={onClose} />
        )}
      </Flex>
    </BookBagProvider>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const searchClient = algoliasearch('WV458H32HP', '9238085c928f4a26733df80b8f0a9a9c');
  const index = searchClient.initIndex('wgc-library');

  const initialResults = await index.search('');
  const categories = await index.searchForFacetValues('volumeInfo.categories', '*', {
    maxFacetHits: 100,
  });

  return {
    props: {
      initialResults: initialResults.hits,
      categories: categories.facetHits,
    },
  };
};
