import React, { useState, useEffect } from "react";
import Sidebar from "../../Sidebar";
import useGetToken from "../../../hooks/useGetToken";
import SearchAndFilter from "../services/SearchAndFilter";
import Pagination from "../Pagination";
import PaginationInfo from "../services/PaginationInfo";
import LoadingSpinner from "../services/LoadingSpinner";
import ErrorDisplay from "../services/ErrorDisplay";
import useGetProjectsData from "../../../hooks/useGetProjectsData";
import ProjectHeader from "./ProjectHeader";
import ProjectTable from "./ProjectTable";

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
  } = useGetProjectsData(token);

  return (
    <main className="dashboard-container bg-light py-4">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-3">
            <Sidebar activePage="projects" />
          </div>
          <div className="col-lg-9">
            <div className="card shadow border-0">
              <div className="card-body p-3 p-md-4">
                {/* Header Component */}
                <ProjectHeader
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
                    <ProjectTable
                      projects={displayedProjects}
                      windowWidth={windowWidth}
                      searchTerm={searchTerm}
                      onDelete={handleRefresh}
                    />

                    {/* Pagination Section */}
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3">
                      {filteredProjects.length > 0 && (
                        <PaginationInfo
                          currentPage={currentPage}
                          pageSize={pageSize}
                          filteredCount={filteredProjects.length}
                          totalCount={allProjects.length}
                          displayedCount={displayedProjects.length}
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
