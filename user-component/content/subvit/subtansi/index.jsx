import Navigationbar from "../../../../components/templates/navbar.component";
import { Card, Col, Container, Form, Modal, Row } from "react-bootstrap";
import styles from "./content.module.css";
import Footer from "../footer/index";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import HeaderUser from "../header";
import axios from "axios";
import Image from "next/dist/client/image";
import { useSelector } from "react-redux";

// import Cookies from "js-cookie";

const SubtansiUser = () => {
  const router = useRouter();
  const [data] = useState(random_subtance_question_detail);
  const [answer, setAnswer] = useState("");
  const [listAnswer, setListAnswer] = useState([]);
  const [numberPage, setNumberPage] = useState("");
  const [numberAnswer, setNumberAnswer] = useState(false);
  const [modalSoal, setModalSoal] = useState(false);
  const [count, setCount] = useState(3600 * 2);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  const handleModalSoal = () => {
    setModalSoal(true);
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
    console.log(val);
    // e.preventDefault();
    setNumberPage(val);
    router.push(`/peserta/subvit/subtansi/${val + 1}`);
  };

  const handleBack = () => {
    const page = parseInt(router.query.id) - 1;
    if (parseInt(router.query.id) === 1) {
      router.push(`${router.pathname.slice(0, 24)}/1`);
    } else {
      router.push(`${router.pathname.slice(0, 24)}/${page}`);
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
    console.log(random_subtance_question_detail);
    console.log(data);
    // window.onload = function () {
    //   var fiveMinutes = 1 * 60,
    //     display = document.querySelector("#time");
    //   startTimer(fiveMinutes, display);
    // };

    if (count >= 0) {
      const secondsLeft = setInterval(() => {
        setCount((c) => c - 1);
        let timeLeftVar = secondsToTime(count);
        console.log(timeLeftVar);
        setHour(timeLeftVar.h);
        sessionStorage.setItem("hours", hour);
        setMinute(timeLeftVar.m);
        sessionStorage.setItem("minute", minute);
        setSecond(timeLeftVar.s);
        sessionStorage.setItem("second", second);
      }, 1000);
      return () => clearInterval(secondsLeft);
    } else {
      console.log("time out");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <>
      <HeaderUser />
      <Container className={styles.base}>
        <Card className={styles.mainCard}>
          <Row>
            <Col sm={1} xs={6}>
              <Card className={styles.back} onClick={handleBack}>
                <i
                  className="ri-arrow-left-s-line"
                  style={{ fontSize: "25px" }}
                ></i>
              </Card>
            </Col>
            <Col sm={6} className={styles.academy}>
              {random_subtance_question_detail &&
                random_subtance_question_detail.academy}
            </Col>
            <Col sm={5} xs={6}>
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
          <Row style={{ marginTop: "20px" }}>
            <Col xs={6} className={styles.totalSoalResponsive}>
              Soal {router.query.id} dari{" "}
              {random_subtance_question_detail &&
                random_subtance_question_detail.list_questions &&
                random_subtance_question_detail.list_questions.length}
            </Col>
            <Col
              xs={6}
              className={styles.daftarSoalResponsive}
              onClick={handleModalSoal}
            >
              Daftar Soal
            </Col>
            <Col sm={6} xs={12}>
              <p className={styles.nameTest}>
                Tes Subtansi
                <span
                  style={{
                    color: "#B5B5C3",
                  }}
                >
                  {" "}
                  |{" "}
                </span>
                {random_subtance_question_detail &&
                  random_subtance_question_detail.theme}
              </p>
            </Col>
            <Col sm={6} className={styles.totalSoal}>
              Soal {router.query.id} dari{" "}
              {random_subtance_question_detail &&
                random_subtance_question_detail.list_questions &&
                random_subtance_question_detail.list_questions.length}
            </Col>
          </Row>
          <Row
            style={{
              marginTop: "10px",
              padding: "0px 15px",
            }}
          >
            <Col sm={8}>
              <Row>
                {random_subtance_question_detail &&
                random_subtance_question_detail.list_questions &&
                random_subtance_question_detail.list_questions[
                  parseInt(router.query.id) - 1
                ].question_image !== null ? (
                  <>
                    <Col sm={2}>
                      <p>Ini Gambar</p>
                    </Col>
                    <Col sm={10}>
                      <p
                        style={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: "bold",
                          fontSize: "16px",
                          lineHeight: "120%",
                          marginBottom: "10px",
                          color: "#212121",
                        }}
                      >
                        {random_subtance_question_detail.list_questions &&
                          random_subtance_question_detail.list_questions[
                            parseInt(router.query.id) - 1
                          ].question}
                      </p>
                    </Col>
                  </>
                ) : (
                  <p
                    style={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: "bold",
                      fontSize: "16px",
                      lineHeight: "120%",
                      marginBottom: "10px",
                      color: "#212121",
                    }}
                  >
                    {random_subtance_question_detail &&
                      random_subtance_question_detail.list_questions &&
                      random_subtance_question_detail.list_questions[
                        parseInt(router.query.id) - 1
                      ].question}
                  </p>
                )}
              </Row>
              <hr />
              {random_subtance_question_detail &&
                random_subtance_question_detail.list_questions &&
                JSON.parse(
                  random_subtance_question_detail.list_questions[
                    parseInt(router.query.id) - 1
                  ].answer
                ).map((key, index) => {
                  return (
                    <>
                      <Row>
                        {key.image != null ? (
                          <>
                            <Col sm={2}>ini Gambar</Col>
                            <Col sm={10}>
                              <Card
                                key={index}
                                className={
                                  localStorage.getItem(`${router.query.id}`) ===
                                  key.option
                                    ? styles.cardAnswered
                                    : styles.cardAnswer
                                }
                                onClick={() => handleAnswer(key)}
                              >
                                {key.key}. {key.option}
                              </Card>
                            </Col>
                          </>
                        ) : (
                          <Col sm={12}>
                            <Card
                              key={index}
                              className={
                                localStorage.getItem(`${router.query.id}`) ===
                                key.option
                                  ? styles.cardAnswered
                                  : styles.cardAnswer
                              }
                              onClick={() => handleAnswer(key)}
                            >
                              {key.key}. {key.option}
                            </Card>
                          </Col>
                        )}
                      </Row>
                    </>
                  );
                })}
            </Col>
            <Col sm={1}></Col>
            <Col sm={3}>
              <p style={{}} className={styles.daftarSoal}>
                Daftar Soal
              </p>
              <Row className={styles.rowNumber}>
                {random_subtance_question_detail &&
                  random_subtance_question_detail.list_questions &&
                  random_subtance_question_detail.list_questions.map(
                    (item, index) => {
                      return (
                        <Col key={index} style={{ width: "20%" }}>
                          <Card
                            className={
                              index + 1 === parseInt(router.query.id)
                                ? styles.cardChoosed
                                : styles.cardChoose
                            }
                            onClick={() => handleNumber(index)}
                          >
                            <p
                              className={
                                index + 1 === parseInt(router.query.id)
                                  ? styles.textCardNumber
                                  : styles.textCard
                              }
                            >
                              {index + 1}
                            </p>
                          </Card>
                        </Col>
                      );
                    }
                  )}
              </Row>
            </Col>
          </Row>
          <Footer
            answer={answer}
            number={
              random_subtance_question_detail &&
              random_subtance_question_detail.list_questions &&
              random_subtance_question_detail.list_questions.length
            }
          />
        </Card>
      </Container>

      <Modal show={modalSoal} onHide={handleCloseModal} centered>
        <Modal.Body>
          <h1>Daftar Soal</h1>
          <Row className={styles.rowNumberResponsive}>
            {random_subtance_question_detail &&
              random_subtance_question_detail.list_questions &&
              random_subtance_question_detail.list_questions.map(
                (item, index) => {
                  return (
                    <Col key={index} style={{ width: "20%" }}>
                      <Card
                        className={
                          index + 1 === parseInt(router.query.id)
                            ? styles.cardChoosed
                            : styles.cardChoose
                        }
                        onClick={() => handleNumber(index)}
                      >
                        <p
                          className={
                            index + 1 === parseInt(router.query.id)
                              ? styles.textCardNumber
                              : styles.textCard
                          }
                        >
                          {index + 1}
                        </p>
                      </Card>
                    </Col>
                  );
                }
              )}
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default SubtansiUser;
