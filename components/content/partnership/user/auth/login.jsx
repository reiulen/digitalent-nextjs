import React, { useState, useRef } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import { signIn } from "next-auth/client";
import SimpleReactValidator from "simple-react-validator";
import AuthWrapper from "../../../../wrapper/auth.wrapper";
import { SweatAlert } from "../../../../../utils/middleware/helper/index";

const LoginAdmin = () => {
  const router = useRouter();

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
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
        role: "mitra",
        captcha,
      };
      const result = await signIn("credentials", data);

      if (result.error) {
        SweatAlert("Gagal", result.error, "error");
      } else {
        if (data?.role === "admin") {
          router.push("/dashboard");
        } else {
          router.push("/partnership/user/kerjasama");
        }
      }
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
    }
  };

  return (
    <>
      <AuthWrapper image="multiethnic-businesswoman.svg" title="Login">
        <div
          className="col-lg-7 d-flex flex-wrap align-content-center "
          style={{ background: "#1A4367" }}
        >
          <div className="container px-0 px-sm-4 scroll-form-login">
            <div className="title-login text-center mt-6">
              <Image
                src="/assets/logo/platform/dts.svg"
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
                  fontFamily: "Poppins",
                  lineHeight: "38px",
                }}
              >
                Selamat Datang Mitra
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
                    placeholder="Masukan Email"
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
                <div className="form-group mt-6">
                  <label className="form-auth-label">Password</label>
                  <Link href="/login/mitra/recorveryPassword">
                    <a className="float-right text-primary">Lupa Password ?</a>
                  </Link>
                  <div className="position-relative">
                    <input
                      id="input-password"
                      type="password"
                      className="form-control form-control-auth pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Masukan Password"
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

                <button
                  type="submit"
                  className="btn btn-primary-rounded-full bg-secondary btn-block mt-5"
                >
                  Masuk
                </button>
              </form>
              <div className="bottom mt-9 text-center">
                <p style={{ fontSize: "12px", color: "#ffffff" }}>
                  Belum punya akun?
                  <Link href="/login/mitra/register" passHref>
                    <a className="text-primary ml-2">Buat Akun</a>
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

export default LoginAdmin;
