import React, { useEffect, useState } from "react"
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Highlighter from "react-highlight-words";
import { useRouter } from "next/router";

const DetailBerita = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { detail } = useSelector((state) => state.detailBerandaBerita)
    const { tags } = useSelector((state) => state.allTagBerandaBerita)

    const [ keyword, setKeyword ] = useState (null)
    const [ searchWords, setSearchWords ] = useState (null)

    const handleFilterTag = (str) => {
        router.push (`/berita?tag=${str}`)
    }

    const handleHighlightWords = (e) => {
        e.preventDefault();
        let result = keyword.split (" ")
        
        setSearchWords(result)
    }
    
    return (
        <div>
            {/* BreadCrumb */}
            <div className="row my-5 mx-1 py-3 px-8 bg-white rounded-pill d-flex align-items-center border">
                <span className="text-primary">
                    <Link href="/">
                        Beranda 
                    </Link>
                </span>
                <span>
                    <i className="ri-arrow-right-s-line text-primary"></i> 
                </span>
                <span className="text-primary">
                    <Link href="/berita">
                        Berita
                    </Link>
                </span>
                <span>
                    <i className="ri-arrow-right-s-line text-primary"></i> 
                </span>
                <span>
                    Detail Berita
                </span>
            </div>

            {/* Header */}
            <div className="row my-5 d-flex flex-column ml-3">
                <div className="badge badge-light mr-2 col-1">
                    <div className="text-primary">
                        {/* Insert Kategori Here */}
                        {detail.nama_kategori}
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

                <div className="mt-5 d-flex flex-row align-items-center justify-content-between">
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
            {/* End of Header */}

            {/* Content */}
            <div className="row">

                {/* Left Side */}
                <div className="col-12 col-md-8">
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
                        <div className="row my-5 mx-5">
                            {
                                searchWords ?
                                    <Highlighter 
                                        highlightClassName="YourHighlightClass"
                                        searchWords={searchWords}
                                        autoEscape={true}
                                        textToHighlight={detail.isi_berita}
                                        // textToHighlight={<div dangerouslySetInnerHTML={{__html: detail.isi_artikel}}/>}
                                    />
                                :
                                    <div dangerouslySetInnerHTML={{__html: detail.isi_berita}}/>
                            }
                        </div>

                        <div className="row m-3 d-flex justify-content-between">
                            <div className="row d-flex justify-content-between ml-3">
                                {
                                    detail && detail.tag && detail.tag.length !== 0 ?
                                        detail.tag.map ((el, i) => {
                                            return (
                                                <div className="mr-3 border p-3 rounded" key={i}>
                                                {el}
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
                <div className="col-12 col-md-4">

                    {/* Search */}
                    <div className="border rounded">
                        <div className="row mt-5 "> 
                            <div className="col-2 my-auto ml-3">
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

                        <form className="mb-3 mx-3">
                            <div className="input-group">
                                <i className="ri-search-line position-absolute my-5 ml-3" style={{zIndex:"10"}} ></i>

                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="    Cari Berita"
                                    style={{borderTopLeftRadius:"150px", borderBottomLeftRadius:"150px"}}
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
                    <div className="row mt-5 d-flex flex-column mx-2">
                        <h3 className="font-weight-bolder"> 
                            Temukan Lebih Banyak Berita Yang Sesuai:
                        </h3>
                        <div className=" d-flex flex-wrap justify-content-around flex-row">
                            {
                                tags && tags.tag && tags.tag.length !== 0 ?
                                    tags.tag.map ((el, i) => {
                                        return (
                                            <div 
                                                className="border px-2 py-1 rounded my-3 mr-3" 
                                                key={i}
                                                onClick={() => handleFilterTag(el)}
                                                style={{cursor:"pointer"}}
                                            >
                                                {el}
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
                {/* End of Right Side */}
            </div>
            {/* End of Content */}
        </div>
    )
}

export default DetailBerita