import React, { useEffect, useState } from "react";

import Link from "next/link";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";

import PageWrapper from "../../../wrapper/page.wrapper";
import CardPage from "../../../CardPage";
import ButtonAction from "../../../ButtonAction";
import {
  fetchMitra,
  searchByKey,
  deleteMitra
} from "../../../../redux/actions/partnership/mitra.actions";

import Swal from "sweetalert2";

const Table = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const allMitra = useSelector(state => state.allMitra)
  console.log("state allMitra",allMitra)

  const [keyWord, setKeyWord] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchByKey(keyWord))
  };

  const [successDelete, setSuccessDelete] = useState(false);
  const handleDelete = (id) => {

    Swal.fire({
      title: "Apakah anda yakin ingin menghapus data mitra ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya !",
      dismissOnDestroy: false,
    }).then(async (result) => {
      if (result.value) {
        dispatch(deleteMitra(id))
        setSuccessDelete(true);
      }
    })
  }
  const onNewReset = () => {
    setSuccessDelete(false);
    // router.replace(`/partnership/master-kategori-kerjasama`);
  };
  // dipake ketika selesai tambah data mitra
const [success, setSuccess] = useState(false)
  useEffect(() => {
    dispatch(fetchMitra())
  }, [allMitra.keyword,allMitra.status_reload])

  return (
    <PageWrapper>

      {success || successDelete ? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
          style={{ backgroundColor: success ? "#C9F7F5" : "#f7c9c9" }}
        >
          <div className="alert-icon">
            <i className="flaticon2-checkmark" style={{color:success?"#1BC5BD":"#c51b1b"}}></i>
          </div>
          <div className="alert-text" style={{color:success?"#1BC5BD":"#c51b1b"}}>
            {successDelete
              ? "Berhasil menghapus data Data"
              : "Berhasil menyimpan Data"}
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
          <div className={`col bg-light-success cursor-pointer px-6 py-8 rounded-xl mb-7`} 
          // onClick={() => dispatch(changeValueStatusCard("active"))} 
          >
            <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
                <div className="row ml-4">
                    <Image alt='card-page-icon' src={`/assets/icon/user-blue.svg`} width={30} height={30} />
                    <p className={`font-weight-bold font-size-h2 ml-2 my-auto`} style={{ color: "#74BBB7", opacity: '0.5' }}>
                      {/* {allMK.totalDataActive}  */}
                      {allMitra.totalDataMitra} Mitra</p>
                </div>
            </span>
            <p className='ml-3 mt-2' style={{ color: "#74BBB7", fontSize: '15px', fontWeight: '500', opacity: '0.50' }}>Total Mitra</p>
        </div >
          
        </div>
      </div>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              Manajemen Mitra
            </h3>
            <div className="card-toolbar">
              <Link href="/partnership/manajemen-mitra/tambah">
                <a className="btn btn-primary px-6 font-weight-bold btn-block ">
                  Tambah Mitra Baru
                </a>
              </Link>
            </div>
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
            <div className="table-page mt-5">
              <div className="table-responsive">
                <table className="table table-separate table-head-custom table-checkable">
                  <thead style={{ background: "#F3F6F9" }}>
                    <tr>
                      <th className="text-center align-middle">No</th>
                      <th className="text-center align-middle">Logo</th>
                      <th className="text-center align-middle">Mitra</th>
                      <th className="text-center align-middle">Website</th>
                      <th className="text-center align-middle">Kerjasama</th>
                      <th className="text-center align-middle">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allMitra.status === "success" ?
                    allMitra.mitraAll.data.list_mitras.length === 0 ? "Tidak ada data" :allMitra.mitraAll.data.list_mitras.map((item,index)=>{
                      return(
                            <tr key={index}>
                              <td className="text-center align-middle">
                                <button
                                  className="btn"
                                  style={{
                                    background: "#F3F6F9",
                                    borderRadius: "6px",
                                  }}
                                >
                                  {allMitra.page ===  1 ? index+1 : ((allMitra.page - 1) * allMitra.limit) +  (index + 1)}
                                </button>
                              </td>
                              <td className="align-middle text-center">
                                {/* <Image
                                  src={`/assets/icon/${item.agency_logo}`}
                                  width={40}
                                  height={40}
                                  alt="logo"
                                /> */}
                              </td>
                              <td className="align-middle text-center">
                                {item.user.name}
                              </td>
                              <td className="align-middle text-center">
                                {item.website}
                              </td>
                              <td className="align-middle text-center">
                                {item.cooperations_count} Kerjasama
                              </td>
                              <td className="align-middle text-center">
                                <ButtonAction
                                  icon="detail.svg"
                                  link="/partnership/manajemen-mitra/detail-data-kerjasama"
                                />
                                <ButtonAction
                                  icon="write.svg"
                                  // link={`/partnership/manajemen-mitra/${dataMitra.id}`}
                                />
                                <button
                                  onClick={() => handleDelete(item.id)}
                                  className="btn mr-1"
                                  style={{
                                    background: "#F3F6F9",
                                    borderRadius: "6px",
                                  }}
                                >
                                  <Image
                                    alt="button-action"
                                    src={`/assets/icon/trash.svg`}
                                    width={18}
                                    height={18}
                                  />
                                </button>
                              </td>
                            </tr>
                            )
                    })
                            :"loading"}
                     
                  </tbody>
                </table>
              </div>

              <div className="row">
                {/* {allMitra && allMitra.perPage < allMitra.total && ( */}
                  <div className="table-pagination">
                    {/* <Pagination
                      activePage={page}
                      itemsCountPerPage={allMitra.perPage}
                      totalItemsCount={allMitra.total}
                      pageRangeDisplayed={3}
                      onChange={handlePagination}
                      nextPageText={">"}
                      prevPageText={"<"}
                      firstPageText={"<<"}
                      lastPageText={">>"}
                      itemClass="page-item"
                      linkClass="page-link"
                    /> */}
                  </div>
                {/* )} */}
                {/* {allMitra && allMitra.total > 5 ? ( */}
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
                          // onChange={(e) => handleLimit(e.target.value)}
                          // onBlur={(e) => handleLimit(e.target.value)}
                        >
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="15">15</option>
                          <option value="20">20</option>
                        </select>
                      </div>
                      <div className="col-8 my-auto">
                        <p
                          className="align-middle mt-3"
                          style={{ color: "#B5B5C3" }}
                        >
                          Total Data 
                        </p>
                      </div>
                    </div>
                  </div>
                {/* ) : (
                  ""
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Table;
