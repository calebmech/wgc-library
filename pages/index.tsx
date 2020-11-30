import React from 'react';
import Select from '../components/system/Select';
import DatabaseProvider from '../context/database';
import BookBagProvider from '../context/bookBag';
import dynamic from 'next/dynamic';
import BookBag from '../components/BookBag';

const LazyCards = dynamic(() => import('../components/Cards'), {
  loading: () => <p>...</p>,
  ssr: false,
});

export default function Home() {
  const [query, setQuery] = React.useState('');

  return (
    <DatabaseProvider>
      <BookBagProvider>
        <div className="flex min-h-screen">
          <div className="max-w-screen-md m-auto my-7 px-5 w-full">
            <header className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                WGC Library
              </h1>

              <input
                type="search"
                className="text-lg my-3 mt-6 py-3 px-6 border rounded-lg w-full"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <ul className="grid grid-cols-2 gap-2">
                <Select>
                  <option value="">Select a category</option>
                  <option value="Test2">Test2</option>
                  <option value="Test3">Test3</option>
                  <option value="Test4">Test4</option>
                  <option value="Test5">Test5</option>
                </Select>
                <Select>
                  <option>Select a format</option>
                  <option value="Test2">Book</option>
                  <option value="Test3">CD</option>
                  <option value="Test4">DVD</option>
                </Select>
              </ul>
            </header>

            <LazyCards query={query} />
          </div>
          <BookBag />
        </div>
      </BookBagProvider>
    </DatabaseProvider>
  );
}
