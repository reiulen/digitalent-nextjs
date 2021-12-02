import React, { useEffect, useState } from "react"
import Image from "next/image";
import Pagination from "react-js-pagination";
import moment from "moment";
import { Modal, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Card, Container } from "react-bootstrap";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import { getAllBerandaGaleri, getDetailBerandaGaleri } from "../../../../redux/actions/beranda/galeri.actions"
import PulseLoaderRender from "../../../components/loader/PulseLoader";
import SubHeaderComponent from "../../../components/global/Breadcrumb.component";

const Galeri = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { galeri, loading: loadingGaleri } = useSelector((state) => state.allBerandaGaleri)
    const { detail, loading: loadingDetail } = useSelector((state) => state.detailBerandaGaleri)
    const { kategori } = useSelector((state) => state.kategoriBerandaGaleri)

    const titleToTrim = 13;
    const categoryToTrim = 9
    const descToTrim = 100

    const [activeTitle, setActiveTitle] = useState("Galeri Terupdate dan Terkini")
    const [show, setShow] = useState(null);
    const [kategoriGaleri, setKategoriGaleri] = useState("")
    const [activePage, setActivePage] = useState(1)
    const [showFullDesc, setShowFullDesc] = useState(false)
    const [tag, setTag] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [showArrow, setShowArrow] = useState(null)
    const [kategoriToShow, setKategoriToShow] = useState([])

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
    }, [detail])

    useEffect(() => {

    }, [windowDimensions])

    useEffect(() => {
        handleCardIndex()
        handleKategoriToShow()
    }, []);

    const handleCardIndex = () => {
        let arr = []

        if (galeri && galeri.gallery.length) {
            for (let i = 0; i < galeri.gallery.length; i++) {
                arr.push(false)
            }
        }

        setShow(arr)
    }

    const handleMouseEnter = (index) => {
        let arr = [...show]

        for (let i = 0; i < arr.length; i++) {
            if (i == index) {
                arr[i] = true
            }
        }

        setShow(arr)
    }

    const handleMouseLeave = (index) => {
        let arr = [...show]

        for (let i = 0; i < arr.length; i++) {
            if (i == index) {
                arr[i] = false
            }
        }

        setShow(arr)
    }

    const handleDataModal = (id) => {
        dispatch(getDetailBerandaGaleri(id))
        setShowFullDesc(false)
        setShowModal(true)
    }

    const handleFilterKategori = (str) => {
        if (str === "") {
            setActiveTitle("Galeri Terupdate dan Terkini")
        }
        setKategoriGaleri(str)

        dispatch(getAllBerandaGaleri(
            activePage,
            str,
            tag
        ))
    }

    const handleKategoriToShow = () => {
        if (galeri) {
            let obj = galeri.gallery
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

            if (result.length > 5) {
                setShowArrow(true)
            } else {
                setShowArrow(false)
            }
        }
    }

    const handlePagination = (pageNumber) => {
        setActivePage(pageNumber)

        dispatch(getAllBerandaGaleri(
            pageNumber,
            kategoriGaleri,
            tag
        ))

    }

    const handleFilterTag = (str) => {
        setActiveTitle(`#${str.toUpperCase()}`)
        // setTag(str)
        dispatch(getAllBerandaGaleri(
            activePage,
            kategoriGaleri,
            str
        ))

    }

    const handleTitleToTrim = (str) => {
        let result = null;

        if (str.length > titleToTrim) {
            result = str.slice(0, titleToTrim) + "...";
        } else {
            result = str;
        }

        return result;
    };

    const handleCategoryToTrim = (str) => {
        let result = null

        if (str.length > categoryToTrim) {
            result = str.slice(0, categoryToTrim) + "..."

        } else {
            result = str
        }

        return result
    }

    const handleDescToTrim = (str) => {
        let result = null

        if (str.length > descToTrim) {
            result = str.slice(0, descToTrim) + "..."

        } else {
            result = str
        }
        return result
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    return (
        <Container fluid className="px-md-30 px-10 py-10 bg-white">

            {/* BreadCrumb */}
            <SubHeaderComponent
                data={[{ link: router.asPath, name: "Galeri" }]}
            />

            <div className="row flex-column">
                {/* Header */}
                <div className="col-12 mt-5">
                    <h1 className="fw-700">
                        {activeTitle}
                    </h1>
                    <div className="mt-3">
                        Temukan konten terupdate dan terkini mengenai Digital Talent Scholarship
                    </div>
                </div>

                {/* Filter Button */}
                {
                    kategori ?
                        <div
                            className="col-12 pl-0 ml-4 mt-10 mb-5"
                        >
                            {
                                showArrow === true ?
                                    <Splide
                                        options={{
                                            arrows: true,
                                            pagination: true,
                                            gap: "1rem",
                                            drag: "free",
                                            perPage: 5,
                                            breakpoints: {
                                                830: {
                                                    perPage: 2,
                                                },
                                            }
                                        }}
                                        className="px-20"
                                    >
                                        {
                                            kategoriGaleri === "" ?
                                                <SplideSlide>
                                                    <div
                                                        className="d-flex align-items-center justify-content-center rounded-pill bg-primary-dashboard py-1 px-3 mr-7 my-5"
                                                        style={{ cursor: "pointer", height: "40px" }}
                                                        onClick={() => handleFilterKategori("")}
                                                    >
                                                        <div className="my-1 mx-3 py-1 px-3 text-white">
                                                            SEMUA
                                                        </div>
                                                    </div>
                                                </SplideSlide>
                                                :
                                                <SplideSlide>
                                                    <div
                                                        className="d-flex align-items-center justify-content-center border rounded-pill bg-white py-1 px-3 mr-7 my-5"
                                                        style={{ cursor: "pointer", height: "40px" }}
                                                        onClick={() => handleFilterKategori("")}
                                                    >
                                                        <div className="my-1 mx-3 py-1 px-3 text-muted">
                                                            SEMUA
                                                        </div>
                                                    </div>
                                                </SplideSlide>

                                        }
                                        {
                                            kategoriToShow ?
                                                kategoriToShow.map((el, i) => {
                                                    return (
                                                        kategoriGaleri == el ?
                                                            <SplideSlide>
                                                                <div
                                                                    className="d-flex align-items-center justify-content-center border rounded-pill bg-primary-dashboard py-1 px-3 mr-7 my-5"
                                                                    style={{ cursor: "pointer", height: "40px" }}
                                                                    onClick={() => handleFilterKategori(el)}
                                                                    key={i}
                                                                >
                                                                    <div className="my-1 mx-3 py-1 px-3 text-white">
                                                                        {/* {handleCategoryToTrim(el.nama_kategori)} */}
                                                                        {el.toString().toUpperCase()}
                                                                    </div>
                                                                </div>
                                                            </SplideSlide>
                                                            :
                                                            <SplideSlide>
                                                                <div
                                                                    className="d-flex align-items-center justify-content-center border rounded-pill bg-white py-1 px-3 mr-7 my-5"
                                                                    style={{ cursor: "pointer", height: "40px" }}
                                                                    onClick={() => handleFilterKategori(el)}
                                                                    key={i}
                                                                >
                                                                    <div className="my-1 mx-3 py-1 px-3 text-muted">
                                                                        {/* {handleCategoryToTrim(el.nama_kategori)} */}
                                                                        {el.toString().toUpperCase()}
                                                                    </div>
                                                                </div>
                                                            </SplideSlide>

                                                    )
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
                                            perPage: 5,
                                            breakpoints: {
                                                830: {
                                                    perPage: 2,
                                                },
                                            }
                                        }}
                                    >
                                        {
                                            kategoriGaleri === "" ?
                                                <SplideSlide>
                                                    <div
                                                        className="d-flex align-items-center justify-content-center rounded-pill bg-primary-dashboard py-1 px-3 mr-7 my-5"
                                                        style={{ cursor: "pointer", height: "40px" }}
                                                        onClick={() => handleFilterKategori("")}
                                                    >
                                                        <div className="my-1 mx-3 py-1 px-3 text-white">
                                                            SEMUA
                                                        </div>
                                                    </div>
                                                </SplideSlide>
                                                :
                                                <SplideSlide>
                                                    <div
                                                        className="d-flex align-items-center justify-content-center border rounded-pill bg-white py-1 px-3 mr-7 my-5"
                                                        style={{ cursor: "pointer", height: "40px" }}
                                                        onClick={() => handleFilterKategori("")}
                                                    >
                                                        <div className="my-1 mx-3 py-1 px-3 text-muted">
                                                            SEMUA
                                                        </div>
                                                    </div>
                                                </SplideSlide>

                                        }
                                        {
                                            kategoriToShow ?
                                                kategoriToShow.map((el, i) => {
                                                    return (
                                                        kategoriGaleri == el ?
                                                            <SplideSlide>
                                                                <div
                                                                    className="d-flex align-items-center justify-content-center border rounded-pill bg-primary-dashboard py-1 px-3 mr-7 my-5"
                                                                    style={{ cursor: "pointer", height: "40px" }}
                                                                    onClick={() => handleFilterKategori(el)}
                                                                    key={i}
                                                                >
                                                                    <div className="my-1 mx-3 py-1 px-3 text-white">
                                                                        {/* {handleCategoryToTrim(el.nama_kategori)} */}
                                                                        {el.toString().toUpperCase()}
                                                                    </div>
                                                                </div>
                                                            </SplideSlide>
                                                            :
                                                            <SplideSlide>
                                                                <div
                                                                    className="d-flex align-items-center justify-content-center border rounded-pill bg-white py-1 px-3 mr-7 my-5"
                                                                    style={{ cursor: "pointer", height: "40px" }}
                                                                    onClick={() => handleFilterKategori(el)}
                                                                    key={i}
                                                                >
                                                                    <div className="my-1 mx-3 py-1 px-3 text-muted">
                                                                        {/* {handleCategoryToTrim(el.nama_kategori)} */}
                                                                        {el.toString().toUpperCase()}
                                                                    </div>
                                                                </div>
                                                            </SplideSlide>
                                                    )
                                                })
                                                :
                                                null
                                        }
                                    </Splide>
                            }
                        </div>

                        :
                        null
                }
            </div>
            {/* End Filter Button */}

            {/* Content */}
            {
                loadingGaleri ?
                    <div className="container-fluid">
                        <div className="row">
                            <PulseLoaderRender />
                        </div>
                    </div>
                    :
                    <div className="mt-5">
                        <div className="row d-flex justify-content-between flex-wrap">
                            {
                                galeri && galeri.gallery && galeri.gallery.length === 0 ?
                                    <div className="col-12 d-flex justify-content-center my-5">
                                        <h1 className="font-weight-bolder">
                                            Galeri Tidak Tersedia
                                        </h1>
                                    </div>
                                    :
                                    galeri.gallery.map((el, i) => {
                                        return (
                                            <div
                                                className="col-6 col-md-4 position-relative my-5"
                                                key={i}
                                                onMouseOver={() => handleMouseEnter(i)}
                                                onMouseOut={() => handleMouseLeave(i)}
                                            >
                                                {

                                                    show && show[i] === false ?
                                                        <div
                                                            classname="card position-relative"
                                                            style={{ objectFit: "cover" }}
                                                        >
                                                            <Image
                                                                src={
                                                                    process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                                                    "publikasi/images/" + el.gambar
                                                                }
                                                                alt="Card Gallery"
                                                                width={500}
                                                                height={500}
                                                                className="rounded-lg"
                                                                objectFit="cover"
                                                            />
                                                        </div>
                                                        :
                                                        <div
                                                            onClick={() => handleDataModal(el.id_gallery)}
                                                            data-target="#modalGaleri"
                                                            data-toggle="modal"
                                                        >
                                                            <div
                                                                classname="card position-relative"
                                                            >
                                                                <Image
                                                                    src={
                                                                        process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                                                        "publikasi/images/" + el.gambar
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
                                                                    background: "linear-gradient(to bottom, transparent 0%, black 100%)",
                                                                    borderRadius: "10px"
                                                                }}
                                                            >
                                                                <div className="d-flex flex-column">
                                                                    <div>
                                                                        {/* <h5 className="font-weight-bolder text-white mb-5 mx-5">
                                                                            {el.judul}
                                                                        </h5> */}
                                                                        {
                                                                            windowDimensions && windowDimensions.width && windowDimensions.width <= 770 ?
                                                                                <div className="font-weight-bolder text-white mb-5 mx-5">
                                                                                    {handleTitleToTrim(el.judul)}
                                                                                </div>
                                                                                :
                                                                                <h5 className="font-weight-bolder text-white mb-5 mx-5">
                                                                                    {el.judul}
                                                                                </h5>
                                                                        }
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
                                                }
                                            </div>
                                        )
                                    })
                            }
                        </div>
                    </div>
            }
            {/* End of Content */}

            {/* Modal */}
            {
                detail && showModal === true ?
                    <Modal
                        show={showModal}
                        onHide={() => handleCloseModal()}
                        size={
                            windowDimensions && windowDimensions.width && windowDimensions.width <= 770 ?
                                "sm"
                                :
                                "xl"
                        }
                        centered
                    >
                        <Modal.Body className="p-0 m-0">
                            <div className="row">
                                <div
                                    className="col-12 col-md-7 col-lg-7 position-relative"
                                >
                                    {
                                        detail.gambar && detail.gambar.length !== 0 ?
                                            <Splide
                                                options={{
                                                    arrows: detail.gambar.length > 1 ? true : false,
                                                    pagination: false,
                                                    drag: "free",
                                                    perPage: 1,
                                                }}
                                            >
                                                {
                                                    detail.gambar.map((el, i) => {
                                                        return (
                                                            <SplideSlide
                                                                key={i}
                                                                className="position-relative"
                                                            >
                                                                <Image
                                                                    src={
                                                                        process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                                                        "publikasi/images/" + el.gambar
                                                                    }
                                                                    alt="Slider"
                                                                    width="100%"
                                                                    height="105%"
                                                                    layout="responsive"
                                                                    objectFit="cover"
                                                                />
                                                            </SplideSlide>
                                                        )
                                                    })
                                                }

                                            </Splide>

                                            :
                                            <div className="container-fluid">
                                                <div className="row">
                                                    <PulseLoaderRender />
                                                </div>
                                            </div>
                                    }
                                </div>

                                <div className="col-12 col-md-5 col-lg-5 pt-5">

                                    {
                                        kategori.map((element, index) => {
                                            return (
                                                detail.kategori_id == element.id ?
                                                    <div className="badge badge-light mr-10" key={index}>
                                                        <div className="text-primary">
                                                            {element.nama_kategori}
                                                        </div>
                                                    </div>
                                                    :
                                                    null
                                            )
                                        })
                                    }

                                    {/* Insert Title Here */}
                                    <h5
                                        className={
                                            windowDimensions && windowDimensions.width && windowDimensions.width <= 770 ?
                                                "text-dark text-wrap text-truncate font-weight-bolder mt-3 ml-7"
                                                :
                                                "text-dark text-wrap text-truncate font-weight-bolder mt-3"
                                        }
                                        style={{ fontSize: '24px' }}
                                    >
                                        {detail.judul}
                                    </h5>

                                    <div
                                        className={windowDimensions && windowDimensions.width && windowDimensions.width <= 770 ?
                                            "row d-flex text-muted ml-1"
                                            :
                                            "row d-flex text-muted"
                                        }
                                    >
                                        <div className="d-flex align-items-center" style={{ fontSize: '12x' }}>
                                            <i className="ri-calendar-2-line mr-2 ml-5"></i>
                                            <span>{`Publish : 
                                                ${moment(detail.tanggal_publish).format("DD MMMM YYYY")}`}
                                            </span>
                                        </div>
                                        {
                                            detail.dibaca === undefined ?
                                                <span className="mb-1 ml-6 p-0 d-flex align-items-center">
                                                    <div className="">
                                                        <i className="ri-eye-line"></i>
                                                    </div>
                                                    <span className="ml-2">
                                                        Dibaca 0
                                                    </span>
                                                </span>
                                                :
                                                <span className="mb-1 ml-6 p-0 d-flex align-items-center">
                                                    <div className="">
                                                        <i className="ri-eye-line"></i>
                                                    </div>
                                                    <span className="ml-2">
                                                        Dibaca {detail.dibaca}
                                                    </span>
                                                </span>
                                        }

                                    </div>

                                    <hr
                                        // className="mr-5"
                                        className=""
                                        style={{width:'111%', marginLeft:'-25px'}}
                                    />

                                    <div
                                        className="pr-3"
                                    >
                                        {
                                            windowDimensions && windowDimensions.width && windowDimensions.width > 1030 ?
                                                <p
                                                    style={{
                                                        overflowY: "auto",
                                                        overflowX: "hidden",
                                                        maxHeight: "180px"
                                                    }}
                                                    className="text-justify mr-2"
                                                >
                                                    {detail.isi_galeri}
                                                </p>
                                                :
                                                detail.isi_galeri && showFullDesc === false ?
                                                    <div className="">
                                                        <span>
                                                            {handleDescToTrim(detail.isi_galeri)}
                                                        </span>
                                                        <span
                                                            className="ml-2"
                                                            style={{ color: "#007CFF" }}
                                                            onClick={() => setShowFullDesc(true)}
                                                        >
                                                            Lihat Selengkapnya..
                                                        </span>
                                                    </div>
                                                    :
                                                    <div>
                                                        <p className="ml-7">
                                                            {detail.isi_galeri}
                                                        </p>
                                                        <p
                                                            style={{ color: "#007CFF" }}
                                                            onClick={() => setShowFullDesc(false)}
                                                            className="ml-7"
                                                        >
                                                            Lihat Lebih Sedikit
                                                        </p>
                                                    </div>


                                        }

                                        <hr
                                            className=""
                                            style={{width:'111%', marginLeft:'-25px'}}
                                        />

                                    </div>

                                    <div
                                        className={
                                            windowDimensions && windowDimensions.width && windowDimensions.width <= 770 ?
                                                "row mb-5 ml-3"
                                                :
                                                "row mb-5"
                                        }
                                    >
                                        <div className="col-9 d-flex flex-row flex-wrap justify-content-evenly">
                                            {
                                                detail.tag ?
                                                    detail.tag.map((el, i) => {
                                                        return (
                                                            <div
                                                                className="border p-2 rounded mr-5 my-1"
                                                                key={i}
                                                                onClick={() => handleFilterTag(el)}
                                                                style={{ cursor: "pointer",fontSize:'11px' }}
                                                            >
                                                                #{el.toString().toUpperCase()}
                                                            </div>

                                                        )
                                                    })
                                                    :
                                                    null
                                            }

                                        </div>

                                        <div className="col-3">
                                            <button className="btn btn-outline-light rounded-circle text-center" style={{ width: "40px", height: "40px" }}>
                                                <i className="ri-share-line p-auto m-auto"></i>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                    :
                    <Modal
                        show={showModal}
                        onHide={() => handleCloseModal()}
                    >
                        <Modal.Header>
                            <h5>
                                Memuat..
                            </h5>
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
            }


            {/* Pagination */}
            {
                galeri && galeri.total < 9 ?
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
                    :
                    null
            }

            {/* End of Pagination */}

        </Container>
    )
}

export default Galeri