import React from "react"
import Link from "next/link";
import Image from "next/image";

import { 
    Card,
} from "react-bootstrap";

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

            <div className="my-5 bg-white rounded ">
                <div className="row ">
                    <div className="col-2 py-3 ml-4">
                        <Image 
                            src={`/assets/media/logo-vsga.svg`}
                            width={150}
                            height={150}
                        />
                    </div>

                    <div className="col-8">
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
            
            

            <div className="row">
                <div className="col-3">
                    <TrainingReminder />
                    <FilterSide />
                </div>

                <div className="col-9 mt-2 d-flex flex-row flex-wrap justify-content-between">
                    <Card   
                        style={{ width: '31rem', height:"28rem", cursor:"pointer"}} 
                        className="m-3"
                    >
                        <div className='p-3'>
                            <Card.Img variant="top" src={`/assets/media/image_28.svg`} />
                        </div>

                        <div className="text-right text-muted mb-2 mr-2">
                            05 Juli 2021 - 31 Juli 2021
                        </div>
                    
                        <div className="ml-3 p-1" style={{marginTop:"-60px"}}> 
                            <Image 
                                src={`/assets/media/Frame_6523.svg`}
                                width={50}
                                height={50}
                            />
                        </div>
                        
                        <Card.Body>
                            <Card.Title>
                                Intermediate Multimedia Designer
                            </Card.Title>

                            <div className="text-muted mb-2">
                                Gojek
                            </div>

                            <div className="row" id="tag-view">
                                <div className="col-2 text-left d-flex flex-row">
                                    <button className="btn btn-light rounded" style={{marginLeft:"-10px"}}>
                                        <div className="text-success">
                                            Open
                                        </div>
                                    </button>
                                </div>
                                
                                <div className="col-6 text-right d-flex flex-row">
                                    <button className="btn btn-light rounded ml-5 d-flex flex-row">
                                        <i className="ri-parent-line mr-2 text-info"></i>
                                        <span className="text-gray">
                                            1000
                                        </span>
                                    </button>

                                    <button className="btn btn-light rounded ml-1 d-flex flex-row">
                                        <i className="ri-heart-line mr-2 text-info"></i>
                                        <span className="text-gray">
                                            Wishlist
                                        </span>
                                    </button>

                                    <button className="btn btn-light rounded ml-1 d-flex flex-row">
                                        <i className="ri-share-fill mr-2 text-info"></i>
                                        <span className="text-gray">
                                            Share
                                        </span>
                                    </button>
                                </div>

                            </div>

                            

                        </Card.Body>

                    </Card>

                    <Card   
                        style={{ width: '31rem', height:"28rem", cursor:"pointer"}} 
                        className="m-3"
                    >
                        <div className='p-3'>
                            <Card.Img variant="top" src={`/assets/media/image_28.svg`} />
                        </div>

                        <div className="text-right text-muted mb-2 mr-2">
                            05 Juli 2021 - 31 Juli 2021
                        </div>
                    
                        <div className="ml-3 p-1" style={{marginTop:"-60px"}}> 
                            <Image 
                                src={`/assets/media/Frame_6523.svg`}
                                width={50}
                                height={50}
                            />
                        </div>
                        
                        <Card.Body>
                            <Card.Title>
                                Intermediate Multimedia Designer
                            </Card.Title>

                            <div className="text-muted mb-2">
                                Gojek
                            </div>

                            <div className="row" id="tag-view">
                                <div className="col-2 text-left d-flex flex-row">
                                    <button className="btn btn-light rounded" style={{marginLeft:"-10px"}}>
                                        <div className="text-success">
                                            Open
                                        </div>
                                    </button>
                                </div>
                                
                                <div className="col-6 text-right d-flex flex-row">
                                    <button className="btn btn-light rounded ml-5 d-flex flex-row">
                                        <i className="ri-parent-line mr-2 text-info"></i>
                                        <span className="text-gray">
                                            1000
                                        </span>
                                    </button>

                                    <button className="btn btn-light rounded ml-1 d-flex flex-row">
                                        <i className="ri-heart-line mr-2 text-info"></i>
                                        <span className="text-gray">
                                            Wishlist
                                        </span>
                                    </button>

                                    <button className="btn btn-light rounded ml-1 d-flex flex-row">
                                        <i className="ri-share-fill mr-2 text-info"></i>
                                        <span className="text-gray">
                                            Share
                                        </span>
                                    </button>
                                </div>

                            </div>

                            

                        </Card.Body>

                    </Card>

                    <Card   
                        style={{ width: '31rem', height:"28rem", cursor:"pointer"}} 
                        className="m-3"
                    >
                        <div className='p-3'>
                            <Card.Img variant="top" src={`/assets/media/image_28.svg`} />
                        </div>

                        <div className="text-right text-muted mb-2 mr-2">
                            05 Juli 2021 - 31 Juli 2021
                        </div>
                    
                        <div className="ml-3 p-1" style={{marginTop:"-60px"}}> 
                            <Image 
                                src={`/assets/media/Frame_6523.svg`}
                                width={50}
                                height={50}
                            />
                        </div>
                        
                        <Card.Body>
                            <Card.Title>
                                Intermediate Multimedia Designer
                            </Card.Title>

                            <div className="text-muted mb-2">
                                Gojek
                            </div>

                            <div className="row" id="tag-view">
                                <div className="col-2 text-left d-flex flex-row">
                                    <button className="btn btn-light rounded" style={{marginLeft:"-10px"}}>
                                        <div className="text-success">
                                            Open
                                        </div>
                                    </button>
                                </div>
                                
                                <div className="col-6 text-right d-flex flex-row">
                                    <button className="btn btn-light rounded ml-5 d-flex flex-row">
                                        <i className="ri-parent-line mr-2 text-info"></i>
                                        <span className="text-gray">
                                            1000
                                        </span>
                                    </button>

                                    <button className="btn btn-light rounded ml-1 d-flex flex-row">
                                        <i className="ri-heart-line mr-2 text-info"></i>
                                        <span className="text-gray">
                                            Wishlist
                                        </span>
                                    </button>

                                    <button className="btn btn-light rounded ml-1 d-flex flex-row">
                                        <i className="ri-share-fill mr-2 text-info"></i>
                                        <span className="text-gray">
                                            Share
                                        </span>
                                    </button>
                                </div>

                            </div>

                            

                        </Card.Body>

                    </Card>

                    <Card   
                        style={{ width: '31rem', height:"28rem", cursor:"pointer"}} 
                        className="m-3"
                    >
                        <div className='p-3'>
                            <Card.Img variant="top" src={`/assets/media/image_28.svg`} />
                        </div>

                        <div className="text-right text-muted mb-2 mr-2">
                            05 Juli 2021 - 31 Juli 2021
                        </div>
                    
                        <div className="ml-3 p-1" style={{marginTop:"-60px"}}> 
                            <Image 
                                src={`/assets/media/Frame_6523.svg`}
                                width={50}
                                height={50}
                            />
                        </div>
                        
                        <Card.Body>
                            <Card.Title>
                                Intermediate Multimedia Designer
                            </Card.Title>

                            <div className="text-muted mb-2">
                                Gojek
                            </div>

                            <div className="row" id="tag-view">
                                <div className="col-2 text-left d-flex flex-row">
                                    <button className="btn btn-light rounded" style={{marginLeft:"-10px"}}>
                                        <div className="text-success">
                                            Open
                                        </div>
                                    </button>
                                </div>
                                
                                <div className="col-6 text-right d-flex flex-row">
                                    <button className="btn btn-light rounded ml-5 d-flex flex-row">
                                        <i className="ri-parent-line mr-2 text-info"></i>
                                        <span className="text-gray">
                                            1000
                                        </span>
                                    </button>

                                    <button className="btn btn-light rounded ml-1 d-flex flex-row">
                                        <i className="ri-heart-line mr-2 text-info"></i>
                                        <span className="text-gray">
                                            Wishlist
                                        </span>
                                    </button>

                                    <button className="btn btn-light rounded ml-1 d-flex flex-row">
                                        <i className="ri-share-fill mr-2 text-info"></i>
                                        <span className="text-gray">
                                            Share
                                        </span>
                                    </button>
                                </div>

                            </div>

                            

                        </Card.Body>

                    </Card>

                    <Card   
                        style={{ width: '31rem', height:"28rem", cursor:"pointer"}} 
                        className="m-3"
                    >
                        <div className='p-3'>
                            <Card.Img variant="top" src={`/assets/media/image_28.svg`} />
                        </div>

                        <div className="text-right text-muted mb-2 mr-2">
                            05 Juli 2021 - 31 Juli 2021
                        </div>
                    
                        <div className="ml-3 p-1" style={{marginTop:"-60px"}}> 
                            <Image 
                                src={`/assets/media/Frame_6523.svg`}
                                width={50}
                                height={50}
                            />
                        </div>
                        
                        <Card.Body>
                            <Card.Title>
                                Intermediate Multimedia Designer
                            </Card.Title>

                            <div className="text-muted mb-2">
                                Gojek
                            </div>

                            <div className="row" id="tag-view">
                                <div className="col-2 text-left d-flex flex-row">
                                    <button className="btn btn-light rounded" style={{marginLeft:"-10px"}}>
                                        <div className="text-success">
                                            Open
                                        </div>
                                    </button>
                                </div>
                                
                                <div className="col-6 text-right d-flex flex-row">
                                    <button className="btn btn-light rounded ml-5 d-flex flex-row">
                                        <i className="ri-parent-line mr-2 text-info"></i>
                                        <span className="text-gray">
                                            1000
                                        </span>
                                    </button>

                                    <button className="btn btn-light rounded ml-1 d-flex flex-row">
                                        <i className="ri-heart-line mr-2 text-info"></i>
                                        <span className="text-gray">
                                            Wishlist
                                        </span>
                                    </button>

                                    <button className="btn btn-light rounded ml-1 d-flex flex-row">
                                        <i className="ri-share-fill mr-2 text-info"></i>
                                        <span className="text-gray">
                                            Share
                                        </span>
                                    </button>
                                </div>

                            </div>

                            

                        </Card.Body>

                    </Card>

                    <Card   
                        style={{ width: '31rem', height:"28rem", cursor:"pointer"}} 
                        className="m-3"
                    >
                        <div className='p-3'>
                            <Card.Img variant="top" src={`/assets/media/image_28.svg`} />
                        </div>

                        <div className="text-right text-muted mb-2 mr-2">
                            05 Juli 2021 - 31 Juli 2021
                        </div>
                    
                        <div className="ml-3 p-1" style={{marginTop:"-60px"}}> 
                            <Image 
                                src={`/assets/media/Frame_6523.svg`}
                                width={50}
                                height={50}
                            />
                        </div>
                        
                        <Card.Body>
                            <Card.Title>
                                Intermediate Multimedia Designer
                            </Card.Title>

                            <div className="text-muted mb-2">
                                Gojek
                            </div>

                            <div className="row" id="tag-view">
                                <div className="col-2 text-left d-flex flex-row">
                                    <button className="btn btn-light rounded" style={{marginLeft:"-10px"}}>
                                        <div className="text-success">
                                            Open
                                        </div>
                                    </button>
                                </div>
                                
                                <div className="col-6 text-right d-flex flex-row">
                                    <button className="btn btn-light rounded ml-5 d-flex flex-row">
                                        <i className="ri-parent-line mr-2 text-info"></i>
                                        <span className="text-gray">
                                            1000
                                        </span>
                                    </button>

                                    <button className="btn btn-light rounded ml-1 d-flex flex-row">
                                        <i className="ri-heart-line mr-2 text-info"></i>
                                        <span className="text-gray">
                                            Wishlist
                                        </span>
                                    </button>

                                    <button className="btn btn-light rounded ml-1 d-flex flex-row">
                                        <i className="ri-share-fill mr-2 text-info"></i>
                                        <span className="text-gray">
                                            Share
                                        </span>
                                    </button>
                                </div>

                            </div>

                            

                        </Card.Body>

                    </Card>

                    

                    
                    
                    

                    

                    

                    
                </div>
            </div>

        </Layout>
    )
}

export default DetailAkademi