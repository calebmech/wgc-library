import React, { useEffect } from 'react';
import { Volume } from '../types';

interface BookBagContextType {
  books: Volume[];
  addBookToBag: (book: Volume) => void;
  removeBookFromBag: (book: string) => void;
  clearBag: () => void;
}

const BookBagContext = React.createContext<BookBagContextType>({
  books: [],
  addBookToBag: () => {},
  removeBookFromBag: () => {},
  clearBag: () => {},
});

interface ActionType {
  type: string;
  isbn?: string;
  items?: Volume[];
}

function reducer(books: Volume[] = [], { type, isbn, items }: ActionType) {
  switch (type) {
    case 'ADD_BOOK': {
      if (items) {
        return books.concat(items.filter((item) => !books.includes(item)));
      }

      return books;
    }

    case 'REMOVE_BOOK': {
      return books.filter((book) => book.key !== isbn);
    }

    case 'CLEAR_BAG': {
      return [];
    }

    default:
      return books;
  }
}

export default function BookBagProvider({ ...props }) {
  const [books, dispatch] = React.useReducer(reducer, []);

  const addBookToBag = (...items: Volume[]) => {
    return dispatch({
      type: 'ADD_BOOK',
      items,
    });
  };

  const removeBookFromBag = (isbn: string) =>
    dispatch({
      type: 'REMOVE_BOOK',
      isbn,
    });

  const clearBag = () => dispatch({ type: 'CLEAR_BAG' });

  useEffect(() => {
    const storedBooks = localStorage.getItem('bag');
    const parsedStoredBooks = storedBooks ? JSON.parse(storedBooks) : [];
    const verifiedStoredBooks = parsedStoredBooks.find((book: any) => typeof book === 'string')
      ? []
      : parsedStoredBooks;

    addBookToBag(...verifiedStoredBooks);
  }, []);

  useEffect(() => {
    globalThis.window?.localStorage.setItem('bag', JSON.stringify(books));
  }, [books]);

  const value = {
    books,
    addBookToBag,
    removeBookFromBag,
    clearBag,
  };

  return <BookBagContext.Provider value={value} {...props} />;
}

export const useBookBag = () => React.useContext(BookBagContext);
