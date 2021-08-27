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
            <h3 className="card-title font-weight-bolder text-dark">
              Master Kategori Kerjasama
            </h3>
            <div className="card-toolbar">
              <Link href="/partnership/master-kategori-kerjasama/tambah">
                <a className="btn btn-primary px-6 font-weight-bold btn-block ">
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
                    <div className="input-icon w-100">
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
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="table-page mt-5">
              <div className="table-responsive">
                {allMKCooporation.status === "process" ? (
                  <div className="d-flex justify-content-center py-5 ">
                    <h4>Loading ..</h4>
                  </div>
                ) : (
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-center align-middle">No</th>
                        <th className="align-baseline">Kategori Kerjasama</th>
                        <th className="align-baseline">Status</th>
                        <th className="text-center align-middle">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allMKCooporation.mk_cooporation.data === undefined
                        ? "Data list kategori tidak ada"
                        : allMKCooporation.mk_cooporation.data.list_cooperation_categories.map(
                            (cooperation_categorie, index) => {
                              return (
                                <tr key={index}>
                                  <td className="text-center align-middle">
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
                                  <td className="align-middle">
                                    {
                                      cooperation_categorie.cooperation_categories
                                    }
                                  </td>
                                  <td className="align-middle position-relative">
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
                                        className="status-div cursor-pointer left-center-absolute"
                                        // disabled
                                      >
                                        {allMKCooporation.mk_cooporation.data
                                          .list_cooperation_categories[index]
                                          .status === 0
                                          ? "Tidak aktif"
                                          : "Aktif"}
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
                                  <td className="text-center align-middle">
                                    <button
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
                                    </button>
                                    <button
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
                                    </button>
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
