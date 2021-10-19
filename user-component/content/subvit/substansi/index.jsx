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
import Breadcrumb from "../breadcrumb";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

// import Cookies from "js-cookie";

const SubtansiUser = ({ token }) => {
  const router = useRouter();
  const [data] = useState(random_subtance_question_detail);
  const [answer, setAnswer] = useState("");
  const [listAnswer, setListAnswer] = useState([]);
  const [numberPage, setNumberPage] = useState("");
  const [numberAnswer, setNumberAnswer] = useState(false);
  const [modalSoal, setModalSoal] = useState(false);
  const [count, setCount] = useState(
    parseInt(sessionStorage.getItem("targetDate") || 3600)
  );
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [timeLeft, setTimeLeft] = useState(
    sessionStorage.getItem("targetDate")
  );

  const handleModalSoal = () => {
    setModalSoal(true);
  };

  const handleNext = () => {
    const page = parseInt(router.query.id) + 1;
    router.push(`${router.pathname.slice(0, 25)}/${page}`);
  };

  const {
    // loading: allLoading,
    // error: allError,
    random_subtance_question_detail,
  } = useSelector((state) => state.randomSubtanceQuestionDetail);

  const handleCloseModal = () => {
    setModalSoal(false);
  };
  const handleNumber = (val) => {
    console.log(val.target.innerHTML);
    // e.preventDefault();
    setNumberPage(val);
    router.push(`/peserta/subvit/substansi/${parseInt(val.target.innerHTML)}`);
  };

  const handleBack = () => {
    const page = parseInt(router.query.id) - 1;
    if (parseInt(router.query.id) === 1) {
      router.push(`${router.pathname.slice(0, 25)}/1`);
    } else {
      router.push(`${router.pathname.slice(0, 25)}/${page}`);
    }
  };
  // function startTimer(duration, display) {
  //   var timer = duration,
  //     minutes,
  //     seconds;
  //   setInterval(function () {
  //     minutes = parseInt(timer / 60, 10);
  //     seconds = parseInt(timer % 60, 10);

  //     minutes = minutes < 10 ? "0" + minutes : minutes;
  //     seconds = seconds < 10 ? "0" + seconds : seconds;

  //     display.textContent = minutes + ":" + seconds;

  //     if (--timer <= 0) {
  //       router.replace(`${router.pathname.slice(0, 8)}/done`);
  //     }
  //   }, 1000);
  // }
  useEffect(() => {
    // console.log(timeLeft, "ini Time Left ");
    sessionStorage.setItem("setTime", count);
    // window.onload = function () {
    //   var fiveMinutes = 1 * 60,
    //     display = document.querySelector("#time");
    //   startTimer(fiveMinutes, display);
    // };

    if (count >= 0) {
      const secondsLeft = setInterval(() => {
        setCount((c) => c - 1);
        let timeLeftVar = secondsToTime(sessionStorage.getItem("setItem"));
        // console.log(timeLeftVar);
        setHour(timeLeftVar.h);
        sessionStorage.setItem("hours", hour);
        setMinute(timeLeftVar.m);
        sessionStorage.setItem("minute", minute);
        setSecond(timeLeftVar.s);
        sessionStorage.setItem("second", second);
        // console.log(secondsLeft);
      }, 1000);

      return () => clearInterval(secondsLeft);
    } else {
      console.log("time out");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // return () => {
    //   sessionStorage.setItem("cTimer", count);
    // };
  }, [count]);

  let number = [];
  for (let i = 0; i < 50; i++) {
    number.push(i + 1);
  }

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

  return (
    <>
      <Container className={styles.baseAll}>
        <Card className={styles.cardTop}>
          <Row>
            <Col style={{ marginTop: "8px" }}>
              <table>
                <tr>
                  <td className={styles.academy}>Thematic Academy (TA)</td>
                  <td>&nbsp;</td>
                  <td className={styles.training}>
                    Intermediate Multimedia Designer
                  </td>
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
                {sessionStorage.getItem("hours") < 9
                  ? "0" + parseInt(sessionStorage.getItem("hours"))
                  : parseInt(sessionStorage.getItem("hours"))}
                :
                {sessionStorage.getItem("minute") < 9
                  ? "0" + parseInt(sessionStorage.getItem("minute"))
                  : parseInt(sessionStorage.getItem("minute"))}
                :
                {sessionStorage.getItem("second") < 9
                  ? "0" + parseInt(sessionStorage.getItem("second"))
                  : parseInt(sessionStorage.getItem("second"))}
              </Card>
            </Col>
          </Row>
        </Card>
        <Row style={{ marginTop: "20px" }}>
          <Col sm={9}>
            <Card className={styles.cardSoal}>
              <p className={styles.totalSoal}>
                Soal {parseInt(router.query.id)} dari 50
              </p>
              <h1 className={styles.soal}>
                Ketika melakukan review project, atasan Anda selalu memberikan
                kritik yang menurunkan semangat tim Anda. Bagaimana Anda
                menanggapinya?
              </h1>
              <hr />

              <Card className={styles.boxAnswer}>
                <table>
                  <tr>
                    <td>A</td>
                    <td>.</td>
                    <td>
                      Membiarkannya karena tidak memiliki wewenang apa-apa
                    </td>
                  </tr>
                </table>
              </Card>
              <Card className={styles.boxAnswer}>
                <table>
                  <tr>
                    <td>B</td>
                    <td>.</td>
                    <td>
                      Membiarkannya karena tidak memiliki wewenang apa-apa
                    </td>
                  </tr>
                </table>
              </Card>
              <Card className={styles.boxAnswer}>
                <table>
                  <tr>
                    <td>C</td>
                    <td>.</td>
                    <td>
                      Membiarkannya karena tidak memiliki wewenang apa-apa
                    </td>
                  </tr>
                </table>
              </Card>
              <Card className={styles.boxAnswer}>
                <table>
                  <tr>
                    <td>D</td>
                    <td>.</td>
                    <td>
                      Membiarkannya karena tidak memiliki wewenang apa-apa
                    </td>
                  </tr>
                </table>
              </Card>

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
                                  color: "#000",
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
                  >
                    Lewati
                  </Button>
                  <Button className={styles.btnNext} onClick={handleNext}>
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
                          className={styles.cardChoose}
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

      <Modal show={modalSoal} onHide={handleCloseModal} centered size="lg">
        <ModalHeader>
          Panduan{" "}
          {router.pathname.includes("substansi")
            ? "Test Substansi"
            : router.pathname.includes("substansi")
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
            <Card style={{ padding: "10px", marginTop: "10px" }}>
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
                        akses download 384 kbps ke atas). Cek hal ini melalui
                        https://www.speedtest.net/
                      </li>
                      <li>
                        Gunakan browser : Mozilla Firefox atau Google Chrome
                        versi terbaru
                      </li>
                      <li>
                        Pastikan Javascript ACTIVE/ENABLED. Cek hal ini melalui
                        https://www.whatismybrowser.com/detect/is-javascript-enabled
                        atau baca terlebih dahulu Panduan Pengaktifan Javascript
                        pada https://k-cloud.kominfo.go.id/s/jwFLJLrJfyFgbEo
                      </li>
                      <li>
                        Pastikan Cookies ACTIVE/ENABLED. Baca Panduan
                        Pengaktifan Cookie pada
                        https://k-cloud.kominfo.go.id/s/XaJKPwL5PYWaXQo
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
                  <td>5.</td>
                  <td>&nbsp;</td>
                  <td>
                    Skor untuk soal yang sudah dijawab tetap terhitung walaupun
                    peserta belum menekan tombol submit atau peserta mengalami
                    force majeure.
                  </td>
                </tr>
              </table>
            </Card>
          ) : router.pathname.includes("substansi") ? (
            "Survey"
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
