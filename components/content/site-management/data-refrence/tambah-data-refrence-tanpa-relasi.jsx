import React, { useState } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconAdd from "../../../assets/icon/Add";

const Tambah = ({ token }) => {
  const router = useRouter();

  return (
    <PageWrapper>
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark"
              style={{ fontSize: "24px" }}
            >
              Tambah Reference Tanpa Relasi
            </h3>
          </div>
          <form>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Nama Data Reference
                </label>
                <input
                  required
                  placeholder="Provinsi"
                  type="text"
                  name="category_cooperation"
                  className="form-control"
                  // onChange={e => setCategoryCooporation(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleSelect1">Status</label>
                <select className="form-control" id="exampleSelect1">
                  <option>Placeholder</option>
                </select>
                <span className="form-text text-muted">
                  Please enter your full name
                </span>
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Value 1
                </label>
                <div className="position-relative d-flex align-items-center">
                  <input
                    required
                    placeholder="Aceh"
                    name="cooperation"
                    type="text"
                    // onChange={e => handleChange(e, index)}
                    className="form-control mr-6"
                    // value={valueCreateCooporation}
                  />
                  <button
                    type="button"
                    // onClick={() => handleDelete(index)}
                    className="btn"
                    style={{ backgroundColor: "#EE2D41" }}
                  >
                    <svg
                      className="position-relative"
                      style={{ bottom: "2px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"
                        fill="#ffffff"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-end">
                <div className="form-group">
                  <label
                    htmlFor="staticEmail"
                    className="col-form-label"
                  ></label>

                  <p
                    className="btn btn-rounded-full bg-blue-secondary text-white"
                    style={{
                      backgroundColor: "#40A9FF",
                      color: "#FFFFFF",
                      width: "max-content",
                    }}
                    // onClick={() => handleAddInput()}
                  >
                    <IconAdd className="mr-3" width="14" height="14" />
                    Tambah Value
                  </p>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link href="/site-management/reference/">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
                    </a>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
                    // onClick={e => handleSubmit(e)}
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Tambah;
