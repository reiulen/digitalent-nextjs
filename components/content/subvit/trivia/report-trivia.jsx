import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import Pagination from "react-js-pagination";
import LoadingTable from "../../../LoadingTable";

import PageWrapper from "../../../wrapper/page.wrapper";
import CardPage from "../../../CardPage";

import axios from "axios";
import styles from "../trivia/edit/step.module.css";

import { useDispatch, useSelector } from "react-redux";
import { Badge } from "react-bootstrap";

const ReportTrivia = ({ token, tokenPermission }) => {
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

  const handleSearch = (e) => {
    e.preventDefault();
    let link = `${router.pathname}?id=${id}`;
    if (search) link = link.concat(`&keyword=${search}`);
    if (limit) link = link.concat(`&limit=${limit}`);
    router.push(link);
  };

  const handleLimit = (val) => {
    setLimit(val);
    let link = `${router.pathname}?id=${id}&page=1&limit=${val}`;
    router.push(link);
  };

  const handleExportReport = async () => {
    let link =
      process.env.END_POINT_API_SUBVIT +
      `api/trivia-question-banks/report/export/${id}?`;
    if (search) link = link.concat(`&keyword=${search}`);
    if (router.query.card) link = link.concat(`&card=${router.query.card}`);

    const config = {
      headers: {
        Authorization: "Bearer " + token,
        Permission: tokenPermission || "",
      },
    };

    await axios.get(link, config).then((res) => {
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
            background="bg-primary"
            icon="new/add-user.svg"
            color="#FFFFFF"
            value={trivia?.data?.total_peserta}
            titleValue=""
            title="Total Peserta"
            publishedVal="total-peserta"
            routePublish={() => handlePublish("total-peserta")}
          />
          <CardPage
            background="bg-secondary"
            icon="new/done-circle.svg"
            color="#FFFFFF"
            value={trivia?.data?.sudah_mengerjakan}
            titleValue=""
            title="Sudah Mengerjakan"
            publishedVal="sudah-mengerjakan"
            routePublish={() => handlePublish("sudah-mengerjakan")}
          />
          <CardPage
            background="bg-success"
            icon="new/open-book.svg"
            color="#FFFFFF"
            value={trivia?.data?.sedang_mengerjakan}
            titleValue=""
            title="Sedang Mengerjakan"
            publishedVal="sedang-mengerjakan"
            routePublish={() => handlePublish("sedang-mengerjakan")}
          />
          <CardPage
            background="bg-warning"
            icon="new/mail-white.svg"
            color="#FFFFFF"
            value={trivia?.data?.belum_mengerjakan}
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
              <p className="text-muted">
                {(trivia && trivia.dataTitle.academy) || "-"} -{" "}
                {(trivia && trivia.dataTitle.theme) || "-"}
              </p>
            </div>
            <div className="card-toolbar"></div>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter mb-5">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <div className="position-relative overflow-hidden mt-2">
                    <form onSubmit={(e) => handleSearch(e)}>
                      <i className="ri-search-line left-center-absolute ml-2"></i>
                      <input
                        type="text"
                        className="form-control pl-10 mt-2"
                        placeholder="Ketik disini untuk Pencarian..."
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </form>
                    <button
                      className="btn bg-blue-primary text-white right-center-absolute mt-1"
                      style={{
                        borderTopLeftRadius: "0",
                        borderBottomLeftRadius: "0",
                      }}
                      onClick={(e) => handleSearch(e)}
                    >
                      Cari
                    </button>
                  </div>
                </div>
                <div className="col-md-3"></div>
                <div className="col-md-3"></div>

                <div className="col-md-2">
                  <button
                    className={`${styles.btnResponsive} btn btn-rounded-full bg-blue-secondary text-white mt-2`}
                    type="button"
                    onClick={handleExportReport}
                  >
                    Export
                    <i className="ri-arrow-down-s-line ml-3 mt-1 text-white"></i>
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
                        <th>Nilai</th>
                        <th>Total Pengerjaan</th>
                        <th className="align-middle ">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trivia && trivia.data.reports.length === 0 ? (
                        <tr>
                          <td className="text-center" colSpan={7}>
                            Data Kosong
                          </td>
                        </tr>
                      ) : (
                        trivia &&
                        trivia.data.reports.map((row, i) => {
                          return (
                            <tr key={row.id}>
                              <td className="align-middle text-center">
                                <p className="">
                                  {i + 1 * (page * 5 || limit) - 4}
                                </p>
                              </td>
                              <td className="align-middle">
                                <div>
                                  <p className="my-0 font-weight-bold h6">
                                    {row.name}
                                  </p>
                                  <p className="my-0">{row.email}</p>
                                  <p className="my-0">{row.nik}</p>
                                </div>
                              </td>
                              <td className="align-middle">
                                <div className="">
                                  {/* <p className="font-weight-bold my-0 h6">
                                    {row.training.theme.academy.name}
                                  </p> */}
                                  <p className="my-0">{row.training.name}</p>
                                </div>
                              </td>
                              <td className="align-middle">
                                {row.score || "-"}
                              </td>
                              <td className="align-middle">
                                <div>
                                  <p className="my-0 font-weight-bold h6">
                                    {row.total_workmanship_date}
                                  </p>
                                  <p className="my-0">
                                    {row.total_workmanship_time} Menit
                                  </p>
                                </div>
                              </td>

                              <td className="align-middle ">
                                {row.status === 1 && row.finish === 1 ? (
                                  <td className="align-middle ">
                                    {/* <span className="label label-inline label-light-success font-weight-bold">
                                      Diterima
                                    </span> */}
                                    <Badge bg="success">
                                      Sudah Mengerjakan
                                    </Badge>
                                  </td>
                                ) : !row.start_datetime &&
                                  !row.finish_datetime ? (
                                  <td className="align-middle">
                                    <Badge bg="warning">
                                      Belum Mengerjakan
                                    </Badge>
                                  </td>
                                ) : row.start_datetime &&
                                  !row.finish_datetime ? (
                                  <td className="align-middle">
                                    <Badge bg="success">
                                      Sedang Mengerjakan
                                    </Badge>
                                  </td>
                                ) : row.finish == 1 && row.status == 0 ? (
                                  <td className="align-middle">
                                    <Badge bg="success">
                                      Sudah Mengerjakan
                                    </Badge>
                                  </td>
                                ) : (
                                  <td className="align-middle">
                                    <span className="label label-inline label-light-danger font-weight-bold">
                                      -
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
                {trivia && trivia.perPage < trivia.total && (
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
