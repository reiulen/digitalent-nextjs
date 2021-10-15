import React, {
  useState,
  useEffect,
  useRef,
  createRef,
  useCallback,
} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// #Page, Component & Library

import Image from "next/image";
import { useSelector } from "react-redux";
import PageWrapper from "../../../../../wrapper/page.wrapper";
import { toBlob, toJpeg, toPng } from "html-to-image";
import { clearErrors } from "../../../../../../redux/actions/sertifikat/kelola-sertifikat.action";
import DomToImage from "dom-to-image";
import Html2Canvas from "html2canvas";
export default function KelolasertifikatID({ token }) {
  // console.log(token);
  const router = useRouter();
  const { query } = router;

  const { loading, error, certificate } = useSelector(
    state => state.publishCertificate
  );
  const [type, setType] = useState(certificate.data.certificate_type);

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  const divReference = useRef(null);
  const divReferenceSyllabus = useRef(null);

  const convertDivToPng = async div => {
    const data = await toJpeg(div, {
      cacheBust: true,
      canvasWidth: 842,
      canvasHeight: 595,
    });
    return data;
  };

  const handleDownload = async () => {
    const data = await convertDivToPng(divReference.current);
    if (data) {
      const link = document.createElement("a");
      link.href = data;
      link.download = "Sertifikat.png";
      link.click();
    }
  };

  const handleDownloadSyllabus = async () => {
    const dataSyllabus = await convertDivToPng(divReferenceSyllabus.current);
    if (dataSyllabus) {
      const link = document.createElement("a");
      link.href = dataSyllabus;
      link.download = "Syllabus.png";
      link.click();
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
                <div type="text" className="form-control w-100 h-100">
                  {certificate?.data?.certificate?.name || "Nama Sertifikat"}
                </div>
              </div>
            </div>
            <div className="card-toolbar">
              <Link
                href={`/sertifikat/kelola-sertifikat/${query.tema_pelatihan_id}?id=${query.theme_id}`}
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
              <div className="position-relative p-0 d-flex" ref={divReference}>
                <Image
                  src={`${process.env.END_POINT_API_IMAGE_SERTIFIKAT}certificate/images/certificate-images/${certificate.data.certificate_result}`}
                  alt={`image ${certificate.data.certificate_result}`}
                  objectFit="contain"
                  width={842}
                  height={595}
                />
                <div className="position-absolute w-100 text-center responsive-margin-publish">
                  <span className="font-weight-bolder responsive-font-size-peserta">
                    Nama Peserta
                  </span>
                </div>
              </div>
              {/* END COL */}
            </div>
            <div className="row mt-10 mx-0 col-12">
              <button
                onClick={() => handleDownload()}
                className="position-relative col-12 col-md-2 btn bg-blue-secondary text-white rounded-full font-weight-bolder px-10 py-4"
              >
                Unduh
              </button>
            </div>
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
                  className=" position-relative p-0"
                  id="referenceImageSyllabus"
                  ref={divReferenceSyllabus}
                >
                  <Image
                    src={`${process.env.END_POINT_API_IMAGE_SERTIFIKAT}certificate/images/certificate-syllabus-images/${certificate.data.certificate_result_syllabus}`}
                    alt={`${certificate.data}`}
                    objectFit="fill"
                    width={842}
                    height={595}
                  />
                </div>
                {/* END COL */}
              </div>
              <div className="row mt-10 col-12">
                <button
                  onClick={handleDownloadSyllabus}
                  className="position-relative col-12 col-md-2 btn bg-blue-secondary text-white rounded-full font-weight-bolder px-10 py-4"
                  // download
                  // href={`${process.env.END_POINT_API_IMAGE_SERTIFIKAT}certificate/images/certificate-syllabus-images/${certificate.data.certificate_result_syllabus}`}
                >
                  Unduh
                </button>
              </div>
            </div>
            {/* END BODY */}
          </div>
        ) : (
          ""
        )}
      </div>
    </PageWrapper>
  );
}
