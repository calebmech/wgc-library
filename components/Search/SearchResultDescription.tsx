import {
  Button,
  IconButton,
  Link,
  Tag,
  TagLeftIcon,
  Text,
  Tooltip,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import React from 'react';
import { useSearch } from '../../context/SearchContext';
import { Categories, Item } from '../../types';
import TypeIcon, { mapTypeToText } from '../FormatIcon';
import AmazonIcon from '../icons/AmazonIcon';
import BookIconSm from '../icons/BookIconSm';
import CalendarIconSm from '../icons/CalendarIconSm';
import CubeTransparentSm from '../icons/CubeTransparentSm';
import GoogleIcon from '../icons/GoogleIcon';
import TagIconSm from '../icons/TagIconSm';
import UserGroupIconSm from '../icons/UserGroupIconSm';

export default function SearchResultDescription({
  item,
  expanded,
  showShortDescription = false,
  showFormat = false,
}: {
  item: Item;
  expanded: boolean;
  showShortDescription?: boolean;
  showFormat?: boolean;
}) {
  const { setType, setGroup, setCategory, setQuery } = useSearch();

  return (
    <>
      {(showShortDescription || expanded) && (
        <Text noOfLines={expanded ? undefined : 2}>{item.synopsis}</Text>
      )}
      {expanded && (
        <Wrap my={3} spacing={2}>
          {item.url && (
            <WrapItem>
              <Tooltip label="Google Books">
                <Link
                  href={item.url}
                  lineHeight="0"
                  target="_blank"
                  rel="noopener"
                >
                  <IconButton
                    aria-label="Google icon"
                    icon={<GoogleIcon height="14" />}
                    size="xs"
                  />
                </Link>
              </Tooltip>
            </WrapItem>
          )}
          {item.amazonID && (
            <WrapItem>
              <Tooltip label="Amazon">
                <Link
                  href={'https://www.amazon.ca/dp/' + item.amazonID}
                  lineHeight="0"
                  target="_blank"
                  rel="noopener"
                >
                  <IconButton
                    aria-label="Google icon"
                    icon={<AmazonIcon height="14" />}
                    size="xs"
                  />
                </Link>
              </Tooltip>
            </WrapItem>
          )}
          {showFormat && item.type && (
            <WrapItem>
              <Tooltip label="Type">
                <Button
                  onClick={() => setType(item.type)}
                  size="xs"
                  leftIcon={<TypeIcon format={item.type} height="12" />}
                >
                  {mapTypeToText(item.type)}
                </Button>
              </Tooltip>
            </WrapItem>
          )}
          {item.format && (
            <WrapItem>
              <Tooltip label="Format">
                <Button
                  onClick={() => setQuery(item.format ?? '')}
                  size="xs"
                  leftIcon={<CubeTransparentSm height="12" />}
                >
                  {item.format}
                </Button>
              </Tooltip>
            </WrapItem>
          )}
          {item.releaseDate && (
            <WrapItem>
              <Tooltip label="Publish date">
                <Tag>
                  <TagLeftIcon>
                    <CalendarIconSm />
                  </TagLeftIcon>
                  {item.releaseDate.slice(0, 4)}
                </Tag>
              </Tooltip>
            </WrapItem>
          )}
          {item.pages && (
            <WrapItem>
              <Tooltip label="Page count">
                <Tag>
                  <TagLeftIcon mt="2px">
                    <BookIconSm />
                  </TagLeftIcon>
                  {item.pages}
                </Tag>
              </Tooltip>
            </WrapItem>
          )}

          {item.group && (
            <WrapItem>
              <Tooltip label="Category">
                <Button
                  onClick={() => setGroup(item.group)}
                  size="xs"
                  leftIcon={<UserGroupIconSm height="12" />}
                >
                  {item.group}
                </Button>
              </Tooltip>
            </WrapItem>
          )}
          {item.category && Categories[item.category] && (
            <WrapItem>
              <Tooltip label="Category">
                <Button
                  onClick={() => setCategory(item.category)}
                  size="xs"
                  leftIcon={<TagIconSm height="12" />}
                >
                  {Categories[item.category]}
                </Button>
              </Tooltip>
            </WrapItem>
          )}
        </Wrap>
      )}
    </>
  );
}
