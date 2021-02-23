import { Box, Button, List, ListItem, Spinner, Text } from '@chakra-ui/react';
import React from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { useSearch } from '../../context/SearchContext';
import useIsMount from '../../hooks/useIsMount';
import { Volume } from '../../types';
import search, { createSearchIndex, PAGE_SIZE } from './algoliaSearch';
import SearchResult from './SearchResult';

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

export default function SearchResults({
  initialResults,
  initialTotalResults,
}: {
  initialResults: Volume[];
  initialTotalResults: number;
}) {
  const searchIndex = React.useRef(createSearchIndex());
  const { query, setQuery, format, category, setCategory } = useSearch();

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
      search({ index: searchIndex.current, query: debouncedQuery, category, format }).then(({ hits, nbHits }) =>
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
            index: searchIndex.current,
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
        <List spacing={2}>
          {state.results
            .filter((book) => book.error === undefined)
            .map((book) => (
              <ListItem key={book.key}>
                <SearchResult volume={book} setCategory={setCategory} setQuery={setQuery} />
              </ListItem>
            ))}
        </List>
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
