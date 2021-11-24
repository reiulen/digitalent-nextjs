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
      awardee: 2400,
      pendaftar: 2000,
    },
    {
      name: "S2 ASN",
      awardee: 2210,
      pendaftar: 2100,
    },
    {
      name: "S2 Umum",
      awardee: 2290,
      pendaftar: 2200,
    },
    {
      name: "S3 ASN",
      awardee: 2000,
      pendaftar: 2300,
    },
    {
      name: "S3 Umum",
      awardee: 2181,
      pendaftar: 2500,
    },
    {
      name: "S2 Internal",
      awardee: 2500,
      pendaftar: 2400,
    },
    {
      name: "s3 Internal",
      awardee: 2100,
      pendaftar: 2300,
    },
  ];
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
          <div className="col-md-6 mb-5">
            <CardTotal
              title={"Total Seluruh Pendaftar Beasiswa Dalam Negeri"}
              value={252.329}
              dailyAdd={"23.21"}
              statisticDay={"+20.220 "}
            />
          </div>
          <div className="col-md-6 mb-5">
            <CardTotal
              title={"Total Seluruh Pendaftar Beasiswa Luar Negeri"}
              value={252.329}
              dailyAdd={"23.21"}
              statisticDay={"+20.220 "}
            />
          </div>
        </div>
      </section>

      <section className="statistik-peserta mt-5">
        <div className="row mt-5">
          <div className="col-md-6 mb-5">
            <div className="card card-custom bg-white">
              <div className="card-body py-4">
                <StatistikWrapper
                  title={"Statistik Beasiswa Dalam Negeri"}
                  funcFilterYear={(value) => {}}
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

                      <Bar dataKey="awardee" fill="#0063CC" />
                      <Bar dataKey="pendaftar" fill="#1A3266" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-5">
            <div className="card card-custom bg-white">
              <div className="card-body py-4">
                <StatistikWrapper
                  title={"Statistik Beasiswa Luar Negeri"}
                  funcFilterYear={(value) => {}}
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

                      <Bar dataKey="awardee" fill="#0063CC" />
                      <Bar dataKey="pendaftar" fill="#1A3266" />
                    </BarChart>
                  </ResponsiveContainer>
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
              <div className="col-md-6 mb-5">
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
              <div className="col-md-6 mb-5">
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
            <div className="row mt-5">
              <div className="col-md-6 mb-5">
                <div className="card">
                  <div className="card-body pb-3">
                    <StatistikWrapper
                      title={"Perguruan Tinggi Dalam Negeri Tujuan Beasiswa"}
                      funcFilterYear={(value) => {}}
                    />
                    <ListCardInfo data={dataUniversitasDalam} />
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
              <div className="col-md-6 mb-5">
                <div className="card">
                  <div className="card-body pb-3">
                    <StatistikWrapper
                      title={"Universitas Luar Negeri Tujuan Beasiswa"}
                      funcFilterYear={(value) => {}}
                    />
                    <ListCardInfo data={dataUniversitasDalam} />
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
            <div className="row mt-5">
              <div className="col-md-6 mb-5">
                <CardInfo
                  title={"Awardee Beasiswa Kominfo"}
                  data={dataAwardee}
                />
              </div>
              <div className="col-md-6 mb-5">
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
