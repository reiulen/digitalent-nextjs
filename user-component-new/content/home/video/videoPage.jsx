import React, { useEffect, useState } from "react"
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import Image from "next/image";
import Pagination from "react-js-pagination";
import ReactPlayer from "react-player";
import moment from "moment";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import {
  Container,
  Modal
} from "react-bootstrap";

import SubHeaderComponent from "../../../components/global/Breadcrumb.component";
import PulseLoaderRender from "../../../components/loader/PulseLoader";
import HomeWrapper from "../../../components/wrapper/Home.wrapper";

import {
  playVideoContent,
  getAllVideoContent,
  getDetailBerandaVideo,
} from "../../../../redux/actions/beranda/video-content.actions";

import styles from "../video/videoPage.module.css"

const VideoPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    loading: allLoading,
    video,
  } = useSelector((state) => state.allVideoContent);

  const { detail } = useSelector((state) => state.detailBerandaVideo);
  const { dataTag } = useSelector((state) => state.allTagVideoContent);
  const { kategori } = useSelector((state) => state.kategoriVideoContent);
  const { loading: playLoading } = useSelector((state) => state.playVideoContent)

  const [video_playing, setVideoPlaying] = useState(false);
  const [kategoriVideo, setKategoriVideo] = useState("");
  const [tag, setTag] = useState("");
  const [filterPublish, setFilterPublish] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [keyword, setKeyword] = useState(null);
  const [sort, setSort] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [limit, setLimit] = useState("");
  const [activeTitle, setActiveTitle] = useState("Video Terupdate dan Terkini")
  const [show, setShow] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [showDesc, setShowDesc] = useState(false)
  const [tagVideo, setTagVideo] = useState([])
  const [kategoriToShow, setKategoriToShow] = useState([])
  const [showArrow, setShowArrow] = useState(null)
  const [videoContent, setVideoContent] = useState([])
  const [showDescButton, setShowDescButton ] = useState(false)

  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  const [windowDimensions, setWindowDimensions] = useState(
    {}
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    setWindowDimensions(getWindowDimensions());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [video])

  useEffect(() => {

  }, [windowDimensions])

  useEffect(() => {
    handleEmptyTag()
    handleKategoriToShow()
  }, [])

  // Handle Empty Tag
  const handleEmptyTag = () => {
    if (video) {
      let arr = video?.video
      let temps = []
      let result = []
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].tag?.length; j++) {
          if (
            arr[i].tag[j].length !== 0 &&
            arr[i].tag[j] !== null &&
            arr[i].tag[j] !== undefined &&
            arr[i].tag[j] !== " " &&
            arr[i].tag[j] !== ""
          ) {
            temps.push(arr[i].tag[j])
          }
        }
      }

      for (let k = 0; k < temps.length; k++) {
        if (k === 0) {
          result.push(temps[k])

        } else {
          if (result.includes(temps[k]) === false) {
            result.push(temps[k])
          }
        }
      }
      setTagVideo(result)
    }

  }

  // Handle Empty Kategori not show
  const handleKategoriToShow = () => {
    if (video) {
      let obj = video?.video
      let arr = []
      let result = []

      for (let i = 0; i < obj.length; i++) {
        arr.push(obj[i].nama_kategori)
      }

      for (let j = 0; j < arr.length; j++) {
        if (j === 0) {
          result.push(arr[j])

        } else {
          if (result.includes(arr[j]) === false) {
            result.push(arr[j])
          }
        }

      }
      setKategoriToShow(result)

      if (result.length > 3) {
        setShowArrow(true)

      } else {
        setShowArrow(false)
      }
    }

  }

  const handlePagination = (pageNumber) => {
    setActivePage(pageNumber);
    dispatch(
      getAllVideoContent(
        pageNumber,
        keyword,
        limit,
        filterPublish,
        sort,
        category_id,
        kategoriVideo,
        tag
      )
    );

    window.scrollTo(0,0)
  };

  const handleDescToTrim = (str, size) => {
    let result = null;

    let trimLg = 350
    let trimMd = 150
    let trimSm = 50

    if (size === "lg"){

      if (str.length > trimLg) {
          result = str.slice(0, trimLg) + "...";
        } else {
          result = str;
        }
    
        return result;
    } else if (size === "md"){

      if (str.length > trimMd) {
        result = str.slice(0, trimMd) + "...";
      } else {
        result = str;
      }
  
      return result;
    } else if (size === "sm"){

      if (str.length > trimMd) {
        result = str.slice(0, trimSm) + "...";
      } else {
        result = str;
      }
  
      return result;
    }
    
  };

  const handleFilterTag = (str) => {
    if (str === "") {
      setActiveTitle("Video Terupdate dan Terkini")
    }
    setActiveTitle(`#${str.toString().toUpperCase()}`)

    dispatch(
      getAllVideoContent(
        1,
        keyword,
        limit,
        filterPublish,
        sort,
        category_id,
        kategoriVideo,
        str
      )
    );

    window.scrollTo(0,0)
  };

  const submitFilter = () => {
    dispatch(
      getAllVideoContent(
        1,
        keyword,
        limit,
        filterPublish,
        sort,
        category_id,
        kategoriVideo,
        tag
      )
    );

    window.scrollTo(0,0)
  };

  const handleFilterKeyword = (e) => {
    e.preventDefault();
    dispatch(
      getAllVideoContent(
        1,
        keyword,
        limit,
        filterPublish,
        sort,
        category_id,
        kategoriVideo,
        tag
      )
    );

    window.scrollTo(0,0)
  };

  const handleFilterPublish = (publish, status) => {
    setFilterPublish(publish);
    setShowDescButton(status)
    setSort("")
  };

  const handleSort = (sort, filter) => {
    setSort(sort);
    setShowDescButton(false)
    setFilterPublish(filter)
  };

  const handleFilterKategori = (str) => {
    setKategoriVideo(str);
    setActiveTitle("Video Terupdate dan Terkini")
    dispatch(
      getAllVideoContent(
        1,
        keyword,
        limit,
        filterPublish,
        sort,
        category_id,
        str,
        tag
      )
    );

    window.scrollTo(0,0)
  };

  const handlePreview = (
    id,
  ) => {
    setVideoPlaying(true);
    setShow(true)
    dispatch(getDetailBerandaVideo(id))
    handleIsPlayed(id)
  };

  const handleIsPlayed = (id_video) => {
    const data = {
      id: id_video,
      _method: "PUT",
      isplay: "1",
    };
    dispatch(playVideoContent(data));
  };

  const handleToggleModal = () => {
    setShow(false)
    setVideoPlaying(false)
    setShowDesc(false)
  }

  return (
    <>
      <HomeWrapper>
        {/* BreadCrumb */}
        <SubHeaderComponent
          data={[{ link: router.asPath, name: "Video" }]}
        />
        {/* End of Breadcrumb */}

        {/* Header */}
        <div className="col-12">
          <h1
            className="fw-700"
            style={{ fontSize: "40px", fontFamily: "Poppins" }}
          >
            {activeTitle}
          </h1>
          <span style={{fontSize: "18px", fontFamily:"Poppins", color:"#6C6C6C"}}>
            Temukan konten terupdate dan terkini mengenai Digital Talent
            Scholarship
          </span>
        </div>
        {/* End of Header */}

        {/* Filter Button */}
        {/* Filter on Desktop */}
        <div
          className="col-xl-8 col-12 pl-0 ml-0 mt-10 mb-5 pr-0 pr-xxl-11 d-none d-lg-block"
        >
          {
            showArrow === null ?
              <div className="col col-12">
                <PulseLoaderRender />
              </div> 
            :

              showArrow === true ?
                <Splide
                  options={{
                    arrows: true,
                    pagination: false,
                    gap: "1rem",
                    drag: "free",
                    perPage: 4,
                    breakpoints: {
                      830: {
                        perPage: 2,
                      },
                      450: {
                        perPage: 1,
                      },
                    }
                  }}
                  className="px-20 mr-n5 mr-sm-n2 ml-n5 ml-sm-n2"
                >

                  {kategoriVideo === "" ? (
                    <SplideSlide>
                      <div
                        className="d-flex align-items-center justify-content-center rounded-pill bg-primary-dashboard py-1 px-9 m-2 "
                        style={{ cursor: "pointer", height: "40px"}}
                        onClick={() => handleFilterKategori("")}
                      >
                        <div className="my-1 mx-5 py-1 px-9 text-white text-center">SEMUA</div>
                      </div>
                    </SplideSlide>

                  ) : (
                    <SplideSlide>
                      <div
                        className="d-flex align-items-center justify-content-center rounded-pill bg-white py-1 px-9 border border-muted m-2 "
                        style={{ cursor: "pointer", height: "40px"}}
                        onClick={() => handleFilterKategori("")}
                      >
                        <div className="my-1 mx-5 py-1 px-9 text-muted text-center">SEMUA</div>
                      </div>
                    </SplideSlide>
                  )}

                  {
                    kategoriToShow ?
                      kategoriToShow.map((row, i) => {
                        return kategoriVideo === row ? (
                          <SplideSlide>
                            <div
                              className="d-flex align-items-center justify-content-center rounded-pill bg-primary-dashboard py-1 px-9 border border-muted m-2 "
                              style={{ cursor: "pointer", height: "40px"}}
                              onClick={() => handleFilterKategori(row)}
                              key={i}
                            >
                              <div className="my-1 mx-auto py-1 px-auto text-white text-center">
                                {row.toString().toUpperCase()}
                                {/* {row.toString()} */}
                              </div>
                            </div>
                          </SplideSlide>

                        ) : (
                          <SplideSlide>
                            <div
                              className="d-flex align-items-center justify-content-center rounded-pill bg-white py-1 px-9 border border-muted m-2 "
                              style={{ cursor: "pointer", height: "40px"}}
                              onClick={() => handleFilterKategori(row)}
                              key={i}
                            >
                              <div className="my-1 mx-auto py-1 px-auto text-muted text-center">
                                {row.toString().toUpperCase()}
                                {/* {row.toString()} */}
                              </div>
                            </div>
                          </SplideSlide>
                        );
                      })
                      :
                      null
                  }

                </Splide>
                :
                <Splide
                  options={{
                    arrows: false,
                    pagination: false,
                    gap: "1rem",
                    drag: "free",
                    perPage: 4,
                    breakpoints: {
                      830: {
                        perPage: 2,
                      },
                      450: {
                        perPage: 1,
                      },
                    }
                  }}
                  className= "ml-2 ml-sm-3 mr-3 pr-0 mr-lg-5"
                >

                  {kategoriVideo === "" ? (
                    <SplideSlide>
                      <div
                        className="d-flex align-items-center justify-content-center rounded-pill bg-primary-dashboard py-1 px-9 m-2 "
                        style={{ cursor: "pointer", height: "40px" }}
                        onClick={() => handleFilterKategori("")}
                      >
                        <div className="my-1 mx-5 py-1 px-9 text-white text-center">SEMUA</div>
                      </div>
                    </SplideSlide>

                  ) : (
                    <SplideSlide>
                      <div
                        className="d-flex align-items-center justify-content-center rounded-pill bg-white py-1 px-9 border border-muted m-2 "
                        style={{ cursor: "pointer", height: "40px" }}
                        onClick={() => handleFilterKategori("")}
                      >
                        <div className="my-1 mx-5 py-1 px-9 text-muted text-center">SEMUA</div>
                      </div>
                    </SplideSlide>
                  )}

                  {
                    kategoriToShow ?
                      kategoriToShow.map((row, i) => {
                        return kategoriVideo === row ? (
                          <SplideSlide>
                            <div
                              className="d-flex w-100 align-items-center justify-content-center rounded-pill bg-primary-dashboard py-1 px-9 border border-muted m-2 "
                              style={{ cursor: "pointer", height: "40px"}}
                              onClick={() => handleFilterKategori(row)}
                              key={i}
                            >
                              <div className="my-1 mx-auto py-1 px-auto text-white text-center">
                                {row.toString().toUpperCase()}
                                {/* {row.toString()} */}
                              </div>
                            </div>
                          </SplideSlide>

                        ) : (
                          <SplideSlide>
                            <div
                              className="d-flex w-100 align-items-center justify-content-center rounded-pill bg-white py-1 px-9 border border-muted m-2 "
                              style={{ cursor: "pointer", height: "40px"}}
                              onClick={() => handleFilterKategori(row)}
                              key={i}
                            >
                              <div className="my-1 mx-auto py-1 px-auto text-muted text-center">
                                {row.toString().toUpperCase()}
                                {/* {row.toString()} */}
                              </div>
                            </div>
                          </SplideSlide>
                        );
                      })
                      :
                      null
                  }

                </Splide>
          }

        </div>
        
        {/* Filter on Tablet */}
        <div className="col-xl-8 col-12 pl-0 ml-0 mt-10 mb-5 pr-0 pr-xxl-11 d-none d-md-block d-lg-none">
          <Splide
            options={{
              arrows: true,
              pagination: true,
              gap: "1rem",
              drag: "free",
              perPage: 4,
              breakpoints: {
                830: {
                  perPage: 2,
                },
                450: {
                  perPage: 1,
                },
              }
            }}
            className="px-20"
          >

            {kategoriVideo === "" ? (
              <SplideSlide>
                <div
                  className="d-flex align-items-center justify-content-center rounded-pill bg-primary-dashboard py-1 px-9 m-2 "
                  style={{ cursor: "pointer", height: "40px"}}
                  onClick={() => handleFilterKategori("")}
                >
                  <div className="my-1 mx-5 py-1 px-9 text-white text-center">SEMUA</div>
                </div>
              </SplideSlide>

            ) : (
              <SplideSlide>
                <div
                  className="d-flex align-items-center justify-content-center rounded-pill bg-white py-1 px-9 border border-muted m-2 "
                  style={{ cursor: "pointer", height: "40px"}}
                  onClick={() => handleFilterKategori("")}
                >
                  <div className="my-1 mx-5 py-1 px-9 text-muted text-center">SEMUA</div>
                </div>
              </SplideSlide>
            )}

            {
              kategoriToShow ?
                kategoriToShow.map((row, i) => {
                  return kategoriVideo === row ? (
                    <SplideSlide>
                      <div
                        className="d-flex align-items-center justify-content-center rounded-pill bg-primary-dashboard py-1 px-9 border border-muted m-2 "
                        style={{ cursor: "pointer", height: "40px"}}
                        onClick={() => handleFilterKategori(row)}
                        key={i}
                      >
                        <div className="my-1 mx-auto py-1 px-auto text-white text-center">
                          {row.toString().toUpperCase()}
                          {/* {row.toString()} */}
                        </div>
                      </div>
                    </SplideSlide>

                  ) : (
                    <SplideSlide>
                      <div
                        className="d-flex align-items-center justify-content-center rounded-pill bg-white py-1 px-9 border border-muted m-2 "
                        style={{ cursor: "pointer", height: "40px"}}
                        onClick={() => handleFilterKategori(row)}
                        key={i}
                      >
                        <div className="my-1 mx-auto py-1 px-auto text-muted text-center">
                          {row.toString().toUpperCase()}
                          {/* {row.toString()} */}
                        </div>
                      </div>
                    </SplideSlide>
                  );
                })
                :
                null
            }

          </Splide>
        </div>

        {/* Filter on Mobile */}
        <div className="col-xl-8 col-12 pl-0 ml-0 mt-10 mb-5 pr-0 pr-xxl-11 d-block d-md-none">
          <Splide
            options={{
              arrows: true,
              pagination: false,
              gap: "1rem",
              drag: "free",
              perPage: 4,
              breakpoints: {
                830: {
                  perPage: 2,
                },
                450: {
                  perPage: 1,
                },
              }
            }}
            className="px-20"
          >

            {kategoriVideo === "" ? (
              <SplideSlide>
                <div
                  className="d-flex align-items-center justify-content-center rounded-pill bg-primary-dashboard py-1 px-9 m-2 "
                  style={{ cursor: "pointer", height: "40px"}}
                  onClick={() => handleFilterKategori("")}
                >
                  <div className="my-1 mx-5 py-1 px-9 text-white text-center">SEMUA</div>
                </div>
              </SplideSlide>

            ) : (
              <SplideSlide>
                <div
                  className="d-flex align-items-center justify-content-center rounded-pill bg-white py-1 px-9 border border-muted m-2 "
                  style={{ cursor: "pointer", height: "40px"}}
                  onClick={() => handleFilterKategori("")}
                >
                  <div className="my-1 mx-5 py-1 px-9 text-muted text-center">SEMUA</div>
                </div>
              </SplideSlide>
            )}

            {
              kategoriToShow ?
                kategoriToShow.map((row, i) => {
                  return kategoriVideo === row ? (
                    <SplideSlide>
                      <div
                        className="d-flex align-items-center justify-content-center rounded-pill bg-primary-dashboard py-1 px-9 border border-muted m-2 "
                        style={{ cursor: "pointer", height: "40px"}}
                        onClick={() => handleFilterKategori(row)}
                        key={i}
                      >
                        <div className="my-1 mx-auto py-1 px-auto text-white text-center text-truncate">
                          {row.toString().toUpperCase()}
                          {/* {row.toString()} */}
                        </div>
                      </div>
                    </SplideSlide>

                  ) : (
                    <SplideSlide>
                      <div
                        className="d-flex align-items-center justify-content-center rounded-pill bg-white py-1 px-9 border border-muted m-2 "
                        style={{ cursor: "pointer", height: "40px"}}
                        onClick={() => handleFilterKategori(row)}
                        key={i}
                      >
                        <div className="my-1 mx-auto py-1 px-auto text-muted text-center text-truncate">
                          {row.toString().toUpperCase()}
                          {/* {row.toString()} */}
                        </div>
                      </div>
                    </SplideSlide>
                  );
                })
                :
                null
            }

          </Splide>
        </div>

        {/* End of Filter Button */}

        {/* Content */}
        <div className="row">

          {/* Left Side */}
          <div
            className={
              windowDimensions && windowDimensions.width && windowDimensions.width <= 770 ?
                "col-xl-8 col-12 mt-5 mb-3 pr-10"
                :
                "col-xl-8 col-12 mt-5 mb-3"
            }
          >

            {/* Filter at mobile screen */}

            {/* {
              windowDimensions && windowDimensions.width && windowDimensions.width <= 1024 ?
                <div className="card mb-15 p-5 ml-4">
                  <div className="row  mt-3">
                    <div className="col-10 d-flex flex-row">
                      <Image
                        src={`/assets/media/logo-filter.svg`}
                        width={40}
                        height={40}
                        alt="Logo filter"
                      />
                      <h3 className="d-flex align-items-center font-weight-bolder ml-3 mt-3">
                        Filter
                      </h3>
                    </div>
                    <div className="col-2 my-auto text-right">
                      {
                        showFilter === false ?
                          <div onClick={() => setShowFilter(true)}>
                            <i className="ri-arrow-right-s-line"></i>
                          </div>
                          :
                          <div onClick={() => setShowFilter(false)}>
                            <i className="ri-arrow-down-s-line"></i>
                          </div>
                      }
                    </div>
                  </div>

                  {
                    showFilter === true ?
                      <>
                        <div className="card-body">
                          <h5 style={{fontSize:"16px", fontFamily:"Poppins"}}>Urutkan Berdasarkan</h5>
                          <div className="row justify-content-between">
                            <div className="col-6">
                              {filterPublish === "desc" && sort === "" ? (
                                <button
                                  className="btn btn-primary rounded-pill btn-block"
                                  onClick={() => handleFilterPublish("")}
                                  style={{ fontSize: "14px", fontFamily: "Poppins" }}
                                >
                                  Terbaru
                                </button>
                              ) : (
                                <button
                                  className="btn btn-outline-light rounded-pill btn-block"
                                  onClick={() => handleFilterPublish("desc")}
                                  style={{ fontFamily: "Poppins", color: "#ADB5BD", fontSize: '14px' }}
                                >
                                  Terbaru
                                </button>
                              )}
                            </div>

                            <div className="col-6">
                              {filterPublish === "asc" && sort === "" ? (
                                <button
                                  className="btn btn-primary rounded-pill btn-block"
                                  onClick={() => handleFilterPublish("")}
                                  style={{ fontSize: "14px", fontFamily: "Poppins" }}
                                >
                                  Terlama
                                </button>
                              ) : (
                                <button
                                  className="btn btn-outline-light rounded-pill btn-block"
                                  onClick={() => handleFilterPublish("asc")}
                                  style={{ fontFamily: "Poppins", color: "#ADB5BD", fontSize: '14px' }}
                                >
                                  Terlama
                                </button>
                              )}
                            </div>
                          </div>
                          <div className="row justify-content-between mt-3">
                            <div className="col-6">
                              {sort === "asc" && filterPublish === "" ? (
                                <button
                                  className="btn btn-primary rounded-pill btn-block"
                                  onClick={() => handleSort("")}
                                  style={{ fontSize: "14px", fontFamily: "Poppins" }}
                                >
                                  A-Z
                                </button>
                              ) : (
                                <button
                                  className="btn btn-outline-light rounded-pill btn-block"
                                  onClick={() => handleSort("asc")}
                                  style={{ fontFamily: "Poppins", color: "#ADB5BD", fontSize: '14px' }}
                                >
                                  A-Z
                                </button>
                              )}
                            </div>

                            <div className="col-6">
                              {sort === "desc" && filterPublish === "" ? (
                                <button
                                  className="btn btn-primary rounded-pill btn-block"
                                  onClick={() => handleSort("")}
                                  style={{ fontSize: "14px", fontFamily: "Poppins" }}
                                >
                                  Z-A
                                </button>
                              ) : (
                                <button
                                  className="btn btn-outline-light rounded-pill btn-block"
                                  onClick={() => handleSort("desc")}
                                  style={{ fontFamily: "Poppins", color: "#ADB5BD", fontSize: '14px' }}
                                >
                                  Z-A
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn btn-primary mb-5"
                          style={{ width: "90%", margin: "auto", borderRadius: "30px" }}
                          onClick={() => submitFilter()}
                        >
                          Tampilkan
                        </button>
                      </>
                      :
                      null
                  }
                </div>
                :
                null
            } */}

                {
                        
                  windowDimensions && windowDimensions.width && windowDimensions.width <= 770 ?
                      <div className="border rounded-lg p-2 order-1 mb-10 ml-3">
                          <div className="row "> 
                              <div className="col-2 my-auto ml-3">
                                  <Image 
                                      src={`/assets/media/logo-filter.svg`}
                                      width={40}
                                      height={40}
                                      alt="Logo filter"
                                  />
                              </div>
                              <div className="col-7 my-auto">
                                  <h3 className={`font-weight-bolder ${styles.fontText}`}>
                                      Filter
                                  </h3>
                              </div>
                              <div className="col-2 my-auto text-right">
                                  {
                                      showFilter === false ?
                                          <div onClick={() => setShowFilter(true)}>
                                              <i className="ri-arrow-right-s-line"></i>
                                          </div>
                                      :
                                          <div onClick={() => setShowFilter(false)}>
                                              <i className="ri-arrow-down-s-line"></i>
                                          </div>
                                  }
                                  
                              </div>
                          </div>

                          {
                              showFilter === true ?
                                  <>
                                      <div className="row ml-3 mt-5">
                                          <p style={{fontSize:"16px", fontFamily:"Poppins"}}>
                                              Urutkan Berdasarkan
                                          </p>
                                      </div>

                                      <div className="row mx-3 mb-3 d-flex justify-content-between">
                                          <div className=" col-6">
                                              {
                                                  showDescButton === true && sort === "" ?
                                                      <button 
                                                          className="btn btn-primary rounded-pill btn-block" 
                                                          onClick={() => handleFilterPublish("", false)}
                                                          style={{fontFamily: "Poppins", fontSize:'14px'}}
                                                      >
                                                          Terbaru
                                                      </button>
                                                  :
                                                      <button 
                                                          className="btn btn-outline-light rounded-pill btn-block" 
                                                          onClick={() => handleFilterPublish("desc", true)}
                                                          style={{fontFamily: "Poppins", color:"#ADB5BD", fontSize:'14px'}}
                                                      >
                                                          Terbaru
                                                      </button>
                                              }
                                          </div>

                                          <div className="col-6">
                                              {
                                                  filterPublish === "asc"  && sort === "" ?
                                                      <button 
                                                          className="btn btn-primary rounded-pill btn-block" 
                                                          onClick={() => handleFilterPublish("desc", false)}
                                                          style={{fontFamily: "Poppins", fontSize:'14px'}}
                                                      >
                                                          Terlama
                                                      </button>
                                                  :
                                                      <button 
                                                          className="btn btn-outline-light rounded-pill btn-block" 
                                                          onClick={() => handleFilterPublish("asc", false)}
                                                          style={{fontFamily: "Poppins", color:"#ADB5BD", fontSize:'14px'}}
                                                      >
                                                          Terlama
                                                      </button>
                                              }
                                          </div>
                                      </div>

                                      <div className="row mx-3 mb-3 d-flex justify-content-between">
                                          <div className="col-6">
                                              {
                                                  sort === "asc" && showDescButton === false   ?
                                                      <button 
                                                          className="btn btn-primary rounded-pill btn-block" 
                                                          onClick={() => handleSort("", "desc")}
                                                          style={{fontFamily: "Poppins", fontSize:'14px'}}
                                                      >
                                                          A-Z
                                                      </button>
                                                  :
                                                      <button 
                                                          className="btn btn-outline-light rounded-pill btn-block" 
                                                          onClick={() => handleSort("asc", "")}
                                                          style={{fontFamily: "Poppins", color:"#ADB5BD", fontSize:'14px'}}
                                                      >
                                                          A-Z
                                                      </button>
                                              }
                                          </div>

                                          <div className="col-6">
                                              {
                                                  sort === "desc" &&  showDescButton === false   ?
                                                      <button 
                                                          className="btn btn-primary rounded-pill btn-block" 
                                                          onClick={() => handleSort("", "desc")}
                                                          style={{fontFamily: "Poppins", fontSize:'14px'}}
                                                      >
                                                          Z-A
                                                      </button>
                                                  :
                                                      <button 
                                                          className="btn btn-outline-light rounded-pill btn-block" 
                                                          onClick={() => handleSort("desc", "")}
                                                          style={{fontFamily: "Poppins", color:"#ADB5BD", fontSize:'14px'}}
                                                      >
                                                          Z-A
                                                      </button>
                                              }
                                              
                                          </div>
                                      </div>

                                      {/* <div className="row ml-3 mt-5">
                                          <p style={{fontSize:"16px", fontFamily:"Poppins"}}>
                                              Akademi
                                          </p>
                                      </div>

                                      <div className="mx-3 mb-7">
                                          {
                                              optionAkademi && optionAkademi.length !== 0 ?
                                                  <Select
                                                      placeholder="Semua Akademi"
                                                      options={optionAkademi}
                                                      onChange={(e) => handleCategoryAcademy(e?.value)}
                                                      styles={customStyle}
                                                      components={{
                                                          IndicatorSeparator: () => null
                                                        }}
                                                  />
                                              :
                                                  null
                                          }
                                          
                                      </div> */}

                                      <div className="row mx-3 mb-3">
                                          <button 
                                              className="btn btn-primary-dashboard rounded-pill btn-block"
                                              onClick={() => submitFilter()}
                                          >
                                              Tampilkan
                                          </button>
                                      </div>
                                  </>
                              :
                                  null
                          }
                          

                      </div>
                  :
                      null
                }

            {/* Search Field */}
            <form className="mb-10 pr-0 pr-xl-13 ml-4">
              <div className="input-group">
                <div className="input-group-prepend">
                  <div
                    className="input-group-text bg-light border-right-0 pr-1"
                    style={{ borderTopLeftRadius: "150px", borderBottomLeftRadius: "150px" }}
                  >
                    <i className="ri-search-line"></i>
                  </div>
                </div>

                <input
                  type="text"
                  className="form-control border-left-0 border p-0 bg-light"
                  placeholder="Cari video"
                  onChange={(e) => setKeyword(e.target.value)}
                />

                <div>
                  <button
                    className="btn btn-primary-dashboard"
                    onClick={handleFilterKeyword}
                    style={{ borderTopRightRadius: "150px", borderBottomRightRadius: "150px" }}
                    type="submit"
                  >
                    Cari
                  </button>
                </div>
              </div>
            </form>
            {/* End of Search Field */}

            {/* Card Video */}
            {
              allLoading ?
                <div className="row my-20 ml-5">
                  <div className="col col-12">
                    <PulseLoaderRender />
                  </div>
                </div>
                :
                <div className="mt-5 ml-4 mb-20">
                  <div
                    className="row d-flex justify-content-between flex-wrap"
                  >
                    {!video || (video && video.video.length === 0) ? (

                      <div className="row mx-auto">
                        <div className="col col-12 d-flex flex-column justify-content-center">
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
                            Tidak ada video terkait "{keyword}"
                          </h1>

                        </div>
                      </div>

                    ) : (
                      video &&
                      video.video.map((row, i) => {
                        return (
                          <div
                            className="col-12 col-md-5 col-lg-6 my-5 py-0 pr-lg-20 pr-3 pr-md-0"
                            key={i}
                          >
                            <div
                              className="card mb-4 border-0 position-relative"
                              style={{ cursor: "pointer" }}
                            >
                              <Image
                                alt={row.judul}
                                unoptimized={process.env.ENVIRONMENT !== "PRODUCTION"}
                                loader={
                                  process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                  "publikasi/images/" +
                                  row.gambar
                                }
                                src={
                                  process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                  "publikasi/images/" +
                                  row.gambar
                                }
                                width={394}
                                height={260}
                                objectFit="cover"
                                className="rounded"
                                data-target="#videoPlayerModal"
                                data-toggle="modal"
                                onClick={() =>
                                  handlePreview(
                                    row.id,
                                  )
                                }
                              />
                              <div className="card-body px-0">
                                <div>
                                  <h4 className="card-title"
                                    style=
                                    {{
                                      display: "-webkit-box",
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      WebkitLineClamp: "2",
                                      WebkitBoxOrient: "vertical",
                                      fontSize: "20px",
                                      fontFamily: "Poppins",
                                      color: "#1B283F",
                                    }}
                                  >
                                    {row.judul}
                                  </h4>
                                  <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex flex-row align-items-center">
                                      <div className="border rounded-circle py-1 px-2">
                                        {/* Insert Logo Image Here */}
                                        <Image
                                          src="/assets/media/logo-default.png"
                                          width={30}
                                          height={30}
                                          alt="Logo Image"
                                        />
                                      </div>
                                      <span
                                        className="ml-2 d-inline-block text-truncate FW-600"
                                        style={{ maxWidth: "120px", color: "#6C6C6C", fontFamily: "Poppins", fontSize: "16px" }}
                                      >
                                        {row.dibuat}
                                      </span>
                                    </div>
                                    <span
                                      className="label label-inline label-light-primary font-weight-bold d-inline-block text-truncate"
                                      style={{ maxWidth: "120px", color: "#0063CC", fontSize: "12px", fontFamily: "Poppins" }}
                                    >
                                      {row.nama_kategori.toUpperCase()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
            }
            {/* End of Card Video */}

            {/* PAGINATION */}
            <div className="d-flex justify-content-center">
              {video && video.total !== 0 && video.total > 6 ? (
                <div
                  className={
                    windowDimensions && windowDimensions.width && windowDimensions.width <= 770 ?
                      "mx-auto table-pagination"
                      :
                      "mb-10 mx-auto table-pagination"
                  }
                >
                  <Pagination
                    activePage={activePage}
                    itemsCountPerPage={6}
                    totalItemsCount={video.total}
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
              ) : null}
            </div>
            {/* End of Pagination */}

          </div>

          {/* Right Side */}
          <div className="col-xl-4 col-12 my-5">

            {/* Sort Filter Button */}
            {
              windowDimensions && windowDimensions.width && windowDimensions.width <= 1024 ?
                null
                :
                <div className="card mb-15 p-5">
                  <div className="row ml-5 mt-3">
                    <Image
                      src={`/assets/media/logo-filter.svg`}
                      width={40}
                      height={40}
                      alt="Logo filter"
                    />
                    <h3 className="d-flex align-items-center font-weight-bolder ml-3 mt-3">
                      Filter
                    </h3>
                  </div>
                  <div className="card-body">
                    <h5 style={{ marginLeft: "-10px" }} style={{fontSize:"16px", fontFamily:"Poppins"}}>Urutkan Berdasarkan</h5>
                    <div className="row justify-content-between">
                      <div className="col-md-6 col-12">
                        {showDescButton === true && sort === "" ? (
                          <button
                            className="btn btn-primary rounded-pill btn-block text-truncate"
                            onClick={() => handleFilterPublish("", false)}
                            style={{ fontSize: "14px", fontFamily: "Poppins" }}
                          >
                            Terbaru
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-light rounded-pill btn-block text-truncate"
                            onClick={() => handleFilterPublish("desc",true)}
                            style={{ fontFamily: "Poppins", color: "#ADB5BD", fontSize: '14px' }}
                          >
                            Terbaru
                          </button>
                        )}
                      </div>

                      <div className="col-md-6 col-12">
                        {filterPublish === "asc" && sort === "" ? (
                          <button
                            className="btn btn-primary rounded-pill btn-block text-truncate"
                            onClick={() => handleFilterPublish("desc", false)}
                            style={{ fontSize: "14px", fontFamily: "Poppins" }}
                          >
                            Terlama
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-light rounded-pill btn-block text-truncate"
                            onClick={() => handleFilterPublish("asc", false)}
                            style={{ fontFamily: "Poppins", color: "#ADB5BD", fontSize: '14px' }}
                          >
                            Terlama
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="row justify-content-between mt-3">
                      <div className="col-md-6 col-12">
                        {sort === "asc" && showDescButton === false ? (
                          <button
                            className="btn btn-primary rounded-pill btn-block text-truncate"
                            onClick={() => handleSort("", "desc")}
                            style={{ fontSize: "14px", fontFamily: "Poppins" }}
                          >
                            A-Z
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-light rounded-pill btn-block text-truncate"
                            onClick={() => handleSort("asc", "")}
                            style={{ fontFamily: "Poppins", color: "#ADB5BD", fontSize: '14px' }}
                          >
                            A-Z
                          </button>
                        )}
                      </div>

                      <div className="col-md-6 col-12">
                        {sort === "desc" &&  showDescButton === false ? (
                          <button
                            className="btn btn-primary rounded-pill btn-block"
                            onClick={() => handleSort("", "desc")}
                            style={{ fontSize: "14px", fontFamily: "Poppins" }}
                          >
                            Z-A
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-light rounded-pill btn-block"
                            onClick={() => handleSort("desc", "")}
                            style={{ fontFamily: "Poppins", color: "#ADB5BD", fontSize: '14px' }}
                          >
                            Z-A
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary mb-5"
                    style={{ width: "90%", margin: "auto", borderRadius: "30px" }}
                    onClick={() => submitFilter()}
                  >
                    Tampilkan
                  </button>
                </div>
            }

            {/* End of Sort Filter Button */}

            {/* Tag */}
            <div
              className={
                windowDimensions && windowDimensions.width && windowDimensions.width <= 1024 ?
                  "row mt-5 d-flex flex-column mx-auto"
                  :
                  "row mt-5 d-flex flex-column mx-auto px-10"
              }
            >
              <h3 className="font-weight-bolder">
                TEMUKAN LEBIH BANYAK APA YANG PENTING BAGI ANDA
              </h3>
              <div className=" d-flex flex-wrap flex-row">
                <div className="row ml-0">
                  {tagVideo && tagVideo.length !== 0 ? (
                    tagVideo.map((row, i) => {
                      return (
                        <div
                          className="border px-2 py-1 rounded my-3 mr-3"
                          onClick={() => handleFilterTag(row)}
                          style={{ cursor: "pointer" }}
                          key={i}
                        >
                          {/* #{row.toUpperCase()} */}
                          #{row.toString().toUpperCase()}
                        </div>
                      );
                    })
                  ) : (
                    <div className="row text-center">
                      <h3 className="text-muted">
                        <em>Tag Belum Tersedia</em>
                      </h3>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* End of Tag */}
          </div>
          {/* End of Right Side */}
        </div>
        {/* End of Content */}

        {/* Modal */}
        {
          detail ?
            <Modal
              size={windowDimensions && windowDimensions.width && windowDimensions.width <= 576 ? "sm" : "lg"}
              onHide={() => handleToggleModal()}
              show={show}
              centered
              dialogClassName="mx-10 mx-md-auto"
            >
              
              <Modal.Header>
                <div
                  className="col-12 d-flex justify-content-end"
                >
                  <i
                    className="ri-close-line text-dark"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleToggleModal()}
                  />
                </div>
              </Modal.Header>
              <Modal.Body className="p-0">
                <ReactPlayer
                  url={detail.url_video}
                  controls
                  width="100%"
                  height=
                  {
                    windowDimensions && windowDimensions.width && windowDimensions.width <= 576 ?
                      "25vh"
                      :
                      "50vh"
                  }
                  playing={video_playing}
                // onPlay={() => handleIsPlayed(idVideo)}
                />
              </Modal.Body>
              <Modal.Footer>
                <div className="col-12 max-h-350px max-md-h-293px max-lg-h-212px overflow-auto">

                  {
                    windowDimensions && windowDimensions.width && windowDimensions.width <= 770 && detail.nama_kategori ?
                      <div className="p-2 badge badge-pill badge-light font-weight-bold text-primary mb-3" style={{ color: "#0063CC" }}>
                        {detail.nama_kategori}
                      </div>
                      :
                      null
                  }

                  {/* Insert Title Here */}
                  <h2 className="font-weight-bolder">
                    {detail.judul}
                  </h2>

                  {
                    windowDimensions && windowDimensions.width && windowDimensions.width <= 450 ?
                      <div className="mr-3" style={{ color: "#ADB5BD", fontSize: "14px" }}>
                        {
                          detail.tanggal_publish !== null && playLoading === false ?
                            `${moment(detail.tanggal_publish).format("MMMM DD")} | ${detail.ditonton} Ditonton`
                            :
                            ""
                        }
                      </div>
                      :
                      null
                  }


                  <div
                    className="mt-5 d-flex text-wrap"
                    style={{ maxHeight: "40vh" }}
                  >

                    {/*Isi Video */}
                    {
                      showDesc === false && detail.isi_video ?
                        <div className="mx-0 px-0 text-justify" style={{fontSize:'14px'}}>
                          {/* {handleDescToTrim(detail.isi_video, "lg")} */}
                         
                          {
                            windowDimensions && windowDimensions.width && windowDimensions.width > 768 ?
                              handleDescToTrim(detail.isi_video, "lg")
                            :
                              null
                          }

                          {
                            windowDimensions && windowDimensions.width && windowDimensions.width <= 768 && windowDimensions.width > 576?
                              handleDescToTrim(detail.isi_video, "md")
                            :
                              null
                          }

                          {
                            windowDimensions && windowDimensions.width && windowDimensions.width <= 576 ?
                              handleDescToTrim(detail.isi_video, "sm")
                            :
                              null
                          }

                          <div
                            className="mt-1 mb-3 text-primary"
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowDesc(true)}
                          >
                            Lihat Selengkapnya...
                          </div>
                        </div>
                        :
                        <div className="overflow-auto text-justify" style={{fontSize:'14px'}}>
                          {detail.isi_video}

                          {/* Insert Tag Here */}
                          <div className="d-flex flex-row flex-wrap my-2">
                            {
                              detail.tag && detail.tag.length === 0 && detail.tag == undefined ?
                                null
                                :
                                detail?.tag?.map((el, i) => {
                                  return (
                                    <div
                                      style={{
                                        background: "#fff",
                                        border: "1px solid #d7e1ea",
                                        height: "25px"
                                      }}
                                      className="mr-2 px-3 py-1 rounded text-truncate mb-2"
                                      key={i}
                                    >
                                      <div
                                        className="text-center text-truncate"
                                        style={{ fontSize: "12px", color: "#6C6C6C" }}
                                      >
                                        {/* #{el.toUpperCase()} */}
                                        #{el}
                                      </div>
                                    </div>
                                  );
                                })
                            }
                          </div>
                          <div
                            className="mt-1 mb-3 text-primary"
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowDesc(false)}
                          >
                            Lihat Lebih Sedikit...
                          </div>
                        </div>

                    }
                  </div>

                  <div className="mt-5 mb-5 row d-flex justify-content-between">
                    <div className="d-flex align-self-center ml-4">
                      {/* Insert Date Here */}
                      {
                        windowDimensions && windowDimensions.width && windowDimensions.width >= 450 ?
                          <div className="mr-3" style={{ color: "#ADB5BD", fontSize: "14px" }}>
                            {
                              detail.tanggal_publish !== null && playLoading === false ?
                                `${moment(detail.tanggal_publish).format("MMMM DD")} | ${detail.ditonton} Ditonton`
                                :
                                ""
                            }
                          </div>
                          :
                          null
                      }

                    </div>

                    {
                      windowDimensions && windowDimensions.width && windowDimensions.width >= 770 ?
                        <div className="mr-3">
                          {detail.nama_kategori === null ? null : (
                            <span className="p-2 badge badge-light font-weight-bold" style={{ color: "#0063CC", fontSize: "12px" }}>
                              {detail.nama_kategori}
                            </span>
                          )}
                        </div>
                        :
                        null
                    }

                  </div>
                </div>

              </Modal.Footer>
            </Modal>
            :
            <Modal>
              <Modal.Body>
                <div className="row my-20 ml-5">
                  <div className="col col-12">
                    <PulseLoaderRender />
                  </div>
                </div>
              </Modal.Body>
            </Modal>
        }

        {/* End of Modal */}
      </HomeWrapper>
    </>
  );
};


export default VideoPage;
