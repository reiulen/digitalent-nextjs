import React, { useState, useEffect, useRef } from "react";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";

import {
  newSubtanceQuestionBanks,
  clearErrors,
} from "../../../../../redux/actions/subvit/subtance.actions";
import { NEW_SUBTANCE_QUESTION_BANKS_RESET } from "../../../../../redux/types/subvit/subtance.type";

import PageWrapper from "/components/wrapper/page.wrapper";
import StepInput from "/components/StepInput";
import LoadingPage from "../../../../LoadingPage";
import styles from "../../trivia/edit/step.module.css";

const StepOne = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, success, subtance } = useSelector(
    (state) => state.newSubtanceQuestionBanks
  );

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();
  const [typeSave, setTypeSave] = useState("lanjut");

  const [academy_id, setAcademyId] = useState("");
  const [theme_id, setThemeId] = useState("");
  const [training_id, setTrainingId] = useState("");
  const [category, setCategory] = useState("");
  const [metode, setMetode] = useState("entry");

  useEffect(() => {
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
  }, [dispatch, success, typeSave, metode, subtance, router]);

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
        academy_id,
        theme_id,
        training_id,
        category,
      };

      dispatch(newSubtanceQuestionBanks(data, token));
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
        type: NEW_SUBTANCE_QUESTION_BANKS_RESET,
      });
    }
    if (simpleValidator.current.allValid()) {
      const data = {
        academy_id,
        theme_id,
        training_id,
        category,
      };

      dispatch(newSubtanceQuestionBanks(data, token));
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
            <h2 className="card-title text-dark h2">Tambah Test Subtansi</h2>
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
                <select
                  defaultValue={academy_id}
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
                  <option value="1"> VSGA </option>
                  <option value="2"> FGA </option>
                  <option value="3">PRO</option>
                  <option value="4">TA</option>
                  <option value="5">GTA</option>
                  <option value="6">DEA</option>
                  <option value="7"> TSA</option>
                </select>
                {simpleValidator.current.message(
                  "academy_id",
                  academy_id,
                  "required",
                  { className: "text-danger" }
                )}
              </div>

              <div className="form-group mb-2">
                <label
                  htmlFor="staticEmail"
                  className=" col-form-label font-weight-bold"
                >
                  Tema
                </label>
                <select
                  name="the_id"
                  id=""
                  onChange={(e) => setThemeId(e.target.value)}
                  onBlur={(e) => {
                    setThemeId(e.target.value);
                    simpleValidator.current.showMessageFor("theme_id");
                  }}
                  className="form-control"
                  defaultValue={theme_id}
                >
                  <option selected disabled value="">
                    {" "}
                    -Pilih Tema-
                  </option>
                  <option value="1"> Cloud Computing Analyst </option>
                  <option value="2"> Data Management Staff </option>
                  <option value="3"> Artificial Intelligence </option>
                  <option value="4"> Cloud Computing </option>
                  <option value="5"> Data Science Fundamental </option>
                  <option value="6">Get Connected</option>
                </select>
                {simpleValidator.current.message(
                  "theme_id",
                  theme_id,
                  "required",
                  { className: "text-danger" }
                )}
              </div>

              <div className="form-group mb-2">
                <label
                  htmlFor="staticEmail"
                  className=" col-form-label font-weight-bold"
                >
                  Pelatihan
                </label>
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
                  <option value="1"> Mobile App Flutter</option>
                  <option value="2"> Mobile App React Native </option>
                  <option value="3"> Web Backend Laravel </option>
                  <option value="4"> Web Backend Golang </option>
                  <option value="5"> Web Backend Node Js </option>
                  <option value="6"> Web Backend Python </option>
                  <option value="7"> Frontend Web React Js </option>
                  <option value="8"> Frontend Web Vue Js </option>
                  <option value="9"> Machine Learning </option>
                  <option value="10">UI / UX Design</option>
                </select>
              </div>

              <div className="form-group mb-2">
                <label
                  htmlFor="staticEmail"
                  className=" col-form-label font-weight-bold"
                >
                  Kategori
                </label>
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

              <div className="form-group">
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
                    className={`${styles.btnNext} btn btn-light-ghost-rounded-full mr-2`}
                  >
                    Simpan & Lanjut
                  </button>
                  <button
                    onClick={saveDraft}
                    className="btn btn-primary-rounded-full text-white "
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
