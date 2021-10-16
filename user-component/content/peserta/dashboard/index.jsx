import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Row,
  Col,
  Card,
  Figure,
  Button,
  Badge,
  Modal,
  Container,
} from "react-bootstrap";
import style from "../../../../styles/peserta/dashboard.module.css";

import CardPill from "../../../components/peserta/CardPill";
import CardPage from "../../../components/peserta/CardPage";
import { useRouter } from "next/router";
import Sidebar from "../components/sidebar";

const Dashboard = ({ session }) => {
  const router = useRouter();

  return (
    <>
      <div className="container-fluid py-5">
        <Row>
          <Col md={3}>
            <Sidebar />
          </Col>
          <Col md={9} style={{ marginTop: "-5%" }}>
            <Row>
              <CardPill
                background="bg-extras"
                backgroundImg="new-duplicate.svg"
                icon="new/open-book.svg"
                color="#FFFFFF"
                value={0}
                title="Total Pelatihan"
              />
              <CardPill
                background="bg-success"
                backgroundImg="new-award.svg"
                icon="new/done-circle.svg"
                color="#FFFFFF"
                value={0}
                title="Lulus Pelatihan"
              />
              <CardPill
                background="bg-danger"
                backgroundImg="new-shield.svg"
                icon="new/error-circle.svg"
                color="#FFFFFF"
                value={0}
                title="Tidak Lulus Pelatihan"
              />
            </Row>
            <Row>
              <CardPage
                backgroundImage="new-game-4.svg"
                background="primary"
                color="#6C6C6C"
                link="/peserta"
                text="Lakukan Test Substansi"
                desc="Anda Belum Melakukan Test Substansi"
              />
              <CardPage
                backgroundImage="new-game-3.svg"
                background="success"
                color="#00B27A"
                link="/peserta"
                text="Lakukan Survey"
                desc="Anda Belum Melakukan Test Survey"
              />
              <CardPage
                backgroundImage="new-game-1.svg"
                background="danger"
                color="#EE2D41"
                link="/peserta"
                text="Lakukan TRIVIA"
                desc="Anda Belum Melakukan TRIVIA"
              />
              <CardPage
                backgroundImage="new-game-2.svg"
                background="warning"
                color="#FFA800"
                link="/peserta"
                text="Unduh Sertifikat"
                desc="Anda Sudah bisa mengunduh Sertifikat"
              />
            </Row>
            <Row>
              {[1, 2, 3, 4].map((row, i) => (
                <Col md={6} className="mb-8" key={i}>
                  <Card className="rounded-xl h-100">
                    <Card.Body>
                      <Card.Title>
                        <p className={style.card_title}>Pelatihan Terkini</p>
                      </Card.Title>

                      <Card className="shadow rounded-md">
                        <Image
                          className={`${style.image_dashboard}`}
                          src="/assets/media/default-card.png"
                          width={400}
                          height={180}
                          objectFit="cover"
                        />
                        <Card.ImgOverlay>
                          <Badge bg="secondary text-white text-uppercase rounded-xl py-3 px-4">
                            Pelatihan Online
                          </Badge>
                        </Card.ImgOverlay>
                        <Card.Body className="position-relative">
                          <div className={style.bungkus_mitra_pelatihan}>
                            <Image
                              src="/assets/media/logo-filter.svg"
                              width={62}
                              height={62}
                              objectFit="cover"
                              className={`${style.image_card_pelatihan} img-fluild`}
                            />
                          </div>
                          <div
                            className="d-flex justify-content-between position-relative pb-0 mb-0"
                            style={{ top: "-15px" }}
                          >
                            <p className={`pl-20 my-0 ${style.text_mitra}`}>
                              Gojek
                            </p>
                            <p
                              className={`${style.status_mitra_open} text-uppercase font-weight-bolder my-0`}
                            >
                              Open
                            </p>
                          </div>

                          <p className={`my-0 ${style.title_card}`}>
                            Intermediate Multimedia Designer
                          </p>
                          <p style={{ fontSize: "14px", color: "#6C6C6C" }}>
                            Vocational School Graduate Academy
                          </p>
                          <hr className="" />
                          <div className="d-flex flex-column">
                            <div className="date d-flex align-items-center align-middle mr-7">
                              <i className="ri-time-line"></i>
                              <span
                                className={`${style.text_date_register} pl-2`}
                              >
                                Registrasi : 05 Jul 21 - 31 Jul 21
                              </span>
                            </div>
                            <div className="date d-flex align-items-center align-middle">
                              <i className="ri-group-line"></i>
                              <span
                                className={`${style.text_date_register} pl-2`}
                              >
                                Kuota : 1000 Peserta
                              </span>
                            </div>
                            <div className="date d-flex align-items-center align-middle">
                              <i className="ri-history-fill"></i>
                              <span
                                className={`${style.text_date_register} pl-2`}
                              >
                                Status : Test Substansi
                              </span>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
