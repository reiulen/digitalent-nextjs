import React, { useState, useEffect, useRef } from "react";
import SubHeaderComponent from "../../../components/global/Breadcrumb.component";
import { useRouter } from "next/router";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import SimpleReactValidator from "simple-react-validator";

import Sidebar from "../../../components/template/helpdesk/index";
import { helperRegexNumber } from "../../../../utils/middleware/helper";

export default function FormPengaduan() {
  const router = useRouter();
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

  const [name, setName] = useState("");
  const [handphone, setHandphone] = useState("");
  const [email, setEmail] = useState("");
  const [platform, setPlatform] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [, forceUpdate] = useState();
  const [deskripsi, setDeskripsi] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions([
      { value: "dts", label: "Digital Talent Scholarship" },
      { value: "simonas", label: "Simonas" },
      { value: "beasiswa", label: "Beasiswa" },
    ]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
    }
  };

  return (
    <Container fluid className="px-md-17 px-10 py-10 bg-white">
      <SubHeaderComponent data={[{ link: router.asPath, name: "Bantuan" }]} />
      <Sidebar>
        <h1 className={`font-weight-boldest text-blue-primary mb-15 `}>
          Formulir Pengaduan
        </h1>
        <Form className="fz-14">
          <Form.Group className="mb-8 text-capitalize">
            <Form.Label>Nama</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nama Lengkap"
              className="rounded-full"
              onChange={(e) => setName(e.target.value)}
            />
            {simpleValidator.current.message("nama", name, "required", {
              className: "text-danger",
            })}
          </Form.Group>

          <Form.Group className="mb-8 text-capitalize">
            <Form.Label>Nomor Handphone</Form.Label>
            <Form.Control
              onChange={(e) => {
                if (
                  e.target.value === "" ||
                  helperRegexNumber.test(e.target.value)
                ) {
                  setHandphone(e.target.value);
                }
              }}
              type="text"
              placeholder="08xxxxxxxxxxxx"
              className="rounded-full"
              value={handphone}
              maxLength={14}
              minLength={4}
            />
            {simpleValidator.current.message(
              "nomor handphone",
              handphone,
              "required|max:14|min:4",
              {
                className: "text-danger",
              }
            )}
          </Form.Group>
          <Form.Group className="mb-8 text-capitalize">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="ini@contoh.com"
              className="rounded-full"
            />
            {simpleValidator.current.message("Email", email, "required|email", {
              className: "text-danger",
            })}
          </Form.Group>

          <Form.Group className="mb-8 text-capitalize">
            <Form.Label>Platform</Form.Label>
            <Form.Select
              className="rounded-full form-control"
              aria-label="Default select example"
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option>Silahkan Pilih</option>
              {options.map((option, i) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </Form.Select>
            {simpleValidator.current.message("platform", platform, "required", {
              className: "text-danger",
            })}
          </Form.Group>
          <Form.Group className="mb-8">
            <Form.Label>Deskripsikan Kendala atau Pertanyaanmu</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              placeholder="Jelaskan secara detail dan terperinci"
              className="rounded-full p-5 d-flex justify-content-start align-items-start"
              style={{ height: "120px" }}
              onChange={(e) => setDeskripsi(e.target.value)}
            />
          </Form.Group>
          <div className="g-recaptcha mb-8">
            <ReCAPTCHA
              sitekey={process.env.CAPTCHA_SITE_KEY}
              onChange={setCaptcha}
              onBlur={() => simpleValidator.current.showMessageFor("Captcha")}
            />
            {simpleValidator.current.message("Captcha", captcha, "required", {
              className: "text-danger",
            })}
          </div>
          <Button
            variant="primary"
            className="btn btn-block rounded-full"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Kirim Pengaduan
          </Button>
        </Form>
      </Sidebar>
    </Container>
  );
}
