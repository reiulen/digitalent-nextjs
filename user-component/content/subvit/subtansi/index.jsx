import Navigationbar from "../../../../components/templates/navbar.component";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import styles from "./content.module.css";
import Footer from "../footer/index";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import HeaderUser from "../header";
import axios from "axios";
import Image from "next/dist/client/image";
// import Cookies from "js-cookie";

const SubtansiUser = () => {
  const router = useRouter();
  const [data, setData] = useState({});
  const [answer, setAnswer] = useState("");
  const [listAnswer, setListAnswer] = useState([]);
  const [numberPage, setNumberPage] = useState("");

  const handleNumber = (val) => {
    console.log(val);
    // e.preventDefault();
    setNumberPage(val);
    router.push(`/user/subvit/subtansi/${val + 1}`);
  };

  const handleBack = () => {
    const page = parseInt(router.query.id) - 1;
    if (parseInt(router.query.id) === 1) {
      router.push(`${router.pathname.slice(0, 21)}/1`);
    } else {
      router.push(`${router.pathname.slice(0, 21)}/${page}`);
    }
  };
  function startTimer(duration, display) {
    var timer = duration,
      hours,
      minutes,
      seconds;
    setInterval(function () {
      hours = parseInt(timer / 3600, 10);
      minutes = parseInt(timer / 60 / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = hours + ":" + minutes + ":" + seconds;

      if (--timer <= 0) {
        router.push("/done");
      }
    }, 1000);
  }
  useEffect(() => {
    window.onload = function () {
      var fiveMinutes = 120 * 60,
        display = document.querySelector("#time");
      startTimer(fiveMinutes, display);
    };
    console.log(router.query.id);
    console.log(numberPage); // eslint-disable-next-line react-hooks/exhaustive-deps
    getRandomSoal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRandomSoal = () => {
    axios
      .get(
        `http://dts-subvit-dev.majapahit.id/api/subtance-question-bank-details/random?training_id=1&theme_id=1&category=Test Substansi`
      )
      .then((res) => setData(res.data.data));
  };

  const listAnswerMultiple = [];

  const handleAnswer = (e) => {
    console.log(e);

    setAnswer(e.option);
    localStorage.setItem(`${router.query.id}`, e.option);

    console.log(listAnswer);
  };

  return (
    <>
      <Navigationbar />
      <HeaderUser />
      <Container fluid style={{ padding: "30px 10px" }}>
        <Card className={styles.mainCard}>
          <Row>
            <Col sm={1}>
              <Card className={styles.back} onClick={handleBack}>
                <i
                  className="ri-arrow-left-s-line"
                  style={{ fontSize: "25px" }}
                ></i>
              </Card>
            </Col>
            <Col sm={6} className={styles.academy}>
              {data.academy}
            </Col>
            <Col sm={5}>
              <Card className={styles.time} id="time">
                02:00:00
              </Card>
            </Col>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            <Col sm={6}>
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
                {data.theme}
              </p>
            </Col>
            <Col sm={6} className={styles.totalSoal}>
              Soal {router.query.id} dari{" "}
              {data.list_questions && data.list_questions.length}
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
                {data.list_questions &&
                data.list_questions[parseInt(router.query.id) - 1]
                  .question_image !== null ? (
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
                        {data.list_questions &&
                          data.list_questions[parseInt(router.query.id) - 1]
                            .question}
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
                    {data.list_questions &&
                      data.list_questions[parseInt(router.query.id) - 1]
                        .question}
                  </p>
                )}
              </Row>
              <hr />
              {data.list_questions &&
                JSON.parse(
                  data.list_questions[parseInt(router.query.id) - 1].answer
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
              <p
                style={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "140%",
                  color: "#1B283F",
                }}
              >
                Daftar Soal
              </p>
              <Row style={{ marginTop: "40px" }}>
                {data.list_questions &&
                  data.list_questions.map((item, index) => {
                    return (
                      <Col key={index} style={{ width: "20%" }}>
                        <Card
                          className={
                            parseInt(numberPage) === parseInt(router.query.id)
                              ? styles.cardChoosed
                              : styles.cardChoose
                          }
                          onClick={() => handleNumber(index)}
                        >
                          <p
                            className={
                              numberPage === router.query.id
                                ? styles.textCardNumber
                                : styles.textCard
                            }
                          >
                            {index + 1}
                          </p>
                        </Card>
                      </Col>
                    );
                  })}
              </Row>
            </Col>
          </Row>
          <Footer
            answer={answer}
            number={data.list_questions && data.list_questions.length}
          />
        </Card>
      </Container>
    </>
  );
};
export default SubtansiUser;
