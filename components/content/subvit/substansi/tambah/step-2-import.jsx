import React, { useState, useEffect } from "react";

import Link from "next/link";
import Swal from "sweetalert2"
import Image from 'next/image'
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";

import {
    importFileSubtanceQuestionDetail,
    importImagesSubtanceQuestionDetail,
    clearErrors
} from '../../../../../redux/actions/subvit/subtance-question-detail.action'
import {
    IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_RESET,
    IMPORT_IMAGES_SUBTANCE_QUESTION_DETAIL_RESET
} from "../../../../../redux/types/subvit/subtance-question-detail.type";
import { useRouter } from "next/router";

import PageWrapper from "/components/wrapper/page.wrapper";
import StepInput from "/components/StepInput";
import LoadingPage from "../../../../LoadingPage"
import LoadingTable from "../../../../LoadingTable";
import ButtonAction from '../../../../ButtonAction'

const StepTwo = () => {
    const dispatch = useDispatch()
    const router = useRouter();

    const { loading: loadingFile, error: errorFile, success: successFile, subtance_question_file } = useSelector((state) => state.importFileSubtanceQuestionDetail);
    const { loading: loadingImages, error: errorImages, success: successImages, subtance_question_images } = useSelector((state) => state.importImagesSubtanceQuestionDetail);
    let { page = 1, metode, id } = router.query;
    page = Number(page);

    let error;
    if (errorFile) {
        error = errorFile
    } else if (errorImages) {
        error = errorImages
    }
    let loading = false;
    if (loadingFile) {
        loading = loadingFile
    } else if (loadingImages) {
        loading = loadingImages
    }
    let questionsArrModel;

    const [question_file, setQuestionFile] = useState(null)
    const [image_file, setImageFile] = useState(null)
    const [bankSoal, setBankSoal] = useState([])
    const [questionsArr, setQuestionArr] = useState([])
    const [typeSave, setTypeSave] = useState('lanjut')

    useEffect(() => {

        // if (error) {
        //     dispatch(clearErrors())
        // }

        if (successFile) {
            questionsArrModel = bankSoal.concat(subtance_question_file.questions)
            setQuestionArr(questionsArrModel)
        }

    }, [dispatch, successFile, questionsArrModel]);

    const saveDraft = () => {
        setTypeSave('draft')
        // router.push("/subvit/substansi");
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(questionsArr.length)
        setTypeSave('lanjut')

    };

    const handleImportFile = async () => {
        const data = new FormData()
        data.append('subtance_question_bank_id', id)
        data.append('question_file', question_file, question_file.name)

        dispatch(importFileSubtanceQuestionDetail(data))
    }

    const handleImportImage = async () => {
        const data = new FormData()
        data.append('subtance_question_bank_id', id)
        data.append('image_file', image_file, image_file.name)

        dispatch(importImagesSubtanceQuestionDetail(data))
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
            <div className="col-lg-12 order-1 order-xxl-2 px-0">
                {
                    loading ?
                        <LoadingPage loading={loading} />
                        : ''
                }
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
                                        <button className='btn btn-outline-light btn-sm' style={{ border: '1px solid #DADADA' }}> <i className='flaticon-download'></i> Click to Download</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={onSubmit}>
                            <div className="form-group row">
                                <div className="col-sm-8 col-md-8">
                                    <div class="custom-file">
                                        <span>Gambar Pertanyaan (Opsional)</span>
                                        <input type="file" class="custom-file-input" accept=".csv,.xlsx,.xls" name='question_image' onChange={e => setQuestionFile(e.target.files[0])} />
                                        <label class="custom-file-label" for="customFile">
                                            Choose file
                                        </label>
                                    </div>
                                    <span className="text-muted">Silahkan File berformat .csv / .xls</span>
                                </div>
                                <div className="col-md-4 col-sm-4">
                                    <button type='button' className='btn btn-light-primary' onClick={handleImportFile}>Import</button>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-8 col-md-8">
                                    <div class="custom-file">
                                        <span>Gambar Pertanyaan (Opsional)</span>
                                        <input type="file" class="custom-file-input" accept=".zip" name='question_image' onChange={e => setImageFile(e.target.files[0])} />
                                        <label class="custom-file-label" for="customFile">
                                            Choose file
                                        </label>
                                    </div>
                                    <span className="text-muted">Silahkan File berformat .zip</span>
                                </div>
                                <div className="col-md-4 col-sm-4">
                                    <button className='btn btn-light-primary' onClick={handleImportImage}>Import</button>
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
                                                <th>Kategori</th>
                                                <th>Bobot</th>
                                                <th>Status</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {questionsArr.length === 0 ? (
                                                <td className="align-middle text-center" colSpan={8}>
                                                    Data Masih Kosong
                                                </td>
                                            ) : (
                                                questionsArr &&
                                                questionsArr.map((question, i) => {
                                                    return (
                                                        <tr key={question.id}>
                                                            <td className="align-middle text-center">
                                                                <span className="badge badge-secondary text-muted">
                                                                    {i + 1 * (page * 5 || limit) - 4}
                                                                </span>
                                                            </td>
                                                            <td className="align-middle">
                                                                {question.subtance_question_bank_id}
                                                            </td>
                                                            <td className="align-middle">
                                                                {question.question}
                                                            </td>
                                                            <td className="align-middle">
                                                                {question.question_type_id}
                                                            </td>
                                                            <td className="align-middle">
                                                                {question.question_type_id}
                                                            </td>
                                                            <td className="align-middle">
                                                                {question.status === true ? (
                                                                    <span class="label label-inline label-light-success font-weight-bold">
                                                                        Publish
                                                                    </span>
                                                                ) : (
                                                                    <span class="label label-inline label-light-warning font-weight-bold">
                                                                        Draft
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className="align-middle">
                                                                <ButtonAction icon="write.svg" />
                                                                <button
                                                                    //   onClick={() => handleDelete(artikel.id)}
                                                                    className="btn mr-1"
                                                                    style={{
                                                                        background: "#F3F6F9",
                                                                        borderRadius: "6px",
                                                                    }}
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
                                    <Pagination
                                        activePage={page}
                                        itemsCountPerPage={5}
                                        totalItemsCount={10}
                                        pageRangeDisplayed={3}
                                        // onChange={handlePagination}
                                        nextPageText={">"}
                                        prevPageText={"<"}
                                        firstPageText={"<<"}
                                        lastPageText={">>"}
                                        itemClass="page-item"
                                        linkClass="page-link"
                                    />
                                </div>

                                <div className="table-total ml-auto">
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
                                            >
                                                <option>5</option>
                                                <option>10</option>
                                                <option>30</option>
                                                <option>40</option>
                                                <option>50</option>
                                            </select>
                                        </div>
                                        <div className="col-8 my-auto">
                                            <p
                                                className="align-middle mt-3"
                                                style={{ color: "#B5B5C3" }}
                                            >
                                                Total Data
                                            </p>
                                        </div>
                                    </div>
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
