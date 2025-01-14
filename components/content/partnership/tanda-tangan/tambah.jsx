import React, { useState, useRef } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import SignaturePad from "react-signature-pad-wrapper";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import Cookies from "js-cookie"

const TambahTandaTangan = ({ token }) => {
  const signCanvas = useRef({});
  const router = useRouter();

  const clear = () => {
    Swal.fire({
      title: "Apakah anda yakin ingin reset tanda tangan ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya !",
      // dismissOnDestroy: false,
    }).then((result) => {
      if (result.isConfirmed) {
        signCanvas.current.clear();
        setTandaTangan("");
      }
    });
  };
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [tandaTangan, setTandaTangan] = useState("");

  const [error, setError] = useState({
    nama: "",
    jabatan: "",
    tandaTangan: "",
  });

  const dataTandaTangan = () => {
    const data = signCanvas.current.toDataURL();
    if (!tandaTangan) {
      Swal.fire({
        icon: "success",
        title: "Tanda Tangan Berhasil di Buat",
        // text: "Berhasil",
      });
      setTandaTangan(data);
    }
    if (tandaTangan) {
      Swal.fire({
        icon: "error",
        title: "Tanda Tangan Sudah dibuat",
        // text: "Berhasil",
      });
    }
  };
  const submit = (e) => {
    e.preventDefault();
    if (nama === "") {
      setError({ ...error, nama: "Harus isi nama" });
      Swal.fire("Gagal", "Harap isi data dengan benar", "error");
    } else if (jabatan === "") {
      setError({ ...error, jabatan: "Harus isi jabatan" });
      Swal.fire("Gagal", "Harap isi data dengan benar", "error");
    } else if (tandaTangan === "") {
      setError({
        ...error,
        tandaTangan:
          "Pastikan sudah mengisi tanda tangan dan tekan tombol Buat tanda tangan",
      });
      Swal.fire("Gagal", "Harap isi data dengan benar", "error");
      
    } else {
      Swal.fire({
        title: "Apakah anda yakin ingin simpan ?",
        // text: "Data ini tidak bisa dikembalikan !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Batal",
        confirmButtonText: "Ya !",
        // dismissOnDestroy: false,
      }).then(async (result) => {
        if (result.value) {
          let formData = new FormData();
          formData.append("name", nama);
          formData.append("position", jabatan);
          formData.append("signature_image", tandaTangan);

          try {
            let { data } = await axios.post(
              `${process.env.END_POINT_API_PARTNERSHIP}api/signatures/create`,
              formData,
              {
                headers: {
                  authorization: `Bearer ${token}`,
                  Permission: Cookies.get ("token_permission")
                },
              }
            );

            router.push({
              pathname: `/partnership/tanda-tangan`,
              query: { success: true },
            });
          } catch (error) {
            Swal.fire("Gagal", `${error?.response?.data?.message}`, "error");
          }
        }
      });
    }
  };

  return (
    <PageWrapper>
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark titles-1">
              Tambah Tanda Tangan Digital
            </h3>
          </div>
          <div className="card-body pt-0">
            <form onSubmit={submit}>
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Nama
                </label>
                <input
                  onFocus={() => setError({ ...error, nama: "" })}
                  type="text"
                  className="form-control"
                  placeholder="Masukkan Nama"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
                {error?.nama ? <p className="error-text">{error?.nama}</p> : ""}
              </div>
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Jabatan
                </label>
                <input
                  onFocus={() => setError({ ...error, jabatan: "" })}
                  type="text"
                  className="form-control"
                  placeholder="Masukkan Jabatan"
                  onChange={(e) => setJabatan(e.target.value)}
                />
                {error?.jabatan ? (
                  <p className="error-text">{error?.jabatan}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Buat Tanda Tangan
                </label>
                <div>
                  <div
                    style={{
                      background: "#FFFFFF",
                      boxShadow: "inset 10px 10px 40px rgba(0, 0, 0, 0.08)",
                      borderRadius: "10px",
                    }}
                  >
                    <SignaturePad
                      ref={signCanvas}
                      options={{
                        minWidth: 1,
                        maxWidth: 3,
                        penColor: "rgb(66, 133, 244)",
                      }}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("tandaTangan")
                      }
                    />
                  </div>
                  {error?.tandaTangan ? (
                    <p className="error-text">{error?.tandaTangan}</p>
                  ) : (
                    ""
                  )}
                  <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-sm-start">
                    <a
                      className="btn btn-sm btn-rounded-full text-blue-primary border-primary mr-0 mr-sm-5 mt-3 text-center"
                      onClick={() => dataTandaTangan()}
                    >
                      Buat Tanda Tangan
                    </a>
                    <button
                      type="button"
                      onClick={clear}
                      className="btn btn-sm btn-rounded-full bg-yellow-primary text-white mt-3 text-truncate text-center"
                    >
                      Buat Ulang Tanda Tangan
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="d-flex flex-column flex-md-row justify-content-end">
                  <Link href="/partnership/tanda-tangan">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary d-flex justify-content-center">
                      Kembali
                    </a>
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white d-flex justify-content-center ml-0 ml-md-5 mt-md-0 mt-5"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default TambahTandaTangan;
