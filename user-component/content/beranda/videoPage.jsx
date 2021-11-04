import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import Image from 'next/image'
import IconFilter from "../../../components/assets/icon/Filter";
import Pagination from 'react-js-pagination';
import ReactPlayer from 'react-player';

import styles from "../../../styles/preview.module.css"
import SubHeaderComponent from '../../components/template/Subheader.component';
import { playVideo } from "../../../redux/actions/publikasi/video.actions"

const VideoPage = ({ token }) => {
    const dispatch = useDispatch()
    const router = useRouter()

    const { loading: allLoading, error, video } = useSelector(state => state.allVideo)
    const { loading: playLoading, error: playError, isPlayed } = useSelector((state) => state.playedVideo);
    const { kategori } = useSelector((state) => state.allKategori);

    const [url_video, setUrlVideo] = useState("")
    const [video_playing, setVideoPlaying] = useState(false)
    const [publishValue, setPublishValue] = useState(null)
    const [idVideo, setIdVideo] = useState(null)
    const [judul_video, setJudulVideo] = useState(null)
    const [tanggal_publish, setTanggalPublish] = useState(null)
    const [dataKategori, setDataKategori] = useState(null)
    const [isiVideo, setIsiVideo] = useState(null)
    const [tag, setTag] = useState([])

    let loading = false
    let { page = 1, keyword, success } = router.query

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

    const handlePreview = (url, id, judul_video, tanggal_publish, dataKategori, isi_video, tag) => {
        setIdVideo(id)
        setVideoPlaying(true)
        setUrlVideo(url)
        setJudulVideo(judul_video)
        setTanggalPublish(tanggal_publish)
        setDataKategori(dataKategori)
        setIsiVideo(isi_video)
        setTag(tag)
    }

    const handleIsPlayed = () => {
        const data = {
            id: idVideo,
            _method: "PUT",
            isplay: "1"
        }
        dispatch(playVideo(data, token))
    }

    return (
        <>
            <SubHeaderComponent />
            <div>
                <h1>Video Terupdate dan Terkini</h1>
                <span>Temukan konten terupdate dan terkini mengenai Digital Talent Scholarship</span>
            </div>
            <div className="col-lg-10 row my-5">
                {
                    kategori.kategori && kategori.kategori.length === 0 ? null :
                        kategori.kategori.map((row, i) => {
                            return (
                                row.jenis_kategori === "Video" ?
                                    <div className="btn btn-primary mr-3" style={{}}>
                                        {(row.nama_kategori).toUpperCase()}
                                    </div>
                                    : null
                            )
                        })
                }
            </div>
            <div className="row">
                <div className="col-lg-8 my-5">
                    <div className="position-relative overflow-hidden mt-3">
                        <i className="ri-search-line left-center-absolute ml-2"></i>
                        <input
                            type="text"
                            className="form-control pl-10"
                            placeholder="Cari Video..."
                            // value={search}
                            // onChange={(e) => setSearch(e.target.value)}
                            style={{ borderRadius: '30px' }}
                        />
                        <button
                            className="btn btn-primary text-white right-center-absolute"
                            style={{
                                borderTopLeftRadius: "0",
                                borderBottomLeftRadius: "0",
                                borderTopRightRadius: '18px',
                                borderBottomRightRadius: '18px'
                            }}
                        // onClick={handleSearch}
                        >
                            Cari
                        </button>
                    </div>

                    {/* CARD Video */}
                    <div className="my-5">
                        <div className="row justify-content-between" style={{width: '103.5%',  flexWrap: 'wrap'}}>
                            {
                                // video.video || video.video.length === 0 ? null :
                                video.video.map((row, i) => {
                                    // {console.log(video)}
                                    return (
                                        <div className="col-sm-12 col-md-6 col-lg-6">
                                            <div className="card mb-4 border-0" key={i}>
                                                <Image
                                                    alt={row.judul_video}
                                                    unoptimized={process.env.ENVIRONMENT !== "PRODUCTION"}
                                                    loader={process.env.END_POINT_API_IMAGE_PUBLIKASI + "publikasi/images/" + row.gambar}
                                                    src={process.env.END_POINT_API_IMAGE_PUBLIKASI + 'publikasi/images/' + row.gambar}
                                                    width={70}
                                                    height={180}
                                                    className="rounded"
                                                    data-target="#videoPlayerModal"
                                                    data-toggle="modal"
                                                    onClick={() => handlePreview(row.url_video, row.id, row.judul_video, row.tanggal_publish, row.kategori, row.isi_video, row.tag)}
                                                />
                                                <div className="card-body">
                                                    <div style={{ width: '126%', marginLeft: '-30px' }}>
                                                        <h5 className="card-title" style={{width:'96%'}}>{row.judul_video}</h5>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="row align-items-center ml-2">
                                                                <div className="border rounded-circle py-1 px-2">
                                                                    {/* Insert Logo Image Here */}
                                                                    <Image
                                                                        src="/assets/media/logo-default.png"
                                                                        width={30}
                                                                        height={30}
                                                                        alt="Logo Image"
                                                                    />
                                                                </div>
                                                                <span className="ml-2">Admin Pokja</span>
                                                            </div>
                                                            {/* <span className="label label-inline label-light-primary font-weight-bold" style={{marginRight:'20px'}}>{(row.kategori).toUpperCase()}</span> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    {/* PAGINATION */}
                    <div>
                        {
                            // video && video.perPage < video.total &&
                            <div className="table-pagination" style={{ marginLeft: '35%' }}>
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
                    </div>
                </div>


                <div className="col-lg-4 my-5">
                    <div className="card mb-4">
                        <div className="row ml-5 mt-3">
                            <Image
                                src={`/assets/media/logo-filter.svg`}
                                width={40}
                                height={40}
                                alt="Logo filter"
                            />
                            <h3 className="d-flex align-items-center font-weight-bolder ml-3 mt-3">
                                Filter
                            </h3>
                        </div>
                        <div className="card-body">
                            <h5 style={{ marginLeft: '-10px' }}>Urutkan Berdasarkan</h5>
                            <div className="row justify-content-between">
                                <button type="button" className="btn btn-primary" style={{ width: '48%', border: '1px solid gray' }}>Terbaru</button>
                                <button type="button" className="btn text-muted" style={{ width: '48%', border: '1px solid gray' }}>Terlama</button>
                            </div>
                            <div className="row justify-content-between mt-3">
                                <button type="button" className="btn text-muted" style={{ width: '48%', border: '1px solid gray' }}>A - Z</button>
                                <button type="button" className="btn text-muted" style={{ width: '48%', border: '1px solid gray' }}>Z - A</button>
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary mb-5" style={{ width: '90%', margin: 'auto', borderRadius: '30px' }}>Tampilkan</button>
                    </div>

                    {/* Tag */}
                    <div className="row mt-5 d-flex flex-column mx-3">
                        <h3 className="font-weight-bolder">
                            Temukan Lebih Banyak Berita Yang Sesuai:
                        </h3>
                        <div className=" d-flex flex-wrap justify-content-around flex-row">
                            <div className="border px-2 py-1 rounded my-3 mr-3">
                                #SVGA
                            </div>
                            <div className="border px-2 py-1 rounded my-3 mr-3">
                                #PELATIHAN
                            </div>
                            <div className="border px-2 py-1 rounded my-3 mr-3">
                                #UIUXDESIGNER
                            </div>
                            <div className="border px-2 py-1 rounded my-3 mr-3">
                                #JAVA
                            </div>
                            <div className="border px-2 py-1 rounded my-3 mr-3">
                                #C++
                            </div>
                            <div className="border px-2 py-1 rounded my-3 mr-3">
                                #LINUX
                            </div>
                            <div className="border px-2 py-1 rounded my-3 mr-3">
                                #IOS
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                <div className="modal fade" id="videoPlayerModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content" style={{ width: '700px', height: '490px' }}>
                            <div className={styles['modal-body']}>
                                <div className={styles['playVideo']}>
                                    <button type="button" className="col-1 flaticon2-delete mb-2" data-dismiss="modal" aria-label="Close" style={{ border: 'none', background: 'none' }}></button>
                                    <ReactPlayer url={url_video} controls width="100%" height="100%" playing={video_playing} onPlay={handleIsPlayed} />
                                </div>
                                {/* </div> */}
                                <div className="ml-3" style={{ marginTop: '30px' }}>
                                    <h3 className="font-weight-bolder">
                                        {judul_video}
                                    </h3>
                                </div>
                                <div className="row align-items-center" style={{ marginLeft: '0' }}>
                                    <div className="col-3">
                                        <span className="text-muted" style={{ fontSize: '11px' }}>
                                            {
                                                tanggal_publish !== null ? `${tanggal_publish}  | 120 Ditonton`
                                                    : ""
                                            }
                                        </span>
                                    </div>
                                    <div className="col-6">
                                        <div className={styles['listTag']}>
                                            {
                                                (tag === null) ? null :
                                                    tag.map((el, i) => {
                                                        return (
                                                            <div style={{ background: "#fff", border: '1px solid #d7e1ea' }}
                                                                className="mr-2 px-3 py-1 rounded"
                                                                key={i}>
                                                                <div className="text-center" style={{ fontSize: '10px' }}>
                                                                    #{el.toUpperCase()}
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                            }
                                        </div>
                                    </div>
                                    <div className="col-3" style={{ textAlign: 'center' }}>
                                        <span className="p-2 label label-inline label-light-success font-weight-bold">
                                            {dataKategori}
                                        </span>
                                    </div>
                                </div>
                                <div className={`${styles.descriptionVideo} text-break m-4`}>
                                    <span>
                                        {isiVideo}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default VideoPage;