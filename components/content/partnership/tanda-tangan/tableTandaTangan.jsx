import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import Pagination from "react-js-pagination";
import DatePicker from "react-datepicker";

import PageWrapper from "../../../wrapper/page.wrapper";
import CardPage from "../../../CardPage";
import ButtonAction from "../../../ButtonAction";
import LoadingTable from "../../../LoadingTable";

import { useDispatch, useSelector } from "react-redux";

import {
  deleteTandaTangan,
  clearErrors,
} from "../../../../redux/actions/partnership/tandaTangan.actions";

import { DELETE_TANDA_TANGAN_RESET } from "../../../../redux/types/partnership/tandaTangan.type";

const Table = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    loading: allLoading,
    error,
    tandaTangan,
  } = useSelector((state) => state.allTandaTangan);

  const {
    loading: deleteLoading,
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.deleteTandaTangan);
  // const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(null);
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);

  let loading = false;
  // let { page = 1, keyword, success } = router.query;
  // if (allLoading) {
  //   loading = allLoading;
  // } else if (deleteLoading) {
  //   loading = deleteLoading;
  // }
  // page = Number(page);

  useEffect(() => {
    // if (limit) {
    //   router.push(`${router.pathname}?page=1&limit=${limit}`);
    // }
    if (isDeleted) {
      Swal.fire("Berhasil ", "Data berhasil dihapus.", "success").then(
        (result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        }
      );
      dispatch({
        type: DELETE_TANDA_TANGAN_RESET,
      });
    }
  }, [limit, isDeleted]);

  // const onNewReset = () => {
  //   router.replace("/partnership/tanda-tangan", undefined, { shallow: true });
  // };

  const handleDelete = (id) => {
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
        dispatch(deleteTandaTangan(id));
      }
    });
  };

  // const handlePagination = (pageNumber) => {
  //   if (limit != null) {
  //     router.push(`${router.pathname}?page=${pageNumber}&limit=${limit}`);
  //   } else {
  //     router.push(`${router.pathname}?page=${pageNumber}`);
  //   }
  // };

  // const handleSearch = () => {
  //   if (limit != null) {
  //     router.push(`${router.pathname}?page=1&keyword=${search}&limit=${limit}`);
  //   } else {
  //     router.push(`${router.pathname}?page=1&keyword=${search}`);
  //   }
  // };

  // const handleSearchDate = () => {
  //   router.push(
  //     `${router.pathname}?page=1&startdate=${moment(startDate).format(
  //       "YYYY-MM-DD"
  //     )}&enddate=${moment(endDate).format("YYYY-MM-DD")}`
  //   );
  // };

  // const handleLimit = (val) => {
  //   setLimit(val);
  // };

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
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              Tanda Tangan Digital
            </h3>
            <div className="card-toolbar">
              <Link href="/partnership/tanda-tangan/tambah">
                <a className="btn btn-primary px-6 font-weight-bold btn-block ">
                  Tambah Tanda Tangan
                </a>
              </Link>
            </div>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-12 col-xl-12">
                  <div className="input-icon">
                    <input
                      style={{ background: "#F3F6F9", border: "none" }}
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                      id="kt_datatable_search_query"
                    />
                    <span>
                      <i className="flaticon2-search-1 text-muted"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="table-page mt-5">
              <div className="table-responsive">
                <table className="table table-separate table-head-custom table-checkable">
                  <thead style={{ background: "#F3F6F9" }}>
                    <tr>
                      <th className="text-center align-middle">No</th>
                      <th className="text-center align-middle">Nama</th>
                      <th className="text-center align-middle">Jabatan</th>
                      <th className="text-center align-middle">Status</th>
                      <th className="text-center align-middle">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tandaTangan &&
                      tandaTangan.list_signatures.map((data, id) => {
                        return (
                          <>
                            <tr>
                              <td className="text-center align-middle">
                                <button
                                  className="btn"
                                  style={{
                                    background: "#F3F6F9",
                                    borderRadius: "6px",
                                  }}
                                >
                                  {id + 1}
                                </button>
                              </td>
                              <td className="text-center align-middle">
                                {data.name}
                              </td>
                              <td className="text-center align-middle">
                                {data.position}
                              </td>
                              <td className="text-center align-middle">
                                <select name="" id="" className="form-control">
                                  <option value="1">Aktif</option>
                                  <option value="2">No Aktif</option>
                                </select>
                              </td>
                              <td className="text-center align-middle">
                                <ButtonAction
                                  icon="write.svg"
                                  link="tanda-tangan/edit"
                                />
                                {/* <ButtonAction icon="setting.svg" /> */}
                                <button
                                  onClick={() => handleDelete(data.id)}
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
                          </>
                        );
                      })}
                  </tbody>
                </table>
              </div>

              <div className="row">
                <div className="table-pagination">
                  <Pagination
                    activePage={5}
                    itemsCountPerPage={2}
                    totalItemsCount={5}
                    pageRangeDisplayed={3}
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
                        Total Data 120
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

export default Table;
