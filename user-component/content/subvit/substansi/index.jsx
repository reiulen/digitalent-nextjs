import Navigationbar from "../../../../components/templates/navbar.component";
import {
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Button,
  ModalBody,
} from "react-bootstrap";
import styles from "./content.module.css";
import Footer from "../footer/index";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import HeaderUser from "../header";
import axios from "axios";
import Image from "next/dist/client/image";
import { useSelector } from "react-redux";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

// import Cookies from "js-cookie";

const SubtansiUser = ({ token }) => {
  const {
    // loading: allLoading,
    // error: allError,
    random_subtance_question_detail,
  } = useSelector((state) => state.randomSubtanceQuestionDetail);
  const router = useRouter();
  const [data] = useState(JSON.parse(localStorage.getItem("data")));
  const [answer, setAnswer] = useState("");
  const [listAnswer, setListAnswer] = useState([]);
  const [numberPage, setNumberPage] = useState("");
  const [numberAnswer, setNumberAnswer] = useState(false);
  const [modalSoal, setModalSoal] = useState(false);
  const [count, setCount] = useState(random_subtance_question_detail.time_left);

  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [timeLeft, setTimeLeft] = useState(
    sessionStorage.getItem("targetDate")
  );

  localStorage.setItem("data", JSON.stringify(random_subtance_question_detail));

  const handleModalSoal = () => {
    setModalSoal(true);
  };

  const handleNext = () => {
    const page = parseInt(router.query.id) + 1;
    router.push(
      `${router.pathname.slice(0, 25)}/${page}?theme_id=${
        router.query.theme_id
      }&training_id=${router.query.training_id}&category=${
        router.query.category
      }`
    );
  };

  const handleCloseModal = () => {
    setModalSoal(false);
  };
  const handleNumber = (val) => {
    setNumberPage(val);
    router.push(
      `/peserta/subvit/substansi/${parseInt(val.target.innerHTML)}?theme_id=${
        router.query.theme_id
      }&training_id=${router.query.training_id}&category=${
        router.query.category
      }`
    );
  };

  const handleBack = () => {
    const page = parseInt(router.query.id) - 1;
    if (parseInt(router.query.id) === 1) {
      router.push(
        `${router.pathname.slice(0, 25)}/1?theme_id=${
          router.query.theme_id
        }&training_id=${router.query.training_id}&category=${
          router.query.category
        }`
      );
    } else {
      router.push(
        `${router.pathname.slice(0, 25)}/${page}?theme_id=${
          router.query.theme_id
        }&training_id=${router.query.training_id}&category=${
          router.query.category
        }`
      );
    }
    console.log(random_subtance_question_detail);
  };

  useEffect(() => {
    if (count >= 0) {
      const secondsLeft = setInterval(() => {
        setCount((c) => c - 1);
        let timeLeftVar = secondsToTime(count);
        setHour(timeLeftVar.h);
        setMinute(timeLeftVar.m);
        setSecond(timeLeftVar.s);
      }, 1000);
      return () => clearInterval(secondsLeft);
    } else {
      console.log("time out");
    }
  }, [count]);

  const secondsToTime = (secs) => {
    var hours = Math.floor(secs / (60 * 60));
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
    return {
      h: hours,
      m: minutes,
      s: seconds,
    };
  };

  let list = [];
  const handleAnswer = (e) => {
    console.log(e);

    setAnswer(e.option);
    localStorage.setItem(`${router.query.id}`, e.option);

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      list.push(key);
      // key.includes(parseInt(router.query.id)) && setNumberAnswer(true);
      // console.log(localStorage.getItem(key));
      // if (localStorage.getItem(key) === e.option) {
      //   setNumberAnswer(true);
      // }
    }
    console.log(list);
  };
  let number = [];
  for (let i = 0; i < random_subtance_question_detail.total_questions; i++) {
    number.push[i];
  }
  return (
    <>
      <Container className={styles.baseAll} fluid>
        <Card className={styles.cardTop}>
          <Row>
            <Col style={{ marginTop: "8px" }}>
              <table>
                <tr>
                  <td className={styles.academy}>
                    Thematic Academy ({data && data.academy})
                  </td>

                  <td>&nbsp;</td>
                  <td className={styles.training}>{data && data.theme}</td>
                </tr>
              </table>
            </Col>
            <Col style={{ textAlign: "right" }}>
              <Button
                className={styles.btnHelp}
                variant="link"
                onClick={handleModalSoal}
              >
                <div className="d-flex flex-row">
                  <div className="p-2">
                    <i
                      className="ri-error-warning-fill"
                      style={{ color: "#FFA800" }}
                    ></i>
                  </div>
                  <div className={`${styles.bantuan} p-2`}>Bantuan</div>
                </div>
              </Button>
              <Card className={styles.time} id="time">
                {hour < 9 ? "0" + hour : hour}:
                {minute < 9 ? "0" + minute : minute}:
                {second < 9 ? "0" + second : second}
              </Card>
            </Col>
          </Row>
        </Card>
        <Row style={{ marginTop: "20px" }}>
          <Col sm={9}>
            <Card className={styles.cardSoal}>
              <p className={styles.totalSoal}>
                Soal {parseInt(router.query.id)} dari{" "}
                {data && data.total_questions}
              </p>
              <h1 className={styles.soal}>
                {data.list_questions[parseInt(router.query.id) - 1].question}
              </h1>
              <hr />
              {JSON.parse(
                data.list_questions[parseInt(router.query.id) - 1].answer
              ).map((item, index) => {
                return (
                  <>
                    <Card className={styles.boxAnswer} key={index}>
                      <table>
                        <tr>
                          <td style={{ width: "5px" }}>{item.key}</td>
                          <td style={{ width: "15px" }}>.</td>
                          <td>{item.option}</td>
                        </tr>
                      </table>
                    </Card>
                  </>
                );
              })}

              <Row style={{ marginTop: "20px" }}>
                <Col>
                  <Button
                    variant="link"
                    className={styles.btnBack}
                    onClick={handleBack}
                    disabled={parseInt(router.query.id) === 1}
                  >
                    <div className="d-flex flex-row">
                      <div
                        className="p-2"
                        aria-disabled={parseInt(router.query.id) === 1}
                      >
                        <i
                          className="ri-arrow-left-s-line"
                          style={
                            parseInt(router.query.id) === 1
                              ? {
                                  color: "#d3d3d3",
                                }
                              : { color: "#007CFF", cursor: "pointer" }
                          }
                        ></i>
                      </div>
                      <div className={` p-2`}>Kembali</div>
                    </div>
                  </Button>
                </Col>
                <Col style={{ textAlign: "right", margin: "10px " }}>
                  <Button
                    variant="link"
                    className={styles.btnSkip}
                    onClick={handleNext}
                    disabled={
                      parseInt(router.query.id) === data.total_questions
                    }
                  >
                    Lewati
                  </Button>
                  <Button
                    className={styles.btnNext}
                    onClick={handleNext}
                    disabled={
                      parseInt(router.query.id) === data.total_questions
                    }
                  >
                    <div className="d-flex flex-row">
                      <div className="p-1">Lanjut</div>
                      <div className="p-1">
                        <i className="ri-arrow-right-s-line"></i>
                      </div>
                    </div>
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col sm={3}>
            <Card className={styles.cardNumber}>
              <h1 className={styles.daftarSoal}>Daftar Soal</h1>
              <Row>
                {number.map((item, index) => {
                  return (
                    <>
                      <Col key={index} style={{ width: "20%" }}>
                        <Card
                          className={
                            item === parseInt(router.query.id)
                              ? styles.cardChoosed
                              : styles.cardChoose
                          }
                          onClick={(event) => handleNumber(event)}
                        >
                          {item}
                        </Card>
                      </Col>
                    </>
                  );
                })}
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal bantuan */}
      <Modal show={modalSoal} onHide={handleCloseModal} centered size="lg">
        <ModalHeader className={styles.headerModal}>
          Panduan{" "}
          {router.pathname.includes("substansi")
            ? "Test Substansi"
            : router.pathname.includes("survey")
            ? "Survey"
            : router.pathname.includes("trivia")
            ? "TRIVIA"
            : "Test"}
          <button type="button" className="close" onClick={handleCloseModal}>
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
        </ModalHeader>
        <ModalBody>
          {router.pathname.includes("substansi") ? (
            <Card className={styles.cardPanduan}>
              <table>
                <tr>
                  <td style={{ position: "absolute" }}>1.</td>
                  <td>&nbsp;</td>
                  <td>
                    Sebelum mengerjakan test, harap perhatikan dan lakukan
                    hal-hal berikut :
                    <ul>
                      <li>
                        Pastikan koneksi internet stabil (sangat disarankan
                        menggunakan koneksi internet broadband dengan kecepatan
                        akses download 384 kbps ke atas). Cek hal ini melalui{" "}
                        <a href="https://www.speedtest.net/">
                          https://www.speedtest.net/
                        </a>
                      </li>
                      <li>
                        Gunakan browser : Mozilla Firefox atau Google Chrome
                        versi terbaru
                      </li>
                      <li>
                        Pastikan Javascript ACTIVE/ENABLED. Cek hal ini melalui{" "}
                        <a href="https://www.whatismybrowser.com/detect/is-javascript-enabled">
                          https://www.whatismybrowser.com/detect/is-javascript-enabled
                        </a>{" "}
                        atau baca terlebih dahulu Panduan Pengaktifan Javascript
                        pada{" "}
                        <a href="https://k-cloud.kominfo.go.id/s/jwFLJLrJfyFgbEo">
                          https://k-cloud.kominfo.go.id/s/jwFLJLrJfyFgbEo
                        </a>
                      </li>
                      <li>
                        Pastikan Cookies ACTIVE/ENABLED. Baca Panduan
                        Pengaktifan Cookie pada{" "}
                        <a href="https://k-cloud.kominfo.go.id/s/XaJKPwL5PYWaXQo">
                          https://k-cloud.kominfo.go.id/s/XaJKPwL5PYWaXQo
                        </a>
                      </li>
                      <li>
                        Pastikan keyboard dan mouse/trackpad Anda dalam keadaan
                        baik.
                      </li>
                      <li>
                        Siapkan kertas dan pensil/pulpen untuk mencoret-coret
                        jika diperlukan.
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td style={{ position: "absolute" }}>2.</td>
                  <td>&nbsp;</td>
                  <td>
                    Alokasi waktu yang diberikan untuk mengerjakan Test
                    Substansi sesuai dengan masing-masing tema pelatihan.
                    Informasi tersebut dapat di akses pada dashboard Test
                    Substansi.
                  </td>
                </tr>
                <tr>
                  <td style={{ position: "absolute" }}>3.</td>
                  <td>&nbsp;</td>
                  <td>
                    Peserta wajib menjawab seluruh soal Test Substansi dan
                    jumlah soal sesuai dengan masing-masing tema pelatihan.
                    Tidak ada nilai negatif untuk jawaban yang salah.
                  </td>
                </tr>
                <tr>
                  <td style={{ position: "absolute" }}>4.</td>
                  <td>&nbsp;</td>
                  <td>
                    Setelah Test Substansi dimulai, waktu tes tidak dapat
                    diberhentikan dan tes tidak dapat diulang. Setelah waktu
                    habis, halaman soal akan tertutup secara otomatis.
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top" }}>5.</td>
                  <td>&nbsp;</td>
                  <td>
                    Skor untuk soal yang sudah dijawab tetap terhitung walaupun
                    peserta belum menekan tombol submit atau peserta mengalami
                    force majeure.
                  </td>
                </tr>
              </table>
            </Card>
          ) : router.pathname.includes("survey") ? (
            <Card className={styles.cardPanduan}>
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
          ) : router.pathname.includes("trivia") ? (
            "TRIVIA"
          ) : (
            "Test"
          )}
        </ModalBody>
      </Modal>
    </>
  );
};

export default SubtansiUser;
