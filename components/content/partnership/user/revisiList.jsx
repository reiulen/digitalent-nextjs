import React, { useState, useRef, useEffect } from "react";
import PageWrapper from "../../../wrapper/page.wrapper";
import Image from "next/image";

import Style from "../../../../styles/progressbar.module.css";

function RevisiList() {
  const cardContainer = {
    background: "#FFFFFF",
    "box-shadow": "8px 8px 20px rgba(0, 0, 0, 0.15)",
    "border-radius": "5px",
    margin: "1.5rem 0",
    clear: "both",
  };

  return (
    <div className="container">
      <PageWrapper>
        <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
          <div className="card card-custom card-stretch gutter-b">
            <div className="card-header border-0">
              <h3 className="card-title font-weight-bolder text-dark">
                Review Kerjasama
              </h3>
            </div>
            {/* <div className="card-body"> */}
            <div className={`card-body ${Style.refreshZindex}`}>
              <div className={Style.containerProggres}>
                <ul className={Style.progressbar}>
                  <li className={Style.active}>Submit Kerjasama</li>
                  <li className={Style.active}>Review Kerjasama</li>
                  <li>Pembahasan</li>
                  <li>Dokumen Kerjasama</li>
                  <li>Review Dokumen </li>
                  <li>Selesai</li>
                </ul>
              </div>
              <div style={{ marginTop: "100px" }}></div>
              <div className="d-flex" style={cardContainer}>
                <div className="p-5">
                  <h2>Perjanjian Kerjasama</h2>
                  <p>Pengajuan Kerjasama Anda Perlu direvisi.</p>
                  <p>Revisi Versi.1</p>
                </div>
                <div className="ml-auto my-auto pr-5">
                  <button
                    type="button"
                    className="btn btn-outline-success btn-light-success"
                  >
                    Sudah Direvisi
                  </button>
                </div>
              </div>
              <div className="d-flex" style={cardContainer}>
                <div className="p-5">
                  <h2>Perjanjian Kerjasama</h2>
                  <p>Pengajuan Kerjasama Anda Perlu direvisi.</p>
                  <p>Revisi Versi.1</p>
                </div>
                <div className="ml-auto my-auto pr-5">
                  <button type="button" className="btn btn-primary">
                    Lihat Detail Revisi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </div>
  );
}

export default RevisiList;
