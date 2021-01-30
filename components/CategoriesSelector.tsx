import React from 'react';
import { useDatabase } from '../context/database';
import { Select, useColorModeValue } from '@chakra-ui/react';

const CategoriesSelector = ({
  category,
  setCategory,
  format,
}: {
  category: string;
  format: string;
  setCategory: (category: string) => void;
}) => {
  const database = useDatabase();

  const categories = React.useMemo(
    () =>
      Array.from(
        new Set(
          Object.values(database)
            .filter((book) => format === '' || book.kind === format)
            .flatMap((book) => book.volumeInfo.categories ?? [])
        ).values()
      ).sort(),
    [database, format]
  );

  React.useEffect(() => {
    if (!categories.includes(category)) {
      setCategory('');
    }
  }, [categories, format]);

  return (
    <Select
      value={category}
      onChange={(event) => setCategory(event.target.value)}
      background={useColorModeValue('white', 'gray.700')}
    >
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
