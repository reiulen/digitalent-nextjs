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
import { getDetailMitraSite } from "../../../../../redux/actions/site-management/user/mitra-site.actions";
import Swal from "sweetalert2";

const TambahApi = ({ token,id }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  console.log("id",id)

 const {mitaSite} = useSelector((state) => state.detailMitraSite);
  console.log("mitaSite",mitaSite)

  const [nameCooperation, setNameCooperation] = useState(mitaSite.institution_name);
  const [email, setEmail] = useState(mitaSite.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState(mitaSite.status);

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
    var input = document.getElementById("input-password-confirm");
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
              className="card-title font-weight-bolder text-dark border-bottom w-100 pb-5 mb-5 mt-5"
              style={{ fontSize: "24px" }}
            >
              Edit Mitra
            </h3>
          </div>
          <div className="card-body pt-0">
            <form>
              <div className="form-group">
                <label>Nama Lengkap</label>
                <input
                  value={nameCooperation}
                  type="text"
                  className="form-control"
                  placeholder="Placeholder"
                  onChange={(e) => setNameCooperation(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email && email}
                  type="email"
                  className="form-control"
                  placeholder="Placeholder"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <div className="position-relative">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    id="input-password"
                    type="password"
                    className="form-control"
                    placeholder="Placeholder"
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
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    id="input-password-confirm"
                    type="password"
                    className="form-control"
                    placeholder="Placeholder"
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
                {status == 1 ? (
                  <select
                    className="form-control"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="0">Tidak Aktif</option>
                    <option value="1">Aktif</option>
                  </select>
                ) : (
                  <select
                    className="form-control"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="1">Aktif</option>
                    <option value="0">Tidak Aktif</option>
                  </select>
                )}
              </div>
            </form>
            <div className="form-group row">
              <div className="col-sm-12 d-flex justify-content-end">
                <Link href="/site-management/user/mitra" passHref>
                  <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                    Kembali
                  </a>
                </Link>
                <button
                  type="button"
                  className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
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
