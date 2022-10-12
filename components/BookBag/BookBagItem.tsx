import {
  Box,
  CloseButton,
  HStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import { Item } from '../../types';
import { images } from '../../next.config';

const BookBagItem = ({
  onRemove,
  item,
}: {
  item: Item;
  onRemove: () => void;
}) => {
  const canOptimizeCover = images.domains.some((domain) =>
    item.imageUrl?.includes(domain)
  );

  return (
    <HStack>
      <HStack w="full" as="article">
        {item.imageUrl && (
          <Box position="relative" w={8} h={12} flex="none" mr={3}>
            <Image
              layout="fill"
              objectFit="contain"
              className="object-left"
              src={item.imageUrl}
              alt="Book cover"
              unoptimized={!canOptimizeCover}
            />
          </Box>
        )}
        <Box width="0" flex="1">
          <Text noOfLines={1} as="h1">
            {item.title}
            {item.subtitle && `: ${item.subtitle}`}
          </Text>
          {item.creator && (
            <Text
              noOfLines={1}
              color={useColorModeValue('gray.600', 'gray.400')}
              as="h2"
            >
              {item.creator}
            </Text>
          )}
        </Box>
      </HStack>

      <CloseButton onClick={onRemove} />
    </HStack>
  );
};

export default BookBagItem;
