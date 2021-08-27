import React, { useState, useEffect } from "react";

import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import Swal from "sweetalert2"
import { useDispatch, useSelector } from "react-redux";

import {
  getAllSubtanceQuestionBanksType,
} from '../../../../../redux/actions/subvit/subtance-question-type.actions';
import { newSubtanceQuestionDetail, clearErrors } from '../../../../../redux/actions/subvit/subtance-question-detail.action'
import { NEW_SUBTANCE_QUESTION_DETAIL_RESET } from "../../../../../redux/types/subvit/subtance-question-detail.type";
import { useRouter } from "next/router";

import PageWrapper from "/components/wrapper/page.wrapper";
import StepInput from "/components/StepInput";
import LoadingPage from "../../../../LoadingPage"

const StepTwo = () => {
  const dispatch = useDispatch();
  const importSwitch = () => import("bootstrap-switch-button-react");
  const SwitchButton = dynamic(importSwitch, {
    ssr: false,
  });
  const router = useRouter();

  let { metode, id } = router.query;
  const { loading, error, success } = useSelector((state) => state.newSubtanceQuestionDetail);
  const { loading: allLoading, error: allError, subtance_question_type } = useSelector((state) => state.allSubtanceQuestionType);
  const { loading: oneLoading, subtance } = useSelector((state) => state.detailSubtanceQuestionBanks)

  const [question, setSoal] = useState('')
  const [question_image, setSoalImage] = useState('')
  const [answer, setSoalList] = useState([
    { key: 'A', option: '', image: '', is_right: false },
    { key: 'B', option: '', image: '', is_right: false },
    { key: 'C', option: '', image: '', is_right: false },
    { key: 'D', option: '', image: '', is_right: false }
  ])
  const [answer_key, setAnswerKey] = useState('')
  const [question_type_id, setQuestionTypeId] = useState('')
  const [typeSave, setTypeSave] = useState('lanjut')

  useEffect(() => {

    if (success) {
      dispatch({
        type: NEW_SUBTANCE_QUESTION_DETAIL_RESET
      })
      if (typeSave === 'lanjut') {
        router.push({
          pathname: `/subvit/substansi/tambah-step-3`,
          query: { id }
        })
        console.log(typeSave)
      } else if (typeSave === 'draft') {
        handleResetForm()
        router.push({
          pathname: `/subvit/substansi/tambah-step-2-${metode}`,
          query: { id, metode }
        });
      }
    }
  }, [dispatch, error, success, typeSave, id, metode, router]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...answer];
    list[index][name] = value;
    if (name === 'image') {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
          list[index]['image'] = reader.result
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
    setSoalList(list);
  }

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

  const handleAnswer = (value, i) => {
    setAnswerKey(answer[i].key)
    if (value === false) {
      setAnswerKey('')
    }
    const list = [...answer]
    list.forEach((row, j) => {
      list[j]['is_right'] = false
    })
    list[i]['is_right'] = value
  }

  const handleRemoveClick = (index) => {
    const list = [...answer]
    list.splice(index, 1)
    setSoalList(list)
  }

  const handleAddClick = () => {
    const lastobj = answer[answer.length - 1]
    const keyindex = lastobj.key.charCodeAt(0)
    const newKey = String.fromCharCode(keyindex + 1)
    setSoalList([...answer, { key: newKey, question: '', image: '', is_right: false }])
  }

  const handleResetForm = () => {
    setSoal('')
    setSoalImage('')
    setSoalList([
      { key: 'A', option: '', image: '', is_right: false },
      { key: 'B', option: '', image: '', is_right: false },
      { key: 'C', option: '', image: '', is_right: false },
      { key: 'D', option: '', image: '', is_right: false }
    ])
    setAnswerKey('')
    setQuestionTypeId('')
  }

  const saveDraft = () => {
    setTypeSave('draft')
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

    if (question_type_id === '') {
      valid = false
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Isi Tipe Soal dengan benar !'
      })
    }

    const answers = JSON.stringify(answer)
    if (valid) {
      const data = {
        subtance_question_bank_id: id,
        question,
        answer: answers,
        question_image,
        question_type_id,
        answer_key,
      }

      dispatch(newSubtanceQuestionDetail(data))
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

    if (question_type_id === '') {
      valid = false
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Isi Tipe Soal dengan benar !'
      })
    }

    const answers = JSON.stringify(answer)
    if (valid) {
      const data = {
        subtance_question_bank_id: id,
        question,
        answer: answers,
        question_image,
        question_type_id,
        answer_key,
      }

      dispatch(newSubtanceQuestionDetail(data))
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
      <div className="col-lg-12 order-1 order-xxl-2 px-0">
        {
          loading ?
            <LoadingPage loading={loading} />
            : ''
        }
        <div className="card card-custom card-stretch gutter-b">
          <StepInput step="2"></StepInput>
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">Soal {subtance.bank_soal + 1}</h3>
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
                  <div className="custom-file">
                    <span>Gambar Pertanyaan (Opsional)</span>
                    <input type="file" className="custom-file-input" name='question_image' onChange={e => handleSoalImage(e)} accept="image/png, image/gif, image/jpeg , image/jpg" />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose file
                    </label>
                  </div>
                  <span className="text-muted">Silahkan Input Pertanyaan</span>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-4">
                  <p>Jawaban</p>
                </div>
                <div className="col-4">
                  <p>Input Gambar (Opsional)</p>
                </div>
                <div className="col-4">
                  <p>Kunci Jawaban Yang Benar</p>
                </div>

                {answer.map((x, i) => {
                  return (
                    <>
                      <div className="col-sm-12 col-md-4">
                        <input type="text" className="form-control" name='option' value={x.option} placeholder={x.key} onChange={e => handleInputChange(e, i)} autoComplete='off' />
                        <span className="text-muted">Silahkan Pilihan {x.key}</span>
                      </div>
                      <div className="col-sm-12 col-md-3">
                        <div className="custom-file">
                          <input type="file" className="custom-file-input" name='image' onChange={e => handleInputChange(e, i)} accept="image/png, image/gif, image/jpeg , image/jpg" />
                          <label className="custom-file-label" htmlFor="customFile">
                            Choose file
                          </label>
                        </div>
                        <span className="text-muted">Input Gambar (Opsional)</span>
                      </div>
                      <div className="col-sm-12 col-md-1">
                        {answer.length !== 1 && x.key !== 'A' ?
                          <button className="btn mr-1" type='button' onClick={() => handleRemoveClick(i)}>
                            <Image
                              alt="button-action"
                              src="/assets/icon/trash-red.svg"
                              width={18}
                              height={18}
                            />
                          </button>
                          : ''
                        }
                      </div>
                      <div className="col-sm-12 col-md-4">
                        <SwitchButton
                          checked={x.is_right}
                          onlabel=" "
                          onstyle="primary"
                          offlabel=" "
                          offstyle="danger"
                          size="sm"
                          width={20}
                          height={10}
                          onChange={(checked) => handleAnswer(checked, i)}
                        />
                        <span className="text-muted">
                          Silahkan pilih kunci jawaban yang benar
                        </span>
                      </div>
                    </>
                  )
                })}

              </div>

              <div className="form-group row">
                <div className="col-sm-6 col-md-2">
                  {answer.length < 6 ?
                    <button type='button' className="btn btn-primary" onClick={() => handleAddClick()}>Tambah Jawaban</button> : ''
                  }
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 col-md-8">
                  <span>Tipe Soal</span>
                  <select
                    name="training_id"
                    id=""
                    onChange={(e) => setQuestionTypeId(e.target.value)}
                    onBlur={e => setQuestionTypeId(e.target.value)}
                    value={question_type_id}
                    className="form-control"
                  >
                    <option selected disabled value=''>-- Tipe Soal --</option>
                    {
                      subtance_question_type.list_types.map((row) => {
                        return (
                          <option key={row.id} value={row.id}>{row.name}</option>
                        )
                      })
                    }
                  </select>
                  <span className="text-muted">Silahkan Pilih Tipe Soal</span>
                </div>
              </div>

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
                    type='button'
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
