import React from 'react';
import { Select, useColorModeValue } from '@chakra-ui/react';
import { useSearch } from '../../context/SearchContext';

export interface Category {
  value: string;
  count: number;
}

export default function CategorySelector({ categories }: { categories: Category[] }) {
  const { category, setCategory } = useSearch();

  return (
    <Select
      value={category}
      onChange={(event) => setCategory(event.target.value)}
      background={useColorModeValue('white', 'gray.700')}
      aria-label="Category"
    >
      <option value="">All categories</option>
      {category && !categories.find((c) => c.value === category) && (
        <option value={category} key={category}>
          {category}
        </option>
      )}
      {categories
        .sort((a, b) => a.value.localeCompare(b.value))
        .map((c) => (
          <option value={c.value} key={c.value}>
            {c.value} ({c.count})
          </option>
        ))}
    </Select>
  );
}
