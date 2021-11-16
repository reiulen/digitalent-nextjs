import { Card, Col, Container, Row } from "react-bootstrap";
import styles from "./Header.module.css";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Image from "next/dist/client/image";
import Default from "../../../public/assets/media/logos/default.png";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

const Header = () => {
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
  if (router.pathname === "/peserta/form-lpj") routerPath = "/peserta/form-lpj";

  var date = new Date();

  var myDays = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  var thisDay = date.getDay(),
    thisDay = myDays[thisDay];

  useEffect(() => {
    time();
    time2();
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

  const time2 = () => {
    var e = document.getElementById("waktu"),
      d = new Date(),
      h,
      m,
      s;
    h = d.getHours();
    m = set(d.getMinutes());
    s = set(d.getSeconds());
    if (e) {
      e.innerHTML = h + ":" + m + ":" + s;
    } else {
      // router.push("/peserta");
      // // window.location.reload();
      // router.reload();
    }

    // setTimeout("time()", 1000);
    setTimeout(() => {
      time2();
    }, 1000);
  };

  const set = (e) => {
    e = e < 10 ? "0" + e : e;
    return e;
  };
  const [breadCrumbsName, setBreadCrumbsName] = useState([]);

  useEffect(() => {}, []);

  const condition = localStorage.getItem("viewEdit");

  const handleCloseBreadcrumb = () => {
    // localStorage.setItem("viewEdit", false);
  };

  const handleProfile = (e) => {
    localStorage.setItem("btn", 0);
  };

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
                        {router.pathname.includes("substansi") ? (
                          "Test Substansi"
                        ) : router.pathname.includes("survey") ? (
                          "Survey & LPJ"
                        ) : router.pathname.includes("trivia") ? (
                          "Trivia"
                        ) : router.pathname.includes("test-subtansi") ? (
                          "Test Substansi"
                        ) : router.pathname.includes("riwayat-pelatihan") ? (
                          "Riwayat Pelatihan"
                        ) : router.pathname.includes("administrasi") ? (
                          "Administrasi"
                        ) : router.pathname.includes("mid-test") ? (
                          "Mid Test"
                        ) : router.pathname.includes("done-mid-tes") ? (
                          "Mid Test"
                        ) : router.pathname.includes("profile") &&
                          localStorage.getItem("btn") === "0" ? (
                          <>
                            <a
                              onClick={(event) => handleProfile(event)}
                              className={styles.breadcrumbProfile}
                            >
                              Profile
                            </a>

                            {condition === "true" ? (
                              <>
                                <span className="mx-3">&gt;</span>{" "}
                                <span
                                  onClick={handleCloseBreadcrumb}
                                  className={styles.breadCrumbNameLink}
                                >
                                  Informasi Pribadi
                                </span>
                                <span className="mx-3">&gt;</span>{" "}
                                <span className={styles.breadCrumbName}>
                                  Ubah Informasi Pribadi
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="mx-3">&gt;</span>{" "}
                                <span className={styles.breadCrumbName}>
                                  Informasi Pribadi
                                </span>
                              </>
                            )}
                          </>
                        ) : router.pathname.includes("profile") &&
                          localStorage.getItem("btn") === "1" ? (
                          <>
                            <a
                              onClick={(event) => handleProfile(event)}
                              className={styles.breadcrumbProfile}
                            >
                              Profile
                            </a>

                            {condition === "true" ? (
                              <>
                                <span className="mx-3">&gt;</span>{" "}
                                <span
                                  onClick={handleCloseBreadcrumb}
                                  className={styles.breadCrumbNameLink}
                                >
                                  Alamat
                                </span>
                                <span className="mx-3">&gt;</span>{" "}
                                <span className={styles.breadCrumbName}>
                                  Ubah Alamat
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="mx-3">&gt;</span>{" "}
                                <span className={styles.breadCrumbName}>
                                  Alamat
                                </span>
                              </>
                            )}
                          </>
                        ) : router.pathname.includes("profile") &&
                          localStorage.getItem("btn") === "2" ? (
                          <>
                            <a
                              onClick={(event) => handleProfile(event)}
                              className={styles.breadcrumbProfile}
                            >
                              Profile
                            </a>

                            {condition === "true" ? (
                              <>
                                <span className="mx-3">&gt;</span>{" "}
                                <span
                                  onClick={handleCloseBreadcrumb}
                                  className={styles.breadCrumbNameLink}
                                >
                                  Pendidikan
                                </span>
                                <span className="mx-3">&gt;</span>{" "}
                                <span className={styles.breadCrumbName}>
                                  Ubah Pendidikan
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="mx-3">&gt;</span>{" "}
                                <span className={styles.breadCrumbName}>
                                  Pendidikan
                                </span>
                              </>
                            )}
                          </>
                        ) : router.pathname.includes("profile") &&
                          localStorage.getItem("btn") === "3" ? (
                          <>
                            <a
                              onClick={(event) => handleProfile(event)}
                              className={styles.breadcrumbProfile}
                            >
                              Profile
                            </a>

                            {condition === "true" ? (
                              <>
                                <span className="mx-3">&gt;</span>{" "}
                                <span
                                  onClick={handleCloseBreadcrumb}
                                  className={styles.breadCrumbNameLink}
                                >
                                  Pekerjaan
                                </span>
                                <span className="mx-3">&gt;</span>{" "}
                                <span className={styles.breadCrumbName}>
                                  Ubah Pekerjaan
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="mx-3">&gt;</span>{" "}
                                <span className={styles.breadCrumbName}>
                                  Pekerjaan
                                </span>
                              </>
                            )}
                          </>
                        ) : router.pathname.includes("form-lpj") ? (
                          "Survey & LPJ"
                        ) : (
                          "Dashboard"
                        )}
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
                className={styles.mainText}
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
                          className="d-flex flex-row "
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
                                <div style={{ fontSize: "14px" }}>
                                  <Link href="/">
                                    <a>
                                      <u className="d-none d-lg-inline-block">
                                        Beranda
                                      </u>
                                      <u className="d-lg-none d-inline-block">
                                        ...
                                      </u>
                                    </a>
                                  </Link>
                                  <span className="mx-3">&gt;</span>
                                  <u className="d-none d-lg-inline-block">
                                    {pelatihan?.akademi}
                                  </u>
                                  <u className="d-lg-none d-inline-block">
                                    ...
                                  </u>
                                  <span className="mx-3">&gt;</span>
                                  <u className="d-none d-lg-inline-block">
                                    {pelatihan?.name}
                                  </u>
                                  <u className="d-lg-none d-inline-block">
                                    ...
                                  </u>
                                  <span className="mx-3">&gt;</span>
                                  <span className="font-weight-bold">
                                    Pendaftaran Pelatihan
                                  </span>
                                </div>
                              </Fragment>
                            ) : router.pathname.includes("form-lpj") ? (
                              <>
                                Survey & LPJ
                                <span className="mx-3">&gt;</span>
                                <span className={styles.breadCrumbName}>
                                  Form LPJ
                                </span>
                              </>
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
                  <Col xs={12}>
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
                    ) : router.pathname.includes("form-lpj") ? (
                      <i
                        className="ri-file-user-line"
                        style={{
                          color: "#fff",
                          fontSize: "20px",
                          marginRight: "15px",
                        }}
                      ></i>
                    ) : router.pathname.includes("profile") &&
                      localStorage.getItem("btn") === "0" ? (
                      <i
                        className="ri-user-3-line"
                        style={{
                          color: "#fff",
                          fontSize: "20px",
                          marginRight: "15px",
                        }}
                      ></i>
                    ) : router.pathname.includes("profile") &&
                      localStorage.getItem("btn") === "1" ? (
                      <i
                        className="ri-map-pin-add-line"
                        style={{
                          color: "#fff",
                          fontSize: "20px",
                          marginRight: "15px",
                        }}
                      ></i>
                    ) : router.pathname.includes("profile") &&
                      localStorage.getItem("btn") === "2" ? (
                      <i
                        className="ri-book-2-line"
                        style={{
                          color: "#fff",
                          fontSize: "20px",
                          marginRight: "15px",
                        }}
                      ></i>
                    ) : router.pathname.includes("profile") &&
                      localStorage.getItem("btn") === "3" ? (
                      <i
                        className="ri-briefcase-4-line"
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
                      : router.pathname.includes("profile") &&
                        localStorage.getItem("btn") === "0"
                      ? "Informasi Pribadi"
                      : router.pathname.includes("profile") &&
                        localStorage.getItem("btn") === "1"
                      ? "Alamat"
                      : router.pathname.includes("profile") &&
                        localStorage.getItem("btn") === "2"
                      ? "Pendidikan"
                      : router.pathname.includes("profile") &&
                        localStorage.getItem("btn") === "3"
                      ? "Pekerjaan"
                      : router.pathname.includes("form-lpj")
                      ? "Form LPJ"
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
