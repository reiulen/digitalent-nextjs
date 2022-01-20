import React, { useState } from "react";
import PageWrapper from "../../../wrapper/page.wrapper";
import dynamic from "next/dynamic";

import Header from "../component/header.component";
import CardTotal from "../component/card-total.component";

import CardInfo from "../component/card-info.component";
import ListCardInfo from "../component/list-card-info.component";

import PaginationDashboard from "../component/pagination-dashbaord.component";
import LoadingDashboard from "../component/loading-dashboard.component";

import { useDispatch, useSelector } from "react-redux";

import {
  getSimonasCompanyAmount,
  getSimonasProjectAmount,
  getSimonasApplierAmountJob,
  getSimonasApplierAmountProject,
  getSimonasRegionApplier,
  getSimonasProvinsiApplier,
  getSimonasProvinsiApplierRequired,
} from "../../../../redux/actions/dashboard-kabadan/dashboard/simonas.actions";

const DashboardSimonas = ({ token }) => {
  const dispatch = useDispatch();
  const MapSimonas = dynamic(
    () => import("../component/map-simonas.component"),
    { ssr: false }
  );

  const [pageCompanyAmount, setPageCompanyAmount] = useState(1);
  const [pageCompanyProject, setPageCompanyProject] = useState(1);
  const [pageApplierJob, setPageApplierJob] = useState(1);
  const [pageApplierProject, setPageApplierProject] = useState(1);

  const [pageProvinceApplier, setPageProvinceApplier] = useState(1);
  const [pageProvinceApplierRequired, setPageProvinceApplierRequired] =
    useState(1);

  const [filterMapStatus, setFilterMapStatus] = useState("");
  const [filterMapYear, setFilterMapYear] = useState("");

  const {
    loading: loadingTotalPengguna,
    error: errorTotalPengguna,
    totalPengguna,
  } = useSelector((state) => state.digitalentTotalPengguna);
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
  const {
    loading: loadingFilterStatus,
    error: errorFilterStatus,
    filterStatus,
  } = useSelector((state) => state.simonasFilterStatus);
  const {
    loading: loadingFilterYear,
    error: errorFilterYear,
    filterYear,
  } = useSelector((state) => state.simonasFilterYear);
  const {
    loading: loadingProvinsiApplier,
    error: errorProvinsiApplier,
    provinceApplier,
  } = useSelector((state) => state.simonasProvinsiApplier);
  const {
    loading: loadingProvinsiApplierRequired,
    error: errorProvinsiApplierRequired,
    provinceApplierRequited,
  } = useSelector((state) => state.simonasProvinsiApplierRequired);

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

  const dataProvinsiApplier = [];
  if (
    provinceApplier &&
    provinceApplier.data &&
    provinceApplier.data.list.length > 0
  ) {
    provinceApplier.data.list.map((row, i) => {
      let val = {
        id: i + 1,
        title: row.name_province,
        percent: row.percentage,
        total: row.applicant,
      };
      dataProvinsiApplier.push(val);
    });
  }

  const dataProvinsiApplierRequited = [];
  if (
    provinceApplierRequited &&
    provinceApplierRequited.data &&
    provinceApplierRequited.data.list.length > 0
  ) {
    provinceApplierRequited.data.list.map((row, i) => {
      let val = {
        id: i + 1,
        title: row.name_province,
        percent: row.percentage,
        total: row.applicant,
      };
      dataProvinsiApplierRequited.push(val);
    });
  }

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

  const handlePercentage = (totalAdd, total) => {
    return Math.ceil((100 * totalAdd) / total);
  };

  return (
    <PageWrapper>
      <section className="opening-hello">
        <Header
          name={"Kepala Badan Litbang SDM Kementerian Kominfo"}
          text={"SIMONAS"}
          value={totalPengguna?.total}
          statisticDay={totalPengguna?.total_penambahan}
          dailyAdd={handlePercentage(
            totalPengguna?.total_penambahan,
            totalPengguna?.total
          )}
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
            <div className="card card-custom border bg-white h-100">
              <div className="card-body pb-3">
                <p className="text-dashboard-gray fz-16 fw-500">
                  Jumlah Lowongan Pekerjaan
                </p>
                {loadingCompanyAmount ? (
                  <LoadingDashboard loading={loadingCompanyAmount} />
                ) : (
                  <>
                    <ListCardInfo data={dataCompanyAmount} />

                    <PaginationDashboard
                      total={companyAmount?.data?.total}
                      perPage={companyAmount?.data?.perPage}
                      title="Pekerjaan"
                      activePage={pageCompanyAmount}
                      funcPagination={(value) => {
                        setPageCompanyAmount(value);
                        dispatch(getSimonasCompanyAmount(token, value));
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
                  Jumlah Proyek
                </p>
                {loadingProjectAmount ? (
                  <LoadingDashboard loading={loadingProjectAmount} />
                ) : (
                  <>
                    <ListCardInfo data={dataProjectAmount} />
                    <PaginationDashboard
                      total={projectAmount?.data?.total}
                      perPage={projectAmount?.data?.perPage}
                      title="Proyek"
                      activePage={pageCompanyProject}
                      funcPagination={(value) => {
                        setPageCompanyProject(value);
                        dispatch(getSimonasProjectAmount(token, value));
                      }}
                    />
                  </>
                )}
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
            <div className="card card-custom border bg-white h-100">
              <div className="card-body pb-3">
                <p className="text-dashboard-gray fz-16 fw-500">
                  Jumlah Pelamar Kerja
                </p>
                {loadingApplierAmountJob ? (
                  <LoadingDashboard loading={loadingApplierAmountJob} />
                ) : (
                  <>
                    <ListCardInfo data={dataApplierAmountJob} />

                    <PaginationDashboard
                      total={applierAmountJob?.data?.total}
                      perPage={applierAmountJob?.data?.perPage}
                      title="Pekerjaan"
                      activePage={pageApplierJob}
                      funcPagination={(value) => {
                        setPageApplierJob(value);
                        dispatch(getSimonasApplierAmountJob(token, value));
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
                  Jumlah Pelamar Proyek
                </p>
                {loadingApplierAmountProject ? (
                  <LoadingDashboard loading={loadingApplierAmountProject} />
                ) : (
                  <>
                    <ListCardInfo data={dataApplierAmountProject} />
                    <PaginationDashboard
                      total={applierAmountProject?.data?.total}
                      perPage={applierAmountProject?.data?.perPage}
                      title="Proyek"
                      activePage={pageApplierProject}
                      funcPagination={(value) => {
                        setPageApplierProject(value);
                        dispatch(getSimonasApplierAmountProject(token, value));
                      }}
                    />
                  </>
                )}
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
                    <select
                      className="border-0 p-0"
                      value={filterMapStatus}
                      onChange={(e) => {
                        setFilterMapStatus(e.target.value);
                        dispatch(
                          getSimonasRegionApplier(
                            token,
                            filterMapYear,
                            e.target.value
                          )
                        );
                      }}
                    >
                      <option value="">Semua</option>
                      {filterStatus &&
                        filterStatus.map((row, i) => (
                          <option value={row.id} key={i}>
                            {row.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="d-flex align-items-center">
                    <p className="mt-4 mr-3 text-dashboard-gray-caption">
                      Tahun
                    </p>
                    <select
                      className="border-0 p-0"
                      value={filterMapYear}
                      onChange={(e) => {
                        setFilterMapYear(e.target.value);
                        dispatch(
                          getSimonasRegionApplier(
                            token,
                            e.target.value,
                            filterMapStatus
                          )
                        );
                      }}
                    >
                      {filterYear &&
                        filterYear.map((row, i) => (
                          <option value={row} key={i}>
                            {row}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="map-penyebaran col-md-12 mt-5">
                <div id="map">
                  <MapSimonas />
                </div>
              </div>
            </div>
            <div className="row mt-10">
              <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
                <div className="card card-custom border bg-white h-100">
                  <div className="card-body pb-3">
                    <p className="text-dashboard-gray fz-16 fw-500">
                      Asal Provinsi Pelamar
                    </p>
                    {loadingProvinsiApplier ? (
                      <LoadingDashboard loading={loadingProvinsiApplier} />
                    ) : (
                      <>
                        <ListCardInfo data={dataProvinsiApplier} />

                        <PaginationDashboard
                          total={provinceApplier?.data?.total}
                          perPage={provinceApplier?.data?.perPage}
                          title="Pelamar"
                          activePage={pageProvinceApplier}
                          funcPagination={(value) => {
                            setPageProvinceApplier(value);
                            dispatch(getSimonasProvinsiApplier(token, value));
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
                      Asal Provinsi Pelamar yang direkrut
                    </p>
                    {loadingProvinsiApplierRequired ? (
                      <LoadingDashboard
                        loading={loadingProvinsiApplierRequired}
                      />
                    ) : (
                      <>
                        <ListCardInfo data={dataProvinsiApplierRequited} />
                        <PaginationDashboard
                          total={provinceApplierRequited?.data?.total}
                          perPage={provinceApplierRequited?.data?.perPage}
                          title="Direkrut"
                          activePage={pageProvinceApplierRequired}
                          funcPagination={(value) => {
                            setPageProvinceApplierRequired(value);
                            dispatch(
                              getSimonasProvinsiApplierRequired(token, value)
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
