import React, { useState, useEffect, useRef } from "react";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";

import {
  newTriviaQuestionBanks,
  clearErrors,
} from "../../../../../redux/actions/subvit/trivia-question.actions";
import { NEW_TRIVIA_QUESTION_BANKS_RESET } from "../../../../../redux/types/subvit/trivia-question.type";

import PageWrapper from "/components/wrapper/page.wrapper";
import StepInput from "/components/StepInput";
import LoadingPage from "../../../../LoadingPage";

const TambahTriviaStepOne = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, success, trivia } = useSelector(
    (state) => state.newTriviaQuestionBanks
  );
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();
  const [typeSave, setTypeSave] = useState("lanjut");

  const [academy_id, setAcademyId] = useState("");
  const [theme_id, setThemeId] = useState("");
  const [training_id, setTrainingId] = useState("");
  const [metode, setMetode] = useState("entry");

  useEffect(() => {
    // if (error) {
    //     dispatch(clearErrors())
    // }

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
  }, [dispatch, error, success, typeSave, router, metode, trivia]);

  const saveDraft = () => {
    setTypeSave("draft");
    if (error) {
      dispatch(clearErrors());
    }
    if (success) {
      dispatch({
        type: NEW_TRIVIA_QUESTION_BANKS_RESET,
      });
    }
    if (simpleValidator.current.allValid()) {
      const data = {
        academy_id,
        theme_id,
        training_id,
      };

      dispatch(newTriviaQuestionBanks(data));
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
        type: NEW_TRIVIA_QUESTION_BANKS_RESET,
      });
    }
    if (simpleValidator.current.allValid()) {
      const data = {
        academy_id,
        theme_id,
        training_id,
      };

      dispatch(newTriviaQuestionBanks(data));
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
            <h2 className="card-title h2 text-dark">Tambah Test Trivia</h2>
          </div>
          <div className="card-body pt-0">
            <form onSubmit={onSubmit}>
              <div className="form-group my-2">
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
                    value={academy_id}
                    onChange={(e) => setAcademyId(e.target.value)}
                    onBlur={(e) => {
                      setAcademyId(e.target.value);
                      simpleValidator.current.showMessageFor("academy_id");
                    }}
                    className="form-control"
                  >
                    <option selected disabled value="">
                      {" "}
                      -Pilih Akademi -
                    </option>
                    <option value="1"> Computer Scientist </option>
                    <option value="2"> Designer </option>
                  </select>
                  {simpleValidator.current.message(
                    "academy_id",
                    academy_id,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <div className="form-group my-2">
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
                    onBlur={(e) => {
                      setThemeId(e.target.value);
                      simpleValidator.current.showMessageFor("theme_id");
                    }}
                    className="form-control"
                  >
                    <option selected disabled value="">
                      {" "}
                      -Pilih Tema-
                    </option>
                    <option value="1"> Cloud Computing </option>
                    <option value="2"> UI/UX Designer </option>
                  </select>
                  {simpleValidator.current.message(
                    "theme_id",
                    theme_id,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <div className="form-group mb-2">
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
                    onBlur={(e) => setTrainingId(e.target.value)}
                    className="form-control"
                  >
                    <option selected disabled>
                      {" "}
                      -Pilih Pelatihan-
                    </option>
                    <option value="1"> Google Cloud Computing </option>
                    <option value="1"> Adobe UI/UX Designer </option>
                  </select>
                </div>
              </div>

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

              <div className="form-group">
                <div className=""></div>
                <div className=" text-right">
                  <button
                    type="submit"
                    className="btn btn-light-ghost-rounded-full mr-2"
                  >
                    Simpan & Lanjut
                  </button>
                  <button
                    onClick={saveDraft}
                    className="btn btn-primary-rounded-full text-white"
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

export default TambahTriviaStepOne;
