import { Card, Col, Container, Row } from "react-bootstrap";
import styles from "./Header.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Header = () => {
  const router = useRouter();

  var date = new Date();

  var myDays = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  var thisDay = date.getDay(),
    thisDay = myDays[thisDay];

  useEffect(() => {
    time();
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
      router.push("/peserta");
      // window.location.reload();
      router.reload();
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

  return (
    <>
      <Container fluid className={styles.back}>
        <Container className={styles.body}>
          <Card className={styles.cardBody}>
            <Row>
              <Col sm={6} xs={6} className={styles.textCardLeft}>
                {router.pathname.includes("subtansi")
                  ? "Test Substansi"
                  : router.pathname.includes("survey")
                  ? "Survey"
                  : router.pathname.includes("trivia")
                  ? "Trivia"
                  : "test"}
              </Col>
              <Col sm={6} xs={6} className={styles.textCardRight}>
                <span>
                  <i
                    className="ri-time-fill"
                    style={{
                      color: "#fff",
                      fontSize: "16px",
                      padding: "5px",
                    }}
                  ></i>
                </span>
                {thisDay} , <span id="jam"></span>
              </Col>
            </Row>
          </Card>
          <h1 className={styles.mainText}>Digital Talent Scholarship</h1>
          <p className={styles.subText}>
            <i
              className="ri-article-line"
              style={{ color: "#fff", fontSize: "20px", marginRight: "15px" }}
            ></i>
            {router.pathname.includes("subtansi")
              ? "Test Substansi"
              : router.pathname.includes("survey")
              ? "Survey"
              : router.pathname.includes("trivia")
              ? "Trivia"
              : "test"}
          </p>
        </Container>
      </Container>
    </>
  );
};
export default Header;
