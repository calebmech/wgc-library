import { Box, Button, Spinner, Text, VStack } from '@chakra-ui/react';
import algoliasearch, { SearchIndex } from 'algoliasearch/lite';
import React, { useReducer } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { Volume } from '../types';
import Card from './Card';

const PAGE_SIZE = 8;

const searchClient = algoliasearch('WV458H32HP', '9238085c928f4a26733df80b8f0a9a9c');

const index = searchClient.initIndex('wgc-library');

export const useIsMount = () => {
  const isMountRef = React.useRef(true);
  React.useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};

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

  return index.search<Volume>(query, { facetFilters, page, hitsPerPage: PAGE_SIZE });
};

interface State {
  isLoading: boolean;
  pagesLoaded: number;
  totalResults: number;
  results: Volume[];
}

enum Actions {
  NEW_QUERY = 'NEW_QUERY',
  QUERY_LOADED = 'QUERY_LOADED',
  NEXT_PAGE = 'NEW_PAGE',
}

interface NewQueryAction {
  type: Actions.NEW_QUERY;
}

interface QueryLoadedAction {
  type: Actions.QUERY_LOADED;
  results: Volume[];
  totalResults: number;
}

interface NextPageAction {
  type: Actions.NEXT_PAGE;
  results: Volume[];
}

type ActionTypes = NewQueryAction | QueryLoadedAction | NextPageAction;

const reducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case Actions.NEW_QUERY: {
      return {
        isLoading: true,
        pagesLoaded: 1,
        totalResults: 0,
        results: [],
      };
    }
    case Actions.QUERY_LOADED: {
      return {
        isLoading: false,
        pagesLoaded: 1,
        totalResults: action.totalResults,
        results: action.results,
      };
    }
    case Actions.NEXT_PAGE: {
      return {
        ...state,
        isLoading: false,
        pagesLoaded: state.pagesLoaded + 1,
        results: state.results.concat(action.results),
      };
    }
    default: {
      return state;
    }
  }
};

export default function Cards({
  query,
  setQuery,
  format,
  category,
  setCategory,
  initialResults,
  initialTotalResults,
}: {
  query: string;
  setQuery: (query: string) => void;
  format: string;
  category: string;
  setCategory: (category: string) => void;
  initialResults: Volume[];
  initialTotalResults: number;
}) {
  const [state, dispatch] = React.useReducer(reducer, {
    isLoading: false,
    pagesLoaded: 1,
    results: initialResults,
    totalResults: initialTotalResults,
  });

  const isMount = useIsMount();

  const [debouncedQuery, setDebouncedQuery] = React.useState(query);

  React.useEffect(() => {
    if (!isMount) {
      dispatch({ type: Actions.NEW_QUERY });
    }

    const timeout = setTimeout(() => setDebouncedQuery(query), 300);

    return () => clearTimeout(timeout);
  }, [query, category, format]);

  React.useEffect(() => {
    if (!isMount) {
      search({ index, query: debouncedQuery, category, format }).then(({ hits, nbHits }) =>
        dispatch({ type: Actions.QUERY_LOADED, results: hits, totalResults: nbHits })
      );
    }
  }, [debouncedQuery, category, format]);

  const loaderEl = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([target]) => {
        if (target.isIntersecting && state.pagesLoaded * PAGE_SIZE < state.totalResults) {
          search({
            query,
            format,
            category,
            page: state.pagesLoaded,
            index,
          }).then(({ hits }) => {
            dispatch({ type: Actions.NEXT_PAGE, results: hits });
          });
        }
      },
      {
        root: null,
        rootMargin: '100px',
      }
    );
    if (loaderEl.current) {
      observer.observe(loaderEl.current);
    }

    return () => {
      if (loaderEl.current) {
        observer.unobserve(loaderEl.current);
      }
    };
  }, [state, query, format, category]);

  return (
    <div>
      {!state.isLoading && (
        <VStack>
          {state.results.map((book) => (
            <Card volume={book} key={book.key} setCategory={setCategory} setQuery={setQuery} />
          ))}
        </VStack>
      )}

      {!state.isLoading &&
        ((category.length > 0 && PAGE_SIZE * state.pagesLoaded > state.results.length) ||
          state.results.length === 0) && (
          <Text mt={state.results.length > 0 ? 8 : undefined} px={3} align="center">
            No {state.results.length > 0 && 'more'} items found.
            {category.length > 0 && !query.includes(category) && (
              <span>
                {' '}
                <Button
                  variant="link"
                  onClick={() => {
                    unstable_batchedUpdates(() => {
                      setQuery(category);
                      setDebouncedQuery(category);
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

      <Box textAlign="center" my={6}>
        {(state.isLoading || state.totalResults > state.pagesLoaded * PAGE_SIZE) && <Spinner ref={loaderEl} />}
      </Box>
    </div>
  );
}
