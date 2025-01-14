import React, { useState, useEffect, useRef } from "react";
import { Card, Col, Button, Modal, Form } from "react-bootstrap";
import Image from "next/image";
import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";
import style from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { getDataPribadi } from "../../../../redux/actions/pelatihan/function.actions";
import { SweatAlert } from "../../../../utils/middleware/helper";
import OtpInput from "react-otp-input-rc-17";
export default function Pengaturan({ session }) {
  const { error: errorDataPribadi, dataPribadi } = useSelector(
    (state) => state.getDataPribadi
  );
  const dispatch = useDispatch();
  const config = {
    headers: {
      Authorization: `Bearer ${session.token}`,
      "content-type": "application/json",
    },
  };

  const [provider, setProvider] = useState(dataPribadi?.phone_provider || "");

  const [providerImage, setProviderImage] = useState(
    "/assets/icon/phone_provider/default.png"
  );

  useEffect(() => {
    if (provider.includes("axis"))
      return setProviderImage(`/assets/icon/phone_provider/Axis.png`);
    if (provider.includes("byu"))
      return setProviderImage(`/assets/icon/phone_provider/Byu.png`);
    if (provider.includes("im3"))
      return setProviderImage(`/assets/icon/phone_provider/im3.png`);
    if (provider.includes("indosat"))
      return setProviderImage(`/assets/icon/phone_provider/Indosat.png`);
    if (provider.includes("smartfren"))
      return setProviderImage(`/assets/icon/phone_provider/Smartfren.png`);
    if (provider.includes("telkomsel"))
      return setProviderImage(`/assets/icon/phone_provider/Telkomsel.png`);
    if (provider.includes("tri"))
      return setProviderImage(`/assets/icon/phone_provider/Tri.png`);
    if (provider.includes("xl"))
      return setProviderImage(`/assets/icon/phone_provider/XL.png`);
  }, [provider]);

  //   START PASSWORD
  const [passwordLama, setPasswordLama] = useState();
  const [passwordBaru, setPasswordBaru] = useState();
  const [passwordBaru2, setPasswordBaru2] = useState();
  const [showUbahPasswordModal, setShowUbahPasswordModal] = useState(false);
  const handleClosePasswordModal = () => {
    setPasswordBaru("");
    setPasswordBaru2("");
    setPasswordLama("");
    setShowUbahPasswordModal(false);
  };
  const handleShowUbahPasswordModal = () => setShowUbahPasswordModal(true);
  const [hidePasswordLama, setHidePasswordLama] = useState(true);
  const [hidePasswordBaru, setHidePasswordBaru] = useState(true);
  const [hidePasswordBaru2, setHidePasswordBaru2] = useState(true);
  const [postStatus, setPostStatus] = useState("");

  // START HANDPHONE
  const [handphone, setHandphone] = useState("");
  const [showUbahHandphoneModal, setShowUbahHandphoneModal] = useState(false);
  const handleCloseHandphoneModal = () => setShowUbahHandphoneModal(false);
  const handleShowUbahHandphone = () => setShowUbahHandphoneModal(true);
  const [newPhone, setNewPhone] = useState("");

  const [handphoneVerify, setHandphoneVerify] = useState(
    dataPribadi.handphone_verifikasi || false
  );
  const [emailVerify, setEmailVerify] = useState(
    dataPribadi.email_verifikasi || false
  );

  //   START EMAIL
  const [newEmail, setNewEmail] = useState("");
  const [email, setEmail] = useState("");
  const [showUbahEmailModal, setShowUbahEmailModal] = useState(false);
  const handleCloseEmailModal = () => setShowUbahEmailModal(false);
  const handleShowUbahEmail = () => setShowUbahEmailModal(true);
  const [otpEmail, setOtpEmail] = useState("");
  const [showUbahEmailModalOtp, setShowUbahEmailModalOtp] = useState(false);
  const handleCloseEmailOtp = () => setShowUbahEmailModalOtp(false);
  const handleShowUbahEmailOtp = () => setShowUbahEmailModalOtp(true);

  const notify = (value) =>
    toast.error(`${value}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  // POST LANJUT UBAH HANDPHONE
  const handleLanjutUbahHandphone = async (nomor_hp) => {
    setCount(30);
    const body = {
      old_nomor_hp: dataPribadi.nomor_handphone,
      nomor_hp,
    };
    simpleValidator.current.fields.Email = true;
    simpleValidator.current.fields["password konfirmasi"] = true;
    simpleValidator.current.fields.passwordBaru = true;
    simpleValidator.current.fields.passwordLama = true;

    if (simpleValidator.current.allValid()) {
      try {
        const data = await axios.post(
          `${process.env.END_POINT_API_PELATIHAN}api/v1/auth/request-update-handphone`,
          body,
          config
        );
        if (data) {
          setNewPhone(data.data.send);
          setPostStatus("ubahHandphone");
          handleShowUbahEmailOtp();
          handleCloseHandphoneModal();
        }
      } catch (error) {
        SweatAlert("Gagal", error.response.data.message, "error");
      }
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
    }
  };
  // POST OTP UBAH HANDPHONE
  const handlePostOtpUbahHandphone = async (token) => {
    const body = {
      old_nomor_hp: dataPribadi.nomor_handphone,
      nomor_hp: handphone,
      token,
    };
    try {
      const { data } = await axios.post(
        `${process.env.END_POINT_API_PELATIHAN}api/v1/auth/submit-update-handphone`,
        body,
        config
      );
      if (data) {
        Swal.fire(
          "Berhasil!",
          "Anda telah berhasil melakukan perubahan nomor handphone",
          "success"
        );
        setOtpEmail("");
        dispatch(getDataPribadi(session.token));
        handleCloseEmailOtp();
      }
    } catch (error) {
      SweatAlert("Gagal", error.response.data.message, "error");
    }
  };
  // POST UBAH PASSWORD
  const handleLanjutPassword = async (
    old_password,
    password,
    password_konfirmasi
  ) => {
    setCount(30);
    simpleValidator.current.fields.Email = true;
    simpleValidator.current.fields["nomor handphone"] = true;
    const body = {
      old_password,
      password,
      password_konfirmasi,
    };

    if (simpleValidator.current.allValid()) {
      try {
        const data = await axios.post(
          `${process.env.END_POINT_API_PELATIHAN}api/v1/auth/submit-update-password`,
          body,
          config
        );
        if (data) {
          Swal.fire(
            "Berhasil!",
            "Anda telah berhasil melakukan perubahan password",
            "success"
          );
          handleClosePasswordModal();
        }
      } catch (error) {
        SweatAlert("Gagal", error.response.data.message, "error");
      }
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
    }
  };

  // END EMAIL
  const simpleValidator = useRef(
    new SimpleReactValidator({
      locale: "id",
      messages: {
        email: "Invalid Email",
      },
    })
  );

  //POST EMAIL LANJUT
  const handleLanjutUbahEmail = async (email) => {
    setCount(30);
    const body = {
      old_email: dataPribadi.email,
      email,
    };
    simpleValidator.current.fields["passwordLama"] = true;
    simpleValidator.current.fields["passwordBaru"] = true;
    simpleValidator.current.fields["password konfirmasi"] = true;
    simpleValidator.current.fields["nomor handphone"] = true;

    if (simpleValidator.current.allValid()) {
      try {
        const { data } = await axios.post(
          `${process.env.END_POINT_API_PELATIHAN}api/v1/auth/request-update-email`,
          body,
          config
        );
        if (data) {
          setNewEmail(data.data.send);
          setPostStatus("email");
          handleShowUbahEmailOtp();
          handleCloseEmailModal();
        }
      } catch (error) {
        SweatAlert("Gagal", error.response.data.message, "error");
      }
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
    }
  };

  // Post OTP UBAH Email
  const handlePostOtpEmail = async (token, email) => {
    const body = {
      old_email: dataPribadi.email,
      email,
      token,
    };

    try {
      const data = await axios.post(
        `${process.env.END_POINT_API_PELATIHAN}api/v1/auth/submit-update-email`,
        body,
        config
      );
      if (data) {
        Swal.fire(
          "Berhasil!",
          "Anda telah berhasil melakukan perubahan email",
          "success"
        );
        setOtpEmail("");
        dispatch(getDataPribadi(session.token));
        handleCloseEmailOtp();
      }
    } catch (error) {
      SweatAlert("Gagal", error.response.data.message, "error");
    }
  };

  const verifikasiHp = async () => {
    const body = {
      email: dataPribadi.email,
      services: "sms",
    };
    try {
      const data = await axios.post(
        `${process.env.END_POINT_API_PELATIHAN}api/v1/auth/request-token-verifikasi`,
        body,
        config
      );
      if (data) {
        setPostStatus("verifyHp");
        handleShowUbahEmailOtp();
      }
    } catch (error) {
      SweatAlert("Gagal", error.response.data.message, "error");
    }
  };

  const verifikasiEmail = async () => {
    const body = {
      email: dataPribadi.email,
      services: "email",
    };
    try {
      const data = await axios.post(
        `${process.env.END_POINT_API_PELATIHAN}api/v1/auth/request-token-verifikasi`,
        body,
        config
      );
      if (data) {
        setEmailVerify(true);
        setPostStatus("verifyEmail");
        handleShowUbahEmailOtp();
      }
    } catch (error) {
      SweatAlert("Gagal", error.response.data.message, "error");
    }
  };
  // POST OTP VERIFIKASI EMAIL
  const handlePostOtpEmailVerifikasi = async (token) => {
    const body = {
      email: dataPribadi.email,
      token,
    };
    handleCloseEmailOtp();
    try {
      const data = await axios.post(
        `${process.env.END_POINT_API_PELATIHAN}api/v1/auth/submit-token-verifikasi`,
        body,
        config
      );
      if (data) {
        Swal.fire(
          "Berhasil!",
          "Anda telah berhasil melakukan verifikasi nomer handphone",
          "success"
        );
        setOtpEmail("");
        dispatch(getDataPribadi(session.token));
        handleCloseEmailOtp();
      }
    } catch (error) {
      SweatAlert("Gagal", error.response.data.message, "error");
    }
  };
  // POST OTP VERIFIKASI HP
  const handlePostOtpHpVerifikasi = async (token) => {
    const body = {
      email: dataPribadi.email,
      token,
    };
    handleCloseEmailOtp();
    try {
      const data = await axios.post(
        `${process.env.END_POINT_API_PELATIHAN}api/v1/auth/submit-token-verifikasi`,
        body,
        config
      );
      if (data) {
        Swal.fire(
          "Berhasil!",
          "Anda telah berhasil melakukan verifikasi nomer handphone",
          "success"
        );
        setHandphoneVerify(true);
        setOtpEmail("");
        dispatch(getDataPribadi(session.token));
        handleCloseEmailOtp();
      }
    } catch (error) {
      SweatAlert("Gagal", error.response.data.message, "error");
    }
  };

  const [count, setCount] = useState(30);
  useEffect(() => {
    if (showUbahEmailModalOtp) {
      if (count > 0) {
        const secondsLeft = setInterval(() => {
          setCount((c) => c - 1);
        }, 1000);
        return () => clearInterval(secondsLeft);
      }
    }
  }, [count, showUbahEmailModalOtp]);
  const [, forceUpdate] = useState(0);

  return (
    <PesertaWrapper>
      <Col lg={12} className="px-0">
        <Card className="card-custom card-stretch gutter-b p-0 mt-n8 mt-lg-0">
          <Card.Body className="p-10">
            <div>
              <h1 className="font-weight-bolder">Kontak</h1>
              <br />
              <div
                className={`d-flex align-item-center ${style.text14}`}
                style={{ height: "24px" }}
              >
                Email
                {emailVerify ? (
                  <div
                    className={`rounded-circle d-flex align-items-center justify-content-center mx-5 ${style.iconBackgroundSuccess}`}
                  >
                    <i
                      className="ri-check-fill"
                      style={{ color: "#00996A" }}
                    ></i>
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
                      className={`text-primary p-0 ${style.btn_ubah}`}
                      onClick={handleShowUbahEmail}
                    >
                      Ubah
                    </button>
                  </span>
                )}
              </div>
              {dataPribadi.email_verifikasi == false && (
                <Button
                  variant="danger"
                  className="rounded-full mt-5 py-3 px-10"
                  onClick={() => {
                    verifikasiEmail();
                    setCount(30);
                  }}
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
                {handphoneVerify ? (
                  <div
                    className={`rounded-circle d-flex align-items-center justify-content-center mx-5 ${style.iconBackgroundSuccess}`}
                  >
                    <i
                      className="ri-check-fill"
                      style={{ color: "#00996A" }}
                    ></i>
                  </div>
                ) : (
                  <div
                    className={`rounded-full p-4 d-flex align-items-center justify-content-center mx-5 ${style.iconBackgroundFail}`}
                  >
                    Unverified
                  </div>
                )}
              </div>
              <div className="d-flex align-items-center mt-5">
                <Image
                  src={providerImage}
                  width={40}
                  height={50}
                  alt="provider"
                  objectFit="contain"
                />
                <p className="ml-5 m-0">{dataPribadi.nomor_handphone || "-"}</p>
                <span className="ml-5">
                  <button
                    className={`text-primary ${style.btn_ubah}`}
                    onClick={handleShowUbahHandphone}
                  >
                    Ubah
                  </button>
                </span>
              </div>
              {handphoneVerify == false && (
                <Button
                  variant="danger"
                  className="rounded-full mt-5 py-3 px-10"
                  onClick={() => {
                    verifikasiHp();
                    setCount(30);
                  }}
                >
                  Verifikasi
                </Button>
              )}
            </div>
            <hr />
            <div className="mt-10">
              <h1 className="font-weight-bolder">Keamanan</h1>
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
                    onClick={() => {
                      handleShowUbahPasswordModal();
                      setPasswordLama("");
                      setPasswordBaru("");
                      setPasswordBaru2("");
                    }}
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
              <i className="ri-close-fill"></i>
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
                placeholder="Masukkan Email Baru"
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
                handleLanjutUbahEmail(email);
              }}
            >
              Lanjut
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {/* END MODAL EMAIL */}
      {/* START MODAL OTP */}
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
              <i className="ri-close-fill"></i>
            </button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="font-size-h3 text-center">Masukkan Kode Verifikasi</p>
          <div className="d-flex justify-content-center text-center">
            <p style={{ fontSize: "14px" }}>
              Kode Verifikasi telah dikirim melalui{" "}
              {postStatus == "email"
                ? "E-mail "
                : postStatus == "verifyHp"
                ? "SMS "
                : postStatus == "ubahHandphone"
                ? "SMS "
                : "E-mail "}
              ke
              <span className="font-weight-bolder mx-2">
                {postStatus == "email"
                  ? newEmail
                  : postStatus == "verifyHp"
                  ? dataPribadi.nomor_handphone
                  : postStatus == "ubahHandphone"
                  ? newPhone
                  : dataPribadi.email}
              </span>
            </p>
          </div>
          <div className="d-flex justify-content-center">
            <OtpInput
              value={otpEmail}
              onChange={(e) => setOtpEmail(e)}
              numInputs={6}
              inputStyle="w-100 p-lg-4 p-2 mx-md-5 mx-2 my-md-10 form-control"
              isInputNum
            ></OtpInput>
          </div>

          <div className="d-flex justify-content-between mx-5 mt-14">
            {count !== 0 ? (
              <div>
                Mohon tunggu
                <span className="mx-2 font-weight-bolder  ">
                  {" "}
                  {count} detik
                </span>{" "}
                untuk kirim ulang
              </div>
            ) : (
              <div>
                Belum Menerima Kode OTP?
                <button
                  className={` p-md-2 font-weight-bolder text-primary ${style.btn_ubah}`}
                  onClick={() => {
                    if (postStatus == "email") {
                      handleLanjutUbahEmail(email);
                    } else if (postStatus == "verifyHp") {
                      verifikasiHp();
                    } else if (postStatus == "ubahHandphone") {
                      handleLanjutUbahHandphone(handphone);
                    } else if (postStatus == "verifyEmail") {
                      verifikasiEmail();
                    }
                    setCount(30);
                  }}
                >
                  Kirim Ulang
                </button>
              </div>
            )}
            <Button
              variant="primary"
              className="rounded-full py-md-4 px-md-8 py-0"
              style={{ fontSize: "14px" }}
              onClick={() => {
                if (postStatus == "email") {
                  handlePostOtpEmail(otpEmail, email);
                } else if (postStatus == "verifyHp") {
                  handlePostOtpHpVerifikasi(otpEmail);
                } else if (postStatus == "ubahHandphone") {
                  handlePostOtpUbahHandphone(otpEmail);
                } else if (postStatus == "verifyEmail") {
                  handlePostOtpEmailVerifikasi(otpEmail);
                }
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
              <i className="ri-close-fill"></i>
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
                  type={hidePasswordLama ? "password" : "text"}
                  className="form-control form-control-auth pr-10"
                  value={passwordLama}
                  onChange={(e) => setPasswordLama(e.target.value)}
                  placeholder="Masukkan Password Anda"
                  // onBlur={() =>
                  //   simpleValidator.current.showMessageFor("Password")
                  // }
                />
                {hidePasswordLama === true ? (
                  <i
                    className="ri-eye-fill right-center-absolute cursor-pointer"
                    style={{ right: "10px" }}
                    onClick={() => {
                      setHidePasswordLama(!hidePasswordLama);
                      //   handlerShowPassword(false);
                    }}
                  />
                ) : (
                  <i
                    className="ri-eye-off-fill right-center-absolute cursor-pointer"
                    style={{ right: "10px" }}
                    onClick={() => {
                      setHidePasswordLama(!hidePasswordLama);
                      //   handlerShowPassword(false);
                    }}
                  />
                )}
              </div>
            </Form.Group>
            {simpleValidator.current.message(
              "passwordLama",
              passwordLama,
              "required|min:8|max:18",
              {
                className: "text-danger",
              }
            )}
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
                  type={hidePasswordBaru ? "password" : "text"}
                  className="form-control form-control-auth pr-10"
                  value={passwordBaru}
                  onChange={(e) => setPasswordBaru(e.target.value)}
                  placeholder="Masukkan Password Anda"
                />
                {hidePasswordBaru === true ? (
                  <i
                    className="ri-eye-fill right-center-absolute cursor-pointer"
                    style={{ right: "10px" }}
                    onClick={() => {
                      setHidePasswordBaru(!hidePasswordBaru);
                      //   handlerShowPassword(false);
                    }}
                  />
                ) : (
                  <i
                    className="ri-eye-off-fill right-center-absolute cursor-pointer"
                    style={{ right: "10px" }}
                    onClick={() => {
                      setHidePasswordBaru(!hidePasswordBaru);
                      //   handlerShowPassword(false);
                    }}
                  />
                )}
              </div>
            </Form.Group>
            <div className="form-group">
              {simpleValidator.current.message(
                "passwordBaru",
                passwordBaru,
                "required|min:8|max:18",
                {
                  className: "text-danger",
                }
              )}
            </div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label
                className="mb-3"
                style={{ fontSize: "16px", color: "#1F1F1F" }}
              >
                Konfirmasi Password Baru
              </Form.Label>
              <div className="position-relative">
                <input
                  id="input-password"
                  //   type="password"
                  type={hidePasswordBaru2 ? "password" : "text"}
                  className="form-control form-control-auth pr-10"
                  value={passwordBaru2}
                  onChange={(e) => setPasswordBaru2(e.target.value)}
                  placeholder="Masukkan Password Anda"
                />
                {hidePasswordBaru2 === true ? (
                  <i
                    className="ri-eye-fill right-center-absolute cursor-pointer"
                    style={{ right: "10px" }}
                    onClick={() => {
                      setHidePasswordBaru2(!hidePasswordBaru2);
                      //   handlerShowPassword(false);
                    }}
                  />
                ) : (
                  <i
                    className="ri-eye-off-fill right-center-absolute cursor-pointer"
                    style={{ right: "10px" }}
                    onClick={() => {
                      setHidePasswordBaru2(!hidePasswordBaru2);
                      //   handlerShowPassword(false);
                    }}
                  />
                )}
              </div>
            </Form.Group>
            <div className="form-group">
              {simpleValidator.current.message(
                "password konfirmasi",
                passwordBaru2,
                "required|min:8|max:18",
                {
                  className: "text-danger",
                }
              )}
            </div>
          </Form>

          <div className="d-flex justify-content-end mt-14">
            <Button
              variant="white"
              className="rounded-full py-4 px-8 mx-5"
              style={{ fontSize: "14px", color: "#3699FF" }}
              onClick={() => {
                handleClosePasswordModal();
              }}
            >
              Batal
            </Button>
            <Button
              variant="primary"
              className="rounded-full py-4 px-8"
              style={{ fontSize: "14px" }}
              onClick={() => {
                handleLanjutPassword(passwordLama, passwordBaru, passwordBaru2);
              }}
            >
              Konfirmasi
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {/* END MODAL PASSWORD OTP */}
      {/* START MODAL HANDPHONE */}
      <Modal
        show={showUbahHandphoneModal}
        onHide={handleCloseHandphoneModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>Ubah Handphone</Modal.Title>
          <Modal.Title
            className="d-flex align-items-center"
            onClick={handleCloseHandphoneModal}
          >
            <button className={`${style.btn_ubah}`}>
              <i className="ri-close-fill"></i>
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
                Nomor HP Lama
              </Form.Label>
              <Form.Control
                disabled
                type="email"
                placeholder="Enter email"
                value={dataPribadi.nomor_handphone}
                style={{ fontSize: "14px" }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label
                className="mb-3"
                style={{ fontSize: "16px", color: "#1F1F1F" }}
              >
                Nomor HP Baru
              </Form.Label>
              <Form.Control
                style={{ fontSize: "14px" }}
                type="email"
                placeholder="Gunakan angka '62', Contoh : 62812...."
                onChange={(e) => {
                  setHandphone(e.target.value);
                }}
              />
              {simpleValidator.current.message(
                "nomor handphone",
                handphone,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
            Kode verifikasi akan dikirimkan melalui SMS
          </Form>
          <div className="d-flex justify-content-end mt-14">
            <Button
              variant="primary"
              className="rounded-full py-4 px-8"
              style={{ fontSize: "14px" }}
              onClick={() => {
                handleLanjutUbahHandphone(handphone);
              }}
            >
              Lanjut
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* END MODAL HANDPHONE */}
    </PesertaWrapper>
  );
}
