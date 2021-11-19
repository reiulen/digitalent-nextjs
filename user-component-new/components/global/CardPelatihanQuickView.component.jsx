import React from "react";
import { Row, Col } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";

import style from "../../../styles/peserta/dashboard.module.css";

import IconClose from "../../../components/assets/icon/Close";
import IconLove from "../../../components/assets/icon/Love";
import IconShare from "../../../components/assets/icon/Share";
import IconTime from "../../../components/assets/icon-dashboard-peserta/Time";
import IconPeserta from "../../../components/assets/icon-dashboard-peserta/Peserta";

const CardPelatihanQuickView = ({
  row,
  i,
  akademi,
  funcCheckPelatihan,
  funcClosePelatihan,
}) => {
  const printTextTrim = (str) => {
    let result = null;

    if (str.length > 200) {
      result = str.slice(0, 200) + "...";
    } else {
      result = str;
    }

    return result;
  };
  return (
    <>
      <Col md={12} key={i} className="order-0 mb-5">
        <div className="container-fluid">
          <Row>
            <Col md={4}>
              <div className="position-absolute mt-5" style={{ zIndex: "100" }}>
                <span className="badgess-lg">
                  Pelatihan {row.metode_pelatihan}
                </span>
              </div>
              <Image
                src={
                  (row.gambar &&
                    process.env.END_POINT_API_IMAGE_BEASISWA + row.gambar) ||
                  "/assets/media/default-card.png"
                }
                alt="image card detail"
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </Col>

            <Col md={8}>
              <div className="py-8 ml-3">
                <div className="position-relative d-flex align-items-start justify-content-between">
                  <div className="d-flex d-flex align-items-start">
                    <div className="">
                      <Image
                        src={
                          process.env.END_POINT_API_IMAGE_PARTNERSHIP +
                          row.gambar_mitra
                        }
                        width={80}
                        height={80}
                        objectFit="cover"
                        className={`${style.image_card_pelatihan}`}
                      />
                    </div>
                    <div className="ml-6">
                      <p className="fz-14" style={{ color: "#6C6C6C" }}>
                        {akademi.name}
                      </p>
                      <p className="fz-30 fw-600">{row.name}</p>
                      <p className="fw-600 fz-14">{row.mitra}</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start">
                    <button className="roundedss-border btn btn-white">
                      <IconLove className="cursor-pointer" />
                    </button>
                    <button className="roundedss-border btn btn-white mx-6">
                      <IconShare className="cursor-pointer" />
                    </button>

                    <div onClick={() => funcClosePelatihan(i)}>
                      <IconClose className="cursor-pointer" />
                    </div>
                  </div>
                </div>

                <p className="fz-16 fw-400 my-6">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: printTextTrim(row.deskripsi),
                    }}
                  ></div>
                </p>

                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <span style={{ color: "#6C6C6C" }}>
                      <IconTime className="mr-2" />
                      Registrasi:{" "}
                      {moment(row.pendaftaran_mulai).format(
                        "DD MMMM YYYY"
                      )} -{" "}
                      {moment(row.pendaftaran_selesai).format("DD MMMM YYYY")}
                    </span>
                    <span className="mx-6" style={{ color: "#6C6C6C" }}>
                      <IconPeserta className="mr-2" />
                      Kuota: {row.kuota_peserta} Peserta
                    </span>
                    <span
                      style={{ color: "#6C6C6C" }}
                      className="d-flex align-items-center"
                    >
                      <i
                        className="ri-map-pin-line mr-2"
                        style={{ color: "#6C6C6C" }}
                      ></i>
                      Lokasi: {row.alamat}
                    </span>
                  </div>
                </div>

                <hr />

                <div className="row pt-6">
                  <div className="col-6">
                    <Link href={`/detail/pelatihan/${row.id}`} passHref>
                      <a>
                        <button className="btn btn-outline-primary-new rounded-pill py-3 px-12 mr-4 w-100">
                          Lihat Selengkapnya
                        </button>
                      </a>
                    </Link>
                  </div>

                  {row.status !== "Closed" ? (
                    <div className="col-6">
                      <button
                        onClick={() => funcCheckPelatihan(row.id)}
                        className="d-flex justify-content-center btn-primary btn-register-peserta btn-sm py-3 px-12 rounded-pill btn-primary w-100"
                      >
                        Daftar Pelatihan
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </>
  );
};

export default CardPelatihanQuickView;
