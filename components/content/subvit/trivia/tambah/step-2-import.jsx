import React, { useState, useEffect } from "react";

import Link from "next/link";
import Swal from "sweetalert2"
import Image from 'next/image'
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";

import {
    getAllTriviaQuestionDetail,
    deleteTriviaQuestionDetail,
    importFileTriviaQuestionDetail,
    importImagesTriviaQuestionDetail,
    clearErrors
} from '../../../../../redux/actions/subvit/trivia-question-detail.action'
import {
    IMPORT_FILE_TRIVIA_QUESTION_DETAIL_RESET,
    IMPORT_IMAGES_TRIVIA_QUESTION_DETAIL_RESET,
    DELETE_TRIVIA_QUESTION_DETAIL_RESET
} from "../../../../../redux/types/subvit/trivia-question-detail.type";
import { useRouter } from "next/router";

import PageWrapper from "/components/wrapper/page.wrapper";
import StepInput from "/components/StepInput";
import LoadingTable from "../../../../LoadingTable";
import ButtonAction from '../../../../ButtonAction'
import axios from "axios";

const StepTwo = () => {
    const dispatch = useDispatch()
    const router = useRouter();

    const { loading: loadingData, error: errorData, success: successData, trivia_question_detail } = useSelector((state) => state.allTriviaQuestionDetail)
    const { loading: loadingDelete, error: errorDelete, isDeleted } = useSelector((state) => state.deleteTriviaQuestionDetail)
    const { loading: loadingFile, error: errorFile, success: successFile } = useSelector((state) => state.importFileTriviaQuestionDetail);
    const { loading: loadingImages, error: errorImages, success: successImages } = useSelector((state) => state.importImagesTriviaQuestionDetail);
    let { page = 1, id } = router.query;
    page = Number(page);

    let error;
    if (errorFile) {
        error = errorFile
    } else if (errorImages) {
        error = errorImages
    } else if (errorData) {
        error = errorData
    } else if (errorDelete) {
        error = errorDelete
    }
    let loading = false;
    if (loadingFile) {
        loading = loadingFile
    } else if (loadingImages) {
        loading = loadingImages
    } else if (loadingData) {
        loading = loadingData
    } else if (loadingDelete) {
        loading = loadingData
    }

    const [question_file, setQuestionFile] = useState(null)
    const [image_file, setImageFile] = useState(null)
    const [typeSave, setTypeSave] = useState('lanjut')

    useEffect(() => {

        dispatch(getAllTriviaQuestionDetail(id))
        // if (error) {
        //     dispatch(clearErrors())
        // }
        if (successFile) {
            dispatch(getAllTriviaQuestionDetail(id))
        }

        if (successImages) {
            dispatch(getAllTriviaQuestionDetail(id))
        }

        if (isDeleted) {
            dispatch(getAllTriviaQuestionDetail(id))
        }

    }, [dispatch, id, successFile, successImages, isDeleted]);

    const saveDraft = () => {
        let valid = true

        if (!successImages) {
            valid = false
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Isi data gambar dengan benar !'
            })
        }
        if (!successFile) {
            valid = false
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Isi data soal dengan benar !'
            })
        }

        if (valid) {
            dispatch({
                type: IMPORT_FILE_TRIVIA_QUESTION_DETAIL_RESET
            })
            dispatch({
                type: IMPORT_IMAGES_TRIVIA_QUESTION_DETAIL_RESET
            })
            router.push({
                pathname: `/subvit/trivia/tambah/step-2-import`,
                query: { id }
            })
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        let valid = true

        if (!successImages) {
            valid = false
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Isi data gambar dengan benar !'
            })
        }
        if (!successFile) {
            valid = false
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Isi data soal dengan benar !'
            })
        }

        if (valid) {
            router.push({
                pathname: `/subvit/trivia/tambah/step-3`,
                query: { id }
            })
        }
    };

    const handleImportFile = async () => {
        const data = new FormData()
        data.append('trivia_question_bank_id', id)
        data.append('question_file', question_file, question_file.name)

        Swal.fire({
            title: "Perhatian",
            text: "Jika file anda mempunyai gambar harap import gambar terlebih dahulu, atau kamu tetap ingin melanjutkan !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya Lanjut !",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(importFileTriviaQuestionDetail(data))
            }
        });

    }

    const handleImportImage = async () => {
        const data = new FormData()
        data.append('trivia_question_bank_id', id)
        data.append('image_file', image_file, image_file.name)

        dispatch(importImagesTriviaQuestionDetail(data))
    }

    const handlePagination = (pageNumber) => {
        router.push(`${router.pathname}?id=${id}&page=${pageNumber}`)
        dispatch(getAllTriviaQuestionDetail(id, pageNumber))
    }

    const handleLimit = (val) => {
        router.push(`${router.pathname}?id=${id}&page=${1}&limit=${val}`)
        dispatch(getAllTriviaQuestionDetail(id, 1, val))
    }

    const handleDelete = (id) => {
        console.log(id)
        Swal.fire({
            title: "Apakah anda yakin ?",
            text: "Data ini tidak bisa dikembalikan !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya !",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteTriviaQuestionDetail(id));
            }
        });
    };

    const handleDownloadTemplate = async () => {
        await axios.get('http://dts-subvit-dev.majapahit.id/api/trivia-question-bank-details/template').then((res) => {
            window.location.href = res.data.data
        })
    }

    const handleResetDelete = () => {
        dispatch({
            type: DELETE_TRIVIA_QUESTION_DETAIL_RESET
        })
    }

    return (
        <PageWrapper>
            {error ? (
                <div
                    className="alert alert-custom alert-light-danger fade show mb-5"
                    role="alert"
                >
                    <div className="alert-icon">
                        <i className="flaticon-warning"></i>
                    </div>
                    <div className="alert-text">{error}</div>
                    <div className="alert-close">
                        <button
                            type="button"
                            className="close"
                            data-dismiss="alert"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">
                                <i className="ki ki-close"></i>
                            </span>
                        </button>
                    </div>
                </div>
            ) : (
                ""
            )}
            {isDeleted ?
                <div className="alert alert-custom alert-light-success fade show mb-5" role="alert">
                    <div className="alert-icon"><i className="flaticon2-checkmark"></i></div>
                    <div className="alert-text">Berhasil Menghapus Data</div>
                    <div className="alert-close">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={handleResetDelete} >
                            <span aria-hidden="true"><i className="ki ki-close"></i></span>
                        </button>
                    </div>
                </div>
                : ''
            }
            <div className="col-lg-12 order-1 order-xxl-2 px-0">
                <div className="card card-custom card-stretch gutter-b">
                    <StepInput step="2"></StepInput>
                    <div className="card-body">
                        <div className="mb-5">
                            <div className="row">
                                <div className="col">
                                    <p className="text-dark">Metode Import .csv/.xls</p>
                                </div>
                                <div className="col">
                                    <div className="float-right">
                                        <span className='mr-2'>Unduh Template Soal</span>
                                        <button type='button' onClick={handleDownloadTemplate} className='btn btn-outline-light btn-sm' style={{ border: '1px solid #DADADA' }}> <i className='flaticon-download'></i> Click to Download</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={onSubmit} id='form-upload'>
                            <div className="form-group row">
                                <div className="col-sm-8 col-md-8">
                                    <div className="custom-file">
                                        <span>Gambar Pertanyaan (Opsional)</span>
                                        <input type="file" className="custom-file-input" accept=".csv,.xlsx,.xls" name='question_image' onChange={e => setQuestionFile(e.target.files[0])} />
                                        <label className="custom-file-label" htmlFor="customFile">
                                            Choose file
                                        </label>
                                    </div>
                                    <span className="text-muted">Silahkan File berformat .csv / .xls</span>
                                </div>
                                <div className="col-md-4 col-sm-4">
                                    <button type='button' className='btn btn-light-primary' onClick={handleImportFile} disabled={successFile ? true : false}>Import</button>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-8 col-md-8">
                                    <div className="custom-file">
                                        <span>Gambar Pertanyaan (Opsional)</span>
                                        <input type="file" className="custom-file-input" accept=".zip" name='question_image' onChange={e => setImageFile(e.target.files[0])} />
                                        <label className="custom-file-label" htmlFor="customFile">
                                            Choose file
                                        </label>
                                    </div>
                                    <span className="text-muted">Silahkan File berformat .zip</span>
                                </div>
                                <div className="col-md-4 col-sm-4">
                                    <button type='button' className='btn btn-light-primary' onClick={handleImportImage} disabled={successImages ? true : false}>Import</button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-12 col-md-8 pt-0">
                                    <hr />
                                    <div className="float-right">
                                        <button
                                            className="btn btn-light-primary btn-sm mr-2"
                                            type='submit'
                                        >
                                            Simpan & Lanjut
                                        </button>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={saveDraft}
                                            type='button'
                                        >
                                            Simpan Draft
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <div className="table-page" style={{ marginTop: '20px' }}>
                            <div className="table-responsive">

                                <LoadingTable loading={loading} />

                                {loading === false ? (
                                    <table className="table table-separate table-head-custom table-checkable">
                                        <thead style={{ background: "#F3F6F9" }}>
                                            <tr>
                                                <th className="text-center">No</th>
                                                <th>ID Soal</th>
                                                <th>Soal</th>
                                                <th>Status</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {trivia_question_detail && trivia_question_detail.list_questions && trivia_question_detail.list_questions.length === 0 ? (
                                                <td className="align-middle text-center" colSpan={6}>
                                                    Data Masih Kosong
                                                </td>
                                            ) : (
                                                trivia_question_detail &&
                                                trivia_question_detail.list_questions &&
                                                trivia_question_detail.list_questions.map((question, i) => {
                                                    return (
                                                        <tr key={question.id}>
                                                            <td className="align-middle text-center">
                                                                <span className="badge badge-secondary text-muted">
                                                                    {i + 1 * (page * 5 || limit) - 4}
                                                                </span>
                                                            </td>
                                                            <td className="align-middle">
                                                                {question.trivia_question_bank_id}
                                                            </td>
                                                            <td className="align-middle">
                                                                {question.question}
                                                            </td>
                                                            <td className="align-middle">
                                                                {question.status === true ? (
                                                                    <span className="label label-inline label-light-success font-weight-bold">
                                                                        Publish
                                                                    </span>
                                                                ) : (
                                                                    <span className="label label-inline label-light-warning font-weight-bold">
                                                                        Draft
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className="align-middle">
                                                                <ButtonAction icon="write.svg" link={`edit-soal-trivia?id=${question.id}`} title='Edit' />
                                                                <button
                                                                    onClick={() => handleDelete(question.id)}
                                                                    className="btn mr-1"
                                                                    style={{
                                                                        background: "#F3F6F9",
                                                                        borderRadius: "6px",
                                                                    }}
                                                                    data-toggle="tooltip"
                                                                    data-placement="bottom"
                                                                    title="Hapus"
                                                                >
                                                                    <Image
                                                                        alt="button-action"
                                                                        src={`/assets/icon/trash.svg`}
                                                                        width={18}
                                                                        height={18}
                                                                    />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    ""
                                )}
                            </div>

                            <div className="row">
                                <div className="table-pagination">
                                    {trivia_question_detail &&
                                        <Pagination
                                            activePage={page}
                                            itemsCountPerPage={trivia_question_detail.perPage}
                                            totalItemsCount={trivia_question_detail.total}
                                            pageRangeDisplayed={3}
                                            onChange={handlePagination}
                                            nextPageText={">"}
                                            prevPageText={"<"}
                                            firstPageText={"<<"}
                                            lastPageText={">>"}
                                            itemClass="page-item"
                                            linkClass="page-link"
                                        />
                                    }
                                </div>

                                <div className="table-total ml-auto">
                                    {trivia_question_detail && trivia_question_detail.list_questions &&
                                        <div className="row">
                                            <div className="col-4 mr-0 p-0">
                                                <select
                                                    className="form-control"
                                                    id="exampleFormControlSelect2"
                                                    style={{
                                                        width: "65px",
                                                        background: "#F3F6F9",
                                                        borderColor: "#F3F6F9",
                                                        color: "#9E9E9E",
                                                    }}
                                                    onChange={e => handleLimit(e.target.value)}
                                                    onBlur={e => handleLimit(e.target.value)}
                                                >
                                                    <option value='5'>5</option>
                                                    <option value='10'>10</option>
                                                    <option value='15'>15</option>
                                                    <option value='20'>20</option>
                                                    <option value='30'>30</option>
                                                </select>
                                            </div>
                                            <div className="col-8 my-auto">
                                                <p
                                                    className="align-middle mt-3"
                                                    style={{ color: "#B5B5C3" }}
                                                >
                                                    Total Data {trivia_question_detail.total}
                                                </p>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </PageWrapper >
    );
};

export default StepTwo;
