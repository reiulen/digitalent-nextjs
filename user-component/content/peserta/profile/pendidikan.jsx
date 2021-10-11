import React from "react";
import { Row, Col } from "react-bootstrap";

const Pendidikan = () => {
  return (
    <>
      <div className="mt-5 pendidikan">
        <h3 className="font-weight-bolder mb-5">Pendidikan Terakhir</h3>
        <Row>
          <Col md={12}>
            <p className="text-neutral-body my-1">Jenjang Pendidikan</p>
            <p>S1</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">
              Asal Sekolah / Perguruan Tinggi
            </p>
            <p>Universitas Tetangga</p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">Program Studi</p>
            <p>Teknologi Jadul</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">IPK</p>
            <p>4.5</p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">Tahun Masuk</p>
            <p>2016</p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p className="text-neutral-body my-1">Unggah Ijazah</p>
            <p>Scan Ijasah.jpg</p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Pendidikan;
