import React from "react";
import { Table } from "react-bootstrap";
import Pagination from "react-js-pagination";

export default function Tables({
  tableHead,
  tableBody,
  pagination,
  onChangeLimit,
  totalData,
}) {
  return (
    <div className="table-page mt-5">
      <div className="table-responsive">
        <Table className="table table-separate table-head-custom table-checkable">
          <thead className="thead">{tableHead}</thead>
          <tbody>{tableBody}</tbody>
        </Table>
      </div>
      <div className="row mt-3">
        <div className="table-pagination pagination-custom col-12 col-md-6">{pagination}</div>
        <div className="table-total col-12 col-md-6">
          <div className="d-flex align-items-center justify-content-end">
              <select
                className="form-control select-limit-table"
                id="exampleFormControlSelect2"
                onChange={onChangeLimit}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
              <p className="align-middle ml-3 mb-0 title-sum-data">
                Total data {totalData}
              </p>
          </div>
        </div>
      </div>
    </div>
  );
}
