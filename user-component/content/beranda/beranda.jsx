import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

import { 
    Nav, 
    Button,
    Card,
    Carousel,
} from "react-bootstrap";


// import Slider from "react-slick";

// import Carousel from "react-multi-carousel";

import ImagetronCarousel from "../../../components/ImagetronCarousel";
import Footer from "../../../components/templates/footer.component"
import BerandaWrapper from "../../../components/wrapper/beranda.wrapper";

import "../../../styles/beranda.module.css"
// import "react-multi-carousel/lib/styles.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const Navigationbar = dynamic(() => import("../../../components/templates/navbar.component"), {
    ssr: false,
  });

const Beranda = () => {

    const [activeTab, setActiveTab] = useState ("VSGA")
    const [indexTab, setIndexTab] = useState (0)
    const [show,setShow] = useState(false)
    const [showDetail, setShowDetail] = useState(false)

    // const responsive = {
    //     desktop: {
    //         breakpoint: { max: 3000, min: 1024 },
    //         items: 8,
    //         slidesToSlide: 1 // optional, default to 1.
    //     },

    //     tablet: {
    //         breakpoint: { max: 1024, min: 464 },
    //         items: 2,
    //         slidesToSlide: 1 // optional, default to 1.
    //     },

    //     mobile: {
    //         breakpoint: { max: 464, min: 0 },
    //         items: 1,
    //         slidesToSlide: 1 // optional, default to 1.
    //     }
    // };

    // const settings = {
    //     dots: false,
    //     infinite: false,
    //     speed: 500,
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     arrows: false,
    //     swipeToSlide: true,
    // }

    // const settingsMobile = {
    //     dots: true,
    //     infinite: false,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1
    // }

    const handleMouseOver = () =>{
        // console.log(
        //     "over"
        // )
        setShow(true)
    }

    const handleMouseOut = () =>{
        // console.log(
        //     "out"
        // )
        setShow(false)
    }
    
    const handleActive = (tab, index) => {
        setActiveTab (tab)
        setIndexTab (index)
    }

    // const CustomRightArrow = ({onClick}) => {
    //     // const {
    //     //     onMove,
    //     //     carouselState: { currentSlide, deviceType }
    //     //   } = rest;

    //     if (indexTab < 7) {
    //         return (
    //             <button className="btn btn-white rounded-circle" onClick={() => setIndexTab (indexTab - 1)}>
    //                 <i className="ri-arrow-right-line text-primary ml-2 font-weight-bolder"></i>
    //             </button>
    //         )

    //     } else {
    //         return null
    //     }
    // }

    // const CustomLeftArrow = ({onClick}) => {
    //     // const {
    //     //     onMove,
    //     //     carouselState: { currentSlide, deviceType }
    //     //   } = rest;

    //     if (indexTab > 0) {
    //         return (
    //             <button className="btn btn-white rounded-circle" onClick={() => setIndexTab (indexTab + 1)}>
    //                 <i className="ri-arrow-right-line text-primary ml-2 font-weight-bolder"></i>
    //             </button>
    //         )

    //     } else {
    //         return null
    //     }
    // }

    return (
        <BerandaWrapper title= "Digitalent">
            <div className="bg-white">
                <Navigationbar />

                <ImagetronCarousel />

                {/* <div className="mx-5">
                    <Carousel
                        // customLeftArrow = {
                        //         <button className="btn btn-white rounded-circle" >
                        //             <i className="ri-arrow-right-line text-primary ml-2 font-weight-bolder"></i>
                        //         </button> 
                        //     }
                        // customRightArrow = {
                        //         <button className="btn btn-white rounded-circle" >
                        //             <i className="ri-arrow-right-line text-primary ml-2 font-weight-bolder"></i>
                        //         </button> 
                        //     }
                        arrows
                        showDots={false}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        infinite={false}
                        // autoPlay={true}
                        autoPlaySpeed={3000}
                        keyBoardControl={true}
                        // customTransition="all .5"
                        // transitionDuration={500}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        // deviceType={this.props.deviceType}
                        dotListClass="custom-dot-list-style"
                        draggable={true}
                        swipeable={true}
                        slidesToSlide={1}
                    >   
                        
                        <Link href="#VSGA">
                            <Card style={{ width: '15rem', height:"15rem", cursor:"pointer" }} onClick={() => handleActive("VSGA", 0)}>
                                {
                                    indexTab === 0 ?
                                        <Card.Body>

                                            <Card.Title>
                                                <h1 className="font-weight-bolder text-center">
                                                    VSGA
                                                </h1>
                                            </Card.Title>

                                            <Card.Text>
                                                <div className="text-center font-weight-bolder">
                                                    Vocational School Graduate Academy
                                                </div>
                                            </Card.Text>

                                        </Card.Body>
                                    :
                                        <Card.Body>

                                            <Card.Title>
                                                <h1 className="font-weight-bolder text-muted text-center">
                                                    VSGA
                                                </h1>
                                            </Card.Title>

                                            <Card.Text>
                                                <div className="text-center text-muted font-weight-bolder">
                                                    Vocational School Graduate Academy
                                                </div>
                                            </Card.Text>

                                        </Card.Body>
                                }
                                

                                {
                                    indexTab === 0 ?
                                        <div className="bg-primary" style={{height:"10px"}}>

                                        </div>
                                    :
                                        <div className="bg-gray" style={{height:"10px"}}>

                                        </div>
                                }
                                
                            </Card>
                        </Link>
                        

                        
                        <Link href="#FGA">
                            <Card style={{ width: '15rem', height:"15rem", cursor:"pointer" }}  onClick={() => handleActive("FGA", 1)}>
                            {
                                    indexTab === 1 ?
                                        <Card.Body>

                                            <Card.Title>
                                                <h1 className="font-weight-bolder text-center">
                                                    FGA
                                                </h1>
                                            </Card.Title>

                                            <Card.Text>
                                                <div className="text-center font-weight-bolder">
                                                    Fresh Graduate Academy
                                                </div>
                                            </Card.Text>

                                        </Card.Body>
                                    :
                                        <Card.Body>

                                            <Card.Title>
                                                <h1 className="font-weight-bolder text-muted text-center">
                                                    FGA
                                                </h1>
                                            </Card.Title>

                                            <Card.Text>
                                                <div className="text-center text-muted font-weight-bolder">
                                                    Fresh Graduate Academy
                                                </div>
                                            </Card.Text>

                                        </Card.Body>
                                }

                                {
                                    indexTab === 1 ?
                                        <div className="bg-primary" style={{height:"10px"}}>

                                        </div>
                                    :
                                        <div className="bg-gray" style={{height:"10px"}}>

                                        </div>
                                }
                            </Card>
                        </Link>

                        
                        <Link href="#PRO">
                            <Card style={{ width: '15rem', height:"15rem", cursor:"pointer" }} onClick={() => handleActive("PRO", 2)}>
                                {
                                    indexTab === 2 ?
                                        <Card.Body>

                                            <Card.Title>
                                                <h1 className="font-weight-bolder text-center">
                                                    PRO
                                                </h1>
                                            </Card.Title>

                                            <Card.Text>
                                                <div className="text-center font-weight-bolder">
                                                    Professional Academy
                                                </div>
                                            </Card.Text>

                                        </Card.Body>
                                    :
                                        <Card.Body>

                                            <Card.Title>
                                                <h1 className="font-weight-bolder text-muted text-center">
                                                    PRO
                                                </h1>
                                            </Card.Title>

                                            <Card.Text>
                                                <div className="text-center text-muted font-weight-bolder">
                                                    Professional Academy
                                                </div>
                                            </Card.Text>

                                        </Card.Body>
                                }

                                {
                                    indexTab === 2 ?
                                        <div className="bg-primary" style={{height:"10px"}}>

                                        </div>
                                    :
                                        <div className="bg-gray" style={{height:"10px"}}>

                                        </div>
                                }
                            </Card>
                        </Link>

                        
                        <Link href="#TA">
                            <Card style={{ width: '15rem', height:"15rem", cursor:"pointer" }}  onClick={() => handleActive("TA",3)}>
                                {
                                    indexTab === 3 ?
                                        <Card.Body>

                                            <Card.Title>
                                                <h1 className="font-weight-bolder text-center">
                                                    TA
                                                </h1>
                                            </Card.Title>

                                            <Card.Text>
                                                <div className="text-center font-weight-bolder">
                                                    Thematic Academy
                                                </div>
                                            </Card.Text>

                                        </Card.Body>
                                    :
                                        <Card.Body>

                                            <Card.Title>
                                                <h1 className="font-weight-bolder text-muted text-center">
                                                    TA
                                                </h1>
                                            </Card.Title>

                                            <Card.Text>
                                                <div className="text-center text-muted font-weight-bolder">
                                                    Thematic Academy
                                                </div>
                                            </Card.Text>

                                        </Card.Body>
                                }

                                {
                                    indexTab === 3 ?
                                        <div className="bg-primary" style={{height:"10px"}}>

                                        </div>
                                    :
                                        <div className="bg-gray" style={{height:"10px"}}>

                                        </div>
                                }
                            </Card>
                        </Link>
                        
                        <Link href="#GTA">
                            <Card style={{ width: '15rem', height:"15rem", cursor:"pointer" }} onClick={() => handleActive("GTA",4)}>
                                {
                                    indexTab === 4 ?
                                        <Card.Body>

                                            <Card.Title>
                                                <h1 className="font-weight-bolder text-center">
                                                    GTA
                                                </h1>
                                            </Card.Title>

                                            <Card.Text>
                                                <div className="text-center font-weight-bolder">
                                                    Government Transformation Academy
                                                </div>
                                            </Card.Text>

                                        </Card.Body>
                                    :
                                        <Card.Body>

                                            <Card.Title>
                                                <h1 className="font-weight-bolder text-muted text-center">
                                                    GTA
                                                </h1>
                                            </Card.Title>

                                            <Card.Text>
                                                <div className="text-center text-muted font-weight-bolder">
                                                    Government Transformation Academy
                                                </div>
                                            </Card.Text>

                                        </Card.Body>
                                }

                                {
                                    indexTab === 4 ?
                                        <div className="bg-primary" style={{height:"10px"}}>

                                        </div>
                                    :
                                        <div className="bg-gray" style={{height:"10px"}}>

                                        </div>
                                }
                            </Card>
                        </Link>

                        <Link href="#DEA">
                            <Card style={{ width: '15rem', height:"15rem", cursor:"pointer" }} onClick={() => handleActive("DEA", 5)}>
                                {
                                    indexTab === 5 ?
                                        <Card.Body>

                                            <Card.Title>
                                                <h1 className="font-weight-bolder text-center">
                                                    DEA
                                                </h1>
                                            </Card.Title>

                                            <Card.Text>
                                                <div className="text-center font-weight-bolder">
                                                    Digital Entrepeneurship Academy
                                                </div>
                                            </Card.Text>

                                        </Card.Body>
                                    :
                                        <Card.Body>

                                            <Card.Title>
                                                <h1 className="font-weight-bolder text-muted text-center">
                                                    DEA
                                                </h1>
                                            </Card.Title>

                                            <Card.Text>
                                                <div className="text-center text-muted font-weight-bolder">
                                                    Digital Entrepeneurship Academy
                                                </div>
                                            </Card.Text>

                                        </Card.Body>
                                }

                                {
                                    indexTab === 5 ?
                                        <div className="bg-primary" style={{height:"10px"}}>

                                        </div>
                                    :
                                        <div className="bg-gray" style={{height:"10px"}}>

                                        </div>
                                }
                            </Card>
                        </Link>

                        <Link href="#TSA">
                            <Card style={{ width: '15rem', height:"15rem", cursor:"pointer" }} onClick={() => handleActive("TSA", 6)}>
                                {   
                                    indexTab === 6 ?
                                        <Card.Body>

                                            <Card.Title>
                                                <h1 className="font-weight-bolder text-center">
                                                    TSA
                                                </h1>
                                            </Card.Title>

                                            <Card.Text>
                                                <div className="text-center font-weight-bolder">
                                                    Talent Scouting Academy
                                                </div>
                                            </Card.Text>

                                        </Card.Body>
                                    :
                                        <Card.Body>

                                            <Card.Title>
                                                <h1 className="font-weight-bolder text-muted text-center">
                                                    TSA
                                                </h1>
                                            </Card.Title>

                                            <Card.Text>
                                                <div className="text-center text-muted font-weight-bolder">
                                                    Talent Scouting Academy
                                                </div>
                                            </Card.Text>

                                        </Card.Body>
                                }

                                {
                                    indexTab === 6 ?
                                        <div className="bg-primary" style={{height:"10px"}}>

                                        </div>
                                    :
                                        <div className="bg-gray" style={{height:"10px"}}>

                                        </div>
                                }
                            </Card>
                        </Link>

                        <Link href="#TSA">
                            <Card style={{ width: '15rem', height:"15rem", cursor:"pointer" }} onClick={() => handleActive("TSA", 6)}>
                                {   
                                    indexTab === 6 ?
                                        <Card.Body>

                                            <Card.Title>
                                                <h1 className="font-weight-bolder text-center">
                                                    TSA
                                                </h1>
                                            </Card.Title>

                                            <Card.Text>
                                                <div className="text-center font-weight-bolder">
                                                    Talent Scouting Academy
                                                </div>
                                            </Card.Text>

                                        </Card.Body>
                                    :
                                        <Card.Body>

                                            <Card.Title>
                                                <h1 className="font-weight-bolder text-muted text-center">
                                                    TSA
                                                </h1>
                                            </Card.Title>

                                            <Card.Text>
                                                <div className="text-center text-muted font-weight-bolder">
                                                    Talent Scouting Academy
                                                </div>
                                            </Card.Text>

                                        </Card.Body>
                                }

                                {
                                    indexTab === 6 ?
                                        <div className="bg-primary" style={{height:"10px"}}>

                                        </div>
                                    :
                                        <div className="bg-gray" style={{height:"10px"}}>

                                        </div>
                                }
                            </Card>
                        </Link>

                        <Link href="#TSA">
                            <Card style={{ width: '15rem', height:"15rem", cursor:"pointer" }} onClick={() => handleActive("TSA", 6)}>
                                {   
                                    indexTab === 6 ?
                                        <Card.Body>

                                            <Card.Title>
                                                <h1 className="font-weight-bolder text-center">
                                                    TSA
                                                </h1>
                                            </Card.Title>

                                            <Card.Text>
                                                <div className="text-center font-weight-bolder">
                                                    Talent Scouting Academy
                                                </div>
                                            </Card.Text>

                                        </Card.Body>
                                    :
                                        <Card.Body>

                                            <Card.Title>
                                                <h1 className="font-weight-bolder text-muted text-center">
                                                    TSA
                                                </h1>
                                            </Card.Title>

                                            <Card.Text>
                                                <div className="text-center text-muted font-weight-bolder">
                                                    Talent Scouting Academy
                                                </div>
                                            </Card.Text>

                                        </Card.Body>
                                }

                                {
                                    indexTab === 6 ?
                                        <div className="bg-primary" style={{height:"10px"}}>

                                        </div>
                                    :
                                        <div className="bg-gray" style={{height:"10px"}}>

                                        </div>
                                }
                            </Card>
                        </Link>
                        
                    </Carousel>
                </div> */}

                <div className="mb-3">
                    <Carousel
                    indicators={false}
                    nextIcon={false} 
                    nextLabel={false} 
                    prevIcon={false} 
                    prevLabel={false}
                    interval={1000}
                    >   
                        <Carousel.Item>
                            <div className="row d-flex justify-content-center">
                                <Link href="#VSGA">
                                    <Card style={{ width: '14rem', height:"15rem", cursor:"pointer" }} onClick={() => handleActive("VSGA", 0)}>
                                        {
                                            indexTab === 0 ?
                                                <Card.Body>

                                                    <Card.Title>
                                                        <h1 className="font-weight-bolder text-center">
                                                            VSGA
                                                        </h1>
                                                    </Card.Title>

                                                    <Card.Text>
                                                        <div className="text-center font-weight-bolder">
                                                            Vocational School Graduate Academy
                                                        </div>
                                                    </Card.Text>

                                                </Card.Body>
                                            :
                                                <Card.Body>

                                                    <Card.Title>
                                                        <h1 className="font-weight-bolder text-muted text-center">
                                                            VSGA
                                                        </h1>
                                                    </Card.Title>

                                                    <Card.Text>
                                                        <div className="text-center text-muted font-weight-bolder">
                                                            Vocational School Graduate Academy
                                                        </div>
                                                    </Card.Text>

                                                </Card.Body>
                                        }
                                        

                                        {
                                            indexTab === 0 ?
                                                <div className="bg-primary" style={{height:"10px"}}>

                                                </div>
                                            :
                                                <div className="bg-gray" style={{height:"10px"}}>

                                                </div>
                                        }
                                        
                                    </Card>
                                </Link>
                                

                                
                                <Link href="#FGA">
                                    <Card style={{ width: '14rem', height:"15rem", cursor:"pointer" }}  onClick={() => handleActive("FGA", 1)}>
                                    {
                                            indexTab === 1 ?
                                                <Card.Body>

                                                    <Card.Title>
                                                        <h1 className="font-weight-bolder text-center">
                                                            FGA
                                                        </h1>
                                                    </Card.Title>

                                                    <Card.Text>
                                                        <div className="text-center font-weight-bolder">
                                                            Fresh Graduate Academy
                                                        </div>
                                                    </Card.Text>

                                                </Card.Body>
                                            :
                                                <Card.Body>

                                                    <Card.Title>
                                                        <h1 className="font-weight-bolder text-muted text-center">
                                                            FGA
                                                        </h1>
                                                    </Card.Title>

                                                    <Card.Text>
                                                        <div className="text-center text-muted font-weight-bolder">
                                                            Fresh Graduate Academy
                                                        </div>
                                                    </Card.Text>

                                                </Card.Body>
                                        }

                                        {
                                            indexTab === 1 ?
                                                <div className="bg-primary" style={{height:"10px"}}>

                                                </div>
                                            :
                                                <div className="bg-gray" style={{height:"10px"}}>

                                                </div>
                                        }
                                    </Card>
                                </Link>

                                
                                <Link href="#PRO">
                                    <Card style={{ width: '14rem', height:"15rem", cursor:"pointer" }} onClick={() => handleActive("PRO", 2)}>
                                        {
                                            indexTab === 2 ?
                                                <Card.Body>

                                                    <Card.Title>
                                                        <h1 className="font-weight-bolder text-center">
                                                            PRO
                                                        </h1>
                                                    </Card.Title>

                                                    <Card.Text>
                                                        <div className="text-center font-weight-bolder">
                                                            Professional Academy
                                                        </div>
                                                    </Card.Text>

                                                </Card.Body>
                                            :
                                                <Card.Body>

                                                    <Card.Title>
                                                        <h1 className="font-weight-bolder text-muted text-center">
                                                            PRO
                                                        </h1>
                                                    </Card.Title>

                                                    <Card.Text>
                                                        <div className="text-center text-muted font-weight-bolder">
                                                            Professional Academy
                                                        </div>
                                                    </Card.Text>

                                                </Card.Body>
                                        }

                                        {
                                            indexTab === 2 ?
                                                <div className="bg-primary" style={{height:"10px"}}>

                                                </div>
                                            :
                                                <div className="bg-gray" style={{height:"10px"}}>

                                                </div>
                                        }
                                    </Card>
                                </Link>

                                
                                <Link href="#TA">
                                    <Card style={{ width: '14rem', height:"15rem", cursor:"pointer" }}  onClick={() => handleActive("TA",3)}>
                                        {
                                            indexTab === 3 ?
                                                <Card.Body>

                                                    <Card.Title>
                                                        <h1 className="font-weight-bolder text-center">
                                                            TA
                                                        </h1>
                                                    </Card.Title>

                                                    <Card.Text>
                                                        <div className="text-center font-weight-bolder">
                                                            Thematic Academy
                                                        </div>
                                                    </Card.Text>

                                                </Card.Body>
                                            :
                                                <Card.Body>

                                                    <Card.Title>
                                                        <h1 className="font-weight-bolder text-muted text-center">
                                                            TA
                                                        </h1>
                                                    </Card.Title>

                                                    <Card.Text>
                                                        <div className="text-center text-muted font-weight-bolder">
                                                            Thematic Academy
                                                        </div>
                                                    </Card.Text>

                                                </Card.Body>
                                        }

                                        {
                                            indexTab === 3 ?
                                                <div className="bg-primary" style={{height:"10px"}}>

                                                </div>
                                            :
                                                <div className="bg-gray" style={{height:"10px"}}>

                                                </div>
                                        }
                                    </Card>
                                </Link>
                                
                                <Link href="#GTA">
                                    <Card style={{ width: '14rem', height:"15rem", cursor:"pointer" }} onClick={() => handleActive("GTA",4)}>
                                        {
                                            indexTab === 4 ?
                                                <Card.Body>

                                                    <Card.Title>
                                                        <h1 className="font-weight-bolder text-center">
                                                            GTA
                                                        </h1>
                                                    </Card.Title>

                                                    <Card.Text>
                                                        <div className="text-center font-weight-bolder">
                                                            Government Transformation Academy
                                                        </div>
                                                    </Card.Text>

                                                </Card.Body>
                                            :
                                                <Card.Body>

                                                    <Card.Title>
                                                        <h1 className="font-weight-bolder text-muted text-center">
                                                            GTA
                                                        </h1>
                                                    </Card.Title>

                                                    <Card.Text>
                                                        <div className="text-center text-muted font-weight-bolder">
                                                            Government Transformation Academy
                                                        </div>
                                                    </Card.Text>

                                                </Card.Body>
                                        }

                                        {
                                            indexTab === 4 ?
                                                <div className="bg-primary" style={{height:"10px"}}>

                                                </div>
                                            :
                                                <div className="bg-gray" style={{height:"10px"}}>

                                                </div>
                                        }
                                    </Card>
                                </Link>

                                <Link href="#DEA">
                                    <Card style={{ width: '14rem', height:"15rem", cursor:"pointer" }} onClick={() => handleActive("DEA", 5)}>
                                        {
                                            indexTab === 5 ?
                                                <Card.Body>

                                                    <Card.Title>
                                                        <h1 className="font-weight-bolder text-center">
                                                            DEA
                                                        </h1>
                                                    </Card.Title>

                                                    <Card.Text>
                                                        <div className="text-center font-weight-bolder">
                                                            Digital Entrepeneurship Academy
                                                        </div>
                                                    </Card.Text>

                                                </Card.Body>
                                            :
                                                <Card.Body>

                                                    <Card.Title>
                                                        <h1 className="font-weight-bolder text-muted text-center">
                                                            DEA
                                                        </h1>
                                                    </Card.Title>

                                                    <Card.Text>
                                                        <div className="text-center text-muted font-weight-bolder">
                                                            Digital Entrepeneurship Academy
                                                        </div>
                                                    </Card.Text>

                                                </Card.Body>
                                        }

                                        {
                                            indexTab === 5 ?
                                                <div className="bg-primary" style={{height:"10px"}}>

                                                </div>
                                            :
                                                <div className="bg-gray" style={{height:"10px"}}>

                                                </div>
                                        }
                                    </Card>
                                </Link>

                                <Link href="#TSA">
                                    <Card style={{ width: '14rem', height:"15rem", cursor:"pointer" }} onClick={() => handleActive("TSA", 6)}>
                                        {   
                                            indexTab === 6 ?
                                                <Card.Body>

                                                    <Card.Title>
                                                        <h1 className="font-weight-bolder text-center">
                                                            TSA
                                                        </h1>
                                                    </Card.Title>

                                                    <Card.Text>
                                                        <div className="text-center font-weight-bolder">
                                                            Talent Scouting Academy
                                                        </div>
                                                    </Card.Text>

                                                </Card.Body>
                                            :
                                                <Card.Body>

                                                    <Card.Title>
                                                        <h1 className="font-weight-bolder text-muted text-center">
                                                            TSA
                                                        </h1>
                                                    </Card.Title>

                                                    <Card.Text>
                                                        <div className="text-center text-muted font-weight-bolder">
                                                            Talent Scouting Academy
                                                        </div>
                                                    </Card.Text>

                                                </Card.Body>
                                        }

                                        {
                                            indexTab === 6 ?
                                                <div className="bg-primary" style={{height:"10px"}}>

                                                </div>
                                            :
                                                <div className="bg-gray" style={{height:"10px"}}>

                                                </div>
                                        }
                                    </Card>
                                </Link>
                            </div>
                        </Carousel.Item>
                        {/* <Carousel.Item>
                            <div className="row">
                                <Link href="#TSA">
                                    <Card style={{ width: '15rem', height:"15rem", cursor:"pointer" }} onClick={() => handleActive("TSA", 6)}>
                                        {   
                                            indexTab === 6 ?
                                                <Card.Body>

                                                    <Card.Title>
                                                        <h1 className="font-weight-bolder text-center">
                                                            TSA
                                                        </h1>
                                                    </Card.Title>

                                                    <Card.Text>
                                                        <div className="text-center font-weight-bolder">
                                                            Talent Scouting Academy
                                                        </div>
                                                    </Card.Text>

                                                </Card.Body>
                                            :
                                                <Card.Body>

                                                    <Card.Title>
                                                        <h1 className="font-weight-bolder text-muted text-center">
                                                            TSA
                                                        </h1>
                                                    </Card.Title>

                                                    <Card.Text>
                                                        <div className="text-center text-muted font-weight-bolder">
                                                            Talent Scouting Academy
                                                        </div>
                                                    </Card.Text>

                                                </Card.Body>
                                        }

                                        {
                                            indexTab === 6 ?
                                                <div className="bg-primary" style={{height:"10px"}}>

                                                </div>
                                            :
                                                <div className="bg-gray" style={{height:"10px"}}>

                                                </div>
                                        }
                                    </Card>
                                </Link>
                            </div>

                        </Carousel.Item> */}
                    </Carousel>
                </div>


                {/* Carousel Training  */}
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
                    <Carousel
                        indicators={false}
                    >
                    <Carousel.Item>
                            <div className="row d-flex justify-content-around">

                                <Card   
                                    style={{ width: '35rem', height:"35rem", cursor:"pointer"}} 
                                    onMouseOver={handleMouseOver}         
                                    onMouseOut={handleMouseOut}
                                >
                                    <div className='p-3'>
                                        <Card.Img variant="top" src={`/assets/media/image_28.svg`} />
                                    </div>
                                    

                                    <div className="ml-3 p-1" style={{marginTop:"-35px"}}> 
                                        <Image 
                                            src={`/assets/media/Frame_6523.svg`}
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                    
                                    <Card.Body>
                                        <div className="text-right text-muted mb-2">
                                            05 Juli 2021 - 31 Juli 2021
                                        </div>

                                        <Card.Title>
                                            Intermediate Multimedia Designer
                                        </Card.Title>

                                        <div className="text-muted mb-3">
                                            Gojek
                                        </div>

                                        {
                                            show === false && showDetail === false?
                                                <div className="row" id="tag-view">
                                                    <div className="col-3 text-left d-flex flex-row">
                                                        <button className="btn btn-light rounded">
                                                            <div className="text-success">
                                                                Open
                                                            </div>
                                                        </button>
                                                    </div>
                                                    
                                                    <div className="col-6 text-right d-flex flex-row">
                                                        <button className="btn btn-light rounded ml-5 d-flex flex-row">
                                                            <i className="ri-parent-line mr-2 text-info"></i>
                                                            <span className="text-gray">
                                                                1000
                                                            </span>
                                                        </button>

                                                        <button className="btn btn-light rounded ml-1 d-flex flex-row">
                                                            <i className="ri-heart-line mr-2 text-info"></i>
                                                            <span className="text-gray">
                                                                Wishlist
                                                            </span>
                                                        </button>

                                                        <button className="btn btn-light rounded ml-1 d-flex flex-row">
                                                            <i className="ri-share-fill mr-2 text-info"></i>
                                                            <span className="text-gray">
                                                                Share
                                                            </span>
                                                        </button>
                                                    </div>

                                                </div>
                                            :
                                                <div>
                                                    <button 
                                                        className="btn btn-primary-rounded-full rounded-pill btn-block" 
                                                        onClick={() => setShowDetail(true)
                                                    }>
                                                        Quick View
                                                    </button>
                                                </div>
                                        }

                                        

                                    </Card.Body>

                                </Card>
                            </div>
                            

                        </Carousel.Item>

                    </Carousel>

                    {
                        showDetail === true ?
                            <div className="d-flex justify-content-center my-5">
                                <Card className="col-10">
                                    
                                    <div className="row">
                                        <div className="col-6">
                                            {/* <Card.Img src={`/assets/media/image_28.svg`} /> */}
                                            <Image 
                                                src={`/assets/media/image_28.svg`}
                                                layout="fill"
                                                className="p-5 ml-3"
                                            />

                                        </div>
                                        <div className="col-6">
                                            <div className="text-right">
                                                <button className="btn" onClick={() => setShowDetail(false)}>
                                                    <i className="ri-close-line"></i>
                                                </button>
                                            </div>
                                            <Card.Body>
                                                <div className="row">
                                                    <Image 
                                                        src={`/assets/media/Frame_6523.svg`}
                                                        width={50}
                                                        height={50}
                                                        className="mr-3"
                                                    />

                                                    <Card.Title className="pt-4">
                                                        Intermediate Multimedia Designer
                                                    </Card.Title>
                                                </div>

                                                <div className="row d-flex justify-content-between">
                                                    <div className="text-muted ml-3">
                                                        Gojek
                                                    </div>
                                                    <div className="text-muted">
                                                        05 Juli 21 - 31 Juli 21
                                                    </div>
                                                </div>
                                                
                                                <Card.Text className="my-5">
                                                    Intermediate Multimedia Designer merupakan salah satu skema pelatihan dalam Pelatihan Intensif dan Sertifikasi (Daring) yang berbasis Standar Kompetensi Kerja ...
                                                </Card.Text>
                                                
                                                <div className="row my-5">
                                                    <div className="col-4 text-left d-flex flex-row">
                                                        <button className="btn btn-light rounded">
                                                            <div className="text-success">
                                                                Open
                                                            </div>
                                                        </button>
                                                    </div>
                                                    
                                                    <div className="col-6 text-right d-flex flex-row">
                                                        <button className="btn btn-light rounded ml-5 d-flex flex-row">
                                                            <i className="ri-parent-line mr-2 text-info"></i>
                                                            <span className="text-gray">
                                                                1000
                                                            </span>
                                                        </button>

                                                        <button className="btn btn-light rounded ml-1 d-flex flex-row">
                                                            <i className="ri-heart-line mr-2 text-info"></i>
                                                            <span className="text-gray">
                                                                Wishlist
                                                            </span>
                                                        </button>

                                                        <button className="btn btn-light rounded ml-1 d-flex flex-row">
                                                            <i className="ri-share-fill mr-2 text-info"></i>
                                                            <span className="text-gray">
                                                                Share
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>

                                                <Link href="/detail/kategori/id">
                                                    <button className="btn btn-primary-rounded-full btn-block">
                                                        Daftar Pelatihan
                                                    </button>
                                                </Link>
                                            </Card.Body>
                                        </div>

                                    </div>
                                    
                                    
                                </Card>
                        </div>
                            
                        :
                            null
                    }
                    
                </div>

                {/* H-Banner 01*/}
                <Image 
                    src={`/assets/media/Tahapan-Pendaftaran-2.svg`}
                    width={1500}
                    height={580}
                    className="my-5"
                />

                {/* H-Banner 02*/}
                <div className="my-5">
                    <div className="d-flex justify-content-between">
                        <h1 className="text-left font-weight-bolder ml-5">
                            Rilis Media dan Informasi
                        </h1>
                        <div>
                            <Link href="#home">
                                <a className="text-primary d-flex alignment-content-center font-weight-bolder">
                                    <div className="pt-1" style={{color:"#215480"}}> 
                                        Lihat Semua
                                    </div>
                                    <i className="ri-arrow-right-s-line " style={{color:"#215480"}}></i>
                                </a>
                            </Link>
                        </div>
                    </div>
                    

                    {/* Card */}
                    <div className="d-flex justify-content-around my-5">

                        <Card style={{ width: '30rem' }}>
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

                            </Card.Body>

                            <Card.Footer className="bg-primary">
                                <Link href="#home">
                                    <a className="text-white d-flex alignment-content-center justify-content-between">
                                        <div className="pt-1 font-weight-bolder"> 
                                            Lihat Detail
                                        </div>
                                        <i className="ri-arrow-right-line text-white ml-2 font-weight-bolder"></i>
                                    </a>
                                </Link>
                            </Card.Footer>
                        </Card>

                        <Card style={{ width: '30rem' }}>
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
                            </Card.Body>
                            <Card.Footer className="bg-primary">
                                <Link href="#home">
                                    <a className="text-white d-flex alignment-content-center justify-content-between">
                                        <div className="pt-1 font-weight-bolder"> 
                                            Lihat Detail
                                        </div>
                                        <i className="ri-arrow-right-line text-white ml-2 font-weight-bolder"></i>
                                    </a>
                                </Link>
                            </Card.Footer>
                        </Card>

                        <Card style={{ width: '30rem' }}>
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
                            </Card.Body>
                            <Card.Footer className="bg-primary">
                                <Link href="#home">
                                    <a className="text-white d-flex alignment-content-center justify-content-between">
                                        <div className="pt-1 font-weight-bolder"> 
                                            Lihat Detail
                                        </div>
                                        <i className="ri-arrow-right-line text-white ml-2 font-weight-bolder"></i>
                                    </a>
                                </Link>
                            </Card.Footer>
                        </Card>



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