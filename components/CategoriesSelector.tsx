import React from 'react';
import { useDatabase } from '../context/database';
import { Select } from '@chakra-ui/react';

const CategoriesSelector = ({
  category,
  setCategory,
}: {
  category: string;
  setCategory: (category: string) => void;
}) => {
  const database = useDatabase();

  const categories = React.useMemo(
    () =>
      Array.from(new Set(Object.values(database).flatMap((book) => book.volumeInfo.categories ?? [])).values()).sort(),
    [database]
  );

  return (
    <Select value={category} onChange={(event) => setCategory(event.target.value)} background="white">
      <option value="">All categories</option>
      {categories.map((category) => (
        <option value={category} key={category}>
          {category}
        </option>
      ))}
    </Select>
  );
};

export default CategoriesSelector;
