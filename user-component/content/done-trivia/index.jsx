import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Header from "../subvit/header/index";
import styles from "./done.module.css";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import doneImage from "../../../public/assets/media/logos/triviadone.png";
import trainingImage from "../../../public/assets/media/logos/gojek.png";
import Image from "next/dist/client/image";
import PesertaWrapper from "../../components/wrapper/Peserta.wrapper";

import moment from "moment";
import "moment/locale/id";

const Done = () => {
  const router = useRouter();

  const handlePageBack = () => {
    router.push("/peserta/trivia");
  };

  const { error: errorPelatihan, pelatihan: dataTraining } = useSelector(
    (state) => state.getPelatihan
  );

  // const handleDone = () => {
  //   router.push(`${router.pathname.slice(0, 8)}`);
  // };
  return (
    <>
      <PesertaWrapper>
        <Card className={styles.cardBase}>
          <h1 className={styles.title}>
            Terima Kasih Anda telah mengerjakan TRIVIA
          </h1>
          <center>
            <Image src={doneImage} alt="" className={styles.imageDone} />
          </center>
          <Card className={styles.cardChild}>
            Pengerjaan TRIVIA Digital Talent Scholarship 2022 telah berhasil,
            Terima Kasih!
          </Card>
          <br />
          <br />
          <div style={{ textAlign: "right" }}>
            <Button
              variant="link"
              className={styles.btnBack}
              onClick={handlePageBack}
            >
              <div className="d-flex flex-row">
                <div className="p-2">
                  <i
                    className="ri-arrow-left-s-line"
                    style={{ fontSize: "12px", color: "#007CFF" }}
                  ></i>
                </div>
                <div className="p-2">Kembali</div>
              </div>
            </Button>
          </div>
        </Card>
      </PesertaWrapper>
    </>
  );
};
export default Done;
