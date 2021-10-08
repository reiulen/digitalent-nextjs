import React, { useState, useRef, useEffect } from "react";
import PageWrapper from "../../../wrapper/page.wrapper";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from 'next/router'
import { useDispatch, useSelector } from "react-redux";

import Style from "../../../../styles/progressbar.module.css";

import {
  rejectCooperation,
  reloadTable
} from "../../../../redux/actions/partnership/user/cooperation.actions";

import axios from "axios";

function ReviewKerjasama({token}) {
  const router = useRouter()
  let dispatch = useDispatch();
  

  const {successSubmitKerjasama} = router.query

  const onNewReset = () => {
    router.replace("/partnership/user/kerjasama/review-kerjasama-1", undefined, { shallow: true });
  };

  const cooperationRejection = () =>{
    // e.preventDefault()

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
        dispatch(rejectCooperation(router.query.id,token));
        // setDeleteBar(true);
        // setIsStatusBar(true);
        router.push({
              pathname: `/partnership/user/kerjasama/`,
              query: { successUpdateStatus: true },
            });
        // router.push("/partnership/user/kerjasama");
        
      } else {
        dispatch(reloadTable());
      }
    });

  }

  const [status, setStatus] = useState("");

  useEffect(() => {

    async function cekProgresStatus(id,token){
      try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP_MITRA}api/cooperations/proposal/cek-progres/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("data a a a ssss", data.data.status_migrates_id.status);
      if(data.data.status_migrates_id.status === "pengajuan-revisi"){
        router.push({
          pathname:"/partnership/user/kerjasama/review-kerjasama-2",
          query:{id:router.query.id}
        })
      }
      if((data.data.status_migrates_id.status === "pengajuan-selesai") || (data.data.status_migrates_id.status === "pengajuan-pembahasan")  ){
        router.push({
          pathname:"/partnership/user/kerjasama/pembahasan-2",
          query:{id:router.query.id}
        })
      }
      setStatus(data.data.status_migrates_id.status);
    } catch (error) {
      console.log("gagal get province", error);
    }

    }



    cekProgresStatus(router.query.id,token);


  }, [router.query.id,router,token])

  // const onNewReset = () => {
  //   router.replace(`/partnership/user/kerjasama/review-kerjasama-1`);
  // };

  return (
    <PageWrapper>
      {successSubmitKerjasama ? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
          style={{ backgroundColor: "#C9F7F5" }}
        >
          <div className="alert-icon">
            <i className="flaticon2-checkmark" style={{ color: "#1BC5BD" }}></i>
          </div>
          <div className="alert-text" style={{ color: "#1BC5BD" }}>
            Berhasil menyimpan data
          </div>
          <div className="alert-close">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => onNewReset()}
            >
              <span aria-hidden="true">
                <i className="ki ki-close"></i>
              </span>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title fz-20 fw-500 text-dark">
              Review Kerjasama
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
                    <span className="title-progress">
                      Submit Dokumen Kerjasama
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress"></div>
                  <div className="circle-progress">
                    <span className="title-progress">
                      Review Dokumen Kerjasama
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
                  <h1 className="fz-40 fw-700" style={{color:"#6C6C6C"}}>Terima Kasih</h1>
                  <p className="mt-5 fz-16">Kamu telah berhasil melakukan pengajuan kerjasama dengan kami</p>
                  <p className="fz-16">Dibutuhkan beberapa waktu untuk melakukan proses review pada pengajuanmu.</p>
                </div>

                <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">

                  <Link href="/partnership/user/kerjasama" passHref>
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
                    </a>
                  </Link>

                      <button
                    type="button"
                    className="btn btn-sm btn-rounded-full bg-red-primary text-white"
                    onClick={() =>
                                          cooperationRejection(router.query.id)
                                        }
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
