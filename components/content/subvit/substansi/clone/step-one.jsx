import React, { useState, useEffect, useRef } from "react";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";
import styleBtn from "../../trivia/edit/step.module.css";
import styles from "../../../../../styles/stepInput.module.css";
import Select from "react-select";

import {
  newCloneSubtanceQuestionBanks,
  clearErrors,
} from "../../../../../redux/actions/subvit/subtance.actions";
import { NEW_CLONE_SUBTANCE_QUESTION_BANKS_RESET } from "../../../../../redux/types/subvit/subtance.type";

import PageWrapper from "/components/wrapper/page.wrapper";
import StepInput from "/components/StepInputClone";
import LoadingPage from "../../../../LoadingPage";

import {
  dropdownPelatihanbyTema,
  dropdownTemabyAkademi,
} from "../../../../../redux/actions/pelatihan/function.actions";
import { Form } from "react-bootstrap";

const StepOne = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, success, subtance } = useSelector(
    (state) => state.newCloneSubtanceQuestionBanks
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
  const [academyLabel, setAcademyLabel] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    // if (error) {
    //     dispatch(clearErrors())
    // }
    dispatch(dropdownTemabyAkademi(academy_id, token));
    dispatch(dropdownPelatihanbyTema(theme_id, token));
    if (success) {
      const id = subtance.id;
      if (typeSave === "lanjut") {
        router.push({
          pathname: `/subvit/substansi/clone/step-2`,
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
    error,
    success,
    typeSave,
    router,
    subtance,
    academy_id,
    token,
    theme_id,
  ]);

  const handleChangePelatihan = (e) => {
    setThemeId(e.value);
  };

  const handleChangeTema = (e) => {
    setAcademyId(e.value);
    setAcademyLabel(e.label);
  };

  const saveDraft = () => {
    setTypeSave("draft");
    if (error) {
      dispatch(clearErrors());
    }
    if (success) {
      dispatch({
        type: NEW_CLONE_SUBTANCE_QUESTION_BANKS_RESET,
      });
    }
    if (simpleValidator.current.allValid()) {
      const data = {
        academy_id,
        theme_id,
        training_id,
        category,
      };

      dispatch(newCloneSubtanceQuestionBanks(data, token));
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
      dispatch({
        type: NEW_CLONE_SUBTANCE_QUESTION_BANKS_RESET,
      });
    }
    if (simpleValidator.current.allValid()) {
      const data = {
        academy_id,
        theme_id,
        training_id,
        category,
      };

      dispatch(newCloneSubtanceQuestionBanks(data, token));
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
          <StepInput step="1"></StepInput>
          <div className="card-header border-0">
            <h2 className="card-title h2 text-dark">Clone Test Subtansi</h2>
          </div>
          <div className="card-body pt-0">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className=" col-form-label font-weight-bold">
                  Akademi
                </Form.Label>
                <Select
                  placeholder={"Silahkan Pilih Akademi"}
                  options={dataAkademi.data}
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
                  placeholder={"Silahkan Pilih Tema"}
                  options={optionsTema}
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
                  placeholder={"Silahkan Pilih Pelatihan"}
                  options={dataPelatihan2}
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
                  placeholder={"Silahkan Pilih Kategori"}
                  options={optionsKategori}
                  onChange={(e) => setCategory(e.value)}
                />
              </Form.Group>
            </Form>
            <div className="row mt-7">
              <div className=" col-xs-12 col-sm-12 col-md-12 pt-0">
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
