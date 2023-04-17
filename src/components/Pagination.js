import React from "react";
import styles from "@/styles/Pagination.module.css";

const Pagination = ({ currentPage, onPageChange, totalPages, setPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  return (
    <nav className={styles.pagination}>
      <ul>
        {pageNumbers.map((page) => (
          <li key={page}>
            <button
              className={`${styles.pageLink} ${
                page === currentPage ? styles.active : ""
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
          <li>
            <button className={styles.pageLink} 
              onClick={() => setPage(currentPage + 1)}
              >Next Page</button>
          </li>
      </ul>
    </nav>
  );
};

export default Pagination;
