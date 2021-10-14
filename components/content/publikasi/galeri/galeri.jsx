import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../../../../styles/previewGaleri.module.css'

import Pagination from 'react-js-pagination';
import { css } from '@emotion/react'
import BeatLoader from 'react-spinners/BeatLoader'
import DatePicker from 'react-datepicker'
import { addDays } from 'date-fns'
import Swal from "sweetalert2";
import moment from "moment";

import PageWrapper from '../../../wrapper/page.wrapper'
import CardPage from '../../../CardPage'
import ButtonAction from '../../../ButtonAction'
import LoadingTable from "../../../LoadingTable";
// import ButtonNewTab from "../../../ButtonNewTab";
import IconArrow from "../../../assets/icon/Arrow";
import IconClose from "../../../assets/icon/Close";
import IconFilter from "../../../assets/icon/Filter";

import { useDispatch, useSelector } from 'react-redux'
import { deleteGaleri, viewGaleri, clearErrors } from '../../../../redux/actions/publikasi/galeri.actions'

import {
    DELETE_GALERI_RESET
} from '../../../../redux/types/publikasi/galeri.type'

const Galeri = ({ token }) => {

    const dispatch = useDispatch()
    const router = useRouter()

    // const { loading, error, galeri } = useSelector(state => state.allGaleri)
    const { loading: allLoading, error, galeri } = useSelector((state) => state.allGaleri);
    const { loading: deleteLoading, error: deleteError, isDeleted } = useSelector((state) => state.deleteGaleri);
    const { loading: viewLoading, error: viewError, isViewed } = useSelector((state) => state.viewedGaleri);

    const [search, setSearch] = useState('')
    const [limit, setLimit] = useState(null)
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [publishValue, setPublishValue] = useState(null)
    const [index_galleri, setIndexGalleri] = useState(null)
    const [disableEndDate, setDisableEndDate] = useState(true)
    const [previewImage, setPreviewImage] = useState(false)

    let loading = false

    let { page = 1, keyword, success } = router.query;
    if (allLoading) {
        loading = allLoading
    } else if (deleteLoading) {
        loading = deleteLoading
    } else if (viewLoading) {
        loading = viewLoading
    }


    page = Number(page);

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
                type: DELETE_GALERI_RESET
            })
        }

    }, [isDeleted, dispatch]);

    // const override = css`
    //     margin: 0 auto;
    // `;

    const onNewReset = () => {
        router.replace('/publikasi/galeri', undefined, { shallow: true })
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
                dispatch(deleteGaleri(id, token));
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

        } else if (startDate === null && endDate === null) {
            Swal.fire(
                'Oops !',
                'Harap mengisi tanggal terlebih dahulu.',
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
                router.push(`${router.pathname}?publish=${val}&keyword=${search}`);

            } else if (startDate === null && endDate === null && limit !== null && search !== null) {
                router.push(`${router.pathname}?publish=${val}&limit=${limit}&keyword=${search}`);

            } else if (startDate !== null && endDate !== null && limit !== null && search !== null) {
                router.push(`${router.pathname}?publish=${val}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}&limit=${limit}&keyword=${search}`)
            }
        }

    }

    const handlePreview = (i, id) => {
        const data = {
            id
        }

        dispatch(viewGaleri(data, token))
        setIndexGalleri(i)
        // console.log("INDEEEXX : ", data)
    }

    const printImage = () => {
        // console.log("isViewed :", isViewed.judul)
        return galeri && galeri.gallery.length !== 0 && index_galleri !== null ?
            <>
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" style={{ position: 'relative' }}>
                    <div className="carousel-inner" style={{ position: 'absolute', left: '-13px' }}>
                        <div className="carousel-item active">
                            {
                                isViewed && isViewed.length !== 0 ?
                                    isViewed.gambar.map((row, i) => {
                                        console.log("DAta :", row.id)
                                        return (
                                            <div className={styles['img-prevModal']} key={row.id}>
                                                <Image
                                                    unoptimized={process.env.ENVIRONMENT !== "PRODUCTION"}
                                                    loader={() => (process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                                        "publikasi/images/" +
                                                        row.gambar)}
                                                    src={
                                                        process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                                        "publikasi/images/" +
                                                        row.gambar
                                                    }
                                                    alt='image'
                                                    layout='fill'
                                                    objectFit='fill'
                                                />
                                            </div>
                                        )
                                    })
                                    : null
                            }
                        </div>
                        <div className="carousel-item">
                            {
                                isViewed && isViewed.length !== 0 ?
                                    // <>
                                    isViewed.gambar.map((row, i) => {
                                        console.log("DAta :", row)
                                        return (
                                            <div className={styles['img-prevModal']} key={i}>
                                                <Image
                                                    unoptimized={process.env.ENVIRONMENT !== "PRODUCTION"}
                                                    loader={() => (process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                                        "publikasi/images/" +
                                                        row.gambar)}
                                                    src={
                                                        process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                                        "publikasi/images/" +
                                                        row.gambar
                                                    }
                                                    alt='image'
                                                    layout='fill'
                                                    objectFit='fill'
                                                />
                                            </div>
                                        )
                                    })
                                    // </>
                                    : null
                            }
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-target="#carouselExampleIndicators" data-slide="prev"
                        style={{ position: 'absolute', left: '-14px', top: '250px', border: 'none', background: 'none' }}
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    </button>
                    <button className="carousel-control-next" type="button" data-target="#carouselExampleIndicators" data-slide="next"
                        style={{ position: 'absolute', right: '7px', top: '250px', border: 'none', background: 'none' }}
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    </button>
                </div>
            </>
            :
            null
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

    return (
        <PageWrapper>
            {
                console.log("Data Awal : ", galeri)
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

            {success ?
                <div className="alert alert-custom alert-light-success fade show mb-5" role="alert">
                    <div className="alert-icon"><i className="flaticon2-checkmark"></i></div>
                    <div className="alert-text">Berhasil Menyimpan Data !</div>
                    <div className="alert-close">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={onNewReset} >
                            <span aria-hidden="true"><i className="ki ki-close"></i></span>
                        </button>
                    </div>
                </div>
                : ''
            }

            <div className="col-lg-12 col-md-12">
                <div className="row">
                    <CardPage
                        background='bg-light-info'
                        icon="new/open-book.svg"
                        color='#ffffff'
                        // icon='mail-purple.svg' 
                        // color='#8A50FC' 
                        value={galeri && galeri.publish != "" ? galeri.publish : 0}
                        titleValue='Galeri'
                        title='Total Publish'
                        publishedVal="1"
                        routePublish={() => handlePublish("1")}
                    />
                    <CardPage
                        background='bg-light-warning'
                        icon="new/mail-white.svg"
                        color="#ffffff"
                        // icon='garis-yellow.svg' 
                        // color='#634100' 
                        value='64'
                        titleValue='Galeri'
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
                        value='64'
                        titleValue='K'
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
                        value={galeri && galeri.unpublish != "" ? galeri.unpublish : 0}
                        titleValue='Galeri'
                        title='Total Belum Dipublish'
                        publishedVal="0"
                        routePublish={() => handlePublish("0")}
                    />
                </div>
            </div>


            <div className="col-lg-12 order-1 px-0">
                <div className="card card-custom card-stretch gutter-b">
                    <div className="card-header border-0">
                        <h3 className="card-title font-weight-bolder text-dark">Galeri</h3>
                        <div className="card-toolbar">
                            <Link href='/publikasi/galeri/tambah'>
                                <a className="btn btn-primary-rounded-full px-6 font-weight-bold btn-block ">
                                    <i className="ri-add-fill pb-1 text-white mr-2 "></i>
                                    Tambah Galeri
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
                                            lassName="form text-left"
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
                                                                        minDate={startDate}
                                                                        // minDate={moment().toDate()}
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
                                                !galeri || galeri && galeri.gallery.length === 0 ?
                                                    <td className='align-middle text-center' colSpan={8}>Data Tidak Ditemukan</td> :
                                                    galeri && galeri.gallery.map((row, i) => {
                                                        // { console.log("INI ROWW ID : ", i + 1, row) }
                                                        return <tr key={row.id}>
                                                            <td className='align-middle text-center'>
                                                                {
                                                                    limit === null ?
                                                                        // <span className="badge badge-secondary text-muted">
                                                                        <span>
                                                                            {i + 1 * (page * 5) - (5 - 1)}
                                                                        </span>
                                                                        :
                                                                        <span>
                                                                            {i + 1 * (page * limit) - (limit - 1)}
                                                                        </span>
                                                                }

                                                            </td>
                                                            <td className='text-center'>
                                                                <Image
                                                                    key={row.id_gallery}
                                                                    alt={row.judul}
                                                                    unoptimized={
                                                                        process.env.ENVIRONMENT !== "PRODUCTION"
                                                                    }
                                                                    loader={() => (process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                                                        "publikasi/images/" +
                                                                        row.gambar)}
                                                                    src={
                                                                        process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                                                        "publikasi/images/" +
                                                                        row.gambar
                                                                    }
                                                                    width={80} height={50} />
                                                            </td>
                                                            <td className='align-middle'>{row.nama_kategori}</td>
                                                            <td className='align-middle'>{row.judul}</td>
                                                            <td className='align-middle'>{
                                                                row.publish === 1 ? (
                                                                    row.tanggal_publish
                                                                ) : (
                                                                    <span className="label label-inline label-light-danger font-weight-bold">
                                                                        Belum dipublish
                                                                    </span>
                                                                )
                                                            }</td>
                                                            <td className='align-middle'>
                                                                {/* {row.role} */}
                                                                Super Admin
                                                            </td>
                                                            <td className='align-middle'>
                                                                {row.publish === 1 ? (
                                                                    <span className="label label-inline label-light-success font-weight-bold">
                                                                        Publish
                                                                    </span>
                                                                ) : (
                                                                    <span className="label label-inline label-light-warning font-weight-bold">
                                                                        Belum di publish
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className='align-middle'>{row.role}</td>
                                                            <td className="align-middle d-flex">

                                                                <button
                                                                    onClick={() => handlePreview(i, row.id_gallery)}
                                                                    className="btn btn-link-action bg-blue-secondary text-white mr-2 my-5 position-relative btn-delete"
                                                                    data-target="#galleryModalPreview"
                                                                    data-toggle="modal"
                                                                >
                                                                    <i className="ri-todo-fill p-0 text-white"></i>
                                                                    <div className="text-hover-show-hapus">
                                                                        Pratinjau
                                                                    </div>
                                                                </button>

                                                                <Link
                                                                    href={`/publikasi/galeri/${row.id_gallery}`}
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
                                                                    onClick={() => handleDelete(row.id_gallery)}
                                                                >
                                                                    <i className="ri-delete-bin-fill p-0 text-white"></i>
                                                                    <div className="text-hover-show-hapus">
                                                                        Hapus
                                                                    </div>
                                                                </button>

                                                            </td>
                                                            {/* <td className='align-middle'>
                    
                                                                <button
                                                                    className='btn mr-1' 
                                                                    style={{ background: '#F3F6F9', borderRadius: '6px' }} 
                                                                    data-target="#exampleModalCenter" 
                                                                    data-toggle="modal"
                                                                    onClick={() => handleIndexGallery(i)}
                                                                    
                                                                >
                                                                    <Image
                                                                        alt="button-action"
                                                                        src={`/assets/icon/setting.svg`}
                                                                        width={18}
                                                                        height={18}
                                                                    />
                                                                </button>

                                                                <ButtonAction icon='write.svg' link={`/publikasi/galeri/${row.id_gallery}`} title="Edit"/>
                                                                
                                                                <button
                                                                    onClick={() => handleDelete(row.id_gallery)}
                                                                    className="btn mr-1"
                                                                    style={{
                                                                        background: "#F3F6F9",
                                                                        borderRadius: "6px",
                                                                    }}
                                                                    data-toggle="tooltip" 
                                                                    data-placement="bottom" 
                                                                    title="Hapus"
                                                                    >
                                                                    <Image
                                                                        alt="button-action"
                                                                        src={`/assets/icon/trash.svg`}
                                                                        width={18}
                                                                        height={18}
                                                                    />
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
                                {galeri && galeri.perPage < galeri.total &&
                                    <div className="table-pagination">
                                        <Pagination
                                            activePage={page}
                                            itemsCountPerPage={galeri.perPage}
                                            totalItemsCount={galeri.total}
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
                                {galeri ?
                                    <div className="table-total ml-auto">
                                        <div className="row">
                                            <div className="col-4 mr-0 mt-3">
                                                <select
                                                    className="form-control"
                                                    id="exampleFormControlSelect2"
                                                    style={{ width: '65px', background: '#F3F6F9', borderColor: '#F3F6F9', color: '#9E9E9E' }}
                                                    onChange={e => handleLimit(e.target.value)}
                                                    onBlur={e => handleLimit(e.target.value)}
                                                >
                                                    <option value='5' selected={limit == "5" ? true : false}>5</option>
                                                    <option value='10' selected={limit == "10" ? true : false}>10</option>
                                                    <option value='30' selected={limit == "30" ? true : false}>30</option>
                                                    <option value='40' selected={limit == "40" ? true : false}>40</option>
                                                    <option value='50' selected={limit == "50" ? true : false}>50</option>
                                                </select>
                                            </div>
                                            <div className="col-8 my-auto">
                                                {/* { console.log("Cek Total Galeri : ", galeri.total) } */}
                                                <p className='align-middle mt-5 pt-1' style={{ color: '#B5B5C3' }}>Total Data {galeri.total} List Data</p>
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
            <div className="modal fade" id="galleryModalPreview" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content mr-5" style={{ background: 'none' }}>
                        {/* <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Pratinjau Gambar</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div> */}
                        {/* {
                            console.log (galeri)
                        } */}
                        <div className={styles['modal-body']}>
                            <div className={styles['posModal']}>
                                <div className="col-6">
                                    {/* {console.log("Cek Modal Image :", galeri.gallery)} */}
                                    <div className={styles['img-left']}>
                                        {
                                            isViewed &&
                                            <>
                                                {printImage()}
                                            </>
                                        }
                                    </div>
                                    {/* {
                                        galeri && galeri.gallery.length !== 0 ?
                                            galeri.gallery.map((row, i) => {
                                                // { console.log("Cek Data :", row) }
                                                return (
                                                    <div className={styles['img-prevModal']}>
                                                        <Image
                                                            key={i}
                                                            unoptimized={process.env.ENVIRONMENT !== "PRODUCTION"}
                                                            loader={() => (process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                                                "publikasi/images/" +
                                                                row.gambar)}
                                                            src={
                                                                process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                                                "publikasi/images/" +
                                                                row.gambar
                                                            }

                                                            alt='image'
                                                            layout='fill'
                                                            objectFit='fill'
                                                        />
                                                    </div>
                                                )
                                            })

                                            :
                                            null
                                    } */}

                                    {/* {galeri.gallery[previewImage].gambar} */}
                                    {/* {
                                        galeri && galeri.gallery.length !== 0 && index_galleri !== null ?
                                            <>
                                                <div className={styles['img-prevModal']}>
                                                    <Image
                                                        unoptimized={process.env.ENVIRONMENT !== "PRODUCTION"}
                                                        loader={() => (process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                                            "publikasi/images/" +
                                                            galeri.gallery[index_galleri].gambar)}
                                                        src={
                                                            process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                                            "publikasi/images/" +
                                                            galeri.gallery[index_galleri].gambar
                                                        }
                                                        alt='image'
                                                        layout='fill'
                                                        objectFit='fill'
                                                    />
                                                </div>
                                            </>
                                            :
                                            null
                                    } */}
                                </div>
                                <div className="col-6" style={{ padding: '30px' }}>
                                    {/* {console.log("CEK :",galeri.gallery)} */}
                                    {
                                        galeri && galeri.gallery.length !== 0 && index_galleri !== null ?
                                            <>
                                                <div className="mb-1 justify-content-between" style={{ display: 'flex', marginLeft: '-12px' }}>
                                                    <h3 className="col-10" style={{ fontWeight: 'bold', textAlign: 'left', marginLeft: '-12px' }}>
                                                        {galeri.gallery[index_galleri].judul}
                                                    </h3>
                                                    <button type="button" className="col-1 flaticon2-delete" data-dismiss="modal" aria-label="Close" style={{ border: 'none', background: 'none' }}></button>
                                                </div>
                                                <div className="row mb-4" style={{ textAlign: 'left' }}>
                                                    <div className="col-6">
                                                        <div className={styles['subMenuPreview']}>
                                                            <div className="mb-1 p-0 d-flex align-items-center">
                                                                <div className={styles['iconPreview']}>
                                                                    <i className="flaticon2-calendar-4"></i>
                                                                </div>
                                                                <span className="ml-2">
                                                                    Publish: {moment(galeri.gallery[index_galleri].tanggal_publish).format('LL')}
                                                                </span>
                                                            </div>

                                                            <div className="mb-1 p-0 d-flex align-items-center">
                                                                <i className="flaticon2-user"></i>
                                                                <span className="ml-2">
                                                                    {/* User : Super Admin */}
                                                                    Author : {galeri.gallery[index_galleri].role}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-6">
                                                        <div className={styles['subMenuPreview']}>
                                                            <div className="mb-1 p-0 d-flex align-items-center">
                                                                <i className="ri-dashboard-line"></i>
                                                                <span className="ml-2">
                                                                    {/* User : Super Admin */}
                                                                    Kategori : {galeri.gallery[index_galleri].nama_kategori}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <hr className={styles['strip']} />
                                                <div className="row mb-1">
                                                    <p className={styles['description-img']}
                                                        dangerouslySetInnerHTML={{ __html: galeri.gallery[index_galleri].isi_galleri }}>
                                                    </p>
                                                    {
                                                        galeri.gallery[index_galleri].tag !== null ?
                                                            galeri.gallery[index_galleri].tag.map((row, i) => {
                                                                return (
                                                                    <span className="mr-3 label label-inline label-light-success font-weight-bold">
                                                                        <div className={styles['tagModal']}>
                                                                            {row}
                                                                        </div>
                                                                    </span>
                                                                )
                                                            })
                                                            : null
                                                    }
                                                </div>
                                            </>
                                            :
                                            <div>
                                                Data Tidak Ditemukan
                                            </div>
                                    }

                                </div>

                            </div>


                        </div>
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Tutup</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}


export default Galeri