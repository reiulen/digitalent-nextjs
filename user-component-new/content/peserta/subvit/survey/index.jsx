import {
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Button,
  ModalBody,
  Collapse,
  CarouselItem,
} from "react-bootstrap";
import styles from "./content.module.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Image from "next/dist/client/image";
import Dot from "../../../../../public/assets/media/logos/dot.png";
import { useSelector } from "react-redux";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { postResultSurvey } from "../../../../../redux/actions/subvit/survey-question-detail.action";

import defaultImage from "../../../../../public/assets/media/logos/Gambar.png";
import { useDispatch } from "react-redux";
import axios from "axios";

const SubtansiUser = ({ token }) => {
  const dispatch = useDispatch();
  const { error, random_survey } = useSelector((state) => state.randomSurvey);

  const router = useRouter();

  const initialData = {
    training: "Pelatihan Android test update lima",
    academy: "Goverment Transformation Academy",
    theme: "Tema Akademi",
    total_questions: 4,
    time_left: 221,
    list_questions: [
      {
        id: 168,
        survey_question_bank_id: 66,
        question: "TRIGGERED?",
        question_image:
          "survey/images/ce303867-8933-49b6-8640-3c68bacfe8f0.jpeg",
        type: "triggered_question",
        answer: [
          {
            key: "A",
            option: "Ada selanjutnya",
            image: "survey/images/d3ff3103-8197-4d05-ba7d-c93a11643fb5.png",
            imageName: "gambar1.png",
            type: "choose",

            sub: [
              {
                key: 1,
                question: "ini selanjutnya",
                image: "survey/images/5b0a7a1c-0d01-4bcc-b408-8a379ed001d1.png",
                imageName: "gambar2.png",

                answer: [
                  {
                    key: "A",
                    option: "jawab a",
                    image:
                      "survey/images/0a7e1e2d-7209-4873-abd9-0a6a11aefb6a.jpeg",
                    imageName: "bezos.jpg",
                    type: "choose",
                  },
                  {
                    key: "B",
                    option: "jawab b",
                    image:
                      "survey/images/695e1fb3-f789-44f8-88f0-829fc5e0f2ca.jpeg",
                    imageName: "bill gates.jpg",
                    type: "choose",
                  },
                  {
                    key: "C",
                    option: "jawab c",
                    image:
                      "survey/images/692b465a-3082-4a75-833f-7e84cc5f93fe.jpeg",
                    imageName: "elon.jpg",
                    type: "choose",
                  },
                ],
              },
            ],
          },
          {
            key: "B",
            option: "Unch",
            image: null,
            imageName: "Choose File",
            type: "choose",
            is_next: false,
            sub: [],
          },
          {
            key: "C",
            option: "ga unch",
            image: "survey/images/32dd0baf-263c-4eaa-9980-833c328d0dda.png",
            imageName: "redhat academy.png",
            type: "choose",
            is_next: false,
            sub: [],
          },
        ],
      },
      {
        id: 166,
        survey_question_bank_id: 66,
        question: "TeslAAA",
        question_image:
          "survey/images/c28e548a-3a52-4a9a-a742-7a2711ea768b.jpeg",
        type: "multiple_choice",
        answer: [
          {
            key: "A",
            option: "AAA",
            image: "survey/images/b316765a-ebe4-49c0-857c-87730ad54e16.jpeg",
            imageName: "bezos.jpg",
          },
          {
            key: "B",
            option: "BBB",
            image: "survey/images/838e0a39-4ac6-46f7-9146-3851b6d94f1d.jpeg",
            imageName: "bill gates.jpg",
          },
          {
            key: "C",
            option: "CCC",
            image: "survey/images/a44700c7-3d36-482b-8d90-a3516a5ad680.png",
            imageName: "gambar1.png",
          },
          {
            key: "D",
            option: "DDD",
            image: "survey/images/34f85f50-6a01-4d98-982a-a88728db3f4a.png",
            imageName: "gambar3.png",
          },
        ],
      },
      {
        id: 167,
        survey_question_bank_id: 66,
        question: "OOOUCHH",
        question_image:
          "survey/images/1f14df13-8a2f-474e-8fda-a93365d15498.jpeg",
        type: "pertanyaan_terbuka",
        answer: null,
      },
      {
        id: 165,
        survey_question_bank_id: 66,
        question: "SUUUU",
        question_image:
          "survey/images/9eb5241f-3598-4980-97b2-632cf3a42d53.jpeg",
        type: "objective",
        answer: [
          {
            key: "A",
            option: "AAA",
            image: "survey/images/cb596346-dd01-4f06-9dcd-cbe6822af969.jpeg",
            imageName: "elon.jpg",
          },
          {
            key: "B",
            option: "BBB",
            image: "survey/images/edad998d-49fe-47fb-98db-775706d7847b.jpeg",
            imageName: "bill gates.jpg",
          },
          {
            key: "C",
            option: "SUUU",
            image: "survey/images/286de9d5-27ca-44d0-9c46-3bdeb29c5dfa.jpeg",
            imageName: "SUUU.jpg",
          },
          {
            key: "D",
            option: "DDD",
            image: "survey/images/2de7a6d0-3bcf-4b16-a85b-53b949c7f0fa.jpeg",
            imageName: "bezos.jpg",
          },
        ],
      },
    ],
  };

  // let multi = new Array();
  const [multi, setMulti] = useState([]);

  const [data, setData] = useState();

  const [answer, setAnswer] = useState("");
  const [d, setD] = useState("");

  const [listAnswer, setListAnswer] = useState();
  const [listAnswer2, setListAnswer2] = useState();
  const [numberPage, setNumberPage] = useState("");
  const [imageClick, setImageClick] = useState("");
  const [imageClickTr, setImageClickTr] = useState("");
  const [imageClickTrJawab, setImageClickTrJawab] = useState("");

  const [zoom, setZoom] = useState(false);
  const [zoomJawab, setZoomJawab] = useState(false);
  const [zoomTr, setZoomTr] = useState(false);
  const [zoomTrJawab, setZoomTrJawab] = useState(false);

  const [modalSoal, setModalSoal] = useState(false);
  const [modalResponsive, setModalResponsive] = useState(false);

  const [sub, setSub] = useState();

  const [answerTriggered, setAnswerTriggered] = useState();

  const [open, setOpen] = useState(false);

  const [count, setCount] = useState(random_survey && random_survey.time_left);
  const [modalDone, setModalDone] = useState(false);

  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  const [close, setClose] = useState(0);

  const routerTraining = router.query.training_id;
  const routerTema = router.query.theme_id;

  const [question, setQuestion] = useState("");
  const [time, setTime] = useState("");

  let keyMap = [];

  const handleMultiple = (item, index) => {
    const list =
      sessionStorage.getItem(router.query.id) !== null
        ? [...JSON.parse(sessionStorage.getItem(router.query.id))]
        : [];
    if (list.includes(item.key)) {
      list.splice(list.indexOf(item.key), 1);
      sessionStorage.setItem(router.query.id, JSON.stringify(list));
    } else {
      list.push(item.key);
      sessionStorage.setItem(router.query.id, JSON.stringify(list));
    }

    // useles
    setMulti(list);
    setD(index);

    if (
      item.key.includes(sessionStorage.getItem(router.query.id + index + "a"))
    ) {
      sessionStorage.removeItem(router.query.id + index + "a", item.key);
    } else {
      sessionStorage.setItem(router.query.id + index + "a", item.key);
    }

    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      keyMap.push(key);
    }
  };

  const handleModalSoal = () => {
    setModalSoal(true);
  };

  const handleModalResponsive = () => {
    setModalResponsive(true);
  };

  const handleNext = () => {
    const page = parseInt(router.query.id) + 1;
    setMulti([]);
    router.push(
      `${router.pathname.slice(0, 23)}/${page}?theme_id=${
        router.query.theme_id || 1
      }&training_id=${router.query.training_id || 1}`
    );
  };

  const handleCloseModal = () => {
    setModalSoal(false);
  };

  const handleCloseModalResponsive = () => {
    setModalResponsive(false);
  };

  const handleNumber = (val) => {
    setNumberPage(val);

    router.push(
      `/peserta/subvit/survey/${parseInt(val.target.innerHTML)}?theme_id=${
        router.query.theme_id || 1
      }&training_id=${router.query.training_id || 1}`
    );
  };

  const handleBack = () => {
    const page = parseInt(router.query.id) - 1;
    if (parseInt(router.query.id) === 1) {
      router.push(
        `${router.pathname.slice(0, 23)}/1?theme_id=${
          router.query.theme_id || 1
        }&training_id=${router.query.training_id || 1}`
      );
    } else {
      router.push(
        `${router.pathname.slice(0, 23)}/${page}?theme_id=${
          router.query.theme_id || 1
        }&training_id=${router.query.training_id || 1}`
      );
    }
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
          `api/survey-question-bank-details/info?training_id=${routerTraining}&theme_id=${routerTema}`,
        config
      )
      .then((res) => {
        setQuestion(res.data.total_questions);
        setTime(res.data.duration);
      });
  }, [routerTema, routerTraining, token]);

  useEffect(() => {
    if (error) {
      router.push(`/peserta/done-survey`);
    }
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
      const setData = {
        list: null,
        training_id: router.query.training_id,
        type: "survey",
      };

      dispatch(postResultSurvey(setData, token));
      localStorage.clear();
      sessionStorage.clear();
      router.push(`/peserta/done-survey`);
    }
  }, [count, data, error, dispatch, router, token]);

  useEffect(() => {
    setData(random_survey);
  }, [data, random_survey]);

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

  const handleAnswerText = (e) => {
    sessionStorage.setItem(`${parseInt(router.query.id)}`, e.target.value);
    if (sessionStorage.getItem(`${parseInt(router.query.id)}`) === "") {
      setAnswer("");
    } else {
      setAnswer(e.target.value);
    }
  };

  const handleAnswerTriggered = (e, i) => {
    sessionStorage.setItem(
      `answerTriggered${router.query.id}`,
      JSON.stringify(e)
    );

    let sub = JSON.parse(
      data.list_questions[parseInt(router.query.id) - 1]?.answer
    ).map((item) => {
      return item;
    });

    setSub(sub[i]);

    if (e.sub && e.sub.length > 0) {
      sessionStorage.setItem(`${router.query.id}`, e.key);
      setOpen(!open);
      let val;
      if (sessionStorage.getItem(`${router.query.id}tg`) === null) {
        val = true;
      } else {
        val = !sessionStorage.getItem(`${router.query.id}tg`);
      }
      sessionStorage.setItem(`${router.query.id}tg`, val);
    } else {
      sessionStorage.setItem(`${router.query.id}`, e.key);
    }
  };

  // const handleTriggered = (e) => {
  //   let ansTw = [sessionStorage.getItem(router.query.id + "e"), e.key];
  //   sessionStorage.setItem(router.query.id, JSON.stringify(ansTw));
  //   sessionStorage.setItem(`${router.query.id}tr`, e.key);
  //   setListAnswer(sessionStorage.getItem(`${router.query.id}tr`));
  // };

  const handleTriggered2 = (e, parent, index) => {
    let ansTw;
    if (sessionStorage.getItem(router.query.id + "e") === null) {
      ansTw = [];
    } else {
      ansTw = [...JSON.parse(sessionStorage.getItem(router.query.id + "e"))];
    }
    const data = { id: parent, key: e.key, value: "" };
    const filter = ansTw.filter((val) => val.id === parent);
    if (filter.length > 0) {
      ansTw.filter((val, i) => {
        if (val.id === parent) {
          ansTw[i].key = e.key;
        }
        ansTw[i].value = "";
      });
    } else {
      ansTw.push(data);
    }

    sessionStorage.setItem(router.query.id + parent + "td", e.key);
    sessionStorage.setItem(router.query.id + "e", JSON.stringify(ansTw));
    setListAnswer2(sessionStorage.getItem(router.query.id + parent + "td"));
  };

  const handleTriggeredEmpty2 = (e, parent, value) => {
    let ansTw;
    if (sessionStorage.getItem(router.query.id + "e") === null) {
      ansTw = [];
    } else {
      ansTw = [...JSON.parse(sessionStorage.getItem(router.query.id + "e"))];
    }

    const data = { id: parent, key: e.key, value: value };
    const filter = ansTw.filter((val) => val.id === parent);
    if (filter.length > 0) {
      ansTw.filter((val, i) => {
        if (val.id === parent) {
          ansTw[i].key = e.key;
          ansTw[i].value = value;
        } else {
          ansTw[i].value = "";
        }
      });
    } else {
      ansTw.push(data);
    }

    sessionStorage.setItem(router.query.id + parent + "td", e.key);
    sessionStorage.setItem(router.query.id + "e", JSON.stringify(ansTw));
    setListAnswer2(sessionStorage.getItem(router.query.id + parent + "td"));
  };

  const handleObject = (e) => {
    sessionStorage.setItem(`${router.query.id}`, e.key);
    setListAnswer(sessionStorage.getItem(`${router.query.id}`));
  };

  let number = [];

  for (let i = 0; i < data?.total_questions; i++) {
    number.push(i);
  }

  const handleDone = () => {
    setModalDone(true);
  };

  const handlePage = () => {
    setClose(1);
    const setData = {
      list: JSON.stringify(
        data.list_questions.map((item, index) => {
          return {
            ...item,
            participant_answer:
              item.type !== "triggered_question"
                ? sessionStorage.getItem(index + 1)
                : sessionStorage.getItem(index + 1 + "e"),
          };
        })
      ),
      training_id: router.query.training_id,
      type: "survey",
    };
    dispatch(postResultSurvey(setData, token));
    localStorage.clear();
    sessionStorage.clear();
    router.push(`/peserta/done-survey`);
  };

  const handleCloseModalDone = () => {
    setModalDone(false);
  };

  return (
    <>
      <Container className={styles.baseAll} fluid>
        <Card className={styles.cardTop}>
          <Row>
            <Col xs={12} sm={6} style={{ marginTop: "8px" }}>
              <table>
                <tr>
                  <td className={styles.academy}>
                    {(data && data.academy) || "-"}
                  </td>
                  <td>&nbsp;</td>
                  <td style={{ position: "relative", paddingBottom: "5px" }}>
                    <Image
                      alt=""
                      src={Dot}
                      width={5}
                      height={5}
                      className={styles.dot}
                    />
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
              <p className={styles.totalSoal}>
                Soal {parseInt(router.query.id)} dari{" "}
                {data && data.total_questions}
              </p>
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

              {data?.list_questions[parseInt(router.query.id) - 1]?.type ===
                "triggered_question" && (
                <>
                  <h1 className={styles.soal}>
                    {data &&
                    data.list_questions[parseInt(router.query.id) - 1]
                      .question_image !== null &&
                    data.list_questions[parseInt(router.query.id) - 1]
                      .question_image !== "" ? (
                      <div className="d-flex flex-row">
                        <div className="p-2">
                          <Image
                            src={
                              process.env.END_POINT_API_IMAGE_SUBVIT +
                                data.list_questions[
                                  parseInt(router.query.id) - 1
                                ]?.question_image || defaultImage
                            }
                            alt=""
                            width={150}
                            onClick={() => setZoom(true)}
                            height={150}
                          />
                        </div>
                        <Modal show={zoom} onHide={() => setZoom(false)}>
                          <Image
                            src={
                              process.env.END_POINT_API_IMAGE_SUBVIT +
                                data.list_questions[
                                  parseInt(router.query.id) - 1
                                ]?.question_image || defaultImage
                            }
                            alt=""
                            width={500}
                            height={800}
                          />
                        </Modal>
                        <div className="p-5">
                          {data &&
                            data.list_questions[parseInt(router.query.id) - 1]
                              ?.question}
                        </div>
                      </div>
                    ) : (
                      <div className="p-2">
                        {data &&
                          data.list_questions[parseInt(router.query.id) - 1]
                            ?.question}
                      </div>
                    )}
                  </h1>
                  <hr
                    hidden={
                      sessionStorage.getItem(`${router.query.id}tg`) !== null
                        ? sessionStorage.getItem(`${router.query.id}tg`) ===
                          true
                        : false
                    }
                  />

                  {sessionStorage.getItem(`${router.query.id}tg`) === null ||
                  sessionStorage.getItem(`${router.query.id}tg`) === false ? (
                    data &&
                    data.list_questions[parseInt(router.query.id) - 1]
                      ?.answer !== null &&
                    JSON.parse(
                      data.list_questions[parseInt(router.query.id) - 1]?.answer
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
                                  onClick={() => {
                                    setZoomJawab(true);
                                    setImageClick(item.image);
                                  }}
                                  height={70}
                                />
                              </div>
                              <Modal
                                show={zoomJawab}
                                onHide={() => setZoomJawab(false)}
                              >
                                <Image
                                  src={
                                    process.env.END_POINT_API_IMAGE_SUBVIT +
                                      imageClick || defaultImage
                                  }
                                  alt=""
                                  width={500}
                                  height={800}
                                />
                              </Modal>
                              <div
                                className="p-4"
                                style={{ width: "100%", height: "100%" }}
                              >
                                <Card
                                  className={
                                    sessionStorage.getItem(router.query.id) !==
                                      null &&
                                    sessionStorage.getItem(router.query.id) ===
                                      item.key
                                      ? styles.answer
                                      : styles.boxAnswer
                                  }
                                  key={index}
                                  onClick={() => {
                                    handleAnswerTriggered(item, index);
                                  }}
                                >
                                  <table>
                                    <tr>
                                      <td style={{ width: "5px" }}>
                                        {item.key}
                                      </td>
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
                                sessionStorage.getItem(router.query.id) !==
                                  null &&
                                sessionStorage.getItem(router.query.id) ===
                                  item.key
                                  ? styles.answer
                                  : styles.boxAnswer
                              }
                              key={index}
                              onClick={() => {
                                handleAnswerTriggered(item, index);
                              }}
                            >
                              <table>
                                <tr>
                                  <td style={{ width: "5px" }}>{item.key}</td>
                                  <td style={{ width: "15px" }}>.</td>
                                  <td>{item.option} </td>
                                </tr>
                              </table>
                            </Card>
                          )}
                        </>
                      );
                    })
                  ) : (
                    <Card className={styles.answer}>
                      <table>
                        <tr>
                          <td style={{ width: "5px" }}>
                            {sessionStorage.getItem(
                              `answerTriggered${router.query.id}`
                            ) !== null &&
                              JSON.parse(
                                sessionStorage.getItem(
                                  `answerTriggered${router.query.id}`
                                )
                              ).key}
                          </td>
                          <td style={{ width: "15px" }}>.</td>
                          <td>
                            {sessionStorage.getItem(
                              `answerTriggered${router.query.id}`
                            ) !== null &&
                              JSON.parse(
                                sessionStorage.getItem(
                                  `answerTriggered${router.query.id}`
                                )
                              ).option}
                          </td>
                        </tr>
                      </table>
                    </Card>
                  )}
                  {/* {console.log(sessionStorage.getItem(`${router.query.id}tg`))} */}
                  <Collapse
                    in={
                      sessionStorage.getItem(`${router.query.id}tg`) !== null
                        ? true
                        : false
                    }
                    dimension="width"
                  >
                    <div id="example-collapse-text">
                      {JSON.parse(
                        sessionStorage.getItem(
                          `answerTriggered${router.query.id}`
                        )
                      )?.sub?.map((a, parent) => {
                        return (
                          <>
                            {parent !== 0 &&
                            sessionStorage.getItem(
                              `${router.query.id + parent - 1}td`
                            ) !== null ? (
                              <>
                                {a.image !== null && a.image !== "" ? (
                                  <>
                                    <h1 className={styles.soal}>
                                      <div className="d-flex flex-row">
                                        <div className="p-2">
                                          {" "}
                                          <Image
                                            src={
                                              process.env
                                                .END_POINT_API_IMAGE_SUBVIT +
                                                a.image || defaultImage
                                            }
                                            alt=""
                                            width={150}
                                            onClick={() => {
                                              setZoomTr(true);
                                              setImageClickTr(a.image);
                                            }}
                                            height={150}
                                          />
                                        </div>
                                        <Modal
                                          show={zoomTr}
                                          onHide={() => setZoomTr(false)}
                                        >
                                          <Image
                                            src={
                                              process.env
                                                .END_POINT_API_IMAGE_SUBVIT +
                                                imageClickTr || defaultImage
                                            }
                                            alt=""
                                            width={500}
                                            height={800}
                                          />
                                        </Modal>
                                        <div className="p-5">{a.question}</div>
                                      </div>
                                    </h1>
                                    <hr />
                                    {a.answer.map((ans, index) => {
                                      return (
                                        <>
                                          <div className="d-flex flex-row">
                                            <div className="p-2">
                                              <Image
                                                src={
                                                  process.env
                                                    .END_POINT_API_IMAGE_SUBVIT +
                                                    ans.image || defaultImage
                                                }
                                                alt=""
                                                width={70}
                                                onClick={() => {
                                                  setZoomTrJawab(true);
                                                  setImageClickTrJawab(
                                                    ans.image
                                                  );
                                                }}
                                                height={70}
                                              />
                                            </div>
                                            <Modal
                                              show={zoomTrJawab}
                                              onHide={() =>
                                                setZoomTrJawab(false)
                                              }
                                            >
                                              <Image
                                                src={
                                                  process.env
                                                    .END_POINT_API_IMAGE_SUBVIT +
                                                    imageClickTrJawab ||
                                                  defaultImage
                                                }
                                                alt=""
                                                width={500}
                                                height={800}
                                              />
                                            </Modal>
                                            <div
                                              className="p-4"
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                              }}
                                            >
                                              <Card
                                                className={
                                                  sessionStorage.getItem(
                                                    router.query.id +
                                                      parent +
                                                      "td"
                                                  ) === ans.key
                                                    ? styles.answer
                                                    : styles.boxAnswer
                                                }
                                                key={index}
                                                onClick={() => {
                                                  handleTriggered2(
                                                    ans,
                                                    parent,
                                                    index
                                                  );
                                                }}
                                              >
                                                <table>
                                                  <tr>
                                                    <td
                                                      style={{ width: "5px" }}
                                                    >
                                                      {ans.key}
                                                    </td>
                                                    <td
                                                      style={{
                                                        width: "15px",
                                                      }}
                                                    >
                                                      .
                                                    </td>
                                                    <td>{ans.option}</td>
                                                  </tr>
                                                </table>
                                              </Card>
                                            </div>
                                          </div>
                                        </>
                                      );
                                    })}
                                  </>
                                ) : (
                                  <>
                                    <h1 className={styles.soal}>
                                      <div className="p-2">{a.question}</div>{" "}
                                    </h1>
                                    <hr />
                                    {a.answer.map((ans, index) => {
                                      return (
                                        <>
                                          {ans.type === "empty" ? (
                                            <>
                                              <div
                                                style={{
                                                  position: "relative",
                                                }}
                                              >
                                                <input
                                                  type="text"
                                                  className={`form-control h-100 ${
                                                    sessionStorage.getItem(
                                                      router.query.id +
                                                        parent +
                                                        "td"
                                                    ) === ans.key
                                                      ? styles.answer
                                                      : styles.boxAnswer
                                                  }`}
                                                  style={{
                                                    paddingLeft: "40px",
                                                  }}
                                                  placeholder="Silahkan Masukkan Jawaban Lainya"
                                                  defaultValue={
                                                    (sessionStorage.getItem(
                                                      router.query.id + "e"
                                                    ) !== null &&
                                                      JSON.parse(
                                                        sessionStorage.getItem(
                                                          router.query.id + "e"
                                                        )
                                                      )[0].value) ||
                                                    ""
                                                  }
                                                  onChange={(e) => {
                                                    handleTriggeredEmpty2(
                                                      ans,
                                                      parent,
                                                      e.target.value
                                                    );
                                                  }}
                                                />
                                                <div
                                                  style={{
                                                    position: "absolute",
                                                    zIndex: 2,
                                                    top: "15px",
                                                    left: "17px",
                                                  }}
                                                >
                                                  <p>{ans.key} .</p>
                                                </div>
                                              </div>
                                            </>
                                          ) : (
                                            <Card
                                              className={
                                                sessionStorage.getItem(
                                                  router.query.id +
                                                    parent +
                                                    "td"
                                                ) === ans.key
                                                  ? styles.answer
                                                  : styles.boxAnswer
                                              }
                                              key={index}
                                              onClick={() => {
                                                handleTriggered2(
                                                  ans,
                                                  parent,
                                                  index
                                                );
                                              }}
                                            >
                                              <table>
                                                <tr>
                                                  <td style={{ width: "5px" }}>
                                                    {ans.key}
                                                  </td>
                                                  <td style={{ width: "15px" }}>
                                                    .
                                                  </td>
                                                  <td>{ans.option}</td>
                                                </tr>
                                              </table>
                                            </Card>
                                          )}
                                        </>
                                      );
                                    })}
                                  </>
                                )}
                              </>
                            ) : (
                              parent === 0 && (
                                <>
                                  {a.image !== null && a.image !== "" ? (
                                    <>
                                      <h1 className={styles.soal}>
                                        <div className="d-flex flex-row">
                                          <div className="p-2">
                                            {" "}
                                            <Image
                                              src={
                                                process.env
                                                  .END_POINT_API_IMAGE_SUBVIT +
                                                  a.image || defaultImage
                                              }
                                              alt=""
                                              width={150}
                                              onClick={() => {
                                                setZoomTr(true);
                                                setImageClickTr(a.image);
                                              }}
                                              height={150}
                                            />
                                          </div>
                                          <Modal
                                            show={zoomTr}
                                            onHide={() => setZoomTr(false)}
                                          >
                                            <Image
                                              src={
                                                process.env
                                                  .END_POINT_API_IMAGE_SUBVIT +
                                                  imageClickTr || defaultImage
                                              }
                                              alt=""
                                              width={500}
                                              height={800}
                                            />
                                          </Modal>
                                          <div className="p-5">
                                            {a.question}
                                          </div>
                                        </div>
                                      </h1>
                                      <hr />
                                      {a.answer.map((ans, index) => {
                                        return (
                                          <>
                                            <div className="d-flex flex-row">
                                              <div className="p-2">
                                                <Image
                                                  src={
                                                    process.env
                                                      .END_POINT_API_IMAGE_SUBVIT +
                                                      ans.image || defaultImage
                                                  }
                                                  alt=""
                                                  width={70}
                                                  onClick={() => {
                                                    setZoomTrJawab(true);
                                                    setImageClickTrJawab(
                                                      ans.image
                                                    );
                                                  }}
                                                  height={70}
                                                />
                                              </div>
                                              <Modal
                                                show={zoomTrJawab}
                                                onHide={() =>
                                                  setZoomTrJawab(false)
                                                }
                                              >
                                                <Image
                                                  src={
                                                    process.env
                                                      .END_POINT_API_IMAGE_SUBVIT +
                                                      imageClickTrJawab ||
                                                    defaultImage
                                                  }
                                                  alt=""
                                                  width={500}
                                                  height={800}
                                                />
                                              </Modal>
                                              <div
                                                className="p-4"
                                                style={{
                                                  width: "100%",
                                                  height: "100%",
                                                }}
                                              >
                                                <Card
                                                  className={
                                                    sessionStorage.getItem(
                                                      router.query.id +
                                                        parent +
                                                        "td"
                                                    ) === ans.key
                                                      ? styles.answer
                                                      : styles.boxAnswer
                                                  }
                                                  key={index}
                                                  onClick={() => {
                                                    handleTriggered2(
                                                      ans,
                                                      parent,
                                                      index
                                                    );
                                                  }}
                                                >
                                                  <table>
                                                    <tr>
                                                      <td
                                                        style={{ width: "5px" }}
                                                      >
                                                        {ans.key}
                                                      </td>
                                                      <td
                                                        style={{
                                                          width: "15px",
                                                        }}
                                                      >
                                                        .
                                                      </td>
                                                      <td>{ans.option}</td>
                                                    </tr>
                                                  </table>
                                                </Card>
                                              </div>
                                            </div>
                                          </>
                                        );
                                      })}
                                    </>
                                  ) : (
                                    <>
                                      <h1 className={styles.soal}>
                                        <div className="p-2">{a.question}</div>{" "}
                                      </h1>
                                      <hr />
                                      {a.answer.map((ans, index) => {
                                        return (
                                          <>
                                            {ans.type === "empty" ? (
                                              <>
                                                <div
                                                  style={{
                                                    position: "relative",
                                                  }}
                                                >
                                                  <input
                                                    type="text"
                                                    className={`form-control h-100 ${
                                                      sessionStorage.getItem(
                                                        router.query.id +
                                                          parent +
                                                          "td"
                                                      ) === ans.key
                                                        ? styles.answer
                                                        : styles.boxAnswer
                                                    }`}
                                                    style={{
                                                      paddingLeft: "40px",
                                                    }}
                                                    placeholder="Silahkan Masukkan Jawaban Lainya"
                                                    defaultValue={
                                                      (sessionStorage.getItem(
                                                        router.query.id + "e"
                                                      ) !== null &&
                                                        JSON.parse(
                                                          sessionStorage.getItem(
                                                            router.query.id +
                                                              "e"
                                                          )
                                                        )[0].value) ||
                                                      ""
                                                    }
                                                    onChange={(e) => {
                                                      handleTriggeredEmpty2(
                                                        ans,
                                                        parent,
                                                        e.target.value
                                                      );
                                                    }}
                                                  />
                                                  <div
                                                    style={{
                                                      position: "absolute",
                                                      zIndex: 2,
                                                      top: "15px",
                                                      left: "17px",
                                                    }}
                                                  >
                                                    <p>{ans.key} .</p>
                                                  </div>
                                                </div>
                                              </>
                                            ) : (
                                              <Card
                                                className={
                                                  sessionStorage.getItem(
                                                    router.query.id +
                                                      parent +
                                                      "td"
                                                  ) === ans.key
                                                    ? styles.answer
                                                    : styles.boxAnswer
                                                }
                                                key={index}
                                                onClick={() => {
                                                  handleTriggered2(
                                                    ans,
                                                    parent,
                                                    index
                                                  );
                                                }}
                                              >
                                                <table>
                                                  <tr>
                                                    <td
                                                      style={{ width: "5px" }}
                                                    >
                                                      {ans.key}
                                                    </td>
                                                    <td
                                                      style={{ width: "15px" }}
                                                    >
                                                      .
                                                    </td>
                                                    <td>{ans.option}</td>
                                                  </tr>
                                                </table>
                                              </Card>
                                            )}
                                          </>
                                        );
                                      })}
                                    </>
                                  )}
                                </>
                              )
                            )}
                          </>
                        );
                      })}
                    </div>
                  </Collapse>
                </>
              )}

              {data &&
                data.list_questions[parseInt(router.query.id) - 1].type ===
                  "objective" && (
                  <>
                    <h1 className={styles.soal}>
                      {data &&
                      data.list_questions[parseInt(router.query.id) - 1]
                        .question_image !== null &&
                      data.list_questions[parseInt(router.query.id) - 1]
                        .question_image !== "" ? (
                        <div className="d-flex flex-row">
                          <div className="p-2">
                            {" "}
                            <Image
                              src={
                                process.env.END_POINT_API_IMAGE_SUBVIT +
                                  data.list_questions[
                                    parseInt(router.query.id) - 1
                                  ]?.question_image || defaultImage
                              }
                              alt=""
                              width={150}
                              onClick={() => setZoom(true)}
                              height={150}
                            />
                          </div>
                          <Modal show={zoom} onHide={() => setZoom(false)}>
                            <Image
                              src={
                                process.env.END_POINT_API_IMAGE_SUBVIT +
                                  data.list_questions[
                                    parseInt(router.query.id) - 1
                                  ]?.question_image || defaultImage
                              }
                              alt=""
                              width={500}
                              height={800}
                            />
                          </Modal>
                          <div className="p-5">
                            {data &&
                              data.list_questions[parseInt(router.query.id) - 1]
                                ?.question}
                          </div>
                        </div>
                      ) : (
                        <div className="p-2">
                          {data &&
                            data.list_questions[parseInt(router.query.id) - 1]
                              ?.question}
                        </div>
                      )}
                    </h1>
                    <hr />
                    {data &&
                      data?.list_questions[parseInt(router.query.id) - 1]
                        ?.answer !== null &&
                      JSON.parse(
                        data?.list_questions[parseInt(router.query.id) - 1]
                          ?.answer
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
                                    onClick={() => {
                                      setZoomJawab(true);
                                      setImageClick(item.image);
                                    }}
                                  />
                                </div>
                                <Modal
                                  show={zoomJawab}
                                  onHide={() => setZoomJawab(false)}
                                >
                                  <Image
                                    src={
                                      process.env.END_POINT_API_IMAGE_SUBVIT +
                                        imageClick || defaultImage
                                    }
                                    alt=""
                                    width={500}
                                    height={800}
                                  />
                                </Modal>
                                <div
                                  className="p-4"
                                  style={{ width: "100%", height: "100%" }}
                                >
                                  <Card
                                    className={
                                      sessionStorage.getItem(
                                        router.query.id
                                      ) === item.key
                                        ? styles.answer
                                        : styles.boxAnswer
                                    }
                                    key={index}
                                    onClick={() => {
                                      handleObject(item, index);
                                    }}
                                  >
                                    <table>
                                      <tr>
                                        <td style={{ width: "5px" }}>
                                          {item.key}
                                        </td>
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
                                  sessionStorage.getItem(router.query.id) ===
                                  item.key
                                    ? styles.answer
                                    : styles.boxAnswer
                                }
                                key={index}
                                onClick={() => {
                                  handleObject(item, index);
                                }}
                              >
                                <table>
                                  <tr>
                                    <td style={{ width: "5px" }}>{item.key}</td>
                                    <td style={{ width: "15px" }}>.</td>
                                    <td>{item.option} </td>
                                  </tr>
                                </table>
                              </Card>
                            )}
                          </>
                        );
                      })}
                  </>
                )}

              {data &&
                data.list_questions[parseInt(router.query.id) - 1].type ===
                  "multiple_choice" && (
                  <>
                    <h1 className={styles.soal}>
                      {data &&
                      data.list_questions[parseInt(router.query.id) - 1]
                        .question_image !== null &&
                      data.list_questions[parseInt(router.query.id) - 1]
                        .question_image !== "" ? (
                        <div className="d-flex flex-row">
                          <div className="p-2">
                            {" "}
                            <Image
                              src={
                                process.env.END_POINT_API_IMAGE_SUBVIT +
                                  data.list_questions[
                                    parseInt(router.query.id) - 1
                                  ]?.question_image || defaultImage
                              }
                              alt=""
                              width={150}
                              onClick={() => setZoom(true)}
                              height={150}
                            />
                          </div>
                          <Modal show={zoom} onHide={() => setZoom(false)}>
                            <Image
                              src={
                                process.env.END_POINT_API_IMAGE_SUBVIT +
                                  data.list_questions[
                                    parseInt(router.query.id) - 1
                                  ]?.question_image || defaultImage
                              }
                              alt=""
                              width={500}
                              height={800}
                            />
                          </Modal>
                          <div className="p-5">
                            {data &&
                              data.list_questions[parseInt(router.query.id) - 1]
                                ?.question}
                            <br />
                            <br />
                            <span className={styles.multipleChoice}>
                              Anda dapat memilih lebih dari 1 jawaban
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="p-2">
                          {data &&
                            data.list_questions[parseInt(router.query.id) - 1]
                              ?.question}
                          <br />
                          <br />
                          <span className={styles.multipleChoice}>
                            Anda dapat memilih lebih dari 1 jawaban
                          </span>
                        </div>
                      )}
                    </h1>
                    <hr />
                    {data &&
                      data.list_questions[parseInt(router.query.id) - 1]
                        ?.answer !== null &&
                      JSON.parse(
                        data.list_questions[parseInt(router.query.id) - 1]
                          ?.answer
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
                                    onClick={() => {
                                      setZoomJawab(true);
                                      setImageClick(item.image);
                                    }}
                                  />
                                </div>
                                <Modal
                                  show={zoomJawab}
                                  onHide={() => setZoomJawab(false)}
                                >
                                  <Image
                                    src={
                                      process.env.END_POINT_API_IMAGE_SUBVIT +
                                        imageClick || defaultImage
                                    }
                                    alt=""
                                    width={500}
                                    height={800}
                                  />
                                </Modal>
                                <div
                                  className="p-4"
                                  style={{ width: "100%", height: "100%" }}
                                >
                                  <Card
                                    className={
                                      sessionStorage.getItem(
                                        router.query.id + index + "a"
                                      ) === item.key
                                        ? styles.answer
                                        : styles.boxAnswer
                                    }
                                    key={index}
                                    onClick={() => {
                                      handleMultiple(item, index);
                                    }}
                                  >
                                    <table>
                                      <tr>
                                        <td style={{ width: "5px" }}>
                                          {item.key}
                                        </td>
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
                                  sessionStorage.getItem(
                                    router.query.id + index + "a"
                                  ) === item.key
                                    ? styles.answer
                                    : styles.boxAnswer
                                }
                                key={index}
                                onClick={() => {
                                  handleMultiple(item, index);
                                }}
                              >
                                <table>
                                  <tr>
                                    <td style={{ width: "5px" }}>{item.key}</td>
                                    <td style={{ width: "15px" }}>.</td>
                                    <td>{item.option} </td>
                                  </tr>
                                </table>
                              </Card>
                            )}
                          </>
                        );
                      })}
                  </>
                )}

              {data &&
                data.list_questions[parseInt(router.query.id) - 1].type ===
                  "pertanyaan_terbuka" && (
                  <>
                    <h1 className={styles.soal}>
                      {data &&
                      data.list_questions[parseInt(router.query.id) - 1]
                        .question_image !== null &&
                      data.list_questions[parseInt(router.query.id) - 1]
                        .question_image !== "" ? (
                        <div className="d-flex flex-row">
                          <div className="p-2">
                            {" "}
                            <Image
                              src={
                                process.env.END_POINT_API_IMAGE_SUBVIT +
                                  data.list_questions[
                                    parseInt(router.query.id) - 1
                                  ]?.question_image || defaultImage
                              }
                              alt=""
                              width={150}
                              height={150}
                              onClick={() => setZoom(true)}
                            />
                          </div>
                          <Modal show={zoom} onHide={() => setZoom(false)}>
                            <Image
                              src={
                                process.env.END_POINT_API_IMAGE_SUBVIT +
                                  data.list_questions[
                                    parseInt(router.query.id) - 1
                                  ]?.question_image || defaultImage
                              }
                              alt=""
                              width={500}
                              height={800}
                            />
                          </Modal>
                          <div className="p-5">
                            {data &&
                              data.list_questions[parseInt(router.query.id) - 1]
                                ?.question}
                          </div>
                        </div>
                      ) : (
                        <div className="p-2">
                          {data &&
                            data.list_questions[parseInt(router.query.id) - 1]
                              ?.question}
                        </div>
                      )}
                    </h1>
                    <hr />
                    <Form>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Jelaskan jawaban Anda di sini..."
                        className={styles.textArea}
                        onChange={(event) => handleAnswerText(event)}
                        value={sessionStorage.getItem(router.query.id)}
                      />
                    </Form>
                  </>
                )}

              <Row style={{ marginTop: "20px" }}>
                <Col className={styles.btnBackResponsive}>
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
                <Col
                  className={styles.btnBottom}
                  style={{ textAlign: "right", margin: "10px " }}
                >
                  {parseInt(router.query.id) === data?.total_questions ? (
                    <Button
                      className={styles.btnNext}
                      onClick={handleDone}
                      // disabled={!listAnswer.includes(data?.total_questions)}
                    >
                      Selesai
                    </Button>
                  ) : (
                    <Button
                      className={styles.btnNext}
                      onClick={handleNext}
                      disabled={
                        parseInt(router.query.id) === data?.total_questions
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
                    <Col xs={6} style={{ textAlign: "center" }}>
                      <Button
                        variant="link"
                        className={styles.btnBack}
                        onClick={handleBack}
                        disabled={parseInt(router.query.id) === 1}
                      >
                        Kembali
                      </Button>
                    </Col>

                    <Col xs={6} style={{ textAlign: "center" }}>
                      {parseInt(router.query.id) === data?.total_questions ? (
                        <Button
                          className={styles.btnNext}
                          onClick={handleDone}
                          // disabled={!listAnswer.includes(data?.total_questions)}
                          // MASIH DIPAKE UNTUK TESTING
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
                  for (let i = 0; i < sessionStorage.length; i++) {
                    const key = sessionStorage.key(i);
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
            : router.pathname.includes("mid-test")
            ? "Mid Test"
            : "Test"}
          <button type="button" className="close" onClick={handleCloseModal}>
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
        </ModalHeader>
        <ModalBody>
          {router.pathname.includes("mid-test") ? (
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
                    Alokasi waktu yang diberikan untuk mengerjakan Mid Test
                    sesuai dengan masing-masing tema pelatihan. Informasi
                    tersebut dapat di akses pada dashboard Mid Test.
                  </td>
                </tr>
                <tr>
                  <td style={{ position: "absolute" }}>3.</td>
                  <td>&nbsp;</td>
                  <td>
                    Peserta wajib menjawab seluruh soal Mid Test dan jumlah soal
                    sesuai dengan masing-masing tema pelatihan. Tidak ada nilai
                    negatif untuk jawaban yang salah.
                  </td>
                </tr>
                <tr>
                  <td style={{ position: "absolute" }}>4.</td>
                  <td>&nbsp;</td>
                  <td>
                    Setelah Mid Test dimulai, waktu tes tidak dapat
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
                    Peserta wajib menjawab seluruh survey yang berjumlah{" "}
                    {question || " "}&nbsp; pertanyaan.
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
                    Waktu yang tersedia untuk mengisi survey ini {time ||
                      " "}{" "}
                    Menit.
                  </td>
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

      {/* Modal Konfirmasi */}
      <Modal show={modalDone} onHide={handleCloseModalDone} size="lg">
        <ModalHeader className={styles.headerKonfirmasi}>
          Selesai Survey
          <button
            type="button"
            className="close"
            onClick={handleCloseModalDone}
          >
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
        </ModalHeader>
        <ModalBody className={styles.bodyKonfirmasi}>
          Apakah anda ingin menyelesaikan Survey dan mengirim semua hasil
          jawaban anda?Jika “Selesai” maka anda sudah dinyatakan selesai
          mengikuti Survey, dan anda tidak dapat memperbaiki jawaban anda.{" "}
          <br />
          <br />
          Dengan ini saya menyatakan sudah menyelesaikan Survey dengan tidak
          melakukan kecurangan dalam bentuk apapun. Saya bersedia menerima
          segala keputusan penyelengara terkait hasil Survey.
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
            <Button
              onClick={handlePage}
              className={styles.btnMulai}
              disabled={close === 1}
            >
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
    </>
  );
};

export default SubtansiUser;
