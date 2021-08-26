import React, { useState, useEffect, useRef } from 'react';

import Link from 'next/link'
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux'
import SimpleReactValidator from "simple-react-validator";

import { updateKategori, clearErrors } from '../../../../redux/actions/publikasi/kategori.actions'
import { UPDATE_KATEGORI_RESET } from '../../../../redux/types/publikasi/kategori.type'

import PageWrapper from '../../../wrapper/page.wrapper';
import LoadingPage from '../../../LoadingPage';

const EditKategori = () => {

    const dispatch = useDispatch()
    const router = useRouter();

    const { loading, error, isUpdated } = useSelector(state => state.updateKategori)
    const { kategori } = useSelector(state => state.detailKategori)
    const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

    useEffect(() => {

        if (isUpdated) {
            dispatch({
                type: UPDATE_KATEGORI_RESET,
            });
            router.push({
                pathname: `/publikasi/kategori`,
                query: { success: true },
            });
        }

    }, [dispatch, isUpdated,router]);


    const [nama, setNamaKategori] = useState(kategori.nama)
    const [jenis_kategori, setJenisKategori] = useState(kategori.jenis_kategori)
    const [, forceUpdate] = useState();


    const onSubmit = (e) => {
        e.preventDefault()

        if (simpleValidator.current.allValid()) {
            if (error) {
                dispatch(clearErrors())
            }

            if (isUpdated) {
                dispatch({
                    type: UPDATE_KATEGORI_RESET
                })
            }

            const data = {
                nama,
                jenis_kategori,
            }

            dispatch(updateKategori(data, kategori.id))
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
                        <h3 className="card-title font-weight-bolder text-dark">Edit Katerori</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={onSubmit}>
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Nama Kategori</label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Isi Nama kategori disini"
                                        value={nama}
                                        onChange={(e) => setNamaKategori(e.target.value)}
                                        onBlur={() => simpleValidator.current.showMessageFor("nama kategori")}
                                    />
                                    {simpleValidator.current.message("nama kategori", nama, "required|max:25|string", { className: "text-danger" })}
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Jenis Kategori</label>
                                <div className="col-sm-10">
                                    <select
                                        name=""
                                        id=""
                                        value={jenis_kategori}
                                        className='form-control'
                                        onChange={e => setJenisKategori(e.target.value)}
                                        onBlur={e => { setJenisKategori(e.target.value); simpleValidator.current.showMessageFor("jenis kategori") }} >
                                        <option value="Berita">Berita</option>
                                        <option value="Artikel">Artikel</option>
                                        <option value="Galeri">Galeri</option>
                                        <option value="Video">Video</option>
                                        <option value="Imagetron">Imagetron</option>
                                        <option value="Faq">Faq</option>
                                    </select>
                                    {simpleValidator.current.message("jenis kategori", jenis_kategori, "required", { className: "text-danger" })}
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-2"></div>
                                <div className="col-sm-10">
                                    <Link href='/publikasi/kategori'>
                                        <a className='btn btn-outline-primary mr-2 btn-sm'>Kembali</a>
                                    </Link>
                                    <button className='btn btn-primary btn-sm'>Simpan</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </PageWrapper>
    )
}

export default EditKategori