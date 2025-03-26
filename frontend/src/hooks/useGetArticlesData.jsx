import { useState, useEffect } from "react";

const useGetArticlesData = (token) => {
  const [allArticles, setAllArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [searchTerm, setSearchTerm] = useState("");

  const fetchArticles = async () => {
    try {
      setLoading(true);
      if (token) {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/articles`,
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
          const articles = data.data || [];
          setAllArticles(articles);
          setFilteredArticles(articles);

          const calculatedPages = Math.ceil(articles.length / pageSize);
          setTotalPages(calculatedPages || 1);

          // Paginate the data
          paginateData(articles, currentPage, pageSize);
        }
      }
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Failed to load articles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const paginateData = (data, page, size) => {
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const paginatedData = data.slice(startIndex, endIndex);
    setDisplayedArticles(paginatedData);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    paginateData(filteredArticles, page, pageSize);
  };

  const handlePageSizeChange = (newSize) => {
    const newPageSize = Number(newSize);
    setPageSize(newPageSize);

    const newTotalPages = Math.ceil(filteredArticles.length / newPageSize);
    setTotalPages(newTotalPages);

    // Reset to first page
    setCurrentPage(1);
    // Paginate with new page size
    paginateData(filteredArticles, 1, newPageSize);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);

    let results = allArticles;
    if (term.trim() !== "") {
      results = allArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(term.toLowerCase()) ||
          article.slug.toLowerCase().includes(term.toLowerCase()) ||
          String(article.id).includes(term)
      );
    }

    setFilteredArticles(results);

    // Recalculate pagination
    const newTotalPages = Math.ceil(results.length / pageSize);
    setTotalPages(newTotalPages || 1);

    // Reset to first page when searching
    setCurrentPage(1);
    paginateData(results, 1, pageSize);
  };

  const handleRefresh = () => {
    fetchArticles();
    setSearchTerm("");
  };

  useEffect(() => {
    if (token) {
      fetchArticles();
    }
  }, [token]);

  return {
    allArticles,
    filteredArticles,
    displayedArticles,
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

export default useGetArticlesData;
