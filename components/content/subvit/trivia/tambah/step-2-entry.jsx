import React, { useState, useEffect } from "react";

import Swal from "sweetalert2"
import { useDispatch, useSelector } from "react-redux";

import { newSubtanceQuestionDetail, clearErrors } from '../../../../../redux/actions/subvit/subtance-question-detail.action'
import { NEW_SUBTANCE_QUESTION_DETAIL_RESET } from "../../../../../redux/types/subvit/subtance-question-detail.type";
import { useRouter } from "next/router";

import PageWrapper from "/components/wrapper/page.wrapper";
import StepInput from "/components/StepInput";
import LoadingPage from "../../../../LoadingPage"
import ObjectiveComponent from "./step-2/objective-component";

const StepTwo = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  let { metode, id } = router.query;
  const { loading, error, success } = useSelector((state) => state.newSubtanceQuestionDetail);

  const [methodAdd, setMethodAdd] = useState('objective')
  const [question, setSoal] = useState('')
  const [question_image, setSoalImage] = useState('')
  const [answer, setSoalList] = useState([
    { key: 'A', option: '', image: '', is_right: false },
    { key: 'B', option: '', image: '', is_right: false },
    { key: 'C', option: '', image: '', is_right: false },
    { key: 'D', option: '', image: '', is_right: false }
  ])
  const [answer_key, setAnswerKey] = useState('')
  const [typeSave, setTypeSave] = useState('lanjut')

  useEffect(() => {

    if (success) {
      if (typeSave === 'lanjut') {
        router.push({
          pathname: `/subvit/substansi/tambah-step-3`,
          query: { id }
        })
      } else if (typeSave === 'draft') {
        router.push({
          pathname: `/subvit/substansi/tambah-step-2`,
          query: { metode, id }
        });
      }
    }
  }, [dispatch, error, success, typeSave]);

  const handleSoalImage = (e) => {
    if (e.target.name === 'question_image') {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
          setSoalImage(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const saveDraft = () => {
    setTypeSave('draft')
    // router.push("/subvit/substansi");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setTypeSave('lanjut')
    let valid = true

    if (error) {
      dispatch(clearErrors())
    }

    if (success) {
      dispatch({
        type: NEW_SUBTANCE_QUESTION_DETAIL_RESET
      })
    }

    if (answer_key === '') {
      valid = false
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Isi kunci jawaban dengan benar !'
      })
    }

    if (question == '' && question_image == '') {
      valid = false
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Isi pertanyaan dengan benar !'
      })
    }

    answer.forEach((row, j) => {
      if (row.option == '' && row.image == '') {
        valid = false
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Isi jawaban dengan benar !'
        })
      }
    })

    const answers = JSON.stringify(answer)
    if (valid) {
      const data = {
        subtance_question_bank_id: id,
        question,
        answer: answers,
        question_image,
        answer_key,
      }

      console.log(data)

      //   dispatch(newSubtanceQuestionDetail(data))
    }
  }

  const handleMethodeInput = () => {
    switch (methodAdd) {
      case "objective":
        return (
          <ObjectiveComponent
            props_answer={answer => setSoalList(answer)}
            props_answer_key={key => setAnswerKey(key)}
          />
        )
      case "choice":
        return (
          <h1>Hello Choice</h1>
        )
      case "terbuka":
        return (
          <h1>Hello Terbuka</h1>
        )
      case "triger":
        return (
          <h1>Hello Triger</h1>
        )
      default:
        return (
          <ObjectiveComponent
            props_answer={answer => setSoalList(answer)}
            props_answer_key={key => setAnswerKey(key)}
          />
        )
    }
  }

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
      <div className="col-lg-12 order-1 order-xxl-2 px-0">
        {
          loading ?
            <LoadingPage loading={loading} />
            : ''
        }
        <div className="card card-custom card-stretch gutter-b">
          <StepInput step="2"></StepInput>
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">Soal 1</h3>
          </div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="form-group row">
                <div className="col-sm-12 col-md-8">
                  <span>Pertanyaan</span>
                  <input type="text" className="form-control" value={question} onChange={e => setSoal(e.target.value)} autoComplete='off' />
                  <span className="text-muted">Silahkan Input Pertanyaan</span>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 col-md-8">
                  <div class="custom-file">
                    <span>Gambar Pertanyaan (Opsional)</span>
                    <input type="file" class="custom-file-input" name='question_image' onChange={e => handleSoalImage(e)} />
                    <label class="custom-file-label" for="customFile">
                      Choose file
                    </label>
                  </div>
                  <span className="text-muted">Silahkan Input Pertanyaan</span>
                </div>
              </div>

              <div>Jenis Pertanyaan</div>
              <div className="form-group row mt-4 ml-1 mb-3">
                <div className="col-sm-12 col-md-8">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="objective"
                      checked={methodAdd === "objective"}
                      onChange={() => setMethodAdd("objective")}
                    />
                    <label class="form-check-label" for="inlineRadio1">
                      Objective
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      value="choice"
                      checked={methodAdd === "choice"}
                      onChange={() => setMethodAdd("choice")}
                    />
                    <label class="form-check-label" for="inlineRadio2">
                      Multiple Choice
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio3"
                      value="terbuka"
                      checked={methodAdd === "terbuka"}
                      onChange={() => setMethodAdd("terbuka")}
                    />
                    <label class="form-check-label" for="inlineRadio3">
                      Pertanyaan Terbuka
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio4"
                      value="triger"
                      checked={methodAdd === "triger"}
                      onChange={() => setMethodAdd("triger")}
                    />
                    <label class="form-check-label" for="inlineRadio4">
                      Triggered Question
                    </label>
                  </div>
                </div>
              </div>
              <div className="">
                <span className="text-muted">Silahkan Pilih Metode Tambah Survey</span>
              </div>

              {
                handleMethodeInput()
              }

              <div className="form-group row">
                <div className="col-sm-2"></div>
                <div className="col-sm-10 text-right">
                  <button
                    className="btn btn-light-primary btn-sm mr-2"
                    type='submit'
                  >
                    Simpan & Lanjut
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={saveDraft}
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
