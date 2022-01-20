import React, { useState, useEffect } from "react";
import { Card, Col, Row, Badge, Button } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";

export default function SeleksiAdministrasi() {
  const router = useRouter();

  return (
    <PesertaWrapper>
      <Col lg={12} className="px-0">
        <Card
          className="card-custom card-stretch gutter-b p-0"
          style={{ height: "602px" }}
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
            className="d-flex justify-content-center"
            style={{ fontSize: "16px" }}
          >
            {/* Status pendaftaran Anda masih dalam tahap seleksi Administrasi, */}
            {/* silahkan cek berkala. */}
            Sertifikat masih dalam proses pembuatan.
          </p>
        </Card>
      </Col>
      {/* <Administrasi /> */}
    </PesertaWrapper>
  );
}
