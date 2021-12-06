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
import Select from "react-select";
import moment from "moment";
import { dropdownKabupaten } from "../../../../../redux/actions/pelatihan/function.actions";
import {updatePesertaDts} from '../../../../../redux/actions/site-management/user/peserta-dts'

import Image from "next/image";
const TambahPage = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const onNewReset = () => {
    router.replace("/site-management/api", undefined, {
      shallow: true,
    });
  };

  // const allDetailPeserta = useSelector((state) => state.allDetailPeserta);
  const { error: dropdownErrorProvinsi, data: dataProvinsi } = useSelector(
    (state) => state.drowpdownProvinsi
  );

  const { error: dropdownErrorKabupaten, data: dataKabupaten } = useSelector(
    (state) => state.drowpdownKabupaten
  );

  console.log(dataKabupaten);

  const allDetailPeserta = {
    data: {
      data: {
        id: 30258,
        user_id: 30432,
        nik: "3275011211000024",
        name: "Rifky",
        email: "pabin39486@tinydef.com",
        jenis_kelamin: "Laki - Laki",
        nomor_handphone: "6282124122172",
        agama: "Islam",
        tempat_lahir: "Jekartah",
        tanggal_lahir: "2010-06-08T00:00:00Z",
        hubungan: "Pembantu",
        Nama_kontak_darurat: "Rifky",
        nomor_handphone_darurat: "",
        File_ktp: "/ktp/7b2a2a60-80cf-4ebd-a7d3-01309ef9c61f-December.png",
        file_path: "https://dts-beasiswa-dev.s3-ap-southeast-1.amazonaws.com",
        address: "Jl. Mangga II Blok E22 No 25",
        deskripsi: "",
        file_cv: "",
        foto: "/ktp/e6d57250-0006-4b61-b3c7-20d4efd73543-December.jpeg",
        portofolio: "",
        email_verifikasi: false,
        handphone_verifikasi: false,
        provinsi: "SUMATERA UTARA",
        kota: "KABUPATEN NIAS",
        kecamatan: "BAWOLATO",
        kode_pos: "17111",
        address_ktp: "Jl. Mangga II Blok E22 No 25",
        provinsi_ktp: "SUMATERA UTARA",
        kota_ktp: "KABUPATEN NIAS",
        kecamatan_ktp: "BAWOLATO",
        kode_pos_ktp: "17111",
        jenjang: "SMP/Sederajat",
        asal_pendidikan: "0",
        lainya: "Tadika Mesra",
        program_studi: "0",
        ipk: "0",
        tahun_masuk: 0,
        ijasah: "/ijasah/2a36ca96-c7f5-4603-ad16-3b54a2ab96ca-December.jpeg",
        status_pekerjaan: "Tidak Bekerja",
        pekerjaan: "-",
        perusahaan: "-",
        penghasilan: "1",
        sekolah: "-",
        status_verified: true,
      },
    },
  };

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

  const onIjasahHandler = (e) => {
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
      nik: nik,
      name: name,
      jenis_kelamin: jenisKelamin,
      agama: allDetailPeserta.data.data.agama,
      tempat_lahir: tempatLahir,
      tanggal_lahir: tanggalLahir,
      email: email,
      nomor_handphone: nomorHandphone,
      file_ktp: ktpBase,
      ijasah: ijazahBase,
      address: alamat,
      provinsi: provinsi?.label ? provinsi?.label : provinsi,
      kota: kota?.label ? kota?.label : kota ,
      kode_pos: kodePost,
      address_ktp: alamatKtp,
      provinsi_ktp: provinsiKtp?.label ? provinsiKtp?.label : provinsiKtp,
      kota_ktp: kotaKtp?.label ? kotaKtp?.label : kotaKtp,
      kode_pos_ktp: kodePostKtp,
      user_id: allDetailPeserta.data.data.user_id,
      password: password,
      konfirmasi_password: passwordConfirm,
    };
    console.log(data)
    dispatch(updatePesertaDts(token, data))
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
                        <p className="m-0 ml-4 mt-1">Informasi Data Pribadi</p>
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
                  placeholder="Lala Racing"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
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
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
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
                    />
                  </div>
                  <div className="form-group">
                    <label>Tempat Lahir</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Depok"
                      value={tempatLahir}
                      onChange={(e) => {
                        setTempatLahir(e.target.value);
                      }}
                    />
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
                    >
                      <option value="Perempuan">Perempuan</option>
                      <option value="Laki - Laki">Laki-Laki</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Nomor Handphone</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="08172615241542"
                      value={nomorHandphone}
                      onChange={(e) => {
                        setNomorHandphone(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Tanggal Lahir</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Enter full name"
                      value={tanggalLahir}
                      onChange={(e) => {
                        setTanggalLahir(e.target.value);
                      }}
                    />
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
                  placeholder="Jl. Almuwahiddin Kp. Kaum Kidul Desa Karang Tengah No. 1 Depok Jawabarat"
                  value={alamatKtp}
                  onChange={(e) => {
                    setAlamatKtp(e.target.value);
                  }}
                />
              </div>
              <div className="form-group row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Provinsi</label>
                    <Select
                      placeholder="Pilih Provinsi"
                      defaultValue={{ label: provinsiKtp, value: provinsiKtp }}
                      onChange={(e) => {
                        dispatch(dropdownKabupaten(token, e.value));
                        setProvinsiKtp({ label: e?.label, value: e?.value });
                      }}
                      options={optionProvinsi}
                    />
                  </div>
                  <div className="form-group">
                    <label>Kode Pos</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="12423"
                      value={kodePostKtp}
                      onChange={(e) => {
                        setKodePostKtp(e.target.value);
                      }}
                    />
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
                        setKotaKtp({ label: e?.label, value: e?.value });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Alamat Domisili</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Jl. Almuwahiddin Kp. Kaum Kidul Desa Karang Tengah No. 1 Depok Jawabarat"
                  value={alamat}
                  onChange={(e) => {
                    setAlamat(e.target.value);
                  }}
                />
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
                    />
                  </div>
                  <div className="form-group">
                    <label>Kode Pos</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="12423"
                      value={kodePost}
                      onChange={(e) => {
                        setKodePost(e.target.value);
                      }}
                    />
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
                        setKota({ label: e?.label, value: e?.value });
                      }}
                    />
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
                    />

                    <label
                      className="custom-file-label"
                      htmlFor="inputGroupFile04"
                    >
                      {ktpName}
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
                      onChange={(e) => onIjasahHandler(e)}
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
                      {ijazahName}
                    </label>
                  </div>
                </div>
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
                    placeholder="Lala Racing"
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
                    placeholder="Lala Racing"
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
      </div>
    </PageWrapper>
  );
};

export default TambahPage;
