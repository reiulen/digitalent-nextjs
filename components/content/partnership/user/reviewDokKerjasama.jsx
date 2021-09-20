import React, { useState, useRef, useEffect } from "react";

import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";

import Style from "../../../../styles/progressbar.module.css";

const reviewDokKerjasama = () => {
  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title fz-20 fw-500 text-dark">
              Submit Dokumen Kerjasama
            </h3>
          </div>

          <div className="card-body">
            <div className="row mt-8 mb-10">
              <div className="col-2 p-0">
                <div className="progress-items">
                  {/* <div className="line-progress"></div> */}
                  <div className="circle-progress active-circle">
                    <span className="title-progress">Submit Kerjasama</span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress active-line"></div>
                  <div className="circle-progress active-circle">
                    <span className="title-progress">Review Kerjasama</span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress active-line"></div>
                  <div className="circle-progress active-circle">
                    <span className="title-progress">Pembahasan</span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress active-line"></div>
                  <div className="circle-progress active-circle">
                    <span className="title-progress">
                      Submit Dokumen Kerjasama
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress active-line"></div>
                  <div className="circle-progress active-circle">
                    <span className="title-progress">
                      Review Dokumen Kerjasama
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress"></div>
                  <div className="circle-progress">
                    <span className="title-progress">Hasil</span>
                  </div>
                </div>
              </div>
            </div>

            <form>
              '
              <div className="row">
                <div className="col-12 col-sm-6">
                  {/* tanggal apakah diambil date now atau otomatis date sekarang */}
                  <div className="form-group mb-10">
                    <label className="required mb-2">Periode Kerjasama</label>
                    <div className="position-relative">
                      <input
                        placeholder="Pilih Tanggal"
                        // readOnly
                        // value={date}
                        type="date"
                        className="form-control mb-3 mb-lg-0"
                      />
                      {/* icon calender */}
                    </div>
                    {/* {error.date ? <p className="error-text">{error.date}</p> : ""} */}
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  {/* tanggal apakah diambil date now atau otomatis date sekarang */}
                  <div className="form-group mb-10">
                    <label className="required mb-2"></label>
                    <div className="position-relative">
                      <input
                        placeholder="Pilih Tanggal"
                        // readOnly
                        // value={date}
                        type="date"
                        className="form-control mb-3 mb-lg-0 mt-2"
                      />
                      {/* icon calender */}
                    </div>
                    {/* {error.date ? <p className="error-text">{error.date}</p> : ""} */}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-sm-12">
                  <div className="form-group mb-10">
                    <label className="required mb-2">Nomor Perjanjian Lembaga</label>
                    <input
                      placeholder="Masukan Nomor Perjanjian Lembaga"
                      // readOnly
                      // value={date}
                      type="number"
                      className="form-control mb-3 mb-lg-0"
                    />
                    {/* {error.date ? <p className="error-text">{error.date}</p> : ""} */}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-sm-12">
                  <div className="form-group mb-10">
                    <label className="required mb-2">Nomor Perjanjian Kemkominfo</label>
                    <input
                      placeholder="Masukan Nomor Perjanjian Kemkominfo"
                      // readOnly
                      // value={date}
                      type="number"
                      className="form-control mb-3 mb-lg-0"
                    />
                    {/* {error.date ? <p className="error-text">{error.date}</p> : ""} */}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-sm-6">
                  {/* tanggal apakah diambil date now atau otomatis date sekarang */}
                  <div className="form-group mb-10">
                    <label className="required mb-2">Tanggal Penandatanganan</label>
                    <div className="position-relative">
                      <input
                        placeholder="Pilih Tanggal"
                        // readOnly
                        // value={date}
                        type="date"
                        className="form-control mb-3 mb-lg-0"
                      />
                      {/* icon calender */}
                    </div>
                    {/* {error.date ? <p className="error-text">{error.date}</p> : ""} */}
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  {/* tanggal apakah diambil date now atau otomatis date sekarang */}
                  <div className="form-group mb-10">
                    <label className="required mb-2">Upload Dokumen Kerjasama</label>
                    <div className="position-relative">
                      <input
                        placeholder="Pilih FIle"
                        // readOnly
                        // value={date}
                        type="file"
                        className="form-control mb-3 mb-lg-0"
                      />
                      {/* icon calender */}
                    </div>
                    {/* {error.date ? <p className="error-text">{error.date}</p> : ""} */}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Catatan Tambahan
                </label>
                <div>
                  <textarea
                    name="cooperation"
                    id=""
                    cols="30"
                    rows="5"
                    className="form-control"
                    placeholder="Tuliskan Catatan Tambahan"
                  ></textarea>
                </div>
              </div>

                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link href="/partnership/user/kerjasama" passHref>
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Batalkan
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

export default reviewDokKerjasama;
