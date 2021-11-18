import React, { useEffect, useState } from "react"
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
// import Highlighter from "react-highlight-words";
import { useRouter } from "next/router";
import {
    Container,
    Modal
  } from "react-bootstrap";
import SubHeaderComponent from "../../../components/global/Breadcrumb.component";

const DetailBerita = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { detail, loading: loadingDetail } = useSelector((state) => state.detailBerandaBerita)
    const { tags } = useSelector((state) => state.allTagBerandaBerita)

    const [ keyword, setKeyword ] = useState (null)
    const [ searchWords, setSearchWords ] = useState (null)
    const [ resultText, setResultText ] = useState(null)

    const getWindowDimensions = () => {
        // if (typeof window === 'undefined') {
        //     global.window = {}
        // }

        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height,
        };
    };

    const [windowDimensions, setWindowDimensions] = useState(
        // getWindowDimensions()
        {}
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        setWindowDimensions(getWindowDimensions());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    },[detail])

    useEffect(()=> {

    },[windowDimensions])

    const handleFilterTag = (str) => {
        router.push (`/berita?tag=${str}`)
    }

    const handleHighlightWords = (e, text) => {
        e.preventDefault();

        let result = ""
        let splitWords = keyword.split (" ")
        let splitText = text.split(" ")
        // let splitWords = keyword
        // setSearchWords(splitWords)

        for (let i = 0; i < splitWords.length; i++){
            for (let j = 0; j < splitText.length; j++){
                if (splitWords[i].toLowerCase() === splitText[j].toLowerCase()){
                    result += `<mark>`+splitText[j]+`</mark>`+" "

                } else {
                    result += `<span>`+splitText[j]+`</span>`+" "
                }
            }
        }

        setResultText(result)
    }
    
    return (
        <Container fluid className="px-md-30 px-10 py-10 bg-white">
            {/* BreadCrumb */}
            <SubHeaderComponent 
                data={[{ link: "/berita", name: "Berita" }, { link: router.asPath, name: "Detail Berita" }]}
            />

            {/* Header */}
            {
                detail ?
                    <div className="row my-5 d-flex flex-column ml-1">
                        <div>
                            <div className="badge badge-light mr-2">
                                <div className="text-primary">
                                
                                    {detail.nama_kategori}
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-5">
                            <h1 className="font-weight-bolder">
                                {/* Insert Title Here */}
                                {detail.judul}
                            </h1>
                        </div>

                        <div className="mt-5 d-flex flex-row align-items-center">
                            <span className="font-weight-bolder">
                                {/* Insert Akademi Here */}
                                {detail.kategori_akademi}
                            </span>
                            <span className="mr-1 ml-3">
                                <i className="ri-eye-line"></i> 
                            </span>
                            <span className="text-muted">
                                {/* Insert Views Here */}
                                Dibaca {detail.dibaca}
                            </span>
                        </div>

                        <div className="mt-5 d-flex flex-row align-items-center justify-content-between col-11 col-md-12">
                            <div className="row">
                                <div className="">
                                    {/* Insert Logo Image Here */}
                                    <Image
                                        src={
                                            process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                            "publikasi/images/" + detail.foto
                                        }
                                        width={40}
                                        height={40}
                                        alt="Logo Image"
                                        className="border rounded-circle"
                                    />
                                </div>
                                <div className="d-flex flex-column ml-3">
                                    <div className="font-weight-bolder mb-2">
                                        {/* Insert Admin Here */}
                                        {detail.dibuat}
                                    </div>
                                    <div className="text-muted">
                                        {moment(detail.tanggal_publish).format("DD MMMM YYYY")}
                                    </div>
                                </div>
                            </div>

                            <div className="row ml-1">
                                <div className="mr-3">
                                    <button className="btn btn-sm btn-outline-light rounded-circle">
                                        <i className="ri-share-line px-0 py-1"></i>
                                    </button>
                                </div>
                                
                                {/* <div className="mr-3">
                                    <button className="btn btn-sm btn-outline-light rounded-circle">
                                        <i className="ri-heart-line px-0 py-1"></i>
                                    </button>
                                </div> */}
                                
                            </div>
                        </div>
                    </div>
                :
                    null
            }
            {/* End of Header */}

            {/* Content */}
            {
                detail ?
                    <div className="row mt-10">

                        {/* Left Side */}
                        <div className="col-12 col-md-8 pr-20">
                            {/* Image */}
                            <Image
                                // src="/assets/media/default-detail-image.png"
                                src={
                                    process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                    "publikasi/images/" + detail.gambar
                                }
                                width="1500vw"
                                height="1000vh" 
                                // layout="fill"
                                objectFit="cover"
                                alt="Detail Image"
                                className="rounded-lg"
                            />

                            {/* Berita */}
                            <div className="border rounded-lg mb-5 mt-15">
                                <div className="row my-5 mx-5 text-justify" style={{overflowX:"hidden"}}>
                                    {
                                        resultText ?
                                            <div dangerouslySetInnerHTML={{__html: resultText}}></div>
                                        :
                                            <div dangerouslySetInnerHTML={{__html: detail.isi_berita}}/>
                                    }
                                </div>

                                <div className="row m-3 d-flex justify-content-between pb-5">
                                    <div className="row d-flex justify-content-between ml-1">
                                        {
                                            detail && detail.tag && detail.tag.length !== 0 ?
                                                detail.tag.map ((el, i) => {
                                                    return (
                                                        <div className="mr-3 border p-3 rounded mb-3" key={i} style={{height:"38px"}}>
                                                            #{el.toString().toUpperCase()}
                                                        </div>
                                                    )
                                                })
                                            :
                                                null
                                        }
                                    </div>

                                    <div className="row ml-1">
                                        <div className="mr-3">
                                            <button className="btn btn-sm btn-outline-light rounded-circle">
                                                <i className="ri-share-line px-0 py-1"></i>
                                            </button>
                                        </div>
                                        
                                        {/* <div className="mr-3">
                                            <button className="btn btn-sm btn-outline-light rounded-circle">
                                                <i className="ri-heart-line px-0 py-1"></i>
                                            </button>
                                        </div> */}
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End of Left Side */}

                        {/* Right Side */}
                        {
                            windowDimensions && windowDimensions.width && windowDimensions.width > 770 ?
                                <div className="col-12 col-md-4">

                                    {/* Search */}
                                    <div className="border rounded-lg">
                                        <div className="row mt-10 mb-5"> 
                                            <div className="col-2 my-auto ml-5">
                                                <Image 
                                                    src={`/assets/media/logo-filter.svg`}
                                                    width={40}
                                                    height={40}
                                                    alt="Logo filter"
                                                />
                                            </div>
                                            <div className="col-9 my-auto">
                                                <h3 className=" font-weight-bolder">
                                                    Pencarian
                                                </h3>
                                            </div>
                                        </div>

                                        <form className="mb-10 mx-5">
                                            <div className="input-group">
                                                {/* <i className="ri-search-line position-absolute my-5 ml-3" style={{zIndex:"10"}} ></i> */}

                                                <div className="input-group-prepend">
                                                    <div 
                                                        className="input-group-text bg-light border-right-0 pr-1"
                                                        style={{borderTopLeftRadius:"150px", borderBottomLeftRadius:"150px"}}
                                                    >
                                                        <i className="ri-search-line"></i>
                                                    </div>
                                                </div>

                                                <input 
                                                    type="text" 
                                                    className="form-control border-left-0 border p-0 bg-light"  
                                                    placeholder="Cari Berita"
                                                    // style={{borderTopLeftRadius:"150px", borderBottomLeftRadius:"150px"}}
                                                    onChange={(e) => setKeyword(e.target.value)}
                                                />
                                
                                                <div>
                                                    <button 
                                                        className="btn btn-primary-dashboard" 
                                                        onClick={(e) => handleHighlightWords(e, detail.isi_berita)}
                                                        style={{borderTopRightRadius:"150px", borderBottomRightRadius:"150px"}}
                                                    >
                                                        Cari
                                                    </button>
                                                </div>
                                            </div>
                                        </form>

                                    </div>

                                    {/* Tag */}
                                    <div className="row mt-10 d-flex flex-column mx-10">
                                        <h3 className="font-weight-bolder"> 
                                            TEMUKAN LEBIH BANYAK APA YANG PENTING BAGI ANDA
                                        </h3>
                                        <div className=" d-flex flex-wrap flex-row">
                                            {
                                                tags && tags.tag && tags.tag.length !== 0 ?
                                                    tags.tag.map ((el, i) => {
                                                        return (
                                                            <div 
                                                            className="border px-2 py-1 rounded my-3 mr-3 text-center d-flex align-items-center justify-content-center" 
                                                            key={i}
                                                            onClick={() => handleFilterTag(el)}
                                                            style={{cursor:"pointer", height:"38px", fontSize:"14px"}}
                                                        >
                                                            #{el.toString().toUpperCase()}
                                                        </div>
                                                        )
                                                    })
                                                :
                                                    <div className="row text-center">
                                                        <h3 className="text-muted">
                                                            <em>
                                                                Tag Belum Tersedia
                                                            </em>
                                                        </h3>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            :
                                null
                        }
                        
                        {/* End of Right Side */}
                    </div>
                :
                    <div className="row d-flex justify-content-center my-5">
                        <h1 className="font-weight-bolder">
                            Berita Tidak Tersedia
                        </h1>
                    </div>
            }
            
            {/* End of Content */}
        </Container>
    )
}

export default DetailBerita