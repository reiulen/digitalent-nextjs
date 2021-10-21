import React, { Fragment, useState } from "react";
import { Card, Col, Row, Badge, Button } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import style from "./style.module.css";
import { useRouter } from "next/router";
import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";

export default function SeleksiAdministrasi() {
  // console.log(props, "ini props");
  const router = useRouter();
  return (
    <PesertaWrapper>
      <Col lg={12} className="px-0">
        <Card className="card-custom card-stretch gutter-b p-0">
          <Row className="p-10 m-0">
            <Row className="d-flex ">
              <Col lg={8} className="d-flex align-items-start">
                <h1 className="font-weight-bolder my-0">
                  Intermediate Multimedia Designer
                </h1>
                <div className="text-muted "></div>
              </Col>
              <Col lg={4} className="p-0 d-flex justify-content-end">
                <span
                  className="label label-inline label-light-warning font-weight-bold "
                  style={{ borderRadius: "25px" }}
                >
                  Seleksi Administrasi
                </span>
              </Col>
              <Col lg={12} className=" my-5">
                <span
                  className="p-0 font-weight-bolder"
                  style={{ fontSize: "18px", color: "#6C6C6C" }}
                >
                  Vocational School Graduate
                </span>
              </Col>
              <Col lg={12} className="p-0">
                <p style={{ fontSize: "14px" }}>Lokasi Pelatihan</p>
                <p style={{ fontSize: "16px" }}>
                  Pasaraya Blok M Gedung B lt.6, Jakarta Barat, Indonesia
                </p>
              </Col>
              <Col lg={6} className="p-0">
                <p style={{ fontSize: "14px" }}>Jadwal Pelatihan</p>
                <p style={{ fontSize: "16px" }}>12 Juli - 22 Oktober 2021</p>
              </Col>
              <Col lg={6} className="p-0">
                <p style={{ fontSize: "14px" }}>Kuota</p>
                <p style={{ fontSize: "16px" }}>1000 Peserta</p>
              </Col>
            </Row>
            <Col md={12} className="py-10 px-0">
              <Button
                variant="outline-primary"
                className="rounded-full ml-auto btn-block d-flex justify-content-center "
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
          </Row>
          <Card className="">
            <Row className="p-10">
              <Col md={12} style={{ height: "360px" }}>
                <Image
                  layout="fill"
                  src="/assets/media/bg-admin-1.png"
                  objectFit="cover"
                  className={`rounded-xl`}
                  alt="pictures1"
                />
                <Card.ImgOverlay>
                  <Badge bg="secondary text-white text-uppercase">
                    Pelatihan Online
                  </Badge>
                </Card.ImgOverlay>
              </Col>
              <Col lg={2} className="p-0 d-flex justify-content-center">
                <Image
                  src="/assets/media/mitra-icon/bukalapak-1.svg"
                  width={64}
                  height={64}
                  className={`${style.card_style_administrasi}`}
                  objectFit="cover"
                  alt="logi mitra"
                />
                <div className="font-weight-bolder">Bukalapak</div>
              </Col>
            </Row>
          </Card>
        </Card>
      </Col>
      {/* <Administrasi /> */}
    </PesertaWrapper>
  );
}
