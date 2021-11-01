import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import moment from "moment";
import { toast } from "react-toastify";
import IconTime from "../../../components/assets/icon-dashboard-peserta/Time";
import IconPeserta from "../../../components/assets/icon-dashboard-peserta/Peserta";
import IconClose from "../../../components/assets/icon/Close";
import IconLove from "../../../components/assets/icon/Love";
import IconShare from "../../../components/assets/icon/Share";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Card, Carousel, Badge, Button } from "react-bootstrap";
import { getTemaByAkademi } from "../../../redux/actions/beranda/beranda.actions";
import { checkRegisterPelatihan } from "../../../redux/actions/beranda/detail-pelatihan.actions";

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
import style from "../../../styles/peserta/dashboard.module.css";

// const Navigationbar = dynamic(
//   () => import("../../components/template/Navbar.component"),
//   {
//     ssr: false,
//   }
// );

const Beranda = ({ session }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { akademi } = useSelector((state) => state.allAkademi);
  const { tema } = useSelector((state) => state.temaByAkademi);
  const { publikasi } = useSelector((state) => state.allPublikasiBeranda);
  const { cekPelatihan } = useSelector(
    (state) => state.checkRegisteredPelatihan
  );

  const [activeTab, setActiveTab] = useState(0);
  const [akademiId, setAkademiId] = useState(null);
  const [show, setShow] = useState(null);
  const [defaultImage, setDefaultImage] = useState(
    `/assets/media/carousel-01.svg`
  );
  const [imageError, setImageError] = useState(false);
  const [imagetronImg, setImagetronImg] = useState(null);
  const [cardId, setCardId] = useState(null);
  const [cardImage, setCardImage] = useState(null);
  const [cardStatus, setCardStatus] = useState(null);
  const [cardImageMitra, setCardImageMitra] = useState(null);
  const [cardAkademi, setCardAkademi] = useState(null);
  const [cardDeskripsi, setCardDeskripsi] = useState(null);
  const [cardName, setCardName] = useState(null);
  const [cardKuota, setCardKuota] = useState(null);
  const [cardMitra, setCardMitra] = useState(null);
  const [cardAlamat, setCardAlamat] = useState(null);
  const [cardPendaftaranMulai, setCardPendaftaranMulai] = useState(null);
  const [cardPendaftaranSelesai, setCardPendaftaranSelesai] = useState(null);
  const [cardMetode, setCardMetode] = useState(null);
  const textToTrim = 325;
  const [akademiDesc, setAkademiDesc] = useState(null);

  useEffect(() => {
    handleAkademiStart();
    handleHoverCard();
  }, []);

  useEffect(() => {
    if (tema) {
      // window.location.reload();
      handleHoverCard();
      // handleTemaId()
    }
  }, [tema]);

  const PrintTextTrim = (word) => {
    let str = null;
    if (word.length > textToTrim) {
      str = word.slice(0, textToTrim) + "...";
    } else {
      str = word;
    }

    return str;
  };

  const handleAkademiStart = () => {
    if (akademi && akademi.length !== 0) {
      dispatch(getTemaByAkademi(akademi[0].id));
      setAkademiId(akademi[0].id);
    }
  };

  const handleHoverCard = () => {
    let arr = [];

    if (tema && tema.length !== 0) {
      for (let i = 0; i < tema.length; i++) {
        let obj = {
          id: tema[i].id,
          name: tema[i].Name,
          showDetail: false,
          pelatihan: [],
        };

        if (tema[i].pelatihan !== 0 && tema[i].pelatihan !== null) {
          for (let j = 0; j < tema[i].pelatihan.length; j++) {
            let objPelatihan = {
              id: tema[i].pelatihan[j].id,
              name: tema[i].pelatihan[j].name,
              gambar: tema[i].pelatihan[j].gambar,
              akademi: tema[i].pelatihan[j].akademi,
              tema: tema[i].pelatihan[j].tema,
              alamat: tema[i].pelatihan[j].alamat,
              kuota_peserta: tema[i].pelatihan[j].kuota_peserta,
              metode_pelatihan: tema[i].pelatihan[j].metode_pelatihan,
              gambar_mitra: tema[i].pelatihan[j].gambar_mitra,
              mitra: tema[i].pelatihan[j].mitra,
              pendaftaran_mulai: tema[i].pelatihan[j].pendaftaran_mulai,
              pendaftaran_selesai: tema[i].pelatihan[j].pendaftaran_selesai,
              deskripsi: tema[i].pelatihan[j].deskripsi,
              status: tema[i].pelatihan[j].status,
              kuota_pendaftar: tema[i].pelatihan[j].kuota_pendaftar,
              hover: false,
              // showDetail: false
            };
            obj.pelatihan.push(objPelatihan);
          }
          arr.push(obj);
        } else {
          let objPelatihan = false;
          obj.pelatihan = objPelatihan;
          arr.push(obj);
        }
      }
      setShow(arr);
    }
  };

  const handleMouseEnter = (indexTema, indexPelatihan) => {
    let obj = [...show];
    for (let i = 0; i < obj.length; i++) {
      for (let j = 0; j < obj[i].pelatihan.length; j++) {
        if (i === indexTema && j === indexPelatihan) {
          obj[i].pelatihan[j].hover = true;
        }
      }
    }
    setShow(obj);
  };

  const handleMouseLeave = (indexTema, indexPelatihan) => {
    let obj = [...show];

    for (let i = 0; i < obj.length; i++) {
      for (let j = 0; j < obj[i].pelatihan.length; j++) {
        if (i === indexTema && j === indexPelatihan) {
          obj[i].pelatihan[j].hover = false;
        }
      }
    }
    setShow(obj);
  };

  const handleActive = (index, id) => {
    setActiveTab(index);
    setAkademiId(id);
    dispatch(getTemaByAkademi(id));
  };

  const handleQuickView = (
    indexTema,
    image,
    status,
    image_mitra,
    akademi,
    deskripsi,
    name,
    kuota_pendaftar,
    mitra,
    alamat,
    pendaftaran_mulai,
    pendaftaran_selesai,
    id,
    metode_pelatihan
  ) => {
    let obj = [...show];

    for (let i = 0; i < obj.length; i++) {
      if (i === indexTema) {
        obj[i].showDetail = true;
      }
    }
    setShow(obj);
    setCardId(id);
    setCardImage(image);
    setCardStatus(status);
    setCardImageMitra(image_mitra);
    setCardAkademi(akademi);
    setCardDeskripsi(deskripsi);
    setCardName(name);
    setCardKuota(kuota_pendaftar);
    setCardMitra(mitra);
    setCardAlamat(alamat);
    setCardPendaftaranMulai(pendaftaran_mulai);
    setCardPendaftaranSelesai(pendaftaran_selesai);
    setCardMetode(metode_pelatihan);
  };

  const handleCloseQuickView = (indexTema) => {
    let obj = [...show];

    for (let i = 0; i < obj.length; i++) {
      if (i === indexTema) {
        obj[i].showDetail = false;
      }
    }
    setShow(obj);
  };

  const handleErrorImage = (props) => {
    if (imagetronImg === defaultImage) {
      setImageError(true);
      setImagetronImg(props);
    } else {
      setImageError(false);
      setImagetronImg(defaultImage);
    }
  };

  const handleCheckPelatihanReg = async (id, session) => {
    if (session && session.token) {
      const data = await dispatch(checkRegisterPelatihan(id, session.token));

      if (data.status === true) {
        router.push(`${router.pathname}/peserta/form-pendaftaran?id=${id}`);
      } else if (data.status === false) {
        // let errMessage = data.message[0].toUpperCase()  + string.substring(1)
        let errMessage = data.message;
        toast.error(errMessage);
      }
    } else {
      router.push(`${router.pathname}/login`);
    }
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      {/* <Navigationbar /> */}

      {/* Carousel 1 */}
      {publikasi && publikasi.imagetron.length !== 0 ? (
        <div
          className="max-container position-relative py-10"
          style={{ backgroundColor: "#FAFAFB", zIndex: "99" }}
        >
          <div className="carousel-primarys">
            <Splide
              active={() => handleActiveImagetron(1)}
              options={{
                type: "loop",
                gap: "1rem",
                autoplay: true,
                padding: "5rem",
                height: "450px",
                focus: "center",
                breakpoints: {
                  1669: {
                    height: "360px",
                  },
                  1262: {
                    height: "300px",
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
              // style={{overflow: "none"}}
            >
              {publikasi.imagetron.map((el, i) => {
                return (
                  <SplideSlide key={i}>
                    <Image
                      layout="fill"
                      objectFit="cover"
                      // src={imageError === true ? defaultImage : process.env.END_POINT_API_IMAGE_PUBLIKASI + "publikasi/images/" + el.gambar}
                      src={
                        imageError === true
                          ? defaultImage
                          : process.env.END_POINT_API_IMAGE_PUBLIKASI +
                            "publikasi/images/" +
                            el.gambar
                      }
                      alt="Imagetron Slide"
                      className="mx-5"
                      onError={() =>
                        handleErrorImage(
                          process.env.END_POINT_API_IMAGE_PUBLIKASI +
                            "publikasi/images/" +
                            el.gambar
                        )
                      }
                      // onChange={() => setImageError(false)}
                    />
                  </SplideSlide>
                );
              })}
            </Splide>
          </div>
        </div>
      ) : (
        <div
          className="container-fluid max-container position-relative"
          style={{ backgroundColor: "#FAFAFB", zIndex: "99" }}
        >
          <div className="carousel-primarys">
            <Splide
              active={() => handleActiveImagetron(1)}
              options={{
                type: "loop",
                gap: "1rem",
                autoplay: true,
                padding: "5rem",
                height: "470px",
                focus: "center",
                breakpoints: {
                  1669: {
                    height: "470px",
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
                  // src={`/assets/media/banner-3.svg`}
                  src={`/assets/media/carousel-01.svg`}
                  alt="First slide"
                  className="mx-5 rounded"
                />
              </SplideSlide>

              <SplideSlide>
                <Image
                  layout="fill"
                  objectFit="fill"
                  // src={`/assets/media/image27.png`}
                  src={`/assets/media/carousel-01.svg`}
                  alt="First slide"
                  className="mx-5 rounded"
                />
              </SplideSlide>

              <SplideSlide>
                <Image
                  layout="fill"
                  objectFit="fill"
                  // src={`/assets/media/banner-3.svg`}
                  src={`/assets/media/carousel-01.svg`}
                  alt="First slide"
                  className="mx-5 rounded"
                />
              </SplideSlide>

              <SplideSlide>
                <Image
                  layout="fill"
                  objectFit="fill"
                  // src={`/assets/media/banner-3.svg`}
                  src={`/assets/media/carousel-01.svg`}
                  alt="First slide"
                  className="mx-5 rounded"
                />
              </SplideSlide>
            </Splide>
          </div>
        </div>
      )}

      {/* Carousel 2 */}
      {akademi ? (
        <div
          className="container-fluid max-container position-relative"
          style={{ marginTop: "-42px" }}
        >
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
                        onClick={() => handleActive(i, el.id)}
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
          {tema ? (
            tema.map((el, i) => {
              return (
                <div key={i} className="my-5">
                  <div className="d-flex align-items-center justify-content-between px-10">
                    <h1 className="mb-0 fw-600 fz-20">{el.Name}</h1>
                    <div>
                      {el.pelatihan !== null ? (
                        <Link
                          href={`/detail/akademi/${akademiId}?id=${akademiId}&tema_id=${el.id}`}
                        >
                          <a className="d-flex align-items-center">
                            <>
                              <p
                                className="mb-0 fz-14 fw-600"
                                style={{ color: "#0063CC", cursor: "pointer" }}
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
                        </Link>
                      ) : null}
                    </div>
                  </div>

                  <div className="container-fluid">
                    <div className="row mt-5">
                      {show !== null && show[i] !== undefined ? (
                        show[i].showDetail !== true ? (
                          show[i].pelatihan !== false ? (
                            show[i].pelatihan.map((element, index) => {
                              return (
                                <div
                                  className="col-12 col-sm-6 col-xl-4"
                                  key={index}
                                  onMouseEnter={() =>
                                    handleMouseEnter(i, index)
                                  }
                                  onMouseLeave={() =>
                                    handleMouseLeave(i, index)
                                  }
                                >
                                  <Card className="shadow rounded-md">
                                    {show[i].pelatihan[index].hover !== true ? (
                                      <Image
                                        className={`${style.image_dashboard}`}
                                        src={
                                          process.env
                                            .END_POINT_API_IMAGE_BEASISWA +
                                          element.gambar
                                        }
                                        width={400}
                                        height={180}
                                        objectFit="cover"
                                        alt="Image Thumbnail"
                                      />
                                    ) : (
                                      <div
                                        style={{ filter: "brightness(0.3)" }}
                                      >
                                        <Image
                                          className={`${style.image_dashboard}`}
                                          src={
                                            process.env
                                              .END_POINT_API_IMAGE_BEASISWA +
                                            element.gambar
                                          }
                                          width={500}
                                          height={200}
                                          objectFit="cover"
                                          alt="Image Thumbnail"
                                        />
                                      </div>
                                    )}

                                    <Card.ImgOverlay>
                                      <Badge
                                        bg={` rounded-xl py-3 px-4 ${style.badge_card}`}
                                      >
                                        Pelatihan {el.metode_pelatihan}
                                      </Badge>
                                      {show[i].pelatihan[index].hover ===
                                      true ? (
                                        <>
                                          <Button
                                            variant="light"
                                            className={`float-right d-flex justify-content-center align-items-center ${style.wishlist_card}`}
                                          >
                                            <i
                                              className="ri-heart-line p-0"
                                              style={{ color: "#6C6C6C" }}
                                            ></i>
                                          </Button>
                                          <Button
                                            variant="light"
                                            className={`float-right d-flex justify-content-center align-items-center mr-2 ${style.wishlist_card}`}
                                          >
                                            <i
                                              className="ri-share-line p-0"
                                              style={{ color: "#6C6C6C" }}
                                            ></i>
                                          </Button>
                                        </>
                                      ) : null}
                                    </Card.ImgOverlay>
                                    <Card.Body className="position-relative">
                                      <div
                                        className={
                                          style.bungkus_mitra_pelatihan
                                        }
                                      >
                                        <Image
                                          src={
                                            "/assets/media/default-card.png" ||
                                            process.env
                                              .END_POINT_API_IMAGE_PARTNERSHIP +
                                              "/" +
                                              element.gambar_mitra
                                          }
                                          width={62}
                                          height={62}
                                          objectFit="cover"
                                          thumbnail
                                          roundedCircle
                                          className={`${style.image_card_pelatihan} img-fluild`}
                                          alt="Image Mitra"
                                        />
                                      </div>
                                      <div
                                        className="d-flex justify-content-between position-relative pb-0 mb-0"
                                        style={{ top: "-15px" }}
                                      >
                                        <p
                                          className={`pl-20 my-0 ${style.text_mitra}`}
                                        >
                                          {element.mitra}
                                        </p>

                                        {element.status === "Open" ? (
                                          <p
                                            className={`${style.status_mitra_open} text-uppercase font-weight-bolder my-0`}
                                          >
                                            Open
                                          </p>
                                        ) : (
                                          <p
                                            className={`${style.status_mitra_close} text-uppercase font-weight-bolder my-0`}
                                          >
                                            Close
                                          </p>
                                        )}
                                      </div>
                                      <p className={`my-0 ${style.title_card}`}>
                                        {element.name}
                                      </p>
                                      <p
                                        style={{
                                          fontSize: "14px",
                                          color: "#6C6C6C",
                                        }}
                                      >
                                        {element.akademi}
                                      </p>
                                      <hr />

                                      {show[i].pelatihan[index].hover !==
                                      true ? (
                                        <div className="d-flex flex-column">
                                          <div className="date d-flex align-items-center align-middle mr-7">
                                            <i className="ri-time-line"></i>
                                            <span
                                              className={`${style.text_date_register} pl-2`}
                                            >
                                              Registrasi:{" "}
                                              {moment(
                                                element.pendaftaran_mulai
                                              ).format("DD MMMM YYYY")}{" "}
                                              -{" "}
                                              {moment(
                                                element.pendaftaran_selesai
                                              ).format("DD MMMM YYYY")}
                                            </span>
                                          </div>
                                          <div className="date d-flex align-items-center align-middle">
                                            <i className="ri-group-line"></i>
                                            <span
                                              className={`${style.text_date_register} pl-2`}
                                            >
                                              Kuota: {element.kuota_peserta}{" "}
                                              Peserta
                                            </span>
                                          </div>
                                        </div>
                                      ) : (
                                        <Button
                                          className={`btn-block rounded-xl ${style.btn_quick_view}`}
                                          onClick={() =>
                                            handleQuickView(
                                              i,
                                              element.gambar,
                                              element.status,
                                              element.gambar_mitra,
                                              element.akademi,
                                              element.deskripsi,
                                              element.name,
                                              element.kuota_peserta,
                                              element.mitra,
                                              element.alamat,
                                              element.pendaftaran_mulai,
                                              element.pendaftaran_selesai,
                                              element.id,
                                              element.metode_pelatihan
                                            )
                                          }
                                        >
                                          Quick View
                                        </Button>
                                      )}
                                    </Card.Body>
                                  </Card>
                                </div>
                              );
                            })
                          ) : (
                            <div className="container-fluid">
                              <div className="row">
                                <h1 className="text-center text-muted col-12 font-weight-bolder">
                                  Pelatihan Belum Tersedia
                                </h1>
                              </div>
                            </div>
                          )
                        ) : (
                          // start Card Detail
                          <div className="container-fluid">
                            <div className="row border py-3">
                              <div className="col-12 col-md-4">
                                <div
                                  className="position-absolute mt-5"
                                  style={{ zIndex: "100" }}
                                >
                                  <span className="badgess-lg">
                                    Pelatihan {cardMetode}
                                  </span>
                                </div>
                                <div style={{ minHeight: "300px" }}>
                                  <Image
                                    src={
                                      process.env.END_POINT_API_IMAGE_BEASISWA +
                                      cardImage
                                    }
                                    alt="image card detail"
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded"
                                  />
                                </div>
                              </div>

                              <div className="col-12 col-md-8">
                                <div className="py-8 ml-3">
                                  <div className="position-relative d-flex align-items-start justify-content-between">
                                    <div className="d-flex d-flex align-items-start">
                                      <div className="dot-bullet">
                                        <Image
                                          src={
                                            process.env
                                              .END_POINT_API_IMAGE_PARTNERSHIP +
                                            cardImageMitra
                                          }
                                          layout="fill"
                                          objectFit="cover"
                                        />
                                      </div>
                                      <div className="ml-6">
                                        <p
                                          className="fz-14"
                                          style={{ color: "#6C6C6C" }}
                                        >
                                          {cardAkademi}
                                        </p>
                                        <p className="fz-30 fw-600">
                                          {cardName}
                                        </p>
                                        <p className="fw-600 fz-14">
                                          {cardMitra}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="d-flex align-items-start">
                                      <button className="roundedss-border btn btn-white">
                                        <IconLove className="cursor-pointer" />
                                      </button>
                                      <button className="roundedss-border btn btn-white mx-6">
                                        <IconShare className="cursor-pointer" />
                                      </button>

                                      <div
                                        onClick={() => handleCloseQuickView(i)}
                                      >
                                        <IconClose className="cursor-pointer" />
                                      </div>
                                    </div>
                                  </div>

                                  <p className="fz-16 fw-400 my-6">
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: PrintTextTrim(cardDeskripsi),
                                      }}
                                    ></div>
                                  </p>

                                  <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                      <span style={{ color: "#6C6C6C" }}>
                                        <IconTime className="mr-2" />
                                        Registrasi:{" "}
                                        {moment(cardPendaftaranMulai).format(
                                          "DD MMMM YYYY"
                                        )}{" "}
                                        -{" "}
                                        {moment(cardPendaftaranSelesai).format(
                                          "DD MMMM YYYY"
                                        )}
                                      </span>
                                      <span
                                        className="mx-6"
                                        style={{ color: "#6C6C6C" }}
                                      >
                                        <IconPeserta className="mr-2" />
                                        Kuota: {cardKuota}
                                      </span>
                                      <span
                                        style={{ color: "#6C6C6C" }}
                                        className="d-flex align-items-center"
                                      >
                                        <i
                                          className="ri-map-pin-line mr-2"
                                          style={{ color: "#6C6C6C" }}
                                        ></i>
                                        Lokasi: {cardAlamat}
                                      </span>
                                    </div>
                                  </div>

                                  <hr />

                                  <div className="row pt-6">
                                    <div className="col-6">
                                      <Link
                                        href={`/detail/pelatihan/${cardId}`}
                                        passHref
                                      >
                                        <a>
                                          <button className="btn btn-outline-primary-new rounded-pill py-3 px-12 mr-4 w-100">
                                            Lihat Selengkapnya
                                          </button>
                                        </a>
                                      </Link>
                                    </div>

                                    {cardStatus !== "Closed" ? (
                                      <div className="col-6">
                                        <button
                                          onClick={() =>
                                            handleCheckPelatihanReg(
                                              cardId,
                                              session
                                            )
                                          }
                                          className="d-flex justify-content-center btn-primary btn-register-peserta btn-sm py-3 px-12 rounded-pill btn-primary w-100"
                                        >
                                          Daftar Pelatihan
                                        </button>
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      ) : (
                        // end Card Detail
                        <div className="container-fluid">
                          <div className="row">
                            <h1 className="text-center text-muted col-12 font-weight-bolder">
                              Pelatihan Belum Tersedia
                            </h1>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="container-fluid">
              <div className="row">
                <h1 className="text-center text-muted col-12 font-weight-bolder">
                  Tema Pelatihan Belum Tersedia
                </h1>
              </div>
            </div>
          )}
          {tema ? (
            <div className="d-flex justify-content-center mt-30">
              <a href={`/detail/akademi/${akademiId}`}>
                <button className="btn btn-outline-primary-new rounded-pill py-3 px-12">
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
          ) : null}
        </div>
      </div>

      {/* tahapan pendaftaran */}
      <StepRegister />

      {/* Rilis Media & Informasi Terbaru */}
      <RilisMedia
        berita={
          publikasi && publikasi.berita && publikasi.berita.length !== 0
            ? publikasi.berita.length
            : null
        }
      />

      {/* Galeri Terupdate dan Terkini */}
      <GaleryUpdate
        gambar={
          publikasi && publikasi.gallery && publikasi.gallery.length !== 0
            ? publikasi.gallery.length
            : null
        }
      />

      {/* Informasi Dalam Video Terkini */}
      <InfoVideo
        video={
          publikasi && publikasi.video && publikasi.video.length !== 0
            ? publikasi.video.length
            : null
        }
      />

      {/* Ayo Bergabung, Jadi Jagoan Digital! */}
      <ComeJoin />

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default Beranda;
