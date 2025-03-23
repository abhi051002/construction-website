import React, { useState, useEffect } from "react";
import Sidebar from "../../Sidebar";
import useGetToken from "../../../hooks/useGetToken";
import useServicesData from "../../../hooks/useServiceData";
import ServiceHeader from "./ServiceHeader";
import SearchAndFilter from "./SearchAndFilter";
import ServiceTable from "./ServiceTable";
import Pagination from "../Pagination";
import PaginationInfo from "./PaginationInfo";
import LoadingSpinner from "./LoadingSpinner";
import ErrorDisplay from "./ErrorDisplay";

const Show = () => {
  const { token } = useGetToken();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Use custom hook for services data
  const {
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
  } = useServicesData(token);

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
                {/* Header Component */}
                <ServiceHeader
                  windowWidth={windowWidth}
                  onRefresh={handleRefresh}
                />

                {/* Search and Filter Component */}
                <SearchAndFilter
                  searchTerm={searchTerm}
                  onSearch={handleSearch}
                  pageSize={pageSize}
                  onPageSizeChange={handlePageSizeChange}
                />

                {/* Content Area */}
                {loading ? (
                  <LoadingSpinner />
                ) : error ? (
                  <ErrorDisplay message={error} />
                ) : (
                  <>
                    {/* Table Component */}
                    <ServiceTable
                      services={displayedServices}
                      windowWidth={windowWidth}
                      searchTerm={searchTerm}
                      onDelete={handleRefresh}
                    />

                    {/* Pagination Section */}
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3">
                      {filteredServices.length > 0 && (
                        <PaginationInfo
                          currentPage={currentPage}
                          pageSize={pageSize}
                          filteredCount={filteredServices.length}
                          totalCount={allServices.length}
                          displayedCount={displayedServices.length}
                          searchTerm={searchTerm}
                        />
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
