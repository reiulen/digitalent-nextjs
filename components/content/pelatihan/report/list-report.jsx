import React, { useEffect, useState } from "react";
import moment from 'moment'

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import Pagination from "react-js-pagination";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import Select from "react-select";
import { Modal } from "react-bootstrap";

import PageWrapper from "../../../wrapper/page.wrapper";
import LoadingTable from "../../../LoadingTable";
import { listsReportTraining } from '../../../../redux/actions/pelatihan/report-training.actions'

const ListReport = ({token}) => {
  
    const dispatch = useDispatch();
    const router = useRouter();

  const { data: getDataReportTraining } = useSelector(
    (state) => state.getDataReportTraining
  );
  const { error: dropdownErrorAkademi, data: dataAkademi } = useSelector(
    (state) => state.drowpdownAkademi
  );
  const { error: dropdownErrorTema, data: dataTema } = useSelector(
    (state) => state.drowpdownTema
  );
  const { error: dropdownErrorPenyelenggara, data: dataPenyelenggara } =
    useSelector((state) => state.drowpdownPenyelenggara);
  
  
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [showModalRevisi, setShowModalRevisi] = useState(false);
  const [publishValue, setPublishValue] = useState(null);
  const [page, setPage] = useState(1)
  const [dateRegister, setDateRegister] = useState([null, null]);
  const [dateRegisterStart, dateRegisterEnd] = dateRegister;

  const [datePelaksanaan, setDatePelaksanaan] = useState([null, null]);
  const [datePelaksanaanStart, datePelaksanaanEnd] = datePelaksanaan;
  const [penyelenggara, setPenyelenggara] = useState({label: "", value: ""});
  const [academy, setAcademy] = useState({label: "", value: ""});
  const [theme, setTheme] = useState({label: "", value: ""});

  const optionsAkademi =dataAkademi.data || [] ;
  const optionsTema = dataTema.data || [] ;
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
  
  const listReportTraining = getDataReportTraining.list.length > 0 ? getDataReportTraining.list.map((item, index) => {
    return (
      <tr key={index}>
        <td className="text-center">{index + limit * (page - 1) + 1}</td>
        <td>CC{item.id}</td>
        <td >
          <p className="font-weight-bolder my-0" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '11rem' }}>{item.name}</p>
          <p className="my-0" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '11rem' }}>{item.penyelenggara}</p>
          <p className="my-0" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '11rem' }}>{item.provinsi}</p>
        </td>
        <td>
          <p className="my-0">{moment(item.pendaftaran_mulai).format("DD MMM YYYY")} - {moment(item.pendaftaran_selesai).format("DD MMM YYYY")} </p>
          <p className="my-0">{moment(item.pelatihan_mulai).format("DD MMM YYYY")} - {moment(item.pelatihan_selesai).format("DD MMM YYYY")}</p>
        </td>
        <td>
          <p className="my-0">300 Pendaftar </p>
          <p className="my-0">100 Peserta </p>
        </td>
        <td>
          <span className="label label-inline label-light-success font-weight-bold">
            {item.status_pelatihan}
          </span>
        </td>
        <td>
          <div className="d-flex">
            <Link
              href={`/pelatihan/report-pelatihan/detail-report-pelatihan/${item.id}`}
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
            <Link href={`/pelatihan/pelatihan/view-pelatihan/${1}`}>
              <a
                className="btn btn-link-action bg-blue-secondary text-white mr-2"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Download As Word"
              >
                <i className="ri-file-word-fill text-white p-0"></i>
              </a>
            </Link>
            <Link href={`/pelatihan/pelatihan/view-pelatihan/${1}`}>
              <a
                className="btn btn-link-action bg-blue-secondary text-white mr-2"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Download As PDF"
              >
                <i className="ri-file-ppt-fill text-white p-0"></i>
              </a>
            </Link>
          </div>
        </td>
      </tr>
    );
  }) : <td className="align-middle text-center" colSpan={8}>
  Data Kosong
</td>;




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
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0 mt-3">
            <h1
              className="card-title text-dark mt-2"
              style={{ fontSize: "24px" }}
            >
              List Report Pelatihan
            </h1>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-8 col-xl-8">
                  <div
                    className="position-relative overflow-hidden mt-3"
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
                        dispatch(listsReportTraining(token, page, limit, search, penyelenggara.label, academy.label, theme.label))
                      }}
                    >
                      Cari
                    </button>
                  </div>
                </div>

                <div className="col-lg-4 col-xl-4 justify-content-end d-flex">
                  <button
                    className="btn border d-flex align-items-center justify-content-between mt-1"
                    style={{
                      minWidth: "236px",
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
                <table className="table table-separate table-head-custom table-checkable">
                  <thead style={{ background: "#F3F6F9" }}>
                    <tr>
                      <th className="text-center ">No</th>
                      <th>ID Pelatihan</th>
                      <th>Pelatihan</th>
                      <th>Jadwal</th>
                      <th>Kuota</th>
                      <th>Status Pelatihan</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                  {listReportTraining}
                  </tbody>
                </table>
              </div>
              <div className="row">
                  <div className="table-pagination table-pagination pagination-custom col-12 col-md-6">
                    <Pagination
                      activePage={page}
                      itemsCountPerPage={getDataReportTraining.perPage}
                      totalItemsCount={getDataReportTraining.total}
                      pageRangeDisplayed={3}
                      onChange={(e) => {setPage(e)
                      dispatch(listsReportTraining(token, e, limit, search, penyelenggara.label, academy.label, theme.label));
                      router.push("/report-pelatihan")
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
                            setLimit(e.target.value)
                            dispatch(listsReportTraining(token, page, e.target.value, search, penyelenggara.label, academy.label, theme.label))
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
                          Total Data {getDataReportTraining.total}
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
            <label className="p-0">Status Pelatihan</label>
            <select className="form-control">
              <option>Semua</option>
            </select>
          </div>
          <div className="row">
            <div className="form-group mb-5 col-md-6">
              <label className="p-0">Tanggal Pendaftaran</label>
              
              <DatePicker
                wrapperClassName="datepicker"
                className="form-control"
                name="start_date"
                selectsRange={true}
                onChange={(date) => {setDateRegister(date)
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
            type="reset"
          >
            Reset
          </button>
          <button className="btn btn-primary-rounded-full" type="button" onClick={() => {
             setShowModal(false);
             let register = dateRegister.map(item => {
               return moment(item).format("YYYY/MM/DD")
             })
             let pelaksanaan = datePelaksanaan.map(item => {
              return moment(item).format("YYYY/MM/DD")
            })
            dispatch(listsReportTraining(token, page, limit, search, penyelenggara.label, academy.label, theme.label, register.join(","), pelaksanaan.join(",")))
          }}>
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
            <textarea rows="5" className="form-control"></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-light-ghost-rounded-full mr-2"
            type="reset"
          >
            Reset
          </button>
          <button className="btn btn-primary-rounded-full" type="button">
            Terapkan
          </button>
        </Modal.Footer>
      </Modal>
    </PageWrapper>
  );
};

export default ListReport;
