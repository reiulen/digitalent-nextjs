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
import {
  dropdownPelatihanbyTema,
  dropdownTemabyAkademi,
} from "../../../../../redux/actions/pelatihan/function.actions";

const StepOne = ({ token }) => {
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
                          {" "}
                          {item.label}{" "}
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
                  onChange={(event) => handleChangePelatihan(event)}
                  onBlur={(event) => {
                    handleChangePelatihan(event);
                    simpleValidator.current.showMessageFor("theme_id");
                  }}
                  className="form-control"
                  defaultValue={theme_id}
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
                  <option value="Test Substansi"> Test Substansi </option>
                  <option value="Mid Test"> Mid Test </option>
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
