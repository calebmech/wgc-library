import React from 'react';
import Image from 'next/image';
import Chip from './system/Chip'
import { useBookBag } from '../context/bookBag';

const lineLimitStyles = {
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
}

export default function Card({ book }) {
  const { title, subtitle, authors, description, imageLinks, isbn, categories, publishedDate, pageCount } = book;

  const [expanded, setExpanded] = React.useState(false);

  const { addBookToBag } = useBookBag();
  
  return (
    <article className="border rounded-lg flex my-3 overflow-hidden">
      {imageLinks && 
        <div className="relative h-auto w-28 flex-none border-r">
          <Image src={imageLinks.thumbnail} layout="fill" objectFit="contain" className="object-middle" />
        </div>
      }

      <div className="py-3 px-5 bg-white w-full">
        <header className="leading-normal">
          <h1 className="text-lg font-semibold">{title}{subtitle && `: ${subtitle}`}</h1>
          <h2 className="text-gray-600">{authors}</h2>
        </header>
        <p className="mt-1 text-gray-900 overflow-hidden" style={expanded ? {} : lineLimitStyles}>
          {description}
        </p>

        {expanded && (
          <div className="my-3"> 
            <Chip title="Publish date">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 mr-1.5">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {publishedDate}
            </Chip>
            <Chip title="Page count">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 mr-1.5">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              {pageCount}
            </Chip>
            {

              categories.map(category => (
                <Chip title="Category">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 mr-1.5">
                    <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  {category}
                </Chip>
              ))}
          </div>
        )}

        <footer className="flex mt-3 mb-1">
          <button onClick={() => addBookToBag(isbn)} className="bg-blue-500 text-gray-100 py-1 px-2 rounded-md text-sm mr-2">
            <svg className="h-4 mr-2 mb-0.5 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
            </svg>
            <span>Add to bag</span>
          </button>
          <button className="bg-gray-200 text-gray-900 py-1 px-2 rounded-md text-sm mr-2" onClick={() => setExpanded(!expanded)}>
          <svg className="h-4 mr-2 mb-0.5 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            {expanded ? 'Less' : 'More' } information
          </button>
          
        </footer>
      </div>
    </article>
  )
}