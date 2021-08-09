import React, { useState, useEffect } from "react";

import Link from "next/link";
import Swal from "sweetalert2"
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
    getAllSubtanceQuestionBanks,
} from '../../../../../redux/actions/subvit/subtance-question-type.actions';
import { newSubtanceQuestionDetail, clearErrors } from '../../../../../redux/actions/subvit/subtance-question-detail.action'
import { NEW_SUBTANCE_QUESTION_DETAIL_RESET } from "../../../../../redux/types/subvit/subtance-question-detail.type";
import { useRouter } from "next/router";

import PageWrapper from "/components/wrapper/page.wrapper";
import StepInput from "/components/StepInput";
import LoadingPage from "../../../../LoadingPage"

const StepTwo = () => {
    const dispatch = useDispatch()
    const router = useRouter();

    let { page = 1, metode, id } = router.query;
    const { loading, error, success } = useSelector((state) => state.newSubtanceQuestionDetail);
    page = Number(page);

    const [question_file, setQuestionFile] = useState('')
    const [image_file, setImageFile] = useState('')
    const [typeSave, setTypeSave] = useState('lanjut')

    useEffect(() => {

        dispatch(getAllSubtanceQuestionBanks())
        // if (error) {
        //     dispatch(clearErrors())
        // }

        if (success) {
            if (typeSave === 'lanjut') {
                router.push({
                    pathname: `/subvit/substansi/tambah-step-3`,
                    query: { id }
                })
            } else if (typeSave === 'draft') {
                router.push({
                    pathname: `/subvit/substansi/tambah-step-2`,
                    query: { metode, id }
                });
            }
        }
    }, [dispatch, error, success, typeSave]);

    const saveDraft = () => {
        setTypeSave('draft')
        // router.push("/subvit/substansi");
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setTypeSave('lanjut')

    };

    const handleImportFile = async () => {
        const data = {
            subtance_question_bank_id: id,
            question_file
        }

        console.log(data)
        // await axios.post(process.env.END_POINT_API_SUBVIT + 'api/subtance-question-bank-details/import-file', data)
        //     .then((res) => {
        //         console.log(res)
        //     }).catch((err) => {
        //         console.log(err)
        //     })
    }

    const handleImportImage = () => {
        console.log(image_file)
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

                                <table className="table table-separate table-head-custom table-checkable">
                                    <thead style={{ background: "#F3F6F9" }}>
                                        <tr>
                                            <th className="text-center">No</th>
                                            <th>Akademi</th>
                                            <th>Tema</th>
                                            <th>Bank Soal</th>
                                            <th>Pelaksaan</th>
                                            <th>Kategori</th>
                                            <th>Status</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>

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
            </div>
        </PageWrapper>
    );
};

export default StepTwo;
