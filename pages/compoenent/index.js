import React, { useState } from "react";
// import IconAdd from "../../components/assets/icon/Add";
// import IconEye from "../../components/assets/icon/Eye";
import Link from "next/link";
import DatePicker from "react-datepicker";
import IconCalender from "../../components/assets/icon/Calender";

//======= untuk component button hanya tinggal ganti
// 1. background-color sesuaikan
// 2. color text sesuaikan

// ===== untuk component button link dan action
// 1. icon sesuaikan
// 2. backgournd color sesuaikan

export default function index() {
  return (
    <div className="p-4" style={{ backgroundColor: "white" }}>
      <h1>Compoenent OTW</h1>
      {/* button rounded full + icon left */}
      <button className="btn btn-rounded-full bg-blue-primary text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          className="mr-3"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
            fill="rgba(255,255,255,1)"
          />
        </svg>
        Tambah kerjasama
      </button>
      {/* button rounded full + icon right */}
      <button className="btn btn-rounded-full bg-blue-primary text-white">
        Export
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          className="ml-3"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"
            fill="rgba(255,255,255,1)"
          />
        </svg>
      </button>
      {/* button rounded full just-text */}
      <button className="btn btn-rounded-full bg-blue-secondary text-white">
        Tambah kerjasama
      </button>

      {/* btn link */}
      <Link href="/compoenent">
        <a className="btn btn-link-action bg-yellow-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="14"
            height="12"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M1.181 12C2.121 6.88 6.608 3 12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
              fill="rgba(255,255,255,1)"
            />
          </svg>
        </a>
      </Link>
      {/* btn action */}
      {/* eye */}

      <button className="btn btn-link-action bg-red-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="14"
          height="12"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M1.181 12C2.121 6.88 6.608 3 12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
            fill="rgba(255,255,255,1)"
          />
        </svg>
      </button>
      {/* edit */}
      <button className="btn btn-link-action bg-red-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="14"
          height="12"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M12.9 6.858l4.242 4.243L7.242 21H3v-4.243l9.9-9.9zm1.414-1.414l2.121-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z"
            fill="rgba(255,255,255,1)"
          />
        </svg>
      </button>
      {/* hapus */}
      <button className="btn btn-link-action bg-red-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="14"
          height="12"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"
            fill="rgba(255,255,255,1)"
          />
        </svg>
      </button>
      {/* input search */}
      <div className="position-relative" style={{ maxWidth: "280px" }}>
        <svg
          className="left-center-absolute"
          style={{ left: "10" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16"
          height="16"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"
            fill="#E4E6EF"
          />
        </svg>
        <input
          type="text"
          className="form-control pl-10"
          placeholder="Cari ..."
        />
      </div>
      {/* filter */}
      <button
        className="btn border d-flex align-items-center justify-content-between"
        style={{ minWidth: "280px", color: "#bdbdbd" }}
      >
        <div className="d-flex align-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            className="mr-3"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M10 14L4 5V3h16v2l-6 9v6l-4 2z" fill="#E4E6EF" />
          </svg>
          Pilih Filter
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"
            fill="#E4E6EF"
          />
        </svg>
      </button>
      {/* modal filter */}

      <button
        className="avatar item-rtl btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        Untuk filter
        {/* <Image src={gambarPreview} alt="image" width={60} height={60} /> */}
      </button>
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Filter
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                </svg>
              </button>
            </div>
            <div className="modal-body text-center" style={{ height: "400px" }}>
              {/* <Image
                src={gambarPreview}
                alt="image"
                layout="fill"
                objectFit="cover"
              /> */}
              <form
                id="kt_docs_formvalidation_text"
                className="form text-left"
                action="#"
                autoComplete="off"
                // onSubmit={submit}
              >
                <div className="fv-row mb-10">
                  <label className="required fw-bold fs-6 mb-2">
                    Kategori Kerjasama
                  </label>

                  <select
                    className="form-select form-control"
                    aria-label="Select example"
                  >
                    <option>Semua</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="fv-row mb-10">
                  <label className="required fw-bold fs-6 mb-2">
                    Kategori Kerjasama
                  </label>
                  <select
                    className="form-select form-control"
                    aria-label="Select example"
                  >
                    <option>Semua</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <div className="d-flex justify-content-end align-items-center">
                <Link href="/compoenent">
                  <a className="btn btn-white">Reset</a>
                </Link>
                <button className="btn btn-primary ml-4" type="submit">
                  Terapkan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* input date */}
      <div className="d-flex align-items-center position-relative datepicker-w">
        <DatePicker
          // onFocus={() => setError({ ...error, period_date_start: "" })}
          className="form-search-date form-control-sm form-control cursor-pointer"
          // selected={startDate}
          // onChange={(date) => onChangePeriodeDateStart(date)}
          selectsStart
          // value={period_date_start}
          // startDate={startDate}
          // endDate={endDate}
          dateFormat="YYYY-MM-DD"
          placeholderText="Dari Tanggal"
          // minDate={moment().toDate()}
        />
        <IconCalender
          className="right-center-absolute"
          style={{ right: "10px" }}
        />
      </div>
    </div>
  );
}
