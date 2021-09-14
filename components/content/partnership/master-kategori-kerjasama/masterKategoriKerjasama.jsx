import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../wrapper/page.wrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllMKCooporation,
  searchCooporation,
  limitCooporation,
  deleteCooporation,
  setPage,
} from "../../../../redux/actions/partnership/mk_cooporation.actions";
import LoadingTable from "../../../LoadingTable";
import IconEye from "../../../assets/icon/Eye";
import IconPencil from "../../../assets/icon/Pencil";
import IconDelete from "../../../assets/icon/Delete";
import IconAdd from "../../../assets/icon/Add";

import IconSearch from "../../../assets/icon/Search";

const Table = () => {
  let dispatch = useDispatch();
  const router = useRouter();
  let { success, update } = router.query;
  const [valueSearch, setValueSearch] = useState("");
  const allMKCooporation = useSelector((state) => state.allMKCooporation);
  const handleChangeValueSearch = (value) => {
    setValueSearch(value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(searchCooporation(valueSearch));
  };

  const [successDelete, setSuccessDelete] = useState(false);

  const cooperationDelete = (id) => {
    Swal.fire({
      title: "Apakah anda yakin ingin menghapus data ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya !",
      dismissOnDestroy: false,
    }).then(async (result) => {
      if (result.value) {
        dispatch(deleteCooporation(id));
        setSuccessDelete(true);
        router.replace(`/partnership/master-kategori-kerjasama`);
      }
    });
  };
  useEffect(() => {
    dispatch(fetchAllMKCooporation());
  }, [
    dispatch,
    allMKCooporation.keyword,
    allMKCooporation.limit,
    allMKCooporation.page,
    allMKCooporation.status_delete,
    allMKCooporation.status_list,
  ]);

  const onNewReset = () => {
    setSuccessDelete(false);
    router.replace(`/partnership/master-kategori-kerjasama`);
  };

  useEffect(() => {
    let searchValue = document.getElementById(
      "kt_datatable_search_query"
    ).value;
    if (searchValue === "") {
      dispatch(fetchAllMKCooporation("clear keyword"));
    }
  }, [dispatch]);

  return (
    <PageWrapper>
      {success || successDelete ? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
          style={{ backgroundColor: success ? "#C9F7F5" : "#f7c9c9" }}
        >
          <div className="alert-icon">
            <i
              className="flaticon2-checkmark"
              style={{ color: success ? "#1BC5BD" : "#c51b1b" }}
            ></i>
          </div>
          <div
            className="alert-text"
            style={{ color: success ? "#1BC5BD" : "#c51b1b" }}
          >
            {successDelete
              ? "Berhasil menghapus data"
              : "Berhasil menyimpan data"}
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
            Berhasil merubah data
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
              Master Kategori Kerjasama
            </h3>
            <div className="card-toolbar">
              <Link href="/partnership/master-kategori-kerjasama/tambah">
                <a className="btn btn-rounded-full bg-blue-primary text-white">
                  <IconAdd  className="mr-3" width="14" height="14" />
                  Tambah Kategori Kerjasama
                </a>
              </Link>
            </div>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-12 col-xl-12">
                  <form
                    onSubmit={handleSubmit}
                    className="d-flex align-items-center w-100"
                  >
                    <div className="row w-100">
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
                            onChange={(e) =>
                              handleChangeValueSearch(e.target.value)
                            }
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
                  </form>
                </div>
              </div>
            </div>
            <div className="table-page mt-5">
              <div className="table-responsive">
                {allMKCooporation.status === "process" ? (
                  <LoadingTable />
                ) : (
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-left">No</th>
                        <th className="text-left align-middle">
                          Kategori Kerjasama
                        </th>
                        <th className="text-left align-middle">Status</th>
                        <th className="text-left align-middle">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allMKCooporation.mk_cooporation.data && allMKCooporation.mk_cooporation.data.list_cooperation_categories.length === 0  ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            <h4>Data tidak ditemukan</h4>
                          </td>
                        </tr>
                      ) : (
                        allMKCooporation.mk_cooporation.data && allMKCooporation.mk_cooporation.data.list_cooperation_categories.map(
                          (cooperation_categorie, index) => {
                            return (
                              <tr key={index}>
                                <td className="align-middle text-left">
                                 
                                    {allMKCooporation.page === 1
                                      ? index + 1
                                      : (allMKCooporation.page - 1) *
                                          allMKCooporation.limit +
                                        (index + 1)}
                                    {/* {index + 1} */}
                                 
                                </td>
                                <td className="align-middle text-left">
                                  {cooperation_categorie.cooperation_categories}
                                </td>
                                <td className="align-middle text-left">
                                  {allMKCooporation.mk_cooporation.length ===
                                  0 ? (
                                    ""
                                  ) : (
                                    <div
                                      name=""
                                      id=""
                                      className="cursor-pointer"
                                    >
                                      <p
                                        className={`${allMKCooporation.mk_cooporation.data
                                          .list_cooperation_categories[index]
                                          .status === 0 ? "status-div-red" :"status-div-green"}`}
                                        style={{ width: "max-content" }}
                                      >
                                        {allMKCooporation.mk_cooporation.data
                                          .list_cooperation_categories[index]
                                          .status === 0
                                          ? "Tidak aktif"
                                          : "Aktif"}
                                      </p>
                                    </div>
                                  )}
                                </td>
                                <td className="text-left align-middle">
                                  <div className="d-flex align-items-center">
                                    {/* <button
                                      className="btn btn-link-action bg-blue-secondary position-relative btn-delete"
                                    >
                                      <IconEye width="16" height="16" fill="rgba(255,255,255,1)"/>
                                      <div className="text-hover-show-hapus">
                                      Detail
                                    </div>
                                    </button> */}

                                    <button
                                      className="btn btn-link-action bg-blue-secondary mr-3 position-relative btn-delete"
                                      onClick={() =>
                                        router.push(
                                          `/partnership/master-kategori-kerjasama/${cooperation_categorie.id}`
                                        )
                                      }
                                    >
                                      <IconPencil width="16" height="16" />
                                      <div className="text-hover-show-hapus">
                                      Ubah
                                    </div>
                                    </button>

                                    <button
                                      className="btn btn-link-action bg-blue-secondary position-relative btn-delete"
                                      onClick={() =>
                                        cooperationDelete(
                                          cooperation_categorie.id
                                        )
                                      }
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
                <div className="table-pagination paginate-cs">
                  <Pagination
                    activePage={allMKCooporation.page}
                    itemsCountPerPage={
                      allMKCooporation?.mk_cooporation?.data?.perPage
                    }
                    totalItemsCount={
                      allMKCooporation?.mk_cooporation?.data?.total
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
                        className="form-control mr-5 cursor-pointer"
                        id="exampleFormControlSelect2"
                        defaultValue=""
                        style={{
                          width: "63px",
                          background: "#F3F6F9",
                          borderColor: "#F3F6F9",
                          color: "#9E9E9E",
                        }}
                        onChange={(e) =>
                          dispatch(limitCooporation(e.target.value))
                        }
                      >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                      </select>
                    </div>
                    <div className="col-8 my-auto">
                      <p
                        className="align-middle mt-3"
                        style={{ color: "#B5B5C3", whiteSpace: "nowrap" }}
                      >
                        Total Data{" "}
                        {allMKCooporation?.mk_cooporation?.data?.total} List
                        Data
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
