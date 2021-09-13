import React, { useState, useEffect, useRef } from 'react';

import Link from 'next/link'
import dynamic from "next/dynamic";
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import SimpleReactValidator from "simple-react-validator"
import Swal from 'sweetalert2'
import DatePicker from 'react-datepicker'

import { updateFaq, clearErrors } from '../../../../redux/actions/publikasi/faq.actions'
import { UPDATE_FAQ_RESET } from '../../../../redux/types/publikasi/faq.type'
import { getAllKategori } from '../../../../redux/actions/publikasi/kategori.actions'

import PageWrapper from '../../../wrapper/page.wrapper';
import LoadingPage from '../../../LoadingPage';

const EditFaq = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const importSwitch = () => import('bootstrap-switch-button-react')

    const SwitchButton = dynamic(importSwitch, {
        ssr: false
    })

    const { loading, error, isUpdated } = useSelector(state => state.updateFaq)
    const { faq } = useSelector(state => state.detailFaq)
    const { loading: allLoading, error: allError, kategori } = useSelector(state => state.allKategori)
    const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

    useEffect(() => {
        dispatch(getAllKategori())
        // if (error) {
        //     dispatch(clearErrors())
        // }

        if (isUpdated) {
            dispatch({
                type: UPDATE_FAQ_RESET
            })
            router.push({
                pathname: `/publikasi/faq`,
                query: { success: true },
            });
        }

    }, [dispatch, error, isUpdated, router]);


    const [judul, setJudulPertanyaan] = useState(faq.judul)
    const [jawaban, setJawaban] = useState(faq.jawaban);
    const [kategori_id, setKategoriId] = useState(faq.kategori_id)
    const [users_id, setUsersId] = useState(3)
    const [pinned, setPinnedFaq] = useState(faq.pinned === 1 ? true : false)
    const [publish, setPublish] = useState(faq.publish === 1 ? true : false)
    const [publishDate, setPublishDate] = useState(faq.tanggal_publish ? new Date (faq.tanggal_publish) : null);
    const [, forceUpdate] = useState();

    const handleChangePinned = (e) => {
        setPinnedFaq(e.target.checked);
        // console.log (e.target.checked)
    };

    const handleChangePublish = (e) => {
        setPublish(e.target.checked);
        // console.log (e.target.checked)
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

            const data = {
                kategori_id,
                judul,
                jawaban,
                users_id,
                publish,
                pinned,
                _method: 'put',
            }

            dispatch(updateFaq(data, faq.id))

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
            {
                console.log (faq)
            }
            {
                console.log (kategori)
            }
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
                {
                    faq ? 
                        <div className="card card-custom card-stretch gutter-b">
                            <div className="card-header border-0">
                                <h3 className="card-title font-weight-bolder text-dark">Ubah FAQ</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={onSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label font-weight-bolder">Judul Pertanyaan</label>
                                        <div className="col-sm-12">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Isi Judul disini"
                                                value={judul}
                                                onChange={(e) => setJudulPertanyaan(e.target.value)}
                                                onBlur={() => simpleValidator.current.showMessageFor("judul pertanyaan")}
                                            />
                                            {simpleValidator.current.message("judul pertanyaan", judul, "required|min:5|max:50", { className: "text-danger" })}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label font-weight-bolder">Jawaban</label>
                                        <div className="col-sm-12">
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

                                    <div className="form-group">
                                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label font-weight-bolder">Kategori</label>
                                        <div className="col-sm-12">
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
                                                            row.jenis_kategori == "Faq" ?
                                                                <option key={row.id} value={row.id} selected={kategori_id === row.id ? true : false}>
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
                                                    className={`sliders round ${
                                                        pinned ? "text-white" : "pl-2"
                                                    }`}
                                                    >
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className='col-sm-5 col-form-label font-weight-bolder'>Set Tanggal Publish</label>
                                        <div className="col-sm-12">
                                            <div className="input-group">
                                            <DatePicker
                                                className="form-search-date form-control-sm form-control"
                                                selected={publishDate}
                                                onChange={(date) => setPublishDate(date)}
                                                selectsStart
                                                startDate={publishDate}
                                                // endDate={endDate}
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="Silahkan Isi Tanggal Publish"
                                                wrapperClassName="col-12 col-lg-12 col-xl-12"
                                                minDate={moment().toDate()}
                                            // minDate={addDays(new Date(), 20)}
                                            />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group row">
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
                                                    className={`sliders round ${
                                                        publish ? "text-white" : "pl-2"
                                                    }`}
                                                    >
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="form-group row">
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
                                    </div> */}

                                    {/* <div className="form-group row">
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
                                    </div> */}

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
                    :
                        null    
                }
                
            </div>
        </PageWrapper>
    )
}

export default EditFaq