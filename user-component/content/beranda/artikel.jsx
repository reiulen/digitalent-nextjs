import React, { useEffect, useState } from "react"
import Link from "next/link";
import Image from "next/image";
import Pagination from "react-js-pagination";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getAllBerandaArtikel } from "../../../redux/actions/beranda/artikel.actions"
import PulseLoaderRender from "../../components/loader/PulseLoader";

const Artikel = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { artikel, loading: loadingArtikel } = useSelector((state) => state.allBerandaArtikel)
    const { kategori } = useSelector((state) => state.kategoriBerandaArtikel)
    const { akademi } = useSelector((state) => state.allAkademi);
    const { tags } = useSelector((state) => state.allTagBerandaArtikel)

    const titleToTrim = 20
    const descToTrim = 100

    const [ activeTitle, setActiveTitle ] = useState("Ada Apa di Digitalent")
    const [ kategoriArtikel, setKategoriArtikel ] = useState ("")
    const [ keyword, setKeyword ] = useState ("")
    const [ activePage, setActivePage ] = useState(1)
    const [ limit, setLimit ] = useState("")
    const [ filterPublish, setFilterPublish ] = useState("")
    const [ sort, setSort ] = useState("")
    const [ category_id, setCategoryId ] = useState("")
    // const [ category_name, setCategoryName ] = useState("")
    const [ category_academy, setCategoryAcademy ] = useState("")
    const [ tag, setTag ] = useState("")

    const handleFilterKategori = (str) => {
        // e.preventDefault();
        if (str === ""){
            setActiveTitle("")
        }
        
        setKategoriArtikel(str)
        
        dispatch (getAllBerandaArtikel(
            activePage, 
            keyword, 
            limit, 
            filterPublish, 
            sort, 
            category_id, 
            str, 
            category_academy,
            tag
        ))
    }

    const handleFilterKeyword = (e) => {
        e.preventDefault();
        dispatch (getAllBerandaArtikel(
            activePage, 
            keyword, 
            limit, 
            filterPublish, 
            sort, 
            category_id, 
            kategoriArtikel, 
            category_academy,
            tag
        ))
    }

    const handleTitleToTrim = (str) => {
        let result = null
        
        if (str.length > titleToTrim){
            result = str.slice(0, titleToTrim) + "..."

        } else {
            result = str
        }

        return result
    }

    const handleDescToTrim = (str) => {
        let result = null
        
        if (str.length > descToTrim){
            result = str.slice(0, descToTrim) + "..."

        } else {
            result = str
        }
        return result
    }

    const handleFilterPublish = (publish) => {
        setFilterPublish(publish)
    }

    const handleSort = (sort) => {
        setSort(sort)
    }

    const handleCategoryAcademy = (slug) => {
        setCategoryAcademy (slug)
    }

    const submitFilter = () => {
        dispatch (getAllBerandaArtikel(
            activePage, 
            keyword, 
            limit, 
            filterPublish, 
            sort, 
            category_id, 
            kategoriArtikel, 
            category_academy,
            tag
        ))
    }

    const handleFilterTag = (str) => {
        setActiveTitle(str)
        setTag(str)
        dispatch (getAllBerandaArtikel(
            activePage, 
            keyword, 
            limit, 
            filterPublish, 
            sort, 
            category_id, 
            kategoriArtikel, 
            category_academy,
            str
        ))

    }


    return (
        <div>
            {/* BreadCrumb */}
            <div className="row my-5 mx-1 py-3 px-8 bg-white rounded-pill d-flex align-items-center border">
                <span className="text-primary">
                    <Link href="/">
                        Beranda 
                    </Link>
                </span>
                <span>
                    <i className="ri-arrow-right-s-line text-primary"></i> 
                </span>
                <span>
                    {/* Insert BreadCrumb Here */}
                    Artikel
                </span>
            </div>

            {/* Header */}
            <div className="col-12 mt-5">
                <h1 className="fw-700">
                    {activeTitle}
                </h1>

                {
                    activeTitle == "Ada Apa di Digitalent" ?
                        <div className="mt-3">
                            Cerita mitra, berita seru, dan Artikel terbaru. Baca semua artikel soal Digitalent di sini.
                        </div>
                    :
                        <div className="mt-3">
                            Artikel terkait {activeTitle} di  Digital Talent Scholarship
                        </div>
                }
                
            </div>

            {/* Filter Button */}
            <div className="row my-5">
                <div className="col-12 col-md-8 d-flex flex-row flex-wrap">
                   {/* Selected & Unselected */}

                   {
                       kategoriArtikel === "" ?
                            <div 
                                className="d-flex align-items-center rounded-pill bg-primary-dashboard py-1 px-3 mr-3 my-5" 
                                style={{ cursor: "pointer" }}
                                onClick={() => handleFilterKategori("")}
                            >
                                <div className="my-1 mx-3 py-1 px-3 text-white">
                                    Semua
                                </div>
                            </div>
                        :
                            <div 
                                className="d-flex align-items-center border rounded-pill bg-whitepy-1 px-3 mr-3 my-5" 
                                style={{ cursor: "pointer" }}
                                onClick={() => handleFilterKategori("")}
                            >
                                <div className="my-1 mx-3 py-1 px-3 text-muted">
                                    Semua
                                </div>
                            </div>
                   }
                    

                    {
                        kategori ?
                            kategori.map((el, i) => {
                                return (
                                    kategoriArtikel == el.nama_kategori ?
                                        <div 
                                            className="d-flex align-items-center border rounded-pill bg-primary-dashboard py-1 px-3 mr-3 my-5" 
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleFilterKategori(el.nama_kategori)}
                                            key={i}
                                        >
                                            <div className="my-1 mx-3 py-1 px-3 text-white">
                                                {el.nama_kategori}
                                            </div>
                                        </div> 
                                    :
                                        <div 
                                            className="d-flex align-items-center border rounded-pill bg-white py-1 px-3 mr-3 my-5" 
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleFilterKategori(el.nama_kategori)}
                                            key={i}
                                        >
                                            <div className="my-1 mx-3 py-1 px-3 text-muted">
                                                {el.nama_kategori}
                                            </div>
                                        </div> 
                                )
                            })
                        :
                            null
                    }
                </div>
               
            </div>
            {/* End Filter Button */}

            {/* Content */}
            <div className="row">

                {/* Left Side */}
                <div className="col-md-8 col-12">
                    
                    {/* Search Tab */}
                    <form className="mb-3">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div 
                                    className="input-group-text bg-white"
                                    style={{borderTopLeftRadius:"150px", borderBottomLeftRadius:"150px"}}
                                >
                                    <i className="ri-search-line"></i>
                                </div>
                            </div>

                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="&#xF002 Cari Artikel"
                                // style={{borderTopLeftRadius:"150px", borderBottomLeftRadius:"150px"}}
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
                    {/* End Search Tab */}

                    {/* Card */}

                    {
                        loadingArtikel ?
                            <div className="container-fluid">
                                <div className="row">
                                <PulseLoaderRender />
                                </div>
                            </div>
                        :
                            artikel && artikel.artikel && artikel.artikel.length !== 0 ?
                                artikel.artikel.map ((el, i) => {
                                    return (
                                        <div className="row my-10 ml-1 flex-column-reverse flex-xl-row" key={i}>
                                            <div className="col col-xl-7 col-12">
                                                <div className="row d-flex justify-content-between align-items-center">
                                                    <div className="d-flex align-self-center">
                                                        <div className="border rounded-circle py-1 px-2">
                                                            {/* Insert Logo Image Here */}
                                                            <Image
                                                                // src="/assets/media/logo-default.png" 
                                                                src={
                                                                    process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                                                    "publikasi/images/" + el.foto
                                                                }
                                                                width={30}
                                                                height={30}
                                                                alt="Logo Image"
                                                                className="rounded-circle"
                                                            />
                                                        </div>
                                                        
                                                        <span className="font-weight-bolder ml-2 my-auto">
                                                            {/* Insert Admin Here */}
                                                            {el.dibuat}
                                                        </span>
                                                    </div>

                                                    <div className="mr-2">
                                                        <div className="badge badge-light mr-2">
                                                            <div className="text-primary">
                                                                {/* Insert Kategori Here */}
                                                                {el.nama_kategori}
                                                            </div>
                                                        </div>
                                                        <span className="font-weight-bolder">
                                                            {/* Insert Akademi Here */}
                                                            | {el.kategori_akademi}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="row my-5">
                                                    {/* Insert Title Here */}
                                                    <Link href={`/artikel/detail/1`}>
                                                        <a>
                                                            <h1 className="text-dark">
                                                                {handleTitleToTrim(el.judul)}
                                                            </h1>
                                                        </a>
                                                    </Link>
                                                    
                                                </div>

                                                <div className="row my-5">
                                                    {/* Insert Desc Here */}
                                                    <div dangerouslySetInnerHTML={{__html: handleDescToTrim(el.isi_artikel)}} />
                                                
                                                </div>

                                                <div className="row mb-3">
                                                    {/* Insert Date and View Here */}
                                                    <span>
                                                        {moment(el.tanggal_publish).format("DD MMMM")} | {el.dibaca} dibaca
                                                    </span>

                                                    {/* Insert Tag(s) here */}
                                                    {
                                                        el.tag && el.tag.length !== 0 ?
                                                            el.tag.map ((element, index) => {
                                                                return (
                                                                    <span className="row ml-5" key={index}>
                                                                        <div 
                                                                            className="ml-3 border px-2 py-1"
                                                                            onClick={() => handleFilterTag(element)}
                                                                            style={{cursor:"pointer"}}
                                                                        >
                                                                            {element}
                                                                        </div>
                                                                    </span>
                                                                )
                                                            })
                                                            
                                                        :
                                                            null
                                                    }
                                                    
                                                </div>
                                            </div>

                                            <div 
                                                className="col col-xl-5 col-12 position-relative"
                                            >
                                                {/* Insert Card Image Here */}
                                                <Link href={`/artikel/detail/1`}>
                                                    <a>
                                                        <img 
                                                            src={
                                                                process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                                                "publikasi/images/" + el.gambar
                                                            }
                                                            width="100%"
                                                            height="100%"
                                                            alt="Card Image"
                                                            className="rounded"
                                                        />
                                                    </a>
                                                </Link>
                                                
                                            </div>
                                        </div>
                                    )
                                })
                                
                            :
                                <div className="row">
                                    <h1 className="font-weight-bolder">
                                        Artikel Tidak Tersedia
                                    </h1>
                                </div>
                    }
                    
                    {/* End of Card */}

                </div>
                {/* End of Left Side */}

                {/* Right Side */}
                <div className="col-md-4 col-12">
                    {/* Filter */}
                    <div className="border rounded p-5">
                        <div className="row mt-5 "> 
                            <div className="col-2 my-auto ml-3">
                                <Image 
                                    src={`/assets/media/logo-filter.svg`}
                                    width={40}
                                    height={40}
                                    alt="Logo filter"
                                />
                            </div>
                            <div className="col-9 my-auto">
                                <h3 className=" font-weight-bolder">
                                    Filter
                                </h3>
                            </div>
                        </div>

                        <div className="row ml-3 mt-5">
                            <p>
                                Urutkan Berdasarkan
                            </p>
                        </div>

                        <div className="row mx-3 mb-3 d-flex justify-content-between">
                            <div className="col-md-6 col-12">
                                {
                                    filterPublish === "desc" ?
                                        <button className="btn btn-primary rounded-pill btn-block" onClick={() => handleFilterPublish("")}>
                                            Terbaru
                                        </button>
                                    :
                                        <button className="btn btn-outline-light rounded-pill btn-block" onClick={() => handleFilterPublish("desc")}>
                                            Terbaru
                                        </button>
                                }
                            </div>

                            <div className="col-md-6 col-12">
                                {
                                    filterPublish === "asc" ?
                                        <button className="btn btn-primary rounded-pill btn-block" onClick={() => handleFilterPublish("")}>
                                            Terlama
                                        </button>
                                    :
                                        <button className="btn btn-outline-light rounded-pill btn-block" onClick={() => handleFilterPublish("asc")}>
                                            Terlama
                                        </button>
                                }
                            </div>
                        </div>

                        <div className="row mx-3 mb-3 d-flex justify-content-between">
                            <div className="col-md-6 col-12">
                                {
                                    sort === "desc" ?
                                        <button className="btn btn-primary rounded-pill btn-block" onClick={() => handleSort("")}>
                                            A-Z
                                        </button>
                                    :
                                        <button className="btn btn-outline-light rounded-pill btn-block" onClick={() => handleSort("desc")}>
                                            A-Z
                                        </button>
                                }
                            </div>

                            <div className="col-md-6 col-12">
                                {
                                    sort === "asc" ?
                                        <button className="btn btn-primary rounded-pill btn-block" onClick={() => handleSort("")}>
                                            Z-A
                                        </button>
                                    :
                                        <button className="btn btn-outline-light rounded-pill btn-block" onClick={() => handleSort("asc")}>
                                            Z-A
                                        </button>
                                }
                                
                            </div>
                        </div>

                        <div className="row ml-3 mt-5">
                            <p>
                                Akademi
                            </p>
                        </div>

                        <div className="row mx-3 mb-3">
                            {
                                akademi && akademi.length !== 0 ?
                                    <select 
                                        className="form-control rounded-pill"
                                        onChange={(e) => handleCategoryAcademy(e.target.value)}
                                    >
                                        <option value="" selected>Semua Akademi</option>
                                        {
                                            akademi.map ((el, i) => {
                                                return (
                                                    <option value={el.slug} key={i}>{el.slug}</option>
                                                )
                                            })
                                        }
                                    </select>
                                :
                                    <select className="form-control rounded-pill">
                                        <option value="" selected>Semua Akademi</option>
                                        <option value="">
                                            <div className="spinner-border text-dark" role="status">
                                                <span className="sr-only">Memuat...</span>
                                            </div>
                                        </option>
                                    </select>
                            }
                            
                        </div>

                        <div className="row mx-3 mb-3">
                            <button 
                                className="btn btn-primary-dashboard rounded-pill btn-block"
                                onClick={() => submitFilter()}
                            >
                                Tampilkan
                            </button>
                        </div>

                    </div>
                    {/* End of Filter */}

                    {/* Tag */}
                    <div className="row mt-5 d-flex flex-column mx-3">
                        <h3 className="font-weight-bolder"> 
                            Temukan Lebih Banyak Artikel Yang Sesuai:
                        </h3>
                        <div className=" d-flex flex-wrap justify-content-around flex-row">
                            {
                                tags && tags.tag && tags.tag.length !== 0 ?
                                    tags.tag.map ((el, i) => {
                                        return (
                                            <div 
                                                className="border px-2 py-1 rounded my-3 mr-3" 
                                                key={i}
                                                onClick={() => handleFilterTag(el)}
                                                style={{cursor:"pointer"}}
                                            >
                                                {el}
                                            </div>
                                        )
                                    })
                                :
                                    <div className="row text-center">
                                        <h3 className="text-muted">
                                            <em>
                                                Tag Belum Tersedia
                                            </em>
                                        </h3>
                                    </div>
                            }
                        </div>
                    </div>

                </div>
                {/* End of Right Side */}

            </div>
            {/* End Content */}

            
            <div className="row my-5 d-flex justify-content-center">
                <div className="table-pagination">
                    <Pagination 
                        // activePage = {activePage}
                        activePage = {1}
                        // itemsCountPerPage={pelatihan.perPage}
                        itemsCountPerPage={6}
                        // totalItemsCount={pelatihan.total}
                        totalItemsCount={6}
                        pageRangeDisplayed={3}
                        // onChange={handlePagination}
                        nextPageText={">"}
                        prevPageText={"<"}
                        firstPageText={"<<"}
                        lastPageText={">>"}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>
                
            </div>
            
            
        </div>
    )
} 

export default Artikel