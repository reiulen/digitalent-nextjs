import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

import { 
    Nav, 
    Button,
    Card,
    Carousel,
    Badge
} from "react-bootstrap";

import Slider from "react-slick";

// import Carousel from "react-multi-carousel";

import ImagetronCarousel from "../../components/ImagetronCarousel";
import Footer from "../../../components/templates/footer.component"
import BerandaWrapper from "../../../components/wrapper/beranda.wrapper";

import "../../../styles/beranda.module.css"
import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Navigationbar = dynamic(() => import("../../../components/templates/navbar.component"), {
    ssr: false,
  });

const Beranda = () => {

    const [activeTab, setActiveTab] = useState ("VSGA")
    const [indexTab, setIndexTab] = useState (0)
    const [show,setShow] = useState(false)
    const [showDetail, setShowDetail] = useState(false)

    const handleMouseEnter = () =>{
        setShow(true)
        // console.log ("mouseOver")
    }

    const handleMouseLeave = () =>{
        setShow(false)
        // console.log ("mouseOut")
    }
    
    const handleActive = (tab, index) => {
        setActiveTab (tab)
        setIndexTab (index)
    }

    const handleQuickView = () => {
        setShowDetail (true)
        console.log ("open")
    }

    const handleCloseQuickView = () => {
        setShowDetail (false)
        console.log ("close")
    }

    return (
        <BerandaWrapper title= "Digitalent">
            <div className="bg-white">
                <Navigationbar />

                <ImagetronCarousel />

                {/* Akademi */}

                <div className="mb-3">
                    <Slider
                        dots= {false}
                        infinite= {false}
                        speed= {500}
                        slidesToShow= {4}
                        slidesToScroll= {1}
                        arrows= {false}
                        swipeToSlide= {true}
                    >

                        <Link href="#VSGA">
                            <Card style={{ width: '23rem', height:"7rem", cursor:"pointer" }} onClick={() => handleActive("VSGA", 0)}>
                                {
                                    indexTab === 0 ?
                                        <Card.Body className="row bg-secondary rounded">

                                            <div className="col-5">
                                                <div>
                                                    <h1 className="font-weight-bolder text-white">
                                                        VSGA
                                                    </h1>
                                                </div>
                                            </div>
                                            
                                            <div className="col-7" style={{marginTop: "-2vh"}}>
                                                <div>
                                                    <div className=" font-weight-bolder text-white ">
                                                        Vocational School Graduate Academy
                                                    </div>
                                                </div>
                                            </div>

                                        </Card.Body>
                                    :
                                        <Card.Body className="row rounded">

                                            <div className="col-5">
                                                <div>
                                                    <h1 className="font-weight-bolder">
                                                        VSGA
                                                    </h1>
                                                </div>
                                            </div>
                                            
                                            <div className="col-7" style={{marginTop: "-2vh"}}>
                                                <div>
                                                    <div className=" font-weight-bolder ">
                                                        Vocational School Graduate Academy
                                                    </div>
                                                </div>
                                            </div>

                                        </Card.Body>
                                }
                                
                            </Card>
                        </Link>

                        <Link href="#VSGA">
                            <Card style={{ width: '23rem', height:"7rem", cursor:"pointer" }} onClick={() => handleActive("VSGA", 0)}>
                                {
                                    indexTab === 0 ?
                                        <Card.Body className="row bg-secondary rounded">

                                            <div className="col-5">
                                                <div>
                                                    <h1 className="font-weight-bolder text-white">
                                                        VSGA
                                                    </h1>
                                                </div>
                                            </div>
                                            
                                            <div className="col-7" style={{marginTop: "-2vh"}}>
                                                <div>
                                                    <div className=" font-weight-bolder text-white ">
                                                        Vocational School Graduate Academy
                                                    </div>
                                                </div>
                                            </div>

                                        </Card.Body>
                                    :
                                        <Card.Body className="row rounded">

                                            <div className="col-5">
                                                <div>
                                                    <h1 className="font-weight-bolder">
                                                        VSGA
                                                    </h1>
                                                </div>
                                            </div>
                                            
                                            <div className="col-7" style={{marginTop: "-2vh"}}>
                                                <div>
                                                    <div className=" font-weight-bolder ">
                                                        Vocational School Graduate Academy
                                                    </div>
                                                </div>
                                            </div>

                                        </Card.Body>
                                }
                                
                            </Card>
                        </Link>

                        <Link href="#VSGA">
                            <Card style={{ width: '23rem', height:"7rem", cursor:"pointer" }} onClick={() => handleActive("VSGA", 0)}>
                                {
                                    indexTab === 0 ?
                                        <Card.Body className="row bg-secondary rounded">

                                            <div className="col-5">
                                                <div>
                                                    <h1 className="font-weight-bolder text-white">
                                                        VSGA
                                                    </h1>
                                                </div>
                                            </div>
                                            
                                            <div className="col-7" style={{marginTop: "-2vh"}}>
                                                <div>
                                                    <div className=" font-weight-bolder text-white ">
                                                        Vocational School Graduate Academy
                                                    </div>
                                                </div>
                                            </div>

                                        </Card.Body>
                                    :
                                        <Card.Body className="row rounded">

                                            <div className="col-5">
                                                <div>
                                                    <h1 className="font-weight-bolder">
                                                        VSGA
                                                    </h1>
                                                </div>
                                            </div>
                                            
                                            <div className="col-7" style={{marginTop: "-2vh"}}>
                                                <div>
                                                    <div className=" font-weight-bolder ">
                                                        Vocational School Graduate Academy
                                                    </div>
                                                </div>
                                            </div>

                                        </Card.Body>
                                }
                                
                            </Card>
                        </Link>

                    </Slider>
                </div>
                
                {/* Tema-1 */}
                <div className="my-5">
                    <div className="d-flex justify-content-between">
                        <h1 className="text-left font-weight-bolder ml-5">
                            Multi Media Designer
                        </h1>
                        <div>
                            <Link href="/detail/akademi/id">
                                <a className="text-primary d-flex alignment-content-center font-weight-bolder">
                                    <div className="pt-1" style={{color:"#215480"}}> 
                                        Lihat Semua
                                    </div>
                                    <i className="ri-arrow-right-s-line " style={{color:"#215480"}}></i>
                                </a>
                            </Link>
                        </div>
                    </div>

                    {/* {
                        renderAcademicTheme()
                    } */}

                    {
                        showDetail === true ?
                            <div className="d-flex justify-content-center my-5">
                                <Card className="col-10 shadow" style={{height:"20rem"}}>
                                    
                                    <div className="row">
                                        <div className="col-4">
                                            
                                            <Card.ImgOverlay>
                                                <div className="row d-flex justify-content-between">
                                                    <div className="d-flex flex-column col-6">
                                                        <Badge className="bg-secondary text-white col-6 mb-3">
                                                            Pelatihan
                                                        </Badge>
                                                        <Badge className="bg-success text-white col-3">
                                                            Open
                                                        </Badge>
                                                    </div> 
            
                                                    <div className="d-flex flex-row justify-content-end col-6">
            
                                                        <button className="btn btn-white rounded-circle mr-3  text-center">
                                                            <i className="ri-share-line"></i>
                                                        </button>
            
                                                        <button className="btn btn-white rounded-circle  text-center">
                                                            <i className="ri-heart-line"></i>
                                                        </button>
                                                    </div> 
                                                    
            
                                                </div>
                                                
                                            </Card.ImgOverlay>
                                            <Card.Img 
                                                src={`/assets/media/Image-theme.svg`} 
                                                style={{marginTop:"-10vh"}}
                                            />
                                            {/* <Image 
                                                src={`/assets/media/Image-theme.svg`}
                                                // layout="fill"
                                                objectFit="cover"
                                                width={800}
                                                height={800}
                                            /> */}
                                        </div>
                                        <div className="col-8">
                                            <Card.Body>
                                                <div className="row">
                                                    <div className='col-1'>
                                                        <Image 
                                                            src={`/assets/media/gojek-logo.svg`}
                                                            width={50}
                                                            height={50}
                                                            className="ml-1"
                                                        />
                                                    </div>
                                                    <div className='col-10 font-weight-bolder'>
                                                        Intermediate Multimedia Designer Intermediate Multimedia Designer Intermediate Multimedia Designer - Gojek Academy
                                                    </div>
                                                    <div className='col-1 '>
                                                        <button className="btn" onClick={() => handleCloseQuickView()}>
                                                            <i className="ri-close-fill"></i>
                                                        </button>
                                                    </div>
                                                    
                                                </div>
                                                
                                                <Card.Text className="my-5 ml-3">
                                                    Intermediate Multimedia Designer merupakan salah satu skema pelatihan dalam Pelatihan Intensif dan Sertifikasi (Daring) yang berbasis Standar Kompetensi Kerja ...
                                                </Card.Text>
                                                
                                                <div className="row my-5 d-flex justify-content-between mx-3">
                                                    <div>
                                                        <i className="ri-time-line text-dark"></i>
                                                        <span>
                                                            Registrasi: 05 Juli 2021 - 21 Juli 2021
                                                        </span>
                                                    </div>
            
                                                    <div>
                                                        <i className="ri-group-line text-dark"></i>
                                                        <span>
                                                            Kuota: 1000 Peserta
                                                        </span>
                                                    </div>
            
                                                    <div>
                                                        <i className="ri-map-pin-line text-dark"></i>
                                                        <span>
                                                            Lokasi: Pasaraya Blok M Gedung B Lt. 6...
                                                        </span>
                                                    </div>
                                                </div>
            
                                                <div className="row mx-3 d-flex justify-content-between">
                                                    <Link href="/detail/kategori/id">
                                                        <button className="btn btn-outline-primary rounded-pill col-5">
                                                            Daftar Pelatihan
                                                        </button>
                                                    </Link>
            
                                                    <Link href="/detail/kategori/id">
                                                        <button className="btn btn-primary-rounded-full rounded-pill col-5">
                                                            Daftar Pelatihan
                                                        </button>
                                                    </Link>
                                                </div>
            
                                            </Card.Body>
                                        </div>
            
                                    </div>
                                </Card>
                            </div>
                        :
                            <Carousel
                                indicators={false}
                                className="my-5"
                            >
                            
                                <Carousel.Item>
                                    <div className="row mx-3 d-flex justify-content-around">
                                        <Card   
                                            style={{ width: '35rem', height:"33rem", cursor: "pointer"}} 
                                            onMouseEnter={handleMouseEnter}       
                                            onMouseLeave={handleMouseLeave}
                                            className="shadow"
                                        >   

                                            <div className="row d-flex justify-content-between mt-3">
                                                <div className="d-flex flex-column col-6">
                                                    <Badge className="bg-secondary text-white col-6 mb-1">
                                                        Pelatihan
                                                    </Badge>
                                                    <Badge className="bg-success text-white col-3">
                                                        Open
                                                    </Badge>
                                                </div>

                                                {
                                                    show === true ?
                                                        <div className=" col-6 text-right">
                                                            <button className="btn btn-white rounded-circle mr-3 p-1 text-center">
                                                                <i className="ri-share-line"></i>
                                                            </button>
            
                                                            <button className="btn btn-white rounded-circle mr-3 p-1 text-center \">
                                                                <i className="ri-heart-line"></i>
                                                            </button>
                                                        </div>
                                                    :
                                                        null
                                                }
                                                
                                            </div>
            
                                            <Card.Img variant="top" src={`/assets/media/card-image.svg`} style={{marginTop:"-8vh"}}/>
            
                                            <Card.Body>
                                                <Card.Title>
                                                    Intermediate Multimedia Designer
                                                </Card.Title>
            
                                                <div className="text-muted mb-3">
                                                    Gojek
                                                </div>
            
                                                <div>
                                                    <i className="ri-time-line"></i>
                                                    <span className="ml-2">
                                                        Registrasi: 05 Juli 2021 - 21 Juli 2021
                                                    </span>
                                                </div>
                                                <div>
                                                    <i className="ri-group-line"></i>
                                                    <span className="ml-2">
                                                        Kuota: 1000 peserta
                                                    </span>
                                                </div>
            
            
                                                {
                                                    show === true && showDetail === false?
                                                        
                                                        <div className="my-5">
                                                            <button 
                                                                // className="btn "
                                                                className="btn btn-outline-primary rounded-pill btn-block" 
                                                                onClick={() => handleQuickView()}
                                                            >
                                                                Quick View
                                                            </button>
                                                        </div>
                                                    :
                                                        null
                                                }  
            
                                                        {/* <div className="my-5">
                                                            <button 
                                                                // className="btn "
                                                                className="btn btn-outline-primary rounded-pill btn-block" 
                                                                onClick={() => handleQuickView()}
                                                            >
                                                                Quick View
                                                            </button>
                                                        </div> */}
            
                                            </Card.Body>
            
                                        </Card>
            
                                        <Card   
                                            style={{ width: '35rem', height:"33rem", cursor: "pointer"}} 
                                            onMouseEnter={handleMouseEnter}       
                                            onMouseLeave={handleMouseLeave}
                                            className="shadow"
                                        >   

                                            <div className="row d-flex justify-content-between mt-3">
                                                <div className="d-flex flex-column col-6">
                                                    <Badge className="bg-secondary text-white col-6 mb-1">
                                                        Pelatihan
                                                    </Badge>
                                                    <Badge className="bg-success text-white col-3">
                                                        Open
                                                    </Badge>
                                                </div>

                                                {
                                                    show === true ?
                                                        <div className=" col-6 text-right">
                                                            <button className="btn btn-white rounded-circle mr-3 p-1 text-center">
                                                                <i className="ri-share-line"></i>
                                                            </button>
            
                                                            <button className="btn btn-white rounded-circle mr-3 p-1 text-center \">
                                                                <i className="ri-heart-line"></i>
                                                            </button>
                                                        </div>
                                                    :
                                                        null
                                                }
                                                
                                            </div>
            
                                            <Card.Img variant="top" src={`/assets/media/card-image.svg`} style={{marginTop:"-8vh"}}/>
            
                                            <Card.Body>
                                                <Card.Title>
                                                    Intermediate Multimedia Designer
                                                </Card.Title>
            
                                                <div className="text-muted mb-3">
                                                    Gojek
                                                </div>
            
                                                <div>
                                                    <i className="ri-time-line"></i>
                                                    <span className="ml-2">
                                                        Registrasi: 05 Juli 2021 - 21 Juli 2021
                                                    </span>
                                                </div>
                                                <div>
                                                    <i className="ri-group-line"></i>
                                                    <span className="ml-2">
                                                        Kuota: 1000 peserta
                                                    </span>
                                                </div>
            
            
                                                {
                                                    show === true && showDetail === false?
                                                        
                                                        <div className="my-5">
                                                            <button 
                                                                // className="btn "
                                                                className="btn btn-outline-primary rounded-pill btn-block" 
                                                                onClick={() => handleQuickView()}
                                                            >
                                                                Quick View
                                                            </button>
                                                        </div>
                                                    :
                                                        null
                                                }  
            
                                                        {/* <div className="my-5">
                                                            <button 
                                                                // className="btn "
                                                                className="btn btn-outline-primary rounded-pill btn-block" 
                                                                onClick={() => handleQuickView()}
                                                            >
                                                                Quick View
                                                            </button>
                                                        </div> */}
            
                                            </Card.Body>
            
                                        </Card>
            
                                        <Card   
                                            style={{ width: '35rem', height:"33rem", cursor: "pointer"}} 
                                            onMouseEnter={handleMouseEnter}       
                                            onMouseLeave={handleMouseLeave}
                                            className="shadow"
                                        >   

                                            <div className="row d-flex justify-content-between mt-3">
                                                <div className="d-flex flex-column col-6">
                                                    <Badge className="bg-secondary text-white col-6 mb-1">
                                                        Pelatihan
                                                    </Badge>
                                                    <Badge className="bg-success text-white col-3">
                                                        Open
                                                    </Badge>
                                                </div>

                                                {
                                                    show === true ?
                                                        <div className=" col-6 text-right">
                                                            <button className="btn btn-white rounded-circle mr-3 p-1 text-center">
                                                                <i className="ri-share-line"></i>
                                                            </button>
            
                                                            <button className="btn btn-white rounded-circle mr-3 p-1 text-center \">
                                                                <i className="ri-heart-line"></i>
                                                            </button>
                                                        </div>
                                                    :
                                                        null
                                                }
                                                
                                            </div>
            
                                            <Card.Img variant="top" src={`/assets/media/card-image.svg`} style={{marginTop:"-8vh"}}/>
            
                                            <Card.Body>
                                                <Card.Title>
                                                    Intermediate Multimedia Designer
                                                </Card.Title>
            
                                                <div className="text-muted mb-3">
                                                    Gojek
                                                </div>
            
                                                <div>
                                                    <i className="ri-time-line"></i>
                                                    <span className="ml-2">
                                                        Registrasi: 05 Juli 2021 - 21 Juli 2021
                                                    </span>
                                                </div>
                                                <div>
                                                    <i className="ri-group-line"></i>
                                                    <span className="ml-2">
                                                        Kuota: 1000 peserta
                                                    </span>
                                                </div>
            
            
                                                {
                                                    show === true && showDetail === false?
                                                        
                                                        <div className="my-5">
                                                            <button 
                                                                // className="btn "
                                                                className="btn btn-outline-primary rounded-pill btn-block" 
                                                                onClick={() => handleQuickView()}
                                                            >
                                                                Quick View
                                                            </button>
                                                        </div>
                                                    :
                                                        null
                                                }  
            
                                                        {/* <div className="my-5">
                                                            <button 
                                                                // className="btn "
                                                                className="btn btn-outline-primary rounded-pill btn-block" 
                                                                onClick={() => handleQuickView()}
                                                            >
                                                                Quick View
                                                            </button>
                                                        </div> */}
            
                                            </Card.Body>
            
                                        </Card>
            
                                    </div>
                                
                                </Carousel.Item>
            
                            </Carousel>
                    }
                    
                </div>

                {/* Tema-2 */}
                <div className="my-5">
                    <div className="d-flex justify-content-between">
                        <h1 className="text-left font-weight-bolder ml-5">
                            Multi Media Designer
                        </h1>
                        <div>
                            <Link href="/detail/akademi/id">
                                <a className="text-primary d-flex alignment-content-center font-weight-bolder">
                                    <div className="pt-1" style={{color:"#215480"}}> 
                                        Lihat Semua
                                    </div>
                                    <i className="ri-arrow-right-s-line " style={{color:"#215480"}}></i>
                                </a>
                            </Link>
                        </div>
                    </div>

                    {/* {
                        renderAcademicTheme()
                    } */}

                    {
                        showDetail === true ?
                            <div className="d-flex justify-content-center my-5">
                                <Card className="col-10 shadow" style={{height:"20rem"}}>
                                    
                                    <div className="row">
                                        <div className="col-4">
                                            
                                            <Card.ImgOverlay>
                                                <div className="row d-flex justify-content-between">
                                                    <div className="d-flex flex-column col-6">
                                                        <Badge className="bg-secondary text-white col-6 mb-3">
                                                            Pelatihan
                                                        </Badge>
                                                        <Badge className="bg-success text-white col-3">
                                                            Open
                                                        </Badge>
                                                    </div> 
            
                                                    <div className="d-flex flex-row justify-content-end col-6">
            
                                                        <button className="btn btn-white rounded-circle mr-3  text-center">
                                                            <i className="ri-share-line"></i>
                                                        </button>
            
                                                        <button className="btn btn-white rounded-circle  text-center">
                                                            <i className="ri-heart-line"></i>
                                                        </button>
                                                    </div> 
                                                    
            
                                                </div>
                                                
                                            </Card.ImgOverlay>
                                            <Card.Img 
                                                src={`/assets/media/Image-theme.svg`} 
                                                style={{marginTop:"-10vh"}}
                                            />
                                            {/* <Image 
                                                src={`/assets/media/Image-theme.svg`}
                                                // layout="fill"
                                                objectFit="cover"
                                                width={800}
                                                height={800}
                                            /> */}
                                        </div>
                                        <div className="col-8">
                                            <Card.Body>
                                                <div className="row">
                                                    <div className='col-1'>
                                                        <Image 
                                                            src={`/assets/media/gojek-logo.svg`}
                                                            width={50}
                                                            height={50}
                                                            className="ml-1"
                                                        />
                                                    </div>
                                                    <div className='col-10 font-weight-bolder'>
                                                        Intermediate Multimedia Designer Intermediate Multimedia Designer Intermediate Multimedia Designer - Gojek Academy
                                                    </div>
                                                    <div className='col-1 '>
                                                        <button className="btn" onClick={() => handleCloseQuickView()}>
                                                            <i className="ri-close-fill"></i>
                                                        </button>
                                                    </div>
                                                    
                                                </div>
                                                
                                                <Card.Text className="my-5 ml-3">
                                                    Intermediate Multimedia Designer merupakan salah satu skema pelatihan dalam Pelatihan Intensif dan Sertifikasi (Daring) yang berbasis Standar Kompetensi Kerja ...
                                                </Card.Text>
                                                
                                                <div className="row my-5 d-flex justify-content-between mx-3">
                                                    <div>
                                                        <i className="ri-time-line text-dark"></i>
                                                        <span>
                                                            Registrasi: 05 Juli 2021 - 21 Juli 2021
                                                        </span>
                                                    </div>
            
                                                    <div>
                                                        <i className="ri-group-line text-dark"></i>
                                                        <span>
                                                            Kuota: 1000 Peserta
                                                        </span>
                                                    </div>
            
                                                    <div>
                                                        <i className="ri-map-pin-line text-dark"></i>
                                                        <span>
                                                            Lokasi: Pasaraya Blok M Gedung B Lt. 6...
                                                        </span>
                                                    </div>
                                                </div>
            
                                                <div className="row mx-3 d-flex justify-content-between">
                                                    <Link href="/detail/kategori/id">
                                                        <button className="btn btn-outline-primary rounded-pill col-5">
                                                            Daftar Pelatihan
                                                        </button>
                                                    </Link>
            
                                                    <Link href="/detail/kategori/id">
                                                        <button className="btn btn-primary-rounded-full rounded-pill col-5">
                                                            Daftar Pelatihan
                                                        </button>
                                                    </Link>
                                                </div>
            
                                            </Card.Body>
                                        </div>
            
                                    </div>
                                </Card>
                            </div>
                        :
                            <Carousel
                                indicators={false}
                                className="my-5"
                            >
                            
                                <Carousel.Item>
                                    <div className="row mx-3 d-flex justify-content-around">
                                        <Card   
                                            style={{ width: '35rem', height:"33rem", cursor: "pointer"}} 
                                            onMouseEnter={handleMouseEnter}       
                                            onMouseLeave={handleMouseLeave}
                                            className="shadow"
                                        >   

                                            <div className="row d-flex justify-content-between mt-3">
                                                <div className="d-flex flex-column col-6">
                                                    <Badge className="bg-secondary text-white col-6 mb-1">
                                                        Pelatihan
                                                    </Badge>
                                                    <Badge className="bg-success text-white col-3">
                                                        Open
                                                    </Badge>
                                                </div>

                                                {
                                                    show === true ?
                                                        <div className=" col-6 text-right">
                                                            <button className="btn btn-white rounded-circle mr-3 p-1 text-center">
                                                                <i className="ri-share-line"></i>
                                                            </button>
            
                                                            <button className="btn btn-white rounded-circle mr-3 p-1 text-center \">
                                                                <i className="ri-heart-line"></i>
                                                            </button>
                                                        </div>
                                                    :
                                                        null
                                                }
                                                
                                            </div>
            
                                            <Card.Img variant="top" src={`/assets/media/card-image.svg`} style={{marginTop:"-8vh"}}/>
            
                                            <Card.Body>
                                                <Card.Title>
                                                    Intermediate Multimedia Designer
                                                </Card.Title>
            
                                                <div className="text-muted mb-3">
                                                    Gojek
                                                </div>
            
                                                <div>
                                                    <i className="ri-time-line"></i>
                                                    <span className="ml-2">
                                                        Registrasi: 05 Juli 2021 - 21 Juli 2021
                                                    </span>
                                                </div>
                                                <div>
                                                    <i className="ri-group-line"></i>
                                                    <span className="ml-2">
                                                        Kuota: 1000 peserta
                                                    </span>
                                                </div>
            
            
                                                {
                                                    show === true && showDetail === false?
                                                        
                                                        <div className="my-5">
                                                            <button 
                                                                // className="btn "
                                                                className="btn btn-outline-primary rounded-pill btn-block" 
                                                                onClick={() => handleQuickView()}
                                                            >
                                                                Quick View
                                                            </button>
                                                        </div>
                                                    :
                                                        null
                                                }  
            
                                                        {/* <div className="my-5">
                                                            <button 
                                                                // className="btn "
                                                                className="btn btn-outline-primary rounded-pill btn-block" 
                                                                onClick={() => handleQuickView()}
                                                            >
                                                                Quick View
                                                            </button>
                                                        </div> */}
            
                                            </Card.Body>
            
                                        </Card>
            
                                        <Card   
                                            style={{ width: '35rem', height:"33rem", cursor: "pointer"}} 
                                            onMouseEnter={handleMouseEnter}       
                                            onMouseLeave={handleMouseLeave}
                                            className="shadow"
                                        >   

                                            <div className="row d-flex justify-content-between mt-3">
                                                <div className="d-flex flex-column col-6">
                                                    <Badge className="bg-secondary text-white col-6 mb-1">
                                                        Pelatihan
                                                    </Badge>
                                                    <Badge className="bg-success text-white col-3">
                                                        Open
                                                    </Badge>
                                                </div>

                                                {
                                                    show === true ?
                                                        <div className=" col-6 text-right">
                                                            <button className="btn btn-white rounded-circle mr-3 p-1 text-center">
                                                                <i className="ri-share-line"></i>
                                                            </button>
            
                                                            <button className="btn btn-white rounded-circle mr-3 p-1 text-center \">
                                                                <i className="ri-heart-line"></i>
                                                            </button>
                                                        </div>
                                                    :
                                                        null
                                                }
                                                
                                            </div>
            
                                            <Card.Img variant="top" src={`/assets/media/card-image.svg`} style={{marginTop:"-8vh"}}/>
            
                                            <Card.Body>
                                                <Card.Title>
                                                    Intermediate Multimedia Designer
                                                </Card.Title>
            
                                                <div className="text-muted mb-3">
                                                    Gojek
                                                </div>
            
                                                <div>
                                                    <i className="ri-time-line"></i>
                                                    <span className="ml-2">
                                                        Registrasi: 05 Juli 2021 - 21 Juli 2021
                                                    </span>
                                                </div>
                                                <div>
                                                    <i className="ri-group-line"></i>
                                                    <span className="ml-2">
                                                        Kuota: 1000 peserta
                                                    </span>
                                                </div>
            
            
                                                {
                                                    show === true && showDetail === false?
                                                        
                                                        <div className="my-5">
                                                            <button 
                                                                // className="btn "
                                                                className="btn btn-outline-primary rounded-pill btn-block" 
                                                                onClick={() => handleQuickView()}
                                                            >
                                                                Quick View
                                                            </button>
                                                        </div>
                                                    :
                                                        null
                                                }  
            
                                                        {/* <div className="my-5">
                                                            <button 
                                                                // className="btn "
                                                                className="btn btn-outline-primary rounded-pill btn-block" 
                                                                onClick={() => handleQuickView()}
                                                            >
                                                                Quick View
                                                            </button>
                                                        </div> */}
            
                                            </Card.Body>
            
                                        </Card>
            
                                        <Card   
                                            style={{ width: '35rem', height:"33rem", cursor: "pointer"}} 
                                            onMouseEnter={handleMouseEnter}       
                                            onMouseLeave={handleMouseLeave}
                                            className="shadow"
                                        >   

                                            <div className="row d-flex justify-content-between mt-3">
                                                <div className="d-flex flex-column col-6">
                                                    <Badge className="bg-secondary text-white col-6 mb-1">
                                                        Pelatihan
                                                    </Badge>
                                                    <Badge className="bg-success text-white col-3">
                                                        Open
                                                    </Badge>
                                                </div>

                                                {
                                                    show === true ?
                                                        <div className=" col-6 text-right">
                                                            <button className="btn btn-white rounded-circle mr-3 p-1 text-center">
                                                                <i className="ri-share-line"></i>
                                                            </button>
            
                                                            <button className="btn btn-white rounded-circle mr-3 p-1 text-center \">
                                                                <i className="ri-heart-line"></i>
                                                            </button>
                                                        </div>
                                                    :
                                                        null
                                                }
                                                
                                            </div>
            
                                            <Card.Img variant="top" src={`/assets/media/card-image.svg`} style={{marginTop:"-8vh"}}/>
            
                                            <Card.Body>
                                                <Card.Title>
                                                    Intermediate Multimedia Designer
                                                </Card.Title>
            
                                                <div className="text-muted mb-3">
                                                    Gojek
                                                </div>
            
                                                <div>
                                                    <i className="ri-time-line"></i>
                                                    <span className="ml-2">
                                                        Registrasi: 05 Juli 2021 - 21 Juli 2021
                                                    </span>
                                                </div>
                                                <div>
                                                    <i className="ri-group-line"></i>
                                                    <span className="ml-2">
                                                        Kuota: 1000 peserta
                                                    </span>
                                                </div>
            
            
                                                {
                                                    show === true && showDetail === false?
                                                        
                                                        <div className="my-5">
                                                            <button 
                                                                // className="btn "
                                                                className="btn btn-outline-primary rounded-pill btn-block" 
                                                                onClick={() => handleQuickView()}
                                                            >
                                                                Quick View
                                                            </button>
                                                        </div>
                                                    :
                                                        null
                                                }  
            
                                                        {/* <div className="my-5">
                                                            <button 
                                                                // className="btn "
                                                                className="btn btn-outline-primary rounded-pill btn-block" 
                                                                onClick={() => handleQuickView()}
                                                            >
                                                                Quick View
                                                            </button>
                                                        </div> */}
            
                                            </Card.Body>
            
                                        </Card>
            
                                    </div>
                                
                                </Carousel.Item>
            
                            </Carousel>
                    }
                    
                </div>

                {/* Tema-3 */}
                <div className="my-5">
                    <div className="d-flex justify-content-between">
                        <h1 className="text-left font-weight-bolder ml-5">
                            Multi Media Designer
                        </h1>
                        <div>
                            <Link href="/detail/akademi/id">
                                <a className="text-primary d-flex alignment-content-center font-weight-bolder">
                                    <div className="pt-1" style={{color:"#215480"}}> 
                                        Lihat Semua
                                    </div>
                                    <i className="ri-arrow-right-s-line " style={{color:"#215480"}}></i>
                                </a>
                            </Link>
                        </div>
                    </div>

                    {/* {
                        renderAcademicTheme()
                    } */}

                    {
                        showDetail === true ?
                            <div className="d-flex justify-content-center my-5">
                                <Card className="col-10 shadow" style={{height:"20rem"}}>
                                    
                                    <div className="row">
                                        <div className="col-4">
                                            
                                            <Card.ImgOverlay>
                                                <div className="row d-flex justify-content-between">
                                                    <div className="d-flex flex-column col-6">
                                                        <Badge className="bg-secondary text-white col-6 mb-3">
                                                            Pelatihan
                                                        </Badge>
                                                        <Badge className="bg-success text-white col-3">
                                                            Open
                                                        </Badge>
                                                    </div> 
            
                                                    <div className="d-flex flex-row justify-content-end col-6">
            
                                                        <button className="btn btn-white rounded-circle mr-3  text-center">
                                                            <i className="ri-share-line"></i>
                                                        </button>
            
                                                        <button className="btn btn-white rounded-circle  text-center">
                                                            <i className="ri-heart-line"></i>
                                                        </button>
                                                    </div> 
                                                    
            
                                                </div>
                                                
                                            </Card.ImgOverlay>
                                            <Card.Img 
                                                src={`/assets/media/Image-theme.svg`} 
                                                style={{marginTop:"-10vh"}}
                                            />
                                            {/* <Image 
                                                src={`/assets/media/Image-theme.svg`}
                                                // layout="fill"
                                                objectFit="cover"
                                                width={800}
                                                height={800}
                                            /> */}
                                        </div>
                                        <div className="col-8">
                                            <Card.Body>
                                                <div className="row">
                                                    <div className='col-1'>
                                                        <Image 
                                                            src={`/assets/media/gojek-logo.svg`}
                                                            width={50}
                                                            height={50}
                                                            className="ml-1"
                                                        />
                                                    </div>
                                                    <div className='col-10 font-weight-bolder'>
                                                        Intermediate Multimedia Designer Intermediate Multimedia Designer Intermediate Multimedia Designer - Gojek Academy
                                                    </div>
                                                    <div className='col-1 '>
                                                        <button className="btn" onClick={() => handleCloseQuickView()}>
                                                            <i className="ri-close-fill"></i>
                                                        </button>
                                                    </div>
                                                    
                                                </div>
                                                
                                                <Card.Text className="my-5 ml-3">
                                                    Intermediate Multimedia Designer merupakan salah satu skema pelatihan dalam Pelatihan Intensif dan Sertifikasi (Daring) yang berbasis Standar Kompetensi Kerja ...
                                                </Card.Text>
                                                
                                                <div className="row my-5 d-flex justify-content-between mx-3">
                                                    <div>
                                                        <i className="ri-time-line text-dark"></i>
                                                        <span>
                                                            Registrasi: 05 Juli 2021 - 21 Juli 2021
                                                        </span>
                                                    </div>
            
                                                    <div>
                                                        <i className="ri-group-line text-dark"></i>
                                                        <span>
                                                            Kuota: 1000 Peserta
                                                        </span>
                                                    </div>
            
                                                    <div>
                                                        <i className="ri-map-pin-line text-dark"></i>
                                                        <span>
                                                            Lokasi: Pasaraya Blok M Gedung B Lt. 6...
                                                        </span>
                                                    </div>
                                                </div>
            
                                                <div className="row mx-3 d-flex justify-content-between">
                                                    <Link href="/detail/kategori/id">
                                                        <button className="btn btn-outline-primary rounded-pill col-5">
                                                            Daftar Pelatihan
                                                        </button>
                                                    </Link>
            
                                                    <Link href="/detail/kategori/id">
                                                        <button className="btn btn-primary-rounded-full rounded-pill col-5">
                                                            Daftar Pelatihan
                                                        </button>
                                                    </Link>
                                                </div>
            
                                            </Card.Body>
                                        </div>
            
                                    </div>
                                </Card>
                            </div>
                        :
                            <Carousel
                                indicators={false}
                                className="my-5"
                            >
                            
                                <Carousel.Item>
                                    <div className="row mx-3 d-flex justify-content-around">
                                        <Card   
                                            style={{ width: '35rem', height:"33rem", cursor: "pointer"}} 
                                            onMouseEnter={handleMouseEnter}       
                                            onMouseLeave={handleMouseLeave}
                                            className="shadow"
                                        >   

                                            <div className="row d-flex justify-content-between mt-3">
                                                <div className="d-flex flex-column col-6">
                                                    <Badge className="bg-secondary text-white col-6 mb-1">
                                                        Pelatihan
                                                    </Badge>
                                                    <Badge className="bg-success text-white col-3">
                                                        Open
                                                    </Badge>
                                                </div>

                                                {
                                                    show === true ?
                                                        <div className=" col-6 text-right">
                                                            <button className="btn btn-white rounded-circle mr-3 p-1 text-center">
                                                                <i className="ri-share-line"></i>
                                                            </button>
            
                                                            <button className="btn btn-white rounded-circle mr-3 p-1 text-center \">
                                                                <i className="ri-heart-line"></i>
                                                            </button>
                                                        </div>
                                                    :
                                                        null
                                                }
                                                
                                            </div>
            
                                            <Card.Img variant="top" src={`/assets/media/card-image.svg`} style={{marginTop:"-8vh"}}/>
            
                                            <Card.Body>
                                                <Card.Title>
                                                    Intermediate Multimedia Designer
                                                </Card.Title>
            
                                                <div className="text-muted mb-3">
                                                    Gojek
                                                </div>
            
                                                <div>
                                                    <i className="ri-time-line"></i>
                                                    <span className="ml-2">
                                                        Registrasi: 05 Juli 2021 - 21 Juli 2021
                                                    </span>
                                                </div>
                                                <div>
                                                    <i className="ri-group-line"></i>
                                                    <span className="ml-2">
                                                        Kuota: 1000 peserta
                                                    </span>
                                                </div>
            
            
                                                {
                                                    show === true && showDetail === false?
                                                        
                                                        <div className="my-5">
                                                            <button 
                                                                // className="btn "
                                                                className="btn btn-outline-primary rounded-pill btn-block" 
                                                                onClick={() => handleQuickView()}
                                                            >
                                                                Quick View
                                                            </button>
                                                        </div>
                                                    :
                                                        null
                                                }  
            
                                                        {/* <div className="my-5">
                                                            <button 
                                                                // className="btn "
                                                                className="btn btn-outline-primary rounded-pill btn-block" 
                                                                onClick={() => handleQuickView()}
                                                            >
                                                                Quick View
                                                            </button>
                                                        </div> */}
            
                                            </Card.Body>
            
                                        </Card>
            
                                        <Card   
                                            style={{ width: '35rem', height:"33rem", cursor: "pointer"}} 
                                            onMouseEnter={handleMouseEnter}       
                                            onMouseLeave={handleMouseLeave}
                                            className="shadow"
                                        >   

                                            <div className="row d-flex justify-content-between mt-3">
                                                <div className="d-flex flex-column col-6">
                                                    <Badge className="bg-secondary text-white col-6 mb-1">
                                                        Pelatihan
                                                    </Badge>
                                                    <Badge className="bg-success text-white col-3">
                                                        Open
                                                    </Badge>
                                                </div>

                                                {
                                                    show === true ?
                                                        <div className=" col-6 text-right">
                                                            <button className="btn btn-white rounded-circle mr-3 p-1 text-center">
                                                                <i className="ri-share-line"></i>
                                                            </button>
            
                                                            <button className="btn btn-white rounded-circle mr-3 p-1 text-center \">
                                                                <i className="ri-heart-line"></i>
                                                            </button>
                                                        </div>
                                                    :
                                                        null
                                                }
                                                
                                            </div>
            
                                            <Card.Img variant="top" src={`/assets/media/card-image.svg`} style={{marginTop:"-8vh"}}/>
            
                                            <Card.Body>
                                                <Card.Title>
                                                    Intermediate Multimedia Designer
                                                </Card.Title>
            
                                                <div className="text-muted mb-3">
                                                    Gojek
                                                </div>
            
                                                <div>
                                                    <i className="ri-time-line"></i>
                                                    <span className="ml-2">
                                                        Registrasi: 05 Juli 2021 - 21 Juli 2021
                                                    </span>
                                                </div>
                                                <div>
                                                    <i className="ri-group-line"></i>
                                                    <span className="ml-2">
                                                        Kuota: 1000 peserta
                                                    </span>
                                                </div>
            
            
                                                {
                                                    show === true && showDetail === false?
                                                        
                                                        <div className="my-5">
                                                            <button 
                                                                // className="btn "
                                                                className="btn btn-outline-primary rounded-pill btn-block" 
                                                                onClick={() => handleQuickView()}
                                                            >
                                                                Quick View
                                                            </button>
                                                        </div>
                                                    :
                                                        null
                                                }  
            
                                                        {/* <div className="my-5">
                                                            <button 
                                                                // className="btn "
                                                                className="btn btn-outline-primary rounded-pill btn-block" 
                                                                onClick={() => handleQuickView()}
                                                            >
                                                                Quick View
                                                            </button>
                                                        </div> */}
            
                                            </Card.Body>
            
                                        </Card>
            
                                        <Card   
                                            style={{ width: '35rem', height:"33rem", cursor: "pointer"}} 
                                            onMouseEnter={handleMouseEnter}       
                                            onMouseLeave={handleMouseLeave}
                                            className="shadow"
                                        >   

                                            <div className="row d-flex justify-content-between mt-3">
                                                <div className="d-flex flex-column col-6">
                                                    <Badge className="bg-secondary text-white col-6 mb-1">
                                                        Pelatihan
                                                    </Badge>
                                                    <Badge className="bg-success text-white col-3">
                                                        Open
                                                    </Badge>
                                                </div>

                                                {
                                                    show === true ?
                                                        <div className=" col-6 text-right">
                                                            <button className="btn btn-white rounded-circle mr-3 p-1 text-center">
                                                                <i className="ri-share-line"></i>
                                                            </button>
            
                                                            <button className="btn btn-white rounded-circle mr-3 p-1 text-center \">
                                                                <i className="ri-heart-line"></i>
                                                            </button>
                                                        </div>
                                                    :
                                                        null
                                                }
                                                
                                            </div>
            
                                            <Card.Img variant="top" src={`/assets/media/card-image.svg`} style={{marginTop:"-8vh"}}/>
            
                                            <Card.Body>
                                                <Card.Title>
                                                    Intermediate Multimedia Designer
                                                </Card.Title>
            
                                                <div className="text-muted mb-3">
                                                    Gojek
                                                </div>
            
                                                <div>
                                                    <i className="ri-time-line"></i>
                                                    <span className="ml-2">
                                                        Registrasi: 05 Juli 2021 - 21 Juli 2021
                                                    </span>
                                                </div>
                                                <div>
                                                    <i className="ri-group-line"></i>
                                                    <span className="ml-2">
                                                        Kuota: 1000 peserta
                                                    </span>
                                                </div>
            
            
                                                {
                                                    show === true && showDetail === false?
                                                        
                                                        <div className="my-5">
                                                            <button 
                                                                // className="btn "
                                                                className="btn btn-outline-primary rounded-pill btn-block" 
                                                                onClick={() => handleQuickView()}
                                                            >
                                                                Quick View
                                                            </button>
                                                        </div>
                                                    :
                                                        null
                                                }  
            
                                                        {/* <div className="my-5">
                                                            <button 
                                                                // className="btn "
                                                                className="btn btn-outline-primary rounded-pill btn-block" 
                                                                onClick={() => handleQuickView()}
                                                            >
                                                                Quick View
                                                            </button>
                                                        </div> */}
            
                                            </Card.Body>
            
                                        </Card>
            
                                    </div>
                                
                                </Carousel.Item>
            
                            </Carousel>
                    }
                    
                </div>

                <div className="col-12 text-center my-5">
                    <button className="btn btn-outline-primary rounded-pill ">
                        <div className="font-weight-bolder">
                            Muat Lebih Banyak
                        </div>
                    </button>
                </div>

                {/* H-Banner 01*/}
                <Image 
                    src={`/assets/media/tahapan-pendaftaran-new.svg`}
                    width={1500}
                    height={580}
                    className="my-5"
                />

                {/* H-Banner 02*/}
                <div className="my-5">

                    <div className="text-center mt-5 mb-3">
                        <h1 className="font-weight-bolder">
                            Rilis Media dan Informasi
                        </h1>
                    </div>
                    
                    {/* Card */}
                    <div className="d-flex justify-content-around my-5">

                        <Card style={{ width: '30rem', height: "35rem" }}>
                            <Card.Img variant="top" src={`/assets/media/image-29.svg`} />

                            <div className="ml-3" style={{marginTop:"-35px"}}> 
                                <Image 
                                    src={`/assets/media/VSGA-tag.svg`}
                                    width={50}
                                    height={25}
                                />
                            </div>
                            
                            <Card.Body>
                                
                                <Card.Text>
                                    12 Mei 2021
                                </Card.Text>

                                <Card.Title>
                                    Pengumuman Kelulusan Peserta Pelatihan Daring Gelombang 1 Program VSGA DTS 2021
                                </Card.Title>

                                <div>
                                    <Link href="#home">
                                        <a className=" d-flex alignment-content-center justify-content-end">
                                            <div className="pt-1 font-weight-bolder text-muted"> 
                                                Lihat Detail
                                            </div>
                                            <i className="ri-arrow-right-line  ml-2 font-weight-bolder"></i>
                                        </a>
                                    </Link>
                                </div>

                            </Card.Body>
                        </Card>

                        <Card style={{ width: '30rem', height: "35rem" }}>
                            <Card.Img variant="top" src={`/assets/media/image-29.svg`} />

                            <div className="ml-3" style={{marginTop:"-35px"}}> 
                                <Image 
                                    src={`/assets/media/VSGA-tag.svg`}
                                    width={50}
                                    height={25}
                                />
                            </div>
                            
                            <Card.Body>
                                
                                <Card.Text>
                                    12 Mei 2021
                                </Card.Text>

                                <Card.Title>
                                    Pengumuman Kelulusan Peserta Pelatihan Daring Gelombang 1 Program VSGA DTS 2021
                                </Card.Title>

                                <div>
                                    <Link href="#home">
                                        <a className=" d-flex alignment-content-center justify-content-end">
                                            <div className="pt-1 font-weight-bolder text-muted"> 
                                                Lihat Detail
                                            </div>
                                            <i className="ri-arrow-right-line  ml-2 font-weight-bolder"></i>
                                        </a>
                                    </Link>
                                </div>

                            </Card.Body>
                        </Card>

                        <Card style={{ width: '30rem', height: "35rem" }}>
                            <Card.Img variant="top" src={`/assets/media/image-29.svg`} />

                            <div className="ml-3" style={{marginTop:"-35px"}}> 
                                <Image 
                                    src={`/assets/media/VSGA-tag.svg`}
                                    width={50}
                                    height={25}
                                />
                            </div>
                            
                            <Card.Body>
                                
                                <Card.Text>
                                    12 Mei 2021
                                </Card.Text>

                                <Card.Title>
                                    Pengumuman Kelulusan Peserta Pelatihan Daring Gelombang 1 Program VSGA DTS 2021
                                </Card.Title>

                                <div>
                                    <Link href="#home">
                                        <a className=" d-flex alignment-content-center justify-content-end">
                                            <div className="pt-1 font-weight-bolder text-muted"> 
                                                Lihat Detail
                                            </div>
                                            <i className="ri-arrow-right-line  ml-2 font-weight-bolder"></i>
                                        </a>
                                    </Link>
                                </div>

                            </Card.Body>
                        </Card>

                    </div>

                    <div className="text-center">
                        <button className="btn btn-outline-primary rounded-pill">
                            <div className="font-weight-bolder">
                                Lihat Selengkapnya
                            </div>
                        </button>
                    </div>
                </div>

                <Image 
                    src={`/assets/media/banner-02.svg`}
                    width={1500}
                    height={380}
                />
                
                <Footer />

            </div>
        </BerandaWrapper>
        
    )
}

export default Beranda