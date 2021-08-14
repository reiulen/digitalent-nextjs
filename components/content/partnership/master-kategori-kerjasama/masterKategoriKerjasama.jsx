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
} from "../../../../redux/actions/partnership/mk_cooporation.actions";
import Image from 'next/image'

const Table = () => {
  let dispatch = useDispatch();
  const router = useRouter();
  const allMKCooporation = useSelector((state) => state.allMKCooporation);
  console.log("allMKCooporation", allMKCooporation);

  useEffect(() => {
    dispatch(fetchAllMKCooporation());
  }, [
    dispatch,
    allMKCooporation.keyword,
    allMKCooporation.limit,
    allMKCooporation.status_delete,
    allMKCooporation.status_list,
  ]);

  return (
    <PageWrapper>
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
                  <div className="d-flex align-items-center w-100">
                    <div className="input-icon w-100">
                      <input
                        style={{ background: "#F3F6F9", border: "none" }}
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        id="kt_datatable_search_query"
                        onChange={(e) =>
                          dispatch(searchCooporation(e.target.value))
                        }
                      />
                      <span>
                        <i className="flaticon2-search-1 text-muted"></i>
                      </span>
                    </div>
                    <button
                      className="btn bg-light-primary text-primary ml-4"
                      style={{ width: "120px" }}
                    >
                      Cari
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {allMKCooporation.status === "process" ? (
              "loading"
            ) : (
              <div className="table-page mt-5">
                <div className="table-responsive">
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-center align-middle">No</th>
                        <th className="text-center align-middle">
                          Kategori Kerjasama
                        </th>
                        <th className="text-center align-middle">Status</th>
                        <th className="text-center align-middle">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allMKCooporation?.mk_cooporation?.data
                        ?.cooperation_categories &&
                        allMKCooporation?.mk_cooporation?.data?.cooperation_categories.map(
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
                                    {index + 1}
                                  </button>
                                </td>
                                <td className="text-center align-middle">
                                  {cooperation_categorie.cooperation_categories}
                                </td>
                                <td className="text-center align-middle">
                                  {allMKCooporation.mk_cooporation.length ===
                                  0 ? (
                                    ""
                                  ) : (
                                    <select
                                      onChange={(e) =>
                                        dispatch(
                                          changeStatusList(
                                            e.target.value,
                                            index + 1,
                                            index
                                          )
                                        )
                                      }
                                      name=""
                                      id=""
                                      className="form-control"
                                    >
                                      <option
                                        value={
                                          allMKCooporation.mk_cooporation.data
                                            .cooperation_categories[index]
                                            .status
                                        }
                                      >
                                        {
                                          allMKCooporation.mk_cooporation.data
                                            .cooperation_categories[index]
                                            .status
                                        }
                                      </option>
                                      <option
                                        value={
                                          allMKCooporation.mk_cooporation.data
                                            .cooperation_categories[index]
                                            .status === "aktif"
                                            ? "tidak aktif"
                                            : "aktif"
                                        }
                                      >
                                        {allMKCooporation.mk_cooporation.data
                                          .cooperation_categories[index]
                                          .status === "aktif"
                                          ? "tidak aktif"
                                          : "aktif"}
                                      </option>
                                    </select>
                                  )}
                                </td>
                                <td className="text-center align-middle">
                                  <button
                                  onClick={()=>router.push(`/partnership/master-kategori-kerjasama/${index+1}`)}
                                    className="btn mr-1 bg-light"
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
                                  </button>
                                  <button
                                  onClick={()=>dispatch(deleteCooporation(index+1))}
                                    className="btn mr-1 bg-light"
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
                                  </button>
                                </td>
                              </tr>
                            );
                          }
                        )}
                    </tbody>
                  </table>
                </div>

                <div className="row">
                  <div className="table-pagination">
                    {/* <Pagination
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
                  /> */}
                  </div>
                  <div className="table-total ml-auto">
                    <div className="row">
                      <div className="col-4 mr-0 p-0">
                        <select
                          className="form-control"
                          id="exampleFormControlSelect2"
                          defaultValue="5"
                          style={{
                            width: "65px",
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
                          style={{ color: "#B5B5C3" }}
                        >
                          Total Data 120
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Table;
