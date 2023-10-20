import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function PaginatedList({
  numberOfPages = 10,
}: {
  numberOfPages?: number;
}) {
  // Create an array of page numbers from 1 to numberOfPages
  const pageNumbers = Array.from(
    { length: numberOfPages },
    (_, index) => index + 1
  );

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      {/* ... Previous and Next buttons for small screens ... */}

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">{numberOfPages}</span> of{" "}
            <span className="font-medium">97</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <FaChevronLeft className="h-5 w-5" aria-hidden="true" />
            </a>
            {pageNumbers.map((pageNumber, index) => {
              if (index < 3 || index >= numberOfPages - 3) {
                return (
                  <a
                    key={pageNumber}
                    href="#"
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                      pageNumber === 1
                        ? "bg-primary text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    }`}
                  >
                    {pageNumber}
                  </a>
                );
              } else if (index === 3) {
                // Show ellipsis (...) after the first 3 page numbers
                return (
                  <span
                    key="ellipsis-start"
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                  >
                    ...
                  </span>
                );
              }
              // Hide other page numbers
              return null;
            })}
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover-bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <FaChevronRight className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
