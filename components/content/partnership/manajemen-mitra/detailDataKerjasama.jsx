import React, { useState, useEffect } from "react";
import Link from "next/link";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../wrapper/page.wrapper";
import CardPage from "../../../CardPage";
import ButtonAction from "../../../ButtonAction";
import Tables from "../../../Table/Table";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Image from "next/image";
import IconSearch from "../../../assets/icon/Search";
import Swal from "sweetalert2";
import IconEye from "../../../assets/icon/Eye";
import IconDelete from "../../../assets/icon/Delete";
import IconPencil from "../../../assets/icon/Pencil";

import {
  getSingleValue,
  searchByKeyDetail,
  setPageDetail,
  setLimitDetail,
  exportFileCSVDetail,
  fetchListSelectCooperation,
  fetchListSelectStatus,
  changeValueStatus,
  changeValueKerjaSama,
  deleteCooperation,
  reloadTable,
  changeStatusList,
} from "../../../../redux/actions/partnership/mitra.actions";
import IconArrow from "../../../assets/icon/Arrow";
import IconCalender from "../../../assets/icon/Calender";
import LoadingTable from "../../../LoadingTable";

const DetailDataKerjasama = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  let { update } = router.query;
  const mitraDetailAll = useSelector((state) => state.allMitra);

  const [keyWord, setKeyWord] = useState("");
  const [valueStatus, setValueStatus] = useState("");
  const [valueKerjaSama, setValueKerjaSama] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchByKeyDetail(keyWord));
  };

  const handleSubmitSearchMany = (event) => {
    event.preventDefault();
    dispatch(changeValueStatus(valueStatus));
    dispatch(changeValueKerjaSama(valueKerjaSama));
  };

  // const getDataSingleAll =(id)=>{
  //   if(id){
  //     dispatch(getSingleValue(id))
  //     dispatch(fetchListSelectCooperation());
  //     dispatch(fetchListSelectStatus());
  //   }
  // }
  const [deleteBar, setDeleteBar] = useState(false);
  const onNewReset = () => {
    router.replace(`/partnership/manajemen-mitra/detail/${router.query.id}`);
    setDeleteBar(false);
    setBarStatus(false);
  };
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
        dispatch(deleteCooperation(id));
        setDeleteBar(true);
        setBarStatus(false);
      } else {
        dispatch(reloadTable());
      }
    });
  };

  const [barStatus, setBarStatus] = useState(false);
  const changeListStatus = (value, id) => {
    Swal.fire({
      title: "Apakah anda yakin ingin merubah status ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya !",
      dismissOnDestroy: false,
    }).then(async (result) => {
      if (result.value) {
        dispatch(changeStatusList(value, id));
        setBarStatus(true);
      } else {
        dispatch(reloadTable());
      }
    });
  };

  const [getId, setgetId] = useState("");
  useEffect(() => {
    // getDataSingleAll(router.query.id)
    if (router.query.id) {
      setgetId(router.query.id);
      dispatch(getSingleValue(router.query.id));
      dispatch(fetchListSelectCooperation());
      dispatch(fetchListSelectStatus());
    }
  }, [
    dispatch,
    router.query.id,
    mitraDetailAll.keywordDetail,
    mitraDetailAll.pageDetail,
    mitraDetailAll.limitDetail,
    mitraDetailAll.statusDetail,
    mitraDetailAll.categories_cooporation,
    mitraDetailAll.status_reload,
  ]);

  return (
    <PageWrapper>
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        {deleteBar ? (
          <div
            className="alert alert-custom alert-light-success fade show mb-5"
            role="alert"
            style={{ backgroundColor: "#f7c9c9" }}
          >
            <div className="alert-icon">
              <i
                className="flaticon2-checkmark"
                style={{ color: "#c51b1b" }}
              ></i>
            </div>
            <div className="alert-text" style={{ color: "#c51b1b" }}>
              Berhasil menghapus data
            </div>
            <div className="alert-close">
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => onNewReset()}
              >
                <span aria-hidden="true">
                  <i className="ki ki-close"></i>
                </span>
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        {update ? (
          <div
            className="alert alert-custom alert-light-success fade show mb-5"
            role="alert"
            style={{ backgroundColor: "#C9F7F5" }}
          >
            <div className="alert-icon">
              <i
                className="flaticon2-checkmark"
                style={{ color: "#1BC5BD" }}
              ></i>
            </div>
            <div className="alert-text" style={{ color: "#1BC5BD" }}>
              Berhasil mengupdate data
            </div>
            <div className="alert-close">
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => onNewReset()}
              >
                <span aria-hidden="true">
                  <i className="ki ki-close"></i>
                </span>
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        {barStatus ? (
          <div
            className="alert alert-custom alert-light-success fade show mb-5"
            role="alert"
            style={{ backgroundColor: "#C9F7F5" }}
          >
            <div className="alert-icon">
              <i
                className="flaticon2-checkmark"
                style={{ color: "#1BC5BD" }}
              ></i>
            </div>
            <div className="alert-text" style={{ color: "#1BC5BD" }}>
              Berhasil mengupdate status
            </div>
            <div className="alert-close">
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => onNewReset()}
              >
                <span aria-hidden="true">
                  <i className="ki ki-close"></i>
                </span>
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark"
              style={{ fontSize: "24px" }}
            >
              Kerjasama
              {
                mitraDetailAll?.mitraDetailAll?.data
                  ?.list_cooperation_categories[0]?.partner?.user?.name
              }
            </h3>
          </div>

          <div className="card-body pt-0">
            <form onSubmit={handleSubmit}>
              <div className="table-filter">
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
                        id="kt_datatable_search_query"
                        onChange={(e) => setKeyWord(e.target.value)}
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
                    <div className="d-flex align-items-center justify-content-end">
                      {/* disini sortir modal */}
                      <button
                        type="button"
                        onClick={() => dispatch(exportFileCSVDetail(getId))}
                        className="btn btn-rounded-full bg-blue-secondary text-white ml-0"
                        style={{ width: "max-content" }}
                      >
                        Export .csv
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <div className="table-filter">
              <form onSubmit={handleSubmitSearchMany}>
                <div className="row align-items-right">
                  <div className="col-lg-3 col-xl-3 mt-5 mt-lg-5">
                    <div className="position-relative d-flex align-items-center cursor-pointer">
                      <select
                        onChange={(e) => setValueKerjaSama(e.target.value)}
                        name=""
                        id=""
                        className="form-control remove-icon-default cursor-pointer dropdown-lists"
                      >
                        <option value="">Kategori Kerjasama</option>
                        {mitraDetailAll.stateListKerjaSama.length === 0
                          ? ""
                          : mitraDetailAll.stateListKerjaSama.data.map(
                              (items, i) => {
                                return (
                                  <option
                                    key={i}
                                    value={items.cooperation_categories}
                                  >
                                    {items.cooperation_categories}
                                  </option>
                                );
                              }
                            )}
                      </select>
                      <IconCalender
                        className="right-center-absolute"
                        style={{ right: "10px" }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-2 col-xl-2 mt-5 mt-lg-5">
                    <div className="position-relative d-flex align-items-center cursor-pointer">
                      <select
                        onChange={(e) => setValueStatus(e.target.value)}
                        name=""
                        id=""
                        className="form-control remove-icon-default cursor-pointer dropdown-lists"
                      >
                        <option value="">Status</option>
                        {mitraDetailAll.stateListStatus.length === 0
                          ? ""
                          : mitraDetailAll.stateListStatus.data.map(
                              (items, i) => {
                                return (
                                  <option key={i} value={items.name_en}>
                                    {items.name}
                                  </option>
                                );
                              }
                            )}
                      </select>
                      <IconCalender
                        className="right-center-absolute"
                        style={{ right: "10px" }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-1 col-xl-1 mt-5 mt-lg-5 p-0 mx-2 py-1">
                    <button
                      type="submit"
                      className="btn bg-light-primary text-primary position-relative"
                      style={{ width: "120px", bottom: "2px" }}
                    >
                      Cari
                    </button>
                  </div>
                  <div className="col-lg-2 col-xl-2 mt-5 mt-lg-5 ml-auto">
                    {/* <a
                    href="#"
                    className="btn btn-sm btn-primary px-6 font-weight-bold btn-block"
                  >
                    Export .csv
                  </a> */}
                    {/* {console.log("pages",getId)} */}
                    {/* <button
                      type="button"
                      onClick={() => dispatch(exportFileCSVDetail(getId))}
                      className="btn btn-primary px-6 font-weight-bold btn-block"
                    >
                      Export .csv
                    </button> */}
                  </div>
                </div>
              </form>
            </div>

            {/* table disini */}

            {mitraDetailAll.mitraDetailAll.length === 0 ? (
              <div className="my-12">
                <LoadingTable />
              </div>
            ) : (
              <Tables
                tableHead={
                  <tr>
                    <th className="text-left align-middle">No</th>
                    <th className="text-left align-middle">Mitra</th>
                    <th className="text-left align-middle">Judul Kerjasama</th>
                    <th className="text-left align-middle">Periode</th>
                    <th className="text-left align-middle">
                      Tanggal Tanda Tangan
                    </th>
                    <th className="text-left align-middle">Tanggal Selesai</th>
                    <th className="text-left align-middle">Status</th>
                    <th className="text-left align-middle">Aksi</th>
                  </tr>
                }
                tableBody={
                  mitraDetailAll.status === "success" ? (
                    mitraDetailAll.mitraDetailAll.data.list_cooperation_categories.map(
                      (items, index) => {
                        return (
                          <tr key={index}>
                            <td className="text-left align-middle   ">
                              <button
                                className="btn mr-1"
                                style={{
                                  background: "#F3F6F9",
                                  borderRadius: "6px",
                                }}
                              >
                                {mitraDetailAll.pageDetail === 1
                                  ? index + 1
                                  : (mitraDetailAll.pageDetail - 1) *
                                      mitraDetailAll.limitDetail +
                                    (index + 1)}
                              </button>
                            </td>
                            <td className="align-middle text-left">
                              {items.partner.user.name}
                            </td>
                            <td className="d-flex justify-content-start">
                              <div className="d-flex align-items-start justify-content-center flex-column">
                                <p className="p-part-t">{items.title}</p>
                                <p className="p-part-d">
                                  (
                                  {items.cooperation_category === null
                                    ? "tidak ada kategori kerjasama"
                                    : items.cooperation_category
                                        .cooperation_categories}
                                  )
                                </p>
                              </div>
                            </td>
                            <td className="align-middle text-left">
                              {items.period} {items.period_unit}
                            </td>
                            <td className="align-middle text-left">
                              {items.signing_date}
                            </td>
                            <td className="align-middle">
                              {items.period_date_end}
                            </td>
                            <td className="align-middle text-left">
                              {items.status.name === "aktif" ? (
                                <div className="position-relative">
                                  <select
                                    name=""
                                    id=""
                                    className="form-control remove-icon-default dropdown-arrows"
                                    key={index}
                                    onChange={(e) =>
                                      changeListStatus(e.target.value, items.id)
                                    }
                                  >
                                    <option value="1">
                                      {items.status.name}
                                    </option>
                                    <option value="2">tidak aktif</option>
                                  </select>
                                  <IconArrow
                                    className="right-center-absolute"
                                    style={{ right: "10px" }}
                                    width="7"
                                    height="7"
                                  />
                                </div>
                              ) : (
                                <div className="position-relative">
                                  <select
                                    name=""
                                    id=""
                                    className="form-control remove-icon-default dropdown-arrows"
                                    key={index}
                                    onChange={(e) =>
                                      changeListStatus(e.target.value, items.id)
                                    }
                                  >
                                    <option value="2">Tidak aktif</option>
                                    <option value="1">aktif</option>
                                  </select>
                                  <IconArrow
                                    className="right-center-absolute"
                                    style={{ right: "10px" }}
                                    width="7"
                                    height="7"
                                  />
                                </div>
                              )}
                            </td>
                            <td className="align-middle text-left">
                              {items.status.name === "aktif" ? (
                                <div>
                                  <button
                                    className="btn btn-link-action bg-blue-secondary btn-delete"
                                    onClick={() =>
                                      router.push({
                                        pathname: `/partnership/manajemen-mitra/detail/mitra/${items.id}`,
                                        query: { idDetail: getId },
                                      })
                                    }
                                  >
                                    <IconEye
                                      width="14"
                                      height="12"
                                      fill="rgba(255,255,255,1)"
                                    />
                                    <div className="text-hover-show-hapus">
                                      Detail
                                    </div>
                                  </button>
                                  <button
                                    className="btn btn-link-action bg-blue-secondary position-relative btn-delete"
                                    onClick={() =>
                                      router.push({
                                        pathname: `/partnership/manajemen-mitra/edit/mitra/${items.id}`,
                                        query: { idDetail: getId },
                                      })
                                    }
                                  >
                                    <IconEye
                                      width="14"
                                      height="12"
                                      fill="rgba(255,255,255,1)"
                                    />
                                    <div className="text-hover-show-hapus">
                                      Edit
                                    </div>
                                  </button>
                                </div>
                              ) : (
                                <div className="d-flex align-items-center">
                                  <button
                                    className="btn btn-link-action bg-blue-secondary btn-delete"
                                    onClick={() =>
                                      router.push({
                                        pathname: `/partnership/manajemen-mitra/detail/mitra/${items.id}`,
                                        query: { idDetail: getId },
                                      })
                                    }
                                  >
                                    <IconEye
                                      width="14"
                                      height="12"
                                      fill="rgba(255,255,255,1)"
                                    />
                                    <div className="text-hover-show-hapus">
                                      Detail
                                    </div>
                                  </button>
                                  <button
                                    className="btn btn-link-action bg-blue-secondary mx-3 position-relative btn-delete"
                                    onClick={() =>
                                      router.push({
                                        pathname: `/partnership/manajemen-mitra/edit/mitra/${items.id}`,
                                        query: { idDetail: getId },
                                      })
                                    }
                                  >
                                    <IconPencil />
                                    <div className="text-hover-show-hapus">
                                      Edit
                                    </div>
                                  </button>
                                  <button
                                    className="btn btn-link-action bg-blue-secondary position-relative btn-delete"
                                    onClick={() => cooperationDelete(items.id)}
                                  >
                                    <IconDelete />
                                    <div className="text-hover-show-hapus">
                                      Hapus
                                    </div>
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      }
                    )
                  ) : (
                    <tr>
                      <td colSpan="8">
                        <LoadingTable />
                      </td>
                    </tr>
                  )
                }
                pagination={
                  <Pagination
                    activePage={mitraDetailAll.pageDetail}
                    itemsCountPerPage={
                      mitraDetailAll?.mitraDetailAll?.data?.perPage
                    }
                    totalItemsCount={
                      mitraDetailAll?.mitraDetailAll?.data?.total
                    }
                    pageRangeDisplayed={3}
                    onChange={(page) => dispatch(setPageDetail(page))}
                    nextPageText={">"}
                    prevPageText={"<"}
                    firstPageText={"<<"}
                    lastPageText={">>"}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                }
                onChangeLimit={(e) => dispatch(setLimitDetail(e.target.value))}
                totalData={
                  mitraDetailAll.mitraDetailAll &&
                  mitraDetailAll.totalDataDetail
                }
              />
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default DetailDataKerjasama;
