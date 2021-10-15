import React from "react"
import Link from "next/link";
import Image from "next/image";

import { 
    Card,
    Badge
} from "react-bootstrap";

import Pagination from "react-js-pagination";

import Layout from "../../../wrapper/layout.wrapper";
import FilterBar from "../../../../components/FilterBar";
import SubHeaderComponent from "../../../../components/template/Subheader.component";
import FilterSide from "../../../../components/FilterSide";
import TrainingReminder from "../../../../components/TrainingReminder";

// import "../../../../../styles/beranda.module.css"

const DetailAkademi = () => {
    return (
        <Layout title="Detail Akademi">
            <SubHeaderComponent />

            <div className="my-5 bg-white rounded border">
                <div className="row ">
                    <div className="col-2 py-3 ml-4">
                        <Image 
                            src={`/assets/media/logo-vsga-1.svg`}
                            width={150}
                            height={150}
                        />
                    </div>

                    <div className="col-9">
                        <h3 className="font-weight-bolder mt-5">
                            Vocational School Graduate Academy (VSGA)
                        </h3>
                        <div>
                            Program Vocational School Graduate Academy (VSGA) merupakan program pelatihan dan sertifikasi berbasis kompetensi nasional yang bertujuan untuk mempersiapkan para lulusan lulusan SMK/sederajat serta Diploma 3 dan 4 bidang Sciences, Technology, Engineering, dan Math (STEM) yang belum bekerja atau tidak sedang bekerja agar memiliki kompetensi profesional sesuai dengan perkembangan ilmu pengetahuan dan teknologi di era revolusi industri 4.0 sehingga dapat bersaing baik di...
                        </div>
                        <div className="my-2 text-info font-italic" style={{cursor:"pointer"}}>
                            <Link href="#home"> 
                                <u>
                                    Lihat Selengkapnya
                                </u>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            
            <FilterBar />
            
            

            <div className="row my-5">
                <div className="col-3">
                    <TrainingReminder />
                    <FilterSide />
                </div>

                <div className="col-9 mt-2 d-flex flex-row flex-wrap justify-content-between">
                    <Card   
                        style={{ width: '31rem', height:"26rem", cursor:"pointer"}} 
                        className="m-3 shadow"
                    >   
                        
                        <div className='p-3'>
                            <Card.Img variant="top" src={`/assets/media/image_28.svg`} />
                        </div>

                        <div className="text-right text-success mb-2 mr-5">
                            <Badge bg="light">Open</Badge>
                        </div>
                    
                        <div className="ml-3 p-1" style={{marginTop:"-9vh"}}> 
                            <Image 
                                src={`/assets/media/Logo.svg`}
                                width={50}
                                height={50}
                                className=" rounded-circle"
                            />
                        </div>
                        
                        <Card.Body style={{marginTop:"-4vh"}}>
                            <div className="text-muted">
                                Vocational School Graduate Academy
                            </div>
                            <h3 className="font-weight-bolder">
                                Intermediate Multimedia Designer
                            </h3>

                            <div className="text-info font-weight-bolder mb-5">
                                Gojek
                            </div>

                            <div>
                                <i className="ri-time-line text-dark mr-2"></i>
                                <span>
                                    Registrasi: 05 Juli 2021 - 21 Juli 2021
                                </span>
                            </div>
                            <div>
                                <i className="ri-parent-line text-dark mr-2"></i>
                                <span>
                                    Kuota: 1000 Peserta
                                </span>
                            </div>
                        </Card.Body>

                    </Card>

                    <Card   
                        style={{ width: '31rem', height:"26rem", cursor:"pointer"}} 
                        className="m-3 shadow"
                    >
                        <div className='p-3'>
                            <Card.Img variant="top" src={`/assets/media/image_28.svg`} />
                        </div>

                        <div className="text-right text-success mb-2 mr-5">
                            <Badge bg="light">Open</Badge>
                        </div>
                    
                        <div className="ml-3 p-1" style={{marginTop:"-9vh"}}> 
                            <Image 
                                src={`/assets/media/Logo.svg`}
                                width={50}
                                height={50}
                                className=" rounded-circle"
                            />
                        </div>
                        
                        <Card.Body style={{marginTop:"-4vh"}}>
                            <div className="text-muted">
                                Vocational School Graduate Academy
                            </div>
                            <h3 className="font-weight-bolder">
                                Intermediate Multimedia Designer
                            </h3>

                            <div className="text-info font-weight-bolder mb-5">
                                Gojek
                            </div>

                            <div>
                                <i className="ri-time-line text-dark mr-2"></i>
                                <span>
                                    Registrasi: 05 Juli 2021 - 21 Juli 2021
                                </span>
                            </div>
                            <div>
                                <i className="ri-parent-line text-dark mr-2"></i>
                                <span>
                                    Kuota: 1000 Peserta
                                </span>
                            </div>
                        </Card.Body>

                    </Card>

                    <Card   
                        style={{ width: '31rem', height:"26rem", cursor:"pointer"}} 
                        className="m-3 shadow"
                    >
                        <div className='p-3'>
                            <Card.Img variant="top" src={`/assets/media/image_28.svg`} />
                        </div>

                        <div className="text-right text-success mb-2 mr-5">
                            <Badge bg="light">Open</Badge>
                        </div>
                    
                        <div className="ml-3 p-1" style={{marginTop:"-9vh"}}> 
                            <Image 
                                src={`/assets/media/Logo.svg`}
                                width={50}
                                height={50}
                                className=" rounded-circle"
                            />
                        </div>
                        
                        <Card.Body style={{marginTop:"-4vh"}}>
                            <div className="text-muted">
                                Vocational School Graduate Academy
                            </div>
                            <h3 className="font-weight-bolder">
                                Intermediate Multimedia Designer
                            </h3>

                            <div className="text-info font-weight-bolder mb-5">
                                Gojek
                            </div>

                            <div>
                                <i className="ri-time-line text-dark mr-2"></i>
                                <span>
                                    Registrasi: 05 Juli 2021 - 21 Juli 2021
                                </span>
                            </div>
                            <div>
                                <i className="ri-parent-line text-dark mr-2"></i>
                                <span>
                                    Kuota: 1000 Peserta
                                </span>
                            </div>
                        </Card.Body>

                    </Card>

                    <Card   
                        style={{ width: '31rem', height:"26rem", cursor:"pointer"}} 
                        className="m-3 shadow"
                    >
                        <div className='p-3'>
                            <Card.Img variant="top" src={`/assets/media/image_28.svg`} />
                        </div>

                        <div className="text-right text-success mb-2 mr-5">
                            <Badge bg="light">Open</Badge>
                        </div>
                    
                        <div className="ml-3 p-1" style={{marginTop:"-9vh"}}> 
                            <Image 
                                src={`/assets/media/Logo.svg`}
                                width={50}
                                height={50}
                                className=" rounded-circle"
                            />
                        </div>
                        
                        <Card.Body style={{marginTop:"-4vh"}}>
                            <div className="text-muted">
                                Vocational School Graduate Academy
                            </div>
                            <h3 className="font-weight-bolder">
                                Intermediate Multimedia Designer
                            </h3>

                            <div className="text-info font-weight-bolder mb-5">
                                Gojek
                            </div>

                            <div>
                                <i className="ri-time-line text-dark mr-2"></i>
                                <span>
                                    Registrasi: 05 Juli 2021 - 21 Juli 2021
                                </span>
                            </div>
                            <div>
                                <i className="ri-parent-line text-dark mr-2"></i>
                                <span>
                                    Kuota: 1000 Peserta
                                </span>
                            </div>
                        </Card.Body>

                    </Card>

                    <Card   
                        style={{ width: '31rem', height:"26rem", cursor:"pointer"}} 
                        className="m-3 shadow"
                    >
                        <div className='p-3'>
                            <Card.Img variant="top" src={`/assets/media/image_28.svg`} />
                        </div>

                        <div className="text-right text-success mb-2 mr-5">
                            <Badge bg="light">Open</Badge>
                        </div>
                    
                        <div className="ml-3 p-1" style={{marginTop:"-9vh"}}> 
                            <Image 
                                src={`/assets/media/Logo.svg`}
                                width={50}
                                height={50}
                                className=" rounded-circle"
                            />
                        </div>
                        
                        <Card.Body style={{marginTop:"-4vh"}}>
                            <div className="text-muted">
                                Vocational School Graduate Academy
                            </div>
                            <h3 className="font-weight-bolder">
                                Intermediate Multimedia Designer
                            </h3>

                            <div className="text-info font-weight-bolder mb-5">
                                Gojek
                            </div>

                            <div>
                                <i className="ri-time-line text-dark mr-2"></i>
                                <span>
                                    Registrasi: 05 Juli 2021 - 21 Juli 2021
                                </span>
                            </div>
                            <div>
                                <i className="ri-parent-line text-dark mr-2"></i>
                                <span>
                                    Kuota: 1000 Peserta
                                </span>
                            </div>
                        </Card.Body>

                    </Card>

                    <Card   
                        style={{ width: '31rem', height:"26rem", cursor:"pointer"}} 
                        className="m-3 shadow"
                    >
                        <div className='p-3'>
                            <Card.Img variant="top" src={`/assets/media/image_28.svg`} />
                        </div>

                        <div className="text-right text-success mb-2 mr-5">
                            <Badge bg="light">Open</Badge>
                        </div>
                    
                        <div className="ml-3 p-1" style={{marginTop:"-9vh"}}> 
                            <Image 
                                src={`/assets/media/Logo.svg`}
                                width={50}
                                height={50}
                                className=" rounded-circle"
                            />
                        </div>
                        
                        <Card.Body style={{marginTop:"-4vh"}}>
                            <div className="text-muted">
                                Vocational School Graduate Academy
                            </div>
                            <h3 className="font-weight-bolder">
                                Intermediate Multimedia Designer
                            </h3>

                            <div className="text-info font-weight-bolder mb-5">
                                Gojek
                            </div>

                            <div>
                                <i className="ri-time-line text-dark mr-2"></i>
                                <span>
                                    Registrasi: 05 Juli 2021 - 21 Juli 2021
                                </span>
                            </div>
                            <div>
                                <i className="ri-parent-line text-dark mr-2"></i>
                                <span>
                                    Kuota: 1000 Peserta
                                </span>
                            </div>
                        </Card.Body>

                    </Card>
                    
                </div>
            </div>

            <div className="row my-5 d-flex justify-content-center">
                <div className="table-pagination">
                    <Pagination />
                </div>
            </div>

        </Layout>
    )
}

export default DetailAkademi