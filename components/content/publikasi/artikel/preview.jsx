import React, { useState, useRef, useEffect } from "react";
import {useDispatch, useSelector } from 'react-redux'
import Image from "next/image";

import PageWrapper from "../../../wrapper/page.wrapper";
import Backdrop from "../../../../public/assets/media/backdrop.svg"

const Preview = () => {
    // const editorRef = useRef();
    // const dispatch = useDispatch();

    // const { CKEditor, ClassicEditor, Base64UploadAdapter } =
    // editorRef.current || {};

    useEffect(() => {
        // editorRef.current = {
        //     CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
        //     ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
        //     // Base64UploadAdapter: require('@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter')
        //   };

        // dispatch (decodeHTML(artikel.isi_artikel))

    },[])

    const { artikel } = useSelector(state => state.detailArtikel)

    const [judul_artikel, setJudulArtikel] = useState(artikel.judul_artikel)
    const [jenis_kategori, setJenisKategori] = useState(artikel.jenis_kategori)
    const [created_at, setCreatedAt] = useState(new Date (artikel.created_at).toLocaleDateString("en-IN"))
    const [nama, setNamaKategori] = useState(artikel.nama)  
    // const [gambar, setGambar] = useState(artikel.gambar)
    const [gambar, setGambar] = useState('/assets/media/default.jpg')
    const [user, setUser] = useState(artikel.dibuat)
    // const [isi_artikel, setIsiArtikel] = useState( () => decodeHTML(artikel.isi_artikel))
    const [isi_artikel, setIsiArtikel] = useState(artikel.isi_artikel)
    const [tags, setTags] = useState(artikel.tag)

    // const decodeHTML = (str) => {
    //     if(str && typeof str === 'string') {
    //         // strip script/html tags
    //         str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
    //         str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
    //         element.innerHTML = str;
    //         str = element.textContent;
    //         element.textContent = '';
    //       }
      
    //       return str;
    // }

    return (
        <>  
            <div className="text-center mt-5">
                <h1 className="mt-5">
                    {judul_artikel}
                </h1>
            </div>
            <Image
                src={Backdrop} 
                alt="backdrop"
            >
            </Image>
            <PageWrapper>
                
                <div className="col-lg-12 order-1 px-0 position-relative " style={{marginTop: "-20vh"}}>
                    <div className="card card-custom card-stretch gutter-b">

                        <div className="card-body pt-0">
                                {/* <div className="text-center mt-5">
                                    <h3>
                                        {judul_artikel}
                                    </h3>
                                </div> */}

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

                                {/* {
                                    console.log (artikel)
                                } */}

                                <div className="row">
                                    <div style={{ background: "#F3F6F9"}} 
                                        className="mr-5 px-3 py-1 rounded">
                                        <i className="flaticon2-user"></i>
                                        <span className="ml-1">
                                            User {user}
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
                                    {/* To render html Tag */}
                                    <div dangerouslySetInnerHTML={{__html: isi_artikel}}></div> 
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