import React, { useState, useEffect } from "react";

import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

import {
  newSurveyQuestionDetail,
  clearErrors,
} from "../../../../../redux/actions/subvit/survey-question-detail.action";
import { NEW_SURVEY_QUESTION_DETAIL_RESET } from "../../../../../redux/types/subvit/survey-question-detail.type";
import { useRouter } from "next/router";

import PageWrapper from "/components/wrapper/page.wrapper";
import StepInput from "/components/StepInput";
import LoadingPage from "../../../../LoadingPage";
import ObjectiveComponent from "./step-2/objective-component";
import MultipleChoiceComponent from "./step-2/multiple-choice-component";
import TriggeredQuestionComponent from "./step-2/triggered-question-component";

const StepTwo = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  let { metode, id } = router.query;
  const { loading, error, success } = useSelector(
    (state) => state.newSurveyQuestionDetail
  );
  const { survey } = useSelector((state) => state.detailSurveyQuestionBanks);

  const [methodAdd, setMethodAdd] = useState("objective");
  const [question, setSoal] = useState("");
  const [question_image, setSoalImage] = useState("");
  const [answer, setSoalList] = useState([
    { key: "A", option: "", image: "" },
    { key: "B", option: "", image: "" },
    { key: "C", option: "", image: "" },
    { key: "D", option: "", image: "" },
  ]);
  const [answer_multiple, setSoalMultipleList] = useState([
    { key: "A", option: "", image: "" },
    { key: "B", option: "", image: "" },
    { key: "C", option: "", image: "" },
    { key: "D", option: "", image: "" },
  ]);
  const [answer_triggered, setSoalTriggeredList] = useState([
    {
      key: "A",
      option: "",
      image: "",
      type: "choose",
      is_next: true,
      sub: [
        {
          key: 1,
          question: "",
          image: "",
          is_next: false,
          answer: [
            { key: "A", option: "", image: "", type: "choose" },
            { key: "B", option: "", image: "", type: "choose" },
            { key: "C", option: "", image: "", type: "choose" },
          ],
        },
      ],
    },
    {
      key: "B",
      option: "",
      image: "",
      type: "choose",
      is_next: false,
      sub: [],
    },
    {
      key: "C",
      option: "",
      image: "",
      type: "choose",
      is_next: false,
      sub: [],
    },
  ]);
  const [typeSave, setTypeSave] = useState("lanjut");

  useEffect(() => {
    if (success) {
      dispatch({
        type: NEW_SURVEY_QUESTION_DETAIL_RESET,
      });
      if (typeSave === "lanjut") {
        handleResetForm();
        router.push({
          pathname: `/subvit/survey/tambah/step-3`,
          query: { id },
        });
      } else if (typeSave === "draft") {
        handleResetForm();
        router.push({
          pathname: `/subvit/survey/tambah/step-2-${metode}`,
          query: { metode, id },
        });
      }
    }
  }, [dispatch, success, typeSave, id, metode, router]);

  const handleSoalImage = (e) => {
    if (e.target.name === "question_image") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setSoalImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const saveDraft = () => {
    setTypeSave("draft");
    let valid = true;

    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      dispatch({
        type: NEW_SURVEY_QUESTION_DETAIL_RESET,
      });
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
      case "objective":
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
            survey_question_bank_id: id,
            question,
            answer: answers,
            question_image,
            answer_key: null,
            type: methodAdd,
          };

          dispatch(newSurveyQuestionDetail(data));
        }
        break;
      case "multiple_choice":
        answer_multiple.forEach((row, j) => {
          if (row.option == "" && row.image == "") {
            valid = false;
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Isi jawaban dengan benar !",
            });
          }
        });

        const answers_multiple = JSON.stringify(answer_multiple);
        if (valid) {
          const data = {
            survey_question_bank_id: id,
            question,
            answer: answers_multiple,
            question_image,
            answer_key: null,
            type: methodAdd,
          };

          dispatch(newSurveyQuestionDetail(data));
        }
        break;
      case "pertanyaan_terbuka":
        if (valid) {
          const data = {
            survey_question_bank_id: id,
            question,
            question_image,
            type: methodAdd,
          };
          dispatch(newSurveyQuestionDetail(data));
        }
        break;
      case "triggered_question":
        answer_triggered.forEach((row, j) => {
          if (row.option == "" && row.image == "") {
            valid = false;
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Isi jawaban dengan benar !",
            });
          }
        });

        const answers_triggered = JSON.stringify(answer_triggered);
        if (valid) {
          const data = {
            survey_question_bank_id: id,
            question,
            answer: answers_triggered,
            question_image,
            answer_key: null,
            type: methodAdd,
          };

          // console.log(data)

          dispatch(newSurveyQuestionDetail(data));
        }
      default:
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setTypeSave("lanjut");
    let valid = true;

    // if (error) {
    //   dispatch(clearErrors())
    // }

    if (success) {
      dispatch({
        type: NEW_SURVEY_QUESTION_DETAIL_RESET,
      });
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
      case "objective":
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
            survey_question_bank_id: id,
            question,
            answer: answers,
            question_image,
            answer_key: null,
            type: methodAdd,
          };

          dispatch(newSurveyQuestionDetail(data));
        }
        break;
      case "multiple_choice":
        answer_multiple.forEach((row, j) => {
          if (row.option == "" && row.image == "") {
            valid = false;
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Isi jawaban dengan benar !",
            });
          }
        });

        const answers_multiple = JSON.stringify(answer_multiple);
        if (valid) {
          const data = {
            survey_question_bank_id: id,
            question,
            answer: answers_multiple,
            question_image,
            answer_key: null,
            type: methodAdd,
          };

          dispatch(newSurveyQuestionDetail(data));
        }
        break;
      case "pertanyaan_terbuka":
        if (valid) {
          const data = {
            survey_question_bank_id: id,
            question,
            question_image,
            type: methodAdd,
          };
          dispatch(newSurveyQuestionDetail(data));
        }
        break;
      case "triggered_question":
        answer_triggered.forEach((row, j) => {
          if (row.option == "" && row.image == "") {
            valid = false;
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Isi jawaban dengan benar !",
            });
          }
        });

        const answers_triggered = JSON.stringify(answer_triggered);
        if (valid) {
          const data = {
            survey_question_bank_id: id,
            question,
            answer: answers_triggered,
            question_image,
            answer_key: null,
            type: methodAdd,
          };

          dispatch(newSurveyQuestionDetail(data));
        }
      default:
        break;
    }
  };

  const handleMethodeInput = () => {
    switch (methodAdd) {
      case "objective":
        return (
          <ObjectiveComponent props_answer={(answer) => setSoalList(answer)} />
        );
      case "multiple_choice":
        return (
          <MultipleChoiceComponent
            props_answer={(answer) => setSoalMultipleList(answer)}
          />
        );
      case "pertanyaan_terbuka":
        return "";
      case "triggered_question":
        return (
          <TriggeredQuestionComponent
            props_answer={(answer) => setSoalTriggeredList(answer)}
          />
        );
      default:
        return (
          <ObjectiveComponent
            props_answer={(answer) => setSoalList(answer)}
            props_answer_key={(key) => setAnswerKey(key)}
          />
        );
    }
  };

  const handleResetForm = () => {
    setMethodAdd("objective");
    setSoal("");
    setSoalImage("");
    setSoalList([
      { key: "A", option: "", image: "" },
      { key: "B", option: "", image: "" },
      { key: "C", option: "", image: "" },
      { key: "D", option: "", image: "" },
    ]);
    setSoalMultipleList([
      { key: "A", option: "", image: "" },
      { key: "B", option: "", image: "" },
      { key: "C", option: "", image: "" },
      { key: "D", option: "", image: "" },
    ]);
    setSoalTriggeredList([
      {
        key: "A",
        option: "",
        image: "",
        type: "choose",
        is_next: true,
        sub: [
          {
            key: 1,
            question: "",
            image: "",
            is_next: false,
            answer: [
              { key: "A", option: "", image: "", type: "choose" },
              { key: "B", option: "", image: "", type: "choose" },
              { key: "C", option: "", image: "", type: "choose" },
            ],
          },
        ],
      },
      {
        key: "B",
        option: "",
        image: "",
        type: "choose",
        is_next: false,
        sub: [],
      },
      {
        key: "C",
        option: "",
        image: "",
        type: "choose",
        is_next: false,
        sub: [],
      },
    ]);
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
          <StepInput step="2"></StepInput>
          <div className="card-header border-0">
            <h2 className="card-title h2 text-dark">
              Soal {survey.bank_soal + 1}
            </h2>
          </div>
          <div className="card-body pt-0">
            <form onSubmit={onSubmit}>
              <div className="form-group row mb-0">
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
                    placeholder="Isi Pertanyaan"
                    value={question}
                    onChange={(e) => setSoal(e.target.value)}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 col-md-12">
                  <label
                    htmlFor="staticEmail"
                    className=" col-form-label font-weight-bold "
                  >
                    Gambar Pertanyaan (Optional)
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
                      Choose file
                    </label>
                  </div>
                  <span className="text-muted">
                    (Maksimal ukuran file 5 MB)
                  </span>
                </div>
              </div>

              <div>Jenis Pertanyaan</div>
              <div className="form-group row mt-4 mb-3">
                <div className="col-sm-12 col-md-8">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="objective"
                      checked={methodAdd === "objective"}
                      onChange={() => setMethodAdd("objective")}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      Objective
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      value="multiple_choice"
                      checked={methodAdd === "multiple_choice"}
                      onChange={() => setMethodAdd("multiple_choice")}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio2">
                      Multiple Choice
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio3"
                      value="pertanyaan_terbuka"
                      checked={methodAdd === "pertanyaan_terbuka"}
                      onChange={() => setMethodAdd("pertanyaan_terbuka")}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio3">
                      Pertanyaan Terbuka
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio4"
                      value="triggered_question"
                      checked={methodAdd === "triggered_question"}
                      onChange={() => setMethodAdd("triggered_question")}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio4">
                      Triggered Question
                    </label>
                  </div>
                </div>
              </div>

              {handleMethodeInput()}

              <div className="form-group row">
                <div className="col-sm-2"></div>
                <div className="col-sm-10 text-right">
                  <button
                    className="btn btn-light-ghost-rounded-full mr-2"
                    type="submit"
                  >
                    Simpan & Lanjut
                  </button>
                  <button
                    className="btn btn-primary-rounded-full"
                    onClick={saveDraft}
                    type="button"
                  >
                    Simpan Draft
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default StepTwo;
