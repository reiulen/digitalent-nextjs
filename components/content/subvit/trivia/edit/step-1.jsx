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

import {
  dropdownPelatihanbyTema,
  dropdownTemabyAkademi,
} from "../../../../../redux/actions/pelatihan/function.actions";
import axios from "axios";

const StepOne = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { error: dropdownErrorAkademi, data: dataAkademi } = useSelector(
    (state) => state.drowpdownAkademi
  );

  const { data: dataTema } = useSelector((state) => state.drowpdownTema.data);

  const { data: dataPelatihan } = useSelector(
    (state) => state.drowpdownPelatihan.data
  );

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
    optionPelatihan;
    dispatch(dropdownTemabyAkademi(academy_id, token));
    dispatch(dropdownPelatihanbyTema(theme_id, token));
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

  const { data } = useSelector((state) => state.drowpdownTemabyAkademi);

  const { data: dataPelatihan2 } = useSelector(
    (state) => state.drowpdownPelatihanbyTema.data
  );

  const [optionPelatihan, setOptionPelatihan] = useState([]);

  const handleChangePelatihan = (e) => {
    setThemeId(e.target.value);
  };

  const handleChangeTema = (e) => {
    setAcademyId(e.target.value);

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get(
        process.env.END_POINT_API_PELATIHAN +
          `api/v1/tema/dropdown-tema-by-akademi?akademi_id=${e.target.value}`,
        config
      )
      .then((res) => {
        const id = res.data.data.map((item) => {
          return item.value;
        });

        axios
          .get(
            process.env.END_POINT_API_PELATIHAN +
              `api/v1/pelatihan/dropdown-pelatihan-tema?id=${theme_id}`,
            config
          )
          .then((res) => {
            setOptionPelatihan(res.data.data);
          });
      });
  };

  const handleTraining = (e) => {
    setTrainingId(parseInt(e.target.value));
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
                    onChange={(event) => handleChangeTema(event)}
                    className="form-control"
                    defaultValue={academy_id}
                  >
                    <option selected disabled value="">
                      {" "}
                      -Pilih Akademi -
                    </option>
                    {dataAkademi.data.map((item, index) => {
                      return (
                        <>
                          <option value={item.value} key={index}>
                            {" "}
                            {item.label}{" "}
                          </option>
                        </>
                      );
                    })}
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
                    onChange={(event) => handleChangePelatihan(event)}
                    className="form-control"
                    defaultValue={theme_id}
                  >
                    {trivia.academy &&
                      trivia.academy_id !== parseInt(academy_id) && (
                        <option selected value="">
                          {" "}
                          -Pilih Tema-
                        </option>
                      )}
                    )
                    {data.data &&
                      data.data.map((item, index) => {
                        return (
                          <>
                            <option
                              value={item.value}
                              key={index}
                              defaultValue={item.value}
                            >
                              {item.label}
                            </option>
                          </>
                        );
                      })}
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
                    {trivia.academy_id !== parseInt(academy_id) && (
                      <option selected value="">
                        {" "}
                        -Pilih Pelatihan-
                      </option>
                    )}
                    {dataPelatihan2 &&
                      dataPelatihan2.map((item, index) => {
                        return (
                          <>
                            <option value={item.value} key={index} selected>
                              {item.label}
                            </option>
                          </>
                        );
                      })}
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
