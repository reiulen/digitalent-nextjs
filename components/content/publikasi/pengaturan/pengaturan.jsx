import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import SimpleReactValidator from "simple-react-validator";
import { useDispatch, useSelector } from 'react-redux'

import styles from '../../../../styles/preview.module.css'

import { updateSettingImagePublikasi, updateSettingImagetronPublikasi, updateSettingSliderPublikasi, updateSettingFaqPublikasi, clearErrors } from '../../../../redux/actions/publikasi/setting.actions'
import { UPDATE_SETTING_RESET } from "../../../../redux/types/publikasi/setting.type";

import PageWrapper from '../../../wrapper/page.wrapper';
import LoadingTable from "../../../LoadingTable";

const Pengaturan = ({ token }) => {
    const dispatch = useDispatch()

    const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
    const [, forceUpdate] = useState();
    const { loading: allLoading, error: allError, success: allSuccess, setting } = useSelector(state => state.allSettingPublikasi)
    const { loading: updateLoading, error: updateError, success: updateSuccess, isUpdated } = useSelector(state => state.updateSettingPublikasi)

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


    const [upload_image, setUploadImage] = useState(setting ? (parseInt((setting[0].max_size).split(" ")[0])) : null)
    const [upload_imagetron, setUploadImagetron] = useState(setting ? (parseInt((setting[1].max_size).split(" ")[0])) : null)
    const [batas_slider, setBatasSlider] = useState(setting ? (parseInt((setting[2].max_size))) : null)
    const [maxfaq, setMaxfaq] = useState(setting ? (parseInt((setting[3].max_size))) : null)

    const submitImagePublikasi = (e) => {
        e.preventDefault()
        if ((simpleValidator.current.allValid())) {
            if (error) {
                dispatch(clearErrors())
            } else if (upload_image < 1) {
                simpleValidator.current.showMessages();
                forceUpdate(1);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Upload image minimal 1 MB !",
                });
            } else {
                dispatch(updateSettingImagePublikasi(upload_image, token))
            }
            // if (error) {
            //     dispatch(clearErrors())
            // }
            // dispatch(updateSettingImagePublikasi(upload_image))
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

    const submitImagetron = (e) => {
        e.preventDefault()
        if ((simpleValidator.current.allValid())) {
            if (error) {
                dispatch(clearErrors())
            } else if (upload_imagetron < 1) {
                simpleValidator.current.showMessages();
                forceUpdate(1);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Upload imagetron minimal 1 MB !",
                });
            } else {
                dispatch(updateSettingImagetronPublikasi(upload_imagetron, token))
            }
            // if (error) {
            //     dispatch(clearErrors())
            // }
            // dispatch(updateSettingImagetronPublikasi(upload_imagetron))

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

    const submitSlider = (e) => {
        e.preventDefault()
        if ((simpleValidator.current.allValid())) {
            if (error) {
                dispatch(clearErrors())
            } else if (batas_slider < 1) {
                simpleValidator.current.showMessages();
                forceUpdate(1);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Batas slider minimal 1 !",
                });
            } else {
                dispatch(updateSettingSliderPublikasi(batas_slider, token))
            }
            // if (error) {
            //     dispatch(clearErrors())
            // }
            // dispatch(updateSettingSliderPublikasi(batas_slider))

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

    const submitFaq = (e) => {
        e.preventDefault()
        if ((simpleValidator.current.allValid())) {
            if (error) {
                dispatch(clearErrors())
            } else if (maxfaq < 1) {
                simpleValidator.current.showMessages();
                forceUpdate(1);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Max Faq minimal 1 !",
                });
            } else {
                dispatch(updateSettingFaqPublikasi(maxfaq, token))
            }
            // if (error) {
            //     dispatch(clearErrors())
            // }
            // dispatch(updateSettingFaqPublikasi(maxfaq))

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

    // const onSubmit = (e) => {
    //     e.preventDefault()
    //     if ((simpleValidator.current.allValid())) {
    //         if (error) {
    //             dispatch(clearErrors())
    //         }

    //         dispatch(updateSettingImagePublikasi(upload_image))
    //         dispatch(updateSettingImagetronPublikasi(upload_imagetron))
    //         dispatch(updateSettingSliderPublikasi(batas_slider))
    //         dispatch(updateSettingFaqPublikasi(maxfaq))

    //     } else {
    //         simpleValidator.current.showMessages();
    //         forceUpdate(1);
    //         Swal.fire({
    //           icon: "error",
    //           title: "Oops...",
    //           text: "Isi data dengan benar !",
    //         });
    //       }

    // }

    const onNewReset = () => {
        dispatch({ type: UPDATE_SETTING_RESET })
    }

    // disable enter on input
    $("input").keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
        }
    });

    return (
        <PageWrapper>
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
                    <div className="alert-text">Berhasil Menyimpan Perubahan Data!</div>
                    {/* <div className="alert-text">{isUpdated}</div> */}
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
                    setting && setting.length !== 0 ?
                        // <LoadingTable loading={loading} />
                        <div className="card card-custom card-stretch gutter-b">
                            {/* <div className="card-header border-0">
                                <h3 className="card-title font-weight-bolder text-dark">Pengaturan Publikasi</h3>
                            </div> */}
                            <div className="card-body">
                                <form>
                                    <div className="form-group row form-inline">
                                        <label htmlFor="staticEmail" className="col-4 col-md-2 col-lg-3 col-xl-2 col-form-label">Upload Image</label>
                                        <div className={`${styles.uploadImage} col-7 col-md-4 col-lg-4 col-xl-3`}>
                                            <div className="d-flex align-items-center">
                                                <input style={{width:'100px'}}
                                                    type="number" min="1"
                                                    className={`${styles.inputData} form-control mr-4`}
                                                    value={upload_image}
                                                    onChange={(e) => setUploadImage(e.target.value)}
                                                    onBlur={() => simpleValidator.current.showMessageFor("upload_image")}
                                                />
                                                <div>
                                                    MB
                                                </div>
                                            </div>
                                            {/* <input style={{ width: '100px' }} type="number" min="1" className="form-control mr-4" value={upload_image} onChange={(e) => setUploadImage(e.target.value)} min='0' onBlur={() =>simpleValidator.current.showMessageFor("upload_image")}/> MB */}
                                            <div className={`${styles.validator}`}>
                                                {simpleValidator.current.message(
                                                    "upload_image",
                                                    upload_image,
                                                    "required|numeric|max:5,num",
                                                    { className: "text-danger" }
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            className="col-2 col-md-6 col-lg-7 col-xl-5 btn btn-link-action text-white"
                                            onClick={(e) => submitImagePublikasi(e)}
                                            style={{ marginLeft: '-30px' }}
                                        >
                                            <Image
                                                src={`/assets/icon/save.svg`}
                                                width={40}
                                                height={40}
                                                alt="IconSave"
                                            />
                                        </button>

                                    </div>
                                    <div className="form-group row form-inline">
                                        <label htmlFor="staticEmail" className="col-4 col-md-2 col-lg-3 col-xl-2 col-form-label">Upload Imagetron</label>
                                        <div className={`${styles.uploadImage} col-7 col-md-4 col-lg-4 col-xl-3`}>
                                            <div className="d-flex align-items-center">
                                                <input style={{width:'100px'}} type="number" min="1" className={`${styles.inputData} form-control mr-4`} value={upload_imagetron} onChange={(e) => setUploadImagetron(e.target.value)} onBlur={() => simpleValidator.current.showMessageFor("upload_imagetron")} />
                                                <div>MB</div>
                                            </div>
                                            <div className={`${styles.validator}`}>
                                                {simpleValidator.current.message(
                                                    "upload_imagetron",
                                                    upload_imagetron,
                                                    "required|numeric|max:5,num",
                                                    { className: "text-danger" }
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            className="col-2 col-md-6 col-lg-7 col-xl-5 btn btn-link-action text-white"
                                            onClick={(e) => submitImagetron(e)}
                                            style={{ marginLeft: '-30px' }}
                                        >
                                            <Image
                                                src={`/assets/icon/save.svg`}
                                                width={40}
                                                height={40}
                                                alt="IconSave"
                                            />
                                        </button>
                                    </div>
                                    <div className="form-group row form-inline">
                                        <label htmlFor="staticEmail" className="col-4 col-md-2 col-lg-3 col-xl-2 col-form-label">Batas Slider</label>
                                        <div className={`${styles.uploadImage} col-7 col-md-4 col-lg-4 col-xl-3`}>
                                            <div className="d-flex align-items-center">
                                                <input style={{width:'100px'}} type="number" min="1" className={`${styles.inputData} form-control mr-4`} value={batas_slider} onChange={(e) => setBatasSlider(e.target.value)} onBlur={() => simpleValidator.current.showMessageFor("batas_slider")} />
                                                <div>Page</div>
                                            </div>
                                            <div className={`${styles.validator}`}>
                                                {simpleValidator.current.message(
                                                    "batas_slider",
                                                    batas_slider,
                                                    "required|numeric|max:7,num",
                                                    { className: "text-danger" }
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            className="col-2 col-md-6 col-lg-7 col-xl-5 btn btn-link-action text-white"
                                            onClick={(e) => submitSlider(e)}
                                            style={{ marginLeft: '-30px' }}
                                        >
                                            <Image
                                                src={`/assets/icon/save.svg`}
                                                width={40}
                                                height={40}
                                                alt="IconSave"
                                            />
                                        </button>
                                    </div>
                                    <div className="form-group row form-inline">
                                        <label htmlFor="staticEmail" className="col-4 col-md-2 col-lg-3 col-xl-2 col-form-label">Maksimal FAQ</label>
                                        <div className={`${styles.uploadImage} col-7 col-md-4 col-lg-4 col-xl-3`}>
                                            <div className="d-flex align-items-center">
                                                <input style={{width:'100px'}} type="number" min="1" className={`${styles.inputData} form-control mr-4`} value={maxfaq} onChange={(e) => setMaxfaq(e.target.value)} onBlur={() => simpleValidator.current.showMessageFor("maxfaq")} />
                                                <div>Page</div>
                                            </div>
                                            <div className={`${styles.validator}`}>
                                                {simpleValidator.current.message(
                                                    "maxfaq",
                                                    maxfaq,
                                                    "required|numeric|max:5,num",
                                                    { className: "text-danger" }
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            className="col-2 col-md-6 col-lg-7 col-xl-5 btn btn-link-action text-white"
                                            onClick={(e) => submitFaq(e)}
                                            style={{ marginLeft: '-30px' }}
                                        >
                                            <Image
                                                src={`/assets/icon/save.svg`}
                                                width={40}
                                                height={40}
                                                alt="IconSave"
                                            />
                                        </button>
                                    </div>


                                    <div className="form-group row">
                                        <div className="col-sm-12 text-right">
                                            <Link href='/publikasi'>
                                                <a className='btn btn-white-ghost-rounded-full mr-2 btn-sm rounded-pill'>Kembali</a>
                                            </Link>
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