import React, { useEffect, useState } from "react";
import PageWrapper from "../../../wrapper/page.wrapper";
import IconUser from "../../../assets/icon/User";
import IconDoc from "../../../assets/icon/Doc";

import Image from 'next/image'
export default function DashboardPage() {
  return (
    <PageWrapper>
      {/* head content */}
      <div className="position-relative br-12 bg-neutral py-10 px-6 overflow-hidden" style={{height:"197px",maxHeight:"197px"}}>
        <img src="/assets/media/logos/hero1.png"  alt="imagehero" className="right-center-absolute" />
        <img src="/assets/media/logos/Plants1.png"  alt="imagehero" className="left-bottom-absolute" />
        
        <h5 className="text-blue-secondary fw-600 fz-18">Hallo Admin A</h5>
        <p className="text-gray-primary fw-600 fz-12">
          Sudah Makan Hari ini?<br/>Kalau sudah yuk dicheck verifikasi Test untuk hari ini :)
        </p>

      </div>
      {/* sec 1 */}
      <div className="row mt-8">
        <div className="col-12 col-sm-6">
          <div className="br-12 bg-blue-primary p-10 text-white mt-2">
            <IconUser />
            <h5 className="mt-4 fw-700 fz-24">1.000</h5>
            <h5 className="fw-500 fz-14">Total Mitra</h5>
          </div>
        </div>
        <div className="col-12 col-sm-6">
          <div className="br-12 bg-blue-dark p-10 text-white mt-2">
            <IconDoc />
            <h5 className="mt-4 fw-700 fz-24">700</h5>
            <h5 className="fw-500 fz-14">Total Kerjasama Tidak Aktif</h5>
          </div>
        </div>
      </div>
      {/* sec 2 */}
      <div className="row mt-8">
        <div className="col-12 col-sm-6">
          <div className="br-12 bg-white px-10 py-6 mt-2">
            <h5 className="mt-4 fw-600 fz-16 text-blue-thirty">Berdasarkan Status Pengajuan</h5>
            <h5 className="fw-500 fz-14 text-gray-secondary">700 Total Pengajuan</h5>
            <h1 className="py-14 text-center">
              Grafik onProgress
            </h1>
            <div className="row">
              <div className="col-12 col-sm-4">
                <div className="d-flex align-items-center">
                  <div className="br-5 bg-blue-primary d-flex justify-content-center align-items-center" style={{minWidth:"44px",height:"44px"}}>
                    {/* icon disini otw  */}
                  </div>
                  
                  <div className="ml-4">
                  <p className="mb-0 fz-16 fw-600 text-blue-primary">200</p>
                  <p className="mb-0 mt-2 text-gray-secondary fw-500 fz-12">Aktif</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-4">
                <div className="d-flex align-items-center">
                  <div className="br-5 bg-blue-extras d-flex justify-content-center align-items-center" style={{minWidth:"44px",height:"44px"}}>
                    {/* icon disini otw  */}
                  </div>
                  
                  <div className="ml-4">
                  <p className="mb-0 fz-16 fw-600 text-blue-primary">200</p>
                  <p className="mb-0 mt-2 text-gray-secondary fw-500 fz-12">Aktif</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-4">
                <div className="d-flex align-items-center">
                  <div className="br-5 bg-blue-secondary d-flex justify-content-center align-items-center" style={{minWidth:"44px",height:"44px"}}>
                    {/* icon disini otw  */}
                  </div>
                  
                  <div className="ml-4">
                  <p className="mb-0 fz-16 fw-600 text-blue-primary">200</p>
                  <p className="mb-0 mt-2 text-gray-secondary fw-500 fz-12">Aktif</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
         <div className="col-12 col-sm-6">
          <div className="br-12 bg-white px-10 py-6 mt-2">
            <h5 className="mt-4 fw-600 fz-16 text-blue-thirty">Berdasarkan Pengajuan Disetujui</h5>
            <h5 className="fw-500 fz-14 text-gray-secondary">200 Total Pengajuan</h5>
            <h1 className="py-14 text-center">
              Grafik onProgress
            </h1>
            <div className="row">
              <div className="col-12 col-sm-4">
                <div className="d-flex align-items-center">
                  <div className="br-5 bg-blue-primary d-flex justify-content-center align-items-center" style={{minWidth:"44px",height:"44px"}}>
                    {/* icon disini otw  */}
                  </div>
                  
                  <div className="ml-4">
                  <p className="mb-0 fz-16 fw-600 text-blue-primary">200</p>
                  <p className="mb-0 mt-2 text-gray-secondary fw-500 fz-12">Aktif</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-4">
                <div className="d-flex align-items-center">
                  <div className="br-5 bg-blue-extras d-flex justify-content-center align-items-center" style={{minWidth:"44px",height:"44px"}}>
                    {/* icon disini otw  */}
                  </div>
                  
                  <div className="ml-4">
                  <p className="mb-0 fz-16 fw-600 text-blue-primary">200</p>
                  <p className="mb-0 mt-2 text-gray-secondary fw-500 fz-12">Aktif</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-4">
                <div className="d-flex align-items-center">
                  <div className="br-5 bg-blue-secondary d-flex justify-content-center align-items-center" style={{minWidth:"44px",height:"44px"}}>
                    {/* icon disini otw  */}
                  </div>
                  
                  <div className="ml-4">
                  <p className="mb-0 fz-16 fw-600 text-blue-primary">200</p>
                  <p className="mb-0 mt-2 text-gray-secondary fw-500 fz-12">Aktif</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       
      </div>
      

    </PageWrapper>
  )
}
