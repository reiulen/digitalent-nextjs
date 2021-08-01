import React, { useState, useEffect } from 'react';

import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { newKategori, clearErrors } from '../../../../redux/actions/publikasi/kategori.actions'
import { NEW_KATEGORI_RESET } from '../../../../redux/types/publikasi/kategori.type'

import PageWrapper from '../../../wrapper/page.wrapper';

const TambahKategori = () => {
    const dispatch = useDispatch()

    const { loading, error, success } = useSelector(state => state.newKategori)

    useEffect(() => {

        if (success) {
            setNamaKategori('')
            setJenisKategori('')
        }

    }, [dispatch, success]);


    const [nama, setNamaKategori] = useState('')
    const [jenis_kategori, setJenisKategori] = useState('')


    const onSubmit = (e) => {
        e.preventDefault()
        if (error) {
            dispatch(clearErrors())
        }

        if (success) {
            dispatch({
                type: NEW_KATEGORI_RESET
            })
        }

        const data = {
            nama,
            jenis_kategori,
        }

        dispatch(newKategori(data))
        console.log(data)
    }

    const onNewReset = () => {
        dispatch({ type: NEW_KATEGORI_RESET })
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
            <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
                <div className="card card-custom card-stretch gutter-b">
                    <div className="card-header border-0">
                        <h3 className="card-title font-weight-bolder text-dark">Tambah Katerori</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={onSubmit}>
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Nama Kategori</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" placeholder="Isi Nama kategori disini" value={nama} onChange={(e) => setNamaKategori(e.target.value)} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Jenis Kategori</label>
                                <div className="col-sm-10">
                                    <select name="" id="" value={jenis_kategori} className='form-control' onChange={e => setJenisKategori(e.target.value)} onBlur={e => setJenisKategori(e.target.value)} >
                                        <option value="Berita">Berita</option>
                                        <option value="Artikel">Artikel</option>
                                        <option value="Galeri">Galeri</option>
                                        <option value="Video">Video</option>
                                        <option value="Imagetron">Imagetron</option>
                                        <option value="Faq">Faq</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-2"></div>
                                <div className="col-sm-10">
                                    <Link href='/publikasi/kategori'>
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

export default TambahKategori