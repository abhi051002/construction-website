import React from "react";

const ErrorDisplay = ({ message }) => {
  return <div className="alert alert-danger">{message}</div>;
};

export default ErrorDisplay;
