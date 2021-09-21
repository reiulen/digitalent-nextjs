import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";
import Swal from "sweetalert2";

import PageWrapper from "../../../wrapper/page.wrapper";
import ButtonAction from "../../../ButtonAction";
import LoadingTable from "../../../LoadingTable";

import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  deleteSubtanceQuestionBanks,
} from "../../../../redux/actions/subvit/subtance.actions";
import { DELETE_SUBTANCE_QUESTION_BANKS_RESET } from "../../../../redux/types/subvit/subtance.type";

const ListSubstansi = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, subtance } = useSelector(
    (state) => state.allSubtanceQuestionBanks
  );
  const {
    loading: loadingDelete,
    error: errorDelete,
    isDeleted,
  } = useSelector((state) => state.deleteSubtanceQuestionBanks);

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
        type: DELETE_SUBTANCE_QUESTION_BANKS_RESET,
      });
    }
  }, [dispatch, isDeleted]);

  const handlePagination = (pageNumber) => {
    let link = `${router.pathname}?page=${pageNumber}`;
    if (limit) link = link.concat(`&limit=${limit}`);
    if (search) link = link.concat(`&keyword=${search}`);
    router.push(link);
  };

  const handleSearch = () => {
    if (limit != null) {
      router.push(`${router.pathname}?page=1&keyword=${search}&limit=${limit}`);
    } else {
      router.push(`${router.pathname}?page=1&keyword=${search}`);
    }
  };

  const handleLimit = (val) => {
    setLimit(val);
    router.push(`${router.pathname}?page=1&limit=${val}`);
  };

  const onNewReset = () => {
    router.replace("/subvit/substansi", undefined, { shallow: true });
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
        dispatch(deleteSubtanceQuestionBanks(id, token));
      }
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
          <div className="card-header border-0 mt-3">
            <h1
              className="card-title text-dark mt-2"
              style={{ fontSize: "24px" }}
            >
              List Tes Substansi
            </h1>
            <div className="card-toolbar">
              <Link href="/subvit/substansi/tipe-soal">
                <a className="text-white btn btn-primary-rounded-full px-6 font-weight-bolder px-5 py-3 mt-2 mr-2">
                  <i className="ri-article-fill"></i>
                  Tipe Soal
                </a>
              </Link>
              <Link href="/subvit/substansi/clone">
                <a className="btn text-white btn-primary-rounded-full px-6 font-weight-bolder px-5 py-3 mt-2 mr-2">
                  <i className="ri-mastercard-fill"></i>
                  Clone Test
                </a>
              </Link>
              <Link href="/subvit/substansi/tambah-step-1">
                <a className="btn btn-primary-rounded-full px-6 font-weight-bolder px-5 py-3 mt-2">
                  <i className="ri-pencil-fill"></i>
                  Tambah Soal
                </a>
              </Link>
            </div>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-5 col-xl-5">
                  {/* <div className="input-icon">
                    <input
                      style={{ background: "#F3F6F9", border: "none" }}
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                      id="kt_datatable_search_query"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <span>
                      <i className="flaticon2-search-1 text-muted"></i>
                    </span>
                  </div> */}
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

                <div className="col-lg-2 col-xl-2 justify-content-end d-flex"></div>
                <div className="col-lg-2 col-xl-2 justify-content-end d-flex"></div>
                <div className="col-lg-2 col-xl-2 justify-content-end d-flex"></div>
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
                        <th>Pelaksaan</th>
                        <th>Bank Soal</th>
                        <th>Kategori</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!subtance ||
                      (subtance && subtance.list_substance.length === 0) ? (
                        <td className="align-middle text-center" colSpan={8}>
                          Data Masih Kosong
                        </td>
                      ) : (
                        subtance &&
                        subtance.list_substance &&
                        subtance.list_substance.map((subtance, i) => {
                          return (
                            <tr key={subtance.id}>
                              <td className="align-middle text-center">
                                <span className="">
                                  {i + 1 * (page * 5 || limit) - 4}
                                </span>
                              </td>
                              <td className="align-middle">
                                <b>{subtance.academy.name}</b>
                                <p>
                                  {subtance.training !== null
                                    ? subtance.training.name
                                    : subtance.theme.name}
                                </p>
                              </td>
                              <td className="align-middle">
                                <b>{getStartAt(subtance.start_at)}</b>
                                <p>{isFinish(subtance.end_at)}</p>
                              </td>
                              <td className="align-middle">
                                {subtance.bank_soal} Soal
                              </td>
                              <td className="align-middle">
                                {subtance.category}
                              </td>
                              <td className="align-middle">
                                {subtance.status ? (
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
                                    href={`/subvit/substansi/edit?id=${subtance.id}`}
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
                                  <Link
                                    href={`/subvit/substansi/${subtance.id}`}
                                  >
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
                                    href={`/subvit/substansi/report?id=${subtance.id}`}
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
                                    onClick={() => handleDelete(subtance.id)}
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
                {subtance && subtance.perPage < subtance.total && (
                  <div className="table-pagination table-pagination pagination-custom col-12 col-md-6">
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
                          <option>5</option>
                          <option>10</option>
                          <option>30</option>
                          <option>40</option>
                          <option>50</option>
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
