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
import AkademiCarousel from "../../components/AkademiCarousel";
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
        handleAkademiCarousel()
    }, [])

    const handleDragStart = (e) => e.preventDefault();

    const handleAkademiCarousel = () => {
        let arr = []

        if (akademi.length !== 0) {
            for (let i = 0; i < akademi.length; i+= 3){
                arr.push (akademi.slice (i, i + 3))
            }
        }

        console.log (arr)
    }

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
        // console.log (arrPelatihan)
    }

    const handleMouseEnter = (index) =>{
        let obj = show

        for (let i = 0; i < obj.length; i++){
            if (i == index){
                obj[i].showButton = true
            }
        }

        setShow(obj)
        // console.log ("mouseOver")
    }

    const handleMouseLeave = (index) =>{
        let obj = show

        for (let i = 0; i < obj.length; i++){
            if (i == index){
                obj[i].showButton = false
            }
        }
        setShow(obj)
        // console.log ("mouseOut")
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

                {
                    console.log (showDetail)
                }

                <Navigationbar />

                <ImagetronCarousel />

                {/* Akademi */}
                <div className="mb-3">
                <Carousel
                    indicators={false}
                >
                    <Carousel.Item>
                        <div className="row d-flex justify-content-around"> 
                            <div className="bg-secondary">
                                Item1
                            </div>
                            <div className="bg-secondary">
                                Item2
                            </div>
                            <div className="bg-secondary">
                                Item3
                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="row d-flex justify-content-around"> 
                            <div className="bg-secondary">
                                Item4
                            </div>
                            <div className="bg-secondary">
                                Item5
                            </div>
                            <div className="bg-secondary">
                                Item6
                            </div>
                        </div>
                    </Carousel.Item>
                </Carousel>
                </div>
                    
                {/* Tema-1 */}
                <div className="my-5">
                    
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