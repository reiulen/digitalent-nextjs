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
  getAllUnitWork,
  setPage,
  searchCooporation,
  limitCooporation,
} from "../../../../../redux/actions/site-management/unit-work.actions";

import styles from "../../../../../styles/previewGaleri.module.css";
import stylesPag from "../../../../../styles/pagination.module.css";

const Table = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const allUnitWork = useSelector((state) => state.allUnitWork);
  const [valueSearch, setValueSearch] = useState("");
  const [limit, setLimit] = useState(null);

  const handleChangeValueSearch = (value) => {
    setValueSearch(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(searchCooporation(valueSearch));
  };

  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    dispatch(getAllUnitWork(token));

    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch, allUnitWork.cari, allUnitWork.page, allUnitWork.limit, token]);

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header row border-0">
            <h3
              className={`${styles.headTitle} col-12 col-sm-8 col-md-8 col-lg-7 col-xl-9`}
            >
              List Satuan Kerja Penyelenggara
            </h3>
            {localStorage
              .getItem("permissions")
              .includes("site_management.master-data.manage") && (
              <div className="card-toolbar row col-12 col-sm-4 col-md-4 col-lg-5 col-xl-3">
                <Link
                  href="/site-management/master-data/master-satuan-kerja-penyelenggara/tambah-satuan-kerja-penyelenggara"
                  passHref
                >
                  <a
                    className={`${styles.btnTambah} btn btn-primary-rounded-full px-6 font-weight-bold btn-block`}
                  >
                    <IconAdd className="mr-3" width="14" height="14" />
                    Master Satuan Kerja
                  </a>
                </Link>
              </div>
            )}
          </div>
          <div className="card-body">
            <div className="table-filter">
              <div className="row">
                <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div
                    className="position-relative overflow-hidden mt-3"
                    style={{ maxWidth: "330px" }}
                  >
                    <i className="ri-search-line left-center-absolute ml-2"></i>
                    <input
                      id="kt_datatable_search_query"
                      type="text"
                      className={`${styles.cari} form-control pl-10`}
                      placeholder="Ketik disini untuk Pencarian..."
                      onChange={(e) => handleChangeValueSearch(e.target.value)}
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

              {/* <div className="row align-items-center">
                <div className="col-lg-12 col-xl-12">
                  <div className="d-flex align-items-center w-100">
                    <div className="row w-100">
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
                            onClick={handleSubmit}
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
              </div> */}
            </div>
            <div className="table-page mt-5">
              <div className="table-responsive">
                {allUnitWork.status === "process" ? (
                  <LoadingTable />
                ) : (
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-left">No</th>
                        <th className="text-left align-middle">
                          Nama Satuan Kerja
                        </th>
                        <th className="text-left align-middle">Status</th>
                        <th className="text-left align-middle">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUnitWork?.data?.unit_work?.length === 0 ||
                      allUnitWork?.data === undefined ? (
                        <td className="align-middle text-center" colSpan="4">
                          Data Kosong
                        </td>
                      ) : (
                        allUnitWork?.data?.unit_work?.map((items, index) => {
                          return (
                            <tr key={index}>
                              <td className="align-middle text-left">
                                {allUnitWork.page === 1
                                  ? index + 1
                                  : (allUnitWork.page - 1) * allUnitWork.limit +
                                    (index + 1)}
                              </td>
                              <td className="align-middle text-left p-part-t text-overflow-ens">
                                {items.name}
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
                                  {localStorage
                                    .getItem("permissions")
                                    .includes(
                                      "site_management.master-data.manage"
                                    ) && (
                                    <Link
                                      href={`/site-management/master-data/master-satuan-kerja-penyelenggara/ubah-satuan-kerja-penyelenggara/${items.id}`}
                                    >
                                      <a className="btn btn-link-action bg-blue-secondary position-relative btn-delete">
                                        <IconPencil width="16" height="16" />
                                        <div className="text-hover-show-hapus">
                                          Ubah
                                        </div>
                                      </a>
                                    </Link>
                                  )}

                                  {localStorage
                                    .getItem("permissions")
                                    .includes(
                                      "site_management.master-data.view"
                                    ) && (
                                    <Link
                                      href={`/site-management/master-data/master-satuan-kerja-penyelenggara/detail-satuan-kerja-penyelenggara/${items.id}`}
                                    >
                                      <a className="btn btn-link-action bg-blue-secondary ml-3 position-relative btn-delete">
                                        <IconEye width="16" height="16" />
                                        <div className="text-hover-show-hapus">
                                          Detail
                                        </div>
                                      </a>
                                    </Link>
                                  )}
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
                {allUnitWork &&
                  allUnitWork?.data?.perPage < allUnitWork?.data?.total && (
                    <>
                      <div
                        className={`${stylesPag.pagination} table-pagination`}
                      >
                        <Pagination
                          activePage={allUnitWork?.page}
                          itemsCountPerPage={allUnitWork?.data?.perPage}
                          totalItemsCount={allUnitWork?.data?.total}
                          pageRangeDisplayed={
                            windowDimensions.width > 320 ? 3 : 1
                          }
                          onChange={(page) => dispatch(setPage(page))}
                          nextPageText={">"}
                          prevPageText={"<"}
                          firstPageText={"<<"}
                          lastPageText={">>"}
                          itemClass="page-item"
                          linkClass="page-link"
                        />
                      </div>
                    </>
                  )}

                {allUnitWork ? (
                  <div className={`${stylesPag.rightPag} table-total ml-auto`}>
                    <div className="row align-items-center">
                      <div className="col-4 mr-0">
                        <select
                          className="form-control cursor-pointer pr-2"
                          id="exampleFormControlSelect2"
                          defaultValue=""
                          style={{
                            width: "70px",
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
                          Total Data{" "}
                          {allUnitWork.data && allUnitWork.data.total} List Data
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Table;
