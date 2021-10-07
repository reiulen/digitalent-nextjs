import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Header from "../subvit/header/index";
import styles from "./done.module.css";
import { useRouter } from "next/router";
import Navigationbar from "../../../components/templates/navbar.component";
import doneImage from "../../../public/assets/media/logos/Group 240.png";
import Image from "next/dist/client/image";

const Done = () => {
  const router = useRouter();
  // console.log(window.innerHeight());
  const handleDone = () => {
    router.push("/");
  };
  return (
    <>
      <Navigationbar />
      <Header />
      <Container
        style={{
          backgroundColor: "#EEF0F8",
          padding: "34px",
          // height: `${window.innerHeight}px`,
        }}
      >
        <Card
          style={{
            borderRadius: "12px",
            boxShadow: "0px 0px 12px rgba(31, 31, 31, 0.1)",
            padding: "32px ",
          }}
        >
          <Row>
            <Col sm={6}>
              <center>
                <Image
                  src={doneImage}
                  alt=""
                  width={400}
                  height={300}
                  className={styles.imageDone}
                />
              </center>
            </Col>
            <Col sm={6} style={{ padding: "60px  180px 60px 0px" }}>
              <h1 className={styles.thanks}>TERIMA KASIH.</h1>
              <p className={styles.bodyDone}>
                Terima Kasih telah Mengikuti Test Substansi.
                <br />
                <br />
                Mohon cek Status Test Substansi Anda secara berkala di Dashboard
                dan Email.
              </p>
              <Button
                type="primary"
                className={styles.btnDone}
                onClick={handleDone}
              >
                Selesai
              </Button>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
};
export default Done;
