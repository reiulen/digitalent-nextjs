import React, { useState, useEffect, Fragment } from "react";
import { Card, Button, Col, Row, Modal } from "react-bootstrap";
import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";
import IconFilter from "../../../../components/assets/icon/Filter";
import IconArrow from "../../../../components/assets/icon/Arrow";
import IconClose from "../../../../components/assets/icon/Close";
import Select from "react-select";
import CardPeserta from "./card";
import Administrasi from "./administrasi";
import style from "./style.module.css";
import { useSelector } from "react-redux";
import {
  getAllRiwayatPelatihanPeserta,
  setValuePeserta,
} from "../../../../redux/actions/pelatihan/riwayat-pelatihan.actions";
import { useDispatch } from "react-redux";

export default function RiwayatPelatihan({ session }) {
  const dispatch = useDispatch();
  let refSelect = null;
  const [showModal, setShowModal] = useState(false);
  const dataRiwayatPelatihan = useSelector(
    (state) => state.getAllRiwayatPelatihanPeserta
  );

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleFilter = () => {
    setShowModal(false);
  };

  const options = [
    { value: "draft", label: "Draft" },
    { value: "not-yet-available", label: "Belum Tersedia" },
    { value: "publish", label: "Publish" },
  ];

  const [selected, setSelected] = useState(0);

  const [filter, setFilter] = useState([
    { name: "semua", value: "all" },
    { name: "test substansi", value: "tes_substansi" },
    { name: "administrasi", value: "all" },
    { name: "pelatihan", value: "pelatihan" },
    { name: "selesai", value: "akhir" },
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
  ]);

  return (
    <>
      <PesertaWrapper>
        <Col lg={12} className="px-0">
          <Card className="card-custom gutter-b">
            <Card.Body>
              <Row>
                <Col lg={8}>
                  <div className="position-relative overflow-hidden">
                    <i className="ri-search-line left-center-absolute ml-2"></i>
                    <input
                      type="text"
                      className="form-control pl-10"
                      placeholder="Cari..."
                      //   onChange={e => setSearch(e.target.value)}
                    />
                    <button
                      className="btn bg-blue-primary text-white right-center-absolute"
                      style={{
                        borderTopLeftRadius: "0",
                        borderBottomLeftRadius: "0",
                      }}
                      //   onClick={e => {
                      //     handleSearch(e);
                      //   }}
                    >
                      Cari
                    </button>
                  </div>
                </Col>
                <Col lg={4} className="w-100">
                  <button
                    className="btn border d-flex align-items-center justify-content-between border-2 border-primary w-100"
                    data-toggle="modal"
                    style={{
                      color: "#464646",
                      minWidth: "230px",
                    }}
                    onClick={handleShow}
                  >
                    <div className="d-flex align-items-center">
                      <IconFilter className="mr-3" />
                      Pilih Filter
                    </div>
                    <IconArrow fill="#ADB5BD" width="10" height="6" />
                  </button>
                </Col>
                <Row className="pt-4 d-flex justify-content-between w-100">
                  {filter.map((item, i) => {
                    return (
                      <Col key={i}>
                        <Button
                          variant={
                            selected == i ? "primary" : "outline-primary"
                          }
                          onClick={(e) => {
                            setSelected(i);
                            dispatch(setValuePeserta(filter[i].value));
                          }}
                          className={`rounded-full mx-5 w-100 text-capitalize`}
                        >
                          {item.name}
                        </Button>
                      </Col>
                    );
                  })}

                  {/* <Button className={`rounded-full mx-5 w-100`}>
                    Test Substansi
                  </Button>
                  <Button className={`rounded-full mx-5 w-100`}>
                    Administrasi
                  </Button>
                  <Button className={`rounded-full mx-5 w-100`}>
                    Pelatihan
                  </Button>
                  <Button className={`rounded-full mx-5 w-100`}>
                    Survey & LPJ
                  </Button>
                  <Button className={`rounded-full mx-5 w-100`}>Selesai</Button> */}
                </Row>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        {/* <Administrasi /> */}
        {dataRiwayatPelatihan.listPelatihan.list.map((el) => {
          return (
            <Fragment>
              <CardPeserta status={"test"} data={el} session={session} />
            </Fragment>
          );
          // img_figure={"/assets/media/mitra-icon/bukalapak-1.svg"}
          // img_mitra={"/assets/media/mitra-icon/bukalapak-1.svg"}
          // mitra_name={"bukalapak"}
          // pelatihan_name={"Intermediate Multimedia Designer"}
          // label={"warning"}
          // location={
          //   "Pasaraya Blok M Gedung B Lt. 6, Jakarta Barat, Indonesia"
          // }
        })}
        {/* <CardPeserta status={"isi lpj"} data={el} session={session} /> */}
        {/* <CardPeserta totalButton={2} status={"tes substansi"} /> */}
        {/* {dataRiwayatPelatihan.listPelatihan.list.map((el) => {
          if (el.survei == true && el.lpj == true) {
            return <CardPeserta status={"isi lpj"} data={el} />;
          } else if (el.survei == true && el.lpj == false) {
            return <CardPeserta data={el} status={"isi survey"} />;
          } else if (el.lpj == true) {
            return <CardPeserta status={"isi lpj"} data={el} />;
          }

          if (el.midtest) {
            return <CardPeserta status={"kerjakan mid test"} data={el} />;
          }
        })} */}
        {/* <CardPeserta totalButton={2} status={"kerjakan mid test"} /> */}
        {/* <CardPeserta totalButton={2} data={el} status={"isi survey"} /> */}

        {/* <CardPeserta totalButton={2} status={"lolos administrasi"} />
        <CardPeserta totalButton={2} status={"menunggu jadwal"} /> */}
        {/* 
        <CardPeserta
              totalButton={2}
              data={el}
              status={"seleksi administrasi"}
            />
        <CardPeserta totalButton={2} status={"seleksi administrasi"} />
        <CardPeserta totalButton={2} status={"lolos substansi"} />
        <CardPeserta totalButton={2} status={"tidak lulus"} />
        <CardPeserta totalButton={2} status={"ikuti pelatihan"} />
        <CardPeserta totalButton={2} status={"kerjakan mid test"} />
        <CardPeserta totalButton={2} status={"kerjakan trivia"} />
        <CardPeserta totalButton={2} status={"lulus pelatihan"} />
         */}
      </PesertaWrapper>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Select
            ref={(ref) => (refSelect = ref)}
            className="basic-single"
            classNamePrefix="select"
            placeholder="Semua"
            // defaultValue={options[0].value}
            isDisabled={false}
            isLoading={false}
            isClearable={false}
            isRtl={false}
            isSearchable={true}
            name="color"
            onChange={(e) => {
              setStatus(e?.value);
            }}
            options={options}
          />{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFilter}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
