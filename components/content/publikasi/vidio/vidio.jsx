import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import Pagination from 'react-js-pagination';
import DatePicker from 'react-datepicker'
import { addDays } from 'date-fns'

import PageWrapper from '../../../wrapper/page.wrapper'
import CardPage from '../../../CardPage'
import ButtonAction from '../../../ButtonAction'
import LoadingTable from '../../../LoadingTable';

import { useDispatch, useSelector } from 'react-redux'
import { getAllVideo, clearErrors } from '../../../../redux/actions/publikasi/video.actions'

const Vidio = () => {

    const dispatch = useDispatch()
    const router = useRouter()

    const { loading, error, video } = useSelector(state => state.allVideo)
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    let { page = 1 } = router.query
    page = Number(page)

    useEffect(() => {

        dispatch(getAllVideo())

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

            <div className="col-lg-12 col-md-3">
                <div className="row">
                    <CardPage background='bg-light-info' icon='mail-purple.svg' color='#8A50FC' value='90' titleValue='Video' title='Total Publish' />
                    <CardPage background='bg-light-warning' icon='garis-yellow.svg' color='#634100' value='64' titleValue='Video' title='Total Author' />
                    <CardPage background='bg-light-success' icon='orang-tambah-green.svg' color='#74BBB7' value='64' titleValue='K' title='Total Yang Baca' />
                    <CardPage background='bg-light-danger' icon='kotak-kotak-red.svg' color='#F65464' value='64' titleValue='Video' title='Total Unpublish' />
                </div>
            </div>


            <div className="col-lg-12 col-xxl-4 order-1 order-xxl-2 px-0">
                <div className="card card-custom card-stretch gutter-b">
                    <div className="card-header border-0">
                        <h3 className="card-title font-weight-bolder text-dark">Managemen Video</h3>
                        <div className="card-toolbar">
                            <Link href='/publikasi/video/tambah'>
                                <a className="btn btn-light-success px-6 font-weight-bold btn-block ">
                                    Tambah Video
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

                                <LoadingTable loading={loading} />

                                {loading === false ?
                                    <table className='table table-separate table-head-custom table-checkable'>
                                        <thead style={{ background: '#F3F6F9' }}>
                                            <tr>
                                                <th className='text-center'>Thumbnail</th>
                                                <th>Kategori</th>
                                                <th>Judul</th>
                                                <th>Tanggal Publish</th>
                                                <th>Dibuat</th>
                                                <th>Status</th>
                                                <th>Role</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                !video || video && video.video.length === 0 ?
                                                    <td className='align-middle text-center' colSpan={8}>Data Masih Kosong</td> :
                                                    video && video.video.map((row) => {
                                                        return <tr key={row.id}>
                                                            <td className='text-center'>
                                                                <Image
                                                                    alt={row.judul_berita}
                                                                    unoptimized={process.env.ENVIRONMENT !== "PRODUCTION"}
                                                                    src={process.env.END_POINT_API_IMAGE + 'video/' + row.gambar}
                                                                    width={80}
                                                                    height={50}
                                                                />
                                                            </td>
                                                            <td className='align-middle'>{row.judul_video}</td>
                                                            <td className='align-middle'>{row.judul_video}</td>
                                                            <td className='align-middle'>{row.created_at}</td>
                                                            <td className='align-middle'>{row.users_id}</td>
                                                            <td className='align-middle'>
                                                                {row.publish === 1 ?
                                                                    <span class="label label-inline label-light-success font-weight-bold">
                                                                        Publish
                                                                    </span>
                                                                    :
                                                                    <span class="label label-inline label-light-warning font-weight-bold">
                                                                        Unpublish
                                                                    </span>
                                                                }

                                                            </td>
                                                            <td className='align-middle'>Admin Publikasi</td>
                                                            <td className='align-middle'>
                                                                <ButtonAction icon='setting.svg' />
                                                                <ButtonAction icon='write.svg' />
                                                                <button onClick={() => handleDelete(row.id)} className='btn mr-1' style={{ background: '#F3F6F9', borderRadius: '6px' }}>
                                                                    <Image alt='button-action' src={`/assets/icon/trash.svg`} width={18} height={18} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    })
                                            }
                                        </tbody>
                                    </table> : ''
                                }
                            </div>

                            <div className="row">
                                {video && video.perPage < video.total &&
                                    <div className="table-pagination">
                                        <Pagination
                                            activePage={page}
                                            itemsCountPerPage={perPage}
                                            totalItemsCount={total}
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
                                {video && video.total > 5 ?
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

export default Vidio