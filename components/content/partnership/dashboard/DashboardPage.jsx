import React, { useEffect, useState } from "react";
import PageWrapper from "../../../wrapper/page.wrapper";
import IconUser from "../../../assets/icon/User";
import IconDoc from "../../../assets/icon/Doc";
import ImageHero from "../../../../public/assets/media/logos/hero1.png";
import ImagePlants from "../../../../public//assets/media/logos/Plants1.png";
import { useDispatch, useSelector } from "react-redux";
import IconCompalation from "../../../../public/assets/icon/Compilation.svg";
import IconFoldercheck from "../../../../public/assets/icon/Foldercheck.svg";
import IconWarningCircle from "../../../../public/assets/icon/Warningcircle.svg";
import IconStop from "../../../../public/assets/icon/folder-forbid-line.svg";
import Image from "next/image";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { getSession } from "next-auth/client";
import Link from 'next/link'
import { fetchDashboard } from "../../../../redux/actions/partnership/dashboard.action";

import axios from "axios";

export default function DashboardPage({ token }) {
  let dispatch = useDispatch();
  const allDashboard = useSelector((state) => state.allDashboard);
  const [user, setUser] = useState("");

  const colors = ["#215480", "#4299E1", "#357AB4"];
  const [dataPieChartStatusPengajuan, setDataPieChartStatusPengajuan] =
    useState([]);
  const [dataPieChartPengajuanDisetujui, setDataPieChartPengajuanDisetujui] =
    useState([]);

  const [errorGetData, setErrorGetData] = useState("");

  // useEffect (() => {
  //   dispatch (fetchDashboard(token))
  // }, [dispatch, token])

  useEffect(() => {
    dispatch (fetchDashboard(token))

    async function fetchDashboards() {
      try {
        let { data } = await axios.get(
          `${process.env.END_POINT_API_PARTNERSHIP}api/dashbord`,
          {
            headers: {
              authorization: `Bearer ${token}`,
              // permissionToken: localStorage.getItem("token-permission")
              // permissionToken: "U2FsdGVkX1/8bJA1yPuTitjBQIWEy1GEsyNFohOq7F2PIsPVfNgnmPPOWcJXAKFEgbMppK8Fyw0xReLhnj+Pmf6udk18GMKI1929EvT0DZafMFtuR/iRg3fz1L1ntUCC8J9DXy/FmNThOaTiYI7q8Q355IC5RgKGtHfkQxDRDLfS/XwQ8y1hnRRurzZgJAV9cTJs/7ZPQbI5r0E1ymvHbg6hzwCXeONeRcX3U7rsXaO6ouwfN6/ymcJUEGMxVNv/64NkXTk0ISzV06+jyuhoT/on/emeQ6prfLCjaPxzDDCdSlUKAD3kA/FYLAtJKdyUZVkQMx1T9d5UIuI1eO8WZfP0jV+R12qrzM12QCsr5jiTJTe2UiCGWhm3fLdJJKMKPxWJJyHyhGLE47qFGjK84iEVvqAvuSGyGOPCjN7g49ARR0H9vBC0qCtekN/58zGfyqGORFjcZFLSlKnsTQip1U2qgPvDTf6b6rot3gSsEYJRyhhG3ksp1uyFDxGmNR+qfo4C/iQ4qodADfQg+mFGOx2mVhMuj+8wcbRD6XW9v0vmAHiW/Zx+bN4/dOYsaLrGdnWssuoNi9yIRCVPkqYImGRgMI2A2BM7/ZpRrD8/HvI="
              permissionToken: Cookies.get("token-permission")
            },
          }
        );
        setDataPieChartPengajuanDisetujui([
          {
            name: "Akan Berakhir",
            value: data?.data?.cooperation_will_expired,
          },
          {
            name: "Ditolak",
            value: data?.data?.cooperation_rejected,
          },
        ]);
        setDataPieChartStatusPengajuan([
          {
            name: "Aktif",
            value: data?.data?.cooperation_active,
          },
          {
            name: "Disetujui",
            value: data?.data?.cooperation_approved,
          },
        ]);
      } catch (error) {
        setErrorGetData(error);
      }
    }

    fetchDashboards();

    getSession().then((session) => {
      setUser(session.user.user.data.user);
    });

  }, [dispatch, token]);

  return (
    <PageWrapper>
      <div
        className="position-relative br-12 bg-white py-10 px-6 overflow-hidden"
        style={{ height: "197px", maxHeight: "197px" }}
      >
        <div className="right-center-absolute img-ds">
          <Image src={ImageHero} alt="imagehero" />
        </div>

        <div className="left-bottom-absolute">
          <Image src={ImagePlants} alt="imagehero" />
        </div>

        <h5 className="text-blue-secondary fw-600 fz-24">
          Halo {user.name} !
        </h5>
        <p className="text-gray-primary fw-600 fz-16">
          Selamat Datang di Dashboard Partnership, yuk cek pengajuan kerjasama
          mitra hari ini.
        </p>
      </div>

      <div className="row mt-4">

        {/* Card Total Mitra */}
        <div className="col-12 col-xl-6 my-3">
          <Link href="/partnership/mitra" passHref>

            <div className="br-12 bg-blue-primary pl-8 pb-3 text-white mt-2 cursor-pointer">
              <div className="d-flex justify-content-between align-items-center position-relative">
                <div>
                  <div className="d-flex align-items-center">

                    <Image
                      src="/assets/icon/add-user-white.svg"
                      width={50}
                      height={50}
                      alt="add-user"
                    />

                    {/* <i className="ri-user-add-fill ri-4x text-white" /> */}

                    <h1 className="text-white ml-3 mt-7" style={{fontSize:"3rem"}}>
                      {allDashboard.data_dashboard.data?.mitra}
                    </h1>
                  </div>

                  <div>
                    <h5 className="fw-500 fz-14">Total Mitra</h5>
                  </div>
                </div>

                <i 
                  className="ri-user-add-fill ri-7x" 
                  style={{color:"#1a4367", marginTop:"-2rem", marginRight:"-0.25rem"}}
                />
                  {/* <Image 
                      src="/assets/icon/add-user-shade-primary.svg"
                      width={100}
                      height={100}
                      className="border border-dark mt-0 position-absolute right-0"
                      style={{marginTop:"-5%"}}
                    /> */}
              </div>
            </div>
          </Link>
        </div>

        {/* Card Total Kerjasama */}
        <div className="col-12 col-xl-6 my-3">
          <Link href="/partnership/kerjasama" passHref>

            <div className="br-12 bg-blue-dark pl-8 pb-6 text-white mt-2 cursor-pointer">
              <div className="d-flex justify-content-between align-items-center position-relative">
                <div>
                  <div className="d-flex align-items-center">

                    {/* <i className="ri-clipboard-fill ri-4x text-white" /> */}

                    <Image
                      src="/assets/icon/clipboard-list-white.svg"
                      width={50}
                      height={50}
                      alt="clipboard"
                    />

                    <h1 className="text-white ml-3 mt-7" style={{fontSize:"3rem"}}>
                      {allDashboard.data_dashboard.data?.cooperation}
                    </h1>
                  </div>

                  <div>
                    <h5 className="fw-500 fz-14">Total Kerjasama</h5>
                  </div>
                </div>

                {/* <i 
                  className="ri-clipboard-fill ri-7x" 
                  style={{color:"#1a4367", marginTop:"-2rem", marginRight:"-0.75rem"}}
                /> */}

                <Image 
                  src="/assets/icon/clipboard-list-primary-shade.svg"
                  width={100}
                  height={100}
                  className="mr-0"
                  style={{marginTop:"-2rem", marginRight:"-3rem"}}
                  alt="clipboard"
                />
              </div>
            </div>
          </Link>
        </div>


      </div>

      
      {/* Content */}
      <div className="row mt-4">

        {/* Card pengajuan Aktif */}
        <div className="col-12 col-xl-6 my-5">
          <div className="br-12 bg-white px-10 py-6 mt-2">
            <h5 className="mt-4 fw-600 fz-16 text-blue-thirty">
              Berdasarkan Pengajuan Aktif & Tidak Aktif
            </h5>
            <h5 className="fw-500 fz-14 text-gray-secondary">
              {allDashboard.data_dashboard.data?.cooperation_active +
                allDashboard.data_dashboard.data?.cooperation_approved}&nbsp;
              Total Aktif dan Tidak Aktif
            </h5>
            <div className="wrapper-chart-pie">
              <span className="center-absolute fw-700 fz-24">
                {!allDashboard.data_dashboard.data?.cooperation_active
                  ? 0
                  : allDashboard.data_dashboard.data?.cooperation_active +
                    allDashboard.data_dashboard.data?.cooperation_approved}
              </span>
              
              <div className="col-12">
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={dataPieChartStatusPengajuan}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={-10}
                      cornerRadius={30} 
                    >
                      {dataPieChartStatusPengajuan &&
                        dataPieChartStatusPengajuan.map((el, i) => {
                          return <Cell key={i} fill={colors[i]} />;
                        })}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              
            </div>
            <div className="row">
              <div className="col-6">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="d-flex align-items-center">
                    <div
                      className="br-5 bg-blue-primary d-flex justify-content-center align-items-center"
                      style={{ minWidth: "16px", height: "16px" }}
                    >
                      {/* <Image src={IconCompalation} alt="IconCompalation" /> */}
                    </div>

                    <div className="ml-4">
                      <p className="mb-0 fz-16 fw-600 text-blue-primary">
                        {allDashboard.data_dashboard.data?.cooperation_active}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="mb-0 mt-2 text-gray-secondary fw-500 fz-12">
                    Pengajuan Aktif
                  </p>
                </div>
              </div>

              <div className="col-6">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="d-flex align-items-center">
                    <div
                      className="br-5 bg-blue-extras d-flex justify-content-center align-items-center"
                      style={{ minWidth: "16px", height: "16px" }}
                    >
                      {/* <Image src={IconFoldercheck} alt="IconFoldercheck" /> */}
                    </div>

                    <div className="ml-4">
                      <p className="mb-0 fz-16 fw-600 text-blue-primary">
                        {allDashboard.data_dashboard.data?.cooperation_non_active}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='text-center'>
                  <p className="mb-0 mt-2 text-gray-secondary fw-500 fz-12">
                    Pengajuan Tidak Aktif
                  </p>
                </div>
                
              </div>
            </div>
          </div>
        </div>

        {/* Card Pengajuan Akan Berakhir */}
        <div className="col-12 col-xl-6 my-5">
          <div className="br-12 bg-white px-10 py-6 mt-2">
            <h5 className="mt-4 fw-600 fz-16 text-blue-thirty">
              Berdasarkan Pengajuan Akan Berakhir & Ditolak
            </h5>
            <h5 className="fw-500 fz-14 text-gray-secondary">
              {allDashboard.data_dashboard.data?.cooperation_will_expired +
                allDashboard.data_dashboard.data?.cooperation_rejected}{" "}
              Total Akan Berakhir & Ditolak
            </h5>
            <div className="wrapper-chart-pie">
              <span className="center-absolute fw-700 fz-24">
                {allDashboard.data_dashboard.data?.cooperation_will_expired +
                  allDashboard.data_dashboard.data?.cooperation_rejected}
              </span>
              
              <div className="col-12">
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={dataPieChartPengajuanDisetujui}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={-10}
                      cornerRadius={30}
                    >
                      {dataPieChartPengajuanDisetujui &&
                        dataPieChartPengajuanDisetujui.map((el, i) => {
                          return <Cell key={i} fill={colors[i]} />;
                        })}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
            </div>
            <div className="row">
              <div className="col-6">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="d-flex align-items-center">
                    <div
                      className="br-5 bg-blue-primary d-flex justify-content-center align-items-center"
                      style={{ minWidth: "16px", height: "16px" }}
                    >
                      {/* <Image src={IconWarningCircle} alt="IconWarningCircle" /> */}
                    </div>

                    <div className="ml-4">
                      <p className="mb-0 fz-16 fw-600 text-blue-primary">
                        {
                          allDashboard.data_dashboard.data
                            ?.cooperation_will_expired
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="mb-0 mt-2 text-gray-secondary fw-500 fz-12">
                    Pengajuan Akan Berakhir
                  </p>
                </div>
              </div>

              <div className="col-6">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="d-flex align-items-center">
                    <div
                      className="br-5 bg-blue-secondary d-flex justify-content-center align-items-center"
                      style={{ minWidth: "16px", height: "16px" }}
                    >
                      {/* <Image src={IconStop} alt="IconStop" /> */}
                    </div>

                    <div className="ml-4">
                      <p className="mb-0 fz-16 fw-600 text-blue-primary">
                        {allDashboard.data_dashboard.data?.cooperation_rejected}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="mb-0 mt-2 text-gray-secondary fw-500 fz-12">
                    Pengajuan Ditolak
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
