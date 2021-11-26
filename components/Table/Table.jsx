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
      <div className="row mt-3 mr-sm-0 mr-2">
        <div className="table-pagination pagination-custom col-12 col-md-8 overflow-auto">{pagination}</div>
        <div className="table-total col-12 col-md-4 mt-3 d-flex justify-content-md-end">
          <div className="d-flex align-items-center justify-content-sm-end justify-content-start">
              <select
                className="form-control select-limit-table"
                id="exampleFormControlSelect2"
                onChange={onChangeLimit}
              >
                <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
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
