import React from "react";

const ServiceTableRow = ({ service, columns, windowWidth }) => {
  return (
    <tr>
      {columns.map((column) => {
        switch (column.key) {
          case "id":
            return <td key={column.key}>{service.id}</td>;
          case "title":
            return <td key={column.key}>{service.title}</td>;
          case "slug":
            return <td key={column.key}>{service.slug}</td>;
          case "status":
            return (
              <td key={column.key}>
                <span
                  className={`badge ${
                    service.status ? "bg-success" : "bg-danger"
                  } rounded-pill px-2 py-1`}
                >
                  {service.status ? "Active" : "Block"}
                </span>
              </td>
            );
          case "actions":
            return (
              <td key={column.key}>
                <div className="d-flex flex-wrap">
                  <a href="" className="btn btn-primary btn-sm me-1 mb-1">
                    {windowWidth < 400 ? "E" : "Edit"}
                  </a>
                  <a href="" className="btn btn-secondary btn-sm mb-1">
                    {windowWidth < 400 ? "D" : "Delete"}
                  </a>
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

export default ServiceTableRow;
