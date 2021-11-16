import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../../wrapper/page.wrapper";
import { useDispatch, useSelector } from "react-redux";
import LoadingTable from "../../../../LoadingTable";
import IconEye from "../../../../assets/icon/Eye";
import IconPencil from "../../../../assets/icon/Pencil";
import IconDelete from "../../../../assets/icon/Delete";
import IconAdd from "../../../../assets/icon/Add";
import IconSearch from "../../../../assets/icon/Search";

import {
  deleteApis,
  getAllApi,
  setPage,
  searchCooporation,
  limitCooporation,
} from "../../../../../redux/actions/site-management/settings/api.actions";
import { DELETE_API_RESET } from "../../../../../redux/types/site-management/settings/api.type";

const Table = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const allApi = useSelector((state) => state.allApi);

  const {
    loading: deleteLoading,
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.deleteApi);

  const deleteApi = useSelector((state) => state.deleteApi);
  const [valueSearch, setValueSearch] = useState("");
  const handleChangeValueSearch = (value) => {
    setValueSearch(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(searchCooporation(valueSearch));
  };

  const handleDelete = (id, token) => {
    Swal.fire({
      title: "Apakah anda yakin menghapus data ?",
      text: "Data ini tidak bisa dikembalikan !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya !",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteApis(id, token));
      }
    });
  };

  useEffect(() => {
    dispatch(getAllApi(token));
  }, [dispatch, allApi.cari, allApi.page, allApi.limit, token]);

  useEffect(() => {
    if (isDeleted) {
      Swal.fire("Berhasil ", "Data berhasil dihapus.", "success").then(
        (result) => {
          if (result.isConfirmed) {
            dispatch(getAllApi(token));
          }
        }
      );
    }
    if (deleteError) {
      Swal.fire("Gagal", "Data gagal dihapus.", "error");
    }
    dispatch({
      type: DELETE_API_RESET,
    });
  }, [isDeleted, dispatch, token, deleteError]);

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark titles-1">
              List API
            </h3>
            <div className="card-toolbar">
              <Link href="/site-management/setting/api/tambah-api" passHref>
                <a className="btn btn-rounded-full bg-blue-primary text-white">
                  <IconAdd className="mr-3" width="14" height="14" />
                  Tambah API
                </a>
              </Link>
            </div>
          </div>
          <div className="card-body pt-0 px-4 px-sm-8">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-12 col-xl-12">
                  <div className="row w-100 ml-0 ml-sm-0">
                    <div className="col-12 col-xl-4">
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
            <div className="table-page mt-5">
              <div className="table-responsive">
                {allApi.status === "process" ? (
                  <LoadingTable />
                ) : (
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-left">No</th>
                        <th className="text-left align-middle">API</th>
                        <th className="text-left align-middle">URL</th>
                        <th className="text-left align-middle">KEY</th>
                        <th className="text-left align-middle">Pengguna</th>
                        <th className="text-left align-middle">Masa Berlaku</th>
                        <th className="text-left align-middle">Status</th>
                        <th className="text-left align-middle">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allApi.data.setting_api.length === 0 ? (
                        <td className="align-middle text-center" colSpan="8">
                          Data kosong
                        </td>
                      ) : (
                        allApi.data.setting_api.map((items, index) => {
                          return (
                            <tr key={index}>
                              <td className="align-middle text-left">
                                {allApi.page === 1
                                  ? index + 1
                                  : (allApi.page - 1) * allApi.limit +
                                    (index + 1)}
                              </td>
                              <td className="align-middle text-left">
                                <p className="p-part-t text-overflow-ens">
                                  {items.api_name}
                                </p>
                              </td>
                              <td className="align-middle text-left">
                                <p className="p-part-t text-overflow-ens">
                                  {items.api_url}
                                </p>
                              </td>
                              <td className="align-middle text-left">
                                <p className="p-part-t text-overflow-ens">
                                  {items.api_key}
                                </p>
                              </td>
                              <td className="align-middle text-left">
                                <p className="p-part-t text-overflow-ens">
                                  {items.username}
                                </p>
                              </td>
                              <td className="align-middle text-left">
                                <p className="p-part-t text-overflow-ens">
                                  {items.from_date} / {items.to_date}
                                </p>
                              </td>
                              <td className="align-middle text-left">
                                {items.status == 1 ? (
                                  <p
                                    className="status-div-green mb-0"
                                    style={{ width: "max-content" }}
                                  >
                                    Aktif
                                  </p>
                                ) : (
                                  <p
                                    className="status-div-red mb-0"
                                    style={{ width: "max-content" }}
                                  >
                                    Tidak Aktif
                                  </p>
                                )}
                              </td>
                              <td className="align-middle text-left">
                                <div className="d-flex align-items-center">
                                  <Link
                                    href={`/site-management/setting/api/ubah-api?id=${items.id}`} passHref
                                  >
                                    <a className="btn btn-link-action bg-blue-secondary position-relative btn-delete">
                                      <IconPencil width="16" height="16" />
                                      <div className="text-hover-show-hapus">
                                        Ubah
                                      </div>
                                    </a>
                                  </Link>
                                  <Link
                                    href={`/site-management/setting/api/detail-api?id=${items.id}`} passHref
                                  >
                                    <a className="btn btn-link-action bg-blue-secondary mx-3 position-relative btn-delete">
                                      <IconEye width="16" height="16" />
                                      <div className="text-hover-show-hapus">
                                        Detail
                                      </div>
                                    </a>
                                  </Link>

                                  <button
                                    className="btn btn-link-action bg-blue-secondary position-relative btn-delete"
                                    onClick={() =>
                                      handleDelete(items.id, token)
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
                        })
                      )}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="row px-4">
                <div className="table-pagination">
                  <Pagination
                    activePage={allApi.page}
                    itemsCountPerPage={allApi.data.perPage}
                    totalItemsCount={allApi.data.total}
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

                <div className="table-total ml-auto mr-4">
                  <div className="row mt-4">
                    <div className="col-4 mr-0 p-0">
                      <select
                        className="form-control pr-2 cursor-pointer"
                        id="exampleFormControlSelect2"
                        defaultValue=""
                        style={{
                          width: "63px",
                          background: "#F3F6F9",
                          borderColor: "#F3F6F9",
                          color: "#9E9E9E",
                        }}
                        onChange={(e) =>
                          dispatch(limitCooporation(e.target.value, token))
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
                        Total Data {allApi.data && allApi.data.total} List Data
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
