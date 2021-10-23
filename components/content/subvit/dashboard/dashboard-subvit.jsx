import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import PageWrapper from "../../../wrapper/page.wrapper";
import CardDashboardMini from "../../../CardDashboardMini";
import styles from "./dashboard.module.css";
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

const DashbardSubvit = () => {
  const router = useRouter();

  const { dashboard_subvit } = useSelector((state) => state.dashboardSubvit);

  const [dataDummy] = useState(dashboard_subvit);

  console.log(dataDummy);

  const data = [];
  if (dataDummy && dataDummy.chart) {
    Object.entries(dataDummy.data.chart).map((item, index) => {
      return data.push({ name: item[0], value: item[1] });
    });
  }

  const handleNextPagination = (category) => {
    const page = parseInt(router.query.page_substansi) + 1;
    router.push(`${router.pathname}?page_substansi=${page}`);
  };

  const handleBackPagination = (category) => {
    const page = parseInt(router.query.page_substansi) - 1;
    router.push(`${router.pathname}?page_substansi=${page}`);
  };

  const dummy = [
    {
      no: 1,
      theme: "FGA",
      training: "Cloud Computing",
      total: "2.000/15.000",
      note: "yang sudah mengerjakan",
    },
    {
      no: 2,
      theme: "FGA",
      training: "Cloud Computing",
      total: "2.000/15.000",
      note: "yang sudah mengerjakan",
    },
    {
      no: 3,
      theme: "FGA",
      training: "Cloud Computing",
      total: "2.000/15.000",
      note: "yang sudah mengerjakan",
    },
    {
      no: 4,
      theme: "FGA",
      training: "Cloud Computing",
      total: "2.000/15.000",
      note: "yang sudah mengerjakan",
    },
    {
      no: 5,
      theme: "FGA",
      training: "Cloud Computing",
      total: "2.000/15.000",
      note: "yang sudah mengerjakan",
    },
  ];

  const COLORS = ["#4299E1", "#215480", "##4CBDE2"];

  const handleAddPage = (e) => {
    if (e.target.value === "1") {
      router.push("subvit/substansi/tambah-step-1");
    } else if (e.target.value === "2") {
      router.push("subvit/survey/tambah");
    } else if (e.target.value === "3") {
      router.push("subvit/trivia/tambah");
    } else {
      router.push("subvit");
    }
  };
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
                            Halo Admin A
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
                          className="ml-auto float-right ilustrator-dashboard"
                          style={{
                            position: "absolute",
                            right: "10px",
                            top: "-50px",
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
                      <div className="col-md-5">
                        <div className="col-md-10 mt-16">
                          <h4
                            className={`${styles.textCardTwo} font-weight-bolder text-primary`}
                          >
                            Buat Soal Test Substansi, Survey dan TRIVIA
                          </h4>
                        </div>
                      </div>

                      <div className="col-md-7  mt-25">
                        <center>
                          <select
                            className={`${styles.btnDropdown} form-select`}
                            aria-label="Default select example"
                            onChange={(event) => handleAddPage(event)}
                            placeholder="Tambah Test Substansi"
                          >
                            <option
                              value=""
                              className={styles.optionDropdown}
                              selected
                            >
                              Menu Subvit
                            </option>
                            <option value="1" className={styles.optionDropdown}>
                              Tambah Test Substansi
                            </option>
                            <option value="2" className={styles.optionDropdown}>
                              Tambah Survey
                            </option>
                            <option value="3" className={styles.optionDropdown}>
                              Tambah Trivia
                            </option>
                          </select>
                        </center>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-xxl-6 order-1 order-xxl-2">
            <div className="row">
              <div className="col-lg-4 col-xxl-4 order-1 order-xxl-2">
                <CardDashboardMini
                  link="/subvit/substansi"
                  background="bg-primary"
                  icon="book-white.svg"
                  color="text-white"
                  title="Tes Subtansi"
                />
              </div>
              <div className="col-lg-4 col-xxl-4 order-1 order-xxl-2">
                <CardDashboardMini
                  link="/subvit/survey"
                  background="bg-white"
                  icon="blok4-secondary.svg"
                  color="text-muted"
                  title="Survey"
                />
              </div>
              <div className="col-lg-4 col-xxl-4 order-1 order-xxl-2">
                <CardDashboardMini
                  link="/subvit/trivia"
                  background="bg-white"
                  icon="movie-secondary.svg"
                  color="text-muted"
                  title="Trivia"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-xxl-6 order-1 order-xxl-2">
            <div className={`${styles.cardPeserta} card`}>
              <div className={`${styles.cardPesertaBody} card-body`}>
                <h1 className={`${styles.headPeserta}`}>Total Peserta</h1>
                <p className={`${styles.subHeadPeserta}`}>
                  Total Peserta dari Test Substansi, Survey dan TRIVIA
                </p>
                <ResponsiveContainer height={300}>
                  <PieChart width={500} height={300}>
                    <Tooltip />
                    <Pie
                      data={data.slice(0, 3)}
                      cx={250}
                      cy={150}
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
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
                        {dataDummy && dataDummy.chart && dataDummy.chart.total}
                      </Label>
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                <div
                  className="d-flex flex-row "
                  style={{ padding: "0px 20px" }}
                >
                  <div className="p-5">
                    <div className="d-flex flex-row">
                      <div className="p-2" style={{ padding: "0px" }}>
                        <Image
                          src={imageSubstansi}
                          alt=""
                          width={60}
                          height={50}
                        />
                      </div>
                      <div className={`${styles.substansi} p-2`}>
                        {dataDummy &&
                          dataDummy.chart &&
                          dataDummy.chart.total_substansi}
                        <br />
                        <span className={styles.subTextTotal}>Substansi</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="d-flex flex-row">
                      <div className="p-2" style={{ padding: "0px" }}>
                        {" "}
                        <Image
                          src={imageSurvey}
                          alt=""
                          width={60}
                          height={50}
                        />
                      </div>
                      <div className={`${styles.survey} p-2`}>
                        {dataDummy &&
                          dataDummy.chart &&
                          dataDummy.chart.total_survey}
                        <br />
                        <span className={styles.subTextTotal}>Survey</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="d-flex flex-row">
                      <div className="p-2" style={{ padding: "0px" }}>
                        <Image
                          src={imageTrivia}
                          alt=""
                          width={60}
                          height={50}
                        />
                      </div>
                      <div className={`${styles.trivia} p-2`}>
                        {dataDummy &&
                          dataDummy.chart &&
                          dataDummy.chart.total_trivia}
                        <br />
                        <span className={styles.subTextTotal}>Trivia</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-xxl-6 order-1 order-xxl-2">
            <div className={`${styles.cardSubstansi} card`}>
              <div className={`${styles.cardPesertaBody} card-body`}>
                <h1 className={`${styles.headPeserta}`}>Test Substansi</h1>
                <p className={`${styles.subHeadPeserta}`}>yang sudah publish</p>

                {dataDummy &&
                  dataDummy.substansi &&
                  dataDummy.substansi.list.map((item, index) => {
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
                                {index +
                                  1 * router.query.page_substansi * 5 -
                                  (5 - 1)}
                              </div>
                            </div>
                            <div className={`${styles.theme} col-sm-5`}>
                              {item.theme.name}
                              <br />
                              <span className={styles.training}>
                                {item.training.name}
                              </span>
                            </div>
                            <div className={`${styles.total} col-sm-6`}>
                              {item.all_participant} /{" "}
                              {item.participant_finished}
                              <br />
                              <span className={styles.note}>
                                yang sudah mengerjakan
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                <div className={`${styles.rowBottom} row`}>
                  <div className={`${styles.total} col-sm-6 mt-5`}>
                    Total: 0 Peserta
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
                        parseInt(router.query.page_substansi) === dataDummy &&
                        dataDummy.substansi &&
                        dataDummy.substansi.total / dataDummy &&
                        dataDummy.substansi &&
                        dataDummy.substansi.totalFiltered
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
                {dataDummy &&
                  dataDummy.trivia &&
                  dataDummy.trivia.list.map((item, index) => {
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
                                {index +
                                  1 * router.query.page_substansi * 5 -
                                  (5 - 1)}
                              </div>
                            </div>
                            <div className={`${styles.theme} col-sm-5`}>
                              {item.theme.name}
                              <br />
                              <span className={styles.training}>
                                {item.training.name}
                              </span>
                            </div>
                            <div className={`${styles.total} col-sm-6`}>
                              {item.all_participant} /{" "}
                              {item.participant_finished}
                              <br />
                              <span className={styles.note}>
                                yang sudah mengerjakan
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                <div className={`${styles.rowBottom} row`}>
                  <div className={`${styles.total} col-sm-6 mt-5`}>
                    Total: 0 Peserta
                  </div>
                  <div className="col-sm-6" style={{ textAlign: "right" }}>
                    <button
                      className={`${styles.btnNext} btn btn-primary`}
                      onClick={handleBackPagination}
                      disabled={parseInt(router.query.page_trivia) === 1}
                    >
                      <i
                        className="ri-arrow-left-s-line"
                        style={{ padding: "0px" }}
                      ></i>
                    </button>
                    <button
                      className={`${styles.btnNext} btn btn-primary`}
                      onClick={handleNextPagination}
                      disabled={
                        parseInt(router.query.page_trivia) === dataDummy &&
                        dataDummy.trivia &&
                        dataDummy.trivia.total / dataDummy &&
                        dataDummy.trivia &&
                        dataDummy.trivia.totalFiltered
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
            <div className={`${styles.cardSubstansi} card`}>
              <div className={`${styles.cardPesertaBody} card-body`}>
                <h1 className={`${styles.headPeserta}`}>Survey</h1>
                <p className={`${styles.subHeadPeserta}`}>
                  yang sedang berlangsung
                </p>
                {dataDummy &&
                  dataDummy.survey &&
                  dataDummy.survey.list.map((item, index) => {
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
                                {index +
                                  1 * router.query.page_survey * 5 -
                                  (5 - 1)}
                              </div>
                            </div>
                            <div className={`${styles.theme} col-sm-5`}>
                              {item.theme.name}
                              <br />
                              <span className={styles.training}>
                                {item.training.name}
                              </span>
                            </div>
                            <div className={`${styles.total} col-sm-6`}>
                              {item.all_participant} /{" "}
                              {item.participant_finished}
                              <br />
                              <span className={styles.note}>
                                yang sudah mengerjakan
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                <div className={`${styles.rowBottom} row`}>
                  <div className={`${styles.total} col-sm-6 mt-5`}>
                    Total: 0 Peserta
                  </div>
                  <div className="col-sm-6" style={{ textAlign: "right" }}>
                    <button
                      className={`${styles.btnNext} btn btn-primary`}
                      onClick={handleBackPagination}
                      disabled={parseInt(router.query.page_survey) === 1}
                    >
                      <i
                        className="ri-arrow-left-s-line"
                        style={{ padding: "0px" }}
                      ></i>
                    </button>
                    <button
                      className={`${styles.btnNext} btn btn-primary`}
                      onClick={handleNextPagination}
                      disabled={
                        parseInt(router.query.page_survey) === dataDummy &&
                        dataDummy.survey &&
                        dataDummy.survey.total / dataDummy &&
                        dataDummy.survey &&
                        dataDummy.survey.totalFiltered
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
          {/* <div className="col-lg-6 col-xxl-6 order-1 order-xxl-2">
            <div className={`${styles.cardSubstansi} card`}>
              <div className={`${styles.cardPesertaBody} card-body`}>
                <h1 className={`${styles.headPeserta}`}>Survey</h1>
                <p className={`${styles.subHeadPeserta}`}>yang sudah publish</p>
                {dummy.map((item, index) => {
                  return (
                    <>
                      <div className={`${styles.cardList} card`} key={index}>
                        <div className="row">
                          <div className="col-sm-1" style={{ padding: "0px" }}>
                            <div
                              className={`${styles.cardNumber} card`}
                              style={{ width: "100%", height: "100%" }}
                            >
                              {item.no}
                            </div>
                          </div>
                          <div className={`${styles.theme} col-sm-5`}>
                            {item.theme}
                            <br />
                            <span className={styles.training}>
                              {item.training}
                            </span>
                          </div>
                          <div className={`${styles.total} col-sm-6`}>
                            {item.total}
                            <br />
                            <span className={styles.note}>{item.note}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
                <div className={`${styles.rowBottom} row`}>
                  <div className={`${styles.total} col-sm-6 mt-5`}>
                    Total: 120.000 Peserta
                  </div>
                  <div className="col-sm-6" style={{ textAlign: "right" }}>
                    <button className={`${styles.btnNext} btn btn-primary`}>
                      <i
                        className="ri-arrow-left-s-line"
                        style={{ padding: "0px" }}
                      ></i>
                    </button>
                    <button className={`${styles.btnNext} btn btn-primary`}>
                      <i
                        className="ri-arrow-right-s-line"
                        style={{ padding: "0px" }}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </PageWrapper>
    </>
  );
};

export default DashbardSubvit;
