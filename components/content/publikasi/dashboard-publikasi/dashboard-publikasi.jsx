import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  XAxis,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";

import CardDashboard from "../../../CardDashboard";
import PageWrapper from "../../../wrapper/page.wrapper";
import LoadingTable from "../../../LoadingTable";

import styles from "../../../../styles/pagination.module.css";

import { clearErrors } from "../../../../redux/actions/publikasi/dashboard-publikasi.actions";

const DashbardPublikasi = ({ token }) => {
  const { loading, error, dashboard_publikasi } = useSelector(
    (state) => state.allDashboardPublikasi
  );

  const [totalPublishContent, setTotalPublishContent] = useState(null);
  const [totalUnpublishContent, setTotalUnpublishContent] = useState(null);

  useEffect(() => {
    let sum_publish = 0;
    let sum_unpublish = 0;

    if (dashboard_publikasi) {
      for (const prop in dashboard_publikasi) {
        sum_publish += dashboard_publikasi[prop].total_publish;
        sum_unpublish += dashboard_publikasi[prop].total_unpublish;
      }

      setTotalPublishContent(sum_publish);
      setTotalUnpublishContent(sum_unpublish);
    }
  }, [dashboard_publikasi]);

  const colors = ["#4299E1", "#215480"];
  const [dataBarChart, setDataBarChart] = useState([
    {
      name: "Artikel",
      publish: dashboard_publikasi.artikel.total_publish,
      "belum dipublish": dashboard_publikasi.artikel.total_unpublish,
    },

    {
      name: "Berita",
      publish: dashboard_publikasi.berita.total_publish,
      "belum dipublish": dashboard_publikasi.berita.total_unpublish,
    },

    {
      name: "Video",
      publish: dashboard_publikasi.video.total_publish,
      "belum dipublish": dashboard_publikasi.video.total_unpublish,
    },

    {
      name: "Galeri",
      publish: dashboard_publikasi.gallery.total_publish,
      "belum dipublish": dashboard_publikasi.gallery.total_unpublish,
    },

    {
      name: "Imagetron",
      publish: dashboard_publikasi.imagetron.total_publish,
      "belum dipublish": dashboard_publikasi.imagetron.total_unpublish,
    },

    {
      name: "FAQ",
      publish: dashboard_publikasi.faq.total_publish,
      "belum dipublish": dashboard_publikasi.faq.total_unpublish,
    },
  ]);

  const [dataPieChart, setDataPieChart] = useState([
    {
      name: "Peserta",
      value: 100,
    },

    {
      name: "Author",
      value: 400,
    },
  ]);

  const [dataDashboardBerita, setDataDashboardBerita] = useState(
    dashboard_publikasi.berita ? dashboard_publikasi.berita : null
  );
  const [dataDashboardArtikel, setDataDashboardArtikel] = useState(
    dashboard_publikasi.artikel ? dashboard_publikasi.artikel : null
  );
  const [dataDashboardGallery, setDataDashboardGallery] = useState(
    dashboard_publikasi.gallery ? dashboard_publikasi.gallery : null
  );
  const [dataDashboardVideo, setDataDashboardVideo] = useState(
    dashboard_publikasi.video ? dashboard_publikasi.video : null
  );

  const titleToTrim = 30;

  const handleTitleToTrim = (str) => {
    let result = null;

    if (str.length > titleToTrim) {
      result = str.slice(0, titleToTrim) + "...";
    } else {
      result = str;
    }

    return result;
  };

  return (
    <>
      <PageWrapper>
        <div className="row">
          <div className={`${styles.haloAdmin} col-lg-12 col-xxl-12`}>
            <div className="card card-custom bg-white">
              <div
                className="card-body pt-2"
                style={{
                  backgroundPosition: "left bottom",
                  backgroundImage: "url('/assets/media/Frame-White.svg')",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "6px",
                }}
              >
                <div className="d-flex align-items-center mb-10">
                  <div className="d-flex flex-column flex-grow-1 font-weight-bold">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="col-md-12 mt-5">
                          <h4 className="font-weight-bolder text-primary">
                            Halo Admin A
                          </h4>
                        </div>
                        <div className="col-md-10 col-lg-12">
                          <p className="font-weight-bold text-muted">
                            Selamat Datang di Dashboard Publikasi, ada informasi
                            apa hari ini ?
                          </p>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div
                          className={`${styles.headImage} ml-auto float-right ilustrator-dashboard`}
                        >
                          <Image
                            src="/assets/media/ilustrator-1.svg"
                            width={300}
                            height={145}
                            alt="dashboard-pict"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${styles.kontenPublish} col-md-12 col-lg-6 col-xxl-6`}
          >
            <div className="card card-custom card-stretch gutter-b">
              <div
                className="card-body pt-2"
                style={{ backgroundColor: "#215480", borderRadius: "6px" }}
              >
                <h3 className="card-title font-weight-bolder text-light mt-5">
                  Total Publish dan Unpublish
                </h3>
                <div
                  className={`${styles.barChart} d-flex align-items-center justify-content-center col-sm-12`}
                >
                  <BarChart width={260} height={350} data={dataBarChart}>
                    <XAxis dataKey="name" hide={true} />
                    <Bar
                      dataKey="publish"
                      fill="#4299E1"
                      barSize={10}
                      radius={[10, 10, 0, 0]}
                    />
                    <Bar
                      dataKey="belum dipublish"
                      fill="#4CBDE2"
                      barSize={10}
                      radius={[10, 10, 0, 0]}
                    />
                    <Tooltip cursor={{ fill: "transparent" }} />
                  </BarChart>
                </div>
              </div>
              <div className="card-body">
                <div className="mb-10 flex-column">
                  <h3 className="card-title font-weight-bolder text-muted">
                    Total Konten
                  </h3>
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 d-flex flex-row">
                      <div
                        style={{
                          backgroundColor: "#4299E1",
                          width: "50px",
                          height: "50px",
                          borderRadius: "6px",
                        }}
                      ></div>
                      <div className=" ml-3 my-2">
                        <h3 className="font-weight-bold">
                          {totalPublishContent}
                        </h3>

                        <div className="text-muted">Publish</div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 d-flex flex-row">
                      <div
                        style={{
                          backgroundColor: "#4CBDE2",
                          width: "50px",
                          height: "50px",
                          borderRadius: "6px",
                        }}
                      ></div>
                      <div className=" ml-3 my-2">
                        <h3 className="font-weight-bold">
                          {totalUnpublishContent}
                        </h3>

                        <div className="text-muted">Belum dipublish</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.totalUser} col-md-12 col-lg-6 col-xxl-6`}>
            <div className="card card-custom card-stretch gutter-b">
              <div className="card-body pt-2">
                <h3 className="card-title font-weight-bolder text-dark mt-5">
                  Total Author dan Admin Publikasi
                </h3>
                <div className="text-muted" style={{ marginTop: "-20px" }}>
                  Total User
                </div>

                <div className="d-flex align-items-center justify-content-center">
                  <PieChart width={280} height={350}>
                    <Pie
                      data={dataPieChart}
                      cx="50%"
                      cy="50%"
                      innerRadius={100}
                      outerRadius={120}
                      paddingAngle={-10}
                      cornerRadius={30}
                    >
                      {dataPieChart.map((el, i) => {
                        return <Cell key={i} fill={colors[i]} />;
                      })}
                    </Pie>
                    <Tooltip cursor={{ fill: "transparent" }} />
                  </PieChart>
                </div>

                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ marginTop: "-200px" }}
                >
                  <h1 className="font-weight-bolder display-2">133</h1>
                </div>
              </div>
              <div className="card-body" style={{ marginTop: "18.5vh" }}>
                <div className="mb-10 flex-column">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 d-flex flex-row">
                      <Image
                        src="/assets/icon/new/mail-purple.svg"
                        width={53}
                        height={50}
                        alt="publish-pict"
                      />
                      <div className=" ml-3 my-2">
                        <h3 className="font-weight-bold">200</h3>

                        <div className="text-muted">Author</div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 d-flex flex-row mt-1">
                      <Image
                        src="/assets/icon/new/blue-bars.svg"
                        width={53}
                        height={50}
                        alt="publish-pict"
                      />
                      <div className=" ml-3 my-2">
                        <h3 className="font-weight-bold">200</h3>

                        <div className="text-muted">Admin Publikasi</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12 col-xxl-12"></div>

          <div className={`${styles.topBerita} col-lg-6 col-xxl-6`}>
            {dataDashboardBerita.top_berita ? (
              <div className="card card-custom card-stretch gutter-b">
                <div className="card-header border-0">
                  <h3 className="card-title font-weight-bolder text-dark">
                    3 Top Berita
                  </h3>
                </div>
                <div className="card-body pt-2">
                  {dataDashboardBerita.top_berita.map((el, i) => {
                    return (
                      <div className="d-flex align-items-center mb-10" key={i}>
                        <div className="symbol symbol-40 symbol-light-success mr-5">
                          <Image
                            width={94}
                            height={63}
                            src="/assets/media/dummy-banner.png"
                            className="align-self-end rounded"
                            alt=""
                          />
                        </div>
                        <div
                          className="row align-items-center"
                          style={{ width: "100%" }}
                        >
                          <div className="col-12 col-md-9 col-lg-6 d-flex flex-column flex-grow-1 font-weight-bold">
                            <p className="text-dark text-hover-primary mb-1 font-size-lg">
                              {handleTitleToTrim(el.judul_berita)}
                            </p>
                            <span className="text-muted">
                              Kategori :{" "}
                              <span className="text-primary">
                                {el.kategori}
                              </span>
                            </span>
                            <span className="text-muted">
                              Created By :{" "}
                              <span className="text-primary">{el.dibuat}</span>
                            </span>
                          </div>

                          <div
                            className={`${styles.totalView} col-12 col-md-3 col-lg-6 d-flex flex-column flex-grow-1 font-weight-bold`}
                          >
                            <p className="text-dark text-hover-primary mb-1 font-size-lg font-weight-bold display-4">
                              {el.total_views}
                            </p>
                            <span className="text-muted">Dibaca</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <LoadingTable />
            )}
          </div>

          <div
            className={`${styles.topArtikel} col-lg-6 col-xxl-6 order-1 order-xxl-2`}
          >
            {dataDashboardArtikel.top_artikel ? (
              <div className="card card-custom card-stretch gutter-b">
                <div className="card-header border-0">
                  <h3 className="card-title font-weight-bolder text-dark">
                    3 Top Artikel
                  </h3>
                </div>
                <div className="card-body pt-2">
                  {dataDashboardArtikel.top_artikel.map((el, i) => {
                    return (
                      <div className="d-flex align-items-center mb-10" key={i}>
                        <div className="symbol symbol-40 symbol-light-success mr-5">
                          <Image
                            width={94}
                            height={63}
                            src="/assets/media/dummy-banner.png"
                            className="align-self-end rounded"
                            alt=""
                          />
                        </div>
                        <div
                          className="row align-items-center"
                          style={{ width: "100%" }}
                        >
                          <div className="col-12 col-md-9 col-lg-6 d-flex flex-column flex-grow-1 font-weight-bold">
                            <p className="text-dark text-hover-primary mb-1 font-size-lg">
                              {handleTitleToTrim(el.judul_artikel)}
                            </p>
                            <span className="text-muted">
                              Kategori :{" "}
                              <span className="text-primary">
                                {el.kategori}
                              </span>
                            </span>
                            <span className="text-muted">
                              Created By :{" "}
                              <span className="text-primary">{el.dibuat}</span>
                            </span>
                          </div>

                          <div
                            className={`${styles.totalView} col-12 col-md-3 col-lg-6 d-flex flex-column flex-grow-1 font-weight-bold`}
                          >
                            <p className="text-dark text-hover-primary mb-1 font-size-lg font-weight-bold display-4">
                              {el.total_views}
                            </p>
                            <span className="text-muted">Dibaca</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <LoadingTable />
            )}
          </div>

          <div
            className={`${styles.topGaleri} col-lg-6 col-xxl-6 order-1 order-xxl-2`}
          >
            {dataDashboardGallery.top_gallery ? (
              <div className="card card-custom card-stretch gutter-b">
                <div className="card-header border-0">
                  <h3 className="card-title font-weight-bolder text-dark">
                    3 Top Galeri
                  </h3>
                </div>
                <div className="card-body pt-2">
                  {dataDashboardGallery.top_gallery.map((el, i) => {
                    return (
                      <div className="d-flex align-items-center mb-10" key={i}>
                        <div
                          className="symbol symbol-40 symbol-light-success mr-5"
                          key={i}
                        >
                          <Image
                            width={94}
                            height={63}
                            src="/assets/media/dummy-banner.png"
                            className="align-self-end rounded"
                            alt=""
                          />
                        </div>
                        <div
                          className="row align-items-center"
                          style={{ width: "100%" }}
                        >
                          <div className="col-12 col-md-9 col-lg-6 d-flex flex-column flex-grow-1 font-weight-bold">
                            <p className="text-dark text-hover-primary mb-1 font-size-lg">
                              {handleTitleToTrim(el.judul)}
                            </p>
                            <span className="text-muted">
                              Kategori :{" "}
                              <span className="text-primary">
                                {el.nama_kategori}
                              </span>
                            </span>
                            <span className="text-muted">
                              Created By :{" "}
                              <span className="text-primary">{el.dibuat}</span>
                            </span>
                          </div>

                          <div
                            className={`${styles.totalView} col-12 col-md-3 col-lg-6 d-flex flex-column flex-grow-1 font-weight-bold`}
                          >
                            <p className="text-dark text-hover-primary mb-1 font-size-lg font-weight-bold display-4">
                              {el.total_views}
                            </p>
                            <span className="text-muted">Dibaca</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <LoadingTable />
            )}
          </div>
          <div
            className={`${styles.topVideo} col-lg-6 col-xxl-6 order-1 order-xxl-2`}
          >
            {dataDashboardVideo.top_video ? (
              <div className="card card-custom card-stretch gutter-b">
                <div className="card-header border-0">
                  <h3 className="card-title font-weight-bolder text-dark">
                    3 Top Video
                  </h3>
                </div>
                <div className="card-body pt-2">
                  {dataDashboardVideo.top_video.map((el, i) => {
                    return (
                      <div className="d-flex align-items-center mb-10" key={i}>
                        <div className="symbol symbol-40 symbol-light-success mr-5">
                          <Image
                            width={94}
                            height={63}
                            src="/assets/media/dummy-banner.png"
                            className="align-self-end rounded"
                            alt=""
                          />
                        </div>
                        <div
                          className="row align-items-center"
                          style={{ width: "100%" }}
                        >
                          <div className="col-12 col-md-9 col-lg-6 d-flex flex-column flex-grow-1 font-weight-bold">
                            <p className="text-dark text-hover-primary mb-1 font-size-lg">
                              {handleTitleToTrim(el.judul_video)}
                            </p>
                            <span className="text-muted">
                              Kategori :{" "}
                              <span className="text-primary">
                                {el.kategori}
                              </span>
                            </span>
                            <span className="text-muted">
                              Created By :{" "}
                              <span className="text-primary">{el.dibuat}</span>
                            </span>
                          </div>

                          <div
                            className={`${styles.totalView} col-12 col-md-3 col-lg-6 d-flex flex-column flex-grow-1 font-weight-bold`}
                          >
                            <p className="text-dark text-hover-primary mb-1 font-size-lg font-weight-bold display-4">
                              {el.total_views}
                            </p>
                            <span className="text-muted">Dibaca</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <LoadingTable />
            )}
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default DashbardPublikasi;
