import React from "react";
import ServiceTableRow from "./ServiceTableRow";

const ServiceTable = ({ services, windowWidth, searchTerm, onDelete }) => {
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
          {services.length > 0 ? (
            services.map((service) => (
              <ServiceTableRow
                key={service.id}
                service={service}
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
                  ? "No matching services found"
                  : "No Service Available"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceTable;
