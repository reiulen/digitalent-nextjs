import React, { useState, useEffect, useRef } from "react";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import SimpleReactValidator from "simple-react-validator";
import styleBtn from "../../trivia/edit/step.module.css";
import styles from "../../../../../styles/stepInput.module.css";
import Select from "react-select";

import {
  newCloneTriviaQuestionBanks,
  clearErrors,
  updatewTriviaQuestionBanks,
} from "../../../../../redux/actions/subvit/trivia-question.actions";
import { NEW_CLONE_TRIVIA_QUESTION_BANKS_RESET } from "../../../../../redux/types/subvit/trivia-question.type";

import PageWrapper from "/components/wrapper/page.wrapper";
import StepInput from "/components/StepInputClone";
import LoadingPage from "../../../../LoadingPage";

import {
  dropdownPelatihanbyTema,
  dropdownTemabyAkademi,
} from "../../../../../redux/actions/pelatihan/function.actions";
import { Form } from "react-bootstrap";

const StepOne = ({ token, tokenPermission }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, success, trivia } = useSelector(
    (state) => state.newCloneTriviaQuestionBanks
  );

  const { error: dropdownErrorAkademi, data: dataAkademi } = useSelector(
    (state) => state.drowpdownAkademi
  );

  const { isUpdated } = useSelector((state) => state.updateTriviaQuestion);

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();
  const [typeSave, setTypeSave] = useState("lanjut");

  let save = JSON.parse(localStorage.getItem("clone3"));

  const [academy_id, setAcademyId] = useState(save?.academy_id);
  const [theme_id, setThemeId] = useState(save?.theme_id);
  const [training_id, setTrainingId] = useState(save?.training_id);
  const [academyLabel, setAcademyLabel] = useState(
    save ? save.academy : "Silahkan Pilih Akademi"
  );
  const [themeLabel, setThemeLabel] = useState(
    save ? save.theme : "Silahkan Pilih Tema"
  );
  const [trainingLabel, setTrainingLabel] = useState(
    save ? save.training : "Silahkan Pilih Pelatihan"
  );
  const [category, setCategory] = useState(
    save ? save.category : "Silahkan Pilih Kategori"
  );

  useEffect(() => {
    // if (error) {
    //     dispatch(clearErrors())
    // }
    dispatch(dropdownTemabyAkademi(academy_id, token, tokenPermission));
    dispatch(dropdownPelatihanbyTema(theme_id, token, tokenPermission));
    if (isUpdated) {
      const id = router.query.id;
      if (typeSave === "lanjut") {
        router.push({
          pathname: `/subvit/trivia/clone/step-4`,
          query: { id },
        });
      } else if (typeSave === "draft") {
        router.push({
          pathname: `/subvit/trivia`,
          query: { success: true },
        });
      }
    }
  }, [
    dispatch,
    error,
    success,
    typeSave,
    router,

    academy_id,
    token,
    theme_id,
    isUpdated,
    tokenPermission,
  ]);

  const handleChangePelatihan = (e) => {
    setThemeId(e.value);
    setThemeLabel(e.label);
    setTrainingId("");
    setTrainingLabel("Silahkan Pilih Pelatihan");
  };

  const handleChangeTema = (e) => {
    setAcademyId(e.value);
    setAcademyLabel(e.label);
    setThemeId("");
    setThemeLabel("Silahkan Pilih Tema");
    setTrainingId("");
    setTrainingLabel("Silahkan Pilih Pelatihan");
  };

  const handleTraining = (e) => {
    setTrainingId(parseInt(e.value));
    setTrainingLabel(e.label);
  };

  const saveDraft = () => {
    setTypeSave("draft");
    if (error) {
      dispatch(clearErrors());
    }
    if (success) {
      dispatch({
        type: NEW_CLONE_TRIVIA_QUESTION_BANKS_RESET,
      });
    }
    if (simpleValidator.current.allValid()) {
      const data = {
        academy_id,
        theme_id,
        training_id,
        category,
      };

      dispatch(newCloneTriviaQuestionBanks(data, token));
      localStorage.removeItem("clone3");
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setTypeSave("lanjut");

    if (error) {
      dispatch(clearErrors());
    }
    if (success) {
      dispatch({
        type: NEW_CLONE_TRIVIA_QUESTION_BANKS_RESET,
      });
    }
    if (simpleValidator.current.allValid()) {
      const data = {
        academy_id: save ? save.academy_id : academy_id,
        theme_id: save ? save.theme_id : theme_id,
        training_id: save ? save.training_id : training_id,
        category: save ? save.category : category,
        _method: "put",
      };

      const setData = {
        academy: academyLabel,
        academy_id,
        theme: themeLabel,
        theme_id,
        training: trainingLabel,
        training_id,
        category,
      };

      localStorage.setItem("clone3", JSON.stringify(setData));

      dispatch(updatewTriviaQuestionBanks(router.query.id, data, token));
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
    }
  };

  const { data } = useSelector((state) => state.drowpdownTemabyAkademi);

  const { data: dataPelatihan2 } = useSelector(
    (state) => state.drowpdownPelatihanbyTema.data
  );

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  let optionsTema = [];

  data.data &&
    data.data.map((item) => {
      return optionsTema.push({ label: item.label, value: item.value });
    });

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
          <StepInput step="3"></StepInput>
          <div className="card-header border-0">
            <h2 className="card-title h2 text-dark">Tujuan Clone TRIVIA</h2>
          </div>
          <div className="card-body pt-0">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className=" col-form-label font-weight-bold">
                  Akademi
                </Form.Label>
                <Select
                  placeholder={"Silahkan Pilih Akademi"}
                  className={styles.selectForm}
                  options={dataAkademi.data}
                  value={{ label: academyLabel }}
                  onChange={(event) => handleChangeTema(event)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("akademi")
                  }
                />
                {simpleValidator.current.message(
                  "akademi",
                  academy_id || save?.academy,
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className=" col-form-label font-weight-bold">
                  Tema
                </Form.Label>
                <Select
                  isDisabled={!academy_id}
                  placeholder={"Silahkan Pilih Tema"}
                  options={optionsTema}
                  value={{ label: themeLabel }}
                  className={styles.selectForm}
                  onChange={(event) => handleChangePelatihan(event)}
                  onBlur={() => simpleValidator.current.showMessageFor("tema")}
                />
                {simpleValidator.current.message(
                  "tema",
                  theme_id || save?.theme,
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className=" col-form-label font-weight-bold">
                  Pelatihan
                </Form.Label>
                <Select
                  isDisabled={!theme_id}
                  placeholder={"Silahkan Pilih Pelatihan"}
                  options={dataPelatihan2}
                  value={{ label: trainingLabel }}
                  className={styles.selectForm}
                  onChange={(e) => handleTraining(e)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("training")
                  }
                />
                {simpleValidator.current.message(
                  "pelatihan",
                  training_id || save?.training,
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Form>
            <div className="row mt-7">
              <div className=" col-xs-12 col-sm-12 col-md-12 pt-0">
                <button
                  className={`${styleBtn.btnNext} btn btn-light-ghost-rounded-full mr-2`}
                  type="button"
                  onClick={() => {
                    router.push(
                      `/subvit/trivia/clone/step-2?id=${router.query.id}`
                    );
                  }}
                >
                  Kembali
                </button>
                <div className="float-right ">
                  <div className={styles.foldResponsive}>
                    <button
                      className={`${styles.btnNextFold} btn btn-light-ghost-rounded-full mr-2`}
                      type="button"
                      onClick={onSubmit}
                    >
                      Simpan & Lanjut
                    </button>
                    <button
                      className={`${styles.btnDraftFold} btn btn-primary-rounded-full`}
                      onClick={saveDraft}
                      type="button"
                    >
                      Simpan Draft
                    </button>
                  </div>
                  <div className={`${styles.normalBtn} row`}>
                    <div className="col-xs-6">
                      <button
                        className={`${styleBtn.btnNext} btn btn-light-ghost-rounded-full mr-2`}
                        type="button"
                        onClick={onSubmit}
                      >
                        Simpan & Lanjut
                      </button>
                    </div>
                    <div className="col-xs-6">
                      <button
                        className={` btn btn-primary-rounded-full`}
                        onClick={saveDraft}
                        type="button"
                      >
                        Simpan Draft
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default StepOne;
