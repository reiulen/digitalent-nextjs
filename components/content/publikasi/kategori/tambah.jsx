import React, { useState, useEffect } from 'react';

import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { newArtikel, clearErrors } from '../../../../redux/actions/publikasi/artikel.actions'
import { NEW_ARTIKEL_RESET } from '../../../../redux/types/publikasi/artikel.type'

import PageWrapper from '../../../wrapper/page.wrapper';

const TambahKategori = () => {
    const dispatch = useDispatch()

    const { loading, error, success } = useSelector(state => state.newArtikel)

    useEffect(() => {

        if (success) {
            dispatch({
                type: NEW_ARTIKEL_RESET
            })
        }

    }, [dispatch, success]);


    const [nama_kategori, setNamaKategori] = useState('')
    const [jenis_kategori_id, setJenisKategoriId] = useState('')


    const onSubmit = (e) => {
        e.preventDefault()
        if (error) {
            dispatch(clearErrors())
        }

        const data = {
            nama_kategori,
            jenis_kategori_id,
        }

        dispatch(newArtikel(data))
        console.log(data)
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
            <div className="col-lg-12 col-xxl-4 order-1 order-xxl-2 px-0">
                <div className="card card-custom card-stretch gutter-b">
                    <div className="card-header border-0">
                        <h3 className="card-title font-weight-bolder text-dark">Tambah Katerori</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={onSubmit}>
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Nama Kategori</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" placeholder="Isi Nama kategori disini" value={nama_kategori} onChange={(e) => setNamaKategori(e.target.value)} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Jenis Kategori</label>
                                <div className="col-sm-10">
                                    <select name="" id="" className='form-control' onChange={e => setJenisKategoriId(e.target.value)}>
                                        <option value="Kategori">Kategori</option>
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