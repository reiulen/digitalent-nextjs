import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import AuthWrapper from "../../../wrapper/auth.wrapper";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import { SweatAlert } from "../../../../utils/middleware/helper";
import axios from "axios";
import LoadingTable from "../../../LoadingTable";

const PasswordPemulihan = () => {
  const router = useRouter();

  console.log(router.query.token);

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);

  const [messageDontMatch, setMessageDontMatch] = useState(false);

  const [loading, setLoading] = useState(false);
  const [, forceUpdate] = useState();

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

  const handlePassword = (value) => {
    if (value !== passwordConfirm) {
      setMessageDontMatch(true);
      setPassword(value);
    } else {
      setMessageDontMatch(false);
      setPassword(value);
    }
  };

  const handlePasswordConfirm = (value) => {
    if (value !== password) {
      setMessageDontMatch(true);
      setPasswordConfirm(value);
    } else {
      setMessageDontMatch(false);
      setPasswordConfirm(value);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      Swal.fire({
        title: "Apakah anda yakin ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Batal",
        confirmButtonText: "Ya !",
        dismissOnDestroy: false,
      }).then(async (result) => {
        if (result.value) {
          setLoading(true);
          const data = {
            token: router.query.token,
            password: password,
            password_confirmasi: passwordConfirm,
          };
          console.log(data);
          await axios
            .post(
              process.env.END_POINT_API_PELATIHAN +
                "api/v1/auth/forgot-password",
              data
            )
            .then((res) => {
              setLoading(false);
              // console.log(res); MASIH DIPAKE
              SweatAlert("Berhasil ", "Berhasil Merubah Password", "success");
              router.push("/login");
            })
            .catch((err) => {
              setLoading(false);
              SweatAlert("Gagal", err.response.data.message, "error");
              // console.log(err); MASIH DIPAKE
            });
        }
      });
    } else {
      setLoading(false);
      simpleValidator.current.showMessages();
      forceUpdate(1);
      SweatAlert("Gagal", "Email Tidak Boleh Kosong", "error");
    }
  };

  return (
    <>
      <AuthWrapper image="bg-user-2.png" title="Reset Password">
        <div
          className="col-lg-7 d-flex flex-wrap align-content-center"
          style={{ background: "#0063CC" }}
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
                Password Pemulihan
              </h3>
            </div>

            <div
              className="title-form col-lg-6 p-0 mx-auto"
              style={{ marginTop: "30px" }}
            >
              <form onSubmit={submit}>
                <div className="form-group">
                  <label className="form-auth-label">Password Baru</label>
                  <div className="position-relative">
                    <input
                      id="input-password"
                      type="password"
                      className={`form-control form-control-auth pr-1 ${
                        simpleValidator.current.fieldValid("Password") !==
                          true &&
                        simpleValidator.current.messagesShown === true &&
                        "is-invalid"
                      }`}
                      value={password}
                      onChange={(e) => handlePassword(e.target.value)}
                      placeholder="Masukkan Password"
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("Password")
                      }
                    />

                    {hidePassword === true &&
                      simpleValidator.current.fieldValid("Password") !==
                        false && (
                        <i
                          className="ri-eye-fill right-center-absolute cursor-pointer"
                          style={{ right: "10px" }}
                          onClick={() => handlerShowPassword(false)}
                        />
                      )}
                    {hidePassword === false &&
                      simpleValidator.current.fieldValid("Password") !==
                        false && (
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
                    "required|min:8|max:18",
                    {
                      className: "text-danger",
                    }
                  )}
                  {messageDontMatch && (
                    <p className="text-danger">Password tidak sama</p>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-auth-label">
                    Konfirmasi Password Baru
                  </label>
                  <div className="position-relative">
                    <input
                      id="input-password-confirm"
                      type="password"
                      className={`form-control form-control-auth pr-10 ${
                        simpleValidator.current.fieldValid(
                          "Konfirmasi Password"
                        ) !== true &&
                        simpleValidator.current.messagesShown === true &&
                        "is-invalid"
                      }`}
                      value={passwordConfirm}
                      onChange={(e) => handlePasswordConfirm(e.target.value)}
                      placeholder="Masukkan Konfirmasi Password"
                      onBlur={() =>
                        simpleValidator.current.showMessageFor(
                          "Konfirmasi Password"
                        )
                      }
                    />

                    {hidePasswordConfirm === true &&
                      simpleValidator.current.fieldValid(
                        "Konfirmasi Password"
                      ) !== false && (
                        <i
                          className="ri-eye-fill right-center-absolute cursor-pointer"
                          style={{ right: "10px" }}
                          onClick={() => handlerShowPasswordConfirm(false)}
                        />
                      )}
                    {hidePasswordConfirm === false &&
                      simpleValidator.current.fieldValid(
                        "Konfirmasi Password"
                      ) !== false && (
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
                  {messageDontMatch && (
                    <p className="text-danger">Password tidak sama</p>
                  )}
                </div>
                {loading ? (
                  <div className="mt-5">
                    <LoadingTable loading={loading} />
                  </div>
                ) : (
                  <>
                    <button
                      type="submit"
                      className="btn btn-primary-rounded-full bg-secondary btn-block mt-5 border-0 py-4"
                    >
                      Ganti Password
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </AuthWrapper>
    </>
  );
};

export default PasswordPemulihan;
