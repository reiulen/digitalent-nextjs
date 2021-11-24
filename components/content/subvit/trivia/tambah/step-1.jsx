import React, { useState, useEffect, useRef } from "react";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import {
  newTriviaQuestionBanks,
  clearErrors,
} from "../../../../../redux/actions/subvit/trivia-question.actions";
import { NEW_TRIVIA_QUESTION_BANKS_RESET } from "../../../../../redux/types/subvit/trivia-question.type";

import PageWrapper from "/components/wrapper/page.wrapper";
import StepInput from "/components/StepInput";
import LoadingPage from "../../../../LoadingPage";
import styles from "../edit/step.module.css";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";
import Select from "react-select";

import {
  dropdownPelatihanbyTema,
  dropdownTemabyAkademi,
} from "../../../../../redux/actions/pelatihan/function.actions";
import { Form } from "react-bootstrap";

const TambahTriviaStepOne = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, success, trivia } = useSelector(
    (state) => state.newTriviaQuestionBanks
  );

  const { error: dropdownErrorAkademi, data: dataAkademi } = useSelector(
    (state) => state.drowpdownAkademi
  );

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();
  const [typeSave, setTypeSave] = useState("lanjut");

  const [academy_id, setAcademyId] = useState("");
  const [theme_id, setThemeId] = useState("");
  const [training_id, setTrainingId] = useState("");
  const [academyLabel, setAcademyLabel] = useState("Silahkan Pilih Akademi");
  const [themeLabel, setThemeLabel] = useState("Silahkan Pilih Tema");
  const [trainingLabel, setTrainingLabel] = useState(
    "Silahkan Pilih Pelatihan"
  );

  const [metode, setMetode] = useState("entry");

  useEffect(() => {
    dispatch(dropdownTemabyAkademi(academy_id, token));
    dispatch(dropdownPelatihanbyTema(theme_id, token));
    if (success) {
      const id = trivia.id;
      if (typeSave === "lanjut") {
        router.push({
          pathname: `/subvit/trivia/tambah/step-2-${metode}`,
          query: { id, metode },
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
    metode,
    trivia,
    academy_id,
    token,
    theme_id,
  ]);

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

  const saveDraft = () => {
    setTypeSave("draft");
    if (error) {
      dispatch(clearErrors());
    }
    if (success) {
      dispatch(
        {
          type: NEW_TRIVIA_QUESTION_BANKS_RESET,
        },
        token
      );
    }
    if (simpleValidator.current.allValid()) {
      const data = {
        academy_id,
        theme_id,
        training_id,
      };

      dispatch(newTriviaQuestionBanks(data, token));
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
    if (error) {
      dispatch(clearErrors());
    }
    if (success) {
      dispatch(
        {
          type: NEW_TRIVIA_QUESTION_BANKS_RESET,
        },
        token
      );
    }
    if (simpleValidator.current.allValid()) {
      const data = {
        academy_id,
        theme_id,
        training_id,
      };
      dispatch(newTriviaQuestionBanks(data, token));
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
          <StepInput step="1"></StepInput>
          <div className="card-header border-0">
            <h2 className="card-title h2 text-dark">Tambah Trivia</h2>
          </div>
          <div className="card-body pt-0">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className=" col-form-label font-weight-bold">
                  Akademi
                </Form.Label>
                <Select
                  placeholder={academyLabel || "Silahkan Pilih Akademi"}
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
                  academy_id,
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
                  placeholder={themeLabel || "Silahkan Pilih Tema"}
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
                  placeholder={trainingLabel || "Silahkan Pilih Pelatihan"}
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
            <div className="form-group ">
              <label
                htmlFor="staticEmail"
                className=" col-form-label font-weight-bold"
              >
                Metode
              </label>
              <div className="">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="method"
                    value="entry"
                    checked={metode === "entry"}
                    onClick={() => setMetode("entry")}
                  />
                  <label className="form-check-label">Entry Soal</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="method"
                    value="import"
                    checked={metode === "import"}
                    onClick={() => setMetode("import")}
                  />
                  <label className="form-check-label">Import .csv/.xls</label>
                </div>
              </div>
            </div>

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

export default TambahTriviaStepOne;
