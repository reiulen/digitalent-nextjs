import React, { useState, useRef, useEffect } from "react";
import PageWrapper from "../../../wrapper/page.wrapper";
import Image from "next/image";

function Selesai() {
  const headText = {
    "font-weight": "bold",
    "line-height": "124.5%",
    "margin-top": "4rem",
    color: "#626262",
  };

  const childText = {
    "font-weight": "normal",
    "font-size": "15px",
    "line-height": "124.5%",
    "margin-top": "1rem",
    color: "#626262",
  };

  return (
    <div className="container">
      <PageWrapper>
        <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
          <div className="card card-custom card-stretch gutter-b">
            <div className="card-header border-0">
              <h3 className="card-title font-weight-bolder text-dark">
                Pembahasan
              </h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md">
                  <Image
                    src="/assets/media/selesai.svg"
                    height={300}
                    width={400}
                    alt="selesai"
                  />
                </div>
                <div className="col-md mt-5">
                  <div className="display-4" style={headText}>
                    Selamat !
                  </div>
                  <div style={childText}>
                    <p>
                      Pengajuan Kerjasama anda telah selesai
                      <br />
                    </p>
                  </div>

                  <div className="mt-5">
                    <button
                      type="button"
                      className="btn btn-primary mr-2 btn-sm"
                    >
                      Kembali
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </div>
  );
}

export default Selesai;
