import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import AuthWrapper from "../../../../wrapper/auth.wrapper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { mitraRegister } from "../../../../../redux/actions/partnership/user/authentication.actions";
import { RESET_STATUS } from "../../../../../redux/types/partnership/user/authentication.type";

const ForgotPassword = () => {
  return (
    <>
      <AuthWrapper image="multiethnic-businesswoman.svg" title="Login">
        <div
          className="col-lg-7 d-flex flex-wrap align-content-center"
          style={{ background: "#1A4367" }}
        >
          <div className="container ">
            <div className="title-login text-center mt-6">
              <Image
                src="/assets/logo/logo-6.svg"
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
                Password Pemulihan
              </h3>
            </div>

            <div
              className="title-form col-lg-6 p-0 mx-auto"
              style={{ marginTop: "30px" }}
            >
              <form>
                <div className="form-group mb-2">
                  <label className="form-auth-label">Password Baru</label>
                  <input
                    type="password"
                    className="form-control form-control-auth"
                    placeholder="Masukkan Password Anda"
                  />
                </div>
                <div className="form-group">
                  <label className="form-auth-label">
                    Konfirmasi Password Baru
                  </label>
                  <div className="position-relative">
                    <input
                      id="input-password"
                      type="password"
                      className="form-control form-control-auth pr-10"
                      placeholder="Masukkan Password Anda"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary-rounded-full bg-secondary btn-block mt-5"
                >
                  Ganti Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </AuthWrapper>
    </>
  );
};

export default ForgotPassword;
