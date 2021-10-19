import { Card, Col, Container, Row } from "react-bootstrap";
import styles from "./Header.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/dist/client/image";
import Default from "../../../public/assets/media/logos/default.png";

const Header = () => {
  const router = useRouter();

  var date = new Date();

  var myDays = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  var thisDay = date.getDay(),
    thisDay = myDays[thisDay];

  useEffect(() => {
    time();
    time2();
  });

  const time = () => {
    var e = document.getElementById("jam"),
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

  return (
    <>
      <Container fluid className={styles.back}>
        <Container
          fluid={!router.pathname.includes("substansi" || "survey" || "trivia")}
          className={
            router.pathname.includes("substansi" || "survey" || "trivia")
              ? styles.testBody
              : styles.body
          }
        >
          <Row>
            <Col
              sm={3}
              hidden={router.pathname.includes(
                "substansi" || "survey" || "trivia"
              )}
            >
              <center>
                <Image
                  src={Default}
                  alt=""
                  className={styles.imageProfile}
                  width="120px"
                  height="120px"
                />
                <h1 className={styles.name}>SYAKILA SALSABILA</h1>
                <p className={styles.nik}>1239120312839212</p>
              </center>
            </Col>
            <Col
              sm={
                router.pathname.includes("substansi" || "survey" || "trivia")
                  ? 12
                  : 9
              }
            >
              <Card
                className={styles.cardBody}
                hidden={router.pathname.includes(
                  "substansi" || "survey" || "trivia"
                )}
              >
                <Row>
                  <Col sm={6} xs={4} className={styles.textCardLeft}>
                    <div className="d-flex flex-row " style={{ float: "left" }}>
                      <div className="p-1">
                        {router.pathname.includes("substansi")
                          ? "Test Substansi"
                          : router.pathname.includes("survey")
                          ? "Survey"
                          : router.pathname.includes("trivia")
                          ? "Trivia"
                          : "Dashboard"}
                      </div>
                    </div>
                  </Col>
                  <Col sm={6} xs={7} className={styles.textCardRight}>
                    <div
                      className="d-flex flex-row "
                      style={{ float: "right" }}
                    >
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
                        {thisDay} , <span id="jam"></span>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>
              <h1
                className={styles.mainText}
                hidden={router.pathname.includes(
                  "substansi" || "survey" || "trivia"
                )}
              >
                Digital Talent Scholarship
              </h1>
              {router.pathname.includes(
                "substansi" || "survey" || "trivia"
              ) && (
                <>
                  <Row>
                    <Col>
                      <h1 className={styles.mainText}>
                        Digital Talent Scholarship
                      </h1>
                    </Col>
                    <Col className={styles.textCardRight}>
                      <Card className={styles.cardBodyTest}>
                        <div
                          className="d-flex flex-row "
                          style={{ float: "right" }}
                        >
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
                            {thisDay} , <span id="waktu"></span>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </>
              )}
              <p className={styles.subText}>
                <div className="d-flex flex-row" style={{ float: "left" }}>
                  <div className="p-1">
                    <i
                      className="ri-article-line"
                      style={{
                        color: "#fff",
                        fontSize: "20px",
                        marginRight: "15px",
                      }}
                    ></i>
                  </div>
                  <div className="p-1">
                    {router.pathname.includes("substansi")
                      ? "Test Substansi"
                      : router.pathname.includes("survey")
                      ? "Survey"
                      : router.pathname.includes("trivia")
                      ? "Trivia"
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
