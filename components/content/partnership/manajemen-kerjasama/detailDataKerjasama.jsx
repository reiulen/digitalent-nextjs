import React, { useState, useEffect } from "react";
import Link from "next/link";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../wrapper/page.wrapper";
import CardPage from "../../../CardPage";
import ButtonAction from "../../../ButtonAction";

const DetailDataKerjasama = () => {
  return (
    <PageWrapper>
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              Kerjasama Microsoft
            </h3>
            <div className="card-toolbar">
              <Link href="/partnership/manajemen-kerjasama/tambah">
                <a className="btn px-6 font-weight-bold btn-block btn-primary">
                  Tambah Kerjasama Baru
                </a>
              </Link>
            </div>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-12 col-xl-12">
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
              </div>

              <div className="row align-items-right">
                <div className="col-lg-3 col-xl-3 mt-5 mt-lg-5">
                  <select name="" id="" className="form-control">
                    <option value="1">Kategori Kerjasama</option>
                    <option value="2">Kategori 2</option>
                  </select>
                </div>
                <div className="col-lg-2 col-xl-2 mt-5 mt-lg-5">
                  <select name="" id="" className="form-control">
                    <option value="1">Status</option>
                    <option value="2">Aktif</option>
                  </select>
                </div>
                <div className="col-lg-1 col-xl-1 mt-5 mt-lg-5 p-0 mx-2 py-1">
                  <a
                    href="#"
                    className="btn btn-sm btn-light-primary px-6 font-weight-bold btn-block"
                  >
                    Filter
                  </a>
                </div>
                <div className="col-lg-1 col-xl-1 mt-5 mt-lg-5 p-0 mx-2 py-1">
                  <a
                    href="#"
                    className="btn btn-sm btn-light-danger px-6 font-weight-bold btn-block"
                  >
                    Reset
                  </a>
                </div>
                <div className="col-lg-2 col-xl-2 mt-5 mt-lg-5 ml-auto">
                  <a
                    href="#"
                    className="btn btn-sm btn-primary px-6 font-weight-bold btn-block"
                  >
                    Export .csv
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
                      <th className="text-center align-middle">Mitra</th>
                      <th className="text-center align-middle">
                        Judul Kerjasama
                      </th>
                      <th className="text-center align-middle">Periode</th>
                      <th className="text-center align-middle">
                        Tanggal Tanda Tangan
                      </th>
                      {/* <th className="text-center align-middle">
                        Tanggal Selesai
                      </th> */}
                      <th className="text-center align-middle">
                        Tanggal Selesai
                      </th>
                      <th className="text-center align-middle">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center align-middle   ">
                        <button
                          className="btn mr-1"
                          style={{ background: "#F3F6F9", borderRadius: "6px" }}
                        >
                          1
                        </button>
                      </td>
                      <td className="align-middle text-center">Microsoft</td>
                      <td className="align-middle text-center">
                        Proposal Pelatihan Programmer Web
                        <br />
                        <small style={{ color: "grey" }}>
                          Memodanrum of Understanding (MoU)
                        </small>
                      </td>
                      <td className="align-middle text-center">3 Tahun</td>
                      <td className="align-middle text-center">12 Juli 2021</td>
                      <td className="align-middle">15 Juli 2021</td>
                      <td className="align-middle text-center">
                        <select name="" id="" className="form-control">
                          <option value="Kategori" selected>
                            aktif
                          </option>
                          <option value="Kategori">non aktif</option>
                          <option value="Kategori">pengajuan - revisi</option>
                        </select>
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

export default DetailDataKerjasama;
