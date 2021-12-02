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
import Image from "next/image";
import LoadingTable from '../../../../components/LoadingTable'

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
  const dataRiwayatPelatihan = useSelector(
    (state) => state.getAllRiwayatPelatihanPeserta
  );

  const [status, setStatus] = useState(null);
  const [selected, setSelected] = useState(0);

  const handleClose = () => {setShowModal(false); setStatus(null)};
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
                    <div className={`d-flex align-items-center ${status ? "" : "text-muted"}`}>
                      <IconFilter className="mr-3" />
                      {status ? status?.label : "Pilih Filter"}
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
        {dataRiwayatPelatihan.loading && <div className="mb-2"><LoadingTable /></div>}
        {dataRiwayatPelatihan.listPelatihan.list.length > 0 ? dataRiwayatPelatihan.listPelatihan.list.map((el, i) => {
          return (
            <Fragment key={i}>
              <CardPeserta status={"test"} data={el} session={session} />
            </Fragment>
          );
        }) : (
          <div className="row mx-auto bg-white rounded">
            <div className="col col-12 d-flex flex-column justify-content-center">
              <Image
                src={`/assets/media/gambar-belum-tersedia-page.svg`}
                width={525}
                height={350}
                alt="Tidak Tersedia"
              />
              <h1
                className="font-weight-bolder mt-15 text-center fw-600 mb-10"
                style={{ fontFamily: "Poppins", fontSize: "24px" }}
              >
                Pencarian tidak ditemukan
              </h1>
            </div>
          </div>
        )}
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
            placeholder={"Pilih Filter...."}
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
