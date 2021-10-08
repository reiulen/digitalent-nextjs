import React, { useState, useRef } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import SimpleReactValidator from "simple-react-validator";

import AuthWrapper from "../../../wrapper/auth.wrapper";
import LoadingTable from "../../../LoadingTable";

const RegisterUser = () => {
  const router = useRouter();

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

  const [name, setName] = useState("");
  const [nik, setNik] = useState("");
  const [noHp, setNoHp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [verify, setVerify] = useState("");

  const [captcha, setCaptcha] = useState("");
  const [loading, setLoading] = useState(false);
  const [, forceUpdate] = useState();

  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);

  const handlerShowPassword = (value) => {
    setHidePassword(value);
    var input = document.getElementById("input-password");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  };

  const handlerShowPasswordConfirm = (value) => {
    setHidePasswordConfirm(value);
    var input = document.getElementById("input-password-confirm");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (simpleValidator.current.allValid()) {
      const data = {
        name,
        nik,
        noHp,
        email,
        password,
        passwordConfirm,
        captcha,
      };
      console.log(data);
    } else {
      setLoading(false);
      simpleValidator.current.showMessages();
      forceUpdate(1);
    }
  };

  return (
    <>
      <AuthWrapper image="bg-user-1.png" title="Register">
        <div
          className="col-lg-7 d-flex flex-wrap align-content-center"
          style={{ background: "#1A4367" }}
        >
          <div className="container ">
            <div className="title-login text-center mt-6">
              <Image
                src="/assets/logo/logo-6.svg"
                width={320}
                height={124}
                alt="Logo-5"
              />

              <h3
                className="align-middle mt-8"
                style={{
                  fontSize: "32px",
                  color: "#ffffff",
                  fontWeight: "700",
                  fontFamily: "Rubik",
                  lineHeight: "38px",
                }}
              >
                Daftar Baru
              </h3>
            </div>

            <div
              className="title-form col-lg-6 p-0 mx-auto"
              style={{ marginTop: "30px" }}
            >
              <form onSubmit={handlerSubmit}>
                <div className="form-group mb-2">
                  <label className="form-auth-label">Nama Lengkap</label>
                  <input
                    type="text"
                    className="form-control form-control-auth"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan Nama Lengkap"
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("nama lengkap")
                    }
                  />
                  {simpleValidator.current.message(
                    "nama lengkap",
                    name,
                    "required",
                    {
                      className: "text-danger",
                    }
                  )}
                </div>
                <div className="form-group mb-2">
                  <label className="form-auth-label">NIK</label>
                  <input
                    type="text"
                    className="form-control form-control-auth"
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                    placeholder="Masukkan NIK"
                    onBlur={() => simpleValidator.current.showMessageFor("NIK")}
                  />
                  {simpleValidator.current.message("NIK", nik, "required", {
                    className: "text-danger",
                  })}
                </div>
                <div className="form-group mb-2">
                  <label className="form-auth-label">No. Handphone</label>
                  <input
                    type="text"
                    className="form-control form-control-auth"
                    value={noHp}
                    onChange={(e) => setNoHp(e.target.value)}
                    placeholder="Masukkan Nomor Handphone"
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("nomor handphone")
                    }
                  />
                  {simpleValidator.current.message(
                    "nomor handphone",
                    noHp,
                    "required|integer",
                    {
                      className: "text-danger",
                    }
                  )}
                </div>
                <div className="form-group mb-2">
                  <label className="form-auth-label">E-mail</label>
                  <input
                    type="email"
                    className="form-control form-control-auth"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan Email"
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("Email")
                    }
                  />
                  {simpleValidator.current.message(
                    "Email",
                    email,
                    "required|email",
                    {
                      className: "text-danger",
                    }
                  )}
                </div>
                <div className="form-group">
                  <label className="form-auth-label">Password</label>
                  <div className="position-relative">
                    <input
                      id="input-password"
                      type="password"
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
                        onClick={() => handlerShowPassword(false)}
                      />
                    ) : (
                      <i
                        className="ri-eye-off-fill right-center-absolute cursor-pointer"
                        style={{ right: "10px" }}
                        onClick={() => handlerShowPassword(true)}
                      />
                    )}
                  </div>
                  {simpleValidator.current.message(
                    "Password",
                    password,
                    "required",
                    {
                      className: "text-danger",
                    }
                  )}
                </div>
                <div className="form-group">
                  <label className="form-auth-label">Konfirmasi Password</label>
                  <div className="position-relative">
                    <input
                      id="input-password-confirm"
                      type="password"
                      className="form-control form-control-auth pr-10"
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      placeholder="Masukkan Konfirmasi Password"
                      onBlur={() =>
                        simpleValidator.current.showMessageFor(
                          "Konfirmasi Password"
                        )
                      }
                    />
                    {hidePassword === true ? (
                      <i
                        className="ri-eye-fill right-center-absolute cursor-pointer"
                        style={{ right: "10px" }}
                        onClick={() => handlerShowPasswordConfirm(false)}
                      />
                    ) : (
                      <i
                        className="ri-eye-off-fill right-center-absolute cursor-pointer"
                        style={{ right: "10px" }}
                        onClick={() => handlerShowPasswordConfirm(true)}
                      />
                    )}
                  </div>
                  {simpleValidator.current.message(
                    "Konfirmasi Password",
                    passwordConfirm,
                    "required",
                    {
                      className: "text-danger",
                    }
                  )}
                </div>

                <div className="form-group row mb-4">
                  <label className="form-auth-label col-sm-4">
                    Verifikasi By
                  </label>
                  <div className="col-sm-8 my-auto">
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        name="verify"
                        className="form-check-input"
                        value="1"
                        checked={verify === "email"}
                        onClick={() => setVerify("email")}
                        onBlur={() =>
                          simpleValidator.current.showMessageFor("verifikasi")
                        }
                      />
                      <label className="form-check-label form-auth-label">
                        Email
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        name="verify"
                        value="nohp"
                        className="form-check-input"
                        checked={verify === "nohp"}
                        onClick={() => setVerify("nohp")}
                        onBlur={() =>
                          simpleValidator.current.showMessageFor("verifikasi")
                        }
                      />
                      <label className="form-check-label form-auth-label">
                        No.Handphone
                      </label>
                    </div>
                    {simpleValidator.current.message(
                      "verifikasi",
                      verify,
                      "required",
                      { className: "text-danger" }
                    )}
                  </div>
                </div>

                <div className="capcha">
                  <ReCAPTCHA
                    sitekey={process.env.CAPTCHA_SITE_KEY}
                    onChange={setCaptcha}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("Captcha")
                    }
                  />
                  {simpleValidator.current.message(
                    "Captcha",
                    captcha,
                    "required",
                    {
                      className: "text-danger",
                    }
                  )}
                </div>

                {loading ? (
                  <div className="mt-5">
                    <LoadingTable loading={loading} />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary-rounded-full bg-secondary btn-block mt-5"
                  >
                    Daftar
                  </button>
                )}
              </form>
              <div className="bottom mt-9 text-center mb-7">
                <p style={{ fontSize: "12px", color: "#ffffff" }}>
                  Sudah punya akun?
                  <Link href="/login">
                    <a className="text-primary ml-2">Masuk</a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </AuthWrapper>
    </>
  );
};

export default RegisterUser;
