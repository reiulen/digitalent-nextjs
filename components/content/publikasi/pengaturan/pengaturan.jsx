import React, { useState, useRef, useEffect } from 'react';
import SimpleReactValidator from "simple-react-validator";
import { useDispatch, useSelector } from 'react-redux'

import { updateSettingImagePublikasi, updateSettingImagetronPublikasi, updateSettingSliderPublikasi, updateSettingFaqPublikasi, clearErrors } from '../../../../redux/actions/publikasi/setting.actions'
import { UPDATE_SETTING_RESET } from "../../../../redux/types/publikasi/setting.type";

import PageWrapper from '../../../wrapper/page.wrapper';
import LoadingTable from "../../../LoadingTable";

const Pengaturan = () => {
    const dispatch = useDispatch()

    const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
    const [, forceUpdate] = useState();
    const { loading: allLoading, error: allError, success: allSuccess, setting } = useSelector(state => state.allSettingPublikasi)
    const { loading: updateLoading, error: updateError, success: updateSuccess } = useSelector(state => state.updateSettingPublikasi)

    let loading = false
    let error = null
    let success = null

    if (allLoading) {
        loading = allLoading;

    } else if (updateLoading) {
        loading = updateLoading;
    }

    if (allError) {
        error = allError;

    } else if (updateError) {
        error = updateError;
    }

    if (allSuccess) {
        success = allSuccess;

    } else if (updateSuccess) {
        success = updateSuccess;
    }

    useEffect(() => {

        if (error) {
            dispatch(clearErrors())
        }

        // if (success) {
        //     router.push({
        //         pathname: `/publikasi/pengaturan`,
        //     });
        // }

        // if (success) {
        //     dispatch({
        //         type: UPDATE_SETTING_RESET
        //     })
        // }

    }, [dispatch, error, success]);


    const [upload_image, setUploadImage] = useState(parseInt((setting[0].max_size).split(" ")[0]))
    const [upload_imagetron, setUploadImagetron] = useState(parseInt((setting[1].max_size).split(" ")[0]))
    const [batas_slider, setBatasSlider] = useState(parseInt((setting[2].max_size)))
    const [maxfaq, setMaxfaq] = useState(parseInt((setting[3].max_size)))

    const onSubmit = (e) => {
        e.preventDefault()
        if ((simpleValidator.current.allValid())) {
            if (error) {
                dispatch(clearErrors())
            }

            dispatch(updateSettingImagePublikasi(upload_image))
            dispatch(updateSettingImagetronPublikasi(upload_imagetron))
            dispatch(updateSettingSliderPublikasi(batas_slider))
            dispatch(updateSettingFaqPublikasi(maxfaq))
    
        } else {
            simpleValidator.current.showMessages();
            forceUpdate(1);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Isi data dengan benar !",
            });
          }
        
    }

    const onNewReset = () => {
        dispatch({ type: UPDATE_SETTING_RESET })
    }

    return (
        <PageWrapper>
            {
                console.log (setting)
            }
            {error ?
                <div className="alert alert-custom alert-light-danger fade show mb-5" role="alert">
                    <div className="alert-icon"><i className="flaticon-warning"></i></div>
                    <div className="alert-text">{updateError}</div>
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
                    <div className="alert-text">{updateSuccess}</div>
                    <div className="alert-close">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={onNewReset} >
                            <span aria-hidden="true"><i className="ki ki-close"></i></span>
                        </button>
                    </div>
                </div>
                : ''
            }
            <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
                {
                    setting ?
                        // <LoadingTable loading={loading} />
                        <div className="card card-custom card-stretch gutter-b">
                            <div className="card-header border-0">
                                <h3 className="card-title font-weight-bolder text-dark">Pengaturan Publikasi</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={onSubmit}>
                                    <div className="form-group row form-inline">
                                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Upload Image</label>
                                        <div className="col-sm-5">
                                            <input style={{ width: '100px' }} type="number" className="form-control mr-4" value={upload_image} onChange={(e) => setUploadImage(e.target.value)} min='0' onBlur={() =>simpleValidator.current.showMessageFor("upload_image")}/> MB
                                            {simpleValidator.current.message(
                                                "upload_image",
                                                upload_image,
                                                "required|numeric|min:0,num",
                                                { className: "text-danger" }
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group row form-inline">
                                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Upload Imagetron</label>
                                        <div className="col-sm-5">
                                            <input style={{ width: '100px' }} type="number" className="form-control mr-4" value={upload_imagetron} onChange={(e) => setUploadImagetron(e.target.value)} onBlur={() =>simpleValidator.current.showMessageFor("upload_imagetron")}/> MB
                                            {simpleValidator.current.message(
                                                "upload_imagetron",
                                                upload_imagetron,
                                                "required|numeric|min:0,num",
                                                { className: "text-danger" }
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group row form-inline">
                                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Batas Slider</label>
                                        <div className="col-sm-5">
                                            <input style={{ width: '100px' }} type="number" className="form-control mr-4" value={batas_slider} onChange={(e) => setBatasSlider(e.target.value)} onBlur={() =>simpleValidator.current.showMessageFor("batas_slider")}/> Page
                                            {simpleValidator.current.message(
                                                "batas_slider",
                                                batas_slider,
                                                "required|numeric|min:0,num",
                                                { className: "text-danger" }
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group row form-inline">
                                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Maksimal FAQ</label>
                                        <div className="col-sm-5">
                                            <input style={{ width: '100px' }} type="number" className="form-control mr-4" value={maxfaq} onChange={(e) => setMaxfaq(e.target.value)} onBlur={() =>simpleValidator.current.showMessageFor("maxfaq")}/> Page
                                            {simpleValidator.current.message(
                                                "maxfaq",
                                                maxfaq,
                                                "required|numeric|min:0,num",
                                                { className: "text-danger" }
                                            )}
                                        </div>
                                    </div>


                                    <div className="form-group row">
                                        <div className="col-sm-2"></div>
                                        <div className="col-sm-10">
                                            <button className='btn btn-primary btn-sm'>Simpan</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    :
                        <LoadingTable loading={updateLoading} />
                        
                    
                }
                
            </div>
        </PageWrapper>
    )
}


export default Pengaturan