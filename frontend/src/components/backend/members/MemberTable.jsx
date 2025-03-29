import React from "react";
import MemberTableRow from "./MemberTableRow";

const MemberTable = ({ members, windowWidth, searchTerm, onDelete }) => {
  // Get responsive column configuration
  const getColumns = () => {
    if (windowWidth < 576) {
      return [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "actions", label: "Actions" },
      ];
    } else if (windowWidth < 768) {
      return [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "status", label: "Status" },
        { key: "actions", label: "Actions" },
      ];
    } else {
      return [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "job_title", label: "Job Title" },
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
          {members.length > 0 ? (
            members.map((member) => (
              <MemberTableRow
                key={member.id}
                member={member}
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
                  ? "No matching members found"
                  : "No Members Available"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MemberTable;
