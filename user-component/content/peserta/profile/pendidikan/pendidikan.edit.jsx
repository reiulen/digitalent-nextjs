import React, { useRef, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Select from "react-select";
import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";

const PendidikanEdit = () => {
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const [jengjangPendidikan, setJenjangPendidikan] = useState({
    value: "0",
    label: "S1",
  });
  const [asalSekolah, setAsalSekolah] = useState({
    value: "0",
    label: "SMP",
  });
  const [lainya, setLainya] = useState("");
  const [programStudi, setProgramStudi] = useState("");
  const [ipk, setIpk] = useState("");
  const [tahunMasuk, setTahunMasuk] = useState("");

  const [ijazahName, setIjazahName] = useState("Belum ada file");
  const [ijazah, setIjazah] = useState("");
  const [ijazahPreview, setIjazahPreview] = useState("");

  const optionsJenjangPendidikan = [
    { value: "0", label: "S1" },
    { value: "1", label: "S2" },
  ];
  const optionsAsalSekolah = [
    { value: "0", label: "SMP" },
    { value: "1", label: "SMA" },
  ];

  const onChangeIjazah = (e) => {
    const type = ["image/jpg", "application/pdf"];
    if (e.target.files[0]) {
      if (type.includes(e.target.files[0].type)) {
        if (e.target.files[0].size > 5000000) {
          e.target.value = null;
          Swal.fire("Oops !", "Gambar maksimal 5 MB.", "error");
        } else {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              setIjazah(reader.result);
            }
          };
          reader.readAsDataURL(e.target.files[0]);
          setIjazahPreview(e.target.files[0]);
          setIjazahName(e.target.files[0].name);
        }
      } else {
        e.target.value = null;
        Swal.fire(
          "Oops !",
          "Data yang bisa dimasukkan hanya berupa data jpg atau pdf.",
          "error"
        );
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      const data = {
        jengjangPendidikan,
        asalSekolah,
        lainya,
        programStudi,
        ipk,
        tahunMasuk,
        ijazah,
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
          <h3 className="font-weight-bolder mb-5">Pendidikan Terakhir</h3>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Jenjang Pendidikan</Form.Label>
            <Select
              placeholder="Silahkan Pilih Jenjang Pendidikan"
              options={optionsJenjangPendidikan}
              defaultValue={jengjangPendidikan}
              onChange={(e) =>
                setJenjangPendidikan({ label: e.label, value: e.value })
              }
              onBlur={() =>
                simpleValidator.current.showMessageFor("jenjang pendidikan")
              }
            />
            {simpleValidator.current.message(
              "jenjang pendidikan",
              jengjangPendidikan,
              "required",
              {
                className: "text-danger",
              }
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Asal Sekolah / Perguruan Tinggi</Form.Label>
            <Select
              placeholder="Silahkan Pilih Asal Sekolah / Perguruan Tinggi"
              options={optionsAsalSekolah}
              defaultValue={asalSekolah}
              onChange={(e) =>
                setAsalSekolah({ label: e.label, value: e.value })
              }
              onBlur={() =>
                simpleValidator.current.showMessageFor("jenjang pendidikan")
              }
            />
            {simpleValidator.current.message(
              "jenjang pendidikan",
              jengjangPendidikan,
              "required",
              {
                className: "text-danger",
              }
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Lainnya ( Sekolah / PT)</Form.Label>
            <Form.Control
              placeholder="Silahkan Masukan Lainnya ( Sekolah / PT)"
              value={lainya}
              onChange={(e) => setLainya(e.target.value)}
              onBlur={() =>
                simpleValidator.current.showMessageFor("lainya ( sekolah/ pt )")
              }
            />
            {simpleValidator.current.message(
              "lainya ( sekolah/ pt )",
              lainya,
              "required",
              {
                className: "text-danger",
              }
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Program Studi</Form.Label>
            <Form.Control
              placeholder="Silahkan Masukan Program Studi"
              value={programStudi}
              onChange={(e) => setProgramStudi(e.target.value)}
              onBlur={() =>
                simpleValidator.current.showMessageFor("program studi")
              }
            />
            {simpleValidator.current.message(
              "program studi",
              programStudi,
              "required",
              {
                className: "text-danger",
              }
            )}
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col} md={6} controlId="formGridIpk">
              <Form.Label>IPK</Form.Label>
              <Form.Control
                type="text"
                placeholder="Silahkan Masukan IPK"
                value={ipk}
                onChange={(e) => setIpk(e.target.value)}
                onBlur={() => simpleValidator.current.showMessageFor("ipk")}
              />
              {simpleValidator.current.message("ipk", ipk, "required|integer", {
                className: "text-danger",
              })}
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="formGridTahun">
              <Form.Label>Tahun Masuk</Form.Label>
              <Form.Control
                type="date"
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
          </Row>
          <div className="form-group">
            <label className="col-form-label">Unggah Ijazah</label>
            <div className="d-flex">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  name="question_image"
                  accept="image/jpg ,application/pdf"
                  onChange={onChangeIjazah}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("ijazah")
                  }
                />
                <label className="custom-file-label" htmlFor="customFile">
                  {ijazahName}
                </label>
                <label style={{ marginTop: "15px" }}>
                  {simpleValidator.current.message(
                    "ijazah",
                    ijazah,
                    "required",
                    {
                      className: "text-danger",
                    }
                  )}
                </label>
              </div>
            </div>
            <small className="text-muted">
              *JPG/PDF (Maksimal ukuran file 5 MB)
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

export default PendidikanEdit;
