import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import IconFilter from "../../../components/assets/icon/Filter";
import Pagination from 'react-js-pagination';

import { useDispatch, useSelector } from 'react-redux';
import SubHeaderComponent from '../../components/template/Subheader.component';

const VideoPage = ({ token }) => {
    const dispatch = useDispatch()
    const router = useRouter()

    const { loading: allLoading, error, video } = useSelector(state => state.allVideo)
    const { kategori } = useSelector((state) => state.allKategori);

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
                    <div className="row">
                        <div className="row justify-content-center my-5">
                            {
                                // video.video || video.video.length === 0 ? null :
                                video.video.map((row, i) => {
                                    return (
                                        <div className="card mb-4 mx-3" key={i} style={{ width: '45%', flexWrap: 'wrap', border: 'none' }}>
                                            <Image
                                                alt={row.judul_video}
                                                unoptimized={process.env.ENVIRONMENT !== "PRODUCTION"}
                                                loader={process.env.END_POINT_API_IMAGE_PUBLIKASI + "publikasi/images/" + row.gambar}
                                                src={process.env.END_POINT_API_IMAGE_PUBLIKASI + 'publikasi/images/' + row.gambar}
                                                width={70}
                                                height={180}
                                                className="rounded"
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title">{row.judul_video}</h5>
                                                <div className="d-flex justify-content-between">
                                                    <span>Admin Pokja</span>
                                                    <span className="label label-inline label-light-primary font-weight-bold">{(row.kategori).toUpperCase()}</span>
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
                            video && video.perPage < video.total &&
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
                        <h3 className="d-flex align-items-center font-weight-bolder ml-5 mt-5">
                            <IconFilter className="mr-3 label label-inline font-weight-bold" style={{ borderRadius: '50%', height: '23px', backgroundColor: '#007cff' }} />
                            Filter
                        </h3>
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
                </div>

            </div>
        </>
    )
}

export default VideoPage;