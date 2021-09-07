import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";
import { Modal } from "react-bootstrap";

import PageWrapper from "../../../wrapper/page.wrapper";
import ButtonAction from "../../../ButtonAction";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteSubtanceQuestionDetail,
  clearErrors,
} from "../../../../redux/actions/subvit/subtance-question-detail.action";

const DetailSubstansi = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { subtance_question_detail } = useSelector(
    (state) => state.allSubtanceQuestionDetail
  );
  const { error, isDeleted } = useSelector(
    (state) => state.deleteSubtanceQuestionDetail
  );
  const { subtance } = useSelector(
    (state) => state.detailSubtanceQuestionBanks
  );
  const { subtance_question_type } = useSelector(
    (state) => state.allSubtanceQuestionType
  );

  let { page = 1, id } = router.query;
  page = Number(page);

  useEffect(() => {
    if (isDeleted) {
      Swal.fire("Berhasil ", "Data berhasil dihapus.", "success").then(
        (result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        }
      );
    }
  }, [isDeleted]);

  const [status, setStatus] = useState("");
  const [kategori, setKategori] = useState(null);
  const [pelatihan, setPelatihan] = useState(null);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handlePagination = (pageNumber) => {
    let link = `${router.pathname}?id=${id}&page=${pageNumber}`;
    if (search) link = link.concat(`&keyword=${search}`);
    if (status) link = link.concat(`&status=${status}`);
    if (kategori) link = link.concat(`&categori=${kategori}`);
    if (pelatihan) link = link.concat(`&pelatihan=${pelatihan}`);
    router.push(link);
  };

  const handleLimit = (val) => {
    router.push(`${router.pathname}?id=${id}&page=${1}&limit=${val}`);
  };

  const handleDelete = (id) => {
    console.log(id);
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
        dispatch(deleteSubtanceQuestionDetail(id));
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
          pathname: `/subvit/substansi/tambah-step-2-entry`,
          query: { id },
        });
      } else if (result.isDenied) {
        router.push({
          pathname: `/subvit/substansi/tambah-step-2-import`,
          query: { id },
        });
      }
    });
  };

  const handleFilter = () => {
    let link = `${router.pathname}?id=${id}&page=${1}`;
    if (status) link = link.concat(`&status=${status}`);
    if (kategori) link = link.concat(`&categori=${kategori}`);
    if (pelatihan) link = link.concat(`&pelatihan=${pelatihan}`);
    router.push(link);
  };

  const handleSearch = () => {
    let link = `${router.pathname}?id=${id}&page=1&keyword=${search}`;
    router.push(link);
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
          <div className="card-header">
            <h3 className="card-title font-weight-bolder text-dark">
              Substansi FGA - Cloud Computing
            </h3>
            <div className="card-toolbar">
              <Link href={`/subvit/substansi/edit?id=${id}`}>
                <a className="btn btn-primary-rounded-full font-weight-bolder px-7 py-3 mt-2 btn-block">
                  <i className="ri-pencil-fill"></i>
                  Edit
                </a>
              </Link>
            </div>
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div
                    className="col col-lg-3 title-1 font-weight-bold"
                    style={{ color: "#000000" }}
                  >
                    <p>Akademi</p>
                    <p>Tema</p>
                    <p>Pelatihan</p>
                    <p>Kategori</p>
                  </div>
                  <div className="col value-1">
                    <p>{subtance.academy.name}</p>
                    <p>{subtance.theme.name}</p>
                    <p>{subtance.training.name}</p>
                    <p>{subtance.category}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div
                    className="col col-lg-3 title-1 font-weight-bold"
                    style={{ color: "#000000" }}
                  >
                    <p>Pelaksanaan</p>
                    <p>Jumlah Soal</p>
                    <p>Passing Grade</p>
                    <p>Durasi Tes</p>
                    <p>Status</p>
                  </div>
                  <div className="col value-1">
                    <p>1 - 5 Juli 2021</p>
                    <p>{subtance.bank_soal} Soal</p>
                    <p>{subtance.passing_grade}</p>
                    <p>{subtance.duration} Menit</p>
                    <p>{subtance.status ? "Publish" : "Draft"}</p>
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
              <h3 className="card-title font-weight-bolder text-dark">
                Bank Soal
              </h3>
              {/* <label htmlFor=""></label> */}
            </div>
            <div className="card-toolbar">
              <a
                className="btn btn-primary-rounded-full font-weight-bolder px-7 py-3 mt-2 btn-block"
                onClick={handleModal}
              >
                <i className="ri-pencil-fill"></i>
                Tambah Soal
              </a>
            </div>
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
                <div className="col-lg-4 col-xl-4">
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
              </div>

              {/* <div className="row align-items-center my-5">
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
                    <small className="text-muted p-0">Filter by Status</small>
                    <select
                      className="form-control mb-1"
                      onChange={(e) => setStatus(e.target.value)}
                      onBlur={(e) => setStatus(e.target.value)}
                      value={status}
                    >
                      <option value="" selected>
                        Semua
                      </option>
                      <option value={true}>Publish</option>
                      <option value={false}>Draft</option>
                    </select>
                  </div>
                </div>

                <div className="col-lg-3 col-xl-3 ">
                  <div className="form-group mb-0">
                    <small className="text-muted p-0">Filter by Kategori</small>
                    <select
                      className="form-control mb-1"
                      onChange={(e) => setKategori(e.target.value)}
                      onBlur={(e) => setKategori(e.target.value)}
                      value={kategori}
                    >
                      <option value="">Semua</option>
                      {!subtance_question_type ||
                      (subtance_question_type &&
                        subtance_question_type.list_types.length === 0) ? (
                        <option value="">Data kosong</option>
                      ) : (
                        subtance_question_type &&
                        subtance_question_type.list_types.map((row) => {
                          return (
                            <option key={row.id} value={row.id}>
                              {row.name}
                            </option>
                          );
                        })
                      )}
                    </select>
                  </div>
                </div>
                <div className="col-lg-3 col-xl-3 ">
                  <div className="text-muted mt-5 p-0"> </div>
                  <div className="">
                    <button
                      className="btn btn-light-primary"
                      onClick={handleFilter}
                    >
                      Filter
                    </button>
                  </div>
                </div>
              </div> */}
            </div>

            <div className="table-page mt-5">
              <div className="table-responsive">
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
                    subtance_question_detail.list_questions.length != 0 ? (
                      subtance_question_detail.list_questions.map(
                        (question, i) => {
                          return (
                            <tr key={question.id}>
                              <td className="align-middle text-center">
                                <span className="">
                                  {i + 1 * (page * 5 || limit) - 4}
                                </span>
                              </td>
                              <td className="align-middle">CC{question.id}</td>
                              <td className="align-middle">
                                {question.question}
                              </td>
                              <td className="align-middle">
                                {question.type.name}
                              </td>
                              <td className="align-middle">
                                {question.type.value} Poin
                              </td>
                              <td className="align-middle">
                                {question.status === true ? (
                                  <span className="label label-inline label-light-success font-weight-bold">
                                    Publish
                                  </span>
                                ) : (
                                  <span className="label label-inline label-light-warning font-weight-bold">
                                    Draft
                                  </span>
                                )}
                              </td>
                              <td className="align-middle d-flex">
                                <Link
                                  href={`edit-soal-substansi?id=${question.id}`}
                                >
                                  <a className="btn btn-link-action bg-blue-secondary text-white mr-2">
                                    <i className="ri-pencil-fill p-0 text-white"></i>
                                  </a>
                                </Link>
                                <button
                                  className="btn btn-link-action bg-blue-secondary text-white"
                                  onClick={() => handleDelete(question.id)}
                                >
                                  <i className="ri-delete-bin-fill p-0 text-white"></i>
                                </button>
                              </td>
                            </tr>
                          );
                        }
                      )
                    ) : (
                      <tr>
                        <td className="text-center" colSpan={7}>
                          Data Masih Kosong
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="row">
                {subtance_question_detail &&
                  subtance_question_detail.perPage <
                    subtance_question_detail.total && (
                    <div className="table-pagination">
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
                    </div>
                  )}
                {subtance_question_detail &&
                subtance_question_detail.total > 5 ? (
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
                          Total Data {subtance_question_detail.total}
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
              className="form-control"
              onChange={(e) => setStatus(e.target.value)}
              onBlur={(e) => setStatus(e.target.value)}
              value={status}
            >
              <option value="" selected>
                Semua
              </option>
              <option value={true}>Publish</option>
              <option value={false}>Draft</option>
            </select>
          </div>
          <div className="form-group mb-5">
            <label className=" p-0">Kategori</label>
            <select
              className="form-control"
              onChange={(e) => setKategori(e.target.value)}
              onBlur={(e) => setKategori(e.target.value)}
              value={kategori}
            >
              <option value="">Semua</option>
              {!subtance_question_type ||
              (subtance_question_type &&
                subtance_question_type.list_types.length === 0) ? (
                <option value="">Data kosong</option>
              ) : (
                subtance_question_type &&
                subtance_question_type.list_types.map((row) => {
                  return (
                    <option key={row.id} value={row.id}>
                      {row.name}
                    </option>
                  );
                })
              )}
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

export default DetailSubstansi;
