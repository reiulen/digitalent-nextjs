import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";
import DatePicker from "react-datepicker";

import Swal from "sweetalert2";

import Image from "next/image";

import PageWrapper from "../../../wrapper/page.wrapper";
import CardPage from "../../../CardPage";
import ButtonAction from "../../../ButtonAction";

import IconCalender from "../../../assets/icon/Calender";
import IconArrow from "../../../assets/icon/Arrow";
import axios from "axios";

import {
  reqCooperationUser,
  setPage,
} from "../../../../redux/actions/partnership/user/cooperation.actions";
import LoadingTable from '../../../LoadingTable'

const Table = () => {
  // const exportCSV = {
  //   width: "77%",
  //   marginLeft: "2rem",
  // };

  const dispatch = useDispatch();
  const router = useRouter();

  const allCooperationUser = useSelector((state) => state.allCooperationUser);
 

  useEffect(() => {
    dispatch(reqCooperationUser());
  }, [dispatch]);

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
                <div className="col-lg-2 col-xl-2 mt-5 mt-lg-5 d-flex flex-column justify-content-start">
                  <p>Filter by Kerjasama</p>
                  <input
                    type="date"
                    placeholder="Dari Tanggal"
                    className="form-control"
                  />
                  <p>Silahkan Pilih Tanggal Dari</p>
                </div>
                <div className="col-lg-3 col-xl-3 mt-5 mt-lg-5 d-flex flex-column justify-content-start">
                  <p>Filter by Kerjasama</p>
                  <input
                    type="date"
                    placeholder="Sampai Tanggal"
                    className="form-control"
                  />
                  <p>Silahkan Pilih Tanggal Dari</p>
                </div>

                <div className="col-lg-2 col-xl-2 mt-5 mt-lg-5 p-0 mx-2 py-1 d-flex align-items-center">
                  <a
                    href="#"
                    className="btn btn-sm btn-light-primary px-6 font-weight-bold btn-block"
                  >
                    Cari
                  </a>
                </div>
                <div className="col-lg-2 col-xl-2 mt-5 mt-lg-5 ml-auto d-flex align-items-center">
                  <a
                    href="#"
                    className="btn btn-sm btn-primary px-6 font-weight-bold btn-block"
                    // style={exportCSV}
                  >
                    Export .csv
                  </a>
                </div>
              </div>
            </div>

            <div className="table-page mt-5">
              <div className="table-responsive">
                {allCooperationUser.cooperationMitra.length === 0 ? (
                  <LoadingTable />
                ) : (
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
                      {allCooperationUser.cooperationMitra.statusLoad ===
                      "error"
                        ? "data error"
                        : allCooperationUser.cooperationMitra.data.list_cooperations.map(
                            (items, index) => {
                              return (
                                <tr key={index}>
                                  <td className="text-center align-middle">
                                    <button
                                      className="btn"
                                      style={{
                                        background: "#F3F6F9",
                                        borderRadius: "6px",
                                      }}
                                    >
                                      {allCooperationUser.page === 1
                                        ? index + 1
                                        : (allCooperationUser.page - 1) *
                                            allCooperationUser.limit +
                                          (index + 1)}
                                    </button>
                                  </td>
                                  <td className="align-middle text-center">
                                    DQ Lab
                                  </td>
                                  <td className="align-middle text-center">
                                    {items.title}
                                    <br />
                                    <small style={{ color: "grey" }}>
                                      {items.cooperation_category === null
                                        ? "tidak ada kategori kerjasama"
                                        : items.cooperation_category
                                            .cooperation_categories}
                                    </small>
                                  </td>
                                  <td className="align-middle text-center">
                                    {items.period} {items.period_unit}
                                  </td>
                                  <td className="align-middle text-center">
                                    {items.signing_date}
                                  </td>
                                  <td className="align-middle text-center">
                                    {items.period_date_end}
                                  </td>
                                  <td className="align-middle text-center">
                                    {/* <select name="" id="" className="form-control">
                          <option value="2">Aktif</option>
                        </select> */}
                                    {items.status.name}
                                  </td>
                                  <td
                                    className="align-middle text-center "
                                    // style={{ border: "1px solid black" }}
                                  >
                                    <ButtonAction icon="trash.svg" />
                                    <ButtonAction icon="trash.svg" />
                                  </td>
                                </tr>
                              );
                            }
                          )}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="row">
                <div className="table-pagination">
                  <Pagination
                    activePage={allCooperationUser.page}
                    itemsCountPerPage={
                      allCooperationUser.cooperationMitra?.data?.perPage
                    }
                    totalItemsCount={
                      allCooperationUser.cooperationMitra?.data?.total
                    }
                    pageRangeDisplayed={3}
                    onChange={(page) => dispatch(setPage(page))}
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
                        className="align-middle mt-3 ml-3"
                        style={{ color: "#B5B5C3" }}
                      >
                        Total Data{" "}
                        {allCooperationUser.cooperationMitra?.data?.total}
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
