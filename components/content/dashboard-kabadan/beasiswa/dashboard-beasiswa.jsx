import React, { useState } from "react";
import PageWrapper from "../../../wrapper/page.wrapper";
import dynamic from "next/dynamic";

import Header from "../component/header.component";
import CardTotal from "../component/card-total.component";
import StatistikWrapper from "../wrapper/statistik.wrapper";

import CardInfo from "../component/card-info.component";
import ListCardInfo from "../component/list-card-info.component";
import { useDispatch, useSelector } from "react-redux";
import {
  getBeasiswaPendaftarWilayah,
  getBeasiswaStatistikDalam,
  getBeasiswaStatistikLuar,
  getBeasiswaProvinsiPendaftar,
  getBeasiswaProvinsiAwardee,
  getBeasiswaUniversitasDalam,
  getBeasiswaUniversitasLuar,
} from "../../../../redux/actions/dashboard-kabadan/dashboard/beasiswa.actions";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import PaginationDashboard from "../component/pagination-dashbaord.component";
import LoadingDashboard from "../component/loading-dashboard.component";

const DashboardBeasiswa = ({ token }) => {
  const dispatch = useDispatch();

  const MapBeasiswa = dynamic(
    () => import("../component/map-beasiswa.component"),
    { ssr: false }
  );

  const {
    loading: loadingTotalPengguna,
    error: errorTotalPengguna,
    totalPengguna,
  } = useSelector((state) => state.beasiswaTotalPengguna);
  const {
    loading: loadingTotalPendaftar,
    error: errorTotalPendaftar,
    totalPendaftar,
  } = useSelector((state) => state.beasiswaTotalPendaftar);
  const {
    loading: loadingStatistikDalam,
    error: errorStatistikDalam,
    statistik: statistikDalam,
  } = useSelector((state) => state.beasiswaStatistikDalam);
  const {
    loading: loadingStatistikLuar,
    error: errorStatistikLuar,
    statistik: statistikLuar,
  } = useSelector((state) => state.beasiswaStatistikLuar);

  const {
    loading: loadingProvinsiPendaftar,
    error: errorProvinsiPendaftar,
    provinsi: provinsiPendaftar,
  } = useSelector((state) => state.beasiswaProvinsiPendaftar);
  const {
    loading: loadingProvinsiAwardee,
    error: errorProvinsiAwardee,
    provinsi: provinsiAwardee,
  } = useSelector((state) => state.beasiswaProvinsiAwardee);
  const {
    loading: loadingUniversitasDalam,
    error: errorUniversitasDalam,
    universitas: UniversitasDalam,
  } = useSelector((state) => state.beasiswaUniversitasDalam);
  const {
    loading: loadingUniversitasLuar,
    error: errorUniversitasLuar,
    universitas: universitasLuar,
  } = useSelector((state) => state.beasiswaUniversitasLuar);
  const {
    loading: loadingBeasiswaAlumni,
    error: errorBeasiswaAlumni,
    alumni: beasiswaAlumni,
  } = useSelector((state) => state.beasiswaAlumni);
  const {
    loading: loadingBeasiswaAlumniAwardee,
    error: errorBeasiswaAlumniAwardee,
    alumni: beasiswaAlumniAwardee,
  } = useSelector((state) => state.beasiswaAlumniAwardee);
  const {
    loading: loadingBeasiswaYear,
    error: errorBeasiswaYear,
    year: beasiswaYear,
  } = useSelector((state) => state.beasiswaYear);

  const [filterStatistikDalam, setFilterStatistikDalam] = useState("");
  const [filterStatistikLuar, setFilterStatistikLuar] = useState("");
  const [filterPeta, setFilterPeta] = useState("");
  const [filterUniversitasDalam, setFilterUniversitasDalam] = useState("");
  const [filterUniversitasLuar, setFilterUniversitasLuar] = useState("");

  const [pageProvinsiPendaftar, setPageProvinsiPendaftar] = useState(1);
  const [pageProvinsiAwardee, setPageProvinsiAwardee] = useState(1);
  const [pageUniversitasDalam, setPageUniversitasDalam] = useState(1);
  const [pageUniversitasLuar, setPageUniversitasLuar] = useState(1);

  const dataBeasiwaDalamNegeri = [];
  if (statistikDalam) {
    statistikDalam.map((row, i) => {
      let val = {
        name: row.category,
        pendaftar: row.type.peserta,
        awardee: row.type.awardee,
      };
      dataBeasiwaDalamNegeri.push(val);
    });
  }
  if (statistikLuar) {
    statistikLuar.map((row, i) => {});
  }

  const dataBeasiwaLuarNegeri = [
    {
      name: "Skema Reguler",
      awardee: 2400,
      pendaftar: 2000,
    },
    {
      name: "Skema StuNed",
      awardee: 2210,
      pendaftar: 2100,
    },
  ];

  const dataProvinsiPendaftar = [];
  if (provinsiPendaftar) {
    provinsiPendaftar.list.map((row, i) => {
      let val = {
        id: i + 1,
        title: row.province,
        percent: row.percetage,
        total: row.total,
      };
      dataProvinsiPendaftar.push(val);
    });
  }

  const dataProvinsiAwardee = [];
  if (provinsiAwardee) {
    provinsiAwardee.list.map((row, i) => {
      let val = {
        id: i + 1,
        title: row.province,
        percent: row.percetage,
        total: row.total,
      };
      dataProvinsiAwardee.push(val);
    });
  }

  const dataUniversitasDalam = [];
  if (UniversitasDalam) {
    UniversitasDalam.list.map((row, i) => {
      let val = {
        id: i + 1,
        title: row.univ,
        percent: row.percetage,
        total: row.total,
      };
      dataUniversitasDalam.push(val);
    });
  }

  const dataUniversitasLuarNegeri = [];
  if (universitasLuar) {
    universitasLuar.list.map((row, i) => {
      let val = {
        id: i + 1,
        title: row.univ,
        percent: row.percetage,
        total: row.total,
      };
      dataUniversitasLuarNegeri.push(val);
    });
  }

  const dataAlumni = [];
  if (beasiswaAlumni) {
    beasiswaAlumni.map((row, i) => {
      let val = {
        id: i + 1,
        title: row.label,
        percent: row.percetage,
        total: row.total,
      };
      dataAlumni.push(val);
    });
  }

  const dataAwardee = [];
  if (beasiswaAlumniAwardee) {
    beasiswaAlumniAwardee.map((row, i) => {
      let val = {
        id: i + 1,
        title: row.label,
        percent: row.percetage,
        total: row.total,
      };
      dataAwardee.push(val);
    });
  }

  return (
    <PageWrapper>
      <section className="opening-hello">
        <Header
          name={"Kepala Badan Litbang SDM Kementerian Kominfo"}
          text={"Beasiswa Kominfo"}
          value={totalPengguna.all}
          dailyAdd={totalPengguna.percetage}
          statisticDay={totalPengguna.latest}
        />
      </section>

      <section className="total-pengguna mt-10">
        <div className="row mt-5">
          <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
            <CardTotal
              title={"Total Seluruh Pendaftar Beasiswa Dalam Negeri"}
              value={totalPendaftar.dn.all}
              dailyAdd={totalPendaftar.dn.percetage}
              statisticDay={totalPendaftar.dn.latest}
            />
          </div>
          <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
            <CardTotal
              title={"Total Seluruh Pendaftar Beasiswa Luar Negeri"}
              value={totalPendaftar.ln.all}
              dailyAdd={totalPendaftar.ln.percetage}
              statisticDay={totalPendaftar.ln.latest}
            />
          </div>
        </div>
      </section>

      <section className="statistik-peserta mt-5">
        <div className="row mt-5">
          <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
            <div className="card card-custom bg-white h-100">
              <div className="card-body py-4">
                <StatistikWrapper
                  title={"Statistik Beasiswa Dalam Negeri"}
                  funcFilterYear={(value) => {
                    setFilterStatistikDalam(value);
                    dispatch(getBeasiswaStatistikDalam(token, value));
                  }}
                />

                <div className="chard-bar mt-5">
                  {loadingStatistikDalam ? (
                    <LoadingDashboard loading={loadingStatistikDalam} />
                  ) : (
                    <ResponsiveContainer width={"100%"} height={300}>
                      <BarChart
                        data={dataBeasiwaDalamNegeri}
                        margin={{
                          top: 5,
                          right: 30,
                          left: -10,
                          bottom: 5,
                        }}
                      >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip cursor={{ fill: "transparent" }} />

                        <Bar dataKey="awardee" fill="#0063CC" />
                        <Bar dataKey="pendaftar" fill="#1A3266" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
            <div className="card card-custom bg-white h-100">
              <div className="card-body py-4">
                <StatistikWrapper
                  title={"Statistik Beasiswa Luar Negeri"}
                  funcFilterYear={(value) => {
                    setFilterStatistikLuar(value);
                    dispatch(getBeasiswaStatistikLuar(token, value));
                  }}
                />

                <div className="chard-bar mt-5">
                  {loadingStatistikLuar ? (
                    <LoadingDashboard loading={loadingStatistikLuar} />
                  ) : (
                    <ResponsiveContainer width={"100%"} height={300}>
                      <BarChart
                        data={dataBeasiwaLuarNegeri}
                        margin={{
                          top: 5,
                          right: 30,
                          left: -10,
                          bottom: 5,
                        }}
                      >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip cursor={{ fill: "transparent" }} />

                        <Bar dataKey="awardee" fill="#0063CC" />
                        <Bar dataKey="pendaftar" fill="#1A3266" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="peta-penyebaran-peserta mt-5">
        <div className="card card-custom bg-white">
          <div className="card-body">
            <div className="head-filter">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <p className="text-dashboard-gray fz-16 fw-500 mt-3">
                  Asal Provinsi Pendaftar Beasiswa
                </p>
                <div className="list-filter d-flex">
                  <div className="d-flex align-items-center">
                    <p className="mt-4 mr-3 text-dashboard-gray-caption">
                      Tahun:
                    </p>
                    <select
                      className="border-0 p-0"
                      onChange={(e) => {
                        setFilterPeta(e.target.value);
                        dispatch(
                          getBeasiswaPendaftarWilayah(token, e.target.value)
                        );
                      }}
                    >
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="map-penyebaran col-md-12 mt-5">
                <div id="map">
                  <MapBeasiswa />
                </div>
              </div>
            </div>
            <div className="row mt-10">
              <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
                <div className="card card-custom border bg-white h-100">
                  <div className="card-body pb-3">
                    <p className="text-dashboard-gray fz-16 fw-500">
                      Asal Provinsi Pendaftar Beasiwa
                    </p>

                    {loadingProvinsiPendaftar ? (
                      <LoadingDashboard loading={loadingProvinsiPendaftar} />
                    ) : (
                      <>
                        <ListCardInfo data={dataProvinsiPendaftar} />

                        <PaginationDashboard
                          total={provinsiPendaftar.total}
                          perPage={provinsiPendaftar.perPage}
                          title="Pendaftar"
                          activePage={pageProvinsiPendaftar}
                          funcPagination={(value) => {
                            setPageProvinsiPendaftar(value);
                            dispatch(
                              getBeasiswaProvinsiPendaftar(token, value)
                            );
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
                <div className="card card-custom border bg-white h-100">
                  <div className="card-body pb-3">
                    <p className="text-dashboard-gray fz-16 fw-500">
                      Asal Provinsi Awardee Beasiswa
                    </p>
                    {loadingProvinsiAwardee ? (
                      <LoadingDashboard loading={loadingProvinsiAwardee} />
                    ) : (
                      <>
                        <ListCardInfo data={dataProvinsiAwardee} />
                        <PaginationDashboard
                          total={provinsiAwardee.total}
                          perPage={provinsiAwardee.perPage}
                          title="Awardee"
                          activePage={pageProvinsiAwardee}
                          funcPagination={(value) => {
                            setPageProvinsiAwardee(value);
                            dispatch(getBeasiswaProvinsiAwardee(token, value));
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
                <div className="card h-100">
                  <div className="card-body pb-3">
                    <StatistikWrapper
                      title={"Perguruan Tinggi Dalam Negeri Tujuan Beasiswa"}
                      funcFilterYear={(value) => {
                        setFilterUniversitasDalam(value);
                        dispatch(
                          getBeasiswaUniversitasDalam(
                            token,
                            pageUniversitasDalam,
                            value
                          )
                        );
                      }}
                    />
                    {loadingUniversitasDalam ? (
                      <LoadingDashboard loading={loadingUniversitasDalam} />
                    ) : (
                      <>
                        <ListCardInfo data={dataUniversitasDalam} />
                        <PaginationDashboard
                          total={UniversitasDalam.total}
                          perPage={UniversitasDalam.perPage}
                          title="Perguruan Tinggi"
                          activePage={pageUniversitasDalam}
                          funcPagination={(value) => {
                            setPageUniversitasDalam(value);
                            dispatch(
                              getBeasiswaUniversitasDalam(
                                token,
                                value,
                                filterUniversitasDalam
                              )
                            );
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
                <div className="card h-100">
                  <div className="card-body pb-3">
                    <StatistikWrapper
                      title={"Universitas Luar Negeri Tujuan Beasiswa"}
                      funcFilterYear={(value) => {
                        setFilterUniversitasLuar(value);
                        dispatch(
                          getBeasiswaUniversitasLuar(
                            token,
                            pageUniversitasLuar,
                            value
                          )
                        );
                      }}
                    />
                    {loadingUniversitasLuar ? (
                      <LoadingDashboard loading={loadingUniversitasLuar} />
                    ) : (
                      <>
                        <ListCardInfo data={dataUniversitasLuarNegeri} />
                        <PaginationDashboard
                          total={universitasLuar.total}
                          perPage={universitasLuar.perPage}
                          title="Universitas"
                          activePage={pageUniversitasLuar}
                          funcPagination={(value) => {
                            setPageUniversitasLuar(value);
                            dispatch(
                              getBeasiswaUniversitasLuar(
                                token,
                                value,
                                filterUniversitasLuar
                              )
                            );
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
                <CardInfo
                  title={"Awardee Beasiswa Kominfo"}
                  data={dataAwardee}
                />
              </div>
              <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
                <CardInfo title={"Alumni Beasiswa Kominfo"} data={dataAlumni} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default DashboardBeasiswa;
