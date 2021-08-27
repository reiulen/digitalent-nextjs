import React, { useState, useRef, useEffect } from "react";
import PageWrapper from "../../../wrapper/page.wrapper";
import Image from "next/image";
import Link from "next/link";

import Style from "../../../../styles/progressbar.module.css";

function Pembahasan() {
  const headText = {
    "font-weight": "bold",
    "line-height": "124.5%",
    "margin-top": "2rem",
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
            <div className={`card-body ${Style.refreshZindex}`}>
              <div className={Style.containerProggres}>
                <ul className={Style.progressbar}>
                  <li className={Style.active}>Submit Kerjasama</li>
                  <li className={Style.active}>Review Kerjasama</li>
                  <li className={Style.active}>Pembahasan</li>
                  <li>Dokumen Kerjasama</li>
                  <li>Review Dokumen </li>
                  <li>Selesai</li>
                </ul>
              </div>

              <div className={`row ${Style.clearRow}`}>
                <div className="col-md">
                  <Image
                    src="/assets/media/hubungi-kami-1.svg"
                    height={300}
                    width={400}
                    alt="hubungi-kami-1"
                  />
                </div>
                <div className="col-md mt-5">
                  <div className="display-4" style={headText}>
                    Pengajuan Anda Telah diterima
                  </div>
                  <div style={childText}>
                    <p>
                      Selamat! Pengajuan anda telah diterima.
                      <br />
                    </p>
                    <span className="mt-5">
                      Selanjutnya proses pembahasan detail kerjasama akan di
                      infokan ke kontak PIC anda
                    </span>
                  </div>

                  <div className="mt-5">
                    <button
                      type="button"
                      className="btn border border-success bg-light-success mr-2 btn-sm"
                      style={{ color: "#04AA77" }}
                    >
                      Input Tanda Tangan Digital
                    </button>
                    <Link href="/partnership/user/pembahasan" passHref>
                      <button
                        type="button"
                        className="btn border border-primary bg-light-primary mr-2 btn-sm"
                        style={{ color: "#6AA0D6" }}
                      >
                        Submit Dokumen Kerjasama
                      </button>
                    </Link>
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

export default Pembahasan;
