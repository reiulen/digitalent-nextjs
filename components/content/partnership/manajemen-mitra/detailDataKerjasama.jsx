import React, { useState, useEffect } from "react";
import Link from "next/link";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../wrapper/page.wrapper";
import CardPage from "../../../CardPage";
import ButtonAction from "../../../ButtonAction";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Image from "next/image";

import Swal from "sweetalert2";

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
  changeStatusList
} from "../../../../redux/actions/partnership/mitra.actions";
import IconArrow from "../../../assets/icon/Arrow";
import IconCalender from "../../../assets/icon/Calender";

const DetailDataKerjasama = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  let { update } = router.query;
  const mitraDetailAll = useSelector((state) => state.allMitra);
  console.log("mitraDetailAll", mitraDetailAll);

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
    router.replace(
      `/partnership/manajemen-mitra/detail/${router.query.id}`
    );
    setDeleteBar(false);
    setBarStatus(false)
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
        setBarStatus(false)
      } else {
        dispatch(reloadTable());
      }
    });
  };

  const [barStatus, setBarStatus] = useState(false)
  const changeListStatus = (value,id) =>{
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
        dispatch(changeStatusList(value,id))
        setBarStatus(true)  
      }else{
        dispatch(reloadTable())
      }
    })
  }

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
            <h3 className="card-title font-weight-bolder text-dark">
              Kerjasama{" "}
              {
                mitraDetailAll?.mitraDetailAll?.data
                  ?.list_cooperation_categories[0]?.partner?.user?.name
              }
            </h3>
          </div>

          <div className="card-body pt-0">
            <form onSubmit={handleSubmit}>
              <div className="table-filter">
                <div className="row align-items-center">
                  <div className="col-lg-10 col-xl-10">
                    <div className="input-icon">
                      <input
                        style={{ background: "#F3F6F9", border: "none" }}
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        id="kt_datatable_search_query"
                        onChange={(e) => setKeyWord(e.target.value)}
                      />
                      <span>
                        <i className="flaticon2-search-1 text-muted"></i>
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-2 col-xl-2">
                    <button
                      type="submit"
                      className="btn btn-light-primary btn-block"
                    >
                      Cari
                    </button>
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
                                  <option key={i} value={items.name}>
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
                    <button
                      type="button"
                      onClick={() => dispatch(exportFileCSVDetail(getId))}
                      className="btn btn-primary px-6 font-weight-bold btn-block"
                    >
                      Export .csv
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="table-page mt-5">
              <div className="table-responsive">
                <table className="table table-separate table-head-custom table-checkable">
                  <thead style={{ background: "#F3F6F9" }}>
                    <tr>
                      <th className="text-center align-middle">No</th>
                      <th className="text-center align-middle">Mitra</th>
                      <th className="text-center align-middle">
                        Judul Kerjasama
                      </th>
                      <th className="text-center align-middle">Periode</th>
                      <th className="text-center align-middle">
                        Tanggal Tanda Tangan
                      </th>
                      {/* <th className="text-center align-middle">
                        Tanggal Selesai
                      </th> */}
                      <th className="text-center align-middle">
                        Tanggal Selesai
                      </th>
                      <th className="text-center align-middle">Status</th>
                      <th className="text-center align-middle">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mitraDetailAll.status === "success"
                      ? mitraDetailAll.mitraDetailAll.length === 0
                        ? ""
                        : mitraDetailAll.mitraDetailAll.data.list_cooperation_categories.map(
                            (items, index) => {
                              return (
                                <tr key={index}>
                                  <td className="text-center align-middle   ">
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
                                  <td className="align-middle text-center">
                                    {items.partner.user.name}
                                  </td>
                                  <td className="d-flex justify-content-center">
                                    <div className="d-flex align-items-center justify-content-center flex-column">
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

                                    {/* {items.title}
                        {items.cooperation_category.cooperation_categories} */}
                                    <br />
                                    {/* <small style={{ color: "grey" }}>
                          Memodanrum of Understanding (MoU)
                        </small> */}
                                  </td>
                                  <td className="align-middle text-center">
                                    {items.period} {items.period_unit}
                                  </td>
                                  <td className="align-middle text-center">
                                    {items.signing_date}
                                  </td>
                                  <td className="align-middle">
                                    {items.period_date_end}
                                  </td>
                                  <td className="align-middle text-center">
                                    {/* <div className="position-relative">
                                      <select
                                        name=""
                                        id=""
                                        className="form-control remove-icon-default dropdown-arrows"
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
                                    </div> */}
                                       {items.status.name === "aktif" ?
                                  <div className="position-relative"> 
                                  <select
                                    name=""
                                    id=""
                                    className="form-control remove-icon-default dropdown-arrows"
                                    key={index}
                                    onChange={(e)=> changeListStatus(e.target.value,items.id)}
                                  >
                                    <option value="1">
                                      {items.status.name}
                                    </option> 
                                    <option value="2">
                                      tidak aktif
                                    </option> 
                                  </select>
                                  <IconArrow className="right-center-absolute" style={{right:"10px"}} width="7" height="7"/>
                                  </div>
                                    : 
                                    <div className="position-relative">
                                    <select
                                    name=""
                                    id=""
                                    className="form-control remove-icon-default dropdown-arrows"
                                    key={index}
                                    onChange={(e)=> changeListStatus(e.target.value,items.id)}
                                  >
                                    <option value="2">
                                      Tidak aktif
                                    </option> 
                                    <option value="1">
                                      aktif
                                    </option> 
                                  </select>
                                  <IconArrow className="right-center-absolute" style={{right:"10px"}} width="7" height="7"/>
                                  </div>}
                               
                                  </td>
                                  <td className="align-middle text-center">
                                    {/* <button
                                      style={{
                                        background: "#F3F6F9",
                                        borderRadius: "6px",
                                        padding: "8px 10px 3px 10px",
                                      }}
                                      className="btn position-relative btn-delete"
                                      onClick={() =>
                                        router.push({
                                          pathname: `/partnership/manajemen-mitra/detail/mitra/${items.id}`,
                                          query: { idDetail: getId },
                                        })
                                      }
                                    >
                                      <Image
                                        src={`/assets/icon/detail.JPG`}
                                        width="18"
                                        height="16"
                                        className="btn"
                                        alt="detail"
                                      />
                                      <div className="text-hover-show-hapus">
                                        Detail
                                      </div>
                                    </button>
                                    <button
                                      className="btn ml-3 position-relative btn-delete"
                                      style={{
                                        background: "#F3F6F9",
                                        borderRadius: "6px",
                                        padding: "8px 10px 3px 10px",
                                      }}
                                      onClick={() =>
                                        router.push({
                                          pathname: `/partnership/manajemen-mitra/edit/mitra/${items.id}`,
                                          query: { idDetail: getId },
                                        })
                                      }
                                    >
                                      <Image
                                        width="14"
                                        height="14"
                                        src={`/assets/icon/write.svg`}
                                        alt="write"
                                      />
                                      <div className="text-hover-show-hapus">
                                        Edit
                                      </div>
                                    </button>
                                    <button
                                      style={{
                                        background: "#F3F6F9",
                                        borderRadius: "6px",
                                        padding: "8px 10px 3px 10px",
                                      }}
                                      className="ml-3 btn position-relative btn-delete"
                                      onClick={() =>
                                        cooperationDelete(items.id)
                                      }
                                    >
                                      <Image
                                        width="14"
                                        height="14"
                                        src={`/assets/icon/trash.svg`}
                                        alt="trash"
                                      />
                                      <div className="text-hover-show-hapus">
                                        Hapus
                                      </div>
                                    </button>
                                  
                                   */}
                                  
                                  
                                  

                                  {items.status.name === "aktif" ? (
                                    <div>
                                      <button
                                        className="btn position-relative btn-delete"
                                        style={{
                                          background: "#F3F6F9",
                                          borderRadius: "6px",
                                          padding: "8px 10px 3px 10px",
                                        }}
                                        onClick={() =>
                                        router.push({
                                          pathname: `/partnership/manajemen-mitra/detail/mitra/${items.id}`,
                                          query: { idDetail: getId },
                                        })
                                      }
                                      >
                                        <Image
                                          src={`/assets/icon/detail.JPG`}
                                          width="18"
                                          height="16"
                                          alt="detail"
                                        />
                                        <div className="text-hover-show-hapus">
                                          Detail
                                        </div>
                                      </button>
                                      <button
                                        className="btn ml-3 position-relative btn-delete"
                                        style={{
                                          background: "#F3F6F9",
                                          borderRadius: "6px",
                                          padding: "8px 10px 3px 10px",
                                        }}
                                        onClick={() =>
                                        router.push({
                                          pathname: `/partnership/manajemen-mitra/edit/mitra/${items.id}`,
                                          query: { idDetail: getId },
                                        })
                                      }
                                      >
                                        <Image
                                          width="14"
                                          height="14"
                                          src={`/assets/icon/write.svg`}
                                          alt="write"
                                        />
                                        <div className="text-hover-show-hapus">
                                          Edit
                                        </div>
                                      </button>
                                    </div>
                                  ) : (
                                    <div>
                                      <button
                                        style={{
                                          background: "#F3F6F9",
                                          borderRadius: "6px",
                                          padding: "8px 10px 3px 10px",
                                        }}
                                        className="btn position-relative btn-delete"
                                        onClick={() =>
                                        router.push({
                                          pathname: `/partnership/manajemen-mitra/detail/mitra/${items.id}`,
                                          query: { idDetail: getId },
                                        })
                                      }
                                      >
                                        <Image
                                          src={`/assets/icon/detail.JPG`}
                                          width="18"
                                          height="16"
                                          className="btn"
                                          alt="detail"
                                        />
                                        <div className="text-hover-show-hapus">
                                          Detail
                                        </div>
                                      </button>
                                      <button
                                        className="btn ml-3 position-relative btn-delete"
                                        style={{
                                          background: "#F3F6F9",
                                          borderRadius: "6px",
                                          padding: "8px 10px 3px 10px",
                                        }}
                                        onClick={() =>
                                        router.push({
                                          pathname: `/partnership/manajemen-mitra/edit/mitra/${items.id}`,
                                          query: { idDetail: getId },
                                        })
                                      }
                                      >
                                        <Image
                                          width="14"
                                          height="14"
                                          src={`/assets/icon/write.svg`}
                                          alt="write"
                                        />
                                        <div className="text-hover-show-hapus">
                                          Edit
                                        </div>
                                      </button>
                                      <button
                                        style={{
                                          background: "#F3F6F9",
                                          borderRadius: "6px",
                                          padding: "8px 10px 3px 10px",
                                        }}
                                        className="ml-3 btn position-relative btn-delete"
                                        onClick={() =>
                                        cooperationDelete(items.id)
                                      }
                                      >
                                        <Image
                                          width="14"
                                          height="14"
                                          src={`/assets/icon/trash.svg`}
                                          alt="trash"
                                        />
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
                      : "Belom ada data kerjasama"}
                    {mitraDetailAll?.mitraDetailAll?.data?.list_cooperation_categories.length === 0 ?"Belom ada data kerjasama" :""}
                  </tbody>
                </table>
              </div>

              <div className="row">
                <div className="table-pagination">
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
                        onChange={(e) =>
                          dispatch(setLimitDetail(e.target.value))
                        }
                      >
                        <option>5</option>
                        <option>10</option>
                        <option>30</option>
                        <option>40</option>
                        <option>50</option>
                      </select>
                    </div>
                    <div className="col-8 my-auto">
                      <p
                        className="align-middle mt-3"
                        style={{ color: "#B5B5C3" }}
                      >
                        Total Data{" "}
                        {mitraDetailAll.mitraDetailAll &&
                          mitraDetailAll.totalDataDetail}
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

export default DetailDataKerjasama;
