import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import SubHeaderComponent from "../../components/template/Subheader.component";
import styles from "../../components/template/Sidebar.module.css";

const FaqPage = () => {
    const router = useRouter();

    const { loading, error, faq } = useSelector(state => state.allFaq)

    return (
        <>
            {/* {console.log("Cek FAQ :", faq)} */}
            <SubHeaderComponent />
            <div>
                <h1 style={{ fontWeight: '800' }}>Frequently Asked Questions</h1>
                <span>Ada yang bisa Kami Bantu ?</span>
            </div>
            <div className="row">
                <div className="col-lg-4">
                    <div className="position-relative overflow-hidden my-5">
                        <i className="ri-search-line left-center-absolute ml-2"></i>
                        <input
                            type="text"
                            className="form-control pl-10"
                            placeholder="Cari Penyelenggara..."
                            // value={search}
                            // onChange={(e) => setSearch(e.target.value)}
                            style={{ borderRadius: '30px' }}
                        />
                        <button
                            className="btn btn-primary text-white right-center-absolute"
                            style={{
                                borderTopLeftRadius: "0",
                                borderBottomLeftRadius: "0",
                                borderTopRightRadius: '18px',
                                borderBottomRightRadius: '18px'
                            }}
                        // onClick={handleSearch}
                        >
                            Cari
                        </button>
                    </div>

                    <h4 style={{ fontWeight: '600' }}>Kategori Pertanyaan</h4>
                    {
                        // faq.faq || faq.faq.length === 0 ? null :
                        faq.faq.map((row, i) => {
                            // console.log("row :", row)
                            return (
                                <div style={{ marginLeft: '-35px' }}>
                                    <div
                                        className={`${router.pathname === "/peserta/survey"
                                            ? styles.activeMenuItem
                                            : styles.menuItem
                                            } d-flex flex-row`}
                                    >
                                        <div className="">
                                            <i
                                                className={`${router.pathname === "/peserta/survey"
                                                    ? styles.activeIconMenu
                                                    : styles.iconMenu
                                                    } `}
                                            ></i>
                                        </div>
                                        <div className="d-flex align-items-center my-5">
                                            <i className="fas fa-arrow-right mr-3"></i>
                                            <td>{row.kategori}</td>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="col-lg-8">
                    <h2 style={{ fontWeight: '800', marginTop: '20px', color: '#203e80' }}>{faq.faq[0].kategori}</h2>
                    {
                        faq.faq.map((row, i) => {
                            return (
                                <div className="accordion" id="selector">
                                    <div className="accordion-item" style={{ border: '1px solid gray', marginTop: '30px', borderRadius: '10px' }}>
                                        <p className="accordion-header d-flex justify-content-between align-items-center" style={{ marginLeft: '30px' }}>
                                            {row.judul}
                                            <button className="accordion-button btn" type="button" data-toggle="collapse" data-target={i === 0 ? "#collapseExample" : `#collapseExample${i}`} key={i} data-parent="#selector" aria-expanded="false" aria-controls="collapseExample"
                                            // style={{width:'3px', height:'3px',lineHeight:'3px'}}
                                            >
                                                <i className="fas fa-plus-circle"></i>
                                            </button>
                                        </p>
                                        <div className="collapse" id={i === 0 ? "collapseExample" : `collapseExample${i}`} key={i}>
                                            <div className="accordion-body card card-body">
                                                {row.jawaban}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default FaqPage;