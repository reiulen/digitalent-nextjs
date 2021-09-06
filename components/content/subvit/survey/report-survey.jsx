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
import { Modal } from "react-bootstrap";

const ReportSurvey = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, survey } = useSelector(
    (state) => state.allReportSurveyQuestionBanks
  );

  let { page = 1, id } = router.query;
  page = Number(page);

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(null);
  const [status, setStatus] = useState("");
  const [pelatihan, setPelatihan] = useState(null);
  const [publishValue, setPublishValue] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (limit) {
      router.push(`${router.pathname}?id=${id}&page=1&limit=${limit}`);
    }
  }, [dispatch, limit, router, id]);

  const handlePagination = (pageNumber) => {
    let link = `${router.pathname}?id=${id}&page=${pageNumber}`;
    if (limit) link = link.concat(`&limit=${limit}`);
    if (search) link = link.concat(`&keyword=${search}`);
    if (status) link = link.concat(`&status=${status}`);
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
    let link = `http://dts-subvit-dev.majapahit.id/api/trivia-question-banks/report/export/${id}`;
    if (search) link = link.concat(`&keyword=${search}`);
    if (status) link = link.concat(`&status=${status}`);
    if (pelatihan) link = link.concat(`&pelatihan=${pelatihan}`);

    await axios.get(link).then((res) => {
      window.location.href = res.data.data;
    });
  };

  const handleFilter = () => {
    let link = `${router.pathname}?id=${id}&page=${1}`;
    if (status) link = link.concat(`&status=${status}`);
    if (pelatihan) link = link.concat(`&pelatihan=${pelatihan}`);
    router.push(link);
  };

  const handlePublish = (val) => {
    setPublishValue(val);
    let link = `${router.pathname}?id=${id}&page=${1}&card=${val}`;
    if (search) link = link.concat(`&keyword=${search}`);
    if (status) link = link.concat(`&status=${status}`);
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

      <div className="col-lg-12 col-md-12">
        <div className="row">
          <CardPage
            background="bg-primary"
            icon="new/add-user.svg"
            color="#FFFFFF"
            value={survey.data.total_peserta}
            titleValue=""
            title="Total Peserta"
            publishedVal=""
            routePublish={() => handlePublish("")}
          />
          <CardPage
            background="bg-secondary"
            icon="new/done-circle.svg"
            color="#FFFFFF"
            value={survey.data.sudah_mengerjakan}
            titleValue=""
            title="Sudah Mengerjakan"
            publishedVal="sudah-mengerjakan"
            routePublish={() => handlePublish("sudah-mengerjakan")}
          />
          <CardPage
            background="bg-success"
            icon="new/open-book.svg"
            color="#FFFFFF"
            value={survey.data.sedang_mengerjakan}
            titleValue=""
            title="Sedang Mengerjakan"
            publishedVal="sedang-mengerjakan"
            routePublish={() => handlePublish("sedang-mengerjakan")}
          />
          <CardPage
            background="bg-warning"
            icon="new/mail-white.svg"
            color="#FFFFFF"
            value={survey.data.belum_mengerjakan}
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
                Report Survey{" "}
                {publishValue === null || ""
                  ? ""
                  : `- ${
                      publishValue.charAt(0).toUpperCase() +
                      publishValue.slice(1).replace("-", " ")
                    }`}
              </h3>
              <p className="text-muted">FGA - Cloud Computing</p>
            </div>
            <div className="card-toolbar"></div>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-md-5">
                  <div
                    className="position-relative overflow-hidden mt-3"
                    style={{ maxWidth: "330px" }}
                  >
                    <i className="ri-search-line left-center-absolute ml-2"></i>
                    <input
                      type="text"
                      className="form-control pl-10"
                      placeholder="Ketik disini untuk Pencarian..."
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                      className="btn bg-blue-primary text-white right-center-absolute"
                      style={{
                        borderTopLeftRadius: "0",
                        borderBottomLeftRadius: "0",
                      }}
                      onClick={handleSearch}
                    >
                      Cari
                    </button>
                  </div>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-4">
                  <button
                    className="btn border d-flex align-items-center justify-content-between mt-1"
                    style={{
                      minWidth: "280px",
                      color: "#bdbdbd",
                      float: "right",
                    }}
                    onClick={() => setShowModal(true)}
                  >
                    <div className="d-flex align-items-center">
                      <i className="ri-filter-fill mr-3"></i>
                      Pilih Filter
                    </div>
                    <i className="ri-arrow-down-s-line"></i>
                  </button>
                </div>
                <div className="col-md-2">
                  {/* <button
                    className="btn btn-sm btn-success px-6 font-weight-bold btn-block "
                    type="button"
                    onClick={handleExportReport}
                  >
                    Export .CSV
                  </button> */}
                  <button
                    className="btn btn-rounded-full bg-blue-secondary text-white mt-2"
                    type="button"
                    onClick={handleExportReport}
                  >
                    Export
                    <i className="ri-arrow-down-s-line ml-3 mt-1 text-white"></i>
                  </button>
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
                        <th>Total Pengerjaan</th>
                        <th>Jawaban</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {survey && survey.data.reports.length === 0 ? (
                        <tr>
                          <td className="text-center" colSpan={6}>
                            Data Masih Kosong
                          </td>
                        </tr>
                      ) : (
                        survey &&
                        survey.data.reports.map((row, i) => {
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
                                  <p className="my-0">{row.nik}</p>
                                </div>
                              </td>
                              <td className="align-middle">
                                <p className="font-weight-bold">
                                  {row.training.name}
                                </p>
                              </td>
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
                                    Benar: {row.right_answer} Jawaban
                                  </p>
                                  <p className="my-0">
                                    Salah: {row.wrong_answer} Jawaban
                                  </p>
                                  <p className="my-0">
                                    Jumlah: {row.total_questions} Jawaban
                                  </p>
                                </div>
                              </td>
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
                {survey && survey.total > 5 && (
                  <div className="table-pagination">
                    <Pagination
                      activePage={page}
                      itemsCountPerPage={survey.perPage}
                      totalItemsCount={survey.total}
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
                {survey && survey.total > 4 ? (
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
                          Total Data {survey.total}
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
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mb-5">
            <label className="p-0">Pelatihan</label>
            <select className="form-control">
              <option>Semua</option>
            </select>
          </div>
          <div className="form-group mb-5">
            <label className="p-0">Status</label>
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
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-light-ghost-rounded-full mr-2"
            type="reset"
          >
            Reset
          </button>
          <button
            className="btn btn-primary-rounded-full"
            type="button"
            onClick={handleFilter}
          >
            Terapkan
          </button>
        </Modal.Footer>
      </Modal>
    </PageWrapper>
  );
};

export default ReportSurvey;
