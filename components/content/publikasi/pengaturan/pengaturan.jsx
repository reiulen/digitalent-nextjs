import React, { useState, useRef, useEffect } from 'react';

import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { newImagetron, clearErrors } from '../../../../redux/actions/publikasi/imagetron.actions'
import { NEW_IMAGETRON_RESET } from '../../../../redux/types/publikasi/imagetron.type'

import PageWrapper from '../../../wrapper/page.wrapper';

const Pengaturan = () => {
    const dispatch = useDispatch()

    const { loading, error, success } = useSelector(state => state.newImagetron)

    useEffect(() => {

        // if (error) {
        //     dispatch(clearErrors())
        // }

        // if (success) {
        //     dispatch({
        //         type: NEW_IMAGETRON_RESET
        //     })
        // }

    }, [dispatch, error, success]);


    const [upload_image, setUploadImage] = useState(0)
    const [upload_imagetron, setUploadImagetron] = useState(0)
    const [batas_slider, setBatasSlider] = useState(0)
    const [maxfaq, setMaxfaq] = useState(0)

    const onSubmit = (e) => {
        e.preventDefault()
        if (error) {
            dispatch(clearErrors())
        }

        const data = {
            upload_image,
            upload_imagetron,
            batas_slider,
            maxfaq,
        }

        // dispatch(newImagetron(data))
        console.log(data)
    }

    const onNewReset = () => {
        dispatch({ type: NEW_IMAGETRON_RESET })
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
                        <h3 className="card-title font-weight-bolder text-dark">Pengaturan Publikasi</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={onSubmit}>
                            <div className="form-group row form-inline">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Upload Image</label>
                                <div className="col-sm-5">
                                    <input style={{ width: '100px' }} type="number" className="form-control mr-4" value={upload_image} onChange={(e) => setUploadImage(e.target.value)} min='0' /> MB
                                </div>
                            </div>
                            <div className="form-group row form-inline">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Upload Imagetron</label>
                                <div className="col-sm-5">
                                    <input style={{ width: '100px' }} type="number" className="form-control mr-4" value={upload_imagetron} onChange={(e) => setUploadImagetron(e.target.value)} /> MB
                                </div>
                            </div>
                            <div className="form-group row form-inline">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Batas Slider</label>
                                <div className="col-sm-5">
                                    <input style={{ width: '100px' }} type="number" className="form-control mr-4" value={batas_slider} onChange={(e) => setBatasSlider(e.target.value)} /> Page
                                </div>
                            </div>
                            <div className="form-group row form-inline">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Maksimal FAQ</label>
                                <div className="col-sm-5">
                                    <input style={{ width: '100px' }} type="number" className="form-control mr-4" value={maxfaq} onChange={(e) => setMaxfaq(e.target.value)} /> Page
                                </div>
                            </div>


                            <div className="form-group row">
                                <div className="col-sm-2"></div>
                                <div className="col-sm-10">
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

export default Pengaturan