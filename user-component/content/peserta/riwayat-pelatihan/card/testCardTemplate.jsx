import React from "react";
import { Col, Row, Card, Button, Container } from "react-bootstrap";
import Link from "next/link";
import style from "../style.module.css";
export default function CardTemplateOriginal(props) {
  console.log(props);
  return (
    <Card>
      <Link
        passHref
        href="/peserta/administrasi?modul=administrasi&status=seleksi-administrasi"
      >
        <Card.Body>
          <Row>
            <Col md={3} className="d-flex justify-content-lg-center">
              <img
                className="rounded-xl img-fluid d-block w-100 "
                src="/assets/media/bg-admin-1.png"
                alt="test1"
                style={{ height: "200px" }}
              />
            </Col>
            <Col
              md={9}
              className="order-3 order-lg-2 d-flex flex-column justify-content-between"
            >
              <div className="d-flex ">
                <img
                  src="/assets/media/mitra-icon/bukalapak-1.svg"
                  width={58}
                  height={58}
                  className={``}
                  alt="test2"
                  style={{ borderRadius: "50%" }}
                />
                <Col lg={8}>
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
                <Col lg={3} className="p-0 d-flex justify-content-end ">
                  <span
                    className="label label-inline label-light-warning font-weight-bold p-0 px-4"
                    style={{ borderRadius: "25px" }}
                  >
                    Seleksi Administrasi
                  </span>{" "}
                </Col>
              </div>

              <Col>
                <div className="d-flex align-items-center align-middle ">
                  <i className="ri-time-line"></i>
                  <span className={` pl-2`}>
                    Pelatihan : 05 Jul 21 - 21 Jul 21
                  </span>
                </div>
              </Col>
              <Col>
                <div className="d-flex align-items-center align-middle ">
                  <i className="ri-map-pin-line"></i>
                  <span className={` pl-2`}>
                    Lokasi : Pasaraya Blok M Gedung B Lt. 6, Jakarta Barat,
                    Indonesia{" "}
                  </span>
                </div>
              </Col>
              <Button className="d-flex align-items-end btn-rounded-full ml-auto btn-block d-flex justify-content-center">
                <i className="ri-download-2-fill mr-2"></i>
                Bukti Pendaftaran{" "}
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Link>
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
                md={2}
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
                className="my-auto order-2 order-md-2"
                style={{ marginLeft: "-10px" }}
              >
                <Row>
                  <h4 className="font-weight-bolder my-0">
                    Intermediate Multimedia Designer
                  </h4>
                </Row>
                <Row>
                  <div
                    className="d-flex align-items-center"
                    style={{ color: "#203E80" }}
                  >
                    <div className="font-weight-bolder">Bukalapak</div>
                    <div className="text-muted pl-2">
                      &bull; Vocational School Graduate
                    </div>
                  </div>
                </Row>
              </Col>
              <Col
                md={3}
                // className="d-flex justify-content-end order-1 order-md-3"
                className="label label-inline label-light-warning font-weight-bold p-0 px-4 order-1 order-md-3"
              >
                seleksi administrasi
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
              <Col md={6} className="d-flex justify-content-center order-6">
                <Button
                  className="btn-rounded-full btn-block justify-content-center mt-5"
                  style={{ height: "40px" }}
                >
                  <i className="ri-download-2-fill mr-2"></i>
                  Bukti Pendaftaran{" "}
                </Button>
              </Col>
              <Col md={6} className="d-flex justify-content-center order-7">
                <Button
                  className="btn-rounded-full btn-block justify-content-center mt-5"
                  style={{ height: "40px" }}
                >
                  <i className="ri-download-2-fill mr-2"></i>
                  Bukti Pendaftaran{" "}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
