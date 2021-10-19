import React, {
  useState,
  useEffect,
  useRef,
  createRef,
  useCallback,
  Fragment,
} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
// #Page, Component & Library

import Image from "next/image";
import { useSelector } from "react-redux";
import PageWrapper from "../../../../../wrapper/page.wrapper";
import { clearErrors } from "../../../../../../redux/actions/sertifikat/kelola-sertifikat.action";
import { toPng, toJpeg } from "html-to-image";
import html2canvas from "html2canvas";
// #Icon

export default function ListPesertaID({ token }) {
  // console.log(token);
  const router = useRouter();
  const { query } = router;

  const { loading, error, certificate } = useSelector(
    state => state.publishCertificate
  );
  const {
    loading: loadingParticipant,
    error: errorParticipant,
    participant,
  } = useSelector(state => state.detailParticipant);

  console.log(certificate);
  console.log(participant);
  const [type, setType] = useState(
    certificate.data.certificate.certificate_type
  );
  const [currentUser, setCurrentUser] = useState([]);
  useEffect(() => {
    const data = participant.data.list_certificate.filter(
      el => el.name == query.name
    );
    setCurrentUser(data);
  }, [participant, query.name]);

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };
  const divReference = useRef(null);
  const divReferenceSyllabus = useRef(null);

  const convertDivToPng = async div => {
    const data = await toPng(div, {
      cacheBust: true,
      canvasWidth: 842,
      canvasHeight: 595,
    });
    return data;
  };

  const handleDownload = async () => {
    // const data = await convertDivToPng(divReference.current);
    const data = await convertDivToPng(divReference.current);
    if (data) {
      console.log(data);
      const link = document.createElement("a");
      link.download = `Sertifikat - ${query.name}.png`;
      link.href = data;
      link.click();
      // router.reload();
    }
    if (type == "2 lembar") {
      const image = document.getElementById("image2").getAttribute("src");
      const link = document.createElement("a");
      link.href = image;
      link.download = "tes 123";
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
                  <div className="position-absolute p-6 font-weight-boldest responsive-font-size-peserta zindex-1">
                    {currentUser[0]?.registration_number}
                  </div>
                  <div className="position-absolute responsive-date-from font-weight-boldest zindex-1 responsive-date-text">
                    {currentUser[0]?.date_from.split("-").reverse().join("-")} -{" "}
                    {currentUser[0]?.date_to.split("-").reverse().join("-")}
                  </div>
                  <div className="position-absolute responsive-year font-weight-boldest zindex-1 responsive-date-text">
                    {currentUser[0]?.year}
                  </div>
                  <Image
                    src={`${process.env.END_POINT_API_IMAGE_SERTIFIKAT}certificate/images/certificate-images/${certificate.data.certificate.certificate_result}`}
                    alt={`image ${certificate.data.certificate.certificate_result}`}
                    objectFit="fill"
                    // layout="fill"
                    width={842}
                    height={595}
                    key={certificate.data.certificate.certificate_result}
                  />
                  <div
                    className={`position-absolute w-100 text-center responsive-margin-publish`}
                  >
                    <span className="responsive-font-size-peserta font-weight-bolder">
                      {query.name}
                    </span>
                  </div>
                </div>
              </div>
              {/* END COL */}
            </div>
            {type == "1 lembar" && (
              <div className="row mx-0 mt-10 col-12">
                <div className="position-relative text-center col-12 col-md-2 btn bg-blue-secondary text-white rounded-full font-weight-bolder px-10 py-4">
                  <a
                    onClick={e => {
                      handleDownload(e);
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
                    alt={`image ${certificate.data.certificate.certificate_result_syllabus}`}
                    width={842}
                    height={595}
                    objectFit="fill"
                    key={
                      certificate.data.certificate.certificate_result_syllabus
                    }
                    id="image2"
                  />
                </div>
                {/* END COL */}
              </div>
              <div className="row mt-10 col-12 p-0 m-0">
                <div
                  onClick={e => {
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
