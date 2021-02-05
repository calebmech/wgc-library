import { Box, Button, Heading, HStack, Icon, Tag, Tooltip, useColorMode, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { useBookBag } from '../context/bookBag';
import { useIsMobile, useIsSmallMobile } from '../hooks/useIsMobile';
import { Kind, Volume } from '../types';
import CardDescription from './CardDescription';
import BagIcon from './icons/BagIconSm';
import BookIconSm from './icons/BookIconSm';
import FilmIconSm from './icons/FilmIconSm';
import InfoIcon from './icons/InfoIcon';
import MusicNoteIconSm from './icons/MusicNoteIconSm';
import XCircleIcon from './icons/XCircleIcon';

export function FormatIcon({ format, ...props }: { format?: Kind }) {
  switch (format) {
    case Kind.BooksVolume:
      return <Icon as={BookIconSm} {...props} />;
    case Kind.CD:
      return <Icon as={MusicNoteIconSm} {...props} />;
    case Kind.DVD:
      return <Icon as={FilmIconSm} {...props} />;
    default:
      return null;
  }
}

export function mapFormatToText(format?: Kind) {
  switch (format) {
    case Kind.BooksVolume:
      return 'Book';
    case Kind.CD:
      return 'CD';
    case Kind.DVD:
      return 'DVD';
    default:
      return null;
  }
}

export default function Card({
  volume,
  setCategory,
  setQuery,
}: {
  volume: Volume;
  setCategory: (category: string) => void;
  setQuery: (query: string) => void;
}) {
  const book = volume.volumeInfo;
  if (!book) {
    return null;
  }
  const { title, subtitle, authors, imageLinks } = book;

  const [expanded, setExpanded] = React.useState(false);

  const isMobile = useIsMobile();
  const isSmallMobile = useIsSmallMobile();

  const { addBookToBag, removeBookFromBag, books } = useBookBag();

  const colorMode = useColorMode();

  return (
    <Box
      as="article"
      width="full"
      borderRadius="lg"
      borderWidth={1}
      background={useColorModeValue('white', 'gray.700')}
    >
      <Box width="full" display="flex">
        {imageLinks && (
          <Box
            position="relative"
            height="auto"
            flex="none"
            width="20%"
            maxWidth={24}
            background={colorMode.colorMode === 'light' ? 'gray.100' : 'gray.900'}
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
            <Heading as="h2" size="sm" color={useColorModeValue('gray.600', 'gray.400')}>
              {authors &&
                authors.map((author, i) => (
                  <React.Fragment key={i}>
                    <Button
                      variant="link"
                      onClick={() => setQuery(author)}
                      fontWeight="500"
                      color={useColorModeValue('gray.600', 'gray.400')}
                    >
                      {author}
                    </Button>
                    {i < authors.length - 1 && ', '}
                  </React.Fragment>
                ))}
            </Heading>
          </Box>

          {!isMobile && (
            <CardDescription
              book={book}
              volume={volume}
              expanded={expanded}
              setCategory={setCategory}
              showShortDescription
            />
          )}

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
                Remove {!isMobile && 'from bag'}
              </Button>
            )}
            <Button onClick={() => setExpanded(!expanded)} size="xs" ml={1} leftIcon={<InfoIcon height={16} />}>
              {expanded ? 'Less' : 'More'} {!isSmallMobile && 'information'}
            </Button>
            {!isMobile && volume.kind && (
              <Tooltip label={`Format: ${mapFormatToText(volume.kind)}`}>
                <Tag>
                  <FormatIcon format={volume.kind} />
                </Tag>
              </Tooltip>
            )}
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
