import { Button, IconButton, Link, Tag, TagLeftIcon, Text, Tooltip, Wrap, WrapItem } from '@chakra-ui/react';
import React from 'react';
import { Book, Volume } from '../types';
import { FormatIcon, mapFormatToText } from './Card';
import BookIconSm from './icons/BookIconSm';
import CalendarIconSm from './icons/CalendarIconSm';
import GoogleIcon from './icons/GoogleIcon';
import TagIconSm from './icons/TagIconSm';

const CardDescription = ({
  book,
  volume,
  expanded,
  setCategory,
  showShortDescription = false,
  showFormat = false,
}: {
  book: Book;
  volume: Volume;
  expanded: boolean;
  setCategory: (category: string) => void;
  showShortDescription?: boolean;
  showFormat?: boolean;
}) => {
  return (
    <>
      {(showShortDescription || expanded) && (
        <Text
          isTruncated={!expanded}
          noOfLines={expanded ? undefined : 2}
          dangerouslySetInnerHTML={{ __html: book.description ?? '' }}
        />
      )}
      {expanded && (
        <Wrap my={3} spacing={2}>
          {book.infoLink && (
            <WrapItem>
              <Tooltip label="Google Books">
                <Link href={book.infoLink} lineHeight="0">
                  <IconButton aria-label="Google icon" icon={<GoogleIcon height="14" />} size="xs" />
                </Link>
              </Tooltip>
            </WrapItem>
          )}
          {showFormat && volume.kind && (
            <WrapItem>
              <Tooltip label="Format">
                <Tag>
                  <TagLeftIcon>
                    <FormatIcon format={volume.kind} />
                  </TagLeftIcon>
                  {mapFormatToText(volume.kind)}
                </Tag>
              </Tooltip>
            </WrapItem>
          )}
          {book.publishedDate && (
            <WrapItem>
              <Tooltip label="Publish date">
                <Tag>
                  <TagLeftIcon>
                    <CalendarIconSm />
                  </TagLeftIcon>
                  {book.publishedDate}
                </Tag>
              </Tooltip>
            </WrapItem>
          )}
          {book.pageCount && (
            <WrapItem>
              <Tooltip label="Page count">
                <Tag>
                  <TagLeftIcon>
                    <BookIconSm />
                  </TagLeftIcon>
                  {book.pageCount}
                </Tag>
              </Tooltip>
            </WrapItem>
          )}
          {book.categories?.map((category) => (
            <WrapItem key={category}>
              <Tooltip label="Category">
                <Button size="xs" onClick={() => setCategory(category)} leftIcon={<TagIconSm height="12" />}>
                  {category}
                </Button>
              </Tooltip>
            </WrapItem>
          ))}
        </Wrap>
      )}
    </>
  );
};

export default CardDescription;
