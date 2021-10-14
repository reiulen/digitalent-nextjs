import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";

import { 
    Nav, 
    Button,
    Card,
    Carousel,
    Badge
} from "react-bootstrap";

import Slider from "react-slick";
import AliceCarousel from 'react-alice-carousel';


import CarouselMulti from "react-multi-carousel";

import ImagetronCarousel from "../../components/ImagetronCarousel";
import Footer from "../../../components/templates/footer.component"
import BerandaWrapper from "../../../components/wrapper/beranda.wrapper";

import "../../../styles/beranda.module.css"
import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-alice-carousel/lib/alice-carousel.css';

const Navigationbar = dynamic(() => import("../../../components/templates/navbar.component"), {
    ssr: false,
  });

const Beranda = () => {
    const {
        akademi,
    } = useSelector((state) => state.allAkademi);

    const {
        tema,
    } = useSelector((state) => state.temaByAkademi);

    const {
        pelatihan,
    } = useSelector((state) => state.pelatihanByTema);

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };
    
    const [activeTab, setActiveTab] = useState ("VSGA")
    const [indexTab, setIndexTab] = useState (0)
    const [show,setShow] = useState(false)
    const [showDetail, setShowDetail] = useState(false)
    // const [akademiItem, setAkademiItem] = useState (akademi)

    useEffect(() => {
        handleIndexShow ()
    }, [tema])

    const handleDragStart = (e) => e.preventDefault();

    const handleIndexShow = () => {
        let arrPelatihan = []

        if (pelatihan.length !== 0){
            for (let i = 0; i < pelatihan.length; i++){
                let obj = {
                    id: pelatihan[i].id,
                    name: pelatihan[i].name,
                    showButton: false,
                    showDetail: false
                }
                arrPelatihan.push (obj)
            }
        }

        setShow (arrPelatihan)
        console.log (arrPelatihan)

        // if (tema.length !== 0 && pelatihan.length !== 0) {
        //     for (let i = 0; i < tema.length; i++) {
        //         let obj = 
        //         { 
        //             name: tema[i].Name,
        //         }

        //         let arrShow = []
        //         let arrShowDetail = []

        //         for (let j = 0; j < pelatihan.length; j++){
        //             arrShow.push (false)
        //             arrShowDetail.push (false)
        //         }
        //         // console.log (arrShow)
        //         obj.shows = arrShow
        //         obj.showDetails = arrShowDetail
        //         arrTema.push (obj)
        //     }

        //     console.log (arrTema)
        //     setShow (arrTema)
        //     // setShowDetail (arrTema)
        // }

        
    }

    const handleMouseEnter = (index) =>{
        // console.log (index)
        // console.log (index2)
        let obj = show

        for (let i = 0; i < obj.length; i++){
            if (i == index){
                obj[i].showButton = true
            }
        }


        // for (let i = 0; i < obj.length; i++){

        //     if ( i == index1){
        //         for (let j = 0; j < obj[i].shows.length; j++){
        //             if (j == index2){
        //                 obj[i].shows[j] = true
        //             }
        //         }
        //     }
        // }

        setShow(obj)
        // // setShow(true)

        // console.log (obj)
        console.log ("mouseOver")
    }

    const handleMouseLeave = (index) =>{
        // console.log (index1)
        // console.log (index2)
        let obj = show

        for (let i = 0; i < obj.length; i++){
            if (i == index){
                obj[i].showButton = false
            }
        }

        // for (let i = 0; i < obj.length; i++){

        //     if ( i == index1){
        //         for (let j = 0; j < obj[i].shows.length; j++){
        //             if (j == index2){
        //                 obj[i].shows[j] = false
        //             }
        //         }
        //     }
            
        // }
        setShow(obj)
        // console.log (obj)

        // setShow(false)
        console.log ("mouseOut")
    }
    
    const handleActive = (tab, index) => {
        setActiveTab (tab)
        setIndexTab (index)
    }

    const handleQuickView = () => {
        setShowDetail (true)
        // console.log ("open")
    }

    const handleCloseQuickView = () => {
        setShowDetail (false)
        // console.log ("close")
    }

    return (
        <BerandaWrapper title= "Digitalent">
            <div className="bg-white">
                {
                    console.log (akademi)
                }

                {
                    console.log (tema)
                }

                {
                    console.log (pelatihan)
                }

                {
                    console.log (show)
                }

                {/* {
                    console.log (`showDetail: ${showDetail}`)
                } */}

                <Navigationbar />

                <ImagetronCarousel />

                {/* Akademi */}
                <div className="mb-3 row d-flex justify-content-center">
                    {
                        akademi ?
                            // <Slider
                            //     dots= {false}
                            //     infinite= {false}
                            //     speed= {500}
                            //     slidesToShow= {4}
                            //     slidesToScroll= {1}
                            //     arrows= {false}
                            //     swipeToSlide= {true}
                            // >
                            //     {
                            //         akademi.map ((el, i) => {
                            //             return (
                            //                 <Link href="#" key={i}>
                            //                     <Card style={{ width: '23rem', height:"7rem", cursor:"pointer" }} onClick={() => handleActive(el.slug, i)}>
                            //                         {
                            //                             indexTab === i ?
                            //                                 <Card.Body className="row bg-secondary rounded">

                            //                                     <div className="col-5">
                            //                                         <div>
                            //                                             <h1 className="font-weight-bolder text-white">
                            //                                                 {el.slug}
                            //                                             </h1>
                            //                                         </div>
                            //                                     </div>
                                                                
                            //                                     <div className="col-7" style={{marginTop: "-2vh"}}>
                            //                                         <div>
                            //                                             <div className=" font-weight-bolder text-white ">
                            //                                                 {el.name}
                            //                                             </div>
                            //                                         </div>
                            //                                     </div>

                            //                                 </Card.Body>
                            //                             :
                            //                                 <Card.Body className="row rounded">

                            //                                     <div className="col-5">
                            //                                         <div>
                            //                                             <h1 className="font-weight-bolder">
                            //                                                 {el.slug}
                            //                                             </h1>
                            //                                         </div>
                            //                                     </div>
                                                                
                            //                                     <div className="col-7" style={{marginTop: "-2vh"}}>
                            //                                         <div>
                            //                                             <div className=" font-weight-bolder ">
                            //                                                 {el.name}
                            //                                             </div>
                            //                                         </div>
                            //                                     </div>

                            //                                 </Card.Body>
                            //                         }
                                                    
                            //                     </Card>
                            //                 </Link>
                            //             )
                            //         })
                            //     }

                            // </Slider>

                            <Carousel
                                indicators={false}
                                // indicators={true}
                                nextIcon={false} 
                                nextLabel={false} 
                                prevIcon={false} 
                                prevLabel={false} 
                                interval={null}
                                // className="classes.my__carousel_main"
                            >
                                {/* {
                                //     akademi.map ((el, i) => {
                                //         return (
                                //             <Carousel.Item key={i}>
                                //                 <Link href="#">
                                //                     <Card style={{ width: '23rem', height:"7rem", cursor:"pointer" }} onClick={() => handleActive(akademi[i].slug, i)} className="rounded">
                                //                         {
                                //                             indexTab === i ?
                                //                                 <Card.Body className="row bg-secondary rounded">

                                //                                     <div className="col-5">
                                //                                         <div>
                                //                                             <h1 className="font-weight-bolder text-white">
                                //                                                 {akademi[i].slug}
                                //                                             </h1>
                                //                                         </div>
                                //                                     </div>
                                                                    
                                //                                     <div className="col-7" style={{marginTop: "-2vh"}}>
                                //                                         <div>
                                //                                             <div className=" font-weight-bolder text-white ">
                                //                                                 {akademi[i].name}
                                //                                             </div>
                                //                                         </div>
                                //                                     </div>

                                //                                 </Card.Body>
                                //                             :
                                //                                 <Card.Body className="row rounded">

                                //                                     <div className="col-5">
                                //                                         <div>
                                //                                             <h1 className="font-weight-bolder">
                                //                                                 {akademi[i].slug}
                                //                                             </h1>
                                //                                         </div>
                                //                                     </div>
                                                                    
                                //                                     <div className="col-7" style={{marginTop: "-2vh"}}>
                                //                                         <div>
                                //                                             <div className=" font-weight-bolder ">
                                //                                                 {akademi[i].name}
                                //                                             </div>
                                //                                         </div>
                                //                                     </div>

                                //                                 </Card.Body>
                                //                         }
                                                        
                                //                     </Card>
                                //                 </Link>
                                                
                                //             </Carousel.Item>
                                //         )
                                //     })
                                } */}
                                <Carousel.Item>
                                    <div className="col-12 d-flex flex-row justify-content-around">
                                        <Link href="#">
                                            <Card style={{ width: '23rem', height:"7rem", cursor:"pointer" }} onClick={() => handleActive(akademi[0].slug, 0)} className="mx-5">
                                                {
                                                    indexTab === 0 ?
                                                        <Card.Body className="row bg-secondary rounded">

                                                            <div className="col-5">
                                                                <div>
                                                                    <h1 className="font-weight-bolder text-white">
                                                                        {akademi[0].slug}
                                                                    </h1>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-7" style={{marginTop: "-2vh"}}>
                                                                <div>
                                                                    <div className=" font-weight-bolder text-white ">
                                                                        {akademi[0].name}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </Card.Body>
                                                    :
                                                        <Card.Body className="row rounded">

                                                            <div className="col-5">
                                                                <div>
                                                                    <h1 className="font-weight-bolder">
                                                                        {akademi[0].slug}
                                                                    </h1>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-7" style={{marginTop: "-2vh"}}>
                                                                <div>
                                                                    <div className=" font-weight-bolder ">
                                                                        {akademi[0].name}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </Card.Body>
                                                }
                                                
                                            </Card>
                                        </Link>

                                        <Link href="#">
                                            <Card style={{ width: '23rem', height:"7rem", cursor:"pointer" }} onClick={() => handleActive(akademi[1].slug, 1)} className="mx-5">
                                                {
                                                    indexTab === 1 ?
                                                        <Card.Body className="row bg-secondary rounded">

                                                            <div className="col-5">
                                                                <div>
                                                                    <h1 className="font-weight-bolder text-white">
                                                                        {akademi[1].slug}
                                                                    </h1>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-7" style={{marginTop: "-2vh"}}>
                                                                <div>
                                                                    <div className=" font-weight-bolder text-white ">
                                                                        {akademi[1].name}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </Card.Body>
                                                    :
                                                        <Card.Body className="row rounded">

                                                            <div className="col-5">
                                                                <div>
                                                                    <h1 className="font-weight-bolder">
                                                                        {akademi[1].slug}
                                                                    </h1>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-7" style={{marginTop: "-2vh"}}>
                                                                <div>
                                                                    <div className=" font-weight-bolder ">
                                                                        {akademi[1].name}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </Card.Body>
                                                }
                                                
                                            </Card>
                                        </Link>

                                        <Link href="#">
                                            <Card style={{ width: '23rem', height:"7rem", cursor:"pointer" }} onClick={() => handleActive(akademi[2].slug, 2)} className="mx-5">
                                                {
                                                    indexTab === 2 ?
                                                        <Card.Body className="row bg-secondary rounded">

                                                            <div className="col-5">
                                                                <div>
                                                                    <h1 className="font-weight-bolder text-white">
                                                                        {akademi[2].slug}
                                                                    </h1>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-7" style={{marginTop: "-2vh"}}>
                                                                <div>
                                                                    <div className=" font-weight-bolder text-white ">
                                                                        {akademi[2].name}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </Card.Body>
                                                    :
                                                        <Card.Body className="row rounded">

                                                            <div className="col-5">
                                                                <div>
                                                                    <h1 className="font-weight-bolder">
                                                                        {akademi[2].slug}
                                                                    </h1>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-7" style={{marginTop: "-2vh"}}>
                                                                <div>
                                                                    <div className=" font-weight-bolder ">
                                                                        {akademi[2].name}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </Card.Body>
                                                }
                                                
                                            </Card>
                                        </Link>

                                        <Link href="#">
                                            <Card style={{ width: '23rem', height:"7rem", cursor:"pointer" }} onClick={() => handleActive(akademi[3].slug, 3)} className="mx-5">
                                                {
                                                    indexTab === 3 ?
                                                        <Card.Body className="row bg-secondary rounded">

                                                            <div className="col-5">
                                                                <div>
                                                                    <h1 className="font-weight-bolder text-white">
                                                                        {akademi[3].slug}
                                                                    </h1>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-7" style={{marginTop: "-2vh"}}>
                                                                <div>
                                                                    <div className=" font-weight-bolder text-white ">
                                                                        {akademi[3].name}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </Card.Body>
                                                    :
                                                        <Card.Body className="row rounded">

                                                            <div className="col-5">
                                                                <div>
                                                                    <h1 className="font-weight-bolder">
                                                                        {akademi[3].slug}
                                                                    </h1>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-7" style={{marginTop: "-2vh"}}>
                                                                <div>
                                                                    <div className=" font-weight-bolder ">
                                                                        {akademi[3].name}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </Card.Body>
                                                }
                                                
                                            </Card>
                                        </Link>
                                    </div>
                                </Carousel.Item>

                                <Carousel.Item>
                                    <div className="col-12 d-flex flex-row justify-content-around">
                                        <Link href="#">
                                            <Card style={{ width: '23rem', height:"7rem", cursor:"pointer" }} onClick={() => handleActive(akademi[4].slug, 4)} className="mx-5">
                                                {
                                                    indexTab === 4 ?
                                                        <Card.Body className="row bg-secondary rounded">

                                                            <div className="col-5">
                                                                <div>
                                                                    <h1 className="font-weight-bolder text-white">
                                                                        {akademi[4].slug}
                                                                    </h1>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-7" style={{marginTop: "-2vh"}}>
                                                                <div>
                                                                    <div className=" font-weight-bolder text-white ">
                                                                        {akademi[4].name}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </Card.Body>
                                                    :
                                                        <Card.Body className="row rounded">

                                                            <div className="col-5">
                                                                <div>
                                                                    <h1 className="font-weight-bolder">
                                                                        {akademi[4].slug}
                                                                    </h1>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-7" style={{marginTop: "-2vh"}}>
                                                                <div>
                                                                    <div className=" font-weight-bolder ">
                                                                        {akademi[4].name}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </Card.Body>
                                                }
                                                
                                            </Card>
                                        </Link>

                                        <Link href="#">
                                            <Card style={{ width: '23rem', height:"7rem", cursor:"pointer" }} onClick={() => handleActive(akademi[5].slug, 5)} className="mx-5">
                                                {
                                                    indexTab === 5 ?
                                                        <Card.Body className="row bg-secondary rounded">

                                                            <div className="col-5">
                                                                <div>
                                                                    <h1 className="font-weight-bolder text-white">
                                                                        {akademi[5].slug}
                                                                    </h1>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-7" style={{marginTop: "-2vh"}}>
                                                                <div>
                                                                    <div className=" font-weight-bolder text-white ">
                                                                        {akademi[5].name}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </Card.Body>
                                                    :
                                                        <Card.Body className="row rounded">

                                                            <div className="col-5">
                                                                <div>
                                                                    <h1 className="font-weight-bolder">
                                                                        {akademi[5].slug}
                                                                    </h1>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-7" style={{marginTop: "-2vh"}}>
                                                                <div>
                                                                    <div className=" font-weight-bolder ">
                                                                        {akademi[5].name}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </Card.Body>
                                                }
                                                
                                            </Card>
                                        </Link>

                                        <Link href="#">
                                            <Card style={{ width: '23rem', height:"7rem", cursor:"pointer" }} onClick={() => handleActive(akademi[6].slug, 6)} className="mx-5">
                                                {
                                                    indexTab === 6 ?
                                                        <Card.Body className="row bg-secondary rounded">

                                                            <div className="col-5">
                                                                <div>
                                                                    <h1 className="font-weight-bolder text-white">
                                                                        {akademi[6].slug}
                                                                    </h1>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-7" style={{marginTop: "-2vh"}}>
                                                                <div>
                                                                    <div className=" font-weight-bolder text-white ">
                                                                        {akademi[6].name}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </Card.Body>
                                                    :
                                                        <Card.Body className="row rounded">

                                                            <div className="col-5">
                                                                <div>
                                                                    <h1 className="font-weight-bolder">
                                                                        {akademi[6].slug}
                                                                    </h1>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-7" style={{marginTop: "-2vh"}}>
                                                                <div>
                                                                    <div className=" font-weight-bolder ">
                                                                        {akademi[6].name}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </Card.Body>
                                                }
                                                
                                            </Card>
                                        </Link>

                                        <Link href="#">
                                            <Card style={{ width: '23rem', height:"7rem", cursor:"pointer" }} onClick={() => handleActive(akademi[7].slug, 7)} className="mx-5">
                                                {
                                                    indexTab === 7 ?
                                                        <Card.Body className="row bg-secondary rounded">

                                                            <div className="col-5">
                                                                <div>
                                                                    <h1 className="font-weight-bolder text-white">
                                                                        {akademi[7].slug}
                                                                    </h1>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-7" style={{marginTop: "-2vh"}}>
                                                                <div>
                                                                    <div className=" font-weight-bolder text-white ">
                                                                        {akademi[7].name}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </Card.Body>
                                                    :
                                                        <Card.Body className="row rounded">

                                                            <div className="col-5">
                                                                <div>
                                                                    <h1 className="font-weight-bolder">
                                                                        {akademi[7].slug}
                                                                    </h1>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-7" style={{marginTop: "-2vh"}}>
                                                                <div>
                                                                    <div className=" font-weight-bolder ">
                                                                        {akademi[7].name}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </Card.Body>
                                                }
                                                
                                            </Card>
                                        </Link>
                                    </div>
                                    
                                </Carousel.Item>

                            </Carousel>

                            // <AliceCarousel
                            //     infinite= "true"
                            // >
                            //     {
                            //         akademi.map ((el, i) => {
                            //             return (
                            //                 <Link href="#" key={i}>
                            //                     <Card style={{ width: '23rem', height:"7rem", cursor:"pointer" }} onClick={() => handleActive(el.slug, i)}>
                            //                         {
                            //                             indexTab === i ?
                            //                                 <Card.Body className="row bg-secondary rounded">

                            //                                     <div className="col-5">
                            //                                         <div>
                            //                                             <h1 className="font-weight-bolder text-white">
                            //                                                 {el.slug}
                            //                                             </h1>
                            //                                         </div>
                            //                                     </div>
                                                                
                            //                                     <div className="col-7" style={{marginTop: "-2vh"}}>
                            //                                         <div>
                            //                                             <div className=" font-weight-bolder text-white ">
                            //                                                 {el.name}
                            //                                             </div>
                            //                                         </div>
                            //                                     </div>

                            //                                 </Card.Body>
                            //                             :
                            //                                 <Card.Body className="row rounded">

                            //                                     <div className="col-5">
                            //                                         <div>
                            //                                             <h1 className="font-weight-bolder">
                            //                                                 {el.slug}
                            //                                             </h1>
                            //                                         </div>
                            //                                     </div>
                                                                
                            //                                     <div className="col-7" style={{marginTop: "-2vh"}}>
                            //                                         <div>
                            //                                             <div className=" font-weight-bolder ">
                            //                                                 {el.name}
                            //                                             </div>
                            //                                         </div>
                            //                                     </div>

                            //                                 </Card.Body>
                            //                         }
                                                    
                            //                     </Card>
                            //                 </Link>
                            //             )
                            //         })
                            //     }
                            // </AliceCarousel>

                            // <Carousel
                            //     swipeable={false}
                            //     draggable={false}
                            //     // showDots={true}
                            //     responsive={responsive}
                            //     // ssr={true} // means to render carousel on server-side.
                            //     // infinite={true}
                            //     autoPlaySpeed={1000}
                            //     keyBoardControl={true}
                            //     customTransition="all .5"
                            //     transitionDuration={500}
                            //     containerClass="carousel-container"
                            //     // removeArrowOnDeviceType={["tablet", "mobile"]}
                            //     // deviceType={this.props.deviceType}
                            //     // dotListClass="custom-dot-list-style"
                            //     // itemClass="carousel-item-padding-40-px"
                            // >
                            //     {
                            //         akademi.map ((el, i) => {
                            //             return (
                            //                 <Link href="#" key={i}>
                            //                     <Card style={{ width: '23rem', height:"7rem", cursor:"pointer" }} onClick={() => handleActive(el.slug, i)}>
                            //                         {
                            //                             indexTab === i ?
                            //                                 <Card.Body className="row bg-secondary rounded">

                            //                                     <div className="col-5">
                            //                                         <div>
                            //                                             <h1 className="font-weight-bolder text-white">
                            //                                                 {el.slug}
                            //                                             </h1>
                            //                                         </div>
                            //                                     </div>
                                                                
                            //                                     <div className="col-7" style={{marginTop: "-2vh"}}>
                            //                                         <div>
                            //                                             <div className=" font-weight-bolder text-white ">
                            //                                                 {el.name}
                            //                                             </div>
                            //                                         </div>
                            //                                     </div>

                            //                                 </Card.Body>
                            //                             :
                            //                                 <Card.Body className="row rounded">

                            //                                     <div className="col-5">
                            //                                         <div>
                            //                                             <h1 className="font-weight-bolder">
                            //                                                 {el.slug}
                            //                                             </h1>
                            //                                         </div>
                            //                                     </div>
                                                                
                            //                                     <div className="col-7" style={{marginTop: "-2vh"}}>
                            //                                         <div>
                            //                                             <div className=" font-weight-bolder ">
                            //                                                 {el.name}
                            //                                             </div>
                            //                                         </div>
                            //                                     </div>

                            //                                 </Card.Body>
                            //                         }
                                                    
                            //                     </Card>
                            //                 </Link>
                            //             )
                            //         })
                            //     }

                            // </Carousel>
                        :
                            <div>
                                Harap menunggu
                            </div>
                    }
                    
                </div>

                            {/* <CarouselMulti
                                swipeable={true}
                                draggable={true}
                                // showDots={true}
                                responsive={responsive}
                                // ssr={true} // means to render carousel on server-side.
                                infinite={false}
                                // autoPlaySpeed={1000}
                                autoPlay={false}
                                keyBoardControl={true}
                                customTransition="all .5"
                                transitionDuration={500}
                                containerClass="carousel-container"
                                // removeArrowOnDeviceType={["tablet", "mobile"]}
                                // deviceType={this.props.deviceType}
                                // dotListClass="custom-dot-list-style"
                                // itemClass="carousel-item-padding-40-px"
                            > */}
                                {/* {
                                    akademi.map ((el, i) => {
                                        return (
                                            <Link href="#" key={i}>
                                                <Card style={{ width: '23rem', height:"7rem", cursor:"pointer" }} onClick={() => handleActive(el.slug, i)}>
                                                    {
                                                        indexTab === i ?
                                                            <Card.Body className="row bg-secondary rounded">

                                                                <div className="col-5">
                                                                    <div>
                                                                        <h1 className="font-weight-bolder text-white">
                                                                            {el.slug}
                                                                        </h1>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="col-7" style={{marginTop: "-2vh"}}>
                                                                    <div>
                                                                        <div className=" font-weight-bolder text-white ">
                                                                            {el.name}
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </Card.Body>
                                                        :
                                                            <Card.Body className="row rounded">

                                                                <div className="col-5">
                                                                    <div>
                                                                        <h1 className="font-weight-bolder">
                                                                            {el.slug}
                                                                        </h1>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="col-7" style={{marginTop: "-2vh"}}>
                                                                    <div>
                                                                        <div className=" font-weight-bolder ">
                                                                            {el.name}
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </Card.Body>
                                                    }
                                                    
                                                </Card>
                                            </Link>
                                        )
                                    })
                                } */}
                                
                                {/* <div>
                                    1
                                </div>
                                <div>
                                    1
                                </div>
                                <div>
                                    1
                                </div>
                                <div>
                                    1
                                </div>
                                <div>
                                    1
                                </div> */}

                            {/* </CarouselMulti> */}
                
                {/* Tema-1 */}
                <div className="my-5">
                    {
                        tema.length !== 0 && pelatihan.length !== 0 && show.length !== 0 ?
                            tema.map ((el, i) => {
                                return (
                                    <> 
                                        <div className="d-flex justify-content-between" key={i}>
                                            <h1 className="text-left font-weight-bolder ml-5">
                                                {el.Name}
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
                                                                    // src={element.gambar}
                                                                    style={{marginTop:"-10vh"}}
                                                                />
                                                            </div>
                                                            <div className="col-8">
                                                                <Card.Body>
                                                                    <div className="row">
                                                                        <div className='col-1'>
                                                                            <Image 
                                                                                src={`/assets/media/gojek-logo.svg`}
                                                                                // src={element.gambar_mitra}
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
                                                    nextIcon={true} 
                                                    nextLabel={false} 
                                                    prevIcon={false} 
                                                    prevLabel={false} 
                                                    className="my-5"
                                                >
                                                    
                                                    <Carousel.Item>
                                                        <div className="row mx-3 d-flex justify-content-around flex-row">
                                                            {
                                                                pelatihan.map ((element, index) => {
                                                                    return (
                                                                        <Card   
                                                                            style={{ width: '35rem', height:"40rem", cursor: "pointer"}} 
                                                                            onMouseEnter={() => handleMouseEnter(index)}       
                                                                            onMouseLeave={() => handleMouseLeave(index)}
                                                                            className="shadow"
                                                                            key={i}
                                                                        >   

                                                                            <div className="row d-flex justify-content-between mt-3">
                                                                                <div className="d-flex flex-column col-6">
                                                                                    <Badge className="bg-secondary text-white col-6 mb-1">
                                                                                        Pelatihan {element.metode_pelatihan}
                                                                                    </Badge>
                                                                                    <Badge className="bg-success text-white col-3">
                                                                                        {element.status}
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
                                            
                                                                            <Card.Img 
                                                                                variant="top" 
                                                                                // src={`/assets/media/card-image.svg`} 
                                                                                src={`https://dts-beasiswa-dev.s3-ap-southeast-1.amazonaws.com/${element.gambar}`} 
                                                                                style={{marginTop:"-8vh"}}
                                                                            />

                                                                            <div className="col-2" style={{marginTop:"-4vh"}}>
                                                                                <Image 
                                                                                    // src={`https://dts-beasiswa-dev.s3-ap-southeast-1.amazonaws.com/${element.gambar_mitra}`}
                                                                                    src={`/assets/media/logo-dicoding.svg`}
                                                                                    className="rounded-circle bg-white p-1"
                                                                                    width={70}
                                                                                    height={70}
                                                                                />
                                                                            </div>
                                                                            
                                            
                                                                            <Card.Body style={{marginTop:"-5vh"}}>
                                                                                <Card.Title>
                                                                                    {element.name}
                                                                                </Card.Title>
                                            
                                                                                <div className="text-muted mb-3">
                                                                                    {element.mitra}
                                                                                </div>
                                            
                                                                                <div>
                                                                                    <i className="ri-time-line"></i>
                                                                                    <span className="ml-2">
                                                                                        Registrasi: {new Date (element.pendaftaran_mulai).toLocaleDateString("en-GB")} - {new Date (element.pendaftaran_selesai).toLocaleDateString("en-GB")}
                                                                                        {/* Registrasi: {new Date (element.pendaftaran_mulai)} - {new Date (element.pendaftaran_selesai)} */}
                                                                                    </span>
                                                                                </div>
                                                                                <div>
                                                                                    <i className="ri-group-line"></i>
                                                                                    <span className="ml-2">
                                                                                        Kuota: {element.kuota_peserta} peserta
                                                                                    </span>
                                                                                </div>
                                            
                                            
                                                                                {
                                                                                    show == true ?
                                                                                        
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
                                            
                                                                            </Card.Body>
                                            
                                                                        </Card>
                        
                                                                    )
                                                                    
                                                                })
                                                            }
                                                        </div>
                                                        
                                                    </Carousel.Item>
                                
                                                </Carousel>
                                        }
                                    </>
                                    
                                )
                            })

                            // <div className="d-flex justify-content-between">
                            //     <h1 className="text-left font-weight-bolder ml-5">
                            //         Multi Media Designer
                            //     </h1>
                            //     <div>
                            //         <Link href="/detail/akademi/id">
                            //             <a className="text-primary d-flex alignment-content-center font-weight-bolder">
                            //                 <div className="pt-1" style={{color:"#215480"}}> 
                            //                     Lihat Semua
                            //                 </div>
                            //                 <i className="ri-arrow-right-s-line " style={{color:"#215480"}}></i>
                            //             </a>
                            //         </Link>
                            //     </div>
                            // </div>
                        :   
                            <div>
                                Harap Menunggu
                            </div>
                    }
                    {/* <div className="d-flex justify-content-between">
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
                    </div> */}

                    {/* {
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
            
                                            </Card.Body>
            
                                        </Card>
            
                                    </div>
                                
                                </Carousel.Item>
            
                            </Carousel>
                    } */}
                    
                </div>

                {/* Tema-2 */}
                {/* <div className="my-5">
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
            
                                            </Card.Body>
            
                                        </Card>
            
                                    </div>
                                
                                </Carousel.Item>
            
                            </Carousel>
                    }
                    
                </div> */}

                {/* Tema-3 */}
                {/* <div className="my-5">
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
            
                                            </Card.Body>
            
                                        </Card>
            
                                    </div>
                                
                                </Carousel.Item>
            
                            </Carousel>
                    }
                    
                </div> */}

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