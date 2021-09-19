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

const ReviewKerjasama = () => {
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
              Review Kerjasama
            </h3>
          </div>
          <div className="card-body">
            <form>
              <div className="fv-row mb-10">
                <label className="required fw-bold fs-6 mb-2">Tanggal</label>
                <input
                  readOnly
                  // value={date}
                  type="text"
                  className="form-control mb-3 mb-lg-0"
                />
                {/* {error.date ? <p className="error-text">{error.date}</p> : ""} */}
              </div>
              <div className="fv-row mb-10">
                <label className="required fw-bold fs-6 mb-2">
                  Judul Kerjasama
                </label>
                <input
                  // onFocus={() => setError({ ...error, title: "" })}
                  type="text"
                  name="text_input"
                  className="form-control mb-3 mb-lg-0"
                  placeholder="Masukan judul kerjasama"
                  // onChange={(e) => setTitle(e.target.value)}
                />
                {/* {error.title ? <p className="error-text">{error.title}</p> : ""} */}
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Kategori kerjasama
                </label>
                <div>
                  <select
                    // onFocus={() => setError({ ...error, cooperationC_id: "" })}
                    // onChange={(e) => changeSetCooperationC_id(e.target.value)}
                    className="form-control"
                  >
                    <option value="">Pilih Kategory Kerjasama</option>
                    {/* {allMK.cooperationActiveSelect.length === 0
                      ? ""
                      : allMK.cooperationActiveSelect.data.map(
                          (items, index) => {
                            return (
                              <option key={index} value={items.id}>
                                {items.cooperation_categories}
                              </option>
                            );
                          }
                        )} */}
                  </select>
                  {/* {error.cooperationC_id ? (
                    <p className="error-text">{error.cooperationC_id}</p>
                  ) : (
                    ""
                  )} */}
                </div>
              </div>
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

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  {/* {items.cooperation_form} */}
                  Tujuan Kerjasama
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
                  <Link href="/partnership/kerjasama/detail-revisi-kerjasama" passHref>
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

export default ReviewKerjasama;
