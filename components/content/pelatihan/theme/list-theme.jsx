import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import Select from "react-select";

import PageWrapper from "../../../wrapper/page.wrapper";
import LoadingTable from "../../../LoadingTable";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteTheme,
  getAllTheme,
  clearErrors,
} from "../../../../redux/actions/pelatihan/theme.actions";
import { DELETE_THEME_RESET } from "../../../../redux/types/pelatihan/theme.type";

const ListTheme = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    loading: allLoading,
    error: allError,
    theme,
  } = useSelector((state) => state.allTheme);
  const {
    loading: deleteLoading,
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.deleteTheme);
  const { error: dropdownErrorAkademi, data: dataAkademi } = useSelector(
    (state) => state.drowpdownAkademi
  );

  let { success } = router.query;

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

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(null);
  const [academy, setAcademy] = useState(null);
  const [status, setStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const optionsAkademi = dataAkademi.data || [];
  const optionsStatus = [
    { value: "1", label: "Publish" },
    { value: "0", label: "Unpublish" },
  ];

  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    if (isDeleted) {
      Swal.fire("Berhasil ", "Data berhasil dihapus.", "success").then(
        (result) => {
          if (result.isConfirmed) {
            setPage(1);
            dispatch(getAllTheme(1, null, null, null, null, token));
          }
        }
      );
      dispatch({
        type: DELETE_THEME_RESET,
      });
    }

    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isDeleted, dispatch, token]);

  const handlePagination = (pageNumber) => {
    setPage(pageNumber);
    dispatch(
      getAllTheme(
        pageNumber,
        null,
        academy != null ? academy.label : null,
        status != null ? status.value : null,
        limit,
        token
      )
    );
  };

  const handleSearch = () => {
    let link = `${router.pathname}?page=1&keyword=${search}`;
    if (limit) link = link.concat(`&limit=${limit}`);
    router.push(link);
    setPage(1);
    dispatch(
      getAllTheme(
        1,
        search,
        academy != null ? academy.label : null,
        status != null ? status.value : null,
        limit,
        token
      )
    );
  };

  const handleFilter = () => {
    setPage(1);
    dispatch(
      getAllTheme(
        1,
        search,
        academy != null ? academy.label : null,
        status != null ? status.value : null,
        limit,
        token
      )
    );
    setShowModal(false);
  };

  const handleReset = () => {
    setAcademy(null);
    setStatus(null);
    setPage(1);
    dispatch(getAllTheme(1, null, null, null, 5, token));
    setShowModal(false);
  };

  const handleLimit = (val) => {
    setLimit(val);
    setPage(1);
    dispatch(
      getAllTheme(
        1,
        search,
        academy != null ? academy.label : null,
        status != null ? status.value : null,
        val,
        token
      )
    );
  };

  const onNewReset = () => {
    router.replace("/pelatihan/tema", undefined, { shallow: true });
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
        dispatch(deleteTheme(id, token));
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
              List Tema
            </h1>
            <div className="card-toolbar">
              <Link href="/pelatihan/tema/tambah-tema">
                <a className="btn btn-primary-rounded-full px-6 font-weight-bolder px-5 py-3 mt-2">
                  <i className="ri-add-fill"></i>
                  Tambah Tema
                </a>
              </Link>
            </div>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-4 col-xl-4">
                  <div className="position-relative overflow-hidden mt-3 mb-2">
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

                <div className="col-lg-5 col-xl-5"></div>

                <div className="col-lg-3 col-xl-3 justify-content-end d-flex">
                  <button
                    className="btn border d-flex align-items-center justify-content-between mt-1 w-100"
                    style={{
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
            </div>

            <div className="table-page mt-5">
              <div className="table-responsive">
                <LoadingTable loading={loading} />
                {loading === false && (
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead className="w-100" style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-center ">No</th>
                        <th>Akademi</th>
                        <th>Tema</th>
                        <th>Peminat</th>
                        <th>Status</th>
                        <th className="row-aksi-tema">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!theme ||
                      (theme && theme.list === null) ||
                      theme.list.length === 0 ? (
                        <td className="align-middle text-center" colSpan={8}>
                          Data Masih Kosong
                        </td>
                      ) : (
                        theme.list.map((row, i) => (
                          <tr key={i}>
                            <td className="text-center">
                              {limit === null
                                ? i + 1 * (page * 5) - (5 - 1)
                                : i + 1 * (page * limit) - (limit - 1)}
                            </td>
                            <td className="align-middle">
                              <p className="font-weight-bolder my-0 h6">
                                {row.slug}
                              </p>
                              <p>{row.akademi}</p>
                            </td>
                            <td className="align-middle">{row.name}</td>
                            <td className="align-middle">
                              {row.peminat} Peminat
                            </td>
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
                                <Link
                                  href={`/pelatihan/tema/edit-tema?id=${row.id}`}
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
                {theme && theme.perPage < theme.total && (
                  <div className="table-pagination table-pagination pagination-custom col-12 col-md-6">
                    <Pagination
                      activePage={page}
                      itemsCountPerPage={theme.perPage}
                      totalItemsCount={theme.total}
                      pageRangeDisplayed={windowDimensions.width > 300 ? 3 : 1}
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
                {theme && theme.total > 5 && (
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
                          value={limit}
                          onChange={(e) => handleLimit(e.target.value)}
                          onBlur={(e) => handleLimit(e.target.value)}
                        >
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="30">30</option>
                          <option value="40">40</option>
                          <option value="50">50</option>
                        </select>
                      </div>
                      <div className="col-8 my-auto pt-3">
                        <p
                          className="align-middle mt-3"
                          style={{ color: "#B5B5C3" }}
                        >
                          Total Data {theme.total}
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

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Filter</Modal.Title>
          <button
            type="button"
            className="close"
            onClick={() => setShowModal(false)}
          >
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mb-5">
            <label className="p-0">Akademi</label>
            <Select
              options={optionsAkademi}
              defaultValue={academy}
              onChange={(e) => setAcademy({ value: e.value, label: e.label })}
            />
          </div>
          <div className="form-group mb-0">
            <label className="p-0">Status</label>
            <Select
              options={optionsStatus}
              defaultValue={status}
              onChange={(e) => setStatus({ value: e.value, label: e.label })}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-light-ghost-rounded-full mr-2"
            type="reset"
            onClick={handleReset}
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

export default ListTheme;
