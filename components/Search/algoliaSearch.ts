import algoliasearch, { SearchIndex } from 'algoliasearch/lite';
import { Category, Item, Group, ItemType } from '../../types';

export const PAGE_SIZE = 8;

export function createSearchIndex() {
  return algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_NAME!,
    process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!
  ).initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!);
}

export default function search({
  index,
  query = '',
  category,
  group,
  type,
  page = 0,
}: {
  index: SearchIndex;
  query?: string;
  category?: Category;
  group?: Group;
  type?: ItemType;
  page?: number;
}) {
  const facetFilters: any[] = [];
  if (category) {
    facetFilters.push(`category:${category}`);
  }
  if (group) {
    facetFilters.push(`group:${group}`);
  }
  if (type) {
    facetFilters.push(`type:${type}`);
  }

  return index.search<Item>(query, {
    facetFilters,
    page,
    hitsPerPage: PAGE_SIZE,
  });
}
