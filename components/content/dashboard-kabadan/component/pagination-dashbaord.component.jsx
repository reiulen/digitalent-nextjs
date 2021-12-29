import React from "react";
import Pagination from "react-js-pagination";

const PaginationDashboard = ({
  total = 0,
  perPage = 0,
  title = "-",
  activePage = 1,
  funcPagination,
}) => {
  return (
    <div className="pagination-global d-flex justify-content-between mt-auto align-items-center flex-wrap">
      <div className="count">
        <p className="text-dashboard-neutral">
          Total:{" "}
          <span className="fw-600">
            {" "}
            {total} {title}
          </span>
        </p>
      </div>
      <div className="table-pagination table-pagination pagination-custom mt-0">
        <Pagination
          activePage={activePage}
          itemsCountPerPage={perPage}
          totalItemsCount={total}
          pageRangeDisplayed={2}
          onChange={funcPagination}
          nextPageText={">"}
          prevPageText={"<"}
          firstPageText={"<<"}
          lastPageText={">>"}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    </div>
  );
};

export default PaginationDashboard;
