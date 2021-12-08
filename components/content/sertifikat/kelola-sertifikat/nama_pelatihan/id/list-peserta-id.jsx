import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// #Page, Component & Library

import Image from "next/image";
import { useSelector } from "react-redux";
import PageWrapper from "../../../../../wrapper/page.wrapper";
import { clearErrors } from "../../../../../../redux/actions/sertifikat/kelola-sertifikat.action";
import { toPng } from "html-to-image";
import moment from "moment";
import axios from "axios";
// #Icon

export default function ListPesertaID({ token }) {
  const router = useRouter();
  const { query } = router;

  const { error, certificate } = useSelector(
    (state) => state.publishCertificate
  );
  const { participant } = useSelector((state) => state.detailParticipant);

  const [type, setType] = useState(
    certificate?.data?.certificate?.certificate_type
  );

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };
  const divReference = useRef(null);
  const divReferenceSyllabus = useRef(null);

  const convertDivToPng = async (div) => {
    const data = await toPng(div, {
      cacheBust: true,
      canvasWidth: 842,
      canvasHeight: 595,
      backgroundColor: "white",
    });
    return data;
  };

  const handleDownload = async () => {
    const linkChecker = `${process.env.END_POINT_API_SERTIFIKAT}api/tte-p12/sign-pdf/check-pdf/${certificate?.data?.certificate?.training_id}`;
    const check = await axios.get(linkChecker);
    // check udh pernah di sign apa belum?
    if (!check.data.status) {
      const data = await convertDivToPng(divReference.current);
      if (data) {
        const formData = new FormData();
        formData.append("certificate", data);
        const link = `${process.env.END_POINT_API_SERTIFIKAT}api/tte-p12/sign-pdf/${certificate?.data?.pelatihan?.id}`;
        const result = await axios.post(link, formData); //post image certificate yang udah di render dari html
        const a = document.createElement("a");
        a.download = `Sertifikat - p12 ${query.name}.png`;
        a.target = "_blank";
        a.href = `${process.env.END_POINT_API_IMAGE_SERTIFIKAT}certificate/pdf/${result.data.fileName}`;
        a.click();
      }
    } else {
      const a = document.createElement("a");
      a.download = `Sertifikat - p12 ${query.name}.png`;
      a.target = "_blank";
      a.href = `${process.env.END_POINT_API_IMAGE_SERTIFIKAT}certificate/pdf/${certificate?.data?.certificate?.certificate_pdf}`;
      a.click();
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
                href={`/sertifikat/kelola-sertifikat/${query.tema_pelatihan_id}/sertifikat-peserta?id=${query.id_pelatihan}`}
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
                <div className="position-absolute p-6 font-weight-boldest p-10 responsive-normal-font-size zindex-1">
                  {participant?.data?.nomor_registrasi}
                </div>
                <div
                  className={`position-absolute w-100 text-center ${
                    certificate?.data?.certificate?.background
                      ? "responsive-margin-peserta-1"
                      : "responsive-margin-without-background"
                  } zindex-1`}
                >
                  <span className="responsive-font-size-peserta font-weight-bolder">
                    {participant?.data?.nama_peserta}
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
    </PageWrapper>
  );
}
