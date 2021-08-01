import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";

import PageWrapper from "../../../wrapper/page.wrapper";
import ButtonAction from "../../../ButtonAction";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllSubtanceQuestionBanks,
  clearErrors,
} from "/redux/actions/subvit/subtance.actions";

const ListSubstansi = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, subtance, perPage, total } = useSelector(
    (state) => state.allSubtanceQuestionBanks
  );

  let { page = 1 } = router.query;
  page = Number(page);

  useEffect(() => {
    dispatch(getAllSubtanceQuestionBanks());
  }, [dispatch]);

  const override = css`
    margin: 0 auto;
  `;

  return (
    <PageWrapper>
      {error ? (
        <div
          className="alert alert-custom alert-light-danger fade show mb-5"
          role="alert"
        >
          <div className="alert-icon">
            <i className="flaticon-warning"></i>
          </div>
          <div className="alert-text">{error}</div>
          <div className="alert-close">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">
                <i className="ki ki-close"></i>
              </span>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              List Test Substansi
            </h3>
            <div className="card-toolbar">{/* for add */}</div>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-6 col-xl-6">
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
                  <Link href="/subvit/substansi/clone">
                    <a className="btn btn-sm btn-light-success px-6 font-weight-bold btn-block ">
                      <i className="flaticon-file-1"></i>
                      Clone Test
                    </a>
                  </Link>
                </div>
                <div className="col-lg-2 col-xl-2">
                  <Link href="/subvit/substansi/tipe-soal">
                    <a className="btn btn-sm btn-light-warning px-6 font-weight-bold btn-block ">
                      <i className="flaticon2-paper"></i>
                      Tipe Soal
                    </a>
                  </Link>
                </div>
                <div className="col-lg-2 col-xl-2">
                  <Link href="/subvit/substansi/tambah/step-1">
                    <a className="btn btn-sm btn-light-primary px-6 font-weight-bold btn-block ">
                      <i className="flaticon2-notepad"></i>
                      Tambah Soal
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="table-page mt-5">
              <div className="table-responsive">
                <div className="loading text-center justify-content-center">
                  <BeatLoader
                    color="#3699FF"
                    loading={loading}
                    css={override}
                    size={10}
                  />
                </div>

                {loading === false ? (
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-center">No</th>
                        <th>Akademi</th>
                        <th>Tema</th>
                        <th>Bank Soal</th>
                        <th>Pelaksaan</th>
                        <th>Kategori</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subtance && subtance.length === 0
                        ? ""
                        : subtance &&
                          subtance.map((subtance) => {
                            return (
                              <tr key={subtance.id}>
                                <td className="align-middle text-center">
                                  <span className="badge badge-secondary">
                                    {subtance.no}
                                  </span>
                                </td>
                                <td className="align-middle">
                                  {subtance.academy}
                                </td>
                                <td className="align-middle">
                                  {subtance.theme}
                                </td>
                                <td className="align-middle">200 Soal</td>
                                <td className="align-middle">
                                  {subtance.start_at}
                                </td>
                                <td className="align-middle">
                                  {subtance.category}
                                </td>
                                <td className="align-middle">
                                  <span className="badge badge-success">
                                    Publish
                                  </span>
                                </td>
                                <td className="align-middle">
                                  <ButtonAction
                                    icon="setting.svg"
                                    link="/subvit/substansi/report"
                                  />
                                  <ButtonAction
                                    icon="write.svg"
                                    link="/subvit/substansi/1"
                                  />
                                  <ButtonAction
                                    icon="detail.svg"
                                    link="/subvit/substansi/edit/1"
                                  />
                                  <ButtonAction icon="trash.svg" />
                                </td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </table>
                ) : (
                  ""
                )}
              </div>

              <div className="row">
                {perPage < total && (
                  <div className="table-pagination">
                    <Pagination
                      activePage={page}
                      itemsCountPerPage={perPage}
                      totalItemsCount={total}
                      pageRangeDisplayed={3}
                      // onChange={handlePagination}
                      nextPageText={">"}
                      prevPageText={"<"}
                      firstPageText={"<<"}
                      lastPageText={">>"}
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  </div>
                )}
                {total > 5 ? (
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
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ListSubstansi;
