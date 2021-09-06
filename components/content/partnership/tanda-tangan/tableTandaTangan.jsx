import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../wrapper/page.wrapper";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchSignature,
  reloadTable,
  setPage,
  setLimit,
  deleteTandaTangan,
  searchByKey
} from "../../../../redux/actions/partnership/tandaTangan.actions";

const Table = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { success, update } = router.query;

  const allTandaTangan = useSelector((state) => state.allTandaTangan);

  const [successDelete, setSuccessDelete] = useState(false);
  const [keyWord, setKeyWord] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchByKey(keyWord));
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah anda yakin ingin menghapus data tanda tangan ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya !",
      dismissOnDestroy: false,
    }).then(async (result) => {
      if (result.value) {
        dispatch(deleteTandaTangan(id));
        setSuccessDelete(true);
        router.replace(`/partnership/tanda-tangan`);
      }
    });
  };
  const onNewReset = () => {
    setSuccessDelete(false);
    router.replace(`/partnership/tanda-tangan`);
  };

  useEffect(() => {
    dispatch(fetchSignature());
  }, [
    dispatch,
    allTandaTangan.keyword,
    allTandaTangan.status_reload,
    allTandaTangan.page,
    allTandaTangan.limit,
  ]);

  return (
    <PageWrapper>
      {success ? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
          style={{ backgroundColor: "#C9F7F5" }}
        >
          <div className="alert-icon">
            <i
              className="flaticon2-checkmark"
              style={{ color: "#1BC5BD" }}
            ></i>
          </div>
          <div
            className="alert-text"
            style={{ color: "#1BC5BD" }}
          >Berhasil menyimpan data
          </div>
          <div className="alert-close">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => onNewReset()}
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
      {successDelete ? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
          style={{ backgroundColor: "#f7c9c9" }}
        >
          <div className="alert-icon">
            <i
              className="flaticon2-checkmark"
              style={{ color: "#c51b1b" }}
            ></i>
          </div>
          <div
            className="alert-text"
            style={{ color: "#c51b1b" }}
          >
            Berhasil menghapus data Data
          </div>
          <div className="alert-close">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => onNewReset()}
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
      {update ?(
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
          style={{ backgroundColor: "#C9F7F5" }}
        >
          <div className="alert-icon">
            <i
              className="flaticon2-checkmark"
              style={{ color: "#1BC5BD" }}
            ></i>
          </div>
          <div
            className="alert-text"
            style={{ color: "#1BC5BD" }}
          >Berhasil mengupdate data
          </div>
          <div className="alert-close">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => onNewReset()}
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
            <h3 className="card-title font-weight-bolder text-dark" style={{ fontSize: "24px" }}>
              Tanda Tangan Digital
            </h3>
            <div className="card-toolbar">
              {/* <Link href="/partnership/tanda-tangan/tambah">
                <a className="btn btn-primary px-6 font-weight-bold btn-block ">
                  Tambah Tanda Tangan
                </a>
              </Link> */}
              <Link href="/partnership/tanda-tangan/tambah">
              <a className="btn btn-rounded-full bg-blue-primary text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  className="mr-3"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
                    fill="rgba(255,255,255,1)"
                  />
                </svg>
                Tambah Tanda Tangan
              </a>
            </Link>
            </div>
          </div>

          <div className="card-body pt-0">
            <form onSubmit={handleSubmit}>
              <div className="table-filter">
                <div className="row align-items-center">
                  <div className="col-lg-10 col-xl-10">
                    {/* <div className="input-icon">
                      <input
                        style={{ background: "#F3F6F9", border: "none" }}
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        id="kt_datatable_search_query"
                        onChange={(e) => setKeyWord(e.target.value)}
                      />
                      <span>
                        <i className="flaticon2-search-1 text-muted"></i>
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-2 col-xl-2">
                    <button
                      type="submit"
                      className="btn btn-light-primary btn-block"
                    >
                      Cari
                    </button> */}
                    <div className="row w-100 my-5"> 
<div className="col-12 col-sm-6">

                    <div
        className="position-relative overflow-hidden w-100"
      >
        <svg
          className="left-center-absolute"
          style={{ left: "10" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16"
          height="16"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"
            fill="#E4E6EF"
          />
        </svg>
        <input
        id="kt_datatable_search_query"
          type="text"
          className="form-control pl-10"
          placeholder="Ketik disini untuk Pencarian..."
          id="kt_datatable_search_query"
                        onChange={(e) => setKeyWord(e.target.value)}
        />
        <button
        type="submit"
          className="btn bg-blue-primary text-white right-center-absolute"
          style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}
        >
          Cari
        </button>
      </div>
      </div>
      </div>
                  </div>
                </div>
              </div>
            </form>

            <div className="table-page mt-5">
              <div className="table-responsive">
                <table className="table table-separate table-head-custom table-checkable">
                  <thead style={{ background: "#F3F6F9" }}>
                    <tr>
                      <th className="text-left">No</th>
                      <th className="text-left align-middle">Nama</th>
                      <th className="text-left align-middle">Jabatan</th>
                      <th className="text-left align-middle">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allTandaTangan.status === "success"
                      ? allTandaTangan.tanda_tangan.length === 0
                        ? "Tidak ada data"
                        : allTandaTangan.tanda_tangan.data.list_signatures.map(
                            (items, index) => {
                              return (
                                <tr key={index}>
                                  <td className="align-middle text-left">
                                    <button
                                      className="btn"
                                      style={{
                                        background: "#F3F6F9",
                                        borderRadius: "6px",
                                      }}
                                    >
                                      {allTandaTangan.page === 1
                                        ? index + 1
                                        : (allTandaTangan.page - 1) *
                                            allTandaTangan.limit +
                                          (index + 1)}
                                    </button>
                                  </td>
                                  <td className="align-middle text-left">
                                    {items.name}
                                  </td>
                                  <td className="align-middle text-left">
                                    {items.position}
                                  </td>
                                  <td className="align-middle text-left">
                                    <div className="d-flex align-items-center">
                                    {/* <button
                                      className="btn ml-3 position-relative btn-delete"
                                      style={{
                                        background: "#F3F6F9",
                                        borderRadius: "6px",
                                        padding: "8px 10px 3px 10px",
                                      }}
                                      onClick={() =>
                                        router.push(
                                          `/partnership/tanda-tangan/${items.id}`
                                        )
                                      }
                                    >
                                      <Image
                                        width="14"
                                        height="14"
                                        src={`/assets/icon/write.svg`}
                                        alt="write"
                                      />
                                      <div className="text-hover-show-hapus">
                                        Edit
                                      </div>
                                    </button> */}
                                    <button
                                        className="btn btn-link-action bg-blue-secondary mr-3"
                                        onClick={() =>
                                        router.push(
                                          `/partnership/tanda-tangan/${items.id}`
                                        )
                                      }
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 24 24"
                                          width="14"
                                          height="12"
                                        >
                                          <path fill="none" d="M0 0h24v24H0z" />
                                          <path
                                            d="M12.9 6.858l4.242 4.243L7.242 21H3v-4.243l9.9-9.9zm1.414-1.414l2.121-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z"
                                            fill="rgba(255,255,255,1)"
                                          />
                                        </svg>
                                      </button>
                                    {/* <button
                                      style={{
                                        background: "#F3F6F9",
                                        borderRadius: "6px",
                                        padding: "8px 10px 3px 10px",
                                      }}
                                      className="ml-3 btn position-relative btn-delete"
                                      onClick={() => handleDelete(items.id)}
                                    >
                                      <Image
                                        width="14"
                                        height="14"
                                        src={`/assets/icon/trash.svg`}
                                        alt="trash"
                                      />
                                      <div className="text-hover-show-hapus">
                                        Hapus
                                      </div>
                                    </button> */}
                                    <button
                                        className="btn btn-link-action bg-blue-secondary"
                                        onClick={() => handleDelete(items.id)}
                                      >
                                        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="14"
          height="12"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"
            fill="rgba(255,255,255,1)"
          />
        </svg>
                                      </button>
                                      </div>
                                  </td>
                                </tr>
                              );
                            }
                          )
                      : ""}
                  </tbody>
                </table>
              </div>

              <div className="row">
                <div className="table-pagination">
                  <Pagination
                    activePage={allTandaTangan.page}
                    itemsCountPerPage={allTandaTangan?.tanda_tangan?.data?.perPage}
                    totalItemsCount={allTandaTangan?.tanda_tangan?.data?.total}
                    pageRangeDisplayed={3}
                    onChange={(page) => dispatch(setPage(page))}
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
                        onChange={(e) =>
                          dispatch(setLimit(e.target.value))
                        }
                      >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                      </select>
                    </div>
                    <div className="col-8 my-auto">
                      <p
                        className="align-middle mt-3 ml-3"
                        style={{ color: "#B5B5C3" }}
                      >
                        Total Data{" "}
                        {allTandaTangan.tanda_tangan.data &&
                          allTandaTangan.tanda_tangan.data.total}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="row">
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
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Table;
