import { Box, Button, Spinner, Text, VStack } from '@chakra-ui/react';
import algoliasearch, { SearchIndex } from 'algoliasearch/lite';
import React from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { Volume } from '../types';
import Card from './Card';

const PAGE_SIZE = 8;

const searchClient = algoliasearch('WV458H32HP', '9238085c928f4a26733df80b8f0a9a9c');

const index = searchClient.initIndex('wgc-library');

export const search = ({
  index,
  query = '',
  format,
  category,
  page = 0,
}: {
  index: SearchIndex;
  query?: string;
  format?: string;
  category?: string;
  page?: number;
}) => {
  const facetFilters = [];
  if (category) {
    facetFilters.push(`volumeInfo.categories:${category}`);
  }
  if (format) {
    facetFilters.push(`kind:${format}`);
  }

  return index.search<Volume>(query, { facetFilters, page, hitsPerPage: 24 });
};

export default function Cards({
  query,
  setQuery,
  format,
  category,
  setCategory,
  initialResults,
}: {
  query: string;
  setQuery: (query: string) => void;
  format: string;
  category: string;
  setCategory: (category: string) => void;
  initialResults: Volume[];
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [initialLoad, setInitialLoad] = React.useState(true);
  const [pagesLoaded, setPagesLoaded] = React.useState(1);

  const [results, setResults] = React.useState<Volume[]>(initialResults);

  const [debouncedQuery, setDebouncedQuery] = React.useState(query);

  React.useEffect(() => {
    setPagesLoaded(1);
  }, [category, format]);

  React.useEffect(() => {
    if (!initialLoad) {
      setIsLoading(true);
    }
    const timeout = setTimeout(() => setDebouncedQuery(query), 300);

    return () => clearTimeout(timeout);
  }, [query, initialLoad]);

  React.useEffect(() => {
    if (debouncedQuery || category || format) {
      setInitialLoad(false);
    }
  }, [debouncedQuery, category, format]);

  React.useEffect(() => {
    if (!initialLoad) {
      search({ index, query: debouncedQuery, category, format }).then(({ hits }) => {
        unstable_batchedUpdates(() => {
          setResults(hits);
          setPagesLoaded(1);
          setIsLoading(false);
        });
      });
    }
  }, [debouncedQuery, category, format, initialLoad]);

  const loaderEl = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (pagesLoaded * PAGE_SIZE > results.length) {
      // search({ query, format, category, page: Math.floor(results.length / 20) }).then(({ hits }) => {
      //   setResults((results) => results.concat(hits));
      // });
    }
  }, [pagesLoaded, results, query, format, category]);

  React.useEffect(() => {
    var options = {
      root: null,
      rootMargin: '100px',
    };
    // initialize IntersectionObserver
    // and attaching to Load More div
    const observer = new IntersectionObserver((entities) => {
      const target = entities[0];
      if (target.isIntersecting) {
        setPagesLoaded((page) => page + 1);
      }
    }, options);
    if (loaderEl.current) {
      observer.observe(loaderEl.current);
    }

    return () => {
      if (loaderEl.current) {
        observer.unobserve(loaderEl.current);
      }
    };
  }, []);

  return (
    <div>
      {!isLoading && (
        <VStack>
          {results.slice(0, PAGE_SIZE * pagesLoaded).map((book) => (
            <Card volume={book} key={book.key} setCategory={setCategory} setQuery={setQuery} />
          ))}
        </VStack>
      )}

      {!isLoading && ((category.length > 0 && PAGE_SIZE * pagesLoaded > results.length) || results.length === 0) && (
        <Text mt={results.length > 0 ? 8 : undefined} px={3} align="center">
          No {results.length > 0 && 'more'} items found.
          {category.length > 0 && !query.includes(category) && (
            <span>
              {' '}
              <Button
                variant="link"
                onClick={() => {
                  unstable_batchedUpdates(() => {
                    setQuery(category);
                    setCategory('');
                  });
                }}
                verticalAlign="initial"
                textDecoration="underline"
                fontWeight="normal"
                whiteSpace="break-spaces"
              >
                Click here for additional similar results.
              </Button>
            </span>
          )}
        </Text>
      )}

      <Box textAlign="center" my={6} ref={loaderEl}>
        {(isLoading || results.length > pagesLoaded * PAGE_SIZE) && <Spinner />}
      </Box>
    </div>
  );
}
