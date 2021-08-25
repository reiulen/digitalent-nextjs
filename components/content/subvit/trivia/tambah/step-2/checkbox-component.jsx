import React, { useState } from "react";

import dynamic from "next/dynamic";
import Image from "next/image";

const CheckboxComponent = ({ props_answer, props_answer_key, props_duration }) => {

    const importSwitch = () => import("bootstrap-switch-button-react");
    const SwitchButton = dynamic(importSwitch, {
        ssr: false,
    });

    const [answer, setSoalList] = useState([
        { key: 'A', value: '', option: '', image: '', is_right: false },
        { key: 'B', value: '', option: '', image: '', is_right: false },
        { key: 'C', value: '', option: '', image: '', is_right: false },
        { key: 'D', value: '', option: '', image: '', is_right: false }
    ])
    const [answer_key, setAnswerKey] = useState('')
    const [duration, setDuration] = useState(null)

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
        setSoalList(list)
        props_answer(list)
    }

    const handleAnswer = (value, i) => {
        setAnswerKey(answer[i].key)
        props_answer_key(answer[i].key)
        if (value === false) {
            setAnswerKey('')
            props_answer_key('')
        }
        const list = [...answer]
        list[i]['is_right'] = value
    }

    const handleRemoveClick = (index) => {
        const list = [...answer]
        list.splice(index, 1)
        setSoalList(list)
        props_answer(list)
    }

    const handleAddClick = () => {
        const lastobj = answer[answer.length - 1]
        const keyindex = lastobj.key.charCodeAt(0)
        const newKey = String.fromCharCode(keyindex + 1)
        setSoalList([...answer, { key: newKey, question: '', image: '', is_right: false }])
        props_answer([...answer, { key: newKey, question: '', image: '', is_right: false }])
    }

    return (
        <>

            <div className="form-group row mt-5">
                <div className="col-md-1 col-sm-12">
                    <p>Nilai</p>
                </div>
                <div className="col-md-3 col-sm-12">
                    <p>Jawaban</p>
                </div>
                <div className="col-md-4 col-sm-12">
                    <p>Input Gambar (Opsional)</p>
                </div>
                <div className="col-md-4 col-sm-12">
                    <p>Kunci Jawaban Yang Benar</p>
                </div>

                {answer.map((x, i) => {
                    return (
                        <>
                            <div className="col-sm-12 col-md-1">
                                <input type="number" className="form-control" name='value' value={x.value} onChange={e => handleInputChange(e, i)} autoComplete='off' />
                                <span className="text-muted">Isi Nilai</span>
                            </div>
                            <div className="col-sm-12 col-md-3">
                                <input type="text" className="form-control" name='option' value={x.option} placeholder={x.key} onChange={e => handleInputChange(e, i)} autoComplete='off' />
                                <span className="text-muted">Silahkan Pilihan {x.key}</span>
                            </div>
                            <div className="col-sm-12 col-md-3">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" name='image' onChange={e => handleInputChange(e, i)} />
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
                <div className="col-sm-6 col-md-3">
                    <p>Durasi Soal</p>
                    <div className="input-group">
                        <input
                            type="number"
                            className="form-control"
                            aria-describedby="basic-addon2"
                            value={duration}
                            onChange={(e) => { setDuration(e.target.value); props_duration(e.target.value) }}
                            min={1}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">
                                Detik
                            </span>
                        </div>
                    </div>
                    <span className="text-muted">
                        Silahkan input durasi soal
                    </span>
                </div>
            </div>

        </>
    )
}

export default CheckboxComponent