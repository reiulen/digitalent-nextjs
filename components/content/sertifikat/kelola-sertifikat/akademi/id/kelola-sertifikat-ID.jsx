import React, { useState, useEffect, useRef, createRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

// #Page, Component & Library
import PageWrapper from "../../../../../wrapper/page.wrapper";
import Image from "next/image";
// #Icon

export default function kelolasertifikatID() {
    const router = useRouter();
    const { query } = router;
    // console.log(router);
    return (
        <PageWrapper>
            {/* error START */}
            {/* error END */}
            <div className="col-lg-12 order-1 px-0">
                <div className="card card-custom card-stretch gutter-b">
                    {/* START HEADER */}
                    <div className="card-header border-0 d-flex justify-content-lg-between row my-auto py-10 ">
                        <div className="card-title d-flex">
                            <div className="text-dark">Sertifikat A</div>
                        </div>
                        <div className="card-toolbar">
                            <Link
                                href={`/sertifikat/kelola-sertifikat/${query.akademi}`}
                            >
                                <a
                                    className="text-primary px-6 font-weight-bolder px-5 py-3 mx-5"
                                    onClick={() => {
                                        console.log("klik batal");
                                    }}
                                >
                                    Kembali
                                </a>
                            </Link>
                            <Link
                                href={`/sertifikat/master-sertifikat/${query.akademi}/${query.id}/edit`}
                            >
                                <a
                                    className="btn btn-primary-rounded-full px-6 font-weight-bolder px-6 py-3"
                                    onClick={() => {
                                        console.log("klik simpan");
                                    }}
                                >
                                    Ubah
                                </a>
                            </Link>
                        </div>
                    </div>
                    {/* END HEADER */}
                    {/* START BODY */}
                    <div className="card-body border-top">
                        <div
                            className="position-relative "
                            style={{ height: "600px" }}
                        >
                            <Image
                                src={
                                    "https://dts-sertifikat-dev.s3.ap-southeast-1.amazonaws.com/certificate/images/certificate-images/2d08970e-7c1a-483a-ae55-ce19e6b8d36f.jpg"
                                }
                                alt="fitur"
                                // height={495}
                                // width={700}
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                    </div>
                    {/* END BODY */}
                </div>

                {/* MODAL TANDA TANGAN */}
            </div>
        </PageWrapper>
    );
}
