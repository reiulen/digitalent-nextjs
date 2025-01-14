import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card, Button, Modal, ModalBody } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";
import styles from "./survey.module.css";

const TestSubstansi = ({ token }) => {
  const router = useRouter();

  const routerTraining = router.query.id_pelatihan;
  const routerTema = router.query.id_tema;

  const [question, setQuestion] = useState("");
  const [time, setTime] = useState("");

  const handlePage = () => {
    router.push(
      `/peserta/subvit/trivia/1?theme_id=${routerTema}&training_id=${routerTraining}`
    );
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get(
        process.env.END_POINT_API_SUBVIT +
          `api/trivia-question-bank-details/info?training_id=${routerTraining}&theme_id=${routerTema}`,
        config
      )
      .then((res) => {
        setQuestion(res.data.total_questions);
        setTime(res.data.duration);
      });
  }, [routerTraining, routerTema, token]);

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
            <div className="table-responsive">
              <table>
                <tr>
                  <td style={{ verticalAlign: "top" }}>1.</td>
                  <td>&nbsp;</td>
                  <td>
                    {" "}
                    Lakukan pengisian trivia hingga seluruh pertanyaan terjawab
                    dengan tuntas.
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top" }}>2.</td>
                  <td>&nbsp;</td>
                  <td>
                    {" "}
                    Peserta wajib menjawab seluruh trivia yang berjumlah{" "}
                    {question || " "} pertanyaan.
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
                  <td>
                    {" "}
                    Waktu yang tersedia untuk mengisi trivia ini {time ||
                      " "}{" "}
                    Menit.
                  </td>
                </tr>
              </table>
            </div>
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
