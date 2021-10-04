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
import CardPage from "../../../CardPage";

import { useDispatch, useSelector } from "react-redux";

const ListTraining = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  let { page = 1, success } = router.query;
  page = Number(page);

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(null);
  const [penyelenggara, setPenyelenggara] = useState(null);
  const [academy, setAcademy] = useState(null);
  const [theme, setTheme] = useState(null);
  const [statusSubstansi, setStatusSubstansi] = useState(null);
  const [statusPelatihan, setStatusPelatihan] = useState(null);
  const [dateRegister, setDateRegister] = useState(null);
  const [dateStart, setDateStart] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showModalRevisi, setShowModalRevisi] = useState(false);
  const [publishValue, setPublishValue] = useState(null);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

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

  const handleFilter = () => {
    let link = `${router.pathname}?page=${1}`;
    if (penyelenggara)
      link = link.concat(`&penyelenggara=${penyelenggara.value}`);
    if (academy) link = link.concat(`&akademi=${academy.value}`);
    if (theme) link = link.concat(`&tema=${theme.value}`);
    if (statusSubstansi)
      link = link.concat(`&status_substansi=${statusSubstansi.value}`);
    if (statusPelatihan)
      link = link.concat(`&status_pelatihan=${statusPelatihan.value}`);
    if (dateRegister)
      link = link.concat(`&tanggal_pendaftaran=${dateRegister}`);
    if (dateStart) link = link.concat(`&tanggal_pelaksanaan=${dateStart}`);
    router.push(link);
    setShowModal(false);
  };

  const handleReset = () => {
    setPenyelenggara(null);
    setAcademy(null);
    setTheme(null);
    setStatusSubstansi(null);
    setStatusPelatihan(null);
    setDateRegister(null);
    setDateStart(null);
    router.replace("/pelatihan/pelatihan", undefined, { shallow: true });
    setShowModal(false);
  };

  const handleLimit = (val) => {
    setLimit(val);
    router.push(`${router.pathname}?page=1&limit=${val}`);
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

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  const handleModalRevisi = (id) => {
    setShowModalRevisi(true);
  };

  return (
    <PageWrapper>
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

      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="row">
          <CardPage
            background="bg-primary"
            icon="new/add-user.svg"
            color="#FFFFFF"
            value={0}
            titleValue=""
            title="Selesai"
            publishedVal="selesai"
            routePublish={() => handlePublish("selesai")}
          />
          <CardPage
            background="bg-secondary"
            icon="new/done-circle.svg"
            color="#FFFFFF"
            value={0}
            titleValue=""
            title="Disetujui"
            publishedVal="disetujui"
            routePublish={() => handlePublish("disetujui")}
          />
          <CardPage
            background="bg-success"
            icon="new/open-book.svg"
            color="#FFFFFF"
            value={0}
            titleValue=""
            title="Revisi"
            publishedVal="revisi"
            routePublish={() => handlePublish("revisi")}
          />
          <CardPage
            background="bg-warning"
            icon="new/mail-white.svg"
            color="#FFFFFF"
            value={0}
            titleValue=""
            title="Menunggu Review"
            publishedVal="menunggu-review"
            routePublish={() => handlePublish("menunggu-review")}
          />
          <CardPage
            background="bg-extras"
            icon="new/block-white.svg"
            color="#FFFFFF"
            value={0}
            titleValue=""
            title="Berjalan"
            publishedVal="berjalan"
            routePublish={() => handlePublish("berjalan")}
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
              <Link href="/pelatihan/pelatihan/tambah-pelatihan">
                <a className="btn btn-primary-rounded-full px-6 font-weight-bolder px-5 py-3 mt-2">
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

                <div className="col-lg-4 col-xl-4 justify-content-end d-flex">
                  <button
                    className="btn border d-flex align-items-center justify-content-between mt-1"
                    style={{
                      minWidth: "280px",
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
                    className="btn w-100 btn-rounded-full bg-blue-secondary text-white mt-2"
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
                {/* <LoadingTable loading={loading} /> */}

                <table className="table table-separate table-head-custom table-checkable">
                  <thead style={{ background: "#F3F6F9" }}>
                    <tr>
                      <th className="text-center ">No</th>
                      <th>ID Pelatihan</th>
                      <th>Pelatihan</th>
                      <th>Jadwal</th>
                      <th>Status Publish</th>
                      <th>Status Substansi</th>
                      <th>Status Pelatihan</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">1</td>
                      <td>CC001</td>
                      <td>
                        <p className="font-weight-bolder my-0">
                          Android Developer
                        </p>
                        <p className="my-0">IBM</p>
                        <p className="my-0">DKI</p>
                      </td>
                      <td>
                        <p className="my-0">21 Aug 2021 - 29 Sep 2021 </p>
                        <p className="my-0">21 Aug 2021 - 29 Sep 2021 </p>
                      </td>
                      <td>
                        <span className="label label-inline label-light-success font-weight-bold">
                          Publish
                        </span>
                      </td>
                      <td>
                        <span className="label label-inline label-light-success font-weight-bold">
                          Disetujui
                        </span>
                      </td>
                      <td>
                        <span className="label label-inline label-light-success font-weight-bold">
                          Publish
                        </span>
                      </td>
                      <td>
                        <div className="d-flex">
                          <Link
                            href={`/pelatihan/pelatihan/edit-pelatihan/${1}`}
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
                          <Link
                            href={`/pelatihan/pelatihan/view-pelatihan/${1}`}
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
                          <button
                            className="btn btn-link-action bg-blue-secondary text-white mr-2"
                            onClick={() => handleModalRevisi(1)}
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Revisi"
                          >
                            <i className="ri-draft-line p-0 text-white"></i>
                          </button>
                          <Link
                            href={`/pelatihan/pelatihan/tambah-form-lpj/${1}`}
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
                          <Link
                            href={`/pelatihan/rekap-pendaftaran/detail-rekap-pendaftaran/${1}`}
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
                          <Link href={`/pelatihan/pelatihan/upload-evidence`}>
                            <a
                              className="btn btn-link-action bg-blue-secondary text-white mr-2"
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="Upload Evidence"
                            >
                              <i className="ri-folder-upload-fill p-0 text-white"></i>
                            </a>
                          </Link>
                          <Link href={`/pelatihan/pelatihan/${1}`}>
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
                            onClick={() => handleDelete(1)}
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Hapus"
                          >
                            <i className="ri-delete-bin-fill p-0 text-white"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="row">
                <div className="table-pagination table-pagination pagination-custom col-12 col-md-6">
                  <Pagination
                    activePage={1}
                    itemsCountPerPage={5}
                    totalItemsCount={10}
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
                        Total Data 6
                      </p>
                    </div>
                  </div>
                </div>
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
              options={options}
              defaultValue={penyelenggara}
              onChange={(e) =>
                setPenyelenggara({ value: e.value, label: e.label })
              }
            />
          </div>
          <div className="form-group mb-5">
            <label className="p-0">Akademi</label>
            <Select
              options={options}
              defaultValue={academy}
              onChange={(e) => setAcademy({ value: e.value, label: e.label })}
            />
          </div>
          <div className="form-group mb-5">
            <label className="p-0">Tema</label>
            <Select
              options={options}
              defaultValue={theme}
              onChange={(e) => setTheme({ value: e.value, label: e.label })}
            />
          </div>
          <div className="form-group mb-5">
            <label className="p-0">Status Substansi</label>
            <Select
              options={options}
              defaultValue={statusSubstansi}
              onChange={(e) =>
                setStatusSubstansi({ value: e.value, label: e.label })
              }
            />
          </div>
          <div className="form-group mb-5">
            <label className="p-0">Status Pelatihan</label>
            <Select
              options={options}
              defaultValue={statusPelatihan}
              onChange={(e) =>
                setStatusPelatihan({ value: e.value, label: e.label })
              }
            />
          </div>
          <div className="row">
            <div className="form-group mb-5 col-md-6">
              <label className="p-0">Tanggal Pendaftaran</label>
              <input
                type="date"
                name=""
                id=""
                className="form-control"
                value={dateRegister}
                onChange={(e) => setDateRegister(e.target.value)}
              />
            </div>
            <div className="form-group mb-5 col-md-6">
              <label className="p-0">Tanggal Pelaksanaan</label>
              <input
                type="date"
                name=""
                id=""
                className="form-control"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
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
            <textarea rows="5" className="form-control" disabled></textarea>
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
