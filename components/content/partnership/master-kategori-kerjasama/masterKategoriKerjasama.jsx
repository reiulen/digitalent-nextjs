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
import Swal from "sweetalert2";
import IconPencil from "../../../assets/icon/Pencil";
import IconDelete from "../../../assets/icon/Delete";
import IconAdd from "../../../assets/icon/Add";
import AlertBar from "../components/BarAlert";

import IconSearch from "../../../assets/icon/Search";

const Table = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();
  let { success, update } = router.query;
  const [valueSearch, setValueSearch] = useState("");
  const allMKCooporation = useSelector((state) => state.allMKCooporation);
  const { permission } = useSelector ((state) => state.partnershipPermissions)
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
        let formData = new FormData();
        formData.append("_method", "put");
        dispatch(deleteCooporation(token, formData, id));
        setSuccessDelete(true);
        router.replace(`/partnership/master-kategori-kerjasama`);
      }
    });
  };
  useEffect(() => {
    dispatch(fetchAllMKCooporation(token));
  }, [
    dispatch,
    allMKCooporation.keyword,
    allMKCooporation.limit,
    allMKCooporation.page,
    allMKCooporation.status_delete,
    allMKCooporation.status_list,
    token
  ]);


  const onNewReset = () => {
    setSuccessDelete(false);
    router.replace("/partnership/master-kategori-kerjasama", undefined, {
      shallow: true,
    });
  };

  return (
    <PageWrapper>
     {success ? (
        <AlertBar text="Berhasil menyimpan data" className="alert-light-success" onClick={() => onNewReset()}/>
      ) : (
        ""
      )}
      {successDelete ? (
        <AlertBar text="Berhasil menghapus data" className="alert-light-success" onClick={() => onNewReset()}/>
      ) : (
        ""
      )}
      {update ? (
        <AlertBar text="Berhasil mengubah data" className="alert-light-success" onClick={() => onNewReset()}/>
      ) : (
        ""
      )}

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0 mt-7 ml-sm-n5 ml-n5">
            <div className="col-12 col-xl-6 mt-2">
              <h3
                className="card-title font-weight-bolder text-dark titles-1"
              >
                Master Kategori Kerjasama
              </h3>
            </div>

            {
              permission ? 
                permission?.roles?.includes("Super Admin") || permission?.permissions?.includes("partnership.kerjasama.manage") ?
                  <div className="col-12 col-xl-6 d-flex justify-content-xl-end  mb-5">
                    <div className="card-toolbar mb-5">
                      <Link href="/partnership/master-kategori-kerjasama/tambah-kategori-kerjasama">
                        <a className="btn btn-rounded-full bg-blue-primary text-white w-75 w-md-100">
                          <IconAdd className="mr-3" width="14" height="14" />
                          <div className="d-inline-block text-truncate mr-n8 mr-sm-0">
                            Tambah Kategori Kerjasama
                          </div>
                        </a>
                      </Link>
                    </div>
                  </div>
                :
                  null
              :
                null
            }
            
          </div>

          <div className="card-body pt-0 px-sm-6 mb-10">
            <div className="table-filter">
              <div className="row d-flex align-items-center">
                <div className="col-lg-12 col-xl-12">
                  <div
                    className="row d-flex align-items-center"
                  >
                    <div className="col-12 col-xl-4 ">
                      <div className="position-relative overflow-hidden">
                        <IconSearch
                          style={{ left: "10" }}
                          className="left-center-absolute"
                        />
                        <input
                          id="kt_datatable_search_query"
                          type="text"
                          className="form-control pl-10"
                          placeholder="Cari.."
                          onChange={(e) =>
                            handleChangeValueSearch(e.target.value)
                          }
                        />
                        <button
                          type="button"
                          onClick={(e)=>handleSubmit(e)}
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
            <div className="table-page mt-10 mt-sm-5">
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
                        {
                          permission ? 
                            permission?.roles?.includes("Super Admin") || permission?.permissions?.includes("partnership.kerjasama.manage") ?
                              <th className="text-left align-middle">Aksi</th>
                            :
                              null
                          :
                            null
                        }
                      </tr>
                    </thead>
                    <tbody>
                      {allMKCooporation.mk_cooporation.data &&
                      allMKCooporation.mk_cooporation.data
                        .list_cooperation_categories.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            <h4>Data tidak ditemukan</h4>
                          </td>
                        </tr>
                      ) : (
                        allMKCooporation.mk_cooporation.data &&
                        allMKCooporation.mk_cooporation.data.list_cooperation_categories.map(
                          (cooperation_categorie, index) => {
                            return (
                              <tr key={index}>
                                <td className="align-middle text-left">
                                  {allMKCooporation.page === 1
                                    ? index + 1
                                    : (allMKCooporation.page - 1) *
                                        allMKCooporation.limit +
                                      (index + 1)}
                                </td>
                                <td className="align-middle text-left text-overflow-ens">
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
                                        className={`my-auto ${
                                          allMKCooporation.mk_cooporation.data
                                            .list_cooperation_categories[index]
                                            .status === 0
                                            ? "status-div-red"
                                            : "status-div-green"
                                        }`}
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

                                {
                                  permission ? 
                                    permission?.roles?.includes("Super Admin") || permission?.permissions?.includes("partnership.kerjasama.manage") ?
                                      <td className="text-left align-middle">
                                        <div className="d-flex align-items-center">
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
                                    :
                                      null
                                  :
                                    null
                                }
                                
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
                <div className="table-pagination paginate-cs col-12 col-md-8 overflow-auto">
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
                <div className="table-total ml-auto col-12 col-md-4 d-flex justify-content-md-end">
                  <div className="row">
                    <div className="col-4 mr-0">
                      <select
                        className="form-control mr-5 cursor-pointer pl-2"
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
                        <option value="20">20</option>
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
