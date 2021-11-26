import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import DatePicker from "react-datepicker";
import Pagination from "react-js-pagination";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import moment from "moment";
import axios from "axios";

import {
  deleteTraining,
  clearErrors,
  getAllTraining,
  updateStatusPublish,
  updateStatusPelatihan,
  cloneTrainingAction,
} from "../../../../redux/actions/pelatihan/training.actions";
import { getListRevisi } from "../../../../redux/actions/pelatihan/review.actions";
import {
  DELETE_TRAINING_RESET,
  CLEAR_STATUS,
  CLONE_TRAINING_RESET,
} from "../../../../redux/types/pelatihan/training.type";

import PageWrapper from "../../../wrapper/page.wrapper";
import LoadingTable from "../../../LoadingTable";
import CardPage from "../../../CardPage";

import { useDispatch, useSelector } from "react-redux";

import {
  dropdownAkademi,
  dropdownLevelPelatihan,
  dropdownMitra,
  dropdownPenyelenggara,
  dropdownProvinsi,
  dropdownTemabyAkademi,
  dropdownKabupaten,
} from "../../../../redux/actions/pelatihan/function.actions";

const ListTraining = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  let { success } = router.query;

  const { error: errorRevisi, revisi } = useSelector(
    (state) => state.listRevisi
  );
  const {
    loading: allLoading,
    error: allError,
    training,
  } = useSelector((state) => state.allTraining);
  const { error: cardError, training: cardTraining } = useSelector(
    (state) => state.cardTraining
  );
  const drowpdownTemabyAkademi = useSelector(
    (state) => state.drowpdownTemabyAkademi
  );
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
  const {
    loading: deleteLoading,
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.deleteTraining);

  const cloneTraining = useSelector((state) => state.cloneTraining);

  let loading = false;
  if (allLoading) {
    loading = allLoading;
  } else if (deleteLoading) {
    loading = deleteLoading;
  } else if (statusLoading) {
    loading = statusLoading;
  } else if (cloneTraining.loading) {
    loading = cloneTraining.loading;
  }

  let error;
  if (allError) {
    error = allError;
  } else if (deleteError) {
    error = deleteError;
  } else if (statusError) {
    error = statusError;
  } else if (cardError) {
    error = cardError;
  } else if (errorRevisi) {
    error = errorRevisi;
  } else if (cloneTraining.error) {
    error = cloneTraining.error;
  }

  const [note, setNote] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(null);
  const [penyelenggara, setPenyelenggara] = useState(null);
  const [academy, setAcademy] = useState(null);
  const [theme, setTheme] = useState(null);
  const [statusSubstansi, setStatusSubstansi] = useState(null);
  const [statusPelatihan, setStatusPelatihan] = useState(null);
  const [berjalan, setBerjalan] = useState(null);

  const [dateRegister, setDateRegister] = useState([null, null]);
  const [dateRegisterStart, dateRegisterEnd] = dateRegister;

  const [datePelaksanaan, setDatePelaksanaan] = useState([null, null]);
  const [datePelaksanaanStart, datePelaksanaanEnd] = datePelaksanaan;

  const [showModal, setShowModal] = useState(false);
  const [showModalRevisi, setShowModalRevisi] = useState(false);

  const optionsAkademi = dataAkademi.data || [];
  const optionsTema = dataTema.data || [];
  const optionsPenyelenggara = [];
  if (dataPenyelenggara) {
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
    { value: "menunggu pendaftaran", label: "Menunggu Pendaftaran" },
    { value: "pendaftaran", label: "Pendaftaran" },
    { value: "seleksi", label: "Seleksi" },
    { value: "pelatihan", label: "Pelatihan" },
    { value: "selesai", label: "Selesai" },
    { value: "dibatalkan", label: "Dibatalkan" },
  ];

  const optionsStatusSubstansi = [
    { value: "review", label: "Review" },
    { value: "revisi", label: "Revisi" },
    { value: "disetujui", label: "Disetujui" },
    { value: "ditolak", label: "Ditolak" },
  ];

  useEffect(() => {
    dispatch(dropdownTemabyAkademi(academy?.value, token));
    if (isDeleted) {
      Swal.fire("Berhasil ", "Data berhasil dihapus.", "success").then(
        (result) => {
          if (result.isConfirmed) {
            dispatch(
              getAllTraining(
                null,
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
          }
        }
      );
      dispatch({
        type: DELETE_TRAINING_RESET,
      });
    }
    if (cloneTraining.loading) {
      Swal.fire("Berhasil ", "Data berhasil diclone.", "success").then(
        (result) => {
          if (result.isConfirmed) {
            dispatch(
              getAllTraining(
                null,
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
          }
        }
      );
      dispatch({
        type: CLONE_TRAINING_RESET,
      });
    }
    if (statusSuccess) {
      dispatch(
        getAllTraining(
          null,
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
      dispatch({
        type: CLEAR_STATUS,
      });
    }

    if (revisi && revisi.length !== 0) {
      revisi.map((row, i) => {
        setNote(row.revisi);
      });
    }
  }, [
    isDeleted,
    statusSuccess,
    dispatch,
    token,
    revisi,
    cloneTraining.loading,
    academy?.value,
  ]);

  const handlePagination = (pageNumber) => {
    setPage(pageNumber);
    let register = dateRegister.map((item) => {
      return moment(item).format("YYYY-MM-DD");
    });
    let pelaksanaan = datePelaksanaan.map((item) => {
      return moment(item).format("YYYY-MM-DD");
    });
    dispatch(
      getAllTraining(
        pageNumber,
        search,
        limit,
        register[0] === "Invalid date" ? "" : register.join(","),
        pelaksanaan[0] === "Invalid date" ? "" : pelaksanaan.join(","),
        statusSubstansi != null ? statusSubstansi.label : null,
        statusPelatihan != null ? statusPelatihan.label : null,
        penyelenggara != null ? penyelenggara.label : null,
        academy !== null ? academy.label : null,
        theme !== null ? theme.label : null,
        token,
        berjalan
      )
    );
  };

  const handleSearch = () => {
    setPage(1);
    dispatch(
      getAllTraining(
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
    let register = dateRegister.map((item) => {
      return moment(item).format("YYYY-MM-DD");
    });
    let pelaksanaan = datePelaksanaan.map((item) => {
      return moment(item).format("YYYY-MM-DD");
    });
    setPage(1);
    dispatch(
      getAllTraining(
        1,
        search,
        limit,
        register[0] === "Invalid date" ? "" : register.join(","),
        pelaksanaan[0] === "Invalid date" ? "" : pelaksanaan.join(","),
        statusSubstansi != null ? statusSubstansi.label : null,
        statusPelatihan != null ? statusPelatihan.label : null,
        penyelenggara != null ? penyelenggara.label : null,
        academy != null ? academy.label : null,
        theme != null ? theme.label : null,
        token,
        berjalan
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
      getAllTraining(
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
      getAllTraining(
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

  const handleStatusPublish = (id, val) => {
    const data = {
      status_publish: val,
      pelatian_id: id,
    };
    dispatch(updateStatusPublish(data, token));
  };

  const handleStatusPelatihan = (id, val) => {
    const data = {
      status_pelatihan: val,
      pelatian_id: id,
    };
    dispatch(updateStatusPelatihan(data, token));
  };

  const onNewReset = () => {
    router.replace("/pelatihan/pelatihan", undefined, { shallow: true });
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
        dispatch(deleteTraining(id, token));
      }
    });
  };

  const handleClone = (id) => {
    Swal.fire({
      title: "Apakah anda yakin ?",
      text: "Data ini akan di Clone !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya !",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(cloneTrainingAction(id, token));
      }
    });
  };

  const handlePublish = (val, type) => {
    setPage(1);
    const label = val.charAt(0).toUpperCase() + val.slice(1);
    if (type === "status_pelatihan") {
      setPenyelenggara(null);
      setAcademy(null);
      setTheme(null);
      setStatusSubstansi(null);
      setBerjalan(null);
      setStatusPelatihan({ label: val, value: val });
      setDateRegister([null, null]);
      setDatePelaksanaan([null, null]);
      setSearch("");
      setLimit(5);
      setPage(1);
      dispatch(
        getAllTraining(
          1,
          null,
          null,
          null,
          null,
          null,
          val,
          null,
          null,
          null,
          token
        )
      );
    } else if (type === "status_substansi") {
      setPenyelenggara(null);
      setAcademy(null);
      setTheme(null);
      setBerjalan(null);
      setStatusSubstansi({ label: val, value: val });
      setStatusPelatihan(null);
      setDateRegister([null, null]);
      setDatePelaksanaan([null, null]);
      setSearch("");
      setLimit(5);
      setPage(1);
      dispatch(
        getAllTraining(
          1,
          null,
          null,
          null,
          null,
          val,
          null,
          null,
          null,
          null,
          token
        )
      );
    } else if (type === "WhereInPelatihan") {
      setPenyelenggara(null);
      setAcademy(null);
      setTheme(null);
      setBerjalan("1");
      setStatusSubstansi(null);
      setStatusPelatihan(null);
      setDateRegister([null, null]);
      setDatePelaksanaan([null, null]);
      setSearch("");
      setLimit(5);
      setPage(1);
      dispatch(
        getAllTraining(
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
          token,
          val
        )
      );
    } else {
      setPenyelenggara(null);
      setAcademy(null);
      setTheme(null);
      setStatusSubstansi(null);
      setStatusPelatihan(null);
      setDateRegister([null, null]);
      setDatePelaksanaan([null, null]);
      setSearch("");
      setLimit(5);
      setPage(1);
      dispatch(
        getAllTraining(
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
          token,
          val
        )
      );
    }
  };

  const handleExportReport = () => {
    let register = dateRegister.map((item) => {
      return moment(item).format("YYYY-MM-DD");
    });
    let pelaksanaan = datePelaksanaan.map((item) => {
      return moment(item).format("YYYY-MM-DD");
    });

    let config = {
      params: {
        cari: search,
        pendaftaran_mulai:
          register[0] === "Invalid date" ? "" : register.join(","),
        pelatihan_mulai:
          pelaksanaan[0] === "Invalid date" ? "" : pelaksanaan.join(","),
        status_pelatihan: statusPelatihan != null ? statusPelatihan.label : "",
        penyelenggara: penyelenggara != null ? penyelenggara.label : "",
        akademi: academy !== null ? academy.label : "",
        tema: theme !== null ? theme.label : "",
        WhereInPelatihan: berjalan,
        status_substansi: statusSubstansi !== null ? statusSubstansi.label : "",
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    let link = `${process.env.END_POINT_API_PELATIHAN}api/v1/pelatihan/export`;

    axios.get(link, config).then((res) => {
      window.open(res.data.data, "_blank");
    });
  };

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  const handleModalRevisi = (id) => {
    dispatch(getListRevisi(token, id));
    setShowModalRevisi(true);
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

      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="row">
          <CardPage
            background="bg-primary"
            icon="new/add-user.svg"
            color="#FFFFFF"
            value={cardTraining[0].count}
            titleValue=""
            title="Selesai"
            publishedVal={cardTraining[0].status}
            routePublish={() =>
              handlePublish(cardTraining[0].status, cardTraining[0].condisi)
            }
          />
          <CardPage
            background="bg-secondary"
            icon="new/done-circle.svg"
            color="#FFFFFF"
            value={cardTraining[4].count}
            titleValue=""
            title="Disetujui"
            publishedVal={cardTraining[4].status}
            routePublish={() =>
              handlePublish(cardTraining[4].status, cardTraining[4].condisi)
            }
          />
          <CardPage
            background="bg-success"
            icon="new/open-book.svg"
            color="#FFFFFF"
            value={cardTraining[3].count}
            titleValue=""
            title="Revisi"
            publishedVal={cardTraining[3].status}
            routePublish={() =>
              handlePublish(cardTraining[3].status, cardTraining[3].condisi)
            }
          />
          <CardPage
            background="bg-warning"
            icon="new/mail-white.svg"
            color="#FFFFFF"
            value={cardTraining[1].count}
            titleValue=""
            title="Menunggu Review"
            publishedVal={cardTraining[1].status}
            routePublish={() =>
              handlePublish(cardTraining[1].status, cardTraining[1].condisi)
            }
          />
          <CardPage
            background="bg-extras"
            icon="new/block-white.svg"
            color="#FFFFFF"
            value={cardTraining[2].count}
            titleValue=""
            title="Berjalan"
            publishedVal={cardTraining[2].status}
            routePublish={() =>
              handlePublish(cardTraining[2].status, cardTraining[2].condisi)
            }
          />
        </div>
      </div>

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0 mt-3">
            <h1
              className="card-title text-dark mt-2"
              style={{ fontSize: "24px" }}
            >
              List Pelatihan
            </h1>
            <div className="card-toolbar">
              <Link href="/pelatihan/pelatihan/tambah-pelatihan" passHref>
                <a
                  href="#"
                  className="btn btn-primary-rounded-full px-6 font-weight-bolder px-5 py-3 mt-2"
                >
                  <i className="ri-add-fill"></i>
                  Tambah Pelatihan
                </a>
              </Link>
            </div>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-6 col-xl-6">
                  <div className="position-relative overflow-hidden mb-2 mt-3">
                    <i className="ri-search-line left-center-absolute ml-2"></i>
                    <input
                      type="text"
                      value={search}
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
                    className="btn w-100 btn-rounded-full bg-blue-secondary text-white"
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
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead className="w-100" style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-center ">No</th>
                        <th>ID Pelatihan</th>
                        <th>Pelatihan</th>
                        <th>Jadwal</th>
                        <th>Status Publish</th>
                        <th>Status Substansi</th>
                        <th>Status Pelatihan</th>
                        <th className="row-aksi-pelatihan">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="w-100">
                      {!training ||
                      (training && training.list === null) ||
                      training.list.length === 0 ? (
                        <td className="align-middle text-center" colSpan={8}>
                          Data Kosong
                        </td>
                      ) : (
                        training.list.map((row, i) => (
                          <tr key={i}>
                            <td className="text-center align-middle">
                              {limit === null
                                ? i + 1 * (page * 5) - (5 - 1)
                                : i + 1 * (page * limit) - (limit - 1)}
                            </td>
                            <td className="align-middle">
                              {row.slug}
                              {row.id}
                            </td>
                            <td className="align-middle">
                              <p className="font-weight-bolder my-0">
                                {row.name.length > 30
                                  ? row.name.substring(0, 30) + "..."
                                  : row.name}
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
                              <div className="position-relative w-max-content">
                                <select
                                  name=""
                                  id=""
                                  className={`select-pelatihan ${
                                    row.status_publish === "1"
                                      ? "select-pelatihan-success"
                                      : "select-pelatihan-danger"
                                  }`}
                                  key={i}
                                  value={row.status_publish}
                                  onChange={(e) =>
                                    handleStatusPublish(row.id, e.target.value)
                                  }
                                  disabled={
                                    row.status_substansi === "revisi" ||
                                    row.status_pelatihan ===
                                      "review substansi" ||
                                    (row.status_substansi === "ditolak" && true)
                                  }
                                >
                                  <option value="1">Publish</option>
                                  <option value="0">Unpublish</option>
                                </select>
                              </div>
                            </td>
                            <td className="align-middle text-center">
                              {row.status_substansi === "review" ||
                              row.status_substansi === "disetujui" ? (
                                <span className="label label-inline label-light-success font-weight-bold text-capitalize">
                                  {row.status_substansi}
                                </span>
                              ) : (
                                <span className="label label-inline label-light-danger font-weight-bold text-capitalize">
                                  {row.status_substansi}
                                </span>
                              )}
                            </td>
                            <td className="align-middle">
                              <div className="position-relative w-max-content">
                                <select
                                  name=""
                                  id=""
                                  className="select-pelatihan select-pelatihan-success"
                                  key={i}
                                  value={row.status_pelatihan}
                                  onChange={(e) =>
                                    handleStatusPelatihan(
                                      row.id,
                                      e.target.value
                                    )
                                  }
                                  disabled={
                                    row.status_pelatihan ===
                                      "review substansi" ||
                                    row.status_pelatihan === "selesai" ||
                                    (row.status_substansi === "ditolak" && true)
                                  }
                                >
                                  {row.status_pelatihan ===
                                    "menunggu pendaftaran" && (
                                    <>
                                      <option value="menunggu pendaftaran">
                                        Menunggu Pendaftaran
                                      </option>
                                    </>
                                  )}
                                  {row.status_pelatihan === "pendaftaran" && (
                                    <option value="pendaftaran">
                                      Pendaftaran
                                    </option>
                                  )}
                                  {row.status_pelatihan === "seleksi" && (
                                    <>
                                      <option value="seleksi">Seleksi</option>
                                      <option value="pelatihan">
                                        Pelatihan
                                      </option>
                                    </>
                                  )}
                                  {row.status_pelatihan === "pelatihan" && (
                                    <>
                                      <option value="pelatihan">
                                        Pelatihan
                                      </option>
                                      <option value="selesai">Selesai</option>
                                    </>
                                  )}
                                  {row.status_pelatihan ===
                                    "review substansi" && (
                                    <option value="review substansi">
                                      Review Substansi
                                    </option>
                                  )}

                                  <option value="dibatalkan">Dibatalkan</option>
                                </select>
                              </div>
                            </td>
                            <td className="align-middle">
                              <div className="d-flex flex-row">
                                {!(
                                  row.status_pelatihan === "pelatihan" ||
                                  row.status_substansi === "ditolak"
                                ) && (
                                  <Link
                                    href={`/pelatihan/pelatihan/edit-pelatihan/${row.id}`}
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
                                )}
                                <Link
                                  href={`/pelatihan/pelatihan/view-pelatihan/${row.id}`}
                                >
                                  <a
                                    className="btn btn-link-action bg-blue-secondary text-white mr-2"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="Detail"
                                  >
                                    <i className="ri-eye-fill text-white p-0"></i>
                                  </a>
                                </Link>
                                {row.status_substansi === "revisi" && (
                                  <button
                                    className="btn btn-link-action bg-blue-secondary text-white mr-2"
                                    onClick={() => handleModalRevisi(row.id)}
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="Revisi"
                                  >
                                    <i className="ri-draft-line p-0 text-white"></i>
                                  </button>
                                )}
                                {!(
                                  row.status_pelatihan === "review substansi" ||
                                  row.status_substansi === "ditolak"
                                ) && (
                                  <Link
                                    href={`/pelatihan/pelatihan/tambah-form-lpj/${row.id}`}
                                  >
                                    <a
                                      className="btn btn-link-action bg-blue-secondary text-white mr-2"
                                      data-toggle="tooltip"
                                      data-placement="bottom"
                                      title="Upload LPJ"
                                    >
                                      <i className="ri-file-text-fill p-0 text-white"></i>
                                    </a>
                                  </Link>
                                )}
                                {!(
                                  row.status_substansi === "ditolak" ||
                                  row.status_pelatihan === "review substansi" ||
                                  row.status_pelatihan ===
                                    "menunggu pendaftaran" ||
                                  row.status_substansi === "revisi"
                                ) && (
                                  <Link
                                    href={`/pelatihan/pelatihan/view-list-peserta/${row.id}`}
                                  >
                                    <a
                                      className="btn btn-link-action bg-blue-secondary text-white mr-2"
                                      data-toggle="tooltip"
                                      data-placement="bottom"
                                      title="User"
                                    >
                                      <i className="ri-user-3-fill p-0 text-white"></i>
                                    </a>
                                  </Link>
                                )}
                                {row.status_pelatihan === "selesai" && (
                                  <Link
                                    href={`/pelatihan/pelatihan/upload-evidence/${row.id}`}
                                  >
                                    <a
                                      className="btn btn-link-action bg-blue-secondary text-white mr-2"
                                      data-toggle="tooltip"
                                      data-placement="bottom"
                                      title="Upload Evidence"
                                    >
                                      <i className="ri-folder-upload-fill p-0 text-white"></i>
                                    </a>
                                  </Link>
                                )}
                                <Link
                                  href={`/pelatihan/pelatihan/clone-pelatihan/${row.id}`}
                                >
                                  <a
                                    className="btn btn-link-action bg-blue-secondary text-white mr-2"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="Clone"
                                  >
                                    <i className="ri-send-backward p-0 text-white"></i>
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
                {training && training.perPage < training.total && (
                  <div className="table-pagination table-pagination pagination-custom col-12 col-md-6">
                    <Pagination
                      activePage={page}
                      itemsCountPerPage={training.perPage}
                      totalItemsCount={training.total}
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
                {training && training.total > 5 && (
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
                          Total Data {training.total}
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
              onChange={(e) => {
                setAcademy({ value: e.value, label: e.label });
                setTheme(null);
              }}
            />
          </div>
          <div className="form-group mb-5">
            <label className="p-0">Tema</label>
            <Select
              options={drowpdownTemabyAkademi.data.data}
              defaultValue={theme}
              value={theme}
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
                onChange={(date) => setDateRegister(date)}
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

      <Modal
        show={showModalRevisi}
        onHide={() => setShowModalRevisi(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Catatan Revisi</Modal.Title>
          <button
            type="button"
            className="close"
            onClick={() => setShowModalRevisi(false)}
          >
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mb-5">
            <label className="p-0">Isi Catatan</label>
            <textarea
              rows="5"
              className="form-control"
              value={note}
              disabled
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-primary-rounded-full"
            type="button"
            onClick={() => setShowModalRevisi(false)}
          >
            Batal
          </button>
        </Modal.Footer>
      </Modal>
    </PageWrapper>
  );
};

export default ListTraining;
