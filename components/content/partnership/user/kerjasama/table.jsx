import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";
import DatePicker from "react-datepicker";
import LoadingTable from "../../../../LoadingTable";
import Select from "react-select";

import Swal from "sweetalert2";

import Image from "next/image";

import PageWrapper from "../../../../wrapper/page.wrapper";
import CardPage from "../../../../CardPage";
import ButtonAction from "../../../../ButtonAction";

import IconCalender from "../../../../assets/icon/Calender";
import IconTodoLine from "../../../../assets/icon/TodoLine";
import axios from "axios";
import moment from "moment";

import {
  reqCooperationUser,
  searchCooporation,
  setPage,
  changeValueStatus,
  changeValueKerjaSama,
  fetchListSelectStatus,
  fetchListSelectCooperation,
  changeValueStatusCard,
  limitCooporation,
  deleteCooperation,
  exportFileCSV
} from "../../../../../redux/actions/partnership/user/cooperation.actions";

import { RESET_VALUE_SORTIR } from "../../../../../redux/types/partnership/user/cooperation.type";

// icon
import IconSearch from "../../../../assets/icon/Search";
import IconReview from "../../../../assets/icon/Review";
import IconArrow from "../../../../assets/icon/Arrow";
import IconAdd from "../../../../assets/icon/Add";
import IconClose from "../../../../assets/icon/Close";
import IconFilter from "../../../../assets/icon/Filter";
import IconEye from "../../../../assets/icon/Eye";
import IconPencil from "../../../../assets/icon/Pencil";
import IconDelete from "../../../../assets/icon/Delete";

const Table = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { successInputProfile,successSubmitDokumentKerjasama,successUpdateStatus } = router.query;
  let selectRefKerjasama = null;
  let selectRefStatus = null;

  const allCooperationUser = useSelector((state) => state.allCooperationUser);
  console.log("allCooperationUser", allCooperationUser);

  const [valueSearch, setValueSearch] = useState("");
  const [valueStatus, setValueStatus] = useState("");
  const [valueKerjaSama, setValueKerjaSama] = useState("");

  // const onNewReset = () => {
  //   router.replace(`/partnership/user/kerjasama`);
  // };

  const [deleteBar, setDeleteBar] = useState(false);
  const onNewReset = () => {
    setDeleteBar(false);
    router.replace("/partnership/user/kerjasama", undefined, { shallow: true });
  };

  const handleChangeValueSearch = (value) => {
    setValueSearch(value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(searchCooporation(valueSearch));
  };

  const handleSubmitSearchMany = (event) => {
    event.preventDefault();
    dispatch(changeValueStatus(valueStatus));
    dispatch(changeValueKerjaSama(valueKerjaSama));
  };

  const resetValueSort = () => {
    selectRefKerjasama.select.clearValue();
    selectRefStatus.select.clearValue();
    dispatch({
      type: RESET_VALUE_SORTIR,
    });
  };

  useEffect(() => {
    dispatch(reqCooperationUser());
  }, [
    dispatch,
    allCooperationUser.page,
    allCooperationUser.keyword,
    allCooperationUser.status,
    allCooperationUser.categories_cooporation,
    allCooperationUser.limit,
    allCooperationUser.status,
    allCooperationUser.card,
    allCooperationUser.status_delete,
  ]);

  const [isProfile, setIsProfile] = useState("");
  const getProfiles = async () => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/profiles`,
        {
          headers: {
            authorization: `Bearer ${process.env.TOKEN_PARTNERSHIP_TEMP}`,
          },
        }
      );
      // jika data profile sudah terisi cek salah satunya misal agency logo
      // jika ada set state isProfile true
      if (data.data.agency_logo === "-") {
        setIsProfile(false);
      } else {
        setIsProfile(true);
      }
    } catch (error) {
      console.log("gagal get province", error);
    }
  };

  const [sumWillExpire, setSumWillExpire] = useState(0);
  const getWillExpire = async () => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/index?page=1&card=will_expire&limit=1000`
      );
      console.log("data.data.total",data.data.total)
      setSumWillExpire(data.data.total);
    } catch (error) {
      console.log("object", error);
    }
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
        // setIsStatusBar(false);
        // router.replace("/partnership/kerjasama");
      } else {
        dispatch(reloadTable());
      }
    });
  };

  useEffect(() => {
    dispatch(fetchListSelectStatus());
    dispatch(fetchListSelectCooperation());
    getProfiles();
    getWillExpire();
  }, [dispatch]);

  return (
    <PageWrapper>
      {deleteBar ? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
          style={{ backgroundColor: "#f7c9c9" }}
        >
          <div className="alert-icon">
            <i className="flaticon2-checkmark" style={{ color: "#c51b1b" }}></i>
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
      {successInputProfile ? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
          style={{ backgroundColor: "#C9F7F5" }}
        >
          <div className="alert-icon">
            <i className="flaticon2-checkmark" style={{ color: "#1BC5BD" }}></i>
          </div>
          <div className="alert-text" style={{ color: "#1BC5BD" }}>
            Berhasil menyimpan data
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
      {successSubmitDokumentKerjasama ? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
          style={{ backgroundColor: "#C9F7F5" }}
        >
          <div className="alert-icon">
            <i className="flaticon2-checkmark" style={{ color: "#1BC5BD" }}></i>
          </div>
          <div className="alert-text" style={{ color: "#1BC5BD" }}>
            Berhasil menyimpan data
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
      {successUpdateStatus ? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
          style={{ backgroundColor: "#C9F7F5" }}
        >
          <div className="alert-icon">
            <i className="flaticon2-checkmark" style={{ color: "#1BC5BD" }}></i>
          </div>
          <div className="alert-text" style={{ color: "#1BC5BD" }}>
            Berhasil membatalkan kerjasama
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
      <div className="col-lg-12 col-md-12">
        <div className="row">
          {/* card 1 */}
          <CardPage
            background="bg-light-success "
            icon="user-white.svg"
            color="#ffffff"
            value={allCooperationUser.totalDataActive}
            titleValue="Kerjasama"
            title="Kerjasama Aktif"
            publishedVal="1"
            routePublish={() => dispatch(changeValueStatusCard("active"))}
          />

          {/* card 2 */}
          <CardPage
            background="bg-light-warning"
            icon="user-white.svg"
            color="#ffffff"
            value={allCooperationUser.totalDataAnother}
            titleValue="Pengajuan Kerjasama"
            title="Pengajuan Kerjasama"
            publishedVal="1"
            routePublish={() => dispatch(changeValueStatusCard("submission"))}
          />
          <CardPage
            background="bg-light-danger"
            icon="user-white.svg"
            color="#ffffff"
            value={sumWillExpire}
            titleValue="Kerjasama akan Habis"
            title="Kerjasama akan Habis"
            publishedVal="1"
            routePublish={() => dispatch(changeValueStatusCard("will_expire"))}
          />
          {/* card 3 */}
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

            {isProfile === "" ? (
              ""
            ) : isProfile === false ? (
              <Link
                href="/partnership/user/profile-lembaga/input-profile"
                passHref
              >
                <a className="btn btn-rounded-full bg-blue-primary text-white">
                  <IconAdd className="mr-3" width="18" height="16" />
                  Tambah kerjasama
                </a>
              </Link>
            ) : (
              <Link
                href="/partnership/user/kerjasama/submit-kerjasama"
                passHref
              >
                <a className="btn btn-rounded-full bg-blue-primary text-white">
                  <IconAdd className="mr-3" width="18" height="16" />
                  Tambah kerjasama
                </a>
              </Link>
            )}
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-12 col-xl-12">
                  <form onSubmit={handleSubmit}>
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
                      <div className="col-12 col-sm-6">
                        <div className="d-flex flex-wrap align-items-center justify-content-end mt-2">
                          {/* sorotir by modal */}
                          <button
                            className="avatar item-rtl btn border d-flex align-items-center justify-content-between mt-2"
                            data-toggle="modal"
                            data-target="#exampleModalCenter"
                            style={{ color: "#464646", minWidth: "230px" }}
                            type="button"
                          >
                            <div className="d-flex align-items-center">
                              <IconFilter className="mr-3" />
                              Pilih Filter
                            </div>
                            <IconArrow fill="#E4E6EF" width="11" height="11" />
                          </button>
                          {/* modal */}
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
                                      Kategori
                                    </label>
                                    <Select
                                      ref={(ref) => (selectRefKerjasama = ref)}
                                      className="basic-single"
                                      classNamePrefix="select"
                                      placeholder="Semua"
                                      defaultValue={
                                        allCooperationUser.stateListKerjaSama[0]
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
                                      options={
                                        allCooperationUser.stateListKerjaSama
                                      }
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
                                      defaultValue={
                                        allCooperationUser.stateListStatus[0]
                                      }
                                      isDisabled={false}
                                      isLoading={false}
                                      isClearable={false}
                                      isRtl={false}
                                      isSearchable={true}
                                      name="color"
                                      onChange={(e) =>
                                        setValueStatus(e?.name_en)
                                      }
                                      options={
                                        allCooperationUser.stateListStatus
                                      }
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

                          {/* end modal */}

                          {/* btn export */}
                          <button
                            className="btn btn-rounded-full bg-blue-secondary text-white ml-4 mt-2"
                            type="button"
                            onClick={() => dispatch(exportFileCSV())}
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
                {allCooperationUser.statusLoad === "process" ? (
                  <LoadingTable />
                ) : (
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-left">No</th>
                        {/* <th className="text-left align-middle">Mitra</th> */}
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
                      {allCooperationUser.cooperationMitra.data &&
                      allCooperationUser?.cooperationMitra?.data
                        ?.list_cooperations?.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="text-center">
                            <h4>Data tidak ditemukan</h4>
                          </td>
                        </tr>
                      ) : (
                        allCooperationUser?.cooperationMitra?.data?.list_cooperations?.map(
                          (items, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {allCooperationUser.page === 1
                                    ? index + 1
                                    : (allCooperationUser.page - 1) *
                                        allCooperationUser.limit +
                                      (index + 1)}
                                </td>
                                {/* <td className="align-middle text-left">
                                  {items.partner === null ? (
                                    "Tidak ada"
                                  ) : (
                                    <p className="p-part-t">
                                      {items.partner.user.name}
                                    </p>
                                  )}
                                </td> */}
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
                                  <br />
                                </td>
                                <td className="align-middle text-left">
                                  <p className="p-part-t">
                                    {items.period} {items.period_unit}
                                  </p>{" "}
                                </td>
                                <td className="align-middle text-left">
                                  <p className="p-part-t">
                                    {moment(items.period_date_start).format(
                                      "DD MMMM YYYY"
                                    )}
                                    {/* moment().format('MMMM Do YYYY, h:mm:ss a'); */}
                                    {/* H, HHss     */}
                                  </p>
                                </td>
                                <td className="align-middle text-left">
                                  <p className="p-part-t">
                                    {moment(items.period_date_end).format(
                                      "DD MMMM YYYY"
                                    )}
                                  </p>
                                </td>
                                <td className="align-middle text-left">
                                  {items.status.name === "aktif" &&
                                  moment(items.period_date_start).format(
                                    "YYYY MM DD"
                                  ) > moment().format("YYYY MM DD") ? (
                                    <div className="position-relative w-max-content">
                                      <select
                                        name=""
                                        id=""
                                        disabled
                                        className="form-control remove-icon-default dropdown-arrows-green"
                                        key={index}
                                        // onChange={(e) =>
                                        //   changeListStatus(
                                        //     e.target.value,
                                        //     items.id
                                        //   )
                                        // }
                                      >
                                        <option value="1">Disetujui</option>
                                        <option value="2">Tidak Aktif</option>
                                      </select>
                                      {/* <IconArrow
                                        className="right-center-absolute"
                                        style={{ right: "10px" }}
                                        width="7"
                                        height="7"
                                      /> */}
                                    </div>
                                  ) : items.status.name === "aktif" &&
                                    moment(items.period_date_start).format(
                                      "YYYY MM DD"
                                    ) <= moment().format("YYYY MM DD") ? (
                                    <div className="position-relative w-max-content">
                                      <select
                                        disabled
                                        name=""
                                        id=""
                                        className="form-control remove-icon-default dropdown-arrows-green"
                                        key={index}
                                        // onChange={(e) =>
                                        //   changeListStatus(
                                        //     e,
                                        //     items.id,
                                        //     items.status.name
                                        //   )
                                        // }
                                      >
                                        <option value="1">
                                          {items.status.name}
                                        </option>
                                        <option value="2">Tidak Aktif</option>
                                      </select>
                                      {/* <IconArrow
                                        className="right-center-absolute"
                                        style={{ right: "10px" }}
                                        width="7"
                                        height="7"
                                      /> */}
                                    </div>
                                  ) : items.status.name === "tidak aktif" ? (
                                    <div className="position-relative w-max-content">
                                      <select
                                        disabled
                                        name=""
                                        id=""
                                        className="form-control remove-icon-default dropdown-arrows-red-primary  pr-10"
                                        key={index}
                                        // onChange={(e) =>
                                        //   changeListStatus(
                                        //     e,
                                        //     items.id,
                                        //     items.status.name
                                        //   )
                                        // }
                                      >
                                        <option value="2">Tidak Aktif</option>
                                        <option value="1">Aktif</option>
                                      </select>
                                      {/* <IconArrow
                                        className="right-center-absolute"
                                        style={{ right: "10px" }}
                                        fill="#F65464"
                                        width="7"
                                        height="7"
                                      /> */}
                                    </div>
                                  ) : items.status.name ===
                                    "pengajuan-review" ? (
                                    <div className="position-relative w-max-content">
                                      <select
                                        disabled
                                        name=""
                                        id=""
                                        className="form-control remove-icon-default dropdown-arrows-blue"
                                        // key={index}
                                        // onChange={(e) =>
                                        //   changeListStatus(
                                        //     e.target.value,
                                        //     items.id
                                        //   )
                                        // }
                                      >
                                        <option value="">
                                          Pengajuan - Review
                                        </option>
                                      </select>
                                    </div>
                                  ) : items.status.name ===
                                    "pengajuan-revisi" ? (
                                    <div className="position-relative w-max-content">
                                      <select
                                        disabled
                                        name=""
                                        id=""
                                        className="form-control remove-icon-default dropdown-arrows-yellow"
                                        // key={index}
                                        // onChange={(e) =>
                                        //   changeListStatus(
                                        //     e.target.value,
                                        //     items.id
                                        //   )
                                        // }
                                      >
                                        <option value="">
                                          Pengajuan - Revisi
                                        </option>
                                      </select>
                                    </div>
                                  ) : items.status.name ===
                                    "pengajuan-pembahasan" ? (
                                    <div className="position-relative w-max-content">
                                      <select
                                        disabled
                                        name=""
                                        id=""
                                        className="form-control remove-icon-default dropdown-arrows-blue pr-10"
                                        // key={index}
                                        // onChange={(e) =>
                                        //   changeListStatus(
                                        //     e.target.value,
                                        //     items.id
                                        //   )
                                        // }
                                      >
                                        <option value="5">
                                          Pengajuan-Pembahasan
                                        </option>
                                        <option value="6">
                                          Pengajuan-Selesai
                                        </option>
                                      </select>
                                      {/* <IconArrow
                                        className="right-center-absolute"
                                        style={{ right: "10px" }}
                                        width="7"
                                        height="7"
                                      /> */}
                                    </div>
                                  ) : items.status.name ===
                                    "pengajuan-selesai" ? (
                                    <div className="position-relative w-max-content">
                                      <select
                                        disabled
                                        name=""
                                        id=""
                                        className="form-control remove-icon-default dropdown-arrows-blue"
                                        // key={index}
                                        // onChange={(e) =>
                                        //   changeListStatus(
                                        //     e.target.value,
                                        //     items.id
                                        //   )
                                        // }
                                      >
                                        <option value="">
                                          Pengajuan - Selesai
                                        </option>
                                      </select>
                                    </div>
                                  ) : items.status.name ===
                                    "pengajuan-document" ? (
                                    <div className="position-relative w-max-content">
                                      <select
                                        disabled
                                        name=""
                                        id=""
                                        className="form-control remove-icon-default dropdown-arrows-blue"
                                        // key={index}
                                        // onChange={(e) =>
                                        //   changeListStatus(
                                        //     e.target.value,
                                        //     items.id
                                        //   )
                                        // }
                                      >
                                        <option value="">
                                          Pengajuan - Dokumen
                                        </option>
                                      </select>
                                    </div>
                                  ) : (
                                    <div className="position-relative w-max-content">
                                      <select
                                        disabled
                                        name=""
                                        id=""
                                        className="form-control remove-icon-default dropdown-arrows-red-primary"
                                        // key={index}
                                        // onChange={(e) =>
                                        //   changeListStatus(
                                        //     e.target.value,
                                        //     items.id
                                        //   )
                                        // }
                                      >
                                        <option value="">Ditolak</option>
                                      </select>
                                    </div>
                                  )}
                                </td>

                                <td className="align-middle text-left">
                                  <div className="d-flex align-items-center">
                                    {items.status.name === "aktif" &&
                                  moment(items.period_date_start).format(
                                    "YYYY MM DD"
                                  ) > moment().format("YYYY MM DD") ? (
                                    <div className="d-flex align-items-center">
                                      <button
                                        className="btn btn-link-action bg-blue-secondary position-relative btn-delete mr-3"
                                        onClick={() =>
                                          router.push(
                                            `/partnership/user/kerjasama/${items.id}`
                                          )
                                        }
                                      >
                                        <IconEye
                                          width="16"
                                          height="16"
                                          fill="rgba(255,255,255,1)"
                                        />
                                        <div className="text-hover-show-hapus">
                                          Detail
                                        </div>
                                      </button>
                                      <button
                                        className="btn btn-link-action bg-blue-secondary position-relative btn-delete"
                                        // onClick={() =>
                                        //   router.push(
                                        //     `/partnership/user/kerjasama/${items.id}`
                                        //   )
                                        // }
                                      >
                                        <IconTodoLine
                                        />
                                        <div className="text-hover-show-hapus">
                                          Review
                                        </div>
                                      </button>
                                      </div>
                                  ) : items.status.name === "aktif" &&
                                    moment(items.period_date_start).format(
                                      "YYYY MM DD"
                                    ) <= moment().format("YYYY MM DD") ? (
                                     <div className="d-flex align-items-center">
                                      <button
                                        className="btn btn-link-action bg-blue-secondary position-relative btn-delete mr-3"
                                        onClick={() =>
                                          router.push(
                                            `/partnership/user/kerjasama/${items.id}`
                                          )
                                        }
                                      >
                                        <IconEye
                                          width="16"
                                          height="16"
                                          fill="rgba(255,255,255,1)"
                                        />
                                        <div className="text-hover-show-hapus">
                                          Detail
                                        </div>
                                      </button>
                                      <Link href={{
                                         pathname:"/partnership/user/kerjasama/hasil",
                                         query:{statusKerjasama:items.status.name,id:items.id}
                                       }}>

                                      <a
                                        className="btn btn-link-action bg-blue-secondary position-relative btn-delete"
                                        // onClick={() =>
                                        //   router.push(
                                        //     `/partnership/user/kerjasama/${items.id}`
                                        //   )
                                        // }
                                      >
                                        <IconTodoLine
                                        />
                                        <div className="text-hover-show-hapus">
                                          Review
                                        </div>
                                      </a>
                                      </Link>
                                      </div>
                                  ) : items.status.name === "tidak aktif" ? (
                                    <div className="d-flex align-items-center">
                                      

                                      <Link href={{
                                         pathname:"/partnership/user/kerjasama/hasil",
                                         query:{statusKerjasama:items.status.name,id:items.id}
                                       }}>

                                      <a
                                        className="btn btn-link-action bg-blue-secondary position-relative btn-delete mr-3"
                                        // onClick={() =>
                                        //   router.push(
                                        //     `/partnership/user/kerjasama/${items.id}`
                                        //   )
                                        // }
                                      >
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

                                       <button
                                        className="btn btn-link-action bg-blue-secondary position-relative btn-delete"
                                        onClick={() =>
                                          cooperationDelete(items.id)
                                        }
                                      >
                                        <IconDelete width="16" height="16" />
                                        <div className="text-hover-show-hapus">
                                          Hapus
                                        </div>
                                      </button>
                                      </div>
                                  
                                  ) :items.status.name ===
                                    "pengajuan-review" ? (
                                      <Link
                                        href={{
                                          pathname:"/partnership/user/kerjasama/review-kerjasama-1",
                                          query:{id:items.id}
                                        }}
                                        passHref
                                      >
                                        <a className="btn btn-link-action bg-blue-secondary position-relative btn-delete">
                                          <IconReview />
                                          <div className="text-hover-show-hapus">
                                            Review
                                          </div>
                                        </a>
                                      </Link>
                                    ) : items.status.name ===
                                      "pengajuan-revisi" ? (
                                      <Link

                                      href={{
                                        pathname:"/partnership/user/kerjasama/review-kerjasama-2",
                                        query:{id:items.id}
                                      }}

                                        // href="/partnership/user/kerjasama/review-kerjasama-2"
                                        passHref
                                      >
                                        <a className="btn btn-link-action bg-blue-secondary position-relative btn-delete">
                                          <IconReview />
                                          <div className="text-hover-show-hapus">
                                            Review
                                          </div>
                                        </a>
                                      </Link>
                                    ) : items.status.name ===
                                      "pengajuan-pembahasan" ? (
                                      <Link



                                        href={{
                                          pathname:"/partnership/user/kerjasama/pembahasan-2",
                                          query:{id:items.id}
                                        }}




                                        passHref
                                      >
                                        <a className="btn btn-link-action bg-blue-secondary position-relative btn-delete">
                                          <IconReview />
                                          <div className="text-hover-show-hapus">
                                            Review
                                          </div>
                                        </a>
                                      </Link>
                                    ) : items.status.name ===
                                      "pengajuan-selesai" ? (




                                        <Link



                                        href={{
                                          pathname:"/partnership/user/kerjasama/pembahasan-2",
                                          query:{id:items.id}
                                        }}

                                        


                                        passHref
                                      >

                                        <a className="btn btn-link-action bg-blue-secondary position-relative btn-delete">
                                          <IconReview />
                                          <div className="text-hover-show-hapus">
                                            Review
                                          </div>
                                        </a>


                                        </Link>



                                    ) : items.status.name ===
                                      "pengajuan-document" ? (
                                      <Link
                                        href={{
                                          pathname:"/partnership/user/kerjasama/review-dokumen-kerjasama",
                                          query:{id:items.id}
                                        }}
                                        passHref
                                      >
                                        <a className="btn btn-link-action bg-blue-secondary position-relative btn-delete">
                                          <IconReview />
                                          <div className="text-hover-show-hapus">
                                            Review
                                          </div>
                                        </a>
                                      </Link>
                                    ) : (
                                      <div className="d-flex align-items-center">
                                      
                                      {/* <Link href={{
                                         pathname:"/partnership/user/kerjasama/hasil",
                                         query:{statusKerjasama:items.status.name}
                                       }}> */}

                                     
                                      {/* </Link> */}
                                      <Link href={{
                                         pathname:"/partnership/user/kerjasama/hasil",
                                         query:{statusKerjasama:items.status.name,id:items.id}
                                       }}>

                                      <a
                                        className="btn btn-link-action bg-blue-secondary position-relative btn-delete mr-3"
                                        // onClick={() =>
                                        //   router.push(
                                        //     `/partnership/user/kerjasama/${items.id}`
                                        //   )
                                        // }
                                      >
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
                                       <button
                                        className="btn btn-link-action bg-blue-secondary position-relative btn-delete"
                                        onClick={() =>
                                          cooperationDelete(items.id)
                                        }
                                      >
                                        <IconDelete width="16" height="16" />
                                        <div className="text-hover-show-hapus">
                                          Hapus
                                        </div>
                                      </button>
                                      </div>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          }
                        )
                      )}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="row">
                <div className="table-pagination">
                  <Pagination
                    activePage={allCooperationUser.page}
                    itemsCountPerPage={
                      allCooperationUser?.cooperationMitra?.data?.perPage
                    }
                    totalItemsCount={
                      allCooperationUser?.cooperationMitra?.data?.total
                    }
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
                        Total Data{" "}
                        {allCooperationUser.cooperationMitra.data &&
                          allCooperationUser.cooperationMitra.data.total}
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
