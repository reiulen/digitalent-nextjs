import React, { useState } from "react";
import { Card, Button, Col, Row, Modal } from "react-bootstrap";
import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";
import IconFilter from "../../../../components/assets/icon/Filter";
import IconArrow from "../../../../components/assets/icon/Arrow";
import IconClose from "../../../../components/assets/icon/Close";
import Select from "react-select";
import CardPeserta from "./card";
import Administrasi from "./administrasi";
import style from "./style.module.css";
import Image from "next/image";

export default function RiwayatPelatihan() {
  let refSelect = null;
  const [showModal, setShowModal] = useState(false);

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

  return (
    <>
      <PesertaWrapper>
        <Card className="p-6">
          <Col lg={12}>
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
                  <Col>
                    <button
                      className=" btn border d-flex align-items-center justify-content-between border-2 border-primary w-100"
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

                    <Modal show={showModal} onHide={handleClose} centered>
                      <Modal.Header>
                        <Modal.Title>Filter</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Select
                          ref={ref => (refSelect = ref)}
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
                          onChange={e => {
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
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Card>
        <Card>
          {/* <Administrasi /> */}
          <CardPeserta />
        </Card>
      </PesertaWrapper>
    </>
  );
}
