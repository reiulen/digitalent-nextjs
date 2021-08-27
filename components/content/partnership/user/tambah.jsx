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
            <form>
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
                  {/* <Link href="/partnership/manajemen-kerjasama/submit "> */}
                  {/* <a className="btn btn-outline-primary mr-2 btn-sm">
                      Kembali
                    </a> */}
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={(e) => submit(e)}
                  >
                    Submit
                  </button>
                  {/* </Link> */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Tambah;
