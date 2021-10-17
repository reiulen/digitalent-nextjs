import React, { useState, useRef } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Select from "react-select";
import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";

const InformasiEdit = () => {
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const [name, setName] = useState("Lala depok");
  const [email, setEmail] = useState("lala@gmail.com");
  const [kelamin, setKelamin] = useState({ value: "0", label: "Laki - Laki" });
  const [nik, setNik] = useState("121938918933");
  const [nomorHandphone, setNomorHandphone] = useState("0979898989");
  const [agama, setAgama] = useState("Islam");
  const [tempatLahir, setTempatLahir] = useState("dubai");
  const [tanggalLahir, setTanggalLahir] = useState(new Date());

  const [nameUrgent, setNameUrgent] = useState("Lala Lala");
  const [nomorUrgent, setNomorUrgent] = useState("087989898989");
  const [hubunganUrgent, setHubunganUrgent] = useState("Saudara");

  const [ktpName, setKtpName] = useState("Belum ada file");
  const [ktp, setKtp] = useState("");
  const [ktpPreview, setKtpPreview] = useState("");

  const optionsKelamin = [
    { value: "0", label: "Laki - Laki" },
    { value: "1", label: "Perempuan" },
  ];

  const onChangeKtp = (e) => {
    const type = ["image/jpg", "image/png", "image/jpeg", "application/pdf"];
    if (e.target.files[0]) {
      if (type.includes(e.target.files[0].type)) {
        if (e.target.files[0].size > 2000000) {
          e.target.value = null;
          Swal.fire("Oops !", "Gambar maksimal 2 MB.", "error");
        } else {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              setKtp(reader.result);
            }
          };
          reader.readAsDataURL(e.target.files[0]);
          setKtpPreview(e.target.files[0]);
          setKtpName(e.target.files[0].name);
        }
      } else {
        e.target.value = null;
        Swal.fire(
          "Oops !",
          "Data yang bisa dimasukkan hanya berupa data gambar.",
          "error"
        );
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      const data = {
        name,
        email,
        kelamin,
        nik,
        nomorHandphone,
        agama,
        tempatLahir,
        tanggalLahir,
        nameUrgent,
        nomorUrgent,
        hubunganUrgent,
        ktp,
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
          <h3 className="font-weight-bolder mb-5">Informasi Pribadi</h3>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Nama Lengkap</Form.Label>
            <Form.Control
              placeholder="Masukan Nama Lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() =>
                simpleValidator.current.showMessageFor("nama lengkap")
              }
            />
            {simpleValidator.current.message("nama lengkap", name, "required", {
              className: "text-danger",
            })}
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col} md={6} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Masukan Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => simpleValidator.current.showMessageFor("email")}
              />
              {simpleValidator.current.message("email", email, "required", {
                className: "text-danger",
              })}
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="formGridKelamin">
              <Form.Label>Jenis Kelamin</Form.Label>
              <Select
                options={optionsKelamin}
                defaultValue={kelamin}
                onChange={(e) => setKelamin({ label: e.label, value: e.value })}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("jenis kelamin")
                }
              />
              {simpleValidator.current.message(
                "jenis kelamin",
                kelamin,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md={6} controlId="formGridNik">
              <Form.Label>NIK</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukan NIK"
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                onBlur={() => simpleValidator.current.showMessageFor("nik")}
              />
              {simpleValidator.current.message("nik", nik, "required|integer", {
                className: "text-danger",
              })}
            </Form.Group>

            <Form.Group as={Col} md={6} controlId="formGridPassword">
              <Form.Label>Nomor Handphone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukan Nomor Handphone"
                value={nomorHandphone}
                onChange={(e) => setNomorHandphone(e.target.value)}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("nomor handphone")
                }
              />
              {simpleValidator.current.message(
                "nomor handphone",
                nomorHandphone,
                "required|integer",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Agama</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukan Agama"
              value={agama}
              onChange={(e) => setAgama(e.target.value)}
              onBlur={() => simpleValidator.current.showMessageFor("agama")}
            />
            {simpleValidator.current.message("agama", agama, "required", {
              className: "text-danger",
            })}
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col} md={6} controlId="formGridEmail">
              <Form.Label>Tempat Lahir</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukan Tempat Lahir"
                value={tempatLahir}
                onChange={(e) => setTempatLahir(e.target.value)}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("tempat lahir")
                }
              />
              {simpleValidator.current.message(
                "templat lahir",
                tempatLahir,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>

            <Form.Group as={Col} md={6} controlId="formGridPassword">
              <Form.Label>Tanggal lahir</Form.Label>
              <Form.Control
                type="date"
                value={tanggalLahir}
                onChange={(e) => setTanggalLahir(e.target.value)}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("tanggal lahir")
                }
              />
              {simpleValidator.current.message(
                "tanggal lahir",
                tanggalLahir,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
          </Row>
        </div>
        <div className="kontak-darurat mt-6">
          <h3 className="font-weight-bolder mb-5">Kontak Darurat</h3>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Nama Lengkap</Form.Label>
            <Form.Control
              placeholder="Masukan Nama Lengkap"
              value={nameUrgent}
              onChange={(e) => setNameUrgent(e.target.value)}
              onBlur={() =>
                simpleValidator.current.showMessageFor("nama lengkap darurat")
              }
            />
            {simpleValidator.current.message(
              "nama lengkap darurat",
              nameUrgent,
              "required",
              {
                className: "text-danger",
              }
            )}
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col} md={6} controlId="formGridEmail">
              <Form.Label>Nomor Handphone</Form.Label>
              <Form.Control
                type="number"
                placeholder="Masukan Nomor Handphone"
                value={nomorUrgent}
                onChange={(e) => setNomorUrgent(e.target.value)}
                onBlur={() =>
                  simpleValidator.current.showMessageFor(
                    "nomor handphone darurat"
                  )
                }
              />
              {simpleValidator.current.message(
                "nomor handphone darurat",
                nomorUrgent,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>

            <Form.Group as={Col} md={6} controlId="formGridKelamin">
              <Form.Label>Hubungan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukan Hubungan"
                value={hubunganUrgent}
                onChange={(e) => setHubunganUrgent(e.target.value)}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("hubungan darurat")
                }
              />
              {simpleValidator.current.message(
                "hubungan darurat",
                hubunganUrgent,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
          </Row>
        </div>
        <div className="unggah-berkas-pribadi mt-6">
          <h3 className="font-weight-bolder">Upload Berkas Pribadi</h3>
          <div className="form-group">
            <label className="col-form-label">KTP</label>
            <div className="d-flex">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  name="question_image"
                  accept="image/png, image/jpeg , image/jpg ,application/pdf"
                  onChange={onChangeKtp}
                  onBlur={() => simpleValidator.current.showMessageFor("ktp")}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  {ktpName}
                </label>
                <label style={{ marginTop: "15px" }}>
                  {simpleValidator.current.message("ktp", ktp, "required", {
                    className: "text-danger",
                  })}
                </label>
              </div>
            </div>
            <small className="text-muted">
              Format File (.png/.jpg/.pdf) & Max 2 mb
            </small>
          </div>
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

export default InformasiEdit;
