import React, { useState, useEffect } from "react";

import Link from "next/link";
import Swal from "sweetalert2";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllSubtanceQuestionDetail,
  deleteSubtanceQuestionDetail,
  importFileSubtanceQuestionDetail,
  importImagesSubtanceQuestionDetail,
  clearErrors,
} from "../../../../../redux/actions/subvit/subtance-question-detail.action";
import {
  IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_RESET,
  IMPORT_IMAGES_SUBTANCE_QUESTION_DETAIL_RESET,
  DELETE_SUBTANCE_QUESTION_DETAIL_RESET,
} from "../../../../../redux/types/subvit/subtance-question-detail.type";
import { useRouter } from "next/router";

import PageWrapper from "/components/wrapper/page.wrapper";
import StepInput from "/components/StepInput";
import StepInputClone from "/components/StepInputClone";
import LoadingTable from "../../../../LoadingTable";
import axios from "axios";
import styles from "../../trivia/edit/step.module.css";

const StepTwo = ({ token, tokenPermission }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    loading: loadingData,
    error: errorData,
    success: successData,
    subtance_question_detail,
  } = useSelector((state) => state.allSubtanceQuestionDetail);
  const {
    loading: loadingDelete,
    error: errorDelete,
    isDeleted,
  } = useSelector((state) => state.deleteSubtanceQuestionDetail);
  const {
    loading: loadingFile,
    error: errorFile,
    success: successFile,
    subtance_question_file,
  } = useSelector((state) => state.importFileSubtanceQuestionDetail);
  const {
    loading: loadingImages,
    error: errorImages,
    success: successImages,
    subtance_question_images,
  } = useSelector((state) => state.importImagesSubtanceQuestionDetail);
  let { id } = router.query;

  let error;
  if (errorFile) {
    error = errorFile;
  } else if (errorImages) {
    error = errorImages;
  } else if (errorData) {
    error = errorData;
  } else if (errorDelete) {
    error = errorDelete;
  }
  let loading = false;
  if (loadingFile) {
    loading = loadingFile;
  } else if (loadingImages) {
    loading = loadingImages;
  } else if (loadingData) {
    loading = loadingData;
  } else if (loadingDelete) {
    loading = loadingData;
  }

  const [question_file, setQuestionFile] = useState(null);
  const [image_file, setImageFile] = useState(null);
  const [typeSave, setTypeSave] = useState("lanjut");
  const [successType, setSuccessType] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    dispatch(
      getAllSubtanceQuestionDetail(
        id,
        1,
        null,
        null,
        "",
        "",
        "",
        token,
        tokenPermission
      )
    );
    // if (error) {
    //     dispatch(clearErrors())
    // }
    if (successFile) {
      dispatch(
        getAllSubtanceQuestionDetail(
          id,
          1,
          null,
          null,
          "",
          "",
          "",
          token,
          tokenPermission
        )
      );
      setQuestionFile(null);
      document.getElementById("question_soal").value = null;
    }

    if (successImages) {
      dispatch(
        getAllSubtanceQuestionDetail(
          id,
          1,
          null,
          null,
          "",
          "",
          "",
          token,
          tokenPermission
        )
      );
      setImageFile(null);
      document.getElementById("question_image").value = null;
    }

    if (isDeleted) {
      dispatch(
        getAllSubtanceQuestionDetail(
          id,
          1,
          null,
          null,
          "",
          "",
          "",
          token,
          tokenPermission
        )
      );
    }
  }, [
    dispatch,
    id,
    successFile,
    successImages,
    isDeleted,
    token,
    tokenPermission,
  ]);

  const saveDraft = () => {
    let valid = true;

    if (localStorage.getItem("successFile") === null) {
      if (!successImages) {
        valid = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Isi data gambar dengan benar !",
        });
      }
      if (!successFile) {
        valid = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Isi data soal dengan benar !",
        });
      }
    }

    if (valid) {
      localStorage.removeItem("method");
      localStorage.removeItem("step2");
      localStorage.removeItem("clone");
      localStorage.removeItem("successFile");
      localStorage.removeItem("successImage");
      dispatch({
        type: IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_RESET,
      });
      dispatch({
        type: IMPORT_IMAGES_SUBTANCE_QUESTION_DETAIL_RESET,
      });
      if (localStorage.getItem("detail-import") !== null) {
        router.push(localStorage.getItem("detail-import"));
        localStorage.removeItem("detail-import");
      } else {
        router.push({
          pathname: `/subvit/substansi`,
          query: { success: true },
        });
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (localStorage.getItem("successFile") === null) {
      if (!successImages) {
        valid = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Isi data gambar dengan benar !",
        });
      }
      if (!successFile) {
        valid = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Isi data soal dengan benar !",
        });
      }
    }

    if (valid) {
      localStorage.setItem("method", "import" || router.query.metode);
      localStorage.removeItem("successFile");
      localStorage.removeItem("successImage");
      if (localStorage.getItem("detail-import") !== null) {
        router.push(localStorage.getItem("detail-import"));
        localStorage.removeItem("detail-import");
        localStorage.removeItem("method");
        localStorage.removeItem("step2");
        localStorage.removeItem("clone");
      } else {
        if (localStorage.getItem("clone") === "true") {
          router.push(`/subvit/substansi/clone/step-4?id=${router.query.id}`);
        } else {
          router.push({
            pathname: `/subvit/substansi/tambah-step-3`,
            query: { id },
          });
        }
      }
    }
  };

  const handleImportFile = async () => {
    const data = new FormData();
    data.append("subtance_question_bank_id", id);
    data.append("question_file", question_file, question_file.name);

    Swal.fire({
      title: "Perhatian",
      text: "Jika file anda mempunyai gambar harap import gambar terlebih dahulu, atau kamu tetap ingin melanjutkan !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya Lanjut !",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          importFileSubtanceQuestionDetail(data, token, tokenPermission)
        );
        setSuccessType("file");
      }
    });
  };

  const handleImportImage = async () => {
    const data = new FormData();
    // data.append("subtance_question_bank_id", id);
    data.append("image_file", image_file, image_file.name);

    dispatch(importImagesSubtanceQuestionDetail(data, token, tokenPermission));
  };

  const handlePagination = (pageNumber) => {
    router.push(`${router.pathname}?id=${id}&page=${pageNumber}`);
    setPage(pageNumber);
    dispatch(
      getAllSubtanceQuestionDetail(
        id,
        pageNumber,
        "",
        limit,
        "",
        "",
        "",
        token,
        tokenPermission
      )
    );
  };

  const handleLimit = (val) => {
    // router.push(`${router.pathname}?id=${id}&page=${1}&limit=${val}`);
    // dispatch(getAllSubtanceQuestionDetail(id, 1, val, token, tokenPermission));
    setPage(1);
    setLimit(val);
    dispatch(
      getAllSubtanceQuestionDetail(
        id,
        1,
        "",
        val,
        "",
        "",
        "",
        token,
        tokenPermission
      )
    );
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
        dispatch(deleteSubtanceQuestionDetail(id, token, tokenPermission));
      }
    });
  };

  const handleDownloadTemplate = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
        Permission: tokenPermission || "",
      },
    };

    await axios
      .get(
        process.env.END_POINT_API_SUBVIT +
          "api/subtance-question-bank-details/template",
        config
      )
      .then((res) => {
        res.data.data.map((row, i) => {
          if (i === 0) {
            window.open(row);
          } else {
            window.location.href = row;
          }
        });
      });
  };

  const handleResetDelete = () => {
    dispatch({
      type: DELETE_SUBTANCE_QUESTION_DETAIL_RESET,
    });
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
      {isDeleted ? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
        >
          <div className="alert-icon">
            <i className="flaticon2-checkmark"></i>
          </div>
          <div className="alert-text">Berhasil Menghapus Data</div>
          <div className="alert-close">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={handleResetDelete}
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
      <div className="col-lg-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          {localStorage.getItem("clone") === "true" ? (
            <StepInputClone step="3" />
          ) : (
            <StepInput step="2" title="Substansi" />
          )}
          <div className="card-header border-0">
            <h2 className="card-title h2 text-dark">Metode Import .csv/.xls</h2>
          </div>
          <div className="card-body pt-2">
            <div className="mb-5">
              <p className="mb-1">Unduh Template Soal</p>
              <div className="row">
                <div className="col">
                  <button
                    type="button"
                    onClick={handleDownloadTemplate}
                    className="btn btn-rounded-full bg-blue-secondary btn-sm text-white"
                  >
                    <i className="ri-download-2-fill text-white"></i> Unduh
                  </button>
                </div>
              </div>
              <div className="mt-5">
                <span style={{ color: "#ffa800" }}>
                  *Jika anda ingin membuat soal yang terdapat gambar silahkan
                  import file gambar terlebih dahulu !
                </span>
              </div>
            </div>

            <form onSubmit={onSubmit} id="form-upload">
              <div className="form-group row pt-3">
                <div className="col-sm-10 col-md-10">
                  <span>File Soal</span>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      accept=".csv,.xlsx,.xls"
                      name="question_soal"
                      id="question_soal"
                      onChange={(e) => {
                        setQuestionFile(null);
                        dispatch({
                          type: IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_RESET,
                        });
                        if (e.target.files[0]) {
                          localStorage.setItem(
                            "successFile",
                            e.target.files[0].name
                          );
                          setQuestionFile(e.target.files[0]);
                        }
                      }}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      {question_file ||
                      localStorage.getItem("successFile") !== null
                        ? localStorage.getItem("successFile")
                        : "Choose file"}
                    </label>
                  </div>
                  <span className="text-muted">
                    Silahkan File berformat .csv / .xls
                  </span>
                </div>
                <div className="col-md-2 col-sm-2 d-flex align-items-center">
                  {question_file ? (
                    <button
                      type="button"
                      className="btn btn-rounded-full btn-light-success btn-sm py-3"
                      onClick={handleImportFile}
                    >
                      Import File
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-rounded-full btn-light-success btn-sm py-3"
                      onClick={handleImportFile}
                      disabled={!question_file}
                      style={{ cursor: "not-allowed" }}
                    >
                      Import File
                    </button>
                  )}
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-10 col-md-10">
                  <span>File Gambar</span>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      accept=".zip"
                      name="question_image"
                      id="question_image"
                      onChange={(e) => {
                        setImageFile(null);
                        dispatch({
                          type: IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_RESET,
                        });
                        if (e.target.files[0]) {
                          localStorage.setItem(
                            "successImage",
                            e.target.files[0].name
                          );
                          setImageFile(e.target.files[0]);
                          setSuccessType("images");
                        }
                      }}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      {image_file ||
                      localStorage.getItem("successImage") !== null
                        ? localStorage.getItem("successImage")
                        : "Choose file"}
                    </label>
                  </div>
                  <span className="text-muted">
                    Silahkan File berformat .zip
                  </span>
                </div>
                <div className="col-md-2 col-sm-2 d-flex align-items-center">
                  {image_file ? (
                    <button
                      type="button"
                      className="btn btn-rounded-full btn-light-success btn-sm py-3"
                      onClick={handleImportImage}
                    >
                      Import File
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-rounded-full btn-light-success btn-sm py-3"
                      onClick={handleImportFile}
                      disabled={!image_file}
                      style={{ cursor: "not-allowed" }}
                    >
                      Import File
                    </button>
                  )}
                </div>
              </div>

              <div className="table-page" style={{ marginTop: "20px" }}>
                {successFile && successType === "file" && (
                  <div className="mb-5">
                    <h2 className="text-success">Sukses Import Soal</h2>
                    <span className="text-muted">
                      {subtance_question_file.success +
                        subtance_question_file.failed}{" "}
                      Total Import | {subtance_question_file.success} Sukses di
                      Import | {subtance_question_file.failed} Gagal di import
                    </span>
                  </div>
                )}
                {successImages && successType === "images" && (
                  <div className="mb-5">
                    <h2 className="text-success">Sukses Import Gambar</h2>
                    <span className="text-muted">
                      {subtance_question_images.success +
                        subtance_question_images.failed}{" "}
                      Total Import | {subtance_question_images.success} Sukses
                      di Import | {subtance_question_images.failed} Gagal di
                      import
                    </span>
                  </div>
                )}

                <div className="table-responsive">
                  <LoadingTable loading={loading} />

                  {loading === false && (
                    <table className="table table-separate table-head-custom table-checkable">
                      <thead style={{ background: "#F3F6F9" }}>
                        <tr>
                          <th className="text-center">No</th>
                          <th>ID Soal</th>
                          <th>Soal</th>
                          <th>Kategori</th>
                          <th>Bobot</th>
                          <th>Status</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subtance_question_detail &&
                        subtance_question_detail.list_questions &&
                        subtance_question_detail.list_questions.length === 0 ? (
                          <td className="align-middle text-center" colSpan={8}>
                            Data Kosong
                          </td>
                        ) : (
                          subtance_question_detail &&
                          subtance_question_detail.list_questions &&
                          subtance_question_detail.list_questions.map(
                            (question, i) => {
                              return (
                                <tr key={question.id}>
                                  <td className="align-middle text-center">
                                    <span className="">
                                      {i + 1 * (page * 5 || limit) - 4}
                                    </span>
                                  </td>
                                  <td className="align-middle font-weight-bold">
                                    CC{question.id}
                                  </td>
                                  <td className="align-middle">
                                    {question.question}
                                  </td>
                                  <td className="align-middle">
                                    {question.type && question.type.name}
                                  </td>
                                  <td className="align-middle">
                                    {question.type && question.type.value}
                                  </td>
                                  <td className="align-middle">
                                    {question.status === 1 ? (
                                      <span className="label label-inline label-success font-weight-bold">
                                        Publish
                                      </span>
                                    ) : (
                                      <span className="label label-inline label-warning font-weight-bold">
                                        Draft
                                      </span>
                                    )}
                                  </td>
                                  <td className="align-middle d-flex">
                                    <Link
                                      href={`edit-soal-substansi?id=${
                                        question.id
                                      }&no=${
                                        i + 1 * (page * 5 || limit) - 1 - 4
                                      }`}
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
                                      type="button"
                                      data-toggle="tooltip"
                                      data-placement="bottom"
                                      title="Hapus"
                                    >
                                      <i className="ri-delete-bin-fill p-0 text-white"></i>
                                    </button>
                                  </td>
                                </tr>
                              );
                            }
                          )
                        )}
                      </tbody>
                    </table>
                  )}
                </div>

                {subtance_question_detail &&
                  subtance_question_detail.list_questions &&
                  subtance_question_detail.list_questions.length > 0 && (
                    <div className="row">
                      <div className="table-pagination">
                        {subtance_question_detail && (
                          <Pagination
                            activePage={page}
                            itemsCountPerPage={subtance_question_detail.perPage}
                            totalItemsCount={subtance_question_detail.total}
                            pageRangeDisplayed={3}
                            onChange={handlePagination}
                            nextPageText={">"}
                            prevPageText={"<"}
                            firstPageText={"<<"}
                            lastPageText={">>"}
                            itemClass="page-item"
                            linkClass="page-link"
                          />
                        )}
                      </div>

                      <div className="table-total ml-auto">
                        {subtance_question_detail &&
                          subtance_question_detail.list_questions && (
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
                                  value={limit}
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
                                  Total Data {subtance_question_detail.total}
                                </p>
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  )}
              </div>

              <div className="row">
                <div className="col-sm-12 mt-3">
                  {(localStorage.getItem("detail-import") !== null ||
                    localStorage.getItem("clone") !== null) && (
                    <button
                      className={`${styles.btnNext} btn btn-light-ghost-rounded-full mr-2`}
                      type="button"
                      onClick={() => {
                        if (localStorage.getItem("clone") === "true") {
                          router.push(
                            `/subvit/substansi/clone/step-3?id=${router.query.id}`
                          );
                        } else {
                          if (localStorage.getItem("detail-entry") !== null) {
                            router.push(localStorage.getItem("detail-entry"));
                            localStorage.removeItem("successFile");
                            localStorage.removeItem("successImage");
                            localStorage.removeItem("detail-entry");
                          } else {
                            router.push(`/subvit/substansi/tambah-step-1`);
                          }
                        }
                      }}
                    >
                      Kembali
                    </button>
                  )}
                  <div className="float-right">
                    <button
                      className={`${styles.btnNext} btn btn-light-ghost-rounded-full mr-2`}
                      type="submit"
                    >
                      Simpan & Lanjut
                    </button>
                    <button
                      className="btn btn-primary-rounded-full text-white"
                      onClick={saveDraft}
                      type="button"
                    >
                      Simpan Draft
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default StepTwo;
