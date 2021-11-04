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

  //   START PASSWORD
  const [password, setPassword] = useState();
  const [showUbahPasswordModal, setShowUbahPasswordModal] = useState(false);
  const handleClosePasswordModal = () => setShowUbahPasswordModal(false);
  const handleShowUbahPasswordModal = () => setShowUbahPasswordModal(true);

  const [hidePassword, setHidePassword] = useState(true);

  const handlerShowPassword = (value) => {
    setHidePassword(value);
    // var input = document.getElementById("input-password");
    // if (input.type === "password") {
    //   input.type = "text";
    // } else {
    //   input.type = "password";
    // }
  };
  // END PASSWORD

  //   START EMAIL
  const [email, setEmail] = useState("");
  const [showUbahEmailModal, setShowUbahEmailModal] = useState(false);
  const handleCloseEmailModal = () => setShowUbahEmailModal(false);
  const handleShowUbahEmail = () => setShowUbahEmailModal(true);
  const [otpEmail, setOtpEmail] = useState();
  const [showUbahEmailModalOtp, setShowUbahEmailModalOtp] = useState(false);
  const handleCloseEmailOtp = () => setShowUbahEmailModalOtp(false);
  const handleShowUbahEmailOtp = () => setShowUbahEmailModalOtp(true);
  // END EMAIL
  const simpleValidator = useRef(
    new SimpleReactValidator({
      locale: "id",
      messages: {
        email: "Invalid Email",
        required: "Email Tidak Boleh Kosong",
      },
    })
  );

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
  const [count, setCount] = useState(30);
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
        <Card className="card-custom card-stretch gutter-b p-0">
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
                {dataPribadi.email_verifikasi == true && (
                  <span className="ml-5">
                    <button
                      className={`text-primary ${style.btn_ubah}`}
                      onClick={handleShowUbahEmail}
                    >
                      Ubah
                    </button>
                  </span>
                )}
              </div>
              {!dataPribadi.email_verifikasi && (
                <Button
                  variant="danger"
                  className="rounded-full mt-5 py-3 px-10"
                >
                  Verifikasi
                </Button>
              )}
            </div>
            <div className="mb-10">
              <br />
              <div
                className={`d-flex align-item-center ${style.text14}`}
                style={{ height: "24px" }}
              >
                Nomor Handphone
                {dataPribadi.handphone_verifikasi ? (
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
                {dataPribadi.nomor_handphone || "-"}
                {dataPribadi.handphone_verifikasi == true && (
                  <span className="ml-5">
                    <button
                      className={`text-primary ${style.btn_ubah}`}
                      onClick={handleShowUbahEmail}
                    >
                      Ubah
                    </button>
                  </span>
                )}
              </div>
              {dataPribadi.handphone_verifikasi == false && (
                <Button
                  variant="danger"
                  className="rounded-full mt-5 py-3 px-10"
                >
                  Verifikasi
                </Button>
              )}
            </div>
            <hr />
            <div className="mt-10">
              <h1 className="font-weight-bolder">Kontak</h1>
              <br />
              <div
                className={`d-flex align-item-center ${style.text14}`}
                style={{ height: "24px" }}
              >
                Password
              </div>
              <div className="mt-5">
                ***********
                <span className="ml-5">
                  <button
                    className={`text-primary ${style.btn_ubah}`}
                    onClick={handleShowUbahPasswordModal}
                  >
                    Ubah Password
                  </button>
                </span>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
      {/* STAR MODAL EMAIL */}
      <Modal
        show={showUbahEmailModal}
        onHide={handleCloseEmailModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>Ubah Email</Modal.Title>
          <Modal.Title
            className="d-flex align-items-center"
            onClick={handleCloseEmailModal}
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
                handleCloseEmailModal();
              }}
            >
              Lanjut
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {/* END MODAL EMAIL */}
      {/* START MODAL EMAIL OTP */}
      <Modal
        show={showUbahEmailModalOtp}
        onHide={handleCloseEmailOtp}
        backdrop="static"
        keyboard={false}
        centered
        size="md"
      >
        <Modal.Header>
          <Modal.Title>Verifikasi Kontak</Modal.Title>
          <Modal.Title
            className="d-flex align-items-center"
            onClick={handleCloseEmailOtp}
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
              value={otpEmail}
              onChange={(e) => setOtpEmail(e)}
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
      {/* END MODAL EMAIL OTP */}
      {/* STAR MODAL EMAIL */}
      <Modal
        show={showUbahPasswordModal}
        onHide={handleClosePasswordModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>Ubah Password</Modal.Title>
          <Modal.Title
            className="d-flex align-items-center"
            onClick={handleClosePasswordModal}
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
                Password Lama
              </Form.Label>
              <div className="position-relative">
                <input
                  id="input-password"
                  //   type="password"
                  type={hidePassword ? "password" : "text"}
                  className="form-control form-control-auth pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan Password"
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("Password")
                  }
                />
                {hidePassword === true ? (
                  <i
                    className="ri-eye-fill right-center-absolute cursor-pointer"
                    style={{ right: "10px" }}
                    onClick={() => {
                      setHidePassword(!hidePassword);
                      //   handlerShowPassword(false);
                    }}
                  />
                ) : (
                  <i
                    className="ri-eye-off-fill right-center-absolute cursor-pointer"
                    style={{ right: "10px" }}
                    onClick={() => {
                      setHidePassword(!hidePassword);
                      //   handlerShowPassword(false);
                    }}
                  />
                )}
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label
                className="mb-3"
                style={{ fontSize: "16px", color: "#1F1F1F" }}
              >
                Password Baru
              </Form.Label>
              <div className="position-relative">
                <input
                  id="input-password"
                  //   type="password"
                  type={hidePassword ? "password" : "text"}
                  className="form-control form-control-auth pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan Password"
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("Password")
                  }
                />
                {hidePassword === true ? (
                  <i
                    className="ri-eye-fill right-center-absolute cursor-pointer"
                    style={{ right: "10px" }}
                    onClick={() => {
                      setHidePassword(!hidePassword);
                      //   handlerShowPassword(false);
                    }}
                  />
                ) : (
                  <i
                    className="ri-eye-off-fill right-center-absolute cursor-pointer"
                    style={{ right: "10px" }}
                    onClick={() => {
                      setHidePassword(!hidePassword);
                      //   handlerShowPassword(false);
                    }}
                  />
                )}
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label
                className="mb-3"
                style={{ fontSize: "16px", color: "#1F1F1F" }}
              >
                Password Baru
              </Form.Label>
              <div className="position-relative">
                <input
                  id="input-password"
                  //   type="password"
                  type={hidePassword ? "password" : "text"}
                  className="form-control form-control-auth pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan Password"
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("Password")
                  }
                />
                {hidePassword === true ? (
                  <i
                    className="ri-eye-fill right-center-absolute cursor-pointer"
                    style={{ right: "10px" }}
                    onClick={() => {
                      setHidePassword(!hidePassword);
                      //   handlerShowPassword(false);
                    }}
                  />
                ) : (
                  <i
                    className="ri-eye-off-fill right-center-absolute cursor-pointer"
                    style={{ right: "10px" }}
                    onClick={() => {
                      setHidePassword(!hidePassword);
                      //   handlerShowPassword(false);
                    }}
                  />
                )}
              </div>
            </Form.Group>
            <div className="form-group">
              {simpleValidator.current.message(
                "Password",
                password,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </div>
          </Form>
          <div className="d-flex justify-content-end mt-14">
            <Button
              variant="primary"
              className="rounded-full py-4 px-8"
              style={{ fontSize: "14px" }}
              onClick={() => {
                handlePostUbahEmail();
                handleCloseEmailModal();
              }}
            >
              Lanjut
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {/* END MODAL PASSWORD OTP */}
    </PesertaWrapper>
  );
}
