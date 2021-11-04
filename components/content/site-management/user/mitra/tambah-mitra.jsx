import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../../wrapper/page.wrapper";
import { useDispatch, useSelector } from "react-redux";
import LoadingTable from "../../../../LoadingTable";
import IconEye from "../../../../assets/icon/Eye";
import IconPencil from "../../../../assets/icon/Pencil";
import IconDelete from "../../../../assets/icon/Delete";
import IconAdd from "../../../../assets/icon/Add";
import IconSearch from "../../../../assets/icon/Search";
import Image from "next/image";
import IconPlus from "../../../../../public/assets/icon/Plus.svg";
import IconMinus from "../../../../../public/assets/icon/Minus.svg";
import axios from "axios";
import Swal from "sweetalert2";
const TambahApi = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();
  const [nameCooperation, setNameCooperation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");

  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);

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
    var input = document.getElementById("confirm-input-password");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (nameCooperation === "") {
      Swal.fire(
        "Gagal simpan",
        "Form Nama Lembaga tidak boleh kosong",
        "error"
      );
    } else if (email === "") {
      Swal.fire("Gagal simpan", "Form Email tidak boleh kosong", "error");
    } else if (password === "") {
      Swal.fire("Gagal simpan", "Form Password tidak boleh kosong", "error");
    } else if (confirmPassword === "") {
      Swal.fire(
        "Gagal simpan",
        "Form Konfirmasi Password tidak boleh kosong",
        "error"
      );
    } else if (status === "") {
      Swal.fire("Gagal simpan", "Form Status tidak boleh kosong", "error");
    } else {
      let formData = new FormData();
      formData.append("name", nameCooperation);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password_confirmation", confirmPassword);
      formData.append("status", status);
      try {
        let { data } = await axios.post(
          `${process.env.END_POINT_API_SITE_MANAGEMENT}api/user-mitra/store`,
          formData,
          {
            headers: {
              authorization: `Bearer ${token}`,
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
  };

  const btnIconPlus = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "19px",
    height: "19px",
    borderRadius: "5px",
    backgroundColor: "#ADB5BD",
  };
  const btnMin = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "19px",
    height: "19px",
    borderRadius: "5px",
    backgroundColor: "#4299E1",
  };
  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark border-bottom w-100 pb-5 mb-5 mt-5 titles-1"
            >
              Tambah Mitra
            </h3>
          </div>
          <div className="card-body pt-0 px-4 px-sm-8">
            <form>
              <div className="form-group">
                <label>Nama Lengkap</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Masukan nama lengkap"
                  onChange={(e) => setNameCooperation(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control"
                  placeholder="Masukan email"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <div className="position-relative">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="input-password"
                    className="form-control"
                    placeholder="Masukan password"
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
                <label>Konfirmasi Password</label>
                <div className="position-relative">
                  <input
                    id="confirm-input-password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    className="form-control"
                    placeholder="Masukan konfirmasi password"
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

              <div className="form-group">
                <label>Status</label>
                <select
                  className="form-control"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Pilih status</option>
                  <option value="1">Aktif</option>
                  <option value="0">Tidak Aktif</option>
                </select>
              </div>
            </form>
            <div className="form-group row mt-8">
              <div className="col-sm-12 d-flex justify-content-end">
                <Link href="/site-management/user/mitra" passHref>
                  <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                    Kembali
                  </a>
                </Link>
                <button
                  type="button"
                  onClick={(e) => submit(e)}
                  className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
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
