import React, { useEffect, useState } from "react"
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Highlighter from "react-highlight-words";
import { useRouter } from "next/router";

const DetailArtikel = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { detail } = useSelector((state) => state.detailBerandaArtikel)
    const { tags } = useSelector((state) => state.allTagBerandaArtikel)

    const [ keyword, setKeyword ] = useState (null)
    const [ searchWords, setSearchWords ] = useState (null)

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
        router.push (`/artikel?tag=${str}`)
    }

    const handleHighlightWords = (e) => {
        e.preventDefault();
        let result = keyword.split (" ")
        
        setSearchWords(result)
    }

    return(
        <div className="mx-35">
            {/* BreadCrumb */}
            <div className="row my-7 mx-1 py-3 px-8 bg-white rounded-pill d-flex align-items-center border">
                <span className="text-primary">
                    <Link href="/">
                        Beranda 
                    </Link>
                </span>
                <span>
                    <i className="ri-arrow-right-s-line text-primary"></i> 
                </span>
                <span className="text-primary">
                    <Link href="/artikel">
                        Artikel
                    </Link>
                </span>
                <span>
                    <i className="ri-arrow-right-s-line text-primary"></i> 
                </span>
                <span>
                    Detail Artikel
                </span>
            </div>

            {/* Header */}
            {
                detail ?
                    <div className="row my-5 d-flex flex-column ml-3">
                        <div className="badge badge-light mr-2 col-1">
                            <div className="text-primary" style={{overflowX:"hidden"}}>
                                {/* Insert Kategori Here */}
                                Pengumuman
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

                        <div className="mt-5 d-flex flex-row align-items-center justify-content-between mx-3">
                            <div className="row">
                                <div className="">
                                    {/* Insert Logo Image Here */}
                                    <Image
                                        src={
                                            process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                            "publikasi/images/" + detail.foto
                                        }
                                        width={30}
                                        height={30}
                                        alt="Logo Image"
                                        className="border rounded-circle"
                                    />
                                </div>
                                <div className="d-flex flex-column ml-3">
                                    <div className="font-weight-bolder">
                                        {/* Insert Admin Here */}
                                        {detail.dibuat}
                                    </div>
                                    <div className="text-muted">
                                        {moment(detail.tanggal_publish).format("DD MMMM YYYY")}
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <button className="btn btn-outline-light rounded-circle mr-3">
                                    <i className="ri-share-line p-0"></i>
                                </button>
                                
                                <button className="btn btn-outline-light rounded-circle mr-3">
                                    <i className="ri-heart-line p-0"></i>
                                </button>
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
                        <div className="col-12 col-md-8">
                            {/* Image */}
                            <Image
                                src={
                                    process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                    "publikasi/images/" + detail.gambar
                                }
                                width="1500vw"
                                height="1000vh" 
                                objectFit="cover"
                                alt="Detail Image"
                                className="rounded-lg"
                            />

                            {/* Artikel */}
                            <div className="border rounded-lg mb-5 mt-15">
                                <div className="row my-5 mx-5 text-justify" style={{overflowX:"hidden"}}>
                                    {
                                        searchWords ?
                                            <Highlighter 
                                                highlightClassName="YourHighlightClass"
                                                searchWords={searchWords}
                                                autoEscape={true}
                                                textToHighlight={detail.isi_artikel}
                                                // textToHighlight={<div dangerouslySetInnerHTML={{__html: detail.isi_artikel}}/>}
                                            />
                                        :
                                            <div dangerouslySetInnerHTML={{__html: detail.isi_artikel}}/>
                                    }
                                </div>

                                <div className="row m-3 d-flex justify-content-between pb-5">

                                    <div className="row d-flex justify-content-between ml-3">
                                        {
                                            detail && detail.tag && detail.tag.length !== 0 ?
                                                detail.tag.map ((el, i) => {
                                                    return (
                                                        <div className="mr-3 border p-3 rounded" key={i}>
                                                        #{el}
                                                        </div>
                                                    )
                                                })
                                            :
                                                null
                                        }
                                    </div>

                                    <div className="row">
                                        <button className="btn btn-outline-light rounded-circle mr-3">
                                            <i className="ri-share-line p-0"></i>
                                        </button>
                                        
                                        <button className="btn btn-outline-light rounded-circle mr-3">
                                            <i className="ri-heart-line p-0"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End of Left Side */}

                        {/* Right Side */}
                        {
                            windowDimensions && windowDimensions.width && windowDimensions.width > 750 ?
                                <div className="col-12 col-md-4">

                                    {/* Search */}
                                    <div className="border rounded">
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
                                                    placeholder="Cari Artikel"
                                                    // style={{borderTopLeftRadius:"150px", borderBottomLeftRadius:"150px"}}
                                                    onChange={(e) => setKeyword(e.target.value)}
                                                />
                                
                                                <div>
                                                    <button 
                                                        className="btn btn-primary-dashboard" 
                                                        onClick={(e) => handleHighlightWords(e, detail.isi_artikel)}
                                                        style={{borderTopRightRadius:"150px", borderBottomRightRadius:"150px"}}
                                                        type="submit"
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
                                            Temukan Lebih Banyak Artikel Yang Sesuai:
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
                                                                style={{cursor:"pointer", height:"38px", width:"83px", fontSize:"14px"}}
                                                            >
                                                                #{el}
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
                            Artikel Tidak Tersedia
                        </h1>
                    </div>
            }
            
            {/* End of Content */}
        </div>
    )
}


export default DetailArtikel