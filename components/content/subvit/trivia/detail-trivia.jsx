import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";
import PageWrapper from "../../../wrapper/page.wrapper";
import moment from "moment";
import "moment/locale/id";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteTriviaQuestionDetail,
  clearErrors,
  getAllTriviaQuestionDetail,
} from "../../../../redux/actions/subvit/trivia-question-detail.action";
import Swal from "sweetalert2";

import { Modal, Button } from "react-bootstrap";

const DetailTrivia = ({ token, tokenPermission }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { trivia_question_detail } = useSelector(
    (state) => state.allTriviaQuestionDetail
  );
  const { error, isDeleted } = useSelector(
    (state) => state.deleteTriviaQuestionDetail
  );

  const { data: dataPermission } = useSelector(
    (state) => state.permissionsSubvit
  );

  const { trivia } = useSelector((state) => state.detailTriviaQuestionBanks);

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(null);
  const [modalType, setModalType] = useState(false);

  let { page = 1, id } = router.query;
  page = Number(page);

  useEffect(() => {
    localStorage.setItem("id_trivia", router.query.id);
    if (isDeleted) {
      dispatch(
        getAllTriviaQuestionDetail(id, 1, "", null, token, tokenPermission)
      );
      Swal.fire("Berhasil ", "Data berhasil dihapus.", "success");
    }
  }, [router, isDeleted, trivia, id, token, dispatch, tokenPermission]);

  const handlePagination = (pageNumber) => {
    router.push(
      `${router.pathname}?id=${id}&page=${pageNumber}&limit=${limit || 5}`
    );
  };

  const handleLimit = (val) => {
    setLimit(val);
    router.push(`${router.pathname}?id=${id}&page=${1}&limit=${val}`);
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
        dispatch(deleteTriviaQuestionDetail(id, token, tokenPermission));
      }
    });
  };

  const handleModal = () => {
    setModalType(true);
  };

  const handleEntry = () => {
    router.push({
      pathname: `/subvit/trivia/tambah/step-2-entry`,
      query: { id },
    });
    localStorage.setItem("detail-entry", router.asPath);
  };

  const handleImport = () => {
    router.push({
      pathname: `/subvit/trivia/tambah/step-2-import`,
      query: { id },
    });
    localStorage.setItem("detail-import", router.asPath);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(
      getAllTriviaQuestionDetail(id, 1, search, 5, token, tokenPermission)
    );
  };

  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <PageWrapper>
      {router.query.success ? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
        >
          <div className="alert-icon">
            <i className="flaticon2-checkmark"></i>
          </div>
          <div className="alert-text">Berhasil Menyimpan Data</div>
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
            <h2 className="card-title h2 text-dark">
              TRIVIA {trivia && trivia.academy ? trivia.academy.name : ""}{" "}
              {trivia && trivia.theme && "-"}{" "}
              {trivia && trivia.theme ? trivia.theme.name : ""}
            </h2>
            {(dataPermission && dataPermission.roles.includes("Super Admin")) ||
            (dataPermission &&
              dataPermission.permissions.includes(
                "subvit.manage" && "subvit.trivia.manage"
              )) ? (
              <div className="card-toolbar">
                <Link href={`/subvit/trivia/edit?id=${id}`}>
                  <a className="btn btn-primary-rounded-full px-7 font-weight-bold btn-block ">
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
              <div className="col-md-6">
                <div className="row">
                  <div
                    className="col-md-3 title-1 font-weight-bold"
                    style={{ color: "#000000" }}
                  >
                    <p>Akademi</p>
                    <p>Tema</p>
                    <p>Pelatihan</p>
                  </div>
                  <div className="col-md-9 value-1">
                    <p>
                      {trivia && trivia.academy ? trivia.academy.name : "-"}
                    </p>
                    <p>{trivia && trivia.theme ? trivia.theme.name : "-"}</p>
                    <p>
                      {trivia && trivia.training != null
                        ? trivia.training.name
                        : "-"}
                    </p>
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
                    <p>Status</p>
                  </div>
                  <div className="col value-1">
                    <p>
                      {trivia && trivia.start_at
                        ? moment(trivia.start_at).format("ll")
                        : ""}{" "}
                      -{" "}
                      {trivia && trivia.end_at
                        ? moment(trivia.end_at).format("ll")
                        : ""}
                    </p>
                    <p>
                      {trivia && trivia.questions_to_share
                        ? trivia.questions_to_share
                        : "Belum Ada"}{" "}
                      Soal
                    </p>
                    <p>
                      {trivia && trivia.duration ? trivia.duration : 0} Menit
                    </p>
                    <p>{trivia && trivia.status === 1 ? "Publish" : "Draft"}</p>
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
              {/* <label htmlFor=""></label> */}
            </div>
            {(dataPermission && dataPermission.roles.includes("Super Admin")) ||
            (dataPermission &&
              dataPermission.permissions.includes(
                "subvit.manage" && "subvit.trivia.manage"
              )) ? (
              <div className="card-toolbar">
                <a
                  className="btn btn-primary-rounded-full px-7 font-weight-bold btn-block"
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
                <div className="col-lg-10 col-xl-10">
                  <div
                    className="position-relative overflow-hidden mt-3"
                    style={{ maxWidth: "330px" }}
                  >
                    <form onSubmit={(e) => handleSearch(e)}>
                      <i className="ri-search-line left-center-absolute ml-2"></i>
                      <input
                        type="text"
                        className="form-control pl-10"
                        placeholder="Ketik disini untuk Pencarian..."
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </form>
                    <button
                      className="btn bg-blue-primary text-white right-center-absolute"
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
                      {(dataPermission &&
                        dataPermission.roles.includes("Super Admin")) ||
                      (dataPermission &&
                        dataPermission.permissions.includes(
                          "subvit.manage" && "subvit.trivia.manage"
                        )) ? (
                        <th>Aksi</th>
                      ) : (
                        ""
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {trivia_question_detail &&
                    trivia_question_detail.list_questions &&
                    trivia_question_detail.list_questions.length === 0 ? (
                      <td className="align-middle text-center" colSpan={8}>
                        Data Tidak Ditemukan
                      </td>
                    ) : (
                      trivia_question_detail &&
                      trivia_question_detail.list_questions.map(
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
                              <td className="align-middle">CC{question.id}</td>
                              <td className="align-middle">
                                {truncateString(
                                  question && question.question,
                                  80
                                )}
                              </td>
                              <td className="align-middle">
                                {question.status ? (
                                  <span className="label label-inline label-light-success font-weight-bold">
                                    Publish
                                  </span>
                                ) : (
                                  <span className="label label-inline label-light-warning font-weight-bold">
                                    Draft
                                  </span>
                                )}
                              </td>
                              {(dataPermission &&
                                dataPermission.roles.includes("Super Admin")) ||
                              (dataPermission &&
                                dataPermission.permissions.includes(
                                  "subvit.manage" && "subvit.trivia.manage"
                                )) ? (
                                <td className="align-middle">
                                  <div className="d-flex">
                                    <Link
                                      href={`edit-soal-trivia?id=${question.id}&no=${i}`}
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
                                      className={
                                        "btn btn-link-action bg-blue-secondary text-white"
                                      }
                                      onClick={() => handleDelete(question.id)}
                                      data-toggle="tooltip"
                                      data-placement="bottom"
                                      title="Hapus"
                                      style={{
                                        cursor: "pointer",
                                      }}
                                    >
                                      <i className="ri-delete-bin-fill p-0 text-white"></i>
                                    </button>
                                  </div>
                                </td>
                              ) : (
                                ""
                              )}
                            </tr>
                          );
                        }
                      )
                    )}
                  </tbody>
                </table>
              </div>

              <div className="row">
                {trivia_question_detail &&
                  trivia_question_detail.perPage <
                    trivia_question_detail.total && (
                    <div className="table-pagination">
                      <Pagination
                        activePage={page}
                        itemsCountPerPage={trivia_question_detail.perPage}
                        totalItemsCount={trivia_question_detail.total}
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
                {trivia_question_detail && trivia_question_detail.total > 5 ? (
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
                          Total Data {trivia_question_detail.total}
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
        show={modalType}
        onHide={() => setModalType(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <button
            type="button"
            className="close"
            onClick={() => setModalType(false)}
          >
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
          <center>
            <i
              className="ri-information-line"
              style={{ fontSize: "100px", color: "#17a2b8" }}
            ></i>
            <h3>Silahkan Pilih Metode Entry</h3>
            <Button
              className="btn btn-outline-primary font-weight-bolder px-7 py-3 mt-5 mr-5"
              style={{ borderRadius: "5px", border: "1px solid" }}
              onClick={handleImport}
            >
              Import
            </Button>
            <Button
              className="btn btn-primary font-weight-bolder px-7 py-3 mt-5 "
              onClick={handleEntry}
            >
              Entry
            </Button>
          </center>
        </Modal.Body>
      </Modal>
    </PageWrapper>
  );
};

export default DetailTrivia;
