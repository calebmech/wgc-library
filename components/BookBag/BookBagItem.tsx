import { Box, CloseButton, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import { Item } from '../../types';

const BookBagItem = ({ onRemove, item }: { item: Item; onRemove: () => void }) => (
  <HStack>
    <HStack w="full" as="article">
      {item.imageUrl && (
        <Box position="relative" w={8} h={12} flex="none" mr={3}>
          <Image layout="fill" objectFit="contain" className="object-left" src={item.imageUrl} alt="Book cover" />
        </Box>
      )}
      <div>
        <Text isTruncated noOfLines={1} as="h1">
          {item.title}
          {item.subtitle && `: ${item.subtitle}`}
        </Text>
        {item.creator && (
          <Text isTruncated noOfLines={1} color={useColorModeValue('gray.600', 'gray.400')} as="h2">
            {item.creator}
          </Text>
        )}
      </div>
    </HStack>

    <CloseButton onClick={onRemove} />
  </HStack>
);

export default BookBagItem;
