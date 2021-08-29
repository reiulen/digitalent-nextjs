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

const EditSoalTrivia = () => {
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

  const [methodAdd, setMethodAdd] = useState(survey_question_detail.type);

  const [question, setQuestion] = useState(survey_question_detail.question);
  const [question_image, setQuestionImage] = useState(
    survey_question_detail.image
  );

  const [answer, setAnswer] = useState(
    JSON.parse(survey_question_detail.answer)
  );

  const [status, setStatus] = useState(survey_question_detail.status);

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
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setQuestionImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
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

    const answers = JSON.stringify(answer);
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
          dispatch(updateSurveyQuestionDetail(id, data));
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
          dispatch(updateSurveyQuestionDetail(id, data));
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
          dispatch(updateSurveyQuestionDetail(id, data));
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
          dispatch(updateSurveyQuestionDetail(id, data));
        }
        break;
      default:
        break;
    }
  };

  const handleMethodeInput = () => {
    switch (methodAdd) {
      case "objective":
        return (
          <ObjectiveComponent
            propsAnswer={answer}
            propsStatus={status}
            sendPropsAnswer={(answers) => setAnswer(answers)}
            sendPropsStatus={(status) => setStatus(status)}
          />
        );
        break;
      case "multiple_choice":
        return (
          <MultipleChoiceComponent
            propsAnswer={answer}
            propsStatus={status}
            sendPropsAnswer={(answers) => setAnswer(answers)}
            sendPropsStatus={(status) => setStatus(status)}
          />
        );
        break;
      case "pertanyaan_terbuka":
        return "";
      case "triggered_question":
        return (
          <TriggeredQuestionComponent
            propsAnswer={answer}
            propsStatus={status}
            sendPropsAnswer={(answers) => setAnswer(answers)}
            sendPropsStatus={(status) => setStatus(status)}
          />
        );
        break;
      default:
        return (
          <ObjectiveComponent
            propsAnswer={answer}
            propsStatus={status}
            sendPropsAnswer={(answers) => setAnswer(answers)}
            sendPropsStatus={(status) => setStatus(status)}
          />
        );
        break;
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
                Soal {survey_question_detail.bank_soal + 1}
              </h3>
              <div className="card-toolbar ml-auto">
                <button className="btn btn-sm btn-primary px-6 font-weight-bold ">
                  Simpan
                </button>
              </div>
            </div>

            <div className="card-body pt-0">
              <div className="title row">
                <div className="col-md-3">
                  <Image
                    src="/assets/logo/logo-2.svg"
                    alt="logo"
                    width={204}
                    height={100}
                  />
                </div>
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
                      Choose file
                    </label>
                  </div>
                </div>
                <div className="col-md-2 d-flex my-auto">
                  {/* <button className="btn pt-0 mr-3" style={{ marginTop: '45px' }} type='button' >
                                        <Image
                                            alt="button-action"
                                            src="/assets/icon/trash-red.svg"
                                            width={20}
                                            height={30}
                                        />
                                    </button> */}
                </div>
              </div>

              <div>Jenis Pertanyaan</div>
              <div className="form-group row mt-4 ml-1 mb-3">
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
              <div className="">
                <span className="text-muted">
                  Silahkan Pilih Metode Edit Survey
                </span>
              </div>

              {handleMethodeInput()}

              <div className="col-md-10 pb-0 mb-0">
                <hr />
              </div>

              <div className="button-back">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="btn btn-sm btn-light-danger font-weight-bold"
                >
                  Kembali
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
