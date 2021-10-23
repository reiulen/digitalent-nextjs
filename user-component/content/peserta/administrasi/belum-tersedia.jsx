import React, { useState, useEffect } from "react";
import { Card, Col, Row, Badge, Button } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import style from "./style.module.css";
import { useRouter } from "next/router";
import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";

export default function SeleksiAdministrasi() {
  const router = useRouter();
  const [description, setDescription] =
    useState(`Intermediate Multimedia Designer merupakan salah satu skema pelatihan dalam Pelatihan Intensif dan Sertifikasi (Daring)
  yang berbasis Standar Kompetensi Kerja Nasional Indonesia (SKKNI) dengan skema Intermediate Multimedia Designer. Peserta
  pelatihan Intermediate Multimedia Designer akan mampu membuat rancangan desain visual berbasis multimedia linear maupun
  interaktif dan membuat prototype interaktif untuk kebutuhan klien. Di akhir pelatihan peserta akan mengikuti uji
  kompetensi dan sertifikasi Intermediate Multimedia Designer, bagi yang dinyatakan kompeten akan mendapatkan Sertifikat
  Kompetensi Intermediate Multimedia Designer dari BNSP. Pelatihan akan dilaksanakan secara daring (online) kurang
  lebih 6 (enam) minggu dengan pengantar live session dalam Bahasa Indonesia. Peserta akan mendapatkan fasilitas secara
  gratis, diantaranya: Materi pelatihan Penggantian pulsa/biaya komunikasi Sertifikat Keikutsertaan (Completion) dari
  Kementerian Kominfo bagi peserta yang menyelesaikan pelatihan hingga akhir Kesempatan untuk mengikuti Uji Kompetensi
  (Sertifikasi) bagi peserta yang menyelesaikan pelatihan hingga akhir dan Sertifikat Kompetensi bagi yang dinyatakan Kompeten
  Kesempatan untuk mengikuti program pasca pelatihan (pelatihan pengembangan soft skills) Prospect Career pelatihan ini
  diantaranya: Multimedia Designer in web developer industry Multimedia Designer in Software Developer Industry Multimedia
  Designer in Apps developer industry Multimedia Designer in game developer Multimedia Designer in private sector
  Spesifikasi Laptop yang disarankan untuk disiapkan oleh peserta pelatihan: RAM minimal 4 GB (disarankan 8 GB) Storage
  minimal sebesar 500 GB Laptop dengan processor core i5 32/64-bit Laptop dengan Operating System Windows 7, 8, 10,
  Linux, atau MAC OSX Laptop dengan konektivitas WiFi dan memiliki Webcam Akses Internet Dedicated 128 kbps per peserta
  per perangkat Bagi calon peserta penyandang disabilitas dapat mendaftar pelatihan dengan menyediakan sarana dan prasarana
  pendukung pelatihan secara mandiri.`);
  const [finalDescription, setFinalDescription] = useState();

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

  return (
    <PesertaWrapper>
      <Col lg={12} className="px-0">
        <Card
          className="card-custom card-stretch gutter-b p-0"
          style={{ height: "602px", width: "1024px" }}
        >
          <div className="d-flex justify-content-center pt-10">
            <Image
              src={"/assets/media/gambar-belum-tersedia-page.svg"}
              width={525}
              height={350}
              alt="Gambar Tidak ditemukan"
              objectFit="contain"
            />
          </div>
          <p
            className="d-flex justify-content-center font-weight-bolder"
            style={{ fontSize: "24px" }}
          >
            Halaman Belum Tersedia...
          </p>
          <p
            className="d-flex justify-content-center "
            style={{ fontSize: "16px" }}
          >
            Silahkan lakukan Test Substansi terlebih dahulu...
          </p>
          <div className="d-flex justify-content-center">
            <Button
              className="btn-rounded-full font-weight-bold btn-block d-flex justify-content-center mt-5 w-50"
              style={{
                height: "40px",
                fontFamily: "poppins",
                fontSize: "14px",
              }}
            >
              Kerjakan Mid Test
              <i
                className="ri-arrow-right-s-line mr-2"
                style={{ color: "white" }}
              ></i>
            </Button>
          </div>
        </Card>
      </Col>
      {/* <Administrasi /> */}
    </PesertaWrapper>
  );
}
