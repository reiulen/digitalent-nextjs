import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../wrapper/page.wrapper";
import { useDispatch, useSelector } from "react-redux";
import LoadingTable from "../../../LoadingTable";
import IconEye from "../../../assets/icon/Eye";
import IconPencil from "../../../assets/icon/Pencil";
import IconDelete from "../../../assets/icon/Delete";
import IconAdd from "../../../assets/icon/Add";
import IconSearch from "../../../assets/icon/Search";

const TambahPage = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const onNewReset = () => {
    router.replace("/site-management/api", undefined, {
      shallow: true,
    });
  };

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


  return (
    <PageWrapper>
      {" "}
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark w-100 pt-5 mb-5 mt-5"
              style={{ fontSize: "24px" }}
            >
              Data Pribadi
            </h3>
          </div>
          <div className="card-body pt-0">
            <div className="form-group">
              <label>Nama Lengkap</label>
              <input
                type="text"
                className="form-control"
                placeholder="Lala Racing"
              />
              <span className="form-text text-muted">
                Please enter your full name
              </span>
            </div>
            <div className="form-group row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Lalaracing@gmail.com"
                  />
                  <span className="form-text text-muted">
                    Please enter your full name
                  </span>
                </div>
                <div className="form-group">
                  <label>NIK</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="1627152715145161218787"
                  />
                  <span className="form-text text-muted">
                    Please enter your full name
                  </span>
                </div>
                <div className="form-group">
                  <label>Tempat Lahir</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Depok"
                  />
                  <span className="form-text text-muted">
                    Please enter your full name
                  </span>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label htmlFor="exampleSelect1">Jenis Kelamin</label>
                  <select className="form-control" id="exampleSelect1">
                    <option>Perempuan</option>
                  </select>
                  <span className="form-text text-muted">
                    Please enter your full name
                  </span>
                </div>
                <div className="form-group">
                  <label>Nomor Handphone</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="08172615241542"
                  />
                  <span className="form-text text-muted">
                    Please enter your full name
                  </span>
                </div>
                <div className="form-group">
                  <label>Tanggal Lahir</label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Enter full name"
                  />
                  <span className="form-text text-muted">
                    Please enter your full name
                  </span>
                </div>
              </div>
            </div>
            <h3
              className="card-title font-weight-bolder text-dark w-100 pt-5 mb-5 mt-5"
              style={{ fontSize: "24px" }}
            >
              Alamat
            </h3>
            <div className="form-group">
              <label>Alamat (Sesuai KTP)</label>
              <input
                type="text"
                className="form-control"
                placeholder="Jl. Almuwahiddin Kp. Kaum Kidul Desa Karang Tengah No. 1 Depok Jawabarat"
              />
              <span className="form-text text-muted">
                Please enter your full name
              </span>
            </div>
            <div className="form-group row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Provinsi</label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Enter full name"
                  />
                  <span className="form-text text-muted">
                    Please enter your full name
                  </span>
                </div>
                <div className="form-group">
                  <label>RT/RW</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Depok"
                  />
                  <span className="form-text text-muted">
                    Please enter your full name
                  </span>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label htmlFor="exampleSelect1">Kota</label>
                  <select className="form-control" id="exampleSelect1">
                    <option>Depok</option>
                  </select>
                  <span className="form-text text-muted">
                    Please enter your full name
                  </span>
                </div>

                <div className="form-group">
                  <label>Kode Pos</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="12423"
                  />
                  <span className="form-text text-muted">
                    Please enter your full name
                  </span>
                </div>
              </div>
            </div>
   <h3
              className="card-title font-weight-bolder text-dark w-100 pt-5 mb-5 mt-5"
              style={{ fontSize: "24px" }}
            >
              Upload Berkas Pribadi
            </h3>
            <div className="form-group">
              <label>KTP</label>
              <div className="input-group">
                <div className="custom-file">
                  <input
                    // onFocus={() => setError({ ...error, agency_logo: "" })}
                    // onChange={(e) => onChangeImage(e)}
                    type="file"
                    name="logo"
                    className="custom-file-input cursor-pointer"
                    id="inputGroupFile04"
                    accept="image/png,image/jpg"
                  />

                  <label
                    className="custom-file-label"
                    htmlFor="inputGroupFile04"
                  >
                    Belum ada file
                  </label>
                </div>
              </div>
              <span className="form-text text-muted">
                Please enter your full name
              </span>
            </div>
            <div className="form-group">
              <label>Ijazah</label>
              <div className="input-group">
                <div className="custom-file">
                  <input
                    // onFocus={() => setError({ ...error, agency_logo: "" })}
                    // onChange={(e) => onChangeImage(e)}
                    type="file"
                    name="logo"
                    className="custom-file-input cursor-pointer"
                    id="inputGroupFile04"
                    accept="image/png,image/jpg"
                  />

                  <label
                    className="custom-file-label"
                    htmlFor="inputGroupFile04"
                  >
                    Belum ada file
                  </label>
                </div>
              </div>
              <span className="form-text text-muted">
                Please enter your full name
              </span>
            </div>
            
           
            <h3
              className="card-title font-weight-bolder text-dark w-100 pt-5 mb-5 mt-5"
              style={{ fontSize: "24px" }}
            >
              Ganti Kata Sandi
            </h3>
            <div className="form-group">
              <label>Kata Sandi Baru</label>
              <div className="position-relative">
              <input
              id="input-password"
                type="password"
                className="form-control"
                placeholder="Lala Racing"
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

              <span className="form-text text-muted">
                Please enter your full name
              </span>
            </div>
            <div className="form-group">
              <label>Konfirmasi Kata Sandi Baru</label>
              <div className="position-relative">
              <input
              id="input-password-confirm"
                type="password"
                className="form-control"
                placeholder="Lala Racing"
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


              <span className="form-text text-muted">
                Please enter your full name
              </span>
            </div>
            
           
            <div className="form-group row">
              <div className="col-sm-12 d-flex justify-content-end">
                <Link href="/site-management/user" passHref>
                  <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                    Kembali
                  </a>
                </Link>
                <button
                  type="button"
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

export default TambahPage;
