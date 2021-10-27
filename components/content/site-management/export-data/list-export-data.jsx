import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../wrapper/page.wrapper";
import { useDispatch, useSelector } from "react-redux";
import LoadingTable from "../../../LoadingTable";
import IconEye from "../../../assets/icon/Eye";
import IconPencil from "../../../assets/icon/Pencil";
import IconDelete from "../../../assets/icon/Delete";
import IconAdd from "../../../assets/icon/Add";
import IconSearch from "../../../assets/icon/Search";
import AlertBar from "../../partnership/components/BarAlert";
import Image from 'next/image'
import moment from 'moment'

import {
  getAllExportData,
  setPage,
  limitCooporation,
  searchCooporation,
  exportFileCSV,
  deleteExportDataAction
} from "../../../../redux/actions/site-management/export-data.actions";

const Table = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const allExportData = useSelector(state => state.allExportData)
  const deleteExportData = useSelector(state => state.deleteExportData)
  console.log("allExportData",allExportData)
  console.log("deleteExportData",deleteExportData)

  const [valueSearch, setValueSearch] = useState("");
  const handleChangeValueSearch = (value) => {
    setValueSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchCooporation(valueSearch));
  };

  useEffect(() => {
    dispatch(getAllExportData(token));
  }, [dispatch, allExportData.cari, allExportData.page, allExportData.limit, token]);

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark"
              style={{ fontSize: "24px" }}
            >
              Export Data
            </h3>
          </div>
          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row">
                <div className="col-12 col-sm-6">
                  <div
                    className="d-flex align-items-center w-100"
                  >
                    <div className="position-relative overflow-hidden w-100">
                      <IconSearch
                        style={{ left: "10" }}
                        className="left-center-absolute"
                      />
                      <input
                        type="text"
                        className="form-control pl-10"
                        placeholder="Ketik disini untuk Pencarian..."
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
                <div className="col-12 col-sm-6">
                  <div className="d-flex justify-content-end">
                    <Link href="/site-management/export-data/filter-export-data" passHref>

                    <a className="btn btn-rounded-full bg-blue-secondary text-white">
                      Filter Data
                    </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-page mt-5">
              <div className="table-responsive">
                {allExportData.status === "process" ? (
                  <LoadingTable />
                ) : (
                <table className="table table-separate table-head-custom table-checkable">
                  <thead style={{ background: "#F3F6F9" }}>
                    <tr>
                      <th className="text-left">No</th>
                      <th className="text-left align-middle">
                        Histori Filter Data
                      </th>
                      <th className="text-left align-middle">
                        Tanggal Filter Data
                      </th>
                      <th className="text-left align-middle">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allExportData.data.exports.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center">
                          <h4>Data tidak ditemukan</h4>
                        </td>
                      </tr>
                    ) : (
                      allExportData.data.exports.map((items, index) => {
                        return (

                    <tr key={index}>
                      <td className="align-middle text-left">
                        {allExportData.page === 1
                                ? index + 1
                                : (allExportData.page - 1) * allExportData.limit +
                                  (index + 1)}
                      </td>
                      <td className="align-middle text-left">{items.user.name}</td>
                      <td className="align-middle text-left">
                        {moment(items.filtered_at).format("DD MMMM YYYY")}
                        </td>
                      <td className="align-middle text-left">
                        <div className="d-flex align-items-center">


                          <button
                            className="btn btn-link-action bg-blue-secondary position-relative btn-delete"
                            onClick={() => dispatch(exportFileCSV(items.id,token))
                            }
                          >
                            <Image src="/assets/icon/download.svg" width={16} height={16} alt="download" />
                            <div className="text-hover-show-hapus">Unduh</div>
                          </button>


                          



                          {/* <button
                            className="btn btn-link-action bg-blue-secondary mx-3 position-relative btn-delete"
                            onClick={() =>
                              router.push(
                                `/site-management/export-data/detail-data`
                              )
                            }
                          >
                            <IconEye width="16" height="16" />
                            <div className="text-hover-show-hapus">Detail</div>
                          </button> */}


                          <Link
                                        href={`/site-management/export-data/detail-data/${items.id}`}
                                      >
                                        <a className="btn btn-link-action bg-blue-secondary position-relative btn-delete mx-3">
                                          <IconEye width="16" height="16" />
                                          <div className="text-hover-show-hapus">
                                            Detail
                                          </div>
                                        </a>
                                      </Link>










                          <button
                            className="btn btn-link-action bg-blue-secondary position-relative btn-delete"
                            onClick={() =>
                              dispatch(deleteExportDataAction(items.id,token))
                            }
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
                )}
              </div>

              <div className="row">
                <div className="table-pagination paginate-cs">
                  <div className="table-pagination">
                      <Pagination
                        activePage={allExportData.page}
                        itemsCountPerPage={allExportData.data.perPage}
                        totalItemsCount={allExportData.data.total}
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
                        Total Data {allExportData.data &&
                          allExportData.data.total} List Data
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
