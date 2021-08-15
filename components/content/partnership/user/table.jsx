import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";
import DatePicker from "react-datepicker";

import PageWrapper from "../../../wrapper/page.wrapper";
import CardPage from "../../../CardPage";
import ButtonAction from "../../../ButtonAction";

import { useDispatch, useSelector } from "react-redux";

const Table = () => {
  const exportCSV = {
    width: "77%",
    marginLeft: "2rem",
  };
  return (
    <PageWrapper>
      <div className="col-lg-10 col-md-10">
        <div className="row">
          <CardPage
            background="bg-light-success"
            icon="user-blue.svg"
            color="#74BBB7"
            value="12"
            titleValue="Kerjasama"
            title="Kerjasama Aktif"
          />
          <CardPage
            background="bg-light-warning"
            icon="user-orange.svg"
            color="#634100"
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

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              Manajemen Kerjasama
            </h3>
            <div className="card-toolbar">
              <Link href="/partnership/user/submit-kerjasama">
                <a className="btn btn-primary px-6 font-weight-bold btn-block ">
                  Tambah Kerjasama Baru
                </a>
              </Link>
            </div>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-10 col-xl-10">
                  <div className="input-icon">
                    <input
                      style={{ background: "#F3F6F9", border: "none" }}
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                      id="kt_datatable_search_query"
                    />
                    <span>
                      <i className="flaticon2-search-1 text-muted"></i>
                    </span>
                  </div>
                </div>
                <div className="col-lg-2 col-xl-2">
                  <button
                    type="button"
                    className="btn btn-light-primary btn-block"
                  >
                    Cari
                  </button>
                </div>
              </div>

              <div className="row align-items-right">
                <div className="col-lg-2 col-xl-2 mt-5 mt-lg-5">
                  <select name="" id="" className="form-control">
                    <option value="1">Mitra</option>
                    <option value="2">Microsoft</option>
                  </select>
                </div>
                <div className="col-lg-3 col-xl-3 mt-5 mt-lg-5">
                  <select name="" id="" className="form-control">
                    <option value="1">Kategori Kerjasama</option>
                    <option value="2">Kategori 2</option>
                  </select>
                </div>

                <div className="col-lg-2 col-xl-2 mt-5 mt-lg-5 p-0 mx-2 py-1">
                  <a
                    href="#"
                    className="btn btn-sm btn-light-primary px-6 font-weight-bold btn-block"
                  >
                    Cari
                  </a>
                </div>
                <div className="col-lg-2 col-xl-2 mt-5 mt-lg-5 ml-auto">
                  <a
                    href="#"
                    className="btn btn-sm btn-primary px-6 font-weight-bold btn-block"
                    style={exportCSV}
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
                      <th className="text-center">No</th>
                      <th className="text-center align-middle">Mitra</th>
                      <th className="text-center align-middle">
                        Judul Kerjasama
                      </th>
                      <th className="text-center align-middle">Periode</th>
                      <th className="text-center align-middle">
                        Tanggal Tanda Tangan
                      </th>
                      <th className="text-center align-middle">
                        Tanggal Selesai
                      </th>
                      <th className="text-center align-middle">Status</th>
                      <th className="text-center align-middle">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center align-middle">
                        <button
                          className="btn"
                          style={{ background: "#F3F6F9", borderRadius: "6px" }}
                        >
                          1
                        </button>
                      </td>
                      <td className="align-middle text-center">DQ Lab</td>
                      <td className="align-middle text-center">
                        Proposal Pelatihan Programmer Web
                        <br />
                        <small style={{ color: "grey" }}>
                          Memodanrum of Understanding (MoU)
                        </small>
                      </td>
                      <td className="align-middle text-center">3 Tahun</td>
                      <td className="align-middle text-center">12 Juli 2021</td>
                      <td className="align-middle text-center">15 juli 2021</td>
                      <td className="align-middle text-center">
                        <select name="" id="" className="form-control">
                          <option value="2">Aktif</option>
                        </select>
                      </td>
                      <td
                        className="align-middle text-center "
                        // style={{ border: "1px solid black" }}
                      >
                        <ButtonAction icon="trash.svg" />
                        <ButtonAction icon="trash.svg" />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center align-middle">
                        <button
                          className="btn"
                          style={{ background: "#F3F6F9", borderRadius: "6px" }}
                        >
                          2
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
                      <td className="align-middle text-center">15 juli 2021</td>
                      <td className="align-middle text-center">
                        <select name="" id="" className="form-control">
                          <option value="2">Pengajuan - Review</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center align-middle">
                        <button
                          className="btn"
                          style={{ background: "#F3F6F9", borderRadius: "6px" }}
                        >
                          3
                        </button>
                      </td>
                      <td className="align-middle text-center">Google</td>
                      <td className="align-middle text-center">
                        Proposal Pelatihan Programmer Web
                        <br />
                        <small style={{ color: "grey" }}>
                          Memodanrum of Understanding (MoU)
                        </small>
                      </td>
                      <td className="align-middle text-center">3 Tahun</td>
                      <td className="align-middle text-center">12 Juli 2021</td>
                      <td className="align-middle text-center">15 juli 2021</td>
                      <td className="align-middle text-center">
                        <select name="" id="" className="form-control">
                          <option value="2">Pengajuan - Revisi</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center align-middle">
                        <button
                          className="btn"
                          style={{ background: "#F3F6F9", borderRadius: "6px" }}
                        >
                          4
                        </button>
                      </td>
                      <td className="align-middle text-center">Youtube</td>
                      <td className="align-middle text-center">
                        Proposal Pelatihan Programmer Web
                        <br />
                        <small style={{ color: "grey" }}>
                          Memodanrum of Understanding (MoU)
                        </small>
                      </td>
                      <td className="align-middle text-center">3 Tahun</td>
                      <td className="align-middle text-center">12 Juli 2021</td>
                      <td className="align-middle text-center">15 juli 2021</td>
                      <td className="align-middle text-center">
                        <select name="" id="" className="form-control">
                          <option value="2">Pengajuan - pembahasan</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center align-middle">
                        <button
                          className="btn"
                          style={{ background: "#F3F6F9", borderRadius: "6px" }}
                        >
                          5
                        </button>
                      </td>
                      <td className="align-middle text-center">Google</td>
                      <td className="align-middle text-center">
                        Proposal Pelatihan Programmer Web
                        <br />
                        <small style={{ color: "grey" }}>
                          Memodanrum of Understanding (MoU)
                        </small>
                      </td>
                      <td className="align-middle text-center">3 Tahun</td>
                      <td className="align-middle text-center">12 Juli 2021</td>
                      <td className="align-middle text-center">15 juli 2021</td>
                      <td className="align-middle text-center">
                        <select name="" id="" className="form-control">
                          <option value="2">Pengajuan - selesai</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center align-middle">
                        <button
                          className="btn"
                          style={{ background: "#F3F6F9", borderRadius: "6px" }}
                        >
                          6
                        </button>
                      </td>
                      <td className="align-middle text-center">Skype</td>
                      <td className="align-middle text-center">
                        Proposal Pelatihan Programmer Web
                        <br />
                        <small style={{ color: "grey" }}>
                          Memodanrum of Understanding (MoU)
                        </small>
                      </td>
                      <td className="align-middle text-center">3 Tahun</td>
                      <td className="align-middle text-center">12 Juli 2021</td>
                      <td className="align-middle text-center">15 juli 2021</td>
                      <td className="align-middle text-center">
                        <select name="" id="" className="form-control">
                          <option value="2">Pengajuan - Dokumen</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center align-middle">
                        <button
                          className="btn"
                          style={{ background: "#F3F6F9", borderRadius: "6px" }}
                        >
                          7
                        </button>
                      </td>
                      <td className="align-middle text-center">Facebook</td>
                      <td className="align-middle text-center">
                        Proposal Pelatihan Programmer Web
                        <br />
                        <small style={{ color: "grey" }}>
                          Memodanrum of Understanding (MoU)
                        </small>
                      </td>
                      <td className="align-middle text-center">3 Tahun</td>
                      <td className="align-middle text-center">12 Juli 2021</td>
                      <td className="align-middle text-center">15 juli 2021</td>
                      <td className="align-middle text-center">
                        <select name="" id="" className="form-control">
                          <option value="2">Ditolak</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center align-middle">
                        <button
                          className="btn"
                          style={{ background: "#F3F6F9", borderRadius: "6px" }}
                        >
                          8
                        </button>
                      </td>
                      <td className="align-middle text-center">Instagram</td>
                      <td className="align-middle text-center">
                        Proposal Pelatihan Programmer Web
                        <br />
                        <small style={{ color: "grey" }}>
                          Memodanrum of Understanding (MoU)
                        </small>
                      </td>
                      <td className="align-middle text-center">3 Tahun</td>
                      <td className="align-middle text-center">12 Juli 2021</td>
                      <td className="align-middle text-center">15 juli 2021</td>
                      <td className="align-middle text-center">
                        <select name="" id="" className="form-control">
                          <option value="2">Nonaktif</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="table-pagination">
                  <Pagination
                    activePage={5}
                    itemsCountPerPage={2}
                    totalItemsCount={5}
                    pageRangeDisplayed={3}
                    nextPageText={">"}
                    prevPageText={"<"}
                    firstPageText={"<<"}
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
                        Total Data 120 {process.env.END_POINT_API_PARTNERSHIP}
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

export default Table;
