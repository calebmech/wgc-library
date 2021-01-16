import React, { useEffect } from 'react';

interface BookBagContextType {
  books: string[];
  addBookToBag: (book: string) => void;
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
}

function reducer(books: string[] = [], { type, isbn }: ActionType) {
  switch (type) {
    case 'ADD_BOOK': {
      if (isbn && !books.includes(isbn)) {
        return books.concat(isbn);
      }

      return books;
    }

    case 'REMOVE_BOOK': {
      return books.filter((book) => book !== isbn);
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

  const [books, dispatch] = React.useReducer(reducer, storedBooks ? JSON.parse(storedBooks) : []);

  useEffect(() => {
    globalThis.window?.localStorage.setItem('bag', JSON.stringify(books));
  }, [books]);

  const addBookToBag = (isbn: string) =>
    dispatch({
      type: 'ADD_BOOK',
      isbn,
    });

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
