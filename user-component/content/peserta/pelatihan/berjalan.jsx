import React from "react";
import { Card, Col, Row, Figure, Button } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import style from "../../../../styles/peserta/dashboard.module.css";

const Berjalan = () => {
  return (
    <>
      <Col lg={12} className="order-1 px-0">
        <Card className="card-custom card-stretch gutter-b">
          <Card.Body>
            <Card className="shadow mb-4">
              <Card.Body className="pb-0 pt-6">
                <Row>
                  <Col md={3} className="py-6">
                    <Figure>
                      <Image
                        width={234}
                        height={218}
                        src="/assets/media/mitra-icon/laravel-1.svg"
                        objectFit="cover"
                        className={style.figure_img}
                      />
                    </Figure>
                  </Col>
                  <Col md={9} className="py-6">
                    <div className="d-flex flex-row justify-content-start align-items-center">
                      <Image
                        width={77}
                        height={77}
                        className={style.figure_img}
                        objectFit="cover"
                        src="/assets/media/mitra-icon/bukalapak-1.svg"
                      />
                      <div className="penyelenggara flex-column align-items-start ml-8">
                        <h5 className="font-weight-bold">
                          Intermediate Multimedia Designer
                        </h5>
                        <p>Bukapalak</p>
                      </div>
                    </div>

                    <Row className="mt-10">
                      <Col md={6}>
                        <div className="date d-flex align-items-center align-middle">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="19"
                            height="19"
                          >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path
                              d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-8h4v2h-6V7h2v5z"
                              fill="rgba(76,189,226,1)"
                            />
                          </svg>
                          <span className={`${style.text_date_register} pl-2`}>
                            05 Jul 21 - 31 Jul 21
                          </span>
                        </div>
                        <div className="date d-flex align-items-center align-middle">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="19"
                            height="19"
                          >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path
                              d="M7 7V3a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-4v3.993c0 .556-.449 1.007-1.007 1.007H3.007A1.006 1.006 0 0 1 2 20.993l.003-12.986C2.003 7.451 2.452 7 3.01 7H7zm2 0h6.993C16.549 7 17 7.449 17 8.007V15h3V4H9v3zm6 2H4.003L4 20h11V9zm-6.497 9l-3.536-3.536 1.414-1.414 2.122 2.122 4.242-4.243 1.414 1.414L8.503 18z"
                              fill="rgba(76,189,226,1)"
                            />
                          </svg>
                          <span className={`${style.text_date_register} pl-2`}>
                            Test Substansi
                          </span>
                        </div>
                      </Col>
                      <Col md={6}>
                        <Button
                          variant="primary"
                          className="btn-rounded-full ml-auto"
                          size="sm"
                        >
                          Kerjakan Test Substansi
                          <i className="ri-arrow-right-s-line ml-2"></i>
                        </Button>
                      </Col>
                    </Row>
                    <hr />
                    <Button
                      variant="primary"
                      className="btn-rounded-full ml-auto bg-blue-primary"
                      size="sm"
                    >
                      <i className="ri-download-cloud-2-fill mr-2"></i>
                      Download Bukti Pendaftaran
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card className="shadow mb-4">
              <Card.Body className="pb-0 pt-6">
                <Row>
                  <Col md={3} className="py-6">
                    <Figure>
                      <Image
                        width={234}
                        height={218}
                        src="/assets/media/mitra-icon/laravel-1.svg"
                        objectFit="cover"
                        className={style.figure_img}
                      />
                    </Figure>
                  </Col>
                  <Col md={9} className="py-6">
                    <div className="d-flex flex-row justify-content-start align-items-center">
                      <Image
                        width={77}
                        height={77}
                        className={style.figure_img}
                        objectFit="cover"
                        src="/assets/media/mitra-icon/bukalapak-1.svg"
                      />
                      <div className="penyelenggara flex-column align-items-start ml-8">
                        <h5 className="font-weight-bold">
                          Intermediate Multimedia Designer
                        </h5>
                        <p>Bukapalak</p>
                      </div>
                    </div>

                    <Row className="mt-10">
                      <Col md={6}>
                        <div className="date d-flex align-items-center align-middle">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="19"
                            height="19"
                          >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path
                              d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-8h4v2h-6V7h2v5z"
                              fill="rgba(76,189,226,1)"
                            />
                          </svg>
                          <span className={`${style.text_date_register} pl-2`}>
                            05 Jul 21 - 31 Jul 21
                          </span>
                        </div>
                        <div className="date d-flex align-items-center align-middle">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="19"
                            height="19"
                          >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path
                              d="M7 7V3a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-4v3.993c0 .556-.449 1.007-1.007 1.007H3.007A1.006 1.006 0 0 1 2 20.993l.003-12.986C2.003 7.451 2.452 7 3.01 7H7zm2 0h6.993C16.549 7 17 7.449 17 8.007V15h3V4H9v3zm6 2H4.003L4 20h11V9zm-6.497 9l-3.536-3.536 1.414-1.414 2.122 2.122 4.242-4.243 1.414 1.414L8.503 18z"
                              fill="rgba(76,189,226,1)"
                            />
                          </svg>
                          <span className={`${style.text_date_register} pl-2`}>
                            Test Substansi
                          </span>
                        </div>
                      </Col>
                      <Col md={6}>
                        <Button
                          variant="primary"
                          className="btn-rounded-full ml-auto"
                          size="sm"
                        >
                          Kerjakan Test Substansi
                          <i className="ri-arrow-right-s-line ml-2"></i>
                        </Button>
                      </Col>
                    </Row>
                    <hr />
                    <Button
                      variant="primary"
                      className="btn-rounded-full ml-auto bg-blue-primary"
                      size="sm"
                    >
                      <i className="ri-download-cloud-2-fill mr-2"></i>
                      Download Bukti Pendaftaran
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default Berjalan;
