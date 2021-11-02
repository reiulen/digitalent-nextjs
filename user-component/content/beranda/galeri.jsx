import React, { useEffect, useState } from "react"
import Link from "next/link";
import Image from "next/image";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const Galeri = () => {
    const dummyCard = [
        {image: `/assets/media/default-card-artikel.png`},
        {image: `/assets/media/image-20.png`},
        {image: `/assets/media/image-21.png`},
        {image: `/assets/media/image-22.png`},
        {image: `/assets/media/image-23.png`},
        {image: `/assets/media/image-25.png`},
        {image: `/assets/media/default-card-artikel.png`},
        {image: `/assets/media/image-20.png`},
        {image: `/assets/media/image-21.png`},
    ]

    return (
        <div>
           {/* BreadCrumb */}
           <div className="row my-5 mx-1 py-3 px-8 bg-white rounded-pill d-flex align-items-center border">
                <span className="text-primary">
                    <Link href="#">
                        Beranda 
                    </Link>
                </span>
                <span>
                    <i className="ri-arrow-right-s-line text-primary"></i> 
                </span>
                <span>
                    {/* Insert BreadCrumb Here */}
                    Galeri
                </span>
            </div>

            {/* Header */}
            <div className="col-12 mt-5">
                <h1 className="fw-700">
                    Galeri Terupdate dan Terkini
                </h1>
                <div className="mt-3">
                    Temukan konten terupdate dan terkini mengenai Digital Talent Scholarship
                </div>
            </div>

            {/* Filter Button */}
            <div className="row my-5">
                <div className="col-12 d-flex justify-content-between flex-row flex-wrap">
                    {/* Selected */}
                    <div 
                        className="d-flex align-items-center rounded-pill bg-primary-dashboard py-1 px-3" 
                        style={{ cursor: "pointer" }}
                    >
                        <div className="my-1 mx-3 py-1 px-3 text-white">
                            Semua
                        </div>
                    </div>

                    {/* UnSelected */}
                    <div 
                        className="d-flex align-items-center rounded-pill bg-white py-1 px-3 border border-muted" 
                        style={{ cursor: "pointer" }}
                    >
                        <div className="my-1 mx-3 py-1 px-3 text-muted">
                            Pengumuman
                        </div>
                    </div>

                    <div 
                        className="d-flex align-items-center rounded-pill bg-white py-1 px-3 border border-muted" 
                        style={{ cursor: "pointer" }}
                    >
                        <div className="my-1 mx-3 py-1 px-3 text-muted">
                            Informasi
                        </div>
                    </div>

                    <div 
                        className="d-flex align-items-center rounded-pill bg-white py-1 px-3 border border-muted" 
                        style={{ cursor: "pointer" }}
                    >
                        <div className="my-1 mx-3 py-1 px-3 text-muted">
                            Press Release
                        </div>
                    </div>

                    <div 
                        className="d-flex align-items-center rounded-pill bg-white py-1 px-3 border border-muted" 
                        style={{ cursor: "pointer" }}
                    >
                        <div className="my-1 mx-3 py-1 px-3 text-muted">
                           Tips And Trick
                        </div>
                    </div>

                </div>
               
            </div>
            {/* End Filter Button */}

            {
                console.log(dummyCard)
            }

            {/* Content */}
            <div className="col-12 d-flex flex-wrap justify-content-between">
                {
                    dummyCard.map ((el, i) => {
                        return (
                            <div key={i} className="position-relative">
                                <Image
                                    src={el.image} 
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                        )
                    })
                }
            </div>
            {/* End of Content */}

            {/* Pagination */}
            <div className="row my-5 d-flex justify-content-center">
                <div className="table-pagination">
                    <Pagination 
                        // activePage = {activePage}
                        activePage = {1}
                        // itemsCountPerPage={pelatihan.perPage}
                        itemsCountPerPage={9}
                        // totalItemsCount={pelatihan.total}
                        totalItemsCount={9}
                        pageRangeDisplayed={3}
                        // onChange={handlePagination}
                        nextPageText={">"}
                        prevPageText={"<"}
                        firstPageText={"<<"}
                        lastPageText={">>"}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>
            </div>
            {/* End of Pagination */}

        </div>
    )
}

export default Galeri