import React, { useEffect, useState } from "react"
import Link from "next/link";
import Image from "next/image";

const DetailArtikel = () => {
    return(
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
                    <Link href="/artikel">
                        Artikel
                    </Link>
                </span>
                <span>
                    <i className="ri-arrow-right-s-line text-primary"></i> 
                </span>
                <span>
                    Detail Artikel
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

                    {/* Artikel */}
                    <div className="border rounded mb-5">
                        <div className="row my-5 mx-5">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac sem eget odio pellentesque bibendum. Nam mattis ullamcorper velit vitae rhoncus. Donec convallis nulla eget augue semper, sed vulputate diam eleifend. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean laoreet, arcu sit amet condimentum tincidunt, diam quam convallis felis, eu commodo mi nisl a purus. Nulla facilisi. Nulla sodales lectus sit amet leo euismod, eu consectetur quam sagittis. Nullam non mauris fermentum, suscipit lacus laoreet, gravida sapien. Aliquam a mattis elit. Morbi viverra faucibus posuere. Duis bibendum mauris sit amet dui blandit pulvinar. Morbi id sapien eu ante maximus consequat in at sem.
                            </p>

                            <p>
                                Cras lacinia odio et ipsum laoreet feugiat. Donec ullamcorper augue augue, eget varius nisl iaculis ut. Maecenas sit amet imperdiet nibh, at congue quam. Suspendisse volutpat elementum tortor quis consequat. Aenean nec massa ac ex vestibulum commodo eu sit amet purus. Duis malesuada, eros ut tristique gravida, dui risus aliquet est, sit amet gravida augue risus in arcu. Ut viverra dui urna, sit amet ullamcorper massa condimentum vitae. Donec ac nisl nulla. Ut iaculis faucibus libero, at euismod arcu scelerisque nec. Sed id sagittis dui, id fringilla erat. Proin aliquet facilisis dui, ut bibendum eros dictum id. Nullam vehicula mauris urna, sit amet hendrerit elit finibus eu.
                            </p>

                            <p>
                                Donec ut est finibus, aliquam massa faucibus, suscipit lectus. Aliquam semper, ex eu maximus egestas, ligula magna efficitur libero, quis porttitor lacus leo eu lacus. Phasellus maximus ligula sed libero lobortis, nec tincidunt leo condimentum. Etiam posuere lorem sed vestibulum blandit. Quisque iaculis faucibus quam, et lacinia nibh. Cras eros odio, consectetur id tempor quis, consectetur sed neque. Suspendisse potenti. Vivamus volutpat lacus metus, id blandit nisi pharetra ornare. Donec tincidunt, lorem vulputate rhoncus congue, dui erat posuere ex, sit amet venenatis enim nunc id leo. In libero velit, semper id metus a, ultrices interdum dui. Sed vel ultricies magna. Maecenas maximus tristique ante, at consequat risus pulvinar id. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fringilla, enim in semper lobortis, ligula ipsum varius lectus, in aliquet dolor ex lobortis nisl. Praesent pretium nibh sed odio fermentum, non luctus diam interdum. Praesent placerat vehicula finibus.
                            </p>

                            <p>
                                Curabitur varius nibh vitae facilisis suscipit. Nam vitae faucibus orci. Duis commodo leo ac tortor luctus, non vestibulum mi interdum. Morbi posuere malesuada urna, eget lacinia dui mattis porta. Maecenas eros leo, imperdiet at justo cursus, laoreet accumsan nisi. Nullam tincidunt, nibh quis commodo tincidunt, felis mauris condimentum justo, ut bibendum nisi enim quis metus. Morbi efficitur rutrum diam, ac faucibus metus ullamcorper vel. Phasellus efficitur, magna sed vestibulum mollis, ipsum mi luctus felis, id tempus massa nulla in lectus.
                            </p>

                            <p>
                                Donec at feugiat leo, vel volutpat sem. Curabitur eget efficitur quam. Vivamus ipsum tortor, aliquam et maximus in, ornare nec nibh. Pellentesque sit amet hendrerit dui. Donec erat erat, pulvinar non justo nec, dictum consectetur felis. Aliquam erat volutpat. Phasellus ut ligula dictum, commodo enim ac, congue nibh. Morbi vitae sem tristique, eleifend libero fermentum, molestie sem. Fusce suscipit justo libero, nec laoreet mauris finibus at. Vestibulum laoreet metus id massa faucibus, efficitur malesuada odio volutpat. Nam nulla tellus, finibus id ante eu, imperdiet convallis ex. Sed feugiat vel augue et gravida. Phasellus viverra efficitur lacus non fringilla. Quisque eget porta felis, ac lobortis ante. Suspendisse in vehicula lacus. Pellentesque a nisl nibh.
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
                                    placeholder="    Cari Artikel"
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

export default DetailArtikel