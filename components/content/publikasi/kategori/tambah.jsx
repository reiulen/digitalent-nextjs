import React, { useState, useEffect, useRef } from 'react';

import Link from 'next/link'
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux'
import SimpleReactValidator from "simple-react-validator"
import Swal from 'sweetalert2'

import styles from "../../../../styles/previewGaleri.module.css";

import { newKategori, clearErrors } from '../../../../redux/actions/publikasi/kategori.actions'
import { NEW_KATEGORI_RESET } from '../../../../redux/types/publikasi/kategori.type'
import PageWrapper from '../../../wrapper/page.wrapper';
import LoadingPage from '../../../LoadingPage';

const TambahKategori = ({ token }) => {

    const dispatch = useDispatch()
    const router = useRouter();

    const { loading, error, success } = useSelector(state => state.newKategori)
    const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

    useEffect(() => {

        if (success) {
            dispatch({
                type: NEW_KATEGORI_RESET,
            });
            router.push({
                pathname: `/publikasi/kategori`,
                query: { success: true },
            });
        }

    }, [dispatch, success, router]);


    const [nama, setNamaKategori] = useState('')
    const [jenis_kategori, setJenisKategori] = useState('')
    const [, forceUpdate] = useState();


    const onSubmit = (e) => {
        e.preventDefault()

        if (simpleValidator.current.allValid()) {
            if (error) {
                dispatch(clearErrors())
            }

            if (success) {
                dispatch({
                    type: NEW_KATEGORI_RESET
                })
            }

            const data = {
                nama,
                jenis_kategori
            }
            Swal.fire({
                title: "Apakah anda yakin ?",
                text: "Data ini akan ditambahkan !",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya !",
                cancelButtonText: "Batal",
              })
                .then((result) => {
                  if (result.isConfirmed) {
                    dispatch(newKategori(data, token))
                  }
                });

        } else {
            simpleValidator.current.showMessages();
            forceUpdate(1);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Isi data dengan benar !",
            });
        }
    }

    return (
        <PageWrapper>
            {error ?
                <div className="alert alert-custom alert-light-danger fade show mb-5" role="alert">
                    <div className="alert-icon"><i className="flaticon-warning"></i></div>
                    <div className="alert-text">{error}</div>
                    <div className="alert-close">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true"><i className="ki ki-close"></i></span>
                        </button>
                    </div>
                </div>
                : ''
            }

            <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
                {loading ? <LoadingPage loading={loading} /> : ""}
                <div className="card card-custom card-stretch gutter-b">
                    <div className="card-header border-0">
                        <h3 className="col-sm-4 card-title font-weight-bolder text-dark">Tambah Kategori</h3>
                    </div>
                    <div className="card-body">
                        <div>
                            <div className="form-group">
                                <label htmlFor="staticEmail" className="col-sm-4 col-form-label font-weight-bolder">Nama Kategori</label>
                                <div className={`${styles.judulTambah} col-sm-12`}>
                                    <input
                                        type="text"
                                        className={`${styles.judulTambah} form-control`}
                                        placeholder="Masukkan Nama kategori disini"
                                        value={nama}
                                        onChange={(e) => setNamaKategori(e.target.value)}
                                        onBlur={() => simpleValidator.current.showMessageFor("nama kategori")}
                                    />
                                    {
                                        success ?
                                            null
                                            :
                                            simpleValidator.current.message("nama kategori", nama, "required|min:1|max:200|string", { className: "text-danger" })
                                    }
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="staticEmail" className="col-sm-4 col-form-label font-weight-bolder">Jenis Kategori</label>
                                <div className={`${styles.selectKategori} col-sm-12`}>
                                    <select
                                        value={jenis_kategori}
                                        className={`${styles.selectKategori} form-control`}
                                        onChange={e => setJenisKategori(e.target.value)}
                                        onBlur={e => { setJenisKategori(e.target.value); simpleValidator.current.showMessageFor("jenis kategori") }}
                                    >
                                        <option value="" disabled selected>-- JENIS KATEGORI --</option>
                                        <option value="Berita">Berita</option>
                                        <option value="Artikel">Artikel</option>
                                        <option value="Galeri">Galeri</option>
                                        <option value="Video">Video</option>
                                        <option value="Imagetron">Imagetron</option>
                                        <option value="Faq">Faq</option>
                                    </select>
                                    {
                                        success ?
                                            null
                                            :
                                            simpleValidator.current.message("jenis kategori", jenis_kategori, "required", { className: "text-danger" })
                                    }
                                </div>
                            </div>

                            <div className="form-group row mr-0">
                                <div className="col-sm-2"></div>
                                <div className="col-sm-10 text-right">
                                    <Link href='/publikasi/kategori'>
                                        <a className={`${styles.btnKembali} btn btn-white-ghost-rounded-full rounded-pill mr-2 btn-sm`}>Kembali</a>
                                    </Link>
                                    <button onClick={onSubmit} className={`${styles.btnSimpan} btn btn-primary-rounded-full rounded-pill btn-sm`}>Simpan</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </PageWrapper>
    )
}

export default TambahKategori