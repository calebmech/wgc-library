import { useRouter } from 'next/router';
import React from 'react';
import { Category, Group, ItemType } from '../types';

interface SearchContextType {
  query: string;
  setQuery: (query: string) => void;
  category?: Category;
  setCategory: (category: Category | undefined) => void;
  group?: Group;
  setGroup: (format: Group | undefined) => void;
  type?: ItemType;
  setType: (format: ItemType | undefined) => void;
}

const SearchContext = React.createContext<SearchContextType>({
  query: '',
  setQuery: () => {},
  category: undefined,
  setCategory: () => {},
  group: undefined,
  setGroup: () => {},
  type: undefined,
  setType: () => {},
});

function getQueryValue<T>(queryValue: string | string[] | undefined): T | undefined {
  return (Array.isArray(queryValue) ? queryValue[0] : queryValue) as T | undefined;
}

const createQueryObject = (query: { [key: string]: string | undefined }): { [key: string]: string } => {
  const entries = Object.entries(query).filter(([key, value]) => value);

  return Object.fromEntries(entries as any);
};

export default function SearchProvider({ ...props }) {
  const router = useRouter();

  const [query, setQuery] = React.useState<string>(getQueryValue(router.query.q) ?? '');
  const [category, setCategory] = React.useState<Category | undefined>(
    getQueryValue(router.query.category) as Category | undefined
  );
  const [group, setGroup] = React.useState<Group | undefined>(getQueryValue(router.query.group) as Group | undefined);
  const [type, setType] = React.useState<ItemType | undefined>(
    getQueryValue(router.query.type) as ItemType | undefined
  );

  React.useEffect(() => {
    setQuery(getQueryValue(router.query.q) ?? '');
    setCategory(getQueryValue<Category>(router.query.category));
    setGroup(getQueryValue<Group>(router.query.group));
    setType(getQueryValue<ItemType>(router.query.type));
  }, [router.query]);

  React.useEffect(() => {
    const id = setTimeout(() => {
      router.push({ query: createQueryObject({ ...router.query, q: query, category, type, group }) }, undefined, {
        shallow: true,
      });
    }, 500);

    return () => clearTimeout(id);
  }, [query, category, type]);

  const value: SearchContextType = {
    query,
    setQuery,
    category,
    setCategory,
    group,
    setGroup,
    type,
    setType,
  };

  return <SearchContext.Provider value={value} {...props} />;
}

export const useSearch = () => React.useContext(SearchContext);
