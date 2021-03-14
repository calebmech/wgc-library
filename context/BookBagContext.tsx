import React, { useEffect } from 'react';
import { Item } from '../types';

interface BookBagContextType {
  books: Item[];
  addBookToBag: (book: Item) => void;
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
  objectID?: string;
  items?: Item[];
}

function reducer(books: Item[] = [], { type, objectID, items }: ActionType) {
  switch (type) {
    case 'ADD_BOOK': {
      if (items) {
        return books.concat(items.filter((item) => !books.includes(item)));
      }

      return books;
    }

    case 'REMOVE_BOOK': {
      return books.filter((book) => book.objectID !== objectID);
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

  const addBookToBag = (...items: Item[]) => {
    return dispatch({
      type: 'ADD_BOOK',
      items,
    });
  };

  const removeBookFromBag = (objectID: string) =>
    dispatch({
      type: 'REMOVE_BOOK',
      objectID,
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
