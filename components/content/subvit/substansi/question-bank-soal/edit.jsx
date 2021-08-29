import React, { useEffect, useState, useRef } from "react";

import Link from "next/link";
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

const EditSoalSubstansi = () => {
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

  const [question, setQuestion] = useState(subtance_question_detail.question);
  const [question_image, setQuestionImage] = useState(
    subtance_question_detail.question_image
  );

  const [answer, setAnswer] = useState(
    JSON.parse(subtance_question_detail.answer)
  );

  const [answer_key, setAnswerKey] = useState(
    subtance_question_detail.answer_key
  );
  const [question_type, setQuestionType] = useState(
    subtance_question_detail.type.id
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
    if (e.target.name === "question_image") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setQuestionImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleRemoveClick = (index) => {
    const list = [...answer];
    list.splice(index, 1);
    setAnswer(list);
  };

  const handleAddClick = () => {
    const lastobj = answer[answer.length - 1];
    const keyindex = lastobj.key.charCodeAt(0);
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
    if (name === "image") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          list[index]["image"] = reader.result;
        }
      };
      reader.readAsDataURL(e.target.files[0]);
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
      console.log(data);
      dispatch(updateSubtanceQuestionDetail(id, data));
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
                Soal 1
              </h3>
              <div className="card-toolbar ml-auto">
                <button className="btn btn-sm btn-primary px-6 font-weight-bold ">
                  Simpan
                </button>
              </div>
            </div>

            <div className="card-body pt-0">
              <div className="title row">
                <div className="col-md-3">
                  <Image
                    src="/assets/logo/logo-2.svg"
                    alt="logo"
                    width={204}
                    height={100}
                  />
                </div>
                <div className="col-md-7 pt-2">
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
                      Choose file
                    </label>
                  </div>
                </div>
                <div className="col-md-2"></div>
              </div>

              <div className="answer mt-5">
                {answer.map((row, i) => {
                  return (
                    <>
                      <div className="title row">
                        <div className="col-md-2 p-0 pl-3">
                          <Image
                            src="/assets/media/Gambar.svg"
                            alt="logo"
                            width={148}
                            height={90}
                          />
                        </div>
                        <div className="col-md-8 pt-2">
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
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="customFile"
                            >
                              Choose file
                            </label>
                          </div>
                        </div>
                        <div className="col-md-2 d-flex justify-content-start my-auto">
                          <button
                            className="btn pt-0 mr-3"
                            type="button"
                            onClick={() => handleRemoveClick(i)}
                          >
                            <Image
                              alt="button-action"
                              src="/assets/icon/trash-red.svg"
                              width={20}
                              height={30}
                            />
                          </button>
                          <SwitchButton
                            checked={row.is_right}
                            onlabel=" "
                            onstyle="primary"
                            offlabel=" "
                            offstyle="danger"
                            size="sm"
                            width={20}
                            height={10}
                            onChange={(checked) => handleAnswer(checked, i)}
                          />
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
                    className="btn btn-sm btn-light-success font-weight-bold"
                    onClick={() => handleAddClick()}
                  >
                    Tambah Jawaban
                  </button>
                </div>
              ) : (
                ""
              )}

              <div className="form-group row">
                <div className="col-sm-12 col-md-5">
                  <span>Tipe Soal</span>
                  <select
                    name="training_id"
                    className="form-control"
                    onChange={(e) => setQuestionType(e.target.value)}
                    onBlur={(e) => setQuestionType(e.target.value)}
                    value={question_type}
                  >
                    <option selected disabled value="">
                      -- Tipe Soal --
                    </option>
                    {subtance_question_type.list_types.map((row) => {
                      return (
                        <option key={row.id} value={row.id}>
                          {row.name}
                        </option>
                      );
                    })}
                  </select>
                  <span className="text-muted">Silahkan Pilih Tipe Soal</span>
                </div>
                <div className="col-sm-12 col-md-5">
                  <span>Status</span>
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
                  <span className="text-muted">Silahkan Pilih Status</span>
                </div>
              </div>
              <div className="col-md-10 pb-0 mb-0">
                <hr />
              </div>

              <div className="button-back">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="btn btn-sm btn-light-danger font-weight-bold"
                >
                  Kembali
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
