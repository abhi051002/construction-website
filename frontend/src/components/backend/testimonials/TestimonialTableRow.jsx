import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useGetToken from "../../../hooks/useGetToken";

const TestimonialTableRow = ({
  testimonial,
  columns,
  windowWidth,
  onDelete,
}) => {
  const { token } = useGetToken();
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete?")) {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/testimonials/${testimonial.id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      if (result.status) {
        onDelete();
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };
  return (
    <tr>
      {columns.map((column) => {
        switch (column.key) {
          case "id":
            return <td key={column.key}>{testimonial.id}</td>;
          case "testimonial":
            return <td key={column.key}>{testimonial.testimonial}</td>;
          case "citation":
            return <td key={column.key}>{testimonial.citation}</td>;
          case "status":
            return (
              <td key={column.key}>
                <span
                  className={`badge ${
                    testimonial.status ? "bg-success" : "bg-danger"
                  } rounded-pill px-2 py-1`}
                >
                  {testimonial.status ? "Active" : "Block"}
                </span>
              </td>
            );
          case "actions":
            return (
              <td key={column.key}>
                <div className="d-flex flex-wrap">
                  <Link
                    to={`/admin/testimonials/edit/${testimonial.id}`}
                    className="btn btn-primary btn-sm me-1 mb-1"
                  >
                    {windowWidth < 400 ? "E" : "Edit"}
                  </Link>
                  <Link
                    to="#"
                    onClick={handleDelete}
                    className="btn btn-secondary btn-sm mb-1"
                  >
                    {windowWidth < 400 ? "D" : "Delete"}
                  </Link>
                </div>
              </td>
            );
          default:
            return null;
        }
      })}
    </tr>
  );
};

export default TestimonialTableRow;
