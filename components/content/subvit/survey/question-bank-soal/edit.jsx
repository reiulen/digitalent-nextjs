import React, { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";

import {
  clearErrors,
  updateSurveyQuestionDetail,
} from "../../../../../redux/actions/subvit/survey-question-detail.action";
import { UPDATE_SURVEY_QUESTION_DETAIL_RESET } from "../../../../../redux/types/subvit/survey-question-detail.type";

import PageWrapper from "../../../../wrapper/page.wrapper";
import LoadingPage from "../../../../LoadingPage";

import ObjectiveComponent from "./edit-soal/objective-component";
import MultipleChoiceComponent from "./edit-soal/multiple-choice-component";
import TriggeredQuestionComponent from "./edit-soal/triggered-question-component";
import PertanyaanTerbukaComponent from "./edit-soal/pertanyaan-terbuka-component";
import styles from "../../trivia/edit/step.module.css";

const EditSoalTrivia = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    loading: detailLoading,
    error: detailError,
    survey_question_detail,
  } = useSelector((state) => state.detailSurveyQuestionDetail);
  const { loading, error, success } = useSelector(
    (state) => state.updateSurveyQuestionDetail
  );
  let { id } = router.query;

  const [methodAdd, setMethodAdd] = useState(
    survey_question_detail && survey_question_detail.type
  );

  const [question, setQuestion] = useState(
    survey_question_detail && survey_question_detail.question
  );
  const [question_image, setQuestionImage] = useState(
    survey_question_detail && survey_question_detail.question_image
  );
  const [question_image_preview, setQuestionImagePreview] = useState(
    process.env.END_POINT_API_IMAGE_SUBVIT +
      (survey_question_detail && survey_question_detail.question_image_preview)
  );
  const [question_image_name, setQuestionImageName] = useState("Pilih Gambar");

  const [answer, setAnswer] = useState(
    JSON.parse(survey_question_detail && survey_question_detail.answer)
  );

  const [status, setStatus] = useState(
    survey_question_detail && survey_question_detail.status
  );

  useEffect(() => {
    if (success) {
      dispatch({
        type: UPDATE_SURVEY_QUESTION_DETAIL_RESET,
      });
      router.push({
        pathname: `/subvit/survey`,
        query: { success: true },
      });
    }
  }, [dispatch, success, router]);

  const handleSoalImage = (e) => {
    if (e.target.name === "question_image") {
      if (e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setQuestionImage(reader.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
        setQuestionImagePreview(URL.createObjectURL(e.target.files[0]));
        setQuestionImageName(e.target.files[0].name);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      dispatch({
        type: UPDATE_SURVEY_QUESTION_DETAIL_RESET,
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

    const answers = answer;
    switch (methodAdd) {
      case "objective":
        if (valid) {
          const data = {
            survey_question_bank_id:
              survey_question_detail.survey_question_bank_id,
            question,
            question_image,
            answer: answers,
            status,
            type: methodAdd,
            _method: "put",
          };
          dispatch(updateSurveyQuestionDetail(id, data, token));
        }
        break;
      case "multiple_choice":
        if (valid) {
          const data = {
            survey_question_bank_id:
              survey_question_detail.survey_question_bank_id,
            question,
            question_image,
            answer: answers,
            status,
            type: methodAdd,
            _method: "put",
          };
          dispatch(updateSurveyQuestionDetail(id, data, token));
        }
        break;
      case "pertanyaan_terbuka":
        if (valid) {
          const data = {
            survey_question_bank_id:
              survey_question_detail.survey_question_bank_id,
            question,
            question_image,
            status,
            type: methodAdd,
            _method: "put",
          };
          dispatch(updateSurveyQuestionDetail(id, data, token));
        }
        break;
      case "triggered_question":
        if (valid) {
          const data = {
            survey_question_bank_id:
              survey_question_detail.survey_question_bank_id,
            question,
            question_image,
            answer: answers,
            status,
            type: methodAdd,
            _method: "put",
          };
          dispatch(updateSurveyQuestionDetail(id, data, token));
        }
        break;
      default:
        break;
    }
  };

  const handleStatus = (status) => {
    setStatus(status);
  };

  const handleMethodeInput = () => {
    switch (methodAdd) {
      case "objective":
        return (
          <ObjectiveComponent
            propsAnswer={answer}
            propsStatus={status}
            sendPropsAnswer={(answers) => setAnswer(answers)}
            sendPropsStatus={(status) => handleStatus(status)}
          />
        );
        break;
      case "multiple_choice":
        return (
          <MultipleChoiceComponent
            propsAnswer={answer}
            propsStatus={status}
            sendPropsAnswer={(answers) => setAnswer(answers)}
            sendPropsStatus={(status) => handleStatus(status)}
          />
        );
        break;
      case "pertanyaan_terbuka":
        return (
          <PertanyaanTerbukaComponent
            propsStatus={status}
            sendPropsStatus={(status) => handleStatus(status)}
          />
        );
      case "triggered_question":
        return (
          <TriggeredQuestionComponent
            propsAnswer={answer}
            propsStatus={status}
            sendPropsAnswer={(answers) => setAnswer(answers)}
            sendPropsStatus={(status) => handleStatus(status)}
          />
        );
        break;
      default:
        return (
          <ObjectiveComponent
            propsAnswer={answer}
            propsStatus={status}
            sendPropsAnswer={(answers) => setAnswer(answers)}
            sendPropsStatus={(status) => handleStatus(status)}
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

      <div className="col-lg-12 order-1 px-0">
        {loading ? <LoadingPage loading={loading} /> : ""}
        <div className="card card-custom card-stretch gutter-b">
          <form onSubmit={handleSubmit}>
            <div className="card-header border-0 d-flex pb-0">
              <h3 className="card-title font-weight-bolder text-dark">
                Soal{" "}
                {survey_question_detail && survey_question_detail.bank_soal + 1}
              </h3>
              <div className="card-toolbar ml-auto"></div>
            </div>

            <div className="card-body pt-0">
              <div className="title row">
                {question_image != "" ? (
                  <div className="col-md-3">
                    <Image
                      src={question_image_preview}
                      alt="logo"
                      width={204}
                      height={100}
                      className="soal-image"
                      objectFit="cover"
                    />
                  </div>
                ) : (
                  ""
                )}
                <div className="col-md-7 pt-2">
                  <input
                    type="text"
                    className="form-control"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Contoh Soal"
                  />
                  <div className="custom-file mt-2">
                    <span>Gambar Pertanyaan (Opsional)</span>
                    <input
                      type="file"
                      className="custom-file-input"
                      name="question_image"
                      onChange={(e) => handleSoalImage(e)}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      {question_image_name}
                    </label>
                  </div>
                </div>
                <div className="col-md-2 d-flex my-auto"></div>
              </div>

              <div className="font-weight-bold mt-2">Jenis Pertanyaan</div>
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

              <div className="button-back float-right p-5">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className={`${styles.btnNext} btn btn-light-ghost-rounded-full mr-2`}
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  className="btn btn-primary-rounded-full text-white"
                >
                  Simpan
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};

export default EditSoalTrivia;
