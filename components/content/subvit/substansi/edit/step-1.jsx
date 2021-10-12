import React, { useState, useEffect } from "react";

import Link from "next/link";
import dynamic from "next/dynamic";
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

const StepOne = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  let { id } = router.query;
  const { error: detailData, subtance } = useSelector(
    (state) => state.detailSubtanceQuestionBanks
  );
  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateSubtanceQuestion
  );

  const [typeSave, setTypeSave] = useState("lanjut");
  const [academy_id, setAcademyId] = useState(subtance.academy_id);
  const [theme_id, setThemeId] = useState(subtance.theme_id);
  const [training_id, setTrainingId] = useState(subtance.training_id);
  const [category, setCategory] = useState(subtance.category);

  useEffect(() => {
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
  }, [dispatch, isUpdated, typeSave, router, id]);

  const saveDraft = () => {
    setTypeSave("draft");
    const data = {
      academy_id,
      theme_id,
      training_id,
      category,
      _method: "put",
    };

    dispatch(updatewSubtanceQuestionBanks(id, data, token));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setTypeSave("lanjut");

    const data = {
      academy_id,
      theme_id,
      training_id,
      category,
      _method: "put",
    };

    dispatch(updatewSubtanceQuestionBanks(id, data, token));

    console.log(data);
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
            <form onSubmit={onSubmit}>
              <div className="form-group mb-2">
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
                    onChange={(e) => setAcademyId(e.target.value)}
                    className="form-control"
                    defaultValue={academy_id}
                  >
                    <option value="" disabled>
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
                </div>
              </div>

              <div className="form-group mb-2">
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
                    className="form-control"
                    defaultValue={theme_id}
                  >
                    <option value="" disabled>
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
                    className="form-control"
                    defaultValue={training_id}
                  >
                    <option value="" disabled>
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
              </div>

              <div className="form-group ">
                <label
                  htmlFor="staticEmail"
                  className=" col-form-label font-weight-bold"
                >
                  Kategori
                </label>
                <div className="">
                  <select
                    name="category"
                    id=""
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-control"
                    defaultValue={category}
                  >
                    <option value="" disabled>
                      {" "}
                      -Pilih Kategori-
                    </option>
                    <option value="Test Substansi"> Tes Substansi </option>
                    <option value="Mid Test"> Mid Tes </option>
                  </select>
                </div>
              </div>

              <div className="form-group ">
                <div className=""></div>
                <div className=" text-right">
                  <button
                    className={`${styles.btnNext} btn btn-light-ghost-rounded-full mr-2`}
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
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default StepOne;
