import React, {
  useState,
  useEffect,
  useRef,
  createRef,
  useCallback,
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

  console.log(query);
  const [type, setType] = useState(certificate.data.certificate_type);

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };
  const divReference = useRef(null);

  // const handleDownload = () => {
  //   // console.log(divReference.current);
  //   const node = document.getElementById("IMAGE1");
  //   console.log("ini node", node);
  //   toJpeg(node, {
  //     cacheBust: true,
  //     canvasWidth: 842,
  //     canvasHeight: 595,
  //     // height: 595,
  //     // width: 842,
  //   })
  //     .then(image => {
  //       let img = new Image();
  //       // img.src = image;
  //       console.log("INI IMG", img);
  //       // const result = document.body.appendChild(img);
  //       // console.log("INI RESULT", result);
  //       // const link = document.createElement("a");
  //       // link.append();
  //       // link.download = "my-image-name.png";
  //       // link.href = image;
  //       // link.click();
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  const handleDownload = useCallback(() => {
    if (divReference.current === null) {
      return;
    }
    toPng(divReference.current, {
      // cacheBust: true,
      canvasHeight: 595,
      canvasWidth: 842,
    })
      .then(dataUrl => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch(err => {
        console.log(err);
      });
  }, [divReference]);

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
                  {certificate?.data?.certificate?.name || "Nama sertifikat"}
                </div>
              </div>
            </div>
            <div className="card-toolbar">
              <Link passHref href="/kelola/">
                <a className="btn btn-light-ghost-rounded-full px-6 font-weight-bolder px-5 py-3">
                  Kembali
                </a>
              </Link>
            </div>
          </div>
          {/* END HEADER */}
          {/* START BODY */}
          <div className="card-body border-top">
            <div className="d-flex p-0 justify-content-center">
              {/* START COL */}
              <div
                className="position-relative p-0 d-flex"
                // style={{ width: "44vw", height: "63vh" }}
                ref={divReference}
                id="IMAGE1"
              >
                <Image
                  src={`${process.env.END_POINT_API_IMAGE_SERTIFIKAT}certificate/images/certificate-images/${certificate?.data?.certificate_result}`}
                  alt={"image"}
                  // layout="fill"
                  objectFit="fill"
                  width={842}
                  height={595}
                />
                <div
                  className="position-absolute w-100 text-center"
                  style={{ marginTop: "128px" }}
                >
                  <span className="font-size-h3">{query.id}</span>
                </div>
              </div>
              {/* END COL */}
            </div>
            <div className="row mt-10 col-12">
              <div className="position-relative">
                <label>
                  <div className="mr-5">
                    <a
                      onClick={e => {
                        handleDownload(e);
                      }}
                      className="btn bg-blue-secondary text-white rounded-full font-weight-bolder px-10 py-4"
                    >
                      Unduh
                    </a>
                  </div>
                </label>
              </div>
            </div>
          </div>
          {/* END BODY */}
        </div>
        {/* START SECTION 2 */}
        {type == "2 lembar" ? (
          <div className="card card-custom card-stretch gutter-b">
            {/* START BODY */}
            <div className="card-body border-top">
              <div className="row p-0 justify-content-center">
                {/* START COL */}
                <div className="p-0 col-12 h-500px">
                  <div className="p-0">
                    <Image
                      src={`${process.env.END_POINT_API_IMAGE_SERTIFIKAT}certificate/images/certificate-syllabus-images/${certificate?.data?.certificate_result_syllabus}`}
                      alt="fitur"
                      // height={495}
                      // width={700}
                      layout="fill"
                      objectFit="contain"
                    />
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

// {/* <div className="card-body border-top">
//             <div className="row p-0 justify-content-center">
//               {/* START COL */}
//               <div
//                 className="border-primary col-12 h-500px "
//                 // style={{ width: "842px" }}
//               >
//                 <div className="p-0 position-relative h-100">
//                   <Image
// src={`${process.env.END_POINT_API_IMAGE_SERTIFIKAT}certificate/images/certificate-images/${certificate.data}`}
// alt={`${certificate.data}`}
//                     // height={495}
//                     // width={1400}
//                     layout="fill"
//                     objectFit="contain"
//                   />
//                   <div
//                     className="position-absolute"
//                     style={{ left: "450px", top: "23%", borderStyle: "dash" }}
//                   >
//                     <span className="px-2 font-size-h6 px-10 w-100">
//                       {query.id}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               {/* END COL */}
//             </div>
//             <div className="row mt-10 col-12">
//               <div className="position-relative">
//                 <label>
//                   <div className="mr-5">
//                     <a
//                       onClick={() => {}}
//                       className="btn bg-blue-secondary text-white rounded-full font-weight-bolder px-10 py-4"
//                     >
//                       Unduh
//                     </a>
//                   </div>
//                 </label>
//               </div>
//             </div>
//           </div> */}
