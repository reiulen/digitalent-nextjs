import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  newMitra,
  // clearErrors,
} from "../../../../redux/actions/partnership/mitra.actions";
import LoadingPage from "../../../LoadingPage";

import Swal from "sweetalert2";

const TambahMitra = () => {
  const router = useRouter();
  const Swal = require("sweetalert2");
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newMitra);
  // const submit = (e) => {
  //   e.preventDefault();
  //   Swal.fire({
  //     title: "Apakah anda yakin ?",
  //     // text: "Data ini tidak bisa dikembalikan !",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     cancelButtonText: "Batal",
  //     confirmButtonText: "Ya !",
  //     dismissOnDestroy: false,
  //   }).then((result) => {
  //     if (result.value) {
  //       router.push("/partnership/manajemen-mitra");
  //     }
  //   });
  // };

  const onChangeLogo = (e) => {
    if (e.target.name === "gambar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setLogo(reader.result);
          // setGambarPreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    if (success) {
      dispatch({
        type: NEW_MITRA_RESET,
      });
    }
  };

  const [logo, setLogo] = useState(null);
  const [namaLembaga, setNamaLembaga] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [alamat, setAlamat] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kotaKabupaten, setKotaKabupaten] = useState("");
  const [kodePos, setKodePos] = useState("");
  const [noPic, setNoPic] = useState("");
  const [emailPic, setEmailPic] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      logo,
      namaLembaga,
      email,
      website,
      alamat,
      provinsi,
      kotaKabupaten,
      kodePos,
      noPic,
      emailPic,
    };

    dispatch(newMitra(data));
    console.log(data);
  };

  return (
    <PageWrapper>
      {error ? (
        <div
          className="alert alert-custom alert-light-danger fade show mb-5"
          role="alert"
        >
          <div className="alert-icon">
            <i className="flaticon-warning"></i>
          </div>
          <div className="alert-text">{error}</div>
          <div className="alert-close">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">
                <i className="ki ki-close"></i>
              </span>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        {loading ? <LoadingPage loading={loading} /> : ""}
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              Tambah Mitra
            </h3>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Gambar Logo
                </label>
                <div className="col-sm-3">
                  <div class="input-group">
                    <div class="custom-file">
                      <input
                        type="file"
                        name="gambar"
                        class="custom-file-input"
                        id="inputGroupFile04"
                        onChange={onChangeLogo}
                      />
                      <label class="custom-file-label" for="inputGroupFile04">
                        Cari Dokumen
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Nama Lembaga
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Nama Lembaga"
                    onChange={(e) => setNamaLembaga(e.target.value)}
                    value="lembaga"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value="email"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Website
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Website"
                    onChange={(e) => setWebsite(e.target.value)}
                    value="website"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Alamat
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Alamat"
                    onChange={(e) => setAlamat(e.target.value)}
                    value="alamat"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Provinsi
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Provinsi"
                    onChange={(e) => setProvinsi(e.target.value)}
                    value="provinsi"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Kota / Kabupaten
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Kota / Kabupaten"
                    onChange={(e) => setKotaKabupaten(e.target.value)}
                    value="kota"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Kode Pos
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Kode Pos"
                    onChange={(e) => setKodePos(e.target.value)}
                    value="kode pos"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Nama PIC
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Nama"
                    onChange={(e) => setNoPic(e.target.value)}
                    value="pic"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  No. Kontak PIC
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan NO. Kontak"
                    onChange={(e) => setEmailPic(e.target.value)}
                    value="no pic"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Email PIC
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Email"
                    value="pic"
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="row align-items-right mt-5 ml-auto">
                  <div className="col-sm mr-4">
                    <Link href="/partnership/manajemen-mitra">
                      <a className="btn btn-outline-primary btn-sm mr-3">
                        Kembali
                      </a>
                    </Link>
                    {/* <Link href="/partnership/manajemen-mitra"> */}
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={(e) => onSubmit(e)}
                    >
                      Simpan
                    </button>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default TambahMitra;
