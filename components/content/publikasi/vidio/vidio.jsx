import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import Pagination from 'react-js-pagination';
import DatePicker from 'react-datepicker'
import { addDays } from 'date-fns'
import ReactPlayer from 'react-player';

import PageWrapper from '../../../wrapper/page.wrapper'
import CardPage from '../../../CardPage'
import ButtonAction from '../../../ButtonAction'
import LoadingTable from '../../../LoadingTable';

import { useDispatch, useSelector } from 'react-redux'
import { deleteVideo, clearErrors } from '../../../../redux/actions/publikasi/video.actions'
import { DELETE_VIDEO_RESET } from '../../../../redux/types/publikasi/video.type'

const Vidio = () => {

    const dispatch = useDispatch()
    const router = useRouter()

    const { loading: allLoading, error, video } = useSelector(state => state.allVideo)
    const { loading: deleteLoading, error: deleteError, isDeleted } = useSelector((state) => state.deleteVideo);

    const [search, setSearch] = useState('')
    const [limit, setLimit] = useState(null)
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [url_video, setUrlVideo] = useState("")

    let loading = false
    let { page = 1 } = router.query
    if (allLoading) {
        loading = allLoading
    } else if (deleteLoading) {
        loading = deleteLoading
    }
    page = Number(page)

    useEffect(() => {
        if (limit) {
          router.push(`${router.pathname}?page=1&limit=${limit}`)
        }
        if (isDeleted) {
          Swal.fire("Berhasil ", "Data berhasil dihapus.", "success").then((result) => {
            if (result.isConfirmed) {
              window.location.reload()
            }
          });
          dispatch({
            type: DELETE_VIDEO_RESET
          })
        }
      }, [limit, isDeleted]);

    const onNewReset = () => {
    router.replace('/publikasi/video', undefined, { shallow: true })
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Apakah anda yakin ?",
            text: "Data ini tidak bisa dikembalikan !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya !",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
            dispatch(deleteVideo(id));
            }
        });
    };

    const handlePagination = (pageNumber) => {
        if (limit != null) {
            router.push(`${router.pathname}?page=${pageNumber}&limit=${limit}`)
        } else {
            router.push(`${router.pathname}?page=${pageNumber}`)
        }
    }

    const handleSearch = () => {
        if (limit != null) {
          router.push(`${router.pathname}?page=1&keyword=${search}&limit=${limit}`)
        } else {
          router.push(`${router.pathname}?page=1&keyword=${search}`)
        }
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

            <div className="col-lg-12 col-md-3">
                <div className="row">
                    <CardPage background='bg-light-info' icon='mail-purple.svg' color='#8A50FC' value='90' titleValue='Video' title='Total Publish' />
                    <CardPage background='bg-light-warning' icon='garis-yellow.svg' color='#634100' value='64' titleValue='Video' title='Total Author' />
                    <CardPage background='bg-light-success' icon='orang-tambah-green.svg' color='#74BBB7' value='64' titleValue='K' title='Total Yang Baca' />
                    <CardPage background='bg-light-danger' icon='kotak-kotak-red.svg' color='#F65464' value='64' titleValue='Video' title='Total Unpublish' />
                </div>
            </div>


            <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
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
                                <div className="col-lg-10 col-xl-10">
                                    <div className="input-icon">
                                        <input
                                        style={{ background: "#F3F6F9", border: "none" }}
                                        type="text"
                                        className="form-control"
                                        placeholder="Search..."
                                        id="kt_datatable_search_query"
                                        onChange={e => setSearch(e.target.value)}
                                        />
                                        <span>
                                        <i className="flaticon2-search-1 text-muted"></i>
                                        </span>
                                    </div>
                                </div>

                                <div className="col-lg-2 col-xl-2">
                                    <button type="button" className='btn btn-light-primary btn-block' onClick={handleSearch}>Cari</button>
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
                                                                    alt={row.judul_video}
                                                                    unoptimized={process.env.ENVIRONMENT !== "PRODUCTION"}
                                                                    src={process.env.END_POINT_API_IMAGE_PUBLIKASI + 'publikasi/images' + row.gambar}
                                                                    width={80}
                                                                    height={50}
                                                                />
                                                            </td>
                                                            <td className='align-middle'>{row.judul_video}</td>
                                                            <td className='align-middle'>{row.judul_video}</td>
                                                            <td className='align-middle'>{new Date (row.created_at).toLocaleDateString("fr-CA")}</td>
                                                            <td className='align-middle'>{row.dibuat}</td>
                                                            <td className='align-middle'>
                                                                {row.publish === 1 ?
                                                                    <span className="label label-inline label-light-success font-weight-bold">
                                                                        Publish
                                                                    </span>
                                                                    :
                                                                    <span className="label label-inline label-light-warning font-weight-bold">
                                                                        Belum diPublish
                                                                    </span>
                                                                }

                                                            </td>
                                                            <td className='align-middle'>Admin Publikasi</td>
                                                            <td className='align-middle'>
                                                                {/* <ButtonAction icon='setting.svg'/> */}
                                                                <button onClick={() => setUrlVideo(row.url_video)} className='btn mr-1' style={{ background: '#F3F6F9', borderRadius: '6px' }} data-target="#exampleModalCenter" data-toggle="modal">
                                                                    <Image alt='button-action' src={`/assets/icon/setting.svg`} width={18} height={18} />
                                                                </button>
                                                                <ButtonAction icon='write.svg' link={`/publikasi/video/${row.id}`}/>
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

                            {
                                console.log (video)
                            }

                            <div className="row">
                                {video && video.perPage < video.total &&
                                    <div className="table-pagination">
                                        <Pagination
                                            activePage={page}
                                            itemsCountPerPage={video.perPage}
                                            totalItemsCount={video.total}
                                            pageRangeDisplayed={3}
                                            onChange={handlePagination}
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
            
            {/* Modal */}
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Video Preview</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body d-flex justify-content-center" style={{ height: '400px' }}>
                            <ReactPlayer url={url_video} controls width="700px"/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}

export default Vidio