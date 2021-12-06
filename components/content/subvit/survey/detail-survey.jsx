import React, { useEffect, useState } from "react";

import Link from "next/link";

import { useRouter } from "next/router";

import Pagination from "react-js-pagination";

import PageWrapper from "../../../wrapper/page.wrapper";

import moment from "moment";
import "moment/locale/id";

import { useDispatch, useSelector } from "react-redux";

import {
  deleteSurveyQuestionDetail,
  clearErrors,
  getAllSurveyQuestionDetail,
} from "../../../../redux/actions/subvit/survey-question-detail.action";

const DetailSurvey = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { survey_question_detail } = useSelector(
    (state) => state.allSurveyQuestionDetail
  );
  const { error, isDeleted } = useSelector(
    (state) => state.deleteSurveyQuestionDetail
  );
  const { survey } = useSelector((state) => state.detailSurveyQuestionBanks);

  const { data: dataPermission } = useSelector(
    (state) => state.permissionsSubvit
  );

  let { page = 1, id } = router.query;
  page = Number(page);

  useEffect(() => {
    if (isDeleted) {
      dispatch(getAllSurveyQuestionDetail(id, token));
      Swal.fire("Berhasil ", "Data berhasil dihapus.", "success");
    }
  }, [isDeleted, id, token, dispatch]);

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(null);

  const handlePagination = (pageNumber) => {
    router.push({
      pathname: `${router.pathname}`,
      query: { id, page: pageNumber, limit: limit || 5 },
    });
  };

  const handleLimit = (val) => {
    setLimit(val);
    router.push({
      pathname: `${router.pathname}`,
      query: { id, page: 1, limit: val },
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah anda yakin ?",
      text: "Data ini tidak bisa dikembalikan !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya !",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteSurveyQuestionDetail(id, token));
      }
    });
  };

  const handleModal = () => {
    Swal.fire({
      title: "Silahkan Pilih Metode Entry",
      icon: "info",
      showDenyButton: true,
      showCloseButton: true,
      confirmButtonText: `Entry`,
      denyButtonText: `Import`,
      confirmButtonColor: "#3085d6",
      denyButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push({
          pathname: `/subvit/survey/tambah/step-2-entry`,
          query: { id },
        });
      } else if (result.isDenied) {
        router.push({
          pathname: `/subvit/survey/tambah/step-2-import`,
          query: { id },
        });
      }
    });
  };

  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      dispatch(getAllSurveyQuestionDetail(id, 1, 5, search, token));
    }
  };

  const handleSearch = () => {
    dispatch(getAllSurveyQuestionDetail(id, 1, 5, search, token));
  };

  const handleTextSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
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
              onClick={handleResetError}
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
            <h2 className="card-title h2 text-dark">
              Survey {survey.academy ? survey.academy.name : ""} -{" "}
              {survey.theme ? survey.theme.name : ""}
            </h2>
            {dataPermission &&
            dataPermission.roles.includes("Super Admin") &&
            dataPermission &&
            dataPermission.permissions.includes(
              "subvit.manage" && "subvit.survey.manage"
            ) ? (
              <div className="card-toolbar">
                <Link href={`/subvit/survey/edit?id=${id}`}>
                  <a className="btn btn-primary-rounded-full px-6 font-weight-bold btn-block ">
                    <i className="ri-pencil-fill"></i>
                    Edit
                  </a>
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col-md-5">
                <div className="row">
                  <div
                    className="col-sm-4 title-1 font-weight-bold"
                    style={{ color: "#000000" }}
                  >
                    <p>Akademi</p>
                    <p>Tema</p>
                    <p>Pelatihan</p>
                    <p>Status</p>
                  </div>
                  <div className="col-sm-8 value-1">
                    <p>
                      {survey && survey.academy ? survey.academy.name : "-"}
                    </p>
                    <p>{survey && survey.theme ? survey.theme.name : "-"} </p>
                    <p>
                      {survey && survey.training ? survey.training.name : "-"}
                    </p>
                    <p>{survey && survey ? "Publish" : "Draft"}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="row">
                  <div
                    className="col title-1 font-weight-bold"
                    style={{ color: "#000000" }}
                  >
                    <p>Pelaksanaan</p>
                    <p>Jumlah Soal</p>
                    <p>Durasi Tes</p>
                  </div>
                  <div className="col value-1">
                    <p>
                      {survey.start_at &&
                        moment(survey && survey.start_at).format("ll")}{" "}
                      -{" "}
                      {survey.end_at &&
                        moment(survey && survey.end_at).format("ll")}
                    </p>
                    <p>{(survey && survey.questions_to_share) || "-"} Soal</p>
                    <p>{(survey && survey.duration) || "-"} Menit</p>
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
            <div className="card-toolbar">
              <h2 className="card-title h2 text-dark">Bank Soal</h2>
              {/* <span>200 Bank Soal | 150 Ingatan | 50 Analitik</span> */}
            </div>
            {dataPermission &&
            dataPermission.roles.includes("Super Admin") &&
            dataPermission &&
            dataPermission.permissions.includes(
              "subvit.manage" && "subvit.survey.manage"
            ) ? (
              <div className="card-toolbar">
                <a
                  className="btn btn-primary-rounded-full px-y font-weight-bold btn-block "
                  onClick={handleModal}
                >
                  <i className="ri-add-fill"></i>
                  Tambah Soal
                </a>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-8 col-xl-8">
                  <div
                    className="position-relative overflow-hidden mt-3"
                    style={{ maxWidth: "330px" }}
                  >
                    <i className="ri-search-line left-center-absolute ml-2"></i>
                    <input
                      type="text"
                      className="form-control pl-10"
                      placeholder="Ketik disini untuk Pencarian..."
                      onChange={(event) => handleTextSearch(event)}
                      onKeyUp={(event) => handleSearchEnter(event)}
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
              </div>
            </div>

            <div className="table-page mt-5">
              <div className="table-responsive">
                <table className="table table-separate table-head-custom table-checkable">
                  <thead style={{ background: "#F3F6F9" }}>
                    <tr>
                      <th className="text-center">No</th>
                      <th>ID Soal</th>
                      <th>Soal</th>
                      <th>Status</th>
                      {dataPermission &&
                      dataPermission.roles.includes("Super Admin") &&
                      dataPermission &&
                      dataPermission.permissions.includes(
                        "subvit.manage" && "subvit.survey.manage"
                      ) ? (
                        <th>Aksi</th>
                      ) : (
                        ""
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {survey_question_detail &&
                    survey_question_detail.list_questions &&
                    survey_question_detail.list_questions.length === 0 ? (
                      <td className="align-middle text-center" colSpan={8}>
                        Data Tidak Ditemukan
                      </td>
                    ) : (
                      survey_question_detail &&
                      survey_question_detail.list_questions.map(
                        (question, i) => {
                          return (
                            <tr key={question.id}>
                              <td className="align-middle text-center">
                                <span className="">
                                  {limit === null ? (
                                    <span>{i + 1 * (page * 5) - (5 - 1)}</span>
                                  ) : (
                                    <span>
                                      {i + 1 * (page * limit) - (limit - 1)}
                                    </span>
                                  )}
                                </span>
                              </td>
                              <td className="align-middle font-weight-bold">
                                CC{question.id}
                              </td>
                              <td className="align-middle">
                                {question.question}
                              </td>
                              <td className="align-middle">
                                {question.status === 1 ? (
                                  <span className="label label-inline label-light-success font-weight-bold">
                                    Publish
                                  </span>
                                ) : (
                                  <span className="label label-inline label-light-warning font-weight-bold">
                                    Draft
                                  </span>
                                )}
                              </td>
                              {}
                              <td className="align-middle">
                                {dataPermission &&
                                dataPermission.roles.includes("Super Admin") &&
                                dataPermission &&
                                dataPermission.permissions.includes(
                                  "subvit.manage" && "subvit.survey.manage"
                                ) ? (
                                  <div className="d-flex">
                                    <Link
                                      href={`edit-soal-survey?id=${question.id}`}
                                    >
                                      <a
                                        className="btn btn-link-action bg-blue-secondary text-white mr-2"
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="Edit"
                                      >
                                        <i className="ri-pencil-fill p-0 text-white"></i>
                                      </a>
                                    </Link>
                                    <button
                                      className="btn btn-link-action bg-blue-secondary text-white"
                                      onClick={() => handleDelete(question.id)}
                                      data-toggle="tooltip"
                                      data-placement="bottom"
                                      title="Hapus"
                                    >
                                      <i className="ri-delete-bin-fill p-0 text-white"></i>
                                    </button>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </td>
                            </tr>
                          );
                        }
                      )
                    )}
                  </tbody>
                </table>
              </div>

              <div className="row">
                {survey_question_detail &&
                  survey_question_detail.perPage <
                    survey_question_detail.total && (
                    <div className="table-pagination">
                      <Pagination
                        activePage={page}
                        itemsCountPerPage={survey_question_detail.perPage}
                        totalItemsCount={survey_question_detail.total}
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
                {survey_question_detail && survey_question_detail.total > 5 ? (
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
                          <option value="30">30</option>
                        </select>
                      </div>
                      <div className="col-8 my-auto">
                        <p
                          className="align-middle mt-3"
                          style={{ color: "#B5B5C3" }}
                        >
                          Total Data {survey_question_detail.total}
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

export default DetailSurvey;
