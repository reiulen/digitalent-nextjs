import React, { useEffect, useState } from "react"
import Link from "next/link";
import Image from "next/image";
import Pagination from "react-js-pagination";
import moment from "moment";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { getDetailBerandaGaleri } from "../../../redux/actions/beranda/galeri.actions"
import style from "../../../styles/peserta/galeri.module.css"
const Galeri = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { galeri } = useSelector((state) => state.allBerandaGaleri)
    const { detail } = useSelector((state) => state.detailBerandaGaleri)
    const { kategori } = useSelector((state) => state.kategoriBerandaGaleri)

    const dummyCard = [
        {image: "/assets/media/default-card-artikel.png"},
        {image: "/assets/media/image-20.png"},
        {image: "/assets/media/image-21.png"},
        {image: "/assets/media/image-22.png"},
        {image: "/assets/media/image-23.png"},
        {image: "/assets/media/image-25.png"},
        {image: "/assets/media/default-card-artikel.png"},
        {image: "/assets/media/image-20.png"},
        {image: "/assets/media/image-21.png"},
    ]
    
    const [show, setShow] = useState(null);
    const [ kategoriGaleri, setKategoriGaleri ] = useState("test")  // ---------- Wed, 03 - 11 - 21  || Setting active kategori

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

    return (
        <div>
           {/* BreadCrumb */}
           <div className="row my-5 mx-1 py-3 px-8 bg-white rounded-pill d-flex align-items-center border">
                <span className="text-primary">
                    <Link href="#">
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
            <div className="row my-5">
                <div className="col-12 d-flex justify-content-between flex-row flex-wrap">
                    {/* Selected */}
                    {
                        kategoriGaleri === null ?
                            <div 
                                className="d-flex align-items-center rounded-pill bg-primary-dashboard py-1 px-3 m-2" 
                                style={{ cursor: "pointer" }}
                            >
                                <div className="my-1 mx-3 py-1 px-3 text-white">
                                    Semua
                                </div>
                            </div>
                        :
                            <div 
                                className="d-flex align-items-center rounded-pill bg-white py-1 px-3 border border-muted m-2" 
                                style={{ cursor: "pointer" }}
                            >
                                <div className="my-1 mx-3 py-1 px-3 text-muted">
                                    Semua
                                </div>
                            </div>
                    }   
                    

                    {/* UnSelected */}
                    <div 
                        className="d-flex align-items-center rounded-pill bg-white py-1 px-3 border border-muted m-2" 
                        style={{ cursor: "pointer" }}
                    >
                        <div className="my-1 mx-3 py-1 px-3 text-muted">
                            Pengumuman
                        </div>
                    </div>

                    <div 
                        className="d-flex align-items-center rounded-pill bg-white py-1 px-3 border border-muted m-2" 
                        style={{ cursor: "pointer" }}
                    >
                        <div className="my-1 mx-3 py-1 px-3 text-muted">
                            Informasi
                        </div>
                    </div>

                    <div 
                        className="d-flex align-items-center rounded-pill bg-white py-1 px-3 border border-muted m-2" 
                        style={{ cursor: "pointer" }}
                    >
                        <div className="my-1 mx-3 py-1 px-3 text-muted">
                            Press Release
                        </div>
                    </div>

                    <div 
                        className="d-flex align-items-center rounded-pill bg-white py-1 px-3 border border-muted m-2" 
                        style={{ cursor: "pointer" }}
                    >
                        <div className="my-1 mx-3 py-1 px-3 text-muted">
                           Tips And Trick
                        </div>
                    </div>

                </div>
               
            </div>
            {/* End Filter Button */}

            {/* Content */}
            <div className="col-12 d-flex flex-wrap justify-content-between">
                {   
                    galeri && galeri.gallery.length ?

                        galeri.gallery.map ((el, i) => {
                            return (
                                <div 
                                    key={i} 
                                    className="position-relative m-3"
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
                                                    className="rounded"
                                                />
                                            </div>
                                        :
                                            <div>   
                                                <div 
                                                    // className={`position-relative ${style.card_thumbnail}`}
                                                    style={{
                                                        filter: "brightness(0.5)", 
                                                        cursor: "pointer" 
                                                        // backgroundImage: "linear-gradient(white, black)",
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
                                                        className="rounded"
                                                    />
                                                </div>
                                                

                                                <div className="position-absolute row " style={{marginTop:"-10vh"}}>
                                                    <div className="col-6">
                                                        <h5 className="font-weight-bolder text-white ml-2">
                                                            Strategi Bisnis Online Bersama Google
                                                        </h5>
                                                    </div>
                                                    
                                                    <div className="col-6 text-right">
                                                        <div className="badge badge-light mr-2">
                                                            <div className="text-primary">
                                                                {/* Insert Kategori Here */}
                                                                Pengumuman
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
                                        <div className="col-12 col-xl-6 m-0 p-0">
                                            <Carousel
                                            nextIcon = {null}
                                            nextLabel = {null}
                                            prevIcon = {null}
                                            prevLabel = {null}
                                            indicators = {false}
                                            >
                                                <Carousel.Item>
                                                    <img 
                                                        src="/assets/media/image-20.png" 
                                                        alt="Slider" 
                                                        width= "100%"
                                                        height= "auto"
                                                    />
                                                </Carousel.Item>

                                                <Carousel.Item>
                                                    <img 
                                                        src="/assets/media/image-21.png" 
                                                        alt="Slider" 
                                                        width= "100%"
                                                        height= "auto"
                                                    />
                                                </Carousel.Item>

                                                <Carousel.Item>
                                                    <img 
                                                        src="/assets/media/image-22.png" 
                                                        alt="Slider" 
                                                        width= "100%"
                                                        height= "auto"
                                                    />
                                                </Carousel.Item>
                                            </Carousel>
                                        </div>

                                        {/* Content */}
                                        <div className="col-12 col-xl-6">
                                            <div className="row">
                                                <h5 className="text-dark font-weight-bolder ml-3 mt-3">
                                                    { detail.judul }
                                                </h5>
                                            </div>
                                            
                                            <div className="row d-flex justify-content-between text-muted">
                                                <div className="d-flex align-items-center">
                                                    <i className="ri-calendar-2-line mr-2 ml-3"></i>
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
                        // activePage = {activePage}
                        activePage = {1}
                        // itemsCountPerPage={pelatihan.perPage}
                        itemsCountPerPage={9}
                        // totalItemsCount={pelatihan.total}
                        totalItemsCount={9}
                        pageRangeDisplayed={3}
                        // onChange={handlePagination}
                        nextPageText={">"}
                        prevPageText={"<"}
                        firstPageText={"<<"}
                        lastPageText={">>"}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>
            </div>
            {/* End of Pagination */}

        </div>
    )
}

export default Galeri