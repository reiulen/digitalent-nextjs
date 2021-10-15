import React, { useState, useRef, useEffect } from "react";
import PageWrapper from "../../../wrapper/page.wrapper";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import Style from "../../../../styles/progressbar.module.css";
import { getSession } from "next-auth/client";

function Hasil({ token }) {
  const router = useRouter();
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

  const [user, setUser] = useState("")

  const [status, setStatus] = useState("");
  const [idKerjsama, setIdKerjsama] = useState("");
  // validasi content jika selesai ditolak dan berakhir
  useEffect(() => {
    getSession().then((session) => {
      setUser(session.user.user.data.user);
    });
    setIdKerjsama(router.query.id);
    setStatus(router.query.statusKerjasama);
  }, [router.query.statusKerjasama, router.query.id]);

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title fz-20 fw-500 text-dark">Hasil</h3>
          </div>
          <div className="card-body pb-28">
            <div className="row mt-8 mb-10">
              <div className="col-2 p-0">
                <div className="progress-items">
                  {/* <div className="line-progress"></div> */}
                  <div className="circle-progress active-circle">
                    <span className="title-progress">Submit Kerjasama</span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress active-line"></div>
                  <div className="circle-progress active-circle">
                    <span className="title-progress">Review Kerjasama</span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress active-line"></div>
                  <div className="circle-progress active-circle">
                    <span className="title-progress">Pembahasan</span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress active-line"></div>
                  <div className="circle-progress active-circle">
                    <span className="title-progress text-center" style={{top:"-4rem"}}>
                      Submit Dokumen<br/>Kerjasama
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress active-line"></div>
                  <div className="circle-progress active-circle">
                    <span className="title-progress text-center" style={{top:"-4rem"}}>
                      Review Dokumen<br/>Kerjasama
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress active-line"></div>
                  <div className="circle-progress active-circle">
                    <span className="title-progress">Hasil</span>
                  </div>
                </div>
              </div>
            </div>

            {status === "" ? (
              ""
            ) : status === "aktif" ? (
              <div className={`row my-10 ${Style.clearRow}`}>
                <div className="col-12 col-sm-6">
                  <Image
                    src="/assets/icon/hasilAktif.svg"
                    height={300}
                    width={400}
                    alt="konfirmasi-1"
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <div className="d-flex flex-column align-items-start justify-content-center h-100">
                    <h1 className="fz-40 fw-700" style={{ color: "#6C6C6C" }}>
                      Selamat, Pengajuan Diterima!
                    </h1>
                    <p className="mt-5 fz-16">
                      Selamat kepada {user.name} pengajuan kerjasamanya telah diterima. </p>
                  </div>

                  <div className="form-group row">
                    <div className="col-sm-12 d-flex justify-content-end">
                      {/* <Link href="/partnership/kerjasama">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
                    </a>
                  </Link> */}
{/* 
                      <button
                        className="btn btn-sm btn-rounded-full bg-blue-primary text-white "
                        onClick={() =>
                          router.push(
                            `/partnership/user/kerjasama/${idKerjsama}`
                          )
                        }
                      >
                        Kembali
                      </button> */}

                      <Link href="/partnership/user/kerjasama">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
                    </a>
                  </Link>



                    </div>
                  </div>
                </div>
              </div>
            ) : status === "tidak aktif" ? (
              <div className={`row my-10 ${Style.clearRow}`}>
                <div className="col-12 col-sm-6">
                  <Image
                    src="/assets/icon/berakhirIcon.svg"
                    height={300}
                    width={400}
                    alt="konfirmasi-1"
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <div className="d-flex flex-column align-items-start justify-content-center h-100">
                    <h1 className="fz-40 fw-700" style={{ color: "#6C6C6C" }}>
                      Kerjasama Berakhir!
                    </h1>
                    <p className="mt-5 fz-16">
                      Periode kerjasama {user.name} telah berakhir. Silahkan ajukan kembali untuk memperpanjang periode kerjasama.
                    </p>
                  </div>

                  <div className="form-group row">
                    <div className="col-sm-12 d-flex justify-content-end">
                      {/* <Link href="/partnership/kerjasama">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
                    </a>
                  </Link> */}
                      <Link href="/partnership/user/kerjasama">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
                    </a>
                  </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`row my-10 ${Style.clearRow}`}>
                <div className="col-12 col-sm-6">
                  <Image
                    src="/assets/icon/tolakIcon.svg"
                    height={300}
                    width={400}
                    alt="konfirmasi-1"
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <div className="d-flex flex-column align-items-start justify-content-center h-100">
                    <h1 className="fz-40 fw-700" style={{ color: "#6C6C6C" }}>
                      Maaf, Pengajuan Ditolak
                    </h1>
                    <p className="mt-5 fz-16">
                      Mohon maaf pengajuan kerjasama {user.name} ditolak. Anda dapat mengajukan kerjasama lagi di lain waktu.
                    </p>
                  </div>

                  <div className="form-group row">
                    <div className="col-sm-12 d-flex justify-content-end">
                      {/* <Link href="/partnership/kerjasama">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
                    </a>
                  </Link> */}
                      <Link href="/partnership/user/kerjasama">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
                    </a>
                  </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Hasil;
