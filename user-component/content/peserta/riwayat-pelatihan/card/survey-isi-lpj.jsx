import React, { Fragment, useState } from "react";
import { Card, Col, Row, Badge, Button } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import style from "../style.module.css";

export default function IsiLpj({ props }) {
  const name = data?.name || "Apaa aja";
  const dateFrom =
    moment(data?.pendaftaran_mulai).format("LL") || "10 oktober blabla";
  const dateTo =
    moment(data?.pendaftaran_selesai).format("LL") || "10 oktober blabla";
  const gambarMitra = data?.gambarMitra;
  const alamat = data?.alamat || "alamat ini pokoknya";
  return (
    <Card className="position-relative">
      <Card.Body
        onClick={() => {
          console.log("card body");
        }}
      >
        <Row>
          <Col md={3}>
            <img
              className="rounded-xl img-fluid d-block w-100 "
              src="/assets/media/bg-admin-1.png"
              alt="test1"
              style={{ height: "200px" }}
            />
          </Col>
          <Col md={9}>
            <Row className="h-100">
              <Col
                lg={2}
                className="d-flex justify-content-center align-items-center my-10 my-lg-0 order-2 order-md-1"
              >
                <img
                  src="/assets/media/mitra-icon/bukalapak-1.svg"
                  width={58}
                  height={58}
                  alt="test2"
                  style={{ borderRadius: "50%" }}
                />
              </Col>
              <Col
                md={7}
                className="my-auto order-3 order-md-2 row"
                // style={{ marginLeft: "-10px" }}
              >
                <h4 className="font-weight-bolder my-0 p-0 col-12 order-2 order-lg-1">
                  {data.name}
                </h4>
                <div
                  className="d-flex align-items-center justify-content-lg-start justify-content-center order-1 order-lg-2"
                  style={{ color: "#203E80" }}
                >
                  <div className="font-weight-bolder">Bukalapak</div>
                  <div className="text-muted pl-2 justify-content-center">
                    &bull; Vocational School Graduate
                  </div>
                </div>
              </Col>
              <Col
                md={3}
                // className="d-flex justify-content-end order-1 order-md-3"
                className="order-1 order-md-3 d-flex justify-content-end"
              >
                <p
                  style={{ borderRadius: "50px" }}
                  className="label label-inline label-light-primary font-weight-bolder p-0 px-4"
                >
                  Isi Survey
                </p>
              </Col>
              <Col md={12} className="my-auto order-4">
                <div className="d-flex align-items-center align-middle ">
                  <i className="ri-time-line"></i>
                  <span className={` pl-2`}>
                    Pelatihan : {dateFrom} - {dateTo}
                    {/* Pelatihan : ini isi survey */}
                  </span>
                </div>{" "}
              </Col>
              <Col md={12} className="my-auto order-5 pb-40 pb-md-30 pb-lg-20">
                <div className="d-flex align-items-center align-middle ">
                  <i className="ri-map-pin-line"></i>
                  <span className={` pl-2`}>Lokasi :{alamat}</span>
                </div>{" "}
              </Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
      <div
        className="position-absolute w-100 d-lg-flex pb-10 pb-md-0 pb-lg-10"
        style={{ bottom: 0 }}
      >
        <Col lg={3} />
        <Col className="d-flex justify-content-center ">
          <Button
            className={`btn-rounded-full font-weight-bold btn-block justify-content-center mt-5 `}
            style={{ height: "40px", fontSize: "14px" }}
            onClick={() => {
              console.log("ini click button 2 ");
            }}
          >
            <i className="ri-file-text-line mr-2"></i>
            Isi LPJ
          </Button>
        </Col>
      </div>
    </Card>
  );
}
