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
import {
  getAllSertifikat,
  searchKeyword,
  setValueAcademy,
  setValueLimit,
  setValuePage,
  setValueTheme,
} from "../../../../redux/actions/sertifikat/kelola-sertifikat.action";
import { RESET_VALUE_FILTER } from "../../../../redux/types/sertifikat/kelola-sertifikat.type";
import Cookies from "js-cookie";

export default function MasterPelatihan({ token }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { loading, error, certificate, academyOptions, themeOptions } =
    useSelector((state) => state.allCertificates);

  const allCertificates = useSelector((state) => state.allCertificates);
  const [academy, setAcademy] = useState("");
  const [temaPelatihan, setTemaPelatihan] = useState("");
  const [disable, setDisable] = useState(true);
  const [dataTemaPelatihan, setDataTemaPelatihan] = useState([]);
  const [dataAcademy, setDataAcademy] = useState([]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(null);

  let selectRefAkademi = null;
  let temaRef = null;

  const resetValueSort = (e) => {
    e.preventDefault();
    temaRef.select.clearValue();
    selectRefAkademi.select.clearValue();
    setDisable(true);
    dispatch({ type: RESET_VALUE_FILTER });
  };

  useEffect(() => {
    let arr = [];
    academyOptions.forEach((el) => {
      arr.push({ id: el.id, value: el.name, label: el.name });
    });
    setDataAcademy(arr);
  }, [academyOptions]);

  useEffect(() => {
    const filteredTheme = themeOptions.filter(
      (items) => items.id == academy?.id
    );
    const data = filteredTheme.map((el) => {
      return { ...el, value: el.name, label: el.name };
    });
    setDataTemaPelatihan(data);
  }, [academy, themeOptions]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchKeyword(search));
  };

  const handleSelectAcademy = (e) => {
    setAcademy(e);
    setDisable(false);
    temaRef.select.clearValue();
  };

  const handleFilter = (e) => {
    e.preventDefault();
    if (!academy && !temaPelatihan) {
      Swal.fire(
        "Oops !",
        "Harap memilih kategori Akademi atau Tema pelatihan terlebih dahulu.",
        "error"
      );
    } else {
      if (academy) {
        dispatch(setValueAcademy(academy.value));
      }
      if (temaPelatihan) {
        dispatch(setValueTheme(temaPelatihan.value));
      }
    }
  };

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors);
    }
  };

  useEffect(() => {
    dispatch(getAllSertifikat(token));
  }, [
    dispatch,
    token,
    allCertificates.keyword,
    allCertificates.page,
    allCertificates.theme,
    allCertificates.academy,
    allCertificates.limit,
  ]);

  const list = [
    {
      no: 1,
      id_pelatihan: "C001",
      name: "Nama Form Pendaftaran",
      status: "listed",
    },
    {
      no: 2,
      id_pelatihan: "C002",
      name: "Nama Form Pendaftaran",
      status: "listed",
    },
    {
      no: 3,
      id_pelatihan: "C003",
      name: "Nama Form Pendaftaran",
      status: "unlisted",
    },
    {
      no: 4,
      id_pelatihan: "C004",
      name: "Nama Form Pendaftaran",
      status: "listed",
    },
  ];

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
              <Link href="/pelatihan/pelatihan/tambah-pelatihan" passHref>
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
                              style={{ height: "400px" }}
                            >
                              <div className="fv-row mb-10">
                                <label className="required fw-bold fs-6 mb-2">
                                  Akademi
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
                                    handleSelectAcademy(e);
                                  }}
                                  options={dataAcademy}
                                />
                              </div>
                              <div className="fv-row mb-10">
                                <label className="required fw-bold fs-6 mb-2">
                                  Tema Pelatihan
                                </label>
                                <Select
                                  ref={(ref) => (temaRef = ref)}
                                  className="basic-single"
                                  classNamePrefix="select"
                                  placeholder={
                                    disable ? "Isi kolom akademi" : "Semua"
                                  }
                                  isDisabled={!academy ? true : false}
                                  isLoading={false}
                                  isClearable={false}
                                  isRtl={false}
                                  isSearchable={true}
                                  name="color"
                                  onChange={(e) => setTemaPelatihan(e?.value)}
                                  options={dataTemaPelatihan}
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
                        <th>ID Pelatihan</th>
                        <th>Nama Form Pendaftaran</th>
                        <th>Status Publish</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!certificate ||
                      (certificate &&
                        certificate.list_certificate.length === 0) ? (
                        <tr>
                          <td className="text-center" colSpan={6}>
                            Data Tidak Ditemukan
                          </td>
                        </tr>
                      ) : (
                        list &&
                        list.map((item, i) => {
                          return (
                            <tr key={certificate.id}>
                              <td className="align-middle text-center">
                                {allCertificates.page === 1
                                  ? i + 1
                                  : (allCertificates.page - 1) *
                                      allCertificates.limit +
                                    (i + 1)}
                              </td>
                              {/* START TABLE DATA */}
                              <td className="align-middle">{item.id}</td>
                              <td className="align-middle">{item.name}</td>
                              <td className="align-middle">
                                <div className="position-relative w-max-content">
                                  <select
                                    name=""
                                    id=""
                                    className={`select-pelatihan ${
                                      item.status === "listed"
                                        ? "select-pelatihan-success"
                                        : "select-pelatihan-danger"
                                    }`}
                                    key={i}
                                    value={item.status}
                                    onChange={(e) =>
                                      handleStatusPublish(
                                        item.id,
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value="listed">Listed</option>
                                    <option value="unlisted">Unlisted</option>
                                  </select>
                                </div>
                              </td>
                              <td className="align-middle d-flex">
                                <Link
                                  href={`/sertifikat/kelola-sertifikat/${item.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}?id=${item.id}`}
                                  passHref
                                >
                                  <a
                                    className="btn btn-link-action bg-blue-secondary text-white mr-2"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="Detail"
                                    onClick={() => {
                                      Cookies.set(
                                        "tema_pelatihan_id",
                                        certificate.id
                                      );
                                    }}
                                  >
                                    <i className="ri-eye-fill p-0 text-white"></i>
                                  </a>
                                </Link>
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
                {certificate && (
                  <div className="table-pagination my-auto">
                    <Pagination
                      activePage={allCertificates.page}
                      itemsCountPerPage={certificate.perPage}
                      totalItemsCount={certificate.total}
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
                        Total Data {certificate.total}
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
