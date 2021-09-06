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
import IconAdd from "../../../assets/icon/Add";
import IconClose from "../../../assets/icon/Close";
import IconFilter from "../../../assets/icon/Filter";

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

import { RESET_VALUE_SORTIR } from "../../../../redux/types/partnership/mitra.type";

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

  const resetValueSort = () => {
    document.getElementById("list-kerjasama").selectedIndex = 0;
    document.getElementById("list-status").selectedIndex = 0;
    dispatch({
      type: RESET_VALUE_SORTIR,
    });
  };

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
              Kerjasama &nbsp;
              {
                mitraDetailAll?.mitraDetailAll?.data
                  ?.list_cooperation_categories[0]?.partner?.user?.name
              }
            </h3>
          </div>

          <div className="card-body pt-0">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="position-relative overflow-hidden w-100 mt-2">
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
                  <div className="d-flex flex-wrap align-items-center justify-content-end mt-2">
                    {/* disini sortir modal */}
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
                      // id="kt_docs_formvalidation_text"
                      className="form text-left"
                      // action="#"
                      // autoComplete="off"
                      // onSubmit={handleSubmitSearchMany}
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
                                  Kerjasama
                                </label>
                                <select
                                  onChange={(e) =>
                                    setValueKerjaSama(e.target.value)
                                  }
                                  id="list-kerjasama"
                                  className="form-select form-control"
                                  aria-label="Select example"
                                >
                                  <option value="">Semua</option>
                                  {mitraDetailAll.stateListKerjaSama.length ===
                                  0
                                    ? ""
                                    : mitraDetailAll.stateListKerjaSama.data.map(
                                        (items, i) => {
                                          return (
                                            <option
                                              key={i}
                                              value={
                                                items.cooperation_categories
                                              }
                                            >
                                              {items.cooperation_categories}
                                            </option>
                                          );
                                        }
                                      )}
                                </select>
                              </div>
                              <div className="fv-row mb-10">
                                <label className="required fw-bold fs-6 mb-2">
                                  Status
                                </label>
                                <select
                                  id="list-status"
                                  onChange={(e) =>
                                    setValueStatus(e.target.value)
                                  }
                                  className="form-select form-control"
                                  aria-label="Select example"
                                >
                                  <option value="">Semua</option>
                                  {mitraDetailAll.stateListStatus.length === 0
                                    ? ""
                                    : mitraDetailAll.stateListStatus.data.map(
                                        (items, i) => {
                                          return (
                                            <option
                                              key={i}
                                              value={items.name_en}
                                            >
                                              {items.name}
                                            </option>
                                          );
                                        }
                                      )}
                                </select>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <div className="d-flex justify-content-end align-items-center">
                                {/* <Link href="/compoenent">
                                        <a className="btn btn-white">Reset</a>
                                      </Link> */}
                                <button
                                  className="btn btn-white"
                                  type="button"
                                  onClick={() => resetValueSort()}
                                >
                                  Reset
                                </button>
                                <button
                                  className="btn btn-primary ml-4"
                                  type="button"
                                  onClick={(e) => handleSubmitSearchMany(e)}
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
                      type="button"
                      onClick={() => dispatch(exportFileCSVDetail(getId))}
                      className="btn btn-rounded-full bg-blue-secondary text-white ml-4 mt-2"
                      style={{ width: "max-content" }}
                    >
                      Export . xlxs
                    </button>
                  </div>
                </div>
              </div>
            </form>


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
