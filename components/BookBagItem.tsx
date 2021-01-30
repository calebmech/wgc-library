import { Box, CloseButton, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import { Book } from '../types';

const BookBagItem = ({ onRemove, book }: { book: Book; onRemove: () => void }) => (
  <HStack>
    <HStack w="full">
      {book.imageLinks && (
        <Box position="relative" w={8} h={12} flex="none" mr={3}>
          <Image layout="fill" objectFit="contain" className="object-left" src={book.imageLinks.thumbnail} />
        </Box>
      )}
      <div>
        <Text isTruncated noOfLines={1}>
          {book.title}
          {book.subtitle && `: ${book.subtitle}`}
        </Text>
        {book.authors && book.authors?.length > 0 && (
          <Text isTruncated noOfLines={1} color={useColorModeValue('gray.600', 'gray.400')}>
            {book.authors?.join(', ') || '\xa0'}
          </Text>
        )}
      </div>
    </HStack>

    <CloseButton onClick={onRemove} />
  </HStack>
);

export default BookBagItem;
