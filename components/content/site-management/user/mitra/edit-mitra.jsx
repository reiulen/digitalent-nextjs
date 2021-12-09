import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PageWrapper from "../../../../wrapper/page.wrapper";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";

import styles from "../../../../../styles/sitemanagement/userMitra.module.css"
import styles2 from "../../../../../styles/previewGaleri.module.css"
import Cookies from 'js-cookie'

const TambahApi = ({ token, id }) => {
  const router = useRouter();

  const { mitaSite } = useSelector((state) => state.detailMitraSite);

  const [nameCooperation, setNameCooperation] = useState(mitaSite.institution_name);
  const [email, setEmail] = useState(mitaSite.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState(mitaSite.status);

  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
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

  const submit = async (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {

      if (nameCooperation === "") {
        Swal.fire(
          "Gagal simpan",
          "Form Nama Lembaga tidak boleh kosong",
          "error"
        );
      } else if (email === "") {
        Swal.fire("Gagal simpan", "Form Email tidak boleh kosong", "error");
      }
      // else if (password === "") {
      //   Swal.fire("Gagal simpan", "Form Password tidak boleh kosong", "error");
      // } 
      // else if (confirmPassword === "") {
      //   Swal.fire(
      //     "Gagal simpan",
      //     "Form Konfirmasi Password tidak boleh kosong",
      //     "error"
      //   );
      // } 
      else if (status === "") {
        Swal.fire("Gagal simpan", "Form Status tidak boleh kosong", "error");
      } else {
        let formData = new FormData();
        formData.append("name", nameCooperation);
        formData.append("email", email);


        if (password && confirmPassword) {
          formData.append("password", password);
          formData.append("password_confirmation", confirmPassword);
        }


        formData.append("status", status);
        formData.append("_method", "put");
        try {
          let { data } = await axios.post(
            `${process.env.END_POINT_API_SITE_MANAGEMENT}api/user-mitra/update/${router.query.id}`,
            formData,
            {
              headers: {
                authorization: `Bearer ${token}`,
                "Permission" : Cookies.get("token_permission")
              },
            }
          );
          Swal.fire("Berhasil", "Data berhasil disimpan", "success").then(() => {
            router.push(`/site-management/user/mitra/`);
          });
        } catch (error) {
          Swal.fire("Gagal simpan", `${error.response.data.message}`, "error");
        }
      }
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi data dengan benar !",
      });
    }
  };
  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header">
            <h3
              className="card-title font-weight-bolder text-dark"
            >
              Edit Mitra
            </h3>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Nama Lengkap</label>
                <input
                  value={nameCooperation}
                  type="text"
                  className="form-control"
                  placeholder="Masukkan nama lengkap"
                  onChange={(e) => setNameCooperation(e.target.value)}
                  onBlur={() => simpleValidator.current.showMessageFor("namaLengkap")}
                />

                {simpleValidator.current.message(
                  "namaLengkap",
                  nameCooperation,
                  "required",
                  { className: "text-danger" }
                )}
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email && email}
                  type="email"
                  className="form-control"
                  placeholder="mitra@gmail.com"
                  onBlur={() => simpleValidator.current.showMessageFor("email")}
                />


                {simpleValidator.current.message(
                  "email",
                  email,
                  "required",
                  { className: "text-danger" }
                )}
              </div>
              <div className="form-group">
                <label>Password</label>
                <div className="position-relative">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    id="input-password"
                    type="password"
                    className={`${styles.passwordWord} form-control`}
                    placeholder="Masukkan password"
                    onBlur={() => simpleValidator.current.showMessageFor("password")}
                  />

                  {hidePassword === true ? (
                    <i
                      className={`${styles.iconHide} ri-eye-fill right-center-absolute cursor-pointer`}
                      onClick={() => handlerShowPassword(false)}
                    />
                  ) : (
                    <i
                      className={`${styles.iconHide} ri-eye-off-fill right-center-absolute cursor-pointer`}
                      onClick={() => handlerShowPassword(true)}
                    />
                  )}

                  {simpleValidator.current.message(
                    "password",
                    password,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
                <p className={`${styles.notes}`} style={{ color: "#b7b5cf" }}>
                  Min 8 Karakter,<br />
                  Case Sensitivity (min t.d 1 Uppercase, 1 lowercase)<br />
                  Min 1 Symbol/angka
                </p>
              </div>
              <div className="form-group">
                <label>Konfirmasi Password</label>
                <div className="position-relative">
                  <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    id="input-password-confirm"
                    type="password"
                    className={`${styles.passwordWord} form-control`}
                    placeholder="Masukkan password konfirmasi"
                    onBlur={() => simpleValidator.current.showMessageFor("confirmPassword")}
                  />

                  {hidePasswordConfirm === true ? (
                    <i
                      className={`${styles.iconHide} ri-eye-fill right-center-absolute cursor-pointer`}
                      onClick={() => handlerShowPasswordConfirm(false)}
                    />
                  ) : (
                    <i
                      className={`${styles.iconHide} ri-eye-off-fill right-center-absolute cursor-pointer`}
                      onClick={() => handlerShowPasswordConfirm(true)}
                    />
                  )}

                  {simpleValidator.current.message(
                    "confirmPassword",
                    confirmPassword,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
              </div>
              <div className="form-group">
                <label>Status</label>
                {mitaSite.status == 1 ? (
                  <select
                    className="form-control"
                    onChange={(e) => setStatus(e.target.value)}
                    onBlur={() => simpleValidator.current.showMessageFor("status")}
                  >
                    <option value="1">Aktif</option>
                    <option value="0">Tidak Aktif</option>
                  </select>
                ) : (
                  <select
                    className="form-control"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="0">Tidak Aktif</option>
                    <option value="1">Aktif</option>
                  </select>
                )}

                {simpleValidator.current.message(
                  "status",
                  status,
                  "required",
                  { className: "text-danger" }
                )}
              </div>
            </form>
            <div className="form-group row">
              <div className="col-sm-12 d-flex justify-content-end">
                <Link href="/site-management/user/mitra" passHref>
                  <a className={`${styles.btnKembali} btn btn-white-ghost-rounded-full rounded-pill mr-2`}>
                    Kembali
                  </a>
                </Link>
                <button
                  type="button"
                  className={`${styles.btnSimpan} btn btn-primary-rounded-full rounded-pill`}
                  onClick={(e) => submit(e)}
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default TambahApi;
