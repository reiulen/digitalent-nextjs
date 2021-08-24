import React, { useState, useEffect } from "react";

import Swal from "sweetalert2"
import { useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD

import { newSubtanceQuestionDetail, clearErrors } from '../../../../../redux/actions/subvit/subtance-question-detail.action'
import { NEW_SUBTANCE_QUESTION_DETAIL_RESET } from "../../../../../redux/types/subvit/subtance-question-detail.type";
=======
import { newTriviaQuestionDetail, clearErrors } from '../../../../../redux/actions/subvit/trivia-question-detail.action'
import { NEW_TRIVIA_QUESTION_DETAIL_RESET } from "../../../../../redux/types/subvit/trivia-question-detail.type";
>>>>>>> 8f98c0c98aed522953f188098266e73c67e33da0
import { useRouter } from "next/router";

import PageWrapper from "/components/wrapper/page.wrapper";
import StepInput from "/components/StepInput";
import LoadingPage from "../../../../LoadingPage"
<<<<<<< HEAD
import ObjectiveComponent from "./step-2/objective-component";
=======

import PollingComponent from "./step-2/polling-component";
import CheckboxComponent from "./step-2/checkbox-component";
import BlankComponent from "./step-2/blank-component";
>>>>>>> 8f98c0c98aed522953f188098266e73c67e33da0

const StepTwo = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  let { metode, id } = router.query;
<<<<<<< HEAD
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
=======
  const { loading, error, success } = useSelector((state) => state.newTriviaQuestionDetail);
  const { trivia } = useSelector((state) => state.detailTriviaQuestionBanks)

  const [methodAdd, setMethodAdd] = useState('polling')
  const [question, setSoal] = useState('')
  const [question_image, setSoalImage] = useState('')

  // polling
  const [answer, setSoalList] = useState([
    { key: 'A', option: '', image: '' },
    { key: 'B', option: '', image: '' },
    { key: 'C', option: '', image: '' },
    { key: 'D', option: '', image: '' }
  ])
  //checkbox
  const [answer_checkbox, setCheckboxList] = useState([
    { key: 'A', value: '', option: '', image: '', is_right: false },
    { key: 'B', value: '', option: '', image: '', is_right: false },
    { key: 'C', value: '', option: '', image: '', is_right: false },
    { key: 'D', value: '', option: '', image: '', is_right: false }
  ])
  const [duration, setDuration] = useState(null)
  //blank
  const [answer_blank, setBlanklList] = useState([
    { key: 'A', value: '', type: '', option: '' },
    { key: 'B', value: '', type: '', option: '' },
    { key: 'C', value: '', type: '', option: '' },
    { key: 'D', value: '', type: '', option: '' }
  ])
  const [durationBlank, setDurationBlank] = useState(null)

>>>>>>> 8f98c0c98aed522953f188098266e73c67e33da0
  const [answer_key, setAnswerKey] = useState('')
  const [typeSave, setTypeSave] = useState('lanjut')

  useEffect(() => {

    if (success) {
<<<<<<< HEAD
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
=======
      dispatch({
        type: NEW_TRIVIA_QUESTION_DETAIL_RESET
      })
      if (typeSave === 'lanjut') {
        handleResetForm()
        router.push({
          pathname: `/subvit/trivia/tambah/step-3`,
          query: { id }
        })
      } else if (typeSave === 'draft') {
        handleResetForm()
        router.push({
          pathname: `/subvit/trivia/tambah/step-2-${metode}`,
          query: { metode, id }
        });
        window.location.reload()
>>>>>>> 8f98c0c98aed522953f188098266e73c67e33da0
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

<<<<<<< HEAD
  const saveDraft = () => {
    setTypeSave('draft')
    // router.push("/subvit/substansi");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setTypeSave('lanjut')
=======
  const handleResetForm = () => {
    setSoal('')
    setSoalImage('')
    setSoalList([
      { key: 'A', option: '', image: '' },
      { key: 'B', option: '', image: '' },
      { key: 'C', option: '', image: '' },
      { key: 'D', option: '', image: '' }
    ])
    setCheckboxList([
      { key: 'A', value: '', option: '', image: '', is_right: false },
      { key: 'B', value: '', option: '', image: '', is_right: false },
      { key: 'C', value: '', option: '', image: '', is_right: false },
      { key: 'D', value: '', option: '', image: '', is_right: false }
    ])
    setDuration('')
    setBlanklList([
      { key: 'A', value: '', type: '', option: '' },
      { key: 'B', value: '', type: '', option: '' },
      { key: 'C', value: '', type: '', option: '' },
      { key: 'D', value: '', type: '', option: '' }
    ])
    setDurationBlank('')
    setAnswerKey('')
  }

  const saveDraft = () => {
    setTypeSave('draft')
>>>>>>> 8f98c0c98aed522953f188098266e73c67e33da0
    let valid = true

    if (error) {
      dispatch(clearErrors())
    }

    if (success) {
      dispatch({
<<<<<<< HEAD
        type: NEW_SUBTANCE_QUESTION_DETAIL_RESET
      })
    }

    if (answer_key === '') {
=======
        type: NEW_TRIVIA_QUESTION_DETAIL_RESET
      })
    }

    if (question == '' && question_image == '') {
>>>>>>> 8f98c0c98aed522953f188098266e73c67e33da0
      valid = false
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
<<<<<<< HEAD
        text: 'Isi kunci jawaban dengan benar !'
=======
        text: 'Isi pertanyaan dengan benar !'
      })
    }

    switch (methodAdd) {
      case "polling":

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
            trivia_question_bank_id: id,
            question,
            answer: answers,
            question_image,
            answer_key: null,
            type: methodAdd
          }

          dispatch(newTriviaQuestionDetail(data))
        }
        break
      case "checkbox":

        if (answer_key === '') {
          valid = false
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Isi kunci jawaban dengan benar !'
          })
        }

        answer_checkbox.forEach((row, j) => {
          if (row.option == '' && row.image == '') {
            valid = false
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Isi jawaban dengan benar !'
            })
          }
        })

        const answers_check = JSON.stringify(answer_checkbox)
        if (valid) {
          const data = {
            trivia_question_bank_id: id,
            question,
            answer: answers_check,
            question_image,
            answer_key,
            duration,
            type: methodAdd
          }
          dispatch(newTriviaQuestionDetail(data))
        }
        break
      case "fill_in_the_blank":
        const answers_blank = JSON.stringify(answer_blank)
        if (valid) {
          const data = {
            trivia_question_bank_id: id,
            question,
            answer: answers_blank,
            question_image,
            answer_key,
            duration: durationBlank,
            type: methodAdd,
            answer_key: null
          }
          dispatch(newTriviaQuestionDetail(data))
        }
        break
      default:
        break;
    }
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
        type: NEW_TRIVIA_QUESTION_DETAIL_RESET
>>>>>>> 8f98c0c98aed522953f188098266e73c67e33da0
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

<<<<<<< HEAD
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
=======
    switch (methodAdd) {
      case "polling":

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
            trivia_question_bank_id: id,
            question,
            answer: answers,
            question_image,
            answer_key: null,
            type: methodAdd
          }

          dispatch(newTriviaQuestionDetail(data))
        }
        break
      case "checkbox":

        if (answer_key === '') {
          valid = false
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Isi kunci jawaban dengan benar !'
          })
        }

        answer_checkbox.forEach((row, j) => {
          if (row.option == '' && row.image == '') {
            valid = false
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Isi jawaban dengan benar !'
            })
          }
        })

        const answers_check = JSON.stringify(answer_checkbox)
        if (valid) {
          const data = {
            trivia_question_bank_id: id,
            question,
            answer: answers_check,
            question_image,
            answer_key,
            duration,
            type: methodAdd
          }
          dispatch(newTriviaQuestionDetail(data))
        }
        break
      case "fill_in_the_blank":
        const answers_blank = JSON.stringify(answer_blank)
        if (valid) {
          const data = {
            trivia_question_bank_id: id,
            question,
            answer: answers_blank,
            question_image,
            answer_key,
            duration: durationBlank,
            type: methodAdd,
            answer_key: null
          }
          dispatch(newTriviaQuestionDetail(data))
        }
        break
      default:
        break;
    }

>>>>>>> 8f98c0c98aed522953f188098266e73c67e33da0
  }

  const handleMethodeInput = () => {
    switch (methodAdd) {
<<<<<<< HEAD
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
=======
      case "polling":
        return (
          <PollingComponent
            props_answer={answer => setSoalList(answer)}
          />
        )
        break
      case "checkbox":
        return (
          <CheckboxComponent
            props_answer={answer => setCheckboxList(answer)}
            props_answer_key={key => setAnswerKey(key)}
            props_duration={duration => setDuration(duration)}
          />
        )
        break
      case "fill_in_the_blank":
        return (
          <BlankComponent
            props_answer={answer => setBlanklList(answer)}
            props_duration={duration => setDurationBlank(duration)}
          />
        )
        break
      default:
        return (
          <PollingComponent
            props_answer={answer => setSoalList(answer)}
          />
        )
        break
>>>>>>> 8f98c0c98aed522953f188098266e73c67e33da0
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
<<<<<<< HEAD
            <h3 className="card-title font-weight-bolder text-dark">Soal 1</h3>
=======
            <h3 className="card-title font-weight-bolder text-dark">Soal {trivia.bank_soal + 1}</h3>
>>>>>>> 8f98c0c98aed522953f188098266e73c67e33da0
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
<<<<<<< HEAD
                      value="objective"
                      checked={methodAdd === "objective"}
                      onChange={() => setMethodAdd("objective")}
                    />
                    <label class="form-check-label" for="inlineRadio1">
                      Objective
=======
                      value="polling"
                      checked={methodAdd === "polling"}
                      onChange={() => setMethodAdd("polling")}
                    />
                    <label class="form-check-label" for="inlineRadio1">
                      Polling
>>>>>>> 8f98c0c98aed522953f188098266e73c67e33da0
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
<<<<<<< HEAD
                      value="choice"
                      checked={methodAdd === "choice"}
                      onChange={() => setMethodAdd("choice")}
                    />
                    <label class="form-check-label" for="inlineRadio2">
                      Multiple Choice
=======
                      value="checkbox"
                      checked={methodAdd === "checkbox"}
                      onChange={() => setMethodAdd("checkbox")}
                    />
                    <label class="form-check-label" for="inlineRadio2">
                      Checkbox
>>>>>>> 8f98c0c98aed522953f188098266e73c67e33da0
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio3"
<<<<<<< HEAD
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
=======
                      value="fill_in_the_blank"
                      checked={methodAdd === "fill_in_the_blank"}
                      onChange={() => setMethodAdd("fill_in_the_blank")}
                    />
                    <label class="form-check-label" for="inlineRadio3">
                      Fill in the blank
>>>>>>> 8f98c0c98aed522953f188098266e73c67e33da0
                    </label>
                  </div>
                </div>
              </div>
              <div className="">
<<<<<<< HEAD
                <span className="text-muted">Silahkan Pilih Metode Tambah Survey</span>
=======
                <span className="text-muted">Silahkan Pilih Metode Tambah Trivia</span>
>>>>>>> 8f98c0c98aed522953f188098266e73c67e33da0
              </div>

              {
                handleMethodeInput()
              }

              <div className="form-group row">
<<<<<<< HEAD
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
=======
                <div className="col-sm-8">
                  <hr />
                  <div className="buttoon float-right">
                    <button
                      className="btn btn-light-primary btn-sm mr-2"
                      type='submit'
                    >
                      Simpan & Lanjut
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={saveDraft}
                      type='button'
                    >
                      Simpan Draft
                    </button>
                  </div>
                </div>
                <div className="col-sm-2"></div>
                <div className="col-sm-2"></div>
>>>>>>> 8f98c0c98aed522953f188098266e73c67e33da0
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default StepTwo;
