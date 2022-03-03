import { Box, Button, ChakraProps, List, ListItem } from '@chakra-ui/react';
import React from 'react';
import { Item } from '../../types';
import SearchResult from './SearchResult';

const RESULTS_PER_PAGE = 20;

export default function SearchResultsPreview({
  results,
  ...props
}: { results: Item[] } & ChakraProps) {
  const [pages, setPages] = React.useState(1);

  return (
    <Box pr="2" overflowY="auto" {...props}>
      <List spacing={2}>
        {results
          .sort((a, b) => (b.ascensionNumber ?? 0) - (a.ascensionNumber ?? 0))
          .slice(0, pages * RESULTS_PER_PAGE)
          .map((item) => (
            <ListItem key={item.objectID}>
              <SearchResult item={item} />
            </ListItem>
          ))}
      </List>
      {results.length > pages * RESULTS_PER_PAGE && (
        <Button
          display="block"
          my="4"
          mx="auto"
          onClick={() => setPages(pages + 1)}
        >
          Show more
        </Button>
      )}
    </Box>
  );
}
