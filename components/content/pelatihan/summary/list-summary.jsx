import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import moment from "moment";
import DatePicker from "react-datepicker";
import axios from 'axios'

import {
  clearErrors,
  getAllSummary,
} from "../../../../redux/actions/pelatihan/summary.actions";

import PageWrapper from "../../../wrapper/page.wrapper";
import LoadingTable from "../../../LoadingTable";

import { useDispatch, useSelector } from "react-redux";

const ListSummary = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  let { success } = router.query;

  const { loading, error, summary } = useSelector((state) => state.allSummary);
  const {
    loading: statusLoading,
    error: statusError,
    success: statusSuccess,
    status,
  } = useSelector((state) => state.updateStatus);
  const { error: dropdownErrorAkademi, data: dataAkademi } = useSelector(
    (state) => state.drowpdownAkademi
  );
  const { error: dropdownErrorTema, data: dataTema } = useSelector(
    (state) => state.drowpdownTema
  );
  const { error: dropdownErrorPenyelenggara, data: dataPenyelenggara } =
    useSelector((state) => state.drowpdownPenyelenggara);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(null);
  const [penyelenggara, setPenyelenggara] = useState(null);
  const [academy, setAcademy] = useState(null);
  const [theme, setTheme] = useState(null);
  const [statusSubstansi, setStatusSubstansi] = useState(null);
  const [statusPelatihan, setStatusPelatihan] = useState(null);
  const [dateRegister, setDateRegister] = useState([null, null]);
  const [dateRegisterStart, dateRegisterEnd] = dateRegister;

  const [datePelaksanaan, setDatePelaksanaan] = useState([null, null]);
  const [datePelaksanaanStart, datePelaksanaanEnd] = datePelaksanaan;

  const [showModal, setShowModal] = useState(false);

  const optionsAkademi = dataAkademi.data;
  const optionsTema = dataTema.data;
  const optionsPenyelenggara = [];
  if (dataPenyelenggara && dataPenyelenggara.data.length > 0) {
    for (let index = 0; index < dataPenyelenggara.data.length; index++) {
      let val = {
        value: dataPenyelenggara.data[index].id,
        label: dataPenyelenggara.data[index].label,
      };
      optionsPenyelenggara.push(val);
    }
  }

  const optionsStatusPelatihan = [
    { value: "review substansi", label: "Review Substansi" },
    { value: "menunggu", label: "Menunggu" },
    { value: "pendaftaran", label: "Pendaftaran" },
    { value: "seleksi administrasi", label: "Seleksi Administrasi" },
    { value: "seleksi substansi", label: "Seleksi Substansi" },
    { value: "pelatihan", label: "Pelatihan" },
    { value: "selesai", label: "Selesai" },
  ];

  const optionsStatusSubstansi = [
    { value: "review", label: "Review" },
    { value: "revisi", label: "Revisi" },
    { value: "disetujui", label: "Disetujui" },
    { value: "ditolak", label: "Ditolak" },
  ];

  const handlePagination = (pageNumber) => {
    setPage(pageNumber);
    let register = dateRegister.map((item) => {
      return moment(item).format("YYYY-MM-DD");
    });
    let pelaksanaan = datePelaksanaan.map((item) => {
      return moment(item).format("YYYY-MM-DD");
    });
    dispatch(
      getAllSummary(
        pageNumber,
        search,
        limit,
        register[0] === "Invalid date" ? "" : register.join(","),
        pelaksanaan[0] === "Invalid date" ? "" : pelaksanaan.join(","),
        statusSubstansi != null ? statusSubstansi.value : null,
        statusPelatihan != null ? statusPelatihan.value : null,
        penyelenggara != null ? penyelenggara.value : null,
        academy,
        theme,
        token
      )
    );
  };

  const handleSearch = () => {
    setPage(1);
    dispatch(
      getAllSummary(
        1,
        search,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        token
      )
    );
  };

  const handleFilter = () => {
    setShowModal(false);
    setPage(1);
    let register = dateRegister.map((item) => {
      return moment(item).format("YYYY-MM-DD");
    });
    let pelaksanaan = datePelaksanaan.map((item) => {
      return moment(item).format("YYYY-MM-DD");
    });
    dispatch(
      getAllSummary(
        1,
        search,
        limit,
        register[0] === "Invalid date" ? "" : register.join(","),
        pelaksanaan[0] === "Invalid date" ? "" : pelaksanaan.join(","),
        statusSubstansi != null ? statusSubstansi.label : null,
        statusPelatihan != null ? statusPelatihan.label : null,
        penyelenggara != null ? penyelenggara.label : null,
        academy !== null ?  academy.label : null,
        theme !== null ? theme.label : null,
        token
      )
    );
  };

  const handleReset = () => {
    setPenyelenggara(null);
    setAcademy(null);
    setTheme(null);
    setStatusSubstansi(null);
    setStatusPelatihan(null);
    setDateRegister([null, null]);
    setDatePelaksanaan([null, null]);
    setShowModal(false);
    setPage(1);
    dispatch(
      getAllSummary(
        1,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        token
      )
    );
  };

  const handleLimit = (val) => {
    setLimit(val);
    setPage(1);
    dispatch(
      getAllSummary(
        1,
        null,
        val,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        token
      )
    );
  };

  const onNewReset = () => {
    router.replace("/subvit/substansi", undefined, { shallow: true });
  };

  const handleExportReport = (e) => {
    e.preventDefault()
    let register = dateRegister.map((item) => {
      return moment(item).format("YYYY-MM-DD");
    });
    let pelaksanaan = datePelaksanaan.map((item) => {
      return moment(item).format("YYYY-MM-DD");
    });
    let link = process.env.END_POINT_API_PELATIHAN + "/api/v1/pelatihan/export-rekap-pendaftaran";

    let config = {
      params: {
        cari:search,
        pendaftaran_mulai: register[0] === "Invalid date" ? "" : register.join(","),
        pelatihan_mulai: pelaksanaan[0] === "Invalid date" ? "" : pelaksanaan.join(","),
        status_pelatihan: statusPelatihan != null ? statusPelatihan.label : "",
        penyelenggara: penyelenggara != null ? penyelenggara.label : "",
        akademi: academy !== null ?  academy.label : "",
        tema: theme !== null ? theme.label : "",
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    }

     axios.get(link, config).then((res) => {
      window.open(res.data.data, '_blank');
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
              List Rekap Pendaftaran
            </h1>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-6 col-xl-6">
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

                <div className="col-lg-4 col-xl-4 justify-content-end d-flex mt-3">
                  <button
                    className="btn border d-flex align-items-center justify-content-between mb-2 w-100"
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
                <div className="col-md-2">
                  <button
                    className="d-flex justify-content-center btn w-100 btn-rounded-full bg-blue-secondary text-white"
                    type="button"
                    onClick={handleExportReport}
                  >
                    Export
                    <i className="ri-arrow-down-s-line ml-3 mt-1 text-white"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="table-page mt-5">
              <div className="table-responsive">
                <LoadingTable loading={loading} />
                {loading === false && (
                  <table
                    className="table table-separate table-head-custom table-checkable"
                    style={{
                      WebkitColumnWidth: "100%",
                      MozColumnWidth: "100%",
                    }}
                  >
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-center ">No</th>
                        <th>ID Pelatihan</th>
                        <th>Pelatihan</th>
                        <th>Jadwal</th>
                        <th>Status Pelatihan</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!summary ||
                      (summary && summary.list === null) ||
                      summary.list.length === 0 ? (
                        <td className="align-middle text-center" colSpan={8}>
                          Data Kosong
                        </td>
                      ) : (
                        summary.list.map((row, i) => (
                          <tr key={i}>
                            <td className="text-center align-middle">
                              {limit === null
                                ? i + 1 * (page * 5) - (5 - 1)
                                : i + 1 * (page * limit) - (limit - 1)}
                            </td>
                            <td className="align-middle">{row.slug}{row.id}</td>
                            <td className="align-middle">
                              <p className="font-weight-bolder my-0">
                                {row.name}
                              </p>
                              <p className="my-0">{row.penyelenggara}</p>
                              <p className="my-0">{row.provinsi}</p>
                            </td>
                            <td className="align-middle">
                              <p className="my-0">
                                {moment(row.pendaftaran_mulai).format(
                                  "DD MMM YYYY"
                                )}{" "}
                                -{" "}
                                {moment(row.pendaftaran_selesai).format(
                                  "DD MMM YYYY"
                                )}{" "}
                              </p>
                              <p className="my-0">
                                {moment(row.pelatihan_mulai).format(
                                  "DD MMM YYYY"
                                )}{" "}
                                -{" "}
                                {moment(row.pelatihan_selesai).format(
                                  "DD MMM YYYY"
                                )}{" "}
                              </p>
                            </td>
                            <td className="align-middle">
                              <span className="label label-inline label-light-success font-weight-bold">
                                {row.status_pelatihan}
                              </span>
                            </td>
                            <td className="align-middle ml-4">
                              <div className="d-flex mr-10">
                                <Link
                                  href={`/pelatihan/rekap-pendaftaran/view-rekap-pendaftaran/${row.id}`}
                                >
                                  <a
                                    className="btn btn-link-action bg-blue-secondary text-white mr-2"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="View"
                                  >
                                    <i className="ri-eye-fill text-white p-0"></i>
                                  </a>
                                </Link>
                                <Link
                                  href={`/pelatihan/rekap-pendaftaran/detail-rekap-pendaftaran/${row.id}`}
                                >
                                  <a
                                    className="btn btn-link-action bg-blue-secondary text-white mr-2"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="Detail"
                                  >
                                    <i className="ri-registered-fill text-white p-0"></i>
                                  </a>
                                </Link>
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
                {summary && summary.perPage < summary.total && (
                  <div className="table-pagination table-pagination pagination-custom col-12 col-md-6">
                    <Pagination
                      activePage={page}
                      itemsCountPerPage={summary.perPage}
                      totalItemsCount={summary.total}
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
                {summary && summary.total > 5 && (
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
                          value={limit}
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
                          Total Data {summary.total}
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
            <label className="p-0">Penyelenggara</label>
            <Select
              options={optionsPenyelenggara}
              defaultValue={penyelenggara}
              onChange={(e) =>
                setPenyelenggara({ value: e.value, label: e.label })
              }
            />
          </div>
          <div className="form-group mb-5">
            <label className="p-0">Akademi</label>
            <Select
              options={optionsAkademi}
              defaultValue={academy}
              onChange={(e) => setAcademy({ value: e.value, label: e.label })}
            />
          </div>
          <div className="form-group mb-5">
            <label className="p-0">Tema</label>
            <Select
              options={optionsTema}
              defaultValue={theme}
              onChange={(e) => setTheme({ value: e.value, label: e.label })}
            />
          </div>
          <div className="form-group mb-5">
            <label className="p-0">Status Substansi</label>
            <Select
              options={optionsStatusSubstansi}
              defaultValue={statusSubstansi}
              onChange={(e) =>
                setStatusSubstansi({ value: e.value, label: e.label })
              }
            />
          </div>
          <div className="form-group mb-5">
            <label className="p-0">Status Pelatihan</label>
            <Select
              options={optionsStatusPelatihan}
              defaultValue={statusPelatihan}
              onChange={(e) =>
                setStatusPelatihan({ value: e.value, label: e.label })
              }
            />
          </div>
          <div className="row">
            <div className="form-group mb-5 col-md-6">
              <label className="p-0">Tanggal Pendaftaran</label>
              <DatePicker
                wrapperClassName="datepicker"
                className="form-control"
                name="start_date"
                selectsRange={true}
                onChange={(date) => {
                  setDateRegister(date);
                }}
                startDate={dateRegisterStart}
                endDate={dateRegisterEnd}
                dateFormat="dd/MM/yyyy"
                autoComplete="off"
              />
            </div>
            <div className="form-group mb-5 col-md-6">
              <label className="p-0">Tanggal Pelaksanaan</label>
              <DatePicker
                wrapperClassName="datepicker"
                className="form-control"
                name="start_date"
                selectsRange={true}
                onChange={(date) => setDatePelaksanaan(date)}
                startDate={datePelaksanaanStart}
                endDate={datePelaksanaanEnd}
                dateFormat="dd/MM/yyyy"
                autoComplete="off"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-light-ghost-rounded-full mr-2"
            type="button"
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

export default ListSummary;
