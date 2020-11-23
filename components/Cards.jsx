import React from 'react';
import SearchWorker from '../workers/search.worker'
import { useDebouncedCallback } from 'use-debounce';
import Card from './Card';

export default function Cards({ query }) {
  const searchWorker = React.useRef(null);
  if (!searchWorker.current) {
    searchWorker.current = new SearchWorker()
  }

  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const searchWorkerCallback = React.useCallback(event => {
    setResults(event.data)
    setLoading(false)
  }, [])

  const queryCallback = useDebouncedCallback(query => {
    searchWorker.current.postMessage(query);
  }, 300)

  React.useEffect(() => {
    searchWorker.current.addEventListener('message', searchWorkerCallback)

    return () => searchWorker.current.removeEventListener('message', searchWorkerCallback)
  }, [])

  React.useEffect(() => {
    setLoading(true);
    queryCallback.callback(query)
  }, [query])

  return (
    <ul>
      {/* <p className="text-red-600 text-4xl">{loading && 'loading'}</p> */}
      {!loading && results.map((book, i) => <Card book={book} key={i}/>)}
    </ul>
  )
}