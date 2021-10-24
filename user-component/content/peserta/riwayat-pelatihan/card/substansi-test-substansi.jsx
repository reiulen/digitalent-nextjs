import React, { Fragment, useState } from "react";
import { Card, Col, Row, Badge, Button } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import style from "../style.module.css";
import { useRouter } from "next/router";
export default function SubstansiMenungguJadwal() {
  async function clickHandle(param) {
    if (param == 1) {
      console.log("atas");
    } else {
      console.log("bawah");
    }
  }

  return (
    <div>
      <Col lg={12} className="order-1 px-0">
        <Card className="card-custom card-stretch gutter-b p-0">
          <Card.Body
            className="p-0"
            variant="white"
            onClick={(e) => {
              e.preventDefault();
              clickHandle(1);
            }}
          >
            <Row className="p-12 m-0">
              <Col md={3} className="p-0">
                <Image
                  layout="fill"
                  src="/assets/media/bg-admin-1.png"
                  objectFit="cover"
                  className={`rounded-xl `}
                  alt="pictures1"
                />
              </Col>
              <Col md={9} className="px-10">
                <Row className="d-flex ">
                  <Col lg={2} className="p-0 d-flex justify-content-center">
                    <Image
                      src="/assets/media/mitra-icon/bukalapak-1.svg"
                      width={64}
                      height={64}
                      className={`${style.card_style_administrasi}`}
                      objectFit="cover"
                      alt="logi mitra"
                    />
                  </Col>
                  <Col lg={8} className="d-flex align-items-start p-0">
                    <div className="">
                      <h4 className="font-weight-bolder my-0">
                        Intermediate Multimedia Designer
                      </h4>
                      <div
                        className="d-flex align-items-center"
                        style={{ color: "#203E80" }}
                      >
                        <div className="font-weight-bolder">Bukalapak</div>
                        <div className="text-muted pl-2">
                          &bull; Vocational School Graduate
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col lg={2} className="p-0 d-flex justify-content-end">
                    <span
                      className="label label-inline label-light-primary px-4 font-weight-bold p-0"
                      style={{ borderRadius: "25px" }}
                    >
                      Test Substansi
                    </span>
                  </Col>
                </Row>
                <Row className="my-10">
                  <Col md={12} className="d-flex align-items-center">
                    <i className="ri-time-line"></i>
                    <span className={`${style.text_info} pl-2`}>
                      Pelatihan : 05 Jul 21 - 21 Jul 21
                    </span>
                  </Col>

                  <Col md={12} className="d-flex align-items-center">
                    <i className="ri-map-pin-line"></i>
                    <span className={`${style.text_info} pl-2`}>
                      Lokasi : Pasaraya Blok M Gedung B Lt. 6, Jakarta Barat,
                      Indonesia
                    </span>
                  </Col>
                </Row>
                <Row className="">
                  <Col md={6}>
                    <Button
                      variant="outline-primary"
                      className="btn-rounded-full ml-auto btn-block d-flex justify-content-center"
                      size="sm"
                      style={{ borderColor: "#007CFF", color: "#007CFF" }}
                    >
                      <i
                        className="ri-download-2-fill mr-2"
                        style={{ color: "#007CFF" }}
                      ></i>
                      Bukti Pendaftaran
                    </Button>
                  </Col>
                  <Col md={6}>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        clickHandle(2);
                      }}
                      type="button"
                      variant="primary"
                      className="btn-rounded-full ml-auto btn-block d-flex justify-content-center"
                      size="sm"
                    >
                      Test Substansi
                      <i className="ri-arrow-right-s-line ml-2"></i>
                    </a>
                  </Col>
                </Row>
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
              <Col lg={12} style={{ height: "65px" }} className="order-6"></Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
}
