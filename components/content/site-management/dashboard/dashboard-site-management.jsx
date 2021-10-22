import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getSession } from "next-auth/client";
import axios from "axios";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import IconUser from "../../../assets/icon/User";
import IconDoc from "../../../assets/icon/Doc";
import ImageHero from "../../../../public/assets/media/logos/hero1.png";
import ImagePlants from "../../../../public//assets/media/logos/Plants1.png";
import CardDashboardSM from "../../../CardDashboardSM";
import PageWrapper from "../../../wrapper/page.wrapper";
import CardDashboardSiteManagement from "../../../CardDashboardSiteManagement";

import {
  loadDataZonasi,
  loadDataZonasiNext,
} from "../../../../redux/actions/site-management/dashboard.actions";
import { set } from "js-cookie";

const DashboardSiteManagement = ({ token }) => {
  const [participant, setParticipant] = useState("0");
  const [administrator, setAdministrator] = useState("0");
  const [mitra, setMitra] = useState(0);
  const [pageZonasi, setPageZonasi] = useState(1);
  const [type, setType] = useState("province");
  const [totalPage, setTotalPage] = useState(0);

  let dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${process.env.END_POINT_API_SITE_MANAGEMENT}api/dashboard/card`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((items) => {
        setParticipant(formatNumber(items.data.data.participant));
        setAdministrator(formatNumber(items.data.data.administrator));
        setMitra(formatNumber(items.data.data.mitra));
      });

    dispatch(loadDataZonasi(token, type, pageZonasi));
  }, [dispatch, token, type, pageZonasi]);

  const { allDataZonasi } = useSelector(
    (state) => ({
      allDataZonasi: state.allDataZonasi,
    }),
    shallowEqual
  );

  function capitalize(s) {
    return s.toLowerCase().replace(/\b./g, function (a) {
      return a.toUpperCase();
    });
  }

  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const tableZonasi = allDataZonasi.map((item, index) => {
    return (
      <tr key={index}>
        <td className="data-daerah py-4">
          <span className="nomor mr-4">{item.nomor}</span>
          {capitalize(item.provinsi)}
        </td>
        <td className="total-peserta">{formatNumber(item.total)} Peserta</td>
      </tr>
    );
  });

  return (
    <>
      <PageWrapper>
        <div className="container">
          <div className="col-lg-12 col-md-12">
            <div className="row">
              {/* card 1 */}
              <CardDashboardSM
                background="bg-light-success "
                icon="User.svg"
                color="#ffffff"
                titleValue={participant}
                title="Total Peserta DTS"
                publishedVal="1"
              />

              {/* card 2 */}
              <CardDashboardSM
                background="bg-light-warning"
                icon="Address-card.svg"
                color="#ffffff"
                titleValue={administrator}
                title="Total Administrator"
                publishedVal="1"
              />
              <CardDashboardSM
                background="bg-light-info"
                icon="Book-open.svg"
                color="#ffffff"
                titleValue={mitra}
                title="Total Mitra"
                publishedVal="1"
              />
              {/* card 3 */}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row mx-0">
            <div className="col-lg-6">
              <div
                className="position-relative br-12 bg-white py-10 px-6 overflow-hidden"
                style={{ height: "197px", maxHeight: "197px" }}
              >
                <div className="right-center-absolute">
                  <Image src={ImageHero} alt="imagehero" />
                </div>

                <div className="left-bottom-absolute">
                  <Image src={ImagePlants} alt="imagehero" />
                </div>

                <h5 className="text-blue-secondary fw-600 fz-24">
                  Hallo {"Admin"} !
                </h5>
                <p className="text-gray-primary fw-600 fz-16">
                  Selamat Datang di Dashboard <br /> Site Management
                </p>
              </div>
            </div>
            <div className="col-lg-3 mt-2 hover-subm">
              <CardDashboardSiteManagement
                background="bg-white"
                icon="/assets/icon/Account.svg"
                hover="/assets/icon/HoverSUBM.svg"
                color="text-black"
                title="SUBM"
                link="/site-management/setting/pelatihan"
              ></CardDashboardSiteManagement>
            </div>
            <div className="col-lg-3 mt-2">
              <CardDashboardSiteManagement
                background="bg-white"
                hover="/assets/icon/HoverSUBM.svg"
                icon="/assets/icon/Map.svg"
                color="text-black"
                title="Zonasi"
                link="/site-management/master-data/master-zonasi"
              ></CardDashboardSiteManagement>
            </div>
          </div>
        </div>
        <div className="container mt-8">
          <div className="row mx-0">
            <div className="col-lg-6 mt-2">
              <div className="content-data bg-white">
                <table className="table table-borderless rounded mx-4">
                  <tr>
                    <th>
                      <div className="data-peserta">Data Peserta</div>
                      <div className="berdasarkan">Berdasarkan Daerah</div>
                    </th>
                    <th>
                      <div
                        className={
                          type === "city"
                            ? "btn btn-primary text-white type-styling"
                            : "text-gray pt-3"
                        }
                      >
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setType("city");
                            setPageZonasi(1);
                          }}
                        >
                          Kota / Kabupaten
                        </a>
                      </div>
                    </th>
                    <th>
                      <div
                        className={
                          type === "province"
                            ? "btn btn-primary text-white type-styling"
                            : "text-gray pt-3 provinsi-styling"
                        }
                      >
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setType("province");
                            setPageZonasi(1);
                          }}
                        >
                          Provinsi
                        </a>
                      </div>
                    </th>
                  </tr>

                  <tr>
                    <td className="data-daerah py-4">
                      <span className="nomor mr-4">1</span>
                      {capitalize("DKI JAKARTA")}
                    </td>
                    <td className="total-peserta">
                      {formatNumber(12)} Peserta
                    </td>
                  </tr>
                  <tr>
                    <td className="data-daerah py-4">
                      <span className="nomor mr-4">1</span>
                      {capitalize("DKI JAKARTA")}
                    </td>
                    <td className="total-peserta">
                      {formatNumber(12)} Peserta
                    </td>
                  </tr>
                  <tr>
                    <td className="data-daerah py-4">
                      <span className="nomor mr-4">1</span>
                      {capitalize("DKI JAKARTA")}
                    </td>
                    <td className="total-peserta">
                      {formatNumber(12)} Peserta
                    </td>
                  </tr>
                  <tr>
                    <td className="data-daerah py-4">
                      <span className="nomor mr-4">1</span>
                      {capitalize("DKI JAKARTA")}
                    </td>
                    <td className="total-peserta">
                      {formatNumber(12)} Peserta
                    </td>
                  </tr>
                  <tr>
                    <td className="data-daerah py-4">
                      <span className="nomor mr-4">1</span>
                      {capitalize("DKI JAKARTA")}
                    </td>
                    <td className="total-peserta">
                      {formatNumber(12)} Peserta
                    </td>
                  </tr>

                </table>
                <div className="d-flex mx-6">
                  <p className="pt-6">
                    Total: {allDataZonasi[0].totalZonasi} Zonasi
                  </p>
                  <div className="ml-auto mx-10 my-4">
                    <button
                      className={
                        pageZonasi === 1
                          ? "btn btn-primary mx-4 disabled"
                          : "btn btn-primary mx-4"
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        if (pageZonasi === 1) {
                          setPageZonasi(pageZonasi);
                        } else {
                          setPageZonasi(pageZonasi - 1);
                        }
                      }}
                    >
                      &lt;
                    </button>
                    <button
                      type="button"
                      className={
                        pageZonasi >= Math.ceil(allDataZonasi[0].totalPage / 5)
                          ? "btn btn-primary disabled"
                          : "btn btn-primary"
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        if (
                          pageZonasi >=
                          Math.ceil(allDataZonasi[0].totalPage / 5)
                        ) {
                          setPageZonasi(pageZonasi);
                        } else {
                          setPageZonasi(pageZonasi + 1);
                        }
                      }}
                    >
                      &gt;
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mt-2">
              <div className="content-data bg-white">
                <table className="table table-borderless rounded">
                  <tr>
                    <th>
                      <div className="data-peserta">Data Zonasi</div>
                      <div className="berdasarkan">Berdasarkan Daerah</div>
                    </th>
                    <th>
                      <div
                        className={
                          type === "city"
                            ? "btn btn-primary text-white type-styling"
                            : "text-gray pt-3"
                        }
                      >
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setType("city");
                            setPageZonasi(1);
                          }}
                        >
                          Kota / Kabupaten
                        </a>
                      </div>
                    </th>
                    <th>
                      <div
                        className={
                          type === "province"
                            ? "btn btn-primary text-white type-styling"
                            : "text-gray pt-3 provinsi-styling"
                        }
                      >
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setType("province");
                            setPageZonasi(1);
                          }}
                        >
                          Provinsi
                        </a>
                      </div>
                    </th>
                  </tr>

                  {tableZonasi}
                </table>
                <div className="d-flex mx-6">
                  <p className="pt-6">
                    Total: {allDataZonasi[0].totalZonasi} Zonasi
                  </p>
                  <div className="ml-auto mx-10 my-4">
                    <button
                      className={
                        pageZonasi === 1
                          ? "btn btn-primary mx-4 disabled"
                          : "btn btn-primary mx-4"
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        if (pageZonasi === 1) {
                          setPageZonasi(pageZonasi);
                        } else {
                          setPageZonasi(pageZonasi - 1);
                        }
                      }}
                    >
                      &lt;
                    </button>
                    <button
                      type="button"
                      className={
                        pageZonasi >= Math.ceil(allDataZonasi[0].totalPage / 5)
                          ? "btn btn-primary disabled"
                          : "btn btn-primary"
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        if (
                          pageZonasi >=
                          Math.ceil(allDataZonasi[0].totalPage / 5)
                        ) {
                          setPageZonasi(pageZonasi);
                        } else {
                          setPageZonasi(pageZonasi + 1);
                        }
                      }}
                    >
                      &gt;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default DashboardSiteManagement;
