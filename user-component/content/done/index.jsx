import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Header from "../subvit/header/index";
import styles from "./done.module.css";
import { useRouter } from "next/router";

import doneImage from "../../../public/assets/media/logos/Ilustrasi.png";
import trainingImage from "../../../public/assets/media/logos/gojek.png";
import Image from "next/dist/client/image";
import PesertaWrapper from "../../components/wrapper/Peserta.wrapper";

import moment from "moment";
import "moment/locale/id";

const Done = () => {
  const router = useRouter();

  // const handleDone = () => {
  //   router.push(`${router.pathname.slice(0, 8)}`);
  // };
  return (
    <>
      <PesertaWrapper>
        <Card className={styles.cardBase}>
          <h1 className={styles.title}>
            Terima Kasih Anda telah mengikuti Test Substansi
          </h1>
          <center>
            <Image src={doneImage} alt="" className={styles.imageDone} />
          </center>
          <Card className={styles.cardChild}>
            Peserta yang lulus dan berhasil menjadi Peserta Digital Talent
            Scholarship 2022 akan diumumkan pada waktu yang telah ditentukan
            melalui email peserta yang terdaftar.
          </Card>
          <br />
          <br />
          <Card className={styles.cardTraining}>
            <div className="d-flex flex-row">
              <div className="p-2">
                {" "}
                <Image
                  src={trainingImage}
                  alt=""
                  className={styles.imageTraining}
                />
              </div>
              <div className={`${styles.textTraining} p-3`}>
                Intermediate Multimedia Designer
                <br />
                <span className={styles.trainingTitle}>Gojek</span>
                <span className={styles.trainingTheme}>
                  {" "}
                  Vocational School Graduate Academy
                </span>
              </div>
            </div>

            <div className="d-flex flex-row">
              <div className="p-2">
                <i
                  className="ri-calendar-2-fill"
                  style={{ fontSize: "18px", color: "#6C6C6C" }}
                ></i>
              </div>
              <div className="p-3">
                Selesai Test Substansi :
                <span className={styles.moment}> {moment().format("LL")}</span>
              </div>
            </div>
            <h1></h1>
          </Card>
        </Card>
      </PesertaWrapper>
    </>
  );
};
export default Done;
