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
    const [isi_berita, setIsiBerita] = useState(berita.isi_berita)
    const [tags, setTags] = useState(berita.tag)

    return (
        <>
            <PreviewWrapper title="Pratinjau Berita - Publikasi">
                <div className="col-lg-12 order-1 px-0 position-relative">
                    <div className="" style={{ height: '100%' }}>
                        <div className="container">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb bg-transparent my-5 ps-5" style={{ border: '1px solid gray', borderRadius: '20px' }}>
                                    <li className="breadcrumb-item" style={{ color: 'blue' }}>Beranda</li>
                                    <li className="breadcrumb-item" style={{ color: 'blue' }}>Berita</li>
                                    <li className="breadcrumb-item" aria-current="page">Detail Berita</li>
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
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="pt-0" style={{ height: '100%' }}>

                                    <div className="d-flex justify-content-center my-3">
                                        <Image
                                            src={process.env.END_POINT_API_IMAGE_PUBLIKASI + "publikasi/images/" + gambar}
                                            alt="gambar-artikel"
                                            objectFit="fill"
                                            width="1200vh"
                                            height="500vh"
                                            className="mt-5 pt-5"
                                        />
                                    </div>

                                    <div className="text-justify my-5 p-3" style={{ border: '1px solid #d7e1ea', borderRadius: '10px' }}>
                                        {/* To render html Tag */}
                                        <div dangerouslySetInnerHTML={{ __html: isi_berita }} style={{ overflowWrap: 'break-word' }}></div>
                                        <div className="row">
                                            <div className="col-sm-8 col-md-10 col-11">
                                                <div className="row my-3 ml-0">
                                                    <div className={styles['listTag']}>
                                                        {
                                                            (tags === null) ? null :
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
                    </div>

                </div>
            </PreviewWrapper>
        </>

    )
}

export default Preview;