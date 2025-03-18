import React from "react";

const NotFound = () => {
  return (
    <div className="container">
      <div
        className="d-flex flex-column justify-content-center align-items-center py-5"
        style={{
          minHeight: "calc(100vh - 504px)",
          margin: "0 auto",
        }}
      >
        <h1 className="display-1 mb-3 text-center">404</h1>
        <h2 className="mb-3 text-center">Page Not Found</h2>
        <p className="mb-4 text-center">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <a href="/" className="btn btn-danger px-4 py-2">
          GO TO HOMEPAGE
        </a>
      </div>
    </div>
  );
};

export default NotFound;
