import React, { useEffect, useState } from "react"
import Link from "next/link";
import Image from "next/image";
import Pagination from "react-js-pagination";
import moment from "moment";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { getAllBerandaGaleri, getDetailBerandaGaleri } from "../../../redux/actions/beranda/galeri.actions"
import style from "../../../styles/peserta/galeri.module.css"

const Galeri = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { galeri } = useSelector((state) => state.allBerandaGaleri)
    const { detail } = useSelector((state) => state.detailBerandaGaleri)
    const { kategori } = useSelector((state) => state.kategoriBerandaGaleri)
    
    const [ show, setShow ] = useState(null);
    const [ kategoriGaleri, setKategoriGaleri ] = useState("") 
    const [ activePage, setActivePage ] = useState(1)

    useEffect(() => {
        handleCardIndex()
      }, []);

    const handleCardIndex = () => {
        let arr = []

        if (galeri && galeri.gallery.length ){
            for (let i = 0; i < galeri.gallery.length; i++){
                arr.push(false)
            }
        }

        setShow(arr)
    }

    const handleMouseEnter = (index) => {
        let arr = [...show]

        for (let i = 0; i < arr.length; i++){
            if (i == index){
                arr[i] = true
            }
        }

        setShow(arr)
    }

    const handleMouseLeave = (index) => {
        let arr = [...show]

        for (let i = 0; i < arr.length; i++){
            if (i == index){
                arr[i] = false
            }
        }

        setShow(arr)
    }

    const handleDataModal = (id) => {
        dispatch (getDetailBerandaGaleri(id))
    }

    const handleFilterKategori = (str) => {

        setKategoriGaleri(str)

        dispatch(getAllBerandaGaleri(
            activePage,
            str
        ))
    }

    const handlePagination = (pageNumber) => {
        setActivePage(pageNumber)

        dispatch(getAllBerandaGaleri(
            pageNumber,
            kategoriGaleri
        ))
       
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
                <span>
                    {/* Insert BreadCrumb Here */}
                    Galeri
                </span>
            </div>

            {/* Header */}
            <div className="col-12 mt-5">
                <h1 className="fw-700">
                    Galeri Terupdate dan Terkini
                </h1>
                <div className="mt-3">
                    Temukan konten terupdate dan terkini mengenai Digital Talent Scholarship
                </div>
            </div>

            {/* Filter Button */}
            {/* <div className="row my-5">
                <div className="col-12 d-flex justify-content-around flex-row flex-wrap">
                    {
                        kategoriGaleri === "" ?
                            <div 
                                className="d-flex align-items-center rounded-pill bg-primary-dashboard py-1 px-9 m-2" 
                                style={{ cursor: "pointer" }}
                                onClick={() => handleFilterKategori("")}
                            >
                                <div className="my-1 mx-5 py-1 px-9 text-white">
                                    Semua
                                </div>
                            </div>
                        :
                            <div 
                                className="d-flex align-items-center rounded-pill bg-white py-1 px-9 border border-muted m-2" 
                                style={{ cursor: "pointer" }}
                                onClick={() => handleFilterKategori("")}
                            >
                                <div className="my-1 mx-5 py-1 px-9 text-muted">
                                    Semua
                                </div>
                            </div>
                    }   
                    
                    {
                        kategori ?
                            kategori.map ((el, i) => {
                                return (
                                    kategoriGaleri === el.nama_kategori ?
                                        <div 
                                            className="d-flex align-items-center rounded-pill bg-primary-dashboard py-1 px-9 border border-muted m-2" 
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleFilterKategori(el.nama_kategori)}
                                            key={i}
                                        >
                                            <div className="my-1 mx-5 py-1 px-9 text-white">
                                                {el.nama_kategori}
                                            </div>
                                        </div>
                                    :
                                        <div 
                                            className="d-flex align-items-center rounded-pill bg-white py-1 px-9 border border-muted m-2" 
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleFilterKategori(el.nama_kategori)}
                                            key={i}
                                        >
                                            <div className="my-1 mx-5 py-1 px-9 text-muted">
                                                {el.nama_kategori}
                                            </div>
                                        </div>
                                )
                            })
                        :
                            null
                    }

                </div>
               
            </div> */}

            {
                kategori ? (
                    <div
                        className="row my-5"
                        style={{overflowX:"hidden"}}
                    >
                        <Carousel
                            indicators={false}
                            nextIcon={false}
                            nextLabel={false}
                            prevIcon={false}
                            prevLabel={false}
                        >
                            <Carousel.Item>
                                <div className="col-12 d-flex flex-row ">
                                    {
                                        kategoriGaleri === "" ?
                                                <div 
                                                    className="d-flex align-items-center rounded-pill bg-primary-dashboard py-1 px-3 mr-3 my-5" 
                                                    style={{ cursor: "pointer", height:"40px" }}
                                                    onClick={() => handleFilterKategori("")}
                                                >
                                                    <div className="my-1 mx-3 py-1 px-3 text-white">
                                                        Semua
                                                    </div>
                                                </div>
                                            :
                                                <div 
                                                    className="d-flex align-items-center border rounded-pill bg-whitepy-1 px-3 mr-3 my-5" 
                                                    style={{ cursor: "pointer", height:"40px" }}
                                                    onClick={() => handleFilterKategori("")}
                                                >
                                                    <div className="my-1 mx-3 py-1 px-3 text-muted">
                                                        Semua
                                                    </div>
                                                </div>
                                    }

                                    {
                                        kategori ?
                                            kategori.map((el, i) => {
                                                return (
                                                    kategoriGaleri == el.nama_kategori ?
                                                        <div 
                                                            className="d-flex align-items-center border rounded-pill bg-primary-dashboard py-1 px-3 mr-3 my-5" 
                                                            style={{ cursor: "pointer", height:"40px" }}
                                                            onClick={() => handleFilterKategori(el.nama_kategori)}
                                                            key={i}
                                                        >
                                                            <div className="my-1 mx-3 py-1 px-3 text-white">
                                                                {el.nama_kategori}
                                                            </div>
                                                        </div> 
                                                    :
                                                        <div 
                                                            className="d-flex align-items-center border rounded-pill bg-white py-1 px-3 mr-3 my-5" 
                                                            style={{ cursor: "pointer", height:"40px" }}
                                                            onClick={() => handleFilterKategori(el.nama_kategori)}
                                                            key={i}
                                                        >
                                                            <div className="my-1 mx-3 py-1 px-3 text-muted">
                                                                {el.nama_kategori}
                                                            </div>
                                                        </div> 
                                                )
                                            })
                                        :
                                            null
                                    }
                                </div>

                            </Carousel.Item>
                            
                        </Carousel>
                        
                    </div>
                ) : null
            }
            {/* End Filter Button */}

            {/* Content */}
            <div className="col-12 d-flex flex-wrap justify-content-between">
                {   
                    galeri && galeri.gallery.length ?

                        galeri.gallery.map ((el, i) => {
                            return (
                                <div 
                                    key={i} 
                                    className="position-relative my-5"
                                    onMouseEnter={() => handleMouseEnter(i)}
                                    onMouseLeave={() => handleMouseLeave(i)}
                                >
                                    {
                                        show && show[i] === false ?
                                            <div>
                                                <img 
                                                   src={
                                                        process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                                        "publikasi/images/" + el.gambar
                                                    }
                                                    alt="Card Gallery" 
                                                    width= "400px"
                                                    height= "400px"
                                                    className="rounded-lg"
                                                />
                                            </div>
                                        :
                                            <div>   
                                                <div 
                                                    // className={`position-relative ${style.card_thumbnail}`}
                                                    style={{
                                                        zIndex:"20",
                                                        cursor: "pointer",
                                                        transition: "height 0.5s ease-out",
                                                        background: "linear-gradient(to bottom, transparent 0%, black 100%)",
                                                        borderRadius: "10px"
                                                    }}
                                                    onClick={() => handleDataModal(el.id_gallery)}
                                                    data-target="#modalGaleri"
                                                    data-toggle="modal"
                                                >
                                                    <img 
                                                        src={
                                                            process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                                            "publikasi/images/" + el.gambar
                                                        }
                                                        alt="Card Gallery" 
                                                        width= "400px"
                                                        height= "400px"
                                                        className="rounded-lg"
                                                    />
                                                </div>
                                                

                                                <div className="position-absolute col-12 " style={{marginTop:"-10vh"}}>
                                                    <div>
                                                        <h5 className="font-weight-bolder text-white">
                                                            {el.judul}
                                                        </h5>
                                                    </div>
                                                    
                                                    {

                                                    }
                                                    <div>
                                                        <div className="badge badge-light mr-2">
                                                            <div className="text-primary">
                                                                {/* Insert Kategori Here */}
                                                                {el.nama_kategori}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                    }
                                    
                                </div>
                            )
                        })
                    :
                        <div className="row">
                            <h1 className="font-weight-bolder">
                                Galeri Tidak Tersedia
                            </h1>
                        </div>
                }
            </div>
            {/* End of Content */}

            {/* Modal */}
            {
                detail ? 
                    <div className="modal fade" id="modalGaleri">
                        <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="">
                                    <div className="row">
                                        {/* Slide */}
                                        {
                                            detail.gambar !== undefined && detail.gambar.length !== 0 ?
                                                <div className="col-12 col-xl-6 m-0 p-0">
                                                    <Carousel
                                                        nextIcon = {
                                                            detail.gambar.length > 1 ?  
                                                                    <span aria-hidden="false" className="carousel-control-next-icon" />
                                                                : 
                                                                    null
                                                            }
                                                        prevIcon = {
                                                            detail.gambar.length > 1 ?  
                                                                    <span aria-hidden="false" className="carousel-control-prev-icon" />
                                                                : 
                                                                    null
                                                            }
                                                        nextLabel = {null}
                                                        prevLabel = {null}
                                                        indicators = {false}
                                                    >
                                                        {
                                                            
                                                                detail.gambar.map((el, i) => {
                                                                    return (
                                                                        <Carousel.Item key = {i}>
                                                                            <div 
                                                                                className="position-relative"
                                                                                style={{
                                                                                    height:"650px",
                                                                                    width: "650px"
                                                                                }}
                                                                            >
                                                                                <Image
                                                                                    src={
                                                                                        process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                                                                        "publikasi/images/" + el.gambar
                                                                                    }  
                                                                                    alt="Slider" 
                                                                                    objectFit="cover"
                                                                                    layout="fill"
                                                                                />
                                                                            </div>
                                                                            
                                                                        </Carousel.Item>
                                                                    )
                                                                })
                                                        }
                                                        
                                                    
                                                    </Carousel>
                                                </div>
                                            :
                                                null
                                        }
                                        

                                        {/* Content */}
                                        <div className="col-12 col-xl-6">
                                            <div className="row">
                                                <h5 className="text-dark font-weight-bolder ml-5 mt-3">
                                                    { detail.judul }
                                                </h5>
                                            </div>
                                            
                                            <div className="row d-flex justify-content-between text-muted">
                                                <div className="d-flex align-items-center">
                                                    <i className="ri-calendar-2-line mr-2 ml-5"></i>
                                                    <span>
                                                        {/* Insert Publish Date Here */}
                                                        {moment(detail.tanggal_publish).format("DD MMMM YYYY")}
                                                    </span>
                                                </div>

                                                {
                                                    kategori.map ((element, index) => {
                                                        return (
                                                            detail.kategori_id == element.id ?
                                                                <div className="badge badge-light mr-5" key ={index}>
                                                                    <div className="text-primary">
                                                                        {/* Insert Kategori Here */}
                                                                        {element.nama_kategori}
                                                                    </div>
                                                                </div>
                                                            :
                                                                null
                                                        )
                                                    })
                                                }
                                                
                                            </div>

                                            <hr/>

                                            <div className="row p-3">
                                                {/* Insert Desc Here */}
                                                <p>
                                                    {detail.isi_galeri}
                                                </p>
                                                
                                            </div>

                                            <hr/>

                                            <div className="row d-flex justify-content-between mb-5">
                                                <div className="row d-flex justify-content-between ml-3">
                                                    {
                                                        detail.tag ?
                                                            detail.tag.map ((el, i) => {
                                                                return (
                                                                    <div className="border p-3 rounded mx-1" key={i}>
                                                                        {el}
                                                                    </div>
                                                    
                                                                )
                                                            })
                                                        :
                                                            null
                                                    }
                                                    
                                                </div>

                                                <div className="row mr-3">
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
                                </div>
                            </div>
                        </div>

                    </div>
                :
                    <div className="modal fade" id="modalGaleri">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Error</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p>Data Tidak Tersedia</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Tutup</button>
                                </div>
                            </div>
                        </div>
                    </div>
            }
            

            {/* Pagination */}
            <div className="row my-5 d-flex justify-content-center">
                <div className="table-pagination">
                    <Pagination 
                        activePage = {activePage}
                        itemsCountPerPage={galeri.perPage}
                        totalItemsCount={galeri.total}
                        pageRangeDisplayed={3}
                        onChange={handlePagination}
                        nextPageText={">"}
                        prevPageText={"<"}
                        firstPageText={"<<"}
                        lastPageText={">>"}
                        itemClass="page-item-dashboard"
                        linkClass="page-link-dashboard"
                    />
                </div>
            </div>
            {/* End of Pagination */}

        </div>
    )
}

export default Galeri