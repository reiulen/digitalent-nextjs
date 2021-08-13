import React, { useEffect, useState } from "react";

import Link from "next/link";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import PageWrapper from "../../../wrapper/page.wrapper";
import CardPage from "../../../CardPage";
import ButtonAction from "../../../ButtonAction";

const Table = () => {
  const dispatch = useDispatch();

  // api problem??

  const { loading, error, mitra } = useSelector((state) => state.allMitra);

  useEffect(() => {}, [mitra]);

  return (
    <PageWrapper>
      <div className="col-lg-10 col-md-10">
        <div className="row">
          <CardPage
            background="bg-light-success"
            icon="user-blue.svg"
            color="#74BBB7"
            value="120"
            titleValue="Mitra"
            title="Total Mitra"
          />
          <CardPage
            background="bg-light-warning"
            icon="user-orange.svg"
            color="#634100"
            value="100"
            titleValue="Mitra"
            title="Mitra Yang Aktif"
          />
          <CardPage
            background="bg-light-danger"
            icon="info-danger.svg"
            color="#F65464"
            value="12"
            titleValue="Mitra"
            title="Mitra Yang Tidak Aktif"
          />
        </div>
      </div>

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              Manajemen Mitra
            </h3>
            <div className="card-toolbar">
              <Link href="/partnership/manajemen-mitra/tambah">
                <a className="btn btn-primary px-6 font-weight-bold btn-block ">
                  Tambah Mitra Baru
                </a>
              </Link>
            </div>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-12 col-xl-12">
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
              </div>

              <div className="row align-items-right">
                <div className="col-lg-3 col-xl-3 mt-5 mt-lg-5">
                  <select name="" id="" className="form-control">
                    <option value="1">Semua Status</option>
                    <option value="2">Microsoft</option>
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
              </div>
            </div>

            <div className="table-page mt-5">
              <div className="table-responsive">
                <table className="table table-separate table-head-custom table-checkable">
                  <thead style={{ background: "#F3F6F9" }}>
                    <tr>
                      <th className="text-center align-middle">No</th>
                      <th className="text-center align-middle">Logo</th>
                      <th className="text-center align-middle">Mitra</th>
                      <th className="text-center align-middle">Website</th>
                      <th className="text-center align-middle">Kerjasama</th>
                      <th className="text-center align-middle">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mitra.mitra.map((dataMitra, id) => {
                      console.log(dataMitra);
                      return (
                        <tr>
                          <td className="text-center align-middle">
                            <button
                              className="btn"
                              style={{
                                background: "#F3F6F9",
                                borderRadius: "6px",
                              }}
                            >
                              {id + 1}
                            </button>
                          </td>
                          <td className="align-middle text-center">
                            <Image
                              src={`/assets/icon/${dataMitra.agency_logo}`}
                              width={40}
                              height={40}
                              alt="logo"
                            />
                          </td>
                          <td className="align-middle text-center">
                            {dataMitra.partner}
                          </td>
                          <td className="align-middle text-center">
                            {dataMitra.website}
                          </td>
                          <td className="align-middle text-center">
                            {dataMitra.cooperations}
                          </td>
                          <td className="align-middle text-center">
                            <ButtonAction
                              icon="detail.svg"
                              link="/partnership/manajemen-mitra/detail-data-kerjasama"
                            />
                            <ButtonAction icon="write.svg" />
                            <ButtonAction icon="trash.svg" />
                          </td>
                        </tr>
                      );
                    })}
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

export default Table;
