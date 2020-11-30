import React from 'react';
import SearchWorker from '../workers/search.worker'
import Card from './Card';
import { useDatabase } from '../context/database';

export default function Cards({ query, category, setCategory }) {
  const database = useDatabase();

  const searchWorker = React.useRef(null);
  if (!searchWorker.current) {
    searchWorker.current = new SearchWorker()
  }

  React.useEffect(() => {
    if (Object.keys(database).length > 0) {
      searchWorker.current.postMessage(database);
      searchWorker.current.postMessage("");
    }
  }, [database])

  const [pagesLoaded, setPagesLoaded] = React.useState(1);

  const [results, setResults] = React.useState([]);
  const searchWorkerCallback = React.useCallback(event => {
    setResults(event.data)
    setPagesLoaded(1)
  }, [])

  const queryCallback = React.useCallback(query => {
    searchWorker.current.postMessage(query);
  })

  React.useEffect(() => {
    searchWorker.current.addEventListener('message', searchWorkerCallback)

    return () => searchWorker.current.removeEventListener('message', searchWorkerCallback)
  }, [])

  React.useEffect(() => queryCallback(query), [query])

  const filteredResults = results.filter(book => (book.categories ?? []).includes(category) || category === "");

  return (
    <div>
      {filteredResults.length === 0 && (
        <div className="w-full text-center mt-8">
          No books found.
          {category.length > 0 && <span> Try <button onClick={() => setCategory("")} className="underline">clearing the category filter.</button></span>}
        </div>
      )}
      <ul>
        {filteredResults.slice(0, 20 * pagesLoaded).map(book => <Card book={book} key={book.isbn}/>)}
      </ul>
      {filteredResults.length > pagesLoaded * 20 &&
        <div className="text-center">
          <button onClick={() => setPagesLoaded(pagesLoaded + 1)}>Load more</button>
        </div>
      }
    </div>
  )
}