import React, { useState, useEffect } from "react";
import { Card, Col, Row, Badge, Button } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import style from "./testSubstansi.module.css";
import { useRouter } from "next/router";
import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

export default function SeleksiAdministrasi() {
  const { state: data, error } = useSelector(
    (state) => state.getDetailRiwayatPelatihanPeserta
  );
  const router = useRouter();
  const [description, setDescription] = useState(data.deskripsi);
  const [finalDescription, setFinalDescription] = useState();
  const dateFrom = moment(data.pendaftaran_mulai).format("LL");
  const dateTo = moment(data.pendaftaran_selesai).format("LL");

  useEffect(() => {
    let newText = description.split(" ");
    let test = [];
    for (let i = 0; i < newText.length; i++) {
      test.push(newText[i]);
      if (i == 100) {
        test.push("...");
        break;
      }
    }
    const result = test.join(" ");
    setFinalDescription(result);
  }, []);

  const [truncate, setTruncate] = useState(true);
  const [label, setLabel] = useState();

  useEffect(() => {
    if (!error) {
      if (data.status.includes("menunggu")) {
        setLabel("warning");
      } else if (data.status == "tes substansi") {
        setLabel("primary");
      } else if (data.status.includes("tidak")) {
        setLabel("danger");
      } else {
        setLabel("success");
      }
    } else {
      toast.error(error);
    }
  }, []);

  return (
    <PesertaWrapper>
      <Col lg={12} className="px-0">
        <Card className="card-custom card-stretch gutter-b p-0">
          <Row className="p-10 m-0">
            <Col className="d-flex align-items-start">
              <h1
                className="font-weight-bolder my-0"
                style={{ fontSize: "36px" }}
              >
                {data.name}
              </h1>
            </Col>
            <Col className=" d-flex justify-content-end">
              <span
                className={`label label-inline label-light-${label} font-weight-bold text-capitalize`}
                style={{ borderRadius: "25px" }}
              >
                {data.status}
              </span>
            </Col>
            <Col lg={12} className="my-5">
              <span
                className="p-0 font-weight-bolder"
                style={{ fontSize: "18px", color: "#6C6C6C" }}
              >
                {data.akademi}
              </span>
            </Col>
            <Col lg={12} className="mt-12">
              <p style={{ fontSize: "14px" }}>Lokasi Pelatihan</p>
              <p style={{ fontSize: "16px" }}>{data.alamat}</p>
            </Col>
            <Col lg={6}>
              <p style={{ fontSize: "14px" }}>Jadwal Pelatihan</p>
              <p style={{ fontSize: "16px" }}>
                {dateFrom} - {dateTo}
              </p>
            </Col>
            <Col lg={6}>
              <p style={{ fontSize: "14px" }}>Kuota</p>
              <p style={{ fontSize: "16px" }}>{data.kuota_peserta} Peserta</p>
            </Col>
            <Col md={12} className="py-10 ">
              {data.status.includes("tidak") ? (
                ""
              ) : (
                <Row>
                  <Col>
                    <Button
                      className="btn-rounded-full font-weight-bold btn-block justify-content-center"
                      style={{ height: "40px", fontSize: "14px" }}
                      onClick={() => {}}
                    >
                      <i
                        className="ri-download-2-fill mr-2"
                        style={{ color: "white" }}
                      ></i>
                      Bukti Pendaftaran
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      className="btn-rounded-full font-weight-bold btn-block justify-content-center"
                      style={{ height: "40px", fontSize: "14px" }}
                      onClick={() => {
                        Cookies.set("id_tema", data.tema_id);
                        Cookies.set("id_pelatihan", data.id);
                        router.push(
                          `/peserta/test-substansi/panduan-substansi`
                        );
                      }}
                    >
                      Test Substansi{" "}
                      <i className="ri-arrow-right-s-line mr-2"></i>
                    </Button>
                  </Col>
                </Row>
              )}

              <hr className="my-12" />
              <img
                height={360}
                width={"100%"}
                // layout="fill"
                src={
                  data.gambar
                    ? `${process.env.END_POINT_API_IMAGE_BEASISWA}${data.gambar}`
                    : "/assets/media/default-card.png"
                }
                // objectFit="cover"
                className={`rounded-xl`}
                style={{ objectFit: "cover" }}
                alt="pictures1"
              />
              <Card className="my-12">
                <Card.Body style={{ fontSize: "14px" }} className="p-7">
                  <div
                    dangerouslySetInnerHTML={{ __html: finalDescription }}
                  ></div>
                  {truncate ? (
                    <div className="mt-5">
                      <a
                        style={{ color: "#0063CC" }}
                        onClick={() => {
                          setFinalDescription(description);
                          setTruncate(false);
                        }}
                      >
                        {description.split(" ").length > 100 &&
                          "Baca Selengkapnya"}
                      </a>
                    </div>
                  ) : (
                    ""
                  )}
                </Card.Body>
              </Card>
              <Row>
                <Col>
                  <p
                    className="font-weight-bolder"
                    style={{ fontSize: "16px" }}
                  >
                    Silabus Pelatihan
                  </p>
                  <Button
                    className={`rounded-full font-weight-bold btn-block justify-content-center mt-5 ${style.background_outline_primary}`}
                    style={{
                      height: "40px",
                      fontSize: "14px",
                      fontFamily: "poppins",
                    }}
                  >
                    <i
                      className={`ri-download-cloud-fill mr-2 `}
                      style={{ color: "#007cff" }}
                    ></i>
                    Unduh Syllabus
                  </Button>
                </Col>
                <Col className="px-10">
                  <p
                    style={{ fontSize: "16px" }}
                    className="font-weight-bolder"
                  >
                    Mitra Pelatihan
                  </p>
                  <div className="d-flex">
                    <img
                      src={
                        data.gambar_mitra
                          ? `${process.env.END_POINT_API_IMAGE_LOGO_MITRA}${data.gambar_mitra}`
                          : "/assets/media/default-card.png"
                      }
                      width={58}
                      height={58}
                      alt="test2"
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
                    <div className="flex-column justify-content-around d-flex mx-5">
                      <div
                        className="font-weight-bolder"
                        style={{ fontSize: "14px" }}
                      >
                        Bukalapak
                      </div>
                      <div style={{ fontSize: "12px" }}>Indonesia</div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
      {/* <Administrasi /> */}
    </PesertaWrapper>
  );
}
