import React, { useState, useEffect, useRef } from "react";
import SubHeaderComponent from "../../../components/global/Breadcrumb.component";
import { useRouter } from "next/router";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import SimpleReactValidator from "simple-react-validator";
import style from "./helpdesk.module.css";

import Sidebar from "./sidebar/index";

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
    <Container fluid className="px-md-30 px-10 py-10 bg-white">
      <SubHeaderComponent data={[{ link: router.asPath, name: "Helpdesk" }]} />
      <Row>
        <Sidebar />
        <Col>
          <h1 className={`font-weight-boldest text-blue-primary mb-15 `}>
            Live Chat
          </h1>
        </Col>
      </Row>
    </Container>
  );
}
