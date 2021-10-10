import React, { useState, useRef } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Select from "react-select";
import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";

const AlamatEdit = () => {
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const [sesuai, setSesuai] = useState(false);

  const [alamatKtp, setAlamatKtp] = useState("Lala depok");
  const [provinsiKtp, setProvinsiKtp] = useState({
    value: "0",
    label: "Jawa Barat",
  });
  const [kotaKtp, setKotaKtp] = useState({ value: "0", label: "Bandung" });
  const [kecamatanKtp, setKecamatanKtp] = useState("Ciamis");
  const [kodePosKtp, setKodePosKtp] = useState("78978");

  const [alamatDomisili, setAlamatDomisili] = useState();
  const [provinsiDomisili, setProvinsiDomisili] = useState({
    value: "",
    label: "",
  });
  const [kotaDomisili, setKotaDomisili] = useState({
    value: "",
    label: "",
  });
  const [kecamatanDomisili, setKecamatanDomisili] = useState();
  const [kodePosDomisili, setKodePosDomisili] = useState();

  const optionsProvinsi = [
    { value: "0", label: "Jawa Barat" },
    { value: "1", label: "Jakarta" },
  ];
  const optionsKota = [
    { value: "0", label: "Bandung" },
    { value: "1", label: "Jakarta" },
  ];

  const handleSesuaiKtp = (val) => {
    setSesuai(val);
    if (val) {
      setAlamatDomisili(alamatKtp);
      setProvinsiDomisili(provinsiKtp);
      setKecamatanDomisili(kecamatanKtp);
      setKodePosDomisili(kodePosKtp);
      setKotaDomisili(kotaKtp);
    } else {
      setAlamatDomisili("");
      setProvinsiDomisili({
        value: "",
        label: "",
      });
      setKotaDomisili({
        value: "",
        label: "",
      });
      setKecamatanDomisili("");
      setKodePosDomisili("");
    }
  };

  const handleViewDomisili = () => {
    if (sesuai) {
      return (
        <>
          <Form.Group className="mb-3" controlId="formGridAddress1" key={1}>
            <Form.Label>Alamat Lengkap (Sesuai KTP)</Form.Label>
            <Form.Control
              placeholder="Silahkan Masukkan Alamat Lengkap"
              value={alamatDomisili}
              onChange={(e) => setAlamatDomisili(e.target.value)}
              onBlur={() =>
                simpleValidator.current.showMessageFor("alamat domisili")
              }
            />
            {simpleValidator.current.message(
              "alamat domisili",
              alamatDomisili,
              "required",
              {
                className: "text-danger",
              }
            )}
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col} md={6} controlId="formGridEmail">
              <Form.Label>Provinsi</Form.Label>
              <Select
                key={1}
                placeholder="Silahkan Pilih Provinsi"
                options={optionsProvinsi}
                defaultValue={provinsiDomisili}
                onChange={(e) =>
                  setProvinsiDomisili({ label: e.label, value: e.value })
                }
                onBlur={() =>
                  simpleValidator.current.showMessageFor("provinsi domisili")
                }
              />
              {simpleValidator.current.message(
                "provinsi domisili",
                provinsiDomisili.value,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="formGridKelamin">
              <Form.Label>Kota / Kabupaten</Form.Label>
              <Select
                key={1}
                placeholder="Silahkan Pilih Kota / Kabupaten"
                options={optionsKota}
                defaultValue={kotaDomisili}
                onChange={(e) =>
                  setKotaDomisili({ label: e.label, value: e.value })
                }
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kota domisili")
                }
              />
              {simpleValidator.current.message(
                "kota domisili",
                kotaDomisili.value,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md={6} controlId="formGridNik">
              <Form.Label>Kecamatan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Silahkan Masukkan Kecamatan"
                value={kecamatanDomisili}
                onChange={(e) => setKecamatanDomisili(e.target.value)}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kecamatan domisili")
                }
              />
              {simpleValidator.current.message(
                "kecamatan domisili",
                kecamatanDomisili,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>

            <Form.Group as={Col} md={6} controlId="formGridPassword">
              <Form.Label>Kode Pos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Silahkan Masukkan Kode Pos"
                value={kodePosDomisili}
                onChange={(e) => setKodePosDomisili(e.target.value)}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kode pos domisili")
                }
              />
              {simpleValidator.current.message(
                "kode pos domisili",
                kodePosDomisili,
                "required|integer",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
          </Row>
        </>
      );
    } else {
      return (
        <>
          <Form.Group className="mb-3" controlId="formGridAddress2" key={2}>
            <Form.Label>Alamat Lengkap (Sesuai KTP)</Form.Label>
            <Form.Control
              placeholder="Silahkan Masukkan Alamat Lengkap"
              value={alamatDomisili}
              onChange={(e) => setAlamatDomisili(e.target.value)}
              onBlur={() =>
                simpleValidator.current.showMessageFor("alamat domisili")
              }
            />
            {simpleValidator.current.message(
              "alamat domisili",
              alamatDomisili,
              "required",
              {
                className: "text-danger",
              }
            )}
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col} md={6} controlId="formGridEmail">
              <Form.Label>Provinsi</Form.Label>
              <Select
                key={2}
                placeholder="Silahkan Pilih Provinsi"
                options={optionsProvinsi}
                defaultValue={provinsiDomisili}
                onChange={(e) =>
                  setProvinsiDomisili({ label: e.label, value: e.value })
                }
                onBlur={() =>
                  simpleValidator.current.showMessageFor("provinsi domisili")
                }
              />
              {simpleValidator.current.message(
                "provinsi domisili",
                provinsiDomisili.value,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="formGridKelamin">
              <Form.Label>Kota / Kabupaten</Form.Label>
              <Select
                key={2}
                placeholder="Silahkan Pilih Kota / Kabupaten"
                options={optionsKota}
                defaultValue={kotaDomisili}
                onChange={(e) =>
                  setKotaDomisili({ label: e.label, value: e.value })
                }
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kota domisili")
                }
              />
              {simpleValidator.current.message(
                "kota domisili",
                kotaDomisili.value,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md={6} controlId="formGridNik">
              <Form.Label>Kecamatan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Silahkan Masukkan Kecamatan"
                value={kecamatanDomisili}
                onChange={(e) => setKecamatanDomisili(e.target.value)}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kecamatan domisili")
                }
              />
              {simpleValidator.current.message(
                "kecamatan domisili",
                kecamatanDomisili,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>

            <Form.Group as={Col} md={6} controlId="formGridPassword">
              <Form.Label>Kode Pos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Silahkan Masukkan Kode Pos"
                value={kodePosDomisili}
                onChange={(e) => setKodePosDomisili(e.target.value)}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kode pos domisili")
                }
              />
              {simpleValidator.current.message(
                "kode pos domisili",
                kodePosDomisili,
                "required|integer",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
          </Row>
        </>
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      const data = {
        alamatKtp,
        provinsi: provinsiKtp.value,
        kodePosKtp,
        kecamatanKtp,
        kota: kotaKtp.value,
        alamatDomisili,
        provinsiDomisili: provinsiDomisili.value,
        kotaDomisili: kotaDomisili.value,
        kecamatanDomisili,
        kodePosDomisili,
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
          <h3 className="font-weight-bolder mb-7">Alamat KTP</h3>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Alamat Lengkap (Sesuai KTP)</Form.Label>
            <Form.Control
              placeholder="Silahkan Masukkan Alamat Lengkap"
              value={alamatKtp}
              onChange={(e) => setAlamatKtp(e.target.value)}
              onBlur={() =>
                simpleValidator.current.showMessageFor("alamat lengkap ktp")
              }
            />
            {simpleValidator.current.message(
              "alamat lengkap ktp",
              alamatKtp,
              "required",
              {
                className: "text-danger",
              }
            )}
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col} md={6} controlId="formGridEmail">
              <Form.Label>Provinsi</Form.Label>
              <Select
                placeholder="Silahkan Pilih Provinsi"
                options={optionsProvinsi}
                defaultValue={provinsiKtp}
                onChange={(e) =>
                  setProvinsiKtp({ label: e.label, value: e.value })
                }
                onBlur={() =>
                  simpleValidator.current.showMessageFor("provinsi ktp")
                }
              />
              {simpleValidator.current.message(
                "provinsi ktp",
                provinsiKtp.value,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="formGridKelamin">
              <Form.Label>Kota / Kabupaten</Form.Label>
              <Select
                placeholder="Silahkan Pilih Kota / Kabupaten"
                options={optionsKota}
                defaultValue={kotaKtp}
                onChange={(e) => setKotaKtp({ label: e.label, value: e.value })}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kota ktp")
                }
              />
              {simpleValidator.current.message(
                "kota ktp",
                kotaKtp.value,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md={6} controlId="formGridNik">
              <Form.Label>Kecamatan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Silahkan Masukkan Kecamatan"
                value={kecamatanKtp}
                onChange={(e) => setKecamatanKtp(e.target.value)}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kecamatan ktp")
                }
              />
              {simpleValidator.current.message(
                "kecamatan ktp",
                kecamatanKtp,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>

            <Form.Group as={Col} md={6} controlId="formGridPassword">
              <Form.Label>Kode Pos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Silahkan Masukkan Kode Pos"
                value={kodePosKtp}
                onChange={(e) => setKodePosKtp(e.target.value)}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kode pos ktp")
                }
              />
              {simpleValidator.current.message(
                "kode pos ktp",
                kodePosKtp,
                "required|integer",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
          </Row>
        </div>

        <div className="alamat-domisili mt-6">
          <h3 className="font-weight-bolder">Alamat Domisili</h3>
          <Form.Group className="my-5" id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              checked={sesuai}
              value={sesuai}
              label="Sesuai KTP"
              onClick={() => handleSesuaiKtp(!sesuai)}
            />
          </Form.Group>
          {handleViewDomisili()}
        </div>

        <div className="button-aksi mt-5 float-right">
          <Button className="btn-outline-primary rounded-pill mr-3">
            Kembali
          </Button>
          <Button
            className="btn-primary-rounded-full bg-blue-primary"
            variant="transparent"
            type="submit"
          >
            Simpan
          </Button>
        </div>
      </Form>
    </>
  );
};

export default AlamatEdit;
