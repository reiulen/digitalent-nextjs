import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import PageWrapper from "../../../wrapper/page.wrapper";
import LoadingTable from "../../../LoadingTable";
import {
  getDetailReportTraining,
  uploadSertifikat,
} from "../../../../redux/actions/pelatihan/report-training.actions";

const DetailReport = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pelatian_id = parseInt(router.query.id);

  const { data: detailReportTraining } = useSelector(
    (state) => state.detailReportTraining
  );

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [showModalSertifikasi, setShowModalSertifikasi] = useState(false);
  const [publishValue, setPublishValue] = useState(null);
  const [sertifikasi, setSertifikasi] = useState(null);
  const [statusSubstansi, setStatusSubstansi] = useState(null);
  const [statusAdmin, setStatusAdmin] = useState(null);
  const [statusPeserta, setStatusPeserta] = useState(null);
  const [id, setId] = useState(null);
  const [isLulus, setIsLulus] = useState(null);

  const handlePagination = (pageNumber) => {
    let link = `${router.pathname}?page=${pageNumber}`;
    if (limit) link = link.concat(`&limit=${limit}`);
    if (search) link = link.concat(`&keyword=${search}`);
    router.push(link);
  };
  const [sertifkatBase, setSertifikatBase] = useState("");
  const [sertifikatName, setSertifikatName] = useState("");

  const fileSertifikatHandler = (e) => {
    const type = ["application/pdf", "image/jpeg"];
    if (type.includes(e.target.files[0].type)) {
      if (e.target.files[0].size > 5000000) {
        e.target.value = null;
        Swal.fire("Oops !", "Data yang bisa dimasukkan hanya 5 MB.", "error");
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function (e) {
          setSertifikatBase(reader.result);
        };

        setSertifikatName(e.target.files[0].name);
      }
    } else {
      e.target.value = null;
      Swal.fire(
        "Oops !",
        "Data yang bisa dimasukkan hanya berupa file pdf/jpg.",
        "error"
      );
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
    router.push(`${router.pathname}?page=1&limit=${val}`);
  };

  const onNewReset = () => {
    router.replace("/subvit/substansi", undefined, { shallow: true });
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
      }
    });
  };

  const handlePublish = (val) => {
    setPublishValue(val);
    let link = `${router.pathname}?page=${1}&card=${val}`;
    if (search) link = link.concat(`&keyword=${search}`);
    router.push(link);
  };

  const handleExportReport = async () => {
    let link = `http://dts-subvit-dev.majapahit.id/api/subtance-question-banks/report/export/${id}`;
    if (search) link = link.concat(`&keyword=${search}`);
    if (status) link = link.concat(`&status=${status}`);
    if (nilai) link = link.concat(`&nilai=${nilai}`);
    if (pelatihan) link = link.concat(`&pelatihan=${pelatihan}`);

    await axios.get(link).then((res) => {
      window.location.href = res.data.data;
    });
  };

  const optionStatusAdministrasi = [
    { label: "verified", value: "Verified" },
    { label: "unverified", value: "Unverified" },
    { label: "incomplete", value: "Incomplete" },
  ];

  const optionStatusPeserta = [
    { label: "Menunggu", value: "Menunggu" },
    { label: "Tidak Lulus Administrasi", value: "Tidak Lulus Administrasi" },
    { label: "Tes Substansi", value: "Tes Substansi" },
    { label: "Tidak Lulus Tes Substansi", value: "Tidak Lulus Tes Substansi" },
    { label: "Lulus Tes Substansi", value: "Lulus Tes Substansi" },
    { label: "Diterima", value: "Diterima" },
    { label: "Ditolak", value: "Ditolak" },
    { label: "Pelatihan", value: "Pelatihan" },
    { label: "Lulus Pelatihan", value: "Lulus Pelatihan" },
    { label: "Tidak Lulus Pelatihan", value: "Tidak Lulus Pelatihan" },
  ];

  const optionSertifikasi = [
    { label: "Ada", value: "1" },
    { label: "Tidak Ada", value: "" },
  ];

  const optionStatusSubstansi = [
    { label: "Lulus", value: "Lulus" },
    { label: "Tidak Lulus", value: "Tidak Lulus" },
    { label: "Belum Mengerjakan", value: "Belum Mengerjakan" },
  ];

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  const handleModalRevisi = (id) => {
    setShowModalSertifikasi(true);
  };

  const handleSecondsToTime = (secs) => {
    let hours = Math.floor(secs / (60 * 60));
    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);
    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);
    return hours + ":" + minutes + ":" + seconds;
  };

  const listPeserta =
    detailReportTraining.list.length > 0 ? (
      detailReportTraining.list.map((item, index) => {
        return (
          <tr key={index}>
            <td className="text-center">{index + 1}</td>
            <td className="align-middle">
              <p className="font-weight-bolder my-0">{item.name}</p>
              <p className="my-0">{item.nomor_registrasi}</p>
              <p className="my-0">{item.nik}</p>
            </td>
            <td
              className="align-middle"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "12rem",
              }}
            >
              {item.alamat}
            </td>
            <td className="align-middle">
              <p
                className={`my-0 text-${
                  item.subtansi_status.toLowerCase() !== "lulus tes"
                    ? "danger"
                    : "success"
                }`}
              >
                {item.subtansi_status}
              </p>
              <p className="my-0">{Math.round(item.nilai)}</p>
              <p className="my-0">{handleSecondsToTime(item.waktu)}</p>
            </td>
            <td className="align-middle">
              <span
                className={`label label-inline label-light-${
                  item.administrasi.toLowerCase() !== "verified"
                    ? "danger"
                    : "success"
                } font-weight-bold`}
              >
                {item.administrasi}
              </span>
            </td>
            <td className="align-middle">
              <span
                className={`label label-inline label-light-${
                  item.status.toLowerCase() === "lulus tes substansi" ||
                  item.status.toLowerCase() === "diterima" ||
                  item.status.toLowerCase() === "pelatihan" ||
                  item.status.toLowerCase() === "lulus pelatihan"
                    ? "success"
                    : "danger"
                } font-weight-bold`}
              >
                {item.status}
              </span>
            </td>
            <td className="align-middle">
              <div className="d-flex align-items-center">
                {item.sertifikat === "" ? "Tidak Ada" : "Ada"}
              </div>
            </td>
            {item.sertifikat === "" && (
              <td className="align-middle">
                <button
                  className="btn btn-link-action bg-blue-primary text-white"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Tambah Sertifikasi"
                  onClick={() => {
                    setShowModalSertifikasi(true);
                    setId(item.id);
                  }}
                  type="button"
                >
                  <i className="ri-add-fill text-white p-0"></i>
                </button>
              </td>
            )}
          </tr>
        );
      })
    ) : (
      <td className="align-middle text-center" colSpan={8}>
        Data Kosong
      </td>
    );

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0 mt-3">
            <h1
              className="card-title text-dark mt-2"
              style={{ fontSize: "24px" }}
            >
              Detail Report Pelatihan - {localStorage.getItem("slug")} -{" "}
              {localStorage.getItem("judul")}
            </h1>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-6 col-xl-6">
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
                      onClick={() => {
                        dispatch(
                          getDetailReportTraining(
                            token,
                            pelatian_id,
                            page,
                            limit,
                            search,
                            statusAdmin?.label,
                            statusSubstansi?.label,
                            sertifikasi?.value,
                            statusPeserta?.label
                          )
                        );
                      }}
                    >
                      Cari
                    </button>
                  </div>
                </div>

                <div className="col-lg-4 col-xl-4 justify-content-end d-flex">
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

                <div className="col-md-2">
                  <Link
                    href="dts-pelatihan:8080/storage/excel/a08a0e15-8c2e-4eb8-a3d0-4cae45d24b1c-November.xlsx"
                    passHref
                  >
                    <a
                      target="_blank"
                      className="btn w-100 btn-rounded-full bg-blue-secondary text-white mt-2 d-flex justify-content-center"
                    >
                      {" "}
                      Export
                      <i className="ri-arrow-down-s-line ml-3 mt-1 text-white"></i>
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="table-page mt-5">
              <div className="table-responsive">
                {/* <LoadingTable loading={loading} /> */}

                <table className="table table-separate table-head-custom table-checkable">
                  <thead style={{ background: "#F3F6F9" }}>
                    <tr>
                      <th className="text-center ">No</th>
                      <th>Peserta</th>
                      <th>Alamat</th>
                      <th>Test Substansi</th>
                      <th>Administrasi</th>
                      <th>Status Peserta</th>
                      <th>Sertifikasi</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>{listPeserta}</tbody>
                </table>
              </div>
              <div className="row">
                {detailReportTraining.total > 5 && (
                  <>
                    <div className="table-pagination table-pagination pagination-custom col-12 col-md-6">
                      <Pagination
                        activePage={page}
                        itemsCountPerPage={detailReportTraining.perPage}
                        totalItemsCount={detailReportTraining.total}
                        pageRangeDisplayed={3}
                        onChange={(e) => {
                          setPage(e);
                          dispatch(
                            getDetailReportTraining(
                              token,
                              pelatian_id,
                              e,
                              limit,
                              search,
                              statusAdmin.label,
                              statusSubstansi.label,
                              sertifikasi.value,
                              statusPeserta.label
                            )
                          );
                        }}
                        nextPageText={">"}
                        prevPageText={"<"}
                        firstPageText={"<<"}
                        lastPageText={">>"}
                        itemClass="page-item"
                        linkClass="page-link"
                      />
                    </div>
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
                            onChange={(e) => {
                              setLimit(e.target.value);
                              dispatch(
                                getDetailReportTraining(
                                  token,
                                  pelatian_id,
                                  page,
                                  e.target.value,
                                  search,
                                  statusAdmin.label,
                                  statusSubstansi.label,
                                  sertifikasi.value,
                                  statusPeserta.label
                                )
                              );
                            }}
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
                            Total Data {detailReportTraining.total}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
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
            <label className="p-0">Status Administrasi</label>
            <Select
              options={optionStatusAdministrasi}
              onChange={(e) =>
                setStatusAdmin({ value: e.value, label: e.label })
              }
              value={statusAdmin}
            />
          </div>
          <div className="form-group mb-5">
            <label className="p-0">Status Test Substansi</label>
            <Select
              options={optionStatusSubstansi}
              onChange={(e) =>
                setStatusSubstansi({ value: e.value, label: e.label })
              }
              value={statusSubstansi}
            />
          </div>
          <div className="form-group mb-5">
            <label className="p-0">Status Peserta</label>
            <Select
              options={optionStatusPeserta}
              onChange={(e) =>
                setStatusPeserta({ value: e.value, label: e.label })
              }
              value={statusPeserta}
            />
          </div>
          <div className="form-group mb-5">
            <label className="p-0">Sertifikasi</label>
            <Select
              options={optionSertifikasi}
              value={sertifikasi}
              onChange={(e) =>
                setSertifikasi({ value: e.value, label: e.label })
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-light-ghost-rounded-full mr-2"
            type="button"
            onClick={() => {
              setStatusAdmin(null);
              setStatusSubstansi(null);
              setSertifikasi(null);
              setStatusPeserta(null);
            }}
          >
            Reset
          </button>
          <button
            className="btn btn-primary-rounded-full"
            type="button"
            onClick={() => {
              dispatch(
                getDetailReportTraining(
                  token,
                  pelatian_id,
                  page,
                  limit,
                  search,
                  statusAdmin?.label,
                  statusSubstansi?.label,
                  sertifikasi?.value,
                  statusPeserta?.label
                )
              );
              setShowModal(false);
            }}
          >
            Terapkan
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showModalSertifikasi}
        onHide={() => setShowModalSertifikasi(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <Modal.Header>
          <Modal.Title>Tambah Sertifikasi</Modal.Title>
          <button
            type="button"
            className="close"
            onClick={() => setShowModalSertifikasi(false)}
          >
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group row mb-4">
            <label className="col-form-label font-weight-bold col-sm-3 pr-0 text-center">
              Status Sertifikasi
            </label>
            <div className="col-sm-9 mt-3">
              <div className="form-check ">
                <input
                  type="radio"
                  name="status"
                  className="form-check-input"
                  value="1"
                  onClick={(e) => {
                    setIsLulus("1");
                  }}
                  required
                />
                <label className="form-check-label">
                  Lulus / Certifed / Kompeten
                </label>
              </div>
              <div className="form-check ">
                <input
                  type="radio"
                  name="status"
                  value="0"
                  className="form-check-input"
                  onClick={(e) => {
                    setIsLulus("0");
                  }}
                  required
                />
                <label className="form-check-label">
                  Tidak Lulus / Not Certifed / Belum Kompeten
                </label>
              </div>
            </div>
          </div>

          <div className="form-group mb-3 px-11">
            <label className="col-form-label font-weight-bold">
              Upload Sertifikasi (Optional)
            </label>
            <div className="d-flex">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  accept="application/pdf, image/jpeg , image/jpg"
                  onChange={fileSertifikatHandler}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  {sertifikatName}
                </label>
              </div>
            </div>
            <small className="text-muted">
              Format File (.pdf/.jpg) & Max size 5 mb
            </small>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-primary-rounded-full"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              const data = {
                id: id,
                Sertifikasi: isLulus,
                file_sertifikat: sertifkatBase,
              };
              dispatch(uploadSertifikat(token, data, router.query.id));
              setShowModalSertifikasi(false);
            }}
          >
            Upload
          </button>
        </Modal.Footer>
      </Modal>
    </PageWrapper>
  );
};

export default DetailReport;
