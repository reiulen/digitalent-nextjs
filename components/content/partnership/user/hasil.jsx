import React, { useState, useRef, useEffect } from "react";
import PageWrapper from "../../../wrapper/page.wrapper";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from 'next/router'

import Style from "../../../../styles/progressbar.module.css";

function Hasil({token}) {
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
  
const [status, setStatus] = useState("");
const [idKerjsama, setIdKerjsama] = useState("")
  // validasi content jika selesai ditolah dan berakhir
  useEffect(() => {
    setIdKerjsama(router.query.id)
    setStatus(router.query.statusKerjasama)
  }, [router.query.statusKerjasama,router.query.id])

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title fz-20 fw-500 text-dark">
              Hasil
            </h3>
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
                    <span className="title-progress">
                      Submit Dokumen Kerjasama
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress active-line"></div>
                  <div className="circle-progress active-circle">
                    <span className="title-progress">
                      Review Dokumen Kerjasama
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

            {status === "" ? "" : status === "aktif" ? 

            <div className={`row my-10 ${Style.clearRow}`}>
              <div className="col-12 col-sm-6">
                <Image
                  src="/assets/icon/konfirmasi-1.svg"
                  height={300}
                  width={400}
                  alt="konfirmasi-1"
                />
              </div>
              <div className="col-12 col-sm-6">
                <div className="d-flex flex-column align-items-start justify-content-center h-100">
                  <h1 className="fz-40 fw-700" style={{color:"#6C6C6C"}}>Selamat!</h1>
                  <p className="mt-5 fz-16">Terima Kasih telah Melakukan Pengajuan Kerjasama </p>
                  <p className="fz-16">Dengan Kami. Pengajuan Kerjasamamu telah berhasil.</p>
                </div>

                <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  {/* <Link href="/partnership/kerjasama">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
                    </a>
                  </Link> */}
                  <button
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white "
                    onClick={() =>
                                          router.push(
                                            `/partnership/user/kerjasama/${idKerjsama}`
                                          )
                                        }
                  >
                    Detail
                  </button>



                </div>
              </div>





              </div>
            </div>
          
          :status === "tidak aktif" ?  <div className={`row my-10 ${Style.clearRow}`}>
              <div className="col-12 col-sm-6">
                <Image
                  src="/assets/icon/konfirmasi-1.svg"
                  height={300}
                  width={400}
                  alt="konfirmasi-1"
                />
              </div>
              <div className="col-12 col-sm-6">
                <div className="d-flex flex-column align-items-start justify-content-center h-100">
                  <h1 className="fz-40 fw-700" style={{color:"#6C6C6C"}}>Berakhir</h1>
                  <p className="mt-5 fz-16">Periode kerjasamamu telah berakhir.
 </p>
                  <p className="fz-16">Ajukan kembali untuk memperpanjang periode kerjasama.</p>
                </div>

                <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  {/* <Link href="/partnership/kerjasama">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
                    </a>
                  </Link> */}
                  <button
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white "
                    onClick={() =>
                                          router.push(
                                            `/partnership/user/kerjasama/${idKerjsama}`
                                          )
                                        }
                  >
                    Detail
                  </button>
                </div>
              </div>





              </div>
            </div>
           :<div className={`row my-10 ${Style.clearRow}`}>
              <div className="col-12 col-sm-6">
                <Image
                  src="/assets/icon/konfirmasi-1.svg"
                  height={300}
                  width={400}
                  alt="konfirmasi-1"
                />
              </div>
              <div className="col-12 col-sm-6">
                <div className="d-flex flex-column align-items-start justify-content-center h-100">
                  <h1 className="fz-40 fw-700" style={{color:"#6C6C6C"}}>Mohon Maaf</h1>
                  <p className="mt-5 fz-16">Pengajuan kerja sama anda tidak berhasil. 

 </p>
                  <p className="fz-16">Silakan ajukan kembali di lain waktu.</p>
                </div>

                <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  {/* <Link href="/partnership/kerjasama">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
                    </a>
                  </Link> */}
                  <button
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white "
                    onClick={() =>
                                          router.push(
                                            `/partnership/user/kerjasama/${idKerjsama}`
                                          )
                                        }
                  >
                    Detail
                  </button>

                </div>
              </div>





              </div>
            </div>}
          
          
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Hasil;
