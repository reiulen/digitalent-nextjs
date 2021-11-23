import React, { useState, useEffect, useRef } from "react";

import Link from "next/link";
import Select from "react-select";
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
import { Form } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";

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
  const [academyLabel, setAcademyLabel] = useState("");
  const [theme_id, setThemeId] = useState(subtance.theme_id);
  const [training_id, setTrainingId] = useState(subtance.training_id);
  const [category, setCategory] = useState(subtance.category);
  const [optionTema, setOptionTema] = useState(null);

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

  const handleChangePelatihan = (e) => {
    setThemeId(e.value);
  };

  const handleChangeTema = (e) => {
    setAcademyId(e.value);
    setAcademyLabel(e.label);
    // MASIH DIPAKE
    // const config = {
    //   headers: {
    //     Authorization: "Bearer " + token,
    //   },
    // };
    // axios
    //   .get(
    //     process.env.END_POINT_API_PELATIHAN +
    //       `api/v1/tema/dropdown-tema-by-akademi?akademi_id=${e.value}`,
    //     config
    //   )
    //   .then((res) => {
    //     setOptionTema(res.data.data);
    //     const id = res.data.data.map((item) => {
    //       return item.value;
    //     });

    //     axios
    //       .get(
    //         process.env.END_POINT_API_PELATIHAN +
    //           `api/v1/pelatihan/dropdown-pelatihan-tema?id=${theme_id}`,
    //         config
    //       )
    //       .then((res) => {
    //         setOptionPelatihan(res.data.data);
    //       });
    //   });
  };

  const handleTraining = (e) => {
    setTrainingId(parseInt(e.value));
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
                    subtance.academy
                      ? subtance.academy.name
                      : "Silahkan Pilih Akademi"
                  }
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
                  placeholder={
                    subtance.theme ? subtance.theme.name : "Silahkan Pilih Tema"
                  }
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
                  placeholder={
                    subtance.training
                      ? subtance.training.name
                      : "Silahkan Pilih Pelatihan"
                  }
                  options={dataPelatihan2}
                  onChange={(e) => handleTraining(e)}
                />
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

            {/* MASIH DIPAKE UNTUK BACKUP */}
            {/* <form onSubmit={onSubmit}>
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
                    {subtance.academy_id !== parseInt(academy_id) && (
                      <option selected value="">
                        {" "}
                        -Pilih Tema-
                      </option>
                    )}
                    )
                    {data.data &&
                      data.data.map((item, index) => {
                        return (
                          <>
                            <option
                              value={item.value}
                              key={index}
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
                    onChange={(e) => handleTraining(e)}
                    className="form-control"
                    defaultValue={
                      dataPelatihan2 &&
                      dataPelatihan2
                        .filter((res) => res.value === training_id)
                        .map((item) => {
                          return item.value;
                        })
                    }
                  >
                    {subtance.academy_id !== parseInt(academy_id) && (
                      <option selected value="">
                        {" "}
                        -Pilih Pelatihan-
                      </option>
                    )}
                    {dataPelatihan2 &&
                      dataPelatihan2.map((item, index) => {
                        return (
                          <>
                            <option value={item.value} key={index} selected>
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
            </form> */}
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
