import React, { useState, useEffect } from "react";
import Link from "next/link";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../wrapper/page.wrapper";
import CardPage from "../../../CardPage";
import ButtonAction from "../../../ButtonAction";

const TableMitra = () => {
  return (
    <PageWrapper>
      <div className="col-lg-10 col-xxl-4 order-1 order-xxl-2">
        <div className="row">
          <CardPage
            background="bg-light-success"
            icon="user-blue.svg"
            color="#2E5654"
            value="12"
            titleValue="Kerjasama"
            title="Kerjasama Aktif"
          />
          <CardPage
            background="bg-light-warning"
            icon="user-orange.svg"
            color="#C8A561"
            value="2"
            titleValue="Kerjasama"
            title="Pengajuan Kerjasama"
          />
          <CardPage
            background="bg-light-danger"
            icon="info-danger.svg"
            color="#F65464"
            value="32"
            titleValue="Kerjasama"
            title="Kerjasama akan Habis"
          />
        </div>
      </div>

      <div className="col-lg-12 col-xxl-4 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              Manajemen Kerjasama
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
                  Tambah Kerjasama Baru
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

              <div className="row align-items-right mt-5">
                {/* <div className="ml-3">
                  <div class="input-group mb-3" style={{ width: "100px" }}>
                    <select
                      class="custom-select"
                      id="inputGroupSelect02"
                      style={{
                        background:
                          "#ffffff url('/tes.png') right 1rem center/18px 20px no-repeat",
                      }}
                    >
                      <option selected>Mitra</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div> */}
                {/* <div className="ml-3" style={{ width: "200px;" }}>
                  <select
                    class="custom-select"
                    id="inputGroupSelect02"
                    style={{
                      background:
                        "#ffffff url('/tes.png') right 1rem center/18px 20px no-repeat",
                    }}
                  >
                    <option selected>Kategori Kerjasama</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div> */}
                <div className="ml-3" style={{ width: "24%;" }}>
                  <select
                    class="custom-select"
                    id="inputGroupSelect02"
                    style={{
                      background:
                        "#ffffff url('/tes.png') right 1rem center/18px 20px no-repeat",
                    }}
                  >
                    <option selected>Semua Status</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="col-lg-1 col-xl-1">
                  <a
                    href="#"
                    className="btn btn-sm btn-light-primary font-weight-bold btn-block"
                    style={{ width: "7rem !important" }}
                  >
                    Cari
                  </a>
                </div>
                <div className="col-lg-1 col-xl-1">
                  <a
                    href="#"
                    className="btn btn-sm bg-light-danger px-2 font-weight-bold btn-block"
                    style={{
                      color: "#F65464",
                      width: "6rem !important",
                      marginLeft: "2rem",
                    }}
                  >
                    Reset
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
                        Tanggal Penandatanganan
                      </th>
                      {/* <th className="text-center align-middle">
                        Tanggal Selesai
                      </th> */}
                      <th className="text-center align-middle">Status</th>
                      <th className="text-center align-middle">Action</th>
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
                      <td className="align-middle text-center">DQ Lab</td>
                      <td className="align-middle text-center">
                        Proposal Pelatihan Programmer Web
                      </td>
                      <td className="align-middle text-center">3 Tahun</td>
                      <td className="align-middle text-center">12 Juli 2021</td>
                      <td className="align-middle text-center">
                        <select name="" id="" className="form-control">
                          <option value="Kategori" selected>
                            aktif
                          </option>
                          <option value="Kategori">
                            pengajuan - pembahasan
                          </option>
                          <option value="Kategori">pengajuan - revisi</option>
                        </select>
                      </td>
                      <td className="align-middle">
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

export default TableMitra;
