import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";

import { 
    Card,
    Carousel,
    Badge,
    Button
} from "react-bootstrap";

import ReactPlayer from 'react-player/youtube'

// import Slider from "react-slick";
// import CarouselMulti from "react-multi-carousel";

// import ImagetronCarousel from "../../components/ImagetronCarousel";
// import AkademiCarousel from "../../components/AkademiCarousel";
import Footer from "../../../components/templates/footer.component";
import BerandaWrapper from "../../../components/wrapper/beranda.wrapper";

import "../../../styles/beranda.module.css";
// import "react-multi-carousel/lib/styles.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import IconArrow from "../../../components/assets/icon/Arrow2";
import CardsBeranda from "../../components/CardBeranda"
import { ACADEMY_FAIL } from "../../../redux/types/pelatihan/academy.type";
import { style } from "dom-helpers";

const Navigationbar = dynamic(() => import("../../../components/templates/navbar.component"), {
    ssr: false,
  }
);

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
    
    // const [activeTab, setActiveTab] = useState (1)
    const [activeAcademyIndex, setActiveAcademyIndex] = useState (0)
    const [activeAcademy, setActiveAcademy] = useState (null)
    const [indexTab, setIndexTab] = useState (0)
    const [show,setShow] = useState(null)
    const [showDetail, setShowDetail] = useState(false)
    const [akademiItem, setAkademiItem] = useState (null)
    const [pelatihanItem, setPelatihanItem] = useState (null)
    const [slideAkademiToShow, setSlideAkademiToShow] = useState(4)
    const [slidePelatihanToShow, setSlidePelatihanToShow] = useState(3)

    const optionsSliderImagetron = {
        type: "loop",
        gap: "1rem",
        autoplay: true,
        padding: "5rem",
        height: "600px",
        breakpoints: {
            1669: {
            height: "500px",
            },
            1262: {
            height: "400px",
            },
            1062: {
            height: "300px",
            },
            833: {
            height: "270px",
            },
            726: {
            height: "230px",
            },
            629: {
            height: "210px",
            },
            590: {
            height: "180px",
            padding: "0",
            gap: "0",
            },
            514: {
            height: "160px",
            padding: "0",
            gap: "0",
            },
            450: {
            height: "160px",
            padding: "0",
            gap: "0",
            },
            425: {
            height: "160px",
            padding: "0",
            gap: "0",
            },
            320: {
            height: "150px",
            padding: "0",
            gap: "0",
            },
        },
                        
    }
    const optionsSliderAcademy = {
            gap: "1rem",
            drag: "free",
            perPage: 4,
            height: "200px",
            type: "loop",
            breakpoints: {
                1262: {
                height: "200px",
                },
                1062: {
                height: "200px",
                perPage: 3,
                },
                833: {
                height: "150px",
                perPage: 2,
                },
                726: {
                height: "150px",
                perPage: 2,
                },
                629: {
                height: "130px",
                perPage: 1,
                },
                590: {
                height: "180px",
                padding: "0",
                gap: "0",
                },
                514: {
                height: "160px",
                padding: "0",
                gap: "0",
                perPage: 1,
                },
                450: {
                height: "150px",
                padding: "0",
                gap: "0",
                perPage: 1,
                },
                425: {
                height: "150px",
                padding: "0",
                gap: "0",
                perPage: 1,
                },
                320: {
                height: "100px",
                padding: "0",
                gap: "0",
                perPage: 1,
                },
            },
        }

    useEffect(() => {
        handleHoverCard()
        handleActiveAcademyIndex(0)
        // handleIndexShow ()
        // handleAkademiCarousel()
        // handlePelatihanCarousel()
    }, [])

    const handleHoverCard = () => {
        let arr = []

        if (tema.length !== 0 && pelatihan.length !== 0){
            for (let i = 0; i < tema.length; i++){
                let obj = {
                    id: tema[i].id,
                    name: tema[i].Name,
                    pelatihan: []
                }

                for (let j = 0; j < pelatihan.length; j++){
                    let objPelatihan = {
                        id: pelatihan[j].id,
                        name: pelatihan[j].name,
                        hover: false,
                        showDetail: false
                    }

                    obj.pelatihan.push (objPelatihan)
                }
                arr.push (obj)
            }
            setShow(arr)
        }
    }

    const renderShare = (metode, status) => {
        if (status === true){
            return (

                <div className="col-12 mt-3 d-flex flex-row  justify-content-between" style={{position:"absolute"}}>
                    <Badge bg="light">
                        <div className="text-info mt-1" style={{height:"2vh"}}>
                            Pelatihan {metode}
                        </div>
                    </Badge>

                    <div>
                        <Button className="btn btn-white py-1 pl-2 pr-1 rounded-circle mr-2">
                            <i className="ri-share-line" />
                        </Button>
                        <Button className="btn btn-white py-1 pl-2 pr-1 mr-2 rounded-circle">
                            <i className="ri-heart-line" />
                        </Button>
                    </div>
                    
                </div>
                
            )
            
        } else {
            return (
                <div className="col-12 mt-3 d-flex flex-row  justify-content-between" style={{position:"absolute"}}>
                    <Badge bg="light">
                        <div className="text-info mt-1" style={{height:"2vh"}}>
                            Pelatihan {metode}
                        </div>
                    </Badge>
                    
                </div>
            )
        }
    }

    const renderButton = (reg, quota, status) => {
        if (status === true){

        } else {

<<<<<<< HEAD
        }
=======
  useEffect(() => {
    handleIndexShow();
    handleAkademiCarousel();
  }, []);

  const handleDragStart = (e) => e.preventDefault();

    const handleActiveAcademy= (i) => {
        setActiveAcademy (i)
>>>>>>> 2263ba32f104562ea3d64fbb2402b8529f33fd21
    }

    const handleMouseEnter = (indexTema, indexPelatihan) =>{
        let obj = [...show]
        for (let i = 0; i < obj.length; i++){
            for (let j = 0; j < obj[i].pelatihan.length; j++){
                if ( i === indexTema && j === indexPelatihan){
                    obj[i].pelatihan[j].hover = true
                }
            }
        }
        setShow(obj)
        
        console.log ("mouseOver")
    }
    // console.log (arr)
  

  const handleTrainingCarousel = () => {
    let arr = [];

    const handleMouseLeave = (indexTema, indexPelatihan) =>{
        let obj = [...show]
        
        for (let i = 0; i < obj.length; i++){
            for (let j = 0; j < obj[i].pelatihan.length; j++){
                if ( i === indexTema && j === indexPelatihan){
                    obj[i].pelatihan[j].hover = false
                }
            }
        }
        setShow(obj)
    }

    // const handleAkademiCarousel = () => {
    //     let arr = []

    //     if (akademi.length !== 0) {
    //         for (let i = 0; i < akademi.length; i+= slideAkademiToShow){
    //             arr.push (akademi.slice (i, i + slideAkademiToShow))
    //         }

    //         setAkademiItem(arr)
    //     }
    //     // console.log (arr)
    // }

    // const handlePelatihanCarousel = () => {
    //     let arr = []

    //     if (pelatihan.length !== 0) {
    //         for (let i = 0; i < pelatihan.length; i+= slidePelatihanToShow){
    //             arr.push (pelatihan.slice (i, i + slidePelatihanToShow))
    //         }

    //         setPelatihanItem(arr)
    //     }
    //     // console.log (arr)
    // }

    // const handleIndexShow = () => {
    //     let arrPelatihan = []

    //     if (pelatihan.length !== 0){
    //         for (let i = 0; i < pelatihan.length; i++){
    //             let obj = {
    //                 id: pelatihan[i].id,
    //                 name: pelatihan[i].name,
    //                 showButton: false,
    //                 showDetail: false
    //             }
    //             arrPelatihan.push (obj)
    //         }
    //     }

    //     setShow (arrPelatihan)
    //     // console.log (arrPelatihan)
    // }

    const handleActiveAcademyIndex= (index) => {
        setActiveAcademyIndex (index)

        for (let i = 0; i < akademi.length; i++){
            if (i === index){
                setActiveAcademy (akademi[i].name)
            }
        }
    }
    // console.log (arr)
  };

  const handleIndexShow = () => {
    let arrPelatihan = [];

    if (pelatihan.length !== 0) {
      for (let i = 0; i < pelatihan.length; i++) {
        let obj = {
          id: pelatihan[i].id,
          name: pelatihan[i].name,
          showButton: false,
          showDetail: false,
        };
        arrPelatihan.push(obj);
      }
    }

    setShow(arrPelatihan);
    // console.log (arrPelatihan)
  };

  // const handleMouseEnter = (index) => {
  //   let obj = show;

  //   for (let i = 0; i < obj.length; i++) {
  //     if (i == index) {
  //       obj[i].showButton = true;
  //     }
  //   }

  //   setShow(obj);
  // };

<<<<<<< HEAD
                {
                    // console.log (show)
                }

                {
                    // console.log (showDetail)
                }

                {/* {
                    show ?
                        console.log (show)
                    :
                        console.log ("no show")
                } */}
=======
  const handleMouseLeave = (index) => {
    let obj = show;
>>>>>>> 2263ba32f104562ea3d64fbb2402b8529f33fd21

    for (let i = 0; i < obj.length; i++) {
      if (i == index) {
        obj[i].showButton = false;
      }
    }
    setShow(obj);
    // console.log ("mouseOut")
  };

  const handleActive = (tab, index) => {
    setActiveTab(tab);
    setIndexTab(index);
  };

  const handleQuickView = () => {
    setShowDetail(true);
    // console.log ("open")
  };

  const handleCloseQuickView = () => {
    setShowDetail(false);
    // console.log ("close")
  };

  return (
    <BerandaWrapper title="Digitalent">
      <div className="bg-white container-fluid pb-20">
        <Navigationbar />

        {/* <ImagetronCarousel /> */}

        {/* Carousel 1 */}
        <div className="carousel-primarys">
          <Splide
            options={{
              type: "loop",
              gap: "1rem",
              autoplay: true,
              padding: "5rem",
              height: "600px",
              breakpoints: {
                1669: {
                  height: "500px",
                },
                1262: {
                  height: "400px",
                },
                1062: {
                  height: "300px",
                },
                833: {
                  height: "270px",
                },
                726: {
                  height: "230px",
                },
                629: {
                  height: "210px",
                },
                590: {
                  height: "180px",
                  padding: "0",
                  gap: "0",
                },
                514: {
                  height: "160px",
                  padding: "0",
                  gap: "0",
                },
                450: {
                  height: "160px",
                  padding: "0",
                  gap: "0",
                },
                425: {
                  height: "160px",
                  padding: "0",
                  gap: "0",
                },
                320: {
                  height: "150px",
                  padding: "0",
                  gap: "0",
                },
              },
            }}
            hasSliderWrapper
          >
            <SplideSlide>
              <Image
                layout="fill"
                objectFit="fill"
                src={`/assets/media/carousel-01.svg`}
                alt="First slide"
                className="mx-5"
              />
            </SplideSlide>
            <SplideSlide>
              <Image
                layout="fill"
                objectFit="fill"
                src={`/assets/media/carousel-01.svg`}
                alt="First slide"
                className="mx-5"
              />
            </SplideSlide>
            <SplideSlide>
              <Image
                layout="fill"
                objectFit="fill"
                src={`/assets/media/carousel-01.svg`}
                alt="First slide"
                className="mx-5"
              />
            </SplideSlide>
          </Splide>
        </div>

        {/* Carousel 2 */}
        <div className="carousel-secondarys">
          <Splide
            options={{
              gap: "1rem",
              drag: "free",
              perPage: 4,
              height: "200px",
              type: "loop",
              breakpoints: {
                1262: {
                  height: "200px",
                },
                1062: {
                  height: "200px",
                  perPage: 3,
                },
                833: {
                  height: "150px",
                  perPage: 2,
                },
                726: {
                  height: "150px",
                  perPage: 2,
                },
                629: {
                  height: "130px",
                  perPage: 1,
                },
                590: {
                  height: "180px",
                  padding: "0",
                  gap: "0",
                },
                514: {
                  height: "160px",
                  padding: "0",
                  gap: "0",
                  perPage: 1,
                },
                450: {
                  height: "150px",
                  padding: "0",
                  gap: "0",
                  perPage: 1,
                },
                425: {
                  height: "150px",
                  padding: "0",
                  gap: "0",
                  perPage: 1,
                },
                320: {
                  height: "100px",
                  padding: "0",
                  gap: "0",
                  perPage: 1,
                },
              },
            }}
            hasSliderWrapper
            // hasAutoplayControls
            // hasAutoplayProgress
          >
            <SplideSlide>
              <div className="d-flex align-items-center h-100">
                <div className="card-1">
                  <h1 className="mb-0 mr-2 fw-700">VSGA</h1>
                  <div>
                    <p className="mb-0">
                      Vocational School
                      <br />
                      Graduate Academy
                    </p>
                  </div>
                </div>
<<<<<<< HEAD

                {/* Akademi */}
                {
                    akademi ?
                        <div className="carousel-secondarys">
                            <Splide
                                options={optionsSliderAcademy}
                                hasSliderWrapper
                            >
                                {
                                    akademi.map ((el, i) => {
                                        return (
                                            <SplideSlide key={i}>
                                                {
                                                    activeAcademyIndex === i ?
                                                        <div className="d-flex align-items-center h-100" style={{marginLeft:"10vh", cursor:"pointer"}} onClick={() => handleActiveAcademyIndex(i)}>
                                                            <div className="row bg-secondary text-white rounded" style={{height:"10vh", width:"37vh"}}>
                                                                <h1 className="mb-0 mr-2 fw-700 col-5 py-5 d-flex align-self-center" >{el.slug}</h1>
                                                                <div className="col-6 d-flex align-items-center ">
                                                                    <p className="mb-0">
                                                                        {el.name}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    :
                                                        <div className="d-flex align-items-center h-100" style={{marginLeft:"10vh", cursor:"pointer"}} onClick={() => handleActiveAcademyIndex(i)}>
                                                            <div className="row rounded text-muted border " style={{height:"10vh", width:"37vh"}}>
                                                                <h1 className="mb-0 mr-2 fw-700 col-5 py-5 d-flex align-self-center">{el.slug}</h1>
                                                                <div className="col-6 d-flex align-items-center ">
                                                                    <p className="mb-0">
                                                                        {el.name}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                }
                                                
                                            </SplideSlide>
                                        )
                                    })
                                }
                            </Splide>
                        </div>
                    :
                        null
                }
                    
                {/* Tema */}
                {
                    tema  && pelatihan && show ?
                        
                        tema.map ((el, i) => {
                            return (
                                <div key={i} > 
                                    <div className="my-5 mx-5 row d-flex justify-content-between">
                                        <div>
                                            <h1 className="font-weight-bolder">
                                                {el.Name}
                                            </h1>
                                        </div>
                                        <div className="text-primary">
                                            <Link href="#">
                                                <div className="font-weight-bolder d-flex justify-content-center" style={{cursor:"pointer"}}>
                                                    <span className="mt-1">
                                                        Lihat Semua
                                                    </span>  
                                                    <i className="ri-arrow-right-s-line text-primary"></i> 
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="row d-flex justify-content-around mx-5 px-5">
                                        {
                                            
                                            pelatihan.map ((row, ind) => {
                                                // console.log ("test1")
                                                // console.log ("render ulang")
                                                return (
                                                    show[i].pelatihan[ind].showDetail === false ?
                                                        <Card style={{ width: '30rem' }} className="shadow" key={ind} onMouseEnter={() => handleMouseEnter(i, ind)} onMouseLeave={() => handleMouseLeave(i, ind)}>

                                                            {/* <div className="col-12 mt-3 d-flex flex-row  justify-content-between" style={{position:"absolute"}}>
                                                                <Badge bg="light">
                                                                    <div className="text-info mt-1">
                                                                        Pelatihan {row.metode_pelatihan}
                                                                    </div>
                                                                </Badge>

                                                                {
                                                                    renderCard(show[i].pelatihan[ind].hover)
                                                                }
                                                                
                                                            </div> */}

                                                            {
                                                                renderShare(row.metode_pelatihan, show[i].pelatihan[ind].hover)
                                                            }
                                                            
                                                            <div>
                                                                <Card.Img 
                                                                    variant="top"  
                                                                    src={`https://dts-beasiswa-dev.s3-ap-southeast-1.amazonaws.com/${row.gambar}`} 
                                                                />
                                                            </div>

                                                            <div className="ml-2 " style={{position:"absolute", marginTop:"28vh"}}>
                                                                <Image 
                                                                    src={`/assets/media/Frame_6523.svg`}
                                                                    width="50vh"
                                                                    height="50vh"
                                                                    className="rounded"
                                                                />
                                                            </div>

                                                            <div className="row d-flex justify-content-between mx-5 mt-3">
                                                                <div style={{marginLeft:"7vh"}}>
                                                                    {row.mitra}
                                                                </div>
                                                                <Badge bg="light">
                                                                    <div className="text-danger mt-1">
                                                                        {row.status}
                                                                    </div>
                                                                </Badge>
                                                            </div>

                                                            <Card.Body>
                                                                
                                                                <div>
                                                                    <h4>{row.name}</h4>
                                                                </div>

                                                                <div className="text-muted">
                                                                    {
                                                                        activeAcademy
                                                                    }
                                                                </div>

                                                                <div 
                                                                    className="row my-3" 
                                                                    style={{height:"2px", backgroundColor:"#ADB5BD"}}
                                                                >
                                                                </div>
                                                                
                                                                {
                                                                    renderButton()
                                                                }
                                                                {/* <div className="d-flex align-content-center">
                                                                    <i className="ri-time-line mr-2"></i>
                                                                    <span className="mt-1">Registrasi: {new Date (row.pendaftaran_mulai).toLocaleDateString("en-GB")} - {new Date (row.pendaftaran_selesai).toLocaleDateString("en-GB")}</span>
                                                                </div>
                                                                <div className="d-flex align-content-center">
                                                                    <i className="ri-group-line mr-2"></i>
                                                                    <span className="mt-1">Kuota {row.kuota_peserta} Peserta</span>
                                                                </div> */}
                                                            </Card.Body>
                                                        </Card>
                                                    :
                                                        null
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                
                            )
                        })
                        
                       
                    :
                        null
                }                

                <div className="col-12 text-center my-5">
                    <button className="btn btn-outline-info rounded-pill ">
                        <div className="font-weight-bolder">
                            Lebih Banyak Tema <i className="ri-arrow-right-s-line ml-2"></i>
                        </div>
                    </button>
=======
              </div>
            </SplideSlide>
            <SplideSlide>
              <div className="d-flex align-items-center h-100">
                <div className="card-1 active-card-1">
                  <h1 className="mb-0 mr-2 fw-700">VSGA</h1>
                  <div>
                    <p className="mb-0">
                      Vocational School
                      <br />
                      Graduate Academy
                    </p>
                  </div>
>>>>>>> 2263ba32f104562ea3d64fbb2402b8529f33fd21
                </div>
              </div>
            </SplideSlide>
            <SplideSlide>
              <div className="d-flex align-items-center h-100">
                <div className="card-1">
                  <h1 className="mb-0 mr-2 fw-700">VSGA</h1>
                  <div>
                    <p className="mb-0">
                      Vocational School
                      <br />
                      Graduate Academy
                    </p>
                  </div>
                </div>
              </div>
            </SplideSlide>
            <SplideSlide>
              <div className="d-flex align-items-center h-100">
                <div className="card-1">
                  <h1 className="mb-0 mr-2 fw-700">VSGA</h1>
                  <div>
                    <p className="mb-0">
                      Vocational School
                      <br />
                      Graduate Academy
                    </p>
                  </div>
                </div>
              </div>
            </SplideSlide>
            <SplideSlide>
              <div className="d-flex align-items-center h-100">
                <div className="card-1">
                  <h1 className="mb-0 mr-2 fw-700">VSGA</h1>
                  <div>
                    <p className="mb-0">
                      Vocational School
                      <br />
                      Graduate Academy
                    </p>
                  </div>
                </div>
              </div>
            </SplideSlide>
            <SplideSlide>
              <div className="d-flex align-items-center h-100">
                <div className="card-1">
                  <h1 className="mb-0 mr-2 fw-700">VSGA</h1>
                  <div>
                    <p className="mb-0">
                      Vocational School
                      <br />
                      Graduate Academy
                    </p>
                  </div>
                </div>
              </div>
            </SplideSlide>
            <SplideSlide>
              <div className="d-flex align-items-center h-100">
                <div className="card-1">
                  <h1 className="mb-0 mr-2 fw-700">VSGA</h1>
                  <div>
                    <p className="mb-0">
                      Vocational School
                      <br />
                      Graduate Academy
                    </p>
                  </div>
                </div>
              </div>
            </SplideSlide>
          </Splide>
        </div>

        {/* Card row */}
        <div className="card-rows">
          {/*  */}
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="mb-0 fw-600 fz-20">Multimedia Designer</h1>
            <div className="d-flex align-items-center">
              <p className="mb-0 fz-14 fw-600" style={{ color: "#0063CC" }}>
                Lihat Semua
              </p>
              <IconArrow
                width="8"
                height="10"
                fill="#0063CC"
                className="ml-2"
                style={{ transform: "rotate(0)" }}
              />
            </div>
          </div>
          {/* card  */}
          <div className="row mt-10">
            <div className="col-12 col-sm-4">
              {/* <Cardss /> */}
            </div>
            <div className="col-12 col-sm-4">
              {/* <Cardss /> */}
            </div>
            <div className="col-12 col-sm-4">
              {/* <Cardss /> */}
            </div>
            <div className="col-12 col-sm-4">
              {/* <Cardss /> */}
            </div>
            <div className="col-12 col-sm-4">
              {/* <Cardss /> */}
            </div>
          </div>

          <div className="row d-flex justify-content-center mt-10">
              <Link href="/login">
                <a>
                  <button className="btn btn-sm btn-login-peserta">
                    Lebih Banyak Tema
                   <IconArrow
                width="8"
                height="10"
                fill="#0063CC"
                className="ml-2"
                style={{ transform: "rotate(0)" }}
              />
                  </button>
                </a>
              </Link>
          </div>

        </div>
      </div>
    </BerandaWrapper>
  );
};

export default Beranda;
