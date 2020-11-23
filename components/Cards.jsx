import React from 'react';
import Image from 'next/image';
// import googleBooks from '../public/google-books.json';
// import { matchSorter } from 'match-sorter';
// import Fuse from 'fuse.js'
import SearchWorker from '../workers/search.worker'

// function fuzzySearchMultipleWords(
//   rows, // array of data [{a: "a", b: "b"}, {a: "c", b: "d"}]
//   keys, // keys to search ["a", "b"]
//   filterValue, // potentially multi-word search string "two words"
// ) {
//   if (!filterValue || !filterValue.length) {
//     return rows
//   }

//   const terms = filterValue.split(' ')
//   if (!terms) {
//     return rows
//   }

//   // reduceRight will mean sorting is done by score for the _first_ entered word.
//   return terms.reduceRight(
//     (results, term) => matchSorter(results, term, {keys}),
//     rows,
//   )
// }


// const books = Object.values(googleBooks).map(book => ({
//   ...book.volumeInfo,
//   authors: book.volumeInfo?.authors?.join(', ')
// }));

// const options = {
//   keys: [
//     {
//       name: 'title',
//       weight: 1
//     },
//     {
//       name: 'authors',
//       weight: 0.8
//     },
//     {
//       name: 'subtitle',
//       weight: 0.7
//     },
//     {
//       name: 'description',
//       weight: 0.3
//     }
//   ]
// }

export default function Cards({ query }) {
  const searchWorker = React.useRef(new SearchWorker);
  const [results, setResults] = React.useState([]);
  const searchWorkerCallback = React.useCallback(event => {
    setResults(event.data)
  }, [])

  React.useEffect(() => {
    searchWorker.addEventListener('message', searchWorkerCallback)

    return () => searchWorker.removeEventListener('message', searchWorkerCallback)
  }, [])

  React.useEffect(() => searchWorker.postMessage(query), [])

  // const rankedStrings = React.useMemo(() => 
  //   stringSimilarity
  //     .findBestMatch(query, searchStrings)
  //     .ratings
  //     .filter(({ rating }) => rating > 0.1)
  //     .map(({rating}, i) => ({ rating, i }))
  //     .sort((a, b) => b.rating - a.rating)
  // , [query]);
  // console.log(rankedStrings);

  // const rankedBooks = React.useMemo(() => fuzzySearchMultipleWords(books, ["title", "subtitle", "description", "authors"], query), [query]);
  

  return (
    <ul>
      {results.map((book, i) => {
        const { title, subtitle, authors, description, imageLinks } = book;

        return (
          <article key={i} className="border rounded-lg flex my-3 overflow-hidden">
            {imageLinks && 
              <div className="relative h-auto w-28 flex-none border-r">
                <Image src={imageLinks.thumbnail} layout="fill" objectFit="fill6" className="object-left-top" />
              </div>
            }

            <div className="py-3 px-5 bg-white w-full">
              <header className="leading-normal">
                <h1 className="text-lg font-semibold">{title}{subtitle && `: ${subtitle}`}</h1>
                <h2 className="text-gray-600">{authors}</h2>
              </header>
              <p className="mt-1 text-gray-900">
                {description?.slice(0, 140)}
              </p>

              <footer className="flex mt-3 mb-1">
                <button className="bg-blue-500 text-gray-100 py-1 px-2 rounded-md text-sm mr-2">
                  <svg className="h-4 mr-2 mb-0.5 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                  </svg>
                  <span>Add to bag</span>
                </button>
                <button className="bg-gray-300 text-gray-900 py-1 px-2 rounded-md text-sm mr-2" onClick={() => setLearnMore(!learnMore)}>
                <svg className="h-4 mr-2 mb-0.5 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Learn more
                </button>
                
              </footer>
            </div>
          </article>
          // <div className="bor"></div>
          // <div className="card mb-3" style={{maxWidth: 700}}>
          //   <div className="row g-0">
          //     <div className="col-md-3">
          //       <img src={imageLinks?.smallThumbnail} />
          //     </div>
          //     <div className="col-md-9">
          //       <div className="card-body">
          //         <h5 className="card-title">{title}{subtitle && `: ${subtitle}`}</h5>
          //         <h6 class="card-subtitle mb-2 text-muted"></h6>
          //         <p className="card-text">{description?.slice(0, 160) + '...'}</p>
          //       </div>
          //     </div>
          //   </div>
          // </div>
        )
      })
    }
    </ul>
  )
}