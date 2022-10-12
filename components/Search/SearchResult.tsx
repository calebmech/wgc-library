import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Tag,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { useBookBag } from '../../context/BookBagContext';
import { useSearch } from '../../context/SearchContext';
import { useIsMobile } from '../../hooks/useIsMobile';
import { Item } from '../../types';
import TypeIcon, { mapTypeToText } from '../FormatIcon';
import BagIcon from '../icons/BagIconSm';
import InfoIcon from '../icons/InfoIcon';
import XCircleIcon from '../icons/XCircleIcon';
import SearchResultDescription from './SearchResultDescription';
import { images } from '../../next.config';

export default function SearchResult({ item }: { item: Item }) {
  const { setQuery, setType } = useSearch();

  const isMobile = useIsMobile();
  const isLightMode = useColorMode().colorMode === 'light';
  const [expanded, setExpanded] = React.useState(false);

  const { addBookToBag, removeBookFromBag, books } = useBookBag();

  const canOptimizeCover = images.domains.some((domain) =>
    item.imageUrl?.includes(domain)
  );

  return (
    <Box
      as="article"
      width="full"
      borderRadius="lg"
      borderWidth={1}
      background={isLightMode ? 'white' : 'gray.700'}
    >
      <Box width="full" display="flex">
        {item.imageUrl && (
          <Box
            position="relative"
            height="auto"
            flex="none"
            width="20%"
            maxWidth={24}
            background={isLightMode ? 'gray.100' : 'gray.900'}
          >
            <Image
              src={item.imageUrl}
              layout="fill"
              objectFit="contain"
              alt="Book cover"
              unoptimized={!canOptimizeCover}
            />
          </Box>
        )}

        <Box py={3} px={5} overflow="hidden">
          <Box as="header" mb={1}>
            <Heading
              as="h1"
              size="md"
              fontSize="1.125em"
              fontWeight="semibold"
              mb={1}
            >
              {item.title?.trim()}
              {item.subtitle && `: ${item.subtitle}`}
            </Heading>
            <Heading
              as="h2"
              size="sm"
              color={isLightMode ? 'gray.600' : 'gray.400'}
            >
              {item.creator && (
                <Button
                  variant="link"
                  onClick={() => setQuery(item.creator ?? '')}
                  fontWeight="500"
                  color={isLightMode ? 'gray.600' : 'gray.400'}
                >
                  {item.creator}
                </Button>
              )}
            </Heading>
          </Box>

          <div className="desktop-display-only">
            <SearchResultDescription
              item={item}
              expanded={expanded}
              showShortDescription
            />
          </div>

          <HStack as="footer" mt={3} mb={1}>
            {!books.find((i) => i.objectID === item.objectID) ? (
              <Button
                onClick={() => addBookToBag(item)}
                size="xs"
                colorScheme="blue"
                leftIcon={<BagIcon height={16} />}
              >
                Add to bag
              </Button>
            ) : (
              <Button
                onClick={() => removeBookFromBag(item.objectID)}
                size="xs"
                colorScheme="red"
                leftIcon={<XCircleIcon height={16} />}
              >
                Remove{' '}
                <span className="desktop-display-only">&nbsp;from bag</span>
              </Button>
            )}
            <Button
              onClick={() => setExpanded(!expanded)}
              size="xs"
              ml={1}
              leftIcon={<InfoIcon height={16} />}
            >
              {expanded ? 'Less' : 'More'}{' '}
              <span className="not-small-mobile-display-only">
                &nbsp;information
              </span>
            </Button>
            <div className="desktop-display-only">
              {item.type && (
                <Tooltip label={`Type: ${mapTypeToText(item.type)}`}>
                  <IconButton
                    onClick={() => setType(item.type)}
                    aria-label={`Type: ${mapTypeToText(item.type)}`}
                    icon={<TypeIcon format={item.type} height="12" />}
                    size="xs"
                  ></IconButton>
                </Tooltip>
              )}
            </div>
          </HStack>
        </Box>
      </Box>
      {isMobile && expanded && (
        <Box px={4} py={2} borderTopWidth={1}>
          <SearchResultDescription item={item} expanded={expanded} showFormat />
        </Box>
      )}
    </Box>
  );
}
