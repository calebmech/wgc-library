import { Container, Flex, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import React from 'react';
import BookBagContainer from '../components/BookBag/BookBagContainer';
import Header from '../components/Header';
import search, { createSearchIndex } from '../components/Search/algoliaSearch';
import Search from '../components/Search/Search';
import SearchResults from '../components/Search/SearchResults';
import BookBagProvider from '../context/BookBagContext';
import SearchProvider from '../context/SearchContext';
import { Category, Group, Item, ItemType } from '../types';

export default function Home({
  initialResults,
  initialTotalResults,
}: {
  initialResults: Item[];
  initialTotalResults: number;
}) {
  const { isOpen: bagOpen, onOpen: setBagOpen, onClose: setBagClose } = useDisclosure();

  return (
    <BookBagProvider>
      <Flex background={useColorModeValue('gray.50', 'gray.800')} minHeight="100vh">
        <Container maxW="768px" mt={3} as="main">
          <Header bagOpen={bagOpen} setBagOpen={setBagOpen} />

          <SearchProvider>
            <Search />

            <SearchResults initialResults={initialResults} initialTotalResults={initialTotalResults} />
          </SearchProvider>
        </Container>

        <BookBagContainer isOpen={bagOpen} onClose={setBagClose} />
      </Flex>
    </BookBagProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const searchIndex = createSearchIndex();

  const initialResults = await search({
    index: searchIndex,
    query: context.query.q as string | undefined,
    category: context.query.category as Category | undefined,
    group: context.query.group as Group | undefined,
    type: context.query.type as ItemType | undefined,
  });

  // Cache for one year (clears on redeploy)
  context.res.setHeader('Cache-Control', 's-maxage=31536000, stale-while-revalidate');

  return {
    props: {
      initialResults: initialResults.hits,
      initialTotalResults: initialResults.nbHits,
    },
  };
};
