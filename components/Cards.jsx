import React from 'react';
import SearchWorker from '../workers/search.worker'
import { useDebouncedCallback } from 'use-debounce';
import Card from './Card';
import { useDatabase } from '../context/database';

export default function Cards({ query }) {
  const database = useDatabase();

  const searchWorker = React.useRef(null);
  if (!searchWorker.current) {
    searchWorker.current = new SearchWorker()
  }

  React.useEffect(() => {
    if (Object.keys(database).length > 0) {
      searchWorker.current.postMessage(database);
    }
  }, [database])

  const [pagesLoaded, setPagesLoaded] = React.useState(1);

  const [results, setResults] = React.useState([]);
  const searchWorkerCallback = React.useCallback(event => {
    setResults(event.data)
    setPagesLoaded(1)
  }, [])

  const queryCallback = useDebouncedCallback(query => {
    searchWorker.current.postMessage(query);
  }, 0)

  React.useEffect(() => {
    searchWorker.current.addEventListener('message', searchWorkerCallback)

    return () => searchWorker.current.removeEventListener('message', searchWorkerCallback)
  }, [])

  React.useEffect(() => queryCallback.callback(query), [query])

  return (
    <div>
      <ul>
        {results.slice(0, 20 * pagesLoaded).map((book, i) => <Card book={book} key={i}/>)}
      </ul>
      {results.length > 0 &&
        <div className="text-center">
          <button onClick={() => setPagesLoaded(pagesLoaded + 1)}>Load more</button>
        </div>
      }
    </div>
  )
}