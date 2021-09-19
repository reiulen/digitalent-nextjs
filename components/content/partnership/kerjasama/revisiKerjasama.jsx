import DatePicker from "react-datepicker";
import { addDays } from "date-fns";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

import IconCalender from "../../../assets/icon/Calender";

const RevisiKerjasama = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const notify = (value) =>
    toast.info(`🦄 ${value}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
              Submit Dokumen Kerjasama Revisi
            </h3>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Periode Kerjasama
                </label>
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <div className="d-flex align-items-center position-relative datepicker-w mt-2">
                      <DatePicker
                        // onFocus={() =>
                        //   setError({ ...error, period_date_start: "" })
                        // }
                        className="form-search-date form-control-sm form-control cursor-pointer"
                        selected={startDate}
                        // onChange={(date) => onChangePeriodeDateStart(date)}
                        selectsStart
                        // value={period_date_start}
                        // startDate={startDate}
                        // endDate={endDate}
                        dateFormat="YYYY-MM-DD"
                        placeholderText="Dari Tanggal"
                        minDate={moment().toDate()}
                      />
                      <IconCalender
                        className="right-center-absolute"
                        style={{ right: "10px" }}
                      />
                    </div>
                    {/* {error.period_date_start ? (
                      <p className="error-text">{error.period_date_start}</p>
                    ) : (
                      ""
                    )} */}
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="d-flex align-items-center position-relative datepicker-w mt-2">
                      <DatePicker
                        className="form-search-date form-control-sm form-control cursor-pointer"
                        selected={endDate}
                        // onChange={(date) => setEndDate(date)}
                        readOnly
                        selectsEnd
                        // value={newDate}
                        startDate={startDate}
                        endDate={endDate}
                        // minDate={startDate}
                        minDate={moment().toDate()}
                        maxDate={addDays(startDate, 20)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Sampai Tanggal"
                      />
                      <IconCalender
                        className="right-center-absolute"
                        style={{ right: "10px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="fv-row mb-10">
                <label className="required fw-bold fs-6 mb-2">
                  Nomer Perjanjian Lembaga
                </label>
                <input
                  // onFocus={() => setError({ ...error, title: "" })}
                  type="text"
                  name="text_input"
                  className="form-control mb-3 mb-lg-0"
                  placeholder="Masukan Nomor Perjanjian Lembaga"
                  // onChange={(e) => setTitle(e.target.value)}
                />
                {/* {error.title ? <p className="error-text">{error.title}</p> : ""} */}
              </div>
              <div className="fv-row mb-10">
                <label className="required fw-bold fs-6 mb-2">
                  Nomer Perjanjian Kemkominfo
                </label>
                <input
                  // onFocus={() => setError({ ...error, title: "" })}
                  type="text"
                  name="text_input"
                  className="form-control mb-3 mb-lg-0"
                  placeholder="Masukan Nomor Perjanjian Kemkominfo"
                  // onChange={(e) => setTitle(e.target.value)}
                />
                {/* {error.title ? <p className="error-text">{error.title}</p> : ""} */}
              </div>

              <div className="row">
                <div className="col-12 col-sm-6">
                  <label htmlFor="staticEmail" className="col-form-label">
                    Tanggal Penandatanganan
                  </label>
                  <div className="d-flex align-items-center position-relative datepicker-w mt-2">
                    <DatePicker
                      // onFocus={() =>
                      //   setError({ ...error, period_date_start: "" })
                      // }
                      className="form-search-date form-control-sm form-control cursor-pointer"
                      selected={startDate}
                      // onChange={(date) => onChangePeriodeDateStart(date)}
                      selectsStart
                      // value={period_date_start}
                      // startDate={startDate}
                      // endDate={endDate}
                      dateFormat="YYYY-MM-DD"
                      placeholderText="Dari Tanggal"
                      minDate={moment().toDate()}
                    />
                    <IconCalender
                      className="right-center-absolute"
                      style={{ right: "10px" }}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="form-group">
                    <label
                      htmlFor="staticEmail"
                      className="col-form-label"
                    >
                      Upload Dokumen Kerjasama
                    </label>
                      <div className="input-group mt-1">
                        <div className="custom-file">
                          <input
                            type="file"
                            name="gambar"
                            className="custom-file-input"
                            id="inputGroupFile04"
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="inputGroupFile04"
                          >
                            Cari Dokumen
                          </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  {/* {items.cooperation_form} */}
                  Catatan Revisi
                </label>
                <div>
                  <textarea
                    // onFocus={() =>
                    //   setError({ ...error, AllCooperation: "" })
                    // }
                    // onChange={(e) => changeFormCooporation(index, e)}
                    name="cooperation"
                    id=""
                    cols="30"
                    rows="5"
                    className="form-control"
                    placeholder="Masukan Tujuan Kerjasama"
                  ></textarea>
                  {/* {error.AllCooperation ? (
                              <p className="error-text">
                                {error.AllCooperation}
                              </p>
                            ) : (
                              ""
                            )} */}
                </div>
              </div>


              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <button
                    type="submit"
                    className="btn btn-sm btn-rounded-full bg-red-primary text-white"
                  >
                    Tolak
                  </button>
                  <Link href="/partnership/kerjasama/revisi-kerjasama" passHref>
                    <a className="btn btn-sm btn-rounded-full bg-yellow-primary text-white mx-5">
                      Ajukan Revisi
                    </a>
                  </Link>
                  {/* <button
                  
                    type="submit"
                    className="btn btn-sm btn-rounded-full bg-yellow-primary text-white mx-5"
                  >
                    Ajukan Revisi
                  </button> */}
                  <button
                    type="submit"
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white "
                  >
                    Terima
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

export default RevisiKerjasama;
