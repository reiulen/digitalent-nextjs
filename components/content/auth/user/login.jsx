import React from "react";
import Image from "next/image";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";

import AuthWrapper from "../../../wrapper/auth.wrapper";

const LoginAdmin = () => {
  const onChange = (value) => {
    console.log(value);
  };
  return (
    <>
      <AuthWrapper
        image="login-user.svg"
        desc="Tagline Digitalen Scholarship Tagline Digitalen Scholarship Tagline Digitalen Scholarship"
      >
        <div
          className="col-lg-7 d-flex align-items-center justify-content-center"
          style={{ background: "#F3F5F9" }}
        >
          <div className="container">
            <div className="title-login">
              <h3
                className="align-middle font-weight-bold"
                style={{ fontSize: "25px" }}
              >
                Login
              </h3>
              <p style={{ fontSize: "18px", color: "#7E8299" }}>
                Partner Baru?
                <Link href="/auth/register">
                  <a className="text-primary ml-2">Daftar Sekarang</a>
                </Link>
              </p>
            </div>

            <div
              className="title-form col-lg-7 p-0"
              style={{ marginTop: "30px" }}
            >
              <form>
                <div className="form-group">
                  <label className="form-auth-label">Email</label>
                  <input type="email" className="form-control form-control-auth" />
                </div>
                <div className="form-group">
                  <label className="form-auth-label">Password</label>
                  <a className="float-right text-primary">Lupa Password ?</a>
                  <input
                    type="password"
                    className="form-control form-control-auth"
                  />
                </div>

                <div className="capcha">
                  <ReCAPTCHA
                    sitekey={process.env.CAPTCHA_SITE_KEY}
                    onChange={onChange}
                  />
                </div>

                <Link href="/publikasi/">
                  <a className="btn btn-primary mt-3">Masuk</a>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </AuthWrapper>
    </>
  );
};

export default LoginAdmin;
