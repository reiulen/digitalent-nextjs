import React, { useState, useEffect, useRef } from "react";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import {
  newSubtanceQuestionBanks,
  clearErrors,
} from "../../../../../redux/actions/subvit/subtance.actions";
import { NEW_SUBTANCE_QUESTION_BANKS_RESET } from "../../../../../redux/types/subvit/subtance.type";

import PageWrapper from "/components/wrapper/page.wrapper";
import StepInput from "/components/StepInput";
import LoadingPage from "../../../../LoadingPage";
import styles from "../../trivia/edit/step.module.css";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";
import Select from "react-select";

import {
  dropdownPelatihanbyTema,
  dropdownTemabyAkademi,
} from "../../../../../redux/actions/pelatihan/function.actions";
import { Form } from "react-bootstrap";

const StepOne = ({ token, tokenPermission }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, success, subtance } = useSelector(
    (state) => state.newSubtanceQuestionBanks
  );

  const { error: dropdownErrorAkademi, data: dataAkademi } = useSelector(
    (state) => state.drowpdownAkademi
  );

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();
  const [typeSave, setTypeSave] = useState("lanjut");

  let save = JSON.parse(localStorage.getItem("step1"));

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
  const [metode, setMetode] = useState("entry");

  useEffect(() => {
    dispatch(dropdownTemabyAkademi(academy_id, token, tokenPermission));
    dispatch(dropdownPelatihanbyTema(theme_id, token, tokenPermission));
    if (success) {
      const id = subtance.id;
      if (typeSave === "lanjut") {
        router.push({
          pathname: `/subvit/substansi/tambah-step-2-${metode}`,
          query: { id, metode },
        });
      } else if (typeSave === "draft") {
        router.push({
          pathname: `/subvit/substansi`,
          query: { success: true },
        });
      }
    }
  }, [
    dispatch,
    success,
    typeSave,
    metode,
    subtance,
    router,
    academy_id,
    token,
    theme_id,
    tokenPermission,
  ]);

  const saveDraft = () => {
    setTypeSave("draft");
    if (error) {
      dispatch(clearErrors());
    }
    if (success) {
      dispatch({
        type: NEW_SUBTANCE_QUESTION_BANKS_RESET,
      });
    }
    if (simpleValidator.current.allValid()) {
      const data = {
        academy_id: save ? save.academy_id : academy_id,
        theme_id: save ? save.theme_id : theme_id,
        training_id: save ? save.training_id : training_id,
        category: save ? save.category : category,
      };

      dispatch(newSubtanceQuestionBanks(data, token, tokenPermission));
      localStorage.removeItem("step1");
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
        type: NEW_SUBTANCE_QUESTION_BANKS_RESET,
      });
    }
    if (simpleValidator.current.allValid()) {
      const data = {
        academy_id: save ? save.academy_id : academy_id,
        theme_id: save ? save.theme_id : theme_id,
        training_id: save ? save.training_id : training_id,
        category: save ? save.category : category,
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

      localStorage.setItem("step1", JSON.stringify(setData));
      dispatch(newSubtanceQuestionBanks(data, token, tokenPermission));
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
    }
  };

  const { data } = useSelector((state) => state.drowpdownTemabyAkademi);

  const { data: dataPelatihan2 } = useSelector(
    (state) => state.drowpdownPelatihanbyTema.data
  );

  const [dataBefore, setDataBefore] = useState(
    JSON.parse(localStorage.getItem("step1"))
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

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  const optionsKategori = [
    { value: "Test Substansi", label: "Test Substansi" },
    { value: "Mid Test", label: "Mid Test" },
  ];

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
          <StepInput step="1" title="Substansi"></StepInput>
          <div className="card-header border-0">
            <h2 className="card-title text-dark h2">Tambah Test Subtansi</h2>
          </div>
          <div className="card-body pt-0">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className=" col-form-label font-weight-bold">
                  Akademi
                </Form.Label>
                <Select
                  placeholder={"Silahkan Pilih Akademi"}
                  value={{ label: academyLabel }}
                  className={styles.selectForm}
                  options={dataAkademi.data}
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
                  placeholder={trainingLabel || "Silahkan Pilih Pelatihan"}
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

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className=" col-form-label font-weight-bold">
                  Kategori
                </Form.Label>
                <Select
                  placeholder={"Silahkan Pilih Kategori"}
                  options={optionsKategori}
                  className={styles.selectForm}
                  value={{ label: category }}
                  onChange={(e) => setCategory(e.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("kategori")
                  }
                />
                {simpleValidator.current.message(
                  "kategori",
                  category || save?.category,

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

export default StepOne;
