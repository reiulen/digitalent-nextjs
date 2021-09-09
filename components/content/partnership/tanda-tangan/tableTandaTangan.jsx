import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../wrapper/page.wrapper";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchSignature,
  setPage,
  setLimit,
  deleteTandaTangan,
  searchByKey,
} from "../../../../redux/actions/partnership/tandaTangan.actions";
import LoadingTable from "../../../LoadingTable";

import IconAdd from "../../../assets/icon/Add";
import IconSearch from "../../../assets/icon/Search";
import IconPencil from "../../../assets/icon/Pencil";
import IconDelete from "../../../assets/icon/Delete";

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
            <i className="flaticon2-checkmark" style={{ color: "#1BC5BD" }}></i>
          </div>
          <div className="alert-text" style={{ color: "#1BC5BD" }}>
            Berhasil menyimpan data
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
            <i className="flaticon2-checkmark" style={{ color: "#c51b1b" }}></i>
          </div>
          <div className="alert-text" style={{ color: "#c51b1b" }}>
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
      {update ? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
          style={{ backgroundColor: "#C9F7F5" }}
        >
          <div className="alert-icon">
            <i className="flaticon2-checkmark" style={{ color: "#1BC5BD" }}></i>
          </div>
          <div className="alert-text" style={{ color: "#1BC5BD" }}>
            Berhasil mengupdate data
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
            <h3
              className="card-title font-weight-bolder text-dark"
              style={{ fontSize: "24px" }}
            >
              Tanda Tangan Digital
            </h3>
            <div className="card-toolbar">
              <Link href="/partnership/tanda-tangan/tambah">
                <a className="btn btn-rounded-full bg-blue-primary text-white">
                  <IconAdd  className="mr-3" width="14" height="14" />
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
                    <div className="row w-100 my-5">
                      <div className="col-12 col-sm-6">
                        <div className="position-relative overflow-hidden w-100">
                          <IconSearch
                            style={{ left: "10" }}
                            className="left-center-absolute"
                          />
                          <input
                            id="kt_datatable_search_query"
                            type="text"
                            className="form-control pl-10"
                            placeholder="Ketik disini untuk Pencarian..."
                            onChange={(e) => setKeyWord(e.target.value)}
                          />
                          <button
                            type="submit"
                            className="btn bg-blue-primary text-white right-center-absolute"
                            style={{
                              borderTopLeftRadius: "0",
                              borderBottomLeftRadius: "0",
                            }}
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
                {allTandaTangan.status === "process" ? (
                  <LoadingTable />
                ) : (
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
                      {allTandaTangan.tanda_tangan.data &&
                      allTandaTangan.tanda_tangan.data.list_signatures
                        .length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            <h4>Data tidak ditemukan</h4>
                          </td>
                        </tr>
                      ) : (
                        allTandaTangan.tanda_tangan.data &&
                        allTandaTangan.tanda_tangan.data.list_signatures.map(
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
                                    <button
                                      className="btn btn-link-action bg-blue-secondary mr-3"
                                      onClick={() =>
                                        router.push(
                                          `/partnership/tanda-tangan/${items.id}`
                                        )
                                      }
                                    >
                                      <IconPencil width="16" height="16" />
                                    </button>
                                    <button
                                      className="btn btn-link-action bg-blue-secondary"
                                      onClick={() => handleDelete(items.id)}
                                    >
                                      <IconDelete width="16" height="16" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          }
                        )
                      )}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="row">
                <div className="table-pagination">
                  <Pagination
                    activePage={allTandaTangan.page}
                    itemsCountPerPage={
                      allTandaTangan?.tanda_tangan?.data?.perPage
                    }
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
                        onChange={(e) => dispatch(setLimit(e.target.value))}
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
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Table;
