import React, { useState, useEffect } from 'react';

import Link from 'next/link'
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from 'react-redux'
import { newFaq, clearErrors } from '../../../../redux/actions/publikasi/faq.actions'
import { NEW_FAQ_RESET } from '../../../../redux/types/publikasi/faq.type'

import PageWrapper from '../../../wrapper/page.wrapper';

const TambahFaq = () => {
    const dispatch = useDispatch()

    const importSwitch = () => import('bootstrap-switch-button-react')

    const SwitchButton = dynamic(importSwitch, {
        ssr: false
    })

    const { loading, error, success } = useSelector(state => state.newFaq)

    useEffect(() => {

        // if (error) {
        //     dispatch(clearErrors())
        // }

        // if (success) {
        //     dispatch({
        //         type: NEW_FAQ_RESET
        //     })
        // }

    }, [dispatch, error, success]);


    const [judul, setJudulPertanyaan] = useState('')
    const [jawaban, setJawaban] = useState('');
    const [kategori_id, setKategoriId] = useState('')
    const [users_id, setUsersId] = useState(1)
    const [publishFaq, setPublishFaq] = useState(false)
    const [publish, setPublish] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if (error) {
            dispatch(clearErrors())
        }

        const data = {
            kategori_id,
            judul,
            jawaban,
            users_id,
        }

        dispatch(newFaq(data))
        console.log(data)
    }

    const onNewReset = () => {
        dispatch({ type: NEW_FAQ_RESET })
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
            {success ?
                <div className="alert alert-custom alert-light-success fade show mb-5" role="alert">
                    <div className="alert-icon"><i className="flaticon2-checkmark"></i></div>
                    <div className="alert-text">{success}</div>
                    <div className="alert-close">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={onNewReset} >
                            <span aria-hidden="true"><i className="ki ki-close"></i></span>
                        </button>
                    </div>
                </div>
                : ''
            }
            <div className="col-lg-12 col-xxl-4 order-1 order-xxl-2 px-0">
                <div className="card card-custom card-stretch gutter-b">
                    <div className="card-header border-0">
                        <h3 className="card-title font-weight-bolder text-dark">Tambah FAQ</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={onSubmit}>
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Judul Pertanyaan</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" placeholder="Isi Judul disini" value={judul} onChange={(e) => setJudulPertanyaan(e.target.value)} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Jawaban</label>
                                <div className="col-sm-10">
                                    <textarea className='form-control' placeholder='isi deskripsi jawaban disini' name="jawaban" id="" rows="10" onChange={e => setJawaban(e.target.value)} value={jawaban}></textarea>
                                </div>
                            </div>


                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Kategori</label>
                                <div className="col-sm-10">
                                    <select name="" id="" className='form-control' value={kategori_id} onChange={e => setKategoriId(e.target.value)} onBlur={e => setKategoriId(e.target.value)} >
                                        <option value="1">Kategori</option>
                                        <option value="2">Kategori 2</option>
                                    </select>
                                </div>
                            </div>


                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Pin FAQ ?</label>
                                <div className="col-sm-1">
                                    <SwitchButton
                                        checked={publishFaq}
                                        onlabel=' '
                                        onstyle='primary'
                                        offlabel=' '
                                        offstyle='danger'
                                        size='sm'
                                        width={30}
                                        onChange={(checked) => setPublishFaq(checked)}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Publish ?</label>
                                <div className="col-sm-1">
                                    <SwitchButton
                                        checked={publish}
                                        onlabel=' '
                                        onstyle='primary'
                                        offlabel=' '
                                        offstyle='danger'
                                        size='sm'
                                        width={30}
                                        onChange={(checked) => setPublish(checked)}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-2"></div>
                                <div className="col-sm-10">
                                    <Link href='/publikasi/faq'>
                                        <a className='btn btn-outline-primary mr-2 btn-sm'>Kembali</a>
                                    </Link>
                                    <button className='btn btn-primary btn-sm'>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}

export default TambahFaq