import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import Pagination from "react-js-pagination";
import DatePicker from "react-datepicker";

import Swal from "sweetalert2";

import PageWrapper from "../../../wrapper/page.wrapper";
import CardPage from "../../../CardPage";
import ButtonAction from "../../../ButtonAction";

import Image from "next/image";
import { CSVLink } from "react-csv";

import IconCalender from '../../../assets/icon/Calender'
import IconArrow from '../../../assets/icon/Arrow'
import axios from 'axios'

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
  reloadTable
} from "../../../../redux/actions/partnership/managementCooporation.actions";



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
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(searchCooporation(valueSearch));
  };

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
        setIsStatusBar(true)
      }else{
        dispatch(reloadTable())
      }
    })
  }

  const cooperationDelete = (id) =>{
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
        dispatch(deleteCooperation(id))
        setDeleteBar(true)
      }else{
        dispatch(reloadTable())
      }
    })
  }
const [isStatusBar, setIsStatusBar] = useState(false)
  const [deleteBar, setDeleteBar] = useState(false)
  const onNewReset = () => {
    router.replace("/partnership/manajemen-kerjasama");
    setDeleteBar(false)
    setIsStatusBar(false)
  };
  useEffect(() => {
    console.log("useffect");
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

  const [sumWillExpire, setSumWillExpire] = useState(0)
  const getWillExpire = async () =>{
    try {
      let {data} = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/index?page=1&card=will_expire&limit=1000`
      );
      // router.push(urlExport.config.url);

      setSumWillExpire(data.data.total)
    } catch (error) {
      console.log("object", error);
    }
  }

  useEffect(() => {
    dispatch(fetchListSelectMitra());
    dispatch(fetchListSelectCooperation());
    dispatch(fetchListSelectStatus());
    getWillExpire()
  }, [dispatch]);
  return (
    <PageWrapper>
      {update  ? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
          style={{ backgroundColor: "#C9F7F5"}}
        >
          <div className="alert-icon">
            <i
              className="flaticon2-checkmark"
              style={{ color: "#1BC5BD" }}
            ></i>
          </div>
          <div
            className="alert-text"
            style={{ color: "#1BC5BD" }}
          >Berhasil mengupdate data
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
      {isStatusBar  ? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
          style={{ backgroundColor: "#C9F7F5"}}
        >
          <div className="alert-icon">
            <i
              className="flaticon2-checkmark"
              style={{ color: "#1BC5BD" }}
            ></i>
          </div>
          <div
            className="alert-text"
            style={{ color: "#1BC5BD" }}
          >Berhasil mengupdate status
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
      {deleteBar  ? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
          style={{ backgroundColor: "#f7c9c9"}}
        >
          <div className="alert-icon">
            <i
              className="flaticon2-checkmark"
              style={{ color: "#c51b1b" }}
            ></i>
          </div>
          <div
            className="alert-text"
            style={{ color: "#c51b1b" }}
          >Berhasil menghapus data
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

          <div className={`col bg-light-success cursor-pointer px-6 py-8 rounded-xl mr-7 mb-7`} onClick={() => dispatch(changeValueStatusCard("active"))} >
            <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
                <div className="row ml-4">
                    <Image alt='card-page-icon' src={`/assets/icon/user-blue.svg`} width={30} height={30} />
                    <p className={`font-weight-bold font-size-h2 ml-2 my-auto`} style={{ color: "#74BBB7", opacity: '0.5' }}>{allMK.totalDataActive} Kerjasama</p>
                </div>
            </span>
            <p className='ml-3 mt-2' style={{ color: "#74BBB7", fontSize: '15px', fontWeight: '500', opacity: '0.50' }}>Kerjasama Aktif</p>
        </div >

        {/* card 2 */}

          <div className={`col bg-light-warning cursor-pointer px-6 py-8 rounded-xl mr-7 mb-7`} onClick={() => dispatch(changeValueStatusCard("submission"))} >
            <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
                <div className="row ml-4">
                    <Image alt='card-page-icon position-relative' src={`/assets/icon/user-orange.svg`} width={30} height={30} />
                    <p className={`font-weight-bold font-size-h2 ml-2 my-auto`} style={{ color: "#634100", opacity: '0.5' }}>{allMK.totalDataAnother} Pengajuan Kerjasama</p>
                </div>
            </span>
            <p className='ml-3 mt-2' style={{ color: "#C8A561", fontSize: '15px', fontWeight: '500', opacity: '0.50' }}>Pengajuan Kerjasama</p>
        </div >
        {/* card 3 */}

          <div className={`col bg-light-danger cursor-pointer px-6 py-8 rounded-xl mr-7 mb-7`} onClick={() => dispatch(changeValueStatusCard("will_expire"))} >
            <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
                <div className="row ml-4">
                  <div className="position-relative" style={{top:"8px"}}>
                    <Image alt='card-page-icon' src={`/assets/icon/info-danger.svg`} width={35} height={35} />
                    </div>
                    <p className={`font-weight-bold font-size-h2 ml-2 my-auto`} style={{ color: "#F65464", opacity: '0.5' }}>{sumWillExpire} Kerjasama akan Habis</p>
                </div>
            </span>
            <p className='ml-3 mt-2 position-relative' style={{ color: "#F65464",bottom:"8px", fontSize: '15px', fontWeight: '500', opacity: '0.50' }}>Kerjasama akan Habis</p>
        </div >


        </div>
      </div>

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h1 className="card-title font-weight-bolder text-dark">
              Manajemen Kerjasama
            </h1>
            <div className="card-toolbar">
              <Link href="/partnership/manajemen-kerjasama/tambah">
                <a className="btn btn-primary px-6 font-weight-bold btn-block ">
                  Tambah Kerjasama Baru
                </a>
              </Link>
            </div>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-12 col-xl-12">
                  <form
                    onSubmit={handleSubmit}
                    className="d-flex align-items-center w-100"
                  >
                    <div className="input-icon w-100">
                      <input
                        style={{ background: "#F3F6F9", border: "none" }}
                        type="text"
                        className="form-control"
                        placeholder="Cari..."
                        id="kt_datatable_search_query"
                        onChange={(e) =>
                          handleChangeValueSearch(e.target.value)
                        }
                      />
                      <span>
                        <i className="flaticon2-search-1 text-muted"></i>
                      </span>
                    </div>
                    <button
                      type="submit"
                      className="btn bg-light-primary text-primary ml-4"
                      style={{
                        width: "120px",
                        fontWeight: "600",
                        fontSize: "14px",
                      }}
                    >
                      Cari
                    </button>
                  </form>
                </div>
              </div>
              <form onSubmit={handleSubmitSearchMany}>
                <div className="row align-items-right">
                  <div className="col-lg-2 col-xl-2 mt-5 mt-lg-5">
                    <div className="position-relative d-flex align-items-center cursor-pointer">
                    <select
                      onChange={(e) => setValueMitra(e.target.value)}
                      name=""
                      id=""
                      className="form-control remove-icon-default cursor-pointer dropdown-lists"
                    >
                      <option value="">Mitra</option>
                      {allMK.stateListMitra.length === 0
                        ? ""
                        : allMK.stateListMitra.data.map((items,i) => {
                            return (
                              <option key={i} value={items.name}>{items.name}</option>
                            );
                          })}
                    </select>
                    <IconCalender className="right-center-absolute" style={{right:"10px"}}/>
                    </div>
                  </div>
                  <div className="col-lg-2 col-xl-3 mt-5 mt-lg-5">
                    <div className="position-relative d-flex align-items-center cursor-pointer">
                    <select
                      onChange={(e) => setValueKerjaSama(e.target.value)}
                      name=""
                      id=""
                      className="form-control remove-icon-default cursor-pointer dropdown-lists"
                    >
                      <option value="">Kategory Kerjasama</option>
                      {allMK.stateListKerjaSama.length === 0
                        ? ""
                        : allMK.stateListKerjaSama.data.map((items,i) => {
                            return (
                              <option key={i} value={items.cooperation_categories}>
                                {items.cooperation_categories}
                              </option>
                            );
                          })}
                    </select>
                    <IconCalender className="right-center-absolute" style={{right:"10px"}}/>
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
                      {allMK.stateListStatus.length === 0
                        ? ""
                        : allMK.stateListStatus.data.map((items,i) => {
                            return (
                              <option key={i} value={items.name_en}>{items.name}</option>
                            );
                          })}
                    </select>
                    <IconCalender className="right-center-absolute" style={{right:"10px"}}/>
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
                  <div className="col-lg-2 col-xl-2 mt-5 mt-lg-5 ml-auto position-relative">
                    <button
                    type="button"
                    onClick={()=>dispatch(exportFileCSV())}
                      className="btn btn-sm btn-primary px-6 font-weight-bold btn-block center-absolute"
                      style={exportCSV}
                    >
                      Export .csv
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="table-page mt-5">
              <div className="table-responsive">
                {allMK.statusLoad === "process" ? (
                  <div className="d-flex justify-content-center py-5 ">
                    <h4>Loading ..</h4>
                  </div>
                ) : (
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-center">No</th>
                        <th className="text-center align-middle">Mitra</th>
                        <th className="text-center align-middle">
                          Judul Kerjasama
                        </th>
                        <th className="text-center align-middle">Periode</th>
                        <th className="text-center align-middle">
                          Tanggal Tanda Tangan
                        </th>
                        <th className="text-center align-middle">
                          Tanggal Selesai
                        </th>
                        <th className="text-center align-middle">Status</th>
                        <th className="text-center align-middle">Action</th>
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
                                <td className="text-center align-middle">
                                  <button
                                    className="btn"
                                    style={{
                                      background: "#F3F6F9",
                                      borderRadius: "6px",
                                    }}
                                  >
                                    {allMK.page ===  1 ? index+1 : ((allMK.page - 1) * allMK.limit) +  (index + 1)}
                                    
                                    {/* {index+1} */}

                                  </button>
                                </td>
                                <td className="align-middle text-center">
                                  {items.partner === null ? (
                                    "Tidak ada"
                                  ) : (
                                    <p className="p-part-t">
                                      {items.partner.user.name}
                                    </p>
                                  )}
                                </td>
                                <td className="d-flex justify-content-center">
                                  <div className="d-flex align-items-center justify-content-center flex-column">
                                    <p className="p-part-t">{items.title}</p>
                                    <p className="p-part-d">
                                      (
                                      {
                                        items.cooperation_category ===null ? "tidak ada kategori kerjasama":
                                          items.cooperation_category.cooperation_categories
                                      }
                                      )
                                    </p>
                                  </div>
                                  <br />
                                  {/* <small style={{ color: "grey" }}>
                          Memodanrum of Understanding (MoU)
                        </small> */}
                                </td>
                                <td className="align-middle text-center">
                                  <p className="p-part-t">
                                    {items.period} {items.period_unit}
                                  </p>{" "}
                                </td>
                                <td className="align-middle text-center">
                                  <p className="p-part-t">
                                    {items.signing_date}
                                  </p>
                                </td>
                                <td className="align-middle text-center">
                                  <p className="p-part-t">
                                    {items.period_date_end}
                                  </p>
                                </td>
                                <td className="align-middle text-center">
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
                                          router.push(
                                            `/partnership/manajemen-kerjasama/view/${items.id}`
                                          )
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
                                          router.push(
                                            `/partnership/manajemen-kerjasama/edit/${items.id}`
                                          )
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
                                          router.push(
                                            `/partnership/manajemen-kerjasama/view/${items.id}`
                                          )
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
                                          router.push(
                                            `/partnership/manajemen-kerjasama/edit/${items.id}`
                                          )
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
