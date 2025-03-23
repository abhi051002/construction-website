import React, { useEffect, useState, useCallback } from "react";
import Sidebar from "../../Sidebar";
import useGetToken from "../../../hooks/useGetToken";
import { Briefcase, PlusCircleIcon, Search, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";

const Show = () => {
  const { token } = useGetToken();
  const [allServices, setAllServices] = useState([]);
  const [displayedServices, setDisplayedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    } catch (error) {
      console.error("Error fetching services:", error);
      setError("Failed to load services. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to paginate data
  const paginateData = useCallback((data, page, size) => {
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const paginatedData = data.slice(startIndex, endIndex);
    setDisplayedServices(paginatedData);
  }, []);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    paginateData(filteredServices, page, pageSize);
  };

  // Handle page size change
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

  // Handle search functionality
  const handleSearch = useCallback(
    (term) => {
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
    },
    [allServices, pageSize, paginateData]
  );

  // Handle refresh
  const handleRefresh = () => {
    fetchServices();
    setSearchTerm("");
  };

  useEffect(() => {
    fetchServices();
  }, [token]);

  // Get responsive column configuration
  const getResponsiveColumns = () => {
    if (windowWidth < 576) {
      return [
        { key: "id", label: "ID" },
        { key: "title", label: "Name" },
        { key: "actions", label: "Actions" },
      ];
    } else if (windowWidth < 768) {
      return [
        { key: "id", label: "ID" },
        { key: "title", label: "Name" },
        { key: "status", label: "Status" },
        { key: "actions", label: "Actions" },
      ];
    } else {
      return [
        { key: "id", label: "ID" },
        { key: "title", label: "Name" },
        { key: "slug", label: "Slug" },
        { key: "status", label: "Status" },
        { key: "actions", label: "Actions" },
      ];
    }
  };

  const columns = getResponsiveColumns();

  return (
    <main className="dashboard-container bg-light py-4">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-3">
            <Sidebar activePage="services" />
          </div>
          <div className="col-lg-9">
            <div className="card shadow border-0">
              <div className="card-body p-3 p-md-4">
                <div className="d-flex flex-wrap justify-content-between mb-3">
                  <h4 className="h5 d-flex align-items-center mb-3 mb-sm-0">
                    <Briefcase
                      size={windowWidth < 576 ? 20 : 28}
                      className="me-2"
                    />
                    Services
                  </h4>
                  <div className="d-flex flex-wrap">
                    <Link
                      to="create"
                      className="btn btn-primary btn-sm d-flex align-items-center me-2 mb-2 mb-sm-0"
                    >
                      <PlusCircleIcon
                        size={windowWidth < 576 ? 16 : 20}
                        className="me-1"
                      />
                      <span>Create</span>
                    </Link>
                    <button
                      className="btn btn-outline-secondary btn-sm d-flex align-items-center mb-2 mb-sm-0 me-2"
                      onClick={handleRefresh}
                      title="Refresh"
                    >
                      <RefreshCw size={windowWidth < 576 ? 16 : 20} />
                    </button>
                  </div>
                </div>

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
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </div>

                  <select
                    className="form-select form-select-sm mb-2 mb-md-0"
                    value={pageSize}
                    onChange={(e) => handlePageSizeChange(e.target.value)}
                    style={{ width: "auto" }}
                  >
                    <option value="5">5 per page</option>
                    <option value="10">10 per page</option>
                    <option value="25">25 per page</option>
                    <option value="50">50 per page</option>
                  </select>
                </div>

                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : error ? (
                  <div className="alert alert-danger">{error}</div>
                ) : (
                  <>
                    <div className="table-responsive">
                      <table className="table table-striped table-hover">
                        <thead>
                          <tr>
                            {columns.map((column) => (
                              <th key={column.key}>{column.label}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {displayedServices && displayedServices.length > 0 ? (
                            displayedServices.map((service) => (
                              <tr key={service.id}>
                                {columns.map((column) => {
                                  switch (column.key) {
                                    case "id":
                                      return (
                                        <td key={column.key}>{service.id}</td>
                                      );
                                    case "title":
                                      return (
                                        <td key={column.key}>
                                          {service.title}
                                        </td>
                                      );
                                    case "slug":
                                      return (
                                        <td key={column.key}>{service.slug}</td>
                                      );
                                    case "status":
                                      return (
                                        <td key={column.key}>
                                          <span
                                            className={`badge ${
                                              service.status
                                                ? "bg-success"
                                                : "bg-danger"
                                            } rounded-pill px-2 py-1`}
                                          >
                                            {service.status
                                              ? "Active"
                                              : "Block"}
                                          </span>
                                        </td>
                                      );
                                    case "actions":
                                      return (
                                        <td key={column.key}>
                                          <div className="d-flex flex-wrap">
                                            <a
                                              href=""
                                              className="btn btn-primary btn-sm me-1 mb-1"
                                            >
                                              {windowWidth < 400 ? "E" : "Edit"}
                                            </a>
                                            <a
                                              href=""
                                              className="btn btn-secondary btn-sm mb-1"
                                            >
                                              {windowWidth < 400
                                                ? "D"
                                                : "Delete"}
                                            </a>
                                          </div>
                                        </td>
                                      );
                                    default:
                                      return null;
                                  }
                                })}
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan={columns.length}
                                className="text-center fw-bold text-danger py-4"
                              >
                                {searchTerm
                                  ? "No matching services found"
                                  : "No Service Available"}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination footer */}
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3">
                      {filteredServices.length > 0 && (
                        <div className="text-muted small mb-2 mb-md-0">
                          Showing{" "}
                          {displayedServices.length > 0
                            ? (currentPage - 1) * pageSize + 1
                            : 0}{" "}
                          to{" "}
                          {Math.min(
                            currentPage * pageSize,
                            filteredServices.length
                          )}{" "}
                          of {filteredServices.length} entries
                          {searchTerm &&
                            ` (filtered from ${allServices.length} total entries)`}
                        </div>
                      )}

                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Show;
