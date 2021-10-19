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

import Pagination from "react-js-pagination";

import Layout from "../../../wrapper/layout.wrapper";
import FilterBar from "../../../../components/FilterBar";
import SubHeaderComponent from "../../../../components/template/Subheader.component";
import FilterSide from "../../../../components/FilterSide";
import TrainingReminder from "../../../../components/TrainingReminder";

// import "../../../../../styles/beranda.module.css"

const DetailAkademi = () => {
    const {
        akademi,
    } = useSelector((state) => state.detailAkademi);

    const {
        pelatihan,
    } = useSelector((state) => state.allPelatihan);


    // const [ akademiId, setAkademiId ] = useState (akademi.id)
    // const [ akademiLogo, setAkademiLogo ] = useState (akademi.logo)
    // const [ akademiName, setAkademiName ] = useState (akademi.name)
    // const [ akademiSlug, setAkademiSlug ] = useState (akademi.slug)
    // const [ akademiDeskripsi, setAkademiDeskripsi ] = useState (akademi.deskripsi)

    const [ show, setShow ] = useState([])
    const [ showDetail, setShowDetail ] = useState([])

    const [ activePage, setActivePage ] = useState(1)

    useEffect(() => {
        handleHoverCard()
    }, [])

    const handleHoverCard = () => {
        let arr = [...show]

        if ( pelatihan.list.length !== 0){
            for (let i = 0; i < pelatihan.list.length; i++){
                arr.push (false)
                console.log ("check1")
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

    const renderShare = (status, metode) => {
        if (status == true) {
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

    const renderButton = (status, daftar_mulai, daftar_selesai, quota, id, index) => {
        if (status == true) {
            return (
                <div className="d-flex align-self-center">
                    <Button className="btn btn-outline-info rounded-pill col-12" onClick={() => handleQuickView(index)}>
                        Quick View
                    </Button>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="d-flex align-content-center">
                        <i className="ri-time-line mr-2"></i>
                        <span className="mt-1">Registrasi: {moment(daftar_mulai).format("DD MMMM YYYY")} - {moment(daftar_selesai).format("DD MMMM YYYY")}</span>
                    </div>
                    <div className="d-flex align-content-center">
                        <i className="ri-group-line mr-2"></i>
                        <span className="mt-1">Kuota {quota} Peserta</span>
                    </div> 
                </div>
            )
        }
    }

    const handlePagination = (pageNumber) => {

    }

    return (
        <Layout title="Detail Akademi">
            {
                // console.log (akademi)
            }

            {
                console.log (pelatihan)
            }

            {
                // console.log (show)
            }
            <SubHeaderComponent />
            
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

                                <div dangerouslySetInnerHTML={{ __html: akademi.deskripsi}}></div>

                                <div className="my-2 text-primary" style={{cursor:"pointer"}}>
                                    <Link href="#home" c> 
                                       
                                        Lihat Selengkapnya
                                        
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                :
                    null
            }
            
            <FilterBar />

            <div className="row my-5">
                <div className="col-3">
                    <TrainingReminder />
                    <FilterSide />
                </div>

                <div className="col-9 mt-2 d-flex flex-row flex-wrap justify-content-between">
                    {
                        pelatihan && pelatihan.list !== 0 && show.length !== 0  ?
                            
                            pelatihan.list.map ((el, i) => {
                                return (
                                    showDetail[i] === false ?
                                        <Card   
                                            style={{ width: '30rem', height:"35rem", cursor:"pointer"}} 
                                            className="m-3 shadow"
                                            key={i}
                                            onMouseEnter={() => handleMouseEnter(i)}
                                            onMouseLeave={() => handleMouseLeave(i)}
                                        >   
                                            {
                                                renderShare(show[i], el.metode_pelatihan)
                                            }

                                            {/* <div className='rounded' >
                                                <div style={{backgroundImage:`https://dts-beasiswa-dev.s3-ap-southeast-1.amazonaws.com/${el.gambar}`}}>
                                                    <div style={show[i] === true ? {background: "rgba(0, 0, 0, 0.5)"} : null}></div>
                                                </div>
                                            </div> */}

                                            <div className='rounded'>
                                                <Card.Img
                                                    variant="top"
                                                    src={`https://dts-beasiswa-dev.s3-ap-southeast-1.amazonaws.com/${el.gambar}`} 
                                                />
                                            </div>

                                            <div className="ml-2 " style={{position:"absolute", marginTop:"28vh"}}>
                                                <Image 
                                                    src={`/assets/media/Logo.svg`}
                                                    // src={`https://dts-beasiswa-dev.s3-ap-southeast-1.amazonaws.com/${el.gambar_mitra}`}
                                                    width="50vh"
                                                    height="50vh"
                                                    className="rounded"
                                                />
                                            </div>

                                            <div className="row d-flex justify-content-between mx-5 mt-3">
                                                <div style={{marginLeft:"7vh"}}>
                                                    {el.mitra}
                                                </div>
                                                <Badge bg="light">
                                                    <div className="text-danger mt-1">
                                                        {el.status}
                                                    </div>
                                                </Badge>
                                            </div>

                                            <Card.Body>
                                                                    
                                                <div>
                                                    <h4>{el.name}</h4>
                                                </div>

                                                <div className="text-muted">
                                                    {
                                                        akademi.name
                                                    }
                                                </div>

                                                <div 
                                                    className="row my-3" 
                                                    style={{height:"2px", backgroundColor:"#ADB5BD"}}
                                                >
                                                </div>
                                                
                                                {
                                                    renderButton(show[i], el.pendaftaran_mulai, el.pendaftaran_selesai, el.kuota_peserta, el.id, i)
                                                }
                                                
                                            </Card.Body>

                                        </Card>
                                    :
                                        <Card
                                            key={i}
                                            className="col-12 d-flex flex-row ml-3 mr-5 shadow"
                                        >
                                            
                                            <div className="col-4">
                                                {/* <Card.Img 
                                                    variant="top" 
                                                    src={`https://dts-beasiswa-dev.s3-ap-southeast-1.amazonaws.com/${el.gambar}`}
                                                /> */}
                                                <Image 
                                                    src={`https://dts-beasiswa-dev.s3-ap-southeast-1.amazonaws.com/${el.gambar}`}
                                                    layout="fill"
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
                                                        <div>
                                                            {el.deskripsi}
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
                                                                Lokasi: 
                                                            </span>
                                                        </div>
                                                    </div>

                                                </Card.Body>
                                                <Card.Footer>
                                                    <div className="d-flex justify-content-between mt-0">
                                                        <Button className="btn btn-outline-info rounded-pill col-5">
                                                            Lihat Selengkapnya
                                                        </Button>
                                                        <Button className="btn btn-info rounded-pill col-5">
                                                            Daftar Pelatihan      
                                                        </Button>
                                                    </div>
                                                </Card.Footer>
                                            </div>
                                        
                                        </Card>
                                )
                            })
                            
                        :   
                            <div className="row d-flex justify-content-center">
                                <h3 className="text-center col-12">
                                    Data Tidak Ditemukan
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