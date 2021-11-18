import React from "react";

export default function PaginationPeserta({
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  pageRangeDisplayed,
}) {
  const pagination = {
    display: "inline-block",
  };

  const page = {
    color: "#ADB5BD",
    float: "left",
    padding: "8px 16px",
    textDecoration: "none",
    transition: "background-color .3s",
    border: "1px solid #F2F7FC",
    borderRadius: "6px",
    margin: "0 4px",
    backgroundColor: "#F2F7FC",
  };

  const pageActive = {
    color: "#ffffff",
    float: "left",
    padding: "8px 16px",
    textDecoration: "none",
    transition: "background-color .3s",
    border: "1px solid #3699ff",
    borderRadius: "6px",
    margin: "0 4px",
    backgroundColor: "#3699ff",
  };

  const range = [];

  for (let i = activePage; i <= pageRangeDisplayed; i++) {
    range.push(activePage > pageRangeDisplayed ? activePage + pageRangeDisplayed : i);
  }

  const ranges = range.map((item) => {
    return (
      <a href="#" style={activePage === item ? pageActive : page} key={item}>
        {item}
      </a>
    );
  });

  return (
    <div className="pagination" style={pagination}>
      <a href="#" style={page}>
        &laquo;
      </a>
      <a href="#" style={page}>
        &lt;
      </a>

    {ranges}
      <a href="#" style={page}>
        &gt;
      </a>
      <a href="#" style={page}>
        &raquo;
      </a>
    </div>
  );
}
