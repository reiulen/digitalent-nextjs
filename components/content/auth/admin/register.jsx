import React from "react";
import Image from "next/image";
import Link from "next/link";

import AuthWrapper from "../../../wrapper/auth.wrapper";

const RegisterAdmin = () => {
  return (
    <>
      <AuthWrapper
        image="ilustrator-2.svg"
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
                Daftar Baru
              </h3>
              <p style={{ fontSize: "18px", color: "#7E8299" }}>
                Silahkan isi detail akun baru anda
              </p>
            </div>

            <div
              className="title-form col-lg-7 p-0"
              style={{ marginTop: "30px" }}
            >
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-auth"
                    placeholder="Nama Lembaga"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-auth"
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-auth"
                    placeholder="Kata Sandi"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-auth"
                    placeholder="Konfirmasi Kata Sandi"
                  />
                </div>

                <Link href="/">
                  <a className="btn btn-outline-primary mt-3 mr-2">Kembali</a>
                </Link>
                <button type="button" className="btn btn-primary mt-3">
                  Buat Akun
                </button>
              </form>
            </div>
          </div>
        </div>
      </AuthWrapper>
    </>
  );
};

export default RegisterAdmin;
