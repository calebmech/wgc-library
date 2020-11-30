import React from 'react';
import BookBagItem from '../components/BookBagItem';
import { useBookBag } from '../context/bookBag';
import { useDatabase } from '../context/database';
import useIsMobile from '../hooks/useIsMobile';

export default function BookBag({ onClose }) {
  const database = useDatabase();
  const { books, removeBookFromBag, clearBag } = useBookBag();
  const [name, setName] = React.useState("");
  
  const isMobile = useIsMobile();
  
  const [requesting, setRequesting] = React.useState(false);

  const handleBookRequest = () => {
    setRequesting(true);

    fetch("/api/sendEmail", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, books })
    }).then(() => {
      clearBag();
      setRequesting(false);
    })
  }

  return (
    <div className="bg-white p-7 md:border-l h-screen min-w-max sticky top-0 flex flex-col md:w-3/12 w-full">
        <div className="flex justify-between mb-5">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Book bag
          </h2>
          {isMobile && (
            <button onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
        {books.length === 0 && <p>There are no items in your bag.</p>}
        <ul className="flex-1 overflow-y-auto">
          {books.map(isbn => {
              const { title, authors, imageLinks } = database[isbn].volumeInfo;
              
              if (!database[isbn]) {
                console.error("No book found for ISBN ", isbn)
                return;
              }

              return (
                <li key={isbn} className="mb-3">
                  <BookBagItem
                    title={title}
                    authors={authors}
                    cover={imageLinks.thumbnail}
                    onRemove={() => removeBookFromBag(isbn)}
                     />
                </li>
              );
            })}
        </ul>
        <footer>
          <form>
            <input
              type="text"
              className="my-3 mt-6 py-2 px-3 border rounded-md w-full"
              placeholder="Full name"
              value={name}
              onChange={event => setName(event.target.value)}
            />

            <button
              type="submit"
              disabled={requesting || books.length === 0 || name.trim().length === 0}
              onClick={handleBookRequest}
              className="bg-blue-500 text-gray-100 py-1 px-2 rounded-md mr-2 w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 mr-2 mb-1 inline"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              <span>Request books</span>
            </button>
          </form>
        </footer>
      </div>
  )
}