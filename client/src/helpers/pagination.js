/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo } from "react";

const PaginationComponent = ({
  total = 0,
  itemsPerPage = 5,
  currentPage = 1,
  onPageChange,
}) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (total > 0 && itemsPerPage > 0)
      setTotalPages(Math.ceil(total / itemsPerPage));
  }, [total, itemsPerPage]);

  const paginationItems = useMemo(() => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li className="page-item" key={i} onClick={() => onPageChange(i)}>
          <a href="#" aria-current="page" className="page-link">
            {i}
          </a>
        </li>
      );
    }

    return pages;
  }, [totalPages, currentPage]);

  if (totalPages === 0) return null;

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={`page-item  ${currentPage === 1 && "disabled"}`}>
          <a
            className="page-link"
            href="#"
            tabIndex="-1"
            aria-disabled={true && currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            {"<<"}
          </a>
        </li>
        {paginationItems}

        <li className={`page-item  ${currentPage === totalPages && "disabled"}`}>
          <a
            className="page-link"
            href="#"
            aria-disabled={true && currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            {">>"}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationComponent;
