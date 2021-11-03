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

  const colorText = {
    color: "#6C6C6C",
  };
  const listUl = {
    listStyle: "none",
    padding: "0",
    margin: "0",
    marginTop: "1rem",
  };

  const listLi = {};


  return (
    <PageWrapper>
      <div className="row">

        <div className="col-12 col-xl-3">
          <div className="card card-custom card-stretch gutter-b px-10 py-12">
            <div className="form-group" style={{maxWidth:"19rem"}}>
              <div>
                <div
                  className="image-input image-input-outline w-100"
                  style={{ height: "19rem" }}
                >
                  <div
                    className="image-input-wrapper w-100"
                    style={{ height: "19rem" }}
                  ></div>

                  <label
                    className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                    data-action="change"
                    data-toggle="tooltip"
                    title=""
                    data-original-title="Change avatar"
                  >
                    <i className="fa fa-pen icon-sm text-muted"></i>
                    <input
                      type="file"
                      name="profile_avatar"
                      accept=".png, .jpg, .jpeg"
                    />
                    <input type="hidden" name="profile_avatar_remove" />
                  </label>

                  <span
                    className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                    data-action="cancel"
                    data-toggle="tooltip"
                    title="Cancel avatar"
                  >
                    <i className="ki ki-bold-close icon-xs text-muted"></i>
                  </span>

                  <span
                    className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                    data-action="remove"
                    data-toggle="tooltip"
                  >
                    <i className="ki ki-bold-close icon-xs text-muted"></i>
                  </span>
                </div>
                <div className="mt-4 w-100">
                  <button
                    type="button"
                    className="btn btn-outline-primary rounded-full w-100"
                  >
                    Ubah Data
                  </button>
                  <ul style={listUl}>
                    <li style={listLi} className="p-4 listDTS">
                      <div className="d-flex align-items-center">
                        <Image
                          src="/assets/icon/user2.svg"
                          width="20"
                          height="20"
                          alt="user2"
                        />
                        <p className="m-0 ml-4">Informasi Data Pribadi</p>
                      </div>
                    </li>
                    <li style={listLi} className="p-4 listDTS">
                      <div className="d-flex align-items-center">
                        <Image
                          src="/assets/icon/Briefcase.svg"
                          width="20"
                          height="20"
                          alt="user2"
                        />
                        <p className="m-0 ml-4">Data Pelatihan</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      

      <div className="col-12 col-xl-9">
        <div className="card card-custom card-stretch gutter-b px-4 px-sm-8 py-4">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark w-100 pt-5 mb-5 mt-5 titles-1"
              
            >
              Data Pribadi
            </h3>
          </div>
          <div className="card-body pt-0 px-4 px-sm-8 py-4">
            <div className="form-group">
              <label>Nama Lengkap</label>
              <input
                type="text"
                className="form-control"
                placeholder="Lala Racing"
              />
              
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
                  
                </div>
                <div className="form-group">
                  <label>NIK</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="1627152715145161218787"
                  />
                  
                </div>
                <div className="form-group">
                  <label>Tempat Lahir</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Depok"
                  />
                  
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label htmlFor="exampleSelect1">Jenis Kelamin</label>
                  <select className="form-control" id="exampleSelect1">
                    <option>Perempuan</option>
                  </select>
                  
                </div>
                <div className="form-group">
                  <label>Nomor Handphone</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="08172615241542"
                  />
                  
                </div>
                <div className="form-group">
                  <label>Tanggal Lahir</label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Enter full name"
                  />
                  
                </div>
              </div>
            </div>
            <h3
              className="card-title font-weight-bolder text-dark w-100 pt-5 mb-5 mt-5 titles-1"
              
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
                  
                </div>
                <div className="form-group">
                  <label>RT/RW</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Depok"
                  />
                  
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label htmlFor="exampleSelect1">Kota</label>
                  <select className="form-control" id="exampleSelect1">
                    <option>Depok</option>
                  </select>
                  
                </div>

                <div className="form-group">
                  <label>Kode Pos</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="12423"
                  />
                  
                </div>
              </div>
            </div>
   <h3
              className="card-title font-weight-bolder text-dark w-100 pt-5 mb-5 mt-5 titles-1"
              
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
              
            </div>
            
           
            <h3
              className="card-title font-weight-bolder text-dark w-100 pt-5 mb-5 mt-5 titles-1"
              
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


              
            </div>
            
           
            <div className="form-group row mt-6">
              <div className="col-sm-12 d-flex justify-content-end">
                <Link href="/site-management/user/peserta-dts" passHref>
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
      </div>
    </PageWrapper>
  );
};

export default TambahPage;
