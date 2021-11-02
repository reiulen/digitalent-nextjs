import React, { useEffect, useState } from "react"
import Link from "next/link";
import Image from "next/image";

const DetailBerita = () => {
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
                <span className="text-primary">
                    <Link href="/berita">
                        Berita
                    </Link>
                </span>
                <span>
                    <i className="ri-arrow-right-s-line text-primary"></i> 
                </span>
                <span>
                    Detail Berita
                </span>
            </div>

            {/* Header */}
            <div className="row my-5 d-flex flex-column ml-3">
                <div className="badge badge-light mr-2 col-1">
                    <div className="text-primary">
                        {/* Insert Kategori Here */}
                        Pengumuman
                    </div>
                </div>
                <div className="mt-5">
                    <h1 className="font-weight-bolder">
                        {/* Insert Title Here */}
                        Pengumuman Kelulusan Peserta Pelatihan Daring Gelombang 1 Program VSGA DTS 2021
                    </h1>
                </div>

                <div className="mt-5 d-flex flex-row align-items-center">
                    <span className="font-weight-bolder">
                        {/* Insert Akademi Here */}
                        SVGA
                    </span>
                    <span className="mr-1 ml-3">
                        <i className="ri-eye-line"></i> 
                    </span>
                    <span className="text-muted">
                        {/* Insert Views Here */}
                        Dibaca 120
                    </span>
                </div>

                <div className="mt-5 d-flex flex-row align-items-center justify-content-between">
                    <div className="row">
                        <div className="border rounded-circle py-1 px-2">
                            {/* Insert Logo Image Here */}
                            <Image
                                src="/assets/media/logo-default.png" 
                                width={30}
                                height={30}
                                alt="Logo Image"
                            />
                        </div>
                        <div className="d-flex flex-column ml-3">
                            <div className="font-weight-bolder">
                                {/* Insert Admin Here */}
                                Admin Pokja
                            </div>
                            <div className="text-muted">
                                22 September 2021
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <button className="btn btn-outline-light rounded-circle mr-3">
                            <i className="ri-share-line p-0"></i>
                        </button>
                        
                        <button className="btn btn-outline-light rounded-circle mr-3">
                            <i className="ri-heart-line p-0"></i>
                        </button>
                    </div>
                </div>
            </div>
            {/* End of Header */}

            {/* Content */}
            <div className="row">

                {/* Left Side */}
                <div className="col-12 col-md-8">
                    {/* Image */}
                    <Image
                        src="/assets/media/default-detail-image.png"
                        width="1500vw"
                        height="1000vh" 
                        // layout="fill"
                        objectFit="cover"
                        alt="Detail Image"
                        className="rounded"
                    />

                    {/* Berita */}
                    <div className="border rounded mb-5">
                        <div className="row my-5 mx-5">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac sem eget odio pellentesque bibendum. Nam mattis ullamcorper velit vitae rhoncus. Donec convallis nulla eget augue semper, sed vulputate diam eleifend. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean laoreet, arcu sit amet condimentum tincidunt, diam quam convallis felis, eu commodo mi nisl a purus. Nulla facilisi. Nulla sodales lectus sit amet leo euismod, eu consectetur quam sagittis. Nullam non mauris fermentum, suscipit lacus laoreet, gravida sapien. Aliquam a mattis elit. Morbi viverra faucibus posuere. Duis bibendum mauris sit amet dui blandit pulvinar. Morbi id sapien eu ante maximus consequat in at sem.
                            </p>
                        </div>

                        <div className="row m-3 d-flex justify-content-between">
                            <div className="row d-flex justify-content-between ml-3">
                                <div className="border p-3 rounded">
                                    #SVGA
                                </div>
                                <div className="ml-3 border p-3 rounded">
                                    #Pelatihan
                                </div>
                                <div className="ml-3 border p-3 rounded">
                                    #Java
                                </div>
                                <div className="ml-3 border p-3 rounded">
                                    #Linux
                                </div>
                            </div>

                            <div className="row">
                                <button className="btn btn-outline-light rounded-circle mr-3">
                                    <i className="ri-share-line p-0"></i>
                                </button>
                                
                                <button className="btn btn-outline-light rounded-circle mr-3">
                                    <i className="ri-heart-line p-0"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End of Left Side */}

                {/* Right Side */}
                <div className="col-12 col-md-4">

                    {/* Search */}
                    <div className="border rounded">
                        <div className="row mt-5 "> 
                            <div className="col-2 my-auto ml-3">
                                <Image 
                                    src={`/assets/media/logo-filter.svg`}
                                    width={40}
                                    height={40}
                                    alt="Logo filter"
                                />
                            </div>
                            <div className="col-9 my-auto">
                                <h3 className=" font-weight-bolder">
                                    Pencarian
                                </h3>
                            </div>
                        </div>

                        <form className="mb-3 mx-3">
                            <div className="input-group">
                                <i className="ri-search-line position-absolute my-5 ml-3" style={{zIndex:"10"}} ></i>

                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="    Cari Berita"
                                    style={{borderTopLeftRadius:"150px", borderBottomLeftRadius:"150px"}}
                                />
                
                                <div>
                                    <button 
                                        className="btn btn-primary-dashboard" 
                                        style={{borderTopRightRadius:"150px", borderBottomRightRadius:"150px"}}
                                    >
                                        Cari
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>

                    {/* Tag */}
                    <div className="row mt-5 d-flex flex-column mx-2">
                        <h3 className="font-weight-bolder"> 
                            Temukan Lebih Banyak Berita Yang Sesuai:
                        </h3>
                        <div className=" d-flex flex-wrap justify-content-around flex-row">
                            <div className="border px-2 py-1 rounded my-3 mr-3">
                                #SVGA
                            </div>
                            <div className="border px-2 py-1 rounded my-3 mr-3">
                                #PELATIHAN
                            </div>
                            <div className="border px-2 py-1 rounded my-3 mr-3">
                                #UIUXDESIGNER
                            </div>
                            <div className="border px-2 py-1 rounded my-3 mr-3">
                                #JAVA
                            </div>
                            <div className="border px-2 py-1 rounded my-3 mr-3">
                                #C++
                            </div>
                            <div className="border px-2 py-1 rounded my-3 mr-3">
                                #LINUX
                            </div>
                            <div className="border px-2 py-1 rounded my-3 mr-3">
                                #IOS
                            </div>
                        </div>
                    </div>
                </div>
                {/* End of Right Side */}
            </div>
            {/* End of Content */}
        </div>
    )
}

export default DetailBerita