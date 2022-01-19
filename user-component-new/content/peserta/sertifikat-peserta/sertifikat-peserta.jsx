import React, { useState, useEffect, Fragment, useRef } from "react";
import style from "./sertifikat.module.css";
import { useSelector } from "react-redux";
// import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";
import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { toPng } from "html-to-image";
import { SweatAlert } from "../../../../utils/middleware/helper";
import LoadingTable from "../../../../components/LoadingTable";
import Swal from "sweetalert2";
import QRCode from "qrcode.react";
import { useRouter } from "next/router";

export default function RiwayatPelatihanDetail({ session }) {
  const router = useRouter();
  const {
    data: { data },
  } = useSelector((state) => state.sertifikatPeserta);

  const divReference = useRef(null);
  const divReferenceSyllabus = useRef(null);
  const [type, setType] = useState(
    data?.data_sertifikat?.certificate?.certificate_type
  );
  const convertDivToPng = async (div) => {
    const data = await toPng(div, {
      cacheBust: true,
      canvasWidth: 842,
      canvasHeight: 595,
      backgroundColor: "white",
    });
    return data;
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      Swal.fire({
        title: "Mengunduh Sertifikat",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else {
      Swal.hideLoading();
    }
  }, [loading]);

  const config = {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  };

  const handleDownload = async (id, noRegis, nama) => {
    setLoading(true);
    const linkChecker = `${process.env.END_POINT_API_TTEP12}p12/check-pdf?registration_id=${noRegis}`;
    try {
      const check = await axios.get(linkChecker, config);
      if (!check.data.status) {
        const data = await convertDivToPng(divReference.current);
        if (data) {
          try {
            const formData = new FormData();
            formData.append("file", data);
            const link = `${process.env.END_POINT_API_TTEP12}p12/sign-pdf?training_id=${id}&nomor_registrasi=${noRegis}`;
            const result = await axios.post(link, formData, config);
            //post image certificate yang udah di render dari html
            if (!result.data.status) {
              setLoading(false);
              SweatAlert(
                "Gagal",
                "Harap menunggu, Sertifikat masih dalam proses pengesahan",
                "error"
              );
            } else {
              const a = document.createElement("a");
              a.download = `Sertifikat - ${nama} ${noRegis}.png`;
              a.target = "_blank";
              a.href = `${process.env.END_POINT_API_IMAGE_SERTIFIKAT}certificate/pdf/${result.data.fileName}`;
              a.click();
              setLoading(false);
            }
          } catch (e) {
            setLoading(false);
            SweatAlert("Gagal", e.message, "error");
          }
        }
      } else {
        const a = document.createElement("a");
        a.download = `Sertifikat - ${nama} ${noRegis}.png`;
        a.target = "_blank";
        a.href = `${process.env.END_POINT_API_IMAGE_SERTIFIKAT}certificate/pdf/${check.data.fileName}`;
        a.click();
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      SweatAlert("Gagal", e.message, "error");
    }
    // check udh pernah di sign apa belum?
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
                  {data.data_sertifikat.certificate.name || "-"}
                </div>
              </div>
            </div>
            <div className="card-toolbar">
              <a
                className="btn btn-light-ghost-rounded-full px-6 font-weight-bolder px-5 py-3"
                onClick={() => {
                  router.back();
                }}
              >
                Kembali
              </a>
            </div>
          </div>
          {/* END HEADER */}
          {/* START BODY */}

          <div className="card-body border-top">
            <div className="row p-0 justify-content-center">
              {/* START COL */}
              <div
<<<<<<< HEAD
                className={`position-relative p-0 d-flex`}
=======
                className={`position-relative p-0 d-flex justify-content-center list-peserta-window-dimensions`}
>>>>>>> 3c80f1339543dfb371138ebe28b6f69fd4638a13
                id="sertifikat1"
                ref={divReference}
              >
                <div
                  className={
                    data?.data_sertifikat?.certificate?.background
                      ? `position-absolute text-center w-100 responsive-nomor-sertifikat responsive-normal-font-size zindex-1`
                      : `responsive-nomor-sertifikat-without-background position-absolute text-center w-100 responsive-normal-font-size zindex-1`
                  }
                >
                  {data?.data_user?.nomor_sertifikat}
                </div>
                <div
                  className={`position-absolute w-100 text-center ${
                    data?.data_sertifikat?.certificate?.background
                      ? ` responsive-margin-peserta-1`
                      : ` responsive-margin-without-background`
                  } zindex-1`}
                >
                  <span
                    className={`${style.responsive_font_size_peserta} font-weight-bolder`}
                  >
                    {data?.data_user?.nama_peserta}
                  </span>
                </div>
                <div className="position-absolute zindex-2 responsive-qr-code">
                  <QRCode
                    value={`${process.env.ROOT_URL}cek-sertifikat?registrasi=${data?.data_user?.nomor_registrasi}`}
                    // size={80}
                    style={{ height: "60%", width: "60%" }}
                    // className="h-sm-80px w-sm-80px h-lg-100px w-lg-100px w-25px h-25px"
                    level={"L"}
                  />
                </div>
                <Image
                  src={`${process.env.END_POINT_API_IMAGE_SERTIFIKAT}certificate/images/certificate-images/${data?.data_sertifikat?.certificate?.certificate_result}`}
                  alt={`image ${data?.data_sertifikat?.certificate?.certificate_result}`}
                  objectFit="fill"
                  width={842}
                  height={595}
                  key={1}
                />
              </div>
              {/* END COL */}
            </div>
            {type == "1 lembar" && (
              <div className="row mx-0 mt-10 col-12">
                <div
                  onClick={() => {
                    handleDownload(
                      data.data_sertifikat.pelatihan.id,
                      data.data_user.nomor_registrasi,
                      data.data_user.nama_peserta
                    );
                  }}
                  className="position-relative text-center col-12 col-md-2 btn bg-blue-secondary text-white rounded-full font-weight-bolder px-10 py-4"
                >
                  <a>Unduh</a>
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
                    src={`${process.env.END_POINT_API_IMAGE_SERTIFIKAT}certificate/images/certificate-syllabus-images/${data?.data_sertifikat?.certificate?.certificate_result_syllabus}`}
                    alt={`image ${data?.data_sertifikat?.certificate?.certificate_result_syllabus}`}
                    width={842}
                    height={595}
                    objectFit="fill"
                    key={2}
                    id="image2"
                  />
                </div>
                {/* END COL */}
              </div>
              <div className="row mt-10 col-12 p-0 m-0">
                <div
                  onClick={(e) => {
                    handleDownload(
                      data.data_sertifikat.pelatihan.id,
                      data.data_user.nomor_registrasi,
                      data.data_user.nama_peserta
                    );
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
