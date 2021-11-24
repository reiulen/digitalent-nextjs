import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap"
import Image from "next/image";
import { getAllFaq } from "../../../../redux/actions/beranda/faq-content.actions";
import PulseLoaderRender from "../../../../user-component-new/components/loader/PulseLoader";
import SubHeaderComponent from "../../../../user-component/components/template/Subheader.component";

const FaqPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const {
        loading: loadingFaq,
        error,
        faq,
    } = useSelector((state) => state.allFaqContent);
    const { kategori } = useSelector((state) => state.kategoriBerandaFaq)

    const [title, setTitle] = useState("Pertanyaan Populer");
    const [keyword, setKeyword] = useState("");
    const [showCategoryMobile, setShowCategoryMobile] = useState(false)

    const [content, setContent] = useState(
        faq?.faq.map((row, i) => {
            return {
                ...row,
                isShow: false,
            };
        })
    );

    const handleFilterKeyword = (e) => {
        e.preventDefault();
        dispatch(getAllFaq(null, null, keyword));
        setTitle(`Hasil Pencarian "${keyword}"`)

        if (keyword === "") {
            handlePinnedFaq()
        }
    };

    const handlePinnedFaq = () => {
        dispatch(getAllFaq(1, null, null))
        setTitle("Pertanyaan Populer")
        setKeyword(null)
    }

    const handleCategoryFaq = (str) => {
        dispatch(getAllFaq(null, str, null))
        setTitle(str)
        setKeyword(null)
    }

    return (
        <Container fluid className="px-md-30 px-10 py-10 bg-white">
            <SubHeaderComponent
                data={[{ link: router.asPath, name: "Frequently Asked Questions" }]}
            />
            <div className="row">
                <div className="col-12 col-md-4">
                    <h1 style={{ fontWeight: "800" }}>
                        Tanya Jawab
                    </h1>
                    <p
                        className="my-5"
                        style={{ color: "#6C6C6C" }}
                    >
                        Ada yang bisa Kami Bantu ?
                    </p>
                </div>
                <div className="d-none d-md-block col-md-8">
                    <div
                        className="rounded-lg p-5 text-wrap ml-2"
                        style={{ backgroundColor: "#E6F2FF", fontSize: "14px" }}
                    >
                        <div className="font-weight-bold">
                            "Budayakan membaca. Calon peserta/peserta harus membaca setiap informasi dengan lengkap dan teliti, agar terhindar dari kesalahan informasi dan mengurangi pertanyaan berulang yang tidak perlu."
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <div className="position-relative overflow-hidden my-5">
                        <i className="ri-search-line left-center-absolute ml-3"></i>
                        <input
                            type="text"
                            className="form-control pl-10"
                            placeholder="Cari..."
                            style={{ borderRadius: "30px", backgroundColor: "#fafafb" }}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <button
                            className="btn btn-primary text-white right-center-absolute"
                            style={{
                                borderTopLeftRadius: "0",
                                borderBottomLeftRadius: "0",
                                borderTopRightRadius: "18px",
                                borderBottomRightRadius: "18px",
                            }}
                            type="submit"
                            onClick={handleFilterKeyword}
                        >
                            Cari
                        </button>
                    </div>
                    <div className="mb-5 d-none d-md-block">
                        <h4 style={{ fontWeight: "600", marginTop: "50px" }}>
                            Kategori Pertanyaan
                        </h4>
                        <div>
                            <div className="d-flex flex-row">
                                <div
                                    className="d-flex align-items-center my-5 font-weight-bolder"

                                    style=
                                    {title === "Pertanyaan Populer" ?
                                        { cursor: "pointer", color: "#007CFF" }
                                        :
                                        { cursor: "pointer", color: "#6C6C6C" }
                                    }
                                    onClick={() => handlePinnedFaq()}
                                >
                                    <i
                                        className="fas fa-arrow-right mr-3"
                                        style=
                                        {title === "Pertanyaan Populer" ?
                                            { cursor: "pointer", color: "#007CFF" }
                                            :
                                            { cursor: "pointer", color: "#6C6C6C" }
                                        }
                                    />
                                    <td>Pertanyaan Populer</td>
                                </div>
                            </div>
                        </div>

                        {
                            kategori && kategori.length !== 0 ?
                                kategori.map((el, i) => {
                                    return (
                                        <div
                                            key={i}
                                        >
                                            <div className="d-flex flex-row">
                                                <div
                                                    className="d-flex align-items-center my-5 font-weight-bolder"
                                                    style=
                                                    {title === el.nama_kategori ?
                                                        { cursor: "pointer", color: "#007CFF" }
                                                        :
                                                        { cursor: "pointer", color: "#6C6C6C" }
                                                    }
                                                    onClick={() => handleCategoryFaq(el.nama_kategori)}

                                                >
                                                    <i
                                                        className="fas fa-arrow-right mr-3"
                                                        style=
                                                        {title === el.nama_kategori ?
                                                            { cursor: "pointer", color: "#007CFF" }
                                                            :
                                                            { cursor: "pointer", color: "#6C6C6C" }
                                                        }
                                                    />
                                                    <td>{el.nama_kategori}</td>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                null
                        }
                    </div>

                    {/* Filter on Mobile */}
                    <div
                        className="mb-5 d-block d-md-none"
                        style={{
                            marginTop: "30px",
                            borderRadius: "6px",
                            border: "1px solid #D7E1EA",
                        }}
                    >
                        <div className="row d-flex justify-content-between align-items-center mx-5 py-5">
                            <div className="d-flex align-items-center">
                                <Image
                                    src={`/assets/media/logo-kategori.svg`}
                                    width={32}
                                    height={32}
                                    alt="Logo Kategori Pertanyaan"
                                />
                                <span className="font-weight-bolder ml-3">
                                    Kategori Pertanyaan
                                </span>
                            </div>
                            <div
                                style={{ cursor: "pointer" }}
                                onClick={() => setShowCategoryMobile(!showCategoryMobile)}
                            >
                                <i className=
                                    {
                                        showCategoryMobile === false ?
                                            "ri-arrow-down-s-line"
                                            :
                                            "ri-arrow-right-s-line"
                                    }
                                />
                            </div>
                        </div>

                        {
                            showCategoryMobile === true ?
                                <div>
                                    <div className="ml-7">
                                        <div className="d-flex flex-row">
                                            <div
                                                className="d-flex align-items-center my-5 font-weight-bolder"

                                                style=
                                                {title === "Pertanyaan Populer" ?
                                                    { cursor: "pointer", color: "#007CFF" }
                                                    :
                                                    { cursor: "pointer", color: "#6C6C6C" }
                                                }
                                                onClick={() => handlePinnedFaq()}
                                            >
                                                <i
                                                    className="fas fa-arrow-right mr-3"
                                                    style=
                                                    {title === "Pertanyaan Populer" ?
                                                        { cursor: "pointer", color: "#007CFF" }
                                                        :
                                                        { cursor: "pointer", color: "#6C6C6C" }
                                                    }
                                                />
                                                <td>Pertanyaan Populer</td>
                                            </div>
                                        </div>

                                        {
                                            kategori && kategori.length !== 0 ?
                                                kategori.map((el, i) => {
                                                    return (
                                                        <div
                                                            key={i}
                                                        >
                                                            <div className="d-flex flex-row">
                                                                <div
                                                                    className="d-flex align-items-center my-5 font-weight-bolder"
                                                                    style=
                                                                    {title === el.nama_kategori ?
                                                                        { cursor: "pointer", color: "#007CFF" }
                                                                        :
                                                                        { cursor: "pointer", color: "#6C6C6C" }
                                                                    }
                                                                    onClick={() => handleCategoryFaq(el.nama_kategori)}

                                                                >
                                                                    <i
                                                                        className="fas fa-arrow-right mr-3"
                                                                        style=
                                                                        {title === el.nama_kategori ?
                                                                            { cursor: "pointer", color: "#007CFF" }
                                                                            :
                                                                            { cursor: "pointer", color: "#6C6C6C" }
                                                                        }
                                                                    />
                                                                    <td>{el.nama_kategori}</td>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                                :
                                                null
                                        }
                                    </div>

                                </div>
                                :
                                null
                        }


                    </div>
                    {/* End Filter on Mobile */}
                </div>

                {/* Content */}
                <div className="col-md-8">
                    <div className="ml-3">
                        <h2
                            style={{
                                fontWeight: "800",
                                marginTop: "20px",
                                color: "#203e80",
                            }}
                        >
                            {title}
                        </h2>
                        {loadingFaq ? (
                            <div className="container-fluid">
                                <div className="row">
                                    <PulseLoaderRender />
                                </div>
                            </div>
                        ) :
                            <div
                                className="my-2 my-md-17"
                            >
                                {faq?.faq.length > 0 ? (
                                    faq?.faq.map((row, i) => {
                                        return (

                                            <div className="accordion" id="selector" key={i}>
                                                <div
                                                    className="accordion-item"
                                                    style={{
                                                        marginTop: "30px",
                                                        borderRadius: "6px",
                                                        border: "1px solid #D7E1EA",
                                                    }}
                                                >
                                                    <div
                                                        className={
                                                            row.isShow === true ?
                                                                "accordion-header d-flex justify-content-between align-items-center pt-5 "
                                                                :
                                                                "accordion-header d-flex justify-content-between align-items-center py-5"
                                                        }
                                                        style={{ marginLeft: "30px" }}
                                                    >
                                                        <h6 style={{ fontWeight: "700" }}>{row.judul}</h6>
                                                        <button
                                                            className="accordion-button btn"
                                                            onClick={() => {
                                                                setContent(
                                                                    content.filter((item) => {
                                                                        if (row.id === item.id) {
                                                                            row.isShow = !row.isShow;
                                                                        }
                                                                        return item;
                                                                    })
                                                                );
                                                            }}
                                                            type="button"
                                                            data-toggle="collapse"
                                                            data-target={
                                                                i === 0
                                                                    ? "#collapseExample"
                                                                    : `#collapseExample${i}`
                                                            }
                                                            key={i}
                                                            data-parent="#selector"
                                                            aria-expanded="false"
                                                            aria-controls="collapseExample"
                                                        >
                                                            <i
                                                                className={
                                                                    row.isShow === true
                                                                        ? "fas fa-minus-circle"
                                                                        : "fas fa-plus-circle"
                                                                }
                                                                style={{ color: "#3699ff" }}
                                                            ></i>
                                                        </button>
                                                    </div>
                                                    <div
                                                        className="collapse"
                                                        id={
                                                            i === 0
                                                                ? "collapseExample"
                                                                : `collapseExample${i}`
                                                        }
                                                        key={i}
                                                    >
                                                        <div className="accordion-body mx-9 border-0 mb-5 text-justify" dangerouslySetInnerHTML={{ __html: row.jawaban }}>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div className="text-center">
                                        <h2 className="font-weight-bolder">
                                            Pertanyaan FAQ Tidak Tersedia
                                        </h2>
                                    </div>
                                )}
                            </div>
                        }
                    </div>
                </div>
                {/* End of Content */}
            </div>
        </Container>
    );
};

export default FaqPage;