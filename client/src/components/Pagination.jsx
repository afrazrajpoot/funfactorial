import React from 'react';
import { motion } from 'framer-motion';

const Pagination = ({ currentPage, totalItems, itemsPerPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="inline-flex items-center -space-x-px">
        <motion.li
          className={`px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ${
            currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="sr-only">Previous</span>
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </motion.li>
        {pageNumbers.map((number) => (
          <motion.li
            key={number}
            className={`px-3 py-2 leading-tight border ${
              number === currentPage
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-gray-700'
            }`}
            onClick={() => paginate(number)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {number}
          </motion.li>
        ))}
        <motion.li
          className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ${
            currentPage === pageNumbers.length ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
          onClick={() => currentPage < pageNumbers.length && paginate(currentPage + 1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="sr-only">Next</span>
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </motion.li>
      </ul>
    </nav>
  );
};

export default Pagination;