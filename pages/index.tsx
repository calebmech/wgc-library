import React from 'react';
import dynamic from 'next/dynamic';

const LazyTable = dynamic(() => import('../components/Table'), {
  loading: () => <p>...</p>,
  ssr: false,
});

const LazyCards = dynamic(() => import('../components/Cards'), {
  loading: () => <p>...</p>,
  ssr: false,
});

export default function Home() {
  const [query, setQuery] = React.useState('');

  return (
    <div className="max-w-screen-md m-auto my-5 px-5">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          WGC Library
        </h1>

        <input
          type="search"
          className="text-lg my-3 mt-6 py-3 px-6 border rounded-md w-full"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </header>

      {/* <LazyCards query={query} /> */}
      {/* <LazyTable /> */}
    </div>
  );
}
