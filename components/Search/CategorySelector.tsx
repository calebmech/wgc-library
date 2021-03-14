import React from 'react';
import { Select, useColorModeValue } from '@chakra-ui/react';
import { useSearch } from '../../context/SearchContext';
import { Categories, Category } from '../../types';

export default function CategorySelector() {
  const { category, setCategory } = useSearch();

  return (
    <Select
      value={category ?? ''}
      onChange={(event) => setCategory(event.target.value ? (event.target.value as Category) : undefined)}
      background={useColorModeValue('white', 'gray.700')}
      aria-label="Category"
    >
      <option value="">All categories</option>
      {Object.values(Category).map((c) => (
        <option key={c} value={c}>
          {Categories[c]}
        </option>
      ))}
    </Select>
  );
}
