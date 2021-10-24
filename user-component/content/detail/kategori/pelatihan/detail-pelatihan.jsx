import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { 
    Badge
} from "react-bootstrap";

import Layout from "../../../wrapper/layout.wrapper";
import SubHeaderComponent from "../../../../components/template/Subheader.component";
import TrainingReminder from "../../../../components/TrainingReminder";
import style from "../../../../../styles/peserta/dashboard.module.css"
// import DownloadButton from "../../../../components/DownloadButton";
// import FilterBar from "../../../../components/FilterBar";

const DetailPelatihan = () => {

    const {
        pelatihan,
    } = useSelector((state) => state.detailPelatihan);

    return (
        <Layout title="Detail Pelatihan">

            {/* <FilterBar /> */}
            <SubHeaderComponent />

            {
                pelatihan ?
                    <div className="row mt-3">
                        <div className="col-12 col-md-9">
                            <div className="bg-white rounded my-5">
                                <div className="ml-2 mb-3">
                                    <h1 className="font-weight-bolder">
                                        { pelatihan.name }
                                    </h1>

                                    <div className="row">
                                        <div className="text-muted font-weight-bolder mr-3 ml-4">
                                            {pelatihan.akademi} 
                                        </div>
                                        <div>
                                            <Badge bg="light">
                                                <span className="text-success">{pelatihan.Status}</span>
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="row d-flex justify-content-between">
                                        <div className="d-flex flex-column mx-4">
                                            <div>
                                                Registrasi
                                            </div>
                                            <div>
                                                {moment(pelatihan.pendaftaran_mulai).format("DD MMMM YYYY")} - {moment(pelatihan.pendaftaran_selesai).format("DD MMMM YYYY")}
                                            </div>
                                        </div>

                                        <div className="d-flex flex-column mx-2">
                                            <div>
                                                Pelaksanaan
                                            </div>
                                            <div>
                                                {pelatihan.metode_pelatihan}
                                            </div>
                                        </div>

                                        <div className="d-flex flex-column mx-2">
                                            <div>
                                                Pendaftar
                                            </div>
                                            <div>
                                                {pelatihan.kuota_peserta} Peserta
                                            </div>
                                        </div>

                                        <div className="d-flex flex-row mx-3">
                                            <button className="btn btn-white mr-3 p-3 rounded-circle">
                                                <i className="ri-share-line"></i>
                                            </button>
                                            <button className="btn btn-white p-3 rounded-circle">
                                                <i className="ri-heart-line"></i>
                                            </button>
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

                                <div className="my-5 mx-3 text-justify">
                                    {
                                        pelatihan.deskripsi
                                    } 
                                    
                                </div>
                                
                            </div>

                            
                        </div>

                        <div className="col-12 col-md-3">

                            <div className="bg-white border rounded">
                                <div className="row mt-5 p-3">
                                    <h4 className="font-weight-bolder ml-3">
                                        Ikuti Pelatihan
                                    </h4>
                                    <div className="ml-3 mb-5">
                                        {moment(pelatihan.pelatihan_mulai).format("DD MMMM YYYY")} - {moment(pelatihan.pelatihan_selesai).format("DD MMMM YYYY")} 
                                    </div>
                                    <div className="col-12 my-3">
                                        <Link href={`/peserta/form-pendaftaran?id=${pelatihan.id}`} passHref>
                                            <a>
                                                <button className="btn btn-primary-dashboard rounded-pill btn-block ">
                                                Daftar Pelatihan
                                                </button>
                                            </a>
                                        </Link>
                                    </div>
                                    
                                    
                                    <button className="btn btn-outline-primary-new  rounded-pill btn-block col-11 mx-3">
                                        <i className="ri-download-cloud-fill"></i>
                                        <span>Unduh Silabus</span>
                                    </button>
                                </div>

                                {/* Border */}
                                <div className="row ml-3 my-5 mr-5" style={{height:"2px", backgroundColor:"#ADB5BD", opacity:"0.4"}}>

                                </div>
                                <div className="row mt-5 p-3">
                                    <div className="col-2">
                                        <Image 
                                            src={`/assets/icon/alamat-1.svg`}
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                    <div className="col-10">
                                        <div className="font-weight-bolder">
                                            Alamat
                                        </div>
                                        <div>
                                            {pelatihan.alamat}
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-5 p-3">
                                    <div className="col-2">
                                        <Image 
                                            src={`/assets/icon/jam-1.svg`}
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                    <div className="col-10">
                                        <div className="font-weight-bolder">
                                            Jadwal Pelatihan
                                        </div>
                                        <div>
                                            {moment(pelatihan.pelatihan_mulai).format("DD MMMM YYYY")} - {moment(pelatihan.pelatihan_selesai).format("DD MMMM YYYY")}
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-5 p-3">
                                    <div className="col-2">
                                        <Image 
                                            src={`/assets/icon/kuota-1.svg`}
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                    <div className="col-10">
                                        <div className="font-weight-bolder">
                                            Kuota
                                        </div>
                                        <div>
                                            {pelatihan.kuota_pendaftar} orang
                                        </div>
                                    </div>
                                </div>

                                
                            </div>

                            <div className="bg-white border rounded mt-5">
                                <div className="row">
                                    <h4 className="font-weight-bolder ml-5 p-3">
                                        Mitra Pelatihan
                                    </h4>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-3 ml-3">
                                        <Image 
                                            src={`/assets/icon/kuota-1.svg`}
                                            // src={`https://dts-beasiswa-dev.s3-ap-southeast-1.amazonaws.com/${pelatihan.gambar_mitra}`}
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                    <div className="col-5">
                                        <div className="font-weight-bolder">
                                            Mitra Nama { pelatihan.mitra_nama }
                                        </div>
                                        <div className="text-muted">
                                            Mitra { pelatihan.mitra }
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>

                            <TrainingReminder />
                        </div>
                    </div>
                :
                    null
            }
            
        </Layout>
        
    )
}

export default DetailPelatihan