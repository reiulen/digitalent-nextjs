import React, { useState, useEffect } from "react";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  updatewTriviaQuestionBanks,
  clearErrors,
} from "../../../../../redux/actions/subvit/trivia-question.actions";
import { UPDATE_TRIVIA_QUESTION_BANKS_PUBLISH_RESET } from "../../../../../redux/types/subvit/trivia-question.type";

import PageWrapper from "/components/wrapper/page.wrapper";
import StepInputPublish from "/components/StepInputPublish";
import LoadingPage from "../../../../LoadingPage";
import styles from "./step.module.css";

const StepOne = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  let { id } = router.query;

  const { error: detailData, trivia } = useSelector(
    (state) => state.detailTriviaQuestionBanks
  );
  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateTriviaQuestion
  );

  const [typeSave, setTypeSave] = useState("lanjut");
  const [academy_id, setAcademyId] = useState(trivia.academy_id);
  const [theme_id, setThemeId] = useState(trivia.theme_id);
  const [training_id, setTrainingId] = useState(trivia.training_id);

  useEffect(() => {
    // if (error) {
    //     dispatch(clearErrors())
    // }

    if (isUpdated) {
      dispatch({
        type: UPDATE_TRIVIA_QUESTION_BANKS_PUBLISH_RESET,
      });
      if (typeSave === "lanjut") {
        router.push({
          pathname: `/subvit/trivia/edit/step-2`,
          query: { id },
        });
      } else if (typeSave === "draft") {
        router.push({
          pathname: `/subvit/trivia`,
          query: { success: true },
        });
      }
    }
  }, [dispatch, error, isUpdated, id, router, typeSave]);

  // const saveAndContinue = () => {
  //   router.push("/subvit/substansi/edit/step-2");
  // };

  const saveDraft = () => {
    setTypeSave("draft");
    const data = {
      academy_id,
      theme_id,
      training_id,
      _method: "put",
    };
    dispatch(updatewTriviaQuestionBanks(id, data, token));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setTypeSave("lanjut");

    const data = {
      academy_id,
      theme_id,
      training_id,
      _method: "put",
    };
    dispatch(updatewTriviaQuestionBanks(id, data, token));
  };

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  const handleTheme = (e) => {
    setThemeId(e.target.value);
  };

  const handleAcademy = (e) => {
    setAcademyId(e.target.value);
  };

  const handleTraining = (e) => {
    setTrainingId(e.target.value);
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
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        {loading ? <LoadingPage loading={loading} /> : ""}
        <div className="card card-custom card-stretch gutter-b">
          <StepInputPublish step="1"></StepInputPublish>
          <div className="card-header border-0">
            <h2 className="card-title h2 text-dark">Publish Soal</h2>
          </div>
          <div className="card-body pt-0">
            <form onSubmit={onSubmit}>
              <div className="form-group mb-2">
                <label
                  htmlFor="staticEmail"
                  className=" col-form-label font-weight-bold"
                >
                  Akademi
                </label>
                <div className="">
                  <select
                    name="academy_id"
                    id=""
                    onChange={(event) => handleAcademy(event)}
                    className="form-control"
                    defaultValue={academy_id}
                  >
                    <option value="" disabled>
                      {" "}
                      -Pilih Akademi -
                    </option>
                    <option value={1} selected>
                      {" "}
                      VSGA{" "}
                    </option>
                    <option value={2}> FGA </option>
                    <option value={3}>PRO</option>
                    <option value={4}>TA</option>
                    <option value={5}>GTA</option>
                    <option value={6}>DEA</option>
                    <option value={7}> TSA</option>
                  </select>
                </div>
              </div>

              <div className="form-group mb-2">
                <label
                  htmlFor="staticEmail"
                  className=" col-form-label font-weight-bold"
                >
                  Tema
                </label>
                <div className="">
                  <select
                    name="the_id"
                    id=""
                    onChange={(event) => handleTheme(event)}
                    className="form-control"
                    defaultValue={theme_id}
                  >
                    <option value="" disabled>
                      -Pilih Tema-
                    </option>
                    <option value="1" selected>
                      {""}
                      Cloud Computing Analyst{""}
                    </option>
                    <option value="2"> Data Management Staff </option>
                    <option value="3"> Artificial Intelligence </option>
                    <option value="4"> Cloud Computing </option>
                    <option value="5"> Data Science Fundamental </option>
                    <option value="6"> Get Connected</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label
                  htmlFor="staticEmail"
                  className=" col-form-label font-weight-bold"
                >
                  Pelatihan
                </label>
                <div className="">
                  <select
                    name="training_id"
                    id=""
                    onChange={(event) => handleTraining(event)}
                    className="form-control"
                    defaultValue={training_id}
                  >
                    <option value="" disabled>
                      {" "}
                      -Pilih Pelatihan-
                    </option>
                    <option value="1"> Mobile App Flutter</option>
                    <option value="2"> Mobile App React Native </option>
                    <option value="3"> Web Backend Laravel </option>
                    <option value="4"> Web Backend Golang </option>
                    <option value="5"> Web Backend Node Js </option>
                    <option value="6"> Web Backend Python </option>
                    <option value="7"> Frontend Web React Js </option>
                    <option value="8"> Frontend Web Vue Js </option>
                    <option value="9"> Machine Learning </option>
                    <option value="10">UI / UX Design</option>
                    {/* <option value={1} selected>
                      {" "}
                      Google Cloud Computing{" "}
                    </option>
                    <option value={2}> Adobe UI/UX Designer </option> */}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <div className=""></div>
                <div className=" text-right">
                  <button
                    className={`${styles.btnNext} btn btn-light-ghost-rounded-full mr-2`}
                  >
                    Simpan & Lanjut
                  </button>
                  <button
                    className="btn btn-primary-rounded-full text-white"
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

export default StepOne;
