import { Select, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useSearch } from '../../context/SearchContext';
import { ItemType } from '../../types';

export default function FormatSelector() {
  const { type, setType } = useSearch();

  return (
    <Select
      background={useColorModeValue('white', 'gray.700')}
      value={type ?? ''}
      onChange={(event) => setType(event.target.value ? (event.target.value as ItemType) : undefined)}
      aria-label="Format"
    >
      <option value="">All formats</option>
      <option value={ItemType.book}>Book</option>
      <option value={ItemType.music}>Music</option>
      <option value={ItemType.movie}>Movie</option>
    </Select>
  );
}
