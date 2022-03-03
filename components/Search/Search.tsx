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
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import React from 'react';
import { useSearch } from '../../context/SearchContext';
import CategorySelector from './CategorySelector';
import FormatSelector from './FormatSelector';
import GroupSelector from './GroupSelector';

const Search = () => {
  const {
    query,
    setQuery,
    type,
    setType,
    category,
    setCategory,
    group,
    setGroup,
  } = useSearch();

  const searchRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    searchRef.current?.focus();
  }, [searchRef]);

  return (
    <VStack mb={6} spacing={3}>
      <link
        rel="preconnect"
        href={`https://${process.env
          .NEXT_PUBLIC_ALGOLIA_APP_NAME!}-dsn.algolia.net`}
        crossOrigin="true"
      />

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
        {query && (
          <InputRightElement>
            <CloseButton
              alignSelf="flex-end"
              mr={1}
              onClick={() => setQuery('')}
            />
          </InputRightElement>
        )}
      </InputGroup>
      <Wrap spacing={2} width="100%">
        <WrapItem flex={2} minWidth="150px">
          <FormatSelector />
        </WrapItem>
        <WrapItem flex={2} minWidth="150px">
          <GroupSelector />
        </WrapItem>
        <WrapItem flex={3} minWidth="200px">
          <CategorySelector />
        </WrapItem>
      </Wrap>
      {(type || category || group) && (
        <Box w="full" textAlign="center">
          <Button
            variant="link"
            size="sm"
            onClick={() => {
              setCategory(undefined);
              setType(undefined);
              setGroup(undefined);
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
