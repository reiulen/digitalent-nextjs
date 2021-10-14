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
import {RESET_STATUS} from '../../../../../redux/types/partnership/user/authentication.type'
const RegisterMitra = () => {
  const router = useRouter();
  let dispatch = useDispatch();
  const allAuthentication = useSelector((state) => state.allAuthentication);
  const [lembaga, setlembaga] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState({
    lembaga: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirmConfirm] = useState(true);

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
    setHidePasswordConfirmConfirm(value);
    var input = document.getElementById("input-password-confirm");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  };

  const notify = (value) =>
    toast.info(`🦄 ${value}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const submit = (e) => {
    e.preventDefault();
    if (lembaga === "") {
      setError({
        ...error,
        institution_name: "Nama lembaga tidak boleh kosong",
      });
      notify("Nama lembaga tidak boleh kosong");
    } else if (email === "") {
      setError({ ...error, email: "Email tidak boleh kosong" });
      notify("Email tidak boleh kosong");
    } else if (password === "") {
      setError({ ...error, password: "Password tidak boleh kosong" });
      notify("Password tidak boleh kosong");
    } else if (confirmPassword === "") {
      setError({
        ...error,
        confirmPassword: "Konfirmasi password tidak boleh kosong",
      });
      notify("Konfirmasi password tidak boleh kosong");
    } else {
      Swal.fire({
        title: "Apakah anda yakin daftar ?",
        // text: "Data ini tidak bisa dikembalikan !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Batal",
        confirmButtonText: "Ya !",
        dismissOnDestroy: false,
      }).then((result) => {
        if (result.value) {
          let formData = new FormData();
          formData.append("name", lembaga);
          formData.append("email", email);
          formData.append("password", password);
          formData.append("password_confirmation", confirmPassword);
          dispatch(mitraRegister(formData));
        }
      });
    }
  };

  useEffect(() => {
    if (allAuthentication.status === "error") {
      notify(allAuthentication.errorRegister);
    } else if (allAuthentication.status === "success"){
      // jika sukses
      Swal.fire("Berhasil Daftar", "Silahkan login", "success").then(() => {
        router.push("/partnership/user/auth/login")
      });
    }else{
      ""
    }

    return () => {
      dispatch({
        type:RESET_STATUS
      })
    }
    
  }, [allAuthentication.status, allAuthentication.errorRegister,dispatch,router]);


  
  return (
    <>
      <AuthWrapper image="multiethnic-businesswoman.svg" title="Register">
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
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
                Daftar Mitra Baru
              </h3>
            </div>

            <div
              className="title-form col-lg-6 p-0 mx-auto"
              style={{ marginTop: "30px" }}
            >
              <form onSubmit={submit}>
                <div className="form-group mb-6">
                  <label className="form-auth-label">Nama Lembaga</label>
                  <input
                    type="text"
                    className="form-control form-control-auth"
                    value={lembaga}
                    onChange={(e) => setlembaga(e.target.value)}
                    placeholder="Masukkan Nama Lembaga"
                  />
                </div>
                <div className="form-group mb-6">
                  <label className="form-auth-label">E-mail</label>
                  <input
                    type="email"
                    className="form-control form-control-auth"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan Email Anda"
                  />
                </div>
                <div className="form-group mb-6">
                  <label className="form-auth-label">Password</label>
                  <div className="position-relative">
                    <input
                      id="input-password"
                      type="password"
                      className="form-control form-control-auth pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Masukkan Password Anda"
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
                </div>
                <div className="form-group mb-6">
                  <label className="form-auth-label">Konfirmasi Password</label>
                  <div className="position-relative">
                    <input
                      type="password"
                      id="input-password-confirm"
                      className="form-control form-control-auth pr-10"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Masukkan password Anda"
                    />
                    {hidePasswordConfirm === true ? (
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
        </div>
      </AuthWrapper>
    </>
  );
};

export default RegisterMitra;
