import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { 
    Badge
} from "react-bootstrap";

import Layout from "../../../wrapper/layout.wrapper";
import SubHeaderComponent from "../../../../components/template/Subheader.component";
import TrainingReminder from "../../../../components/TrainingReminder";
// import DownloadButton from "../../../../components/DownloadButton";
// import FilterBar from "../../../../components/FilterBar";

const DetailPelatihan = () => {
    return (
        <Layout title="Detail Kategori">
            {/* <FilterBar /> */}
            <SubHeaderComponent />

            <div className="row">
                <div className="col-9">
                    <div className="bg-white rounded my-5">
                        <div className="ml-2 mb-3">
                            <h1 className="font-weight-bolder">
                                Intermediate Pemograman menggunakan Laravel
                            </h1>

                            <div className="row">
                                <div className="text-muted font-weight-bolder mr-3 ml-4">
                                    Vocational School Graduate Academy (VSGA)
                                </div>
                                <div>
                                    <Badge bg="light">
                                        <span className="text-success">Open</span>
                                    </Badge>
                                </div>
                            </div>

                            <div className="row d-flex justify-content-between">
                                <div className="d-flex flex-column mx-4">
                                    <div>
                                        Registrasi
                                    </div>
                                    <div>
                                        1 - 30 Juni 2021
                                    </div>
                                </div>

                                <div className="d-flex flex-column mx-2">
                                    <div>
                                        Pelaksanaan
                                    </div>
                                    <div>
                                        Online / Offline
                                    </div>
                                </div>

                                <div className="d-flex flex-column mx-2">
                                    <div>
                                        Pendaftar
                                    </div>
                                    <div>
                                        300 Peserta
                                    </div>
                                </div>

                                <div className="d-flex flex-row mx-3">
                                    <button className="btn btn-primary mr-3 p-3 rounded-circle">
                                        <i className="ri-heart-line"></i>
                                    </button>
                                    <button className="btn btn-primary p-3 rounded-circle">
                                        <i className="ri-share-forward-line"></i>
                                    </button>
                                </div>



                            </div>
                            
                        </div>
                        <Image
                            src={`/assets/media/image_28.svg`}
                            objectFit="cover"
                            width="1500vh"
                            height="500vh"
                        />

                        <div className="row ml-3 my-5 mr-5" style={{height:"5px", backgroundColor:"#ADB5BD"}}>

                        </div>

                        <div className="my-5 mx-3 text-justify">
                            <div>
                                    Intermediate Multimedia Designer merupakan salah satu skema pelatihan dalam Pelatihan Intensif dan Sertifikasi (Daring) yang berbasis Standar Kompetensi Kerja Nasional Indonesia (SKKNI) dengan skema Intermediate Multimedia Designer. Peserta pelatihan Intermediate Multimedia Designer akan mampu membuat rancangan desain visual berbasis multimedia linear maupun interaktif dan membuat prototype interaktif untuk kebutuhan klien. Di akhir pelatihan peserta akan mengikuti uji kompetensi dan sertifikasi Intermediate Multimedia Designer, bagi yang dinyatakan kompeten akan mendapatkan Sertifikat Kompetensi Intermediate Multimedia Designer dari BNSP.
                                Pelatihan akan dilaksanakan secara daring (online) kurang lebih 6 (enam) minggu dengan pengantar live session dalam Bahasa Indonesia.
                                Peserta akan mendapatkan fasilitas secara gratis, diantaranya:
                            </div>
                            <div>
                                <div>
                                    1. Materi pelatihan
                                </div>
                                <div>
                                    2. Penggantian pulsa/biaya komunikasi
                                </div>
                                <div>
                                    3. Sertifikat Keikutsertaan (Completion) dari Kementerian Kominfo bagi peserta yang menyelesaikan pelatihan hingga akhir
                                </div>
                                <div>
                                    4. Kesempatan untuk mengikuti Uji Kompetensi (Sertifikasi) bagi peserta yang menyelesaikan pelatihan hingga akhir dan Sertifikat Kompetensi bagi yang dinyatakan Kompeten
                                </div>
                                <div>
                                    5. Kesempatan untuk mengikuti program pasca pelatihan (pelatihan pengembangan soft skills)
                                </div>
                            </div>
                            <div>
                                <div>
                                    Prospect Career pelatihan ini diantaranya:
                                </div>
                                <div>
                                    1. Multimedia Designer in web developer industry
                                </div>
                                <div>
                                    2. Multimedia Designer in Software Developer Industry
                                </div>
                                <div>
                                    3. Multimedia Designer in Apps developer industry
                                </div>
                                <div>
                                    4. Multimedia Designer in game developer
                                </div>
                                <div>
                                    5. Multimedia Designer in private sector
                                </div>
                            </div>
                            <div>
                                <div>
                                    Spesifikasi Laptop yang disarankan untuk disiapkan oleh peserta pelatihan:
                                </div>
                                <div>
                                    1. RAM minimal 4 GB (disarankan 8 GB)
                                </div>
                                <div>
                                    2. Storage minimal sebesar 500 GB
                                </div>
                            <div>
                                    3. Laptop dengan processor core i5 32/64-bit
                            </div>
                            <div>
                                    4. Laptop dengan Operating System Windows 7, 8, 10, Linux, atau MAC OSX
                            </div>
                            <div>
                                    5. Laptop dengan konektivitas WiFi dan memiliki Webcam
                            </div>
                            <div>
                                    6. Akses Internet Dedicated 128 kbps per peserta per perangkat
                            </div>
                            <div>
                                    Bagi calon peserta penyandang disabilitas dapat mendaftar pelatihan dengan menyediakan sarana dan prasarana pendukung pelatihan secara mandiri.`
                            </div>
                            </div>
                            
                            
                        </div>
                        
                    </div>

                    
                </div>

                <div className="col-3">

                    <div className="bg-white border rounded">
                        <div className="row mt-5 p-3">
                            <h4 className="font-weight-bolder">
                                Ikuti Pelatihan
                            </h4>
                            <button className="btn btn-primary rounded-pill col-12 mb-3">
                                Daftar Pelatihan
                            </button>
                            <button className="btn btn-outline-primary rounded-pill col-12">
                                <i className="ri-download-cloud-fill"></i>
                                <span>Unduh Silabus/Kurikulum</span>
                            </button>
                        </div>
                        <div className="row ml-3 my-5 mr-5" style={{height:"5px", backgroundColor:"#ADB5BD", opacity:"0.4"}}>

                        </div>
                        <div className="row mt-5 p-3">
                            <div className="col-2">
                                <Image 
                                    src={`/assets/icon/alamat.svg`}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className="col-10">
                                <div className="font-weight-bolder">
                                    Alamat
                                </div>
                                <div>
                                    Pelatihan ini dilaksanakan secara Online
                                </div>
                            </div>
                        </div>

                        <div className="row mt-5 p-3">
                            <div className="col-2">
                                <Image 
                                    src={`/assets/icon/jam.svg`}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className="col-10">
                                <div className="font-weight-bolder">
                                    Jadwal Pelatihan
                                </div>
                                <div>
                                    12 Juli 21 - 22 Okt 21
                                </div>
                            </div>
                        </div>

                        <div className="row mt-5 p-3">
                            <div className="col-2">
                                <Image 
                                    src={`/assets/icon/kuota.svg`}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className="col-10">
                                <div className="font-weight-bolder">
                                    Kuota
                                </div>
                                <div>
                                    1000 orang
                                </div>
                            </div>
                        </div>

                        
                    </div>

                    <TrainingReminder />
                </div>
            </div>
        </Layout>
        
    )
}

export default DetailPelatihan