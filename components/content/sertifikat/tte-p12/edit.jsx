import React, { useState, useRef, useEffect } from "react";
import PageWrapper from "../../../wrapper/page.wrapper";
import { Card, Form, Col, Row, Button } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import { SweatAlert } from "../../../../utils/middleware/helper/index";
import axios from "axios";
export default function EditTTEP12({ setUbah, data }) {
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [fileUpload, setFileUpload] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const [fileName, setFileName] = useState("");
  const [filePreview, setFilePreview] = useState("");

  const onChangeFile = (e) => {
    const type = ["application/x-pkcs12"];
    if (e.target.files[0]) {
      if (type.includes(e.target.files[0].type)) {
        if (e.target.files[0].size > 5000000) {
          e.target.value = null;
          Swal.fire("Oops !", "Gambar maksimal 5 MB.", "error");
        } else {
          setFileUpload(e.target.files[0]);
          // console.log(e.target.files[0]);
          // const reader = new FileReader();
          // reader.onload = () => {
          //   if (reader.readyState === 2) {
          //     setFileUpload(reader.result);
          //   }
          // };
          // reader.readAsDataURL(e.target.files[0]);
          // setFilePreview(e.target.files[0]);
          setFileName(e.target.files[0].name);
        }
      } else {
        e.target.value = null;
        Swal.fire(
          "Gagal !",
          "Data yang bisa dimasukkan hanya berupa data P12",
          "error"
        );
      }
    }
  };

  const handleSubmit = async (name, position, password, fileUpload) => {
    // setUbah(false);
    // if (true) {
    // } else {
    //   SweatAlert(
    //     "File p12 Tidak Sesuai",
    //     "Maaf, file yang diunggah terdapat perbedaan. Pastikan file yang Anda unggah sudah sesuai dengan ketentuan",
    //     "error"
    //   );
    // }
    const formData = new FormData();

    formData.append("name", name);
    formData.append("password", password);
    formData.append("position", position);
    formData.append("p12", fileUpload);

    // console.log(fileUpload, "ini file upload");
    const link = `http://192.168.1.78:8000/api/tte-p12/store`;
    const body = {
      name,
      position,
      password,
      p12: fileUpload,
    };
    const test = axios.post(link, formData);
  };

  return (
    <Card>
      <Card.Title className="mx-10 my-8">
        <p>
          <h1 className="fz-24">TTE P12</h1>
        </p>
        <p style={{ color: "#6C6C6C" }}>
          Anda belum memiliki file p12, silahkan unggah file sesuai dengan
          ketentuan
        </p>
      </Card.Title>
      <hr className="p-0 m-0" />
      <Card.Body>
        <Row className=" fz-16">
          <Col>
            <Form>
              <Form.Group className="mb-8 text-capitalize">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nama"
                  onChange={(e) => setName(e.target.value)}
                />
                {simpleValidator.current.message("nama", name, "required", {
                  className: "text-danger",
                })}
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <Form>
              <Form.Group className="mb-8 text-capitalize">
                <Form.Label>Jabatan</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Jabatan"
                  onChange={(e) => setPosition(e.target.value)}
                />
                {simpleValidator.current.message(
                  "Jabatan",
                  position,
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form>
              <Form.Group className="mb-8 text-capitalize">
                <Form.Label>Unggah File</Form.Label>
                <div className="d-flex">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      name="question_image"
                      onChange={onChangeFile}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("file")
                      }
                    />
                    <label
                      className="custom-file-label text-truncate"
                      htmlFor="customFile"
                    >
                      {fileName}
                    </label>
                    <label style={{ marginTop: "15px" }}>
                      {simpleValidator.current.message(
                        "file",
                        fileUpload,
                        fileUpload === null ? "required" : "",
                        {
                          className: "text-danger",
                        }
                      )}
                    </label>
                  </div>
                </div>
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <Form>
              <Form.Group className="mb-8 text-capitalize">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type={!hidePassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!hidePassword ? (
                  <i
                    className="ri-eye-fill right-center-absolute cursor-pointer mr-5"
                    style={{ right: "10px" }}
                    onClick={() => setHidePassword(!hidePassword)}
                  />
                ) : (
                  <i
                    className="ri-eye-off-fill right-center-absolute cursor-pointer mr-5"
                    style={{ right: "10px" }}
                    onClick={() => setHidePassword(!hidePassword)}
                  />
                )}
                {simpleValidator.current.message("nama", name, "required", {
                  className: "text-danger",
                })}
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <Button
            className="rounded-full px-10 py-4"
            variant="primary"
            onClick={() => {
              handleSubmit(name, position, password, fileUpload);
            }}
          >
            Simpan
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
