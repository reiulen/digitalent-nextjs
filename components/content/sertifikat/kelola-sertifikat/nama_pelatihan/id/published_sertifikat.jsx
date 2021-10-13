import React, { useState, useEffect, useRef, createRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
// #Page, Component & Library

import Image from "next/image";
import { useSelector } from "react-redux";
import PageWrapper from "../../../../../wrapper/page.wrapper";
import { clearErrors } from "../../../../../../redux/actions/sertifikat/kelola-sertifikat.action";
import { toPng } from "html-to-image";

// #Icon

export default function KelolasertifikatID({ token }) {
  // console.log(token);
  const router = useRouter();
  const { query } = router;

  const { loading, error, certificate } = useSelector(
    state => state.publishCertificate
  );
  const [type, setType] = useState(certificate.data.certificate_type);
  console.log("INI publish", certificate);

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };
  const divReference = useRef(null);
  const divReferenceSyllabus = useRef(null);

  const handleDownload = () => {
    toPng(divReference.current, {
      canvasWidth: 842,
      canvasHeight: 595,
    })
      .then(image => {
        const link = document.createElement("a");
        link.download = "Sertifikat.png";
        link.href = image;
        link.click();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleDownloadSyllabus = () => {
    toPng(divReferenceSyllabus.current, {
      cacheBust: true,
      canvasWidth: 842,
      canvasHeight: 595,
    })
      .then(image => {
        const link = document.createElement("a");
        link.download = "Sertifikat-Syllabus.png";
        link.href = image;
        link.click();
      })
      .catch(err => {
        console.log(err);
      });
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
                <div type="text" className="form-control w-100 h-100">
                  {certificate?.data?.certificate?.name
                    ? certificate?.data?.certificate?.name
                    : "Nama Sertifikat"}
                </div>
              </div>
            </div>
            <div className="card-toolbar">
              <Link
                href={`/sertifikat/kelola-sertifikat/${query.tema_pelatihan_id}`}
                passHref
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
                className="position-relative p-0 container-fluid"
                style={{ width: "842px", height: "595px" }}
                ref={divReference}
              >
                <Image
                  src={`${process.env.END_POINT_API_IMAGE_SERTIFIKAT}certificate/images/certificate-images/${certificate.data.certificate_result}`}
                  alt={`image ${certificate.data.certificate_result}`}
                  layout="fill"
                  objectFit="fill"
                />
                <div
                  className="position-absolute w-100 text-center  "
                  style={{ marginTop: "135px" }}
                >
                  <span className="font-size-h1 px-5 font-weight-boldest">
                    Nama Peserta
                  </span>
                </div>
              </div>
              {/* END COL */}
            </div>
            <div className="row mt-10 col-12">
              <div className="position-relative col-12 col-md-2 btn bg-blue-secondary text-white rounded-full font-weight-bolder px-10 py-4">
                <a
                  className="text-center"
                  onClick={e => {
                    handleDownload(e);
                  }}
                >
                  Unduh
                </a>
              </div>
            </div>
          </div>
          {/* END BODY */}
        </div>
        {/* START SECTION 2 */}
        {type == "2 lembar" ? (
          <div className="card card-custom card-stretch gutter-b">
            {/* START HEADER */}
            {/* END HEADER */}
            {/* START BODY */}
            <div className="card-body border-top">
              <div className="row p-0 justify-content-center">
                {/* START COL */}
                <div
                  className=" position-relative p-0"
                  style={{ width: "781px", height: "552px" }}
                  ref={divReferenceSyllabus}
                >
                  <Image
                    src={`${process.env.END_POINT_API_IMAGE_SERTIFIKAT}certificate/images/certificate-images/${certificate.data.certificate_result_syllabus}`}
                    alt={`${certificate.data}`}
                    layout="fill"
                    objectFit="fill"
                  />
                  <div
                    className="position-absolute w-100 text-center"
                    style={{ marginTop: "128px" }}
                  >
                    <span
                      className="font-size-h5 px-5 border-2 font-weight-boldest"
                      style={{ borderStyle: "dashed" }}
                    >
                      Nama Peserta
                    </span>
                  </div>
                </div>
                {/* END COL */}
              </div>
              <div className="row mt-10 col-12">
                <div className="position-relative col-12 col-md-2 btn bg-blue-secondary text-white rounded-full font-weight-bolder px-10 py-4">
                  <a
                    onClick={e => {
                      handleDownloadSyllabus(e);
                    }}
                  >
                    Unduh
                  </a>
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
