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
      <div className="container-fluid py-5" style={{ padding: "0px 30px" }}>
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
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
