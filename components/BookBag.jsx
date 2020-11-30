import React from 'react';
import BookBagItem from '../components/BookBagItem';
import { useBookBag } from '../context/bookBag';
import { useDatabase } from '../context/database';

export default function BookBag() {
  const database = useDatabase();
  const { books, removeBookFromBag, clearBag } = useBookBag();
  const [name, setName] = React.useState("");

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
    <div className="bg-white w-3/12 p-7 border-l h-screen min-w-max sticky top-0 flex flex-col">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-5">
          Book bag
        </h2>
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
          <input
            type="text"
            className="my-3 mt-6 py-2 px-3 border rounded-md w-full"
            placeholder="Full name"
            value={name}
            onChange={event => setName(event.target.value)}
          />

          <button
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
        </footer>
      </div>
  )
}