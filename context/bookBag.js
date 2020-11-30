import React from "react";

const BookBagContext = React.createContext([]);

function reducer(books = [], { type, isbn }) {
  switch (type) {
    case "ADD_BOOK": {
      if (!books.includes(isbn)) {
        return books.concat(isbn);
      }

      return books;
    }

    case "REMOVE_BOOK": {
      return books.filter((book) => book !== isbn);
    }

    case "CLEAR_BAG": {
      return [];
    }

    default:
      return books;
  }
}

export default function BookBagProvider(props) {
  const [books, dispatch] = React.useReducer(reducer, []);

  const addBookToBag = (isbn) =>
    dispatch({
      type: "ADD_BOOK",
      isbn,
    });

  const removeBookFromBag = (isbn) =>
    dispatch({
      type: "REMOVE_BOOK",
      isbn,
    });

  const clearBag = () => dispatch({ type: "CLEAR_BAG" });

  const value = {
    books,
    addBookToBag,
    removeBookFromBag,
    clearBag,
  };

  return <BookBagContext.Provider value={value} {...props} />;
}

export const useBookBag = () => React.useContext(BookBagContext);
