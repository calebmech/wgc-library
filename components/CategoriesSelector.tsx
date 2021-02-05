import React from 'react';
import { Select, useColorModeValue } from '@chakra-ui/react';
import { Facet } from '../pages';

const CategoriesSelector = ({
  categories,
  category,
  setCategory,
  format,
}: {
  categories: Facet[];
  category: string;
  format: string;
  setCategory: (category: string) => void;
}) => {
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
};

export default CategoriesSelector;
