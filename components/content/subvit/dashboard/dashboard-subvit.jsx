import React, { useEffect } from "react";
import Image from "next/image";

import PageWrapper from "../../../wrapper/page.wrapper";
import CardDashboardMini from "../../../CardDashboardMini";
import styles from "./dashboard.module.css";
import LoadingTable from "../../../LoadingTable";
import imageSubstansi from "../../../../public/assets/media/logos/substansi.png";
import imageSurvey from "../../../../public/assets/media/logos/survey.png";
import imageTrivia from "../../../../public/assets/media/logos/trivia.png";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Label,
  Tooltip,
} from "recharts";
import { useRouter } from "next/dist/client/router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getDashboardSubvit } from "../../../../redux/actions/subvit/subtance-question-detail.action";
import { Dropdown } from "react-bootstrap";

const DashbardSubvit = ({ token }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { dashboard_subvit, loading } = useSelector(
    (state) => state.dashboardSubvit
  );

  const { data: dataPermission } = useSelector(
    (state) => state.permissionsSubvit
  );

  const data = [];
  dashboard_subvit &&
    dashboard_subvit.chart &&
    dashboard_subvit.chart.map((item) => {
      data.push(item);
    });

  let dataItem = [];

  data.map((item) => {
    return Object.entries(item).map((item) =>
      dataItem.push({ name: item[0], value: item[1] })
    );
  });

  const handleNextPagination = () => {
    const page = parseInt(router.query.page_substansi) + 1;
    router.push(
      `${router.pathname}?page_substansi=${page}&page_trivia=${router.query.page_trivia}&page_survey=${router.query.page_survey}`
    );
    dispatch(getDashboardSubvit(token));
  };

  const handleBackPagination = () => {
    const page = parseInt(router.query.page_substansi) - 1;
    router.push(
      `${router.pathname}?page_substansi=${page}&page_trivia=${router.query.page_trivia}&page_survey=${router.query.page_survey}`
    );
  };

  const handleNextPaginationSurvey = () => {
    const page = parseInt(router.query.page_survey) + 1;
    router.push(
      `${router.pathname}?page_substansi=${router.query.page_substansi}&page_trivia=${router.query.page_trivia}&page_survey=${page}`
    );
  };

  const handleBackPaginationSurvey = () => {
    const page = parseInt(router.query.page_survey) - 1;
    router.push(
      `${router.pathname}?page_substansi=${router.query.page_substansi}&page_trivia=${router.query.page_trivia}&page_survey=${page}`
    );
  };

  const handleNextPaginationTrivia = () => {
    const page = parseInt(router.query.page_trivia) + 1;
    router.push(
      `${router.pathname}?page_substansi=${router.query.page_substansi}&page_trivia=${page}&page_survey=${router.query.page_survey}`
    );
  };

  const handleBackPaginationTrivia = () => {
    const page = parseInt(router.query.page_trivia) - 1;
    router.push(
      `${router.pathname}?page_substansi=${router.query.page_substansi}&page_trivia=${page}&page_survey=${router.query.page_survey}`
    );
  };

  const COLORS = ["#4299E1", "#215480", "##4CBDE2"];

  return (
    <>
      <PageWrapper>
        <div className="row">
          <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 pb-0">
            <div className="card card-custom bg-light-primary gutter-b mt-5">
              <div
                className="card-body pt-2"
                style={{
                  backgroundPosition: "left bottom",
                  backgroundImage: "url('/assets/media/jukut.svg')",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="d-flex align-items-center mb-10">
                  <div className="d-flex flex-column flex-grow-1 font-weight-bold">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="col-md-12 mt-5">
                          <h4 className="font-weight-bolder text-primary">
                            Halo{" "}
                            {(dataPermission && dataPermission.user.name) ||
                              "Admin "}
                          </h4>
                        </div>
                        <div className="col-md-12">
                          <p className="font-weight-bold text-muted">
                            Sudah Makan Hari ini? <br /> Kalau sudah yuk dicheck
                            verifikasi Test untuk hari ini :)
                          </p>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div
                          className={`${styles.imageDashboard} ml-auto float-right ilustrator-dashboard`}
                          style={{
                            position: "absolute",
                            right: "-50px",
                            top: "-10px",
                            width: "40%",
                          }}
                        >
                          <Image
                            src="/assets/media/ilustrator-1.svg"
                            width={300}
                            height={200}
                            alt="ilustrator-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {dataPermission &&
        dataPermission.roles.includes("Super Admin") &&
        dataPermission &&
        dataPermission.permissions.includes(
          "subvit.manage" && "subvit.dashboard.manage"
        ) ? (
          <div className="row">
            <div className="col-lg-6 col-xxl-6 order-1 order-xxl-2">
              <div className="card card-custom  gutter-b ">
                <div
                  className={`${styles.cardTwo} card-body pt-2`}
                  style={{
                    backgroundPosition: "right bottom",
                    backgroundImage: "url('/assets/media/jukut.svg')",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="d-flex align-items-center mb-10">
                    <div className="d-flex flex-column flex-grow-1 font-weight-bold">
                      <div className="row">
                        <div className="col-md-12 col-xl-5 col-sm-12">
                          <div className="col-md-10 mt-16">
                            <h4
                              className={`${styles.textCardTwo} font-weight-bolder text-primary`}
                            >
                              Buat Soal Test Substansi, Survey dan TRIVIA
                            </h4>
                          </div>
                        </div>

                        <div
                          className={`${styles.colCard} col-md-12 col-xl-7 col-sm-12 mt-25 `}
                        >
                          <center>
                            <Dropdown>
                              <Dropdown.Toggle className={styles.btnDropdown}>
                                Buat Soal
                              </Dropdown.Toggle>
                              <Dropdown.Menu style={{ width: "195px" }}>
                                <Dropdown.Item href="subvit/substansi/tambah-step-1">
                                  Tambah Test Substansi
                                </Dropdown.Item>
                                <Dropdown.Item href="subvit/survey/tambah">
                                  Tambah Survey
                                </Dropdown.Item>
                                <Dropdown.Item href="subvit/trivia/tambah">
                                  Tambah TRIVIA
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </center>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xxl-6 order-1 order-xxl-2">
              {
                <div className="row">
                  <div
                    className={`${styles.colMinicard} col-lg-4 col-md-4 col-sm-4 col-xs-4  col-xxl-4 order-1 order-xxl-2`}
                  >
                    <CardDashboardMini
                      link="/subvit/substansi"
                      background="bg-white"
                      icon="book-white.svg"
                      title="Test Substansi"
                    />
                  </div>
                  <div
                    className={`${styles.colMinicard} col-lg-4 col-md-4 col-sm-4 col-xs-4 col-xxl-4 order-1 order-xxl-2`}
                  >
                    <CardDashboardMini
                      link="/subvit/survey"
                      background="bg-white"
                      icon="blok4-secondary.svg"
                      title="Survey"
                    />
                  </div>
                  <div
                    className={`${styles.colMinicard} col-lg-4 col-md-4 col-sm-4 col-xs-4 col-xxl-4 order-1 order-xxl-2`}
                  >
                    <CardDashboardMini
                      link="/subvit/trivia"
                      background="bg-white"
                      icon="movie-secondary.svg"
                      title="Trivia"
                    />
                  </div>
                </div>
              }
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="row">
          <div className={`${styles.displayMedium} col-12`}>
            <div className={`${styles.cardPeserta} card`}>
              <div className={`${styles.cardPesertaBody} card-body`}>
                <h1 className={`${styles.headPeserta}`}>Total Peserta</h1>
                <p className={`${styles.subHeadPeserta}`}>
                  Total Peserta dari Test Substansi, Survey dan TRIVIA
                </p>
                {loading ? (
                  <LoadingTable loading={loading} />
                ) : (
                  <>
                    <center>
                      {/* RESPONSIVE FOLD */}
                      <div
                        style={{
                          width: "100%",
                          height: 300,
                        }}
                        className={styles.pieChartResponsiveFold}
                      >
                        <ResponsiveContainer>
                          <PieChart>
                            <Tooltip />
                            <Pie
                              data={dataItem.slice(0, 3)}
                              cx={250}
                              cy={150}
                              innerRadius={90}
                              outerRadius={110}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {dataItem.map((entry, index) => (
                                <>
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                  ></Cell>
                                </>
                              ))}

                              <Label
                                width={30}
                                position="center"
                                className={styles.labelChart}
                              >
                                {dashboard_subvit &&
                                  dashboard_subvit.chart &&
                                  dashboard_subvit.chart[3].total}
                              </Label>
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          height: 300,
                        }}
                        className={styles.pieChart}
                      >
                        <ResponsiveContainer>
                          <PieChart>
                            <Tooltip />
                            <Pie
                              data={dataItem.slice(0, 3)}
                              cx={250}
                              cy={150}
                              innerRadius={100}
                              outerRadius={120}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {dataItem.map((entry, index) => (
                                <>
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                  ></Cell>
                                </>
                              ))}

                              <Label
                                width={30}
                                position="center"
                                className={styles.labelChart}
                              >
                                {dashboard_subvit &&
                                  dashboard_subvit.chart &&
                                  dashboard_subvit.chart[3].total}
                              </Label>
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </center>
                    <div className={styles.cardBottom}>
                      <table
                        style={{
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        <tr>
                          <td style={{ width: "60px" }}>
                            <Image
                              src={imageSubstansi}
                              alt=""
                              width={60}
                              height={50}
                            />
                          </td>
                          <td style={{ textAlign: "left" }}>
                            <div className={`${styles.substansi} p-2`}>
                              {dashboard_subvit &&
                                dashboard_subvit.chart &&
                                dashboard_subvit.chart[0].total_substansi}
                              <br />
                              <span className={styles.subTextTotal}>
                                Substansi
                              </span>
                            </div>
                          </td>
                          <td style={{ width: "60px" }}>
                            <Image
                              src={imageSurvey}
                              alt=""
                              width={60}
                              height={50}
                            />
                          </td>
                          <td style={{ textAlign: "left" }}>
                            <div className={`${styles.substansi} p-2`}>
                              {dashboard_subvit &&
                                dashboard_subvit.chart &&
                                dashboard_subvit.chart[1].total_survey}
                              <br />
                              <span className={styles.subTextTotal}>
                                Survey
                              </span>
                            </div>
                          </td>
                          <td style={{ width: "60px" }}>
                            <Image
                              src={imageTrivia}
                              alt=""
                              width={60}
                              height={50}
                            />
                          </td>
                          <td style={{ textAlign: "left" }}>
                            <div className={`${styles.substansi} p-2`}>
                              {dashboard_subvit &&
                                dashboard_subvit.chart &&
                                dashboard_subvit.chart[2].total_trivia}
                              <br />
                              <span className={styles.subTextTotal}>
                                Trivia
                              </span>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* TAMPILAN NORMAL */}
          <div
            className={`${styles.displayNormal} col-lg-6 col-xxl-6 order-1 order-xxl-2`}
          >
            <div className={`${styles.cardPeserta} card`}>
              <div className={`${styles.cardPesertaBody} card-body`}>
                <h1 className={`${styles.headPeserta}`}>Total Peserta</h1>
                <p className={`${styles.subHeadPeserta}`}>
                  Total Peserta dari Test Substansi, Survey dan TRIVIA
                </p>
                {loading ? (
                  <LoadingTable loading={loading} />
                ) : (
                  <>
                    <center>
                      {/* RESPONSIVE FOLD */}
                      <div
                        style={{
                          width: "100%",
                          height: 300,
                        }}
                        className={styles.pieChartResponsiveFold}
                      >
                        <ResponsiveContainer>
                          <PieChart>
                            <Tooltip />
                            <Pie
                              data={dataItem.slice(0, 3)}
                              cx={250}
                              cy={150}
                              innerRadius={90}
                              outerRadius={110}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {dataItem.map((entry, index) => (
                                <>
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                  ></Cell>
                                </>
                              ))}

                              <Label
                                width={30}
                                position="center"
                                className={styles.labelChart}
                              >
                                {dashboard_subvit &&
                                  dashboard_subvit.chart &&
                                  dashboard_subvit.chart[3].total}
                              </Label>
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          height: 300,
                        }}
                        className={styles.pieChart}
                      >
                        <ResponsiveContainer>
                          <PieChart>
                            <Tooltip />
                            <Pie
                              data={dataItem.slice(0, 3)}
                              cx={250}
                              cy={150}
                              innerRadius={100}
                              outerRadius={120}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {dataItem.map((entry, index) => (
                                <>
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                  ></Cell>
                                </>
                              ))}

                              <Label
                                width={30}
                                position="center"
                                className={styles.labelChart}
                              >
                                {dashboard_subvit &&
                                  dashboard_subvit.chart &&
                                  dashboard_subvit.chart[3].total}
                              </Label>
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </center>
                    <div className={styles.cardBottom}>
                      <table
                        style={{
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        <tr>
                          <td style={{ width: "60px" }}>
                            <Image
                              src={imageSubstansi}
                              alt=""
                              width={60}
                              height={50}
                            />
                          </td>
                          <td style={{ textAlign: "left" }}>
                            <div className={`${styles.substansi} p-2`}>
                              {dashboard_subvit &&
                                dashboard_subvit.chart &&
                                dashboard_subvit.chart[0].total_substansi}
                              <br />
                              <span className={styles.subTextTotal}>
                                Substansi
                              </span>
                            </div>
                          </td>
                          <td style={{ width: "60px" }}>
                            <Image
                              src={imageSurvey}
                              alt=""
                              width={60}
                              height={50}
                            />
                          </td>
                          <td style={{ textAlign: "left" }}>
                            <div className={`${styles.substansi} p-2`}>
                              {dashboard_subvit &&
                                dashboard_subvit.chart &&
                                dashboard_subvit.chart[1].total_survey}
                              <br />
                              <span className={styles.subTextTotal}>
                                Survey
                              </span>
                            </div>
                          </td>
                          <td style={{ width: "60px" }}>
                            <Image
                              src={imageTrivia}
                              alt=""
                              width={60}
                              height={50}
                            />
                          </td>
                          <td style={{ textAlign: "left" }}>
                            <div className={`${styles.substansi} p-2`}>
                              {dashboard_subvit &&
                                dashboard_subvit.chart &&
                                dashboard_subvit.chart[2].total_trivia}
                              <br />
                              <span className={styles.subTextTotal}>
                                Trivia
                              </span>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-xxl-6 order-1 order-xxl-2">
            <div className={`${styles.cardSubstansi} card`}>
              <div className={`${styles.cardPesertaBody} card-body`}>
                <h1 className={`${styles.headPeserta}`}>Test Substansi</h1>
                <p className={`${styles.subHeadPeserta}`}>yang sudah publish</p>
                {loading ? (
                  <LoadingTable loading={loading} />
                ) : (
                  dashboard_subvit &&
                  dashboard_subvit.substansi &&
                  dashboard_subvit.substansi.list.map((item, index) => {
                    return (
                      <>
                        <div className={`${styles.cardList} card`} key={index}>
                          <div className="row">
                            <div
                              className="col-sm-1 col-xs-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1"
                              style={{ padding: "0px" }}
                            >
                              <div
                                className={`${styles.cardNumber} card`}
                                style={{ width: "100%", height: "100%" }}
                              >
                                {router.query.page_substansi
                                  ? index +
                                    1 * router.query.page_substansi * 5 -
                                    (5 - 1)
                                  : index + 1 * 1 * 5 - (5 - 1)}
                              </div>
                            </div>
                            <div
                              className={`${styles.theme} col-sm-5 col-xs-8 col-md-7 col-lg-7 col-xl-5 col-xxl-7`}
                            >
                              {item.academy ? item.academy.name : "-"}
                              <br />
                              <span className={styles.training}>
                                {item.theme ? item.theme.name : "-"}
                              </span>
                            </div>
                            <div
                              className={`${styles.total} col-sm-6 col-xs-3 col-md-4 col-lg-4 col-xl-6 col-xxl-4`}
                            >
                              {item.participant_finished
                                ? item.participant_finished
                                : "0"}{" "}
                              /{" "}
                              {item.all_participant
                                ? item.all_participant
                                : "0"}
                              <br />
                              <span className={styles.note}>
                                yang sudah mengerjakan
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })
                )}
                <div className={`${styles.rowBottom} row`}>
                  <div className={`${styles.total} col-sm-6 mt-5`}>
                    Total:{" "}
                    {dashboard_subvit &&
                      dashboard_subvit.substansi &&
                      dashboard_subvit.substansi.total_participant}{" "}
                    Peserta
                  </div>

                  <div className="col-sm-6" style={{ textAlign: "right" }}>
                    <button
                      className={`${styles.btnNext} btn btn-primary`}
                      onClick={() => handleBackPagination()}
                      disabled={parseInt(router.query.page_substansi) === 1}
                    >
                      <i
                        className="ri-arrow-left-s-line"
                        style={{ padding: "0px" }}
                      ></i>
                    </button>
                    <button
                      className={`${styles.btnNext} btn btn-primary`}
                      onClick={() => handleNextPagination()}
                      disabled={
                        Math.ceil(
                          parseInt(
                            dashboard_subvit && dashboard_subvit.substansi.total
                          ) / 5
                        ) !== 0
                          ? parseInt(router.query.page_substansi) ===
                            Math.ceil(
                              parseInt(
                                dashboard_subvit &&
                                  dashboard_subvit.substansi.total
                              ) / 5
                            )
                          : true
                      }
                    >
                      <i
                        className="ri-arrow-right-s-line"
                        style={{ padding: "0px" }}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-6 col-xxl-6 order-1 order-xxl-2">
            <div className={`${styles.cardSubstansi} card`}>
              <div className={`${styles.cardPesertaBody} card-body`}>
                <h1 className={`${styles.headPeserta}`}>Trivia</h1>
                <p className={`${styles.subHeadPeserta}`}>
                  yang sedang berlangsung
                </p>
                {loading ? (
                  <LoadingTable loading={loading} />
                ) : (
                  dashboard_subvit &&
                  dashboard_subvit.trivia &&
                  dashboard_subvit.trivia.list.map((item, index) => {
                    return (
                      <>
                        <div className={`${styles.cardList} card`} key={index}>
                          <div className="row">
                            <div
                              className="col-sm-1"
                              style={{ padding: "0px" }}
                            >
                              <div
                                className={`${styles.cardNumber} card`}
                                style={{ width: "100%", height: "100%" }}
                              >
                                {router.query.page_trivia
                                  ? index +
                                    1 * router.query.page_trivia * 5 -
                                    (5 - 1)
                                  : index + 1 * 1 * 5 - (5 - 1)}
                              </div>
                            </div>
                            <div className={`${styles.theme} col-sm-5`}>
                              {item.academy ? item.academy.name : "-"}
                              <br />
                              <span className={styles.training}>
                                {item.theme ? item.theme.name : "-"}
                              </span>
                            </div>
                            <div className={`${styles.total} col-sm-6`}>
                              {item.participant_finished
                                ? item.participant_finished
                                : "0"}{" "}
                              /{" "}
                              {item.all_participant
                                ? item.all_participant
                                : "0"}
                              <br />
                              <span className={styles.note}>
                                yang sudah mengerjakan
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })
                )}
                <div className={`${styles.rowBottom} row`}>
                  <div className={`${styles.total} col-sm-6 mt-5 `}>
                    Total:{" "}
                    {dashboard_subvit &&
                      dashboard_subvit.trivia &&
                      dashboard_subvit.trivia.total_participant}{" "}
                    Peserta
                  </div>

                  <div className="col-sm-6" style={{ textAlign: "right" }}>
                    <button
                      className={`${styles.btnNext} btn btn-primary`}
                      onClick={handleBackPaginationTrivia}
                      disabled={parseInt(router.query.page_trivia) === 1}
                    >
                      <i
                        className="ri-arrow-left-s-line"
                        style={{ padding: "0px" }}
                      ></i>
                    </button>
                    <button
                      className={`${styles.btnNext} btn btn-primary`}
                      onClick={handleNextPaginationTrivia}
                      disabled={
                        Math.ceil(
                          parseInt(
                            dashboard_subvit && dashboard_subvit.trivia.total
                          ) / 5
                        ) !== 0
                          ? parseInt(router.query.page_trivia) ===
                            Math.ceil(
                              parseInt(
                                dashboard_subvit &&
                                  dashboard_subvit.trivia.total
                              ) / 5
                            )
                          : true
                      }
                    >
                      <i
                        className="ri-arrow-right-s-line"
                        style={{ padding: "0px" }}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-xxl-6 order-1 order-xxl-2">
            <div className={`${styles.cardSurvey} card`}>
              <div className={`${styles.cardPesertaBody} card-body`}>
                <h1 className={`${styles.headPeserta}`}>Survey</h1>
                <p className={`${styles.subHeadPeserta}`}>
                  yang sedang berlangsung
                </p>
                {loading ? (
                  <LoadingTable loading={loading} />
                ) : (
                  dashboard_subvit &&
                  dashboard_subvit.survey &&
                  dashboard_subvit.survey.list.map((item, index) => {
                    return (
                      <>
                        <div className={`${styles.cardList} card`} key={index}>
                          <div className="row">
                            <div
                              className="col-sm-1"
                              style={{ padding: "0px" }}
                            >
                              <div
                                className={`${styles.cardNumber} card`}
                                style={{ width: "100%", height: "100%" }}
                              >
                                {router.query.page_survey
                                  ? index +
                                    1 * router.query.page_survey * 5 -
                                    (5 - 1)
                                  : index + 1 * 1 * 5 - (5 - 1)}
                              </div>
                            </div>
                            <div className={`${styles.theme} col-sm-5`}>
                              {item.academy ? item.academy.name : "-"}
                              <br />
                              <span className={styles.training}>
                                {item.theme ? item.theme.name : "-"}
                              </span>
                            </div>
                            <div className={`${styles.total} col-sm-6`}>
                              {item.participant_finished
                                ? item.participant_finished
                                : "0"}{" "}
                              /{" "}
                              {item.all_participant
                                ? item.all_participant
                                : "0"}
                              <br />
                              <span className={styles.note}>
                                yang sudah mengerjakan
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })
                )}
                <div className={`${styles.rowBottom} row`}>
                  <div className={`${styles.total} col-sm-6 mt-5`}>
                    Total:{" "}
                    {dashboard_subvit &&
                      dashboard_subvit.survey &&
                      dashboard_subvit.survey.total_participant}{" "}
                    Peserta
                  </div>

                  <div className="col-sm-6" style={{ textAlign: "right" }}>
                    <button
                      className={`${styles.btnNext} btn btn-primary`}
                      onClick={handleBackPaginationSurvey}
                      disabled={parseInt(router.query.page_survey) === 1}
                    >
                      <i
                        className="ri-arrow-left-s-line"
                        style={{ padding: "0px" }}
                      ></i>
                    </button>
                    <button
                      className={`${styles.btnNext} btn btn-primary`}
                      onClick={handleNextPaginationSurvey}
                      disabled={
                        Math.ceil(
                          parseInt(
                            dashboard_subvit && dashboard_subvit.survey.total
                          ) / 5
                        ) !== 0
                          ? parseInt(router.query.page_survey) ===
                            Math.ceil(
                              parseInt(
                                dashboard_subvit &&
                                  dashboard_subvit.survey.total
                              ) / 5
                            )
                          : true
                      }
                    >
                      <i
                        className="ri-arrow-right-s-line"
                        style={{ padding: "0px" }}
                      ></i>
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

export default DashbardSubvit;
