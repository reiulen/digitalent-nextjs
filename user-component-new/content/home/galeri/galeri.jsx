import React, { useEffect, useState } from "react";
import Image from "next/image";
import Pagination from "react-js-pagination";
import moment from "moment";
import { Modal, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Card, Container } from "react-bootstrap";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import styles from "../../../../styles/previewGaleri.module.css";
import ShareOverlay from "../../../../user-component-new/components/global/ShareOverlay.component";

import {
  getAllBerandaGaleri,
  getDetailBerandaGaleri,
} from "../../../../redux/actions/beranda/galeri.actions";
import PulseLoaderRender from "../../../components/loader/PulseLoader";
import SubHeaderComponent from "../../../components/global/Breadcrumb.component";
import HomeWrapper from "../../../components/wrapper/Home.wrapper";

const Galeri = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    galeri,
    loading: loadingGaleri,
    error: errorAllGaleri,
  } = useSelector((state) => state.allBerandaGaleri);
  const {
    detail,
    loading: loadingDetail,
    error: errorDetail,
  } = useSelector((state) => state.detailBerandaGaleri);
  const { kategori } = useSelector((state) => state.kategoriBerandaGaleri);

  const titleToTrim = 13;
  const categoryToTrim = 9;
  const descToTrim = 500;

  const [activeTitle, setActiveTitle] = useState(
    "Galeri Terupdate dan Terkini"
  );
  const [show, setShow] = useState(null);
  const [kategoriGaleri, setKategoriGaleri] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [tag, setTag] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showArrow, setShowArrow] = useState(null);
  const [kategoriToShow, setKategoriToShow] = useState([]);

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
  }, [detail]);

  useEffect(() => {
    handleCardIndex();
    handleKategoriToShow();
  }, []);

  const handleCardIndex = () => {
    let arr = [];

    if (galeri && galeri.gallery.length) {
      for (let i = 0; i < galeri.gallery.length; i++) {
        arr.push(false);
      }
    }

    setShow(arr);
  };

  const handleMouseEnter = (index) => {
    let arr = [...show];
    for (let i = 0; i < arr.length; i++) {
      arr[i] = false;

      if (i == index) {
        arr[i] = true;
      }
    }

    setShow(arr);
  };

  const handleMouseLeave = (index) => {
    let arr = [...show];

    for (let i = 0; i < arr.length; i++) {
      if (i == index) {
        arr[i] = false;
      }
    }
    setShow(arr);
  };

  const handleDataModal = (id) => {
    dispatch(getDetailBerandaGaleri(id));
    setShowFullDesc(false);
    setShowModal(true);
  };

  const handleFilterKategori = (str) => {
    setActiveTitle("Galeri Terupdate dan Terkini");
    setKategoriGaleri(str);

    if (str.includes("&")) {
      let text = str.replace("&", "%26");
      dispatch(getAllBerandaGaleri(activePage, text, tag));
    } else {
      dispatch(getAllBerandaGaleri(activePage, str, tag));
    }
  };

  const handleKategoriToShow = () => {
    if (galeri) {
      let obj = galeri.gallery;
      let arr = [];
      let result = [];

      for (let i = 0; i < obj.length; i++) {
        arr.push(obj[i].nama_kategori);
      }

      for (let j = 0; j < arr.length; j++) {
        if (j === 0) {
          result.push(arr[j]);
        } else {
          if (result.includes(arr[j]) === false) {
            result.push(arr[j]);
          }
        }
      }
      setKategoriToShow(result);

      if (result.length > 4) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    }
  };

  const handlePagination = (pageNumber) => {
    setActivePage(pageNumber);

    dispatch(getAllBerandaGaleri(pageNumber, kategoriGaleri, tag));
  };

  const handleFilterTag = (str) => {
    setActiveTitle(`#${str.toUpperCase()}`);
    // setTag(str)
    dispatch(getAllBerandaGaleri(activePage, kategoriGaleri, str));
  };

  const handleTitleToTrim = (str) => {
    let result = null;

    if (str.length > titleToTrim) {
      result = str.slice(0, titleToTrim) + "...";
    } else {
      result = str;
    }

    return result;
  };

  const handleDescToTrim = (str) => {
    let result = null;

    if (str.length > descToTrim) {
      result = str.slice(0, descToTrim) + "...";
    } else {
      result = str;
    }
    return result;
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={`${styles.containerGaleri} bg-white`}>
      <HomeWrapper>
        {/* BreadCrumb */}
        <SubHeaderComponent data={[{ link: router.asPath, name: "Galeri" }]} />
        <div className="row flex-column">
          {/* Header */}
          <div className="col-12 mt-5">
            <h1
              className="fw-700"
              style={{
                fontSize: "40px",
                lineHeight: "120%",
                letterSpacing: "0.025em",
              }}
            >
              {activeTitle}
            </h1>
            <div className="mt-3" style={{ fontSize: "18px" }}>
              Temukan konten terupdate dan terkini mengenai Digital Talent
              Scholarship
            </div>
          </div>

          {/* Filter Button */}
          {/* Filter on Desktop */}
          {kategoriToShow ? (
            <div className="col-12 pl-0 ml-4 mt-10 mb-5 d-none d-lg-block">
              {showArrow === null ? (
                <div className="col-12">
                  <PulseLoaderRender />
                </div>
              ) : showArrow === true ? (
                <div style={{ marginLeft: "-17px" }}>
                  <Splide
                    options={{
                      arrows: true,
                      pagination: false,
                      gap: "1rem",
                      drag: "free",
                      perPage: 5,
                      autoWidth: true,
                      breakpoints: {
                        830: {
                          perPage: 2,
                        },
                        576: {
                          perPage: 1,
                        },
                        320: {
                          perPage: 1,
                        },
                        280: {
                          perPage: 1,
                        },
                      },
                    }}
                    className="pl-22 pr-15"
                  >
                    {kategoriGaleri === "" ? (
                      <SplideSlide>
                        <div
                          className={`${styles.kategoriGaleri} d-flex align-items-center justify-content-center rounded-pill bg-primary-dashboard py-1 px-3 mr-7 my-5`}
                          style={{ cursor: "pointer", height: "40px" }}
                          onClick={() => handleFilterKategori("")}
                        >
                          <div className="my-1 mx-3 py-1 px-3 text-white">
                            SEMUA
                          </div>
                        </div>
                      </SplideSlide>
                    ) : (
                      <SplideSlide>
                        <div
                          className={`${styles.kategoriGaleri} d-flex align-items-center justify-content-center border rounded-pill bg-white py-1 px-3 mr-7 my-5`}
                          style={{ cursor: "pointer", height: "40px" }}
                          onClick={() => handleFilterKategori("")}
                        >
                          <div className="my-1 mx-3 py-1 px-3 text-muted">
                            SEMUA
                          </div>
                        </div>
                      </SplideSlide>
                    )}
                    {kategoriToShow
                      ? kategoriToShow.map((el, i) => {
                        return kategoriGaleri == el ? (
                          <SplideSlide>
                            <div
                              className={`${styles.kategoriGaleri} d-flex align-items-center justify-content-center border rounded-pill bg-primary-dashboard py-1 px-3 mr-7 my-5`}
                              style={{ cursor: "pointer", height: "40px" }}
                              onClick={() =>
                                handleFilterKategori(el.toString())
                              }
                              key={i}
                            >
                              <div className="my-1 mx-3 py-1 px-3 text-white">
                                {el.toString().toUpperCase()}
                              </div>
                            </div>
                          </SplideSlide>
                        ) : (
                          <SplideSlide>
                            <div
                              className={`${styles.kategoriGaleri} d-flex align-items-center justify-content-center border rounded-pill bg-white py-1 px-3 mr-7 my-5`}
                              style={{ cursor: "pointer", height: "40px" }}
                              onClick={() =>
                                handleFilterKategori(el.toString())
                              }
                              key={i}
                            >
                              <div className="my-1 mx-3 py-1 px-3 text-muted">
                                {el.toString().toUpperCase()}
                              </div>
                            </div>
                          </SplideSlide>
                        );
                      })
                      : null}
                  </Splide>
                </div>
              ) : (
                <Splide
                  options={{
                    arrows: false,
                    pagination: false,
                    gap: "1rem",
                    drag: "free",
                    perPage: 5,
                    autoWidth: true,
                    breakpoints: {
                      830: {
                        perPage: 2,
                      },
                    },
                  }}
                  className="ml-0"
                >
                  {kategoriGaleri === "" ? (
                    <SplideSlide>
                      <div
                        className={`${styles.kategoriGaleri} d-flex align-items-center justify-content-center rounded-pill bg-primary-dashboard py-1 px-3 mr-7 my-5`}
                        style={{ cursor: "pointer", height: "40px" }}
                        onClick={() => handleFilterKategori("")}
                      >
                        <div className="my-1 mx-3 py-1 px-3 text-white">
                          SEMUA
                        </div>
                      </div>
                    </SplideSlide>
                  ) : (
                    <SplideSlide>
                      <div
                        className={`${styles.kategoriGaleri} d-flex align-items-center justify-content-center border rounded-pill bg-white py-1 px-3 mr-7 my-5`}
                        style={{ cursor: "pointer", height: "40px" }}
                        onClick={() => handleFilterKategori("")}
                      >
                        <div className="my-1 mx-3 py-1 px-3 text-muted">
                          SEMUA
                        </div>
                      </div>
                    </SplideSlide>
                  )}
                  {kategoriToShow
                    ? kategoriToShow.map((el, i) => {
                      return kategoriGaleri == el ? (
                        <SplideSlide>
                          <div
                            className={`${styles.kategoriGaleri} d-flex align-items-center justify-content-center border rounded-pill bg-primary-dashboard py-1 px-3 mr-7 my-5`}
                            style={{ cursor: "pointer", height: "40px" }}
                            onClick={() =>
                              handleFilterKategori(el.toString())
                            }
                            key={i}
                          >
                            <div className="my-1 mx-3 py-1 px-3 text-white">
                              {el.toString().toUpperCase()}
                            </div>
                          </div>
                        </SplideSlide>
                      ) : (
                        <SplideSlide>
                          <div
                            className={`${styles.kategoriGaleri} d-flex align-items-center justify-content-center border rounded-pill bg-white py-1 px-3 mr-7 my-5`}
                            style={{ cursor: "pointer", height: "40px" }}
                            onClick={() =>
                              handleFilterKategori(el.toString())
                            }
                            key={i}
                          >
                            <div className="my-1 mx-3 py-1 px-3 text-muted">
                              {el.toString().toUpperCase()}
                            </div>
                          </div>
                        </SplideSlide>
                      );
                    })
                    : null}
                </Splide>
              )}
            </div>
          ) : null}

          {/* Filter on Tablet */}
          {kategoriToShow ? (
            <div className="col-12 pl-0 ml-4 mt-10 mb-5 d-none d-md-block d-lg-none">
              <div style={{ marginLeft: "-17px" }}>
                <Splide
                  options={{
                    arrows: true,
                    pagination: false,
                    gap: "1rem",
                    drag: "free",
                    perPage: 5,
                    autoWidth: true,
                    breakpoints: {
                      830: {
                        perPage: 2,
                      },
                      576: {
                        perPage: 1,
                      },
                      320: {
                        perPage: 1,
                      },
                      280: {
                        perPage: 1,
                      },
                    },
                  }}
                  className="pl-22 pr-15"
                >
                  {kategoriGaleri === "" ? (
                    <SplideSlide>
                      <div
                        className={`${styles.kategoriGaleri} d-flex align-items-center justify-content-center rounded-pill bg-primary-dashboard py-1 px-3 mr-7 my-5`}
                        style={{ cursor: "pointer", height: "40px" }}
                        onClick={() => handleFilterKategori("")}
                      >
                        <div className="my-1 mx-3 py-1 px-3 text-white">
                          SEMUA
                        </div>
                      </div>
                    </SplideSlide>
                  ) : (
                    <SplideSlide>
                      <div
                        className={`${styles.kategoriGaleri} d-flex align-items-center justify-content-center border rounded-pill bg-white py-1 px-3 mr-7 my-5`}
                        style={{ cursor: "pointer", height: "40px" }}
                        onClick={() => handleFilterKategori("")}
                      >
                        <div className="my-1 mx-3 py-1 px-3 text-muted">
                          SEMUA
                        </div>
                      </div>
                    </SplideSlide>
                  )}
                  {kategoriToShow
                    ? kategoriToShow.map((el, i) => {
                      return kategoriGaleri == el ? (
                        <SplideSlide>
                          <div
                            className={`${styles.kategoriGaleri} d-flex align-items-center justify-content-center border rounded-pill bg-primary-dashboard py-1 px-3 mr-7 my-5`}
                            style={{ cursor: "pointer", height: "40px" }}
                            onClick={() =>
                              handleFilterKategori(el.toString())
                            }
                            key={i}
                          >
                            <div className="my-1 mx-3 py-1 px-3 text-white">
                              {el.toString().toUpperCase()}
                            </div>
                          </div>
                        </SplideSlide>
                      ) : (
                        <SplideSlide>
                          <div
                            className={`${styles.kategoriGaleri} d-flex align-items-center justify-content-center border rounded-pill bg-white py-1 px-3 mr-7 my-5`}
                            style={{ cursor: "pointer", height: "40px" }}
                            onClick={() =>
                              handleFilterKategori(el.toString())
                            }
                            key={i}
                          >
                            <div className="my-1 mx-3 py-1 px-3 text-muted">
                              {el.toString().toUpperCase()}
                            </div>
                          </div>
                        </SplideSlide>
                      );
                    })
                    : null}
                </Splide>
              </div>
            </div>
          ) : null}

          {/* Filter on Mobile */}
          {kategoriToShow ? (
            <div className="col-12 pl-0 ml-4 mt-10 mb-5 d-block d-md-none">
              <div style={{ marginLeft: "-17px" }}>
                <Splide
                  options={{
                    arrows: true,
                    pagination: false,
                    gap: "1rem",
                    drag: "free",
                    perPage: 5,
                    autoWidth: true,
                    breakpoints: {
                      830: {
                        perPage: 2,
                      },
                      576: {
                        perPage: 1,
                      },
                      320: {
                        perPage: 1,
                      },
                      280: {
                        perPage: 1,
                      },
                    },
                  }}
                  className="pl-22 pr-15"
                >
                  {kategoriGaleri === "" ? (
                    <SplideSlide>
                      <div
                        className={`${styles.kategoriGaleri} d-flex align-items-center justify-content-center rounded-pill bg-primary-dashboard py-1 px-3 mr-7 my-5`}
                        style={{ cursor: "pointer", height: "40px" }}
                        onClick={() => handleFilterKategori("")}
                      >
                        <div className="my-1 mx-3 py-1 px-3 text-white">
                          SEMUA
                        </div>
                      </div>
                    </SplideSlide>
                  ) : (
                    <SplideSlide>
                      <div
                        className={`${styles.kategoriGaleri} d-flex align-items-center justify-content-center border rounded-pill bg-white py-1 px-3 mr-7 my-5`}
                        style={{ cursor: "pointer", height: "40px" }}
                        onClick={() => handleFilterKategori("")}
                      >
                        <div className="my-1 mx-3 py-1 px-3 text-muted">
                          SEMUA
                        </div>
                      </div>
                    </SplideSlide>
                  )}
                  {kategoriToShow
                    ? kategoriToShow.map((el, i) => {
                      return kategoriGaleri == el ? (
                        <SplideSlide>
                          <div
                            className={`${styles.kategoriGaleri} d-flex align-items-center justify-content-center border rounded-pill bg-primary-dashboard py-1 px-3 mr-7 my-5`}
                            style={{ cursor: "pointer", height: "40px" }}
                            onClick={() =>
                              handleFilterKategori(el.toString())
                            }
                            key={i}
                          >
                            <div className="my-1 mx-3 py-1 px-3 text-white">
                              {el.toString().toUpperCase()}
                            </div>
                          </div>
                        </SplideSlide>
                      ) : (
                        <SplideSlide>
                          <div
                            className={`${styles.kategoriGaleri} d-flex align-items-center justify-content-center border rounded-pill bg-white py-1 px-3 mr-7 my-5`}
                            style={{ cursor: "pointer", height: "40px" }}
                            onClick={() =>
                              handleFilterKategori(el.toString())
                            }
                            key={i}
                          >
                            <div className="my-1 mx-3 py-1 px-3 text-muted">
                              {el.toString().toUpperCase()}
                            </div>
                          </div>
                        </SplideSlide>
                      );
                    })
                    : null}
                </Splide>
              </div>
            </div>
          ) : null}
        </div>
        {/* End Filter Button */}

        {/* Content */}
        {loadingGaleri ? (
          <div className="container-fluid">
            <div className="row">
              <PulseLoaderRender />
            </div>
          </div>
        ) : (
          <div className="mt-5">
            <div className="row d-flex justify-content-evenly flex-wrap">
              {galeri && galeri.gallery && galeri.gallery.length === 0 ? (
                <div className="col-12 d-flex flex-column justify-content-center my-5">
                  <Image
                    src={`/assets/media/gambar-belum-tersedia-page.svg`}
                    width={525}
                    height={350}
                    alt="Tidak Tersedia"
                  />
                  <h1
                    className="font-weight-bolder mt-15 text-center fw-600"
                    style={{ fontFamily: "Poppins", fontSize: "24px" }}
                  >
                    Tidak ada galeri terkait "{kategoriGaleri}"
                  </h1>
                </div>
              ) : (
                galeri?.gallery.map((el, i) => {
                  return (
                    <div
                      className="col-12 col-sm-6 col-md-4 position-relative my-5"
                      key={i}
                      onMouseEnter={() => handleMouseEnter(i)}
                      onMouseLeave={() => handleMouseLeave(i)}
                    // onMouseOver={() => handleMouseEnter(i)}
                    // onMouseOut={() => handleMouseLeave(i)}
                    >
                      {show && show[i] === false ? (
                        <div
                          className="card position-relative"
                          style={{ objectFit: "cover", borderRadius: "10px" }}
                          onClick={() => handleDataModal(el.id_gallery)}
                        >
                          <Image
                            src={
                              process.env.END_POINT_API_IMAGE_PUBLIKASI +
                              "publikasi/images/" +
                              el.gambar
                            }
                            alt="Card Gallery"
                            width={500}
                            height={500}
                            className="rounded-lg"
                            objectFit="cover"
                          />
                        </div>
                      ) : (
                        <div
                          onClick={() => handleDataModal(el.id_gallery)}
                          data-target="#modalGaleri"
                          data-toggle="modal"
                        >
                          <div className="card position-relative">
                            <Image
                              src={
                                process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                "publikasi/images/" +
                                el.gambar
                              }
                              alt="Card Gallery"
                              width={500}
                              height={500}
                              className="rounded-lg"
                              objectFit="cover"
                            />
                          </div>

                          <Card.ImgOverlay
                            className="d-flex align-items-end mx-4"
                            style={{
                              cursor: "pointer",
                              transition: "height 0.5s ease-out",
                              background:
                                "linear-gradient(to bottom, transparent 0%, black 100%)",
                              borderRadius: "10px",
                            }}
                          >
                            <div className="d-flex flex-column">
                              <div>
                                {windowDimensions &&
                                  windowDimensions.width &&
                                  windowDimensions.width <= 770 ? (
                                  <div className="font-weight-bolder text-white mb-5 mx-5">
                                    {handleTitleToTrim(el.judul)}
                                  </div>
                                ) : (
                                  <h5 className="font-weight-bolder text-white mb-5 mx-5 text-break">
                                    {el.judul}
                                  </h5>
                                )}
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
                          </Card.ImgOverlay>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
        {/* End of Content */}

        {/* Modal */}

        {
          detail && showModal === true ? (
            <Modal
              show={showModal}
              onHide={() => handleCloseModal()}
              size={
                windowDimensions &&
                  windowDimensions.width &&
                  windowDimensions.width < 768
                  ? "sm"
                  : "lg"
              }
              dialogClassName="mx-10 mx-sm-auto rounded-lg"
              centered
              aria-labelledby="example-custom-modal-styling-title"
            >
              {/* <div className={`${styles.padModalGaleri} p-0 m-0`}> */}
              <Modal.Body
                className={` p-0 m-0 ${windowDimensions && windowDimensions.width <= 768
                  ? "overflow-auto"
                  : ""
                  }`}
                style={
                  windowDimensions && windowDimensions.width >= 768
                    ? { height: "479px" }
                    : {}
                }
              >
                <div className="row">
                  <div className="col-12 col-md-12 col-lg-7 position-relative">
                    {
                      detail && detail.gambar.length !== 0 ? (
                        <>
                          <div
                            id="carouselExampleIndicators"
                            className="carousel slide"
                            data-ride="carousel"
                          >
                            <div
                              className="carousel-inner"
                            >
                              {detail && detail.gambar.length !== 0
                                ? detail.gambar.map((row, i) => {
                                  return (
                                    <div className={i === 0 ? "carousel-item active" : "carousel-item"} key={i}>
                                      <div>
                                        <Image
                                          src={
                                            process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                            "publikasi/images/" +
                                            row.gambar
                                          }
                                          alt="Card Gallery"
                                          width="100%"
                                          height="105%"
                                          layout="responsive"
                                          objectFit="cover"
                                        />
                                      </div>
                                    </div>
                                  );
                                })
                                : null}
                            </div>
                            {
                              detail?.gambar.length === 1 ? null :
                                <div>
                                  <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-target="#carouselExampleIndicators"
                                    data-slide="prev"
                                    style={{
                                      position: "absolute",
                                      left: "-14px",
                                      border: "none",
                                      background: "none",
                                    }}
                                  >
                                    <span
                                      className="carousel-control-prev-icon"
                                      aria-hidden="true"
                                    ></span>
                                  </button>
                                  <button
                                    className="carousel-control-next"
                                    type="button"
                                    data-target="#carouselExampleIndicators"
                                    data-slide="next"
                                    style={{
                                      position: "absolute",
                                      right: "-12px",
                                      border: "none",
                                      background: "none",
                                    }}
                                  >
                                    <span
                                      className="carousel-control-next-icon"
                                      aria-hidden="true"
                                    ></span>
                                  </button>
                                </div>
                            }
                          </div>
                        </>
                      ) : null
                    }
                  </div>

                  <div
                    className={`${styles.contentGaleri} col-12 col-md-12 col-lg-5 pt-5`}
                  >
                    {kategori.map((element, index) => {
                      return detail.kategori_id == element.id ? (
                        <div
                          className={`${styles.kategoriModal} badge badge-light`}
                          key={index}
                        >
                          <div className="text-primary">
                            {element.nama_kategori}
                          </div>
                        </div>
                      ) : null;
                    })}

                    {/* Insert Title Here */}
                    <h5
                      className={
                        windowDimensions &&
                          windowDimensions.width &&
                          windowDimensions.width <= 770
                          ? "text-dark text-wrap text-break font-weight-bolder mt-3"
                          : "text-dark text-wrap text-break font-weight-bolder mt-3"
                      }
                      style={
                        windowDimensions.width >= 770 &&
                          detail.judul.length >= 100
                          ? { fontSize: "20px", width: "95%" }
                          : { fontSize: "24px", width: "95%" }
                      }
                    >
                      {detail.judul}
                    </h5>

                    <div
                      className={
                        windowDimensions &&
                          windowDimensions.width &&
                          windowDimensions.width <= 770
                          ? "row d-flex text-muted mr-4"
                          : "row d-flex text-muted"
                      }
                    >
                      <div
                        className="d-flex align-items-center"
                        style={{ fontSize: "12px" }}
                      >
                        <i className="ri-calendar-2-line mr-2 ml-5"></i>
                        <span>
                          {`Terbit : 
                                                ${moment(
                            detail.tanggal_publish
                          ).format("DD MMMM YYYY")}`}
                        </span>
                      </div>

                      {windowDimensions &&
                        windowDimensions.width &&
                        windowDimensions.width > 768 ? (
                        detail.dibaca === undefined ? (
                          <span className="mb-1 ml-6 p-0 d-flex align-items-center">
                            <div className="">
                              <i className="ri-eye-line"></i>
                            </div>
                            <span className="ml-2">Dibaca 0</span>
                          </span>
                        ) : (
                          <span className="mb-1 ml-5 p-0 d-flex align-items-center">
                            <div className="">
                              <i className="ri-eye-line"></i>
                            </div>
                            <span className="ml-2">Dibaca {detail.dibaca}</span>
                          </span>
                        )
                      ) : (
                        <div className="ml-4 my-1">
                          {windowDimensions &&
                            windowDimensions.width &&
                            windowDimensions.width > 768
                            ? kategori.map((element, index) => {
                              return detail.kategori_id == element.id ? (
                                <div
                                  className={`${styles.kategoriModal} badge badge-light`}
                                  key={index}
                                >
                                  <div className="text-primary">
                                    {element.nama_kategori}
                                  </div>
                                </div>
                              ) : null;
                            })
                            : null}
                        </div>
                      )}
                    </div>

                    <hr className={`${styles.borderStrip}`} />

                    <div className="pr-3">
                      {windowDimensions &&
                        windowDimensions.width &&
                        windowDimensions.width >= 992 ? (
                        <p
                          className={`${styles.isiGaleriHome} text-justify`}
                          style={
                            windowDimensions &&
                              windowDimensions.width > 768 &&
                              detail?.judul.length >= 180
                              ? { maxHeight: "120px" }
                              : windowDimensions.width > 768 &&
                                detail?.judul.length >= 130
                                ? { maxHeight: "160px" }
                                : {}
                          }
                        >
                          {detail.isi_galeri}
                          <div
                            className={
                              windowDimensions &&
                                windowDimensions.width &&
                                windowDimensions.width <= 770
                                ? "row mb-5 ml-3 mt-3"
                                : "row mb-5 mt-3"
                            }
                          >
                            <div className="col-9 d-flex flex-row flex-wrap">
                              {detail.tag
                                ? detail.tag.map((el, i) => {
                                    return (
                                      <div
                                        className={
                                          el
                                            ? `border p-2 rounded mr-2 my-1`
                                            : ""
                                        }
                                        key={i}
                                        onClick={() => handleFilterTag(el)}
                                        style={{
                                          cursor: "pointer",
                                          fontSize: "10px",
                                        }}
                                      >
                                        {el
                                          ? `#${el.toString().toUpperCase()}`
                                          : ""}
                                      </div>
                                    );
                                  })
                                : null}
                            </div>

                            <div className="col-3 text-right">
                              <ShareOverlay
                                url={`${process.env.NEXTAUTH_URL}/detail/pelatihan`}
                              >
                                <button
                                  className="btn btn-outline-light rounded-circle"
                                  style={{ width: "40px", height: "40px" }}
                                >
                                  <i className="ri-share-line p-auto m-auto"></i>
                                </button>
                              </ShareOverlay>
                            </div>
                          </div>
                        </p>
                      ) : detail.isi_galeri && showFullDesc === false ? (
                        <div className="text-justify ml-1 mr-5">
                          <span
                            style={{
                              fontSize: "14px",
                              display: "-webkit-box",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              WebkitLineClamp: "2",
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {detail.isi_galeri}
                            {/* {handleDescToTrim(detail.isi_galeri)} */}
                          </span>
                          <span
                            className="text-justify ml-0 mr-5"
                            style={{ color: "#007CFF" }}
                            onClick={() => setShowFullDesc(true)}
                          >
                            Lihat Selengkapnya..
                          </span>
                        </div>
                      ) : (
                        <div>
                          <p className="text-justify ml-1 mr-5">
                            {detail.isi_galeri}

                            {windowDimensions &&
                              windowDimensions.width &&
                              windowDimensions.width > 768 ? (
                              <div className="row mb-5 mt-3">
                                <div className="col-9 d-flex flex-row flex-wrap">
                                  {detail.tag
                                    ? detail.tag.map((el, i) => {
                                      return (
                                        <div
                                          className="border p-2 rounded mr-2 my-1"
                                          key={i}
                                          onClick={() => handleFilterTag(el)}
                                          style={{
                                            cursor: "pointer",
                                            fontSize: "10px",
                                          }}
                                        >
                                          #{el.toString().toUpperCase()}
                                        </div>
                                      );
                                    })
                                    : null}
                                </div>

                                <div className="col-3 text-right">
                                  <ShareOverlay
                                    url={`${process.env.NEXTAUTH_URL}/detail/pelatihan`}
                                  >
                                    <button
                                      className="btn btn-outline-light rounded-circle"
                                      style={{ width: "40px", height: "40px" }}
                                    >
                                      <i className="ri-share-line p-auto m-auto"></i>
                                    </button>
                                  </ShareOverlay>
                                </div>
                              </div>
                            ) : null}
                          </p>
                          <p
                            style={{ color: "#007CFF" }}
                            onClick={() => setShowFullDesc(false)}
                            className="ml-2"
                          >
                            Lihat Lebih Sedikit
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer className="d-block d-lg-none">
                <div className="row my-n2">
                  <div className="col-9 d-flex flex-row flex-wrap">
                    {detail.tag
                      ? detail.tag.map((el, i) => {
                        return (
                          <div
                            className="border p-2 rounded mr-9 my-1 ml-n7"
                            key={i}
                            onClick={() => handleFilterTag(el)}
                            style={{ cursor: "pointer", fontSize: "10px" }}
                          >
                            #{el.toString().toUpperCase()}
                          </div>
                        );
                      })
                      : null}
                  </div>

                  <div className="col-3 text-right">
                    <ShareOverlay
                      url={`${process.env.NEXTAUTH_URL}/detail/pelatihan`}
                    >
                      <button
                        className="btn btn-outline-light rounded-circle"
                        style={{ width: "40px", height: "40px" }}
                      >
                        <i className="ri-share-line p-auto m-auto"></i>
                      </button>
                    </ShareOverlay>
                  </div>
                </div>
              </Modal.Footer>

              {/* </div> */}
            </Modal>
          ) : (
            // <div className={`${styles.padModalGaleri}`}>
            <Modal show={showModal} onHide={() => handleCloseModal()}>
              <Modal.Header>
                <h5>Memuat..</h5>
              </Modal.Header>

              <Modal.Body>
                <div className="container-fluid">
                  <div className="row">
                    <PulseLoaderRender />
                  </div>
                </div>
              </Modal.Body>

              <Modal.Footer>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => handleCloseModal()}
                >
                  Tutup
                </button>
              </Modal.Footer>
            </Modal>
          )
          // </div>
        }

        {/* Pagination */}
        {galeri && galeri.total >= 9 ? (
          <div className="row my-5 d-flex justify-content-center">
            <div className="table-pagination">
              <Pagination
                activePage={activePage}
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
        ) : null}
        {/* </div> */}

        {/* End of Pagination */}
      </HomeWrapper>
    </div>
  );
};

export default Galeri;
