import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className='w-75 m-auto'>
      <ul className="d-flex w-50">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className=""
            onClick={() => paginate(number)}
            className="page-link"
          >
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
