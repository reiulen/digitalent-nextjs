import React, { useState } from "react";
import { useSelector } from 'react-redux'

import PageWrapper from "../../../wrapper/page.wrapper";

const Preview = () => {
    const { berita } = useSelector(state => state.detailBerita)

    const [judul_berita, setJudulBerita] = useState(berita.judul_berita)
    const [jenis_kategori, setJenisKategori] = useState(berita.jenis_kategori)
    const [created_at, setCreatedAt] = useState(new Date (berita.created_at).toLocaleDateString("en-IN"))
    const [nama, setNamaKategori] = useState(berita.nama)  
    const [gambar, setGambar] = useState(berita.gambar)
    const [isi_berita, setIsiBerita] = useState(berita.isi_berita)
    const [tags, setTags] = useState(berita.tag)

    return (
        <PageWrapper>
            <div className="col-lg-12 order-1 px-0 mt-5">
                <div className="card card-custom card-stretch gutter-b">

                    <div className="card-body pt-0">
                            <div className="text-center mt-5">
                                <h3>
                                    {judul_berita}
                                </h3>
                            </div>

                            <div className="d-flex justify-content-center my-3">
                                <img 
                                    src={gambar} 
                                    alt="gambar-berita"
                                    style={{height:"50vh", width:"100%"}} 
                                />
                            </div>

                            <div className="row">
                                <div style={{ background: "#F3F6F9"}} 
                                    className="mr-5 px-3 py-1 rounded">
                                    <i className="flaticon2-user"></i>
                                    <span className="ml-1">
                                        User
                                    </span>
                                </div>

                                <div style={{ background: "#F3F6F9"}} 
                                    className="mr-5 px-3 py-1 rounded">
                                    <i className="flaticon2-calendar-4"></i>
                                    <span className="ml-1">
                                        Publish: {created_at}  
                                    </span>
                                </div>

                                <div style={{ background: "#F3F6F9"}} 
                                    className="mr-5 px-3 py-1 rounded">
                                    <i className="flaticon2-setup"></i>
                                    <span className="ml-1">
                                        {jenis_kategori}: {nama}
                                    </span>
                                </div>
                            </div>

                            <div className="text-justify my-5">
                                {isi_berita}
                            </div>

                            <div className="row">
                                {
                                    tags.map ((el, i) => {
                                        return (
                                            <div style={{ background: "#E1F0FF"}}
                                                className="mr-5 px-3 py-1 rounded"
                                                key={i}>
                                                <div className="text-center">
                                                    {el}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                
                            </div>
                    </div>

                </div>
                
            </div>
        </PageWrapper>
    )
}

export default Preview;