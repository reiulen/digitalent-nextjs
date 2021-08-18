import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import Pagination from "react-js-pagination";
import DatePicker from "react-datepicker";

import PageWrapper from "../../../wrapper/page.wrapper";
import CardPage from "../../../CardPage";
import ButtonAction from "../../../ButtonAction";


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
  fetchListSelectStatus
} from "../../../../redux/actions/partnership/managementCooporation.actions";

const Table = () => {
  let dispatch = useDispatch();
  const allMK = useSelector((state) => state.allMK);
  console.log("allMK",allMK)
  const exportCSV = {
    width: "77%",
    marginLeft: "2rem",
  };
  const [valueSearch, setValueSearch] = useState("");
  const [valueMitra, setValueMitra] = useState("");
  const [valueStatus, setValueStatus] = useState("");
  const [valueKerjaSama, setValueKerjaSama] = useState("");
  console.log("valueKerjaSama",valueKerjaSama)
  const handleChangeValueSearch = (value) => {
    setValueSearch(value);
  };
  const handleSubmitSearchMany = (event) => {
    event.preventDefault();
    dispatch(changeValueMitra(valueMitra))
    dispatch(changeValueStatus(valueStatus))
    dispatch(changeValueKerjaSama(valueKerjaSama))
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(searchCooporation(valueSearch));
  };
  
  console.log("var")
  useEffect(() => {
    console.log("useffect")
    dispatch(fetchAllMK());
        
  }, [
    dispatch,
    allMK.keyword,
    allMK.page,
    allMK.status,
    allMK.categories_cooporation,
    allMK.partner,
    allMK.limit,
  ])

  useEffect(() => {
    dispatch(fetchListSelectMitra())
    dispatch(fetchListSelectCooperation())
    dispatch(fetchListSelectStatus())
    
  }, [])
  return (
    <PageWrapper>
      {console.log("object html")}
      <div className="col-lg-12 col-md-12">
        <div className="row">
          <CardPage
            background="bg-light-success cursor-pointer"
            icon="user-blue.svg"
            color="#74BBB7"
            value={allMK.totalDataActive}
            titleValue="Kerjasama"
            title="Kerjasama Aktif"
            onClick={()=>dispatch(changeValueStatus('aktif'))}
          />
          <CardPage
            background="bg-light-warning cursor-pointer"
            icon="user-orange.svg"
            color="#634100"
            value={allMK.totalDataAnother}
            titleValue="Kerjasama"
            title="Pengajuan Kerjasama"
          />
          <CardPage
            background="bg-light-danger cursor-pointer"
            icon="info-danger.svg"
            color="#F65464"
            value={allMK.totalDataNonActive}
            titleValue="Kerjasama"
            title="Kerjasama akan Habis"
            onClick={()=>dispatch(changeValueStatus('tidak aktif'))}
          />
        </div>
      </div>

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              Manajemen Kerjasama
            </h3>
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
                      style={{ width: "120px" }}
                    >
                      Cari
                    </button>
                  </form>
                </div>
              </div>
              <form onSubmit={handleSubmitSearchMany}>
              <div className="row align-items-right">
                <div className="col-lg-2 col-xl-2 mt-5 mt-lg-5">
                  <select onChange={(e)=>(setValueMitra(e.target.value))} name="" id="" className="form-control">
                    <option value="">Mitra</option>
                    {allMK.stateListMitra.length === 0 ? "":allMK.stateListMitra.data.map(items =>{
                      return(
                        <option value={items.name}>{items.name}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="col-lg-2 col-xl-2 mt-5 mt-lg-5">
                  <select onChange={(e)=>setValueKerjaSama(e.target.value)} name="" id="" className="form-control">
                    <option value="">Kategory Kerjasama</option>
                    {allMK.stateListKerjaSama.length === 0 ? "":allMK.stateListKerjaSama.data.map(items =>{
                      return(
                        <option value={items.cooperation_categories}>{items.cooperation_categories}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="col-lg-2 col-xl-2 mt-5 mt-lg-5">
                  <select onChange={(e)=>(setValueStatus(e.target.value))} name="" id="" className="form-control">
                    <option value="">Status</option>
                    {allMK.stateListStatus.length === 0 ? "":allMK.stateListStatus.data.map(items =>{
                      return(
                        <option value={items.name}>{items.name}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="col-lg-1 col-xl-1 mt-5 mt-lg-5 p-0 mx-2 py-1">
                  <button
                      type="submit"
                      className="btn bg-light-primary text-primary position-relative"
                      style={{ width: "120px",bottom:"2px" }}
                    >
                      Cari
                    </button>
                </div>
                <div className="col-lg-2 col-xl-2 mt-5 mt-lg-5 ml-auto">
                  <a
                    href="#"
                    className="btn btn-sm btn-primary px-6 font-weight-bold btn-block"
                    style={exportCSV}
                  >
                    Export .csv
                  </a>
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
                ) :(
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
                    {allMK.m_cooporation.data && allMK.m_cooporation.data.list_cooperations.length === 0 ? (
                  <div className="d-flex justify-content-center py-5 ">
                    <h4>Data tidak ditemukan</h4>
                  </div>
                ) :allMK.m_cooporation.data && allMK.m_cooporation.data.list_cooperations.map((items,index)=>{
                      return(

                    
                    <tr key={index}>
                      <td className="text-center align-middle">
                        <button
                          className="btn"
                          style={{ background: "#F3F6F9", borderRadius: "6px" }}
                        >
                          {index+1}
                        </button>
                      </td>
                      <td className="align-middle text-center">
                        {items.partner === null ? "Tidak ada":items.partner.user.name}
                        </td>
                      <td className="align-middle text-center">
                        
                        {items.title}
                        <br />
                        {/* <small style={{ color: "grey" }}>
                          Memodanrum of Understanding (MoU)
                        </small> */}
                      </td>
                      <td className="align-middle text-center">{items.period} {items.period_unit} </td>
                      <td className="align-middle text-center">{items.signing_date}</td>
                      <td className="align-middle text-center">{items.period_date_end}</td>
                      <td className="align-middle text-center">
                        <select name="" id="" className="form-control">
                          <option value="2">{items.status.name}</option>
                        </select>
                      </td>
                      <td className="align-middle text-center">
                        Hapus || Ubah
                      </td>
                    </tr>
                      )
                    })  }
                    </tbody>
                </table>
                    )
                  }
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
                        Total Data {allMK.m_cooporation.data && allMK.m_cooporation.data.total} 
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
