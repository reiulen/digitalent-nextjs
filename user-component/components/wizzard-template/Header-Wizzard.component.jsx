import { Card, Col, Container, Row } from "react-bootstrap";
import styles from "./Header.Wizzard.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/dist/client/image";
import Default from "../../../public/assets/media/logos/default.png";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const router = useRouter();

  const { error: errorDataPribadi, dataPribadi } = useSelector(
    state => state.getDataPribadi
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

  const set = e => {
    e = e < 10 ? "0" + e : e;
    return e;
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
            <Col sm={12}>
              <Card
                className={styles.cardBody}
                hidden={router.pathname.includes(routerPath)}
              >
                <div className="d-flex align-items-center">
                  <i className="ri-error-warning-fill text-warning mr-2"></i>
                  <span>
                    Silahkan lengkapi profil untuk dapat mengakses seluruh
                    platform Digital Talent Scholarship!
                  </span>
                </div>
              </Card>
              <h1
                className={styles.mainText}
                hidden={router.pathname.includes(routerPath)}
              >
                Digital Talent Scholarship
              </h1>
              <p className={styles.subText}>
                <div className="d-flex flex-row" style={{ float: "left" }}>
                  <div className="p-1">
                    <i
                      className="ri-user-3-line"
                      style={{
                        color: "#fff",
                        fontSize: "20px",
                        marginRight: "15px",
                      }}
                    ></i>
                  </div>
                  <div className="p-1">Profil</div>
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
