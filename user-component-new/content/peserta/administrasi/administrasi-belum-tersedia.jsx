import React, { useState, useEffect } from "react";
import { Card, Col, Row, Badge, Button } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import style from "./style.module.css";
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
            className="d-flex justify-content-center font-weight-bolder mt-15 m-0 p-0"
            style={{ fontSize: "24px" }}
          >
            Halaman Belum Tersedia
          </p>
          <div className="d-flex justify-content-center m-0 p-0">
            <Button
              className="btn-rounded-full font-weight-bold btn-block d-flex justify-content-center mt-10 w-50"
              style={{
                height: "40px",
                fontFamily: "poppins",
                fontSize: "14px",
              }}
              onClick={() => {
                router.push(`/peserta/riwayat-pelatihan`);
              }}
            >
              Cek Status
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
