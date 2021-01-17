import { Box, Button, Spinner, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { useDebouncedCallback } from 'use-debounce';
import { useDatabase } from '../context/database';
import { Volume } from '../types';
import { SearchWorker } from '../workers';
import Card from './Card';

const PAGE_SIZE = 8;

export default function Cards({
  query,
  setQuery,
  format,
  category,
  setCategory,
}: {
  query: string;
  setQuery: (query: string) => void;
  format: string;
  category: string;
  setCategory: (category: string) => void;
}) {
  const database = useDatabase();
  const [isLoading, setIsLoading] = React.useState(true);
  const [initialLoad, setInitialLoad] = React.useState(false);

  const searchWorker = React.useRef<Worker | null>(null);
  if (!searchWorker.current) {
    searchWorker.current = new SearchWorker();
  }

  React.useEffect(() => {
    if (Object.keys(database).length > 0 && searchWorker.current) {
      searchWorker.current.postMessage(database);
      searchWorker.current.postMessage('');
    }
  }, [database]);

  const [pagesLoaded, setPagesLoaded] = React.useState(1);

  const [results, setResults] = React.useState<Volume[]>([]);
  const searchWorkerCallback = React.useCallback(
    (event) => {
      const newResults = event.data;

      if (!initialLoad && newResults.length === 0) {
        return;
      }

      unstable_batchedUpdates(() => {
        setInitialLoad(true);
        setResults(newResults);
        setPagesLoaded(1);
        setIsLoading(false);
      });
    },
    [initialLoad]
  );

  React.useEffect(() => {
    setPagesLoaded(1);
  }, [category, format]);

  const queryCallback = useDebouncedCallback((query) => {
    searchWorker.current?.postMessage(query);
  }, 100);

  React.useEffect(() => {
    searchWorker.current?.addEventListener('message', searchWorkerCallback);

    return () => searchWorker.current?.removeEventListener('message', searchWorkerCallback);
  }, [initialLoad]);

  React.useEffect(() => {
    setIsLoading(true);
    queryCallback.callback(query);
  }, [query]);

  const loaderEl = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    var options = {
      root: null,
      rootMargin: '80px',
    };
    // initialize IntersectionObserver
    // and attaching to Load More div
    const observer = new IntersectionObserver((entities) => {
      const target = entities[0];
      if (target.isIntersecting) {
        setPagesLoaded((page) => page + 1);
      }
    }, options);
    if (loaderEl.current && !isLoading) {
      observer.observe(loaderEl.current);
    }
  }, [isLoading]);

  const filteredResults = React.useMemo(() => {
    const formatMatchingResults = format === '' ? results : results.filter((volume) => volume.kind === format);

    const categoryMatchingResults =
      category === ''
        ? formatMatchingResults
        : formatMatchingResults.filter((volume) =>
            (volume.volumeInfo.categories ?? []).find((c) => c.startsWith(category))
          );

    return categoryMatchingResults;
  }, [category, format, results]);

  // const filteredResults =
  //   category === '' ? results : results.filter((book) => (book.categories ?? []).find((c) => c.startsWith(category)));
  console.log({ isLoading, initialLoad });
  return (
    <div>
      {!isLoading && (
        <VStack>
          {filteredResults.slice(0, PAGE_SIZE * pagesLoaded).map((book) => (
            <Card volume={book} key={book.volumeInfo.key} setCategory={setCategory} />
          ))}
        </VStack>
      )}

      {!isLoading &&
        ((category.length > 0 && PAGE_SIZE * pagesLoaded > filteredResults.length) || results.length === 0) && (
          <Text mt={filteredResults.length > 0 ? 8 : undefined} px={3} align="center">
            No {filteredResults.length > 0 && 'more'} items found.
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
        {(isLoading || filteredResults.length > pagesLoaded * PAGE_SIZE) && <Spinner />}
      </Box>
    </div>
  );
}
