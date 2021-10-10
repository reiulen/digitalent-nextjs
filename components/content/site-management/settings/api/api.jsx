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

import { deleteApi, getAllApi } from "../../../../../redux/actions/site-management/settings/api.actions";
import { DELETE_API_RESET } from "../../../../../redux/types/site-management/settings/api.type";

const Table = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const {loading:allLoading,error,apies} = useSelector(state => state.allApi)
  console.log("apies",apies)
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(null);

  let loading = false;
  let { page = 1, cari, success } = router.query;
  if (allLoading) {
    loading = allLoading;
  }
  page = Number(page);

  // function delete
  const handleDelete = (id) => {
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
        dispatch(deleteApi(id, token));
      }
    });
  };

  const onNewReset = () => {
    router.replace("/site-management/setting/api", undefined, {
      shallow: true,
    });
  };

  const handleChangeLimit = (limit,token) => {
    dispatch(getAllApi(page,cari,limit,token))
  }

  // useEffect(() => {
  //   if (isDeleted) {
  //     Swal.fire("Berhasil ", "Data berhasil dihapus.", "success").then(
  //       (result) => {
  //         if (result.isConfirmed) {
  //           dispatch(getAllApi(page,cari,limit,token))
  //         }
  //       }
  //     );
  //     dispatch({
  //       type: DELETE_API_RESET,
  //     });
  //   }
  // }, [limit, isDeleted, dispatch, cari]);

  const handleSearch = () => {
    dispatch(getAllApi(page,search,5,token))
  };

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark"
              style={{ fontSize: "24px" }}
            >
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
          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-12 col-xl-12">
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
                            onChange={(e) => setSearch(e.target.value)}
                          />
                          <button
                            type="submit"
                            className="btn bg-blue-primary text-white right-center-absolute"
                            style={{
                              borderTopLeftRadius: "0",
                              borderBottomLeftRadius: "0",
                            }}
                            onClick={handleSearch}
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
                <LoadingTable loading={loading} />
                  {loading === false ? (
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
                    {!apies || (apies && apies.length === 0) ? (
                        <tr>
                          <td colSpan="5" className="text-center">
                            <h4>Data tidak ditemukan</h4>
                          </td>
                        </tr>
                      ) : (
                        apies &&
                        apies.map((items, i) => {
                          return (
                    <tr key={i}>
                      <td className="align-middle text-left">{limit === null
                                  ? i + 1 * (page * 5) - (5 - 1)
                                  : i + 1 * (page * limit) - (limit - 1)}</td>
                      <td className="align-middle text-left">{items.api_name}</td>
                      <td className="align-middle text-left">url belom ada di api</td>
                      <td className="align-middle text-left">{items.api_key}</td>
                      <td className="align-middle text-left">{items.username}</td>
                      <td className="align-middle text-left">{items.from_date} / {items.to_date}</td>
                      <td className="align-middle text-left">
                        <p
                          className="status-div-red mb-0"
                          style={{ width: "max-content" }}
                        >
                          Tidak aktif
                        </p>
                      </td>
                      <td className="align-middle text-left">
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-link-action bg-blue-secondary position-relative btn-delete"
                            onClick={() =>
                              router.push(`/site-management/setting/api/ubah-api`)
                            }
                          >
                            <IconPencil width="16" height="16" />
                            <div className="text-hover-show-hapus">Ubah</div>
                          </button>
                          <button
                            className="btn btn-link-action bg-blue-secondary mx-3 position-relative btn-delete"
                            onClick={() =>
                              router.push(`/site-management/setting/api/detail-api`)
                            }
                          >
                            <IconEye width="16" height="16" />
                            <div className="text-hover-show-hapus">Detail</div>
                          </button>

                          <button
                            className="btn btn-link-action bg-blue-secondary position-relative btn-delete"
                            // onClick={() =>
                            //   apiDelete(items.id)
                            // }
                          >
                            <IconDelete width="16" height="16" />
                            <div className="text-hover-show-hapus">Hapus</div>
                          </button>
                        </div>
                      </td>
                    </tr>
                    );
                        })
                      )}
                  </tbody>
                </table>
                  ) : (
                  ""
                )}
                
              </div>

              <div className="row">
                <div className="table-pagination paginate-cs">
                  pagination
                  {/* <Pagination
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
                    itemclassName="page-item"
                    linkclassName="page-link"
                  /> */}
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
                        Total Data 9 List Data
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
