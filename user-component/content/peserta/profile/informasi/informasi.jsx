import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const Informasi = ({ funcViewEdit }) => {
  const { error: errorDataPribadi, dataPribadi } = useSelector(
    (state) => state.getDataPribadi
  );

  return (
    <>
      <div className="informasi-pribadi">
        <h3 className="font-weight-bolder mb-5">Data Pribadi</h3>
        <Row>
          <Col md={12}>
            <p className="text-neutral-body my-1">Deskripsi Diri</p>
            <p>{(dataPribadi && dataPribadi.deskripsi) || "-"}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Nama Lengkap</p>
            <p>{(dataPribadi && dataPribadi.name) || "-"}</p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">Email</p>
            <p>{(dataPribadi && dataPribadi.email) || "-"}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Nomor Identitas (KTP)</p>
            <p>{(dataPribadi && dataPribadi.nik) || "-"}</p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">Jenis Kelamin</p>
            <p>{(dataPribadi && dataPribadi.jenis_kelamin) || "-"}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">No Handphone</p>
            <p>{(dataPribadi && dataPribadi.nomor_handphone) || "-"}</p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">Agama</p>
            <p>{(dataPribadi && dataPribadi.agama) || "-"}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Tempat Lahir</p>
            <p>{(dataPribadi && dataPribadi.tampat_lahir) || "-"}</p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">Tanggal lahir</p>
            <p>{(dataPribadi && dataPribadi.tanggal_lahir) || "-"}</p>
          </Col>
        </Row>
        <hr />
      </div>
      <div className="mt-5 kontak-darurat">
        <h3 className="font-weight-bolder mb-3">Kontak Darurat</h3>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Nama Kontak Darurat</p>
            <p>{(dataPribadi && dataPribadi.Nama_kontak_darurat) || "-"}</p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">Nomor Kontak Darurat</p>
            <p>{(dataPribadi && dataPribadi.nomor_handphone_darurat) || "-"}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Hubungan</p>
            <p>{(dataPribadi && dataPribadi.hubungan) || "-"}</p>
          </Col>
        </Row>
        <hr />
      </div>
      <div className="mt-5 berkas-darurat">
        <h3 className="font-weight-bolder mb-3">Berkas Pribadi</h3>
        <Row>
          <Col md={12}>
            <p className="text-neutral-body my-1">KTP</p>
            <p>{(dataPribadi && dataPribadi.File_ktp) || "-"}</p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p className="text-neutral-body my-1">CV</p>
            <p>CV-me.pdf</p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p className="text-neutral-body my-1">Link Portofolio</p>
            <p>google.com</p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Informasi;
