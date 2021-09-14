import React, { useEffect, useState } from "react";
import PageWrapper from "../../../wrapper/page.wrapper";
import IconUser from "../../../assets/icon/User";
import IconDoc from "../../../assets/icon/Doc";
import ImageHero from "../../../../public/assets/media/logos/hero1.png";
import ImagePlants from "../../../../public//assets/media/logos/Plants1.png";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDashboard
} from "../../../../redux/actions/partnership/dashboard.action";

import Image from "next/image";
export default function DashboardPage() {
  let dispatch = useDispatch();
  const allDashboard = useSelector(state => state.allDashboard)
  console.log("allDashboard",allDashboard)

  useEffect(() => {
    dispatch(fetchDashboard())
  }, [dispatch])
  return (
    <PageWrapper>
      {/* head content */}

      <div
        className="position-relative br-12 bg-neutral py-10 px-6 overflow-hidden"
        style={{ height: "197px", maxHeight: "197px" }}
      >
        {/* <img src="/assets/media/logos/hero1.png"  alt="imagehero" className="right-center-absolute" /> */}

        <div className="right-center-absolute">
          <Image src={ImageHero} alt="imagehero" />
        </div>

        {/* <Image src={ImageHero} alt="imagehero" className="right-center-absolute"   /> */}

        <div className="left-bottom-absolute">
          <Image src={ImagePlants} alt="imagehero" />
        </div>
        {/* <Image src={ImagePlants} alt="imagehero" className="right-center-absolute"   /> */}

        {/* <Image src="/assets/media/logos/Plants1.png" alt="imagehero" className="left-bottom-absolute" layout='fill'
    objectFit='fill' /> */}

        {/* <img src="/assets/media/logos/Plants1.png"  alt="imagehero" className="left-bottom-absolute" /> */}



        <h5 className="text-blue-secondary fw-600 fz-18">Hallo Admin A</h5>
        <p className="text-gray-primary fw-600 fz-12">
          Sudah Makan Hari ini?
          <br />
          Kalau sudah yuk dicheck verifikasi Test untuk hari ini :)
        </p>
      </div>
      {/* sec 1 */}
      <div className="row mt-8">
        <div className="col-12 col-sm-6">
          <div className="br-12 bg-blue-primary p-10 text-white mt-2">
            <IconUser />
            <h5 className="mt-4 fw-700 fz-24">{allDashboard.data_dashboard.data?.mitra}</h5>
            <h5 className="fw-500 fz-14">Total Mitra</h5>
          </div>
        </div>
        <div className="col-12 col-sm-6">
          <div className="br-12 bg-blue-dark p-10 text-white mt-2">
            <IconDoc />
            <h5 className="mt-4 fw-700 fz-24">{allDashboard.data_dashboard.data?.cooperation_non_active}</h5>
            <h5 className="fw-500 fz-14">Total Kerjasama Tidak Aktif</h5>
          </div>
        </div>
      </div>
      {/* sec 2 */}
      <div className="row mt-8">
        <div className="col-12 col-sm-6">
          <div className="br-12 bg-white px-10 py-6 mt-2">
            <h5 className="mt-4 fw-600 fz-16 text-blue-thirty">
              Berdasarkan Status Pengajuan
            </h5>
            <h5 className="fw-500 fz-14 text-gray-secondary">
              {allDashboard.data_dashboard.data?.cooperation_submission} Total Pengajuan
            </h5>
            <h1 className="py-14 text-center">Grafik onProgress</h1>
            <div className="row">
              <div className="col-12 col-sm-4">
                <div className="d-flex align-items-center">
                  <div
                    className="br-5 bg-blue-primary d-flex justify-content-center align-items-center"
                    style={{ minWidth: "44px", height: "44px" }}
                  >
                    {/* icon disini otw  */}
                  </div>

                  <div className="ml-4">
                    <p className="mb-0 fz-16 fw-600 text-blue-primary">{allDashboard.data_dashboard.data?.cooperation_active}</p>
                    <p className="mb-0 mt-2 text-gray-secondary fw-500 fz-12">
                      Aktif
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-4">
                <div className="d-flex align-items-center">
                  <div
                    className="br-5 bg-blue-extras d-flex justify-content-center align-items-center"
                    style={{ minWidth: "44px", height: "44px" }}
                  >
                    {/* icon disini otw  */}
                  </div>

                  <div className="ml-4">
                    <p className="mb-0 fz-16 fw-600 text-blue-primary">{allDashboard.data_dashboard.data?.cooperation_approved}</p>
                    <p className="mb-0 mt-2 text-gray-secondary fw-500 fz-12">
                      Disetujui
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-4">
                <div className="d-flex align-items-center">
                  <div
                    className="br-5 bg-blue-secondary d-flex justify-content-center align-items-center"
                    style={{ minWidth: "44px", height: "44px" }}
                  >
                    {/* icon disini otw  */}
                  </div>

                  <div className="ml-4">
                    <p className="mb-0 fz-16 fw-600 text-blue-primary">{allDashboard.data_dashboard.data?.cooperation_rejected}</p>
                    <p className="mb-0 mt-2 text-gray-secondary fw-500 fz-12">
                      Ditolak
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6">
          <div className="br-12 bg-white px-10 py-6 mt-2">
            <h5 className="mt-4 fw-600 fz-16 text-blue-thirty">
              Berdasarkan Pengajuan Disetujui
            </h5>
            <h5 className="fw-500 fz-14 text-gray-secondary">
              {allDashboard.data_dashboard.data?.cooperation_approved} Total Pengajuan
            </h5>
            <h1 className="py-14 text-center">Grafik onProgress</h1>
            <div className="row">
              <div className="col-12 col-sm-4">
                <div className="d-flex align-items-center">
                  <div
                    className="br-5 bg-blue-primary d-flex justify-content-center align-items-center"
                    style={{ minWidth: "44px", height: "44px" }}
                  >
                    {/* icon disini otw  */}
                  </div>

                  <div className="ml-4">
                    <p className="mb-0 fz-16 fw-600 text-blue-primary">{allDashboard.data_dashboard.data?.cooperation_active}</p>
                    <p className="mb-0 mt-2 text-gray-secondary fw-500 fz-12">
                      Berjalan
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-4">
                <div className="d-flex align-items-center">
                  <div
                    className="br-5 bg-blue-extras d-flex justify-content-center align-items-center"
                    style={{ minWidth: "44px", height: "44px" }}
                  >
                    {/* icon disini otw  */}
                  </div>

                  <div className="ml-4">
                    <p className="mb-0 fz-16 fw-600 text-blue-primary">{allDashboard.data_dashboard.data?.cooperation_will_expired}</p>
                    <p className="mb-0 mt-2 text-gray-secondary fw-500 fz-12">
                      Akan Berakhir
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-4">
                <div className="d-flex align-items-center">
                  <div
                    className="br-5 bg-blue-secondary d-flex justify-content-center align-items-center"
                    style={{ minWidth: "44px", height: "44px" }}
                  >
                    {/* icon disini otw  */}
                  </div>

                  <div className="ml-4">
                    <p className="mb-0 fz-16 fw-600 text-blue-primary">{allDashboard.data_dashboard.data?.cooperation_submission}</p>
                    <p className="mb-0 mt-2 text-gray-secondary fw-500 fz-12">
                      Berakhir
                    </p>
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
