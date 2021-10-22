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
  getAllZonasi,
  setPage,
  searchCooporation,
  limitCooporation,
} from "../../../../../redux/actions/site-management/zonasi.actions";
import { DELETE_ZONASI_RESET } from "../../../../../redux/types/site-management/zonasi.type";

const Table = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const allZonasi = useSelector((state) => state.allZonasi);
  console.log("allZonasi",allZonasi)

  const [valueSearch, setValueSearch] = useState("");
  const handleChangeValueSearch = (value) => {
    setValueSearch(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(searchCooporation(valueSearch));
  };

  useEffect(() => {
    dispatch(getAllZonasi(token));
  }, [dispatch, allZonasi.cari, allZonasi.page, allZonasi.limit, token]);

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark"
              style={{ fontSize: "24px" }}
            >
              List Master Zonasi
            </h3>
            <div className="card-toolbar">
              <Link
                href="/site-management/master-data/master-zonasi/tambah-zonasi"
                passHref
              >
                <a className="btn btn-rounded-full bg-blue-primary text-white">
                  <IconAdd className="mr-3" width="14" height="14" />
                  Tambah Master Zonasi
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
                {allZonasi.status === "process" ? (
                  <LoadingTable />
                ) : (
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-left">No</th>
                        <th className="text-left align-middle">Nama Zonasi</th>
                        <th className="text-left align-middle">Status</th>
                        <th className="text-left align-middle">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allZonasi.data.zonasi.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            <h4>Data tidak ditemukan</h4>
                          </td>
                        </tr>
                      ) : (
                        allZonasi.data.zonasi.map((items, index) => {
                          return (
                            <tr key={index}>
                              <td className="align-middle text-left">
                                {allZonasi.page === 1
                                  ? index + 1
                                  : (allZonasi.page - 1) * allZonasi.limit +
                                    (index + 1)}
                              </td>
                              <td className="align-middle text-left">{items.label}</td>
                              <td className="align-middle text-left">
                                 {items.status == 1 ?
                        <p
                        className="status-div-green mb-0"
                        style={{ width: "max-content" }}
                        >
                          Aktif
                        </p>
                        :

                        <p
                        className="status-div-red mb-0"
                        style={{ width: "max-content" }}
                        >
                          Tidak Aktif
                        </p>
                        }
                              </td>
                              <td className="align-middle text-left">
                                <div className="d-flex align-items-center">
                                  <Link

                                    href={`/site-management/master-data/master-zonasi/ubah-zonasi/${items.value}`}


                                  >
                                    <a className="btn btn-link-action bg-blue-secondary position-relative btn-delete">
                                      <IconPencil width="16" height="16" />
                                      <div className="text-hover-show-hapus">
                                        Ubah
                                      </div>
                                    </a>
                                  </Link>

                                  <Link
                                    href={`/site-management/master-data/master-zonasi/detail-zonasi/${items.value}`}
                                  >
                                    <a className="btn btn-link-action bg-blue-secondary mx-3 position-relative btn-delete">
                                      <IconEye width="16" height="16" />
                                      <div className="text-hover-show-hapus">
                                        Detail
                                      </div>
                                    </a>
                                  </Link>
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

              <div className="row">
                <div className="table-pagination paginate-cs">
                  <Pagination
                    activePage={allZonasi.page}
                    itemsCountPerPage={allZonasi.data.perPage}
                    totalItemsCount={allZonasi.data.total}
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
                        Total Data {allZonasi.data && allZonasi.data.total} List
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
