import { useState, useEffect } from "react";

const useGetProjectsData = (token) => {
  const [allProjects, setAllProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [searchTerm, setSearchTerm] = useState("");

  const fetchProjects = async () => {
    try {
      setLoading(true);
      if (token) {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/projects`,
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
          const projects = data.data || [];
          setAllProjects(projects);
          setFilteredProjects(projects);

          const calculatedPages = Math.ceil(projects.length / pageSize);
          setTotalPages(calculatedPages || 1);

          // Paginate the data
          paginateData(projects, currentPage, pageSize);
        }
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const paginateData = (data, page, size) => {
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const paginatedData = data.slice(startIndex, endIndex);
    setDisplayedProjects(paginatedData);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    paginateData(filteredProjects, page, pageSize);
  };

  const handlePageSizeChange = (newSize) => {
    const newPageSize = Number(newSize);
    setPageSize(newPageSize);

    const newTotalPages = Math.ceil(filteredProjects.length / newPageSize);
    setTotalPages(newTotalPages);

    // Reset to first page
    setCurrentPage(1);
    // Paginate with new page size
    paginateData(filteredProjects, 1, newPageSize);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);

    let results = allProjects;
    if (term.trim() !== "") {
      results = allProjects.filter(
        (project) =>
          project.title.toLowerCase().includes(term.toLowerCase()) ||
          project.slug.toLowerCase().includes(term.toLowerCase()) ||
          String(project.id).includes(term)
      );
    }

    setFilteredProjects(results);

    // Recalculate pagination
    const newTotalPages = Math.ceil(results.length / pageSize);
    setTotalPages(newTotalPages || 1);

    // Reset to first page when searching
    setCurrentPage(1);
    paginateData(results, 1, pageSize);
  };

  const handleRefresh = () => {
    fetchProjects();
    setSearchTerm("");
  };

  useEffect(() => {
    if (token) {
      fetchProjects();
    }
  }, [token]);

  return {
    allProjects,
    filteredProjects,
    displayedProjects,
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

export default useGetProjectsData;
