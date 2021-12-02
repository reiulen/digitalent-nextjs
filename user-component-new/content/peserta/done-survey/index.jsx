import { Button, Card } from "react-bootstrap";

import styles from "./done.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import doneImage from "../../../../public/assets/media/logos/Survei.png";

import Image from "next/dist/client/image";
import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";

import "moment/locale/id";

const Done = () => {
  const router = useRouter();

  const handlePageBack = () => {
    router.push("/peserta/survey");
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
            Terima Kasih Anda telah mengisi Survey
          </h1>
          <center>
            <Image src={doneImage} alt="" className={styles.imageDone} />
          </center>
          <Card className={styles.cardChild}>
            Pengisian Survey Digital Talent Scholarship 2022 telah berhasil.
            Selanjutnya, silahkan isi Form LPJ (Laporan Pertanggung Jawaban)
            untuk mendapatkan sertifikat kelulusan.
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
            <Button
              variant="primary"
              className={styles.btnNext}
              // onClick={handlePageBack}
            >
              <div className="d-flex flex-row">
                <div className="p-1">Isi Form LPJ</div>
                <div className="p-1">
                  <i
                    className="ri-arrow-right-s-line"
                    style={{ fontSize: "14px", color: "#fff" }}
                  ></i>
                </div>
              </div>
            </Button>
          </div>
        </Card>
      </PesertaWrapper>
    </>
  );
};
export default Done;
