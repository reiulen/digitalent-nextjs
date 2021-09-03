import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../wrapper/page.wrapper";
import ButtonAction from "../../../ButtonAction";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllMKCooporation,
  searchCooporation,
  limitCooporation,
  deleteCooporation,
  changeStatusList,
  setPage,
} from "../../../../redux/actions/partnership/mk_cooporation.actions";
import Image from "next/image";
import LoadingTable from '../../../LoadingTable'

const Table = () => {
  let dispatch = useDispatch();
  const router = useRouter();
  let { success,update } = router.query;
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
            <i className="flaticon2-checkmark" style={{color:success?"#1BC5BD":"#c51b1b"}}></i>
          </div>
          <div className="alert-text" style={{color:success?"#1BC5BD":"#c51b1b"}}>
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
            <i className="flaticon2-checkmark" style={{color:"#1BC5BD"}}></i>
          </div>
          <div className="alert-text" style={{color:"#1BC5BD"}}>
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
            <h3 className="card-title font-weight-bolder text-dark" style={{fontSize:"24px"}}>
              Master Kategori Kerjasama
            </h3>
            <div className="card-toolbar">
              {/* <Link href="/partnership/master-kategori-kerjasama/tambah">
                <a className="btn btn-primary px-6 font-weight-bold btn-block ">
                  Tambah Kategori Kerjasama
                </a>
              </Link> */}
              <Link href="/partnership/master-kategori-kerjasama/tambah">
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
                    {/* <div className="input-icon w-100">
                      <input
                        style={{ background: "#F3F6F9", border: "none" }}
                        type="text"
                        className="form-control"
                        placeholder="Cari..."
                        id="kt_datatable_search_query"
                        onChange={(e) =>
                          handleChangeValueSearch(e.target.value)
                        }
                      />
                      <span>
                        <i className="flaticon2-search-1 text-muted"></i>
                      </span>
                    </div>
                    <button
                      type="submit"
                      className="btn bg-light-primary text-primary ml-4"
                      style={{ width: "120px" }}
                    >
                      Cari
                    </button> */}
<div className="row w-100"> 
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
          onChange={(e) =>
                          handleChangeValueSearch(e.target.value)
                        }
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
                        <th className="text-left align-middle">Kategori Kerjasama</th>
                        <th className="text-left align-middle">Status</th>
                        <th className="text-left align-middle">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allMKCooporation.mk_cooporation.data === undefined
                        ? <LoadingTable />
                        : allMKCooporation.mk_cooporation.data.list_cooperation_categories.map(
                            (cooperation_categorie, index) => {
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
                                      {allMKCooporation.page === 1
                                        ? index + 1
                                        : (allMKCooporation.page - 1) *
                                            allMKCooporation.limit +
                                          (index + 1)}
                                      {/* {index + 1} */}
                                    </button>
                                  </td>
                                  <td className="align-middle text-left">
                                    {
                                      cooperation_categorie.cooperation_categories
                                    }
                                  </td>
                                  <td className="align-middle text-left">
                                    {allMKCooporation.mk_cooporation.length ===
                                    0 ? (
                                      ""
                                    ) : (
                                      <div
                                        // onChange={(e) =>
                                        //   dispatch(
                                        //     changeStatusList(
                                        //       e.target.value,
                                        //       cooperation_categorie.id,
                                        //       index
                                        //     )
                                        //   )
                                        // }
                                        name=""
                                        id=""
                                        className="cursor-pointer"
                                        // disabled
                                      >
                                        <p className="status-div" style={{width:"max-content"}}>
                                        {allMKCooporation.mk_cooporation.data
                                          .list_cooperation_categories[index]
                                          .status === 0
                                          ? "Tidak aktif"
                                          : "Aktif"}
                                          </p>
                                        {/* <option
                                          value={
                                            allMKCooporation.mk_cooporation.data
                                              .list_cooperation_categories[
                                              index
                                            ].status
                                          }
                                        >
                                          {
                                            allMKCooporation.mk_cooporation.data
                                              .list_cooperation_categories[
                                              index
                                            ].status
                                          }
                                        </option>
                                        <option
                                          value={
                                            allMKCooporation.mk_cooporation.data
                                              .list_cooperation_categories[
                                              index
                                            ].status === "aktif"
                                              ? "tidak aktif"
                                              : "aktif"
                                          }
                                        >
                                          {allMKCooporation.mk_cooporation.data
                                            .list_cooperation_categories[index]
                                            .status === "aktif"
                                            ? "tidak aktif"
                                            : "aktif"}
                                        </option> */}
                                      </div>
                                    )}
                                  </td>
                                  <td className="text-left align-middle">
                                    <div className="d-flex align-items-center">

                                    <button
                                        className="btn btn-link-action bg-blue-secondary"
                                        // onClick={() =>
                                        //   router.push(
                                        //     `/partnership/manajemen-kerjasama/view/${items.id}`
                                        //   )
                                        // }
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 24 24"
                                          width="14"
                                          height="12"
                                        >
                                          <path fill="none" d="M0 0h24v24H0z" />
                                          <path
                                            d="M1.181 12C2.121 6.88 6.608 3 12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
                                            fill="rgba(255,255,255,1)"
                                          />
                                        </svg>
                                      </button>

                                    {/* <button
                                      onClick={() =>
                                        router.push(
                                          `/partnership/master-kategori-kerjasama/${cooperation_categorie.id}`
                                        )
                                      }
                                      className="btn mr-1 bg-light position-relative btn-delete"
                                      style={{
                                        borderRadius: "6px",
                                      }}
                                    >
                                      <Image
                                        alt="button-action"
                                        src={`/assets/icon/write.svg`}
                                        width={18}
                                        height={18}
                                      />
                                      <div className="text-hover-show-hapus">
                                        Ubah
                                      </div>
                                    </button> */}

                                    <button
                                        className="btn btn-link-action bg-blue-secondary mx-3"
                                        onClick={() =>
                                        router.push(
                                          `/partnership/master-kategori-kerjasama/${cooperation_categorie.id}`
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
                                      onClick={() =>
                                        cooperationDelete(
                                          cooperation_categorie.id
                                        )
                                      }
                                      className="btn mr-1 bg-light position-relative btn-edit"
                                      style={{
                                        borderRadius: "6px",
                                      }}
                                    >
                                      <Image
                                        alt="button-action"
                                        src={`/assets/icon/trash.svg`}
                                        width={18}
                                        height={18}
                                      />
                                      <div className="text-hover-show-edit">
                                        Hapus
                                      </div>
                                    </button> */}

                                    <button
                                        className="btn btn-link-action bg-blue-secondary"
                                        onClick={() =>
                                        cooperationDelete(
                                          cooperation_categorie.id
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
