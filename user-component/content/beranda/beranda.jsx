import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

import { 
    Nav, 
    Button,
    Card
} from "react-bootstrap";

import ImagetronCarousel from "../../../components/ImagetronCarousel";
import Footer from "../../../components/templates/footer.component"
import "../../../styles/beranda.module.css"

const Navigationbar = dynamic(() => import("../../../components/templates/navbar.component"), {
    ssr: false,
  });

const Beranda = () => {

    const [activeTab, setActiveTab] = useState ("VSGA")
    const [indexTab, setIndexTab] = useState (0)

    return (
        <div className="bg-white">
            <Navigationbar />

            <ImagetronCarousel />

            <div>
                <Nav justify variant="tabs" defaultActiveKey="#VSGA" >
                    <Nav.Item className="d-flex alignment-items-center" onClick={() => setIndexTab(0)}>
                        <Nav.Link href="#home" eventKey="link-0">
                            <div>
                                <h1 className="font-weight-bolder text-decoration-none text-link-tab">VSGA</h1>
                                <p>
                                    Vocational School Graduate Academy
                                </p>
                                {
                                    indexTab === 0 ?
                                        <Image 
                                            src={`/assets/media/Blue.svg`}
                                            height="5px"
                                            width="200px"
                                        />
                
                                    :
                                        <Image 
                                            src={`/assets/media/BGLine.svg`}
                                            height="5px"
                                            width="200px"
                                        />
                                }
                                
                            </div>
                            
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="d-flex alignment-items-center" onClick={() => setIndexTab(1)}>
                        <Nav.Link href="#home" eventKey="link-1">
                            <div>
                                <h1 className="font-weight-bolder text-link-tab">FGA</h1>
                                <p>
                                    Fresh Graduate Academy
                                </p>
                                {
                                    indexTab === 1 ?
                                        <Image 
                                            src={`/assets/media/Blue.svg`}
                                            height="5px"
                                            width="200px"
                                        />
                
                                    :
                                        <Image 
                                            src={`/assets/media/BGLine.svg`}
                                            height="5px"
                                            width="200px"
                                        />
                                }
                            </div>
                            
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="d-flex alignment-items-center" onClick={() => setIndexTab(2)}>
                        <Nav.Link href="#home" eventKey="link-2">
                            <div>
                                <h1 className="font-weight-bolder text-decoration-none text-link-tab">PRO</h1>
                                <p>
                                    Professional Academy
                                </p>
                                {
                                    indexTab === 2 ?
                                        <Image 
                                            src={`/assets/media/Blue.svg`}
                                            height="5px"
                                            width="200px"
                                        />
                
                                    :
                                        <Image 
                                            src={`/assets/media/BGLine.svg`}
                                            height="5px"
                                            width="200px"
                                        />
                                }
                            </div>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="d-flex alignment-items-center" onClick={() => setIndexTab(3)}>
                        <Nav.Link href="#home" eventKey="link-3">
                            <div>
                                <h1 className="font-weight-bolder text-decoration-none text-link-tab">TA</h1>
                                <p>
                                    Thematic Academy
                                </p>
                                {
                                    indexTab === 3 ?
                                        <Image 
                                            src={`/assets/media/Blue.svg`}
                                            height="5px"
                                            width="200px"
                                        />
                
                                    :
                                        <Image 
                                            src={`/assets/media/BGLine.svg`}
                                            height="5px"
                                            width="200px"
                                        />
                                }
                            </div>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="d-flex alignment-items-center" onClick={() => setIndexTab(4)}>
                        <Nav.Link href="#home" eventKey="link-4">
                            <div>
                                <h1 className="font-weight-bolder text-decoration-none text-link-tab">GTA</h1>
                                <p>
                                    Government Transformation Academy
                                </p>
                                {
                                    indexTab === 4 ?
                                        <Image 
                                            src={`/assets/media/Blue.svg`}
                                            height="5px"
                                            width="200px"
                                        />
                
                                    :
                                        <Image 
                                            src={`/assets/media/BGLine.svg`}
                                            height="5px"
                                            width="200px"
                                        />
                                }
                            </div>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="d-flex alignment-items-center" onClick={() => setIndexTab(5)}>
                        <Nav.Link href="#home" eventKey="link-5">
                            <div>
                                <h1 className="font-weight-bolder text-decoration-none text-link-tab">DEA</h1>
                                <p>
                                    Digital Enterpreneurship Academy
                                </p>
                                {
                                    indexTab === 5 ?
                                        <Image 
                                            src={`/assets/media/Blue.svg`}
                                            height="5px"
                                            width="200px"
                                        />
                
                                    :
                                        <Image 
                                            src={`/assets/media/BGLine.svg`}
                                            height="5px"
                                            width="200px"
                                        />
                                }
                            </div>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="d-flex alignment-items-center" onClick={() => setIndexTab(6)}>
                        <Nav.Link href="#home" eventKey="link-6">
                            <div>
                                <h1 className="font-weight-bolder text-decoration-none text-link-tab">TSA</h1>
                                <p>
                                    Talent Scouting Academy
                                </p>
                                {
                                    indexTab === 6 ?
                                        <Image 
                                            src={`/assets/media/Blue.svg`}
                                            height="5px"
                                            width="200px"
                                        />
                
                                    :
                                        <Image 
                                            src={`/assets/media/BGLine.svg`}
                                            height="5px"
                                            width="200px"
                                        />
                                }
                            </div>
                        </Nav.Link>
                    </Nav.Item>
                   
                </Nav>
            </div>

            <Image 
                src={`/assets/media/tahapan-pendaftaran.svg`}
                width={1500}
                height={580}
            />

            <div className="my-5">
                <h1 className="text-center font-weight-bolder">
                    Rilis Media dan Informasi
                </h1>

                {/* Card */}
                <div className="d-flex justify-content-around mt-5">

                    <Card style={{ width: '30rem' }}>
                        <Card.Img variant="top" src={`/assets/media/image-29.svg`} />

                        <div className="ml-3" style={{marginTop:"-35px"}}> 
                            <Image 
                                src={`/assets/media/VSGA-tag.svg`}
                                width={50}
                                height={25}
                            />
                        </div>
                        
                        <Card.Body>
                            
                            <Card.Text>
                                12 Mei 2021
                            </Card.Text>

                            <Card.Title>
                                Pengumuman Kelulusan Peserta Pelatihan Daring Gelombang 1 Program VSGA DTS 2021
                            </Card.Title>

                            <div className="d-flex justify-content-end">
                                <Link href="#home">
                                    <a className="text-muted d-flex alignment-content-center">
                                        <div className="pt-1"> 
                                            Lihat Detail
                                        </div>
                                        <i className="ri-arrow-right-line text-muted ml-2 "></i>
                                    </a>
                                </Link>
                            </div>
                            

                        </Card.Body>
                    </Card>

                    <Card style={{ width: '30rem' }}>
                        <Card.Img variant="top" src={`/assets/media/image-29.svg`} />

                        <div className="ml-3" style={{marginTop:"-35px"}}> 
                            <Image 
                                src={`/assets/media/VSGA-tag.svg`}
                                width={50}
                                height={25}
                            />
                        </div>

                        <Card.Body>
                            
                            <Card.Text>
                                12 Mei 2021
                            </Card.Text>
                            <Card.Title>
                                Pengumuman Kelulusan Peserta Pelatihan Daring Gelombang 1 Program VSGA DTS 2021
                            </Card.Title>

                            <div className="d-flex justify-content-end">
                                <Link href="#home">
                                    <a className="text-muted d-flex alignment-content-center">
                                        <div className="pt-1"> 
                                            Lihat Detail
                                        </div>
                                        <i className="ri-arrow-right-line text-muted ml-2 "></i>
                                    </a>
                                </Link>
                            </div>

                        </Card.Body>
                    </Card>

                    <Card style={{ width: '30rem' }}>
                        <Card.Img variant="top" src={`/assets/media/image-29.svg`} />

                        <div className="ml-3" style={{marginTop:"-35px"}}> 
                            <Image 
                                src={`/assets/media/VSGA-tag.svg`}
                                width={50}
                                height={25}
                            />
                        </div>
                        
                        <Card.Body>
                            
                            <Card.Text>
                                12 Mei 2021
                            </Card.Text>
                            <Card.Title>
                                Pengumuman Kelulusan Peserta Pelatihan Daring Gelombang 1 Program VSGA DTS 2021
                            </Card.Title>

                            <div className="d-flex justify-content-end">
                                <Link href="#home">
                                    <a className="text-muted d-flex alignment-content-center">
                                        <div className="pt-1"> 
                                            Lihat Detail
                                        </div>
                                        <i className="ri-arrow-right-line text-muted ml-2 "></i>
                                    </a>
                                </Link>
                            </div>

                        </Card.Body>
                    </Card>



                </div>
            </div>

            <Image 
                src={`/assets/media/banner-02.svg`}
                width={1500}
                height={380}
            />
            
            <Footer />

        </div>
    )
}

export default Beranda