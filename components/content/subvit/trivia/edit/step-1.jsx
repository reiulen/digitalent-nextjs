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

const StepOne = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  // console.log('INI TOKEN WOY', token);

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
                    onChange={(e) => setAcademyId(e.target.value)}
                    className="form-control"
                  >
                    <option> -Pilih Akademi -</option>
                    <option value="1" selected>
                      {" "}
                      Computer Scientist{" "}
                    </option>
                    <option value="2"> Designer </option>
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
                    onChange={(e) => setThemeId(e.target.value)}
                    className="form-control"
                  >
                    <option> -Pilih Tema-</option>
                    <option value="1" selected>
                      {" "}
                      Cloud Computing{" "}
                    </option>
                    <option value="2"> UI/UX Designer </option>
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
                    onChange={(e) => setTrainingId(e.target.value)}
                    className="form-control"
                  >
                    <option> -Pilih Pelatihan-</option>
                    <option value="1" selected>
                      {" "}
                      Google Cloud Computing{" "}
                    </option>
                    <option value="2"> Adobe UI/UX Designer </option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <div className=""></div>
                <div className=" text-right">
                  <button className="btn btn-light-ghost-rounded-full mr-2">
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
