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

import {
  deleteTriviaQuestionBanks,
  clearErrors,
} from "../../../../redux/actions/subvit/trivia-question.actions";
import { DELETE_TRIVIA_QUESTION_BANKS_RESET } from "../../../../redux/types/subvit/trivia-question.type";

const ListTrivia = () => {
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

  const handleLimit = (val) => {
    setLimit(val);
    router.push(`${router.pathname}?page=1&limit=${limit}`);
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
        dispatch(deleteTriviaQuestionBanks(id));
      }
    });
  };

  const onNewReset = () => {
    router.replace("/subvit/trivia", undefined, { shallow: true });
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
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              List Trivia
            </h3>
            <div className="card-toolbar"></div>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-6 col-xl-6">
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
                <div className="col-lg-1 col-xl-1">
                  <button
                    className="btn btn-sm btn-light-primary btn-block"
                    onClick={handleSearch}
                  >
                    Cari
                  </button>
                </div>

                <div className="col-lg-2 col-xl-2 ml-auto">
                  <Link href="/subvit/trivia/tambah">
                    <a className="btn btn-sm btn-light-primary px-6 font-weight-bold btn-block ">
                      <i className="flaticon2-notepad"></i>
                      Tambah Soal
                    </a>
                  </Link>
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
                        <th>Akademi</th>
                        <th>Tema</th>
                        <th>Bank Soal</th>
                        <th>Pelaksaan</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trivia && trivia.list_trivia.length === 0 ? (
                        <td className="align-middle text-center" colSpan={8}>
                          Data Masih Kosong
                        </td>
                      ) : (
                        trivia &&
                        trivia.list_trivia.map((row, i) => {
                          return (
                            <tr key={row.id}>
                              <td className="align-middle text-center">
                                <span className="badge badge-secondary text-muted">
                                  {i + 1 * (page * 5 || limit) - 4}
                                </span>
                              </td>
                              <td className="align-middle">
                                {row.academy.name}
                              </td>
                              <td className="align-middle">
                                question
                                {row.theme.name}
                              </td>
                              <td className="align-middle">
                                {row.bank_soal} Soal
                              </td>
                              <td className="align-middle">{row.start_at}</td>
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
                                  icon="setting.svg"
                                  link={`/subvit/trivia/report?id=${row.id}`}
                                  title="Report"
                                />
                                <ButtonAction
                                  icon="write.svg"
                                  link={`/subvit/trivia/edit?id=${row.id}`}
                                  title="Edit"
                                />
                                <ButtonAction
                                  icon="detail.svg"
                                  link={`/subvit/trivia/${row.id}`}
                                  title="Detail"
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

export default ListTrivia;
