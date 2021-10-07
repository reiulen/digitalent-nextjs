import moment from "moment";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./header.module.css";
import "moment/locale/id";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Image from "next/dist/client/image";
import clockImage from "../../../../public/assets/media/logos/Clock 1.png";

const HeaderUser = () => {
  const router = useRouter();

  return (
    <Container className={styles.back} fluid>
      <Row>
        <Col sm={6} className={styles.pelatihan}>
          Pelatihan /<span className={styles.nameTest}> Tes Subtansi</span>
        </Col>
        <Col sm={6} className={styles.time}>
          <Row>
            <Col sm={10}>
              <Image src={clockImage} alt="" width={20} height={20} />
            </Col>

            <Col sm={2} style={{ textAlign: "right" }}>
              {moment().format("LTS")}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default HeaderUser;
