import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import { BarChart, Bar, PieChart, Pie, Cell, Tooltip, Legend, XAxis } from 'recharts';
import { useDispatch, useSelector } from "react-redux";

import CardDashboard from '../../../CardDashboard'
import PageWrapper from '../../../wrapper/page.wrapper'
import LoadingTable from "../../../LoadingTable"

import { clearErrors } from "../../../../redux/actions/publikasi/dashboard-publikasi.actions";

const DashbardPublikasi = ({token}) => {

    const {
        loading,
        error,
        dashboard_publikasi,
      } = useSelector((state) => state.allDashboardPublikasi);

    const [ totalPublishContent, setTotalPublishContent ] = useState (null)
    const [ totalUnpublishContent, setTotalUnpublishContent ] = useState (null)

    useEffect(() => {
        let sum_publish = 0
        let sum_unpublish = 0

        if (dashboard_publikasi){
            for ( const prop in dashboard_publikasi){
                sum_publish += dashboard_publikasi[prop].total_publish
                sum_unpublish += dashboard_publikasi[prop].total_unpublish
            }

            setTotalPublishContent (sum_publish) 
            setTotalUnpublishContent (sum_unpublish)
        }

    }, [dashboard_publikasi])

    const colors = [ "#4299E1", "#215480"]
    const [ dataBarChart, setDataBarChart ] = useState ([
        {
            "name": "Artikel",
            "publish": dashboard_publikasi.artikel.total_publish,
            "unpublish": dashboard_publikasi.artikel.total_unpublish
        },

        {
            "name": "Berita",
            "publish": dashboard_publikasi.berita.total_publish,
            "unpublish": dashboard_publikasi.berita.total_unpublish
        },

        {
            "name": "Video",
            "publish": dashboard_publikasi.video.total_publish,
            "unpublish": dashboard_publikasi.video.total_unpublish
        },

        {
            "name": "Galeri",
            "publish": dashboard_publikasi.gallery.total_publish,
            "unpublish": dashboard_publikasi.gallery.total_unpublish
        },

        {
            "name": "Imagetron",
            "publish": dashboard_publikasi.imagetron.total_publish,
            "unpublish": dashboard_publikasi.imagetron.total_unpublish
        },

        {
            "name": "FAQ",
            "publish": dashboard_publikasi.faq.total_publish,
            "unpublish": dashboard_publikasi.faq.total_unpublish
        },
    ])

    const [ dataPieChart, setDataPieChart ] = useState ([
        {
            "name": "Peserta",
            "value": 100
        },

        {
            "name": "Author",
            "value": 400
        },
    ])

    // const [ colors, setColors ] = useState (["#215480", "#4299E1"])
    // const [ totalPublish, setTotalPublish ] = useState ()

    const [ dataDashboardBerita, setDataDashboardBerita ] = useState (dashboard_publikasi.berita ? dashboard_publikasi.berita : null)
    const [ dataDashboardArtikel, setDataDashboardArtikel ] = useState (dashboard_publikasi.artikel ? dashboard_publikasi.artikel : null)
    const [ dataDashboardGallery, setDataDashboardGallery ] = useState (dashboard_publikasi.gallery ? dashboard_publikasi.gallery: null)
    const [ dataDashboardVideo, setDataDashboardVideo ] = useState (dashboard_publikasi.video ? dashboard_publikasi.video : null)

    

    return (
        <>
            <PageWrapper>
                {console.log (dashboard_publikasi)}
                {/* {console.log (dataDashboardGallery)} */}
                <div className="row">
                    <div className="col-lg-12 col-xxl-12 mt-4">
                        <div className="card card-custom bg-white">
                            <div className="card-body pt-2" style={{ backgroundPosition: 'left bottom', backgroundImage: "url('/assets/media/Frame-White.svg')", backgroundRepeat: 'no-repeat' }}>
                                <div className="d-flex align-items-center mb-10" >
                                    <div className="d-flex flex-column flex-grow-1 font-weight-bold"  >
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="col-md-12 mt-5">
                                                    <h4 className="font-weight-bolder text-primary">Halo Admin A</h4>
                                                </div>
                                                <div className="col-md-12">
                                                    <p className='font-weight-bold text-muted'>Sudah Makan Hari ini? <br /> Kalau sudah yuk dicheck verifikasi Test untuk hari ini :)</p>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="ml-auto float-right ilustrator-dashboard"
                                                    style={{
                                                        position: 'absolute', right: '10px',
                                                        top: '-50px'
                                                    }}>
                                                    <Image src='/assets/media/ilustrator-1.svg' width={300} height={200} alt="dashboard-pict"/>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xxl-6 my-5">
                        <div className="card card-custom card-stretch gutter-b">
                            <div className="card-body pt-2" style={{backgroundColor: "#215480", borderRadius:"6px"}}>
                                <h3 className="card-title font-weight-bolder text-light mt-5">Total Publish dan Belum Dipublish</h3>
                                <div className="d-flex align-items-center justify-content-center">
                                    <BarChart width={450} height={350} data={dataBarChart}>
                                        <XAxis dataKey="name" hide={true}/>
                                        <Bar 
                                            dataKey="publish" 
                                            fill="#4299E1" 
                                            barSize={10} 
                                            radius={[10, 10, 0, 0]} 
                                        />
                                        <Bar 
                                            dataKey="unpublish" 
                                            fill="#4CBDE2" 
                                            barSize={10} 
                                            radius={[10, 10, 0, 0]}
                                        />
                                        <Tooltip 
                                            cursor={{fill:"transparent"}}
                                        />
                                        
                                    </BarChart>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="mb-10 flex-column">
                                    <h3 className="card-title font-weight-bolder text-muted">Total Konten</h3>
                                    <div className="row">
                                        <div className="col-6 d-flex flex-row">
                                            <div style={{backgroundColor:"#4299E1", width: "50px", height:"50px", borderRadius:"6px"}}>

                                            </div>
                                            {/* <Image src="/assets/icon/new/mail-purple.svg" width={50} height={50} alt="publish-pict" /> */}
                                            <div className=" ml-3 my-2">
                                                <h3 className="font-weight-bold">
                                                    {totalPublishContent}
                                                </h3>
                                                
                                                <div className="text-muted">
                                                    Publish
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6 d-flex flex-row">
                                            <div style={{backgroundColor:"#4CBDE2", width: "50px", height:"50px", borderRadius:"6px"}}>

                                            </div>
                                            {/* <Image src="/assets/icon/new/blue-bars.svg" width={50} height={50} alt="publish-pict" /> */}
                                            <div className=" ml-3 my-2">
                                                <h3 className="font-weight-bold">
                                                    {totalUnpublishContent}
                                                </h3>
                                                
                                                <div className="text-muted">
                                                    Belum dipublish
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-xxl-6 my-5">
                        <div className="card card-custom card-stretch gutter-b">
                            <div className="card-body pt-2">
                                <h3 className="card-title font-weight-bolder text-dark mt-5">Total Author, Peserta DTS dan Admin Publikasi </h3>
                                <div className="text-muted" style={{marginTop: "-20px"}}>
                                    Total User
                                </div>
                                
                                <div className="d-flex align-items-center justify-content-center">
                                    <PieChart width={450} height={350}>
                                        <Pie 
                                            data={dataPieChart}
                                            // dataKey="value"
                                            // nameKey="name"
                                            cx="50%" 
                                            cy="50%" 
                                            innerRadius={115} 
                                            outerRadius={140} 
                                            paddingAngle={-10}
                                            cornerRadius={30}
                                            // fill="#215480"
                                        >
                                            {
                                                dataPieChart.map ((el, i) => {
                                                    return(
                                                        <Cell key={i} fill={colors[i]}/>
                                                    )
                                                })
                                            } 
                                        </Pie>
                                        <Tooltip 
                                            cursor={{fill:"transparent"}}
                                        />
                                        
                                    </PieChart>
                                    
                                </div>

                                <div className="d-flex align-items-center justify-content-center" style={{marginTop:"-28vh"}}>
                                    <h1 className="font-weight-bolder display-2">
                                        133
                                    </h1>
                                </div> 
                                
                            </div>
                            <div className="card-body" style={{marginTop:"20vh"}}>
                                <div className="mb-10 flex-column ">
                                    {/* <h3 className="card-title font-weight-bolder text-muted">Total Konten</h3> */}
                                    <div className="row">
                                        <div className="col-6 d-flex flex-row d-flex justify-content-center">
                                            <Image src="/assets/icon/new/mail-purple.svg" width={50} height={50} alt="publish-pict" />
                                            <div className=" ml-3 my-2">
                                                <h3 className="font-weight-bold">
                                                    200
                                                </h3>
                                                
                                                <div className="text-muted">
                                                    Author
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6 d-flex flex-row d-flex justify-content-center">
                                            <Image src="/assets/icon/new/blue-bars.svg" width={50} height={50} alt="publish-pict" />
                                            <div className=" ml-3 my-2">
                                                <h3 className="font-weight-bold">
                                                    200
                                                </h3>
                                                
                                                <div className="text-muted">
                                                    Admin Publikasi
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-12 col-xxl-12">
                        {/* <!--begin::Row--> */}
                        {/* <div className="row m-0">
                            <CardDashboard background='bg-white' color='text-dark' icon='mail.svg' title='Total Berita yang dibaca' muted='Dibaca' mutedValue='200k' />
                            <CardDashboard background='bg-primary' color='text-white' icon='list-white.svg' title='Total Artikel yang dibaca' muted='Dibaca' mutedValue='200k' />
                            <CardDashboard background='bg-warning' color='text-white' icon='blok4-white.svg' title='Jumlah Semua Konten' muted='Publish' mutedValue='200k' />
                        </div> */}
                        {/* <!--end::Row--> */}
                    </div>
                    {/* <!--end::Stats--> */}

                    <div className="col-lg-6 col-xxl-6">
                        {/* <!--begin::List Widget 3--> */}

                        {
                            dataDashboardBerita.top_berita ?
                                <div className="card card-custom card-stretch gutter-b">
                                    {/* <!--begin::Header--> */}
                                    <div className="card-header border-0">
                                        <h3 className="card-title font-weight-bolder text-dark">3 Top Berita</h3>
                                    </div>
                                    {/* <!--end::Header--> */}
                                    {/* <!--begin::Body--> */}
                                    <div className="card-body pt-2">
                                        {/* <!--begin::Item--> */}
                                        {
                                            dataDashboardBerita.top_berita.map ((el, i) => {
                                                return (
                                                    <div className="d-flex align-items-center mb-10" key={i}>
                                                        {/* <!--begin::Symbol--> */}
                                                        <div className="symbol symbol-40 symbol-light-success mr-5">
                                                            <Image width={94} height={63} src="/assets/media/dummy-banner.png" className="align-self-end rounded" alt="" />
                                                        </div>
                                                        {/* <!--end::Symbol--> */}
                                                        {/* <!--begin::Text--> */}
                                                        <div className="d-flex flex-column flex-grow-1 font-weight-bold">
                                                            <p className="text-dark text-hover-primary mb-1 font-size-lg">{el.judul_berita}</p>
                                                            <span className="text-muted">Kategori : <span className='text-primary'>{el.kategori}</span></span>
                                                            <span className="text-muted">Created By : <span className='text-primary'>{el.dibuat}</span></span>
                                                        </div>
                                                        {/* <!--end::Text--> */}

                                                        {/* <!--begin::Text--> */}
                                                        <div className="d-flex flex-column flex-grow-1 font-weight-bold text-right">
                                                            <p className="text-dark text-hover-primary mb-1 font-size-lg font-weight-bold display-4">{el.total_views}</p>
                                                            <span className="text-muted">Dibaca</span>
                                                        </div>
                                                        {/* <!--end::Text--> */}
                                                    </div>
                                                )
                                            })
                                        }
                                        {/* <!--end::Item--> */}

                                    </div>
                                    {/* <!--end::Body--> */}
                                </div>
                            :
                                <LoadingTable />
                        }
                        
                        {/* <!--end::List Widget 3--> */}
                    </div>

                    <div className="col-lg-6 col-xxl-6 order-1 order-xxl-2">
                        {/* <!--begin::List Widget 3--> */}
                        {
                            dataDashboardArtikel.top_artikel ?
                                <div className="card card-custom card-stretch gutter-b">
                                    {/* <!--begin::Header--> */}
                                    <div className="card-header border-0">
                                        <h3 className="card-title font-weight-bolder text-dark">3 Top Artikel</h3>
                                    </div>
                                    {/* <!--end::Header--> */}
                                    {/* <!--begin::Body--> */}
                                    <div className="card-body pt-2">
                                        {/* <!--begin::Item--> */}
                                        {
                                            dataDashboardArtikel.top_artikel.map ((el, i) => {
                                                return (
                                                    <div className="d-flex align-items-center mb-10" key={i}>
                                                        {/* <!--begin::Symbol--> */}
                                                        <div className="symbol symbol-40 symbol-light-success mr-5">
                                                            <Image width={94} height={63} src="/assets/media/dummy-banner.png" className="align-self-end rounded" alt="" />
                                                        </div>
                                                        {/* <!--end::Symbol--> */}
                                                        {/* <!--begin::Text--> */}
                                                        <div className="d-flex flex-column flex-grow-1 font-weight-bold">
                                                            <p className="text-dark text-hover-primary mb-1 font-size-lg">{el.judul_berita}</p>
                                                            <span className="text-muted">Kategori : <span className='text-primary'>{el.kategori}</span></span>
                                                            <span className="text-muted">Created By : <span className='text-primary'>{el.dibuat}</span></span>
                                                        </div>
                                                        {/* <!--end::Text--> */}

                                                        {/* <!--begin::Text--> */}
                                                        <div className="d-flex flex-column flex-grow-1 font-weight-bold text-right">
                                                            <p className="text-dark text-hover-primary mb-1 font-size-lg font-weight-bold display-4">{el.total_views}</p>
                                                            <span className="text-muted">Dibaca</span>
                                                        </div>
                                                        {/* <!--end::Text--> */}
                                                    </div>
                                                )
                                            })
                                        }
                                        {/* <!--end::Item--> */}

                                    </div>
                                    {/* <!--end::Body--> */}
                                </div>
                            :
                                <LoadingTable />
                        }
                        {/* <!--end::List Widget 3--> */}
                    </div>

                    <div className="col-lg-6 col-xxl-6 order-1 order-xxl-2">
                        {/* <!--begin::List Widget 3--> */}
                        {
                            dataDashboardGallery.top_gallery ?
                                <div className="card card-custom card-stretch gutter-b">
                                    {/* <!--begin::Header--> */}
                                    <div className="card-header border-0">
                                        <h3 className="card-title font-weight-bolder text-dark">3 Top Galeri</h3>
                                    </div>
                                    {/* <!--end::Header--> */}
                                    {/* <!--begin::Body--> */}
                                    <div className="card-body pt-2">
                                        {/* <!--begin::Item--> */}
                                        {
                                            dataDashboardGallery.top_gallery.map ((el, i) => {
                                                return (
                                                    <div className="d-flex align-items-center mb-10" key={i}>
                                                        {/* <!--begin::Symbol--> */}
                                                        <div className="symbol symbol-40 symbol-light-success mr-5" key={i}>
                                                            <Image width={94} height={63} src="/assets/media/dummy-banner.png" className="align-self-end rounded" alt="" />
                                                        </div>
                                                        {/* <!--end::Symbol--> */}
                                                        {/* <!--begin::Text--> */}
                                                        <div className="d-flex flex-column flex-grow-1 font-weight-bold">
                                                            <p className="text-dark text-hover-primary mb-1 font-size-lg">{el.judul}</p>
                                                            <span className="text-muted">Kategori : <span className='text-primary'>{el.nama_kategori}</span></span>
                                                            <span className="text-muted">Created By : <span className='text-primary'>{el.dibuat}</span></span>
                                                        </div>
                                                        {/* <!--end::Text--> */}

                                                        {/* <!--begin::Text--> */}
                                                        <div className="d-flex flex-column flex-grow-1 font-weight-bold text-right">
                                                            <p className="text-dark text-hover-primary mb-1 font-size-lg font-weight-bold display-4">{el.total_views}</p>
                                                            <span className="text-muted">Dibaca</span>
                                                        </div>
                                                        {/* <!--end::Text--> */}
                                                    </div>
                                                )
                                            })
                                        }
                                        {/* <!--end::Item--> */}

                                    </div>
                                    {/* <!--end::Body--> */}
                                </div>
                            :
                                <LoadingTable />
                        }
                        {/* <!--end::List Widget 3--> */}
                    </div>
                    <div className="col-lg-6 col-xxl-6 order-1 order-xxl-2">
                        {/* <!--begin::List Widget 3--> */}
                        {
                            dataDashboardVideo.top_video?
                                <div className="card card-custom card-stretch gutter-b">
                                    {/* <!--begin::Header--> */}
                                    <div className="card-header border-0">
                                        <h3 className="card-title font-weight-bolder text-dark">3 Top Video</h3>
                                    </div>
                                    {/* <!--end::Header--> */}
                                    {/* <!--begin::Body--> */}
                                    <div className="card-body pt-2">
                                        {/* <!--begin::Item--> */}
                                        {
                                            dataDashboardVideo.top_video.map ((el, i) => {
                                                return (
                                                    <div className="d-flex align-items-center mb-10" key={i}>
                                                        {/* <!--begin::Symbol--> */}
                                                        <div className="symbol symbol-40 symbol-light-success mr-5">
                                                            <Image width={94} height={63} src="/assets/media/dummy-banner.png" className="align-self-end rounded" alt="" />
                                                        </div>
                                                        {/* <!--end::Symbol--> */}
                                                        {/* <!--begin::Text--> */}
                                                        <div className="d-flex flex-column flex-grow-1 font-weight-bold">
                                                            <p className="text-dark text-hover-primary mb-1 font-size-lg">{el.judul_berita}</p>
                                                            <span className="text-muted">Kategori : <span className='text-primary'>{el.kategori}</span></span>
                                                            <span className="text-muted">Created By : <span className='text-primary'>{el.dibuat}</span></span>
                                                        </div>
                                                        {/* <!--end::Text--> */}

                                                        {/* <!--begin::Text--> */}
                                                        <div className="d-flex flex-column flex-grow-1 font-weight-bold text-right">
                                                            <p className="text-dark text-hover-primary mb-1 font-size-lg font-weight-bold display-4">{el.total_views}</p>
                                                            <span className="text-muted">Dibaca</span>
                                                        </div>
                                                        {/* <!--end::Text--> */}
                                                    </div>
                                                )
                                            })
                                        }
                                        {/* <!--end::Item--> */}

                                    </div>
                                    {/* <!--end::Body--> */}
                                </div>
                            :
                                <LoadingTable />
                        }
                        {/* <!--end::List Widget 3--> */}
                    </div>
                </div>
            </PageWrapper>

        </>
    )
}


export default DashbardPublikasi