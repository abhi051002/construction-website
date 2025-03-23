import React from "react";

const PaginationInfo = ({
  currentPage,
  pageSize,
  filteredCount,
  totalCount,
  displayedCount,
  searchTerm,
}) => {
  return (
    <div className="text-muted small mb-2 mb-md-0">
      Showing {displayedCount > 0 ? (currentPage - 1) * pageSize + 1 : 0} to{" "}
      {Math.min(currentPage * pageSize, filteredCount)} of {filteredCount}{" "}
      entries
      {searchTerm && ` (filtered from ${totalCount} total entries)`}
    </div>
  );
};

export default PaginationInfo;
