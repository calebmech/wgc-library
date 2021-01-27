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
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import React from 'react';
import CategoriesSelector from '../components/CategoriesSelector';
import Header from '../components/Header';
import BookBagProvider from '../context/bookBag';
import DatabaseProvider from '../context/database';
import { useIsDesktop } from '../hooks/useIsMobile';
import { Kind } from '../types';
import { useRouter } from 'next/router';

const LazyCards = dynamic(() => import('../components/Cards'), {
  loading: () => (
    <Box width="full" textAlign="center">
      <Spinner />
    </Box>
  ),
  ssr: false,
});

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

const getQueryValue = (queryValue: string | string[] | undefined): string => {
  return Array.isArray(queryValue) ? queryValue[0] : queryValue ?? '';
};

const createQueryObject = (query: { [key: string]: string }): { [key: string]: string } => {
  const entries = Object.entries(query);

  return Object.fromEntries(entries.filter(([key, value]) => value.trim().length > 0));
};

export default function Home() {
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
    }, 1000);

    return () => clearTimeout(id);
  }, [query, category, format]);

  const isDesktop = useIsDesktop();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <DatabaseProvider>
      <BookBagProvider>
        <Flex background="gray.50" minHeight="100%">
          <Container maxW="768px" mt={3}>
            <Header bagOpen={isOpen} setBagOpen={onOpen} />

            <VStack mb={6} mt={2} spacing={3}>
              <InputGroup>
                <Input
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  size="lg"
                  background="white"
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
                  background="white"
                  value={format}
                  onChange={(event) => setFormat(event.target.value)}
                  width="100%"
                >
                  <option value="">All formats</option>
                  <option value={Kind.BooksVolume}>Book</option>
                  <option value={Kind.CD}>CD</option>
                  <option value={Kind.DVD}>DVD</option>
                </Select>
                <CategoriesSelector category={category} setCategory={setCategory} format={format} />
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

            <LazyCards
              query={query}
              setQuery={setQuery}
              category={category}
              setCategory={setCategory}
              format={format}
            />
          </Container>
          {isDesktop ? (
            <Container
              flex="0 0 33vw"
              mx={0}
              p={7}
              w="full"
              background="white"
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
    </DatabaseProvider>
  );
}
