import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";

import PageWrapper from "../../../wrapper/page.wrapper";
import ButtonAction from "../../../ButtonAction";
import CardPage from "../../../CardPage";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllSubtanceQuestionBanks,
  clearErrors,
} from "/redux/actions/subvit/subtance.actions";

const ReportSurvey = () => {
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

      <div className="col-lg-12 col-md-3">
        <div className="row">
          <CardPage
            background="bg-light-info"
            icon="orang-tambah-purple.svg"
            color="#8A50FC"
            value="90"
            titleValue=""
            title="Total Peserta"
          />
          <CardPage
            background="bg-light-success"
            icon="done-circle.svg"
            color="#0BB783"
            value="64"
            titleValue=""
            title="Sudah Mengerjakan"
          />
          <CardPage
            background="bg-light-warning"
            icon="book-open.svg"
            color="#634100"
            value="64"
            titleValue=""
            title="Sedang Mengerjakan"
          />
          <CardPage
            background="bg-accent-info"
            icon="mail-purple.svg"
            color="#663259"
            value="64"
            titleValue=""
            title="Belum Mengerjakan"
          />
          {/* <CardPage background='bg-light-danger' icon='kotak-kotak-red.svg' color='#F65464' value='64' titleValue='' title='Gagal Test' /> */}
        </div>
      </div>

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b pt-3">
          <div className="card-header border-0 align-items-center row">
            <div className="col-lg-10 col-xl-10">
              <h3 className="card-title font-weight-bolder text-dark">
                Report Survey
              </h3>
              <p className="text-muted">FGA - Cloud Computing</p>
            </div>
            <div className="col-lg-2 col-xl-2">
              <button className="btn btn-sm btn-light-success px-6 font-weight-bold btn-block ">
                Export .CSV
              </button>
            </div>
            <div className="card-toolbar"></div>
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
                  <button className="btn btn-sm btn-light-primary px-6 font-weight-bold btn-block ">
                    Cari
                  </button>
                </div>
              </div>

              <div className="row align-items-center my-5">
                <div className="col-lg-3 col-xl-3 ">
                  <div className="form-group mb-0">
                    <select className="form-control">
                      <option>Semua</option>
                    </select>
                    <small className="text-muted mt-1 p-0">
                      Filter by Pelatihan
                    </small>
                  </div>
                </div>

                <div className="col-lg-3 col-xl-3 ">
                  <div className="form-group mb-0">
                    <select className="form-control">
                      <option>Semua</option>
                    </select>
                    <small className="text-muted mt-1 p-0">
                      Filter by Status
                    </small>
                  </div>
                </div>

                <div className="col-lg-3 col-xl-3 ">
                  <div className="form-group mb-0">
                    <select className="form-control">
                      <option>Semua</option>
                    </select>
                    <small className="text-muted mt-1 p-0">
                      Filter by Nilai
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div className="table-page">
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
                        <th>Peserta Test</th>
                        <th>Pelatihan</th>
                        {/* <th>Nilai</th> */}
                        <th>Total Pengerjaan</th>
                        <th>Jawaban</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {
                                                subtance && subtance.length === 0 ?
                                                    '' :
                                                    subtance && subtance.map((subtance) => {
                                                        return <tr key={subtance.id}>

                                                            <td className='align-middle text-center'>{subtance.no}</td>
                                                            <td className='align-middle'>{subtance.academy}</td>
                                                            <td className='align-middle'>{subtance.theme}</td>
                                                            <td className='align-middle'>200 Soal</td>
                                                            <td className='align-middle'>{subtance.start_at}</td>
                                                            <td className='align-middle'>{subtance.category}</td>
                                                            <td className='align-middle'><span className="badge badge-success">Publish</span></td>
                                                            <td className='align-middle'>
                                                                <ButtonAction icon='setting.svg' />
                                                                <ButtonAction icon='write.svg' />
                                                                <ButtonAction icon='detail.svg' />
                                                                <ButtonAction icon='trash.svg' />
                                                            </td>
                                                        </tr>

                                                    })
                                            } */}
                      <tr>
                        <td className="align-middle text-center">
                          <p className="badge badge-secondary h6">1</p>
                        </td>
                        <td className="align-middle">
                          <div>
                            <p className="my-0 h6">Dimas Rifai Lombu</p>
                            <p className="my-0">dimas@mail.com</p>
                            <p className="my-0">202309182982998</p>
                          </div>
                        </td>
                        <td className="align-middle">
                          <p className="h6">Cloud Computing</p>
                        </td>
                        {/* <td className="align-middle">
                          <p className="h6">60.00</p>
                        </td> */}
                        <td className="align-middle">
                          <div>
                            <p className="my-0 h6">05/28/2021</p>
                            <p className="my-0">36:23</p>
                          </div>
                        </td>
                        <td className="align-middle">
                          <div>
                            <p className="my-0">20</p>
                            {/* <p className="my-0">Benar: 20 Jawaban</p>
                            <p className="my-0">Salah: 20 Jawaban</p>
                            <p className="my-0">Jumlah: 40 Jawaban</p> */}
                          </div>
                        </td>
                        <td className="align-middle">
                          <p className="badge badge-success">Diterima</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="align-middle text-center">
                          <p className="badge badge-secondary h6">2</p>
                        </td>
                        <td className="align-middle">
                          <div>
                            <p className="my-0 h6">Dimas Rifai Lombu</p>
                            <p className="my-0">dimas@mail.com</p>
                            <p className="my-0">202309182982998</p>
                          </div>
                        </td>
                        <td className="align-middle">
                          <p className="h6">Cloud Computing</p>
                        </td>
                        {/* <td className="align-middle">
                          <p className="h6">60.00</p>
                        </td> */}
                        <td className="align-middle">
                          <div>
                            <p className="my-0 h6">05/28/2021</p>
                            <p className="my-0">36:23</p>
                          </div>
                        </td>
                        <td className="align-middle">
                          <div>
                            <p className="my-0">20</p>
                            {/* <p className="my-0">Salah: 20 Jawaban</p>
                            <p className="my-0">Jumlah: 40 Jawaban</p> */}
                          </div>
                        </td>
                        <td className="align-middle">
                          <p className="badge badge-danger">Ditolak</p>
                        </td>
                      </tr>
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

export default ReportSurvey;
