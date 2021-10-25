import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import moment from "moment";
import { toast } from "react-toastify";

import { Badge } from "react-bootstrap";

import Layout from "../../../wrapper/layout.wrapper";
import SubHeaderComponent from "../../../../components/template/Subheader.component";
import TrainingReminder from "../../../../components/TrainingReminder";
import style from "../../../../../styles/peserta/dashboard.module.css"
import { checkRegisterPelatihan } from "../../../../../redux/actions/beranda/detail-pelatihan.actions";

import IconLove from "../../../../../components/assets/icon/Love";
import IconShare from "../../../../../components/assets/icon/Share";

// import DownloadButton from "../../../../components/DownloadButton";
// import FilterBar from "../../../../components/FilterBar";

const DetailPelatihan = ({ session }) => {

    const {
        pelatihan,
    } = useSelector((state) => state.detailPelatihan);

    const handleCheckPelatihanReg = async (id, session) => {
        if (session.Token){
          const data = await dispatch(checkRegisterPelatihan(id, session.Token))
    
          // console.log (data)
    
          if (data.status === true){
            router.push(`${router.pathname}/peserta/form-pendaftaran?id=${id}`)
    
          } else if (data.status === false) {
            // let errMessage = data.message[0].toUpperCase()  + string.substring(1)
            let errMessage = data.message
            toast.error (errMessage)
          }
        
        } else {
          router.push(`${router.pathname}/login`)
        }
    }

    return (
        <>

            {/* <FilterBar /> */}
            <SubHeaderComponent />

            {
                pelatihan ?
                    <div className="row mt-3">
                        <div className="col-12 col-md-9">
                            <div className="bg-white rounded my-5">
                                <div className="ml-2 mb-3">
                                    <h1 className="fw-700 fz-36">{pelatihan.name}</h1>

                                    <div className="d-flex align-items-center">
                                        <p className="mr-6 fz-18 fw-600">{pelatihan.akademi}</p>
                                        <p className="badgess-green">{pelatihan.Status}</p>
                                    </div>

                                    <div className="row mt-8">
                                        <div className="col-6 col-sm-5">
                                            <div>
                                                <p className="mb-2" style={{ color: "#6C6C6C" }}>
                                                    Registrasi
                                                </p>
                                                <p className="fz-16">
                                                    {moment(pelatihan.pendaftaran_mulai).format(
                                                    "DD MMMM YYYY"
                                                    )}{" "}
                                                    -{" "}
                                                    {moment(pelatihan.pendaftaran_selesai).format(
                                                    "DD MMMM YYYY"
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="col-6 col-sm-2">
                                            <div>
                                                <p className="mb-2" style={{ color: "#6C6C6C" }}>
                                                    Pelaksanaan
                                                </p>
                                                <p className="fz-16">{pelatihan.metode_pelatihan}</p>
                                            </div>
                                        </div>

                                        <div className="col-6 col-sm-3">
                                            <div>
                                                <p className="mb-2" style={{ color: "#6C6C6C" }}>
                                                    Pendaftar
                                                </p>
                                                <p className="fz-16">{pelatihan.kuota_peserta} Peserta</p>
                                            </div>
                                        </div>

                                        <div className="col-6 col-sm-2">
                                            <div className="d-flex align-items-center justify-content-end">
                                                <button className="btn btn-white roundedss-border mr-4">
                                                    {/* <i className="ri-share-line"></i> */}
                                                    <IconShare />
                                                </button>
                                                <button className="btn btn-white roundedss-border">
                                                    {/* <i className="ri-heart-line"></i> */}
                                                    <IconLove />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Image
                                    // src={`/assets/media/image_28.svg`}
                                    src={`https://dts-beasiswa-dev.s3-ap-southeast-1.amazonaws.com/${pelatihan.logo}`}
                                    objectFit="cover"
                                    width="1500vh"
                                    height="500vh"
                                    className="rounded"
                                />

                                {/* Border */}
                                <div className="row ml-3 my-5 mr-5" style={{height:"2px", backgroundColor:"#ADB5BD"}}></div>

                                <div className="p-4 border rounded mt-10">
                                    {/* {
                                        pelatihan.deskripsi
                                    }  */}
                                    <div dangerouslySetInnerHTML={{ __html: pelatihan.deskripsi }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-xl-3">
                            <div className="bg-white border rounded p-6">
                                <h4 className="fz-20 fw-600">Ikuti Pelatihan</h4>
                                <span className="fz-16">
                                    {moment(pelatihan.pelatihan_mulai).format("DD MMMM YYYY")} -{" "}
                                    {moment(pelatihan.pelatihan_selesai).format("DD MMMM YYYY")}
                                </span>
                                {
                                    pelatihan.status === "Closed" ?
                                        <div className="col-12 my-3">
                                            {/* <Link href={`/peserta/form-pendaftaran?id=${pelatihan.id}`} passHref>
                                                <a>
                                                    <button className="btn btn-primary-dashboard rounded-pill btn-block ">
                                                    Daftar Pelatihan
                                                    </button>
                                                </a>
                                            </Link> */}
                                            <button className="btn btn-primary-dashboard rounded-pill btn-block" onClick={() => handleCheckPelatihanReg(pelatihan.id, session)}>
                                                Daftar Pelatihan
                                            </button>
                                        </div>
                                    :
                                        null
                                }

                                    <button className="btn btn-outline-primary-new mt-4 rounded-pill mb-8 btn-block py-4">
                                        <i className="ri-download-cloud-fill"></i>
                                        <span>Unduh Silabus</span>
                                    </button>

                                    <hr />

                                    <div className="d-flex flex-wrap align-items-start mt-10">
                                        <Image
                                            src={`/assets/icon/alamat-1.svg`}
                                            width={30}
                                            height={30}
                                        />
                                        <div className="ml-4">
                                            <p className="fw-600 fz-18 mb-2">Alamat</p>
                                            <p className="fz-16">{pelatihan.alamat}</p>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-wrap align-items-start mt-4">
                                        <Image src={`/assets/icon/jam-1.svg`} width={30} height={30} />
                                        <div className="ml-4">
                                            <p className="fw-600 fz-18 mb-2">Jadwal Pelatihan</p>
                                            <p className="fz-16">
                                                {moment(pelatihan.pelatihan_mulai).format("DD MMMM YYYY")} -{" "}
                                                {moment(pelatihan.pelatihan_selesai).format("DD MMMM YYYY")}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-wrap align-items-start mt-4">
                                        <Image src={`/assets/icon/jam-1.svg`} width={30} height={30} />
                                        <div className="ml-4">
                                            <p className="fw-600 fz-18 mb-2">Jadwal Pelatihan</p>
                                            <p className="fz-16">
                                                {moment(pelatihan.pelatihan_mulai).format("DD MMMM YYYY")} -{" "}
                                                {moment(pelatihan.pelatihan_selesai).format("DD MMMM YYYY")}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-wrap align-items-start mt-4">
                                        <Image
                                            src={`/assets/icon/kuota-1.svg`}
                                            width={30}
                                            height={30}
                                        />
                                        <div className="ml-4">
                                            <p className="fw-600 fz-18 mb-2">Kuota</p>
                                            <p className="fz-16">{pelatihan.kuota_pendaftar} peserta</p>
                                        </div>
                                    </div>
                            </div>

                            <div className="bg-white border rounded mt-5 p-6">
                                <h4 className="fz-20 fw-600">Mitra Pelatihan</h4>

                                <div className="ml-6">
                                    <p className="fw-600 fz-16 mb-2">
                                        Mitra Nama {pelatihan.mitra_nama}
                                    </p>
                                    <p style={{color:"#6C6C6C"}}>Mitra {pelatihan.mitra}</p>
                                </div>
                            </div>

                            <TrainingReminder />
                        </div>
                    </div>
                :
                    null
            }
            
        </>
        
    )
}

export default DetailPelatihan
