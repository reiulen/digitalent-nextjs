import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Alamat = () => {
  const { error: errorAlamat, alamat } = useSelector(
    (state) => state.dataAlamat
  );

  useEffect(() => {
    if (errorAlamat) {
      toast.error(errorAlamat);
    }
  }, [errorAlamat]);

  return (
    <>
      <div className="mt-5 alamat">
        <h3 className="font-weight-bolder mb-5">Alamat</h3>
        <Row>
          <Col md={12}>
            <p className="text-neutral-body my-1">Alamat (Sesuai KTP)</p>
            <p>{(alamat && alamat.alamat_ktp) || "-"}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Provinsi</p>
            <p>{(alamat && alamat.provinsi) || "-"}</p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">Kota</p>
            <p>{(alamat && alamat.kota) || "-"}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Kecamatan</p>
            <p>{(alamat && alamat.kecamatan) || "-"}</p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">Kode Pos</p>
            <p>{(alamat && alamat.kode_pos) || "-"}</p>
          </Col>
        </Row>
        <hr />
        <h3 className="font-weight-bolder mb-3">Alamat Domisili</h3>
        <Row>
          <Col md={12}>
            <p className="text-neutral-body my-1">
              Alamat Domisili (Sesuai KTP)
            </p>
            <p>{(alamat && alamat.alamat_domisili) || "-"}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Provinsi</p>
            <p>{(alamat && alamat.provinsi_domisili) || "-"}</p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">Kota</p>
            <p>{(alamat && alamat.kota_domisili) || "-"}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Kecamatan</p>
            <p>{(alamat && alamat.kecamatan_domisili) || "-"}</p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">Kode Pos</p>
            <p>{(alamat && alamat.kode_pos_domisili) || "-"}</p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Alamat;
