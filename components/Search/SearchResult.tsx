import { Box, Button, Heading, HStack, Tag, Tooltip, useColorMode } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { useBookBag } from '../../context/BookBagContext';
import { useIsMobile } from '../../hooks/useIsMobile';
import { Volume } from '../../types';
import CardDescription from './SearchResultDescription';
import BagIcon from '../icons/BagIconSm';
import FormatIcon, { mapFormatToText } from '../FormatIcon';
import InfoIcon from '../icons/InfoIcon';
import XCircleIcon from '../icons/XCircleIcon';

export default function SearchResult({
  volume,
  setCategory,
  setQuery,
}: {
  volume: Volume;
  setCategory: (category: string) => void;
  setQuery: (query: string) => void;
}) {
  const book = volume.volumeInfo;
  const { title, subtitle, authors, imageLinks } = book;

  const isMobile = useIsMobile();
  const isLightMode = useColorMode().colorMode === 'light';
  const [expanded, setExpanded] = React.useState(false);

  const { addBookToBag, removeBookFromBag, books } = useBookBag();

  return (
    <Box as="article" width="full" borderRadius="lg" borderWidth={1} background={isLightMode ? 'white' : 'gray.700'}>
      <Box width="full" display="flex">
        {imageLinks && (
          <Box
            position="relative"
            height="auto"
            flex="none"
            width="20%"
            maxWidth={24}
            background={isLightMode ? 'gray.100' : 'gray.900'}
          >
            <Image src={imageLinks.thumbnail} layout="fill" objectFit="contain" alt="Book cover" />
          </Box>
        )}

        <Box py={3} px={5} overflow="hidden">
          <Box as="header" mb={1}>
            <Heading as="h1" size="md" fontSize="1.125em" fontWeight="semibold" mb={1}>
              {title.trim()}
              {subtitle && `: ${subtitle}`}
            </Heading>
            <Heading as="h2" size="sm" color={isLightMode ? 'gray.600' : 'gray.400'}>
              {authors &&
                authors.map((author, i) => (
                  <React.Fragment key={i}>
                    <Button
                      variant="link"
                      onClick={() => setQuery(author)}
                      fontWeight="500"
                      color={isLightMode ? 'gray.600' : 'gray.400'}
                    >
                      {author}
                    </Button>
                    {i < authors.length - 1 && ', '}
                  </React.Fragment>
                ))}
            </Heading>
          </Box>

          <div className="desktop-display-only">
            <CardDescription
              book={book}
              volume={volume}
              expanded={expanded}
              setCategory={setCategory}
              showShortDescription
            />
          </div>

          <HStack as="footer" mt={3} mb={1}>
            {!books.find((book) => book.key === volume.key) ? (
              <Button
                onClick={() => addBookToBag(volume)}
                size="xs"
                colorScheme="blue"
                leftIcon={<BagIcon height={16} />}
              >
                Add to bag
              </Button>
            ) : (
              <Button
                onClick={() => removeBookFromBag(volume.key)}
                size="xs"
                colorScheme="red"
                leftIcon={<XCircleIcon height={16} />}
              >
                Remove <span className="desktop-display-only">&nbsp;from bag</span>
              </Button>
            )}
            <Button onClick={() => setExpanded(!expanded)} size="xs" ml={1} leftIcon={<InfoIcon height={16} />}>
              {expanded ? 'Less' : 'More'} <span className="not-small-mobile-display-only">&nbsp;information</span>
            </Button>
            <div className="desktop-display-only">
              {volume.kind && (
                <Tooltip label={`Format: ${mapFormatToText(volume.kind)}`}>
                  <Tag>
                    <FormatIcon format={volume.kind} />
                  </Tag>
                </Tooltip>
              )}
            </div>
          </HStack>
        </Box>
      </Box>
      {isMobile && expanded && (
        <Box px={4} py={2} borderTopWidth={1}>
          <CardDescription book={book} volume={volume} expanded={expanded} setCategory={setCategory} showFormat />
        </Box>
      )}
    </Box>
  );
}
