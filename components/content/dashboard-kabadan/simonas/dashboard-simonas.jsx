import React from "react";
import PageWrapper from "../../../wrapper/page.wrapper";
import dynamic from "next/dynamic";

import Header from "../component/header.component";
import CardTotal from "../component/card-total.component";

import CardInfo from "../component/card-info.component";
import ListCardInfo from "../component/list-card-info.component";

import PaginationDashboard from "../component/pagination-dashbaord.component";

import { useDispatch, useSelector } from "react-redux";

import {
  getSimonasCompanyAmount,
  getSimonasProjectAmount,
  getSimonasApplierAmountJob,
  getSimonasApplierAmountProject,
} from "../../../../redux/actions/dashboard-kabadan/dashboard/simonas.actions";

const DashboardSimonas = ({ token }) => {
  const dispatch = useDispatch();
  const MapDigitalent = dynamic(
    () => import("../component/map-digitalent.component"),
    { ssr: false }
  );

  const {
    loading: loadingCompanyTotal,
    error: errorCompanyTotal,
    companyTotal,
  } = useSelector((state) => state.simonasCompanyTotal);
  const {
    loading: loadingProjectTotal,
    error: errorProjectTotal,
    projectTotal,
  } = useSelector((state) => state.simonasProjectTotal);
  const {
    loading: loadingCompanyAmount,
    error: errorCompanyAmount,
    companyAmount,
  } = useSelector((state) => state.simonasCompanyAmount);
  const {
    loading: loadingProjectAmount,
    error: errorProjectAmount,
    projectAmount,
  } = useSelector((state) => state.simonasProjectAmount);
  const {
    loading: loadingApplierTotal,
    error: errorApplierTotal,
    applierTotal,
  } = useSelector((state) => state.simonasApplierTotal);
  const {
    loading: loadingApplierTotalActive,
    error: errorApplierTotalActive,
    applierTotalActive,
  } = useSelector((state) => state.simonasApplierTotalActive);
  const {
    loading: loadingApplierAmountJob,
    error: errorApplierAmountJob,
    applierAmountJob,
  } = useSelector((state) => state.simonasApplierAmountJob);
  const {
    loading: loadingApplierAmountProject,
    error: errorApplierAmountProject,
    applierAmountProject,
  } = useSelector((state) => state.simonasApplierAmountProject);
  const {
    loading: loadingApplierAge,
    error: errorApplierAge,
    applierAge,
  } = useSelector((state) => state.simonasApplierAge);
  const {
    loading: loadingApplierGender,
    error: errorApplierGender,
    applierGender,
  } = useSelector((state) => state.simonasApplierGender);
  const {
    loading: loadingApplierEducationJob,
    error: errorApplierEducationJob,
    applierEducationJob,
  } = useSelector((state) => state.simonasApplierEducationJob);
  const {
    loading: loadingApplierEducationProject,
    error: errorApplierEducationProject,
    applierEducationProject,
  } = useSelector((state) => state.simonasApplierEducationProject);

  const dataCompanyAmount = [];
  if (
    companyAmount &&
    companyAmount.data &&
    companyAmount.data.list.length > 0
  ) {
    companyAmount.data.list.map((row, i) => {
      let data = {
        id: i + 1,
        title: row.company,
        percent: row.percentage,
        total: row.total,
      };
      dataCompanyAmount.push(data);
    });
  }

  const dataProjectAmount = [];
  if (
    projectAmount &&
    projectAmount.data &&
    projectAmount.data.list.length > 0
  ) {
    projectAmount.data.list.map((row, i) => {
      let data = {
        id: i + 1,
        title: row.company,
        percent: row.percentage,
        total: row.total,
      };
      dataProjectAmount.push(data);
    });
  }

  const dataApplierAmountJob = [];
  if (
    applierAmountJob &&
    applierAmountJob.data &&
    applierAmountJob.data.list.length > 0
  ) {
    applierAmountJob.data.list.map((row, i) => {
      let data = {
        id: i + 1,
        title: row.company,
        percent: row.percentage,
        total: row.total,
      };
      dataApplierAmountJob.push(data);
    });
  }
  const dataApplierAmountProject = [];
  if (
    applierAmountProject &&
    applierAmountProject.data &&
    applierAmountProject.data.list.length > 0
  ) {
    applierAmountProject.data.list.map((row, i) => {
      let data = {
        id: i + 1,
        title: row.company,
        percent: row.percentage,
        total: row.total,
      };
      dataApplierAmountProject.push(data);
    });
  }

  const dataProvinsi = [
    { id: 1, title: "DKI Jakarta", percent: 50, total: "3.000" },
    { id: 2, title: "Jawa Barat", percent: 30, total: "2.000" },
    { id: 3, title: "Jawa Timur", percent: 40, total: "1.000" },
    { id: 4, title: "Sumatra Utara", percent: 10, total: "50" },
    { id: 5, title: "Nusa Tenggara Timur", percent: 10, total: "50" },
  ];

  const dataApplierAge = [];
  if (applierAge && applierAge.data && applierAge.data.length > 0) {
    applierAge.data.map((row, i) => {
      let data = {
        id: i + 1,
        title: row.age,
        percent: row.percentage,
        total: row.total,
      };
      dataApplierAge.push(data);
    });
  }

  const dataApplierGender = [];
  if (applierGender && applierGender.data && applierGender.data.length > 0) {
    applierGender.data.map((row, i) => {
      let data = {
        id: i + 1,
        title: row.gender,
        percent: row.percentage,
        total: row.total,
      };
      dataApplierGender.push(data);
    });
  }

  const dataApplierEducationJob = [];
  if (
    applierEducationJob &&
    applierEducationJob.data &&
    applierEducationJob.data.length > 0
  ) {
    applierEducationJob.data.map((row, i) => {
      let data = {
        id: i + 1,
        title: row.education,
        percent: row.percentage,
        total: row.total,
      };
      dataApplierEducationJob.push(data);
    });
  }

  const dataApplierEducationProject = [];
  if (
    applierEducationProject &&
    applierEducationProject.data &&
    applierEducationProject.data.length > 0
  ) {
    applierEducationProject.data.map((row, i) => {
      let data = {
        id: i + 1,
        title: row.education,
        percent: row.percentage,
        total: row.total,
      };
      dataApplierEducationProject.push(data);
    });
  }

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
          <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
            <CardTotal
              title={"Total Lowongan Pekerjaan"}
              value={companyTotal.all}
              dailyAdd={companyTotal.percetage}
              statisticDay={companyTotal.latest}
            />
          </div>
          <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
            <CardTotal
              title={"Total Proyek"}
              value={projectTotal.all}
              dailyAdd={projectTotal.percetage}
              statisticDay={projectTotal.latest}
            />
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
            <div className="card card-custom border bg-white">
              <div className="card-body pb-3">
                <p className="text-dashboard-gray fz-16 fw-500">
                  Jumlah Lowongan Pekerjaan
                </p>
                <ListCardInfo data={dataCompanyAmount} />

                <PaginationDashboard
                  total={companyAmount?.data?.total}
                  perPage={companyAmount?.data?.perPage}
                  title="Pekerjaan"
                  activePage={1}
                  funcPagination={(value) => {}}
                />
              </div>
            </div>
          </div>
          <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
            <div className="card card-custom border bg-white">
              <div className="card-body pb-3">
                <p className="text-dashboard-gray fz-16 fw-500">
                  Jumlah Proyek
                </p>
                <ListCardInfo data={dataProjectAmount} />
                <PaginationDashboard
                  total={projectAmount?.data?.total}
                  perPage={projectAmount?.data?.perPage}
                  title="Proyek"
                  activePage={1}
                  funcPagination={(value) => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="total-pelamar mt-5">
        <h2 className="title-section-dashboard">pelamar</h2>
        <div className="row mt-5">
          <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
            <CardTotal
              title={"Total Seluruh Lamaran"}
              value={applierTotal?.all}
              dailyAdd={applierTotal?.percetage}
              statisticDay={applierTotal?.latest}
            />
          </div>
          <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
            <CardTotal
              title={"Total Lamaran Aktif"}
              value={applierTotalActive?.all}
              dailyAdd={applierTotalActive?.percetage}
              statisticDay={applierTotalActive?.latest}
            />
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
            <div className="card card-custom border bg-white">
              <div className="card-body pb-3">
                <p className="text-dashboard-gray fz-16 fw-500">
                  Jumlah Pelamar Kerja
                </p>
                <ListCardInfo data={dataApplierAmountJob} />

                <PaginationDashboard
                  total={applierAmountJob?.data?.total}
                  perPage={applierAmountJob?.data?.perPage}
                  title="Pekerjaan"
                  activePage={1}
                  funcPagination={(value) => {}}
                />
              </div>
            </div>
          </div>
          <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
            <div className="card card-custom border bg-white">
              <div className="card-body pb-3">
                <p className="text-dashboard-gray fz-16 fw-500">
                  Jumlah Pelamar Proyek
                </p>
                <ListCardInfo data={dataApplierAmountProject} />
                <PaginationDashboard
                  total={applierAmountProject?.data?.total}
                  perPage={applierAmountProject?.data?.perPage}
                  title="Proyek"
                  activePage={1}
                  funcPagination={(value) => {}}
                />
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
                    <p className="mt-4 mr-3 text-dashboard-gray-caption">
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
                    <p className="mt-4 mr-3 text-dashboard-gray-caption">
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
              <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
                <div className="card card-custom border bg-white">
                  <div className="card-body pb-3">
                    <p className="text-dashboard-gray fz-16 fw-500">
                      Asal Provinsi Pelamar
                    </p>
                    <ListCardInfo data={dataProvinsi} />

                    <PaginationDashboard
                      total={10}
                      perPage={5}
                      title="Pelamar"
                      activePage={1}
                      funcPagination={(value) => {}}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
                <div className="card card-custom border bg-white">
                  <div className="card-body pb-3">
                    <p className="text-dashboard-gray fz-16 fw-500">
                      Asal Provinsi Pelamar yang direkrut
                    </p>
                    <ListCardInfo data={dataProvinsi} />
                    <PaginationDashboard
                      total={10}
                      perPage={5}
                      title="Direkrut"
                      activePage={1}
                      funcPagination={(value) => {}}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
                <CardInfo
                  title={"Umur Pelamar Lamaran Kerja"}
                  data={dataApplierAge}
                />
              </div>
              <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
                <CardInfo
                  title={"Pelamar Kerja berdasarkan Jenis Kelamin"}
                  data={dataApplierGender}
                />
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
                <CardInfo
                  title={"Pendidikan Pelamar Kerja"}
                  data={dataApplierEducationJob}
                />
              </div>
              <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
                <CardInfo
                  title={"Pendidikan Pelamar Proyek"}
                  data={dataApplierEducationProject}
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
