/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";
import Swal from "sweetalert2";

import PageWrapper from "../../../wrapper/page.wrapper";
import LoadingTable from "../../../LoadingTable";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteAcademy,
  clearErrors,
} from "../../../../redux/actions/pelatihan/academy.actions";
import { DELETE_ACADEMY_RESET } from "../../../../redux/types/pelatihan/academy.type";

const ListAcademy = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    loading: allLoading,
    error: allError,
    academy,
  } = useSelector((state) => state.allAcademy);
  const {
    loading: deleteLoading,
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.deleteAcademy);

  let { page = 1, success } = router.query;
  page = Number(page);

  let loading = false;
  if (allLoading) {
    loading = allLoading;
  } else if (deleteLoading) {
    loading = deleteLoading;
  }

  let error;
  if (allError) {
    error = allError;
  } else if (deleteError) {
    error = deleteError;
  }

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
        type: DELETE_ACADEMY_RESET,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleted]);

  const handlePagination = (pageNumber) => {
    let link = `${router.pathname}?page=${pageNumber}`;
    if (limit) link = link.concat(`&limit=${limit}`);
    if (search) link = link.concat(`&keyword=${search}`);
    router.push(link);
  };

  const handleSearch = () => {
    let link = `${router.pathname}?page=1&keyword=${search}`;
    if (limit) link = link.concat(`&limit=${limit}`);
    router.push(link);
  };

  const handleLimit = (val) => {
    setLimit(val);
    router.push(`${router.pathname}?page=1&limit=${val}`);
  };

  const onNewReset = () => {
    router.replace("/pelatihan/akademi", undefined, { shallow: true });
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
        dispatch(deleteAcademy(id, token));
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
      {error && (
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
      )}
      {success && (
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
      )}

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0 mt-3">
            <h1
              className="card-title text-dark mt-2"
              style={{ fontSize: "24px" }}
            >
              List Akademi
            </h1>
            <div className="card-toolbar">
              <Link href="/pelatihan/akademi/tambah">
                <a className="btn btn-primary-rounded-full px-6 font-weight-bolder px-5 py-3 mt-2">
                  <i className="ri-add-fill"></i>
                  Tambah Akademi
                </a>
              </Link>
            </div>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-12 col-xl-12">
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
              </div>
            </div>

            <div className="table-page mt-5">
              <div className="table-responsive">
                <LoadingTable loading={loading} />
                {loading === false && (
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead
                      style={{ background: "#F3F6F9" }}
                      className="font-weight-bolder"
                    >
                      <tr>
                        <th className="text-center">No</th>
                        <th>Logo</th>
                        <th>Akademi</th>
                        <th>Tema</th>
                        <th>Pelatihan</th>
                        <th>Penyelenggara</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!academy || (academy && academy.rows.length === 0) ? (
                        <td className="align-middle text-center" colSpan={8}>
                          Data Masih Kosong
                        </td>
                      ) : (
                        academy.rows.map((row, i) => (
                          <tr key={i}>
                            <td className="text-center">
                              {limit === null
                                ? i + 1 * (page * 5) - (5 - 1)
                                : i + 1 * (page * limit) - (limit - 1)}
                            </td>
                            <td className="align-middle">
                              <Image
                                src = {row.file_path + row.logo}
                                width="111"
                                height="52"
                                objectFit="cover"
                              />
                            </td>
                            <td className="align-middle">
                              <p className="font-weight-bolder my-0 h6">
                                {row.name}
                              </p>
                              <div
                                className="my-0"
                                dangerouslySetInnerHTML={{
                                  __html: row.deskripsi,
                                }}
                              ></div>
                            </td>
                            <td className="align-middle">50</td>
                            <td className="align-middle">150</td>
                            <td className="align-middle">50 Mitra</td>
                            <td className="align-middle">
                              {row.status === "1" ? (
                                <span className="label label-inline label-light-success font-weight-bold">
                                  Publish
                                </span>
                              ) : (
                                <span className="label label-inline label-light-danger font-weight-bold">
                                  Unpublish
                                </span>
                              )}
                            </td>
                            <td className="align-middle">
                              <div className="d-flex">
                                <Link href={`/pelatihan/akademi/${row.id}`}>
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
                        ))
                      )}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="row">
                <div className="table-pagination table-pagination pagination-custom col-12 col-md-6">
                  <Pagination
                    activePage={academy.page}
                    itemsCountPerPage={academy.total_pages}
                    totalItemsCount={academy.total_rows}
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

                {academy && academy.total_rows > 5 && (
                  <div className="table-total ml-auto">
                    <div className="row">
                      <div className="col-4 mr-0 p-0 mt-3">
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
                      <div className="col-8 my-auto pt-3">
                        <p
                          className="align-middle mt-3"
                          style={{ color: "#B5B5C3" }}
                        >
                          Total Data {academy.total_rows}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ListAcademy;
