import React, { useState } from "react";
import { useSelector } from 'react-redux'
import Image from "next/image";

// import PageWrapper from "../../../wrapper/page.wrapper";
import PreviewWrapper from "../../../wrapper/preview.wrapper";
import Backdrop from "../../../../public/assets/media/backdrop.svg"

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
            <div className="" style={{ height: '150px' }}>
                <Image
                    // className={styles['title-Pratinjau']}
                    src={Backdrop}
                    alt="backdrop"
                    layout="responsive"
                    objectFit="fill"
                // objectPosition="center"
                >
                </Image>
            </div>
            <PreviewWrapper title="Pratinjau Berita - Publikasi">

                <div className="col-lg-12 order-1 px-0 position-relative">
                    <div className="" style={{ height: '100%' }}>

                        <div className="row ml-0">
                            {/* <div style={{ background: "#F3F6F9" }}
                                className="mr-5 px-3 py-1 rounded mt-2">
                                <i className="flaticon2-user"></i>
                                <span className="ml-1">
                                    User {user}
                                </span>
                            </div> */}

                            {/* <div style={{ background: "#F3F6F9" }}
                                className="mr-5 px-3 py-1 rounded mt-2">
                                <i className="flaticon2-calendar-4"></i>
                                <span className="ml-1">
                                    Publish: {created_at}
                                </span>
                            </div> */}

                            {/* <div style={{ background: "#F3F6F9" }}
                                className="mr-5 px-3 py-1 rounded mt-2">
                                <i className="flaticon2-setup"></i>
                                <span className="ml-1">
                                    {jenis_kategori}: {nama}
                                </span>
                            </div> */}
                            <h1 className="" style={{ fontSize: '50px', fontWeight: '600', marginTop: '-100px', width: '99%' }}>
                                {judul_berita}
                            </h1>

                            <div className="col-11 mt-4 d-flex align-items-center">
                                <div>
                                    <h6>Admin Pokja</h6>
                                    <span className="text-muted">Oct 12 | 120 dibaca</span>
                                    {/* <span className="text-muted">{moment({created_at}).format("MMM Do")} | 120 dibaca</span> */}
                                </div>

                                <div className="rounded mt-1 d-flex align-items-center" style={{ marginLeft:'25px' }}>
                                    <i className="ri-dashboard-line"></i>
                                    <span className="ml-1 mr-5 text-muted">
                                        Kategori : {jenis_kategori}
                                    </span>
                                </div>
                            </div>

                            <div className="col-1 d-flex align-items-center">
                                <div className="mr-2" style={{ backgroundColor: '#215480', borderRadius: '50%', width: '35px', height: '35px', textAlign: 'center', lineHeight: '39px' }}>
                                    <i className="socicon-sharethis" style={{ color: '#fff' }}></i>
                                </div>
                                <div className="" style={{ backgroundColor: '#215480', borderRadius: '50%', width: '35px', height: '35px', textAlign: 'center', lineHeight: '39px' }}>
                                    <i className="flaticon-black" style={{ color: '#fff' }}></i>
                                </div>
                            </div>
                        </div>

                        <div className="pt-0">
                            {/* <div className="text-center mt-5">
                                    <h3>
                                        {judul_artikel}
                                    </h3>
                                </div> */}

                            <div className="d-flex justify-content-center my-3" >
                                <Image
                                    // src={gambar} 
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

                            <div className="text-justify my-5" style={{ height: '400px' }}>
                                {/* To render html Tag */}
                                <div dangerouslySetInnerHTML={{ __html: isi_berita }} style={{ overflowWrap: 'break-word' }}></div>
                                <div className="row">
                                    <div className="col-11">
                                        <div className="row my-3 ml-0">
                                            {
                                                tags.map((el, i) => {
                                                    return (
                                                        <div style={{ background: "#E1F0FF" }}
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

                                    <div className="col-1 d-flex align-items-center">
                                        <div className="mr-2" style={{ backgroundColor: '#215480', borderRadius: '50%', width: '35px', height: '35px', textAlign: 'center', lineHeight: '39px' }}>
                                            <i className="socicon-sharethis" style={{ color: '#fff' }}></i>
                                        </div>
                                        <div className="" style={{ backgroundColor: '#215480', borderRadius: '50%', width: '35px', height: '35px', textAlign: 'center', lineHeight: '39px' }}>
                                            <i className="flaticon-black" style={{ color: '#fff' }}></i>
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