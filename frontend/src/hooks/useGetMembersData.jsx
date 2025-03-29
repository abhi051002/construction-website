import { useState, useEffect } from "react";

const useGetMembersData = (token) => {
  const [allMembers, setAllMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [displayedMembers, setDisplayedMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [searchTerm, setSearchTerm] = useState("");

  const fetchMembers = async () => {
    try {
      setLoading(true);
      if (token) {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/members`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        if (data.status) {
          const members = data.data || [];
          setAllMembers(members);
          setFilteredMembers(members);

          const calculatedPages = Math.ceil(members.length / pageSize);
          setTotalPages(calculatedPages || 1);

          // Paginate the data
          paginateData(members, currentPage, pageSize);
        }
      }
    } catch (err) {
      console.error("Error fetching members:", err);
      setError("Failed to load members. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const paginateData = (data, page, size) => {
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const paginatedData = data.slice(startIndex, endIndex);
    setDisplayedMembers(paginatedData);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    paginateData(filteredMembers, page, pageSize);
  };

  const handlePageSizeChange = (newSize) => {
    const newPageSize = Number(newSize);
    setPageSize(newPageSize);

    const newTotalPages = Math.ceil(filteredMembers.length / newPageSize);
    setTotalPages(newTotalPages);

    // Reset to first page
    setCurrentPage(1);
    // Paginate with new page size
    paginateData(filteredMembers, 1, newPageSize);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);

    let results = allMembers;
    if (term.trim() !== "") {
      results = allMembers.filter(
        (member) =>
          member.name.toLowerCase().includes(term.toLowerCase()) ||
          member.job_title.toLowerCase().includes(term.toLowerCase()) ||
          String(member.id).includes(term)
      );
    }

    setFilteredMembers(results);

    // Recalculate pagination
    const newTotalPages = Math.ceil(results.length / pageSize);
    setTotalPages(newTotalPages || 1);

    // Reset to first page when searching
    setCurrentPage(1);
    paginateData(results, 1, pageSize);
  };

  const handleRefresh = () => {
    fetchMembers();
    setSearchTerm("");
  };

  useEffect(() => {
    if (token) {
      fetchMembers();
    }
  }, [token]);

  return {
    allMembers,
    filteredMembers,
    displayedMembers,
    loading,
    error,
    currentPage,
    totalPages,
    pageSize,
    searchTerm,
    handlePageChange,
    handlePageSizeChange,
    handleSearch,
    handleRefresh,
  };
};

export default useGetMembersData;
