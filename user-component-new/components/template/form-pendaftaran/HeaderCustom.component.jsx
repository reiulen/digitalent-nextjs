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
      <Container fluid className={`${styles.back}`}>
        <Container fluid className={`${styles.testBody}`}>
          <Row className="mx-10">
            <Col sm={12} className="p-0">
              {router.pathname.includes(routerPath) && (
                <Fragment>
                  <Card className={`${styles.cardBody} `}>
                    <Row>
                      <Col
                        className={`${styles.textCardLeft} d-flex justify-content-between`}
                      >
                        <div className={`p-1 d-flex align-items-center `}>
                          <Fragment>
                            <div
                              className=""
                              style={{
                                fontSize: "14px",
                                fontWeight: "500",
                              }}
                            >
                              <Link href="/" passHref>
                                <Fragment>
                                  <span
                                    className={`${styles.responsive_display} text-truncate max-w-lg-100 max-w-sm-60px max-w-10px`}
                                  >
                                    <span
                                      style={{
                                        textDecoration: "underline",
                                        cursor: "pointer",
                                      }}
                                    >
                                      Beranda
                                    </span>
                                  </span>
                                  <span
                                    style={{
                                      textDecoration: "none",
                                      fontWeight: "500",
                                    }}
                                    className={`${styles.responsive_display} mx-1 mx-md-3 p-0 text-truncate`}
                                  >
                                    &gt;
                                  </span>
                                </Fragment>
                              </Link>
                              <span
                                className={`${styles.responsive_display} text-truncate max-w-lg-100 max-w-sm-60px max-w-10px`}
                              >
                                <span
                                  style={{
                                    textDecoration: "underline",
                                    fontWeight: "500",
                                  }}
                                >
                                  {pelatihan?.akademi}
                                </span>
                              </span>
                              <span
                                style={{
                                  textDecoration: "none",
                                  fontWeight: "500",
                                }}
                                className={` ${styles.responsive_display} mx-1 mx-md-3 p-0  text-truncate`}
                              >
                                &gt;
                              </span>

                              <span
                                className={`${styles.responsive_display} text-truncate  max-w-lg-100 max-w-sm-60px max-w-10px`}
                              >
                                <span
                                  style={{
                                    textDecoration: "underline",
                                    fontWeight: "500",
                                  }}
                                >
                                  {pelatihan?.name}
                                </span>
                              </span>
                              <span
                                style={{
                                  textDecoration: "none",
                                  fontWeight: "500",
                                }}
                                className={`${styles.responsive_display} mx-1 mx-md-3 p-0  text-truncate d-lg-none`}
                              >
                                &gt;
                              </span>
                              <div
                                style={{ textDecoration: "none" }}
                                className="mx-1 mx-md-3 p-0 text-truncate d-none d-lg-inline-block"
                              >
                                &gt;
                              </div>
                              <span
                                className={`font-weight-bold text-truncate  text-truncate max-w-lg-100 ${
                                  breadcrumb
                                    ? `${styles.responsive_display} max-w-sm-60px max-w-15px`
                                    : `d-inline-block`
                                }`}
                              >
                                Pendaftaran Pelatihan
                              </span>

                              {breadcrumb && (
                                <Fragment>
                                  <div
                                    style={{ textDecoration: "none" }}
                                    className={`mx-md-3 mx-1 p-0 text-truncate ${styles.responsive_display}`}
                                  >
                                    &gt;
                                  </div>
                                  <span className="font-weight-bold text-truncate d-inline-block">
                                    {breadcrumb}
                                  </span>
                                </Fragment>
                              )}
                            </div>
                          </Fragment>
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
                  <Col xs={12} className="p-0 ">
                    <h1 className={styles.mainText}>
                      Digital Talent Scholarship
                    </h1>
                  </Col>
                </Fragment>
              )}
              <p className={styles.subText}>
                <div className="d-flex flex-row " style={{ float: "left" }}>
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
                  <div className="p-1">Pendaftaran Pelatihan</div>
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
