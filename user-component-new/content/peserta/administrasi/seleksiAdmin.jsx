import React, { useState, useEffect } from "react";
import { Card, Col, Row, Badge, Button } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import style from "./style.module.css";
import { useRouter } from "next/router";
import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

export default function SeleksiAdministrasi() {
  // const { state: data } = useSelector(
  //   (state) => state.getDetailRiwayatPelatihanPeserta
  // );

  const data = {
    id: 204,
    id_pendaftaran: 30344,
    gambar: "/thumbnail/7cc12d3c-0064-4bb8-8331-0063989d0042-December.png",
    akademi: "Vocational School Graduate Academy",
    tema: "Junior Web Developer",
    tema_id: 69,
    akademi_id: 55,
    alamat: "Jatinegara",
    name: "Junior Laravel Programming",
    kuota_peserta: 900,
    silabus: "/silabus/2d5a21ae-5794-4104-a9b3-36b8c2eaddac-December.pdf",
    metode_pelatihan: "Online dan Offline",
    gambar_mitra: "",
    mitra: "",
    pendaftaran_mulai: "2021-12-02T10:30:00Z",
    pendaftaran_selesai: "2021-12-02T09:00:00Z",
    pelatihan_mulai: "",
    pelatihan_selesai: "",
    deskripsi:
      '<p>Pengembangan website akan terasa lebih mudah jika menggunakan tool yang tepat. Contohnya pemilihan <a href="https://www.niagahoster.co.id/blog/framework-php-terbaik/">framework php</a> yang akan digunakan</p><p><a href="https://www.niagahoster.co.id/blog/apa-itu-framework/"><strong>Framework</strong></a> yang baik adalah framework yang sesuai dengan kebutuhan aplikasi web yang akan Anda bangun. Tidak hanya itu, framework juga harus bisa menyederhanakan proses pembuatan dan menghasilkan performa yang aplikasi web yang lebih maksimal.</p><p>Nah! Salah satu framework yang sangat populer saat ini adalah Laravel. Framework ini terkenal kesederhanaannya dan menghasilkan aplikasi web yang powerful.</p><p>Artikel ini akan membahas soal apa itu Laravel, manfaat Laravel, fitur-fitur Laravel, hingga tips Laravel untuk pemula.</p>',
    sertifikasi: "",
    lpj_peserta: "",
    status: "tidak lulus administrasi",
    tes_subtansi: false,
    trivia: false,
    survei: false,
    lpj: false,
    midtest: false,
    file_path: "",
    level_pelatihan: "",
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
    const status = data?.status || "-";
    if (status.includes("seleksi")) {
      // seleksi administrasi
      return setLabel("warning");
    }
    if (status.includes("tidak")) {
      // tidak lulus
      return setLabel("danger");
    }
    if (status.includes("lulus")) {
      return setLabel("success");
    }
    if (status.includes("nunggu" || "seleksi")) {
      return setLabel("warning");
    } else {
      setLabel("primary");
    }
  }, []);

  const [truncate, setTruncate] = useState(true);

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
                {data?.name || "-"}
              </h1>
              <div className="text-muted "></div>
            </Col>
            <Col className="d-flex justify-content-end">
              <span
                className={`label label-inline label-light-${label} font-weight-bold text-capitalize`}
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
                {data.status !== "tidak lulus administrasi" &&  <Col>
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
                </Col>}
                
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
                    Unduh Silabus
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
                        !data?.gambar_mitra
                          ? "/assets/media/default-card.png"
                          : `${process.env.END_POINT_API_IMAGE_LOGO_MITRA}${data.gambar_mitra}`
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
                        {data?.mitra || "-"}
                      </div>
                      <div style={{ fontSize: "12px" }}>
                        {data?.lokasi_mitra || "-"}
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
