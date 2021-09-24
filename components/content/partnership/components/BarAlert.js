import React from "react";

// alert-light-success
// alert-light-danger
// alert-light-warning
// alert-light-primary
// alert-light-dark
// alert-light-info

export default function AlertBar({ className, text, onClick }) {
  return (
    <div
      className={`alert alert-custom ${className} fade show mb-5`}
      role="alert"
    >
      <div className="alert-icon">
        <i className="flaticon-warning"></i>
      </div>
      <div className="alert-text">{text}</div>
      <div className="alert-close">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={onClick}
        >
          <span aria-hidden="true">
            <i className="ki ki-close"></i>
          </span>
        </button>
      </div>
    </div>
  );
}
