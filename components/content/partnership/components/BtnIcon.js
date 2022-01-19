import React from "react";

export default function BtnIcon({ onClick, className, children }) {
  return (
    <button
      className={`btn btn-link-action position-relative btn-delete ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
