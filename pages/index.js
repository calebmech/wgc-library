import isbnData from "../public/isbn.json";

// const BASE_URL = "https://www.googleapis.com/books/v1/"
const BASE_URL = "https://openlibrary.org/"

export default function Home({ isbns, books, }) {
  // console.log(isbns)
  // console.log(books)

  return (
    <div>
      <h1>Hello world!</h1>

      <ul>
        {
        books.map((book, i) => {
          let fullTitle = book.title
          if (book.subtitle) {
            fullTitle += ": " + book.subtitle
          }

          return (
            <li key={i}>{fullTitle}</li>
          );
        })
        }
      </ul>
    </div>
  )
}

export async function getStaticProps(context) {
  const isbns = isbnData;

  const responses = await Promise.all(isbns.map(isbn => {
    // return fetch(BASE_URL + `volumes?q=isbn:` + isbn).then(r => r.json())
    return fetch(BASE_URL + 'isbn/' + isbn + '.json').then(r => r.json()).catch(() => ({ totalItems: 0 }))
  }))


  console.log(responses);

  // const books = responses
  //   .filter(response => response.totalItems > 0)
  //   .map(response => response.items[0].volumeInfo)

  const books = responses
    
  // const leftOverBooks = responses
  //   .filter(response => response.totalItems === 0)

  // const leftOverResponses = await leftOverBooks.all(isbns.map(isbn => {
  //   return fetch(BASE_URL + `volumes?q=isbn:` + isbn).then(r => r.json())
  // }))

  return {
    props: {
      isbns,
      books,
    }
  }
}