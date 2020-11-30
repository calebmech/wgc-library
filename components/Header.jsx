
import { useBookBag } from '../context/bookBag';
import useIsMobile from '../hooks/useIsMobile';

export default function Header({ bagOpen, setBagOpen }) {
  const { books } = useBookBag();
  const isMobile = useIsMobile();

  return (
    <header className="text-center flex justify-between">
      <div className="flex-1" />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex-3">
        WGC Library
      </h1>
      <div className="flex flex-1 flex-col justify-center items-end">
        {isMobile && (
          <button
            className="relative"
            onClick={() => setBagOpen(!bagOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {books.length > 0 && <div className="w-3 text-xs h-3 block text-white bg-red-600 absolute rounded-full -top-0.5 -right-0.5" />}
          </button>
        )}
      </div>
    </header>
  );
}