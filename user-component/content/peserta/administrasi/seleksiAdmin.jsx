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
              <Col lg={4} className=" d-flex justify-content-end">
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
              <Col lg={12}>
                <p style={{ fontSize: "14px" }}>Lokasi Pelatihan</p>
                <p style={{ fontSize: "16px" }}>
                  Pasaraya Blok M Gedung B lt.6, Jakarta Barat, Indonesia
                </p>
              </Col>
              <Col lg={6}>
                <p style={{ fontSize: "14px" }}>Jadwal Pelatihan</p>
                <p style={{ fontSize: "16px" }}>12 Juli - 22 Oktober 2021</p>
              </Col>
              <Col lg={6}>
                <p style={{ fontSize: "14px" }}>Kuota</p>
                <p style={{ fontSize: "16px" }}>1000 Peserta</p>
              </Col>
            </Row>
            <Col md={12} className="py-10 ">
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

              <hr className="my-12" />
              <Image
                src="/assets/media/bg-admin-1.png"
                objectFit="cover"
                className={`rounded-xl`}
                alt="pictures1"
                height={360}
                width={960}
              />
              <Card className="my-12">
                <Card.Body style={{ fontSize: "14px" }}>
                  Intermediate Multimedia Designer merupakan salah satu skema
                  pelatihan dalam Pelatihan Intensif dan Sertifikasi (Daring)
                  yang berbasis Standar Kompetensi Kerja Nasional Indonesia
                  (SKKNI) dengan skema Intermediate Multimedia Designer. Peserta
                  pelatihan Intermediate Multimedia Designer akan mampu membuat
                  rancangan desain visual berbasis multimedia linear maupun
                  interaktif dan membuat prototype interaktif untuk kebutuhan
                  klien. Di akhir pelatihan peserta akan mengikuti uji
                  kompetensi dan sertifikasi Intermediate Multimedia Designer,
                  bagi yang dinyatakan kompeten akan mendapatkan Sertifikat
                  Kompetensi Intermediate Multimedia Designer dari BNSP.
                  Pelatihan akan dilaksanakan secara daring (online) kurang
                  lebih 6 (enam) minggu dengan pengantar live session dalam
                  Bahasa Indonesia. Peserta akan mendapatkan fasilitas secara
                  gratis, diantaranya: Materi pelatihan Penggantian pulsa/biaya
                  komunikasi Sertifikat Keikutsertaan (Completion) dari
                  Kementerian Kominfo bagi peserta yang menyelesaikan pelatihan
                  hingga akhir Kesempatan untuk mengikuti Uji Kompetensi
                  (Sertifikasi) bagi peserta yang menyelesaikan pelatihan hingga
                  akhir dan Sertifikat Kompetensi bagi yang dinyatakan Kompeten
                  Kesempatan untuk mengikuti program pasca pelatihan (pelatihan
                  pengembangan soft skills) Prospect Career pelatihan ini
                  diantaranya: Multimedia Designer in web developer industry
                  Multimedia Designer in Software Developer Industry Multimedia
                  Designer in Apps developer industry Multimedia Designer in
                  game developer Multimedia Designer in private sector
                  Spesifikasi Laptop yang disarankan untuk disiapkan oleh
                  peserta pelatihan: RAM minimal 4 GB (disarankan 8 GB) Storage
                  minimal sebesar 500 GB Laptop dengan processor core i5
                  32/64-bit Laptop dengan Operating System Windows 7, 8, 10,
                  Linux, atau MAC OSX Laptop dengan konektivitas WiFi dan
                  memiliki Webcam Akses Internet Dedicated 128 kbps per peserta
                  per perangkat Bagi calon peserta penyandang disabilitas dapat
                  mendaftar pelatihan dengan menyediakan sarana dan prasarana
                  pendukung pelatihan secara mandiri.
                </Card.Body>
              </Card>
              <Row>
                <Col md={12}></Col>
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
              <Col>tes tes</Col>
            </Col>
          </Row>
        </Card>
      </Col>
      {/* <Administrasi /> */}
    </PesertaWrapper>
  );
}
