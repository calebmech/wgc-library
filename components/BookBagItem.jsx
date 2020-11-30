import Image from 'next/image';

const BookBagItem = ({
  title, authors, cover, onRemove
}) => (
  <div className="flex justify-between">
    <div className="flex">
      <div className="relative h-auto w-8 flex-none mr-3">
        <Image
          layout="fill"
          objectFit="contain"
          className="object-left"
          src={cover}
        />
      </div>
      <div>
        {title}
        <br />
        <span className="text-gray-600">{authors?.join(", ") || "\xa0"}</span>
      </div>
    </div>

    <button className="w-6" onClick={onRemove}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
  </div>
)

export default BookBagItem;