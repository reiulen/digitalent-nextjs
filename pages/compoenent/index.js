import React from "react";
import IconAdd from "../../components/assets/icon/Add";
import IconEye from "../../components/assets/icon/Eye";
import Link from "next/link";

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
      {/* button rounded full + icon */}
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
      {/* button rounded full just-text */}
      <button className="btn btn-rounded-full bg-blue-secondary text-white">
        Tambah kerjasama
      </button>

      {/* btn link */}
      <Link href="">
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
      <div className="position-relative">
        <svg
          className="left-center-absolute"
          style={{ left: "10" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"
            fill="rgba(255,255,255,1)"
          />
        </svg>
        <input type="text" class="form-control pl-4" placeholder="Cari ..." />
      </div>
    </div>
  );
}
