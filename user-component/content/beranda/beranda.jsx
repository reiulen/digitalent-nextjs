import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";

// import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Card, Carousel, Badge, Button } from "react-bootstrap";
import { getTemaByAkademi } from "../../../redux/actions/beranda/beranda.actions"

import BerandaWrapper from "../../../components/wrapper/beranda.wrapper";
import "../../../styles/beranda.module.css";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import IconArrow from "../../../components/assets/icon/Arrow2";
import Cardss from "../../components/beranda/card";
import StepRegister from "../../components/beranda/step-register";
import RilisMedia from "../../components/beranda/rilis-media";
import GaleryUpdate from "../../components/beranda/galery-update";
import InfoVideo from "../../components/beranda/info-videos";
import ComeJoin from "../../components/beranda/come-join";
import Footer from "../../components/beranda/footer";

const Navigationbar = dynamic(
  () => import("../../../components/templates/navbar.component"),
  {
    ssr: false,
  }
);

const Beranda = () => {
  const dispatch = useDispatch();
  // const router = useRouter();

  const { akademi } = useSelector(state => state.allAkademi);
  const { tema } = useSelector(state => state.temaByAkademi);
  const { publikasi } = useSelector(state => state.allPublikasiBeranda);
  // const { pelatihan } = useSelector(state => state.pelatihanByTema);

  const [ activeTab, setActiveTab ] = useState(0);
  const [ show, setShow ] = useState(null);
  const [ cardImage, setCardImage ] = useState(null)
  const [ cardStatus, setCardStatus ] = useState(null)
  const [ cardImageMitra, setCardImageMitra ] = useState(null)
  const [ cardAkademi, setCardAkademi ] = useState(null)
  const [ cardDeskripsi, setCardDeskripsi ] = useState(null)
  const [ cardName, setCardName ] = useState(null)
  const [ cardKuota, setCardKuota ] = useState(null)
  const [ cardMitra, setCardMitra ] = useState(null)
  const [ cardAlamat, setCardAlamat ] = useState(null)
  const [ cardPendaftaranMulai, setCardPendaftaranMulai ] = useState(null)
  const [ cardPendaftaranSelesai, setCardPendaftaranSelesai ] = useState(null)
  
  useEffect(() => {
    handleHoverCard()
  }, [])

  // useEffect(() => {
  //   if (tema){
  //     window.location.reload();
  //   }
    
  // }, [tema])

  const handleHoverCard = () => {
    let arr = []

    if (tema.length !== 0 ){
      for (let i = 0; i < tema.length; i++){
        let obj = {
          id: tema[i].id,
          name: tema[i].Name,
          showDetail: false,
          pelatihan: []
        }
        if (tema[i].pelatihan !== 0 && tema[i].pelatihan !== null){
          for (let j = 0; j < tema[i].pelatihan.length; j++){
            let objPelatihan = {
              id: tema[i].pelatihan[j].id,
              name: tema[i].pelatihan[j].name,
              hover: false,
              // showDetail: false
            }

            obj.pelatihan.push (objPelatihan)
          }
          arr.push (obj)
        }
        
      }
      setShow(arr)
    }
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
  }

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

  const handleActive = (index) => {
    setActiveTab(index);
    dispatch (getTemaByAkademi(index))
  };

  const handleQuickView = (indexTema, image, status, image_mitra, akademi, deskripsi, name, kuota_pendaftar, mitra, alamat, pendaftaran_mulai, pendaftaran_selesai) => {
    let obj = [...show]

    for (let i = 0; i < obj.length; i++){
      if ( i === indexTema){
        obj[i].showDetail = true
      }
    }
    setShow(obj)
    setCardImage(image)
    setCardStatus(status)
    setCardImageMitra(image_mitra)
    setCardAkademi(akademi)
    setCardDeskripsi(deskripsi)
    setCardName(name)
    setCardKuota(kuota_pendaftar)
    setCardMitra(mitra)
    setCardAlamat(alamat)
    setCardPendaftaranMulai(pendaftaran_mulai)
    setCardPendaftaranSelesai(pendaftaran_selesai)


    // console.log ("open")
  };

  const handleCloseQuickView = (indexTema) => {
    let obj = [...show]

    for (let i = 0; i < obj.length; i++){
      if ( i === indexTema){
        obj[i].showDetail = false
      }
    }
    setShow(obj)
    // setShowDetail(false);
    // console.log ("close")
  };

  return (
    <BerandaWrapper title="Digitalent">

      <div style={{ backgroundColor: "white" }}>
        <Navigationbar />
        {
          // console.log (publikasi)
        }

        {
          // console.log (tema)
        }

        {/* Carousel 1 */}
        {
          publikasi && publikasi.imagetron.length !== 0 ?
            <div className="container-fluid max-container">
              <div className="carousel-primarys">
                <Splide
                  active={() => handleActiveImagetron(1)}
                  options={{
                    type: "loop",
                    gap: "1rem",
                    autoplay: true,
                    padding: "5rem",
                    height: "600px",
                    focus: "center",
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
                  {
                    publikasi.imagetron.map ((el, i) => {
                      return (
                        <SplideSlide key={i}>
                          <Image
                            layout="fill"
                            objectFit="fill"
                            // src={process.env.END_POINT_API_IMAGE_PUBLIKASI + "publikasi/images/" + el.gambar}
                            src={`/assets/media/carousel-01.svg`}
                            alt="Imagetron Slide"
                            className="mx-5"
                          />
                        </SplideSlide>
                      )
                    })
                  }
                  {/* <SplideSlide>
                    <Image
                      layout="fill"
                      // width="1000vw"
                      // height="500vh"
                      objectFit="fill"
                      // src={`/assets/media/banner-3.svg`}
                      src={`/assets/media/carousel-01.svg`}
                      alt="First slide"
                      className="mx-5"
                    />
                  </SplideSlide>

                  <SplideSlide>
                    <Image
                      layout="fill"
                      objectFit="fill"
                      // width="1000vw"
                      // height="500vh"
                      // src={`/assets/media/image27.png`}
                      src={`/assets/media/carousel-01.svg`}
                      alt="First slide"
                      className="mx-5"
                    />
                  </SplideSlide>

                  <SplideSlide>
                    <Image
                      layout="fill"
                      // width="1000vw"
                      // height="500vh"
                      objectFit="fill"
                      // src={`/assets/media/banner-3.svg`}
                      src={`/assets/media/carousel-01.svg`}
                      alt="First slide"
                      className="mx-5"
                    />
                  </SplideSlide> */}
                </Splide>
              </div>
            </div>
          :
            <div className="container-fluid max-container">
              <div className="carousel-primarys">
                <Splide
                  active={() => handleActiveImagetron(1)}
                  options={{
                    type: "loop",
                    gap: "1rem",
                    autoplay: true,
                    padding: "5rem",
                    height: "600px",
                    focus: "center",
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
                      // width="1000vw"
                      // height="500vh"
                      objectFit="fill"
                      // src={`/assets/media/banner-3.svg`}
                      src={`/assets/media/carousel-01.svg`}
                      alt="First slide"
                      className="mx-5"
                    />
                  </SplideSlide>

                  <SplideSlide>
                    <Image
                      layout="fill"
                      objectFit="fill"
                      // width="1000vw"
                      // height="500vh"
                      // src={`/assets/media/image27.png`}
                      src={`/assets/media/carousel-01.svg`}
                      alt="First slide"
                      className="mx-5"
                    />
                  </SplideSlide>

                  <SplideSlide>
                    <Image
                      layout="fill"
                      // width="1000vw"
                      // height="500vh"
                      objectFit="fill"
                      // src={`/assets/media/banner-3.svg`}
                      src={`/assets/media/carousel-01.svg`}
                      alt="First slide"
                      className="mx-5"
                    />
                  </SplideSlide>
                </Splide>
              </div>
            </div>
        }
        

        {/* Carousel 2 */}
        {akademi ? (
          <div className="container-fluid max-container">
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
                {akademi.map((el, i) => {
                  return (
                    <SplideSlide key={i}>
                      {activeTab !== i ? (
                        <div
                          className="d-flex align-items-center h-100"
                          onClick={() => handleActive(i)}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="card-1">
                            <h1 className="mb-0 mr-2 fw-700">{el.slug}</h1>
                            <div>
                              <p className="mb-0">{el.name}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="d-flex align-items-center h-100"
                          onClick={() => handleActive(i)}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="card-1 bg-secondary">
                            <h1 className="mb-0 mr-2 fw-700 text-white">
                              {el.slug}
                            </h1>
                            <div>
                              <p className="mb-0 text-white">{el.name}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </SplideSlide>
                  );
                })}
              </Splide>
            </div>
          </div>
        ) : null}

        <div className="container-fluid max-container">
          <div className="card-rows">
            {/*Tema*/}
            {tema? 
              tema.map((el, i) => {
                  return (
                    <div key={i} className="my-5">
                      <div className="d-flex align-items-center justify-content-between px-10">
                        <h1 className="mb-0 fw-600 fz-20">{el.Name}</h1>
                        <div>
                          {
                            el.pelatihan !== null ?
                              <a 
                                href={`/detail/akademi/${el.id}`}
                                className="d-flex align-items-center"
                              >
                                <>
                                  <p
                                    className="mb-0 fz-14 fw-600"
                                    style={{ color: "#0063CC" , cursor:"pointer"}}
                                  >
                                    Lihat Semua
                                  </p>
                                  <IconArrow
                                    width="8"
                                    height="10"
                                    fill="#0063CC"
                                    className="ml-2"
                                    style={{ transform: "rotate(0)" }}
                                  /> 
                                </>
                              </a>
                            :
                              null
                          }
                          
                        </div>
                      </div>

                      <div className="container-fluid">
                        <div className="row mt-10">
                          {
                            show !== null && show[i] !== undefined && show[i] !== null?
                              show[i].showDetail !== true ?
                                el.pelatihan ? 
                                  el.pelatihan.map ((element, index) => {
                                    return (
                                      
                                      <div 
                                        className="col-12 col-sm-6 col-xl-4" 
                                        key={index} 
                                        onMouseEnter={() => handleMouseEnter(i, index)}
                                        onMouseLeave={() => handleMouseLeave(i, index)}
                                      >
                                        <Cardss 
                                          label={<label>Pelatihan {element.metode_pelatihan}</label>}

                                          button={
                                            show[i].pelatihan[index].hover === true ?
                                              <div className="row">
                                                <Button className="btn btn-white py-1 pl-2 pr-1 rounded-circle mr-2">
                                                    <i className="ri-share-line" />
                                                </Button>
                                                <Button className="btn btn-white py-1 pl-2 pr-1 mr-2 rounded-circle">
                                                    <i className="ri-heart-line" />
                                                </Button>
                                              </div>
                                            :
                                              null
                                          }
                                        
                                          thumbnail={
                                            <Image 
                                              src={process.env.END_POINT_API_IMAGE_BEASISWA + element.gambar}
                                              // src={`https://dts-beasiswa-dev.s3-ap-southeast-1.amazonaws.com/${element.gambar}`}
                                              layout="fill" 
                                              objectFit="cover"
                                            />
                                          }

                                          
                                        > 
                                          <div className="rounded mt-0 pt-0">
                                            <Image 
                                              src={process.env.END_POINT_API_IMAGE_PARTNERSHIP + element.gambar_mitra}
                                              // src={`https://dts-beasiswa-dev.s3-ap-southeast-1.amazonaws.com/${element.gambar_mitra}`}
                                              layout="fill" 
                                              objectFit="cover"
                                            />
                                          </div>

                                          <div className="d-flex align-items-center justify-content-between pl-24">
                                            <p
                                              className="fw-600"
                                              style={{ color: "#6C6C6C" }}
                                            >
                                              {element.mitra}
                                            </p>
                                            {
                                              element.status !== "Closed" ?
                                                <button className="btn btn-green-rounded mb-5">
                                                  {element.status}
                                                </button>
                                              :
                                                <button className="btn btn-green-rounded text-danger mb-5">
                                                  {element.status}
                                                </button>
                                            }
                                            
                                          </div>
                                          <h1
                                            className="fz-18 fw-600 mt-4"
                                            style={{ color: "#1F1F1F" }}
                                          >
                                            {element.name}
                                          </h1>
                                          <h3
                                            className="mb-0 fz-18 fw-400 mt-4"
                                            style={{ color: "#6C6C6C" }}
                                          >
                                            {element.akademi}
                                          </h3>
                                          <hr />
                                          
                                          {
                                            show[i].pelatihan[index].hover !== true ?
                                              <div className="mt-2">
                                                <div className="d-flex align-items-center">
                                                  Registrasi: {moment(element.pendafataran_mulai).format("DD MMMM YYYY")} - {moment(element.pendafataran_selesai).format("DD MMMM YYYY")}
                                                </div>
                                                <div className="d-flex align-items-center mt-2">
                                                  Kuota: {element.kuota_peserta} Peserta
                                                </div>
                                              </div>
                                            :
                                              <div className="mt-2">
                                                <Button className="btn btn-outline-info rounded-pill col-12" onClick={() => handleQuickView(i, element.gambar, element.status, element.gambar_mitra, element.akademi, element.deskripsi, element.name, element.kuota_peserta, element.mitra, element.alamat, element.pendaftaran_mulai, element.pendaftaran_selesai)}>
                                                    Quick View
                                                </Button>
                                              </div>
                                          }
                                          
                                        </Cardss>
                                      </div>
                                    )
                                  })
                                :
                                  <div className="container-fluid">
                                    <div className="row">
                                      <h1 className="text-center text-muted col-12 font-weight-bolder">
                                        Pelatihan Belum Tersedia
                                      </h1>
                                    </div>
                                  </div>
                              :
                                // Card Detail
                                <div className="container-fluid">
                                  <div className="row bg-white shadow rounded" style={{minHeight:"50vh", maxHeight:"fit-content"}}>
                                    <div className="col-12 col-md-4">
                                      <Image 
                                        // src={`/assets/media/logo-vsga-1.svg`}
                                        src={process.env.END_POINT_API_IMAGE_BEASISWA + cardImage}
                                        // src={`https://dts-beasiswa-dev.s3-ap-southeast-1.amazonaws.com/${cardImage}`}
                                        layout="fill" 
                                        objectFit="cover"
                                        className="rounded"
                                      />
                                      <div className="position-absolute mt-5">
                                        <Badge pill bg="light">
                                          Pelatihan {cardStatus}
                                        </Badge>
                                      </div>
                                    </div>
                                    <div className="col-12 col-md-8">
                                      <div className="row ml-5">
                                        <div className="col-12 col-md-2">
                                          <Image 
                                            // src={`/assets/media/logo-vsga-1.svg`}
                                            src={process.env.END_POINT_API_IMAGE_PARTNERSHIP + cardImageMitra}
                                            // src={`https://dts-beasiswa-dev.s3-ap-southeast-1.amazonaws.com/${cardImageMitra}`}
                                            width="80vw"
                                            height="80vh" 
                                            objectFit="cover"
                                            className="rounded-circle"
                                          />
                                        </div>
                                        
                                        <div className="col-6 col-md-6">
                                          <div className="text-muted">
                                            {cardAkademi}
                                          </div>
                                          <h1 className="font-weight-bolder text-bold">
                                            {cardName}
                                          </h1>
                                          <div className="text-primary">
                                            {cardMitra}
                                          </div>
                                        </div>

                                        <div className="col-6 col-md-4">
                                          <div className="row d-flex justify-content-end mt-5">
                                            <Button className="btn btn-white rounded-circle px-2 py-1 mr-2 border border-dark text-center">
                                                <i className="ri-share-line" />
                                            </Button>
                                            <Button className="btn btn-white mr-2 rounded-circle px-2 py-1 border border-dark text-center">
                                                <i className="ri-heart-line" />
                                            </Button>
                                            <label style={{cursor:"pointer"}} className="mr-5" onClick={() => handleCloseQuickView(i)}>
                                              <i className="ri-close-line text-dark"></i>
                                            </label>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="row ml-5">
                                        <div className="mt-3 ml-3 col-12">
                                          {cardDeskripsi}
                                        </div>
                                      </div>

                                      <div className="row ml-5 mb-5">
                                        <div className="mt-3 col-12 col-md-4">
                                          <i className="ri-time-line text-dark"></i>
                                          <span>Registrasi: {moment(cardPendaftaranMulai).format("DD MMMM YYYY")} - {moment(cardPendaftaranSelesai).format("DD MMMM YYYY")} </span>
                                        </div>

                                        <div className="mt-3 col-12 col-md-4">
                                          <i className="ri-group-line text-dark"></i>
                                          <span>Kuota: {cardKuota} Peserta</span>
                                        </div>

                                        <div className="mt-3 col-12 col-md-4">
                                          <i className="ri-map-pin-line text-dark"></i>
                                          <span>Lokasi: {cardAlamat}</span>
                                        </div>
                                      </div>

                                      <div className="row ml-5 border-top my-5">
                                        <div className="col-12 col-md-6 mt-5">
                                          <Button className="btn btn-outline-info rounded-pill btn-block">
                                            Lihat Selengkapnya
                                          </Button>
                                        </div>
                                        <div className="col-12 col-md-6 mt-5">
                                          <Button className="btn btn-info rounded-pill btn-block">
                                            Daftar Pelatihan
                                          </Button>
                                        </div>
                                      </div>

                                      


                                    </div>
                                  </div>
                                </div>
                            :
                              <div className="container-fluid">
                                <div className="row">
                                  <h1 className="text-center text-muted col-12 font-weight-bolder">
                                    Pelatihan Belum Tersedia
                                  </h1>
                                </div>
                              </div>
                          }
                      
                        </div>
                      </div>

                    </div>
                  );
                })
              : 
                <div className="container-fluid">
                  <div className="row">
                    <h1 className="text-center text-muted col-12 font-weight-bolder">
                      Tema Pelatihan Belum Tersedia
                    </h1>
                  </div>
                </div>
              }

            <div className="d-flex justify-content-center mt-10">
              
              <a href={`/detail/akademi/1`}>
                <button className="btn btn-sm btn-login-peserta px-12 py-3">
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
            
            </div>
          </div>
        </div>

        {/* tahapan pendaftaran */}
        <StepRegister />

        {/* Rilis Media & Informasi Terbaru */}
        <RilisMedia berita={publikasi.berita.length !== 0 ? publikasi.berita.length : null}/>

        {/* Galeri Terupdate dan Terkini */}
        <GaleryUpdate gambar={publikasi.gallery.length !== 0 ? publikasi.gallery.length : null}/>

        {/* Informasi Dalam Video Terkini */}
        <InfoVideo video={publikasi.video.length !== 0 ? publikasi.video.length: null}/>

        {/* Ayo Bergabung, Jadi Jagoan Digital! */}
        <ComeJoin />
        
        {/* Footer */}
        <Footer />
      </div>

      {/* Footer
      <Footer /> */}

    </BerandaWrapper>
  );
};

export default Beranda;
