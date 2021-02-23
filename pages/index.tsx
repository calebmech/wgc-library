import { Container, Flex, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import React from 'react';
import BookBagContainer from '../components/BookBag/BookBagContainer';
import Header from '../components/Header';
import search, { createSearchIndex } from '../components/Search/algoliaSearch';
import CategorySelector, { Category } from '../components/Search/CategorySelector';
import FormatSelector from '../components/Search/FormatSelector';
import Search from '../components/Search/Search';
import SearchResults from '../components/Search/SearchResults';
import BookBagProvider from '../context/BookBagContext';
import SearchProvider from '../context/SearchContext';
import { Volume } from '../types';

export default function Home({
  initialResults,
  initialTotalResults,
  categories,
}: {
  initialResults: Volume[];
  initialTotalResults: number;
  categories: Category[];
}) {
  const { isOpen: bagOpen, onOpen: setBagOpen, onClose: setBagClose } = useDisclosure();

  return (
    <BookBagProvider>
      <Flex background={useColorModeValue('gray.50', 'gray.800')} minHeight="100vh">
        <Container maxW="768px" mt={3} as="main">
          <Header bagOpen={bagOpen} setBagOpen={setBagOpen} />

          <SearchProvider>
            <Search>
              <FormatSelector />
              <CategorySelector categories={categories} />
            </Search>

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
    category: context.query.category as string | undefined,
    format: context.query.format as string | undefined,
  });
  const categories = await searchIndex.searchForFacetValues('volumeInfo.categories', '*', {
    maxFacetHits: 100,
  });

  // Cache for one year (clears on redeploy)
  context.res.setHeader('Cache-Control', 's-maxage=31536000, stale-while-revalidate');

  return {
    props: {
      initialResults: initialResults.hits,
      initialTotalResults: initialResults.nbHits,
      categories: categories.facetHits,
    },
  };
};
