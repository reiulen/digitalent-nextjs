import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import moment from "moment";

import { Container } from "react-bootstrap";
import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";

const Preview = () => {
  useEffect(() => {}, []);

  const { artikel } = useSelector((state) => state.detailArtikel);

  const [judul_artikel, setJudulArtikel] = useState(artikel.judul_artikel);
  const [jenis_kategori, setJenisKategori] = useState(artikel.jenis_kategori);
  const [created_at, setCreatedAt] = useState(
    new Date(artikel.created_at).toLocaleDateString("en-IN")
  );
  const [nama, setNamaKategori] = useState(artikel.nama);
  const [gambar, setGambar] = useState(artikel.gambar);
  const [user, setUser] = useState(artikel.dibuat);
  const [isi_artikel, setIsiArtikel] = useState(artikel.isi_artikel);
  const [tags, setTags] = useState(artikel.tag);

  const dispatch = useDispatch();
  const router = useRouter();

  // const { detail } = useSelector((state) => state.detailBerandaArtikel);
  // const { tags } = useSelector((state) => state.allTagBerandaArtikel);

  const [keyword, setKeyword] = useState(null);
  const [searchWords, setSearchWords] = useState(null);
  const [resultText, setResultText] = useState(null);

  const getWindowDimensions = () => {
    // if (typeof window === 'undefined') {
    //     global.window = {}
    // }

    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  const [windowDimensions, setWindowDimensions] = useState(
    // getWindowDimensions()
    {}
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    setWindowDimensions(getWindowDimensions());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [artikel]);

  useEffect(() => {}, [windowDimensions]);

  const handleFilterTag = (str) => {
    router.push(`/artikel?tag=${str}`);
  };

  const handleHighlightWords = (e, text) => {
    e.preventDefault();

    let result = "";
    let splitWords = keyword.split(" ");
    let splitText = text.split(" ");
    // let splitWords = keyword
    // setSearchWords(splitWords)

    for (let i = 0; i < splitWords.length; i++) {
      for (let j = 0; j < splitText.length; j++) {
        if (splitWords[i].toLowerCase() === splitText[j].toLowerCase()) {
          result += `<mark>` + splitText[j] + `</mark>` + " ";
        } else {
          result += `<span>` + splitText[j] + `</span>` + " ";
        }
      }
    }

    setResultText(result);
  };

  return (
    <>
      {/* <PreviewWrapper title="Pratinjau Artikel - Publikasi"> */}
      <PesertaWrapper
        fluid
        className="px-md-20 px-10 pb-10"
        title="Pratinjau Artikel - Publikasi"
      >
        <div className="card card-custom card-stretch gutter-b px-10 py-8">
            <div className="row my-5 d-flex flex-column">
              <div className="col-2">
                <div className="badge badge-light mr-2 rounded-full">
                  <div className="text-primary font-weight-bolder">PENGUMUMAN</div>
                </div>
              </div>
              <div className="mt-5 ml-3">
                <h1 className="font-weight-bolder" style={{fontSize: "40px"}}>
                  {/* Insert Title Here */}
                  Pengumuman Kelulusan Peserta Pelatihan Daring Gelombang 1 Program VSGA DTS 2021
                </h1>
              </div>

              <div className="mt-5 ml-3 d-flex flex-row align-items-center">
                <span className="font-weight-bolder">
                  {/* Insert Akademi Here */}
                  {artikel.kategori_akademi}
                </span>
                <span className="mr-1 ml-3">
                  <i className="ri-eye-line"></i>
                </span>
                <span className="text-muted">
                  {/* Insert Views Here */}
                  Dibaca {artikel.dibaca}
                </span>
              </div>

              <div className="mt-5 ml-5 d-flex flex-row align-items-center justify-content-between mx-3">
                <div className="row">
                  <div className="">
                    {/* Insert Logo Image Here */}
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
                  </div>
                  <div className="d-flex flex-column ml-3">
                    <div className="font-weight-bolder mb-2">
                      {/* Insert Admin Here */}
                      {artikel.dibuat}
                    </div>
                    <div className="text-muted">
                      {moment(artikel.tanggal_publish).format("DD MMMM YYYY")}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <button className="btn btn-outline-light rounded-circle mr-3">
                    <i className="ri-share-line p-0"></i>
                  </button>

                  <button className="btn btn-outline-light rounded-circle mr-3">
                    <i className="ri-heart-line p-0"></i>
                  </button>
                </div>
              </div>
            </div>
          {/* End of Header */}

          {/* Content */}
          {artikel ? (
            <div className="row mt-10">
              {/* Left Side */}
              <div className="col-12 col-md-8">
                {/* Image */}
                <Image
                  src={
                    process.env.END_POINT_API_IMAGE_PUBLIKASI +
                    "publikasi/images/" +
                    artikel.gambar
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
                    className="row my-5 mx-5 text-justify"
                    style={{ overflowX: "hidden" }}
                  >
                    {resultText ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: resultText }}
                      ></div>
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: artikel.isi_artikel,
                        }}
                      />
                    )}
                  </div>

                  <div className="row m-3 d-flex justify-content-between pb-5">
                    <div className="row d-flex justify-content-between ml-3">
                      {artikel && artikel.tag && artikel.tag.length !== 0
                        ? artikel.tag.map((el, i) => {
                            return (
                              <div className="mr-3 border p-3 rounded" key={i}>
                                #{el}
                              </div>
                            );
                          })
                        : null}
                    </div>

                    <div className="row">
                      <button className="btn btn-outline-light rounded-circle mr-3">
                        <i className="ri-share-line p-0"></i>
                      </button>

                      <button className="btn btn-outline-light rounded-circle mr-3">
                        <i className="ri-heart-line p-0"></i>
                      </button>
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

          {/* End of Content */}
        </div>
      </PesertaWrapper>
      {/* </PreviewWrapper> */}
    </>
  );
};

export default Preview;
