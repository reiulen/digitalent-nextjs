import React, { useState, useRef } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import ReCAPTCHA from "react-google-recaptcha";
import { signIn } from "next-auth/client";
import SimpleReactValidator from "simple-react-validator";
import { SweatAlert } from "../../../../utils/middleware/helper";
import { getSession } from "next-auth/client";
import AuthWrapper from "../../../wrapper/auth.wrapper";
import LoadingTable from "../../../LoadingTable";
import Cookies from "js-cookie";
import HeaderLogoAuth from "../../../HeaderLogoAuth";

const LoginUser = () => {
  const router = useRouter();
  const fcm_token = Cookies.get("fcm_token");

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    if (simpleValidator.current.allValid()) {
      const data = {
        redirect: false,
        email,
        password,
        role: "peserta",
        capcha: captcha,
        fcm: fcm_token,
      };
      const result = await signIn("credentials", data);

      if (result.error) {
        SweatAlert("Gagal", result.error, "error");
        setLoading(false);
      } else {
        // setLoading(false);
        if (data.role === "admin") {
        } else if (data.role === "mitra") {
          router.push("/partnership/user/kerjasama");
        } else {
          const session = await getSession();
          if (!session.user.user.data.user.status) {
            if (
              session.user.user.data.user.wizard == 1 ||
              session.user.user.data.user.wizard == 0
            ) {
              router.push("/peserta/wizzard");
            }
            if (session.user.user.data.user.wizard == 2) {
              router.push("/peserta/wizzard/alamat");
            }
            if (session.user.user.data.user.wizard == 3) {
              router.push("/peserta/wizzard/pendidikan");
            }
            if (session.user.user.data.user.wizard == 4) {
              router.push("/peserta/wizzard/pekerjaan");
            }
            if (session.user.user.data.user.wizard == 5) {
              router.push("/peserta");
            }
          } else {
            router.push("/peserta");
          }
        }
      }
    } else {
      setLoading(false);
      simpleValidator.current.showMessages();
      forceUpdate(1);
    }
  };

  return (
    <>
      <AuthWrapper image="bg-user-2.png" title="Login">
        <div
          className="col-lg-7 d-flex flex-wrap align-content-center"
          style={{ background: "#0063CC" }}
        >
          <div className="container ">
            <div className="title-login text-center mt-6">
              <HeaderLogoAuth />

              <h3
                className="align-middle mt-12"
                style={{
                  fontSize: "32px",
                  color: "#ffffff",
                  fontWeight: "700",
                  fontFamily: "Poppins",
                  lineHeight: "38px",
                }}
              >
                Selamat Datang
              </h3>
            </div>

            <div
              className="title-form col-lg-6 p-0 mx-auto"
              style={{ marginTop: "30px" }}
            >
              <form onSubmit={handlerSubmit}>
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
                  <Link href="login/forgot-password">
                    <a
                      className="float-right font-weight-bold"
                      style={{ color: "#4CBDE2" }}
                    >
                      Lupa Password ?
                    </a>
                  </Link>
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

                <div className="g-recaptcha">
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
                    Masuk
                  </button>
                )}
                {/* <Link href="/publikasi/">
                </Link> */}
              </form>
              <div className="bottom mt-9 text-center">
                <p style={{ fontSize: "12px", color: "#ffffff" }}>
                  Belum punya akun?
                  <Link href="/register">
                    <a
                      className="ml-2 font-weight-bolder"
                      style={{ color: "#4CBDE2" }}
                    >
                      Buat Akun
                    </a>
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

export default LoginUser;
