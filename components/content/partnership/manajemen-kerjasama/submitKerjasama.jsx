import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";

const SubmitKerjasama = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <PageWrapper>
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              Submit Dokumen Kerjasama
            </h3>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Periode Kerjasama
                </label>
                <div className="col-sm-10">
                  <div className="row align-items-right">
                    <div className="col-lg-3 col-xl-3 mt-5 mt-lg-5">
                      {/* <input
                        type="date"
                        className="form-control form-control-sm"
                      /> */}
                      <DatePicker
                        className="form-search-date form-control-sm form-control"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="dd/MM/yyyy"
                        // minDate={addDays(new Date(), 20)}
                      />
                    </div>
                    <div className="col-lg-3 col-xl-3 mt-5 mt-lg-5">
                      {/* <input
                        type="date"
                        // class = form-search-date
                        className="form-control form-control-sm"
                      /> */}
                      <DatePicker
                        className="form-search-date form-control-sm form-control"
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        maxDate={addDays(startDate, 20)}
                        dateFormat="dd/MM/yyyy"
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
                  Nomer Perjanjian Lembaga
                </label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Nomer Perjanjian Kemkominfo
                </label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Periode Kerjasama
                </label>
                <div className="col-sm-10">
                  <div className="row align-items-right">
                    <div className="col-lg-3 col-xl-3 mt-5 mt-lg-5">
                      <input
                        type="date"
                        className="form-control form-control-sm"
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
                  Upload Dokumen Kerjasama
                </label>
                <div className="col-sm-3">
                  <div class="input-group">
                    <div class="custom-file">
                      <input
                        type="file"
                        name="gambar"
                        class="custom-file-input"
                        id="inputGroupFile04"
                      />
                      <label class="custom-file-label" for="inputGroupFile04">
                        Cari Dokumen
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-2"></div>
                <div className="col-sm-10">
                  <Link href="/">
                    <a
                      className="btn bg-light-danger mr-2 btn-sm"
                      style={{ color: "red" }}
                    >
                      Batalkan
                    </a>
                  </Link>

                  <Link href="/partnership/manajemen-kerjasama/detail-kerjasama">
                    {/* <a
                      className="btn bg-light-danger mr-2 btn-sm"
                      style={{ color: "red" }}
                    >
                      Batalkan
                    </a> */}
                    <button className="btn btn-primary btn-sm">Submit</button>
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

export default SubmitKerjasama;
