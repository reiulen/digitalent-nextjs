import React, { useEffect, useState } from "react"
import Image from "next/image";
import Pagination from "react-js-pagination";
import moment from "moment";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Card, Container } from "react-bootstrap";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import { getAllBerandaGaleri, getDetailBerandaGaleri } from "../../../../redux/actions/beranda/galeri.actions"
import PulseLoaderRender from "../../../components/loader/PulseLoader";
import SubHeaderComponent from "../../../components/global/Breadcrumb.component";

const Galeri = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { galeri, loading: loadingGaleri } = useSelector((state) => state.allBerandaGaleri)
    const { detail, loading: loadingDetail } = useSelector((state) => state.detailBerandaGaleri)
    const { kategori } = useSelector((state) => state.kategoriBerandaGaleri)

    const categoryToTrim = 9
    const descToTrim = 100

    const [ activeTitle, setActiveTitle ] = useState("Galeri Terupdate dan Terkini")
    const [ show, setShow ] = useState(null);
    const [ kategoriGaleri, setKategoriGaleri ] = useState("") 
    const [ activePage, setActivePage ] = useState(1)
    const [ showFullDesc, setShowFullDesc ] = useState(false)
    const [ tag, setTag ] = useState("")

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
        setShowFullDesc(false)
    }

    const handleFilterKategori = (str) => {
        if (str === ""){
            setActiveTitle("Galeri Terupdate dan Terkini")
        }
        setKategoriGaleri(str)

        dispatch(getAllBerandaGaleri(
            activePage,
            str,
            tag
        ))
    }

    const handlePagination = (pageNumber) => {
        setActivePage(pageNumber)

        dispatch(getAllBerandaGaleri(
            pageNumber,
            kategoriGaleri,
            tag
        ))
       
    }

    const handleFilterTag = (str) => {
        setActiveTitle(`#${str.toUpperCase()}`)
        // setTag(str)
        dispatch (getAllBerandaGaleri(
            activePage, 
            kategoriGaleri,
            str
        ))

    }

    const handleCategoryToTrim = (str) => {
        let result = null
        
        if (str.length > categoryToTrim){
            result = str.slice(0, categoryToTrim) + "..."

        } else {
            result = str
        }

        return result
    }

    const handleDescToTrim = (str) => {
        let result = null
        
        if (str.length > descToTrim){
            result = str.slice(0, descToTrim) + "..."

        } else {
            result = str
        }
        return result
    }

    return (
        <Container fluid className="px-md-30 px-10 py-10 bg-white">

           {/* BreadCrumb */}
            <SubHeaderComponent 
                data={[{ link: router.asPath, name: "Galeri" }]}
            />

            {/* Header */}
            <div className="col-12 mt-5">
                <h1 className="fw-700">
                    {activeTitle}
                </h1>
                <div className="mt-3">
                    Temukan konten terupdate dan terkini mengenai Digital Talent Scholarship
                </div>
            </div>

            {/* Filter Button */}
            {
                kategori ?
                    <div
                        className="col-12 pl-0 ml-4 mt-10 mb-5"
                    >
                        <Splide
                            options={{
                                arrows: false,
                                pagination: false,
                                gap: "1rem",
                                drag: "free",
                                perPage: 5,
                                breakpoints:{
                                    830: {
                                        perPage: 2,
                                      },
                                }
                            }}
                        >
                            {
                                kategoriGaleri === "" ?
                                    <SplideSlide>
                                        <div 
                                            className="d-flex align-items-center justify-content-center rounded-pill bg-primary-dashboard py-1 px-3 mr-7 my-5" 
                                            style={{ cursor: "pointer", height:"40px" }}
                                            onClick={() => handleFilterKategori("")}
                                        >
                                            <div className="my-1 mx-3 py-1 px-3 text-white">
                                                SEMUA
                                            </div>
                                        </div>
                                    </SplideSlide>
                                :
                                    <SplideSlide>
                                        <div 
                                            className="d-flex align-items-center justify-content-center border rounded-pill bg-white py-1 px-3 mr-7 my-5" 
                                            style={{ cursor: "pointer", height:"40px" }}
                                            onClick={() => handleFilterKategori("")}
                                        >
                                            <div className="my-1 mx-3 py-1 px-3 text-muted">
                                                SEMUA
                                            </div>
                                        </div>
                                    </SplideSlide>
                                    
                            }
                            {
                                kategori ?
                                    kategori.map((el, i) => {
                                        return (
                                            kategoriGaleri == el.nama_kategori ?
                                                <SplideSlide>
                                                    <div 
                                                        className="d-flex align-items-center justify-content-center border rounded-pill bg-primary-dashboard py-1 px-3 mr-7 my-5" 
                                                        style={{ cursor: "pointer", height:"40px" }}
                                                        onClick={() => handleFilterKategori(el.nama_kategori)}
                                                        key={i}
                                                    >
                                                        <div className="my-1 mx-3 py-1 px-3 text-white text-truncate">
                                                            {/* {handleCategoryToTrim(el.nama_kategori)} */}
                                                            {el.nama_kategori.toString().toUpperCase()}
                                                        </div>
                                                    </div>
                                                </SplideSlide>
                                            :
                                                <SplideSlide>
                                                    <div 
                                                        className="d-flex align-items-center justify-content-center border rounded-pill bg-white py-1 px-3 mr-7 my-5" 
                                                        style={{ cursor: "pointer", height:"40px" }}
                                                        onClick={() => handleFilterKategori(el.nama_kategori)}
                                                        key={i}
                                                    >
                                                        <div className="my-1 mx-3 py-1 px-3 text-muted text-truncate">
                                                            {/* {handleCategoryToTrim(el.nama_kategori)} */}
                                                            {el.nama_kategori.toString().toUpperCase()}
                                                        </div>
                                                    </div> 
                                                </SplideSlide>
                                                
                                        )
                                    })
                                :
                                    null
                            }

                        </Splide>
                    </div>
                    
                :
                    null
            }
            {/* End Filter Button */}

            {/* Content */}
            {
                loadingGaleri ?
                    <div className="container-fluid">
                        <div className="row">
                            <PulseLoaderRender />
                        </div>
                    </div>
                :
                    <div className="col-12 row d-flex flex-wrap justify-content-between">
                        
                        {   
                            galeri && galeri.gallery && galeri.gallery.length !== 0 ?

                                galeri.gallery.map ((el, i) => {
                                    return (
                                        <div 
                                            key={i} 
                                            className={`position-relative my-5 col-4`}
                                            onMouseEnter={() => handleMouseEnter(i)}
                                            onMouseLeave={() => handleMouseLeave(i)}
                                        >
                                            {
                                                show && show[i] === false ?
                                                    <div classname="position-relative" style={{objectFit:"cover"}}>
                                                        <Image
                                                            src={
                                                                process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                                                "publikasi/images/" + el.gambar
                                                            }
                                                            alt="Card Gallery"
                                                            width= {400}
                                                            height= {400}
                                                            className="rounded-lg"
                                                            style={{objectFit:"cover"}}
                                                        />
                                                    </div>
                                                :
                                                    <div 
                                                        style={{
                                                            width: "400px",
                                                            height: "400px"
                                                        }}

                                                        onClick={() => handleDataModal(el.id_gallery)}
                                                        data-target="#modalGaleri"
                                                        data-toggle="modal"
                                                    >   
                                                        <div classname="position-relative" style={{objectFit:"cover"}}>
                                                            <Image
                                                                src={
                                                                    process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                                                    "publikasi/images/" + el.gambar
                                                                }
                                                                alt="Card Gallery" 
                                                                width= {400}
                                                                height= {400}
                                                                className="rounded-lg"
                                                                style={{objectFit:"cover"}}
                                                            />
                                                        </div>
                                                        
                                                        <Card.ImgOverlay className="ml-4 p-0">
                                                            <div 
                                                                className="col-12 d-flex align-items-end m-0 p-0"
                                                                style={{ 
                                                                    width: "400px",
                                                                    height: "400px",
                                                                    cursor: "pointer",
                                                                    transition: "height 0.5s ease-out",
                                                                    background: "linear-gradient(to bottom, transparent 0%, black 100%)",
                                                                    borderRadius:"10px"
                                                                }}
                                                            >
                                                                <div className="d-flex flex-column">
                                                                    <div>
                                                                        <h5 className="font-weight-bolder text-white mb-5 mx-5">
                                                                            {el.judul}
                                                                        </h5>
                                                                    </div>
                                                                
                                                                    <div>
                                                                        <div className="badge badge-light mx-5 mb-5">
                                                                            <div className="text-primary">
                                                                                {/* Insert Kategori Here */}
                                                                                {el.nama_kategori}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                
                                                                
                                                            </div>
                                                        </Card.ImgOverlay> 
                                                    </div>

                                            }
                                            
                                        </div>
                                    )
                                })
                            :
                                <div className="col-12 d-flex justify-content-center my-5">
                                    <h1 className="font-weight-bolder">
                                        Galeri Tidak Tersedia
                                    </h1>
                                </div>
                        }
                    </div>
            }
            {/* End of Content */}

            {/* Modal */}
            {
                detail ? 
                    <div className="modal fade rounded-lg" id="modalGaleri">
                        <div 
                            // className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
                            className={windowDimensions.width > 1030 ? 
                                "modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" 
                            :
                                "modal-dialog modal-sm modal-dialog-centered modal-dialog-scrollable"
                        }
                        >
                            <div className="modal-content">
                                <div className="">
                                    <div className="row">
                                        {/* Slide */}
                                        {
                                            detail.gambar  && detail.gambar.length !== 0 ?
                                                <div className="col-12 col-xl-7 m-0 p-0">
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
                                                                                // style={{width:"auto", height:"auto"}}
                                                                                style={ windowDimensions.width > 1030 ? 
                                                                                        {
                                                                                            height:"650px",
                                                                                            width: "650px"
                                                                                        }
                                                                                    :
                                                                                        {
                                                                                            height:"250px",
                                                                                            width: "350px"
                                                                                        }
                                                                                }
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
                                                <div className="container-fluid">
                                                    <div className="row">
                                                        <PulseLoaderRender />
                                                    </div>
                                                </div>
                                        }
                                        

                                        {/* Content */}
                                        <div className="col-12 col-xl-5">
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
                                                                <div className="badge badge-light mr-10" key ={index}>
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

                                            <div 
                                                className="p-3" 
                                                style={{
                                                    overflowY:"auto",
                                                    overflowX:"hidden",
                                                    maxHeight:"80vh"
                                                }}
                                            >
                                                {/* Insert Desc Here */}
                                                {
                                                    windowDimensions.width > 1030 ?
                                                        <p>
                                                            {detail.isi_galeri}
                                                        </p>
                                                    :
                                                        detail.isi_galeri && showFullDesc === false ?
                                                            <div>
                                                                <span>
                                                                    {handleDescToTrim(detail.isi_galeri)}
                                                                </span>
                                                                <span 
                                                                    className="ml-2" 
                                                                    style={{color:"#007CFF"}}
                                                                    onClick={() => setShowFullDesc(true)}
                                                                >
                                                                    Lihat Selengkapnya
                                                                </span>
                                                            </div>
                                                        :
                                                            <p>
                                                                {detail.isi_galeri}
                                                            </p>

                                                }
                                                
                                                
                                                <hr/>

                                                <div className="row mb-5">
                                                    <div className="col-5 d-flex flex-row  flex-wrap">
                                                        {
                                                            detail.tag ?
                                                                detail.tag.map ((el, i) => {
                                                                    return (
                                                                        <div 
                                                                            className="border p-3 rounded mr-5 my-1" 
                                                                            key={i}
                                                                            onClick={() => handleFilterTag(el)}
                                                                            style={{cursor:"pointer"}}
                                                                        >
                                                                            #{el.toString().toUpperCase()}
                                                                        </div>
                                                        
                                                                    )
                                                                })
                                                            :
                                                                null
                                                        }
                                                        
                                                    </div>

                                                    <div className="col-6 mr-3 d-flex justify-content-end">
                                                        <button className="btn btn-outline-light rounded-circle mr-3 text-center" style={{width: "40px", height:"40px" }}>
                                                            <i className="ri-share-line p-auto m-auto"></i>
                                                        </button>
                                                        
                                                        {/* <button className="btn btn-outline-light rounded-circle mr-3 text-center" style={{width: "40px", height:"40px" }}>
                                                            <i className="ri-heart-line p-auto m-auto"></i>
                                                        </button> */}
                                                    </div>
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
                                    <h5 className="modal-title">Memuat...</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {/* <p>Data Tidak Tersedia</p> */}
                                    <div className="container-fluid">
                                        <div className="row">
                                            <PulseLoaderRender />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Tutup</button>
                                </div>
                            </div>
                        </div>
                    </div>
            }
            

            {/* Pagination */}
            {
                galeri && galeri.total !== 0?
                    <div className="row my-5 d-flex justify-content-center">
                        <div className="table-pagination">
                            <Pagination 
                                activePage = {activePage}
                                // itemsCountPerPage={galeri.perPage}
                                itemsCountPerPage={9}
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
                :
                    null
            }
            
            {/* End of Pagination */}

        </Container>
    )
}

export default Galeri