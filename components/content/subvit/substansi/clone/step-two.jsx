import React, { useState, useEffect } from "react";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";

import {
  getAllSubtanceQuestionDetail,
  clearErrors
} from '../../../../../redux/actions/subvit/subtance-question-detail.action'
import {
  DELETE_SUBTANCE_QUESTION_DETAIL_RESET
} from "../../../../../redux/types/subvit/subtance-question-detail.type";

import PageWrapper from "/components/wrapper/page.wrapper";
import StepInput from "/components/StepInputClone";
import LoadingTable from "../../../../LoadingTable";
import ButtonAction from "../../../../ButtonAction";

const StepTwo = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, success: successData, subtance_question_detail } = useSelector((state) => state.allSubtanceQuestionDetail)
  let { page = 1, id } = router.query;
  page = Number(page);

  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(getAllSubtanceQuestionDetail(id))
  }, [dispatch, id]);

  const saveDraft = () => {
    router.push({
      pathname: `/subvit/substansi/clone/step-3`,
      query: { id }
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();

  };


  const handleSearch = () => {
    if (limit != null) {
      router.push(`${router.pathname}?page=1&keyword=${search}&limit=${limit}`)
    } else {
      router.push(`${router.pathname}?page=1&keyword=${search}`)
    }
  }

  const handlePagination = (pageNumber) => {
    router.push(`${router.pathname}?id=${id}&page=${pageNumber}`)
    dispatch(getAllSubtanceQuestionDetail(id, pageNumber))
  }

  const handleLimit = (val) => {
    router.push(`${router.pathname}?id=${id}&page=${1}&limit=${val}`)
    dispatch(getAllSubtanceQuestionDetail(id, 1, val))
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
        <div className="card card-custom card-stretch gutter-b">
          <StepInput step="2"></StepInput>
          <div className="card-body">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-5 col-xl-5">
                  <div className="input-icon">
                    <input
                      style={{ background: "#F3F6F9", border: "none" }}
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                      id="kt_datatable_search_query"
                      onChange={e => setSearch(e.target.value)}
                      autoComplete="off"
                    />
                    <span>
                      <i className="flaticon2-search-1 text-muted"></i>
                    </span>
                  </div>
                </div>

                <div className="col-lg-1 col-xl-1">
                  <button className='btn btn-light-primary btn-block' onClick={handleSearch}>Cari</button>
                </div>

                <div className="col-lg-2 col-xl-2 ml-auto">
                  <button className='btn btn-light-info btn-block' onClick={handleSearch}><i className="flaticon2-notepad"></i>Tambah Soal</button>
                </div>

              </div>
            </div>
            <div className="table-page mt-5">
              <div className="table-responsive">

                <LoadingTable loading={loading} />

                {loading === false ? (
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-center align-middle">
                          <input type="checkbox" aria-label="Checkbox for following text input" />
                        </th>
                        <th >No</th>
                        <th>ID Soal</th>
                        <th>Soal</th>
                        <th>Kategori</th>
                        <th>Bobot</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subtance_question_detail && subtance_question_detail.list_questions && subtance_question_detail.list_questions.length === 0 ? (
                        <td className="align-middle text-center" colSpan={8}>
                          Data Masih Kosong
                        </td>
                      ) : (
                        subtance_question_detail &&
                        subtance_question_detail.list_questions &&
                        subtance_question_detail.list_questions.map((question, i) => {
                          return (
                            <tr key={question.id}>
                              <td className="align-middle text-center">
                                <input type="checkbox" aria-label="Checkbox for following text input" />
                              </td>
                              <td className="align-middle">
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
                                {question.type.name}
                              </td>
                              <td className="align-middle">
                                {question.type.value} poin
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
                  {subtance_question_detail &&
                    <Pagination
                      activePage={page}
                      itemsCountPerPage={subtance_question_detail.perPage}
                      totalItemsCount={subtance_question_detail.total}
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
                  {subtance_question_detail && subtance_question_detail.list_questions &&
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
                          Total Data {subtance_question_detail.total}
                        </p>
                      </div>
                    </div>
                  }
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-8 pt-0">
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
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default StepTwo;
