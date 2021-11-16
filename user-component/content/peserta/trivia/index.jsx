import { useRouter } from "next/router";
import { useState } from "react";
import { Card, Button, Modal, ModalBody } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";
import styles from "./survey.module.css";

const TestSubstansi = () => {
  const router = useRouter();

  const handlePage = () => {
    router.push(
      `/peserta/subvit/trivia/1?theme_id=${
        router.query.theme_id || 1
      }&training_id=${router.query.training_id || 1}`
    );
  };

  const [show, setShow] = useState(false);

  const handleModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  return (
    <>
      <PesertaWrapper>
        <Card className={styles.cardBase}>
          <h1 className={styles.title}>Panduan TRIVIA</h1>
          <Card className={styles.cardPanduan}>
            {" "}
            <table>
              <tr>
                <td style={{ verticalAlign: "top" }}>1.</td>
                <td>&nbsp;</td>
                <td>
                  {" "}
                  Lakukan pengisian survey hingga seluruh pertanyaan terjawab
                  dengan tuntas.
                </td>
              </tr>
              <tr>
                <td style={{ verticalAlign: "top" }}>2.</td>
                <td>&nbsp;</td>
                <td>
                  {" "}
                  Peserta wajib menjawab seluruh survey yang berjumlah 50
                  pertanyaan.
                </td>
              </tr>
              <tr>
                <td style={{ verticalAlign: "top" }}>3.</td>
                <td>&nbsp;</td>
                <td>
                  {" "}
                  Peserta WAJIB mengisi jawaban dengan jujur sebagai bahan
                  evaluasi bagi manajemen pelaksana pelatihan Digital Talent
                  Scholarship 2022.
                </td>
              </tr>
              <tr>
                <td style={{ verticalAlign: "top" }}>4.</td>
                <td>&nbsp;</td>
                <td> Waktu yang tersedia untuk mengisi survey ini 1 Jam.</td>
              </tr>
            </table>
          </Card>
          <div
            style={{
              textAlign: "right",
              marginTop: "30px",
            }}
          >
            <Button className={styles.btnStart} onClick={handleModal}>
              <div className="d-flex flex-row">
                <div className="p-2">Kerjakan TRIVIA</div>
                <div className="p-2">
                  <i className="ri-arrow-right-s-line"></i>
                </div>
              </div>
            </Button>
          </div>
        </Card>
      </PesertaWrapper>

      {/* MODAL KONFIRMASI */}
      <Modal show={show} onHide={closeModal} size="lg">
        <ModalHeader className={styles.headerKonfirmasi}>
          Konfirmasi TRIVIA
          <button type="button" className="close" onClick={closeModal}>
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
        </ModalHeader>
        <ModalBody className={styles.bodyKonfirmasi}>
          Peserta wajib membaca panduan TRIVIA dengan seksama.
          <br /> Dengan ini saya menyatakan sudah membaca semua ketentuan yang
          berlaku, siap <br /> mengikuti TRIVIA, dan tidak melakukan kecurangan
          dalam bentuk apapun.
          <br />
          <br /> Jika sudah siap, silahkan klik tombol “Mulai TRIVIA” untuk
          memulai TRIVIA.
          <br />
          <br />
          <div style={{ textAlign: "right" }}>
            <Button
              variant="link"
              onClick={closeModal}
              className={styles.btnBatal}
            >
              Batal
            </Button>
            <Button onClick={handlePage} className={styles.btnMulai}>
              Mulai TRIVIA
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};
export default TestSubstansi;
