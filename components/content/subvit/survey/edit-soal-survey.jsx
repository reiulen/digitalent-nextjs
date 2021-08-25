import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import PageWrapper from '../../../wrapper/page.wrapper'

import { useDispatch, useSelector } from 'react-redux'
import { getAllSubtanceQuestionBanks, clearErrors } from '/redux/actions/subvit/subtance.actions'

const EditSoalSurvey = () => {

    const dispatch = useDispatch()
    const router = useRouter()

    const { loading, error, subtance, perPage, total, } = useSelector(state => state.allSubtanceQuestionBanks)

    let { page = 1 } = router.query
    page = Number(page)

    useEffect(() => {

        dispatch(getAllSubtanceQuestionBanks())

    }, [dispatch])

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

            <div className="col-lg-12 order-1 px-0">
                <div className="card card-custom card-stretch gutter-b">
                    <div className="card-header border-0">
                        <h3 className="card-title font-weight-bolder text-dark">Soal A</h3>
                        <div className="card-toolbar">
                            <Link href='/subvit/survey/tambah'>
                                <a className="btn btn-sm btn-light-success px-6 font-weight-bold btn-block ">
                                    Edit
                                </a>
                            </Link>
                        </div>
                    </div>

                    <div className="card-body">
                        <div className="title row">
                            <div className="col-md-3">
                                <Image src='/assets/logo/logo-2.svg' alt='logo' width={200} height={80} />
                            </div>
                            <div className="col-md-9">
                                <h4 style={{ fontSize: '24px', lineHight: '120%' }}>Ketika melakukan review project, atasan Anda selalu memberikan kritik yang menurunkan semangat tim Anda. Bagaimana Anda menanggapinya?</h4>
                            </div>
                        </div>

                        <div className="answer mt-5">
                            <div className="input-group mb-2 mr-sm-2">
                                <div className="input-group-prepend p-0">
                                    <div className="input-group-text p-0">
                                        <Image src='/assets/logo/logo-2.svg' alt='logo-2' width={100} height={45} />
                                    </div>
                                </div>
                                <input style={{ height: '50px' }} type="text" className="form-control" value='VGA' />
                            </div>
                            <div className="input-group mb-2 mr-sm-2">
                                <div className="input-group-prepend p-0">
                                    <div className="input-group-text p-0">
                                        <Image src='/assets/logo/logo-2.svg' alt='logo-2' width={100} height={45} />
                                    </div>
                                </div>
                                <input style={{ height: '50px' }} type="text" className="form-control" value='Digital Marketing' />
                            </div>
                            <div className="input-group mb-2 mr-sm-2">
                                <div className="input-group-prepend p-0">
                                    <div className="input-group-text p-0">
                                        <Image src='/assets/logo/logo-2.svg' alt='logo-2' width={100} height={45} />
                                    </div>
                                </div>
                                <input style={{ height: '50px' }} type="text" className="form-control" value='UI / UX' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Link href='/subvit/survey/soal'>
                <a className='btn btn-outline-primary'> <i className='flaticon2-left-arrow-1'></i> Kembali</a>
            </Link>
        </PageWrapper >
    )
}

export default EditSoalSurvey