import React, { useEffect, useState } from "react"
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
// import Swal from "sweetalert2";
import moment from "moment";
import DatePicker from "react-datepicker";
import { TagsInput } from "react-tag-input-component";
import { toast } from "react-toastify";

import { 
    Card,
    Badge,
    Button,
    Dropdown
} from "react-bootstrap";
// import Cardss from "../../../../components/beranda/card";

import Pagination from "react-js-pagination";

// import Layout from "../../../wrapper/layout.wrapper";
import FilterBar from "../../../../components/FilterBar";
import SubHeaderComponent from "../../../../components/template/Subheader.component";
// import FilterSide from "../../../../components/FilterSide";
import TrainingReminder from "../../../../components/TrainingReminder";
import style from "../../../../../styles/peserta/dashboard.module.css"
import { checkRegisterPelatihan } from "../../../../../redux/actions/beranda/detail-pelatihan.actions";
import { getAllPelatihanByAkademi } from "../../../../../redux/actions/beranda/detail-akademi.actions";

// import "../../../../../styles/beranda.module.css"

const DetailAkademi = ({ session }) => {
    const {
        akademi,
    } = useSelector((state) => state.detailAkademi);

    const {
        pelatihan,
    } = useSelector((state) => state.allPelatihan);

    const textToTrim = 200
    const dispatch = useDispatch();
    const router = useRouter();
    // const [ akademiId, setAkademiId ] = useState (akademi.id)
    // const [ akademiLogo, setAkademiLogo ] = useState (akademi.logo)
    // const [ akademiName, setAkademiName ] = useState (akademi.name)
    // const [ akademiSlug, setAkademiSlug ] = useState (akademi.slug)
    // const [ akademiDeskripsi, setAkademiDeskripsi ] = useState (akademi.deskripsi)

    const [ show, setShow ] = useState([])
    const [ showDetail, setShowDetail ] = useState([])
    const [ activePage, setActivePage ] = useState(1)
    const [ oldAkademiDesc, setOldAkademiDesc ] = useState(null)
    const [ akademiId, setAkademiId ] = useState (null)
    const [ akademiName, setAkademiName ] = useState (null)
    const [ akademiDesc, setAkademiDesc ] = useState(null)
    const [ temaId, setTemaId ] = useState(null)
    const [ seeMoreStatus, setSeeMoreStatus ] = useState(false)

    const [ filterPenyelenggara, setFilterPenyelenggara ] = useState (null)
    const [ filterKategori, setFilterKategori ] = useState (null)
    const [ filterKataKunci, setFilterKataKunci ] = useState (null)
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    useEffect(() => {
        handleHoverCard()
        handleTextTrim()
    }, [])

    const handleTextTrim = () => {
        if (akademi){
            let str = null

            if (akademi.deskripsi.length > textToTrim){
    
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

        if (pelatihan !== undefined && pelatihan.list && pelatihan.list.length !== 0){
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

    const handleCheckPelatihanReg = async (id, session) => {
        if (session.Token){
          const data = await dispatch(checkRegisterPelatihan(id, session.Token))
    
          if (data.status === true){
            router.push(`${router.pathname}/peserta/form-pendaftaran?id=${id}`)
    
          } else if (data.status === false) {
            let errMessage = data.message
            toast.error (errMessage)
          }
        
        } else {
          router.push(`${router.pathname}/login`)
        }
    }

    const printTextTrim = (str) => {
        let result = null

        if (str.length > textToTrim) {
            result = str.slice(0, textToTrim) + "..."

        } else {
            result = str
        }

        return result
    }

    const handlePagination = (pageNumber) => {

    }

    const handleFilter = () => {
        let dataToSend = {
            akademi_id: akademiId,
            tema_id: temaId,
            penyelenggara: filterPenyelenggara,
            kategori_peserta: filterKategori,
            kata_kunci: filterKataKunci,
            tanggal_mulai: startDate,
            tanggal_akhir: endDate
        }

        // dispatch(getAllPelatihanByAkademi(dataToSend))
    }

    return (
        <>
            <SubHeaderComponent />
            {
                akademi ?
                    <div className="my-5 bg-white rounded border">
                        <div className="row ">
                            <div className="col-2 py-3 ml-4">
                                <Image 
                                    // src={`/assets/media/logo-vsga-1.svg`}
                                    src={process.env.END_POINT_API_IMAGE_BEASISWA + akademi.logo}
                                    width={150}
                                    height={150}
                                    alt=" Image Logo"
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


                    {/* <FilterSide /> */}
                    <div className="bg-white rounded border">
                        <div className="row d-flex align-items-center">
                            <div className="p-3 ml-3">
                                <Image 
                                    src={`/assets/media/logo-filter.svg`}
                                    width={40}
                                    height={40}
                                    alt="Image Logo"
                                />
                            </div>
                            
                            <div className="font-weight-bolder">
                                Filter
                            </div>
                        </div>

                        <div className="my-5 p-3">
                            <div className="font-weight-bolder">
                                Penyelenggara
                            </div>
                            <select
                                className="form-control"
                            >
                                <option value="Semua Penyelenggara" selected>Semua Penyelenggara</option>
                                <option value="Gojek">Gojek</option>
                                <option value="Bukalapak">Bukalapak</option>
                                <option value="Tokopedia">Tokopedia</option>
                                <option value="Google">Google</option>
                                <option value="Facebook">Facebook</option>
                                <option value="Apple">Apple</option>
                            </select>
                        </div>

                        <div className="my-5 p-3">
                            <div className="font-weight-bolder">
                                Kategori Peserta
                            </div>
                            <select
                                className="form-control"
                            >
                                <option value="Peserta Umum" selected>Peserta Umum</option>
                                <option value="Peserta Khusus">Peserta Khusus</option>
                            </select>
                        </div>

                        <div className="my-5 p-3">
                            <div className="font-weight-bolder">
                                Kata Kunci
                            </div>
                            <TagsInput 
                                placeHolder="Contoh Java"
                                seprators={["Enter", "Tab"]}
                            />
                        </div>

                        <div className="my-5 p-3">
                            <div className="font-weight-bolder">
                                Tanggal Mulai Pelaksanaan
                            </div>
                            <div>
                                <DatePicker
                                    className="form-search-date form-control-sm form-control"
                                    // selected={startDate}
                                    // onChange={(date) => handleStartDate(date)}
                                    selectsStart
                                    // startDate={startDate}
                                    // endDate={endDate}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="dd-mm-yy"
                                    wrapperClassName="col-12 col-lg-12 col-xl-12"
                                    // minDate={moment().toDate()}
                                    // minDate={addDays(new Date(), 20)}
                                />
                            </div>
                            
                        </div>

                        <div className="my-5 p-3">
                            <div className="font-weight-bolder">
                                Tanggal Akhir Pelaksanaan
                            </div>
                            <div>
                                <DatePicker
                                    className="form-search-date form-control-sm form-control"
                                    // selected={startDate}
                                    // onChange={(date) => handleStartDate(date)}
                                    selectsStart
                                    // startDate={startDate}
                                    // endDate={endDate}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="dd-mm-yy"
                                    wrapperClassName="col-12 col-lg-12 col-xl-12"
                                    // minDate={moment().toDate()}
                                    // minDate={addDays(new Date(), 20)}
                                />
                            </div>
                            
                        </div>

                        <div className="my-5 p-3">
                            <div className="row d-flex justify-content-around">
                                <button className="btn btn-white-ghost-rounded-full">
                                    Reset
                                </button>

                                <button className="btn btn-primary rounded-pill" onClick={() => handleFilter()}>
                                    Tampilkan
                                </button>
                            </div>
                        </div>

                        
                    </div>
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
                                                {
                                                    show[i] !== true ?
                                                        <Image 
                                                            className={`${style.image_dashboard}`}
                                                            src={process.env.END_POINT_API_IMAGE_BEASISWA + el.gambar}
                                                            width={400}
                                                            height={180}
                                                            objectFit="cover"
                                                            alt="Image Thumbnail"
                                                        />
                                                    :
                                                        <div style={{filter:"brightness(0.3)"}}>
                                                            <Image 
                                                                className={`${style.image_dashboard}`}
                                                                src={process.env.END_POINT_API_IMAGE_BEASISWA + el.gambar}
                                                                width={500}
                                                                height={200}
                                                                objectFit="cover"
                                                                alt="Image Thumbnail"
                                                            />
                                                        </div>
                                                }
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
                                                                    alt="Image Mitra"
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
                                                                    alt="Image Logo"
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
                                                      alt="Image Thumbnail"
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
                                                                  alt =" Image Mitra"
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
                                                          {/* {el.deskripsi} */}
                                                          <div dangerouslySetInnerHTML={{ __html: printTextTrim(el.deskripsi) }}></div>
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
                                                      {
                                                        el.status !== "Closed" ?
                                                            <div className="col-12 col-md-6 mt-5">
                                                                {/* <Link href={`/peserta/form-pendaftaran?id=${el.id}`} passHref className="col-12">
                                                                    <a>
                                                                    <button className="btn btn-primary-dashboard rounded-pill btn-block" onClick={() => handleCheckPelatihanReg()}>
                                                                        Daftar Pelatihan
                                                                    </button>
                                                                    </a>
                                                                </Link> */}
                                                                <button className="btn btn-primary-dashboard rounded-pill btn-block" onClick={() => handleCheckPelatihanReg(el.id, session)}>
                                                                    Daftar Pelatihan
                                                                </button>
                                                            </div>
                                                            :
                                                            null
                                                      }
                                                      
                                                    </div>
                                              </div>
                                              
                                              
                                          </div>
                                        </div>


                                        
                                        
                                )
                            })
                            
                        :   
                            <div className="row">
                                <h3 className="text-center mt-5 mx-5">
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

        </>
    )
}

export default DetailAkademi