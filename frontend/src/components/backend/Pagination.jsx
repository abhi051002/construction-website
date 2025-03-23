import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];

    // Always show first page
    pageNumbers.push(1);

    // Calculate range around current page
    const leftSibling = Math.max(2, currentPage - siblingCount);
    const rightSibling = Math.min(totalPages - 1, currentPage + siblingCount);

    // Add ellipsis if needed before current page range
    if (leftSibling > 2) {
      pageNumbers.push("...");
    }

    // Add pages around current page
    for (let i = leftSibling; i <= rightSibling; i++) {
      if (i !== 1 && i !== totalPages) {
        pageNumbers.push(i);
      }
    }

    // Add ellipsis if needed after current page range
    if (rightSibling < totalPages - 1) {
      pageNumbers.push("...");
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  // Simplify display for very small screens
  const isSmallScreen = () => {
    return window.innerWidth < 400;
  };

  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Services pagination" className="pagination-nav">
      <ul className="pagination pagination-sm flex-wrap m-0">
        {/* Previous button */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>

        {/* Page numbers - hide on very small screens */}
        {!isSmallScreen() &&
          getPageNumbers().map((page, index) => (
            <li
              key={index}
              className={`page-item ${page === currentPage ? "active" : ""} ${
                page === "..." ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => page !== "..." && onPageChange(page)}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            </li>
          ))}

        {/* Page count for very small screens */}
        {isSmallScreen() && (
          <li className="page-item disabled">
            <span className="page-link border-0 bg-transparent">
              {currentPage} / {totalPages}
            </span>
          </li>
        )}

        {/* Next button */}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
