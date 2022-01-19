import moment from "moment";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./header.module.css";
import "moment/locale/id";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Image from "next/dist/client/image";
import clockImage from "../../../../public/assets/media/logos/Clock 1.png";
import { useEffect } from "react";

const HeaderUser = () => {
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
    <Container fluid className={styles.base}>
      <Container className={styles.back}>
        <Row>
          <Col sm={6} xs={6} className={styles.pelatihan}>
            Pelatihan /<span className={styles.nameTest}> Tes Subtansi</span>
          </Col>
          <Col sm={6} xs={6} className={styles.time}>
            <Row>
              <Col sm={9} xs={4} style={{ float: "right" }}>
                <Image src={clockImage} alt="" width={20} height={20} />
              </Col>

              <Col sm={3} xs={8} style={{ textAlign: "right" }}>
                {thisDay} , <span id="jam"></span>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
export default HeaderUser;
