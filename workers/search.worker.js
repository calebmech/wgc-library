import Fuse from "fuse.js";

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
      name: "categories",
      weight: 0.5,
    },
    {
      name: "description",
      weight: 0.3,
    },
  ],
  ignoreLocation: true,
  threshold: 0.4,
};

let database, fuse, books;

function handleEvent(event) {
  const isQuery = typeof event.data === "string";

  if (isQuery) {
    if (!database) {
      return;
    }

    if (event.data.length === 0) {
      self.postMessage(books);
    } else {
      const fuseResults = fuse.search(event.data);

      self.postMessage(fuseResults.map(({ item }) => item));
    }
  } else if (!database) {
    database = event.data;

    books = Object.entries(database).map(([isbn, book]) => ({
      ...book.volumeInfo,
      isbn,
    }));

    fuse = new Fuse(books, options);
  }
}

self.addEventListener("message", handleEvent);
