import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap"

import styles from "../../../../user-component/components/template/Sidebar.module.css";

import { getAllFaq, getKategoriBerandaFaq } from "../../../../redux/actions/beranda/faq-content.actions";
import { set } from "js-cookie";
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

    // const [deskripsi, setDeskripsi] = useState(
    //     faq ? faq?.faq[0]?.nama_kategori : ""
    // );
    // const [title, setTitle] = useState(faq?.faq[0]?.nama_kategori);
    const [disableBtn, setDisableBtn] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [disableBtnPlus, setDisableBtnPlus] = useState(null);
    const [active, setActive] = useState(false);
    // const [sidebar, setSidebar] = useState(
    //     faq?.faq.map((item) => {
    //         return item.nama_kategori;
    //     })
    // );

    const hover = "fas fa-arrow-right mr-3 text-primary"
    const nonHover = "fas fa-arrow-right mr-3"

    // const [content, setContent] = useState(
    //     faq?.faq.map((row, i) => {
    //         return {
    //             ...row,
    //             isShow: false,
    //         };
    //     })
    // );

    const handleFilterKeyword = (e) => {
        e.preventDefault();
        dispatch(getAllFaq(keyword));
    };

    // const sideBar = sidebar?.filter((item, pos) => {
    //     return sidebar.indexOf(item) === pos;
    // });

    return (
        <Container fluid className="px-md-30 px-10 py-10 bg-white">
            <SubHeaderComponent
                data={[{ link: router.asPath, name: "Frequently Asked Questions" }]}
            />
            <div className="row">
                <div className="col-12 col-lg-4"> 
                    <h1 style={{ fontWeight: "800" }}>
                        Tanya Jawab
                    </h1>
                    <p className="my-5 text-muted">Ada yang bisa Kami Bantu ?</p>
                </div>
                <div className="col-12 col-lg-8">
                    <div className="rounded-lg p-5 text-wrap" style={{backgroundColor:"#E6F2FF", fontSize:"14px"}}>
                        <div className="font-weight-bold">
                            "Budayakan membaca. Calon peserta/peserta harus membaca setiap informasi dengan lengkap dan teliti, agar terhindar dari kesalahan informasi dan mengurangi pertanyaan berulang yang tidak perlu."
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="row">
                <div className="col-lg-4">
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
                    <div className="mb-5">
                        <h4 style={{ fontWeight: "600", marginTop: "50px" }}>
                            Kategori Pertanyaan
                        </h4>
                        {/* {sideBar.length > 0 ? (
                            sideBar?.map((row, i) => {
                                return (
                                    <div style={{ marginLeft: "-35px" }} key={i}>
                                        <div className="d-flex flex-row">
                                            <div
                                                className={`${deskripsi === row
                                                    ? styles.activeMenuFaqItem
                                                    : styles.menuItem
                                                    } d-flex align-items-center my-5`}
                                                onClick={() => {
                                                    dispatch(getAllFaq(null, row));
                                                    setDisableBtn(!disableBtn);
                                                    setDeskripsi(row);
                                                    setTitle(row);
                                                }}
                                            >
                                                <i className={`${deskripsi === row ? hover : nonHover}`}></i>
                                                <td>{row}</td>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="">
                                <h4 className="font-weight-bolder">
                                    Kategori FAQ Tidak Tersedia
                                </h4>
                            </div>
                        )} */}
                        <div>
                            <div className="d-flex flex-row">
                                <div className="d-flex align-items-center my-5">
                                    <td>Pertanyaan Populer</td>
                                </div>
                            </div>
                        </div>

                        {
                            kategori && kategori.length !== 0 ?
                                kategori.map ((el, i) => {
                                    return (
                                        <div
                                            // style={{ marginLeft: "-35px" }} 
                                            key={i}
                                        >
                                            <div className="d-flex flex-row">
                                                <div className="d-flex align-items-center my-5">
                                                    {/* <i className={hover}/> */}
                                                    <td>{el.nama_kategori}</td>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            :
                                <div>
                                    <h4 className="font-weight-bolder">
                                        Kategori FAQ Tidak Tersedia
                                    </h4>
                                </div>
                        }
                    </div>
                </div>

                <div className="col-lg-8">
                    <div className="ml-3">
                        {/* {faq?.faq.length > 0 && (
                            <h2
                                style={{
                                    fontWeight: "800",
                                    marginTop: "20px",
                                    color: "#203e80",
                                }}
                            >
                                {title}
                            </h2>
                        )} */}
                        {/* {loadingFaq ? (
                            <div className="container-fluid">
                                <div className="row">
                                    <PulseLoaderRender />
                                </div>
                            </div>
                        ) :
                            <div style={{ marginTop: "60px", marginBottom: "40px" }}>
                                {faq?.faq.length > 0 ? (
                                    faq?.faq.map((row, i) => {
                                        if (row.nama_kategori === deskripsi) {
                                            return (
                                                <div className="accordion" id="selector">
                                                    <div
                                                        className="accordion-item"
                                                        style={{
                                                            marginTop: "30px",
                                                            borderRadius: "6px",
                                                            border: "1px solid black",
                                                        }}
                                                    >
                                                        <div
                                                            className="accordion-header d-flex justify-content-between align-items-center pt-1"
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
                                                            <div className="accordion-body card card-body border-0 mb-5 text-justify">
                                                                {row.jawaban}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })
                                ) : (
                                    <div className="text-center">
                                        <h2 className="font-weight-bolder">
                                            Pertanyaan FAQ Tidak Tersedia
                                        </h2>
                                    </div>
                                )}
                            </div>} */}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default FaqPage;