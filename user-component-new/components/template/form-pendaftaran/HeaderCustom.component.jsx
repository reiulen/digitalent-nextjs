import { Card, Col, Container, Row } from "react-bootstrap";
import styles from "../Header.module.css";

import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Image from "next/dist/client/image";
import Default from "../../../../public/assets/media/logos/default.png";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

const Header = ({ breadcrumb }) => {
  const router = useRouter();

  const { error: errorDataPribadi, dataPribadi } = useSelector(
    (state) => state.getDataPribadi
  );
  const { error: errorPelatihan, pelatihan } = useSelector(
    (state) => state.getPelatihan
  );
  let routerPath;
  if (router.pathname.includes("form-pendaftaran"))
    routerPath = "form-pendaftaran";
  if (router.pathname === "/peserta/subvit/substansi/[id]")
    routerPath = "/peserta/subvit/substansi/[id]";
  if (router.pathname === "/peserta/subvit/survey/[id]")
    routerPath = "/peserta/subvit/survey/[id]";
  if (router.pathname === "/peserta/subvit/trivia/[id]")
    routerPath = "/peserta/subvit/trivia/[id]";
  if (router.pathname === "/peserta/subvit/mid-test/[id]")
    routerPath = "/peserta/subvit/mid-test/[id]";

  var date = new Date();

  var myDays = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  var thisDay = date.getDay(),
    thisDay = myDays[thisDay];

  useEffect(() => {
    time();
  });
  const [jam, setJam] = useState();
  const time = () => {
    var e = document.getElementById("jam"),
      d = new Date(),
      h,
      m,
      s;
    h = d.getHours();
    m = set(d.getMinutes());
    s = set(d.getSeconds());
    setJam(`${h}:${m}:${s}`);
    if (e) {
      e.innerHTML = h + ":" + m + ":" + s;
    } else {
      // router.push("/peserta");
      // // window.location.reload();
      // router.reload();
    }

    // setTimeout("time()", 1000);
    setTimeout(() => {
      time();
    }, 1000);
  };

  const set = (e) => {
    e = e < 10 ? "0" + e : e;
    return e;
  };
  const [breadCrumbsName, setBreadCrumbsName] = useState([]);

  return (
    <>
      <Container fluid className={styles.back}>
        <Container
          fluid
          className={
            router.pathname.includes(routerPath) ? styles.testBody : styles.body
          }
        >
          <Row>
            <Col sm={3} hidden={router.pathname.includes(routerPath)}>
              <center>
                <Image
                  src={`${
                    dataPribadi && dataPribadi.foto
                      ? dataPribadi.file_path + dataPribadi.foto
                      : "/assets/media/logos/default.png"
                  }`}
                  alt=""
                  className={styles.imageProfile}
                  width="120px"
                  height="120px"
                />
                <h1 className={styles.name}>
                  {dataPribadi ? dataPribadi.name || "-" : "-"}
                </h1>
                <p className={styles.nik}>
                  {dataPribadi ? dataPribadi.nik || "-" : "-"}
                </p>
              </center>
            </Col>
            <Col sm={router.pathname.includes(routerPath) ? 12 : 9}>
              <Card
                className={styles.cardBody}
                hidden={router.pathname.includes(routerPath)}
              >
                <Row>
                  <Col
                    className={`${styles.textCardLeft} d-flex justify-content-between`}
                  >
                    <div className="d-flex flex-row " style={{ float: "left" }}>
                      <div className="p-1">
                        {router.pathname.includes("substansi")
                          ? "Test Substansi"
                          : router.pathname.includes("survey")
                          ? "Survey & LPJ"
                          : router.pathname.includes("trivia")
                          ? "Trivia"
                          : router.pathname.includes("test-subtansi")
                          ? "Test Substansi"
                          : router.pathname.includes("riwayat-pelatihan")
                          ? "Riwayat Pelatihan"
                          : router.pathname.includes("administrasi")
                          ? "Administrasi"
                          : router.pathname.includes("mid-test")
                          ? "Mid Test"
                          : router.pathname.includes("done-mid-tes")
                          ? "Mid Test"
                          : "Dashboard"}
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="p-1">
                        <i
                          className={`${styles.icon} ri-time-fill`}
                          style={{
                            color: "#fff",
                            fontSize: "16px",
                          }}
                        ></i>
                      </div>
                      <div className="p-1">
                        {thisDay} , <span id="jam">{jam}</span>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>
              <h1
                className={styles.mainText + " p-0"}
                hidden={router.pathname.includes(routerPath)}
              >
                Digital Talent Scholarship
              </h1>
              {router.pathname.includes(routerPath) && (
                <Fragment>
                  <Card className={styles.cardBody}>
                    <Row>
                      <Col
                        className={`${styles.textCardLeft} d-flex justify-content-between`}
                      >
                        <div
                          className="d-flex flex-row align-items-center"
                          style={{ float: "left" }}
                        >
                          <div className="p-1">
                            {router.pathname.includes("substansi") ? (
                              "Test Substansi"
                            ) : router.pathname.includes("survey") ? (
                              "Survey & LPJ"
                            ) : router.pathname.includes("trivia") ? (
                              "Trivia"
                            ) : router.pathname.includes("test-subtansi") ? (
                              "Test Substansi"
                            ) : router.pathname.includes(
                                "riwayat-pelatihan"
                              ) ? (
                              "Riwayat Pelatihan"
                            ) : router.pathname.includes("administrasi") ? (
                              "Administrasi"
                            ) : router.pathname.includes("mid-test") ? (
                              "Mid Test"
                            ) : router.pathname.includes("done-mid-tes") ? (
                              "Mid Test"
                            ) : router.pathname.includes("form-pendaftaran") ? (
                              <Fragment>
                                <div
                                  className="h-100 align-self-center d-block my-auto"
                                  style={{ fontSize: "14px" }}
                                >
                                  <Link href="/" passHref>
                                    <span className="d-inline-block text-truncate ">
                                      <span
                                        style={{
                                          textDecoration: "underline",
                                        }}
                                      >
                                        Beranda
                                      </span>
                                      <div
                                        style={{ textDecoration: "none" }}
                                        className="mx-3 p-0 d-inline-block"
                                      >
                                        &gt;
                                      </div>
                                    </span>
                                  </Link>
                                  <span className="d-inline-block text-truncate   max-w-md-100 max-w-45px">
                                    <span
                                      style={{
                                        textDecoration: "underline",
                                      }}
                                    >
                                      {pelatihan?.akademi}
                                    </span>
                                    <div
                                      style={{ textDecoration: "none" }}
                                      className="mx-3 p-0 d-inline-block"
                                    >
                                      &gt;
                                    </div>
                                  </span>
                                  <div
                                    style={{ textDecoration: "none" }}
                                    className="mx-3 p-0 d-inline-block text-truncate d-md-none"
                                  >
                                    &gt;
                                  </div>
                                  <span className="d-inline-block text-truncate max-w-md-100 max-w-45px ">
                                    <span
                                      style={{ textDecoration: "underline" }}
                                    >
                                      {pelatihan?.name}
                                    </span>
                                  </span>
                                  <div
                                    style={{ textDecoration: "none" }}
                                    className="mx-3 p-0 d-inline-block text-truncate d-md-none"
                                  >
                                    &gt;
                                  </div>
                                  <div
                                    style={{ textDecoration: "none" }}
                                    className="mx-3 p-0 text-truncate d-none d-lg-inline-block"
                                  >
                                    &gt;
                                  </div>
                                  <span className="font-weight-bold text-truncate d-inline-block">
                                    {breadcrumb}
                                  </span>
                                </div>
                              </Fragment>
                            ) : (
                              "Dashboard"
                            )}
                          </div>
                        </div>
                        <div className="d-md-flex d-none">
                          <div className="p-1">
                            <i
                              className={`${styles.icon} ri-time-fill`}
                              style={{
                                color: "#fff",
                                fontSize: "16px",
                              }}
                            ></i>
                          </div>
                          <div className="p-1">
                            {thisDay} , <span id="jam">{jam}</span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                  <Col xs={12} className="p-0">
                    <h1 className={styles.mainText}>
                      Digital Talent Scholarship
                    </h1>
                  </Col>
                </Fragment>
              )}
              <p className={styles.subText}>
                <div className="d-flex flex-row" style={{ float: "left" }}>
                  <div className="p-1">
                    {router.pathname.includes("substansi") ? (
                      <i
                        className="ri-article-line"
                        style={{
                          color: "#fff",
                          fontSize: "20px",
                          marginRight: "15px",
                        }}
                      ></i>
                    ) : router.pathname.includes("survey") ? (
                      <i
                        className="ri-chat-smile-line"
                        style={{
                          color: "#fff",
                          fontSize: "20px",
                          marginRight: "15px",
                        }}
                      ></i>
                    ) : router.pathname.includes("trivia") ? (
                      <i
                        className="ri-lightbulb-line"
                        style={{
                          color: "#fff",
                          fontSize: "20px",
                          marginRight: "15px",
                        }}
                      ></i>
                    ) : router.pathname.includes("mid-test") ? (
                      <i
                        className="ri-article-line"
                        style={{
                          color: "#fff",
                          fontSize: "20px",
                          marginRight: "15px",
                        }}
                      ></i>
                    ) : router.pathname.includes("form-pendaftaran") ? (
                      <i
                        className="ri-folder-user-line"
                        style={{
                          color: "#fff",
                          fontSize: "20px",
                          marginRight: "15px",
                        }}
                      ></i>
                    ) : (
                      <i
                        className="ri-article-line"
                        style={{
                          color: "#fff",
                          fontSize: "20px",
                          marginRight: "15px",
                        }}
                      ></i>
                    )}
                  </div>
                  <div className="p-1">
                    {router.pathname.includes("substansi")
                      ? "Test Substansi"
                      : router.pathname.includes("survey")
                      ? "Survey & LPJ"
                      : router.pathname.includes("trivia")
                      ? "Trivia"
                      : router.pathname.includes("test-subtansi")
                      ? "Test Substansi"
                      : router.pathname.includes("mid-test")
                      ? "Mid Test"
                      : router.pathname.includes("done-mid-tes")
                      ? "Mid Test"
                      : router.pathname.includes("form-pendaftaran")
                      ? "Pendaftaran Pelatihan"
                      : "Dashboard"}
                  </div>
                </div>
              </p>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};
export default Header;
