// #Next & React
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// #Page, Component & Library
import PageWrapper from "../../../wrapper/page.wrapper";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import LoadingTable from "../../../LoadingTable";
import Pagination from "react-js-pagination";

// #Icon
import IconArrow from "../../../assets/icon/Arrow";
import IconClose from "../../../assets/icon/Close";
import IconFilter from "../../../assets/icon/Filter";
import { useSelector } from "react-redux";
import moment from "moment";
import Select from "react-select";

export default function NamaPelatihan({ token }) {
  // console.log(token);
  const router = useRouter();

  const { loading, error, certificate } = useSelector(
    state => state.allCertificates
  );
  const [academy, setAcademy] = useState("");
  const [temaPelatihan, setTemaPelatihan] = useState("");
  const [disable, setDisable] = useState(true);
  const [dataTemaPelatihan, setDataTemaPelatihan] = useState([]);
  const [dataAcademy, setDataAcademy] = useState([]);
  let { page = 1, keyword } = router.query;

  const resetValueSort = () => {
    setAcademy("");
    setDisable(true);
    setTemaPelatihan("");
    router.push(`${router.pathname}?page=${page}`);
  };
  // #DatePicker

  // #Pagination, search, filter
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(null);

  const handlePagination = pageNumber => {
    let link = `${router.pathname}?page=${pageNumber}`;
    if (search) link = link.concat(`&keyword=${search}`);
    if (limit) link = link.concat(`&limit=${limit}`);
    router.push(link);
  };

  const handleLimit = val => {
    setLimit(val);
    router.push(`${router.pathname}?page=1&limit=${val}`);
  };

  const handleSearch = () => {
    let link = `${router.pathname}?page=1`;
    if (limit) link = link.concat(`&limit=${limit}`);
    if (search) link = link.concat(`&keyword=${search}`);
    router.push(link);
  };

  const handleFilter = e => {
    if (!academy && !temaPelatihan) {
      Swal.fire(
        "Oops !",
        "Harap memilih kategori Akademi atau Tema pelatihan terlebih dahulu.",
        "error"
      );
    } else {
      let link = `${router.pathname}?page=1`;
      if (limit) link = link.concat(`&limit=${limit}`);
      if (academy) link = link.concat(`&academy=${academy}`);
      if (temaPelatihan) link = link.concat(`&theme=${temaPelatihan}`);
      router.push(link);
    }
  };

  useEffect(() => {
    let arr = [];
    certificate.list_certificate.forEach((el, i) => {
      arr.push({
        value: el.theme.academy.name,
        label: el.theme.academy.name,
      });
    });
    setDataAcademy(arr);
  }, [certificate.list_certificate]);

  const handleSelectAcademy = e => {
    setAcademy(e.value);
    setTemaPelatihan("");
    setDisable(false);
    let arr = certificate.list_certificate;
    const test = arr.filter(el => el.theme.academy.name == e.value);
    const newArr = [{}];
    test.forEach((el, i) => {
      newArr[i]["value"]
        ? (newArr[i]["value"] = el.theme.name)
        : (newArr[i] = {
            ...newArr[i],
            value: el.theme.name,
            label: el.theme.name,
          });
    });
    setDataTemaPelatihan(newArr);
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
              Kelola Sertifikat
            </h3>
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
                      onChange={e => setSearch(e.target.value)}
                    />
                    <button
                      className="btn bg-blue-primary text-white right-center-absolute"
                      style={{
                        borderTopLeftRadius: "0",
                        borderBottomLeftRadius: "0",
                      }}
                      onClick={() => {
                        handleSearch();
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
                                  className="basic-single"
                                  classNamePrefix="select"
                                  placeholder="Semua"
                                  isDisabled={false}
                                  isLoading={false}
                                  isClearable={false}
                                  isRtl={false}
                                  isSearchable={true}
                                  name="color"
                                  onChange={e => {
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
                                  className="basic-single"
                                  classNamePrefix="select"
                                  placeholder={
                                    disable ? "Isi kolom akademi" : "Semua"
                                  }
                                  // defaultValue={options[0].value}
                                  isDisabled={disable ? true : false}
                                  isLoading={false}
                                  isClearable={false}
                                  isRtl={false}
                                  isSearchable={true}
                                  name="color"
                                  onChange={e => setTemaPelatihan(e.value)}
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
                                  onClick={() => resetValueSort()}
                                >
                                  Reset
                                </button>
                                <button
                                  className="btn btn-sm btn-rounded-full bg-blue-primary text-white "
                                  type="button"
                                  onClick={handleFilter}
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
                        <th>Akademi</th>
                        <th>Tema Pelatihan</th>
                        <th>Jumlah Sertifikat</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!certificate ||
                      (certificate &&
                        certificate.list_certificate.length === 0) ? (
                        <tr>
                          <td className="text-center" colSpan={6}>
                            {search
                              ? "Data Tidak Ditemukan"
                              : "Data Masih Kosong"}
                          </td>
                        </tr>
                      ) : (
                        certificate &&
                        certificate.list_certificate.map((certificate, i) => {
                          return (
                            <tr key={certificate.id}>
                              <td className="align-middle text-center">
                                {limit === null ? (
                                  <span className="badge ">
                                    {i + 1 * (page * 5) - (5 - 1)}
                                  </span>
                                ) : (
                                  <span className="badge ">
                                    {i + 1 * (page * limit) - (limit - 1)}
                                  </span>
                                )}
                              </td>
                              {/* START TABLE DATA */}
                              <td className="align-middle">
                                {certificate.theme.academy.name}
                              </td>
                              <td className="align-middle">
                                {certificate.theme.name}
                              </td>
                              <td className="align-middle">
                                {certificate.theme.count_certificate_count}
                              </td>
                              <td className="align-middle d-flex">
                                <Link
                                  href={`/sertifikat/kelola-sertifikat/${certificate.theme.name}?id=${certificate.theme.academy.id}`}
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
                  <div className="table-pagination">
                    <Pagination
                      activePage={+page}
                      itemsCountPerPage={certificate.perPage}
                      totalItemsCount={certificate.total}
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
                {certificate && certificate.total ? (
                  <div className="table-total ml-auto">
                    <div className="row mt-3">
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
                          onChange={e => handleLimit(e.target.value)}
                          onBlur={e => handleLimit(e.target.value)}
                        >
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
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
                ) : (
                  ""
                )}
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
