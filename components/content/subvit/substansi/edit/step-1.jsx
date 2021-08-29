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

import { useRouter } from "next/router";

const StepOne = () => {
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

    dispatch(updatewSubtanceQuestionBanks(id, data));
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

    dispatch(updatewSubtanceQuestionBanks(id, data));

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
            <h3 className="card-title font-weight-bolder text-dark">
              Edit Test Substansi
            </h3>
          </div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label "
                >
                  Akademi
                </label>
                <div className="col-sm-10">
                  <select
                    name="academy_id"
                    id=""
                    onChange={(e) => setAcademyId(e.target.value)}
                    className="form-control"
                  >
                    <option> -Pilih Akademi -</option>
                    <option value="1" selected>
                      {" "}
                      Computer Scientist{" "}
                    </option>
                    <option value="2"> Designer </option>
                  </select>
                  <span className="text-muted">Silahkan Pilih Akademi</span>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label "
                >
                  Tema
                </label>
                <div className="col-sm-10">
                  <select
                    name="the_id"
                    id=""
                    onChange={(e) => setThemeId(e.target.value)}
                    className="form-control"
                  >
                    <option> -Pilih Tema-</option>
                    <option value="1" selected>
                      {" "}
                      Cloud Computing{" "}
                    </option>
                    <option value="2"> UI/UX Designer </option>
                  </select>
                  <span className="text-muted">Silahkan Pilih Tema</span>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label "
                >
                  Pelatihan
                </label>
                <div className="col-sm-10">
                  <select
                    name="training_id"
                    id=""
                    onChange={(e) => setTrainingId(e.target.value)}
                    className="form-control"
                  >
                    <option> -Pilih Pelatihan-</option>
                    <option value="1" selected>
                      {" "}
                      Google Cloud Computing{" "}
                    </option>
                    <option value="2"> Adobe UI/UX Designer </option>
                  </select>
                  <span className="text-muted">Silahkan Pilih Pelatihan</span>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label "
                >
                  Kategori
                </label>
                <div className="col-sm-10">
                  <select
                    name="category"
                    id=""
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-control"
                  >
                    <option> -Pilih Kategori-</option>
                    <option value="tes_substansi" selected>
                      {" "}
                      Tes Substansi{" "}
                    </option>
                    <option value="mid_tes"> Mid Tes </option>
                  </select>
                  <span className="text-muted">Silahkan Pilih Kategori</span>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-2"></div>
                <div className="col-sm-10 text-right">
                  <button className="btn btn-light-primary btn-sm mr-2">
                    Simpan & Lanjut
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
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
