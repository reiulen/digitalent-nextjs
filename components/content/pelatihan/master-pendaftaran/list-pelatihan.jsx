// #Next & React
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// #Page, Component & Library
import PageWrapper from "../../../wrapper/page.wrapper";

import LoadingTable from "../../../LoadingTable";
import Pagination from "react-js-pagination";

// #Icon
import IconArrow from "../../../assets/icon/Arrow";
import IconClose from "../../../assets/icon/Close";
import IconFilter from "../../../assets/icon/Filter";
import { useSelector } from "react-redux";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { RESET_STATUS_FILTER } from "../../../../redux/types/pelatihan/master-pendaftaran.type";
import Swal from "sweetalert2";
import {
  deleteMasterTraining,
  getAllListMasterPelatihan,
  updateStatusPublishMaster,
  setValueLimit,
  setValuePage,
  searchKeyword,
  setValueStatus,
} from "../../../../redux/actions/pelatihan/master-pendaftaran.action";

export default function MasterPelatihan({ token }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { loading, error, list } = useSelector(
    (state) => state.getAllMasterPelatihan
  );

  const AllMasterPelatihan = useSelector(
    (state) => state.getAllMasterPelatihan
  );

  const deleted = useSelector((state) => state.deleteMasterPelatihan);

  useEffect(() => {
    if (
      deleted &&
      Object.keys(deleted).length === 0 &&
      Object.getPrototypeOf(deleted) === Object.prototype
    ) {
      return false;
    } else {
      dispatch(getAllListMasterPelatihan(token));
    }
  }, [deleted, dispatch, token]);

  const [dataStatus, setDataStatus] = useState([
    { label: "Listed", value: "1" },
    { label: "Unlisted", value: "0" },
  ]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(null);

  let selectRefAkademi = null;

  const resetValueSort = (e) => {
    e.preventDefault();
    selectRefAkademi.select.clearValue();
    dispatch({ type: RESET_STATUS_FILTER });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchKeyword(search));
  };
  const [status, setStatus] = useState();
  const handleSelectStatus = (e) => {
    setStatus(e);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    dispatch(setValueStatus(status.value));
  };

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors);
    }
  };

  useEffect(() => {
    dispatch(getAllListMasterPelatihan(token));
  }, [
    dispatch,
    token,
    AllMasterPelatihan.keyword,
    AllMasterPelatihan.page,
    AllMasterPelatihan.theme,
    AllMasterPelatihan.status,
    AllMasterPelatihan.limit,
  ]);

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
        dispatch(deleteMasterTraining(id, token));
      }
    });
  };

  const handleStatusPublish = (e, id, value) => {
    const data = {
      status: value,
      id: id,
    };
    dispatch(updateStatusPublishMaster(data, token));
  };

  return (
    <PageWrapper>
      {/* error START */}
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
      {/* error END */}
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              List Master Pendaftar
            </h3>
            <div className="card-toolbar">
              <Link
                href="/pelatihan/master-pendaftaran/tambah-form-pendaftaran"
                passHref
              >
                <a
                  href="#"
                  className="btn btn-primary-rounded-full px-6 font-weight-bolder px-5 py-3 mt-2"
                >
                  <i className="ri-add-fill"></i>
                  Tambah Form Pendaftaran
                </a>
              </Link>
            </div>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-6 col-xl-6 col-sm-6">
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
                      onClick={(e) => {
                        handleSearch(e);
                      }}
                    >
                      Cari
                    </button>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6">
                  <div className="d-flex flex-wrap align-items-center justify-content-end mt-2">
                    {/* sortir by modal */}
                    <button
                      className="avatar item-rtl btn border d-flex align-items-center justify-content-between mt-2"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                      style={{ color: "#464646", minWidth: "230px" }}
                    >
                      <div className="d-flex align-items-center">
                        <IconFilter className="mr-3" />
                        Pilih Filter
                      </div>
                      <IconArrow fill="#E4E6EF" width="11" height="11" />
                    </button>
                    {/* modal */}
                    <form className="form text-left">
                      <div
                        className="modal fade"
                        id="exampleModalCenter"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalCenterTitle"
                        aria-hidden="true"
                      >
                        <div
                          className="modal-dialog modal-dialog-centered"
                          role="document"
                        >
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="exampleModalLongTitle"
                              >
                                Filter
                              </h5>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <IconClose />
                              </button>
                            </div>

                            <div
                              className="modal-body text-left"
                              // style={{ height: "200px" }}
                            >
                              <div className="fv-row mb-10">
                                <label className="required fw-bold fs-6 mb-2">
                                  Status
                                </label>
                                <Select
                                  ref={(ref) => (selectRefAkademi = ref)}
                                  className="basic-single"
                                  classNamePrefix="select"
                                  placeholder="Semua"
                                  isDisabled={false}
                                  isLoading={false}
                                  isClearable={false}
                                  isRtl={false}
                                  isSearchable={true}
                                  name="color"
                                  onChange={(e) => {
                                    handleSelectStatus(e);
                                  }}
                                  options={dataStatus}
                                />
                              </div>
                            </div>
                            <div className="modal-footer">
                              <div className="d-flex justify-content-end align-items-center">
                                <button
                                  className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5"
                                  type="button"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                  onClick={(e) => resetValueSort(e)}
                                >
                                  Reset
                                </button>
                                <button
                                  className="btn btn-sm btn-rounded-full bg-blue-primary text-white "
                                  type="button"
                                  onClick={(e) => handleFilter(e)}
                                >
                                  Terapkan
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                    {/* END modal */}
                  </div>
                </div>
              </div>
            </div>
            {/* START TABLE */}
            <div className="table-page mt-5">
              <div className="table-responsive">
                <LoadingTable loading={loading} />
                {loading === false ? (
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-center">No</th>
                        <th>ID Pendaftaran</th>
                        <th>Nama Form Pendaftaran</th>
                        <th>Status Publish</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!list || (list && list.list.length === 0) ? (
                        <tr>
                          <td className="text-center" colSpan={6}>
                            Data Tidak Ditemukan
                          </td>
                        </tr>
                      ) : (
                        list &&
                        list.list.map((item, i) => {
                          return (
                            <tr key={list.id}>
                              <td className="align-middle text-center">
                                {AllMasterPelatihan.page === 1
                                  ? i + 1
                                  : (AllMasterPelatihan.page - 1) *
                                      AllMasterPelatihan.limit +
                                    (i + 1)}
                              </td>
                              {/* START TABLE DATA */}
                              <td className="align-middle">{item.id}</td>
                              <td className="align-middle">
                                {item.judul_form}
                              </td>
                              <td className="align-middle">
                                <div className="position-relative w-max-content">
                                  <select
                                    className={`select-pelatihan ${
                                      item.status === "1"
                                        ? "select-pelatihan-success"
                                        : "select-pelatihan-danger"
                                    }`}
                                    key={i}
                                    value={item.status}
                                    onChange={(e) =>
                                      handleStatusPublish(
                                        e,
                                        item.id,
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value="1">Listed</option>
                                    <option value="0">Unlisted</option>
                                  </select>
                                </div>
                              </td>
                              <td className="align-middle d-flex">
                                <button
                                  className="btn btn-link-action bg-blue-secondary text-white mr-2"
                                  onClick={() =>
                                    router.push(
                                      `/pelatihan/master-pendaftaran/edit-form-pendaftaran?id=${item.id}`
                                    )
                                  }
                                  data-toggle="tooltip"
                                  data-placement="bottom"
                                  title="Hapus"
                                >
                                  <i className="ri-pencil-fill p-0 text-white"></i>
                                </button>
                                <Link
                                  href={`/pelatihan/master-pendaftaran/${item.judul_form
                                    ?.split(" ")
                                    .join("-")
                                    .toLowerCase()}?id=${item.id}`}
                                  passHref
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
                                <button
                                  className="btn btn-link-action bg-blue-secondary text-white"
                                  onClick={() => handleDelete(item.id)}
                                  data-toggle="tooltip"
                                  data-placement="bottom"
                                  title="Hapus"
                                >
                                  <i className="ri-delete-bin-fill p-0 text-white"></i>
                                </button>
                              </td>
                              {/* END TABLE DATA */}
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
              {/* START Pagination */}
              <div className="row">
                {list && (
                  <div className="table-pagination my-auto">
                    <Pagination
                      activePage={list.page}
                      itemsCountPerPage={list.perPage}
                      totalItemsCount={list.total}
                      pageRangeDisplayed={3}
                      onChange={(page) => dispatch(setValuePage(page))}
                      nextPageText={">"}
                      prevPageText={"<"}
                      firstPageText={"<<"}
                      lastPageText={">>"}
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  </div>
                )}
                <div className="table-total ml-auto">
                  <div className="row mt-4">
                    <div className="col-4 mr-0 p-0 my-auto">
                      <select
                        className="form-control"
                        id="exampleFormControlSelect2"
                        style={{
                          width: "65px",
                          background: "#F3F6F9",
                          borderColor: "#F3F6F9",
                          color: "#9E9E9E",
                        }}
                        onChange={(e) =>
                          dispatch(setValueLimit(e.target.value))
                        }
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
                        className="align-middle my-auto"
                        style={{ color: "#B5B5C3" }}
                      >
                        Total Data {list.total}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Pagination */}
            </div>
            {/* END TABLE */}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
