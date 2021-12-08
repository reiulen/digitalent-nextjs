import React, { useEffect, useState, useRef } from "react";
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
import Select from "react-select";
import { toast } from "react-toastify";
import moment from "moment";
import axios from "axios";
import {
  dropdownKabupaten,
  dropdownProvinsiToDesa,
  dropdownKecamatanToDesa,
} from "../../../../../redux/actions/pelatihan/function.actions";
import { updatePesertaDts } from "../../../../../redux/actions/site-management/user/peserta-dts";
import ListPelatihan from "./list-peserta-pelatihan";
import Tables from "./detail-list-peserta-pelatihan";
import UbahPelatihan from "./ubah-list-peserta-pelatihan";
import SimpleReactValidator from "simple-react-validator";

import Image from "next/image";
const TambahPage = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const onNewReset = () => {
    router.replace("/site-management/api", undefined, {
      shallow: true,
    });
  };

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

  const allDetailPeserta = useSelector((state) => state.allDetailPeserta);
  const { error: dropdownErrorProvinsi, data: dataProvinsi } = useSelector(
    (state) => state.drowpdownProvinsi
  );

  const { error: dropdownErrorKabupaten, data: dataKabupaten } = useSelector(
    (state) => state.drowpdownKabupaten
  );

  const { error: errorKecamatan, data: dataKecamatan } = useSelector(
    (state) => state.drowpdownProvinsiToDesa.data
  );

  const { error: errorKelurahan, data: dataKelurahan } = useSelector(
    (state) => state.drowpdownKecamatanToDesa.data
  );

  const [name, setName] = useState(allDetailPeserta.data.data.name);
  const [email, setEmail] = useState(allDetailPeserta.data.data.email);
  const [nik, setNik] = useState(allDetailPeserta.data.data.nik);
  const [tempatLahir, setTempatLahir] = useState(
    allDetailPeserta.data.data.tempat_lahir
  );
  const [jenisKelamin, setJenisKelamin] = useState(
    allDetailPeserta.data.data.jenis_kelamin
  );
  const [nomorHandphone, setNomorHandphone] = useState(
    allDetailPeserta.data.data.nomor_handphone
  );
  const [tanggalLahir, setTanggalLahir] = useState(
    moment(allDetailPeserta.data.data.tanggal_lahir).format("YYYY-MM-DD")
  );
  const [alamatKtp, setAlamatKtp] = useState(
    allDetailPeserta.data.data.address_ktp
  );
  const [provinsiKtp, setProvinsiKtp] = useState(
    allDetailPeserta.data.data.provinsi_ktp
  );
  const [kotaKtp, setKotaKtp] = useState(allDetailPeserta.data.data.kota_ktp);
  const [kodePostKtp, setKodePostKtp] = useState(
    allDetailPeserta.data.data.kode_pos_ktp
  );

  const [fotoProfil, setFotoProfil] = useState(
    allDetailPeserta.data.data.file_path + allDetailPeserta.data.data.foto
  );
  const [, forceUpdate] = useState();
  const [alamat, setAlamat] = useState(allDetailPeserta.data.data.address);
  const [provinsi, setProvinsi] = useState(allDetailPeserta.data.data.provinsi);
  const [kota, setKota] = useState(allDetailPeserta.data.data.kota);
  const [kodePost, setKodePost] = useState(allDetailPeserta.data.data.kode_pos);
  const [ktpName, setKtpName] = useState(allDetailPeserta.data.data.File_ktp);
  const [ktpBase, setKtpBase] = useState(allDetailPeserta.data.data.File_ktp);
  const [ijazahName, setIjazahName] = useState(
    allDetailPeserta.data.data.ijasah
  );
  const [ijazahBase, setIjazahBase] = useState(
    allDetailPeserta.data.data.ijasah
  );
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirmConfirm] = useState(true);
  const [sideBar, setSideBar] = useState(true);
  const [kecamatan, setKecamatan] = useState(
    allDetailPeserta.data.data.kecamatan
  );
  const [kelurahan, setKelurahan] = useState(
    allDetailPeserta.data.data.kelurahan || allDetailPeserta.data.data.kecamatan
  );
  const [kelurahanKtp, setKelurahanKtp] = useState(
    allDetailPeserta.data.data.kelurahan_ktp ||
      allDetailPeserta.data.data.kecamatan
  );
  const [kecamatanKtp, setKecamatanKtp] = useState(
    allDetailPeserta.data.data.kecamatan_ktp
  );

  const optionProvinsi = dataProvinsi.data.map((item) => {
    return {
      label: item.label,
      value: item.id,
    };
  });

  const optionKabupaten = dataKabupaten.data?.map((item) => {
    return {
      label: item.value,
      value: item.id,
    };
  });

  const optionKelurahan = dataKelurahan?.map((item) => {
    return { label: item.value, value: item.id };
  });

  const optionKecamatan = dataKecamatan?.map((item) => {
    return { label: item.value, value: item.id };
  });

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

  const onKtpHandler = (e) => {
    const type = ["image/jpg", "image/png", "image/jpeg"];
    if (e.target.files[0]) {
      if (type.includes(e.target.files[0].type)) {
        if (e.target.files[0].size > 2000000) {
          e.target.value = null;
          Swal.fire(
            "Oops !",
            "Data yang bisa dimasukkan maksimal hanya 2 MB.",
            "error"
          );
        } else {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              setKtpBase(reader.result);
            }
          };
          reader.readAsDataURL(e.target.files[0]);
          setKtpName(e.target.files[0].name);
        }
      } else {
        e.target.value = null;
        Swal.fire(
          "Oops !",
          "Data yang bisa dimasukkan hanya berupa gambar.",
          "error"
        );
      }
    }
  };

  const onFotoHandler = (e) => {
    const type = ["image/jpg", "image/png", "image/jpeg"];
    if (e.target.files[0]) {
      if (type.includes(e.target.files[0].type)) {
        if (e.target.files[0].size > 2000000) {
          e.target.value = null;
          Swal.fire(
            "Oops !",
            "Data yang bisa dimasukkan maksimal hanya 2 MB.",
            "error"
          );
        } else {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              setFotoProfil(reader.result);
              const datas = {
                foto: reader.result,
                user_id: allDetailPeserta.data.data.user_id,
              };

              const config = {
                headers: {
                  Authorization: "Bearer " + token,
                },
              };
              axios
                .post(
                  process.env.END_POINT_API_PELATIHAN +
                    "api/v1/auth/update-foto",
                  datas,
                  config
                )
                .then((res) => {
                  toast.success("Berhasil Update");
                })
                .catch((err) => {
                  toast.error("gagal");
                });
            }
          };
          reader.readAsDataURL(e.target.files[0]);
        }
      } else {
        e.target.value = null;
        Swal.fire(
          "Oops !",
          "Data yang bisa dimasukkan hanya berupa gambar.",
          "error"
        );
      }
    }
  };

  const onIjasahHandler = (e) => {
    const type = ["image/jpg", "image/png", "image/jpeg"];
    if (e.target.files[0]) {
      if (type.includes(e.target.files[0].type)) {
        if (e.target.files[0].size > 5000000) {
          e.target.value = null;
          Swal.fire(
            "Oops !",
            "Data yang bisa dimasukkan maksimal hanya 2 MB.",
            "error"
          );
        } else {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              setIjazahBase(reader.result);
            }
          };
          reader.readAsDataURL(e.target.files[0]);
          setIjazahName(e.target.files[0].name);
        }
      } else {
        e.target.value = null;
        Swal.fire(
          "Oops !",
          "Data yang bisa dimasukkan hanya berupa gambar.",
          "error"
        );
      }
    }
  };

  const onSubmit = () => {
    const data = {
      user_id: allDetailPeserta.data.data.user_id,
      nik: nik,
      name: name,
      jenis_kelamin: jenisKelamin,
      agama: allDetailPeserta.data.data.agama,
      tempat_lahir: tempatLahir,
      tanggal_lahir: moment(tanggalLahir).format("YYYY-MM-DD"),
      email: email,
      nomor_handphone: nomorHandphone,
      file_ktp: ktpBase,
      ijasah: ijazahBase,
      address: alamat,
      provinsi: provinsi?.label ? provinsi?.label : provinsi,
      kota: kota?.label ? kota?.label : kota,
      kode_pos: kodePost,
      address_ktp: alamatKtp,
      provinsi_ktp: provinsiKtp?.label ? provinsiKtp?.label : provinsiKtp,
      kota_ktp: kota?.label ? kota?.label : kota,
      kode_pos_ktp: kodePostKtp,
      user_id: allDetailPeserta.data.data.user_id,
      kecamatan_ktp: kecamatanKtp,
      kelurahan_ktp: kelurahanKtp,
      password: password,
      konfirmasi_password: passwordConfirm,
      kecamatan: kecamatan,
      kelurahan: kelurahan,
    };
    if (simpleValidator.current.allValid()) {
      dispatch(updatePesertaDts(token, data));
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
        {!router.query.ubah_pelatihan_id && (
          <div className="col-12 col-xl-3">
            <div
              className="card card-custom card-stretch gutter-b px-10 py-12"
              style={{ height: "470px" }}
            >
              <div className="form-group" style={{ maxWidth: "19rem" }}>
                <div>
                  <div
                    className="image-input image-input-outline w-100"
                    style={{ height: "19rem" }}
                  >
                    <div
                      className="image-input-wrapper w-100"
                      style={{ height: "19rem" }}
                    >
                      <Image
                        src={
                          fotoProfil
                            ? fotoProfil
                            : "/assets/media/logos/default.png"
                        }
                        width="1000"
                        height="1000"
                        alt="user2"
                      />
                    </div>
                    <label
                      className="btn btn-xs btn-icon btn-circle btn-primary btn-hover-text-primary btn-shadow bg-blue-primary"
                      data-action="change"
                      data-toggle="tooltip"
                      title=""
                      data-original-title="Change avatar"
                      style={{ width: "40px", height: "40px" }}
                    >
                      <i className="fa fa-pen icon-sm text-muted text-white"></i>
                      <input
                        type="file"
                        name="profile_avatar"
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => {
                          onFotoHandler(e);
                        }}
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
                  </div>
                  <div className="mt-4 w-100">
                    <ul style={listUl}>
                      <li
                        className={
                          sideBar
                            ? "p-4 listDTS isactive mb-2"
                            : "p-4 listDTS mb-2"
                        }
                        style={{ fontSize: "15px" }}
                        onClick={() => {
                          setSideBar(true);
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <Image
                            src={
                              sideBar
                                ? "/assets/icon/user2.svg"
                                : "/assets/icon/useract.svg"
                            }
                            width="20"
                            height="20"
                            alt="user2"
                          />
                          <p className="m-0 ml-4 mt-1">
                            Informasi Data Pribadi
                          </p>
                        </div>
                      </li>
                      <li
                        className={
                          sideBar ? "p-4 listDTS" : "p-4 listDTS isactive"
                        }
                        style={{ fontSize: "15px" }}
                        onClick={() => {
                          setSideBar(false);
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <Image
                            src={
                              sideBar
                                ? "/assets/icon/Briefcase.svg"
                                : "/assets/icon/BriefcaseAct.svg"
                            }
                            width="20"
                            height="20"
                            alt="user2"
                          />
                          <p className="m-0 ml-4 mt-1">Data Pelatihan</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {sideBar && !router.query.ubah_pelatihan_id && (
          <div className="col-12 col-xl-9">
            <div className="card card-custom card-stretch gutter-b px-4 px-sm-8 py-4">
              <div className="card-header border-0">
                <h3 className="card-title font-weight-bolder text-dark w-100 pt-5 mb-5 mt-5 titles-1">
                  Data Pribadi
                </h3>
              </div>
              <div className="card-body pt-0 px-4 px-sm-8 py-4">
                <div className="form-group">
                  <label>Nama Lengkap</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Nama Lengkap"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    onBlur={(e) => {
                      simpleValidator.current.showMessageFor("name");
                    }}
                  />
                  {simpleValidator.current.message("name", name, "required", {
                    className: "text-danger",
                  })}
                </div>
                <div className="form-group row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Masukkan Email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        onBlur={(e) => {
                          simpleValidator.current.showMessageFor("email");
                        }}
                      />
                      {simpleValidator.current.message(
                        "email",
                        email,
                        "required",
                        { className: "text-danger" }
                      )}
                    </div>
                    <div className="form-group">
                      <label>NIK</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="1627152715145161218787"
                        value={nik}
                        onChange={(e) => {
                          setNik(e.target.value);
                        }}
                        onBlur={(e) => {
                          simpleValidator.current.showMessageFor("nik");
                        }}
                      />
                      {simpleValidator.current.message("nik", nik, "required", {
                        className: "text-danger",
                      })}
                    </div>
                    <div className="form-group">
                      <label>Tempat Lahir</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Masukkan Tempat Lahir"
                        value={tempatLahir}
                        onChange={(e) => {
                          setTempatLahir(e.target.value);
                        }}
                        onBlur={(e) => {
                          simpleValidator.current.showMessageFor("tempatLahir");
                        }}
                      />
                      {simpleValidator.current.message(
                        "tempatLahir",
                        tempatLahir,
                        "required",
                        { className: "text-danger" }
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="exampleSelect1">Jenis Kelamin</label>
                      <select
                        className="form-control"
                        id="exampleSelect1"
                        value={jenisKelamin}
                        onChange={(e) => {
                          setJenisKelamin(e.target.value);
                        }}
                        onBlur={(e) => {
                          simpleValidator.current.showMessageFor(
                            "jenisKelamin"
                          );
                        }}
                      >
                        <option value="Perempuan">Perempuan</option>
                        <option value="Laki - Laki">Laki-Laki</option>
                      </select>

                      {simpleValidator.current.message(
                        "jenisKelamin",
                        jenisKelamin,
                        "required",
                        { className: "text-danger" }
                      )}
                    </div>
                    <div className="form-group">
                      <label>Nomor Handphone</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Masukkan Nomor Handphone"
                        value={nomorHandphone}
                        onChange={(e) => {
                          setNomorHandphone(e.target.value);
                        }}
                        onBlur={(e) => {
                          simpleValidator.current.showMessageFor(
                            "nomorHandphone"
                          );
                        }}
                      />
                      {simpleValidator.current.message(
                        "nomorHandphone",
                        nomorHandphone,
                        "required",
                        {
                          className: "text-danger",
                        }
                      )}
                    </div>
                    <div className="form-group">
                      <label>Tanggal Lahir</label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Masukkan Tanggal Lahir"
                        value={tanggalLahir}
                        onChange={(e) => {
                          setTanggalLahir(e.target.value);
                        }}
                        onBlur={(e) => {
                          simpleValidator.current.showMessageFor(
                            "tanggalLahir"
                          );
                        }}
                      />
                      {simpleValidator.current.message(
                        "tanggalLahir",
                        tanggalLahir,
                        "required",
                        {
                          className: "text-danger",
                        }
                      )}
                    </div>
                  </div>
                </div>
                <h3 className="card-title font-weight-bolder text-dark w-100 pt-5 mb-5 mt-5 titles-1">
                  Alamat
                </h3>
                <div className="form-group">
                  <label>Alamat (Sesuai KTP)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Alamat KTP"
                    value={alamatKtp}
                    onChange={(e) => {
                      setAlamatKtp(e.target.value);
                    }}
                    onBlur={(e) => {
                      simpleValidator.current.showMessageFor("alamatKtp");
                    }}
                  />
                  {simpleValidator.current.message(
                    "alamatKtp",
                    alamatKtp,
                    "required",
                    {
                      className: "text-danger",
                    }
                  )}
                </div>
                <div className="form-group row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Provinsi</label>
                      <Select
                        placeholder="Pilih Provinsi"
                        defaultValue={{
                          label: provinsiKtp,
                          value: provinsiKtp,
                        }}
                        onChange={(e) => {
                          dispatch(dropdownKabupaten(token, e.value));
                          setProvinsiKtp({ label: e?.label, value: e?.value });
                        }}
                        options={optionProvinsi}
                        onBlur={(e) => {
                          simpleValidator.current.showMessageFor("provinsiKtp");
                        }}
                      />
                      {simpleValidator.current.message(
                        "provinsiKtp",
                        provinsiKtp,
                        "required",
                        {
                          className: "text-danger",
                        }
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="exampleSelect1">Kota</label>
                      <Select
                        placeholder="Pilih Kota"
                        options={optionKabupaten}
                        defaultValue={{ label: kotaKtp, value: kotaKtp }}
                        onChange={(e) => {
                          dispatch(dropdownProvinsiToDesa(token, e.value));
                          setKotaKtp({ label: e?.label, value: e?.value });
                        }}
                        onBlur={(e) => {
                          simpleValidator.current.showMessageFor("kotaKtp");
                        }}
                      />
                      {simpleValidator.current.message(
                        "kotaKtp",
                        kotaKtp,
                        "required",
                        {
                          className: "text-danger",
                        }
                      )}
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Kecamatan</label>
                      <Select
                        placeholder="Pilih Provinsi"
                        defaultValue={{
                          label: kecamatanKtp,
                          value: kecamatanKtp,
                        }}
                        onChange={(e) => {
                          setKecamatanKtp({ label: e?.label, value: e?.value });
                          dispatch(dropdownKecamatanToDesa(token, e.value));
                        }}
                        options={optionKecamatan}
                        onBlur={(e) => {
                          simpleValidator.current.showMessageFor(
                            "kecamatanKtp"
                          );
                        }}
                      />
                      {simpleValidator.current.message(
                        "kecamatanKtp",
                        kecamatanKtp,
                        "required",
                        {
                          className: "text-danger",
                        }
                      )}
                    </div>
                    <div className="form-group">
                      <label>Kode Pos</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Masukkan Kode Pos KTP"
                        value={kodePostKtp}
                        onChange={(e) => {
                          setKodePostKtp(e.target.value);
                        }}
                        onBlur={(e) => {
                          simpleValidator.current.showMessageFor("kodePostKtp");
                        }}
                      />
                      {simpleValidator.current.message(
                        "kodePostKtp",
                        kodePostKtp,
                        "required",
                        {
                          className: "text-danger",
                        }
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="exampleSelect1">Kelurahan</label>
                      <Select
                        placeholder="Pilih Kota"
                        options={optionKelurahan}
                        defaultValue={{
                          label: kelurahanKtp,
                          value: kelurahanKtp,
                        }}
                        onChange={(e) => {
                          setKelurahanKtp({ label: e?.label, value: e?.value });
                        }}
                        onBlur={(e) => {
                          simpleValidator.current.showMessageFor(
                            "kelurahanKtp"
                          );
                        }}
                      />
                      {simpleValidator.current.message(
                        "kelurahanKtp",
                        kelurahanKtp,
                        "required",
                        {
                          className: "text-danger",
                        }
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Alamat Domisili</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Alamat Domisili"
                    value={alamat}
                    onChange={(e) => {
                      setAlamat(e.target.value);
                    }}
                    onBlur={(e) => {
                      simpleValidator.current.showMessageFor("alamat");
                    }}
                  />
                  {simpleValidator.current.message(
                    "alamat",
                    alamat,
                    "required",
                    {
                      className: "text-danger",
                    }
                  )}
                </div>
                <div className="form-group row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Provinsi</label>
                      <Select
                        placeholder="Pilih Provinsi"
                        defaultValue={{ label: provinsi, value: provinsi }}
                        onChange={(e) => {
                          dispatch(dropdownKabupaten(token, e.value));
                          setProvinsi({ label: e?.label, value: e?.value });
                        }}
                        options={optionProvinsi}
                        onBlur={(e) => {
                          simpleValidator.current.showMessageFor("provinsi");
                        }}
                      />
                      {simpleValidator.current.message(
                        "provinsi",
                        provinsi,
                        "required",
                        {
                          className: "text-danger",
                        }
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="exampleSelect1">Kota</label>
                      <Select
                        placeholder="Pilih Kota"
                        options={optionKabupaten}
                        defaultValue={{ label: kota, value: kota }}
                        onChange={(e) => {
                          dispatch(dropdownProvinsiToDesa(token, e.value));
                          setKota({ label: e?.label, value: e?.value });
                        }}
                        onBlur={(e) => {
                          simpleValidator.current.showMessageFor("kota");
                        }}
                      />
                      {simpleValidator.current.message(
                        "kota",
                        kota,
                        "required",
                        {
                          className: "text-danger",
                        }
                      )}
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Kecamatan</label>
                      <Select
                        placeholder="Pilih Provinsi"
                        defaultValue={{ label: kecamatan, value: kecamatan }}
                        onChange={(e) => {
                          dispatch(dropdownKecamatanToDesa(token, e.value));
                          setKecamatan({ label: e?.label, value: e?.value });
                        }}
                        options={optionKecamatan}
                        onBlur={(e) => {
                          simpleValidator.current.showMessageFor("kecamatan");
                        }}
                      />
                      {simpleValidator.current.message(
                        "kecamatan",
                        kecamatan,
                        "required",
                        {
                          className: "text-danger",
                        }
                      )}
                    </div>
                    <div className="form-group">
                      <label>Kode Pos</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Masukkan Kode Pos Domisili"
                        value={kodePost}
                        onChange={(e) => {
                          setKodePost(e.target.value);
                        }}
                        onBlur={(e) => {
                          simpleValidator.current.showMessageFor("kodePost");
                        }}
                      />
                      {simpleValidator.current.message(
                        "kodePost",
                        kodePost,
                        "required",
                        {
                          className: "text-danger",
                        }
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="exampleSelect1">Kelurahan</label>
                      <Select
                        placeholder="Pilih Kota"
                        defaultValue={{ label: kelurahan, value: kelurahan }}
                        onChange={(e) => {
                          setKelurahan({ label: e?.label, value: e?.value });
                        }}
                        options={optionKelurahan}
                        onBlur={(e) => {
                          simpleValidator.current.showMessageFor("kelurahan");
                        }}
                      />
                      {simpleValidator.current.message(
                        "kelurahan",
                        kelurahan,
                        "required",
                        {
                          className: "text-danger",
                        }
                      )}
                    </div>
                  </div>
                </div>
                <h3 className="card-title font-weight-bolder text-dark w-100 pt-5 mb-5 mt-5 titles-1">
                  Upload Berkas Pribadi
                </h3>
                <div className="form-group">
                  <label>KTP</label>
                  <div className="input-group">
                    <div className="custom-file">
                      <input
                        // onFocus={() => setError({ ...error, agency_logo: "" })}
                        onChange={(e) => onKtpHandler(e)}
                        type="file"
                        name="logo"
                        className="custom-file-input cursor-pointer"
                        id="inputGroupFile04"
                        accept="image/png,image/jpg"
                        onBlur={(e) => {
                          simpleValidator.current.showMessageFor("ktpName");
                        }}
                      />
                      {simpleValidator.current.message(
                        "ktpName",
                        ktpName,
                        "required",
                        {
                          className: "text-danger",
                        }
                      )}

                      <label
                        className="custom-file-label"
                        htmlFor="inputGroupFile04"
                      >
                        {ktpName}
                      </label>
                    </div>
                  </div>
                  <p className="text-muted">
                    *JPG/JPEG/PNG (Max.2 MB).
                  </p>
                </div>
                <div className="form-group">
                  <label>Ijazah</label>
                  <div className="input-group">
                    <div className="custom-file">
                      <input
                        // onFocus={() => setError({ ...error, agency_logo: "" })}
                        onChange={(e) => onIjasahHandler(e)}
                        type="file"
                        name="logo"
                        className="custom-file-input cursor-pointer"
                        id="inputGroupFile04"
                        accept="image/png,image/jpg"
                        onBlur={(e) => {
                          simpleValidator.current.showMessageFor("ijazahName");
                        }}
                      />
                      {simpleValidator.current.message(
                        "ijazahName",
                        ijazahName,
                        "required",
                        {
                          className: "text-danger",
                        }
                      )}

                      <label
                        className="custom-file-label"
                        htmlFor="inputGroupFile04"
                      >
                        {ijazahName}
                      </label>
                    </div>
                  </div>
                      <p className="text-muted">
                    *JPG/JPEG/PNG (Max.5 MB).
                  </p>
                </div>

                <h3 className="card-title font-weight-bolder text-dark w-100 pt-5 mb-5 mt-5 titles-1">
                  Ganti Kata Sandi
                </h3>
                <div className="form-group">
                  <label>Kata Sandi Baru</label>
                  <div className="position-relative">
                    <input
                      id="input-password"
                      type="password"
                      className="form-control"
                      placeholder="Silahkan Masukkan Password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
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
                      placeholder="Silahkan Masukkan Konfirmasi Password"
                      onChange={(e) => {
                        setPasswordConfirm(e.target.value);
                      }}
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
                      onClick={onSubmit}
                      className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!sideBar &&
        !router.query.pelatihan_id &&
        !router.query.ubah_pelatihan_id ? (
          <ListPelatihan token={token} />
        ) : null}
        {!sideBar && router.query.pelatihan_id ? (
          <Tables token={token} />
        ) : null}
        {router.query.ubah_pelatihan_id ? (
          <UbahPelatihan token={token} />
        ) : null}
      </div>
    </PageWrapper>
  );
};

export default TambahPage;
