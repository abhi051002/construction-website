import React from "react";
import { MessageCircleCode, PlusCircleIcon, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

const TestimonialHeader = ({ windowWidth, onRefresh }) => {
  return (
    <div className="d-flex flex-wrap justify-content-between mb-3">
      <h4 className="h5 d-flex align-items-center mb-3 mb-sm-0">
        <MessageCircleCode
          size={windowWidth < 576 ? 20 : 28}
          className="me-2"
        />
        Testimonials
      </h4>
      <div className="d-flex flex-wrap">
        <Link
          to="create"
          className="btn btn-primary btn-sm d-flex align-items-center me-2 mb-2 mb-sm-0"
        >
          <PlusCircleIcon size={windowWidth < 576 ? 16 : 20} className="me-1" />
          <span>Create</span>
        </Link>
        <button
          className="btn btn-outline-secondary btn-sm d-flex align-items-center mb-2 mb-sm-0 me-2"
          onClick={onRefresh}
          title="Refresh"
        >
          <RefreshCw size={windowWidth < 576 ? 16 : 20} />
        </button>
      </div>
    </div>
  );
};

export default TestimonialHeader;
