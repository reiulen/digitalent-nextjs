import React, { useState } from "react";
import PageWrapper from "../../../wrapper/page.wrapper";
import dynamic from "next/dynamic";

import Header from "../component/header.component";
import CardTotal from "../component/card-total.component";
import StatistikWrapper from "../wrapper/statistik.wrapper";
import LoadingDashboard from "../component/loading-dashboard.component";

import CardInfo from "../component/card-info.component";
import ListCardInfo from "../component/list-card-info.component";
import { useDispatch, useSelector } from "react-redux";
import {
  getDigitalentStatistikAkademiPendaftar,
  getDigitalentStatistikAkademiPeserta,
  getDigitalentStatistikMitraPendaftar,
  getDigitalentStatistikMitraPeserta,
  getDigitalentTablePendaftaran,
  getDigitalentPesertaWilayah,
  getDigitalentProvinsiPendaftar,
  getDigitalentProvinsiPeserta,
} from "../../../../redux/actions/dashboard-kabadan/dashboard/digitalent.actions";
import { dropdownTemabyAkademi } from "../../../../redux/actions/pelatihan/function.actions";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";

import PaginationDashboard from "../component/pagination-dashbaord.component";

const DashboardDigitalent = ({ token }) => {
  const MyMap = dynamic(() => import("../component/map-digitalent.component"), {
    ssr: false,
  });
  const dispatch = useDispatch();

  const [filterStatistikAkademiPendaftar, setFilterStatistikAkademiPendaftar] =
    useState("");
  const [filterStatistikAkademiPeserta, setFilterStatistikAkademiPeserta] =
    useState("");

  const [yearPesertaWilayah, setYearPesertaWilayah] = useState("");
  const [themePesertaWilayah, setThemePesertaWilayah] = useState("");
  const [academyPesertaWilayah, setAcademyPesertaWilayah] = useState("");

  const [pageMitraPendaftaran, setPageMitraPendaftaran] = useState(1);
  const [pageMitraPeserta, setPageMitraPeserta] = useState(1);

  const [pageTablePendaftaran, setPageTablePendaftaran] = useState(1);
  const [pageProvinsiPendaftar, setPageProvinsiPendaftar] = useState(1);
  const [pageProvinsiPeserta, setPageProvinsiPeserta] = useState(1);

  const {
    loading: loadingTotalPengguna,
    error: errorTotalPengguna,
    totalPengguna,
  } = useSelector((state) => state.digitalentTotalPengguna);
  const {
    loading: loadingTotalPendaftar,
    error: errorTotalPendaftar,
    totalPendaftar,
  } = useSelector((state) => state.digitalentTotalDataPendaftar);
  const {
    loading: loadingStatistikAkademiPendaftar,
    error: errorStatistikAkademiPendaftar,
    statistikAkademiPendaftar,
  } = useSelector((state) => state.digitalentStatistikAkademiPendaftar);
  const {
    loading: loadingStatistikAkademiPeserta,
    error: errorStatistikAkademiPeserta,
    statistikAkademiPeserta,
  } = useSelector((state) => state.digitalentStatistikAkademiPeserta);
  const {
    loading: loadingStatistikMitraPendaftar,
    error: errorStatistikMitraPendaftar,
    statistikMitraPendaftar,
  } = useSelector((state) => state.digitalentStatistikMitraPendaftar);
  const {
    loading: loadingStatistikMitraPeserta,
    error: errorStatistikMitraPeserta,
    statistikMitraPeserta,
  } = useSelector((state) => state.digitalentStatistikMitraPeserta);
  const {
    loading: loadingTablePendaftaran,
    error: errorTablePendaftaran,
    tablePendaftar,
  } = useSelector((state) => state.digitalentTablePendaftaran);
  const {
    loading: loadingPesertaWilayah,
    error: errorPesertaWilayah,
    wilayah,
  } = useSelector((state) => state.digitalentPesertaWilayah);
  const {
    loading: loadingProvinsiPendaftar,
    error: errorProvinsiPendaftar,
    provinsiPendaftar,
  } = useSelector((state) => state.digitalentProvinsiPendaftar);
  const {
    loading: loadingProvinsiPeserta,
    error: errorProvinsiPeserta,
    provinsiPeserta,
  } = useSelector((state) => state.digitalentProvinsiPeserta);
  const {
    loading: loadingDataPribadi,
    error: errorDataPribadi,
    dataPribadi,
  } = useSelector((state) => state.digitalentDataPribadi);
  const { error: dropdownErrorAkademi, data: dataAkademi } = useSelector(
    (state) => state.drowpdownAkademi
  );
  // const drowpdownTemabyAkademi = useSelector(
  //   (state) => state.drowpdownTemabyAkademi
  // );

  const year = ["2021", "2020", "2019", "2018", "2017", "2016"];
  const dataStatistikAkademiPendaftar = [];
  if (statistikAkademiPendaftar && statistikAkademiPendaftar.length > 0) {
    statistikAkademiPendaftar.map((row, i) => {
      let val = {
        name: row.slug,
        data: row.jumlah,
      };
      dataStatistikAkademiPendaftar.push(val);
    });
  }

  const dataStatistikAkademiPeserta = [];
  if (statistikAkademiPeserta && statistikAkademiPeserta.length > 0) {
    statistikAkademiPeserta.map((row, i) => {
      let val = {
        name: row.slug,
        pendaftar: row.pendaftar,
        peserta: row.peserta,
        lulus: row.lulus,
        sertifikasi: row.sertifikasi,
      };
      dataStatistikAkademiPeserta.push(val);
    });
  }

  const dataStatistikMitraPendaftar = [];
  if (
    statistikMitraPendaftar &&
    statistikMitraPendaftar.list &&
    statistikMitraPendaftar.list.length > 0
  ) {
    statistikMitraPendaftar.list.map((row, i) => {
      let val = {
        id: i + 1,
        title: row.mitra,
        percent: row.persentase,
        total: row.hasil,
      };
      dataStatistikMitraPendaftar.push(val);
    });
  }

  const dataStatistikMitraPeserta = [];
  if (
    statistikMitraPeserta &&
    statistikMitraPeserta.list &&
    statistikMitraPeserta.list.length > 0
  ) {
    statistikMitraPeserta.list.map((row, i) => {
      let val = {
        id: i + 1,
        title: row.mitra,
        percent: row.persentase,
        total: row.hasil,
      };
      dataStatistikMitraPeserta.push(val);
    });
  }

  const dataWilayah = [];
  if (wilayah) {
    wilayah.map((row, i) => {
      let val = {
        provinsi: row.label,
        position: [row.latitude, row.longitude],
        pendaftar: row.pendaftar,
        peserta: row.peserta,
        sertifikasi: row.sertifikasi,
        lulus: row.lulus,
      };
      dataWilayah.push(val);
    });
  }

  const dataProvinsiPendaftar = [];
  if (provinsiPendaftar && provinsiPendaftar.list.length > 0) {
    provinsiPendaftar.list.map((row, i) => {
      let val = {
        id: i + 1,
        title: row.label,
        percent: row.persentase,
        total: row.pendaftar,
      };
      dataProvinsiPendaftar.push(val);
    });
  }

  const dataProvinsiPeserta = [];
  if (
    provinsiPeserta &&
    provinsiPeserta.list &&
    provinsiPeserta.list.length > 0
  ) {
    provinsiPeserta.list.map((row, i) => {
      let val = {
        id: i + 1,
        title: row.label,
        percent: row.persentase,
        total: row.pendaftar,
      };
      dataProvinsiPeserta.push(val);
    });
  }

  const dataPendidikanPeserta = [];
  const dataUmurPendaftar = [];
  const dataUmurPeserta = [];
  const dataKelaminPendaftar = [];
  const dataKelaminPeserta = [];
  const dataPendidikanPendaftar = [];

  if (dataPribadi) {
    if (dataPribadi.umur_pendaftar) {
      dataPribadi.umur_pendaftar.map((row, i) => {
        let val = {
          id: i + 1,
          title: row.name,
          percent: row.persentase,
          total: row.total,
        };
        dataUmurPendaftar.push(val);
      });
    }

    if (dataPribadi.umur_peserta) {
      dataPribadi.umur_peserta.map((row, i) => {
        let val = {
          id: i + 1,
          title: row.name,
          percent: row.persentase,
          total: row.total,
        };
        dataUmurPeserta.push(val);
      });
    }

    if (dataPribadi.jenis_kelamin_pendaftar) {
      dataPribadi.jenis_kelamin_pendaftar.map((row, i) => {
        let val = {
          id: i + 1,
          title: row.name,
          percent: row.persentase,
          total: row.total,
        };
        dataKelaminPendaftar.push(val);
      });
    }

    if (dataPribadi.jenis_kelamin_peserta) {
      dataPribadi.jenis_kelamin_peserta.map((row, i) => {
        let val = {
          id: i + 1,
          title: row.name,
          percent: row.persentase,
          total: row.total,
        };
        dataKelaminPeserta.push(val);
      });
    }

    if (dataPribadi.pendidikan_pendaftar) {
      dataPribadi.pendidikan_pendaftar.map((row, i) => {
        let val = {
          id: i + 1,
          title: row.name,
          percent: row.persentase,
          total: row.total,
        };
        dataPendidikanPendaftar.push(val);
      });
    }

    if (dataPribadi.pendidikan_peserta) {
      dataPribadi.pendidikan_peserta.map((row, i) => {
        let val = {
          id: i + 1,
          title: row.name,
          percent: row.persentase,
          total: row.total,
        };
        dataPendidikanPeserta.push(val);
      });
    }
  }
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

  const handlePercentage = (totalAdd, total) => {
    return Math.ceil((100 * totalAdd) / total);
  };

  return (
    <PageWrapper>
      <section className="opening-hello">
        <Header
          name={"Kepala Badan Litbang SDM Kementerian Kominfo"}
          text={"Pelatihan Digital Talent Scholarship"}
          value={totalPengguna?.total}
          statisticDay={totalPengguna?.total_penambahan}
          dailyAdd={handlePercentage(
            totalPengguna?.total_penambahan,
            totalPengguna?.total
          )}
        />
      </section>

      <section className="total-pengguna mt-10">
        <h2 className="title-section-dashboard">total peserta</h2>
        <div className="row mt-5">
          <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
            <CardTotal
              title={"Total Seluruh Pendaftar"}
              value={totalPendaftar?.pendaftar?.total}
              statisticDay={totalPendaftar?.pendaftar?.total_penambahan}
              dailyAdd={handlePercentage(
                totalPendaftar?.pendaftar?.total_penambahan,
                totalPendaftar?.pendaftar?.total
              )}
            />
          </div>
          <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
            <CardTotal
              title={"Total Seluruh Peserta"}
              value={totalPendaftar?.peserta?.total}
              statisticDay={totalPendaftar?.peserta?.total_penambahan}
              dailyAdd={handlePercentage(
                totalPendaftar?.peserta?.total_penambahan,
                totalPendaftar?.peserta?.total
              )}
            />
          </div>
        </div>
      </section>

      <section className="statistik-peserta mt-5">
        <h2 className="title-section-dashboard">statistik peserta</h2>
        <div className="row mt-5">
          <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
            <div className="card card-custom bg-white h-100">
              <div className="card-body py-4">
                <StatistikWrapper
                  title={"Pesebaran Pendaftaran Akademi"}
                  funcFilterYear={(value) => {
                    setFilterStatistikAkademiPendaftar(value);
                    dispatch(
                      getDigitalentStatistikAkademiPendaftar(token, value)
                    );
                  }}
                  year={year}
                />

                <div className="chard-bar mt-5">
                  {loadingStatistikAkademiPendaftar ? (
                    <LoadingDashboard
                      loading={loadingStatistikAkademiPendaftar}
                    />
                  ) : (
                    <ResponsiveContainer width={"100%"} height={300}>
                      <BarChart
                        data={dataStatistikAkademiPendaftar}
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
                        <Bar dataKey="data" fill="#0063CC" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
            <div className="card card-custom bg-white">
              <div className="card-body py-4">
                <StatistikWrapper
                  title={"Pesebaran Peserta Akademi"}
                  funcFilterYear={(value) => {
                    setFilterStatistikAkademiPeserta(value);
                    dispatch(
                      getDigitalentStatistikAkademiPeserta(token, value)
                    );
                  }}
                  year={year}
                />

                <div className="chard-bar mt-5">
                  {loadingStatistikAkademiPeserta ? (
                    <LoadingDashboard
                      loading={loadingStatistikAkademiPeserta}
                    />
                  ) : (
                    <ResponsiveContainer width={"100%"} height={300}>
                      <BarChart
                        data={dataStatistikAkademiPeserta}
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
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="statistik-mitra mt-5">
        <h2 className="title-section-dashboard">statistik mitra</h2>
        <div className="row mt-5">
          <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
            <div className="card card-custom bg-white h-100">
              <div className="card-body pb-3">
                <p className="text-dashboard-gray fz-16 fw-500">
                  Jumlah Pendaftaran
                </p>
                {loadingStatistikMitraPendaftar ? (
                  <LoadingDashboard loading={loadingStatistikMitraPendaftar} />
                ) : (
                  <>
                    <ListCardInfo data={dataStatistikMitraPendaftar} />
                    <PaginationDashboard
                      total={statistikMitraPendaftar?.total}
                      perPage={statistikMitraPendaftar?.perPage}
                      title="Pendaftar"
                      activePage={pageMitraPendaftaran}
                      funcPagination={(value) => {
                        setPageMitraPendaftaran(value);
                        dispatch(
                          getDigitalentStatistikMitraPendaftar(token, value)
                        );
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
            <div className="card card-custom bg-white h-100">
              <div className="card-body pb-3">
                <p className="text-dashboard-gray fz-16 fw-500">
                  Jumlah Peserta
                </p>
                {loadingStatistikMitraPeserta ? (
                  <LoadingDashboard loading={loadingStatistikMitraPeserta} />
                ) : (
                  <>
                    <ListCardInfo data={dataStatistikMitraPeserta} />
                    <PaginationDashboard
                      total={statistikMitraPeserta?.total}
                      perPage={statistikMitraPeserta?.perPage}
                      title="Peserta"
                      activePage={pageMitraPeserta}
                      funcPagination={(value) => {
                        setPageMitraPeserta(value);
                        dispatch(
                          getDigitalentStatistikMitraPeserta(token, value)
                        );
                      }}
                    />
                  </>
                )}
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
                  Pendaftaran pelatihan yang dibuka
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
                      {loadingTablePendaftaran ? (
                        <td colSpan={6}>
                          <LoadingDashboard loading={loadingTablePendaftaran} />
                        </td>
                      ) : (
                        tablePendaftar &&
                        tablePendaftar.list.length > 0 &&
                        tablePendaftar.list.map((row, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{row.akademi}</td>
                            <td>{row.mitra}</td>
                            <td>{row.tema}</td>
                            <td>{row.pelatihan}</td>
                            <td>
                              {moment(row.pendaftaran_mulai)
                                .utc()
                                .format("DD MMMM YYYY")}{" "}
                              -{" "}
                              {moment(row.pendaftaran_selesai)
                                .utc()
                                .format("DD MMMM YYYY")}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <PaginationDashboard
                  total={tablePendaftar?.total}
                  perPage={tablePendaftar?.perPage}
                  title="Pendaftar"
                  activePage={pageTablePendaftaran}
                  funcPagination={(value) => {
                    setPageTablePendaftaran(value);
                    dispatch(getDigitalentTablePendaftaran(token, value));
                  }}
                />
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
                    <p className="mt-4 mr-3 text-dashboard-gray-caption">
                      Akademi:
                    </p>
                    <select
                      className="border-0 p-0"
                      value={academyPesertaWilayah}
                      onChange={(e) => {
                        setAcademyPesertaWilayah(e.target.value);
                        dispatch(dropdownTemabyAkademi(e.target.value, token));
                        dispatch(
                          getDigitalentPesertaWilayah(
                            token,
                            e.target.value,
                            themePesertaWilayah,
                            yearPesertaWilayah
                          )
                        );
                      }}
                    >
                      <option value="">Semua</option>
                      {dataAkademi &&
                        dataAkademi.data &&
                        dataAkademi.data.length > 0 &&
                        dataAkademi.data.map((row, i) => (
                          <option value={row.value} key={i}>
                            {row.slug}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="d-flex flex-wrap align-items-center mr-3">
                    <p className="mt-4 mr-3 text-dashboard-gray-caption">
                      Tema:
                    </p>
                    <select
                      className="border-0 p-0"
                      value={themePesertaWilayah}
                      onChange={(e) => {
                        setThemePesertaWilayah(e.target.value);
                        dispatch(
                          getDigitalentPesertaWilayah(
                            token,
                            academyPesertaWilayah,
                            e.target.value,
                            yearPesertaWilayah
                          )
                        );
                      }}
                    >
                      <option value="">Semua</option>
                      {/* {drowpdownTemabyAkademi &&
                        drowpdownTemabyAkademi.data &&
                        drowpdownTemabyAkademi.data.data.length > 0 &&
                        drowpdownTemabyAkademi.data.data.map((row, i) => (
                          <option key={i} value={row.value}>
                            {row.label}
                          </option>
                        ))} */}
                    </select>
                  </div>
                  <div className="d-flex flex-wrap align-items-center">
                    <p className="mt-4 mr-3 text-dashboard-gray-caption">
                      Tahun:
                    </p>
                    <select
                      className="border-0 p-0"
                      value={yearPesertaWilayah}
                      onChange={(e) => {
                        setYearPesertaWilayah(e.target.value);
                        dispatch(
                          getDigitalentPesertaWilayah(
                            token,
                            academyPesertaWilayah,
                            themePesertaWilayah,
                            e.target.value
                          )
                        );
                      }}
                    >
                      {year &&
                        year.map((row, i) => (
                          <option key={i} value={row}>
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
                  <MyMap data={dataWilayah} />
                </div>
              </div>
            </div>
            <div className="row mt-10">
              <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
                <div className="card card-custom border bg-white h-100">
                  <div className="card-body pb-3">
                    <p className="text-dashboard-gray fz-16 fw-500">
                      Komposisi Provinsi Pendaftar
                    </p>
                    {loadingProvinsiPendaftar ? (
                      <LoadingDashboard loading={loadingProvinsiPendaftar} />
                    ) : (
                      <>
                        <ListCardInfo data={dataProvinsiPendaftar} />

                        <PaginationDashboard
                          total={provinsiPendaftar?.total}
                          perPage={provinsiPendaftar?.perPage}
                          title="Pendaftar"
                          activePage={pageProvinsiPendaftar}
                          funcPagination={(value) => {
                            setPageProvinsiPendaftar(value);
                            dispatch(
                              getDigitalentProvinsiPendaftar(token, value)
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
                      Komposisi Provinsi Peserta
                    </p>
                    {loadingProvinsiPeserta ? (
                      <LoadingDashboard loading={loadingProvinsiPeserta} />
                    ) : (
                      <>
                        <ListCardInfo data={dataProvinsiPeserta} />
                        <PaginationDashboard
                          total={provinsiPeserta?.total}
                          perPage={provinsiPeserta?.perPage}
                          title="Peserta"
                          activePage={pageProvinsiPeserta}
                          funcPagination={(value) => {
                            setPageProvinsiPeserta(value);
                            dispatch(
                              getDigitalentProvinsiPeserta(token, value)
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
                  title={"Komposisi Usia Pendaftar"}
                  data={dataUmurPendaftar}
                />
              </div>
              <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
                <CardInfo
                  title={"Komposisi Usia Peserta"}
                  data={dataUmurPeserta}
                />
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
                <CardInfo
                  title={"Total Pendaftar berdasarkan Jenis Kelamin"}
                  data={dataKelaminPendaftar}
                />
              </div>
              <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
                <CardInfo
                  title={"Total Peserta berdasarkan Jenis Kelamin"}
                  data={dataKelaminPeserta}
                />
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
                <CardInfo
                  title={"Komposisi Pendidikan Pendaftar"}
                  data={dataPendidikanPendaftar}
                />
              </div>
              <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
                <CardInfo
                  title={"Komposisi Pendidikan Peserta"}
                  data={dataPendidikanPeserta}
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
