import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../../wrapper/page.wrapper";

import { useDispatch, useSelector } from "react-redux";

// import {
//   fetchSignature,
//   setPage,
//   setLimit,
//   deleteTandaTangan,
//   searchByKey,
// } from "../../../../redux/actions/partnership/tandaTangan.actions";
import LoadingTable from "../../../../LoadingTable";

import IconAdd from "../../../../assets/icon/Add";
import IconSearch from "../../../../assets/icon/Search";
import IconPencil from "../../../../assets/icon/Pencil";
import IconDelete from "../../../../assets/icon/Delete";

const Table = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <PageWrapper>
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
            <form>
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
                            // onChange={(e) => setKeyWord(e.target.value)}
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
                <table className="table table-separate table-head-custom table-checkable">
                  <thead style={{ background: "#F3F6F9" }}>
                    <tr>
                      <th className="text-left">No</th>
                      <th className="text-left align-middle">Nama</th>
                      <th className="text-left align-middle">Jabatan</th>
                      <th className="text-left align-middle">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="align-middle text-left">1</td>
                      <td className="align-middle text-left">
                        {/* {items.name} */}
                        as
                      </td>
                      <td className="align-middle text-left">
                        {/* {items.position} */}
                        as
                      </td>
                      <td className="align-middle text-left">
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-link-action bg-blue-secondary mr-3 position-relative btn-delete"
                            // onClick={() =>
                            //   router.push(
                            //     `/partnership/tanda-tangan/${items.id}`
                            //   )
                            // }
                          >
                            <IconPencil width="16" height="16" />
                            <div className="text-hover-show-hapus">Ubah</div>
                          </button>
                          <button
                            className="btn btn-link-action bg-blue-secondary position-relative btn-delete"
                            // onClick={() => handleDelete(items.id)}
                          >
                            <IconDelete width="16" height="16" />
                            <div className="text-hover-show-hapus">Hapus</div>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="row">
                <div className="table-pagination">
                  {/* <Pagination
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
                  /> */}
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
                        // onChange={(e) => dispatch(setLimit(e.target.value))}
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
                        Total Data 2
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
