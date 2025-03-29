import { useState, useEffect } from "react";

const useGetTestimonialsData = (token) => {
  const [allTestimonials, setAllTestimonials] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [displayedTestimonials, setDisplayedTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [searchTerm, setSearchTerm] = useState("");

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      if (token) {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/testimonials`,
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
          const testimonials = data.data || [];
          setAllTestimonials(testimonials);
          setFilteredTestimonials(testimonials);

          const calculatedPages = Math.ceil(testimonials.length / pageSize);
          setTotalPages(calculatedPages || 1);

          // Paginate the data
          paginateData(testimonials, currentPage, pageSize);
        }
      }
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      setError("Failed to load testimonials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const paginateData = (data, page, size) => {
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const paginatedData = data.slice(startIndex, endIndex);
    setDisplayedTestimonials(paginatedData);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    paginateData(filteredTestimonials, page, pageSize);
  };

  const handlePageSizeChange = (newSize) => {
    const newPageSize = Number(newSize);
    setPageSize(newPageSize);

    const newTotalPages = Math.ceil(filteredTestimonials.length / newPageSize);
    setTotalPages(newTotalPages);

    // Reset to first page
    setCurrentPage(1);
    // Paginate with new page size
    paginateData(filteredTestimonials, 1, newPageSize);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);

    let results = allTestimonials;
    if (term.trim() !== "") {
      results = allTestimonials.filter(
        (testimonial) =>
          testimonial.testimonial.toLowerCase().includes(term.toLowerCase()) ||
          testimonial.citation.toLowerCase().includes(term.toLowerCase()) ||
          String(testimonial.id).includes(term)
      );
    }

    setFilteredTestimonials(results);

    // Recalculate pagination
    const newTotalPages = Math.ceil(results.length / pageSize);
    setTotalPages(newTotalPages || 1);

    // Reset to first page when searching
    setCurrentPage(1);
    paginateData(results, 1, pageSize);
  };

  const handleRefresh = () => {
    fetchTestimonials();
    setSearchTerm("");
  };

  useEffect(() => {
    if (token) {
      fetchTestimonials();
    }
  }, [token]);

  return {
    allTestimonials,
    filteredTestimonials,
    displayedTestimonials,
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

export default useGetTestimonialsData;
