import React, { useEffect, useState, useRef } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import dynamic from "next/dynamic";
import Swal from "sweetalert2"

import { useDispatch, useSelector } from 'react-redux'

import { clearErrors, updateTriviaQuestionDetail } from '../../../../../redux/actions/subvit/trivia-question-detail.action'
import { UPDATE_TRIVIA_QUESTION_DETAIL_RESET } from '../../../../../redux/types/subvit/trivia-question-detail.type'

import PageWrapper from '../../../../wrapper/page.wrapper'
import LoadingPage from '../../../../LoadingPage'
import PollingComponent from './edit-soal/polling-component';
import CheckboxComponent from './edit-soal/checkbox-component';
import BlankComponent from './edit-soal/blank-component';

const EditSoalTrivia = () => {

    const dispatch = useDispatch()
    const router = useRouter()
    const importSwitch = () => import("bootstrap-switch-button-react");
    const SwitchButton = dynamic(importSwitch, {
        ssr: false,
    });

    const { loading: detailLoading, error: detailError, trivia_question_detail } = useSelector(state => state.detailTriviaQuestionDetail)
    const { loading, error, success } = useSelector((state) => state.updateTriviaQuestionDetail)
    let { id } = router.query

    const [methodAdd, setMethodAdd] = useState(trivia_question_detail.type)

    const [question, setQuestion] = useState(trivia_question_detail.question)
    const [question_image, setQuestionImage] = useState(trivia_question_detail.question_image)

    const [answer, setAnswer] = useState(JSON.parse(trivia_question_detail.answer))

    const [duration, setDuration] = useState(trivia_question_detail.duration)
    const [answerKey, setAnswerKey] = useState(trivia_question_detail.answer_key)
    const [status, setStatus] = useState(trivia_question_detail.status)

    useEffect(() => {
        if (success) {
            dispatch({
                type: UPDATE_TRIVIA_QUESTION_DETAIL_RESET
            })
            router.push({
                pathname: `/subvit/trivia`,
                query: { success: true },
            });
        }
    }, [dispatch, success, router])

    const handleSoalImage = (e) => {
        if (e.target.name === 'question_image') {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setQuestionImage(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        let valid = true

        if (error) {
            dispatch(clearErrors())
        }

        if (success) {
            dispatch({
                type: UPDATE_TRIVIA_QUESTION_DETAIL_RESET
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
        switch (methodAdd) {
            case "polling":
                if (valid) {
                    const data = {
                        trivia_question_bank_id: trivia_question_detail.trivia_question_bank_id,
                        question,
                        question_image,
                        answer: answers,
                        status,
                        type: methodAdd,
                        _method: 'put'
                    }
                    dispatch(updateTriviaQuestionDetail(id, data))
                }
                break
            case "checkbox":
                if (valid) {
                    const data = {
                        trivia_question_bank_id: trivia_question_detail.trivia_question_bank_id,
                        question,
                        question_image,
                        answer: answers,
                        duration,
                        status,
                        type: methodAdd,
                        _method: 'put'
                    }
                    dispatch(updateTriviaQuestionDetail(id, data))
                }
                break
            case "fill_in_the_blank":
                if (valid) {
                    const data = {
                        trivia_question_bank_id: trivia_question_detail.trivia_question_bank_id,
                        question,
                        question_image,
                        answer: answers,
                        duration,
                        status,
                        type: methodAdd,
                        _method: 'put'
                    }
                    dispatch(updateTriviaQuestionDetail(id, data))
                }
                break
            default:
                break;
        }

    }

    const handleMethodeInput = () => {
        switch (methodAdd) {
            case "polling":
                return (
                    <PollingComponent
                        propsAnswer={answer}
                        propsStatus={status}
                        sendPropsAnswer={answers => setAnswer(answers)}
                        sendPropsStatus={status => setStatus(status)}
                    />
                )
                break
            case "checkbox":
                return (
                    <CheckboxComponent
                        propsAnswer={answer}
                        propsStatus={status}
                        propsDuration={duration}
                        propsAnswerKey={answerKey}
                        sendPropsAnswer={answers => setAnswer(answers)}
                        sendPropsStatus={status => setStatus(status)}
                        sendPropsDuration={duration => setDuration(duration)}
                        sendPropsAnswerKey={answerKey => setAnswerKey(answerKey)}
                    />
                )
                break
            case "fill_in_the_blank":
                return (
                    <BlankComponent
                        propsAnswer={answer}
                        propsStatus={status}
                        propsDuration={duration}
                        sendPropsAnswer={answers => setAnswer(answers)}
                        sendPropsStatus={status => setStatus(status)}
                        sendPropsDuration={duration => setDuration(duration)}
                    />
                )
                break
            default:
                return (
                    <PollingComponent
                        propsAnswer={answer => setAnswer(answer)}
                        propsStatus={status => setStatus(status)}
                    />
                )
                break
        }
    }

    return (
        <PageWrapper>
            {error ?
                <div className="alert alert-custom alert-light-danger fade show mb-5" role="alert">
                    <div className="alert-icon"><i className="flaticon-warning"></i></div>
                    <div className="alert-text">{error}</div>
                    <div className="alert-close">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true"><i className="ki ki-close"></i></span>
                        </button>
                    </div>
                </div>
                : ''
            }

            <div className="col-lg-12 order-1 px-0">
                {
                    loading ?
                        <LoadingPage loading={loading} />
                        : ''
                }
                <div className="card card-custom card-stretch gutter-b">
                    <form onSubmit={handleSubmit}>
                        <div className="card-header border-0 d-flex pb-0">
                            <h3 className="card-title font-weight-bolder text-dark">Soal 1</h3>
                            <div className="card-toolbar ml-auto">
                                <button className="btn btn-sm btn-primary px-6 font-weight-bold ">
                                    Simpan
                                </button>
                            </div>
                        </div>

                        <div className="card-body pt-0">
                            <div className="title row">
                                <div className="col-md-3">
                                    <Image src='/assets/logo/logo-2.svg' alt='logo' width={204} height={100} />
                                </div>
                                <div className="col-md-7 pt-2">
                                    <input
                                        type="text"
                                        className='form-control'
                                        value={question}
                                        onChange={e => setQuestion(e.target.value)}
                                        placeholder="Contoh Soal"
                                    />
                                    <div className="custom-file mt-2">
                                        <span>Gambar Pertanyaan (Opsional)</span>
                                        <input
                                            type="file"
                                            className="custom-file-input"
                                            name='question_image'
                                            onChange={e => handleSoalImage(e)}
                                            accept="image/png, image/gif, image/jpeg , image/jpg"
                                        />
                                        <label className="custom-file-label" htmlFor="customFile">
                                            Choose file
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-2 d-flex my-auto">
                                    <button className="btn pt-0 mr-3" style={{ marginTop: '45px' }} type='button' >
                                        <Image
                                            alt="button-action"
                                            src="/assets/icon/trash-red.svg"
                                            width={20}
                                            height={30}
                                        />
                                    </button>
                                </div>
                            </div>

                            <div>Jenis Pertanyaan</div>
                            <div className="form-group row mt-4 ml-1 mb-3">
                                <div className="col-sm-12 col-md-8">
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="inlineRadioOptions"
                                            id="inlineRadio1"
                                            value="polling"
                                            checked={methodAdd === "polling"}
                                            onChange={() => setMethodAdd("polling")}
                                        />
                                        <label className="form-check-label" htmlFor="inlineRadio1">
                                            Polling
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="inlineRadioOptions"
                                            id="inlineRadio2"
                                            value="checkbox"
                                            checked={methodAdd === "checkbox"}
                                            onChange={() => setMethodAdd("checkbox")}
                                        />
                                        <label className="form-check-label" htmlFor="inlineRadio2">
                                            Checkbox
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="inlineRadioOptions"
                                            id="inlineRadio3"
                                            value="fill_in_the_blank"
                                            checked={methodAdd === "fill_in_the_blank"}
                                            onChange={() => setMethodAdd("fill_in_the_blank")}
                                        />
                                        <label className="form-check-label" htmlFor="inlineRadio3">
                                            Fill in the blank
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <span className="text-muted">Silahkan Pilih Metode Tambah Trivia</span>
                            </div>

                            {
                                handleMethodeInput()
                            }

                            <div className="col-md-10 pb-0 mb-0">
                                <hr />
                            </div>

                            <div className="button-back">
                                <button type='button' onClick={() => router.back()} className="btn btn-sm btn-light-danger font-weight-bold" >Kembali</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>

        </PageWrapper >
    )
}

export default EditSoalTrivia