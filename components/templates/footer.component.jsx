import React from 'react'
import Image from 'next/image'

const Footer = () => {
    return (
        // <>
        //     {/* // <!--begin::Footer--> */}
        //     <div className="footer bg-primary py-4 d-flex flex-lg-column" id="kt_footer">
        //         {/* // <!--begin::Container--> */}
        //         <div
        //             className="container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between">
        //             {/* // <!--begin::Copyright--> */}
        //             <div className="text-dark order-2 order-md-1">
        //                 {/* <span className="text-muted font-weight-bold mr-2">2021©</span> */}
        //                 <a href="https://dendyjuliano.github.io" rel='noreferrer' target="_blank"
        //                     className="text-dark-75 text-hover-primary">Dendy</a>
        //             </div>
        //             {/* // <!--end::Copyright--> */}

        //         </div>
        //         {/* // <!--end::Container--> */}
        //     </div>
        //     {/* // <!--end::Footer--> */}
        // </>
        <>
            <div className="bg-primary-shade navbar-fixed-bottom">
                <div className="card card-custom card-stretch gutter-b bg-primary-shade">
                    <div className="card-header border-bottom border-gray">
                        <div className="col-lg-4 col-xxl-4 py-4 text-center">
                            <Image src="/assets/icon/new/icon-dts-1.svg" width={120} height={50} alt="logo-1"/>
                            <h2 className="text-white">
                                Digitalent Scholarship
                            </h2>
                        </div>
                        <div className="col-lg-6 col-xxl-6 d-flex align-items-center">
                            <div className="text-white text-justify">
                                Program Digital Talent Scholarship bertujuan untuk meningkatkan keterampilan dan daya saing, produktivitas, profesionalisme SDM bidang teknologi informasi dan komunikasi bagi angkatan kerja muda Indonesia, masyarakat umum, dan aparatur sipil negara.
                            </div>
                        </div>
                        <div className="col-lg-1 col-xxl-1">

                        </div>
                    </div>
                    <div className="card-body text-white d-flex flex-row">
                        <div className="col-lg-4 col-xxl-4">
                            <h3>
                                Alamat
                            </h3>
                            <div>
                                Kementerian Komunikasi dan Informatika RI 
                            </div>
                            <div>
                                Jl. Medan Merdeka Barat No. 9
                            </div>
                            <div>
                                Jakarta Pusat, 10110
                            </div>
                        </div>
                        <div className="col-lg-4 col-xxl-4 mx-3">
                            <h3>
                                Link Eksternal
                            </h3>
                            <div className="mb-3">
                                Kementerian Kominfo
                            </div>
                            <div className="mb-3">
                                Badan Litbang SDM Kominfo
                            </div>
                            <div className="mb-3">
                                Pusbang Poserti
                            </div>

                        </div>
                        <div className="col-lg-4 col-xxl-4">
                            <h3>
                                Sosial Media
                            </h3>
                            <div className="mb-3 d-flex align-items-center">
                                <Image src="/assets/icon/facebook-white.svg" width={20} height={20} alt="facebook-logo"/>
                                <span className="ml-2"> 
                                    Digital Talent Scholarship
                                </span>
                            </div>
                            <div className="mb-3 d-flex align-items-center">
                                <Image src="/assets/icon/twitter-white.svg" width={20} height={20} alt="facebook-logo"/>
                                <span className="ml-2"> 
                                    @DTS_kominfo 
                                </span>
                            </div>
                            <div className="mb-3 d-flex align-items-center">
                                <Image src="/assets/icon/instagram-white.svg" width={20} height={20} alt="facebook-logo"/>
                                <span className="ml-2"> 
                                    @digitalent.kominfo
                                </span>
                            </div>
                            <div className="d-flex align-items-center">
                                <Image src="/assets/icon/youtube-white.svg" width={20} height={20} alt="facebook-logo"/>
                                <span className="ml-2"> 
                                    Digitalent Media
                                </span>
                            </div>

                        </div>
                    </div>
                    <div className="card-footer border-top border-gray text-white">
                        <div className='text-center'>
                            Copyright © 2021 | Kementerian Komunikasi dan Informatika.
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer