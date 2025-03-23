import React from "react";
import { Search } from "lucide-react";

const SearchAndFilter = ({
  searchTerm,
  onSearch,
  pageSize,
  onPageSizeChange,
}) => {
  return (
    <div className="d-flex flex-wrap mb-3">
      <div
        className="input-group input-group-sm me-2 mb-2 mb-md-0"
        style={{ maxWidth: "300px" }}
      >
        <span className="input-group-text bg-white">
          <Search size={16} />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <select
        className="form-select form-select-sm mb-2 mb-md-0"
        value={pageSize}
        onChange={(e) => onPageSizeChange(e.target.value)}
        style={{ width: "auto" }}
      >
        <option value="5">5 per page</option>
        <option value="10">10 per page</option>
        <option value="25">25 per page</option>
        <option value="50">50 per page</option>
      </select>
    </div>
  );
};

export default SearchAndFilter;
