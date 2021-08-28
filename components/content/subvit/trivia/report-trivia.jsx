import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";
import LoadingTable from "../../../LoadingTable";

import PageWrapper from "../../../wrapper/page.wrapper";
import ButtonAction from "../../../ButtonAction";
import CardPage from "../../../CardPage";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllSubtanceQuestionBanks,
  clearErrors,
} from "/redux/actions/subvit/subtance.actions";

const ReportTrivia = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, trivia } = useSelector(
    (state) => state.allReportTriviaQuestionBanks
  );

  let { page = 1, id } = router.query;
  page = Number(page);

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(null);
  const [publishValue, setPublishValue] = useState(null);

  // useEffect(() => {
  // }, [dispatch]);

  const handlePagination = (pageNumber) => {
    let link = `${router.pathname}?id=${id}&page=${pageNumber}`;
    if (limit) link = link.concat(`&limit=${limit}`);
    if (search) link = link.concat(`&keyword=${search}`);
    router.push(link);
  };

  const handleSearch = () => {
    let link = `${router.pathname}?id=${id}`;
    if (search) link = link.concat(`&keyword=${search}`);
    if (limit) link = link.concat(`&limit=${limit}`);
    router.push(link);
  };

  const handleLimit = (val) => {
    setLimit(val);
  };

  const handleExportReport = async () => {
    let link = `http://dts-subvit-dev.majapahit.id/api/trivia-question-banks/report/export/${id}`;
    if (search) link = link.concat(`&keyword=${search}`);
    await axios.get(link).then((res) => {
      window.location.href = res.data.data;
    });
  };

  const handlePublish = (val) => {
    setPublishValue(val);
    let link = `${router.pathname}?id=${id}&page=${1}&card=${val}`;
    if (search) link = link.concat(`&keyword=${search}`);
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

      <div className="col-lg-12 col-md-12">
        <div className="row">
          <CardPage
            background="bg-light-info"
            icon="orang-tambah-purple.svg"
            color="#8A50FC"
            value={trivia.data.total_peserta}
            titleValue=""
            title="Total Peserta"
            publishedVal=""
            routePublish={() => handlePublish("")}
          />
          <CardPage
            background="bg-light-success"
            icon="done-circle.svg"
            color="#0BB783"
            value={trivia.data.sudah_mengerjakan}
            titleValue=""
            title="Sudah Mengerjakan"
            publishedVal="sudah-mengerjakan"
            routePublish={() => handlePublish("sudah-mengerjakan")}
          />
          <CardPage
            background="bg-light-warning"
            icon="book-open.svg"
            color="#634100"
            value={trivia.data.sedang_mengerjakan}
            titleValue=""
            title="Sedang Mengerjakan"
            publishedVal="sedang-mengerjakan"
            routePublish={() => handlePublish("sedang-mengerjakan")}
          />
          <CardPage
            background="bg-accent-info"
            icon="mail-purple.svg"
            color="#663259"
            value={trivia.data.belum_mengerjakan}
            titleValue=""
            title="Belum Mengerjakan"
            publishedVal="belum-mengerjakan"
            routePublish={() => handlePublish("belum-mengerjakan")}
          />
        </div>
      </div>

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b pt-3">
          <div className="card-header border-0 align-items-center row">
            <div className="col-lg-10 col-xl-10">
              <h3 className="card-title font-weight-bolder text-dark">
                Report Trivia{" "}
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
                onClick={handleExportReport}
              >
                Export .CSV
              </button>
            </div>
            <div className="card-toolbar"></div>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter mb-5">
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
            </div>

            <div className="table-page">
              <div className="table-responsive">
                <LoadingTable loading={loading} />

                {loading === false ? (
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-center">No</th>
                        <th>Peserta Test</th>
                        <th>Pelatihan</th>
                        <th>Total Pengerjaan</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trivia && trivia.data.reports.length === 0 ? (
                        <tr>
                          <td className="text-center" colSpan={7}>
                            Data Masih Kosong
                          </td>
                        </tr>
                      ) : (
                        trivia &&
                        trivia.data.reports.map((row, i) => {
                          return (
                            <tr key={row.id}>
                              <td className="align-middle text-center">
                                <p className="badge badge-secondary text-muted">
                                  {i + 1 * (page * 5 || limit) - 4}
                                </p>
                              </td>
                              <td className="align-middle">
                                <div>
                                  <p className="my-0 h6">{row.name}</p>
                                  <p className="my-0">{row.email}</p>
                                  <p className="my-0">{row.no_telp}</p>
                                </div>
                              </td>
                              <td className="align-middle">
                                <p className="h6">{row.training.name}</p>
                              </td>
                              <td className="align-middle">
                                <div>
                                  <p className="my-0 h6">
                                    {row.total_workmanship_date}
                                  </p>
                                  <p className="my-0">
                                    {row.total_workmanship_time}
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
                {trivia && trivia.total > 5 && (
                  <div className="table-pagination">
                    <Pagination
                      activePage={page}
                      itemsCountPerPage={trivia.perPage}
                      totalItemsCount={trivia.total}
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
                {trivia && trivia.total > 4 ? (
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
                          Total Data {trivia.total}
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

export default ReportTrivia;
