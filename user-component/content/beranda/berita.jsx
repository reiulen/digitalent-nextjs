import React, { useEffect, useState } from "react"
import Link from "next/link";
import Image from "next/image";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const Berita = () => {
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
                    Berita
                </span>
            </div>

            {/* Header */}
            <div className="col-12 mt-5">
                <h1 className="fw-700">
                    Ada Apa di Digitalent
                </h1>
                <div className="mt-3">
                    Cerita mitra, berita seru, dan Berita terbaru. Baca semua berita soal Digitalent di sini.
                </div>
            </div>

            {/* Filter Button */}
            <div className="row my-5">
                <div className="col-md-8 col-12 d-flex justify-content-between flex-row flex-wrap">
                    {/* Selected */}
                    <div 
                        className="d-flex align-items-center rounded-pill bg-primary-dashboard py-1 px-3 my-2" 
                        style={{ cursor: "pointer" }}
                    >
                        <div className="my-1 mx-3 py-1 px-3 text-white">
                            Semua
                        </div>
                    </div>

                    {/* UnSelected */}
                    <div 
                        className="d-flex align-items-center rounded-pill bg-white py-1 px-3 border border-muted my-2" 
                        style={{ cursor: "pointer" }}
                    >
                        <div className="my-1 mx-3 py-1 px-3 text-muted">
                            Pengumuman
                        </div>
                    </div>

                    <div 
                        className="d-flex align-items-center rounded-pill bg-white py-1 px-3 border border-muted my-2" 
                        style={{ cursor: "pointer" }}
                    >
                        <div className="my-1 mx-3 py-1 px-3 text-muted">
                            Informasi
                        </div>
                    </div>

                    <div 
                        className="d-flex align-items-center rounded-pill bg-white py-1 px-3 border border-muted my-2" 
                        style={{ cursor: "pointer" }}
                    >
                        <div className="my-1 mx-3 py-1 px-3 text-muted">
                            Press Release
                        </div>
                    </div>

                    <div 
                        className="d-flex align-items-center rounded-pill bg-white py-1 px-3 border border-muted my-2" 
                        style={{ cursor: "pointer" }}
                    >
                        <div className="my-1 mx-3 py-1 px-3 text-muted">
                           Tips And Trick
                        </div>
                    </div>

                </div>
               
            </div>
            {/* End Filter Button */}

            {/* Content */}
            <div className="row">

                {/* Left Side */}
                <div className="col-md-8 col-12">
                    
                    {/* Search Tab */}
                    <form className="mb-3">
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
                    {/* End Search Tab */}

                    {/* Card */}
                    <div className="row my-5 ml-1 flex-column-reverse flex-md-row">
                        <div className="col col-md-7 col-12">
                            <div className="row d-flex justify-content-between align-items-center">
                                <div className="d-flex align-self-center">
                                    <div className="border rounded-circle py-1 px-2">
                                        {/* Insert Logo Image Here */}
                                        <Image
                                            src="/assets/media/logo-default.png" 
                                            width={30}
                                            height={30}
                                            alt="Logo Image"
                                        />
                                    </div>
                                    
                                    <span className="font-weight-bolder ml-2 my-auto">
                                        {/* Insert Admin Here */}
                                        Admin Pokja
                                    </span>
                                </div>

                                <div className="mr-2">
                                    <div className="badge badge-light mr-2">
                                        <div className="text-primary">
                                            {/* Insert Kategori Here */}
                                            Pengumuman
                                        </div>
                                    </div>
                                    <span className="font-weight-bolder">
                                        {/* Insert Akademi Here */}
                                        | SVGA
                                    </span>
                                </div>
                            </div>

                            <div className="row my-5">
                                {/* Insert Title Here */}
                                <Link href={`/artikel/detail/1`}>
                                    <a>
                                        <h1 className="text-dark">
                                            Pengumuman Kelulusan Peserta Pelatihan Daring Gelombang 1 Program VSGA DTS 2...
                                        </h1>
                                    </a>
                                </Link>
                                
                            </div>

                            <div className="row my-5">
                                {/* Insert Desc Here */}
                                <p>
                                    Now I know what you are thinking, “Jase, a million dollars! Come on!”. Hear me out, if you follow these..
                                </p>
                            </div>

                            <div className="row mb-3">
                                {/* Insert Date and View Here */}
                                <span>
                                    Sep 22 | 120 dibaca
                                </span>

                                {/* Insert Tag(s) here */}
                                <span className="row ml-5">
                                    <div className="border px-2 py-1">
                                        #SVGA
                                    </div>
                                    <div className="ml-3 border px-2 py-1">
                                        #Pelatihan
                                    </div>
                                </span>
                            </div>
                        </div>

                        <div className="col col-md-5 col-12 position-relative">
                            {/* Insert Card Image Here */}
                            <Link href={`/artikel/detail/1`}>
                                <a>
                                    <img
                                        src="/assets/media/default-card-artikel.png" 
                                        // layout="fill"
                                        // width={800}
                                        // height={200}
                                        // objectFit="fill"
                                        width="100%"
                                        height="100%"
                                        alt="Card Image"
                                        className="rounded"
                                    />
                                </a>
                            </Link>
                            
                        </div>
                    </div>
                    {/* End of Card */}

                    {/* Card */}
                    <div className="row my-5 ml-1 flex-column-reverse flex-md-row">
                        <div className="col col-md-7 col-12">
                            <div className="row d-flex justify-content-between align-items-center">
                                <div className="d-flex align-self-center">
                                    <div className="border rounded-circle py-1 px-2">
                                        {/* Insert Logo Image Here */}
                                        <Image
                                            src="/assets/media/logo-default.png" 
                                            width={30}
                                            height={30}
                                            alt="Logo Image"
                                        />
                                    </div>
                                    
                                    <span className="font-weight-bolder ml-2 my-auto">
                                        {/* Insert Admin Here */}
                                        Admin Pokja
                                    </span>
                                </div>

                                <div className="mr-2">
                                    <div className="badge badge-light mr-2">
                                        <div className="text-primary">
                                            {/* Insert Kategori Here */}
                                            Pengumuman
                                        </div>
                                    </div>
                                    <span className="font-weight-bolder">
                                        {/* Insert Akademi Here */}
                                        | SVGA
                                    </span>
                                </div>
                            </div>

                            <div className="row my-5">
                                {/* Insert Title Here */}
                                <Link href={`/artikel/detail/1`}>
                                    <a>
                                        <h1 className="text-dark">
                                            Pengumuman Kelulusan Peserta Pelatihan Daring Gelombang 1 Program VSGA DTS 2...
                                        </h1>
                                    </a>
                                </Link>
                                
                            </div>

                            <div className="row my-5">
                                {/* Insert Desc Here */}
                                <p>
                                    Now I know what you are thinking, “Jase, a million dollars! Come on!”. Hear me out, if you follow these..
                                </p>
                            </div>

                            <div className="row mb-3">
                                {/* Insert Date and View Here */}
                                <span>
                                    Sep 22 | 120 dibaca
                                </span>

                                {/* Insert Tag(s) here */}
                                <span className="row ml-5">
                                    <div className="border px-2 py-1">
                                        #SVGA
                                    </div>
                                    <div className="ml-3 border px-2 py-1">
                                        #Pelatihan
                                    </div>
                                </span>
                            </div>
                        </div>

                        <div className="col col-md-5 col-12 position-relative">
                            {/* Insert Card Image Here */}
                            <Link href={`/artikel/detail/1`}>
                                <a>
                                    <img
                                        src="/assets/media/default-card-artikel.png" 
                                        // layout="fill"
                                        // width={800}
                                        // height={200}
                                        // objectFit="fill"
                                        width="100%"
                                        height="100%"
                                        alt="Card Image"
                                        className="rounded"
                                    />
                                </a>
                            </Link>
                            
                        </div>
                    </div>
                    {/* End of Card */}

                    {/* Card */}
                    <div className="row my-5 ml-1 flex-column-reverse flex-md-row">
                        <div className="col col-md-7 col-12">
                            <div className="row d-flex justify-content-between align-items-center">
                                <div className="d-flex align-self-center">
                                    <div className="border rounded-circle py-1 px-2">
                                        {/* Insert Logo Image Here */}
                                        <Image
                                            src="/assets/media/logo-default.png" 
                                            width={30}
                                            height={30}
                                            alt="Logo Image"
                                        />
                                    </div>
                                    
                                    <span className="font-weight-bolder ml-2 my-auto">
                                        {/* Insert Admin Here */}
                                        Admin Pokja
                                    </span>
                                </div>

                                <div className="mr-2">
                                    <div className="badge badge-light mr-2">
                                        <div className="text-primary">
                                            {/* Insert Kategori Here */}
                                            Pengumuman
                                        </div>
                                    </div>
                                    <span className="font-weight-bolder">
                                        {/* Insert Akademi Here */}
                                        | SVGA
                                    </span>
                                </div>
                            </div>

                            <div className="row my-5">
                                {/* Insert Title Here */}
                                <Link href={`/artikel/detail/1`}>
                                    <a>
                                        <h1 className="text-dark">
                                            Pengumuman Kelulusan Peserta Pelatihan Daring Gelombang 1 Program VSGA DTS 2...
                                        </h1>
                                    </a>
                                </Link>
                                
                            </div>

                            <div className="row my-5">
                                {/* Insert Desc Here */}
                                <p>
                                    Now I know what you are thinking, “Jase, a million dollars! Come on!”. Hear me out, if you follow these..
                                </p>
                            </div>

                            <div className="row mb-3">
                                {/* Insert Date and View Here */}
                                <span>
                                    Sep 22 | 120 dibaca
                                </span>

                                {/* Insert Tag(s) here */}
                                <span className="row ml-5">
                                    <div className="border px-2 py-1">
                                        #SVGA
                                    </div>
                                    <div className="ml-3 border px-2 py-1">
                                        #Pelatihan
                                    </div>
                                </span>
                            </div>
                        </div>

                        <div className="col col-md-5 col-12 position-relative">
                            {/* Insert Card Image Here */}
                            <Link href={`/artikel/detail/1`}>
                                <a>
                                    <img
                                        src="/assets/media/default-card-artikel.png" 
                                        // layout="fill"
                                        // width={800}
                                        // height={200}
                                        // objectFit="fill"
                                        width="100%"
                                        height="100%"
                                        alt="Card Image"
                                        className="rounded"
                                    />
                                </a>
                            </Link>
                            
                        </div>
                    </div>
                    {/* End of Card */}

                    {/* Card */}
                    <div className="row my-5 ml-1 flex-column-reverse flex-md-row">
                        <div className="col col-md-7 col-12">
                            <div className="row d-flex justify-content-between align-items-center">
                                <div className="d-flex align-self-center">
                                    <div className="border rounded-circle py-1 px-2">
                                        {/* Insert Logo Image Here */}
                                        <Image
                                            src="/assets/media/logo-default.png" 
                                            width={30}
                                            height={30}
                                            alt="Logo Image"
                                        />
                                    </div>
                                    
                                    <span className="font-weight-bolder ml-2 my-auto">
                                        {/* Insert Admin Here */}
                                        Admin Pokja
                                    </span>
                                </div>

                                <div className="mr-2">
                                    <div className="badge badge-light mr-2">
                                        <div className="text-primary">
                                            {/* Insert Kategori Here */}
                                            Pengumuman
                                        </div>
                                    </div>
                                    <span className="font-weight-bolder">
                                        {/* Insert Akademi Here */}
                                        | SVGA
                                    </span>
                                </div>
                            </div>

                            <div className="row my-5">
                                {/* Insert Title Here */}
                                <Link href={`/artikel/detail/1`}>
                                    <a>
                                        <h1 className="text-dark">
                                            Pengumuman Kelulusan Peserta Pelatihan Daring Gelombang 1 Program VSGA DTS 2...
                                        </h1>
                                    </a>
                                </Link>
                                
                            </div>

                            <div className="row my-5">
                                {/* Insert Desc Here */}
                                <p>
                                    Now I know what you are thinking, “Jase, a million dollars! Come on!”. Hear me out, if you follow these..
                                </p>
                            </div>

                            <div className="row mb-3">
                                {/* Insert Date and View Here */}
                                <span>
                                    Sep 22 | 120 dibaca
                                </span>

                                {/* Insert Tag(s) here */}
                                <span className="row ml-5">
                                    <div className="border px-2 py-1">
                                        #SVGA
                                    </div>
                                    <div className="ml-3 border px-2 py-1">
                                        #Pelatihan
                                    </div>
                                </span>
                            </div>
                        </div>

                        <div className="col col-md-5 col-12 position-relative">
                            {/* Insert Card Image Here */}
                            <Link href={`/artikel/detail/1`}>
                                <a>
                                    <img
                                        src="/assets/media/default-card-artikel.png" 
                                        // layout="fill"
                                        // width={800}
                                        // height={200}
                                        // objectFit="fill"
                                        width="100%"
                                        height="100%"
                                        alt="Card Image"
                                        className="rounded"
                                    />
                                </a>
                            </Link>
                            
                        </div>
                    </div>
                    {/* End of Card */}

                    {/* Card */}
                    <div className="row my-5 ml-1 flex-column-reverse flex-md-row">
                        <div className="col col-md-7 col-12">
                            <div className="row d-flex justify-content-between align-items-center">
                                <div className="d-flex align-self-center">
                                    <div className="border rounded-circle py-1 px-2">
                                        {/* Insert Logo Image Here */}
                                        <Image
                                            src="/assets/media/logo-default.png" 
                                            width={30}
                                            height={30}
                                            alt="Logo Image"
                                        />
                                    </div>
                                    
                                    <span className="font-weight-bolder ml-2 my-auto">
                                        {/* Insert Admin Here */}
                                        Admin Pokja
                                    </span>
                                </div>

                                <div className="mr-2">
                                    <div className="badge badge-light mr-2">
                                        <div className="text-primary">
                                            {/* Insert Kategori Here */}
                                            Pengumuman
                                        </div>
                                    </div>
                                    <span className="font-weight-bolder">
                                        {/* Insert Akademi Here */}
                                        | SVGA
                                    </span>
                                </div>
                            </div>

                            <div className="row my-5">
                                {/* Insert Title Here */}
                                <Link href={`/artikel/detail/1`}>
                                    <a>
                                        <h1 className="text-dark">
                                            Pengumuman Kelulusan Peserta Pelatihan Daring Gelombang 1 Program VSGA DTS 2...
                                        </h1>
                                    </a>
                                </Link>
                                
                            </div>

                            <div className="row my-5">
                                {/* Insert Desc Here */}
                                <p>
                                    Now I know what you are thinking, “Jase, a million dollars! Come on!”. Hear me out, if you follow these..
                                </p>
                            </div>

                            <div className="row mb-3">
                                {/* Insert Date and View Here */}
                                <span>
                                    Sep 22 | 120 dibaca
                                </span>

                                {/* Insert Tag(s) here */}
                                <span className="row ml-5">
                                    <div className="border px-2 py-1">
                                        #SVGA
                                    </div>
                                    <div className="ml-3 border px-2 py-1">
                                        #Pelatihan
                                    </div>
                                </span>
                            </div>
                        </div>

                        <div className="col col-md-5 col-12 position-relative">
                            {/* Insert Card Image Here */}
                            <Link href={`/artikel/detail/1`}>
                                <a>
                                    <img
                                        src="/assets/media/default-card-artikel.png" 
                                        // layout="fill"
                                        // width={800}
                                        // height={200}
                                        // objectFit="fill"
                                        width="100%"
                                        height="100%"
                                        alt="Card Image"
                                        className="rounded"
                                    />
                                </a>
                            </Link>
                            
                        </div>
                    </div>
                    {/* End of Card */}
                    
                </div>
                {/* End of Left Side */}

                {/* Right Side */}
                <div className="col-md-4 col-12">
                    {/* Filter */}
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
                                    Filter
                                </h3>
                            </div>
                        </div>

                        <div className="row ml-3 mt-5">
                            <p>
                                Urutkan Berdasarkan
                            </p>
                        </div>

                        <div className="row mx-3 mb-3 d-flex justify-content-between">
                            <div className="col-md-5 col-12 my-2">
                                <button className="btn btn-outline-light rounded-pill btn-block">
                                    Terbaru
                                </button>
                            </div>

                            <div className="col-md-5 col-12 my-2">
                                <button className="btn btn-outline-light rounded-pill btn-block">
                                    Terlama
                                </button>
                            </div>
                        </div>

                        <div className="row mx-3 mb-3 d-flex justify-content-between">
                            <div className="col-md-5 col-12 my-2">
                                <button className="btn btn-outline-light rounded-pill btn-block">
                                    A-Z
                                </button>
                            </div>

                            <div className="col-md-5 col-12 my-2">
                                <button className="btn btn-outline-light rounded-pill btn-block">
                                    Z-A
                                </button>
                            </div>
                        </div>

                        <div className="row ml-3 mt-5">
                            <p>
                                Akademi
                            </p>
                        </div>

                        <div className="row mx-3 mb-3">
                            <select className="form-control rounded-pill">
                                <option value="" selected hidden>Semua Akademi</option>
                                <option value="SVGA">SVGA</option>
                                <option value="FGA">FGA</option>
                                <option value="PRO">PRO</option>
                                <option value="TA">TA</option>
                            </select>
                        </div>

                        <div className="row mx-3 mb-3">
                            <button className="btn btn-primary-dashboard rounded-pill btn-block">
                                Tampilkan
                            </button>
                        </div>

                    </div>
                    {/* End of Filter */}

                    {/* Tag */}
                    <div className="row mt-5 d-flex flex-column mx-3">
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
            {/* End Content */}

            
            <div className="row my-5 d-flex justify-content-center">
                <div className="table-pagination">
                    <Pagination 
                        // activePage = {activePage}
                        activePage = {1}
                        // itemsCountPerPage={pelatihan.perPage}
                        itemsCountPerPage={6}
                        // totalItemsCount={pelatihan.total}
                        totalItemsCount={6}
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
            
            
        </div>
    )
}

export default Berita