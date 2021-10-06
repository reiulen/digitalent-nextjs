import React, { useState, useEffect, useRef, createRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

// #Page, Component & Library

import Image from "next/image";
import { useSelector } from "react-redux";
import PageWrapper from "../../../../../wrapper/page.wrapper";
// #Icon

export default function KelolasertifikatID({ token }) {
  // console.log(token);
  const router = useRouter();
  const { query } = router;
  // console.log(router);
  const { loading, error, certificate } = useSelector(
    state => state.singleCertificate
  );
  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  return (
    <PageWrapper>
      {/* error START */}
      {error ? (
        <div
          className="alert alert-custom alert-light-danger fade show mb-5"
          role="alert"
        >
          <div className="alert-icon">
            <i className="flaticon-warning"></i>
          </div>
          <div className="alert-text">{error}</div>
          <div className="alert-close">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={handleResetError}
            >
              <span aria-hidden="true">
                <i className="ki ki-close"></i>
              </span>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* error END */}
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          {/* START HEADER */}
          <div className="card-header border-0 d-flex justify-content-lg-between row my-auto py-10">
            <div className="card-title d-flex">
              <div className="text-dark">Nama Sertifikat :</div>
              <div className="mx-6">
                <div
                  type="text"
                  className="form-control "
                  // placeholder="Masukan Nama Sertifikat"
                  // value={certificate.data.certificate.name}
                >
                  {certificate.data.certificate.name}
                </div>
              </div>
            </div>
          </div>
          {/* END HEADER */}
          {/* START BODY */}
          <div className="card-body border-top">
            <div className="row p-0 justify-content-center">
              {/* START COL */}
              <div
                className="border-primary border col-8 h-500px"
                // style={{ width: "842px" }}
              >
                <div className="p-0">
                  {certificate.data.certificate.background ? (
                    <Image
                      src={`${process.env.END_POINT_API_IMAGE_SERTIFIKAT}certificate/images/background/${certificate.data.certificate.background}`}
                      alt="fitur"
                      // height={495}
                      // width={1400}
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    ""
                  )}
                  <div className="row align-items-center zindex-1">
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
                      <label className="font-weight-boldest display-4 w-100 futura">
                        SERTIFIKAT
                      </label>
                      <div className="w-100">Diberikan kepada</div>
                      <div className="my-2">
                        <span
                          className="mx-2 px-2 font-size-h6 px-10 w-100"
                          // style={{ borderStyle: "dashed" }}
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
                        {certificate?.data?.certificate?.theme?.name}
                      </div>
                      <div className="mt-2 w-100">
                        <span className="w-100">
                          Program{" "}
                          <span className="font-size-h6 font-weight-bold w-100">
                            {certificate?.data?.certificate.academy.name}
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
                          certificate.data.certificate.number_of_signatures < 3
                            ? " justify-content-center m-0 p-0 d-flex w-100"
                            : " justify-content-around  m-0 p-0 d-flex w-100"
                        }
                      >
                        {/* START MAP TTD */}
                        {certificate.data.signature.map((el, i) => {
                          return (
                            <div
                              key={i}
                              style={{
                                transform: `translateX(${el.set_position}%)`,
                                width: "156px",
                                height: "150px",
                              }}
                              className="col-3 p-0"
                            >
                              <div className="col">
                                <div
                                  className="col border-2 align-items-center justify-content-center d-flex position-relative"
                                  style={{
                                    borderStyle: el.signature ? "" : "dashed",
                                    height: "100px",
                                  }}
                                >
                                  {el.signature ? (
                                    <Image
                                      src={`${process.env.END_POINT_API_IMAGE_SERTIFIKAT}certificate/images/signature-certificate-image-syllabus/${el.signature}`}
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
              {/* END COL */}
            </div>
          </div>
          {/* END BODY */}
        </div>
        {/* START SECTION 2 */}
        {certificate.data.certificate.certificate_type == "2 lembar" ? (
          <div className="card card-custom card-stretch gutter-b">
            {/* START BODY */}
            <div className="card-body border-top">
              <div className="row p-0 justify-content-center">
                {/* START COL */}
                <div className="border-primary p-0 border col-8 h-500px">
                  <div className="p-0">
                    {certificate.data.certificate.background_syllabus ? (
                      <Image
                        src={`${process.env.END_POINT_API_IMAGE_SERTIFIKAT}certificate/images/background-syllabus/${certificate.data.certificate.background_syllabus}`}
                        alt="fitur"
                        // height={495}
                        // width={700}
                        layout="fill"
                        objectFit="cover"
                      />
                    ) : (
                      ""
                    )}
                    <div
                      className="row align-items-center m-0"
                      style={{ width: "100%" }}
                    >
                      <div
                        className="pt-19 pl-19 zindex-1 col-10-"
                        style={{ height: "370px" }}
                      >
                        <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                          Silabus yang di dapat
                        </div>
                        <div>
                          <ol className="col mt-4">
                            {certificate.data.certificate.syllabus &&
                              certificate.data.certificate.syllabus.map(
                                (e, i) => {
                                  return (
                                    <li
                                      className="p-0"
                                      key={i}
                                      style={{
                                        fontSize:
                                          certificate.data.certificate.syllabus
                                            .length <= 5
                                            ? "16px"
                                            : certificate.data.certificate
                                                .syllabus.length <= 10
                                            ? "12px"
                                            : certificate.data.certificate
                                                .syllabus.length <= 15
                                            ? "10px"
                                            : "6px",
                                      }}
                                    >
                                      {e}
                                    </li>
                                  );
                                }
                              )}
                          </ol>
                        </div>
                      </div>
                      <div
                        className="col-12 text-center font-weight-normal p-0 justify-content-center"
                        style={{
                          marginTop: "-20px",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <div
                          className={
                            certificate.data.certificate
                              .number_of_signature_syllabus < 3
                              ? " justify-content-center m-0 p-0 d-flex w-100"
                              : " justify-content-around  m-0 p-0 d-flex w-100"
                          }
                        >
                          {/* START MAP TTD */}
                          {certificate.data.signature_syllabu.map((el, i) => {
                            return (
                              <div
                                key={i}
                                style={{
                                  transform: `translateX(${el.set_position}%)`,
                                  width: "156px",
                                  height: "150px",
                                }}
                                className="col-3 p-0"
                              >
                                <div className="col">
                                  <div
                                    className="col border-2 align-items-center justify-content-center d-flex position-relative"
                                    style={{
                                      borderStyle: el.signature ? "" : "dashed",
                                      height: "100px",
                                    }}
                                  >
                                    {el.signature ? (
                                      <Image
                                        src={`${process.env.END_POINT_API_IMAGE_SERTIFIKAT}certificate/images/signature-certificate-images/${el.signature}`}
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

                {/* END COL */}
                {/* START FORM Jenis Sertifikat */}
              </div>
            </div>
            {/* END BODY */}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </PageWrapper>
  );
}
