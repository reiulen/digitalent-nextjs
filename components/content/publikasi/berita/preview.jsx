import React, { useState } from "react";
import { useSelector } from 'react-redux';
import Image from "next/image";
import moment from "moment";
import IconFilter from "../../../assets/icon/Filter";

// import PageWrapper from "../../../wrapper/page.wrapper";
import PreviewWrapper from "../../../wrapper/preview.wrapper";
import Backdrop from "../../../../public/assets/media/backdrop.svg";
import styles from '../../../../styles/preview.module.css';

const Preview = () => {
    const { berita } = useSelector(state => state.detailBerita)

    const [judul_berita, setJudulBerita] = useState(berita.judul_berita)
    const [jenis_kategori, setJenisKategori] = useState(berita.jenis_kategori)
    const [created_at, setCreatedAt] = useState(new Date(berita.created_at).toLocaleDateString("en-IN"))
    const [nama, setNamaKategori] = useState(berita.nama)
    const [gambar, setGambar] = useState(berita.gambar)
    // const [gambar, setGambar] = useState("/assets/media/default.jpg") 
    const [isi_berita, setIsiBerita] = useState(berita.isi_berita)
    const [tags, setTags] = useState(berita.tag)

    return (
        <>
            {/* <div className="" style={{ height: '150px' }}>
                <Image
                    // className={styles['title-Pratinjau']}
                    src={Backdrop}
                    alt="backdrop"
                    layout="responsive"
                    objectFit="fill"
                // objectPosition="center"
                >
                </Image>
            </div> */}
            <PreviewWrapper title="Pratinjau Berita - Publikasi">

                <div className="col-lg-12 order-1 px-0 position-relative">
                    <div className="" style={{ height: '100%' }}>

                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb bg-transparent my-5 ps-5" style={{ border: '1px solid gray', borderRadius: '20px' }}>
                                <li className="breadcrumb-item" style={{ color: 'blue' }}><a href="#">Beranda</a></li>
                                <li className="breadcrumb-item" style={{ color: 'blue' }}><a href="#">Berita</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Detail Berita</li>
                            </ol>
                        </nav>

                        <div className="ml-0">
                            <h1 className={`${styles.titlePratinjau} font-weight-bold my-5`}>
                                {judul_berita}
                            </h1>

                            <div className="row mb-4">
                                <div className="rounded mt-1" style={{ marginLeft: '25px' }}>
                                    <div className={styles['titleSubMenu-2']}>
                                        {/* <i className="ri-dashboard-line"></i> */}
                                        <span className="label label-inline label-light-success font-weight-bold">
                                            {(jenis_kategori).toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                <div className="rounded mt-1" style={{ marginLeft: '25px' }}>
                                    <div className={styles['titleSubMenu-2']}>
                                        <i className="flaticon-eye"></i>
                                        <span className="ml-2 mr-5 text-muted">
                                            Dibaca 120
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-8 col-md-10 col-11 mt-4 d-flex align-items-center">
                                    <div className={styles['titleSubMenu']}>
                                        <h5 className="font-weight-bold">Admin Pokja</h5>
                                        <span className="text-muted">{moment({ created_at }).format('LL')}</span>
                                    </div>
                                </div>

                                <div className="col-sm-4 col-md-2 col-1 d-flex align-items-center justify-content-end">
                                    <div className={styles['iconBorder']}>
                                        <i className="socicon-sharethis" style={{ color: '#000' }}></i>
                                    </div>
                                    <div className={styles['iconBorder']}>
                                        <i className="flaticon-black" style={{ color: '#000' }}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <div className="pt-0" style={{ height: '100%' }}>
                                    {/* <div className="text-center mt-5">
                                    <h3>
                                        {judul_artikel}
                                    </h3>
                                </div> */}

                                    <div className="d-flex justify-content-center my-3">
                                        <Image
                                            src={process.env.END_POINT_API_IMAGE_PUBLIKASI + "publikasi/images/" + gambar}
                                            alt="gambar-artikel"
                                            objectFit="fill"
                                            // width= "100%"
                                            // height= "100%"
                                            width="1200vh"
                                            height="500vh"
                                            className="mt-5 pt-5"
                                        />
                                    </div>

                                    {/* {
                                    console.log (artikel)
                                } */}

                                    <div className="text-justify my-5 p-3" style={{ border: '1px solid #d7e1ea', borderRadius: '10px' }}>
                                        {/* To render html Tag */}
                                        <div dangerouslySetInnerHTML={{ __html: isi_berita }} className={styles['isiBerita']}></div>
                                        <div className="row">
                                            <div className="col-sm-8 col-md-10 col-11">
                                                <div className="row my-3 ml-0">
                                                    <div className={styles['listTag']}>
                                                        {
                                                            tags.map((el, i) => {
                                                                return (
                                                                    <div style={{ background: "#fff", border: '1px solid #d7e1ea' }}
                                                                        className="mr-5 px-3 py-1 rounded"
                                                                        key={i}>
                                                                        <div className="text-center">
                                                                            #{(el).toUpperCase()}
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-4 col-md-2 col-1 d-flex align-items-center justify-content-end">
                                                <div className={styles['iconBorder']}>
                                                    <i className="socicon-sharethis" style={{ color: '#000' }}></i>
                                                </div>
                                                <div className={styles['iconBorder']}>
                                                    <i className="flaticon-black" style={{ color: '#000' }}></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-4" style={{ padding: '35px' }}>
                                <div className="p-5" style={{ border: '1px solid gray', borderRadius: '15px' }}>
                                    <div className="d-flex align-items-center font-weight-bolder">
                                        <IconFilter className="mr-3 label label-inline font-weight-bold" style={{ borderRadius: '50%', height: '22px', backgroundColor: '#007cff' }} />
                                        Pencarian
                                    </div>
                                    <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                        <div className="position-relative overflow-hidden mt-3" style={{ width: '260px', marginLeft: '-10px' }}>
                                            <i className="ri-search-line left-center-absolute ml-2"></i>
                                            <input
                                                type="text"
                                                className="form-control pl-10 rounded-pill"
                                                placeholder="Cari Artikel.."
                                            // onChange={e => setSearch(e.target.value)}
                                            />
                                            <button
                                                className="btn text-white right-center-absolute"
                                                style={{
                                                    borderTopRightRadius: '45%',
                                                    borderBottomRightRadius: '45%',
                                                    backgroundColor: '#007cff'
                                                }}
                                            // onClick={handleSearch}
                                            >
                                                Cari
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="my-5">
                                    <h4>TEMUKAN LEBIH BANYAK APA YANG PENTING BAGI ANDA</h4>
                                    <div className="col-sm-8 col-md-10 col-11 mt-5">
                                        <div className="row my-3">
                                            <div className={styles['listTag']}>
                                                {
                                                    tags.map((el, i) => {
                                                        return (
                                                            <div style={{ background: "#fff", border: '1px solid #d7e1ea' }}
                                                                className="mr-5 px-3 py-1 rounded"
                                                                key={i}>
                                                                <div className="text-center">
                                                                    #{(el).toUpperCase()}
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </PreviewWrapper>
        </>

    )
}

export default Preview;


            // <div className="text-center mt-5">
            //     <h1 className="mt-5 display-1">
            //         {judul_berita}
            //     </h1>
            // </div>
            // <Image
            //     src={Backdrop} 
            //     alt="backdrop"
            //     >
            // </Image>
            // <PreviewWrapper title= "Pratinjau Berita - Publikasi">
            //     <div className="col-lg-12 order-1 px-0 position-relative "  >
            //         <div className="card card-custom card-stretch gutter-b"style={{marginTop: "-20vh"}}>

            //             <div className="card-body pt-0">

            //                     <div className="d-flex justify-content-center my-3">
            //                         <Image 
            //                             // src={gambar} 
            //                             src={process.env.END_POINT_API_IMAGE_PUBLIKASI + "publikasi/images/" + gambar}
            //                             alt="gambar-artikel"
            //                             objectFit="cover"
            //                             height= "500vh"
            //                             width= "1000vh"
            //                             className="mt-5 pt-5"
            //                             // height= "100%"
            //                             // width= "100%"
            //                             // layout="fill"
            //                             // style={{height:"50vh", width: "100%", layout:"fill"}} 
            //                         />
            //                     </div>

            //                     <div className="row">
            //                         <div style={{ background: "#F3F6F9"}} 
            //                             className="mr-5 px-3 py-1 rounded mt-2">
            //                             <i className="flaticon2-user"></i>
            //                             <span className="ml-1">
            //                                 User
            //                             </span>
            //                         </div>

            //                         <div style={{ background: "#F3F6F9"}} 
            //                             className="mr-5 px-3 py-1 rounded mt-2">
            //                             <i className="flaticon2-calendar-4"></i>
            //                             <span className="ml-1">
            //                                 Publish: {created_at}  
            //                             </span>
            //                         </div>

            //                         <div style={{ background: "#F3F6F9"}} 
            //                             className="mr-5 px-3 py-1 rounded mt-2">
            //                             <i className="flaticon2-setup"></i>
            //                             <span className="ml-1">
            //                                 {jenis_kategori}: {nama}
            //                             </span>
            //                         </div>
            //                     </div>

            //                     <div className="text-justify my-5">
            //                         <div dangerouslySetInnerHTML={{__html: isi_berita}}></div> 
            //                     </div>

            //                     <div className="row">
            //                         {
            //                             tags.map ((el, i) => {
            //                                 return (
            //                                     <div style={{ background: "#E1F0FF"}}
            //                                         className="mr-5 px-3 py-1 rounded"
            //                                         key={i}>
            //                                         <div className="text-center">
            //                                             {el}
            //                                         </div>
            //                                     </div>
            //                                 )
            //                             })
            //                         }

            //                     </div>
            //             </div>

            //         </div>

            //     </div>
            // </PreviewWrapper>