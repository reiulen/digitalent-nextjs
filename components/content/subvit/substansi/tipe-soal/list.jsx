import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";

import PageWrapper from "/components//wrapper/page.wrapper";
import ButtonAction from "/components//ButtonAction";
import LoadingTable from "../../../../LoadingTable";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteSubtanceQuestionBanksType,
  clearErrors,
} from "../../../../../redux/actions/subvit/subtance-question-type.actions";
import { DELETE_SUBTANCE_QUESTION_TYPE_RESET } from "../../../../../redux/types/subvit/subtance-question-type.type";

const ListTipeSoal = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    loading: allLoading,
    error,
    subtance_question_type,
  } = useSelector((state) => state.allSubtanceQuestionType);
  const {
    loading: deleteLoading,
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.deleteSubtanceQuestionType);

  let { page = 1, success, successUpdate } = router.query;
  let loading = false;
  page = Number(page);
  if (allLoading) {
    loading = allLoading;
  } else if (deleteLoading) {
    loading = deleteLoading;
  }

  const [limit, setLimit] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (limit) {
      router.push(`${router.pathname}?page=1&limit=${limit}`);
    }
    if (isDeleted) {
      Swal.fire("Berhasil ", "Data berhasil dihapus.", "success").then(
        (result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        }
      );
      dispatch({
        type: DELETE_SUBTANCE_QUESTION_TYPE_RESET,
      });
    }
  }, [dispatch, limit, isDeleted, router]);

  const onNewReset = () => {
    router.replace("/subvit/substansi/tipe-soal", undefined, { shallow: true });
  };

  const handlePagination = (pageNumber) => {
    if (limit != null) {
      router.push(`${router.pathname}?page=${pageNumber}&limit=${limit}`);
    } else {
      router.push(`${router.pathname}?page=${pageNumber}`);
    }
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
        dispatch(deleteSubtanceQuestionBanksType(id));
      }
    });
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
      {success ? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
        >
          <div className="alert-icon">
            <i className="flaticon2-checkmark"></i>
          </div>
          <div className="alert-text">Berhasil Menambah Data</div>
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
      {successUpdate ? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
        >
          <div className="alert-icon">
            <i className="flaticon2-checkmark"></i>
          </div>
          <div className="alert-text">Berhasil Merubah Data</div>
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
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              List Tipe Soal Tes Substansi
            </h3>
            <div className="card-toolbar"></div>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-7 col-xl-7 col-sm-9">
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

                <div className="col-lg-2 col-xl-2 col-sm-3">
                  <button
                    className="btn btn-light-primary"
                    onClick={handleSearch}
                  >
                    Cari
                  </button>
                </div>

                <div className="col-lg-3 col-xl-3 col-sm-12 ml-auto">
                  <Link href="/subvit/substansi/tipe-soal/tambah">
                    <a className="btn btn-sm btn-light-primary px-6 font-weight-bold btn-block px-0">
                      <i className="flaticon2-notepad"></i>
                      Tambah Tipe Soal
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="table-page mt-5">
              <div className="table-responsive">
                {loading === true ? <LoadingTable loading={loading} /> : ""}

                {loading === false ? (
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-center">No</th>
                        <th>ID</th>
                        <th>Tipe Soal</th>
                        <th>Bobot Nilai</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subtance_question_type &&
                      subtance_question_type.list_types.length === 0 ? (
                        <tr>
                          <td className="text-center" colSpan={6}>
                            Data Masih Kosong
                          </td>
                        </tr>
                      ) : (
                        subtance_question_type &&
                        subtance_question_type.list_types.map((row, i) => {
                          return (
                            <tr key={row.id}>
                              <td className="align-middle text-center">
                                <span className="badge badge-secondary text-muted">
                                  {i + 1 * (page * 5 || limit) - 4}
                                </span>
                              </td>
                              <td className="align-middle">CC{row.id}</td>
                              <td className="align-middle">{row.name}</td>
                              <td className="align-middle">{row.value}</td>
                              <td className="align-middle">
                                {row.status ? (
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
                                <ButtonAction
                                  icon="write.svg"
                                  link={`/subvit/substansi/tipe-soal/${row.id}`}
                                  title="Edit"
                                />
                                <button
                                  onClick={() => handleDelete(row.id)}
                                  className="btn mr-1"
                                  style={{
                                    background: "#F3F6F9",
                                    borderRadius: "6px",
                                  }}
                                  data-toggle="tooltip"
                                  data-placement="bottom"
                                  title="Hapus"
                                >
                                  <Image
                                    alt="button-action"
                                    src={`/assets/icon/trash.svg`}
                                    width={18}
                                    height={18}
                                  />
                                </button>
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
                {subtance_question_type &&
                  subtance_question_type.perPage <
                    subtance_question_type.total && (
                    <div className="table-pagination">
                      <Pagination
                        activePage={page}
                        itemsCountPerPage={subtance_question_type.perPage}
                        totalItemsCount={subtance_question_type.total}
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
                {subtance_question_type && subtance_question_type.total > 5 ? (
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
                          Total Data {subtance_question_type.total}
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

export default ListTipeSoal;
