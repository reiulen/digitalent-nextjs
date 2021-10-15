import React, { useState } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import Swal from "sweetalert2";

const FormKomitmen = ({ propsTitle, propsForm, funcView }) => {
  const [menyatakan, setMenyatakan] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    if (menyatakan) {
      const data = {
        komitmen: menyatakan ? "1" : "0",
        form_pendaftaran: propsForm,
      };
      console.log(data);
      funcView(3);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Komitmen Harus Diisi !",
      });
    }
  };
  return (
    <>
      <Card.Body>
        <Form onSubmit={onSubmit}>
          <div className="form-komitmen">
            <h3 className="font-weight-bolder pb-5 pt-4">Form Komitmen</h3>
            <Row>
              <Col md={6}>
                <p className="text-neutral-body my-1">Nama Lengkap</p>
                <p>Lala Racing</p>
              </Col>
              <Col md={6}>
                <p className="text-neutral-body my-1">Email</p>
                <p>Email</p>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <p className="text-neutral-body my-1">NIK</p>
                <p>89787890989798</p>
              </Col>
              <Col md={6}>
                <p className="text-neutral-body my-1">Nomor Handphone</p>
                <p>0877976776787</p>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <p className="text-neutral-body my-1">Tempat Lahir</p>
                <p>Ciamis</p>
              </Col>
              <Col md={6}>
                <p className="text-neutral-body my-1">Tanggal Lahir</p>
                <p>12 Maret 2021</p>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <p className="text-neutral-body my-1">Alamat Domisili</p>
                <p>
                  Jl. Almuwahiddin Kp. Kaum Kidul Desa Karang Tengah No. 1 Depok
                  Jawabarat
                </p>
              </Col>
            </Row>
          </div>

          <div className="program-keahlian">
            <h3 className="font-weight-bolder pb-5 pt-4">Program Keahlian</h3>
            <Row>
              <Col md={6}>
                <p className="text-neutral-body my-1">Akademi</p>
                <p>FGA</p>
              </Col>
              <Col md={6}>
                <p className="text-neutral-body my-1">Tama</p>
                <p>Temacontoh</p>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <p className="text-neutral-body my-1">Pelatihan</p>
                <p>UI/UX Design</p>
              </Col>
              <Col md={6}>
                <p className="text-neutral-body my-1">Mitra</p>
                <p>Shoope</p>
              </Col>
            </Row>
          </div>

          <div className="menyatakan">
            <h3 className="font-weight-bolder pb-5 pt-4">Menyatakan</h3>
            <Row>
              <Col md={12}>
                <p>
                  1. Bersedia mengikuti seluruh tahapan pelatihan sejak awal
                  hingga selesai; <br /> 2. Bersedia menjadi calon Penerima
                  Bantuan Pemerintah Digital Talent Scholarship Tahun 2021;{" "}
                  <br /> 3. Bersedia memenuhi persyaratan administratif serta
                  Syarat dan Ketentuan yang berlaku; <br /> 4. Bersedia memenuhi
                  Kewajiban dan Tata Tertib sebagai peserta pelatihan;
                </p>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className="form-group row mb-4">
                  <div className="col-sm-6">
                    <div className="d-flex flex-row  align-items-start pt-2">
                      <div className="form-check form-check-inline pt-1">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={menyatakan}
                          value={menyatakan}
                          onClick={() => setMenyatakan(!menyatakan)}
                        />
                      </div>
                      <h6 className="form-weight-bolder">
                        Telah Menyatakan Menyetujui dengan sebenarnya secara
                        sadar dan tanpa paksaan dan telah menerima segala hak
                        yang telah disetujui
                      </h6>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <Button
            variant="transparent"
            className="btn-rounded-full mt-3 float-right bg-blue-primary text-white"
            size="sm"
            type="submit"
          >
            Daftar
          </Button>
        </Form>
      </Card.Body>
    </>
  );
};

export default FormKomitmen;
