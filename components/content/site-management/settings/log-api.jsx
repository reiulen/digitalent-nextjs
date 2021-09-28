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
import IconClose from "../../../assets/icon/Close";
import IconFilter from "../../../assets/icon/Filter";
import IconArrow from "../../../assets/icon/Arrow";

const Table = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const onNewReset = () => {
    router.replace("/site-management/api", undefined, {
      shallow: true,
    });
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
              Log API
            </h3>
          </div>
          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-12 col-xl-12">
                  <form
                    // onSubmit={handleSubmit}
                  >
                 <div className="row">
                      <div className="col-12 col-sm-6">
                        <div className="position-relative overflow-hidden w-100 mt-5">
                          <IconSearch
                            style={{ left: "10" }}
                            className="left-center-absolute"
                          />
                          <input
                            id="kt_datatable_search_query"
                            type="text"
                            className="form-control pl-10"
                            placeholder="Ketik disini untuk Pencarian..."
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
                      <div className="col-12 col-sm-6">
                        <div className="d-flex flex-wrap align-items-center justify-content-end mt-2">
                          {/* sorotir by modal */}
                          <button
                          type="button"
                            className="avatar item-rtl btn border d-flex align-items-center justify-content-between mt-2"
                            data-toggle="modal"
                            data-target="#exampleModalCenter"
                            style={{ color: "#464646", minWidth: "230px" }}
                          >
                            <div className="d-flex align-items-center">
                              <IconFilter className="mr-3" />
                              Pilih Filter
                            </div>
                            <IconArrow fill="#E4E6EF" width="11" height="11" />
                          </button>
                          {/* modal */}
                          <form
                            className="form text-left"
                          >
                            <div
                              className="modal fade"
                              id="exampleModalCenter"
                              tabIndex="-1"
                              role="dialog"
                              aria-labelledby="exampleModalCenterTitle"
                              aria-hidden="true"
                            >
                              <div
                                className="modal-dialog modal-dialog-centered"
                                role="document"
                              >
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="exampleModalLongTitle"
                                    >
                                      Filter
                                    </h5>
                                    <button
                                      type="button"
                                      className="close"
                                      data-dismiss="modal"
                                      aria-label="Close"
                                    >
                                      <IconClose />
                                    </button>
                                  </div>

                                  <div
                                    className="modal-body text-left"
                                    style={{ height: "400px" }}
                                  >
                                    <div className="fv-row mb-10">
                                      <label className="required fw-bold fs-6 mb-2">
                                        Kategori Kerjasama
                                      </label>
                                      React Select
                                      {/* <Select
                                        ref={(ref) =>
                                          (selectRefKerjasama = ref)
                                        }
                                        className="basic-single"
                                        classNamePrefix="select"
                                        placeholder="Semua"
                                        defaultValue={
                                          allMK.stateListKerjaSama[0]
                                        }
                                        isDisabled={false}
                                        isLoading={false}
                                        isClearable={false}
                                        isRtl={false}
                                        isSearchable={true}
                                        name="color"
                                        onChange={(e) =>
                                          setValueKerjaSama(
                                            e?.cooperation_categories
                                          )
                                        }
                                        options={allMK.stateListKerjaSama}
                                      /> */}
                                    </div>
                                    <div className="fv-row mb-10">
                                      <label className="required fw-bold fs-6 mb-2">
                                        Status
                                      </label>
                                      React Select
                                      {/* <Select
                                        ref={(ref) => (selectRefStatus = ref)}
                                        className="basic-single"
                                        classNamePrefix="select"
                                        placeholder="Semua"
                                        defaultValue={allMK.stateListStatus[0]}
                                        isDisabled={false}
                                        isLoading={false}
                                        isClearable={false}
                                        isRtl={false}
                                        isSearchable={true}
                                        name="color"
                                        onChange={(e) =>
                                          setValueStatus(e?.name_en)
                                        }
                                        options={allMK.stateListStatus}
                                      /> */}
                                    </div>
                                  </div>
                                  <div className="modal-footer">
                                    <div className="d-flex justify-content-end align-items-center">
                                      <button
                                        className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5"
                                        type="button"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                      >
                                        Reset
                                      </button>
                                      <button
                                        className="btn btn-sm btn-rounded-full bg-blue-primary text-white "
                                        type="button"
                                      >
                                        Terapkan
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                          {/* end modal */}

                          {/* btn export */}
                          <button
                            className="btn btn-rounded-full bg-blue-secondary text-white ml-4 mt-2"
                            type="button"
                          >
                            Export .xlsx
                          </button>
                        </div>
                      </div>
                    </div> </form>
                </div>
              </div>
            </div>
            <div className="table-page mt-5">
              <div className="table-responsive">
                <table className="table table-separate table-head-custom table-checkable">
                  <thead style={{ background: "#F3F6F9" }}>
                    <tr>
                      <th className="text-left">No</th>
                      <th className="text-left align-middle">API</th>
                      <th className="text-left align-middle">URL</th>
                      <th className="text-left align-middle">Key</th>
                      <th className="text-left align-middle">Pengguna</th>
                      <th className="text-left align-middle">Masa Berlaku</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="align-middle text-left">1</td>
                      <td className="align-middle text-left">api</td>
                      <td className="align-middle text-left">url</td>
                      <td className="align-middle text-left">key</td>
                      <td className="align-middle text-left">pengguna</td>
                      <td className="align-middle text-left">masa berlaku</td>
                    </tr>
                  </tbody>
                </table>
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
