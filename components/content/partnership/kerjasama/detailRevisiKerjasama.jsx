import React, { useState, useRef, useEffect } from "react";

import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";

import Style from "../../../../styles/progressbar.module.css";

const DetailRevisiKerjasama = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


  useEffect(() => {

    

  }, [])


  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title fz-20 fw-500 text-dark">Detail Kerjasama Revisi</h3>
          </div>

          <div className="card-body">
            {" "}
            <form>
              {/* tanggal apakah diambil date now atau otomatis date sekarang */}
              <div className="form-group mb-10">
                <label className="required mb-2">Tanggal</label>
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

              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="form-group mb-10">
                    <label className="required mb-2">Judul Kerjasama</label>
                    <input
                      placeholder="Masukan Judul Kerjasama"
                      // readOnly
                      // value={date}
                      type="text"
                      className="form-control mb-3 mb-lg-0"
                    />
                    {/* {error.date ? <p className="error-text">{error.date}</p> : ""} */}
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="form-group mb-10">
                    <label className="required mb-2">Kategori Kerjasama</label>
                    <select className="form-control">
                      <option value="">Pilih Kategori Kerjasama</option>
                    </select>
                    {/* {error.date ? <p className="error-text">{error.date}</p> : ""} */}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="form-group mb-10">
                    <label className="required mb-2">Periode Kerjasama</label>
                    <input
                      placeholder="Masukan Lama Kerjasama"
                      // readOnly
                      // value={date}
                      type="number"
                      className="form-control mb-3 mb-lg-0"
                    />
                    {/* {error.date ? <p className="error-text">{error.date}</p> : ""} */}
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="form-group mb-10">
                    <label className="required mb-2"></label>
                    <select className="form-control mt-2" disabled>
                      <option value="">Tahun</option>
                    </select>
                    {/* {error.date ? <p className="error-text">{error.date}</p> : ""} */}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="staticEmail" className="col-form-label">
                      Tujuan Kerjasama
                    </label>
                    <div>
                      <textarea
                        name="cooperation"
                        id=""
                        cols="30"
                        rows="5"
                        className="form-control"
                        placeholder="Tuliskan Tujuan Kerjasama"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="staticEmail" className="col-form-label">
                      Catatan Revisi
                    </label>
                    <div>
                      <textarea
                        name="cooperation"
                        id=""
                        cols="30"
                        rows="5"
                        className="form-control"
                        placeholder="Tuliskan Catatan Revisi"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="staticEmail" className="col-form-label">
                      Ruang Lingkup Kerjasama
                    </label>
                    <div>
                      <textarea
                        name="cooperation"
                        id=""
                        cols="30"
                        rows="5"
                        className="form-control"
                        placeholder="Tuliskan Ruang Lingkup Kerjasama"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="staticEmail" className="col-form-label">
                      Catatan Revisi
                    </label>
                    <div>
                      <textarea
                        name="cooperation"
                        id=""
                        cols="30"
                        rows="5"
                        className="form-control"
                        placeholder="Tuliskan Catatan Revisi"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="staticEmail" className="col-form-label">
                      Target Kerjasama
                    </label>
                    <div>
                      <textarea
                        name="cooperation"
                        id=""
                        cols="30"
                        rows="5"
                        className="form-control"
                        placeholder="Tuliskan Target Kerjasama"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="staticEmail" className="col-form-label">
                      Catatan Revisi
                    </label>
                    <div>
                      <textarea
                        name="cooperation"
                        id=""
                        cols="30"
                        rows="5"
                        className="form-control"
                        placeholder="Tuliskan Catatan Revisi"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

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

              {/* <div className="form-group row">
                <div className="col-sm-2"></div>
                <div className="col-sm-10">
                  <Link href="/partnership/kerjasama">
                    <a className="btn btn-outline-primary mr-2 btn-sm">
                      Kembali
                    </a>
                  </Link>
                  <Link href="/partnership/user/review-kerjasama">
                    <a className="btn btn-primary mr-2 btn-sm">Submit</a>
                  </Link>
                </div>
              </div> */}

              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link href="/partnership/kerjasama">
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

export default DetailRevisiKerjasama;
