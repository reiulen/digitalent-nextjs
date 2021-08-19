import React, { useState } from "react";

import dynamic from "next/dynamic";
import Image from "next/image";

const TriggeredQuestionComponent = ({ props_answer }) => {

    const importSwitch = () => import("bootstrap-switch-button-react");
    const SwitchButton = dynamic(importSwitch, {
        ssr: false,
    });

    const [answer, setSoalList] = useState([
        {
            key: 'A', option: '', image: '', type: 'choose', is_next: true, sub: [
                {
                    question: '', image: '', answer: [
                        {
                            key: 'A', option: '', image: '', type: 'choose', is_next: true, sub: [
                                {
                                    question: '', image: '', answer: [
                                        {
                                            key: 'A', option: '', image: '', type: 'choose', is_next: true, sub: [
                                                {
                                                    question: '', image: '', answer: [
                                                        {
                                                            key: 'A', option: '', image: '', type: 'choose', is_next: true, sub: [
                                                                {
                                                                    question: '', image: '', answer: [
                                                                        { key: 'A', option: '', image: '', type: 'choose' }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        { key: 'B', option: '', image: '', type: 'choose', is_next: false, sub: [] },
        { key: 'C', option: '', image: '', type: 'choose', is_next: false, sub: [] },
        { key: 'D', option: '', image: '', type: 'empety', is_next: false, sub: [] }
    ])

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

    const handleRemoveClick = (index) => {
        const list = [...answer]
        list.splice(index, 1)
        setSoalList(list)
        props_answer(list)
    }

    const handleAddClick = (type) => {
        const lastobj = answer[answer.length - 1]
        const keyindex = lastobj.key.charCodeAt(0)
        const newKey = String.fromCharCode(keyindex + 1)
        setSoalList([...answer, { key: newKey, option: '', image: '', type: type, sub: [] },])
        props_answer([...answer, { key: newKey, option: '', image: '', type: type, sub: [] },])
    }

    const handleNext = (value, i) => {
        let list = [...answer]
        list[i]['is_next'] = value
    }

    return (
        <>

            <div className="form-group row mt-5">
                <div className="col-md-3 col-sm-12">
                    <p>Jawaban</p>
                </div>
                <div className="col-md-4 col-sm-12">
                    <p>Input Gambar (Opsional)</p>
                </div>
                <div className="col-md-4 col-sm-12">
                    <p>Pertanyaan Selanjutnya ?</p>
                </div>
                <div className="col-md-1 col-sm-12">
                </div>

                {answer.map((x, i) => {
                    return (
                        <div className='col-12'>
                            <div className="row">
                                {x.type === 'choose' ? (
                                    <>
                                        <div className="col-sm-12 col-md-3">
                                            <input type="text" className="form-control" name='option' value={x.option} placeholder={x.key} onChange={e => handleInputChange(e, i)} autoComplete='off' />
                                            <span className="text-muted">Silahkan Pilihan {x.key}</span>
                                        </div>
                                        <div className="col-sm-12 col-md-3">
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input" name='image' onChange={e => handleInputChange(e, i)} />
                                                <label class="custom-file-label" for="customFile">
                                                    Choose file
                                                </label>
                                            </div>
                                            <span className="text-muted">Input Gambar (Opsional)</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="col-sm-12 col-md-6">
                                            <input type="text" className="form-control" name='option' value={x.option} autoComplete='off' placeholder={`Jawaban Lain ${x.key}`} disabled />
                                            <span className="text-muted">Jawaban lain {x.key}</span>
                                        </div>
                                    </>
                                )}
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
                                        checked={x.is_next}
                                        onlabel=" "
                                        onstyle="primary"
                                        offlabel=" "
                                        offstyle="danger"
                                        size="sm"
                                        width={20}
                                        height={10}
                                        onChange={(checked) => handleNext(checked, i)}
                                    />
                                    <span className="text-muted">
                                        Silahkan pilih jika ada pertanyaan selanjutnya
                                    </span>
                                </div>
                                <div className="col-sm-12 col-md-1">
                                </div>
                                {
                                    x.sub.length != 0 ?
                                        x.sub.map((sub_question_1, i) => {
                                            return <>
                                                <div className="col-sm-12 col-md-3" key={i} style={{ marginLeft: '20px' }}>
                                                    <input type="text" className="form-control" name='option' value={x.option} placeholder="Isi Pertanyaan" onChange={e => handleInputChange(e, i)} autoComplete='off' />
                                                    <span className="text-muted">Silahkan Isi Pertanyaan</span>
                                                </div>
                                                <div className="col-sm-12 col-md-3">
                                                    <div class="custom-file">
                                                        <input type="file" class="custom-file-input" name='image' onChange={e => handleInputChange(e, i)} />
                                                        <label class="custom-file-label" for="customFile">
                                                            Choose file
                                                        </label>
                                                    </div>
                                                    <span className="text-muted">Input Gambar (Opsional)</span>
                                                </div>
                                                <div className="col-sm-12 col-md-1">
                                                    {sub_question_1.length !== 1 ?
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
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col-sm-12 col-md-3" style={{ marginLeft: '30px' }}>
                                                            <input type="text" className="form-control" name='option' value={x.option} onChange={e => handleInputChange(e, i)} autoComplete='off' />
                                                            <span className="text-muted">Silahkan Pilihan {x.key}</span>
                                                        </div>
                                                        <div className="col-sm-12 col-md-3">
                                                            <div class="custom-file">
                                                                <input type="file" class="custom-file-input" name='image' onChange={e => handleInputChange(e, i)} />
                                                                <label class="custom-file-label" for="customFile">
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
                                                                checked={x.is_next}
                                                                onlabel=" "
                                                                onstyle="primary"
                                                                offlabel=" "
                                                                offstyle="danger"
                                                                size="sm"
                                                                width={20}
                                                                height={10}
                                                                onChange={(checked) => handleNext(checked, i)}
                                                            />
                                                            <span className="text-muted">
                                                                Silahkan pilih jika ada pertanyaan selanjutnya
                                                            </span>
                                                        </div>
                                                        <div className="col-sm-12 col-md-1">
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        })
                                        : ''
                                }
                            </div>
                        </div>
                    )
                })}

            </div>

            <div className="form-group row">
                <div className="col-sm-6 col-md-4 d-flex">
                    {answer.length < 6 ? (
                        <>
                            <button type='button' className="btn btn-primary mr-2" onClick={() => handleAddClick("choose")}>Tambah Jawaban</button>
                            <button type='button' className="btn btn-primary" onClick={() => handleAddClick("empety")}>Tambah Jawaban Lain</button>
                        </>
                    ) : ''
                    }
                </div>
            </div>

        </>
    )
}

export default TriggeredQuestionComponent