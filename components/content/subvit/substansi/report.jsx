import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import Pagination from "react-js-pagination";

import PageWrapper from "../../../wrapper/page.wrapper";
import CardPage from "../../../CardPage";
import LoadingTable from "../../../LoadingTable";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  getAllSubtanceQuestionBanks,
  clearErrors,
} from "/redux/actions/subvit/subtance.actions";
import { NEW_TRIVIA_QUESTION_DETAIL_FAIL } from "../../../../redux/types/subvit/trivia-question-detail.type";

const ListSubstansi = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, subtance } = useSelector(
    (state) => state.allReportSubtanceQuestionBanks
  );

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(null);
  const [status, setStatus] = useState("");
  const [pelatihan, setPelatihan] = useState(null);
  const [nilai, setNilai] = useState(null);
  const [publishValue, setPublishValue] = useState(null);

  let { page = 1, id } = router.query;
  page = Number(page);

  useEffect(() => {}, [dispatch]);

  const handlePagination = (pageNumber) => {
    let link = `${router.pathname}?id=${id}&page=${pageNumber}`;
    if (limit) link = link.concat(`&limit=${limit}`);
    if (search) link = link.concat(`&keyword=${search}`);
    if (status) link = link.concat(`&status=${status}`);
    if (nilai) link = link.concat(`&nilai=${nilai}`);
    if (pelatihan) link = link.concat(`&pelatihan=${pelatihan}`);
    router.push(link);
  };

  const handleSearch = () => {
    if (limit != null) {
      router.push(
        `${router.pathname}?id=${id}&page=1&keyword=${search}&limit=${limit}`
      );
    } else {
      router.push(`${router.pathname}?id=${id}&page=1&keyword=${search}`);
    }
  };

  const handleLimit = (val) => {
    setLimit(val);
  };

  const handleExportReport = async () => {
    let link = `http://dts-subvit-dev.majapahit.id/api/subtance-question-banks/report/export/${id}`;
    if (search) link = link.concat(`&keyword=${search}`);
    if (status) link = link.concat(`&status=${status}`);
    if (nilai) link = link.concat(`&nilai=${nilai}`);
    if (pelatihan) link = link.concat(`&pelatihan=${pelatihan}`);

    await axios.get(link).then((res) => {
      window.location.href = res.data.data;
    });
  };

  const handleFilter = () => {
    let link = `${router.pathname}?id=${id}&page=${1}`;
    if (status) link = link.concat(`&status=${status}`);
    if (nilai) link = link.concat(`&nilai=${nilai}`);
    if (pelatihan) link = link.concat(`&pelatihan=${pelatihan}`);
    router.push(link);
  };

  const handlePublish = (val) => {
    setPublishValue(val);
    let link = `${router.pathname}?id=${id}&page=${1}&card=${val}`;
    if (search) link = link.concat(`&keyword=${search}`);
    if (status) link = link.concat(`&status=${status}`);
    if (nilai) link = link.concat(`&nilai=${nilai}`);
    if (pelatihan) link = link.concat(`&pelatihan=${pelatihan}`);
    router.push(link);
  };

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

      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="row">
          <CardPage
            background="bg-light-info"
            icon="orang-tambah-purple.svg"
            color="#8A50FC"
            value={subtance.data.total_peserta}
            titleValue=""
            title="Total Peserta"
            publishedVal=""
            routePublish={() => handlePublish("")}
          />
          <CardPage
            background="bg-light-success"
            icon="done-circle.svg"
            color="#0BB783"
            value={subtance.data.sudah_mengerjakan}
            titleValue=""
            title="Sudah Mengerjakan"
            publishedVal="sudah-mengerjakan"
            routePublish={() => handlePublish("sudah-mengerjakan")}
          />
          <CardPage
            background="bg-light-warning"
            icon="book-open.svg"
            color="#634100"
            value={subtance.data.sedang_mengerjakan}
            titleValue=""
            title="Sedang Mengerjakan"
            publishedVal="sedang-mengerjakan"
            routePublish={() => handlePublish("sedang-mengerjakan")}
          />
          <CardPage
            background="bg-accent-info"
            icon="mail-purple.svg"
            color="#663259"
            value={subtance.data.belum_mengerjakan}
            titleValue=""
            title="Belum Mengerjakan"
            publishedVal="belum-mengerjakan"
            routePublish={() => handlePublish("belum-mengerjakan")}
          />
          <CardPage
            background="bg-light-danger"
            icon="kotak-kotak-red.svg"
            color="#F65464"
            value={subtance.data.gagal_test}
            titleValue=""
            title="Gagal Test"
            publishedVal="gagal-test"
            routePublish={() => handlePublish("gagal-test")}
          />
        </div>
      </div>

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b pt-3">
          <div className="card-header border-0 align-items-center row">
            <div className="col-lg-10 col-xl-10">
              <h3 className="card-title font-weight-bolder text-dark">
                Report Test Substansi{" "}
                {publishValue === null || ""
                  ? ""
                  : `- ${
                      publishValue.charAt(0).toUpperCase() +
                      publishValue.slice(1).replace("-", " ")
                    }`}
              </h3>
              <p className="text-muted">FGA - Cloud Computing</p>
            </div>
            <div className="col-lg-2 col-xl-2">
              <button
                className="btn btn-sm btn-light-success px-6 font-weight-bold btn-block "
                type="button"
                onClick={handleExportReport}
              >
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
                      autoComplete="off"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <span>
                      <i className="flaticon2-search-1 text-muted"></i>
                    </span>
                  </div>
                </div>

                <div className="col-lg-2 col-xl-2">
                  <button
                    className="btn btn-sm btn-light-primary px-6 font-weight-bold btn-block"
                    onClick={handleSearch}
                  >
                    Cari
                  </button>
                </div>
              </div>

              <div className="row align-items-center my-5">
                <div className="col-lg-3 col-xl-3 ">
                  <div className="form-group mb-0">
                    <small className="text-muted p-0">
                      Filter by Pelatihan
                    </small>
                    <select className="form-control mb-1">
                      <option>Semua</option>
                    </select>
                  </div>
                </div>

                <div className="col-lg-3 col-xl-3 ">
                  <div className="form-group mb-0">
                    <small className="text-muted mt-1 p-0">
                      Filter by Status
                    </small>
                    <select
                      className="form-control mb-1"
                      onChange={(e) => setStatus(e.target.value)}
                      onBlur={(e) => setStatus(e.target.value)}
                      value={status}
                    >
                      <option value="" selected>
                        Semua
                      </option>
                      <option value={1}>Diterima</option>
                      <option value={0}>Ditolak</option>
                    </select>
                  </div>
                </div>

                <div className="col-lg-3 col-xl-3 ">
                  <div className="form-group mb-0">
                    <small className="text-muted mt-1 p-0">
                      Filter by nilai
                    </small>
                    <select
                      className="form-control mb-1"
                      onChange={(e) => setNilai(e.target.value)}
                      onBlur={(e) => setNilai(e.target.value)}
                      value={nilai}
                    >
                      <option value="" selected>
                        Semua
                      </option>
                      {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(
                        (loop, i) => {
                          return (
                            <option key={i} value={loop}>
                              {loop}
                            </option>
                          );
                        }
                      )}
                    </select>
                  </div>
                </div>

                <div className="col-lg-3 col-xl-3 ">
                  <div className="mt-4">
                    <button
                      className="btn btn-light-primary"
                      onClick={handleFilter}
                    >
                      Filter
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="table-page mt-5">
              <div className="table-responsive">
                <LoadingTable loading={loading} />

                {loading === false ? (
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-center">No</th>
                        <th>Peserta Test</th>
                        <th>Pelatihan</th>
                        <th>Nilai</th>
                        <th>Total Pengerjaan</th>
                        <th>Jawaban</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subtance && subtance.data.reports.length === 0 ? (
                        <tr>
                          <td className="text-center" colSpan={7}>
                            Data Masih Kosong
                          </td>
                        </tr>
                      ) : (
                        subtance &&
                        subtance.data.reports.map((row, i) => {
                          return (
                            <tr key={row.id}>
                              <td className="align-middle text-center">
                                <p className="badge badge-secondary text-muted">
                                  {i + 1 * (page * 5 || limit) - 4}
                                </p>
                              </td>
                              <td className="align-middle">
                                <div>
                                  <p className="my-0 font-weight-bold">
                                    {row.name}
                                  </p>
                                  <p className="my-0">{row.email}</p>
                                  <p className="my-0">{row.no_telp}</p>
                                </div>
                              </td>
                              <td className="align-middle">
                                <p className="font-weight-bold">
                                  {row.training.name}
                                </p>
                              </td>
                              <td className="align-middle">{row.score}</td>
                              <td className="align-middle">
                                <div>
                                  <p className="my-0 font-weight-bold">
                                    {row.total_workmanship_date}
                                  </p>
                                  <p className="my-0">
                                    {row.total_workmanship_time}
                                  </p>
                                </div>
                              </td>
                              <td className="align-middle">
                                <div>
                                  <p className="my-0">
                                    Benar: {row.jawaban_benar} Jawaban
                                  </p>
                                  <p className="my-0">
                                    Salah: {row.jawaban_salah} Jawaban
                                  </p>
                                  <p className="my-0">
                                    Jumlah: {row.jumlah_soal} Jawaban
                                  </p>
                                </div>
                              </td>
                              <td className="align-middle">
                                {row.status ? (
                                  <td className="align-middle">
                                    <span className="label label-inline label-light-success font-weight-bold">
                                      Diterima
                                    </span>
                                  </td>
                                ) : (
                                  <td className="align-middle">
                                    <span className="label label-inline label-light-danger font-weight-bold">
                                      Ditolak
                                    </span>
                                  </td>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                ) : (
                  ""
                )}
              </div>

              <div className="row">
                {subtance && subtance.perPage < subtance.total && (
                  <div className="table-pagination">
                    <Pagination
                      activePage={page}
                      itemsCountPerPage={subtance.perPage}
                      totalItemsCount={subtance.total}
                      pageRangeDisplayed={3}
                      onChange={handlePagination}
                      nextPageText={">"}
                      prevPageText={"<"}
                      firstPageText={"<<"}
                      lastPageText={">>"}
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  </div>
                )}
                {subtance && subtance.total > 5 ? (
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
                          onChange={(e) => handleLimit(e.target.value)}
                          onBlur={(e) => handleLimit(e.target.value)}
                        >
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="15">15</option>
                          <option value="20">20</option>
                        </select>
                      </div>
                      <div className="col-8 my-auto">
                        <p
                          className="align-middle mt-3"
                          style={{ color: "#B5B5C3" }}
                        >
                          Total Data {subtance.total}
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
