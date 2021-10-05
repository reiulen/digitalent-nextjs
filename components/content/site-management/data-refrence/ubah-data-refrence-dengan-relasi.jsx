import React, { useState } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconAdd from "../../../assets/icon/Add";
import IconDelete from "../../../assets/icon/Delete";

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
              Ubah Reference Dengan Relasi
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
                <label htmlFor="exampleSelect1">Pilih Data Reference</label>
                <select className="form-control" id="exampleSelect1">
                  <option>Provinsi</option>
                </select>
                <span className="form-text text-muted">
                  Please enter your full name
                </span>
              </div>

              {/*  */}
              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="form-group mt-4">
                    <label htmlFor="exampleSelect1">List Provinsi</label>
                    <select className="form-control" id="exampleSelect1">
                      <option>Jawa Barat</option>
                    </select>
                    <span className="form-text text-muted">
                      Please enter your full name
                    </span>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="form-group mt-12">
                    <div className="position-relative d-flex align-items-start w-100">
                      <div className="w-100 mr-6">
                        <input
                          required
                          placeholder="Aceh"
                          name="cooperation"
                          type="text"
                          className="form-control"
                        />
                        <span className="form-text text-muted">
                          Please enter your full name
                        </span>
                      </div>

                      <div className="d-flex align-items-center">
                        <button
                          type="button"
                          className="btn mr-4"
                          style={{ backgroundColor: "#04AA77" }}
                        >
                          <IconAdd />
                        </button>
                        <button
                          type="button"
                          className="btn"
                          style={{ backgroundColor: "#EE2D41" }}
                        >
                          <IconDelete />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="position-relative d-flex align-items-start w-100">
                      <div className="w-100 mr-6">
                        <input
                          required
                          placeholder="Aceh"
                          name="cooperation"
                          type="text"
                          className="form-control"
                        />
                        <span className="form-text text-muted">
                          Please enter your full name
                        </span>
                      </div>

                      <div className="d-flex align-items-center">
                        <button
                          type="button"
                          className="btn mr-4"
                          style={{ backgroundColor: "#04AA77" }}
                        >
                          <IconAdd />
                        </button>
                        <button
                          type="button"
                          className="btn"
                          style={{ backgroundColor: "#EE2D41" }}
                        >
                          <IconDelete />
                        </button>
                      </div>
                    </div>
                  </div>
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
