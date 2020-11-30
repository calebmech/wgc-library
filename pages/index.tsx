import React from 'react';
import DatabaseProvider from '../context/database';
import BookBagProvider from '../context/bookBag';
import dynamic from 'next/dynamic';
import BookBag from '../components/BookBag';
import useIsMobile from '../hooks/useIsMobile';
import Header from '../components/Header';
import Select from '../components/system/Select';
import CategoriesSelector from '../components/CategoriesSelector';

const LazyCards = dynamic(() => import('../components/Cards'), {
  loading: () => <p>...</p>,
  ssr: false,
});

export default function Home() {
  const [query, setQuery] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [bagOpen, setBagOpen] = React.useState(false);

  const isMobile = useIsMobile();

  return (
    <DatabaseProvider>
      <BookBagProvider>
        <div className="flex">
          {(!bagOpen || !isMobile) && (
            <div className="max-w-screen-md m-auto my-7 px-5 w-full">
              <Header bagOpen={bagOpen} setBagOpen={setBagOpen} />

              <div className="mb-6">
                <input
                  type="search"
                  className="text-lg my-3 mt-6 py-3 px-6 border rounded-lg w-full appearance-none"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />

                <ul className="grid grid-cols-2 gap-2">
                  <CategoriesSelector
                    category={category}
                    setCategory={setCategory}
                  />
                  <Select>
                    <option>Select a format</option>
                    <option value="Test2">Book</option>
                    <option value="Test3">CD</option>
                    <option value="Test4">DVD</option>
                  </Select>
                </ul>
              </div>

              <LazyCards
                query={query}
                category={category}
                setCategory={setCategory}
              />
            </div>
          )}
          {bagOpen && <BookBag onClose={() => setBagOpen(false)} />}
        </div>
      </BookBagProvider>
    </DatabaseProvider>
  );
}
