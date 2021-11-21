import React from "react";
import PageWrapper from "../../../wrapper/page.wrapper";
import dynamic from "next/dynamic";

import Header from "../component/header.component";
import CardTotal from "../component/card-total.component";
import StatistikWrapper from "../wrapper/statistik.wrapper";

import CardInfo from "../component/card-info.component";
import ListCardInfo from "../component/list-card-info.component";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Pagination from "react-js-pagination";

const DashboardBeasiswa = () => {
  const MapDigitalent = dynamic(
    () => import("../component/map-digitalent.component"),
    { ssr: false }
  );
  const dataBeasiwaDalamNegeri = [
    {
      name: "Khusus",
      laki_laki: 2400,
      perempuan: 2000,
    },
    {
      name: "S2 ASN",
      laki_laki: 2210,
      perempuan: 2100,
    },
    {
      name: "S2 Umum",
      laki_laki: 2290,
      perempuan: 2200,
    },
    {
      name: "S3 ASN",
      laki_laki: 2000,
      perempuan: 2300,
    },
    {
      name: "S3 Umum",
      laki_laki: 2181,
      perempuan: 2500,
    },
    {
      name: "S2 Internal",
      laki_laki: 2500,
      perempuan: 2400,
    },
    {
      name: "s3 Internal",
      laki_laki: 2100,
      perempuan: 2300,
    },
  ];
  const dataBeasiwaLuarNegeri = [
    {
      name: "Skema Reguler",
      laki_laki: 2400,
      perempuan: 2000,
    },
    {
      name: "Skema StuNed",
      laki_laki: 2210,
      perempuan: 2100,
    },
  ];
  const dataProvinsi = [
    { id: 1, title: "DKI Jakarta", percent: 50, total: "3.000" },
    { id: 2, title: "Jawa Barat", percent: 30, total: "2.000" },
    { id: 3, title: "Jawa Timur", percent: 40, total: "1.000" },
    { id: 4, title: "Sumatra Utara", percent: 10, total: "50" },
    { id: 5, title: "Nusa Tenggara Timur", percent: 10, total: "50" },
  ];
  const dataUniversitasDalam = [
    { id: 1, title: "Universitas Indonesia", percent: 50, total: "3.000" },
    {
      id: 2,
      title: "Institute Teknologi Bandung",
      percent: 30,
      total: "2.000",
    },
    {
      id: 3,
      title: "Universitas Gadjah Mada",
      percent: 20,
      total: "1.000",
    },
    {
      id: 4,
      title: "Institute Teknologi Sepuluh Nopember",
      percent: 40,
      total: "3.000",
    },
    {
      id: 5,
      title: "Universitas Airlangga",
      percent: 50,
      total: "6.000",
    },
  ];
  const dataUniversitasLuarNegeri = [
    { id: 1, title: "Tsinghua University", percent: 50, total: "3.000" },
    {
      id: 2,
      title: "University of Twente",
      percent: 30,
      total: "2.000",
    },
    {
      id: 3,
      title: "Eötvös Loránd UniversityEötvös Loránd University",
      percent: 20,
      total: "1.000",
    },
    {
      id: 4,
      title: "The University of Electro-Communications",
      percent: 40,
      total: "3.000",
    },
    {
      id: 5,
      title: "IIIT-Bangalore",
      percent: 50,
      total: "6.000",
    },
  ];
  const dataAwardee = [
    { id: 1, title: "Dalam Negeri", percent: 50, total: "3.000" },
    { id: 2, title: "Luar Negeri", percent: 40, total: "2.000" },
  ];
  const dataAlumni = [
    { id: 1, title: "Dalam Negeri", percent: 50, total: "3.000" },
    { id: 2, title: "Luar Negeri", percent: 40, total: "2.000" },
  ];

  return (
    <PageWrapper>
      <section className="opening-hello">
        <Header
          name={"Kepala Badan Litbang SDM Kementerian Kominfo"}
          text={"Beasiswa Kominfo"}
        />
      </section>

      <section className="total-pengguna mt-10">
        <div className="row mt-5">
          <div className="col-md-6">
            <CardTotal
              title={"Total Seluruh Pendaftar Beasiswa Dalam Negeri"}
              value={252.329}
              dailyAdd={"23.21%"}
              statisticDay={"+20.220 (24H)"}
            />
          </div>
          <div className="col-md-6">
            <CardTotal
              title={"Total Seluruh Pendaftar Beasiswa Luar Negeri"}
              value={252.329}
              dailyAdd={"23.21%"}
              statisticDay={"+20.220 (24H)"}
            />
          </div>
        </div>
      </section>

      <section className="statistik-peserta mt-10">
        <div className="row mt-5">
          <div className="col-md-6">
            <div className="card card-custom bg-white">
              <div className="card-body py-4">
                <StatistikWrapper
                  title={"Statistik Beasiswa Dalam Negeri"}
                  funcFilterYear={(value) => console.log(value)}
                />

                <div className="chard-bar mt-5">
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

                      <Bar dataKey="laki_laki" fill="#0063CC" />
                      <Bar dataKey="perempuan" fill="#1A3266" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card card-custom bg-white">
              <div className="card-body py-4">
                <StatistikWrapper
                  title={"Statistik Beasiswa Luar Negeri"}
                  funcFilterYear={(value) => console.log(value)}
                />

                <div className="chard-bar mt-5">
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

                      <Bar dataKey="laki_laki" fill="#0063CC" />
                      <Bar dataKey="perempuan" fill="#1A3266" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="peta-penyebaran-peserta mt-10">
        <div className="card card-custom bg-white">
          <div className="card-body">
            <div className="head-filter">
              <div className="d-flex justify-content-between align-items-center">
                <p className="text-dashboard-gray fz-16 fw-500 mt-3">
                  Penyebaran Peserta berdasarkan wilayah
                </p>
                <div className="list-filter d-flex">
                  <div className="d-flex align-items-center">
                    <p className="mt-3 mr-3 text-dashboard-gray-caption">
                      Filter By:
                    </p>
                    <select className="border-0 p-0">
                      <option value="2021">Tahun</option>
                      <option value="2020">2020</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="map-penyebaran col-md-12 mt-5">
                <div id="map">
                  <MapDigitalent />
                </div>
              </div>
            </div>
            <div className="row mt-10">
              <div className="col-md-6">
                <div className="card card-custom border bg-white">
                  <div className="card-body pb-3">
                    <p className="text-dashboard-gray fz-16 fw-500">
                      Asal Provinsi Pendaftar Beasiwa
                    </p>
                    <ListCardInfo data={dataProvinsi} />

                    <div className="d-flex justify-content-end mt-2">
                      <div className="table-pagination">
                        <Pagination
                          activePage={1}
                          itemsCountPerPage={3}
                          totalItemsCount={5}
                          pageRangeDisplayed={3}
                          nextPageText={">"}
                          prevPageText={"<"}
                          firstPageText={"<<"}
                          lastPageText={">>"}
                          itemClass="page-item"
                          linkClass="page-link"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card card-custom border bg-white">
                  <div className="card-body pb-3">
                    <p className="text-dashboard-gray fz-16 fw-500">
                      Asal Provinsi Awardee Beasiswa
                    </p>
                    <ListCardInfo data={dataProvinsi} />
                    <div className="d-flex justify-content-end mt-2">
                      <div className="table-pagination">
                        <Pagination
                          activePage={1}
                          itemsCountPerPage={3}
                          totalItemsCount={5}
                          pageRangeDisplayed={3}
                          nextPageText={">"}
                          prevPageText={"<"}
                          firstPageText={"<<"}
                          lastPageText={">>"}
                          itemClass="page-item"
                          linkClass="page-link"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-10">
              <div className="col-md-6">
                <CardInfo
                  title={"Top 5 Perguruan Tinggi Dalam Negeri Tujuan Beasiswa"}
                  data={dataUniversitasDalam}
                />
              </div>
              <div className="col-md-6">
                <CardInfo
                  title={"Top 5 Universitas Luar Negeri Tujuan Beasiswa"}
                  data={dataUniversitasLuarNegeri}
                />
              </div>
            </div>
            <div className="row mt-10">
              <div className="col-md-6">
                <CardInfo
                  title={"Awardee Beasiswa Kominfo"}
                  data={dataAwardee}
                />
              </div>
              <div className="col-md-6">
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
