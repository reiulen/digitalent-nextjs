import React, { useState, useEffect, useRef } from 'react';

import Link from 'next/link'
import dynamic from "next/dynamic";
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import SimpleReactValidator from "simple-react-validator"
import Swal from 'sweetalert2'

import { newFaq, clearErrors } from '../../../../redux/actions/publikasi/faq.actions'
import { NEW_FAQ_RESET } from '../../../../redux/types/publikasi/faq.type'
import { getAllKategori } from '../../../../redux/actions/publikasi/kategori.actions'

import PageWrapper from '../../../wrapper/page.wrapper';
import LoadingPage from '../../../LoadingPage';

const TambahFaq = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const importSwitch = () => import('bootstrap-switch-button-react')

    const SwitchButton = dynamic(importSwitch, {
        ssr: false
    })

    const { loading, error, success } = useSelector(state => state.newFaq)
    const { kategori } = useSelector(state => state.allKategori)
    const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

    useEffect(() => {
        dispatch(getAllKategori())
        // if (error) {
        //     dispatch(clearErrors())
        // }

        if (success) {
            dispatch({
                type: NEW_FAQ_RESET
            })
            router.push({
                pathname: `/publikasi/faq`,
                query: { success: true },
            });
        }

    }, [dispatch, error, success, router]);

    const [judul, setJudulPertanyaan] = useState('')
    const [jawaban, setJawaban] = useState('');
    const [kategori_id, setKategoriId] = useState('')
    const [users_id, setUsersId] = useState(3)
    const [pinned, setPinnedFaq] = useState(false)
    const [publish, setPublish] = useState(false)
    const [, forceUpdate] = useState();

    const onSubmit = (e) => {
        e.preventDefault()

        if (simpleValidator.current.allValid()) {
            if (error) {
                dispatch(clearErrors())
            }

            const data = {
                kategori_id,
                judul,
                jawaban,
                users_id,
                publish,
                pinned
            }

            dispatch(newFaq(data))

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
                        <h3 className="card-title font-weight-bolder text-dark">Tambah FAQ</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={onSubmit}>
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Judul Pertanyaan</label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Isi Judul disini"
                                        value={judul}
                                        onChange={(e) => setJudulPertanyaan(e.target.value)}
                                        onBlur={() => simpleValidator.current.showMessageFor("judul pertanyaan")}
                                    />
                                    {simpleValidator.current.message("judul pertanyaan", judul, "required", { className: "text-danger" })}
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Jawaban</label>
                                <div className="col-sm-10">
                                    <textarea
                                        className='form-control'
                                        placeholder='isi deskripsi jawaban disini'
                                        name="jawaban"
                                        rows="10"
                                        onChange={e => setJawaban(e.target.value)}
                                        value={jawaban}
                                        onBlur={() => simpleValidator.current.showMessageFor("jawaban")}
                                    />
                                    {simpleValidator.current.message("jawaban", jawaban, "required", { className: "text-danger" })}
                                </div>
                            </div>
                            {
                                console.log (kategori)
                            }

                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Kategori</label>
                                <div className="col-sm-10">
                                    <select
                                        className='form-control'
                                        value={kategori_id}
                                        onChange={e => setKategoriId(e.target.value)}
                                        onBlur={e => { setKategoriId(e.target.value); simpleValidator.current.showMessageFor("kategori") }}
                                    >
                                        <option value="" disabled selected>-- KATEGORI --</option>
                                        {!kategori || (kategori && kategori.length === 0) ? (
                                            <option value="">Data kosong</option>
                                        ) : (
                                            kategori &&
                                            kategori.kategori &&
                                            kategori.kategori.map((row) => {
                                                return (
                                                    row.jenis_kategori === "Faq" ?
                                                        <option key={row.id} value={row.id}>
                                                            {row.nama_kategori}
                                                        </option>
                                                    :
                                                        null
                                                );
                                            })
                                        )}
                                    </select>
                                    {simpleValidator.current.message("kategori", kategori_id, "required", { className: "text-danger" })}
                                </div>
                            </div>


                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Pin FAQ</label>
                                <div className="col-sm-1">
                                    <SwitchButton
                                        checked={pinned}
                                        onlabel=' '
                                        onstyle='primary'
                                        offlabel=' '
                                        offstyle='danger'
                                        size='sm'
                                        width={30}
                                        onChange={(checked) => setPinnedFaq(checked)}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Publish</label>
                                <div className="col-sm-1">
                                    <SwitchButton
                                        checked={publish}
                                        onlabel=' '
                                        onstyle='primary'
                                        offlabel=' '
                                        offstyle='danger'
                                        size='sm'
                                        width={30}
                                        onChange={(checked) => setPublish(checked)}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-2"></div>
                                <div className="col-sm-10">
                                    <Link href='/publikasi/faq'>
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

export default TambahFaq