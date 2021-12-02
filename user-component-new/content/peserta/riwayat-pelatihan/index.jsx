import React, { useState, useEffect, Fragment } from "react";
import { Card, Button, Col, Row, Modal } from "react-bootstrap";
import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";
import IconFilter from "../../../../components/assets/icon/Filter";
import IconArrow from "../../../../components/assets/icon/Arrow";
import Select from "react-select";
import CardPeserta from "./card";
import Pagination from "react-js-pagination";
import style from "./style.module.css";
import { useSelector } from "react-redux";

import {
  getAllRiwayatPelatihanPeserta,
  setValuePeserta,
  setValuePage,
  searchKeyword,
  setPelatihanBerjalanValue,
  setPelatihanSelesaiValue,
  resetFilter,
} from "../../../../redux/actions/pelatihan/riwayat-pelatihan.actions";

import { useDispatch } from "react-redux";

export default function RiwayatPelatihan({ session }) {
  const dispatch = useDispatch();
  let refSelect = null;
  const [showModal, setShowModal] = useState(false);
  // const dataRiwayatPelatihan = useSelector(
  //   (state) => state.getAllRiwayatPelatihanPeserta
  // );

  const dataRiwayatPelatihan = {
    listPelatihan: {
      perPage: 5,
      total: 2,
      totalFiltered: 2,
      list: [
        {
          id: 211,
          id_pendaftaran: 30340,
          gambar:
            "/thumbnail/d81a54b8-e30e-4079-bb3d-300f5b7b6e6b-December.png",
          akademi: "Vocational School Graduate Academy",
          tema: "Junior Network Administrator",
          tema_id: 68,
          akademi_id: 55,
          alamat: "Jalan Industri 3 Nomor 5",
          name: "Junior Network Administrator",
          kuota_peserta: 900,
          silabus: "/silabus/bf6195eb-c66c-4d96-982d-b1b6e3559c11-December.pdf",
          metode_pelatihan: "Online",
          gambar_mitra:
            "/partnership/images/profile-images/fcf56081-a6dc-471d-8184-615c46b8654c.png",
          mitra: "Progate",
          pendaftaran_mulai: "2021-12-02T16:00:00Z",
          pendaftaran_selesai: "2021-12-03T14:30:00Z",
          pelatihan_mulai: "2021-12-04T14:30:00Z",
          pelatihan_selesai: "2021-12-05T15:00:00Z",
          deskripsi:
            "<p>Junior Network Administrator merupakan salah satu skema pelatihan dalam Pelatihan Intensif dan Sertifikasi (Daring) yang berbasis Standar Kompetensi Kerja Nasional Indonesia (SKKNI) dengan skema Network Administrator. Peserta pelatihan Junior Network Administrator akan mampu mengkonfigurasi perangkat jaringan dan mengelola jaringan komputer sesuai kebutuhan dunia kerja. Di akhir pelatihan peserta akan mengikuti uji kompetensi dan sertifikasi Junior Network Administrator, bagi yang dinyatakan kompeten akan mendapatkan Sertifikat Kompetensi Junior Network Administrator dari BNSP.</p><p>Pelatihan akan dilaksanakan secara daring (online) kurang lebih 6 (enam) minggu dengan pengantar live session dalam Bahasa Indonesia.</p><p>Peserta akan mendapatkan fasilitas secara gratis, diantaranya:</p><p>1. Materi pelatihan</p><p>2. Penggantian pulsa/biaya komunikasi</p><p>3. Sertifikat Keikutsertaan (Completion) dari Kementerian Kominfo bagi peserta yang menyelesaikan pelatihan hingga akhir</p><p>4. Kesempatan untuk mengikuti Uji Kompetensi (Sertifikasi) bagi peserta yang menyelesaikan pelatihan hingga akhir dan Sertifikat Kompetensi bagi yang dinyatakan Kompeten</p><p>5. Kesempatan untuk mengikuti program pasca pelatihan (pelatihan pengembangan soft skills)</p>",
          sertifikasi: "1",
          lpj_peserta: "1",
          status: "tidak lulus tes substansi",
          tes_subtansi: true,
          trivia: false,
          survei: false,
          lpj: false,
          midtest: false,
          file_path: "https://dts-beasiswa-dev.s3-ap-southeast-1.amazonaws.com",
          level_pelatihan: "",
        }
      ],
    },
  };

  const [status, setStatus] = useState({ value: "0", label: "Semua" });
  const [selected, setSelected] = useState(0);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleFilter = () => {
    if (status.value == "0") {
      dispatch(resetFilter());
    } else if (status.value == "1") {
      dispatch(setPelatihanBerjalanValue("1"));
    } else {
      dispatch(setPelatihanSelesaiValue("1"));
    }
    setShowModal(false);
  };

  const options = [
    { value: "0", label: "Semua" },
    { value: "1", label: "Pelatihan Sedang Berjalan" },
    { value: "2", label: "Pelatihan Selesai" },
  ];

  const [filter, setFilter] = useState([
    { name: "semua", value: "all" },
    { name: "seleksi", value: "seleksi" },
    { name: "pelatihan", value: "pelatihan" },
    { name: "selesai", value: "selesai" },
  ]);

  useEffect(() => {
    dispatch(getAllRiwayatPelatihanPeserta(session.token));
  }, [
    dispatch,
    session.token,
    dataRiwayatPelatihan.keyword,
    dataRiwayatPelatihan.page,
    dataRiwayatPelatihan.peserta,
    dataRiwayatPelatihan.limit,
    dataRiwayatPelatihan.selesai,
    dataRiwayatPelatihan.sedang_berjalan,
  ]);

  const handleSearchEnter = (e) => {
    if (e.code == "Enter") {
      dispatch(searchKeyword(search));
    }
  };

  const [search, setSearch] = useState("");

  return (
    <>
      <PesertaWrapper>
        <Col lg={12} className="px-0">
          <Card className="card-custom gutter-b">
            <Card.Body>
              <Row>
                <Col lg={8}>
                  <div className="position-relative overflow-hidden ">
                    <i className="ri-search-line left-center-absolute ml-2"></i>
                    <input
                      type="search"
                      className="form-control pl-10 bg-neutral rounded-full"
                      placeholder="Cari..."
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyDown={(e) => {
                        handleSearchEnter(e);
                      }}
                    />
                  </div>
                </Col>
                <Col lg={4} className="w-100">
                  <button
                    className="btn border d-flex align-items-center justify-content-between w-100 mt-5 mt-lg-0 rounded-full"
                    data-toggle="modal"
                    style={{
                      color: "#464646",
                    }}
                    onClick={handleShow}
                  >
                    <div className="d-flex align-items-center">
                      <IconFilter className="mr-3" />
                      {status.label}
                    </div>
                    <IconArrow fill="#ADB5BD" width="10" height="6" />
                  </button>
                </Col>

                <Row className="pt-4 w-100">
                  {filter.map((item, i) => {
                    return (
                      <Col md={2} sm={3} key={i} className="d-flex w-100">
                        <Button
                          // variant={
                          //   selected == i ? "primary" : "outline-secondary"
                          // }
                          onClick={(e) => {
                            setSelected(i);
                            dispatch(setValuePeserta(filter[i].value));
                          }}
                          className={
                            selected == i
                              ? ` btn-primary rounded-full btn-primary mx-4 w-md-100 w-100 my-2 my-md-0 text-capitalize `
                              : ` ${style.background_outline_primary} rounded-full btn-primary mx-4 w-md-100 w-100 my-2 my-md-0 text-capitalize `
                          }
                        >
                          {item.name}
                        </Button>
                      </Col>
                    );
                  })}
                </Row>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        {/* <Administrasi /> */}
        {dataRiwayatPelatihan.listPelatihan.list.map((el, i) => {
          return (
            <Fragment key={i}>
              <CardPeserta status={"test"} data={el} session={session} />
            </Fragment>
          );
        })}
        <div className="d-flex justify-content-center mt-8 mb-40">
          {dataRiwayatPelatihan?.listPelatihan?.total >= 5 && (
            <div className="table-pagination my-auto">
              <Pagination
                activePage={dataRiwayatPelatihan?.page}
                itemsCountPerPage={dataRiwayatPelatihan?.listPelatihan?.perPage}
                totalItemsCount={dataRiwayatPelatihan?.listPelatihan?.total}
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
        </div>
      </PesertaWrapper>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Select
            ref={(ref) => (refSelect = ref)}
            placeholder={status?.label || "Semua"}
            // defaultValue={options[0].value}
            name="color"
            onChange={(e) => {
              setStatus(e);
            }}
            value={status}
            options={options}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="rounded-full"
            onClick={handleClose}
          >
            Tutup
          </Button>
          <Button
            variant="primary"
            className="rounded-full"
            onClick={handleFilter}
          >
            Terapkan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
