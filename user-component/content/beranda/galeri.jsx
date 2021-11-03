import React, { useEffect, useState } from "react"
import Link from "next/link";
import Image from "next/image";
import Pagination from "react-js-pagination";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import style from "../../../styles/peserta/galeri.module.css"
const Galeri = () => {
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

    useEffect(() => {
        handleCardIndex()
      }, []);

    const handleCardIndex = () => {
        let arr = []

        for (let i = 0; i < dummyCard.length; i++){
            arr.push(false)
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

    const handleDataModal = () => {

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
                    <div 
                        className="d-flex align-items-center rounded-pill bg-primary-dashboard py-1 px-3 m-2" 
                        style={{ cursor: "pointer" }}
                    >
                        <div className="my-1 mx-3 py-1 px-3 text-white">
                            Semua
                        </div>
                    </div>

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
                    dummyCard.map ((el, i) => {
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
                                            <Image 
                                                src={el.image}
                                                width={400}
                                                height={400}
                                                objectFit="cover"
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
                                                onClick={() => handleDataModal()}
                                                data-target="#modalGaleri"
                                                data-toggle="modal"
                                            >
                                                <Image 
                                                    src={el.image}
                                                    width={400}
                                                    height={400}
                                                    objectFit="cover"
                                                    className="rounded"
                                                />
                                            </div>
                                            

                                            <div className="position-absolute mx-2" style={{marginTop:"-10vh"}}>
                                                <h5 className="font-weight-bolder text-white">
                                                    Strategi Bisnis Online Bersama Google
                                                </h5>
                                                <div className="badge badge-light mr-2">
                                                    <div className="text-primary">
                                                        {/* Insert Kategori Here */}
                                                        Pengumuman
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                }
                                
                            </div>
                        )
                    })
                }
            </div>
            {/* End of Content */}

            {/* Modal */}
            <div className="modal fade" id="modalGaleri">
                <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="">
                            <div className="row">
                                {/* Slide */}
                                <div className="col-12 col-md-6 m-0 p-0">
                                    <Carousel
                                      nextIcon = {null}
                                      nextLabel = {null}
                                      prevIcon = {null}
                                      prevLabel = {null}
                                      indicators = {false}
                                    >
                                        <Carousel.Item>
                                            <Image 
                                                src="/assets/media/image-20.png"
                                                width={650}
                                                height={650}
                                                objectFit="cover"
                                            />
                                        </Carousel.Item>

                                        <Carousel.Item>
                                            <Image 
                                                src="/assets/media/image-21.png"
                                                width={650}
                                                height={650}
                                                objectFit="cover"
                                            />
                                        </Carousel.Item>

                                        <Carousel.Item>
                                            <Image 
                                                src="/assets/media/image-22.png"
                                                width={650}
                                                height={650}
                                                objectFit="cover"
                                            />
                                        </Carousel.Item>
                                    </Carousel>
                                </div>

                                {/* Content */}
                                <div className="col-12 col-md-6">
                                    <div className="row">
                                        <h5 className="text-dark font-weight-bolder ml-3">
                                            Strategi Bisnis Online bersama Google
                                        </h5>
                                    </div>
                                    
                                    <div className="row d-flex justify-content-between text-muted">
                                        <div className="d-flex align-items-center">
                                            <i className="ri-calendar-2-line mr-2 ml-3"></i>
                                            <span>
                                                {/* Insert Publish Date Here */}
                                                Publish : 22 Agustus 2021
                                            </span>
                                        </div>

                                        <div className="badge badge-light mr-2">
                                            <div className="text-primary">
                                                {/* Insert Kategori Here */}
                                                Pengumuman
                                            </div>
                                        </div>
                                    </div>

                                    <hr/>

                                    <div className="row p-3">
                                        {/* Insert Desc Here */}
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nunc mauris, varius eu porttitor sit amet, ultrices et arcu. Curabitur risus velit, pretium eget ullamcorper sit amet, vehicula et arcu. Donec laoreet id ipsum non tempus. Vestibulum consectetur nec mauris quis congue. Sed scelerisque eget ex vitae blandit. Nunc quam sem, efficitur ut elit quis, laoreet viverra metus. In varius sit amet ligula eu malesuada. Phasellus vitae dapibus risus. Aenean tellus turpis, bibendum quis blandit vitae, ullamcorper sed ex. Duis urna libero, porta in lectus et, scelerisque cursus leo. Vestibulum non maximus ipsum, non feugiat ex. Duis id viverra tortor. Curabitur pharetra sollicitudin odio ac posuere. Nullam vulputate fringilla bibendum. Duis sed vulputate ex. Nunc et porta erat, at finibus tortor.

                                            Praesent faucibus porta sapien congue rutrum. Donec egestas dolor tempor lacus sagittis ultrices. Nunc pulvinar turpis ac ligula mollis, id pretium risus viverra. Sed bibendum nunc pellentesque, consectetur turpis vitae, vestibulum nulla. Phasellus non elit non eros scelerisque consectetur et nec magna. Aenean ac rhoncus mi. Quisque ut maximus nulla, sed cursus nulla. In hac habitasse platea dictumst. Aliquam pretium odio ipsum, nec pulvinar lorem congue sit amet.
                                        </p>
                                        
                                    </div>

                                    <hr/>

                                    <div className="row d-flex justify-content-between">
                                        <div className="row d-flex justify-content-between ml-3">
                                            <div className="border p-3 rounded mr-3">
                                                #SVGA
                                            </div>
                                            <div className=" border p-3 rounded">
                                                #Pelatihan
                                            </div>
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