import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import moment from "moment";
import imageLogo from "../../../../public/assets/media/logo-default.png";
import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";

const Preview = () => {
  const detailArtikelsPeserta = useSelector(
    (state) => state.detailArtikelsPeserta
  );

  const dispatch = useDispatch();
  const router = useRouter();
  const [resultText, setResultText] = useState(null);

  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  const [windowDimensions, setWindowDimensions] = useState({});

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    setWindowDimensions(getWindowDimensions());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {}, [windowDimensions]);

  return (
    <>
      <PesertaWrapper
        fluid
        className="px-md-20 px-10 pb-10"
        title="Pratinjau Artikel - Publikasi"
      >
        <div className="card card-custom card-stretch gutter-b px-10 py-8">
          {/* Header */}
          {detailArtikelsPeserta ? (
            <div className="row my-5 flex-column">
              <div className="ml-2">
                <div
                  className="badge badge-light mr-2"
                  style={{ fontSize: "12px" }}
                >
                  <div className="text-primary">
                    {detailArtikelsPeserta.artikel.data.nama_kategori.toUpperCase()}
                  </div>
                </div>
              </div>
              <div className="mt-5 ml-3">
                <h1
                  className=""
                  style={{ fontSize: "40px", fontWeight: "700" }}
                >
                  {/* Insert Title Here */}
                  {detailArtikelsPeserta.artikel.data.judul_artikel}
                </h1>
              </div>

              <div className="mt-5 ml-3 d-flex flex-row align-items-center">
                <span className="font-weight-bolder">
                  {/* Insert Akademi Here */}
                  {detailArtikelsPeserta.artikel.data.kategori_akademi}
                </span>
                <span className="mr-1 ml-6">
                  <i className="ri-eye-line"></i>
                </span>
                <span className="text-muted">
                  {/* Insert Views Here */}
                  Dibaca {detailArtikelsPeserta.artikel.data.dibaca}
                </span>
              </div>

              <div className="mt-5 ml-5 d-flex flex-row align-items-center justify-content-between mx-3">
                <div className="row">
                  <div className="ml-2">
                    {/* Insert Logo Image Here */}
                    {detailArtikelsPeserta.artikel.data.role[0].name !==
                      "Peserta" || typeof artikel.role !== "string" ? (
                      <Image
                        src={imageLogo}
                        width={40}
                        height={40}
                        alt="Logo Image"
                        className="border rounded-circle"
                      />
                    ) : (
                      <Image
                        src={
                          process.env.END_POINT_API_IMAGE_PUBLIKASI +
                          "publikasi/images/" +
                          artikel.foto
                        }
                        width={40}
                        height={40}
                        alt="Logo Image"
                        className="border rounded-circle"
                      />
                    )}
                  </div>
                  <div className="d-flex flex-column ml-3">
                    <div className="font-weight-bolder mb-2">
                      {/* Insert Admin Here */}
                      {detailArtikelsPeserta.artikel.data.role}
                    </div>
                    <div className="text-muted">
                      {moment(
                        detailArtikelsPeserta.artikel.data.tanggal_publish
                      ).format("DD MMMM YYYY")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {/* End of Header */}

          {/* Content */}
          {detailArtikelsPeserta ? (
            <div className="row mt-10">
              {/* Left Side */}
              <div className="col-12 col-md-12 col-lg-12">
                {/* Image */}
                <Image
                  src={
                    process.env.END_POINT_API_IMAGE_PUBLIKASI +
                    "publikasi/images/" +
                    detailArtikelsPeserta.artikel.data.gambar
                  }
                  width="1500vw"
                  height="1000vh"
                  objectFit="fill"
                  alt="Detail Image"
                  className="rounded-lg"
                />

                {/* Artikel */}
                <div className="border rounded-lg mb-5 mt-15">
                  <div
                    className="my-5 mx-5 text-justify"
                    style={{ width: "96%" }}
                  >
                    {resultText ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: resultText }}
                      ></div>
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            detailArtikelsPeserta.artikel.data.isi_artikel,
                        }}
                      />
                    )}
                  </div>

                  <div className="row m-3 d-flex justify-content-between pb-5">
                    <div className="row d-flex justify-content-between ml-3">
                      {detailArtikelsPeserta &&
                      detailArtikelsPeserta.artikel.data.tag &&
                      detailArtikelsPeserta.artikel.data.tag.length !== 0
                        ? detailArtikelsPeserta.artikel.data.tag.map(
                            (el, i) => {
                              return (
                                <div
                                  className="mr-3 border p-3 rounded"
                                  style={{ fontSize: "11px" }}
                                  key={i}
                                >
                                  #{el.toUpperCase()}
                                </div>
                              );
                            }
                          )
                        : null}
                    </div>
                  </div>
                </div>
              </div>
              {/* End of Left Side */}
            </div>
          ) : (
            <div className="row d-flex justify-content-center my-5">
              <h1 className="font-weight-bolder">Artikel Tidak Tersedia</h1>
            </div>
          )}
        </div>
      </PesertaWrapper>
    </>
  );
};

export default Preview;
