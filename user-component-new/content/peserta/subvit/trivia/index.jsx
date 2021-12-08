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

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Image from "next/dist/client/image";
import Dot from "../../../../../public/assets/media/logos/dot.png";
import { useSelector } from "react-redux";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import {
  getRandomSubtanceQuestionDetail,
  postResult,
} from "../../../../../redux/actions/subvit/subtance-question-detail.action";

import defaultImage from "../../../../../public/assets/media/logos/Gambar.png";
import { useDispatch } from "react-redux";

const SubtansiUser = ({ token }) => {
  const dispatch = useDispatch();
  const { random_trivia } = useSelector((state) => state.randomTrivia);

  const router = useRouter();

  const [data, setData] = useState();
  const [answer, setAnswer] = useState("");
  const [listAnswer, setListAnswer] = useState([]);
  const [numberPage, setNumberPage] = useState("");
  const [numberAnswer, setNumberAnswer] = useState(false);
  const [modalSoal, setModalSoal] = useState(false);
  const [modalNext, setModalNext] = useState(false);
  const [modalResponsive, setModalResponsive] = useState(false);
  const [count, setCount] = useState(random_trivia && random_trivia.time_left);
  const [modalDone, setModalDone] = useState(false);
  const [color, setColor] = useState(false);

  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [timeLeft, setTimeLeft] = useState(
    sessionStorage.getItem("targetDate")
  );

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
      localStorage.clear();
      // MASIH DIPAKE AKAN DIBUKA SETELAH NO BUGS
      // router.push(`/peserta/done-trivia`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useEffect(() => {
    // setData(initialData);
    setData(random_trivia);
  }, [data, random_trivia]);

  const handleModalSoal = () => {
    setModalSoal(true);
  };

  const handleAnswerText = (e) => {
    localStorage.setItem(`${parseInt(router.query.id)}`, e.target.value);
    if (localStorage.getItem(`${parseInt(router.query.id)}`) === "") {
      setAnswer("");
    } else {
      setAnswer(e.target.value);
    }
  };

  const handleModalResponsive = () => {
    setModalResponsive(true);
  };

  const handleNext = () => {
    setModalNext(true);
  };

  const handlePageNext = () => {
    const page = parseInt(router.query.id) + 1;
    router.push(
      `${router.pathname.slice(0, 23)}/${page}?theme_id=${
        router.query.theme_id
      }&training_id=${router.query.training_id}`
    );
    setModalNext(false);
  };

  const handleCloseModal = () => {
    setModalSoal(false);
  };

  const handleCloseModalResponsive = () => {
    setModalResponsive(false);
  };

  const handleNumber = (val) => {
    setNumberPage(val);

    if (val.target.innerHTML === router.query.id) {
      router.push(
        `/peserta/subvit/trivia/${parseInt(val.target.innerHTML)}?theme_id=${
          router.query.theme_id
        }&training_id=${router.query.training_id}`
      );
    } else {
    }
  };

  const secondsToTime = (secs) => {
    let hours = Math.floor(secs / (60 * 60));
    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);
    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);
    return {
      h: hours,
      m: minutes,
      s: seconds,
    };
  };

  let list = [];

  const handleAnswer = (e) => {
    setAnswer(e.key);

    localStorage.setItem(`${router.query.id}`, e.key);

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      list.push(key);
      setListAnswer(key);
    }
  };

  let number = [];

  for (let i = 0; i < data?.total_questions; i++) {
    number.push(i);
  }
  const handleDone = () => {
    setModalDone(true);
  };

  const handlePage = () => {
    // const setData = {
    //   list: JSON.stringify(
    //     data.list_questions.map((item, index) => {
    //       return {
    //         ...item,
    //         participant_answer: localStorage.getItem(index + 1),
    //       };
    //     })
    //   ),
    //   training_id: router.query.training_id,
    //   type: router.query.category === "Test Substansi" && "substansi",
    // };
    // dispatch(postResult(setData, token));
    localStorage.clear();
    router.push(`/peserta/done-trivia`);
  };

  const handleCloseModalDone = () => {
    setModalDone(false);
  };

  const handleAnswerCheckbox = (e, idx) => {
    if (e.key.includes(localStorage.getItem(router.query.id + "box" + idx))) {
      localStorage.removeItem(router.query.id + "box" + idx);
    } else {
      localStorage.setItem(router.query.id + "box" + idx, e.key);
    }
  };

  return (
    <>
      <Container className={styles.baseAll} fluid>
        <Card className={styles.cardTop}>
          <Row>
            <Col xs={12} sm={6} style={{ marginTop: "8px" }}>
              <div className={styles.titleResponsive}>
                <p className={styles.academy2}>
                  {(data && data.academy) || "-"}
                </p>
                <p className={styles.training2}>
                  {(data && data.theme) || "-"}
                </p>
              </div>
              <table>
                <tr>
                  <td className={styles.academy}>
                    {(data && data.academy) || "-"}
                  </td>

                  <td>&nbsp;</td>
                  <td className={styles.training}>
                    {(data && data.theme) || "-"}
                  </td>
                </tr>
              </table>
            </Col>
            <Col xs={12} sm={6} style={{ textAlign: "right" }}>
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
              <Row>
                <Col>
                  {" "}
                  <p className={styles.totalSoal}>
                    Soal {parseInt(router.query.id)} dari{" "}
                    {data && data.total_questions}
                  </p>
                </Col>
                <Col className={styles.align}>
                  {(data &&
                    data.list_questions &&
                    data.list_questions[parseInt(router.query.id) - 1].type ===
                      "checkbox") ||
                  (data &&
                    data.list_questions &&
                    data.list_questions[parseInt(router.query.id) - 1].type ===
                      "fill_in_the_blank") ? (
                    <p className={styles.totalSoal2}>
                      00:00:0
                      {data &&
                        data.list_questions[parseInt(router.query.id) - 1]
                          .duration}
                    </p>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>

              <Row className={styles.soalResponsive}>
                <Col sm={12} xs={12}>
                  <p className={styles.total}>
                    Soal {parseInt(router.query.id)} dari{" "}
                    {data && data.total_questions}
                    <span
                      className={styles.clickSoal}
                      onClick={handleModalResponsive}
                    >
                      Daftar Soal
                    </span>
                  </p>
                </Col>
              </Row>

              <h1 className={styles.soal}>
                {data &&
                data.list_questions &&
                data.list_questions[parseInt(router.query.id) - 1]
                  .question_image !== null &&
                data &&
                data.list_questions[parseInt(router.query.id) - 1]
                  .question_image !== "" ? (
                  <div className="d-flex flex-row">
                    <div className="p-2">
                      <Image
                        src={
                          process.env.END_POINT_API_IMAGE_SUBVIT +
                            data.list_questions[parseInt(router.query.id) - 1]
                              ?.question_image || defaultImage
                        }
                        alt=""
                        width={150}
                        height={150}
                      />
                    </div>
                    <div className="p-5">
                      {data &&
                        data.list_questions[parseInt(router.query.id) - 1]
                          ?.question}
                    </div>
                  </div>
                ) : (
                  data &&
                  data.list_questions &&
                  data.list_questions[parseInt(router.query.id) - 1].question
                )}
              </h1>
              <hr />
              {data &&
                data.list_questions &&
                data.list_questions[parseInt(router.query.id) - 1].type ===
                  "polling" &&
                data &&
                data.list_questions &&
                data.list_questions[parseInt(router.query.id) - 1].answer &&
                JSON.parse(
                  data.list_questions[parseInt(router.query.id) - 1].answer
                ).map((item, index) => {
                  return (
                    <>
                      {item.image !== null && item.image !== "" ? (
                        <div className="d-flex flex-row">
                          <div className="p-2">
                            <Image
                              src={
                                process.env.END_POINT_API_IMAGE_SUBVIT +
                                  item.image || defaultImage
                              }
                              alt=""
                              width={70}
                              height={70}
                            />
                          </div>
                          <div
                            className="p-4"
                            style={{ width: "100%", height: "100%" }}
                          >
                            <Card
                              className={
                                localStorage.getItem(router.query.id) ===
                                item.key
                                  ? styles.answer
                                  : styles.boxAnswer
                              }
                              key={index}
                              onClick={() => handleAnswer(item)}
                            >
                              <table>
                                <tr>
                                  <td style={{ width: "5px" }}>{item.key}</td>
                                  <td style={{ width: "15px" }}>.</td>
                                  <td>{item.option}</td>
                                </tr>
                              </table>
                            </Card>
                          </div>
                        </div>
                      ) : (
                        <Card
                          className={
                            localStorage.getItem(router.query.id) === item.key
                              ? styles.answer
                              : styles.boxAnswer
                          }
                          key={index}
                          onClick={() => handleAnswer(item)}
                        >
                          <table>
                            <tr>
                              <td style={{ width: "5px" }}>{item.key}</td>
                              <td style={{ width: "15px" }}>.</td>
                              <td>{item.option}</td>
                            </tr>
                          </table>
                        </Card>
                      )}
                    </>
                  );
                })}

              {data &&
                data.list_questions &&
                data.list_questions[parseInt(router.query.id) - 1].type ===
                  "fill_in_the_blank" && (
                  <Form>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Jelaskan jawaban Anda di sini..."
                      className={styles.textArea}
                      onChange={(event) => handleAnswerText(event)}
                      value={localStorage.getItem(`${router.query.id}`)}
                    />
                  </Form>
                )}

              {data &&
                data.list_questions &&
                data.list_questions[parseInt(router.query.id) - 1].type ===
                  "checkbox" &&
                data &&
                data.list_questions &&
                data.list_questions[parseInt(router.query.id) - 1].answer &&
                JSON.parse(
                  data.list_questions[parseInt(router.query.id) - 1].answer
                ).map((item, index) => {
                  return (
                    <>
                      {item.image !== null && item.image !== "" ? (
                        <div className="d-flex flex-row">
                          <div className="p-2">
                            <Image
                              src={
                                process.env.END_POINT_API_IMAGE_SUBVIT +
                                  item.image || defaultImage
                              }
                              alt=""
                              width={70}
                              height={70}
                            />
                          </div>
                          <div
                            className="p-4"
                            style={{ width: "100%", height: "100%" }}
                          >
                            <Card
                              className={
                                localStorage.getItem(router.query.id) ===
                                item.key
                                  ? styles.answer
                                  : styles.boxAnswer
                              }
                              key={index}
                              onClick={() => handleAnswerCheckbox(item, index)}
                            >
                              <table>
                                <tr>
                                  <td style={{ width: "5px" }}>{item.key}</td>
                                  <td style={{ width: "15px" }}>.</td>
                                  <td>{item.option}</td>
                                </tr>
                              </table>
                            </Card>
                          </div>
                        </div>
                      ) : (
                        <Card
                          className={
                            localStorage.getItem(router.query.id) === item.key
                              ? styles.answer
                              : styles.boxAnswer
                          }
                          key={index}
                          onClick={() => handleAnswerCheckbox(item, index)}
                        >
                          <table>
                            <tr>
                              <td style={{ width: "5px" }}>{item.key}</td>
                              <td style={{ width: "15px" }}>.</td>
                              <td>{item.option}</td>
                            </tr>
                          </table>
                        </Card>
                      )}
                    </>
                  );
                })}

              <Row style={{ marginTop: "20px" }}>
                <Col className={styles.btnBackResponsive}></Col>

                <Col
                  className={styles.btnBottom}
                  style={{ textAlign: "right", margin: "10px " }}
                >
                  {parseInt(router.query.id) === data?.total_questions ? (
                    <Button
                      className={styles.btnNext}
                      onClick={handleDone}
                      // disabled={listAnswer.includes(data?.total_questions)}
                      // MASIH DIPAKE
                    >
                      Selesai
                    </Button>
                  ) : (
                    <Button
                      className={styles.btnNext}
                      onClick={handleNext}
                      disabled={
                        parseInt(router.query.id) === data &&
                        data.total_questions
                      }
                    >
                      <div className="d-flex flex-row">
                        <div className="p-1">Lanjut</div>
                        <div className="p-1">
                          <i className="ri-arrow-right-s-line"></i>
                        </div>
                      </div>
                    </Button>
                  )}
                </Col>
                <Col xs={12} className={styles.btnBottomResponsive}>
                  <Row>
                    <Col xs={6} style={{ textAlign: "center" }}></Col>

                    <Col xs={6} style={{ textAlign: "center" }}>
                      {parseInt(router.query.id) === data?.total_questions ? (
                        <Button
                          className={styles.btnNext}
                          onClick={handleDone}
                          // disabled={!listAnswer.includes(data?.total_questions)}
                          // MASIH DIPAKE
                        >
                          Selesai
                        </Button>
                      ) : (
                        <Button
                          className={styles.btnNext}
                          onClick={handleNext}
                          disabled={
                            parseInt(router.query.id) === data &&
                            data.total_questions
                          }
                        >
                          Lanjut
                        </Button>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col sm={3}>
            <Card className={styles.cardNumber}>
              <h1 className={styles.daftarSoal}>Daftar Soal</h1>
              <Row>
                {number.map((item, index) => {
                  let list = [];
                  for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    list.push(key);
                  }

                  return (
                    <>
                      {list.includes(JSON.stringify(item + 1)) ? (
                        <Col key={index} style={{ width: "20%" }}>
                          <Card
                            className={styles.numberAnswer}
                            onClick={(event) => handleNumber(event)}
                          >
                            {item + 1}
                          </Card>
                        </Col>
                      ) : (
                        <Col key={index} style={{ width: "20%" }}>
                          <Card
                            className={
                              item + 1 === parseInt(router.query.id)
                                ? styles.cardChoosed
                                : styles.cardChoose
                            }
                            onClick={(event) => handleNumber(event)}
                          >
                            {item + 1}
                          </Card>
                        </Col>
                      )}
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
                        akses download 374 kbps ke atas). Cek hal ini melalui{" "}
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
            <Card className={styles.cardPanduan}>
              <table>
                <tr>
                  <td style={{ verticalAlign: "top" }}>1.</td>
                  <td>&nbsp;</td>
                  <td>
                    {" "}
                    Lakukan pengisian TRIVIA hingga seluruh pertanyaan terjawab
                    dengan tuntas.
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top" }}>2.</td>
                  <td>&nbsp;</td>
                  <td>
                    {" "}
                    Peserta wajib menjawab seluruh TRIVIA yang berjumlah 50
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
                  <td> Waktu yang tersedia untuk mengisi TRIVIA ini 1 Jam.</td>
                </tr>
              </table>
            </Card>
          ) : (
            "Test"
          )}
        </ModalBody>
      </Modal>

      {/* Modal Konfirmasi */}
      <Modal show={modalDone} onHide={handleCloseModalDone} size="lg">
        <ModalHeader className={styles.headerKonfirmasi}>
          Selesai TRIVIA
          <button
            type="button"
            className="close"
            onClick={handleCloseModalDone}
          >
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
        </ModalHeader>
        <ModalBody className={styles.bodyKonfirmasi}>
          Apakah anda ingin menyelesaikan TRIVIA dan mengirim semua hasil
          jawaban anda?Jika “Selesai” maka anda sudah dinyatakan selesai
          mengikuti TRIVIA, dan anda tidak dapat memperbaiki jawaban anda.{" "}
          <br />
          <br />
          Dengan ini saya menyatakan sudah menyelesaikan TRIVIA dengan tidak
          melakukan kecurangan dalam bentuk apapun. Saya bersedia menerima
          segala keputusan penyelengara terkait hasil TRIVIA.
          <br />
          <br />
          <div style={{ textAlign: "right" }}>
            <Button
              variant="link"
              onClick={handleCloseModalDone}
              className={styles.btnBatal}
            >
              Batal
            </Button>
            <Button onClick={handlePage} className={styles.btnMulai}>
              Selesai
            </Button>
          </div>
        </ModalBody>
      </Modal>

      {/* Modal Soal Responsive */}
      <Modal show={modalResponsive} onHide={handleCloseModalResponsive}>
        <ModalHeader className={styles.headerModal}>
          Daftar Soal
          <button
            type="button"
            className="close"
            onClick={handleCloseModalResponsive}
          >
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
        </ModalHeader>
        <ModalBody>
          <Row>
            {number.map((item, index) => {
              let list = [];
              for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                list.push(key);
              }

              return (
                <>
                  {list.includes(JSON.stringify(item + 1)) ? (
                    <Col key={index} style={{ width: "20%" }}>
                      <Card
                        className={styles.numberAnswer}
                        onClick={(event) => handleNumber(event)}
                      >
                        {item + 1}
                      </Card>
                    </Col>
                  ) : (
                    <Col key={index} style={{ width: "20%" }}>
                      <Card
                        className={
                          item + 1 === parseInt(router.query.id)
                            ? styles.cardChoosed
                            : styles.cardChoose
                        }
                        onClick={(event) => handleNumber(event)}
                      >
                        {item + 1}
                      </Card>
                    </Col>
                  )}
                </>
              );
            })}
          </Row>
        </ModalBody>
      </Modal>

      {/* Modal Lanjut */}
      <Modal show={modalNext} onHide={() => setModalNext(false)}>
        <ModalHeader className={styles.headerModal}>
          Konfirmasi Jawaban{" "}
        </ModalHeader>
        <ModalBody className={styles.bodyKonfirmasi}>
          Apakah Anda yakin lanjut ke soal selanjutnya? Karena{" "}
          <b>Anda tidak dapat kembali</b> ke soal trivia sebelumnya
        </ModalBody>
        <div style={{ textAlign: "right", padding: "20px" }}>
          <Button
            variant="link"
            onClick={() => setModalNext(false)}
            className={styles.btnBatal}
          >
            Batal
          </Button>
          <Button onClick={handlePageNext} className={styles.btnMulai}>
            Ya
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default SubtansiUser;
