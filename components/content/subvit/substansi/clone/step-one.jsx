import React, { useState, useEffect, useRef } from "react";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";
import styleBtn from "../../trivia/edit/step.module.css";
import styles from "../../../../../styles/stepInput.module.css";

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

const StepOne = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, success, subtance } = useSelector(
    (state) => state.newCloneSubtanceQuestionBanks
  );

  const { error: dropdownErrorAkademi, data: dataAkademi } = useSelector(
    (state) => state.drowpdownAkademi
  );

  const handleChangeTema = (e) => {
    setAcademyId(e.target.value);
    e.target.value && dispatch(dropdownTemabyAkademi(e.target.value, token));
  };

  const handleChangePelatihan = (e) => {
    setThemeId(e.target.value);
    e.target.value && dispatch(dropdownPelatihanbyTema(e.target.value, token));
  };

  const { data } = useSelector((state) => state.drowpdownTemabyAkademi);

  const { drowpdownPelatihanbyTema } = useSelector((state) => state);

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();
  const [typeSave, setTypeSave] = useState("lanjut");

  useEffect(() => {
    // if (error) {
    //     dispatch(clearErrors())
    // }

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
  }, [dispatch, error, success, typeSave, router, subtance]);

  const [academy_id, setAcademyId] = useState("");
  const [theme_id, setThemeId] = useState("");
  const [training_id, setTrainingId] = useState("");
  const [category, setCategory] = useState("");

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

      <div className="col-lg-12 order-1 order-xxl-2 px-0">
        {loading ? <LoadingPage loading={loading} /> : ""}
        <div className="card card-custom card-stretch gutter-b">
          <StepInput step="1"></StepInput>
          <div className="card-header border-0">
            <h2 className="card-title h2 text-dark">Clone Test Subtansi</h2>
          </div>
          <div className="card-body pt-0">
            <form onSubmit={onSubmit}>
              <div className="form-group mb-3">
                <label
                  htmlFor="staticEmail"
                  className=" col-form-label font-weight-bold pb-0"
                >
                  Akademi
                </label>
                <div className="">
                  <select
                    name="academy_id"
                    id=""
                    value={academy_id}
                    onChange={(event) => handleChangeTema(event)}
                    onBlur={(event) => {
                      handleChangeTema(event);
                      simpleValidator.current.showMessageFor("academy_id");
                    }}
                    className="form-control"
                  >
                    <option selected disabled value="">
                      {" "}
                      -Pilih Akademi -
                    </option>
                    {dataAkademi.data.map((item, index) => {
                      return (
                        <>
                          <option value={item.value} key={index}>
                            {item.label}
                          </option>
                        </>
                      );
                    })}
                  </select>
                  {simpleValidator.current.message(
                    "academy_id",
                    academy_id,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <div className="form-group mb-3">
                <label
                  htmlFor="staticEmail"
                  className=" col-form-label font-weight-bold pb-0"
                >
                  Tema
                </label>
                <div className="">
                  <select
                    name="the_id"
                    id=""
                    onChange={(event) => handleChangePelatihan(event)}
                    onBlur={(event) => {
                      handleChangePelatihan(event);
                      simpleValidator.current.showMessageFor("theme_id");
                    }}
                    className="form-control"
                  >
                    <option selected disabled value="">
                      {" "}
                      -Pilih Tema-
                    </option>
                    {data.data &&
                      data.data.map((item, index) => {
                        return (
                          <>
                            <option value={item.value} key={index}>
                              {item.label}
                            </option>
                          </>
                        );
                      })}
                  </select>
                  {simpleValidator.current.message(
                    "theme_id",
                    theme_id,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <div className="form-group mb-3">
                <label
                  htmlFor="staticEmail"
                  className=" col-form-label font-weight-bold pb-0"
                >
                  Pelatihan
                </label>
                <div className="">
                  <select
                    name="training_id"
                    id=""
                    onChange={(e) => setTrainingId(e.target.value)}
                    onBlur={(e) => setTrainingId(e.target.value)}
                    className="form-control"
                  >
                    <option selected disabled value="">
                      {" "}
                      -Pilih Pelatihan-
                    </option>
                    {drowpdownPelatihanbyTema.data.data &&
                      drowpdownPelatihanbyTema.data.data.map((item, index) => {
                        return (
                          <>
                            <option value={item.value} key={index}>
                              {" "}
                              {item.label}
                            </option>
                          </>
                        );
                      })}
                  </select>
                </div>
              </div>

              <div className="form-group mb-3">
                <label
                  htmlFor="staticEmail"
                  className=" col-form-label font-weight-bold pb-0"
                >
                  Kategori
                </label>
                <div className="">
                  <select
                    name="category"
                    id=""
                    onChange={(e) => setCategory(e.target.value)}
                    onBlur={(e) => {
                      setCategory(e.target.value);
                      simpleValidator.current.showMessageFor("category");
                    }}
                    className="form-control"
                  >
                    <option selected disabled>
                      {" "}
                      -Pilih Kategori-
                    </option>
                    <option value="Test Substansi"> Tes Substansi </option>
                    <option value="Mid Test"> Mid Tes </option>
                  </select>
                  {simpleValidator.current.message(
                    "category",
                    category,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

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
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default StepOne;
