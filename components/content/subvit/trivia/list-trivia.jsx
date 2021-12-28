import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import Swal from "sweetalert2";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../wrapper/page.wrapper";
import LoadingTable from "../../../LoadingTable";
import styles from "../../../../styles/subvit.module.css";
import stylesPag from "../../../../styles/pagination.module.css";
import Image from "next/dist/client/image";
import { getAllTriviaQuestionDetail } from "../../../../redux/actions/subvit/trivia-question-detail.action";

import {
  deleteTriviaQuestionBanks,
  clearErrors,
  getAllTriviaQuestionBanks,
} from "../../../../redux/actions/subvit/trivia-question.actions";
import { DELETE_TRIVIA_QUESTION_BANKS_RESET } from "../../../../redux/types/subvit/trivia-question.type";
import { Card, Col, Form, Modal, Row } from "react-bootstrap";

const ListTrivia = ({ token, tokenPermission }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, trivia } = useSelector(
    (state) => state.allTriviaQuestionBanks
  );

  const { data: dataPermission } = useSelector(
    (state) => state.permissionsSubvit
  );

  const {
    loading: loadingDelete,
    error: errorDelete,
    isDeleted,
  } = useSelector((state) => state.deleteTriviaQuestionBanks);

  let { page = 1, success } = router.query;
  page = Number(page);

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(null);
  const [viewSoal, setViewSoal] = useState(false);

  useEffect(() => {
    localStorage.removeItem("step1");
    localStorage.removeItem("clone1");
    localStorage.removeItem("id_trivia");
    if (isDeleted) {
      dispatch({
        type: DELETE_TRIVIA_QUESTION_BANKS_RESET,
      });
      dispatch(
        getAllTriviaQuestionBanks(page, "", limit, token, tokenPermission)
      );
      Swal.fire("Berhasil ", "Data berhasil dihapus.", "success");
    }
  }, [dispatch, isDeleted, token, page, limit, tokenPermission]);

  const handlePagination = (pageNumber) => {
    let link = `${router.pathname}?page=${pageNumber}`;
    if (search) link = link.concat(`&keyword=${search}`);
    if (limit) link = link.concat(`&limit=${limit}`);
    router.push(link);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let link = `${router.pathname}?page=1&keyword=${search}`;
    if (limit) link = link.concat(`&limit=${limit}`);
    router.push(link);
  };

  const handleLimit = (e) => {
    setLimit(e.target.value);
    if (search) {
      router.push(
        `${router.pathname}?page=1&keyword=${search}&limit=${e.target.value}`
      );
    } else {
      router.push(`${router.pathname}?page=1&limit=${e.target.value}`);
    }
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
        dispatch(deleteTriviaQuestionBanks(id, token, tokenPermission));
      }
    });
  };

  const onNewReset = () => {
    router.replace("/subvit/trivia", undefined, { shallow: true });
  };

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  const getStartAt = (date) => {
    if (!date) {
      return "-";
    }
    const startAt = new Date(date);
    var tahun = startAt.getFullYear();
    var bulan = startAt.getMonth();
    var tanggal = startAt.getDate();

    switch (bulan) {
      case 0:
        bulan = "Januari";
        break;
      case 1:
        bulan = "Februari";
        break;
      case 2:
        bulan = "Maret";
        break;
      case 3:
        bulan = "April";
        break;
      case 4:
        bulan = "Mei";
        break;
      case 5:
        bulan = "Juni";
        break;
      case 6:
        bulan = "Juli";
        break;
      case 7:
        bulan = "Agustus";
        break;
      case 8:
        bulan = "September";
        break;
      case 9:
        bulan = "Oktober";
        break;
      case 10:
        bulan = "November";
        break;
      case 11:
        bulan = "Desember";
        break;
    }

    return `${tanggal} ${bulan} ${tahun}`;
  };

  const isFinish = (date) => {
    if (!date) {
      return "Belum Dilaksanakan";
    }
    const endAt = new Date(date);
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    if (endAt > today) {
      return "Belum Selesai";
    } else {
      return "Selesai";
    }
  };

  const handleModal = (id) => {
    dispatch(
      getAllTriviaQuestionDetail(
        id,
        1,
        "",

        100,
        token
      )
    );
    setViewSoal(true);
  };

  const { trivia_question_detail } = useSelector(
    (state) => state.allTriviaQuestionDetail
  );

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

      {success ? (
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
              onClick={onNewReset}
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
          <div
            className="card-header row border-0 mt-3"
            style={{ border: "1px solid black" }}
          >
            <h1
              className="card-title text-dark mt-2 ml-5"
              style={{ fontSize: "24px" }}
            >
              List TRIVIA
            </h1>
            {dataPermission &&
            dataPermission.permissions.includes(
              "subvit.manage" && "subvit.trivia.manage"
            ) ? (
              <div className=" card-toolbar">
                <Link href="/subvit/trivia/clone">
                  <a className="btn text-white btn-primary-rounded-full px-6 font-weight-bolder px-5 py-3 mt-2 mr-2">
                    <i className="ri-mastercard-fill"></i>
                    Clone TRIVIA
                  </a>
                </Link>
                <Link href="/subvit/trivia/tambah">
                  <a className="btn text-white btn-primary-rounded-full px-6 font-weight-bolder px-5 py-3 mt-2 mr-2">
                    <i className="ri-add-fill"></i>
                    Tambah TRIVIA
                  </a>
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-6 col-xl-6">
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
                      // UNFINISH
                    >
                      Cari
                    </button>
                  </div>
                </div>

                <div className="col-lg-3 col-xl-3 ml-auto"></div>
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
                        <th>Pelatihan</th>
                        <th>Pelaksanaan</th>
                        <th>Bank Soal</th>
                        <th>Status</th>
                        {dataPermission &&
                        dataPermission.permissions.includes(
                          "subvit.manage" && "subvit.trivia.manage"
                        ) ? (
                          <th style={{ width: "250px" }}>Aksi</th>
                        ) : dataPermission &&
                          dataPermission.permissions.includes(
                            "subvit.view" && "subvit.trivia.view"
                          ) ? (
                          <th style={{ width: "250px" }}>Aksi</th>
                        ) : (
                          ""
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {!trivia ||
                      (trivia && trivia.list_trivia.length === 0) ? (
                        <td className="align-middle text-center" colSpan={6}>
                          Data Kosong
                        </td>
                      ) : (
                        trivia &&
                        trivia.list_trivia.map((row, i) => {
                          const paginate = i + 1 * (page * limit);
                          const dividers = limit - 1;
                          return (
                            <tr key={row.id}>
                              <td className="align-middle text-center">
                                {/* <span className="">{paginate - dividers}</span> */}
                                {limit === null ? (
                                  <span>{i + 1 * (page * 5) - (5 - 1)}</span>
                                ) : (
                                  <span>
                                    {i + 1 * (page * limit) - (limit - 1)}
                                  </span>
                                )}
                              </td>
                              <td className="align-middle">
                                <b>{row.academy ? row.academy.name : "-"}</b>
                                <p>
                                  {row.theme != null
                                    ? row.training !== null
                                      ? row.training.name
                                      : row.theme.name
                                    : "-"}
                                </p>
                              </td>
                              <td className="align-middle">
                                <b>{getStartAt(row.start_at)}</b>
                                <p>{isFinish(row.end_at)}</p>
                              </td>
                              <td className="align-middle">
                                {row.bank_soal} Soal
                              </td>
                              <td className="align-middle">
                                {row.status === 1 ? (
                                  <span className="label label-inline label-light-success font-weight-bold">
                                    Publish
                                  </span>
                                ) : (
                                  <span className="label label-inline label-light-warning font-weight-bold">
                                    Draft
                                  </span>
                                )}
                              </td>
                              <td className="align-middle">
                                {dataPermission &&
                                dataPermission.permissions.includes(
                                  "subvit.manage" && "subvit.trivia.manage"
                                ) ? (
                                  <div className="d-flex">
                                    <Link
                                      href={`/subvit/trivia/edit?id=${row.id}`}
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
                                    <Link href={`/subvit/trivia/${row.id}`}>
                                      <a
                                        className="btn btn-link-action bg-blue-secondary text-white mr-2"
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="List Soal"
                                      >
                                        <i className="ri-file-list-line p-0 text-white"></i>
                                      </a>
                                    </Link>
                                    {row?.bank_soal !== 0 && (
                                      <a
                                        onClick={() => handleModal(row?.id)}
                                        className="btn btn-link-action bg-blue-secondary text-white mr-2"
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="Review Soal"
                                      >
                                        <i className="ri-file-search-fill p-0 text-white"></i>
                                      </a>
                                    )}
                                    <Link
                                      href={`/subvit/trivia/report?id=${row.id}`}
                                    >
                                      <a
                                        className="btn btn-link-action bg-blue-secondary text-white mr-2"
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="Report"
                                      >
                                        <i className="ri-todo-fill p-0 text-white"></i>
                                      </a>
                                    </Link>
                                    <button
                                      className={
                                        row?.status
                                          ? "btn btn-link-action btn-secondary  text-white"
                                          : "btn btn-link-action bg-blue-secondary text-white"
                                      }
                                      disabled={row?.status}
                                      style={{
                                        cursor: row?.status
                                          ? "not-allowed"
                                          : "pointer",
                                      }}
                                      onClick={() => handleDelete(row.id)}
                                      data-toggle="tooltip"
                                      data-placement="bottom"
                                      title="Hapus"
                                    >
                                      <i className="ri-delete-bin-fill p-0 text-white"></i>
                                    </button>
                                  </div>
                                ) : dataPermission &&
                                  dataPermission.permissions.includes(
                                    "subvit.view" && "subvit.trivia.view"
                                  ) ? (
                                  <Link href={`/subvit/trivia/${row.id}`}>
                                    <a
                                      className="btn btn-link-action bg-blue-secondary text-white mr-2"
                                      data-toggle="tooltip"
                                      data-placement="bottom"
                                      title="Detail"
                                    >
                                      <i className="ri-eye-fill p-0 text-white"></i>
                                    </a>
                                  </Link>
                                ) : (
                                  ""
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
                  <>
                    {/* KONDISI KETIKA FOLD */}
                    <div
                      className={`${stylesPag.paginationFold} table-pagination pagination-custom col-12 col-md-6`}
                    >
                      <Pagination
                        activePage={page}
                        itemsCountPerPage={trivia?.perPage}
                        totalItemsCount={trivia?.total}
                        pageRangeDisplayed={2}
                        onChange={handlePagination}
                        nextPageText={">"}
                        prevPageText={"<"}
                        firstPageText={"<<"}
                        lastPageText={">>"}
                        itemClass="page-item"
                        linkClass="page-link"
                      />
                    </div>
                    <div
                      className={`${stylesPag.pagination} table-pagination pagination-custom col-12 col-md-6`}
                    >
                      <Pagination
                        activePage={page}
                        itemsCountPerPage={trivia?.perPage}
                        totalItemsCount={trivia?.total}
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
                  </>
                )}
                {trivia && trivia.total > 5 ? (
                  <div className={`${stylesPag.rightPag} table-total ml-auto`}>
                    <div className="row">
                      <div className="col-4 mr-0">
                        <select
                          className="form-control"
                          id="exampleFormControlSelect2"
                          style={{
                            width: "68px",
                            background: "#F3F6F9",
                            borderColor: "#F3F6F9",
                            color: "#9E9E9E",
                          }}
                          onChange={(event) => handleLimit(event)}
                          onBlur={(event) => handleLimit(event)}
                          value={limit}
                        >
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="30">30</option>
                          <option value="40">40</option>
                          <option value="50">50</option>
                        </select>
                      </div>
                      <div className="col-8 my-auto">
                        <p
                          className="align-middle mt-3"
                          style={{ color: "#B5B5C3" }}
                        >
                          Total Data {trivia.total} List Data
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
        show={viewSoal}
        onHide={() => setViewSoal(false)}
        size="lg"
        centered
      >
        <Modal.Header>
          <Modal.Title>Review Soal</Modal.Title>
          <button
            type="button"
            className="close"
            onClick={() => setViewSoal(false)}
          >
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
        </Modal.Header>
        <Modal.Body style={{ overflowY: "scroll", height: "500px" }}>
          <Row>
            <Col ms={12}>
              {trivia_question_detail?.list_questions && (
                <>
                  {trivia_question_detail?.list_questions?.map(
                    (item, index) => {
                      return (
                        <>
                          <Card
                            style={{
                              padding: "15px",
                              marginBottom: "10px",
                            }}
                          >
                            <h4>Soal {index + 1}</h4>
                            <Card
                              style={{
                                marginTop: "10px",

                                padding: "15px",
                              }}
                            >
                              <div className="d-flex flex-row">
                                <div className="mr-3">
                                  {item.question_image ? (
                                    <Image
                                      src={
                                        process.env.END_POINT_API_IMAGE_SUBVIT +
                                        item.question_image
                                      }
                                      alt=""
                                      width={70}
                                      height={70}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div>
                                  {" "}
                                  <h5>{item.question}</h5>
                                </div>
                              </div>

                              {!item.answer.includes("TIPE JAWABAN") ? (
                                JSON.parse(item?.answer).map((anw) => {
                                  return (
                                    <>
                                      <div className="d-flex flex-row ">
                                        <div className="mt-6">
                                          {anw.image !== "" ? (
                                            <Image
                                              src={
                                                process.env
                                                  .END_POINT_API_IMAGE_SUBVIT +
                                                anw.image
                                              }
                                              alt=""
                                              width={40}
                                              height={40}
                                            />
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                        <div style={{ width: "100%" }}>
                                          <Card
                                            style={{
                                              padding: "5px",
                                              marginTop: "15px",
                                              margin: "10px",
                                            }}
                                            className={
                                              anw.value !== null
                                                ? styles.answer
                                                : ""
                                            }
                                          >
                                            <p
                                              style={{
                                                padding: "5px",
                                                marginTop: "5px",
                                              }}
                                            >
                                              {anw.key} . {anw.option}
                                            </p>
                                          </Card>
                                        </div>
                                      </div>
                                    </>
                                  );
                                })
                              ) : (
                                <Form>
                                  <Form.Control
                                    as="textarea"
                                    style={{ marginTop: "10px" }}
                                    rows={5}
                                    placeholder="Jelaskan jawaban Anda di sini..."
                                    className={styles.textArea}
                                    disabled
                                  />
                                </Form>
                              )}
                            </Card>
                          </Card>
                        </>
                      );
                    }
                  )}
                </>
              )}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <button
            className={`${styles.btnNext} btn btn-light-ghost-rounded-full mr-2`}
            type="button"
            onClick={() => setViewSoal(false)}
          >
            Kembali
          </button>
        </Modal.Footer>
      </Modal>
    </PageWrapper>
  );
};

export default ListTrivia;
