import { Select, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useSearch } from '../../context/SearchContext';
import { Kind } from '../../types';

export default function FormatSelector() {
  const { format, setFormat } = useSearch();

  return (
    <Select
      background={useColorModeValue('white', 'gray.700')}
      value={format}
      onChange={(event) => setFormat(event.target.value as Kind | '')}
      width="100%"
      aria-label="Format"
    >
      <option value="">All formats</option>
      <option value={Kind.BooksVolume}>Book</option>
      <option value={Kind.CD}>CD</option>
      <option value={Kind.DVD}>DVD</option>
    </Select>
  );
}
