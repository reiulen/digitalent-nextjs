import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import SubHeaderComponent from "../../components/template/Subheader.component";
import styles from "../../components/template/Sidebar.module.css";

const FaqPage = () => {

    const { loading, error, faq } = useSelector(state => state.allFaq)
    const [deskripsi, setDeskripsi] = useState(faq.faq[0].kategori_id)
    const [title, setTitle] = useState(faq.faq[0].kategori)
    const [disableBtn, setDisableBtn] = useState(false)
    const [disableBtnPlus, setDisableBtnPlus] = useState(false)

    return (
        <>
            <div className="mt-5">
                <SubHeaderComponent />
            </div>
            <div>
                <h1 style={{ fontWeight: '800', marginTop: '40px' }}>Frequently Asked Questions</h1>
                <p className="my-5">Ada yang bisa Kami Bantu ?</p>
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

                    <h4 style={{ fontWeight: '600', marginTop: '50px' }}>Kategori Pertanyaan</h4>
                    {
                        faq.faq.map((row, i) => {
                            return (
                                <div style={{ marginLeft: '-35px' }}>
                                    <div
                                        className={`${disableBtn === true
                                            ? styles.activeMenuItem
                                            : styles.menuItem
                                            } d-flex flex-row`}
                                    >
                                        <div className="d-flex align-items-center my-5"
                                            onClick={() => {
                                                setDeskripsi(row.kategori_id)
                                                setTitle(row.kategori)
                                            }}>
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
                    <div className="ml-3">
                        <h2 style={{ fontWeight: '800', marginTop: '20px', color: '#203e80' }}>{title}</h2>
                        <div style={{ marginTop: '60px' }}>
                            {
                                faq.faq.map((row, i) => {
                                    if (row.kategori_id === deskripsi) {
                                        return (
                                            <div className="accordion" id="selector">
                                                <div className="accordion-item border border-dark" style={{ marginTop: '30px', borderRadius: '10px' }}>
                                                    <div className="accordion-header d-flex justify-content-between align-items-center pt-1" style={{ marginLeft: '30px' }}>
                                                        <h6 style={{ fontWeight: '700' }}>{row.judul}</h6>
                                                        <button className="accordion-button btn" onClick={() => setDisableBtnPlus(!disableBtnPlus)} type="button" data-toggle="collapse" data-target={i === 0 ? "#collapseExample" : `#collapseExample${i}`} key={i} data-parent="#selector" aria-expanded="false" aria-controls="collapseExample">
                                                            <i className={disableBtnPlus ? "fas fa-minus-circle" : "fas fa-plus-circle"} style={{ color: '#3699ff' }}></i>
                                                        </button>
                                                    </div>
                                                    <div className="collapse" id={i === 0 ? "collapseExample" : `collapseExample${i}`} key={i}>
                                                        <div className="accordion-body card card-body border-0">
                                                            {row.jawaban}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FaqPage;