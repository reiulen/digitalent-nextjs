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

const DashboardDigitalent = () => {
  const MyMap = dynamic(() => import("../component/map-digitalent.component"), {
    ssr: false,
  });
  const dataPendaftarAkademi = [
    {
      name: "VGA",
      data: 4000,
    },
    {
      name: "SVG",
      data: 3000,
    },
    {
      name: "DEA",
      data: 2000,
    },
    {
      name: "GTA",
      data: 2780,
    },
    {
      name: "PRO",
      data: 1890,
    },
    {
      name: "TSA",
      data: 2390,
    },
    {
      name: "SVGA",
      data: 3490,
    },
  ];
  const dataPesertaAkademi = [
    {
      name: "VGA",
      pendaftar: 4000,
      peserta: 2400,
      lulus: 2400,
      sertifikasi: 2000,
    },
    {
      name: "VSGA",
      pendaftar: 3000,
      peserta: 1398,
      lulus: 2210,
      sertifikasi: 2100,
    },
    {
      name: "PRO",
      pendaftar: 2000,
      peserta: 9800,
      lulus: 2290,
      sertifikasi: 2200,
    },
    {
      name: "GTA",
      pendaftar: 2780,
      peserta: 3908,
      lulus: 2000,
      sertifikasi: 2300,
    },
    {
      name: "TSA",
      pendaftar: 1890,
      peserta: 4800,
      lulus: 2181,
      sertifikasi: 2500,
    },
    {
      name: "DEA",
      pendaftar: 2390,
      peserta: 3800,
      lulus: 2500,
      sertifikasi: 2400,
    },
    {
      name: "DTA",
      pendaftar: 3490,
      peserta: 4300,
      lulus: 2100,
      sertifikasi: 2300,
    },
  ];
  const dataPendaftar = [
    { id: 1, title: "Facebook", percent: 50, total: "3.000" },
    { id: 2, title: "Kominfo", percent: 30, total: "2.000" },
    {
      id: 3,
      title: "Institute Teknologi Bandung",
      percent: 40,
      total: "1.000",
    },
    { id: 4, title: "Gojek", percent: 10, total: "50" },
    { id: 5, title: "Dikoding", percent: 10, total: "50" },
  ];
  const dataProvinsi = [
    { id: 1, title: "DKI Jakarta", percent: 50, total: "3.000" },
    { id: 2, title: "Jawa Barat", percent: 30, total: "2.000" },
    { id: 3, title: "Jawa Timur", percent: 40, total: "1.000" },
    { id: 4, title: "Sumatra Utara", percent: 10, total: "50" },
    { id: 5, title: "Nusa Tenggara Timur", percent: 10, total: "50" },
  ];
  const dataUmur = [
    { id: 1, title: "<20", percent: 50, total: "3.000" },
    { id: 2, title: "20-35", percent: 30, total: "2.000" },
    { id: 3, title: "36-50", percent: 40, total: "1.000" },
    { id: 4, title: ">50", percent: 10, total: "50" },
  ];
  const dataJenisKelamin = [
    { id: 1, title: "Pria", percent: 80, total: "3.000" },
    { id: 2, title: "Wanita", percent: 30, total: "2.000" },
  ];
  const dataDifabel = [
    { id: 1, title: "Tuna Rungu", percent: 50, total: "3.000" },
    { id: 2, title: "Tuna Netra", percent: 40, total: "2.000" },
    { id: 3, title: "Tuna Daksa", percent: 40, total: "1.000" },
  ];
  const dataPendidikan = [
    { id: 1, title: "D3", percent: 50, total: "3.000" },
    { id: 2, title: "S1", percent: 40, total: "2.000" },
    { id: 3, title: "SMA", percent: 40, total: "1.000" },
    { id: 4, title: "SMK", percent: 30, total: "1.000" },
    { id: 5, title: "S2", percent: 20, total: "1.000" },
    { id: 6, title: "D4", percent: 10, total: "500" },
    { id: 7, title: "Other", percent: 5, total: "100" },
  ];

  return (
    <PageWrapper>
      <section className="opening-hello">
        <Header
          name={"Kepala Badan Litbang SDM Kementerian Kominfo"}
          text={"Pelatihan Digital Talent Scholarship"}
        />
      </section>

      <section className="total-pengguna mt-10">
        <h2 className="title-section-dashboard">total pengguna</h2>
        <div className="row mt-5">
          <div className="col-md-6 mb-5">
            <CardTotal
              title={"Total Seluruh Pendaftar"}
              value={252.329}
              dailyAdd={"23.21%"}
              statisticDay={"+20.220 (24H)"}
            />
          </div>
          <div className="col-md-6 mb-5">
            <CardTotal
              title={"Total Seluruh Peserta"}
              value={252.329}
              dailyAdd={"23.21%"}
              statisticDay={"+20.220 (24H)"}
            />
          </div>
        </div>
      </section>

      <section className="statistik-peserta mt-5">
        <h2 className="title-section-dashboard">statistik peserta</h2>
        <div className="row mt-5">
          <div className="col-md-6 mb-5">
            <div className="card card-custom bg-white">
              <div className="card-body py-4">
                <StatistikWrapper
                  title={"Pesebaran Pendaftar Akademi"}
                  funcFilterYear={(value) => {}}
                />

                <div className="chard-bar text-center mt-5">
                  <ResponsiveContainer width={"100%"} height={300}>
                    <BarChart
                      data={dataPendaftarAkademi}
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
                      <Bar dataKey="data" fill="#4CBDE2" />
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
                  title={"Pesebaran Peserta Akademi"}
                  funcFilterYear={(value) => {}}
                />

                <div className="chard-bar mt-5">
                  <ResponsiveContainer width={"100%"} height={300}>
                    <BarChart
                      data={dataPesertaAkademi}
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
                      <Bar stackId="a" dataKey="sertifikasi" fill="#007CFF" />
                      <Bar stackId="a" dataKey="lulus" fill="#1A3266" />
                      <Bar stackId="a" dataKey="peserta" fill="#203E80" />
                      <Bar stackId="a" dataKey="pendaftar" fill="#4CBDE2" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="statistik-mitra mt-5">
        <h2 className="title-section-dashboard">statistik mitra</h2>
        <div className="row mt-5">
          <div className="col-md-6 mb-5">
            <div className="card card-custom bg-white">
              <div className="card-body pb-3">
                <p className="text-dashboard-gray fz-16 fw-500">
                  Jumlah Pendaftaran
                </p>
                <ListCardInfo data={dataPendaftar} />
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
            <div className="card card-custom bg-white">
              <div className="card-body pb-3">
                <p className="text-dashboard-gray fz-16 fw-500">
                  Jumlah Peserta
                </p>
                <ListCardInfo data={dataPendaftar} />
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
      </section>

      <section className="table-pendaftaran mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-custom bg-white">
              <div className="card-body">
                <p className="text-dashboard-gray fz-16 fw-500">
                  Pendaftaran Dibuka
                </p>

                <div className="table-content table-responsive">
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead className="w-100" style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-center ">No</th>
                        <th>Akademi</th>
                        <th>Mitra</th>
                        <th>Tema</th>
                        <th>Nama Pelatihan</th>
                        <th>Tanggal Registrasi</th>
                      </tr>
                    </thead>
                    <tbody className="w-100">
                      {[1, 2, 3, 4, 5].map((row, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>DEA</td>
                          <td>Kominfo</td>
                          <td>
                            Pelatihan Bidang Teknologi Informasi dan Komunikasi
                            (TIK)
                          </td>
                          <td>Junior Graphic Designer</td>
                          <td>12 Agustus 2021 - 12 September 2021</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="table-pagination table-pagination pagination-custom float-right">
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
      </section>

      <section className="peta-penyebaran-peserta mt-10">
        <div className="card card-custom bg-white">
          <div className="card-body">
            <div className="head-filter">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <p className="text-dashboard-gray fz-16 fw-500 mt-3">
                  Penyebaran Peserta berdasarkan wilayah
                </p>
                <div className="list-filter d-flex">
                  <div className="d-flex flex-wrap align-items-center mr-3">
                    <p className="mt-3 mr-3 text-dashboard-gray-caption">
                      Filter By:
                    </p>
                    <select className="border-0 p-0">
                      <option value="2021">Akademi</option>
                      <option value="2020">2020</option>
                    </select>
                  </div>
                  <div className="d-flex flex-wrap align-items-center mr-3">
                    <p className="mt-3 mr-3 text-dashboard-gray-caption">
                      Filter By:
                    </p>
                    <select className="border-0 p-0">
                      <option value="2021">Tema</option>
                      <option value="2020">2020</option>
                    </select>
                  </div>
                  <div className="d-flex flex-wrap align-items-center">
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
                  <MyMap />
                </div>
              </div>
            </div>
            <div className="row mt-10">
              <div className="col-md-6 mb-5">
                <div className="card card-custom border bg-white">
                  <div className="card-body pb-3">
                    <p className="text-dashboard-gray fz-16 fw-500">
                      Komposisi Provinsi Pendaftar
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
                      Komposisi Provinsi Peserta
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
                <CardInfo title={"Komposisi Umur Pendaftar"} data={dataUmur} />
              </div>
              <div className="col-md-6 mb-5">
                <CardInfo title={"Komposisi Umur Peserta"} data={dataUmur} />
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-6 mb-5">
                <CardInfo
                  title={"Total Pendaftar berdasarkan Jenis Kelamin"}
                  data={dataJenisKelamin}
                />
              </div>
              <div className="col-md-6 mb-5">
                <CardInfo
                  title={"Total Peserta berdasarkan Jenis Kelamin"}
                  data={dataJenisKelamin}
                />
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-6 mb-5">
                <CardInfo
                  title={"TTotal Pendaftar berdasarkan Difabel"}
                  data={dataDifabel}
                />
              </div>
              <div className="col-md-6 mb-5">
                <CardInfo
                  title={"Total Peserta berdasarkan Difabel"}
                  data={dataDifabel}
                />
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-6 mb-5">
                <CardInfo
                  title={"Komposisi Pendidikan Pendaftar"}
                  data={dataPendidikan}
                />
              </div>
              <div className="col-md-6 mb-5">
                <CardInfo
                  title={"Komposisi Pendidikan Peserta"}
                  data={dataPendidikan}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default DashboardDigitalent;
