import React, { useState, useEffect } from "react";
import { Card, Col, Row, Badge, Button } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import style from "./style.module.css";
import { useRouter } from "next/router";
import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { helperUserStatusColor } from "../../../../utils/middleware/helper";

export default function SeleksiAdministrasi() {
  const { state: data } = useSelector(
    (state) => state.getDetailRiwayatPelatihanPeserta
  );

  const handleDownloadSilabus = async () => {
    let silabus = process.env.END_POINT_API_IMAGE_BEASISWA + data.silabus;
    window.location.href = silabus;
  };

  const router = useRouter();
  const [description, setDescription] = useState(data?.deskripsi || "-");
  const [finalDescription, setFinalDescription] = useState();
  const dateFrom = moment(data?.pendaftaran_mulai).format("LL") || "-";
  const dateTo = moment(data?.pendaftaran_selesai).format("LL") || "-";

  useEffect(() => {
    let newText = description.split(" ");
    let test = [];
    if (newText.length > 100) {
      for (let i = 0; i < newText.length; i++) {
        test.push(newText[i]);
        if (i == 100) {
          test.push("...");
          break;
        }
      }
      const result = test.join(" ");
      setFinalDescription(result);
    } else {
      setFinalDescription(description);
    }
  }, []);

  const [label, setLabel] = useState();
  useEffect(() => {
    helperUserStatusColor(data?.status, setLabel);
  }, []);

  const [truncate, setTruncate] = useState(true);

  return (
    <PesertaWrapper>
      <Col lg={12} className="px-0">
        <Card className="card-custom card-stretch gutter-b p-0">
          <Row className="p-10 m-0">
            <Col md={9} className="d-flex align-items-start">
              <h1
                className="font-weight-bolder my-0"
                style={{ fontSize: "32px" }}
              >
                {data?.name || "-"}
              </h1>
              <div className="text-muted "></div>
            </Col>
            <Col
              md={3}
              className="d-flex justify-content-md-end justify-content-start"
            >
              <span
                className={`label label-inline label-light-${label}  text-center font-weight-bold text-capitalize`}
                style={{ borderRadius: "25px" }}
              >
                {data?.status || "-"}
              </span>
            </Col>
            <Col lg={12} className="my-5">
              <span
                className="p-0 font-weight-bolder"
                style={{ fontSize: "18px", color: "#6C6C6C" }}
              >
                {data?.akademi || "-"}
              </span>
            </Col>
            <Col lg={12} className="mt-12">
              <p style={{ fontSize: "14px" }}>Lokasi Pelatihan</p>
              <p style={{ fontSize: "16px" }}>{data?.alamat || "-"}</p>
            </Col>
            <Col lg={6}>
              <p style={{ fontSize: "14px" }}>Jadwal Pelatihan</p>
              <p style={{ fontSize: "16px" }}>
                {dateFrom} - {dateTo}
              </p>
            </Col>
            <Col lg={6}>
              <p style={{ fontSize: "14px" }}>Kuota</p>
              <p style={{ fontSize: "16px" }}>
                {data?.kuota_peserta || "-"} Peserta
              </p>
            </Col>
            <Col md={12} className="py-10 ">
              <Row>
                {data.status !== "tidak lulus administrasi" && (
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
                )}
              </Row>

              <hr className="my-12" />
              <img
                height={360}
                width={"100%"}
                // layout="fill"
                src={
                  !data?.gambar
                    ? "/assets/media/default-card.png"
                    : `${process.env.END_POINT_API_IMAGE_BEASISWA}${data.gambar}`
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
              <Row className="m-0 p-0">
                <Col md={6} className="px-md-4 px-0">
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
                    onClick={() => handleDownloadSilabus()}
                  >
                    <i
                      className={`ri-download-cloud-fill mr-2 `}
                      style={{ color: "#007cff" }}
                    ></i>
                    Unduh Silabus
                  </Button>
                </Col>
                <Col md={6} className="px-md-10 px-0 mt-12 mt-md-0">
                  <p
                    style={{ fontSize: "16px" }}
                    className="font-weight-bolder"
                  >
                    Mitra Pelatihan
                  </p>
                  <div className="d-flex">
                    <img
                      src={
                        !data?.gambar_mitra || data?.logo
                          ? "/assets/media/default-card.png"
                          : data?.logo
                          ? data?.file_path + data?.logo
                          : data?.file_path + data.gambar_mitra
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
                        {data?.mitra || data?.penyelenggara || "-"}
                      </div>
                      <div style={{ fontSize: "12px" }}>
                        {data?.lokasi_mitra || "-"}
                        {console.log(data)}
                      </div>
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
