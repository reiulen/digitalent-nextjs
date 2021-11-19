import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux';
import Image from "next/image";
import moment from "moment";
import IconFilter from "../../../assets/icon/Filter";

import { Container } from "react-bootstrap"

// import PageWrapper from "../../../wrapper/page.wrapper";
import PreviewWrapper from "../../../wrapper/preview.wrapper";
import Backdrop from "../../../../public/assets/media/backdrop.svg";
import styles from '../../../../styles/preview.module.css';

const Preview = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const { berita } = useSelector(state => state.detailBerita)

    const [judul_berita, setJudulBerita] = useState(berita.judul_berita)
    const [jenis_kategori, setJenisKategori] = useState(berita.jenis_kategori)
    const [created_at, setCreatedAt] = useState(new Date(berita.created_at).toLocaleDateString("en-IN"))
    const [nama, setNamaKategori] = useState(berita.nama)
    const [gambar, setGambar] = useState(berita.gambar)
    const [isi_berita, setIsiBerita] = useState(berita.isi_berita)
    const [tag, setTag] = useState(berita.tag)


    const { tags } = useSelector((state) => state.allTagBerandaBerita)

    const [keyword, setKeyword] = useState(null)
    const [searchWords, setSearchWords] = useState(null)
    const [resultText, setResultText] = useState(null)

    const getWindowDimensions = () => {
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
    }, [berita])

    useEffect(() => {

    }, [windowDimensions])

    const handleFilterTag = (str) => {
        router.push(`/berita?tag=${str}`)
    }

    const handleHighlightWords = (e, text) => {
        e.preventDefault();

        let result = ""
        let splitWords = keyword.split(" ")
        let splitText = text.split(" ")
        // let splitWords = keyword
        // setSearchWords(splitWords)

        for (let i = 0; i < splitWords.length; i++) {
            for (let j = 0; j < splitText.length; j++) {
                if (splitWords[i].toLowerCase() === splitText[j].toLowerCase()) {
                    result += `<mark>` + splitText[j] + `</mark>` + " "

                } else {
                    result += `<span>` + splitText[j] + `</span>` + " "
                }
            }
        }

        setResultText(result)
    }

    return (
        <>
            <Container fluid className="px-md-30 px-10 pb-10 bg-white">
                <div className="">

                    {/* Header */}
                    {berita ? (
                        <div className="row my-5 flex-column">
                            <div className="ml-2">
                                <div className="badge badge-light mr-2">
                                    <div className="text-primary">{(berita.nama).toUpperCase()}</div>
                                </div>
                            </div>
                            <div className="mt-5 ml-3">
                                <h1 className="font-weight-bolder">
                                    {/* Insert Title Here */}
                                    {berita.judul_berita}
                                </h1>
                            </div>

                            <div className="mt-5 ml-3 d-flex flex-row align-items-center">
                                <span className="font-weight-bolder">
                                    {/* Insert Akademi Here */}
                                    {berita.kategori_akademi}
                                </span>
                                <span className="mr-1 ml-3">
                                    <i className="ri-eye-line"></i>
                                </span>
                                <span className="text-muted">
                                    {/* Insert Views Here */}
                                    Dibaca {berita.dibaca}
                                </span>
                            </div>

                            <div className="mt-5 ml-5 d-flex flex-row align-items-center justify-content-between mx-3">
                                <div className="row">
                                    <div className="ml-2">
                                        {/* Insert Logo Image Here */}
                                        <Image
                                            src={
                                                process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                                "publikasi/images/" +
                                                berita.foto
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
                                            {berita.role[0].name}
                                        </div>
                                        <div className="text-muted">
                                            {moment(berita.tanggal_publish).format("DD MMMM YYYY")}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ) : null}
                    {/* End of Header */}

                    {/* Content */}
                    {berita ? (
                        <div className="row mt-10">
                            {/* Left Side */}
                            <div className="col-12 col-md-12 col-lg-8">
                                {/* Image */}
                                <Image
                                    src={
                                        process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                        "publikasi/images/" +
                                        berita.gambar
                                    }
                                    width="1500vw"
                                    height="1000vh"
                                    objectFit="fill"
                                    alt="Detail Image"
                                    className="rounded-lg"
                                />

                                {/* Artikel */}
                                <div className="border rounded-lg mb-5 mt-15">
                                    <div className="row my-5 mx-5 text-justify" style={{ overflowX: "hidden" }}>
                                        {
                                            resultText ?
                                                <div dangerouslySetInnerHTML={{ __html: resultText }}></div>
                                                :
                                                <div dangerouslySetInnerHTML={{ __html: berita.isi_berita }} />
                                        }
                                    </div>

                                    <div className="row m-3 d-flex justify-content-between pb-5">
                                        <div className="row d-flex justify-content-between ml-3">
                                            {berita && berita.tag && berita.tag.length !== 0
                                                ? berita.tag.map((el, i) => {
                                                    return (
                                                        <div className="mr-3 border p-3 rounded" key={i}>
                                                            #{(el).toUpperCase()}
                                                        </div>
                                                    );
                                                })
                                                : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End of Left Side */}

                            {/* Right Side */}
                            {windowDimensions &&
                                windowDimensions.width &&
                                windowDimensions.width > 770 ? (
                                <div className="col-12 col-md-4">
                                    {/* Search */}
                                    <div className="border rounded">
                                        <div className="row mt-10 mb-5">
                                            <div className="col-2 my-auto ml-5">
                                                <Image
                                                    src={`/assets/media/logo-filter.svg`}
                                                    width={40}
                                                    height={40}
                                                    alt="Logo filter"
                                                />
                                            </div>
                                            <div className="col-9 my-auto">
                                                <h3 className=" font-weight-bolder">Pencarian</h3>
                                            </div>
                                        </div>

                                        <form className="mb-10 mx-5">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div
                                                        className="input-group-text bg-light border-right-0 pr-1"
                                                        style={{
                                                            borderTopLeftRadius: "150px",
                                                            borderBottomLeftRadius: "150px",
                                                        }}
                                                    >
                                                        <i className="ri-search-line mr-2"></i>
                                                    </div>
                                                </div>

                                                <input
                                                    type="text"
                                                    className="form-control border-left-0 border p-0 bg-light"
                                                    placeholder="Cari Artikel"
                                                    onChange={(e) => setKeyword(e.target.value)}
                                                />

                                                <div>
                                                    <button
                                                        className="btn btn-primary-dashboard"
                                                        onClick={(e) =>
                                                            handleHighlightWords(e, berita.isi_berita)
                                                        }
                                                        style={{
                                                            borderTopRightRadius: "150px",
                                                            borderBottomRightRadius: "150px",
                                                        }}
                                                        type="submit"
                                                    >
                                                        Cari
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                    {/* Tag */}
                                    <div className="row mt-10 d-flex flex-column mx-10">
                                        <h3 className="font-weight-bolder">
                                            Temukan Lebih Banyak Artikel Yang Sesuai:
                                        </h3>
                                        <div className=" d-flex flex-wrap flex-row">
                                            {tags && tags.tag && tags.tag.length !== 0 ? (
                                                tags.tag.map((el, i) => {
                                                    return (
                                                        <div
                                                            className="border px-2 py-1 rounded my-3 mr-3 text-center d-flex align-items-center justify-content-center"
                                                            key={i}
                                                            onClick={() => handleFilterTag(el)}
                                                            style={{
                                                                cursor: "pointer",
                                                                height: "38px",
                                                                fontSize: "14px",
                                                            }}
                                                        >
                                                            #{el}
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                <div className="row text-center">
                                                    <h3 className="text-muted">
                                                        <em>Tag Belum Tersedia</em>
                                                    </h3>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : null}

                            {/* End of Right Side */}
                        </div>
                    ) : (
                        <div className="row d-flex justify-content-center my-5">
                            <h1 className="font-weight-bolder">Artikel Tidak Tersedia</h1>
                        </div>
                    )}

                    {/* End of Content */}
                </div>
            </Container>
        </>

    )
}

export default Preview;