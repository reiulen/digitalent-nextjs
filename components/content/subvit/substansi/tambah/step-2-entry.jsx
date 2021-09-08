import React, { useState, useEffect } from "react";

import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

import {
  newSubtanceQuestionDetail,
  clearErrors,
} from "../../../../../redux/actions/subvit/subtance-question-detail.action";
import { NEW_SUBTANCE_QUESTION_DETAIL_RESET } from "../../../../../redux/types/subvit/subtance-question-detail.type";
import { useRouter } from "next/router";

import PageWrapper from "/components/wrapper/page.wrapper";
import StepInput from "/components/StepInput";
import LoadingPage from "../../../../LoadingPage";

const StepTwo = () => {
  const dispatch = useDispatch();
  const importSwitch = () => import("bootstrap-switch-button-react");
  const SwitchButton = dynamic(importSwitch, {
    ssr: false,
  });
  const router = useRouter();

  let { metode, id } = router.query;
  const { loading, error, success } = useSelector(
    (state) => state.newSubtanceQuestionDetail
  );
  const {
    loading: allLoading,
    error: allError,
    subtance_question_type,
  } = useSelector((state) => state.allSubtanceQuestionType);
  const { loading: oneLoading, subtance } = useSelector(
    (state) => state.detailSubtanceQuestionBanks
  );

  const [question, setSoal] = useState("");
  const [question_image, setSoalImage] = useState("");
  const [answer, setSoalList] = useState([
    { key: "A", option: "", image: "", is_right: false },
    { key: "B", option: "", image: "", is_right: false },
    { key: "C", option: "", image: "", is_right: false },
    { key: "D", option: "", image: "", is_right: false },
  ]);
  const [answer_key, setAnswerKey] = useState("");
  const [question_type_id, setQuestionTypeId] = useState("");
  const [typeSave, setTypeSave] = useState("lanjut");

  useEffect(() => {
    if (success) {
      dispatch({
        type: NEW_SUBTANCE_QUESTION_DETAIL_RESET,
      });
      if (typeSave === "lanjut") {
        router.push({
          pathname: `/subvit/substansi/tambah-step-3`,
          query: { id },
        });
        console.log(typeSave);
      } else if (typeSave === "draft") {
        handleResetForm();
        router.push({
          pathname: `/subvit/substansi/tambah-step-2-${metode}`,
          query: { id, metode },
        });
      }
    }
  }, [dispatch, error, success, typeSave, id, metode, router]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...answer];
    list[index][name] = value;
    if (name === "image") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          list[index]["image"] = reader.result;
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    setSoalList(list);
  };

  const handleSoalImage = (e) => {
    if (e.target.name === "question_image") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setSoalImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAnswer = (value, i) => {
    setAnswerKey(answer[i].key);
    if (value === false) {
      setAnswerKey("");
    }
    const list = [...answer];
    list.forEach((row, j) => {
      list[j]["is_right"] = false;
    });
    list[i]["is_right"] = value;
  };

  const handleRemoveClick = (index) => {
    const list = [...answer];
    list.splice(index, 1);
    list.forEach((row, i) => {
      let key = String.fromCharCode(65 + i);
      list[i]["key"] = key;
    });
    setSoalList(list);
  };

  const handleAddClick = () => {
    const lastobj = answer[answer.length - 1];
    const keyindex = lastobj.key.charCodeAt(0);
    const newKey = String.fromCharCode(keyindex + 1);
    setSoalList([
      ...answer,
      { key: newKey, question: "", image: "", is_right: false },
    ]);
  };

  const handleResetForm = () => {
    setSoal("");
    setSoalImage("");
    setSoalList([
      { key: "A", option: "", image: "", is_right: false },
      { key: "B", option: "", image: "", is_right: false },
      { key: "C", option: "", image: "", is_right: false },
      { key: "D", option: "", image: "", is_right: false },
    ]);
    setAnswerKey("");
    setQuestionTypeId("");
  };

  const saveDraft = () => {
    setTypeSave("draft");
    let valid = true;

    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      dispatch({
        type: NEW_SUBTANCE_QUESTION_DETAIL_RESET,
      });
    }

    if (answer_key === "") {
      valid = false;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi kunci jawaban dengan benar !",
      });
    }

    if (question == "" && question_image == "") {
      valid = false;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi pertanyaan dengan benar !",
      });
    }

    answer.forEach((row, j) => {
      if (row.option == "" && row.image == "") {
        valid = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Isi jawaban dengan benar !",
        });
      }
    });

    if (question_type_id === "") {
      valid = false;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi Tipe Soal dengan benar !",
      });
    }

    const answers = JSON.stringify(answer);
    if (valid) {
      const data = {
        subtance_question_bank_id: id,
        question,
        answer: answers,
        question_image,
        question_type_id,
        answer_key,
      };

      dispatch(newSubtanceQuestionDetail(data));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setTypeSave("lanjut");
    let valid = true;

    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      dispatch({
        type: NEW_SUBTANCE_QUESTION_DETAIL_RESET,
      });
    }

    if (answer_key === "") {
      valid = false;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi kunci jawaban dengan benar !",
      });
    }

    if (question == "" && question_image == "") {
      valid = false;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi pertanyaan dengan benar !",
      });
    }

    answer.forEach((row, j) => {
      if (row.option == "" && row.image == "") {
        valid = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Isi jawaban dengan benar !",
        });
      }
    });

    if (question_type_id === "") {
      valid = false;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi Tipe Soal dengan benar !",
      });
    }

    const answers = JSON.stringify(answer);
    if (valid) {
      const data = {
        subtance_question_bank_id: id,
        question,
        answer: answers,
        question_image,
        question_type_id,
        answer_key,
      };

      dispatch(newSubtanceQuestionDetail(data));
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
          <StepInput step="2"></StepInput>
          <div className="card-header border-0">
            <h2 className="card-title h2 text-dark">
              Soal {subtance.bank_soal + 1}
            </h2>
          </div>
          <div className="card-body pt-0">
            <form onSubmit={onSubmit}>
              <div className="form-group mb-2 row">
                <div className=" col-md-12">
                  <label
                    htmlFor="staticEmail"
                    className=" col-form-label font-weight-bold"
                  >
                    Pertanyaan
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Isi Pertanyaan"
                    value={question}
                    onChange={(e) => setSoal(e.target.value)}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className=" col-md-12">
                  <label
                    htmlFor="staticEmail"
                    className=" col-form-label font-weight-bold"
                  >
                    Gambar Pertanyaan (Optional)
                  </label>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      name="question_image"
                      onChange={(e) => handleSoalImage(e)}
                      accept="image/png, image/gif, image/jpeg , image/jpg"
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose file
                    </label>
                  </div>
                  <span className="text-muted">
                    (Maksimal ukuran file 5 mb)
                  </span>
                </div>
              </div>

              <div className="form-group row">
                {answer.map((x, i) => {
                  return (
                    <>
                      <div className="col-sm-12 col-md-4">
                        <label
                          htmlFor="staticEmail"
                          className=" col-form-label font-weight-bold"
                        >
                          Jawaban {x.key}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="option"
                          value={x.option}
                          placeholder={`Isi Jawaban ` + x.key}
                          onChange={(e) => handleInputChange(e, i)}
                          autoComplete="off"
                        />
                      </div>
                      <div className="col-sm-12 col-md-4">
                        <label
                          htmlFor="staticEmail"
                          className=" col-form-label font-weight-bold"
                        >
                          Input Gambar (Optional)
                        </label>
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            name="image"
                            onChange={(e) => handleInputChange(e, i)}
                            accept="image/png, image/gif, image/jpeg , image/jpg"
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFile"
                          >
                            Choose file
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-4 pr-0 mr-0 d-flex align-items-end mt-2">
                        {answer.length !== 1 && x.key !== "A" ? (
                          <button
                            className="btn btn-link-action bg-danger text-white"
                            type="button"
                            onClick={() => handleRemoveClick(i)}
                          >
                            <i className="ri-delete-bin-fill p-0 text-white"></i>
                          </button>
                        ) : (
                          <button
                            className="btn btn-link-action bg-danger text-white invisible"
                            type="button"
                          >
                            <i className="ri-delete-bin-fill p-0 text-white"></i>
                          </button>
                        )}
                        <div className="ml-4">
                          <SwitchButton
                            checked={x.is_right}
                            onlabel=" "
                            onstyle="primary"
                            offlabel=" "
                            offstyle="secondary"
                            size="sm"
                            width={20}
                            height={10}
                            onChange={(checked) => handleAnswer(checked, i)}
                          />
                        </div>
                        {x.is_right ? (
                          <span className="ml-2">Pilihan Kunci yang benar</span>
                        ) : (
                          ""
                        )}
                      </div>
                      {/* <div className="col-sm-12 col-md-4 d-flex align-items-end">
                      </div> */}
                    </>
                  );
                })}
              </div>

              <div className="form-group row">
                <div className="col-sm-6 col-md-3">
                  {answer.length < 6 ? (
                    <button
                      type="button"
                      className="btn btn-rounded-full bg-blue-secondary text-white"
                      onClick={() => handleAddClick()}
                    >
                      <i className="ri-add-fill text-white"></i> Tambah Jawaban
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 col-md-8">
                  <label
                    htmlFor="staticEmail"
                    className=" col-form-label font-weight-bold"
                  >
                    Tipe Soal
                  </label>
                  <select
                    name="training_id"
                    id=""
                    onChange={(e) => setQuestionTypeId(e.target.value)}
                    onBlur={(e) => setQuestionTypeId(e.target.value)}
                    value={question_type_id}
                    className="form-control"
                  >
                    <option selected disabled value="">
                      -- Tipe Soal --
                    </option>
                    {subtance_question_type.list_types.length != 0 ? (
                      subtance_question_type.list_types.map((row) => {
                        return (
                          <option key={row.id} value={row.id}>
                            {row.name}
                          </option>
                        );
                      })
                    ) : (
                      <option disabled>Tipe soal masih kosong</option>
                    )}
                  </select>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-2"></div>
                <div className="col-sm-10 text-right">
                  <button
                    className="btn btn-light-ghost-rounded-full mr-2"
                    type="submit"
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

export default StepTwo;
