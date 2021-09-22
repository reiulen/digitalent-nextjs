// #Next & React
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// #Page, Component & Library
import PageWrapper from "../../../../wrapper/page.wrapper";
import Image from "next/image";
// #Icon

export default function TambahMasterSertifikat() {
    const [signature, setSignature] = useState(1);
    const router = useRouter();

    const handleLimit = () => {
        console.log("");
    };

    const handleSearch = () => {
        console.log("");
    };

    // #DatePicker
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const resetValueSort = () => {
        setStartDate(null);
        setEndDate(null);
    };
    // #DatePicker

    const [limit, setLimit] = useState(null);

    const loading = false;
    let { page = 1, keyword, success } = router.query;

    return (
        <PageWrapper>
            {/* error START */}
            {/* error END */}
            <div className="col-lg-12 order-1 px-0">
                <div className="card card-custom card-stretch gutter-b">
                    {/* START HEADER */}
                    <div className="card-header border-0 d-flex justify-content-lg-between row my-auto py-10 ">
                        <div className="card-title d-flex">
                            <div className="text-dark">Nama Sertifikat :</div>
                            <div className="mx-6">
                                <input
                                    type="text"
                                    className="form-control w-400px"
                                    placeholder="Masukan Nama Sertifikat"
                                    // onChange={e => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="card-toolbar">
                            <Link href="/sertifikat/master-sertifikat/tambah">
                                <a
                                    className="text-primary px-6 font-weight-bolder px-5 py-3 mx-5"
                                    onClick={() => {
                                        console.log("klik batal");
                                    }}
                                >
                                    Batal
                                </a>
                            </Link>
                            <Link href="/sertifikat/master-sertifikat/tambah">
                                <a
                                    className="btn btn-primary-rounded-full px-6 font-weight-bolder px-6 py-3"
                                    onClick={() => {
                                        console.log("klik simpan");
                                    }}
                                >
                                    Simpan
                                </a>
                            </Link>
                        </div>
                    </div>
                    {/* END HEADER */}
                    {/* <div className="border-bottom border-primary border border-2"></div> */}
                    {/* START BODY */}
                    <div className="card-body border-top">
                        <div className="row">
                            {/* START COL */}
                            <div className="border-primary border col-8 h-500px">
                                <div className="h-full w-full">
                                    {/* <Image
                                        src="https://dts-sertifikat-dev.s3.ap-southeast-1.amazonaws.com/certificate/images/certificate-images/2d08970e-7c1a-483a-ae55-ce19e6b8d36f.jpg"
                                        alt="fitur"
                                        // height={495}
                                        // width={700}
                                        layout="fill"
                                        objectFit="fill"
                                    /> */}
                                    <div className="d-flex row align-items-center">
                                        <div className="position-relative col-4">
                                            <input
                                                type="text"
                                                className="border border-danger px-10 m-6  text-center"
                                                placeholder="Nomor Sertifikat"
                                            />
                                        </div>
                                        <div className="col-12 text-center">
                                            <div>SERTIFIKAT</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* END COL */}
                        </div>
                    </div>
                    {/* END BODY */}
                </div>
            </div>
        </PageWrapper>
    );
}
// {/* <div className="d-flex justify-content-start">
// <div className="flex-column mx-auto text-center">
//     <div>
//         <div className="d-flex display-4 justify-content-center font-weight-bold mt-10">
//             SERTIFIKAT
//         </div>
//         <div className="font-weight-bold">
//             Diberikan kepada
//         </div>
//     </div>
//     <div className="border border-danger px-10">
//         Nama Peserta
//     </div>
//     <div>
//         <div className="font-weight-bold">
//             Atas Partisipasi Sebagai
//         </div>
//         <div className="font-weight-bold">
//             PESERTA
//         </div>
//         <div className="font-weight-bold">
//             Nama Pelatihan
//         </div>
//         <div className="row">
//             Program
//             <div className="border border-danger mx-2 px-2">
//                 Akademi
//             </div>
//             Selama
//             <div className="border border-danger mx-2 px-2">
//                 Waktu Pelatihan
//             </div>
//         </div>
//         <div>
//             Digital Talent
//             Scholarship
//             <div className="border border-danger">
//                 Tahun
//             </div>
//         </div>
//         <div className="border border-danger mx-5">
//             Jakarta, DD,MM,YYYY
//         </div>
//     </div>
//     <div className="mx-auto my-auto border border-danger px-10">
//         Nama Sertifikat
//     </div>
//     <div className="row">
//         <div>ttd</div>
//         <div>ttd</div>
//         <div>ttd</div>
//         <div>ttd</div>
//     </div>
// </div>
// </div> */}
