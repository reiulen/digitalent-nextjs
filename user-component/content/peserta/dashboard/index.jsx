import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Row, Col, Card, Button, Badge, Modal } from "react-bootstrap";
import style from "../../../../styles/peserta/dashboard.module.css";

import CardPill from "../../../components/peserta/CardPill";
import CardPage from "../../../components/peserta/CardPage";
import { useRouter } from "next/router";
import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";

const Dashboard = ({ session }) => {
  const router = useRouter();

  const [cardPelatihan, setCardPelatihan] = useState([
    {
      key: 1,
      title: "Pelatihan Terkini",
      hover: false,
      mitra: "Gojek",
      status: "open",
    },
    {
      key: 2,
      title: "Pelatihan Sebelumnya",
      hover: false,
      mitra: "Bukalapak",
      status: "close",
    },
  ]);

  const handleHoverCard = (index, status) => {
    let list = [...cardPelatihan];
    list[index].hover = status;

    setCardPelatihan(list);
  };

  return (
    <>
      <PesertaWrapper>
        <Row className="mx-1">
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
        <Row className="mx-1">
          <CardPage
            backgroundImage="new-game-4.svg"
            background="primary"
            color="#6C6C6C"
            link="/peserta/subvit/substansi/1"
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
        <Row className="mx-1">
          {cardPelatihan.map((row, i) => (
            <Col md={6} className="mb-4 px-2" key={i}>
              <Card className="rounded-xl h-100">
                <Card.Body>
                  <Card.Title>
                    <p className={style.card_title}>{row.title}</p>
                  </Card.Title>

                  <Card
                    className="shadow rounded-md"
                    onMouseOver={() => handleHoverCard(i, true)}
                    onMouseLeave={() => handleHoverCard(i, false)}
                  >
                    <Image
                      className={`${style.image_dashboard}`}
                      src="/assets/media/default-card.png"
                      width={400}
                      height={180}
                      objectFit="cover"
                    />
                    <Card.ImgOverlay>
                      <Badge bg={` rounded-xl py-3 px-4 ${style.badge_card}`}>
                        Pelatihan Online
                      </Badge>
                      {row.hover && (
                        <>
                          <Button
                            variant="light"
                            className={`float-right d-flex justify-content-center align-items-center ${style.wishlist_card}`}
                          >
                            <i
                              className="ri-heart-line p-0"
                              style={{ color: "#6C6C6C" }}
                            ></i>
                          </Button>
                          <Button
                            variant="light"
                            className={`float-right d-flex justify-content-center align-items-center mr-2 ${style.wishlist_card}`}
                          >
                            <i
                              className="ri-share-line p-0"
                              style={{ color: "#6C6C6C" }}
                            ></i>
                          </Button>
                        </>
                      )}
                    </Card.ImgOverlay>
                    <Card.Body className="position-relative">
                      <div className={style.bungkus_mitra_pelatihan}>
                        <Image
                          src="/assets/media/logo-filter.svg"
                          width={62}
                          height={62}
                          objectFit="cover"
                          thumbnail
                          roundedCircle
                          className={`${style.image_card_pelatihan} img-fluild`}
                        />
                      </div>
                      <div
                        className="d-flex justify-content-between position-relative pb-0 mb-0"
                        style={{ top: "-15px" }}
                      >
                        <p className={`pl-20 my-0 ${style.text_mitra}`}>
                          {row.mitra}
                        </p>
                        {row.status === "open" && (
                          <p
                            className={`${style.status_mitra_open} text-uppercase font-weight-bolder my-0`}
                          >
                            Open
                          </p>
                        )}
                        {row.status === "close" && (
                          <p
                            className={`${style.status_mitra_close} text-uppercase font-weight-bolder my-0`}
                          >
                            Close
                          </p>
                        )}
                      </div>

                      <p className={`my-0 ${style.title_card}`}>
                        Intermediate Multimedia Designer
                      </p>
                      <p style={{ fontSize: "14px", color: "#6C6C6C" }}>
                        Vocational School Graduate Academy
                      </p>
                      <hr />
                      {row.hover != true ? (
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
                      ) : (
                        <Button
                          className={`btn-block rounded-xl ${style.btn_quick_view}`}
                        >
                          Quick View
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Row className="mx-1">
          <Col md={6} className="mb-4 px-2">
            <Card className="rounded-xl h-100">
              <Card.Body>
                <Card.Title className="d-flex">
                  <p className={style.card_title}>SIMONAS</p>
                  <div className="ml-auto">
                    <Link href="/peserta" passHref>
                      <p
                        className={`d-flex align-items-center ${style.kunjungi_link}`}
                      >
                        Kunjungi{" "}
                        <i
                          className="ri-arrow-right-s-line ml-1"
                          style={{ fontSize: "20px", color: "#203E80" }}
                        ></i>
                      </p>
                    </Link>
                  </div>
                </Card.Title>
                {[1, 2, 3, 4].map((row, i, arr) => (
                  <div
                    className={`pekerjaan ${
                      arr.length - 1 !== i ? "mb-8" : ""
                    } `}
                  >
                    <div className="d-flex flex-row">
                      <Image
                        src="/assets/media/mitra-icon/telkom-1.svg"
                        objectFit="cover"
                        width={55}
                        height={52}
                      />
                      <div className="pekerjaan-pt ml-7">
                        <p
                          className={`my-0`}
                          style={{
                            fontWeight: "600",
                            fontSize: "16px",
                            color: "#6C6C6C",
                          }}
                        >
                          Data Sciense
                        </p>
                        <p style={{ fontSize: "14px", color: "#6C6C6C" }}>
                          PT. Telkom Indonesia (Persero) Tbk
                        </p>
                      </div>

                      <div className="pekerjaan-next align-items-center ml-auto">
                        <Link href="/peserta" passHref>
                          <i
                            className="ri-arrow-right-s-line"
                            style={{ fontSize: "24px", color: "#09121F" }}
                          ></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4 px-2">
            <Card className="rounded-xl h-100">
              <Card.Body>
                <Card.Title className="d-flex">
                  <p className={style.card_title}>Beasiswa Kominfo</p>
                  <div className="ml-auto">
                    <Link href="/peserta" passHref>
                      <p
                        className={`d-flex align-items-center ${style.kunjungi_link}`}
                      >
                        Kunjungi{" "}
                        <i
                          className="ri-arrow-right-s-line ml-1"
                          style={{ fontSize: "20px", color: "#203E80" }}
                        ></i>
                      </p>
                    </Link>
                  </div>
                </Card.Title>
                {[1, 2, 3, 4].map((row, i, arr) => (
                  <div
                    className={`pekerjaan ${
                      arr.length - 1 !== i ? "mb-8" : ""
                    } `}
                  >
                    <div className="d-flex flex-row">
                      <Image
                        src="/assets/media/mitra-icon/logo-itb-1.svg"
                        width={55}
                        height={52}
                      />
                      <div className="pekerjaan-pt ml-7">
                        <p
                          className={`my-0`}
                          style={{
                            fontWeight: "600",
                            fontSize: "16px",
                            color: "#6C6C6C",
                          }}
                        >
                          Institut Teknologi Bandung
                        </p>
                        <p style={{ fontSize: "14px", color: "#6C6C6C" }}>
                          S1 Psikologi
                        </p>
                      </div>

                      <div className="pekerjaan-next align-items-center ml-auto">
                        <Link href="/peserta" passHref>
                          <i
                            className="ri-arrow-right-s-line"
                            style={{ fontSize: "24px", color: "#09121F" }}
                          ></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </PesertaWrapper>
    </>
  );
};

export default Dashboard;
