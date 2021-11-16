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

import styles from "../../../styles/preview.module.css";
import SubHeaderComponent from "../../components/template/Subheader.component";
import PulseLoaderRender from "../../components/loader/PulseLoader";
import { playVideo } from "../../../redux/actions/publikasi/video.actions";
import IconFilter from "../../../components/assets/icon/Filter";

import {
  playVideoContent,
  getAllVideoContent,
} from "../../../redux/actions/beranda/video-content.actions";

const VideoPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    loading: allLoading,
    error,
    video,
  } = useSelector((state) => state.allVideoContent);

  const {
    loading: playLoading,
    error: playError,
    isPlayed,
  } = useSelector((state) => state.playVideo);

  const { dataTag } = useSelector((state) => state.allTagVideoContent);
  const { kategori } = useSelector((state) => state.kategoriVideoContent);

  const titleToTrim = 10;
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

  const handleFilterTag = (str) => {
    if (str === ""){
      setActiveTitle("Video Terupdate dan Terkini")
    }

    // setTag(str)
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
  };

  const handleSort = (sort) => {
    setSort(sort);
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
        <div>
          <h1 className="fw-700">{activeTitle}</h1>
          <span>
            Temukan konten terupdate dan terkini mengenai Digital Talent
            Scholarship
          </span>
        </div>
        {/* End of Header */}

        {/* Filter Button */}
        <div 
          className="col-lg-8 col-12 pl-0 ml-0 mt-10 mb-5 pr-15" 
        >
          <Splide
            // hasSliderWrapper
            options={{
              arrows: false,
              pagination: false,
              gap: "1rem",
              drag: "free",
              perPage: 4,
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
                      <div className="my-1 mx-5 py-1 px-9 text-white text-center">
                        {row.nama_kategori}
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
                      <div className="my-1 mx-5 py-1 px-9 text-muted text-center">
                        {row.nama_kategori}
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
          <div className="col-lg-8 my-5 pr-15">

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
                                {filterPublish === "asc" ? (
                                  <button
                                    className="btn btn-primary rounded-pill btn-block"
                                    onClick={() => handleFilterPublish("")}
                                  >
                                    Terbaru
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-outline-light rounded-pill btn-block"
                                    onClick={() => handleFilterPublish("asc")}
                                  >
                                    Terbaru
                                  </button>
                                )}
                              </div>

                              <div className="col-6">
                                {filterPublish === "desc" ? (
                                  <button
                                    className="btn btn-primary rounded-pill btn-block"
                                    onClick={() => handleFilterPublish("")}
                                  >
                                    Terlama
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-outline-light rounded-pill btn-block"
                                    onClick={() => handleFilterPublish("desc")}
                                  >
                                    Terlama
                                  </button>
                                )}
                              </div>
                            </div>
                            <div className="row justify-content-between mt-3">
                              <div className="col-6">
                                {sort === "asc" ? (
                                  <button
                                    className="btn btn-primary rounded-pill btn-block"
                                    onClick={() => handleSort("")}
                                  >
                                    A-Z
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-outline-light rounded-pill btn-block"
                                    onClick={() => handleSort("asc")}
                                  >
                                    A-Z
                                  </button>
                                )}
                              </div>

                              <div className="col-6">
                                {sort === "desc" ? (
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
                        </>
                      :
                        null
                  }
                </div>
              :
                null
            }

            {/* Search Field */}
            <form className="mb-10 mr-4">
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
                <div className="my-5">
                  <div
                    className="row d-flex justify-content-between"
                    style={{ width: "103.5%", flexWrap: "wrap" }}
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
                          <div className="col-12 col-md-6 my-5">
                            <div className="card mb-4 pr-10 border-0" key={i}>
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
                              <div className="card-body">
                                <div style={{ width: "126%", marginLeft: "-30px" }}>
                                  <h5 className="card-title" style={{ width: "96%" }}>
                                    {handleTitleToTrim(row.judul)}
                                  </h5>
                                  <div className="d-flex justify-content-between align-items-center">
                                    <div className="row align-items-center ml-2">
                                      <div className="border rounded-circle py-1 px-2">
                                        {/* Insert Logo Image Here */}
                                        <Image
                                          src="/assets/media/logo-default.png"
                                          width={30}
                                          height={30}
                                          alt="Logo Image"
                                        />
                                      </div>
                                      <span className="ml-2">{row.dibuat}</span>
                                    </div>
                                    <span
                                      className="label label-inline label-light-primary font-weight-bold"
                                      style={{ marginRight: "20px" }}
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
            <div>
              {video ? (
                <div className="table-pagination mb-10" style={{ marginLeft: "35%" }}>
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
                        {filterPublish === "asc" ? (
                          <button
                            className="btn btn-primary rounded-pill btn-block"
                            onClick={() => handleFilterPublish("")}
                          >
                            Terbaru
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-light rounded-pill btn-block"
                            onClick={() => handleFilterPublish("asc")}
                          >
                            Terbaru
                          </button>
                        )}
                      </div>

                      <div className="col-md-6 col-12">
                        {filterPublish === "desc" ? (
                          <button
                            className="btn btn-primary rounded-pill btn-block"
                            onClick={() => handleFilterPublish("")}
                          >
                            Terlama
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-light rounded-pill btn-block"
                            onClick={() => handleFilterPublish("desc")}
                          >
                            Terlama
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="row justify-content-between mt-3">
                      <div className="col-md-6 col-12">
                        {sort === "asc" ? (
                          <button
                            className="btn btn-primary rounded-pill btn-block"
                            onClick={() => handleSort("")}
                          >
                            A-Z
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-light rounded-pill btn-block"
                            onClick={() => handleSort("asc")}
                          >
                            A-Z
                          </button>
                        )}
                      </div>

                      <div className="col-md-6 col-12">
                        {sort === "desc" ? (
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
            <div className="row mt-5 d-flex flex-column mx-10 ml-5">
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
              height="50vh"
              playing={video_playing}
              onPlay={handleIsPlayed}
            />
          </Modal.Body>
          <Modal.Footer>
            <div className="col-12">
              <h2 className="font-weight-bolder">
                {judul_video}
              </h2>

              <div className="mt-10 mb-5 row d-flex justify-content-between">
                <div className="d-flex align-self-center ml-4">
                  <div className="mr-3">
                    {
                      tanggal_publish !== null ? 
                        `${moment(tanggal_publish).format("MMMM DD")} | ${tonton} Ditonton`
                      : 
                      ""
                    }
                  </div>
                  <div className="d-flex flex-row">
                    {
                      tags === null ? 
                        null
                        : tags.map((el, i) => {
                            return (
                              <div
                                style={{
                                  background: "#fff",
                                  border: "1px solid #d7e1ea",
                                }}
                                className="mr-2 px-3 py-1 rounded"
                                key={i}
                              >
                                <div
                                  className="text-center"
                                  style={{ fontSize: "10px" }}
                                >
                                  #{el.toUpperCase()}
                                </div>
                              </div>
                            );
                          })
                      }
                  </div>
                </div>

                <div>
                  {dataKategori === null ? null : (
                      <span className="p-2 badge  badge-light font-weight-bold text-primary">
                        {dataKategori}
                      </span>
                    )}
                </div>
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
