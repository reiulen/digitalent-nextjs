import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";
import LoadingTable from "../../../LoadingTable";

import PageWrapper from "../../../wrapper/page.wrapper";
import ButtonAction from "../../../ButtonAction";
import CardPage from "../../../CardPage";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllSubtanceQuestionBanks,
  clearErrors,
} from "/redux/actions/subvit/subtance.actions";

const ReportTrivia = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, trivia } = useSelector((state) => state.allReportTriviaQuestionBanks);

  let { page = 1, id } = router.query;
  page = Number(page);

  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState(null)

  // useEffect(() => {
  // }, [dispatch]);

  const handlePagination = (pageNumber) => {
    if (limit != null) {
      router.push(`${router.pathname}?id=${id}&page=${pageNumber}&limit=${limit}`)
    } else if (search != '' && limit != null) {
      router.push(`${router.pathname}?id=${id}&page=${pageNumber}&limit=${limit}&keyword=${search}`)
    } else if (search != '') {
      router.push(`${router.pathname}?id=${id}&page=${pageNumber}&keyword=${search}`)
    } else {
      router.push(`${router.pathname}?id=${id}&page=${pageNumber}`)
    }
  }

  const handleSearch = () => {
    if (limit != null) {
      router.push(`${router.pathname}?id=${id}&page=1&keyword=${search}&limit=${limit}`)
    } else {
      router.push(`${router.pathname}?id=${id}&page=1&keyword=${search}`)
    }
  }

  const handleLimit = (val) => {
    setLimit(val)
  }

  const handleExportReport = async () => {
    console.log('berhasil')
    await axios.get(`http://dts-subvit-dev.majapahit.id/api/trivia-question-banks/report/export/${id}`).then((res) => {
      window.location.href = res.data.data
    })
  }

  return (
    <PageWrapper>handlePagination
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

      <div className="col-lg-12 col-md-12">
        <div className="row">
          <CardPage
            background="bg-light-info"
            icon="orang-tambah-purple.svg"
            color="#8A50FC"
            value="90"
            titleValue=""
            title="Total Peserta"
          />
          <CardPage
            background="bg-light-success"
            icon="done-circle.svg"
            color="#0BB783"
            value="64"
            titleValue=""
            title="Sudah Mengerjakan"
          />
          <CardPage
            background="bg-light-warning"
            icon="book-open.svg"
            color="#634100"
            value="64"
            titleValue=""
            title="Sedang Mengerjakan"
          />
          <CardPage
            background="bg-accent-info"
            icon="mail-purple.svg"
            color="#663259"
            value="64"
            titleValue=""
            title="Belum Mengerjakan"
          />
        </div>
      </div>

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b pt-3">
          <div className="card-header border-0 align-items-center row">
            <div className="col-lg-10 col-xl-10">
              <h3 className="card-title font-weight-bolder text-dark">
                Report Trivia
              </h3>
              <p className="text-muted">FGA - Cloud Computing</p>
            </div>
            <div className="col-lg-2 col-xl-2">
              <button className="btn btn-sm btn-light-success px-6 font-weight-bold btn-block " onClick={handleExportReport}>
                Export .CSV
              </button>
            </div>
            <div className="card-toolbar"></div>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter mb-5">
              <div className="row align-items-center">
                <div className="col-lg-10 col-xl-10">
                  <div className="input-icon">
                    <input style={{ background: '#F3F6F9', border: 'none' }} type="text" className="form-control" placeholder="Search..." id="kt_datatable_search_query" autoComplete='off' onChange={e => setSearch(e.target.value)} />
                    <span>
                      <i className="flaticon2-search-1 text-muted"></i>
                    </span>
                  </div>
                </div>

                <div className="col-lg-2 col-xl-2">
                  <button className="btn btn-sm btn-light-primary px-6 font-weight-bold btn-block" onClick={handleSearch}>
                    Cari
                  </button>
                </div>
              </div>

            </div>

            <div className="table-page">
              <div className="table-responsive">
                <LoadingTable loading={loading} />

                {loading === false ? (
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-center">No</th>
                        <th>Peserta Test</th>
                        <th>Pelatihan</th>
                        <th>Nilai</th>
                        <th>Total Pengerjaan</th>
                        <th>Jawaban</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        trivia && trivia.reports.length === 0 ?
                          (
                            <tr>
                              <td className='text-center' colSpan={7}>Data Masih Kosong</td>
                            </tr>
                          ) :
                          trivia && trivia.reports.map((row, i) => {
                            return <tr key={row.id}>
                              <td className='align-middle text-center'>
                                <p className="badge badge-secondary h6">{i + 1 * (page * 5 || limit) - 4}</p>
                              </td>
                              <td className='align-middle'>
                                <div>
                                  <p className="my-0 h6">{row.name}</p>
                                  <p className="my-0">{row.email}</p>
                                  <p className="my-0">{row.no_telp}</p>
                                </div>
                              </td>
                              <td className='align-middle'><p className="h6">{row.pelatihan}</p></td>
                              <td className='align-middle'><p className="h6">{row.nilai}</p></td>
                              <td className='align-middle'>
                                <div>
                                  <p className="my-0 h6">{row.total_workmanship_date}</p>
                                  <p className="my-0">{row.total_workmanship_time}</p>
                                </div>
                              </td>
                              <td className='align-middle'>
                                <div>
                                  <p className="my-0">Benar: {row.jawaban_benar} Jawaban</p>
                                  <p className="my-0">Salah: {row.jawaban_salah} Jawaban</p>
                                  <p className="my-0">Jumlah: {row.jumlah_soal} Jawaban</p>
                                </div>
                              </td>
                              <td className='align-middle'><p className="badge badge-success">{row.status}</p></td>
                            </tr>
                          })
                      }

                    </tbody>
                  </table>
                ) : (
                  ""
                )}
              </div>

              <div className="row">
                {trivia && trivia.total > 5 && (
                  <div className="table-pagination">
                    <Pagination
                      activePage={page}
                      itemsCountPerPage={trivia.perPage}
                      totalItemsCount={trivia.total}
                      pageRangeDisplayed={3}
                      onChange={handlePagination}
                      nextPageText={">"}
                      prevPageText={"<"}
                      firstPageText={"<<"}
                      lastPageText={">>"}
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  </div>
                )}
                {trivia && trivia.total > 4 ? (
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
                          onChange={e => handleLimit(e.target.value)}
                          onBlur={e => handleLimit(e.target.value)}
                        >
                          <option value='5'>5</option>
                          <option value='10'>10</option>
                          <option value='15'>15</option>
                          <option value='20'>20</option>
                        </select>
                      </div>
                      <div className="col-8 my-auto">
                        <p
                          className="align-middle mt-3"
                          style={{ color: "#B5B5C3" }}
                        >
                          Total Data {trivia.total}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ReportTrivia;
