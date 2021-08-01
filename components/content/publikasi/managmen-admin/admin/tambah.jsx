import React, { useState, useEffect } from 'react';

import Link from 'next/link'
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from 'react-redux'
import { newArtikel, clearErrors } from '../../../../../redux/actions/publikasi/artikel.actions'
import { NEW_ARTIKEL_RESET } from '../../../../../redux/types/publikasi/artikel.type'

import PageWrapper from '../../../../wrapper/page.wrapper';

const TambahAdmin = () => {
    const dispatch = useDispatch()
    const importSwitch = () => import('bootstrap-switch-button-react')
    const SwitchButton = dynamic(importSwitch, {
        ssr: false
    })

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


    const [nama, setNama] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm_password, setConfirmPassword] = useState('')
    const [role, setRole] = useState('')

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
            <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
                <div className="card card-custom card-stretch gutter-b">
                    <div className="card-header border-0">
                        <h3 className="card-title font-weight-bolder text-dark">Tambah Admin</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={onSubmit}>
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Nama</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" placeholder="Silahkan ketik Nama" value={nama} onChange={(e) => setNama(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" placeholder="Silahkan ketik Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" placeholder="Silahkan ketik Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Komfirmasi Password</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" placeholder="Silahkan ketik Konfirmasi Password" value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label ">Role</label>
                                <div className="col-sm-10">
                                    <select name="role" id="" onChange={e => setRole(e.target.value)} className='form-control'>
                                        <option disabled selected> -Pilih Kategori-</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Active ?</label>
                                <div className="col-sm-1">
                                    <SwitchButton
                                        checked={false}
                                        onlabel='Active'
                                        onstyle='primary'
                                        offlabel='No'
                                        offstyle='danger'
                                        size='sm'
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-2"></div>
                                <div className="col-sm-10">
                                    <Link href='/publikasi/managemen-admin/admin'>
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

export default TambahAdmin