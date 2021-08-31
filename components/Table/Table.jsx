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
        <div className="table-pagination pagination-custom">{pagination}</div>
        <div className="table-total ml-auto">
          <div className="row">
            <div className="col-4 mr-0 p-0">
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
            </div>
            <div className="col-8 my-auto">
              <p className="align-middle mt-3 ml-3 title-sum-data">
                Total data {totalData}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
