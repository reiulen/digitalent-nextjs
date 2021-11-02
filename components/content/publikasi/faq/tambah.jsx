import React, { useState, useEffect, useRef } from 'react';

import Link from 'next/link'
import dynamic from "next/dynamic";
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import SimpleReactValidator from "simple-react-validator"
import Swal from 'sweetalert2'
import DatePicker from 'react-datepicker'

import { newFaq, clearErrors } from '../../../../redux/actions/publikasi/faq.actions'
import { NEW_FAQ_RESET } from '../../../../redux/types/publikasi/faq.type'
import { getAllKategori } from '../../../../redux/actions/publikasi/kategori.actions'

import PageWrapper from '../../../wrapper/page.wrapper';
import LoadingPage from '../../../LoadingPage';

import "../../../../styles/publikasi.module.css"

const TambahFaq = ({ token, id }) => {
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
    const [users_id, setUsersId] = useState(id)
    const [pinned, setPinnedFaq] = useState(0)
    const [publish, setPublish] = useState(0)
    const [publishDate, setPublishDate] = useState(null);
    const [disablePublishDate, setDisablePublishDate] = useState(true)
    const [, forceUpdate] = useState();
    // const forceUpdate = React.useReducer(() => ({}))[1]

    const handleChangePublish = (e) => {
        setDisablePublishDate(!disablePublishDate)

        if (e.target.checked === false) {
            setPublishDate(null)
            setPublish(0)
        } else {
            setPublish(1)
        }
    };

    const handlePublishDate = (date) => {
        if (disablePublishDate === false) {
            setPublishDate(date)
        }
    }

    const handleChangePinned = (e) => {
        if (e.target.checked === false) {
            setPinnedFaq(0)

        } else if (e.target.checked === true) {
            setPinnedFaq(1)
        }
    };

    const onSubmit = (e) => {
        e.preventDefault()

        if (simpleValidator.current.allValid()) {
            if (error) {
                dispatch(clearErrors())
            }

            if (publish === true) {
                setPublish(1)

            } else if (publish === false) {
                setPublish(0)

            }

            if (pinned === true) {
                setPinnedFaq(1)

            } else if (pinned === false) {
                setPinnedFaq(0)

            }

            if (publishDate === null) {
                let today = new Date

                const data = {
                    kategori_id,
                    judul,
                    jawaban,
                    users_id,
                    publish,
                    pinned,
                    tanggal_publish: moment(today).format("YYYY-MM-DD")
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
                            dispatch(newFaq(data, token))
                        }
                    });

            } else {
                const data = {
                    kategori_id,
                    judul,
                    jawaban,
                    users_id,
                    publish,
                    pinned,
                    tanggal_publish: moment(publishDate).format("YYYY-MM-DD")
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
                            dispatch(newFaq(data, token))
                        }
                    });
            }


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
                    <div className="card-header">
                        <h3 className="col-sm-4 card-title font-weight-bolder text-dark">Tambah FAQ</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <label htmlFor="staticEmail" className="col-sm-4 col-form-label font-weight-bolder">Judul Pertanyaan</label>
                                <div className="col-sm-12">
                                    <input
                                        type="text"
                                        className="form-control description-text"
                                        placeholder="Masukkan Judul Disini"
                                        value={judul}
                                        onChange={(e) => setJudulPertanyaan(e.target.value)}
                                        onBlur={() => simpleValidator.current.showMessageFor("judul pertanyaan")}
                                    />
                                    {simpleValidator.current.message("judul pertanyaan", judul, "required|min:5|max:200", { className: "text-danger" })}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label font-weight-bolder">Jawaban</label>
                                <div className="col-sm-12">
                                    <textarea
                                        className='form-control'
                                        placeholder='Tulis disini'
                                        name="jawaban"
                                        rows="10"
                                        onChange={e => setJawaban(e.target.value)}
                                        value={jawaban}
                                        onBlur={() => simpleValidator.current.showMessageFor("jawaban")}
                                    />
                                    {simpleValidator.current.message("jawaban", jawaban, "required|max:7000", { className: "text-danger" })}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label font-weight-bolder">Kategori</label>
                                <div className="col-sm-12">
                                    <select
                                        className='form-control'
                                        value={kategori_id}
                                        onChange={e => setKategoriId(e.target.value)}
                                        onBlur={e => { setKategoriId(e.target.value); simpleValidator.current.showMessageFor("kategori") }}
                                    >
                                        <option value="" disabled selected>-- FAQ --</option>
                                        {!kategori || (kategori && kategori.length === 0) ? (
                                            <option value="">Data Tidak Ditemukan</option>
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

                            <div className="form-group row font-weight-bolder font-weight-bolder">
                                <label
                                    htmlFor="staticEmail"
                                    className="ml-5 pl-4 font-weight-bolder"
                                >
                                    Publish
                                </label>
                                <div className="col-sm-1 ml-4">
                                    <div className="">
                                        <label className="switches">
                                            <input
                                                // required
                                                className="checkbox"
                                                checked={publish}
                                                type="checkbox"
                                                // onChange={(checked) => setPublish(checked)}
                                                onChange={(e) => handleChangePublish(e)}
                                            />
                                            <span
                                                className={`sliders round ${publish ? "text-white" : "pl-2"
                                                    }`}
                                            >
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {
                                disablePublishDate === false ?
                                    <div className="form-group">
                                        <label className='col-sm-5 col-form-label font-weight-bolder'>Set Tanggal Publish</label>
                                        <div className="col-sm-12">
                                            <div className="input-group">
                                                <DatePicker
                                                    className="form-search-date form-control-sm form-control"
                                                    selected={publishDate}
                                                    onChange={(date) => handlePublishDate(date)}
                                                    // onChange={(date) => setPublishDate(date)}
                                                    selectsStart
                                                    startDate={publishDate}
                                                    // endDate={endDate}
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="Silahkan Isi Tanggal Publish"
                                                    wrapperClassName="col-12 col-lg-12 col-xl-12"
                                                    // minDate={moment().toDate()}
                                                    disabled={disablePublishDate === true || disablePublishDate === null}
                                                // minDate={addDays(new Date(), 20)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    null
                            }



                            <div className="form-group row">
                                <label
                                    htmlFor="staticEmail"
                                    className="ml-5 pl-4 font-weight-bolder"
                                >
                                    Pin FAQ
                                </label>
                                <div className="col-sm-1 ml-4">
                                    <div className="">
                                        <label className="switches">
                                            <input
                                                // required
                                                className="checkbox"
                                                checked={pinned}
                                                type="checkbox"
                                                // onChange={(checked) => setPublish(checked)}
                                                onChange={(e) => handleChangePinned(e)}
                                            />
                                            <span
                                                className={`sliders round ${publish ? "text-white" : "pl-2"
                                                    }`}
                                            >
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-2"></div>
                                <div className="col-sm-10 text-right">
                                    <Link href='/publikasi/faq'>
                                        <a className='btn btn-white-ghost-rounded-full rounded-pill mr-2 btn-sm'>Kembali</a>
                                    </Link>
                                    <button className='btn btn-primary-rounded-full rounded-pill btn-sm'>Simpan</button>
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