import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import Pagination from 'react-js-pagination';
import { css } from '@emotion/react'
import BeatLoader from 'react-spinners/BeatLoader'
import DatePicker from 'react-datepicker'
import { addDays } from 'date-fns'

import PageWrapper from '../../../../wrapper/page.wrapper'
import CardPage from '../../../../CardPage'
import ButtonAction from '../../../../ButtonAction'

import { useDispatch, useSelector } from 'react-redux'
import { getAllArtikel, clearErrors } from '../../../../../redux/actions/publikasi/artikel.actions'

const Role = () => {

    const dispatch = useDispatch()
    const router = useRouter()

    const { loading, error, artikel } = useSelector(state => state.allArtikel)
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    let { page = 1 } = router.query
    page = Number(page)

    useEffect(() => {

        dispatch(getAllArtikel())

    }, [dispatch])

    const override = css`
        margin: 0 auto;
    `;

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
                        <h3 className="card-title font-weight-bolder text-dark">Role</h3>
                        <div className="card-toolbar">
                            <Link href='/publikasi/managemen-admin/role/tambah'>
                                <a className="btn btn-light-success px-6 font-weight-bold btn-block ">
                                    Tambah Role
                                </a>
                            </Link>
                        </div>
                    </div>

                    <div className="card-body pt-0">

                        <div className="table-filter">
                            <div className="row align-items-center">
                                <div className="col-lg-12 col-xl-12">
                                    <div className="input-icon">
                                        <input style={{ background: '#F3F6F9', border: 'none' }} type="text" className="form-control" placeholder="Search..." id="kt_datatable_search_query" />
                                        <span>
                                            <i className="flaticon2-search-1 text-muted"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-right">
                                <div className="col-lg-2 col-xl-2 mt-5 mt-lg-5">
                                    <DatePicker
                                        className="form-search-date form-control-sm form-control"
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        dateFormat="dd/MM/yyyy"
                                    // minDate={addDays(new Date(), 20)}
                                    />
                                    <small className="form-text text-muted">
                                        Dari Tanggal
                                    </small>
                                </div>
                                <div className="col-lg-2 col-xl-2 mt-5 mt-lg-5">
                                    <DatePicker
                                        className="form-search-date form-control-sm form-control"
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate}
                                        maxDate={addDays(startDate, 20)}
                                        dateFormat="dd/MM/yyyy"
                                    />
                                    <small className="form-text text-muted">
                                        Sampai Tanggal
                                    </small>
                                </div>
                                <div className="col-lg-2 col-xl-2 mt-5 mt-lg-5">
                                    <a href="#" className="btn btn-sm btn-light-primary px-6 font-weight-bold btn-block">Cari</a>
                                </div>
                            </div>
                        </div>

                        <div className="table-page mt-5">
                            <div className="table-responsive">

                                <div className="loading text-center justify-content-center">
                                    <BeatLoader color='#3699FF' loading={loading} css={override} size={10} />
                                </div>

                                {loading === false ?
                                    <table className='table table-separate table-head-custom table-checkable'>
                                        <thead style={{ background: '#F3F6F9' }}>
                                            <tr>
                                                <th className='text-center'>Tipe Role</th>
                                                <th>Menu Permission</th>
                                                <th>Tanggal Membuat</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                artikel && artikel?.artikel.length === 0 ?
                                                    '' :
                                                    artikel && artikel?.artikel?.map((artikel) => {
                                                        return <tr key={artikel.id}>

                                                            <td className='align-middle text-center'>{artikel?.jenis_kategori}</td>
                                                            <td className='align-middle'>{artikel?.judul_artikel}</td>
                                                            <td className='align-middle'>{artikel?.created_at}</td>
                                                            <td className='align-middle'>
                                                                <ButtonAction icon='write.svg' />
                                                                <ButtonAction icon='trash.svg' />
                                                            </td>
                                                        </tr>

                                                    })
                                            }
                                        </tbody>
                                    </table> : ''
                                }
                            </div>

                            <div className="row">
                                {artikel && artikel?.perPage < artikel?.total &&
                                    <div className="table-pagination">
                                        <Pagination
                                            activePage={page}
                                            itemsCountPerPage={artikel?.perPage}
                                            totalItemsCount={artikel?.total}
                                            pageRangeDisplayed={3}
                                            // onChange={handlePagination}
                                            nextPageText={'>'}
                                            prevPageText={'<'}
                                            firstPageText={'<<'}
                                            lastPageText={'>>'}
                                            itemClass='page-item'
                                            linkClass='page-link'
                                        />
                                    </div>
                                }
                                {artikel && artikel?.total > 5 ?
                                    <div className="table-total ml-auto">
                                        <div className="row">
                                            <div className="col-4 mr-0 p-0">
                                                <select className="form-control" id="exampleFormControlSelect2" style={{ width: '65px', background: '#F3F6F9', borderColor: '#F3F6F9', color: '#9E9E9E' }}>
                                                    <option>5</option>
                                                    <option>10</option>
                                                    <option>30</option>
                                                    <option>40</option>
                                                    <option>50</option>
                                                </select>
                                            </div>
                                            <div className="col-8 my-auto">
                                                <p className='align-middle mt-3' style={{ color: '#B5B5C3' }}>Total Data 120</p>
                                            </div>
                                        </div>
                                    </div> : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}

export default Role