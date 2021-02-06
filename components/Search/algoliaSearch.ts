import algoliasearch, { SearchIndex } from 'algoliasearch/lite';
import { Volume } from '../../types';

export const PAGE_SIZE = 8;

export function createSearchIndex() {
  return algoliasearch('WV458H32HP', '9238085c928f4a26733df80b8f0a9a9c').initIndex('wgc-library');
}

export default function search({
  index,
  query = '',
  format,
  category,
  page = 0,
}: {
  index: SearchIndex;
  query?: string;
  format?: string;
  category?: string;
  page?: number;
}) {
  const facetFilters = [];
  if (category) {
    facetFilters.push(`volumeInfo.categories:${category}`);
  }
  if (format) {
    facetFilters.push(`kind:${format}`);
  }

  return index.search<Volume>(query, { facetFilters, page, hitsPerPage: PAGE_SIZE });
}
