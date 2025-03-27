import React from "react";
import TestimonialTableRow from "./TestimonialTableRow";

const TestimonialTable = ({
  testimonials,
  windowWidth,
  searchTerm,
  onDelete,
}) => {
  // Get responsive column configuration
  const getColumns = () => {
    if (windowWidth < 576) {
      return [
        { key: "id", label: "ID" },
        { key: "testimonial", label: "Testimonial" },
        { key: "actions", label: "Actions" },
      ];
    } else if (windowWidth < 768) {
      return [
        { key: "id", label: "ID" },
        { key: "testimonial", label: "Testimonial" },
        { key: "status", label: "Status" },
        { key: "actions", label: "Actions" },
      ];
    } else {
      return [
        { key: "id", label: "ID" },
        { key: "testimonial", label: "Testimonial" },
        { key: "citation", label: "Citation" },
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
          {testimonials.length > 0 ? (
            testimonials.map((testimonial) => (
              <TestimonialTableRow
                key={testimonial.id}
                testimonial={testimonial}
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
                  ? "No matching testimonials found"
                  : "No Testimonial Available"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TestimonialTable;
