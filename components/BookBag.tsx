import { Box, ListItem, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import { useBookBag } from '../context/bookBag';
import { useDatabase } from '../context/database';
import { useIsMobile } from '../hooks/useIsMobile';
import BookBagItem from './BookBagItem';

export default function BookBag() {
  const database = useDatabase();
  const { books, removeBookFromBag } = useBookBag();

  const isMobile = useIsMobile();

  return (
    <Box flex="1" overflowY="auto" height="30vh">
      {books.length === 0 && <p>There are no items in your bag.</p>}
      <UnorderedList ml="0" width={!isMobile ? '28vw' : undefined}>
        {Object.keys(database).length > 0 &&
          books.map((key) => {
            const book = database[key]?.volumeInfo;

            if (!book) {
              console.error('No item found for key ', key);
              return;
            }

            return (
              <ListItem key={key} mb={3}>
                <BookBagItem book={book} onRemove={() => removeBookFromBag(key)} />
              </ListItem>
            );
          })}
      </UnorderedList>
    </Box>
  );
}
