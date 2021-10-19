import React from "react";
import _ from "lodash";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    
    
      <td className="pagination" >
        {pages.map(page => (
          <button 
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
            onClick={() => onPageChange(page)}
          >
            <a className="page-link" href='#' alt='' >
              {page}
            </a>
          </button>
        ))}
      </td>
   
  );
};



export default Pagination;
