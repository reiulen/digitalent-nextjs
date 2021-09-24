import React, { useState, useRef } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import { signIn } from "next-auth/client";
import SimpleReactValidator from "simple-react-validator";

import AuthWrapper from "../../../../wrapper/auth.wrapper";

const LoginAdmin = () => {
  const router = useRouter();

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [lembaga, setlembaga] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [, forceUpdate] = useState();

  const [hidePassword, setHidePassword] = useState(true);

  const handlerShowPassword = (value) => {
    setHidePassword(value);
    var input = document.getElementById("input-password");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      const data = {
        redirect: false,
        email,
        password,
        captcha,
      };
      const result = await signIn("credentials", data);

      if (result.error) {
        toast.error(result.error);
      } else {
        router.push("/subvit");
      }
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
    }
  };

  return (
    <>
      <AuthWrapper image="multiethnic-businesswoman.svg" title="Register">
        <div
          className="col-lg-7 d-flex flex-wrap align-content-center"
          style={{ background: "#1A4367" }}
        >
          <div className="container ">
            <div className="title-login text-center mt-6">
              <Image
                src="/assets/logo/logo-5.svg"
                width={246}
                height={96}
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
                  <label className="form-auth-label">Nama Lembaga</label>
                  <input
                    type="text"
                    className="form-control form-control-auth"
                    value={lembaga}
                    onChange={(e) => setlembaga(e.target.value)}
                    placeholder="Masukkan Nama Lembaga"
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
                <div className="form-group mb-2">
                  <label className="form-auth-label">E-mail</label>
                  <input
                    type="email"
                    className="form-control form-control-auth"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan Email Anda"
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
                      placeholder="Masukkan Password Anda"
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
                      id="input-password"
                      type="password"
                      className="form-control form-control-auth pr-10"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Masukkan password Anda"
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

                <button
                  type="submit"
                  className="btn btn-primary-rounded-full bg-secondary btn-block mt-5"
                >
                  Daftar
                </button>
              </form>
              <div className="bottom mt-9 text-center">
                <p style={{ fontSize: "12px", color: "#ffffff" }}>
                  Sudah punya akun?
                  <Link href="/partnership/user/auth/login" passHref>
                    <a className="text-primary ml-2">Masuk</a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        

          {/* daftar baru */}

          {/* <div className="container ">
            <div className="title-login text-center mt-6">
              <Image
                src="/assets/logo/logo-5.svg"
                width={246}
                height={96}
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
                Verifikasi E-mail
              </h3>
              <p className="text-white">Masukkan kode verifikasi yang telah dikirim ke</p>
              <p className="fw-600 text-white">contoh@gmail.com</p>
            </div>

            <div
              className="title-form col-lg-6 p-0 mx-auto"
              style={{ marginTop: "30px" }}
            >
              <form>
                <div className="form-group mb-2">
                  <label className="form-auth-label">Kode Verifikasi</label>
                  <input
                    type="text"
                    className="form-control form-control-auth"
                    placeholder="Masukkan Kode Verifikasi"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary-rounded-full bg-secondary btn-block mt-5"
                >
                  Verifikasi
                </button>
              </form>
            </div>
          </div>
         */}
        {/* Email pemulihan */}
        {/* <div className="container ">
            <div className="title-login text-center mt-6">
              <Image
                src="/assets/logo/logo-5.svg"
                width={246}
                height={96}
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
                Atur Ulang Password
              </h3>
            </div>

            <div
              className="title-form col-lg-6 p-0 mx-auto"
              style={{ marginTop: "30px" }}
            >
              <form>
                <div className="form-group mb-2">
                  <label className="form-auth-label">E-mail Pemulihan</label>
                  <input
                    type="text"
                    className="form-control form-control-auth"
                    placeholder="Masukkan Email Anda"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary-rounded-full bg-secondary btn-block mt-5"
                >
                  Kirim E-mail
                </button>
              </form>
              <div className="bottom mt-9 text-center">
                <p style={{ fontSize: "12px", color: "#ffffff" }}>
                  Belum menerima e-mail?
                  <Link href="/partnership/user/auth/login" passHref>
                    <a className="text-primary ml-2">Kirim Ulang</a>
                  </Link>
                </p>
              </div>
            </div>
          </div> */}
        
        </div>
      </AuthWrapper>
    </>
  );
};

export default LoginAdmin;
