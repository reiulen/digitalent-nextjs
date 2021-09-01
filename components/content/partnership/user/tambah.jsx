import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const Tambah = () => {
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);

  const router = useRouter();
  const Swal = require("sweetalert2");

  const submit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Apakah anda yakin ?",
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
        router.push("/partnership/manajemen-kerjasama/submit");
      }
    });
  };

  return (
    <PageWrapper>
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              Profile Lembaga
            </h3>
          </div>
          <div className="card-body">
            <form
              id="kt_docs_formvalidation_text"
              className="form"
              action="#"
              autoComplete="off"
            >
              <div className="fv-row mb-10">
                <label className="required fw-bold fs-6 mb-2">Nama Lembaga</label>
                <input
                  type="text"
                  name="text_input"
                  className="form-control form-control-solid mb-3 mb-lg-0"
                  placeholder="Masukan Nama Lembaga"
                  value=""
                />
              </div>
              

              

              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="fv-row mb-10">
                    <label className="required fw-bold fs-6 mb-2">Website</label>
                    <input
                      type="text"
                      name="text_input"
                      className="form-control form-control-solid mb-3 mb-lg-0"
                      placeholder="Masukan Alamat Website"
                      value=""
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="fv-row mb-10">
                    <label className="required fw-bold fs-6 mb-2">E-mail</label>
                    <input
                      type="text"
                      name="text_input"
                      className="form-control form-control-solid mb-3 mb-lg-0"
                      placeholder="Masukan Alamat E-mail"
                      value=""
                    />
                  </div>
                </div>
              </div>

              <div className="fv-row mb-10 d-flex flex-column">
                <label className="required fw-bold fs-6 mb-2">Logo Lembaga</label>
                {/* <div className="input-group"> */}
                    <div className="custom-file col-12 col-xl-4">
                      <input
                      // onFocus={()=>setError({...error,document:""})}
                        type="file"
                        name="gambar"
                        className="custom-file-input cursor-pointer"
                        id="inputGroupFile04"
                        accept="image/png,image/jpg"
                        // onChange={handlePdfFileChange}
                      />
                      <label className="custom-file-label" htmlFor="inputGroupFile04" style={{color:"#bdbdbd"}}>
                        Pilih Gambar
                      </label>
                    </div>
                  {/* </div> */}
              </div>

              <div className="fv-row mb-10">
                <label className="required fw-bold fs-6 mb-2">Masukan Alamat Lengkap</label>
                <input
                  type="text"
                  name="text_input"
                  className="form-control form-control-solid mb-3 mb-lg-0"
                  placeholder="Masukan Alamat Lengkap"
                  value=""
                />
              </div>

              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="fv-row mb-10">
                    <label className="required fw-bold fs-6 mb-2">Provinsi</label>
                    <input
                      type="text"
                      name="text_input"
                      className="form-control form-control-solid mb-3 mb-lg-0"
                      placeholder="Masukan Alamat Website"
                      value=""
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="fv-row mb-10">
                    <label className="required fw-bold fs-6 mb-2">Kota/Kabupaten</label>
                    <input
                      type="text"
                      name="text_input"
                      className="form-control form-control-solid mb-3 mb-lg-0"
                      placeholder="Masukan Alamat E-mail"
                      value=""
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="fv-row mb-10">
                    <label className="required fw-bold fs-6 mb-2">Kode Pos</label>
                    <input
                      type="text"
                      name="text_input"
                      className="form-control form-control-solid mb-3 mb-lg-0"
                      placeholder="Masukan Kode Pos"
                      value=""
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-sm-12">
                  <div className="fv-row mb-10">
                    <label className="required fw-bold fs-6 mb-2">Nama Person In Charge (PIC)</label>
                    <input
                      type="text"
                      name="text_input"
                      className="form-control form-control-solid mb-3 mb-lg-0"
                      placeholder="Masukan Nama PIC"
                      value=""
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-12">
                  <div className="fv-row mb-10">
                    <label className="required fw-bold fs-6 mb-2">Nomor Handphone Person In Charge (PIC)</label>
                    <input
                      type="text"
                      name="text_input"
                      className="form-control form-control-solid mb-3 mb-lg-0"
                      placeholder="Masukan Nama PIC"
                      value=""
                    />
                  </div>
                </div>
              </div>

              <div className="fv-row mb-10">
                <label className="required fw-bold fs-6 mb-2">E-mail Person In Charge (PIC)</label>
                <input
                  type="text"
                  name="text_input"
                  className="form-control form-control-solid mb-3 mb-lg-0"
                  placeholder="Masukan Alamat E-mail PIC"
                  value=""
                />
              </div>

              <div className="d-flex justify-content-end align-items-center">
                <Link href="">
                  <a className="btn btn-white">
                        Kembali
                      </a>
                </Link>
                <button className="btn btn-primary ml-4">
                  Simpan

                   

                </button>
              </div>

            </form>
            {/* <form>
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Gambar Logo
                </label>
                <div className="col-sm-3">
                  <div className="input-group">
                    <div className="custom-file">
                      <input
                        type="file"
                        name="gambar"
                        className="custom-file-input"
                        id="inputGroupFile04"
                      />
                      <label className="custom-file-label" htmlFor="inputGroupFile04">
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
                    placeholder="Judul Kerjasama"
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
                    placeholder="Judul Kerjasama"
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
                    placeholder="Judul Kerjasama"
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
                    placeholder="Judul Kerjasama"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Provensi
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Judul Kerjasama"
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
                    placeholder="Judul Kerjasama"
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
                    placeholder="Judul Kerjasama"
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
                    placeholder="Judul Kerjasama"
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
                    placeholder="Judul Kerjasama"
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
                    placeholder="Judul Kerjasama"
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-2"></div>
                <div className="col-sm">
                  <Link href="/partnership/manajemen-kerjasama">
                    <a className="btn btn-outline-primary mr-2 btn-sm">
                      Kembali
                    </a>
                  </Link>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={(e) => submit(e)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form> */}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Tambah;
