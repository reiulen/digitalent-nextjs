import React from "react";
import IconTime from "../../../components/assets/icon-dashboard-peserta/Time";
import IconPeserta from "../../../components/assets/icon-dashboard-peserta/Time";

export default function card({children,label}) {
  return (
    <div className="cards-items">
      <div className="top">
        {label}
      </div>
      <div className="rounded"></div>

      <div className="bottom">
        {children}
        {/* <div className="rounded"></div>
        <div className="d-flex align-items-center justify-content-between pl-24">
          <p className="fw-600" style={{ color: "#6C6C6C" }}>
            Gojek
          </p>
          <button className="btn btn-green-rounded">OPEN</button>
        </div>
        <h1 className="fz-18 fw-600 mt-4" style={{ color: "#1F1F1F" }}>
          Intermediate Multimedia Designer
        </h1>
        <h3 className="mb-0 fz-18 fw-400 mt-4" style={{ color: "#6C6C6C" }}>
          Vocational School Graduate Academy
        </h3>
        <hr />

        <div className="mt-2">
          <div className="d-flex align-items-center">
            <IconTime className="mr-2" />
            Registrasi: 05 Juli 2021 - 21 Juli 2021
          </div>
          <div className="d-flex align-items-center mt-2">
            <IconPeserta className="mr-2" />
            Kuota: 1000 Peserta
          </div>
        </div> */}
      </div>
    </div>
  );
}
