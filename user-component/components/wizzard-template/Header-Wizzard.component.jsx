import { Card, Col, Container, Row } from "react-bootstrap";
import styles from "./Header.Wizzard.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/dist/client/image";
import Default from "../../../public/assets/media/logos/default.png";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const router = useRouter();

  return (
    <>
      <Container fluid className={styles.back}>
        <Row className={styles.body}>
          <Col sm={12}>
            <Card className={styles.cardBody}>
              <div className="d-flex align-items-center">
                <i className="ri-error-warning-fill text-warning mr-2"></i>
                <span>
                  Silahkan lengkapi profil untuk dapat mengakses seluruh
                  platform Digital Talent Scholarship!
                </span>
              </div>
            </Card>
            <h1 className={styles.mainText}>Digital Talent Scholarship</h1>
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
    </>
  );
};
export default Header;
