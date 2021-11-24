import React, { useState, useEffect, useRef } from "react";

import Select from "react-select";
import SimpleReactValidator from "simple-react-validator";

import { useDispatch, useSelector } from "react-redux";
import {
  updatewSubtanceQuestionBanks,
  clearErrors,
} from "../../../../../redux/actions/subvit/subtance.actions";
import { UPDATE_SUBTANCE_QUESTION_BANKS_RESET } from "../../../../../redux/types/subvit/subtance.type";

import PageWrapper from "/components/wrapper/page.wrapper";
import StepInputPublish from "/components/StepInputPublish";
import LoadingPage from "../../../../LoadingPage";
import styles from "../../trivia/edit/step.module.css";

import { useRouter } from "next/router";
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
  const { error: detailData, subtance } = useSelector(
    (state) => state.detailSubtanceQuestionBanks
  );
  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateSubtanceQuestion
  );
  const [, forceUpdate] = useState();
  const [typeSave, setTypeSave] = useState("lanjut");
  const [academy_id, setAcademyId] = useState(subtance.academy_id);
  const [academyLabel, setAcademyLabel] = useState(
    (subtance.academy && subtance.academy.name) || "Silahkan Pilih Akademi"
  );
  const [themeLabel, setThemeLabel] = useState(
    (subtance.theme && subtance.theme.name) || "Silahkan Pilih Tema"
  );
  const [trainingLabel, setTrainingLabel] = useState(
    (subtance.training && subtance.training.name) || "Silahkan Pilih Pelatihan"
  );
  const [theme_id, setThemeId] = useState(subtance && subtance.theme_id);
  const [training_id, setTrainingId] = useState(
    subtance && subtance.training_id
  );
  const [category, setCategory] = useState(subtance && subtance.category);

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

  useEffect(() => {
    dispatch(dropdownTemabyAkademi(academy_id, token));
    dispatch(dropdownPelatihanbyTema(theme_id, token));
    if (isUpdated) {
      dispatch({
        type: UPDATE_SUBTANCE_QUESTION_BANKS_RESET,
      });
      if (typeSave === "lanjut") {
        router.push({
          pathname: `/subvit/substansi/edit/step-2`,
          query: { id },
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
    isUpdated,
    typeSave,
    router,
    id,
    academy_id,
    token,
    theme_id,
    subtance,
  ]);

  const saveDraft = () => {
    setTypeSave("draft");
    if (simpleValidator.current.allValid()) {
      const data = {
        academy_id,
        theme_id,
        training_id,
        category,
        _method: "put",
      };

      dispatch(updatewSubtanceQuestionBanks(id, data, token));
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
        category,
        _method: "put",
      };
      dispatch(updatewSubtanceQuestionBanks(id, data, token));
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
            <h2 className="card-title h2 text-dark">Ubah Test Substansi</h2>
          </div>
          <div className="card-body pt-0">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className=" col-form-label font-weight-bold">
                  Akademi
                </Form.Label>
                <Select
                  placeholder={
                    subtance ? academyLabel : "Silahkan Pilih Akademi"
                  }
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
                  placeholder={subtance ? themeLabel : "Silahkan Pilih Tema"}
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
                    subtance ? trainingLabel : "Silahkan Pilih Pelatihan"
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

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className=" col-form-label font-weight-bold">
                  Kategori
                </Form.Label>
                <Select
                  placeholder={
                    subtance.category
                      ? subtance.category
                      : "Silahkan Pilih Kategori"
                  }
                  options={optionsKategori}
                  onChange={(e) => setCategory(e.value)}
                />
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
