import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import Pagination from "react-js-pagination";
import DatePicker from "react-datepicker";

import Swal from "sweetalert2";
import Tables from "../../../Table/Table";
import PageWrapper from "../../../wrapper/page.wrapper";
import CardPage from "../../../CardPage";
import ButtonAction from "../../../ButtonAction";
import IconSearch from "../../../assets/icon/Search";

import Image from "next/image";
import { CSVLink } from "react-csv";

import IconCalender from "../../../assets/icon/Calender";
import IconArrow from "../../../assets/icon/Arrow";
import IconAdd from "../../../assets/icon/Add";
import IconClose from "../../../assets/icon/Close";
import IconFilter from "../../../assets/icon/Filter";
import IconEye from "../../../assets/icon/Eye";
import IconPencil from "../../../assets/icon/Pencil";
import IconDelete from "../../../assets/icon/Delete";
import axios from "axios";
import LoadingTable from "../../../LoadingTable";
import moment from "moment";

import {
  fetchAllMK,
  searchCooporation,
  setPage,
  changeValueMitra,
  changeValueStatus,
  changeValueKerjaSama,
  limitCooporation,
  fetchListSelectMitra,
  fetchListSelectCooperation,
  fetchListSelectStatus,
  changeValueStatusCard,
  deleteCooperation,
  changeStatusList,
  exportFileCSV,
  reloadTable,
  sortValueReset
} from "../../../../redux/actions/partnership/managementCooporation.actions";

import { RESET_VALUE_SORTIR } from "../../../../redux/types/partnership/management_cooporation.type";

const Table = () => {
  const router = useRouter();
  let { update, success } = router.query;

  let dispatch = useDispatch();
  const allMK = useSelector((state) => state.allMK);
  const exportCSV = {
    width: "77%",
    marginLeft: "2rem",
  };
  const [valueSearch, setValueSearch] = useState("");
  const [valueMitra, setValueMitra] = useState("");
  console.log("valueMitra",valueMitra)
  const [valueStatus, setValueStatus] = useState("");
  const [valueKerjaSama, setValueKerjaSama] = useState("");
  const handleChangeValueSearch = (value) => {
    setValueSearch(value);
  };
  const handleSubmitSearchMany = (event) => {
    event.preventDefault();
    dispatch(changeValueMitra(valueMitra));
    dispatch(changeValueStatus(valueStatus));
    dispatch(changeValueKerjaSama(valueKerjaSama));
  };
  const resetValueSort = () =>{
    // dispatch(sortValueReset())
    document.getElementById('list-mitra').selectedIndex = 0
    document.getElementById('list-kerjasama').selectedIndex = 0
    document.getElementById('list-status').selectedIndex = 0
     dispatch({
        type: RESET_VALUE_SORTIR,
      });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(searchCooporation(valueSearch));
  };

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
        setIsStatusBar(true);
      } else {
        dispatch(reloadTable());
      }
    });
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
      } else {
        dispatch(reloadTable());
      }
    });
  };
  const [isStatusBar, setIsStatusBar] = useState(false);
  const [deleteBar, setDeleteBar] = useState(false);
  const onNewReset = () => {
    router.replace("/partnership/manajemen-kerjasama");
    setDeleteBar(false);
    setIsStatusBar(false);
  };
  useEffect(() => {
    dispatch(fetchAllMK());
  }, [
    dispatch,
    allMK.keyword,
    allMK.page,
    allMK.status,
    allMK.categories_cooporation,
    allMK.partner,
    allMK.limit,
    allMK.card,
    allMK.status_delete,
    allMK.status_list,
  ]);

  const [sumWillExpire, setSumWillExpire] = useState(0);
  const getWillExpire = async () => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/index?page=1&card=will_expire&limit=1000`
      );
      // router.push(urlExport.config.url);

      setSumWillExpire(data.data.total);
    } catch (error) {
      console.log("object", error);
    }
  };

  useEffect(() => {
    dispatch(fetchListSelectMitra());
    dispatch(fetchListSelectCooperation());
    dispatch(fetchListSelectStatus());
    getWillExpire();
  }, [dispatch]);
  return (
    <PageWrapper>
      {update ? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
          style={{ backgroundColor: "#C9F7F5" }}
        >
          <div className="alert-icon">
            <i className="flaticon2-checkmark" style={{ color: "#1BC5BD" }}></i>
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
      {isStatusBar ? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
          style={{ backgroundColor: "#C9F7F5" }}
        >
          <div className="alert-icon">
            <i className="flaticon2-checkmark" style={{ color: "#1BC5BD" }}></i>
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
      <div className="col-lg-12 col-md-12">
        <div className="row">
          {/* card 1 */}
          <CardPage
            background="bg-light-success "
            icon="user-white.svg"
            color="#ffffff"
            value={allMK.totalDataActive}
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
            value={allMK.totalDataAnother}
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
            <Link href="/partnership/manajemen-kerjasama/tambah">
              <a className="btn btn-rounded-full bg-blue-primary text-white">
                <IconAdd  className="mr-3" width="18" height="16" />
                Tambah kerjasama
              </a>
            </Link>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-12 col-xl-12">
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
                          >
                            <div className="d-flex align-items-center">
                              <IconFilter className="mr-3" />
                              Pilih Filter
                            </div>
                            <IconArrow fill="#E4E6EF" width="11" height="11"/>
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
                                        Mitra
                                      </label>

                                      <select
                                        onChange={(e) =>
                                          setValueMitra(e.target.value)
                                        }
                                        id="list-mitra"
                                        className="form-select form-control"
                                        aria-label="Select example"
                                      >
                                        <option value="">Semua</option>
                                        {allMK.stateListMitra.length === 0
                                          ? ""
                                          : allMK.stateListMitra
                                              .slice(
                                                1,
                                                allMK.stateListMitra.length
                                              )
                                              .map((items, i) => {
                                                return (
                                                  <option
                                                    key={i}
                                                    value={items.name}
                                                  >
                                                    {items.name}
                                                  </option>
                                                );
                                              })}
                                      </select>
                                    </div>
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
                                        {allMK.stateListKerjaSama.length === 0
                                          ? ""
                                          : allMK.stateListKerjaSama.data.map(
                                              (items, i) => {
                                                return (
                                                  <option
                                                    key={i}
                                                    value={
                                                      items.cooperation_categories
                                                    }
                                                  >
                                                    {
                                                      items.cooperation_categories
                                                    }
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
                                        {allMK.stateListStatus.length === 0
                                          ? ""
                                          : allMK.stateListStatus.data.map(
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
                {allMK.statusLoad === "process" ? (
                  <LoadingTable />
                ) : (
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
                          Tanggal Tanda Tangan
                        </th>
                        <th className="text-left align-middle">
                          Tanggal Selesai
                        </th>
                        <th className="text-left align-middle">Status</th>
                        <th className="text-left align-middle">Aksi</th>
                      </tr>
                    </thead>

                    <tbody>
                      {allMK.m_cooporation.data &&
                      allMK.m_cooporation.data.list_cooperations.length ===
                        0 ? (
                        <div className="d-flex justify-content-center py-5 ">
                          <h4>Data tidak ditemukan</h4>
                        </div>
                      ) : (
                        allMK.m_cooporation.data &&
                        allMK.m_cooporation.data.list_cooperations.map(
                          (items, index) => {
                            return (
                              <tr key={index}>
                                <td className="text-left align-middle">
                                  <button
                                    className="btn"
                                    style={{
                                      background: "#F3F6F9",
                                      borderRadius: "6px",
                                    }}
                                  >
                                    {allMK.page === 1
                                      ? index + 1
                                      : (allMK.page - 1) * allMK.limit +
                                        (index + 1)}

                                    {/* {index+1} */}
                                  </button>
                                </td>
                                <td className="align-middle text-left">
                                  {items.partner === null ? (
                                    "Tidak ada"
                                  ) : (
                                    <p className="p-part-t">
                                      {items.partner.user.name}
                                    </p>
                                  )}
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
                                  <br />
                                </td>
                                <td className="align-middle text-left">
                                  <p className="p-part-t">
                                    {items.period} {items.period_unit}
                                  </p>{" "}
                                </td>
                                <td className="align-middle text-left">
                                  <p className="p-part-t">
                                    {moment(items.signing_date).format(
                                      "YYYY MMM DD"
                                    )}
                                    {/* moment().format('MMMM Do YYYY, h:mm:ss a'); */}
                                    {/* H, HHss     */}
                                  </p>
                                </td>
                                <td className="align-middle text-left">
                                  <p className="p-part-t">
                                    {moment(items.period_date_end).format(
                                      "YYYY MMM DD"
                                    )}
                                  </p>
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
                                          changeListStatus(
                                            e.target.value,
                                            items.id
                                          )
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
                                          changeListStatus(
                                            e.target.value,
                                            items.id
                                          )
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
                                    <div className="d-flex align-items-center">
                                      <button
                                        className="btn btn-link-action bg-blue-secondary"
                                        onClick={() =>
                                          router.push(
                                            `/partnership/manajemen-kerjasama/view/${items.id}`
                                          )
                                        }
                                      >
                                         <IconEye width="16" height="16" fill="rgba(255,255,255,1)"/>
                                      </button>

                                      <button
                                        className="btn btn-link-action bg-blue-secondary mx-3"
                                        onClick={() =>
                                          router.push(
                                            `/partnership/manajemen-kerjasama/edit/${items.id}`
                                          )
                                        }
                                      >
                                        <IconPencil width="16" height="16" />
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="d-flex align-items-center">
                                     
                                      <button
                                        className="btn btn-link-action bg-blue-secondary"
                                        onClick={() =>
                                          router.push(
                                            `/partnership/manajemen-kerjasama/view/${items.id}`
                                          )
                                        }
                                      >
                                        <IconEye width="16" height="16" fill="rgba(255,255,255,1)"/>
                                      </button>
                                      <button
                                        className="btn btn-link-action bg-blue-secondary mx-3"
                                        onClick={() =>
                                          router.push(
                                            `/partnership/manajemen-kerjasama/edit/${items.id}`
                                          )
                                        }
                                      >
                                        <IconPencil width="16" height="16" />
                                      </button>
                                      <button
                                        className="btn btn-link-action bg-blue-secondary"
                                        onClick={() =>
                                          cooperationDelete(items.id)
                                        }
                                      >
                                        <IconDelete width="16" height="16" />
                                      </button>{" "}
                                    </div>
                                  )}
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
                        {allMK.m_cooporation.data &&
                          allMK.m_cooporation.data.total}
                        {/* {process.env.END_POINT_API_PARTNERSHIP} */}
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
