import { useRouter } from 'next/router';
import React from 'react';
import { Kind } from '../types';

interface SearchContextType {
  query: string;
  setQuery: (query: string) => void;
  category: string;
  setCategory: (category: string) => void;
  format: Kind | '';
  setFormat: (format: Kind | '') => void;
}

const SearchContext = React.createContext<SearchContextType>({
  query: '',
  setQuery: () => {},
  category: '',
  setCategory: () => {},
  format: '',
  setFormat: () => {},
});

const getQueryValue = (queryValue: string | string[] | undefined): string => {
  return Array.isArray(queryValue) ? queryValue[0] : queryValue ?? '';
};

const createQueryObject = (query: { [key: string]: string }): { [key: string]: string } => {
  const entries = Object.entries(query);

  return Object.fromEntries(entries.filter(([key, value]) => value.trim().length > 0));
};

export default function SearchProvider({ ...props }) {
  const router = useRouter();

  const [query, setQuery] = React.useState(getQueryValue(router.query.q));
  const [category, setCategory] = React.useState(getQueryValue(router.query.category));
  const [format, setFormat] = React.useState<Kind | ''>(getQueryValue(router.query.format) as Kind | '');

  React.useEffect(() => {
    setQuery(getQueryValue(router.query.q));
    setCategory(getQueryValue(router.query.category));
    setFormat(getQueryValue(router.query.format) as Kind | '');
  }, [router.query]);

  React.useEffect(() => {
    const id = setTimeout(() => {
      router.push({ query: createQueryObject({ ...router.query, q: query, category, format }) }, undefined, {
        shallow: true,
      });
    }, 500);

    return () => clearTimeout(id);
  }, [query, category, format]);

  const value: SearchContextType = {
    query,
    setQuery,
    category,
    setCategory,
    format,
    setFormat,
  };

  return <SearchContext.Provider value={value} {...props} />;
}

export const useSearch = () => React.useContext(SearchContext);
