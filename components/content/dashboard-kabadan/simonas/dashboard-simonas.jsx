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

const DashboardSimonas = () => {
  const MapDigitalent = dynamic(
    () => import("../component/map-digitalent.component"),
    { ssr: false }
  );

  const dataPekerjaan = [
    { id: 1, title: "Telkom", percent: 50, total: "3.000" },
    { id: 2, title: "Tokopedia", percent: 30, total: "2.000" },
    { id: 3, title: "Majapahit Teknologi", percent: 40, total: "1.000" },
    { id: 4, title: "Bukalapak", percent: 10, total: "50" },
    { id: 5, title: "Gojek", percent: 10, total: "50" },
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
          text={"SIMONAS"}
        />
      </section>

      <section className="total-perusahaan mt-10">
        <h2 className="title-section-dashboard">perusahaan</h2>
        <div className="row mt-5">
          <div className="col-md-6 mb-5">
            <CardTotal
              title={"Total Lowongan Pekerjaan"}
              value={252.329}
              dailyAdd={"23.21"}
              statisticDay={"+20.220"}
            />
          </div>
          <div className="col-md-6 mb-5">
            <CardTotal
              title={"Total Proyek"}
              value={252.329}
              dailyAdd={"23.21"}
              statisticDay={"+20.220"}
            />
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-6 mb-5">
            <div className="card card-custom border bg-white">
              <div className="card-body pb-3">
                <p className="text-dashboard-gray fz-16 fw-500">
                  Jumlah Lowongan Pekerjaan
                </p>
                <ListCardInfo data={dataPekerjaan} />

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
                  Jumlah Proyek
                </p>
                <ListCardInfo data={dataPekerjaan} />
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

      <section className="total-pelamar mt-5">
        <h2 className="title-section-dashboard">pelamar</h2>
        <div className="row mt-5">
          <div className="col-md-6 mb-5">
            <CardTotal
              title={"Total Seluruh Lamaran"}
              value={252.329}
              dailyAdd={"23.21"}
              statisticDay={"+20.220"}
            />
          </div>
          <div className="col-md-6 mb-5">
            <CardTotal
              title={"Total Lamaran Aktif"}
              value={252.329}
              dailyAdd={"23.21"}
              statisticDay={"+20.220"}
            />
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-6 mb-5">
            <div className="card card-custom border bg-white">
              <div className="card-body pb-3">
                <p className="text-dashboard-gray fz-16 fw-500">
                  Jumlah Pelamar Kerja
                </p>
                <ListCardInfo data={dataPekerjaan} />

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
                  Jumlah Pelamar Proyek
                </p>
                <ListCardInfo data={dataPekerjaan} />
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

      <section className="peta-penyebaran-peserta mt-5">
        <div className="card card-custom bg-white">
          <div className="card-body">
            <div className="head-filter">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <p className="text-dashboard-gray fz-16 fw-500 mt-3">
                  Penyebaran Pelamar berdasarkan wilayah
                </p>
                <div className="list-filter d-flex flex-wrap">
                  <div className="d-flex align-items-center mr-5">
                    <p className="mt-3 mr-3 text-dashboard-gray-caption">
                      Status
                    </p>
                    <select className="border-0 p-0">
                      <option value="Semua">Semua</option>
                      <option value="Submitted">Submitted</option>
                      <option value="Selection">Selection</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Hired">Hired</option>
                    </select>
                  </div>
                  <div className="d-flex align-items-center">
                    <p className="mt-3 mr-3 text-dashboard-gray-caption">
                      Tahun
                    </p>
                    <select className="border-0 p-0">
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
                  <MapDigitalent />
                </div>
              </div>
            </div>
            <div className="row mt-10">
              <div className="col-md-6 mb-5">
                <div className="card card-custom border bg-white">
                  <div className="card-body pb-3">
                    <p className="text-dashboard-gray fz-16 fw-500">
                      Asal Provinsi Pendaftar
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
                      Asal Provinsi Pelamar yang direkrut
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
                <CardInfo
                  title={"Umur Pelamar Lamaran Kerja"}
                  data={dataUmur}
                />
              </div>
              <div className="col-md-6 mb-5">
                <CardInfo
                  title={"Pelamar Kerja berdasarkan Jenis Kelamin"}
                  data={dataJenisKelamin}
                />
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-6 mb-5">
                <CardInfo
                  title={"Pendidikan Pelamar Kerja"}
                  data={dataPendidikan}
                />
              </div>
              <div className="col-md-6 mb-5">
                <CardInfo
                  title={"Pendidikan Pelamar Proyek"}
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

export default DashboardSimonas;
