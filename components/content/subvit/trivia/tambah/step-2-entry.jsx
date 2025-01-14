import React, { useState, useEffect } from "react";

import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  newTriviaQuestionDetail,
  clearErrors,
} from "../../../../../redux/actions/subvit/trivia-question-detail.action";
import { NEW_TRIVIA_QUESTION_DETAIL_RESET } from "../../../../../redux/types/subvit/trivia-question-detail.type";
import { useRouter } from "next/router";

import PageWrapper from "/components/wrapper/page.wrapper";
import StepInput from "/components/StepInput";
import StepInputClone from "/components/StepInputClone";
import LoadingPage from "../../../../LoadingPage";

import PollingComponent from "./step-2/polling-component";
import CheckboxComponent from "./step-2/checkbox-component";
import BlankComponent from "./step-2/blank-component";
import styles from "../edit/step.module.css";

const StepTwo = ({ token, tokenPermission }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  let { metode, id } = router.query;
  const { loading, error, success } = useSelector(
    (state) => state.newTriviaQuestionDetail
  );
  const { trivia } = useSelector((state) => state.detailTriviaQuestionBanks);

  const [methodAdd, setMethodAdd] = useState(
    (localStorage.getItem("step2") &&
      JSON.parse(localStorage.getItem("step2")).type) ||
      "polling"
  );
  const [question, setSoal] = useState(
    (localStorage.getItem("step2") &&
      JSON.parse(localStorage.getItem("step2")).question) ||
      ""
  );
  const [question_image_name, setImageName] = useState(
    (localStorage.getItem("step2") &&
      JSON.parse(localStorage.getItem("step2")).question_image_name) ||
      "Pilih Gambar"
  );
  const [question_image, setSoalImage] = useState(
    (localStorage.getItem("step2") &&
      JSON.parse(localStorage.getItem("step2")).question_image) ||
      ""
  );

  // polling
  const [answer, setSoalList] = useState([
    { key: "A", option: "", image: "" },
    { key: "B", option: "", image: "" },
    { key: "C", option: "", image: "" },
    { key: "D", option: "", image: "" },
  ]);

  //checkbox
  const [answer_checkbox, setCheckboxList] = useState([
    { key: "A", value: "", option: "", image: "", is_right: false },
    { key: "B", value: "", option: "", image: "", is_right: false },
    { key: "C", value: "", option: "", image: "", is_right: false },
    { key: "D", value: "", option: "", image: "", is_right: false },
  ]);
  const [duration, setDuration] = useState(
    (localStorage.getItem("step2") &&
      JSON.parse(localStorage.getItem("step2")).duration) ||
      null
  );
  //blank
  const [answer_blank, setBlanklList] = useState([
    { key: "A", value: "", type: "", option: "", image: "" },
    { key: "B", value: "", type: "", option: "", image: "" },
    { key: "C", value: "", type: "", option: "", image: "" },
    { key: "D", value: "", type: "", option: "", image: "" },
  ]);

  const [durationBlank, setDurationBlank] = useState(
    (localStorage.getItem("step2") &&
      JSON.parse(localStorage.getItem("step2")).duration) ||
      null
  );

  const [answer_key, setAnswerKey] = useState(
    (localStorage.getItem("step2") &&
      JSON.parse(localStorage.getItem("step2")).answer_key) ||
      ""
  );
  const [typeSave, setTypeSave] = useState("lanjut");

  useEffect(() => {
    if (success) {
      dispatch({
        type: NEW_TRIVIA_QUESTION_DETAIL_RESET,
      });
      if (typeSave === "lanjut") {
        handleResetForm();
        if (localStorage.getItem("detail-entry") !== null) {
          router.push(localStorage.getItem("detail-entry"));
          localStorage.removeItem("detail-entry");
          localStorage.removeItem("step2");
          localStorage.removeItem("step1");
        } else {
          router.push({
            pathname: `/subvit/trivia/tambah/step-3`,
            query: { id },
          });
        }
      } else if (typeSave === "draft") {
        handleResetForm();
        if (router.query.metode) {
          router.push({
            pathname: `/subvit/trivia/tambah/step-2-${metode}`,
            query: { metode, id },
          });
        } else {
          router.push({
            pathname: `/subvit/trivia/tambah/step-2-entry`,
            query: { id },
          });
        }

        window.location.reload();
      }
    }
  }, [dispatch, success, typeSave, id, metode, router]);

  const handleSoalImage = (e) => {
    if (e.target.name === "question_image") {
      if (e.target.files[0].size > 5000000) {
        setImageName("");
        e.target.value = null;
        Swal.fire("Oops !", "Gambar maksimal 5 MB.", "error");
      } else {
        setImageName(e.target.files[0].name);
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setSoalImage(reader.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  };

  const handleResetForm = () => {
    setImageName("");
    setSoal("");
    setSoalImage("");
    setSoalList([
      { key: "A", option: "", image: "", imageName: "" },
      { key: "B", option: "", image: "", imageName: "" },
      { key: "C", option: "", image: "", imageName: "" },
      { key: "D", option: "", image: "", imageName: "" },
    ]);
    setCheckboxList([
      {
        key: "A",
        value: "",
        option: "",
        image: "",
        imageName: "",
        is_right: false,
      },
      {
        key: "B",
        value: "",
        option: "",
        image: "",
        imageName: "",
        is_right: false,
      },
      {
        key: "C",
        value: "",
        option: "",
        image: "",
        imageName: "",
        is_right: false,
      },
      {
        key: "D",
        value: "",
        option: "",
        image: "",
        imageName: "",
        is_right: false,
      },
    ]);
    setDuration("");
    setBlanklList([
      { key: "A", value: "", type: "", option: "", image: "", imageName: "" },
      { key: "B", value: "", type: "", option: "", image: "", imageName: "" },
      { key: "C", value: "", type: "", option: "", image: "", imageName: "" },
      { key: "D", value: "", type: "", option: "", image: "", imageName: "" },
    ]);
    setDurationBlank("");
    setAnswerKey("");
  };

  const saveDraft = () => {
    setTypeSave("draft");
    let valid = true;

    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      dispatch(
        {
          type: NEW_TRIVIA_QUESTION_DETAIL_RESET,
        },
        token
      );
    }

    if (question == "" && question_image == "") {
      valid = false;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi pertanyaan dengan benar !",
      });
    }

    switch (methodAdd) {
      case "polling":
        answer.forEach((row, j) => {
          if (row.option == "" && row.image == "") {
            valid = false;
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Isi jawaban dengan benar !",
            });
          }
        });

        const answers = JSON.stringify(answer);
        if (valid) {
          const data = {
            trivia_question_bank_id: id,
            question,
            answer: answers,
            question_image,
            answer_key: null,
            type: methodAdd,
          };

          dispatch(newTriviaQuestionDetail(data, token, tokenPermission));
          localStorage.removeItem("method");
          localStorage.removeItem("step2");
        }
        break;
      case "checkbox":
        answer_checkbox.forEach((row, j) => {
          if (row.option == "" && row.image == "") {
            valid = false;
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Isi jawaban dengan benar !",
            });
          }
        });

        const answers_check = JSON.stringify(answer_checkbox);
        if (valid) {
          const data = {
            trivia_question_bank_id: id,
            question,
            answer: answers_check,
            question_image,

            duration,
            type: methodAdd,
          };
          dispatch(newTriviaQuestionDetail(data, token, tokenPermission));
          localStorage.removeItem("method");
          localStorage.removeItem("step2");
        }
        break;
      case "fill_in_the_blank":
        const answers_blank = JSON.stringify(answer_blank);
        if (valid) {
          const data = {
            trivia_question_bank_id: id,
            question,
            answer: answers_blank,
            question_image,
            answer_key,
            duration: durationBlank,
            type: methodAdd,
            answer_key: null,
          };
          dispatch(newTriviaQuestionDetail(data, token, tokenPermission));
          localStorage.removeItem("method");
          localStorage.removeItem("step2");
        }
        break;
      default:
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setTypeSave("lanjut");
    let valid = true;

    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      dispatch(
        {
          type: NEW_TRIVIA_QUESTION_DETAIL_RESET,
        },
        token
      );
    }

    if (question == "" && question_image == "") {
      valid = false;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi pertanyaan dengan benar !",
      });
    }

    switch (methodAdd) {
      case "polling":
        answer.forEach((row, j) => {
          if (row.option == "" && row.image == "") {
            valid = false;
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Isi jawaban dengan benar !",
            });
          }
        });

        const answers = JSON.stringify(answer);
        if (valid) {
          const data = {
            trivia_question_bank_id: id,
            question,
            answer: answers,
            question_image,
            question_image_name,
            answer_key: null,
            type: methodAdd,
          };
          localStorage.setItem("step2", JSON.stringify(data));
          localStorage.setItem("method", "entry" || metode);
          dispatch(newTriviaQuestionDetail(data, token, tokenPermission));
        }
        break;
      case "checkbox":
        answer_checkbox.forEach((row, j) => {
          if (row.option == "" && row.image == "") {
            valid = false;
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Isi jawaban dengan benar !",
            });
          }
        });

        const answers_check = JSON.stringify(answer_checkbox);
        if (valid) {
          const data = {
            trivia_question_bank_id: id,
            question,
            answer: answers_check,
            question_image,
            answer_key,
            duration,
            type: methodAdd,
          };
          localStorage.setItem("step2", JSON.stringify(data));
          localStorage.setItem("method", "entry" || metode);
          dispatch(newTriviaQuestionDetail(data, token, tokenPermission));
        }
        break;
      case "fill_in_the_blank":
        const answers_blank = JSON.stringify(answer_blank);
        if (valid) {
          const data = {
            trivia_question_bank_id: id,
            question,
            answer: answers_blank,
            question_image,
            answer_key,
            duration: durationBlank,
            type: methodAdd,
            answer_key: null,
          };
          // console.log(data);
          localStorage.setItem("step2", JSON.stringify(data));
          localStorage.setItem("method", "entry" || metode);
          dispatch(newTriviaQuestionDetail(data, token, tokenPermission));
        }
        break;
      default:
        break;
    }
  };

  const handleMethodeInput = () => {
    switch (methodAdd) {
      case "polling":
        return (
          <PollingComponent
            answer={answer}
            props_answer={(answer) => setSoalList(answer)}
          />
        );
        break;
      case "checkbox":
        return (
          <CheckboxComponent
            answer={answer_checkbox}
            props_answer={(answer) => setCheckboxList(answer)}
            props_answer_key={(key) => setAnswerKey(key)}
            props_duration={(duration) => setDuration(duration)}
          />
        );
        break;
      case "fill_in_the_blank":
        return (
          <BlankComponent
            answer={answer_blank}
            props_answer={(answer) => setBlanklList(answer)}
            props_duration={(duration) => setDurationBlank(duration)}
          />
        );
        break;
      default:
        return (
          <PollingComponent
            answer={answer}
            props_answer={(answer) => setSoalList(answer)}
          />
        );
        break;
    }
  };

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  return (
    <PageWrapper>
      {error ? (
        <div
          className="alert alert-custom alert-light-danger fade show mb-5"
          role="alert"
        >
          <div className="alert-icon">
            <i className="flaticon-warning"></i>
          </div>
          <div className="alert-text">{error}</div>
          <div className="alert-close">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={handleResetError}
            >
              <span aria-hidden="true">
                <i className="ki ki-close"></i>
              </span>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="col-lg-12 order-1 order-xxl-2 px-0">
        {loading ? <LoadingPage loading={loading} /> : ""}
        <div className="card card-custom card-stretch gutter-b">
          {localStorage.getItem("clone") === "true" ? (
            <StepInputClone step="3" />
          ) : (
            <StepInput step="2" title="Trivia"></StepInput>
          )}
          <div className="card-header border-0">
            <h2 className="card-title h2 text-dark">
              Soal {trivia && trivia.bank_soal + 1}
            </h2>
          </div>
          <div className="card-body pt-0">
            <form onSubmit={onSubmit}>
              <div className="form-group row mb-1">
                <div className="col-sm-12 col-md-12">
                  <label
                    htmlFor="staticEmail"
                    className=" col-form-label font-weight-bold "
                  >
                    Pertanyaan
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={question}
                    onChange={(e) => setSoal(e.target.value)}
                    autoComplete="off"
                    placeholder="Isi Pertanyaan"
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 col-md-12">
                  <label
                    htmlFor="staticEmail"
                    className=" col-form-label font-weight-bold "
                  >
                    Input Gambar (Optional)
                  </label>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      name="question_image"
                      onChange={(e) => handleSoalImage(e)}
                      accept="image/png, image/gif, image/jpeg , image/jpg"
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      {question_image_name}
                    </label>
                  </div>
                </div>
              </div>

              <div className="font-weight-bold">Jenis Pertanyaan</div>
              <div className="form-group row mt-4 mb-3">
                <div className="col-sm-12 col-md-8 col-xs-4">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="polling"
                      checked={methodAdd === "polling"}
                      onChange={() => setMethodAdd("polling")}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      Polling
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      value="checkbox"
                      checked={methodAdd === "checkbox"}
                      onChange={() => setMethodAdd("checkbox")}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio2">
                      Checkbox
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio3"
                      value="fill_in_the_blank"
                      checked={methodAdd === "fill_in_the_blank"}
                      onChange={() => setMethodAdd("fill_in_the_blank")}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio3">
                      Fill in the blank
                    </label>
                  </div>
                </div>
              </div>

              {handleMethodeInput()}

              <div className="form-group row flex-column">
                <div className="col-sm-12">
                  <hr />
                  <div className="row">
                    {(localStorage.getItem("detail-entry") !== null ||
                      localStorage.getItem("clone") !== null) && (
                      <div className="col-md-2">
                        <button
                          className={`${styles.btnNext} btn btn-light-ghost-rounded-full mr-2`}
                          type="button"
                          onClick={() => {
                            if (localStorage.getItem("clone") === "true") {
                              router.push(
                                `/subvit/trivia/clone/step-3?id=${router.query.id}`
                              );
                            } else {
                              if (
                                localStorage.getItem("detail-entry") !== null
                              ) {
                                router.push(
                                  localStorage.getItem("detail-entry")
                                );
                                localStorage.removeItem("detail-entry");
                              } else {
                                router.push("/subvit/trivia/tambah");
                              }
                            }
                          }}
                        >
                          Kembali
                        </button>
                      </div>
                    )}
                    {/* <div className="col-sm-12 col-md-6 col-lg-6 col-xl-5 buttoon float-right row justify-content-between" style={{border:'1px solid black'}}> */}
                    <div
                      className={
                        localStorage.getItem("detail-entry") !== null
                          ? `col-sm-10 text-right`
                          : `col-sm-12 text-right`
                      }
                    >
                      <div className="d-flex flex-row float-right flex-wrap">
                        <div className={`p-2`}>
                          <button
                            className={`${styles.btnNext} btn btn-light-ghost-rounded-full `}
                            type="submit"
                          >
                            Simpan & Lanjut
                          </button>
                        </div>
                        <div className="p-2">
                          <button
                            className=" btn btn-primary-rounded-full"
                            onClick={saveDraft}
                            type="button"
                          >
                            Tambah Soal
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="col-sm-2"></div> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default StepTwo;
