import React, { useEffect, useState } from "react"
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { 
    Card,
    Badge,
    Button
} from "react-bootstrap";
import Cardss from "../../../../components/beranda/card";

import Pagination from "react-js-pagination";

import Layout from "../../../wrapper/layout.wrapper";
import FilterBar from "../../../../components/FilterBar";
import SubHeaderComponent from "../../../../components/template/Subheader.component";
import FilterSide from "../../../../components/FilterSide";
import TrainingReminder from "../../../../components/TrainingReminder";
import style from "../../../../../styles/peserta/dashboard.module.css"

// import "../../../../../styles/beranda.module.css"

const DetailAkademi = () => {
    const {
        akademi,
    } = useSelector((state) => state.detailAkademi);

    const {
        pelatihan,
    } = useSelector((state) => state.allPelatihan);

    const textToTrim = 325
    // const [ akademiId, setAkademiId ] = useState (akademi.id)
    // const [ akademiLogo, setAkademiLogo ] = useState (akademi.logo)
    // const [ akademiName, setAkademiName ] = useState (akademi.name)
    // const [ akademiSlug, setAkademiSlug ] = useState (akademi.slug)
    // const [ akademiDeskripsi, setAkademiDeskripsi ] = useState (akademi.deskripsi)

    const [ show, setShow ] = useState([])
    const [ showDetail, setShowDetail ] = useState([])
    const [ activePage, setActivePage ] = useState(1)
    const [ oldAkademiDesc, setOldAkademiDesc ] = useState(null)
    const [ akademiName, setAkademiName ] = useState (null)
    const [ akademiDesc, setAkademiDesc ] = useState(null)
    const [ seeMoreStatus, setSeeMoreStatus ] = useState(false)

    useEffect(() => {
        handleHoverCard()
        handleTextTrim()
    }, [])

    const handleTextTrim = () => {
        if (akademi){
            let str = null

            if (akademi.deskripsi.length > textToTrim){
                // console.log (true)
                str = akademi.deskripsi.slice(0, textToTrim) + "..."
            }

            // setAkademiName(akademi.name)
            setAkademiDesc(str)
            setOldAkademiDesc(akademi.deskripsi)
        }
    }

    const handleShowMoreText = (status) => {
        setSeeMoreStatus (status)
        // setAkademiDesc(text)
    }

    const handleHoverCard = () => {
        let arr = [...show]

        if (pelatihan !== undefined && pelatihan.list.length !== 0){
            for (let i = 0; i < pelatihan.list.length; i++){
                arr.push (false)
            }

            setShow (arr)
            setShowDetail (arr)
        }
    }

    const handleMouseEnter = (index) =>{
        let arr = [...show]

        for (let i = 0; i < arr.length; i++){
            if (i === index){
                arr.splice (i, 1, true)
            }
        }
    
        setShow(arr)
    }

    const handleMouseLeave = (index) =>{
        let arr = [...show]

        for (let i = 0; i < arr.length; i++){
            if (i === index){
                arr.splice (i, 1, false)
            }
        }
        setShow(arr)
    }

    const handleQuickView = (index) => {
        let arr = [...showDetail]

        for (let i = 0; i < arr.length; i++){
            if (i === index){
                arr.splice (i, 1, true)
            }
        }

        setShowDetail (arr)
    }

    const handleCloseQuickView = (index) => {
        let arr = [...showDetail]

        for (let i = 0; i < arr.length; i++){
            if (i === index){
                arr.splice (i, 1, false)
            }
        }

        setShowDetail (arr)
    }

    const handlePagination = (pageNumber) => {

    }

    return (
        <Layout title="Detail Akademi">
            
            <SubHeaderComponent />
            {
                console.log (akademi)
            }
            {
                console.log (pelatihan)
            }
            {
                akademi ?
                    <div className="my-5 bg-white rounded border">
                        <div className="row ">
                            <div className="col-2 py-3 ml-4">
                                <Image 
                                    // src={`/assets/media/logo-vsga-1.svg`}
                                    src={`https://dts-beasiswa-dev.s3-ap-southeast-1.amazonaws.com/${akademi.logo}`}
                                    width={150}
                                    height={150}
                                />
                            </div>

                            <div className="col-9">
                                
                                <h3 className="font-weight-bolder mt-5">
                                    {akademi.name} ({akademi.slug})
                                </h3>

                                {
                                    seeMoreStatus === false ?
                                        <>
                                            <div dangerouslySetInnerHTML={{ __html: akademiDesc}}></div>    
                                            <div className="my-2 text-primary" style={{cursor:"pointer"}} onClick={() => handleShowMoreText(true)}>
                                                Lihat Selengkapnya
                                            </div>
                                        </>
                                        
                                    :   
                                        <> 
                                            <div dangerouslySetInnerHTML={{ __html: oldAkademiDesc}}></div> 
                                            <div className="my-2 text-primary" style={{cursor:"pointer"}} onClick={() => handleShowMoreText(false)}>
                                                Lihat Lebih Sedikit
                                            </div>
                                        </>
                                        
                                }
                                
                            </div>
                        </div>
                    </div>
                :
                    null
            }
            
            <FilterBar />

            <div className="row my-5">
                <div className="col-12 col-md-3">
                    <TrainingReminder />
                    <FilterSide />
                </div>

                <div className="col-md-9 col-12 d-flex flex-row flex-wrap justify-content-between">
                {/* <div className="col-12 col-md-9 mt-2 d-flex flex-row flex-wrap justify-content-between"> */}
                    {
                        pelatihan && pelatihan.list !== 0 && show.length !== 0  ?
                            
                            pelatihan.list.map ((el, i) => {
                                return (
                                    showDetail[i] === false ?
                                        <div className="col-md-6 mb-4 px-2 mt-5" key={i}>
                                            <Card
                                                className="shadow rounded-md"
                                                onMouseEnter={() => handleMouseEnter(i)}
                                                onMouseLeave={() => handleMouseLeave(i)}
                                            >
                                                <Image 
                                                    className={`${style.image_dashboard}`}
                                                    src={process.env.END_POINT_API_IMAGE_BEASISWA + el.gambar}
                                                    width={400}
                                                    height={180}
                                                    objectFit="cover"
                                                />
                                                <Card.ImgOverlay>
                                                
                                                    <Badge bg={` rounded-xl py-3 px-4 ${style.badge_card}`}>
                                                        Pelatihan {el.metode_pelatihan}
                                                    </Badge>
                                                    {
                                                        show[i] === true ?
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
                                                        :
                                                            null
                                                    }
                                                    
                                                </Card.ImgOverlay>
                                                <Card.Body className="position-relative">
                                                    <div className={style.bungkus_mitra_pelatihan}>
                                                        {
                                                            el.gambar_mitra !== "" ||  el.gambar_mitra !== null || el.gambar_mitra !== undefined ?
                                                                <Image
                                                                    src={process.env.END_POINT_API_IMAGE_PARTNERSHIP + el.gambar_mitra}
                                                                    width={62}
                                                                    height={62}
                                                                    objectFit="cover"
                                                                    thumbnail
                                                                    roundedCircle
                                                                    className={`${style.image_card_pelatihan} img-fluild`}
                                                                />
                                                            :
                                                                <Image
                                                                    src="/assets/media/Logo.svg"
                                                                    width={62}
                                                                    height={62}
                                                                    objectFit="cover"
                                                                    thumbnail
                                                                    roundedCircle
                                                                    className={`${style.image_card_pelatihan} img-fluild`}
                                                                />
                                                        }
                                                        
                                                    </div>
                                                    <div
                                                        className="d-flex justify-content-between position-relative pb-0 mb-0"
                                                        style={{ top: "-15px" }}
                                                    >
                                                        {
                                                            el.mitra ?
                                                                <p className={`pl-20 my-0 ${style.text_mitra}`}>
                                                                    {el.mitra}
                                                                </p>
                                                            :
                                                                <p className={`pl-20 my-0 ${style.text_mitra}`}>
                                                                    Nama Mitra
                                                                </p>
                                                        }
                                                            
                                                        {el.status === "Open"? 
                                                            <p
                                                                className={`${style.status_mitra_open} text-uppercase font-weight-bolder my-0`}
                                                            >
                                                                Open
                                                            </p>
                                                            
                                                        :

                                                            <p
                                                                className={`${style.status_mitra_close} text-uppercase font-weight-bolder my-0`}
                                                            >
                                                                Close
                                                            </p>
                                                            
                                                        }
                                                    </div>
                                                        <p className={`my-0 ${style.title_card}`}>
                                                            {el.name}
                                                        </p>
                                                        <p style={{ fontSize: "14px", color: "#6C6C6C" }}>
                                                            {akademi.name}
                                                        </p>
                                                    <hr />
                                                    {
                                                        show[i] !== true ?
                                                            <div className="d-flex flex-column">
                                                                <div className="date d-flex align-items-center align-middle mr-7">
                                                                    <i className="ri-time-line"></i>
                                                                    <span
                                                                        className={`${style.text_date_register} pl-2`}
                                                                    >
                                                                        Registrasi: {moment(el.pendaftaran_mulai).format("DD MMMM YYYY")} - {moment(el.pendaftaran_selesai).format("DD MMMM YYYY")}
                                                                    </span>
                                                                </div>
                                                                <div className="date d-flex align-items-center align-middle">
                                                                    <i className="ri-group-line"></i>
                                                                    <span
                                                                        className={`${style.text_date_register} pl-2`}
                                                                    >
                                                                        Kuota: {el.kuota_peserta} Peserta
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        :
                                                            <Button
                                                                className={`btn-block rounded-xl ${style.btn_quick_view}`}
                                                                onClick={() => handleQuickView(i)}
                                                            >
                                                                Quick View
                                                            </Button>
                                                    }
                                                </Card.Body>
                                            </Card>
                                                    
                                            
                                        </div>
                                    :   
                                        <div className="row">
                                            <div key={i} className=" row rounded border shadow ml-3 mt-3" style={{height:"50vh"}}>
                                              
                                              <div className="col-4">
                                                  {/* <Image 
                                                      // src={`https://dts-beasiswa-dev.s3-ap-southeast-1.amazonaws.com/${el.gambar}`}
                                                      src={process.env.END_POINT_API_IMAGE_BEASISWA + el.gambar}
                                                      layout="fill"
                                                      objectFit="cover"
                                                  /> */}
                                                  <Image 
                                                    //   className={`${style.image_dashboard}`}
                                                      src={process.env.END_POINT_API_IMAGE_BEASISWA + el.gambar}
                                                      width={400}
                                                      height={450}
                                                      objectFit="cover"
                                                  />
                                              </div>
                                              <div className="col-8 mb-0">
                                                  <Card.Body>
                                                      <div className="row">
                                                          <div className="col-2">
                                                              <Image 
                                                                  src={`/assets/media/Logo.svg`}
                                                                  // src={`https://dts-beasiswa-dev.s3-ap-southeast-1.amazonaws.com/${el.gambar_mitra}`}
                                                                  width="50vh"
                                                                  height="50vh"
                                                                  className="rounded-circle"
                                                              />
                                                          </div>
                                                          <div className="col-9">
                                                              <div className="text-muted">
                                                                  {
                                                                      akademi.name
                                                                  }
                                                              </div>
                                                              <div>
                                                                  <h4>
                                                                      {el.name}
                                                                  </h4>
                                                              </div>
                                                              <div className="text-info">
                                                                  {el.mitra}
                                                              </div>
                                                          </div>
                                                          <div className="col-1" style={{cursor:"pointer"}}>
                                                              <i className="ri-close-fill font-weight-bolder text-dark" onClick={() => handleCloseQuickView(i)}></i>
                                                          </div>
                                                      </div>
                                                      <div className="row mt-3 ml-3">
                                                          <div dangerouslySetInnerHTML={{ __html: el.deskripsi }}>
                                                              {/* {el.deskripsi} */}
                                                          </div>
                                                      </div>
                                                      <div className="row d-flex justify-content-between mt-3">
                                                          <div className="d-flex align-content-center">
                                                              <i className="ri-time-line text-dark"></i>
                                                              <span className="mt-1">
                                                                  Registrasi: {moment (el.pendaftaran_mulai).format("DD MMMM YYYY")} - {moment (el.pendaftaran_selesai).format("DD MMMM YYYY")}
                                                              </span>
                                                          </div>
                                                          <div className="d-flex align-content-center">
                                                              <i className="ri-group-line text-dark"></i>
                                                              <span className="mt-1">
                                                                  Kuota: {el.kuota_peserta} Peserta
                                                              </span>
                                                          </div>
                                                          <div className="d-flex align-content-center">
                                                              <i className="ri-map-pin-line text-dark"></i>
                                                              <span className="mt-1">
                                                                  Lokasi: {el.alamat}
                                                              </span>
                                                          </div>
                                                      </div>
  
                                                  </Card.Body>
                                                  <hr />
                                                  <div className="row mt-0">
                                                      <div className="col-12 col-md-6 mt-5">
                                                        <Link href={`/detail/pelatihan/${el.id}`} passHref>
                                                            <a>
                                                                <button className="btn btn-outline-primary-new rounded-pill btn-block">
                                                                    Lihat Selengkapnya
                                                                </button>
                                                            </a>
                                                        </Link>
                                                      </div>
                                                      <div className="col-12 col-md-6 mt-5">
                                                        <Link href={`/peserta/form-pendaftaran?id=${el.id}`} passHref className="col-12">
                                                            <a>
                                                            <button className="btn btn-primary-dashboard rounded-pill btn-block">
                                                                Daftar Pelatihan
                                                            </button>
                                                            </a>
                                                        </Link>
                                                      </div>
                                                    </div>
                                              </div>
                                              
                                              
                                          </div>
                                        </div>


                                        
                                        
                                )
                            })
                            
                        :   
                            <div className="row d-flex justify-content-center">
                                <h3 className="text-center col-12">
                                    Pelatihan Tidak Ditemukan
                                </h3>
                            </div>
                            
                    }
                </div>
                
            </div>

            <div className="row my-5 d-flex justify-content-center">
                {
                    pelatihan && pelatihan.perPage < pelatihan.total ?
                        <div className="table-pagination">
                            <Pagination 
                                activePage = {activePage}
                                itemsCountPerPage={pelatihan.perPage}
                                totalItemsCount={pelatihan.total}
                                pageRangeDisplayed={3}
                                nextPageText={">"}
                                prevPageText={"<"}
                                firstPageText={"<<"}
                                lastPageText={">>"}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    :
                        null
                }
                
            </div>

        </Layout>
    )
}


export default DetailAkademi