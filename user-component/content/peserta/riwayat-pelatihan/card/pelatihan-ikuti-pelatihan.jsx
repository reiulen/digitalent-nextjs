import React, { Fragment, useState } from "react";
import { Card, Col, Row, Badge, Button } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import style from "../style.module.css";

export default function IkutiPelatihan() {
  return (
    <Card>
      <Link
        passHref
        href="/peserta/administrasi?modul=administrasi&status=seleksi-administrasi"
      >
        <Card.Body>
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
                    Intermediate Multimedia Designer
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
                    className="label label-inline label-light-primary font-weight-bolder p-0 px-4"
                    style={{ borderRadius: "50px" }}
                  >
                    Ikuti Pelatihan
                  </p>
                </Col>
                <Col md={12} className="my-auto order-4">
                  <div className="d-flex align-items-center align-middle ">
                    <i className="ri-time-line"></i>
                    <span className={` pl-2`}>
                      Pelatihan : 05 Jul 21 - 21 Jul 21
                    </span>
                  </div>{" "}
                </Col>
                <Col md={12} className="my-auto order-5">
                  <div className="d-flex align-items-center align-middle ">
                    <i className="ri-map-pin-line"></i>
                    <span className={` pl-2`}>
                      Lokasi : Pasaraya Blok M Gedung B Lt. 6, Jakarta Barat,
                      Indonesia{" "}
                    </span>
                  </div>{" "}
                </Col>
                <Col md={12} className="d-flex justify-content-center order-6">
                  <Button
                    className={`rounded-full font-weight-bold btn-block justify-content-center mt-5 ${style.background_outline_primary}`}
                    style={{
                      height: "40px",
                      fontSize: "14px",
                      fontFamily: "poppins",
                    }}
                  >
                    <i
                      className="ri-download-2-fill mr-2"
                      style={{ color: "#007cff" }}
                    ></i>
                    Bukti Pendaftaran
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Link>
    </Card>
  );
}
