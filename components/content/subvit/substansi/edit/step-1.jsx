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
import {
  dropdownPelatihanbyTema,
  dropdownTemabyAkademi,
} from "../../../../../redux/actions/pelatihan/function.actions";
import axios from "axios";

const StepOne = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { error: dropdownErrorAkademi, data: dataAkademi } = useSelector(
    (state) => state.drowpdownAkademi
  );

  const { data: dataTema } = useSelector((state) => state.drowpdownTema.data);

  const { data: dataPelatihan } = useSelector(
    (state) => state.drowpdownPelatihan.data
  );

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
    optionPelatihan;
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
    optionPelatihan,
  ]);

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
  };

  const { data } = useSelector((state) => state.drowpdownTemabyAkademi);

  const { data: dataPelatihan2 } = useSelector(
    (state) => state.drowpdownPelatihanbyTema.data
  );

  const [optionPelatihan, setOptionPelatihan] = useState([]);

  const handleChangeTema = (e) => {
    setAcademyId(e.target.value);
    // e.target.value && dispatch(dropdownTemabyAkademi(e.target.value, token));
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get(
        `http://api-dts-dev.majapahit.id/pelatihan/api/v1/tema/dropdown-tema-by-akademi?akademi_id=${e.target.value}`,
        config
      )
      .then((res) => {
        const id = res.data.data.map((item) => {
          return item.value;
        });
        axios
          .get(
            `http://api-dts-dev.majapahit.id/pelatihan/api/v1/pelatihan/dropdown-pelatihan-tema?id=${id}`,
            config
          )
          .then((res) => setOptionPelatihan(res.data.data));
      });
  };

  const handleChangePelatihan = (e) => {
    setThemeId(e.target.value);
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
                    onChange={(event) => handleChangeTema(event)}
                    className="form-control"
                    defaultValue={academy_id}
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
                    onChange={(event) => handleChangePelatihan(event)}
                    className="form-control"
                    defaultValue={theme_id}
                  >
                    {data.data &&
                      data.data.map((item, index) => {
                        <option selected disabled value="">
                          {" "}
                          -Pilih Tema-
                        </option>;
                        return (
                          <>
                            <option
                              value={item.value}
                              key={index}
                              selected
                              defaultValue={item.value}
                            >
                              {item.label}
                            </option>
                          </>
                        );
                      })}
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
                    <option selected disabled value="">
                      {" "}
                      -Pilih Pelatihan-
                    </option>
                    {optionPelatihan.map((item, index) => {
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
