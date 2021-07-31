import React, { useState, useEffect } from 'react';

import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { newArtikel, clearErrors } from '../../../../../redux/actions/publikasi/artikel.actions'
import { NEW_ARTIKEL_RESET } from '../../../../../redux/types/publikasi/artikel.type'

import PageWrapper from '../../../../wrapper/page.wrapper';

const TambahRole = () => {
    const dispatch = useDispatch()

    const { loading, error, success } = useSelector(state => state.newArtikel)

    useEffect(() => {

        // if (error) {
        //     dispatch(clearErrors())
        // }

        if (success) {
            dispatch({
                type: NEW_ARTIKEL_RESET
            })
        }

    }, [dispatch, error, success]);


    const [nama_role, setNamaRole] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        if (error) {
            dispatch(clearErrors())
        }

        const data = {
            nama_role,
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
                        <h3 className="card-title font-weight-bolder text-dark">Tambah Role</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={onSubmit}>
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Nama Role</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" placeholder="Silahkan ketik Nama" value={nama_role} onChange={(e) => setNamaRole(e.target.value)} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group row">
                                        <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Artikel</label>
                                        <div className="col-sm-8">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                <label className="form-check-label" htmlFor="defaultCheck1">
                                                    Create, Read, Update, and Delete
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                <label className="form-check-label" htmlFor="defaultCheck1">
                                                    Publish
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                <label className="form-check-label" htmlFor="defaultCheck1">
                                                    View
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group row">
                                        <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Video</label>
                                        <div className="col-sm-8">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                <label className="form-check-label" htmlFor="defaultCheck1">
                                                    Create, Read, Update, and Delete
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                <label className="form-check-label" htmlFor="defaultCheck1">
                                                    Publish
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                <label className="form-check-label" htmlFor="defaultCheck1">
                                                    View
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group row">
                                        <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Beerita</label>
                                        <div className="col-sm-8">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                <label className="form-check-label" htmlFor="defaultCheck1">
                                                    Create, Read, Update, and Delete
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                <label className="form-check-label" htmlFor="defaultCheck1">
                                                    Publish
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                <label className="form-check-label" htmlFor="defaultCheck1">
                                                    View
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group row">
                                        <label htmlFor="staticEmail" className="col-sm-4 col-form-label">FAQ</label>
                                        <div className="col-sm-8">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                <label className="form-check-label" htmlFor="defaultCheck1">
                                                    Create, Read, Update, and Delete
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                <label className="form-check-label" htmlFor="defaultCheck1">
                                                    Publish
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                <label className="form-check-label" htmlFor="defaultCheck1">
                                                    View
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group row">
                                        <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Galeri</label>
                                        <div className="col-sm-8">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                <label className="form-check-label" htmlFor="defaultCheck1">
                                                    Create, Read, Update, and Delete
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                <label className="form-check-label" htmlFor="defaultCheck1">
                                                    Publish
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                <label className="form-check-label" htmlFor="defaultCheck1">
                                                    View
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group row">
                                        <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Imagetron</label>
                                        <div className="col-sm-8">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                <label className="form-check-label" htmlFor="defaultCheck1">
                                                    Create, Read, Update, and Delete
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                <label className="form-check-label" htmlFor="defaultCheck1">
                                                    Publish
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                <label className="form-check-label" htmlFor="defaultCheck1">
                                                    View
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-2"></div>
                                <div className="col-sm-10">
                                    <Link href='/publikasi/managemen-admin/role'>
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

export default TambahRole