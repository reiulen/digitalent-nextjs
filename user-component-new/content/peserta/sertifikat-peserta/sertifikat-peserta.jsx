import React, { useState, useEffect, Fragment } from "react";
import { Card, Col, Row, Badge, Button, Modal } from "react-bootstrap";
import style from "./sertifikat.module.css";
import { useSelector } from "react-redux";
// import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";
import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";
import axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";
import Image from "next/image";

export default function RiwayatPelatihanDetail(props) {
  const query = {
    tema: "test",
    name: "sandikha galih",
  };

  const divReference = null;

  const participant = {
    data: {
      tahun: "2010",
    },
  };

  const type = "1 lembar";

  const certificate = {
    data: {
      certificate: {
        id: 1,
        academy_id: 41,
        theme_id: 45,
        training_id: 106,
        name: "64ew",
        certificate_type: "1 lembar",
        number_of_signatures: 1,
        background: "2b3aa540-b1ab-409b-9ffc-28e5cc87665b.jpeg",
        certificate_result: "7c5d6507-ec10-43f3-aceb-41e1c6e21027.png",
        number_of_signature_syllabus: 1,
        background_syllabus: null,
        certificate_result_syllabus: null,
        syllabus: null,
        status_migrate_id: 1,
        created_by_id: 12,
        created_at: "2021-11-26T08:48:29.000000Z",
        updated_at: "2021-11-27T05:49:47.000000Z",
        certificate_pdf: "78da402e-3bc6-41cb-8e2d-86bd9c955b87.pdf",
      },
    },
  };

  return (
    <PesertaWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          {/* START HEADER */}
          <div className="card-header border-0 d-flex justify-content-lg-between row my-auto py-10">
            <div className="card-title d-flex ">
              <div className="text-dark ">Nama Sertifikat :</div>
              <div className="mx-6">
                <div type="text" className="form-control w-100 h-100">
                  {certificate?.data?.certificate?.name || "Nama sertifikat"}
                </div>
              </div>
            </div>
            <div className="card-toolbar">
              <Link
                passHref
                href={`/sertifikat/kelola-sertifikat/${query.tema_pelatihan_id}/sertifikat-peserta?id=${query.id}`}
              >
                <a className="btn btn-light-ghost-rounded-full px-6 font-weight-bolder px-5 py-3">
                  Kembali
                </a>
              </Link>
            </div>
          </div>
          {/* END HEADER */}
          {/* START BODY */}
          <div className="card-body border-top">
            <div className="row p-0 justify-content-center">
              {/* START COL */}
              <div
                className={`position-relative p-0 d-flex`}
                id="sertifikat1"
                ref={divReference}
              >
                <div className="position-relative">
                  <div className="position-absolute p-6 font-weight-boldest p-10 responsive-normal-font-size zindex-1">
                    {participant?.data?.nomor_registrasi}
                  </div>
                  <div
                    className={`position-absolute ${
                      certificate?.data?.certificate.background
                        ? `${style.responsive_date_from}`
                        : "responsive-date-from-without-background"
                    } font-weight-boldest zindex-1 responsive-date-text`}
                  >
                    {moment(participant?.data?.pelatihan_mulai).format(
                      "DD/MM/YY"
                    )}{" "}
                    -{" "}
                    {moment(participant?.data?.pelatihan_selesai).format(
                      "DD/MM/YY"
                    )}
                  </div>
                  <div
                    className={`position-absolute ${
                      certificate?.data?.certificate?.background
                        ? `${style.responsive_year}`
                        : `${style.responsive_year_without_background}`
                    } font-weight-boldest zindex-1 responsive-date-text`}
                  >
                    {participant?.data?.tahun}
                  </div>
                  <div
                    className={`position-absolute w-100 text-center ${
                      certificate?.data?.certificate?.background
                        ? `${style.responsive_margin_peserta_1}`
                        : `${style.responsive_margin_without_background}`
                    } zindex-1`}
                  >
                    <span
                      className={`${style.responsive_font_size_peserta} font-weight-bolder`}
                    >
                      {query.name}
                    </span>
                  </div>
                  <Image
                    src={`${process.env.END_POINT_API_IMAGE_SERTIFIKAT}certificate/images/certificate-images/${certificate.data.certificate.certificate_result}`}
                    alt={`image ${certificate.data.certificate.certificate_result}`}
                    objectFit="fill"
                    width={842}
                    height={595}
                    key={certificate?.data?.certificate?.certificate_result}
                  />
                </div>
              </div>
              {/* END COL */}
            </div>
            {type == "1 lembar" && (
              <div className="row mx-0 mt-10 col-12">
                <div className="position-relative text-center col-12 col-md-2 btn bg-blue-secondary text-white rounded-full font-weight-bolder px-10 py-4">
                  <a
                    onClick={() => {
                      handleDownload();
                    }}
                  >
                    Unduh
                  </a>
                </div>
              </div>
            )}
          </div>
          {/* END BODY */}
        </div>
        {/* START SECTION 2 */}
        {type == "2 lembar" ? (
          <div className="card card-custom card-stretch gutter-b">
            <div className="card-body border-top">
              <div className="row p-0 justify-content-center">
                {/* START COL */}
                <div
                  className="p-0 position-relative"
                  ref={divReferenceSyllabus}
                >
                  <Image
                    src={`${process.env.END_POINT_API_IMAGE_SERTIFIKAT}certificate/images/certificate-syllabus-images/${certificate.data.certificate.certificate_result_syllabus}`}
                    alt={`image ${certificate?.data?.certificate?.certificate_result_syllabus}`}
                    width={842}
                    height={595}
                    objectFit="fill"
                    key={
                      certificate?.data?.certificate
                        ?.certificate_result_syllabus
                    }
                    id="image2"
                  />
                </div>
                {/* END COL */}
              </div>
              <div className="row mt-10 col-12 p-0 m-0">
                <div
                  onClick={(e) => {
                    handleDownload();
                  }}
                  className="position-relative col-12 col-md-2 btn bg-blue-secondary text-white rounded-full font-weight-bolder px-10 py-4"
                >
                  <a>Unduh</a>
                </div>
              </div>
            </div>
            {/* END BODY */}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </PesertaWrapper>
  );
}
