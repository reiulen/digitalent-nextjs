import React, { useEffect, useState } from "react"
import Link from "next/link";
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
import { playVideo } from "../../../../redux/actions/publikasi/video.actions";

import {
  playVideoContent,
  getAllVideoContent,
} from "../../../../redux/actions/beranda/video-content.actions";

const VideoPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    loading: allLoading,
    error,
    video,
  } = useSelector((state) => state.allVideoContent);

  const { dataTag } = useSelector((state) => state.allTagVideoContent);
  const { kategori } = useSelector((state) => state.kategoriVideoContent);

  const titleToTrim = 30;
  const descToTrim = 100;
  
  const [url_video, setUrlVideo] = useState("");
  const [video_playing, setVideoPlaying] = useState(false);
  const [idVideo, setIdVideo] = useState(null);
  const [judul_video, setJudulVideo] = useState(null);
  const [tanggal_publish, setTanggalPublish] = useState(null);
  const [dataKategori, setDataKategori] = useState(null);
  const [kategoriVideo, setKategoriVideo] = useState("");
  const [isiVideo, setIsiVideo] = useState(null);
  const [tonton, setTonton] = useState(null);
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [filterPublish, setFilterPublish] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [category_academy, setCategoryAcademy] = useState("");
  const [ limit, setLimit ] = useState("");
  const [ activeTitle, setActiveTitle ] = useState("Video Terupdate dan Terkini")
  const [ show, setShow ] = useState (false)
  const [ showFilter, setShowFilter ] = useState(false)
  const [ showDesc, setShowDesc ] = useState(false)

  const getWindowDimensions = () => {
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
},[video])

useEffect(()=> {

},[windowDimensions])

  const handlePagination = (pageNumber) => {
    setActivePage(pageNumber);
    dispatch(
      getAllVideoContent(
        pageNumber,
        activePage,
        keyword,
        limit,
        filterPublish,
        sort,
        category_id,
        kategoriVideo,
        tag
      )
    );
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

  const handleFilterTag = (str) => {
    if (str === ""){
      setActiveTitle("Video Terupdate dan Terkini")
    }
    setActiveTitle(`#${str.toUpperCase()}`)

    dispatch(
      getAllVideoContent(
        activePage,
        keyword,
        limit,
        filterPublish,
        sort,
        category_id,
        kategoriVideo,
        str
      )
    );
  };

  const submitFilter = () => {
    dispatch(
      getAllVideoContent(
        activePage,
        keyword,
        limit,
        filterPublish,
        sort,
        category_id,
        kategoriVideo,
        tag
      )
    );
  };

  const handleFilterKeyword = (e) => {
    e.preventDefault();
    dispatch(
      getAllVideoContent(
        activePage,
        keyword,
        limit,
        filterPublish,
        sort,
        category_id,
        kategoriVideo,
        tag
      )
    );
  };

  const handleFilterPublish = (publish) => {
    setFilterPublish(publish);
    setSort("")
  };

  const handleSort = (sort) => {
    setSort(sort);
    setFilterPublish("")
  };

  const handleFilterKategori = (str) => {
    setKategoriVideo(str);

    dispatch(
      getAllVideoContent(
        activePage,
        keyword,
        limit,
        filterPublish,
        sort,
        category_id,
        str,
        tag
      )
    );
  };

  const handlePreview = (
    url_video,
    id,
    judul,
    tanggal_publish,
    dataKategori,
    isi_video,
    tag,
    ditonton
  ) => {
    setIdVideo(id);
    setVideoPlaying(true);
    setUrlVideo(url_video);
    setJudulVideo(judul);
    setTanggalPublish(tanggal_publish);
    setDataKategori(dataKategori);
    setIsiVideo(isi_video);
    setTags(tag);
    setTonton(ditonton);
    setShow (true)
  };

  const handleIsPlayed = () => {
    const data = {
      id: idVideo,
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
      <Container fluid className="px-md-30 px-10 py-10 bg-white">
        {/* BreadCrumb */}
        <SubHeaderComponent 
          data={[{ link: router.asPath, name: "Video" }]}
        />
        {/* End of Breadcrumb */}

        {/* Header */}
        <div className="col-12">
          <h1 className="fw-700">{activeTitle}</h1>
          <span>
            Temukan konten terupdate dan terkini mengenai Digital Talent
            Scholarship
          </span>
        </div>
        {/* End of Header */}

        {/* Filter Button */}
        <div 
          className=
          {
            windowDimensions && windowDimensions.width && windowDimensions.width <= 770 ?
              "col-lg-8 col-12 pl-0 ml-0 mt-10 mb-5"
            :
              "col-lg-8 col-12 pl-0 ml-0 mt-10 mb-5 pr-12"
          }
        >
          <Splide
            options={{
              arrows: false,
              pagination: false,
              gap: "1rem",
              drag: "free",
              perPage: 4,
              breakpoints:{
                  830: {
                      perPage: 2,
                    },
              }
          }}
          >
           
              {kategoriVideo === "" ? (
                <SplideSlide>
                  <div
                    className="d-flex align-items-center justify-content-center rounded-pill bg-primary-dashboard py-1 px-9 m-2 "
                    style={{ cursor: "pointer", height:"40px"}}
                    onClick={() => handleFilterKategori("")}
                  >
                    <div className="my-1 mx-5 py-1 px-9 text-white text-center">SEMUA</div>
                  </div>
                </SplideSlide>
                
              ) : (
                <SplideSlide>
                  <div
                    className="d-flex align-items-center justify-content-center rounded-pill bg-white py-1 px-9 border border-muted m-2 "
                    style={{ cursor: "pointer", height:"40px"}}
                    onClick={() => handleFilterKategori("")}
                  >
                    <div className="my-1 mx-5 py-1 px-9 text-muted text-center">SEMUA</div>
                  </div>
                </SplideSlide>
              )}

            {kategori && kategori.length === 0
            ? null
            : kategori.map((row, i) => {
                return kategoriVideo === row.nama_kategori ? (
                  <SplideSlide>
                    <div
                      className="d-flex align-items-center justify-content-center rounded-pill bg-primary-dashboard py-1 px-9 border border-muted m-2 "
                      style={{ cursor: "pointer", height:"40px"}}
                      onClick={() => handleFilterKategori(row.nama_kategori)}
                      key={i}
                    >
                      <div className="my-1 mx-auto py-1 px-auto text-white text-center text-truncate">
                        {row.nama_kategori.toString().toUpperCase()}
                      </div>
                    </div>
                  </SplideSlide>
                  
                ) : (
                  <SplideSlide>
                    <div
                      className="d-flex align-items-center justify-content-center rounded-pill bg-white py-1 px-9 border border-muted m-2 "
                      style={{ cursor: "pointer", height:"40px"}}
                      onClick={() => handleFilterKategori(row.nama_kategori)}
                      key={i}
                    >
                      <div className="my-1 mx-auto py-1 px-auto text-muted text-center text-truncate">
                        {row.nama_kategori.toString().toUpperCase()}
                      </div>
                    </div>
                  </SplideSlide>
                  
                );
              })}

          </Splide>
        </div>
        
        {/* End of Filter Button */}

        {/* Content */}
        <div className="row">
          
          {/* Left Side */}
          <div 
            className={
              windowDimensions && windowDimensions.width && windowDimensions.width <= 770 ?
                "col-lg-8 mt-5 mb-3 pr-10"
              :
                "col-lg-8 mt-5 mb-3 pr-15"
            }
          >

            {/* Filter at mobile screen */}

            {
              windowDimensions && windowDimensions.width && windowDimensions.width <= 770 ?
                <div className="card mb-15 p-5">
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
                            <h5 style={{ marginLeft: "-10px" }}>Urutkan Berdasarkan</h5>
                            <div className="row justify-content-between">
                              <div className="col-6">
                                {filterPublish === "desc" && sort === "" ? (
                                  <button
                                    className="btn btn-primary rounded-pill btn-block text-truncate"
                                    onClick={() => handleFilterPublish("")}
                                  >
                                    Terbaru
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-outline-light rounded-pill btn-block text-truncate"
                                    onClick={() => handleFilterPublish("desc")}
                                  >
                                    Terbaru
                                  </button>
                                )}
                              </div>

                              <div className="col-6">
                                {filterPublish === "asc" && sort === "" ? (
                                  <button
                                    className="btn btn-primary rounded-pill btn-block text-truncate"
                                    onClick={() => handleFilterPublish("")}
                                  >
                                    Terlama
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-outline-light rounded-pill btn-block text-truncate"
                                    onClick={() => handleFilterPublish("asc")}
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
                                    className="btn btn-primary rounded-pill btn-block text-truncate"
                                    onClick={() => handleSort("")}
                                  >
                                    A-Z
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-outline-light rounded-pill btn-block text-truncate"
                                    onClick={() => handleSort("asc")}
                                  >
                                    A-Z
                                  </button>
                                )}
                              </div>

                              <div className="col-6">
                                {sort === "desc" && filterPublish === "" ? (
                                  <button
                                    className="btn btn-primary rounded-pill btn-block text-truncate"
                                    onClick={() => handleSort("")}
                                  >
                                    Z-A
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-outline-light rounded-pill btn-block text-truncate"
                                    onClick={() => handleSort("desc")}
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
            }

            {/* Search Field */}
            <form className="mb-10">
              <div className="input-group">
                  <div className="input-group-prepend">
                      <div 
                          className="input-group-text bg-light border-right-0 pr-1"
                          style={{borderTopLeftRadius:"150px", borderBottomLeftRadius:"150px"}}
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
                          style={{borderTopRightRadius:"150px", borderBottomRightRadius:"150px"}}
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
                <div className="mt-5">
                  <div
                    className="row d-flex justify-content-between flex-wrap"
                  >
                    {!video || (video && video.video.length === 0) ? (

                      <div className="row mx-auto">
                        <div className="col col-12 d-flex justify-content-center">
                            <h1 className="font-weight-bolder">
                              Video Tidak Tersedia
                            </h1>
                        </div>
                      </div>

                    ) : (
                      video &&
                      video.video.map((row, i) => {
                        return (
                          <div 
                            className="col-12 col-md-6 my-5"
                          >
                            <div 
                              className="card mb-4 border-0" 
                              key={i}
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
                                width={70}
                                height={180}
                                objectFit="cover"
                                className="rounded"
                                data-target="#videoPlayerModal"
                                data-toggle="modal"
                                onClick={() =>
                                  handlePreview(
                                    row.url_video,
                                    row.id,
                                    row.judul,
                                    row.tanggal_publish,
                                    row.nama_kategori,
                                    row.isi_video,
                                    row.tag,
                                    row.ditonton
                                  )
                                }
                              />
                              <div className="card-body px-0">
                                <div>
                                  <h5 className="card-title text-truncate" style={{ width: "96%" }}>
                                    {row.judul}
                                  </h5>
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
                                        className="ml-2 d-inline-block text-truncate" 
                                        style={{ maxWidth: "120px" }} 
                                      >
                                        {row.dibuat}
                                      </span>
                                    </div>
                                    <span
                                      className="label label-inline label-light-primary font-weight-bold d-inline-block text-truncate"
                                      style={{ maxWidth: "120px" }} 
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
              {video && video.total !== 0? (
                <div 
                  // className=" mb-10 mx-auto" 
                  className={
                    windowDimensions && windowDimensions.width && windowDimensions.width <= 770 ?
                      "mx-auto table-pagination"
                    :
                      "mb-10 mx-auto table-pagination"
                  }
                >
                  <Pagination
                    activePage={activePage}
                    itemsCountPerPage={video.perPage}
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
          <div className="col-lg-4 my-5">

            {/* Sort Filter Button */}
            {
              windowDimensions && windowDimensions.width && windowDimensions.width <= 770 ?
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
                    <h5 style={{ marginLeft: "-10px" }}>Urutkan Berdasarkan</h5>
                    <div className="row justify-content-between">
                      <div className="col-md-6 col-12">
                        {filterPublish === "desc" && sort === "" ? (
                          <button
                            className="btn btn-primary rounded-pill btn-block text-truncate"
                            onClick={() => handleFilterPublish("")}
                          >
                            Terbaru
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-light rounded-pill btn-block text-truncate"
                            onClick={() => handleFilterPublish("desc")}
                          >
                            Terbaru
                          </button>
                        )}
                      </div>

                      <div className="col-md-6 col-12">
                        {filterPublish === "asc" && sort === ""  ? (
                          <button
                            className="btn btn-primary rounded-pill btn-block text-truncate"
                            onClick={() => handleFilterPublish("")}
                          >
                            Terlama
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-light rounded-pill btn-block text-truncate"
                            onClick={() => handleFilterPublish("asc")}
                          >
                            Terlama
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="row justify-content-between mt-3">
                      <div className="col-md-6 col-12">
                        {sort === "asc" && filterPublish === "" ? (
                          <button
                            className="btn btn-primary rounded-pill btn-block text-truncate"
                            onClick={() => handleSort("")}
                          >
                            A-Z
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-light rounded-pill btn-block text-truncate"
                            onClick={() => handleSort("asc")}
                          >
                            A-Z
                          </button>
                        )}
                      </div>

                      <div className="col-md-6 col-12">
                        {sort === "desc" && filterPublish === "" ? (
                          <button
                            className="btn btn-primary rounded-pill btn-block"
                            onClick={() => handleSort("")}
                          >
                            Z-A
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-light rounded-pill btn-block"
                            onClick={() => handleSort("desc")}
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
                windowDimensions && windowDimensions.width && windowDimensions.width <= 770 ?
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
                  {dataTag && dataTag.tag && dataTag.tag.length !== 0 ? (
                    dataTag.tag.map((row, i) => {
                      return (
                        <div
                          className="border px-2 py-1 rounded my-3 mr-3"
                          onClick={() => handleFilterTag(row)}
                          style={{ cursor: "pointer" }}
                          key={i}
                        >
                          #{row.toUpperCase()}
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
        <Modal
          size="lg"
          onHide={() => handleToggleModal()}
          show={show}
          className={
            windowDimensions && windowDimensions.width && windowDimensions.width <= 770 ?
              "rounded-lg mx-auto"
            :
              "rounded-lg"
          }
          centered
        >
          <Modal.Header>
            <div 
              className="col-12 d-flex justify-content-end"
            >
              <i 
                className="ri-close-line text-dark" 
                style={{cursor:"pointer"}}
                onClick={() => handleToggleModal()}
              />
            </div>
          </Modal.Header>
          <Modal.Body className="p-0">
            <ReactPlayer
              url={url_video}
              controls
              width="100%"
              height={
                windowDimensions && windowDimensions.width && windowDimensions.width <= 770 ?
                  "25vh"
                :
                  "50vh"
              }
              playing={video_playing}
              onPlay={handleIsPlayed}
            />
          </Modal.Body>
          <Modal.Footer>
            <div className="col-12">

              {
                windowDimensions && windowDimensions.width && windowDimensions.width <= 770 && dataKategori ?
                    <div className="p-2 badge badge-pill badge-light font-weight-bold text-primary mb-3">
                      {dataKategori}
                    </div>
                  :
                    null
              }

              {/* Insert Title Here */}
              <h2 className="font-weight-bolder">
                {judul_video}
              </h2>

              <div className="mt-5 mb-5 row d-flex justify-content-between">
                <div className="d-flex align-self-center ml-4">
                   {/* Insert Date Here */}
                  <div className="mr-3">
                    {
                      tanggal_publish !== null ? 
                        `${moment(tanggal_publish).format("MMMM DD")} | ${tonton} Ditonton`
                      : 
                      ""
                    }
                  </div>

                  {/* Insert Tag Here */}
                  {
                    windowDimensions && windowDimensions.width && windowDimensions.width >= 770 ?
                      <div className="d-flex flex-row flex-wrap">
                        {
                          tags === null ? 
                            null
                            : tags.map((el, i) => {
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
                                      style={{ fontSize: "10px" }}
                                    >
                                      #{el.toUpperCase()}
                                    </div>
                                  </div>
                                );
                              })
                          }
                      </div>
                    :
                      null
                  }
                  
                </div>
                
                {
                  windowDimensions && windowDimensions.width && windowDimensions.width >= 770 ?
                    <div>
                      {dataKategori === null ? null : (
                          <span className="p-2 badge  badge-light font-weight-bold text-primary">
                            {dataKategori}
                          </span>
                        )}
                    </div>
                  :
                    null
                }
                
              </div>

              <div 
                className="my-3 d-flex text-wrap" 
                style={{maxHeight:"40vh"}}
              >
                {/*Isi Video */}
                {
                  showDesc === false && isiVideo ?
                    <div className="mx-0 px-0">
                      { handleDescToTrim(isiVideo) }

                      <div 
                        className="mt-1 mb-3 text-primary"
                        style={{cursor:"pointer"}}
                        onClick={() => setShowDesc(true)}
                      >
                        Lihat Selengkapnya...
                      </div>
                    </div>
                  :
                    <div className="overflow-auto">
                      {isiVideo}

                      <div 
                        className="mt-1 mb-3 text-primary"
                        style={{cursor:"pointer"}}
                        onClick={() => setShowDesc(false)}
                      >
                        Lihat Lebih Sedikit...
                      </div>
                    </div>
                    
                }
              </div>
            </div>
            
          </Modal.Footer>
        </Modal>
        {/* End of Modal */}
      </Container>
    </>
  );
};


export default VideoPage;
