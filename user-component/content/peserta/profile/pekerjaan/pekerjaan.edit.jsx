import React, { useState, useRef } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import Select from "react-select";
import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import style from "../style.module.css";

const PekerjaanEdit = ({ funcViewEdit }) => {
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const [statusPekerjaan, setStatusPekerjaan] = useState({
    value: "0",
    label: "Bisa",
  });
  const [pekerjaan, setPekerjaan] = useState("Ojol");
  const [perusahaan, setPerusahaan] = useState("teknologi");
  const [penghasilan, setPenghasilan] = useState("121938918933");
  const [sekolah, setSekolah] = useState("0979898989");
  const [tahunMasuk, setTahunMasuk] = useState("");

  const optionsStatusPekerjaan = [
    { value: "0", label: "Bisa" },
    { value: "1", label: "Tidak Bisa" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      const data = {
        statusPekerjaan: statusPekerjaan.valuie,
        pekerjaan,
        perusahaan,
        penghasilan,
        sekolah,
        tahunMasuk,
      };
      console.log(data);
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi data dengan benar !",
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className="informasi-pribadi">
          <h3 className="font-weight-bolder mb-5">Pekerjaan</h3>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Status Pekerjaan</Form.Label>
            <Select
              options={optionsStatusPekerjaan}
              defaultValue={statusPekerjaan}
              onChange={(e) =>
                setStatusPekerjaan({ label: e.label, value: e.value })
              }
              onBlur={() =>
                simpleValidator.current.showMessageFor("status pekerjaan")
              }
            />
            {simpleValidator.current.message(
              "status pekerjaan",
              statusPekerjaan,
              "required",
              {
                className: "text-danger",
              }
            )}
          </Form.Group>
        </div>
        <div className="kontak-darurat mt-6">
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Pekerjaan</Form.Label>
                <Form.Control
                  placeholder="Silahkan Masukan Pekerjaan"
                  value={pekerjaan}
                  onChange={(e) => setPekerjaan(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("pekerjaan")
                  }
                />
                {simpleValidator.current.message(
                  "pekerjaan",
                  pekerjaan,
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Perusahaan / Institut Tempat Bekerja</Form.Label>
                <Form.Control
                  placeholder="Silahkan Masukan Perusahaan"
                  value={perusahaan}
                  onChange={(e) => setPerusahaan(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("perusahaan")
                  }
                />
                {simpleValidator.current.message(
                  "perusahaan",
                  perusahaan,
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Penghasilan</Form.Label>
            <Form.Control
              placeholder="Silahkan Masukan Penghasilan"
              value={penghasilan}
              onChange={(e) => setPenghasilan(e.target.value)}
              onBlur={() =>
                simpleValidator.current.showMessageFor("penghasilan")
              }
            />
            {simpleValidator.current.message(
              "penghasilan",
              penghasilan,
              "required",
              {
                className: "text-danger",
              }
            )}
          </Form.Group>
        </div>
        <div className="unggah-berkas-pribadi mt-6">
          <h3 className="font-weight-bolder">Status Pelajar Mahasiswa</h3>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Sekolah / Perguruan Tinggi</Form.Label>
                <Form.Control
                  placeholder="Silahkan Masukan Sekolah"
                  value={sekolah}
                  onChange={(e) => setSekolah(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("sekolah")
                  }
                />
                {simpleValidator.current.message(
                  "sekolah",
                  sekolah,
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Tahun Masuk</Form.Label>
                <Form.Control
                  placeholder="Silahkan Masukan Tahun Masuk"
                  value={tahunMasuk}
                  onChange={(e) => setTahunMasuk(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("tahun masuk")
                  }
                />
                {simpleValidator.current.message(
                  "tahun masuk",
                  tahunMasuk,
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Col>
          </Row>
        </div>
        <div className="button-aksi mt-5 float-right">
          <Button
            className={`${style.button_profile_batal} rounded-xl mr-2`}
            type="button"
            onClick={() => funcViewEdit(false)}
          >
            Batal
          </Button>
          <Button
            className={`${style.button_profile_simpan} rounded-xl`}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};

export default PekerjaanEdit;
