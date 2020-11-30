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
      name: "description",
      weight: 0.3,
    },
  ],
  ignoreLocation: true,
};

let database, fuse;

function handleEvent(event) {
  const isQuery = typeof event.data === "string";

  if (isQuery) {
    if (!database) {
      return console.error("Database is not initialized");
    }

    const fuseResults = fuse.search(event.data);

    console.log(fuseResults);

    self.postMessage(fuseResults.map(({ item }) => item));
  } else if (!database) {
    database = event.data;

    const books = Object.entries(database).map(([isbn, book]) => ({
      ...book.volumeInfo,
      isbn,
      authors: book.volumeInfo?.authors?.join(", "),
    }));

    fuse = new Fuse(books, options);
  }
}

self.addEventListener("message", handleEvent);
