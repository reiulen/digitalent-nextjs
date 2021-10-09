import React from "react";
import { Row, Col } from "react-bootstrap";

const Informasi = () => {
  return (
    <>
      <div className="mt-5 informasi-pribadi">
        <h3 className="font-weight-bolder mb-5">Informasi Pribadi</h3>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Nama Lengkap</p>
            <p>Dendy Juliano</p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">Email</p>
            <p>dendy@gmail.com</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Nomor Identitas (KTP)</p>
            <p>320983982389283</p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">Jenis Kelamin</p>
            <p>Perempuan</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">No Handphone</p>
            <p>083982389283</p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">Agama</p>
            <p>Islam</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Tempat Lahir</p>
            <p>Depok</p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">Tanggal lahir</p>
            <p>21 Januari 2021</p>
          </Col>
        </Row>
        <hr />
      </div>
      <div className="mt-5 kontak-darurat">
        <h3 className="font-weight-bolder mb-3">Kontak Darurat</h3>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Nama Kontak Darurat</p>
            <p>Dendy Juliano</p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">Nomor Kontak Darurat</p>
            <p>0812832932323</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Hubungan</p>
            <p>Pajar</p>
          </Col>
        </Row>
        <hr />
      </div>
      <div className="mt-5 berkas-darurat">
        <h3 className="font-weight-bolder mb-3">Berkas Darurat</h3>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">KTP</p>
            <p>90829398209323</p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Informasi;
