import React, { useState, useRef, useEffect } from "react";
import PageWrapper from "../../../wrapper/page.wrapper";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Style from "../../../../styles/progressbar.module.css";
import axios from "axios";

function Pembahasan({ token }) {
  const router = useRouter();

  const [status, setStatus] = useState("");

  useEffect(() => {
    // api cek progress
    async function cekProgresStatus(id) {
      try {
        let { data } = await axios.get(
          `${process.env.END_POINT_API_PARTNERSHIP_MITRA}api/cooperations/proposal/cek-progres/${id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setStatus(data.data.status_migrates_id.status);
      } catch (error) {
        Swal.fire("Gagal", `${error.response.data.message}`, "error")
      }
    }
    cekProgresStatus(router.query.id);
  }, [router.query.id, token]);

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title titles-1 fw-500 text-dark">Pembahasan</h3>
          </div>
          <div className="card-body pb-28">
            <div className="row mt-8 mb-10 position-relative">
              <div className="col-2 p-0">
                <div className="progress-items">
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
                    <span className="title-progress active">Pembahasan</span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress"></div>
                  <div className="circle-progress">
                    <span
                      className="title-progress text-center"
                      style={{ top: "-4rem" }}
                    >
                      Submit Dokumen
                      <br />
                      Kerjasama
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress"></div>
                  <div className="circle-progress">
                    <span
                      className="title-progress text-center"
                      style={{ top: "-4rem" }}
                    >
                      Review Dokumen
                      <br />
                      Kerjasama
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress"></div>
                  <div className="circle-progress">
                    <span className="title-progress">Hasil</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={`row my-10 ${Style.clearRow}`}>
              <div className="col-12 col-sm-6">
                <Image
                  src="/assets/media/hubungi-kami-1.svg"
                  height={300}
                  width={400}
                  alt="hubungi-kami"
                />
              </div>
              <div className="col-12 col-sm-6">
                <div className="d-flex flex-column align-items-start justify-content-center h-100">
                  <h1 className="titles-2 fw-700" style={{ color: "#6C6C6C" }}>
                    Pengajuan Anda Telah Diterima
                  </h1>
                  <p className="mt-5 fz-16">
                    Selamat pengajuan kerjasama Anda telah diterima!
                  </p>
                  <p className="fz-16">
                    Proses pembahasan mengenai detail kerjasama akan Kami
                    infokan kepada PIC Anda
                  </p>
                </div>

                <div className="form-group row">
                  <div className="col-sm-12 d-flex flex-wrap justify-content-end">
                    <Link
                      href="/partnership/user/tanda-tangan-digital"
                      passHref
                    >
                      <a
                        className="btn bg-blue-secondary btn-rounded-full text-white mr-5 mt-3"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        Tanda Tangan Digital
                      </a>
                    </Link>

                    {status === "" ? (
                      ""
                    ) : status === "pengajuan-selesai" ? (
                      <Link
                        href={{
                          pathname:
                            "/partnership/user/kerjasama/submit-dokumen-kerjasama",
                          query: { id: router.query.id },
                        }}
                        passHref
                      >
                        <a
                          className="btn btn-rounded-full bg-blue-primary text-white mt-3"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          Submit Dokumen Kerjasama
                        </a>
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Pembahasan;
