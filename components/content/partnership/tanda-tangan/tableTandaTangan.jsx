import React, { useState, useEffect } from "react";

import Link from "next/link";
import Pagination from "react-js-pagination";

import PageWrapper from "../../../wrapper/page.wrapper";
import ButtonAction from "../../../ButtonAction";

const TableTandaTangan = () => {
  return (
    <PageWrapper>
      <div className="col-lg-12 col-xxl-4 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              Tanda Tangan Digital
            </h3>
            <div className="card-toolbar">
              <Link href="/partnership/manajemen-kerjasama/tambah">
                <a
                  className="btn px-6 font-weight-bold btn-block"
                  style={{
                    color: "#FFFFFF !important",
                    backgroundColor: "#40A9FF",
                  }}
                >
                  Tambah Tanda Tangan
                </a>
              </Link>
            </div>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-10 col-xl-10">
                  <div className="row align-items-center">
                    <div className="col-md-12 my-2 my-md-0">
                      <div className="input-icon">
                        <input
                          style={{ background: "#F3F6F9", border: "none" }}
                          type="text"
                          className="form-control"
                          placeholder="Pencarian"
                          id="kt_datatable_search_query"
                        />
                        <span>
                          <i className="flaticon2-search-1 text-muted"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-xl-2 mt-5 mt-lg-0">
                  <a
                    href="#"
                    className="btn btn-light-primary px-6 font-weight-bold btn-block"
                  >
                    Cari
                  </a>
                </div>
              </div>
            </div>

            <div className="table-page mt-5">
              <div className="table-responsive">
                <table className="table table-separate table-head-custom table-checkable">
                  <thead style={{ background: "#F3F6F9" }}>
                    <tr>
                      <th className="text-center align-middle">No</th>
                      <th className="text-center align-middle">Nama</th>
                      <th className="text-center align-middle">Jabatan</th>
                      <th className="text-center align-middle">Status</th>
                      <th className="text-center align-middle">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center align-middle">
                        <button
                          className="btn mr-1"
                          style={{ background: "#F3F6F9", borderRadius: "6px" }}
                        >
                          1
                        </button>
                      </td>
                      <td className="align-middle text-center">Lord Dendy</td>
                      <td className="align-middle text-center">
                        Web Developer
                      </td>
                      <td className="align-middle text-center col-2">
                        <select name="" id="" className="form-control">
                          <option value="Kategori" selected>
                            aktif
                          </option>
                          {/* <option value="Kategori">
                            pengajuan - pembahasan
                          </option> */}
                          <option value="Kategori">tidak aktif</option>
                        </select>
                      </td>
                      <td className="align-middle text-center">
                        <ButtonAction icon="setting.svg" />
                        <ButtonAction icon="write.svg" />
                        <ButtonAction icon="trash.svg" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="row">
                <div className="table-pagination">
                  <Pagination
                    // activePage={page}
                    itemsCountPerPage={10}
                    totalItemsCount={60}
                    pageRangeDisplayed={3}
                    // onChange={handlePagination}
                    nextPageText={">"}
                    prevPageText={"<"}
                    // firstPageText={"<<"}
                    lastPageText={">>"}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                </div>
                <div className="table-total ml-auto">
                  <div className="row">
                    <div className="col-4 mr-0 p-0">
                      <select
                        className="form-control"
                        id="exampleFormControlSelect2"
                        style={{
                          width: "65px",
                          background: "#F3F6F9",
                          borderColor: "#F3F6F9",
                          color: "#9E9E9E",
                        }}
                      >
                        <option>5</option>
                        <option>10</option>
                        <option>30</option>
                        <option>40</option>
                        <option>50</option>
                      </select>
                    </div>
                    <div className="col-8 my-auto">
                      <p
                        className="align-middle mt-3"
                        style={{ color: "#B5B5C3" }}
                      >
                        Total Data 120
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default TableTandaTangan;
