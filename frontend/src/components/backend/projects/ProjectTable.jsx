import React from "react";
import ProjectTableRow from "./ProjectTableRow";

const ProjectTable = ({ projects, windowWidth, searchTerm, onDelete }) => {
  // Get responsive column configuration
  const getColumns = () => {
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

  const columns = getColumns();

  return (
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
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectTableRow
                key={project.id}
                project={project}
                columns={columns}
                windowWidth={windowWidth}
                onDelete={onDelete}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center fw-bold text-danger py-4"
              >
                {searchTerm
                  ? "No matching projects found"
                  : "No Projects Available"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
