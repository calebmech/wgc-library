import {
  Box,
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
  useTheme,
  VStack,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import React from 'react';
import CategoriesSelector from '../components/CategoriesSelector';
import Header from '../components/Header';
import BookBagProvider from '../context/bookBag';
import DatabaseProvider from '../context/database';
import useIsMobile from '../hooks/useIsMobile';
import { Kind } from '../types';

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

export default function Home() {
  const [query, setQuery] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [format, setFormat] = React.useState('');

  const theme = useTheme();

  const isMobile = useIsMobile();

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
                <CategoriesSelector category={category} setCategory={setCategory} />
                <Select
                  background="white"
                  value={format}
                  onChange={(event) => setFormat(event.target.value)}
                  width="100%"
                >
                  <option value="">Select a format</option>
                  <option value={Kind.BooksVolume}>Book</option>
                  <option value={Kind.CD}>CD</option>
                  <option value={Kind.DVD}>DVD</option>
                </Select>
              </HStack>
            </VStack>

            <LazyCards
              query={query}
              setQuery={setQuery}
              category={category}
              setCategory={setCategory}
              format={format}
            />
          </Container>
          {isMobile ? (
            <LazyMobileBookBag isOpen={isOpen} onClose={onClose} />
          ) : (
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
          )}
        </Flex>
      </BookBagProvider>
    </DatabaseProvider>
  );
}
