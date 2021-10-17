import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../../wrapper/page.wrapper";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchSignature,
  setPage,
  setLimit,
  deleteTandaTangan,
  changeStatusList,
  reloadTable,
  searchByKey,
} from "../../../../../redux/actions/partnership/user/tanda-tangan.actions";

import LoadingTable from "../../../../LoadingTable";

import IconAdd from "../../../../assets/icon/Add";
import IconSearch from "../../../../assets/icon/Search";
import IconPencil from "../../../../assets/icon/Pencil";
import IconDelete from "../../../../assets/icon/Delete";
import IconArrow from "../../../../assets/icon/Arrow";

const Table = ({ token }) => {
  const dispatch = useDispatch();
  let router = useRouter();
  const { success, update } = router.query;

  const allTandaTanganUser = useSelector((state) => state.allTandaTanganUser);

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
        dispatch(deleteTandaTangan(id, token));
        setSuccessDelete(true);
        router.replace(`/partnership/user/tanda-tangan-digital`);
      }
    });
  };

  const onNewReset = () => {
    setSuccessDelete(false);
    router.replace("/partnership/user/tanda-tangan-digital", undefined, {
      shallow: true,
    });
  };

  const [isStatusBar, setIsStatusBar] = useState(false);
  const changeListStatus = (e, id) => {
    Swal.fire({
      title: "Apakah anda yakin ingin merubah status ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya !",
      dismissOnDestroy: false,
    }).then(async (result) => {
      if (result.value) {
        let formData = new FormData();
        formData.append("_method", "put");
        formData.append("status", e.target.value);
        dispatch(changeStatusList(formData, id, token));
        setIsStatusBar(true);
        // setDeleteBar(false);
        // setIsChangeOption(true);
        router.replace("/partnership/user/tanda-tangan-digital", undefined, {
          shallow: true,
        });
      } else {
        dispatch(reloadTable());
      }
    });
  };

  useEffect(() => {
    dispatch(fetchSignature(token));
  }, [
    dispatch,
    allTandaTanganUser.keyword,
    allTandaTanganUser.status_reload,
    allTandaTanganUser.page,
    allTandaTanganUser.limit,
    token,
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
            Berhasil menghapus data
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
            Berhasil mengubah data
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
      {isStatusBar ? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
          style={{ backgroundColor: "#C9F7F5" }}
        >
          <div className="alert-icon">
            <i className="flaticon2-checkmark" style={{ color: "#1BC5BD" }}></i>
          </div>
          <div className="alert-text" style={{ color: "#1BC5BD" }}>
            Berhasil mengubah status
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
              <Link href="/partnership/user/tanda-tangan-digital/tambah-tanda-tangan-digital">
                <a className="btn btn-rounded-full bg-blue-primary text-white">
                  <IconAdd className="mr-3" width="14" height="14" />
                  Tambah Tanda Tangan
                </a>
              </Link>
            </div>
          </div>

          <div className="card-body pt-0">
            {/* <form onSubmit={handleSubmit}> */}
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
                          type="button"
                          onClick={(e) => handleSubmit(e)}
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
            {/* </form> */}

            <div className="table-page mt-5">
              <div className="table-responsive">
                {allTandaTanganUser.status === "process" ? (
                  <LoadingTable />
                ) : (
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-left">No</th>
                        <th className="text-left align-middle">Nama</th>
                        <th className="text-left align-middle">Jabatan</th>
                        <th className="text-left align-middle">Status</th>
                        <th className="text-left align-middle">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allTandaTanganUser.tanda_tangan.data &&
                      allTandaTanganUser.tanda_tangan.data.list_signatures
                        .length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            <h4>Data tidak ditemukan</h4>
                          </td>
                        </tr>
                      ) : (
                        allTandaTanganUser.tanda_tangan.data &&
                        allTandaTanganUser.tanda_tangan.data.list_signatures.map(
                          (items, index) => {
                            return (
                              <tr key={index}>
                                <td className="align-middle text-left">
                                  {allTandaTanganUser.page === 1
                                    ? index + 1
                                    : (allTandaTanganUser.page - 1) *
                                        allTandaTanganUser.limit +
                                      (index + 1)}
                                </td>
                                <td className="align-middle text-left">
                                  {items.name}
                                </td>
                                <td className="align-middle text-left">
                                  {items.position}
                                </td>
                                <td className="align-middle text-left">
                                  {items.status == "1" ? (
                                    <div className="position-relative w-max-content">
                                      <select
                                        name=""
                                        id=""
                                        className="form-control remove-icon-default dropdown-arrows-green"
                                        key={index}
                                        onChange={(e) =>
                                          changeListStatus(e, items.id)
                                        }
                                      >
                                        <option value="1">Aktif</option>
                                        <option value="0">Tidak Aktif</option>
                                      </select>
                                      <IconArrow
                                        className="right-center-absolute"
                                        style={{ right: "10px" }}
                                        width="7"
                                        height="7"
                                      />
                                    </div>
                                  ) : (
                                    <div className="position-relative w-max-content">
                                      <select
                                        name=""
                                        id=""
                                        className="form-control remove-icon-default dropdown-arrows-red-primary  pr-10"
                                        key={index}
                                        onChange={(e) =>
                                          changeListStatus(e, items.id)
                                        }
                                      >
                                        <option value="0">Tidak Aktif</option>
                                        <option value="1">Aktif</option>
                                      </select>
                                      <IconArrow
                                        className="right-center-absolute"
                                        style={{ right: "10px" }}
                                        fill="#F65464"
                                        width="7"
                                        height="7"
                                      />
                                    </div>
                                  )}
                                </td>
                                <td className="align-middle text-left">
                                  <div className="d-flex align-items-center">
                                    <Link
                                      href={{
                                        pathname:
                                          "/partnership/user/tanda-tangan-digital/ubah-tanda-tangan-digital",
                                        query: { id: items.id },
                                      }}
                                    >
                                      <a className="btn btn-link-action bg-blue-secondary mr-3 position-relative btn-delete">
                                        <IconPencil width="16" height="16" />
                                        <div className="text-hover-show-hapus">
                                          Ubah
                                        </div>
                                      </a>
                                    </Link>

                                    <button
                                      className="btn btn-link-action bg-blue-secondary position-relative btn-delete"
                                      onClick={() => handleDelete(items.id)}
                                    >
                                      <IconDelete width="16" height="16" />
                                      <div className="text-hover-show-hapus">
                                        Hapus
                                      </div>
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
                    activePage={allTandaTanganUser.page}
                    itemsCountPerPage={
                      allTandaTanganUser?.tanda_tangan?.data?.perPage
                    }
                    totalItemsCount={
                      allTandaTanganUser?.tanda_tangan?.data?.total
                    }
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
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                      </select>
                    </div>
                    <div className="col-8 my-auto">
                      <p
                        className="align-middle mt-3 ml-3"
                        style={{ color: "#B5B5C3" }}
                      >
                        Total Data{" "}
                        {allTandaTanganUser.tanda_tangan.data &&
                          allTandaTanganUser.tanda_tangan.data.total}
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
