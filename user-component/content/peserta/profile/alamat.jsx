import React from "react";
import { Row, Col } from "react-bootstrap";

const Alamat = () => {
  return (
    <>
      <div className="mt-5 alamat">
        <h3 className="font-weight-bolder mb-5">Alamat</h3>
        <Row>
          <Col md={12}>
            <p className="text-neutral-body my-1">Alamat (Sesuai KTP)</p>
            <p>
              Jl. Almuwahiddin Kp. Kaum Kidul Desa Karang Tengah No. 1 Depok
              Jawabarat
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Provinsi</p>
            <p>Jawa Barat</p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">Kota</p>
            <p>Ciamis</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Kecamatan</p>
            <p>Dubai</p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">Kode Pos</p>
            <p>44576</p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p className="text-neutral-body my-1">
              Alamat Domisili (Sesuai KTP)
            </p>
            <p>
              Jl. Almuwahiddin Kp. Kaum Kidul Desa Karang Tengah No. 1 Depok
              Jawabarat
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Provinsi</p>
            <p>Jawa Barat</p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">Kota</p>
            <p>Ciamis</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Kecamatan</p>
            <p>Dubai</p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">Kode Pos</p>
            <p>44576</p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Alamat;
