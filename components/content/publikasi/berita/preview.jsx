import React, { useState } from "react";
import { useSelector } from 'react-redux'
import Image from "next/image";

import PageWrapper from "../../../wrapper/page.wrapper";
import Backdrop from "../../../../public/assets/media/backdrop.svg"

const Preview = () => {
    const { berita } = useSelector(state => state.detailBerita)

    const [judul_berita, setJudulBerita] = useState(berita.judul_berita)
    const [jenis_kategori, setJenisKategori] = useState(berita.jenis_kategori)
    const [created_at, setCreatedAt] = useState(new Date (berita.created_at).toLocaleDateString("en-IN"))
    const [nama, setNamaKategori] = useState(berita.nama)  
    // const [gambar, setGambar] = useState(berita.gambar)
    const [gambar, setGambar] = useState("/assets/media/default.jpg") 
    const [isi_berita, setIsiBerita] = useState(berita.isi_berita)
    const [tags, setTags] = useState(berita.tag)

    return (
        <> 
            <div className="text-center mt-5">
                <h1 className="mt-5">
                    {judul_berita}
                </h1>
            </div>
            <Image
                src={Backdrop} 
                alt="backdrop"
                >
            </Image>
            <PageWrapper>
                <div className="col-lg-12 order-1 px-0 mt-5">
                    <div className="card card-custom card-stretch gutter-b">

                        <div className="card-body pt-0">

                                <div className="d-flex justify-content-center my-3">
                                    <Image 
                                        // src={gambar} 
                                        src={process.env.END_POINT_API_IMAGE_PUBLIKASI + "publikasi/images/" + gambar}
                                        alt="gambar-artikel"
                                        objectFit="cover"
                                        height= "50vh"
                                        width= "100vh"
                                        // layout="fill"
                                        // style={{height:"50vh", width: "100%"}} 
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
        </>
        
    )
}

export default Preview;