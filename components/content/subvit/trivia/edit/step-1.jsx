import React, { useState, useEffect, useRef } from "react";

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
import Select from "react-select";
import SimpleReactValidator from "simple-react-validator";

import {
  dropdownPelatihanbyTema,
  dropdownTemabyAkademi,
} from "../../../../../redux/actions/pelatihan/function.actions";

import { Form } from "react-bootstrap";

const StepOne = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { error: dropdownErrorAkademi, data: dataAkademi } = useSelector(
    (state) => state.drowpdownAkademi
  );

  let { id } = router.query;

  const { error: detailData, trivia } = useSelector(
    (state) => state.detailTriviaQuestionBanks
  );
  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateTriviaQuestion
  );

  const [typeSave, setTypeSave] = useState("lanjut");
  const [academy_id, setAcademyId] = useState(trivia && trivia.academy_id);
  const [theme_id, setThemeId] = useState(trivia && trivia.theme_id);
  const [training_id, setTrainingId] = useState(trivia && trivia.training_id);
  const [academyLabel, setAcademyLabel] = useState(
    (trivia && trivia.academy.name) || "Silahkan Pilih Akademi"
  );
  const [themeLabel, setThemeLabel] = useState(
    (trivia && trivia.theme.name) || "Silahkan Pilih Tema"
  );
  const [trainingLabel, setTrainingLabel] = useState(
    (trivia && trivia.training.name) || "Silahkan Pilih Pelatihan"
  );

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

  useEffect(() => {
    dispatch(dropdownTemabyAkademi(academy_id, token));
    dispatch(dropdownPelatihanbyTema(theme_id, token));
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
  }, [
    dispatch,
    error,
    isUpdated,
    id,
    router,
    typeSave,
    academy_id,
    token,
    theme_id,
    trivia,
  ]);

  // const saveAndContinue = () => {
  //   router.push("/subvit/substansi/edit/step-2");
  // };

  const saveDraft = () => {
    setTypeSave("draft");
    if (simpleValidator.current.allValid()) {
      const data = {
        academy_id,
        theme_id,
        training_id,
        _method: "put",
      };
      dispatch(updatewTriviaQuestionBanks(id, data, token));
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi data dengan benar !",
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setTypeSave("lanjut");

    if (simpleValidator.current.allValid()) {
      const data = {
        academy_id,
        theme_id,
        training_id,
        _method: "put",
      };
      dispatch(updatewTriviaQuestionBanks(id, data, token));
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi data dengan benar !",
      });
    }
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
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        {loading ? <LoadingPage loading={loading} /> : ""}
        <div className="card card-custom card-stretch gutter-b">
          <StepInputPublish step="1"></StepInputPublish>
          <div className="card-header border-0">
            <h2 className="card-title h2 text-dark">Publish Soal</h2>
          </div>
          <div className="card-body pt-0">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className=" col-form-label font-weight-bold">
                  Akademi
                </Form.Label>
                <Select
                  placeholder={trivia ? academyLabel : "Silahkan Pilih Akademi"}
                  className={styles.selectForm}
                  options={dataAkademi.data}
                  value={academyLabel}
                  onChange={(event) => handleChangeTema(event)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("akademi")
                  }
                />
                {simpleValidator.current.message(
                  "akademi",
                  academyLabel,
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
                  placeholder={trivia ? themeLabel : "Silahkan Pilih Tema"}
                  options={optionsTema}
                  value={themeLabel}
                  className={styles.selectForm}
                  onChange={(event) => handleChangePelatihan(event)}
                  onBlur={() => simpleValidator.current.showMessageFor("tema")}
                />
                {simpleValidator.current.message("tema", theme_id, "required", {
                  className: "text-danger",
                })}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className=" col-form-label font-weight-bold">
                  Pelatihan
                </Form.Label>
                <Select
                  placeholder={
                    trivia ? trainingLabel : "Silahkan Pilih Pelatihan"
                  }
                  options={dataPelatihan2}
                  value={trainingLabel}
                  className={styles.selectForm}
                  onChange={(e) => handleTraining(e)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("training")
                  }
                />
                {simpleValidator.current.message(
                  "pelatihan",
                  training_id,
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Form>

            <div className="form-group mt-10">
              <div className=""></div>
              <div className=" text-right">
                <button
                  className={`${styles.btnNext} btn btn-light-ghost-rounded-full mr-2`}
                  onClick={onSubmit}
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
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default StepOne;
