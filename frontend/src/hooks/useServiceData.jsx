import { useState, useEffect } from "react";

const useServicesData = (token) => {
  const [allServices, setAllServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [displayedServices, setDisplayedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [searchTerm, setSearchTerm] = useState("");

  const fetchServices = async () => {
    try {
      setLoading(true);
      if (token) {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/services`,
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
          const services = data.data || [];
          setAllServices(services);
          setFilteredServices(services);

          const calculatedPages = Math.ceil(services.length / pageSize);
          setTotalPages(calculatedPages || 1);

          // Paginate the data
          paginateData(services, currentPage, pageSize);
        }
      }
    } catch (err) {
      console.error("Error fetching services:", err);
      setError("Failed to load services. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const paginateData = (data, page, size) => {
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const paginatedData = data.slice(startIndex, endIndex);
    setDisplayedServices(paginatedData);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    paginateData(filteredServices, page, pageSize);
  };

  const handlePageSizeChange = (newSize) => {
    const newPageSize = Number(newSize);
    setPageSize(newPageSize);

    const newTotalPages = Math.ceil(filteredServices.length / newPageSize);
    setTotalPages(newTotalPages);

    // Reset to first page
    setCurrentPage(1);
    // Paginate with new page size
    paginateData(filteredServices, 1, newPageSize);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);

    let results = allServices;
    if (term.trim() !== "") {
      results = allServices.filter(
        (service) =>
          service.title.toLowerCase().includes(term.toLowerCase()) ||
          service.slug.toLowerCase().includes(term.toLowerCase()) ||
          String(service.id).includes(term)
      );
    }

    setFilteredServices(results);

    // Recalculate pagination
    const newTotalPages = Math.ceil(results.length / pageSize);
    setTotalPages(newTotalPages || 1);

    // Reset to first page when searching
    setCurrentPage(1);
    paginateData(results, 1, pageSize);
  };

  const handleRefresh = () => {
    fetchServices();
    setSearchTerm("");
  };

  useEffect(() => {
    if (token) {
      fetchServices();
    }
  }, [token]);

  return {
    allServices,
    filteredServices,
    displayedServices,
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

export default useServicesData;
