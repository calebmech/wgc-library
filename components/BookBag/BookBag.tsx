import { Box, ListItem, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import { useBookBag } from '../../context/BookBagContext';
import { useIsMobile } from '../../hooks/useIsMobile';
import BookBagItem from './BookBagItem';

export default function BookBag() {
  const { books, removeBookFromBag } = useBookBag();
  const isMobile = useIsMobile();

  return (
    <Box
      flex="1"
      display="flex"
      overflowY="auto"
      mx={isMobile ? -6 : -7}
      px={isMobile ? 6 : 7}
      height={isMobile ? '30vh' : undefined}
    >
      {books.length === 0 && <p>There are no items in your bag.</p>}
      <UnorderedList ml="0" flex="1" listStyleType="none">
        {books.map((item) => (
          <ListItem key={item.objectID} mb={3} _last={{ paddingBottom: 4 }}>
            <BookBagItem item={item} onRemove={() => removeBookFromBag(item.objectID)} />
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
}
