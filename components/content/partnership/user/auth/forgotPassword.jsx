import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import AuthWrapper from "../../../../wrapper/auth.wrapper";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { resetPassword } from "../../../../../redux/actions/partnership/user/authentication.actions";
import { RESET_STATUS } from "../../../../../redux/types/partnership/user/authentication.type";

const ForgotPassword = () => {
  const router = useRouter();
  let dispatch = useDispatch();
  const allAuthentication = useSelector((state) => state.allAuthentication);
  const [emailCode, setEmailCode] = useState("");
  const [passwordCode, setPasswordCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [error, setError] = useState({
    newPassword: "",
    confirmNewPassword: "",
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

  const submit = (e) => {
    e.preventDefault();
    if (newPassword === "") {
      setError({
        ...error,
        newPassword: "Form password baru tidak boleh kosong",
      });
      Swal.fire("Gagal", `Form password baru tidak boleh kosong`, "error");
    } else if (confirmNewPassword === "") {
      setError({
        ...error,
        confirmNewPassword: "Form konfirmasi password baru tidak boleh kosong",
      });
      Swal.fire(
        "Gagal",
        `Form konfirmasi password baru tidak boleh kosong`,
        "error"
      );
    } else {
      Swal.fire({
        title: "Apakah anda yakin ingin ganti password ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Batal",
        confirmButtonText: "Ya !",
        dismissOnDestroy: false,
      }).then(async (result) => {
        if (result.value) {
          let formData = new FormData();
          formData.append("_method", "put");
          formData.append("email", emailCode);
          formData.append("code", passwordCode);
          formData.append("password", newPassword);
          formData.append("password_confirmation", confirmNewPassword);
          dispatch(resetPassword(formData));
        }
      });
    }
  };

  useEffect(() => {
    if (router.query.code && router.query.email) {
      setEmailCode(router.query.email);
      setPasswordCode(router.query.code);
    }
    if (allAuthentication?.status === "error") {
      Swal.fire("Gagal", `${allAuthentication?.errorReset}`, "error");
    } else if (allAuthentication?.status === "success") {
      // jika sukses
      Swal.fire("Berhasil", "Password berhasil di reset", "success").then(
        () => {
          router.push("/login/mitra");
        }
      );
    } else {
      ("");
    }
    return () => {
      dispatch({
        type: RESET_STATUS,
      });
    };
  }, [
    router.query.code,
    router.query.email,
    router,
    allAuthentication?.status,
    allAuthentication?.errorReset,
    dispatch,
  ]);
  return (
    <>
      <AuthWrapper image="multiethnic-businesswoman.svg" title="Reset Password">
        <div
          className="col-lg-7 d-flex flex-wrap align-content-center"
          style={{ background: "#1A4367" }}
        >
          <div className="container scroll-form-login">
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
                Password Pemulihan Mitra
              </h3>
            </div>

            <div
              className="title-form col-lg-6 p-0 mx-auto"
              style={{ marginTop: "30px" }}
            >
              <form onSubmit={submit}>
                <div className="form-group mb-2">
                  <label className="form-auth-label">Password Baru</label>
                  <div className="position-relative">
                    <input
                      id="input-password"
                      onChange={(e) => setNewPassword(e.target.value)}
                      type="password"
                      className="form-control form-control-auth"
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
                <div className="form-group">
                  <label className="form-auth-label">
                    Konfirmasi Password Baru
                  </label>
                  <div className="position-relative mb-4">
                    <input
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      id="input-password-confirm"
                      type="password"
                      className="form-control form-control-auth pr-10"
                      placeholder="Masukkan Password Anda"
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
                  <span className="text-white">
                    Minimal 8 Karakter yang berisi kombinasi huruf besar, huruf
                    kecil, angka, dan simbol.
                  </span>
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
