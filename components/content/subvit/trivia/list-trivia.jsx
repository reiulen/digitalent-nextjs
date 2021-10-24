import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";

import PageWrapper from "../../../wrapper/page.wrapper";
import ButtonAction from "../../../ButtonAction";
import LoadingTable from "../../../LoadingTable";
import styles from "../../../../styles/subvit.module.css";

import {
  deleteTriviaQuestionBanks,
  clearErrors,
} from "../../../../redux/actions/subvit/trivia-question.actions";
import { DELETE_TRIVIA_QUESTION_BANKS_RESET } from "../../../../redux/types/subvit/trivia-question.type";

const ListTrivia = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, trivia } = useSelector(
    (state) => state.allTriviaQuestionBanks
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

  useEffect(() => {
    if (isDeleted) {
      Swal.fire("Berhasil ", "Data berhasil dihapus.", "success").then(
        (result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        }
      );
      dispatch({
        type: DELETE_TRIVIA_QUESTION_BANKS_RESET,
      });
    }
  }, [dispatch, isDeleted]);

  const handlePagination = (pageNumber) => {
    let link = `${router.pathname}?page=${pageNumber}`;
    if (search) link = link.concat(`&keyword=${search}`);
    if (limit) link = link.concat(`&limit=${limit}`);
    router.push(link);
  };

  const handleSearch = () => {
    let link = `${router.pathname}?page=1&keyword=${search}`;
    if (limit) link = link.concat(`&limit=${limit}`);
    router.push(link);
  };

  const handleLimit = (e) => {
    setLimit(e.target.value);
    router.push(`${router.pathname}?page=1&limit=${e.target.value}`);
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
        dispatch(deleteTriviaQuestionBanks(id, token));
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
          <div className="card-header row border-0 mt-3" style={{ border: '1px solid black' }}>
            <h1 className={`${styles.headTitle} col-sm-12 col-md-8 col-lg-8 col-xl-9`}>
              List TRIVIA
            </h1>
            <div className="col-sm-12 col-md-4 col-lg-4 col-xl-3 card-toolbar">
              <Link href="/subvit/trivia/tambah">
                {/* <a className="text-white btn btn-primary-rounded-full px-6 font-weight-bolder px-5 py-3 mt-2 mr-2"> */}
                <a className={`${styles.btnTambah} btn btn-primary-rounded-full px-6 font-weight-bolder btn-block`}>
                  <i className="ri-add-fill"></i>
                  Tambah TRIVIA
                </a>
              </Link>
            </div>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-6 col-xl-6">
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
                        <th style={{ width: '10px' }}>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!trivia ||
                        (trivia && trivia.list_trivia.length === 0) ? (
                        <td className="align-middle text-center" colSpan={6}>
                          Data Masih Kosong
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
                                {
                                  limit === null ?
                                    <span>
                                      {i + 1 * (page * 5) - (5 - 1)}
                                    </span>
                                    :
                                    <span>
                                      {i + 1 * (page * limit) - (limit - 1)}
                                    </span>
                                }
                              </td>
                              <td className="align-middle">
                                <b>
                                  {row.academy !== null
                                    ? row.academy.name
                                    : "-"}
                                </b>
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
                                      title="Detail"
                                    >
                                      <i className="ri-eye-fill p-0 text-white"></i>
                                    </a>
                                  </Link>
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
                                    className="btn btn-link-action bg-blue-secondary text-white"
                                    onClick={() => handleDelete(row.id)}
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="Hapus"
                                  >
                                    <i className="ri-delete-bin-fill p-0 text-white"></i>
                                  </button>
                                </div>
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
                {trivia && trivia.total > 5 ? (
                  <div className="table-total ml-auto">
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
                          <option value='5' selected={limit == "5" ? true : false}>5</option>
                          <option value='10' selected={limit == "10" ? true : false}>10</option>
                          <option value='30' selected={limit == "30" ? true : false}>30</option>
                          <option value='40' selected={limit == "40" ? true : false}>40</option>
                          <option value='50' selected={limit == "50" ? true : false}>50</option>
                          {/* <option>5</option>
                          <option>10</option>
                          <option>30</option>
                          <option>40</option>
                          <option>50</option> */}
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
    </PageWrapper>
  );
};

export default ListTrivia;
