import React, { useState, useEffect } from "react";
import PageWrapper from "../../../wrapper/page.wrapper";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import Style from "../../../../styles/progressbar.module.css";
import Swal from "sweetalert2";
import {
  rejectCooperation,
  reloadTable,
} from "../../../../redux/actions/partnership/user/cooperation.actions";

import axios from "axios";
import AlertBar from "../components/BarAlert";

function ReviewKerjasama({ token }) {
  const router = useRouter();
  let dispatch = useDispatch();

  const { successSubmitKerjasama } = router.query;

  const onNewReset = () => {
    router.replace("/partnership/user/kerjasama/review-kerjasama", undefined, {
      shallow: true,
    });
  };

  const cooperationRejection = () => {
    Swal.fire({
      title: "Apakah anda yakin ingin batalkan kerjasama ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya !",
      dismissOnDestroy: false,
    }).then(async (result) => {
      if (result.value) {
        dispatch(rejectCooperation(router.query.id, token));
        router.push({
          pathname: `/partnership/user/kerjasama/`,
          query: { successUpdateStatus: true },
        });
      } else {
        dispatch(reloadTable());
      }
    });
  };

  const [status, setStatus] = useState("");

  useEffect(() => {
    async function cekProgresStatus(id, token) {
      try {
        let { data } = await axios.get(
          `${process.env.END_POINT_API_PARTNERSHIP_MITRA}api/cooperations/proposal/cek-progres/${id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (data.data.status_migrates_id.status === "pengajuan-revisi") {
          router.push({
            pathname: "/partnership/user/kerjasama/review-list-kerjasama",
            query: { id: router.query.id },
          });
        }
        if (
          data.data.status_migrates_id.status === "pengajuan-selesai" ||
          data.data.status_migrates_id.status === "pengajuan-pembahasan"
        ) {
          router.push({
            pathname: "/partnership/user/kerjasama/pembahasan",
            query: { id: router.query.id },
          });
        }
        if (data.data.status_migrates_id.status === "dibatalkan") {
          router.push({
            pathname: "/partnership/user/kerjasama/hasil",
            query: {
              id: router.query.id,
              statusKerjasama: data.data.status_migrates_id.status,
            },
          });
        }
        setStatus(data.data.status_migrates_id.status);
      } catch (error) {
        Swal.fire("Gagal", `${error.response.data.message}`, "error")
      }
    }

    cekProgresStatus(router.query.id, token);
  }, [router.query.id, router, token]);

  return (
    <PageWrapper>
      {successSubmitKerjasama ? (
        <AlertBar
          text="Berhasil menyimpan data"
          className="alert-light-success"
          onClick={() => onNewReset()}
        />
      ) : (
        ""
      )}
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title titles-1 fw-500 text-dark">
              Review Kerjasama
            </h3>
          </div>
          <div className="card-body pb-28 pt-0">
            <div className="row mt-8 mb-10 position-relative">
              <div className="col-2 p-0 relative-progress">
                <div className="progress-items">
                  <div className="circle-progress active-circle">
                    <span className="title-progress active">
                      Submit Kerjasama
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress"></div>
                  <div className="circle-progress">
                    <span className="title-progress">Review Kerjasama</span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress"></div>
                  <div className="circle-progress">
                    <span className="title-progress">Pembahasan</span>
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
                    Pengajuan Terkirim!
                  </h1>
                  <p className="mt-5 fz-16">
                    Terima kasih telah mengajukan kerjasama bersama Kami. Mohon
                    tunggu dalam beberapa waktu karena Kami akan segera
                    memproses pengajuan kerjasamamu.{" "}
                  </p>
                </div>

                <div className="form-group row">
                  <div className="col-sm-12 d-flex flex-wrap justify-content-end">
                    <Link href="/partnership/user/kerjasama" passHref>
                      <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5 mt-2">
                        Kembali
                      </a>
                    </Link>

                    <button
                      type="button"
                      className="btn btn-sm btn-rounded-full bg-red-primary text-white mt-2"
                      onClick={() => cooperationRejection(router.query.id)}
                    >
                      Batalkan Kerjasama
                    </button>
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

export default ReviewKerjasama;
