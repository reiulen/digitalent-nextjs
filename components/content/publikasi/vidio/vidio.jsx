import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import Pagination from 'react-js-pagination';
import DatePicker from 'react-datepicker'
import { addDays } from 'date-fns'
import ReactPlayer from 'react-player';
import Swal from "sweetalert2";
import moment from "moment";

import PageWrapper from '../../../wrapper/page.wrapper'
import CardPage from '../../../CardPage'
import ButtonAction from '../../../ButtonAction'
import LoadingTable from '../../../LoadingTable';
import IconArrow from "../../../assets/icon/Arrow";
import IconClose from "../../../assets/icon/Close";
import IconFilter from "../../../assets/icon/Filter";

import { useDispatch, useSelector } from 'react-redux'
import { deleteVideo, playVideo, clearErrors } from '../../../../redux/actions/publikasi/video.actions'
import { DELETE_VIDEO_RESET } from '../../../../redux/types/publikasi/video.type'
import { viewGaleri } from '../../../../redux/actions/publikasi/galeri.actions';

const Vidio = ({ token }) => {

    const dispatch = useDispatch()
    const router = useRouter()

    const { loading: allLoading, error, video } = useSelector(state => state.allVideo)
    const { loading: deleteLoading, error: deleteError, isDeleted } = useSelector((state) => state.deleteVideo);
    const { loading: playLoading, error: playError, isPlayed } = useSelector((state) => state.playedVideo);

    const [search, setSearch] = useState('')
    const [limit, setLimit] = useState(null)
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [url_video, setUrlVideo] = useState("")
    const [video_playing, setVideoPlaying] = useState(false)
    const [publishValue, setPublishValue] = useState(null)
    const [idVideo, setIdVideo] = useState(null)
    const [disableEndDate, setDisableEndDate] = useState(true)
    const [judul_video, setJudulVideo] = useState(null)
    const [tanggal_publish, setTanggalPublish] = useState(null)
    const [kategori, setKategori] = useState(null)
    const [isiVideo, setIsiVideo] = useState(null)

    let loading = false
    let { page = 1, keyword, success } = router.query

    if (allLoading) {
        loading = allLoading
    } else if (deleteLoading) {
        loading = deleteLoading
    } else if (playLoading) {
        loading = playLoading
    }

    page = Number(page)

    useEffect(() => {
        // if (limit) {
        //   router.push(`${router.pathname}?page=1&limit=${limit}`)
        // }

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

    }, [isDeleted, dispatch]);

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
                dispatch(deleteVideo(id, token));
            }
        });
    };

    const handlePagination = (pageNumber) => {
        if (limit !== null && search === "" && startDate === null && endDate === null && publishValue === null) {
            router.push(`${router.pathname}?page=${pageNumber}&limit=${limit}`)

        } else if (limit !== null && search !== "" && startDate === null && endDate === null && publishValue === null) {
            router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&limit=${limit}`)

        } else if (limit === null && search !== "" && startDate === null && endDate === null && publishValue === null) {
            router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}`)

        } else if (limit !== null && search === "" && startDate !== null && endDate !== null && publishValue === null) {
            router.push(`${router.pathname}?page=${pageNumber}&limit=${limit}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)

        } else if (limit !== null && search !== "" && startDate !== null && endDate !== null && publishValue === null) {
            router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&limit=${limit}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)

        } else if (limit === null && search !== "" && startDate !== null && endDate !== null && publishValue === null) {
            router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)

        } else if (limit !== null && search === "" && startDate === null && endDate === null && publishValue !== null) {
            router.push(`${router.pathname}?page=${pageNumber}&limit=${limit}&publish=${publishValue}`)

        } else if (limit !== null && search !== "" && startDate === null && endDate === null && publishValue !== null) {
            router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&limit=${limit}&publish=${publishValue}`)

        } else if (limit === null && search !== "" && startDate === null && endDate === null && publishValue !== null) {
            router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&publish=${publishValue}`)

        } else if (limit === null && search === "" && startDate === null && endDate === null && publishValue !== null) {
            router.push(`${router.pathname}?page=${pageNumber}&publish=${publishValue}`)

        } else if (limit !== null && search === "" && startDate !== null && endDate !== null && publishValue !== null) {
            router.push(`${router.pathname}?page=${pageNumber}&limit=${limit}&publish=${publishValue}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)

        } else if (limit !== null && search !== "" && startDate !== null && endDate !== null && publishValue !== null) {
            router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&limit=${limit}&publish=${publishValue}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)

        } else if (limit === null && search !== "" && startDate !== null && endDate !== null && publishValue !== null) {
            router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&publish=${publishValue}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)

        } else {
            router.push(`${router.pathname}?page=${pageNumber}`)
        }
    }

    const handleSearch = () => {
        if (limit != null && startDate === null && endDate === null) {
            router.push(`${router.pathname}?page=1&keyword=${search}&limit=${limit}`)

        } else if (limit !== null && startDate !== null && endDate !== null) {
            router.push(`${router.pathname}?page=1&keyword=${search}&limit=${limit}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)

        } else {
            router.push(`${router.pathname}?page=1&keyword=${search}`)
        }

    };

    const handleSearchDate = () => {
        if (moment(startDate).format("YYYY-MM-DD") > moment(endDate).format("YYYY-MM-DD")) {
            Swal.fire(
                'Oops !',
                'Tanggal sebelum tidak boleh melebihi tanggal sesudah.',
                'error'
            )
            setStartDate(null)
            setEndDate(null)

        } else if (startDate === null && endDate !== null) {
            Swal.fire(
                'Oops !',
                'Tanggal sebelum tidak boleh kosong',
                'error'
            )
            setStartDate(null)
            setEndDate(null)

        } else if (startDate !== null && endDate === null) {
            Swal.fire(
                'Oops !',
                'Tanggal sesudah tidak boleh kosong',
                'error'
            )
            setStartDate(null)
            setEndDate(null)


        } else {
            if (limit !== null && search !== null && startDate !== null && endDate !== null) {
                router.push(
                    `${router.pathname}?page=1&keyword=${search}startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}&limit=${limit}`
                );

            } else if (limit !== null && search === null && startDate !== null && endDate !== null) {
                router.push(
                    `${router.pathname}?page=1&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}&limit=${limit}`
                )


            } else if (limit !== null && search === null && startDate === null && endDate === null) {
                router.push(
                    `${router.pathname}?page=1&limit=${limit}`
                )

            } else if (limit !== null && search !== null && startDate === null && endDate === null) {
                router.push(
                    `${router.pathname}?page=1&limit=${limit}&keyword=${search}`
                )

            } else {
                router.push(
                    `${router.pathname}?page=1&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`
                );
            }
        }
    };

    // const handleLimit = (val) => {
    //     setLimit(val)
    //     if (search === "") {
    //         router.push(`${router.pathname}?page=1&limit=${val}`);

    //     } else {
    //         router.push(`${router.pathname}?page=1&keyword=${search}&limit=${val}`)
    //     }

    // };

    const handleLimit = (val) => {
        setLimit(val)
        if (search === "" && publishValue === null) {
            router.push(`${router.pathname}?page=1&limit=${val}`);

        } else if (search !== "" && publishValue === null) {
            router.push(`${router.pathname}?page=1&keyword=${search}&limit=${val}`)

        } else if (search === "" && publishValue === '1') {
            router.push(`${router.pathname}?page=1&publish=${publishValue}&limit=${val}`)

        } else if (search !== "" && publishValue === '1') {
            router.push(`${router.pathname}?page=1&publish=${publishValue}&limit=${val}`)

        } else if (search === "" && publishValue === '0') {
            router.push(`${router.pathname}?page=1&publish=${publishValue}&limit=${val}`)

        } else if (search !== "" && publishValue === '0') {
            router.push(`${router.pathname}?page=1&publish=${publishValue}&limit=${val}`)

            // } else if (search !== "" && publishValue === '0' && limit !== null) {
            //     router.push(`${router.pathname}?page=1&publish=${publishValue}&limit=${val}`)
        }

    };

    const handlePublish = (val) => {
        if (val !== null || val !== "") {
            setPublishValue(val)

            if (startDate === null && endDate === null && limit === null && search === null) {
                router.push(`${router.pathname}?publish=${val}`);

            } else if (startDate !== null && endDate !== null && limit === null && search === null) {
                router.push(`${router.pathname}?publish=${val}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)

            } else if (startDate !== null && endDate !== null && limit !== null && search === null) {
                router.push(`${router.pathname}?publish=${val}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}&limit=${limit}`)

            } else if (startDate !== null && endDate !== null && limit === null && search !== null) {
                router.push(`${router.pathname}?publish=${val}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}&keyword=${search}`)

            } else if (startDate === null && endDate === null && limit !== null && search === null) {
                router.push(`${router.pathname}?publish=${val}&limit=${limit}`);

            } else if (startDate === null && endDate === null && limit === null && search !== null) {
                router.push(`${router.pathname}?publish=${val}`);
                //   router.push(`${router.pathname}?publish=${val}&keyword=${search}`);

            } else if (startDate === null && endDate === null && limit !== null && search !== null) {
                router.push(`${router.pathname}?publish=${val}&limit=${limit}&keyword=${search}`);

            } else if (startDate !== null && endDate !== null && limit !== null && search !== null) {
                router.push(`${router.pathname}?publish=${val}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}&limit=${limit}&keyword=${search}`)
            }
        }

    }

    const handlePreview = (url, id, judul_video, tanggal_publish, kategori, isi_video) => {
        // const data = {
        //     id,
        //     _method: "PUT",
        //     isplay: "1"
        // }

        // dispatch(playVideo(data))

        setIdVideo(id)
        setVideoPlaying(true)
        setUrlVideo(url)
        setJudulVideo(judul_video)
        setTanggalPublish(tanggal_publish)
        setKategori(kategori)
        setIsiVideo(isi_video)
    }

    const handleIsPlayed = () => {
        const data = {
            id: idVideo,
            _method: "PUT",
            isplay: "1"
        }

        dispatch(playVideo(data, token))
    }

    const resetValueSort = () => {
        setStartDate(null)
        setEndDate(null)
        setDisableEndDate(true)
    }

    const handleStartDate = (date) => {
        setStartDate(date)
        setDisableEndDate(false)
    }

    // const handleIsPlayed = (id) => {
    //     const data = {
    //         id,
    //         _method: "PUT",
    //         isplay: "1"
    //     }

    //     dispatch(playVideo(data))
    // }

    return (
        <PageWrapper>
            {
                console.log(video)
            }
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

            {success ? (
                <div
                    className="alert alert-custom alert-light-success fade show mb-5"
                    role="alert"
                >
                    <div className="alert-icon">
                        <i className="flaticon2-checkmark"></i>
                    </div>
                    <div className="alert-text">Berhasil Menyimpan Data !</div>
                    <div className="alert-close">
                        <button
                            type="button"
                            className="close"
                            data-dismiss="alert"
                            aria-label="Close"
                            onClick={onNewReset}
                        >
                            <span aria-hidden="true">
                                <i className="ki ki-close"></i>
                            </span>
                        </button>
                    </div>
                </div>
            ) : (
                ""
            )}

            <div className="col-lg-12 col-md-3">
                <div className="row">
                    <CardPage
                        background='bg-light-info'
                        icon="new/open-book.svg"
                        color='#ffffff'
                        // icon='mail-purple.svg' 
                        // color='#8A50FC' 
                        value={video && video.publish != "" ? video.publish : 0}
                        titleValue='Video'
                        title='Total Publish'
                        publishedVal="1"
                        routePublish={() => handlePublish("1")}
                    />
                    <CardPage
                        background='bg-light-warning'
                        icon="new/mail-white.svg"
                        color='#ffffff'
                        // icon='garis-yellow.svg' 
                        // color='#634100' 
                        value='64'
                        titleValue='Video'
                        title='Total Author'
                        publishedVal=""
                        routePublish={() => handlePublish("")}
                    />
                    <CardPage
                        background='bg-light-success'
                        icon='user-white.svg'
                        color='#ffffff'
                        // icon='orang-tambah-green.svg' 
                        // color='#74BBB7' 
                        value={video && video.total_views != "" ? video.total_views : 0}
                        titleValue='Orang'
                        title='Total Dilihat'
                        publishedVal=""
                        routePublish={() => handlePublish("")}
                    />
                    <CardPage
                        background='bg-light-danger'
                        icon="Library.svg"
                        color='#ffffff'
                        // icon='kotak-kotak-red.svg' 
                        // color='#F65464' 
                        value={video && video.unpublish != "" ? video.unpublish : 0}
                        titleValue='Video'
                        title='Total Belum Dipublish'
                        publishedVal="0"
                        routePublish={() => handlePublish("0")}
                    />
                </div>
            </div>


            <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
                <div className="card card-custom card-stretch gutter-b">
                    <div className="card-header border-0">
                        <h3 className="card-title font-weight-bolder text-dark">Video</h3>
                        <div className="card-toolbar">
                            <Link href='/publikasi/video/tambah'>
                                <a className="btn btn-primary-rounded-full px-6 font-weight-bold btn-block ">
                                    <i className="ri-add-fill pb-1 text-white mr-2 "></i>
                                    Tambah Video
                                </a>
                            </Link>
                        </div>
                    </div>

                    <div className="card-body pt-0">

                        <div className="table-filter">
                            <div className="row align-items-center">
                                <div className="col-lg-6 col-xl-6 col-sm-9">
                                    <div
                                        className="position-relative overflow-hidden mt-3"
                                        style={{ maxWidth: "330px" }}
                                    >
                                        <i className="ri-search-line left-center-absolute ml-2"></i>
                                        <input
                                            type="text"
                                            className="form-control pl-10"
                                            placeholder="Ketik disini untuk Pencarian..."
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                        <button
                                            className="btn bg-blue-primary text-white right-center-absolute"
                                            style={{
                                                borderTopLeftRadius: "0",
                                                borderBottomLeftRadius: "0",
                                            }}
                                            onClick={handleSearch}
                                        >
                                            Cari
                                        </button>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-xl-6 col-sm-9">
                                    <div className="d-flex flex-wrap align-items-center justify-content-end mt-2">
                                        {/* sortir by modal */}
                                        <button
                                            className="avatar item-rtl btn border d-flex align-items-center justify-content-between mt-2"
                                            data-toggle="modal"
                                            data-target="#exampleModalCenter"
                                            style={{ color: "#464646", minWidth: "230px" }}
                                        >
                                            <div className="d-flex align-items-center">
                                                <IconFilter className="mr-3" />
                                                Pilih Filter
                                            </div>
                                            <IconArrow fill="#E4E6EF" width="11" height="11" />
                                        </button>

                                        {/* modal */}
                                        <form
                                            // id="kt_docs_formvalidation_text"
                                            className="form text-left"
                                        // action="#"
                                        // autoComplete="off"
                                        // onSubmit={handleSubmitSearchMany}
                                        >
                                            <div
                                                className="modal fade"
                                                id="exampleModalCenter"
                                                tabIndex="-1"
                                                role="dialog"
                                                aria-labelledby="exampleModalCenterTitle"
                                                aria-hidden="true"
                                            >
                                                <div
                                                    className="modal-dialog modal-dialog-centered"
                                                    role="document"
                                                >
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5
                                                                className="modal-title font-weight-bold"
                                                                id="exampleModalLongTitle"
                                                            >
                                                                Filter
                                                            </h5>
                                                            <button
                                                                type="button"
                                                                className="close"
                                                                data-dismiss="modal"
                                                                aria-label="Close"
                                                                onClick={() => resetValueSort()}
                                                            >
                                                                <IconClose />
                                                            </button>
                                                        </div>

                                                        <div
                                                            className="modal-body text-left"
                                                            style={{ height: "200px" }}
                                                        >
                                                            <div className="mb-10 col-12">
                                                                <label className="required fw-bold fs-6 mb-2">
                                                                    Tanggal
                                                                </label>

                                                                <div>
                                                                    <DatePicker
                                                                        className="form-search-date form-control-sm form-control"
                                                                        selected={startDate}
                                                                        onChange={(date) => handleStartDate(date)}
                                                                        selectsStart
                                                                        startDate={startDate}
                                                                        endDate={endDate}
                                                                        dateFormat="dd/MM/yyyy"
                                                                        placeholderText="Silahkan Isi Tanggal Dari"
                                                                        wrapperClassName="col-12 col-lg-12 col-xl-12"
                                                                    // minDate={moment().toDate()}
                                                                    // minDate={addDays(new Date(), 20)}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="mb-10 col-12">
                                                                <label className="required fw-bold fs-6 mb-2">
                                                                    Tanggal
                                                                </label>

                                                                <div>
                                                                    <DatePicker
                                                                        className="form-search-date form-control-sm form-control"
                                                                        selected={endDate}
                                                                        onChange={(date) => setEndDate(date)}
                                                                        selectsEnd
                                                                        startDate={startDate}
                                                                        endDate={endDate}
                                                                        dateFormat="dd/MM/yyyy"
                                                                        // minDate={moment().toDate()}
                                                                        minDate={startDate}
                                                                        maxDate={addDays(startDate, 20)}
                                                                        placeholderText="Silahkan Isi Tanggal Sampai"
                                                                        wrapperClassName="col-12 col-lg-12 col-xl-12"
                                                                        disabled={disableEndDate === true || disableEndDate === null}
                                                                    // minDate={addDays(new Date(), 20)}
                                                                    />
                                                                </div>
                                                                {
                                                                    disableEndDate === true || disableEndDate === null ?
                                                                        <small className="text-muted">
                                                                            Mohon isi Tanggal Dari terlebih dahulu
                                                                        </small>
                                                                        :
                                                                        null
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <div className="d-flex justify-content-end align-items-center">
                                                                <button
                                                                    className="btn btn-white-ghost-rounded-full"
                                                                    type="button"
                                                                    onClick={() => resetValueSort()}
                                                                >
                                                                    Reset
                                                                </button>
                                                                <button
                                                                    className="btn btn-primary-rounded-full ml-4"
                                                                    type="button"
                                                                    data-dismiss="modal"
                                                                    onClick={() => handleSearchDate()}
                                                                >
                                                                    Terapkan
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        {/* end modal */}

                                    </div>
                                </div>
                            </div>



                            {/* <div className="row align-items-right">
                                <div className="col-lg-2 col-xl-2">
                                    <small className="form-text text-muted">
                                        Dari Tanggal
                                    </small>
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
                                    
                                </div>
                                <div className="col-lg-2 col-xl-2">
                                    <small className="form-text text-muted">
                                        Sampai Tanggal
                                    </small>
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
                                    
                                </div>
                                <div className="col-lg-2 col-xl-2 mt-5 mt-lg-5">
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-light-primary px-6 font-weight-bold btn-block"
                                        onClick={handleSearchDate}
                                    >
                                        Cari
                                    </button>
                                </div>
                            </div> */}
                        </div>

                        <div className="table-page mt-5">
                            <div className="table-responsive">

                                <LoadingTable loading={loading} />

                                {loading === false ?
                                    <table className='table table-separate table-head-custom table-checkable'>
                                        <thead style={{ background: '#F3F6F9' }}>
                                            <tr>
                                                <th className="text-center">No</th>
                                                <th className='text-center'>Thumbnail</th>
                                                <th>Kategori</th>
                                                <th>Judul</th>
                                                <th>Tanggal Publish</th>
                                                <th>Dibuat</th>
                                                <th>Status</th>
                                                <th>Role</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                !video || video && video.video.length === 0 ?
                                                    <td className='align-middle text-center' colSpan={8}>Data Tidak Ditemukan</td> :
                                                    video && video.video.map((row, i) => {
                                                        { console.log("Video :", row) }
                                                        return <tr key={row.id}>
                                                            {/* <td className="align-middle text-center">
                                                                <span className="badge badge-secondary text-muted">
                                                                {i + 1 * (page * 5 || limit) - 4}
                                                                </span>
                                                            </td> */}
                                                            <td className='align-middle text-center'>
                                                                {
                                                                    limit === null ?
                                                                        <span className="badge badge-secondary text-muted">
                                                                            {i + 1 * (page * 5) - (5 - 1)}
                                                                        </span>
                                                                        :
                                                                        <span className="badge badge-secondary text-muted">
                                                                            {i + 1 * (page * limit) - (limit - 1)}
                                                                        </span>
                                                                }

                                                            </td>
                                                            <td className='text-center'>
                                                                <Image
                                                                    alt={row.judul_video}
                                                                    unoptimized={process.env.ENVIRONMENT !== "PRODUCTION"}
                                                                    loader={process.env.END_POINT_API_IMAGE_PUBLIKASI + "publikasi/images/" + row.gambar}
                                                                    src={process.env.END_POINT_API_IMAGE_PUBLIKASI + 'publikasi/images/' + row.gambar}
                                                                    width={80}
                                                                    height={50}
                                                                />
                                                            </td>
                                                            <td className='align-middle'>{row.kategori}</td>
                                                            <td className='align-middle'>{row.judul_video}</td>
                                                            <td className='align-middle'>
                                                                {
                                                                    row.publish === 1 ? (
                                                                        row.tanggal_publish
                                                                    ) : (
                                                                        <span className="label label-inline label-light-danger font-weight-bold">
                                                                            Belum dipublish
                                                                        </span>
                                                                    )
                                                                }
                                                            </td>
                                                            {/* <td className='align-middle'>{row.dibuat}</td> */}
                                                            <td className='align-middle'>Super Admin</td>
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
                                                            <td className='align-middle'>Super Admin</td>
                                                            <td className="align-middle d-flex">

                                                                <button
                                                                    onClick={() => handlePreview(row.url_video, row.id, row.judul_video, row.tanggal_publish, row.kategori, row.isi_video)}
                                                                    className="btn btn-link-action bg-blue-secondary text-white mr-2 my-5 position-relative btn-delete"
                                                                    data-target="#videoPlayerModal"
                                                                    data-toggle="modal"
                                                                >
                                                                    <i className="ri-todo-fill p-0 text-white"></i>
                                                                    <div className="text-hover-show-hapus">
                                                                        Pratinjau
                                                                    </div>
                                                                </button>

                                                                <Link
                                                                    href={`/publikasi/video/${row.id}`}
                                                                >
                                                                    <a className="btn btn-link-action bg-blue-secondary text-white mr-2 my-5 position-relative btn-delete">
                                                                        <i className="ri-pencil-fill p-0 text-white"></i>
                                                                        <div className="text-hover-show-hapus">
                                                                            Ubah
                                                                        </div>
                                                                    </a>
                                                                </Link>

                                                                <button
                                                                    className="btn btn-link-action bg-blue-secondary text-white my-5 position-relative btn-delete"
                                                                    onClick={() => handleDelete(row.id)}
                                                                >
                                                                    <i className="ri-delete-bin-fill p-0 text-white"></i>
                                                                    <div className="text-hover-show-hapus">
                                                                        Hapus
                                                                    </div>
                                                                </button>

                                                            </td>

                                                            {/* <td className='align-middle'>
                                                                <button 
                                                                    onClick={() => handlePreview(row.url_video)}
                                                                    // onClick={() => setUrlVideo(row.url_video)} 
                                                                    className='btn mr-1' 
                                                                    style={{ background: '#F3F6F9', borderRadius: '6px' }} 
                                                                    data-target="#exampleModalCenter" 
                                                                    data-toggle="modal">
                                                                    <Image alt='button-action' src={`/assets/icon/setting.svg`} width={18} height={18} />
                                                                </button>
                                                                <ButtonAction icon='write.svg' link={`/publikasi/video/${row.id}`} title="Edit"/>
                                                                <button 
                                                                    onClick={() => handleDelete(row.id)}
                                                                    className='btn mr-1' 
                                                                    style={{ background: '#F3F6F9', borderRadius: '6px' }}
                                                                    data-toggle="tooltip" 
                                                                    data-placement="bottom" 
                                                                    title="Hapus"
                                                                >
                                                                    <Image alt='button-action' src={`/assets/icon/trash.svg`} width={18} height={18} />
                                                                </button>
                                                            </td> */}
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
                                {video ?
                                    <div className="table-total ml-auto">
                                        <div className="row">
                                            {/* <div className="col-4 mr-0 p-0 mt-3"> */}
                                            <div className="col-4 mr-0 mt-3">
                                                <select
                                                    className="form-control"
                                                    id="exampleFormControlSelect2"
                                                    style={{ width: '65px', background: '#F3F6F9', borderColor: '#F3F6F9', color: '#9E9E9E' }}
                                                    onChange={(e) => handleLimit(e.target.value)}
                                                    onBlur={(e) => handleLimit(e.target.value)}
                                                >
                                                    <option value='5' selected={limit == "5" ? true : false}>5</option>
                                                    <option value='10' selected={limit == "10" ? true : false}>10</option>
                                                    <option value='15' selected={limit == "15" ? true : false}>15</option>
                                                    <option value='20' selected={limit == "20" ? true : false}>20</option>
                                                </select>
                                            </div>
                                            <div className="col-8 my-auto">
                                                <p className='align-middle mt-5 pt-1' style={{ color: '#B5B5C3' }}>Total Data {video.total} List Data</p>
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
            <div className="modal fade" id="videoPlayerModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content" style={{ width: '1000px' }}>
                        {/* <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Pratinjau Video</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div> */}
                        <div className="modal-body d-flex justify-content-center flex-column" style={{ height: '500px' }}>
                            <div className="mb-2" style={{ textAlign: 'right' }}>
                                <button type="button" className="col-1 flaticon2-delete" data-dismiss="modal" aria-label="Close" style={{ border: 'none', background: 'none' }}></button>
                            </div>
                            <ReactPlayer url={url_video} controls width="700px" playing={video_playing} onPlay={handleIsPlayed} />
                            <div className="my-5">
                                <h3>
                                    {judul_video}
                                </h3>
                            </div>
                            <div className="row">
                                <div style={{ background: "#F3F6F9" }}
                                    className="mr-5 px-3 py-1 rounded mb-1 ml-4 d-flex align-items-center">
                                    <i className="flaticon2-calendar-4 "></i>
                                    {
                                        tanggal_publish ?
                                            <span className="ml-2">
                                                Publish : {moment({ tanggal_publish }).format('LL')}
                                            </span>
                                            :
                                            <span className="ml-2">
                                                Belum dipublish
                                            </span>
                                    }
                                </div>

                                <div style={{ background: "#F3F6F9" }}
                                    className=" rounded px-3 d-flex align-items-center">
                                    <i className="ri-dashboard-line"></i>
                                    <span className="ml-2 py-1">
                                        Kategori: {kategori}
                                    </span>
                                </div>
                            </div>
                            <div className="">
                                <span className="ml-1 py-1">
                                    {isiVideo}
                                </span>
                                {/* {
                                video && video.video.length !== 0 && idVideo !== null ?
                                    <>
                                        <div className="row mb-1 justify-content-between">
                                            <h3 className="col-10" style={{ fontWeight: 'bold', textAlign: 'left' }}>
                                                {console.log("Cek Isi :", isiVideo)}
                                            </h3>
                                        </div>
                                    </>
                                    :
                                    null
                            } */}
                            </div>
                        </div>
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setVideoPlaying(false)}>Tutup</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}

export default Vidio