import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";
import DatePicker from "react-datepicker";

import Swal from "sweetalert2";

import Image from "next/image";

import PageWrapper from "../../../wrapper/page.wrapper";
import CardPage from "../../../CardPage";
import ButtonAction from "../../../ButtonAction";

import IconCalender from "../../../assets/icon/Calender";
import axios from "axios";

import {
  reqCooperationUser,
  setPage,
} from "../../../../redux/actions/partnership/user/cooperation.actions";
import LoadingTable from '../../../LoadingTable'

// icon
import IconSearch from "../../../assets/icon/Search";
import IconReview from "../../../assets/icon/Review";
import IconArrow from "../../../assets/icon/Arrow";
import IconAdd from "../../../assets/icon/Add";
import IconClose from "../../../assets/icon/Close";
import IconFilter from "../../../assets/icon/Filter";
import IconEye from "../../../assets/icon/Eye";
import IconPencil from "../../../assets/icon/Pencil";
import IconDelete from "../../../assets/icon/Delete";

const Table = () => {
  // const exportCSV = {
  //   width: "77%",
  //   marginLeft: "2rem",
  // };

  const dispatch = useDispatch();
  const router = useRouter();

  const allCooperationUser = useSelector((state) => state.allCooperationUser);
  console.log("allCooperationUser",allCooperationUser)
 

  useEffect(() => {
    // dispatch(reqCooperationUser());
  }, [dispatch]);

  return (
    <PageWrapper>
      <div className="col-lg-12 col-md-12">
        <div className="row">
          <CardPage
            background="bg-light-success"
            icon="user-blue.svg"
            color="#ffffff"
            value="12"
            titleValue="Kerjasama"
            title="Kerjasama Aktif"
          />
          <CardPage
            background="bg-light-warning"
            icon="user-orange.svg"
            color="#ffffff"
            value="2"
            titleValue="Kerjasama"
            title="Pengajuan Kerjasama"
          />
          <CardPage
            background="bg-light-danger"
            icon="info-danger.svg"
            color="#ffffff"
            value="32"
            titleValue="Kerjasama"
            title="Kerjasama akan Habis"
          />
        </div>
      </div>

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">

          <div className="d-flex flex-wrap align-items-center justify-content-between p-8">
            <h1
              className="card-title font-weight-bolder text-dark"
              style={{ fontSize: "24px" }}
            >
              Kerjasama
            </h1>
            <Link href="/partnership/kerjasama/tambah">
              <a className="btn btn-rounded-full bg-blue-primary text-white">
                <IconAdd className="mr-3" width="18" height="16" />
                Tambah kerjasama
              </a>
            </Link>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">

              <div className="row align-items-center">
                <div className="col-lg-12 col-xl-12">
                  <form>
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
                            // onChange={(e) =>
                            //   handleChangeValueSearch(e.target.value)
                            // }
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
                                        Mitra
                                      </label>

                                      {/* <Select
                                        ref={(ref) => (selectRefMitra = ref)}
                                        className="basic-single"
                                        classNamePrefix="select"
                                        placeholder="Semua"
                                        defaultValue={allMK.stateListMitra[0]}
                                        isDisabled={false}
                                        isLoading={false}
                                        isClearable={false}
                                        isRtl={false}
                                        isSearchable={true}
                                        name="color"
                                        onChange={(e) => setValueMitra(e?.name )}
                                        options={allMK.stateListMitra}
                                      /> */}
                                    </div>
                                    <div className="fv-row mb-10">
                                      <label className="required fw-bold fs-6 mb-2">
                                        Kategori Kerjasama
                                      </label>
                                      {/* <Select
                                        ref={(ref) => (selectRefKerjasama = ref)}
                                        className="basic-single"
                                        classNamePrefix="select"
                                        placeholder="Semua"
                                        defaultValue={allMK.stateListKerjaSama[0]}
                                        isDisabled={false}
                                        isLoading={false}
                                        isClearable={false}
                                        isRtl={false}
                                        isSearchable={true}
                                        name="color"
                                        onChange={(e) => setValueKerjaSama(e?.cooperation_categories )}
                                        options={allMK.stateListKerjaSama}
                                      /> */}
                                    </div>
                                    <div className="fv-row mb-10">
                                      <label className="required fw-bold fs-6 mb-2">
                                        Status
                                      </label>
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
                                        onChange={(e) => setValueStatus(e?.name_en )}
                                        options={allMK.stateListStatus}
                                      /> */}
                                    </div>
                                  </div>
                                  <div className="modal-footer">
                                    <div className="d-flex justify-content-end align-items-center">
                                      <button
                                        className="btn btn-white"
                                        type="button"
                                      data-dismiss="modal"
                                      aria-label="Close"
                                        // onClick={() => resetValueSort()}
                                      >
                                        Reset
                                      </button>
                                      <button
                                        className="btn btn-primary ml-4"
                                        type="button"
                                        // onClick={(e) =>
                                        //   handleSubmitSearchMany(e)
                                        // }
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
                            // onClick={() => dispatch(exportFileCSV())}
                          >
                            Export .xlxs
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
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-left">No</th>
                        <th className="text-left align-middle">Mitra</th>
                        <th className="text-left align-middle">
                          Judul Kerjasama
                        </th>
                        <th className="text-left align-middle">Periode</th>
                        <th className="text-left align-middle">
                          Tanggal Awal Kerjasama
                        </th>
                        <th className="text-left align-middle">
                          Tanggal Selesai Kerjasama
                        </th>
                        <th className="text-left align-middle">Status</th>
                        <th className="text-left align-middle">Aksi</th>
                      </tr>
                    </thead>

                    <tbody>

                      <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                      </tr>
                      
                      
                      
                        </tbody>
                  </table>
              </div>
              <div className="row">
                <div className="table-pagination">
                  {/* <Pagination
                    activePage={allMK.page}
                    itemsCountPerPage={allMK?.m_cooporation?.data?.perPage}
                    totalItemsCount={allMK?.m_cooporation?.data?.total}
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
                  <div className="row mt-4">
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
                        // onChange={(e) =>
                        //   dispatch(limitCooporation(e.target.value))
                        // }
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
                        Total Data{" "}
                        {/* {allMK.m_cooporation.data &&
                          allMK.m_cooporation.data.total} */}
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
