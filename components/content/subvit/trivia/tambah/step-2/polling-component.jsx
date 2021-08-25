import React, { useState } from "react";

import Image from "next/image";

const PollingComponent = ({ props_answer }) => {

    const [answer, setSoalList] = useState([
        { key: 'A', option: '', image: '' },
        { key: 'B', option: '', image: '' },
        { key: 'C', option: '', image: '' },
        { key: 'D', option: '', image: '' }
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
                <div className="col-4">
                    <p>Jawaban</p>
                </div>
                <div className="col-4">
                    <p>Input Gambar (Opsional)</p>
                </div>
                <div className="col-4">
                </div>

                {answer.map((x, i) => {
                    return (
                        <>
                            <div className="col-sm-12 col-md-4">
                                <input type="text" className="form-control" name='option' value={x.option} placeholder={x.key} onChange={e => handleInputChange(e, i)} autoComplete='off' />
                                <span className="text-muted">Silahkan Pilihan {x.key}</span>
                            </div>
                            <div className="col-sm-12 col-md-4">
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
                            <div className="col-sm-12 col-md-3"></div>

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
        </>
    )
}

export default PollingComponent