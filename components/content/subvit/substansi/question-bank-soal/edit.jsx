import React, { useEffect, useState, useRef } from "react";

import Image from "next/image";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";

import {
  clearErrors,
  updateSubtanceQuestionDetail,
} from "../../../../../redux/actions/subvit/subtance-question-detail.action";
import { UPDATE_SUBTANCE_QUESTION_DETAIL_RESET } from "../../../../../redux/types/subvit/subtance-question-detail.type";

import PageWrapper from "../../../../wrapper/page.wrapper";
import LoadingPage from "../../../../LoadingPage";
import styles from "../../trivia/edit/step.module.css";

const EditSoalSubstansi = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const importSwitch = () => import("bootstrap-switch-button-react");
  const SwitchButton = dynamic(importSwitch, {
    ssr: false,
  });

  const {
    loading: detailLoading,
    error: detailError,
    subtance_question_detail,
  } = useSelector((state) => state.detailSubtanceQuestionDetail);
  const {
    loading: allLoading,
    error: allError,
    subtance_question_type,
  } = useSelector((state) => state.allSubtanceQuestionType);
  const { loading, error, success } = useSelector(
    (state) => state.updateSubtanceQuestionDetail
  );
  let { id } = router.query;

  const [question, setQuestion] = useState(
    subtance_question_detail.question || ""
  );
  const [question_image, setQuestionImage] = useState(
    subtance_question_detail.question_image
  );
  const [question_image_preview, setQuestionImagePreview] = useState(
    subtance_question_detail.question_image_preview
  );
  const [question_preview, setQuestionPreview] = useState(null);

  const initialAnswer = JSON.parse(
    subtance_question_detail && subtance_question_detail.answer
  );

  const [answer, setAnswer] = useState(initialAnswer || "");

  const [answer_key, setAnswerKey] = useState(
    subtance_question_detail.answer_key || ""
  );
  const [question_type, setQuestionType] = useState(
    subtance_question_detail.type.id || ""
  );

  const [status, setStatus] = useState(subtance_question_detail.status);

  useEffect(() => {
    if (success) {
      dispatch({
        type: UPDATE_SUBTANCE_QUESTION_DETAIL_RESET,
      });
      router.push({
        pathname: `/subvit/substansi`,
        query: { success: true },
      });
    }
  }, [dispatch, success, router]);

  const handleSoalImage = (e) => {
    setQuestionImagePreview(e.target.value.substr(12));
    if (e.target.name === "question_image") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setQuestionImage(reader.result);
        }
      };
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
        setQuestionPreview(URL.createObjectURL(e.target.files[0]));
      }
    }
  };

  const handleRemoveClick = (index) => {
    const list = [...answer];
    list.splice(index, 1);
    list.forEach((row, i) => {
      let key = String.fromCharCode(65 + i);
      list[i]["key"] = key;
    });
    setAnswer(list);
  };

  const handleAddClick = () => {
    let keyindex;
    if (answer.length != 0) {
      const lastobj = answer[answer.length - 1];
      keyindex = lastobj.key.charCodeAt(0);
    } else {
      keyindex = 64;
    }
    const newKey = String.fromCharCode(keyindex + 1);
    setAnswer([
      ...answer,
      { key: newKey, question: "", image: "", is_right: false },
    ]);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...answer];
    list[index][name] = value;
    if (name === "question_image") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          list[index]["image"] = reader.result;
        }
      };
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
        list[index]["image_name"] = URL.createObjectURL(e.target.files[0]);
        // list[index]["image_name"] = e.target.files[0].name;
      }
    }
    setAnswer(list);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      dispatch({
        type: UPDATE_SUBTANCE_QUESTION_DETAIL_RESET,
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

    if (question_type === "") {
      valid = false;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi Tipe Soal dengan benar !",
      });
    }

    if (valid) {
      var answers = JSON.stringify(answer);
      const data = {
        subtance_question_bank_id:
          subtance_question_detail.subtance_question_bank_id,
        question,
        question_image,
        answer: answers,
        status,
        answer_key,
        question_type_id: question_type,
      };

      dispatch(updateSubtanceQuestionDetail(id, data, token));
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

      <div className="col-lg-12 order-1 px-0">
        {loading ? <LoadingPage loading={loading} /> : ""}
        <div className="card card-custom card-stretch gutter-b">
          <form onSubmit={handleSubmit}>
            <div className="card-header border-0 d-flex pb-0">
              <h3 className="card-title font-weight-bolder text-dark">
                Soal{" "}
                {subtance_question_detail
                  ? subtance_question_detail.bank_soal + 1
                  : 0}
              </h3>
              <div className="card-toolbar ml-auto"></div>
            </div>

            <div className="card-body pt-0">
              <div className="title row ">
                {question_image_preview ? (
                  <div className="col-md-3 mt-3">
                    <Image
                      src={
                        question_image
                          ? question_preview
                          : process.env.END_POINT_API_IMAGE_SUBVIT +
                            question_image_preview
                      }
                      alt="logo"
                      width={300}
                      height={160}
                      quality={100}
                      className="soal-image"
                    />
                  </div>
                ) : (
                  ""
                )}
                <div className="col-md-9 pt-2">
                  <span className="font-weight-bold ">Tipe Soal</span>
                  <select
                    name="training_id"
                    className="form-control mb-2 mt-2"
                    onChange={(e) => setQuestionType(e.target.value)}
                    onBlur={(e) => setQuestionType(e.target.value)}
                    value={question_type}
                  >
                    <option selected disabled value="">
                      -- Tipe Soal --
                    </option>
                    {subtance_question_type.list_types
                      .filter((row) => row.status === 1)
                      .map((row) => {
                        return (
                          <option key={row.id} value={row.id}>
                            {row.name}
                          </option>
                        );
                      })}
                  </select>
                  <input
                    type="text"
                    className="form-control"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Contoh Soal"
                  />
                  <div className="custom-file mt-2">
                    <span>Gambar Pertanyaan (Opsional)</span>
                    <input
                      type="file"
                      className="custom-file-input"
                      name="question_image"
                      onChange={(e) => handleSoalImage(e)}
                      accept="image/png, image/gif, image/jpeg , image/jpg"
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      {question_image_preview
                        ? !question_image
                          ? question_image_preview.substr(16)
                          : question_image_preview
                        : "Choose file"}
                    </label>
                  </div>
                </div>
              </div>

              <div className="answer mt-5">
                {answer.map((row, i) => {
                  return (
                    <>
                      <div className="title row ">
                        {row.image_preview ? (
                          <div className="col-md-2 p-0 pl-3 mt-2">
                            <Image
                              src={
                                row.image_name ||
                                process.env.END_POINT_API_IMAGE_SUBVIT +
                                  row.image_preview
                              }
                              alt="logo"
                              width={200}
                              height={85}
                              className="soal-image"
                            />
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="col-md-6 pt-2">
                          <input
                            type="text"
                            name="option"
                            className="form-control"
                            placeholder={`Jawaban ` + row.key}
                            value={row.option}
                            onChange={(e) => handleInputChange(e, i)}
                            autoComplete="off"
                          />
                          <div className="custom-file mt-2">
                            <span>Gambar Pertanyaan (Opsional)</span>
                            <input
                              type="file"
                              className="custom-file-input"
                              name="question_image"
                              accept="image/png, image/gif, image/jpeg , image/jpg"
                              onChange={(e) => handleInputChange(e, i)}
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="customFile"
                            >
                              {(row.question_image &&
                                row.question_image.substr(12)) ||
                                (row.image_preview &&
                                  row.image_preview.substr(16))}
                            </label>
                          </div>
                        </div>
                        <div className="col-md-4 d-flex justify-content-start my-auto pt-3">
                          <button
                            className="btn btn-link-action bg-danger text-white"
                            type="button"
                            onClick={() => handleRemoveClick(i)}
                          >
                            <i className="ri-delete-bin-fill p-0 text-white"></i>
                          </button>
                          <div className="ml-3">
                            <SwitchButton
                              checked={row.is_right}
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
                          {row.is_right ? (
                            <span className="ml-2">
                              Pilihan Kunci yang benar
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>

              {answer.length < 6 ? (
                <div className="button-add my-4">
                  <button
                    type="button"
                    className="btn btn-rounded-full bg-blue-secondary text-white btn-sm"
                    onClick={() => handleAddClick()}
                  >
                    <i className="ri-add-fill text-white"></i> Tambah Jawaban
                  </button>
                </div>
              ) : (
                ""
              )}

              <div className="form-group">
                <div className="col-sm-12 col-md-12"></div>
                <div className="col-sm-12 col-md-12 mt-3">
                  <span className="font-weight-bold">Status</span>
                  <select
                    name="training_id"
                    className="form-control"
                    onChange={(e) => setStatus(e.target.value)}
                    onBlur={(e) => setStatus(e.target.value)}
                    value={status}
                  >
                    <option selected disabled value="">
                      -- Status --
                    </option>
                    <option value={1}>Publish</option>
                    <option value={0}>Draft</option>
                  </select>
                </div>
              </div>
              <div className="button-back float-right p-5">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className={`${styles.btnNext} btn btn-light-ghost-rounded-full mr-2`}
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  className="btn btn-primary-rounded-full text-white"
                >
                  Simpan
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};

export default EditSoalSubstansi;
