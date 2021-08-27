import React, { useState, useRef, useEffect } from "react";

import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";

import Style from "../../../../styles/progressbar.module.css";

const DetailDokumenKerjasama = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  return (
    <PageWrapper>
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              Submit Kerjasama
            </h3>
          </div>

          <div className={`card-body ${Style.refreshZindex}`}>
            <div className={Style.containerProggres}>
              <ul className={Style.progressbar}>
                <li className={Style.active}>Submit Kerjasama</li>
                <li>Review Kerjasama</li>
                <li>Pembahasan</li>
                <li>Dokumen Kerjasama</li>
                <li>Review Dokumen </li>
                <li>Selesai</li>
              </ul>
            </div>

            <form>
              {/* <div className="form-group row"> */}
              <div className={`row form-group ${Style.clearRow}`}>
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Tanggal
                </label>
                <div className="col-sm-3">
                  <input type="date" className="form-control" />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Judul kerjasama
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
                  Kategori kerjasama
                </label>
                <div className="col-sm-10">
                  <select
                    name=""
                    id=""
                    className="form-control"
                    // onChange={(e) => setKategoriId(e.target.value)}
                  >
                    <option value="Kategori" selected>
                      Pilih Kategori Kerjasama
                    </option>
                  </select>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Periode
                </label>
                <div className="col-sm-10">
                  <div className="row align-items-right">
                    <div className="col-lg-3 col-xl-3 mt-5 mt-lg-5">
                      <DatePicker
                        className="form-control-sm form-control"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Dari Tanggal"
                        // minDate={addDays(new Date(), 20)}
                      />
                    </div>
                    <div className="col-lg-3 col-xl-3 mt-5 mt-lg-5">
                      <DatePicker
                        className="form-control-sm form-control"
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        maxDate={addDays(startDate, 20)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Sampai Tanggal"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Tujuan Kerjasama
                </label>
                <div className="col-sm-10">
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                    className="form-control"
                    placeholder="Masukkan Tujuan Kerjasama disini"
                  ></textarea>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Ruang Lingkup Kerjasama
                </label>
                <div className="col-sm-10">
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                    className="form-control"
                    placeholder="Masukkan Ruang Lingkup Kerjasama disini"
                  ></textarea>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Target Kerjasama
                </label>
                <div className="col-sm-10">
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                    className="form-control"
                    placeholder="Masukkan Tujuan Target disini"
                  ></textarea>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-2"></div>
                <div className="col-sm-10">
                  <Link href="/partnership/manajemen-kerjasama">
                    <a className="btn btn-outline-primary mr-2 btn-sm">
                      Kembali
                    </a>
                  </Link>
                  <Link href="/partnership/user/review-kerjasama">
                    <a className="btn btn-primary mr-2 btn-sm">Submit</a>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default DetailDokumenKerjasama;
