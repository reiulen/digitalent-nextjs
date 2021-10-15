import { Button, Card, Col, Row } from "react-bootstrap";
import styles from "../../done/done.module.css";
import { useRouter } from "next/router";

import doneImage from "../../../../public/assets/media/logos/Group 240.png";
import Image from "next/image";

const FormBerhasil = () => {
  const router = useRouter();
  return (
    <>
      <div className="p-6">
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
          <Col sm={6} className={styles.colThanks}>
            <h1 className={styles.thanks}>TERIMA KASIH.</h1>
            <p className={styles.bodyDone}>
              Terima Kasih telah Mendaftar Pelatihan.
              <br />
              <br />
              Mohon Kerjakan Test Substansi Anda agar dapat mengikuti pelatihan.
            </p>
            <Button type="primary" className={styles.btnDone}>
              Selesai
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default FormBerhasil;
