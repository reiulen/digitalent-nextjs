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

const DetailSubstansi = () => {
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
          <div className="card-header">
            <h3 className="card-title font-weight-bolder text-dark">
              Substansi FGA - Cloud Computing
            </h3>
            <div className="card-toolbar">
              <a className="btn btn-sm btn-light-success px-6 font-weight-bold btn-block ">
                Edit
              </a>
            </div>
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <div className="row">
                  <div
                    className="col title-1 font-weight-bold"
                    style={{ color: "#80808F" }}
                  >
                    <p>Akademi</p>
                    <p>Tema</p>
                    <p>Pelatihan</p>
                    <p>Status</p>
                  </div>
                  <div className="col value-1">
                    <p>FGA</p>
                    <p>Cloude Computing</p>
                    <p>-</p>
                    <p>Publish</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="row">
                  <div
                    className="col title-1 font-weight-bold"
                    style={{ color: "#80808F" }}
                  >
                    <p>Pelaksanaan</p>
                    <p>Jumlah Soal</p>
                    <p>Durasi Tes</p>
                  </div>
                  <div className="col value-1">
                    <p>1 - 5 Juli 2021</p>
                    <p>40 Soal</p>
                    <p>60 Menit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              Bank Soal
            </h3>
            <div className="card-toolbar">
              <Link href="/subvit/substansi/tambah">
                <a className="btn btn-sm btn-success px-6 font-weight-bold btn-block ">
                  Tambah Soal
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
                        <th>ID Soal</th>
                        <th>Soal</th>
                        <th>Status</th>
                        <th className="text-center">Aksi</th>
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
                                  {subtance.no}
                                </td>
                                <td className="align-middle">
                                  {subtance.academy}
                                </td>
                                <td className="align-middle">
                                  {subtance.theme}
                                </td>
                                <td className="align-middle">
                                  <span className="badge badge-success">
                                    Publish
                                  </span>
                                </td>
                                <td className="align-middle text-center">
                                  <ButtonAction
                                    icon="write.svg"
                                    link="/subvit/substansi/soal/1"
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

export default DetailSubstansi;
