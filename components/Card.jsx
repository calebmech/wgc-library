import React from 'react';
import Image from 'next/image';

const lineLimitStyles = {
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
}

export default function Card({ book }) {
  const { title, subtitle, authors, description, imageLinks } = book;

  const [expanded, setExpanded] = React.useState(false);
  

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

        <footer className="flex mt-3 mb-1">
          <button className="bg-blue-500 text-gray-100 py-1 px-2 rounded-md text-sm mr-2">
            <svg className="h-4 mr-2 mb-0.5 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
            </svg>
            <span>Add to bag</span>
          </button>
          <button className="bg-gray-300 text-gray-900 py-1 px-2 rounded-md text-sm mr-2" onClick={() => setExpanded(!expanded)}>
          <svg className="h-4 mr-2 mb-0.5 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Learn more
          </button>
          
        </footer>
      </div>
    </article>
  )
}