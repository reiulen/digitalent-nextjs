import React from "react";
import { Row, Col } from "react-bootstrap";

const Pekerjaan = () => {
  return (
    <>
      <div className="mt-5 pekerjaan">
        <h3 className="font-weight-bolder mb-5">Pekerjaan</h3>
        <Row>
          <Col md={12}>
            <p className="text-neutral-body my-1">Status Pekerjaan</p>
            <p>Bekerja</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Pekerjaan</p>
            <p>Wiraswasta</p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">
              Perusahaan / Institusi Tempat Kerja
            </p>
            <p>Shoope</p>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <p className="text-neutral-body my-1">Penghasilan</p>
            <p>50.000.000</p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Pekerjaan;
