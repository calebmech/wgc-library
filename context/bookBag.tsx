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
  item?: Volume;
}

function reducer(books: Volume[] = [], { type, isbn, item }: ActionType) {
  switch (type) {
    case 'ADD_BOOK': {
      if (item && !books.includes(item)) {
        return books.concat(item);
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

export default function BookBagProvider(props: any) {
  const storedBooks = globalThis.window?.localStorage.getItem('bag');
  const parsedStoredBooks = storedBooks ? JSON.parse(storedBooks) : [];
  const verifiedStoredBooks = parsedStoredBooks.find((book: any) => typeof book === 'string') ? [] : parsedStoredBooks;

  const [books, dispatch] = React.useReducer(reducer, verifiedStoredBooks);

  useEffect(() => {
    globalThis.window?.localStorage.setItem('bag', JSON.stringify(books));
  }, [books]);

  const addBookToBag = (item: Volume) => {
    return dispatch({
      type: 'ADD_BOOK',
      item,
    });
  };

  const removeBookFromBag = (isbn: string) =>
    dispatch({
      type: 'REMOVE_BOOK',
      isbn,
    });

  const clearBag = () => dispatch({ type: 'CLEAR_BAG' });

  const value = {
    books,
    addBookToBag,
    removeBookFromBag,
    clearBag,
  };

  return <BookBagContext.Provider value={value} {...props} />;
}

export const useBookBag = () => React.useContext(BookBagContext);
