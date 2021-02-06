import {
  Box,
  Button,
  CloseButton,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useSearch } from '../../context/Search';

const Search: React.FC = ({ children }) => {
  const { query, setQuery, format, setFormat, category, setCategory } = useSearch();

  const searchRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    searchRef.current?.focus();
  }, [searchRef]);

  return (
    <VStack mb={6} spacing={3}>
      <link rel="preconnect" href="https://WV458H32HP-dsn.algolia.net" crossOrigin="true" />

      <InputGroup role="search">
        <Input
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          size="lg"
          aria-label="Search"
          autoFocus
          role="searchbox"
          ref={searchRef}
          background={useColorModeValue('white', 'gray.700')}
        />
        {query.length > 0 && (
          <InputRightElement>
            <CloseButton alignSelf="flex-end" mr={1} onClick={() => setQuery('')} />
          </InputRightElement>
        )}
      </InputGroup>
      <HStack spacing={2} width="100%">
        {children}
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
  );
};

export default Search;
