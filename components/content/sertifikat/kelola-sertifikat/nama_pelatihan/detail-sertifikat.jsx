import React, { useState, useEffect, useRef, createRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

// #Page, Component & Library
import PageWrapper from "../../../../wrapper/page.wrapper";
import Image from "next/image";
import { useSelector } from "react-redux";
// #Icon

export default function KelolasertifikatID({ token }) {
  // console.log(token);
  const router = useRouter();
  const { query } = router;
  // console.log(router);
  const { loading, error, participant } = useSelector(
    state => state.detailParticipant
  );

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
              <Link href={`/sertifikat/kelola-sertifikat/${query.akademi}`}>
                <a className="btn btn-white-ghost-rounded-full rounded-pill mr-2 btn-lg">
                  Kembali
                </a>
              </Link>
            </div>
          </div>
          {/* END HEADER */}
          {/* START BODY */}
          <div className="card-body border-top">
            <div className="row p-0">
              {/* START COL */}
              <div
                className="border-primary border col-8 h-500px"
                // style={{ width: "842px" }}
              >
                <div className="p-0">
                  {participant.data.certificate.background ? (
                    <Image
                      // src={`https://dts-sertifikat-dev.s3.ap-southeast-1.amazonaws.com/certificate/images/background/${participant.data.certificate.background}`}
                      src={`https://dts-partnership-dev.s3.ap-southeast-1.amazonaws.com/certificate/images/background/${participant.data.certificate.background}`}
                      // src={`${process.env.END_POINT_API_IMAGE_SERTIFIKAT}/certificate/images/background/${participant.data.certificate.background}`}
                      // https://dts-partnership-dev.s3.ap-southeast-1.amazonaws.com/certificate/images/background/936567ef-8698-45bc-90f7-96d2c27c34a1.jpeg
                      alt="Background Image"
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    ""
                  )}
                  <div className="row align-items-center">
                    <div className="position-relative">
                      <input
                        type="text"
                        className="m-6 text-center"
                        placeholder="Nomor Sertifikat"
                        style={{
                          borderStyle: "dashed",
                        }}
                      />
                    </div>
                    <div
                      className="col-12 text-center font-weight-normal p-0 justify-content-center"
                      style={{ marginTop: "-20px", width: "100%" }}
                    >
                      <label className="font-weight-boldest display-4 w-100">
                        SERTIFIKAT
                      </label>
                      <div className="w-100">Diberikan kepada</div>
                      <div className="my-2">
                        <span
                          className="mx-2 px-2 border-2 font-size-h6 px-10 w-100"
                          style={{ borderStyle: "dashed" }}
                        >
                          Nama Peserta
                        </span>
                      </div>
                      <div className="w-100">Atas Partisipasi sebagai</div>
                      <div className="font-weight-normal font-size-h2 w-100">
                        Peserta
                      </div>
                      <div className="w-100">Nama Pelatihan</div>
                      <div
                        className="text-center font-weight-bolder border-2 w-100"
                        style={{
                          fontSize: "20px",
                          textAlign: "center",
                          // fontWeight: "bold",
                        }}
                      >
                        {/* {participant.data.theme_id} */}
                      </div>
                      <div className="mt-2 w-100">
                        <span className="w-100">
                          Program{" "}
                          <span className="font-size-h6 font-weight-bold w-100">
                            {/* {certificate.data.list_certificate[0].academy.name} */}
                          </span>{" "}
                          Selama
                        </span>
                        <span
                          className="mx-2 px-2 border-2 w-100"
                          style={{ borderStyle: "dashed" }}
                        >
                          Waktu Pelatihan
                        </span>
                      </div>
                      <div className="mt-2 w-100">
                        <span>Digital Talent Scholarship</span>
                        <span
                          className="mx-2 px-2 border-2"
                          style={{ borderStyle: "dashed" }}
                        >
                          Tahun
                        </span>
                      </div>
                      <div className="my-4 w-100 text-center">
                        <span
                          className="mx-2 px-2 border-2"
                          style={{ borderStyle: "dashed" }}
                        >
                          Jakarta, DD/MM/YYYY
                        </span>
                      </div>
                      <div
                        className={
                          participant.data.signature.length < 3
                            ? " justify-content-center m-0 p-0 d-flex w-100"
                            : " justify-content-around  m-0 p-0 d-flex w-100"
                        }
                      >
                        {/* START MAP TTD */}
                        {participant &&
                          participant.data.signature.map((el, i) => {
                            return (
                              <div
                                key={i}
                                style={{
                                  // transform: `translateX(${tandaTanganSlider[i]}%)`,
                                  // left: `${tandaTanganSlider[i]}px`,
                                  width: "156px",
                                  height: "150px",
                                }}
                                className="col-3 p-0"
                              >
                                <div className="col">
                                  <div
                                    className="col border-2 align-items-center justify-content-center d-flex position-relative"
                                    style={{
                                      borderStyle: el?.signature
                                        ? ""
                                        : "dashed",
                                      height: "100px",
                                    }}
                                  >
                                    {el?.signature ? (
                                      <Image
                                        src={`https://dts-partnership-dev.s3.ap-southeast-1.amazonaws.com/certificate/images/signature-certificate-images/${el.signature}`}
                                        layout="fill"
                                        alt={`Tanda tangan ${i + 1} `}
                                      />
                                    ) : (
                                      "TTD"
                                    )}
                                  </div>
                                  <div
                                    className="border-2 text-center w-100"
                                    style={{
                                      borderStyle: el.name ? "" : "dashed",
                                    }}
                                    //   placeholder="Nama Lengkap"
                                  >
                                    {el.name ? (
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: el.name,
                                        }}
                                        className="my-auto m-0 p-0 test"
                                        style={{ margin: "0px" }}
                                      ></div>
                                    ) : (
                                      "Nama"
                                    )}
                                  </div>
                                  <div
                                    className="border-2 text-center w-100"
                                    style={{
                                      borderStyle: el.position ? "" : "dashed",
                                    }}
                                  >
                                    {el.position ? (
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: el.position,
                                        }}
                                        className="my-auto m-0 p-0"
                                        style={{ margin: "0px" }}
                                      ></div>
                                    ) : (
                                      "Jabatan"
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* END BODY */}
        </div>
      </div>
    </PageWrapper>
  );
}
