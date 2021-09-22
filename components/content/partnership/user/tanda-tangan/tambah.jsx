import React, { useState, useRef } from "react";
import Link from "next/link";
import PageWrapper from "../../../../wrapper/page.wrapper";
import SignaturePad from "react-signature-pad-wrapper";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

const TambahTandaTangan = () => {
  const signCanvas = useRef({});
  const router = useRouter();


  return (
    <PageWrapper>
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark"
              style={{ fontSize: "24px" }}
            >
              Tambah Tanda Tangan Digital
            </h3>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Nama
                </label>
                <input
                  // onFocus={() => setError({ ...error, nama: "" })}
                  type="text"
                  className="form-control"
                  placeholder="Masukkan Nama"
                  // value={nama}
                  // onChange={(e) => setNama(e.target.value)}
                />
                {/* {error.nama ? <p className="error-text">{error.nama}</p> : ""} */}
              </div>
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Jabatan
                </label>
                <input
                  // onFocus={() => setError({ ...error, jabatan: "" })}
                  type="text"
                  className="form-control"
                  placeholder="Masukkan Jabatan"
                  // onChange={(e) => setJabatan(e.target.value)}
                />
                {/* {error.jabatan ? (
                  <p className="error-text">{error.jabatan}</p>
                ) : (
                  ""
                )} */}
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
                      // ref={signCanvas}
                      options={{
                        minWidth: 1,
                        maxWidth: 3,
                        penColor: "rgb(66, 133, 244)",
                      }}
                      // onBlur={() =>
                      //   simpleValidator.current.showMessageFor("tandaTangan")
                      // }
                    />
                    {/* {simpleValidator.current.message(
                      "tandaTangan",
                      tandaTangan,
                      "required",
                      { className: "text-danger" }
                    )} */}
                  </div>
                  <div className="d-flex align-items-center mt-5">
                    <a
                      className="btn btn-sm btn-rounded-full text-blue-primary border-primary mr-5"
                      // onClick={() => dataTandaTangan()}
                    >
                      Buat Tanda Tangan
                    </a>
                    <button
                      type="button"
                      // onClick={clear}
                      className="btn btn-sm btn-rounded-full bg-yellow-primary text-white"
                    >
                      Buat Ulang Tanda Tangan
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link href="/partnership/user/tanda-tangan-digital">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
                    </a>
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
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
