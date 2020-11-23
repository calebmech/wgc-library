import googleBooks from "../public/google-books.json";
import Fuse from "fuse.js";

const books = Object.values(googleBooks).map((book) => ({
  ...book.volumeInfo,
  authors: book.volumeInfo?.authors?.join(", "),
}));

const options = {
  keys: [
    {
      name: "title",
      weight: 1,
    },
    {
      name: "authors",
      weight: 0.8,
    },
    {
      name: "subtitle",
      weight: 0.7,
    },
    {
      name: "description",
      weight: 0.3,
    },
  ],
};
const fuse = new Fuse(books, options);

function handleEvent(event) {
  const fuseResults = fuse.search(event.data);

  self.postMessage(fuseResults.map(({ item }) => item));
}

self.addEventListener("message", handleEvent);
