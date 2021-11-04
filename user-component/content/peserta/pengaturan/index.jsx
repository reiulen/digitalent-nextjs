import React, { useState, useEffect, useRef } from "react";
import { Card, Col, Row, Badge, Button, Modal, Form } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";
import style from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import OtpInput from "react-otp-input";

export default function SeleksiAdministrasi({ session }) {
  const { error: errorDataPribadi, dataPribadi } = useSelector(
    (state) => state.getDataPribadi
  );
  const [email, setEmail] = useState("");
  const [showUbahEmailModal, setShowUbahEmailModal] = useState(false);
  const handleClose = () => setShowUbahEmailModal(false);
  const handleShowUbahEmail = () => setShowUbahEmailModal(true);

  const [otp, setOtp] = useState();

  const [showUbahEmailModalOtp, setShowUbahEmailModalOtp] = useState(false);
  const handleCloseOtp = () => setShowUbahEmailModalOtp(false);
  const handleShowUbahEmailOtp = () => setShowUbahEmailModalOtp(true);
  const simpleValidator = useRef(
    new SimpleReactValidator({
      locale: "id",
      messages: {
        email: "Invalid Email",
        required: "Email Tidak Boleh Kosong",
      },
    })
  );
  const handleOtpEmail = (el, i) => {
    if (isNaN(el.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === i ? el.value : d))]);

    //Focus next input
    if (el.nextSibling) {
      el.nextSibling.focus();
    }
  };

  const handlePostUbahEmail = () => {
    handleShowUbahEmailOtp();
    if (simpleValidator.current.allValid()) {
      console.log("disini");
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
    }
  };
  const [showResendButton, setShowResendButton] = useState(false);
  const [count, setCount] = useState(5);
  useEffect(() => {
    if (showUbahEmailModalOtp) {
      if (count > 0) {
        const secondsLeft = setInterval(() => {
          setCount((c) => c - 1);
        }, 1000);
        return () => clearInterval(secondsLeft);
      } else {
        setShowResendButton(true);
      }
    }
  }, [count, showUbahEmailModalOtp]);
  const [, forceUpdate] = useState(0);

  return (
    <PesertaWrapper>
      <Col lg={12} className="px-0">
        <Card
          className="card-custom card-stretch gutter-b p-0"
          style={{ height: "602px" }}
        >
          <Card.Body className="p-10">
            <div>
              <h1 className="font-weight-bolder">Kontak</h1>
              <br />
              <div
                className={`d-flex align-item-center ${style.text14}`}
                style={{ height: "24px" }}
              >
                Email
                {dataPribadi.email_verifikasi ? (
                  <div
                    className={`rounded-circle d-flex align-items-center justify-content-center mx-5 ${style.iconBackgroundSuccess}`}
                  >
                    <i class="ri-check-fill" style={{ color: "#00996A" }}></i>
                  </div>
                ) : (
                  <div
                    className={`rounded-full p-4 d-flex align-items-center justify-content-center mx-5 ${style.iconBackgroundFail}`}
                  >
                    Unverified
                  </div>
                )}
              </div>
              <div className="mt-5">
                {dataPribadi.email || "-"}
                <span className="ml-5">
                  <button
                    className={`text-primary ${style.btn_ubah}`}
                    onClick={handleShowUbahEmail}
                  >
                    Ubah
                  </button>
                </span>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
      {/* Modal Email */}

      <Modal
        show={showUbahEmailModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>Ubah Email</Modal.Title>
          <Modal.Title
            className="d-flex align-items-center"
            onClick={handleClose}
          >
            <button className={`${style.btn_ubah}`}>
              <i class="ri-close-fill"></i>
            </button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label
                className="mb-3"
                style={{ fontSize: "16px", color: "#1F1F1F" }}
              >
                Email Lama
              </Form.Label>
              <Form.Control
                disabled
                type="email"
                placeholder="Enter email"
                value={dataPribadi.email}
                style={{ fontSize: "14px" }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label
                className="mb-3"
                style={{ fontSize: "16px", color: "#1F1F1F" }}
              >
                Email Baru
              </Form.Label>
              <Form.Control
                style={{ fontSize: "14px" }}
                type="email"
                placeholder="Masukan Email Baru"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {simpleValidator.current.message(
                "Email",
                email,
                "required|email",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
            Kode verifikasi akan dikirimkan melalui Email
          </Form>
          <div className="d-flex justify-content-end mt-14">
            <Button
              variant="primary"
              className="rounded-full py-4 px-8"
              style={{ fontSize: "14px" }}
              onClick={() => {
                handlePostUbahEmail();
                handleClose();
              }}
            >
              Lanjut
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showUbahEmailModalOtp}
        onHide={handleCloseOtp}
        backdrop="static"
        keyboard={false}
        centered
        size="md"
      >
        <Modal.Header>
          <Modal.Title>Verifikasi Kontak</Modal.Title>
          <Modal.Title
            className="d-flex align-items-center"
            onClick={handleCloseOtp}
          >
            <button className={`${style.btn_ubah}`}>
              <i class="ri-close-fill"></i>
            </button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="font-size-h3 text-center">Masukan Kode Verifikasi</p>
          <div className="d-flex justify-content-center text-center">
            <p style={{ fontSize: "14px" }}>
              Kode Verifikasi telah dikirim melalui E-mail ke
              <span className="font-weight-bolder mx-2">
                {dataPribadi.email}
              </span>
            </p>
          </div>
          <div>
            <OtpInput
              value={otp}
              onChange={(e) => setOtp(e)}
              numInputs={6}
              inputStyle="w-100 p-4 mx-5 my-10 form-control"
              shouldAutoFocus
              isInputNum
            ></OtpInput>
          </div>

          <div className="d-flex justify-content-between mx-5 mt-14">
            {count !== 0 ? (
              <div>
                Mohon tunggu
                <span className="mx-2 font-weight-bolder">
                  {" "}
                  {count} detik
                </span>{" "}
                untuk kirim ulang
              </div>
            ) : (
              <div>
                Belum Menerima Kode OTP?
                <button
                  className={` font-weight-bolder text-primary ${style.btn_ubah}`}
                  onClick={() => {
                    setCount(30);
                  }}
                >
                  Kirim Ulang
                </button>
              </div>
            )}
            <Button
              variant="primary"
              className="rounded-full py-4 px-8"
              style={{ fontSize: "14px" }}
              onClick={() => {
                handlePostUbahEmail();
              }}
            >
              Verifikasi
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {/* Modal Email Selesai */}
    </PesertaWrapper>
  );
}
