import { Box, ListItem, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import { useBookBag } from '../context/bookBag';
import { useIsMobile } from '../hooks/useIsMobile';
import BookBagItem from './BookBagItem';

export default function BookBag() {
  const { books, removeBookFromBag } = useBookBag();

  const isMobile = useIsMobile();

  return (
    <Box flex="1" overflowY="auto" height="30vh">
      {books.length === 0 && <p>There are no items in your bag.</p>}
      <UnorderedList ml="0" width={!isMobile ? '28vw' : undefined}>
        {books.map((book) => (
          <ListItem key={book.key} mb={3}>
            <BookBagItem book={book.volumeInfo} onRemove={() => removeBookFromBag(book.key)} />
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
}
