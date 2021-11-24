import React, { useState, useEffect } from "react";
import Link from "next/link";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../wrapper/page.wrapper";
import Tables from "../../../Table/Table";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import IconSearch from "../../../assets/icon/Search";
import Swal from "sweetalert2";
import IconEye from "../../../assets/icon/Eye";
import IconDelete from "../../../assets/icon/Delete";
import IconPencil from "../../../assets/icon/Pencil";
import IconClose from "../../../assets/icon/Close";
import IconFilter from "../../../assets/icon/Filter";
import Select from "react-select";
import IconReview from "../../../assets/icon/Review";

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
  changeStatusListCooperation,
} from "../../../../redux/actions/partnership/mitra.actions";

import { rejectCooperation } from "../../../../redux/actions/partnership/managementCooporation.actions";

import IconArrow from "../../../assets/icon/Arrow";
import LoadingTable from "../../../LoadingTable";
import AlertBar from "../components/BarAlert";
import { RESET_VALUE_SORTIR } from "../../../../redux/types/partnership/mitra.type";
import moment from "moment";

const DetailDataKerjasama = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  let { update } = router.query;
  const mitraDetailAll = useSelector((state) => state.allMitra);
  const allMK = useSelector((state) => state.allMK);

  let selectRefKerjasama = null;
  let selectRefStatus = null;

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
    selectRefKerjasama.select.clearValue();
    selectRefStatus.select.clearValue();
    setValueKerjaSama("");
    setValueStatus("");
    setKeyWord("");

    dispatch({
      type: RESET_VALUE_SORTIR,
    });
  };

  const [deleteBar, setDeleteBar] = useState(false);

  const onNewReset = () => {
    setDeleteBar(false);
    setBarStatus(false);
    router.replace(
      `/partnership/mitra/detail-data-kerjasama-mitra?id=${router.query.id}`,
      undefined,
      {
        shallow: true,
      }
    );
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
        dispatch(deleteCooperation(token, id));
        setDeleteBar(true);
        setBarStatus(false);
      } else {
        dispatch(reloadTable());
      }
    });
  };

  const [isStatusBar, setIsStatusBar] = useState(false);

  const cooperationRejection = (id) => {
    Swal.fire({
      title: "Apakah anda yakin ingin batalkan kerjasama ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya !",
      dismissOnDestroy: false,
    }).then(async (result) => {
      if (result.value) {
        dispatch(rejectCooperation(token, id));
        setIsStatusBar(true);
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
        let formData = new FormData();
        formData.append("_method", "put");
        formData.append("status", value);
        dispatch(changeStatusListCooperation(token, formData, id));
        setBarStatus(true);
      } else {
        dispatch(reloadTable());
      }
    });
  };

  const [getId, setgetId] = useState("");
  useEffect(() => {
    if (router.query.id) {
      setgetId(router.query.id);
      dispatch(getSingleValue(token, router.query.id));
      dispatch(fetchListSelectCooperation(token));
      dispatch(fetchListSelectStatus(token));
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
    token,
    allMK.status,
    allMK.status_delete,
    allMK.status_list,
  ]);

  return (
    <PageWrapper>
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        {deleteBar ? (
          <AlertBar
            text="Berhasil menghapus data"
            className="alert-light-success"
            onClick={() => onNewReset()}
          />
        ) : (
          ""
        )}
        {update ? (
          <AlertBar
            text="Berhasil mengubah data"
            className="alert-light-success"
            onClick={() => onNewReset()}
          />
        ) : (
          ""
        )}
        {barStatus ? (
          <AlertBar
            text="Berhasil mengubah data"
            className="alert-light-success"
            onClick={() => onNewReset()}
          />
        ) : (
          ""
        )}
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark titles-1">
              Kerjasama &nbsp;
              {mitraDetailAll?.mitraDetailAll?.data?.title}
            </h3>
          </div>

          <div className="card-body pt-0">
            <div className="row">
              <div className="col-12 col-xl-6">
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
                    onChange={(e) => setKeyWord(e.target.value)}
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
              <div className="col-12 col-xl-6">
                <div className="d-flex flex-wrap align-items-center justify-content-xl-end justify-content-start mt-2">
                  {/* disini sortir modal */}
                  <button
                    className="avatar item-rtl btn border d-flex align-items-center justify-content-between mt-2 col-12 col-md-9 col-xl-3 mr-sm-1"
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
                  <form className="form text-left">
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
                              <Select
                                ref={(ref) => (selectRefKerjasama = ref)}
                                className="basic-single"
                                classNamePrefix="select"
                                placeholder="Semua"
                                defaultValue={
                                  mitraDetailAll.stateListKerjaSama[0]
                                }
                                isDisabled={false}
                                isLoading={false}
                                isClearable={false}
                                isRtl={false}
                                isSearchable={true}
                                name="color"
                                onChange={(e) =>
                                  setValueKerjaSama(e?.cooperation_categories)
                                }
                                options={mitraDetailAll.stateListKerjaSama}
                              />
                            </div>
                            <div className="fv-row mb-10">
                              <label className="required fw-bold fs-6 mb-2">
                                Status
                              </label>
                              <Select
                                ref={(ref) => (selectRefStatus = ref)}
                                className="basic-single"
                                classNamePrefix="select"
                                placeholder="Semua"
                                defaultValue={mitraDetailAll.stateListStatus[0]}
                                isDisabled={false}
                                isLoading={false}
                                isClearable={false}
                                isRtl={false}
                                isSearchable={true}
                                name="color"
                                onChange={(e) => setValueStatus(e?.name_en)}
                                options={mitraDetailAll.stateListStatus}
                              />
                            </div>
                          </div>
                          <div className="modal-footer">
                            <div className="d-flex justify-content-end align-items-center">
                              <button
                                className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5"
                                type="button"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={() => resetValueSort()}
                              >
                                Reset
                              </button>
                              <button
                                className="btn btn-sm btn-rounded-full bg-blue-primary text-white "
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
                    onClick={() => dispatch(exportFileCSVDetail(token, getId))}
                    className="btn btn-rounded-full bg-blue-secondary text-white ml-sm-11  ml-md-6 mt-2"
                    style={{ width: "max-content" }}
                  >
                    Export .xlsx
                  </button>
                </div>
              </div>
            </div>
            {/* </form> */}

            {/* table disini */}

            {
              <Tables
                tableHead={
                  <tr>
                    <th className="text-left align-middle">No</th>
                    <th className="text-left align-middle">Mitra</th>
                    <th className="text-left align-middle">Judul Kerjasama</th>
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
                }
                tableBody={
                  mitraDetailAll.status === "process" ? (
                    <tr>
                      <td colSpan="8" className="text-center">
                        <LoadingTable />
                      </td>
                    </tr>
                  ) : mitraDetailAll.mitraDetailAll.data &&
                    mitraDetailAll.mitraDetailAll.data
                      .list_cooperation_categories.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center">
                        <h4>Data tidak ditemukan</h4>
                      </td>
                    </tr>
                  ) : (
                    mitraDetailAll.mitraDetailAll.data &&
                    mitraDetailAll.mitraDetailAll.data.list_cooperation_categories.map(
                      (items, index) => {
                        return (
                          <tr key={index}>
                            <td className="text-left align-middle">
                              {mitraDetailAll.pageDetail === 1
                                ? index + 1
                                : (mitraDetailAll.pageDetail - 1) *
                                    mitraDetailAll.limitDetail +
                                  (index + 1)}
                            </td>
                            <td className="align-middle text-left">
                              {items.partner.user.name}
                            </td>
                            <td className="d-flex justify-content-start">
                              <div className="d-flex align-items-start justify-content-center flex-column">
                                <p className="p-part-t text-overflow-ens">
                                  {items.title}
                                </p>
                                <p className="p-part-d text-overflow-ens">
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
                              {items.period_date_start === null
                                ? "-"
                                : moment(items.period_date_start).format(
                                    "DD MMMM YYYY"
                                  )}
                              {/* {items.signing_date} */}
                            </td>
                            <td className="align-middle">
                              {items.period_date_end === null
                                ? "-"
                                : moment(items.period_date_end).format(
                                    "DD MMMM YYYY"
                                  )}
                              {/* {items.period_date_end} */}
                            </td>
                            <td className="align-middle text-left">
                              {items.status.name === "aktif" &&
                              moment(items.period_date_start).format(
                                "YYYY MM DD"
                              ) > moment().format("YYYY MM DD") ? (
                                <div className="position-relative w-max-content text-capitalize">
                                  <select
                                    name=""
                                    id=""
                                    disabled
                                    className="form-control remove-icon-default dropdown-arrows-green"
                                    key={index}
                                    onChange={(e) =>
                                      changeListStatus(e.target.value, items.id)
                                    }
                                  >
                                    <option value="1">Disetujui</option>
                                    <option value="2">Tidak Aktif</option>
                                  </select>
                                </div>
                              ) : items.status.name === "aktif" &&
                                moment(items.period_date_start).format(
                                  "YYYY MM DD"
                                ) <= moment().format("YYYY MM DD") ? (
                                <div className="position-relative w-max-content text-capitalize">
                                  <select
                                    name=""
                                    id=""
                                    className="form-control remove-icon-default dropdown-arrows-green text-capitalize"
                                    key={index}
                                    onChange={(e) =>
                                      changeListStatus(e.target.value, items.id)
                                    }
                                  >
                                    <option value="1">
                                      {items.status.name}
                                    </option>
                                    <option value="2">Tidak Aktif</option>
                                  </select>
                                  <IconArrow
                                    className="right-center-absolute"
                                    style={{ right: "10px" }}
                                    width="7"
                                    height="7"
                                  />
                                </div>
                              ) : items.status.name === "tidak aktif" ? (
                                <div className="position-relative w-max-content text-capitalize">
                                  <select
                                    name=""
                                    id=""
                                    className="form-control remove-icon-default dropdown-arrows-red-primary text-capitalize  pr-10"
                                    key={index}
                                    onChange={(e) =>
                                      changeListStatus(e.target.value, items.id)
                                    }
                                  >
                                    <option value="2">Tidak Aktif</option>
                                    <option value="1">Aktif</option>
                                  </select>
                                  <IconArrow
                                    className="right-center-absolute"
                                    style={{ right: "10px" }}
                                    fill="#F65464"
                                    width="7"
                                    height="7"
                                  />
                                </div>
                              ) : items.status.name === "pengajuan-review" ? (
                                <div className="position-relative w-max-content text-capitalize">
                                  <select
                                    disabled
                                    name=""
                                    id=""
                                    className="form-control remove-icon-default dropdown-arrows-blue"
                                  >
                                    <option value="">Pengajuan - Review</option>
                                  </select>
                                  <IconArrow
                                    className="right-center-absolute"
                                    style={{ right: "10px" }}
                                    width="7"
                                    height="7"
                                  />
                                </div>
                              ) : items.status.name === "pengajuan-revisi" ? (
                                <div className="position-relative w-max-content text-capitalize">
                                  <select
                                    disabled
                                    name=""
                                    id=""
                                    className="form-control remove-icon-default dropdown-arrows-yellow"
                                  >
                                    <option value="">Pengajuan - Revisi</option>
                                  </select>
                                  <IconArrow
                                    className="right-center-absolute"
                                    style={{ right: "10px" }}
                                    width="7"
                                    height="7"
                                  />
                                </div>
                              ) : items.status.name ===
                                "pengajuan-pembahasan" ? (
                                <div className="position-relative w-max-content text-capitalize">
                                  <select
                                    name=""
                                    id=""
                                    className="form-control remove-icon-default dropdown-arrows-blue pr-10"
                                    onChange={(e) =>
                                      changeListStatus(e.target.value, items.id)
                                    }
                                  >
                                    <option value="5">
                                      Pengajuan-Pembahasan
                                    </option>
                                    <option value="6">Pengajuan-Selesai</option>
                                  </select>
                                  <IconArrow
                                    className="right-center-absolute"
                                    style={{ right: "10px" }}
                                    width="7"
                                    height="7"
                                  />
                                </div>
                              ) : items.status.name === "pengajuan-selesai" ? (
                                <div className="position-relative w-max-content text-capitalize">
                                  <select
                                    disabled
                                    name=""
                                    id=""
                                    className="form-control remove-icon-default dropdown-arrows-blue"
                                  >
                                    <option value="">
                                      Pengajuan - Selesai
                                    </option>
                                  </select>
                                </div>
                              ) : items.status.name === "pengajuan-document" ? (
                                <div className="position-relative w-max-content text-capitalize">
                                  <select
                                    disabled
                                    name=""
                                    id=""
                                    className="form-control remove-icon-default dropdown-arrows-blue"
                                  >
                                    <option value="">
                                      Pengajuan - Dokumen
                                    </option>
                                  </select>
                                </div>
                              ) : (
                                <div className="position-relative w-max-content text-capitalize">
                                  <select
                                    disabled
                                    name=""
                                    id=""
                                    className="form-control remove-icon-default dropdown-arrows-red-primary"
                                  >
                                    <option value="">Ditolak</option>
                                  </select>
                                </div>
                              )}
                            </td>
                            <td className="align-middle text-left">
                              {items.status.name === "aktif" &&
                              moment(items.period_date_start).format(
                                "YYYY MM DD"
                              ) > moment().format("YYYY MM DD") ? (
                                <div className="d-flex align-items-center">
                                  <Link
                                    href={{
                                      pathname: `/partnership/mitra/detail-data-kerjasama-mitra/sub-detail`,
                                      query: { id: items.id, idDetail: getId },
                                    }}
                                  >
                                    <a className="btn btn-link-action bg-blue-secondary position-relative btn-delete mr-3">
                                      <IconEye
                                        width="16"
                                        height="16"
                                        fill="rgba(255,255,255,1)"
                                      />
                                      <div className="text-hover-show-hapus">
                                        Detail
                                      </div>
                                    </a>
                                  </Link>

                                  <button
                                    className="btn btn-link-action bg-blue-secondary position-relative btn-delete"
                                    onClick={() =>
                                      router.push({
                                        pathname: `/partnership/mitra/edit/mitra/${items.title
                                          .split(" ")
                                          .join("-")
                                          .toLowerCase()}`,
                                        query: {
                                          idDetail: getId,
                                          id: items.id,
                                        },
                                      })
                                    }
                                  >
                                    <IconPencil
                                      width="16"
                                      height="16"
                                      fill="rgba(255,255,255,1)"
                                    />
                                    <div className="text-hover-show-hapus">
                                      Ubah
                                    </div>
                                  </button>
                                </div>
                              ) : items.status.name === "aktif" &&
                                moment(items.period_date_start).format(
                                  "YYYY MM DD"
                                ) <= moment().format("YYYY MM DD") ? (
                                <div className="d-flex align-items-center">
                                  <Link
                                    href={{
                                      pathname: `/partnership/mitra/detail-data-kerjasama-mitra/sub-detail`,
                                      query: { id: items.id, idDetail: getId },
                                    }}
                                  >
                                    <a className="btn btn-link-action bg-blue-secondary position-relative btn-delete mr-3">
                                      <IconEye
                                        width="16"
                                        height="16"
                                        fill="rgba(255,255,255,1)"
                                      />
                                      <div className="text-hover-show-hapus">
                                        Detail
                                      </div>
                                    </a>
                                  </Link>

                                  <button
                                    className="btn btn-link-action bg-blue-secondary position-relative btn-delete"
                                    onClick={() =>
                                      router.push({
                                        pathname: `/partnership/mitra/edit/mitra/${items.title
                                          .split(" ")
                                          .join("-")
                                          .toLowerCase()}`,
                                        query: {
                                          idDetail: getId,
                                          id: items.id,
                                        },
                                      })
                                    }
                                  >
                                    <IconPencil
                                      width="16"
                                      height="16"
                                      fill="rgba(255,255,255,1)"
                                    />
                                    <div className="text-hover-show-hapus">
                                      Ubah
                                    </div>
                                  </button>
                                </div>
                              ) : items.status.name === "tidak aktif" ? (
                                <div className="d-flex align-items-center">
                                  <Link
                                    href={{
                                      pathname: `/partnership/mitra/detail-data-kerjasama-mitra/sub-detail`,
                                      query: { id: getId, idDetail: getId },
                                    }}
                                  >
                                    <a className="btn btn-link-action bg-blue-secondary position-relative btn-delete ">
                                      <IconEye
                                        width="16"
                                        height="16"
                                        fill="rgba(255,255,255,1)"
                                      />
                                      <div className="text-hover-show-hapus">
                                        Detail
                                      </div>
                                    </a>
                                  </Link>

                                  <button
                                    className="btn btn-link-action bg-blue-secondary mx-3 position-relative btn-delete"
                                    onClick={() =>
                                      router.push({
                                        pathname: `/partnership/mitra/edit/mitra/${items.title
                                          .split(" ")
                                          .join("-")
                                          .toLowerCase()}`,
                                        query: {
                                          idDetail: getId,
                                          id: items.id,
                                        },
                                      })
                                    }
                                  >
                                    <IconPencil
                                      width="16"
                                      height="16"
                                      fill="rgba(255,255,255,1)"
                                    />
                                    <div className="text-hover-show-hapus">
                                      Ubah
                                    </div>
                                  </button>
                                  <button
                                    className="btn btn-link-action bg-blue-secondary position-relative btn-delete"
                                    onClick={() => cooperationDelete(items.id)}
                                  >
                                    <IconDelete
                                      width="16"
                                      height="16"
                                      fill="rgba(255,255,255,1)"
                                    />
                                    <div className="text-hover-show-hapus">
                                      Hapus
                                    </div>
                                  </button>
                                </div>
                              ) : items.status.name === "pengajuan-review" ? (
                                <div className="d-flex align-items-center">
                                  <Link
                                    href={{
                                      pathname:
                                        "/partnership/kerjasama/revisi-kerjasama",
                                      query: { id: items.id, idDetail: getId },
                                    }}
                                  >
                                    <a className="btn btn-link-action bg-blue-secondary position-relative btn-delete">
                                      <IconReview
                                        width="16"
                                        height="16"
                                        fill="rgba(255,255,255,1)"
                                      />
                                      <div className="text-hover-show-hapus">
                                        Review
                                      </div>
                                    </a>
                                  </Link>
                                </div>
                              ) : items.status.name === "pengajuan-revisi" ? (
                                <div className="d-flex align-items-center">
                                  <Link
                                    href={{
                                      pathname:
                                        "/partnership/kerjasama/revisi-kerjasama",
                                      query: { id: items.id, idDetail: getId },
                                    }}
                                    passHref
                                  >
                                    <a className="btn btn-link-action bg-blue-secondary position-relative btn-delete">
                                      <IconEye
                                        width="16"
                                        height="16"
                                        fill="rgba(255,255,255,1)"
                                      />
                                      <div className="text-hover-show-hapus">
                                        Review
                                      </div>
                                    </a>
                                  </Link>
                                </div>
                              ) : items.status.name ===
                                "pengajuan-pembahasan" ? (
                                <div className="d-flex align-items-center">
                                  <Link
                                    href={{
                                      pathname:
                                        "/partnership/tanda-tangan/penandatanganan-virtual",
                                      query: { id: items.id },
                                    }}
                                    passHref
                                  >
                                    <a className="btn btn-link-action bg-blue-secondary position-relative btn-delete mr-3">
                                      <Image
                                        src={`/assets/icon/ttd.svg`}
                                        width={16}
                                        height={16}
                                        alt="ditolak"
                                      />
                                      <div className="text-hover-show-hapus">
                                        Tanda tangan virtual
                                      </div>
                                    </a>
                                  </Link>
                                  <button
                                    className="btn btn-link-action bg-blue-secondary position-relative btn-delete"
                                    type="button"
                                    onClick={() =>
                                      cooperationRejection(items.id)
                                    }
                                  >
                                    <Image
                                      src={`/assets/icon/Ditolak.svg`}
                                      width={16}
                                      height={16}
                                      alt="ditolak"
                                    />
                                    <div className="text-hover-show-hapus">
                                      Dibatalkan
                                    </div>
                                  </button>
                                </div>
                              ) : items.status.name === "pengajuan-selesai" ? (
                                <div className="d-flex align-items-center">
                                  <button
                                    className="btn btn-link-action bg-blue-secondary position-relative btn-delete"
                                    type="button"
                                    onClick={() =>
                                      cooperationRejection(items.id)
                                    }
                                  >
                                    <Image
                                      src={`/assets/icon/Ditolak.svg`}
                                      width={16}
                                      height={16}
                                      alt="ditolak"
                                    />
                                    <div className="text-hover-show-hapus">
                                      Dibatalkan
                                    </div>
                                  </button>
                                </div>
                              ) : items.status.name === "pengajuan-dokument" ? (
                                <div className="d-flex align-items-center">
                                  <Link
                                    href={{
                                      pathname:
                                        "/partnership/kerjasama/submit-dokumen-kerjasama-revisi",
                                      query: { id: getId },
                                    }}
                                    passHref
                                  >
                                    <a className="btn btn-link-action bg-blue-secondary position-relative btn-delete mr-3">
                                      <IconReview
                                        width="16"
                                        height="16"
                                        fill="rgba(255,255,255,1)"
                                      />
                                      <div className="text-hover-show-hapus">
                                        Review
                                      </div>
                                    </a>
                                  </Link>
                                  <button
                                    type="button"
                                    className="btn btn-link-action bg-blue-secondary position-relative btn-delete"
                                    onClick={() =>
                                      cooperationRejection(items.id)
                                    }
                                  >
                                    <Image
                                      src={`/assets/icon/Ditolak.svg`}
                                      width={16}
                                      height={16}
                                      alt="ditolak"
                                    />

                                    <div className="text-hover-show-hapus">
                                      Dibatalkan
                                    </div>
                                  </button>
                                </div>
                              ) : (
                                <div className="d-flex align-items-center">
                                  <Link
                                    href={{
                                      pathname:
                                        "/partnership/mitra/detail-data-kerjasama-mitra/sub-detail",
                                      query: { id: items.id, idDetail: getId },
                                    }}
                                  >
                                    <a className="btn btn-link-action bg-blue-secondary position-relative btn-delete mr-3">
                                      <IconEye
                                        width="16"
                                        height="16"
                                        fill="rgba(255,255,255,1)"
                                      />
                                      <div className="text-hover-show-hapus">
                                        Detail
                                      </div>
                                    </a>
                                  </Link>

                                  <button
                                    className="btn btn-link-action bg-blue-secondary position-relative btn-delete"
                                    onClick={() => cooperationDelete(items.id)}
                                  >
                                    <IconDelete width="16" height="16" />
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
            }
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default DetailDataKerjasama;
