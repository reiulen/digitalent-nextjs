import React, { useEffect, useState } from "react";

import Link from "next/link";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";
import Tables from '../../../Table/Table'

import PageWrapper from "../../../wrapper/page.wrapper";
import CardPage from "../../../CardPage";
import ButtonAction from "../../../ButtonAction";
import {
  fetchMitra,
  searchByKey,
  deleteMitra,
  setPage,
  setLimit,
  exportFileCSV,
  cancelChangeProvinces
} from "../../../../redux/actions/partnership/mitra.actions";
import LoadingTable from '../../../LoadingTable'

import Swal from "sweetalert2";

const Table = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { success, update } = router.query;

  const allMitra = useSelector((state) => state.allMitra);

  const [keyWord, setKeyWord] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchByKey(keyWord));
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
        dispatch(deleteMitra(id));
        setSuccessDelete(true);
        router.replace(`/partnership/manajemen-mitra`);
      }
    });
  };
  const onNewReset = () => {
    setSuccessDelete(false);
    router.replace(`/partnership/manajemen-mitra`);
  };
  // dipake ketika selesai tambah data mitra
  // const [success, setSuccess] = useState(false)
  useEffect(() => {
    dispatch(fetchMitra());
    dispatch(cancelChangeProvinces())
  }, [
    dispatch,
    allMitra.keyword,
    allMitra.status_reload,
    allMitra.page,
    allMitra.limit,
    allMitra.card,
    update
  ]);

  return (
    <PageWrapper>
      {success ? (
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
          <div
            className="alert-text"
            style={{ color: "#1BC5BD" }}
          >
            
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
      {update? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
          style={{ backgroundColor: "#C9F7F5" }}
        >
          <div className="alert-icon">
            <i
              className="flaticon2-checkmark"
              style={{ color: "#1BC5BD"}}
            ></i>
          </div>
          <div
            className="alert-text"
            style={{ color:"#1BC5BD"}}
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
      {successDelete? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
          style={{ backgroundColor: "#f7c9c9" }}
        >
          <div className="alert-icon">
            <i
              className="flaticon2-checkmark"
              style={{ color: "#c51b1b"}}
            ></i>
          </div>
          <div
            className="alert-text"
            style={{ color:"#c51b1b"}}
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

        <CardPage
            background="bg-light-success "
            icon="user-blue.svg"
            color='#ffffff'
            value={allMitra.totalDataMitra}
            titleValue="Mitra"
            title="Total Mitra"
            // publishedVal="1"
            // routePublish={() => dispatch(changeValueStatusCard("active"))}
          />



          {/* // onClick={() => dispatch(changeValueStatusCard("active"))} */}
        {/* <div className="row">
          <div
            className={`col bg-light-success cursor-pointer px-6 py-8 rounded-xl mb-7`}
          >
            <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
              <div className="row ml-4">
                <Image
                  alt="card-page-icon"
                  src={`/assets/icon/user-blue.svg`}
                  width={30}
                  height={30}
                />
                <p
                  className={`font-weight-bold font-size-h2 ml-2 my-auto`}
                  style={{ color: "#74BBB7", opacity: "0.5" }}
                >
                  {allMitra.totalDataMitra} Mitra
                </p>
              </div>
            </span>
            <p
              className="ml-3 mt-2"
              style={{
                color: "#74BBB7",
                fontSize: "15px",
                fontWeight: "500",
                opacity: "0.50",
              }}
            >
              Total Mitra
            </p>
          </div>
        </div> */}













      </div>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">

          {/*  */}
          {/* <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark" style={{ fontSize: "24px" }}>
              Manajemen Mitra
            </h3>
            <div className="d-flex align-items-center">
              <div className="card-toolbar mr-3">
                <Link href="/partnership/manajemen-mitra/tambah">
                  <a className="btn btn-primary px-6 font-weight-bold btn-block ">
                    Tambah Mitra Baru
                  </a>
                </Link>
              </div>
              <div className="card-toolbar">
                <button
                  type="button"
                  onClick={() => dispatch(exportFileCSV())}
                  className="btn btn-primary px-6 font-weight-bold btn-block"
                >
                  Export .csv
                </button>
              </div>
            </div>
          </div> */}
          {/*  */}
          {/*  */}
          <div className="d-flex align-items-center justify-content-between p-8">
            <h1
              className="card-title font-weight-bolder text-dark"
              style={{ fontSize: "24px" }}
            >
              Manajemen Mitra
            </h1>
            <Link href="/partnership/manajemen-mitra/tambah">
              <a className="btn btn-rounded-full bg-blue-primary text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  className="mr-3"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
                    fill="rgba(255,255,255,1)"
                  />
                </svg>
                Tambah Mitra Baru
              </a>
            </Link>
          </div>
          {/*  */}

          <div className="card-body pt-0">
            <form onSubmit={handleSubmit}>
              {/* <div className="table-filter">
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
              </div> */}
              <div className="row w-100"> 
<div className="col-12 col-sm-6">

                    <div
        className="position-relative overflow-hidden w-100"
      >
        <svg
          className="left-center-absolute"
          style={{ left: "10" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16"
          height="16"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"
            fill="#E4E6EF"
          />
        </svg>
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
          style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}
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
                  onClick={() => dispatch(exportFileCSV())}
                      className="btn btn-rounded-full bg-blue-secondary text-white ml-0"
                      style={{width:"max-content"}}
                      // style={exportCSV}
                    >
                      Export .csv
                    </button>


        </div>
      </div>
      </div>
            </form>
            <Tables 
            tableHead=
            {
                    <tr>
                      <th className="text-left">No</th>
                      <th className="text-left align-middle">Logo</th>
                      <th className="text-left align-middle">Mitra</th>
                      <th className="text-left align-middle">Website Website Website</th>
                      <th className="text-left align-middle">Kerjasama</th>
                      <th className="text-left align-middle">Aksi</th>
                    </tr>
                  }
                  tableBody={
allMitra.status === "success"
                      ? allMitra.mitraAll.length === 0
                        ? <LoadingTable />
                        : allMitra.mitraAll.data.list_mitras.map(
                            (item, index) => {
                              return (
                                <tr key={index}>
                                  <td className="text-left align-middle">
                                    <p
                                      className="mb-0"
                                      
                                    >
                                      {allMitra.page === 1
                                        ? index + 1
                                        : (allMitra.page - 1) * allMitra.limit +
                                          (index + 1)}
                                    </p>
                                  </td>
                                  <td className="align-middle text-left">
                                    <Image
                                      unoptimized={
                                        process.env.ENVIRONMENT !== "PRODUCTION"
                                      }
                                      src={
                                        process.env
                                          .END_POINT_API_IMAGE_PARTNERSHIP +
                                        "partnership/images/profile-images/" +
                                        item.agency_logo
                                      }
                                      width={40}
                                      height={40}
                                      alt="logo"
                                    />
                                  </td>
                                  <td className="align-middle text-left">
                                    {item.user.name}
                                  </td>
                                  <td className="align-middle text-left">
                                    {item.website}
                                  </td>
                                  <td className="align-middle text-left">
                                    {item.cooperations_count} Kerjasama
                                  </td>
                                  <td className="align-middle text-left">
                                    
                                    <div className="d-flex align-items-center">

                                    

                                    {/* <button
                                      style={{
                                        background: "#F3F6F9",
                                        borderRadius: "6px",
                                        padding: "8px 10px 3px 10px",
                                      }}
                                      className="btn position-relative btn-delete"
                                      onClick={() =>
                                        router.push(
                                          `/partnership/manajemen-mitra/detail/${item.id}`
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
                                    </button> */}

                                    <button
                                        className="btn btn-link-action bg-blue-secondary"
                                        onClick={() =>
                                        router.push(
                                          `/partnership/manajemen-mitra/detail/${item.id}`
                                        )
                                      }
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 24 24"
                                          width="14"
                                          height="12"
                                        >
                                          <path fill="none" d="M0 0h24v24H0z" />
                                          <path
                                            d="M1.181 12C2.121 6.88 6.608 3 12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
                                            fill="rgba(255,255,255,1)"
                                          />
                                        </svg>
                                      </button>






                                    {/* <button
                                      className="btn ml-3 position-relative btn-delete"
                                      style={{
                                        background: "#F3F6F9",
                                        borderRadius: "6px",
                                        padding: "8px 10px 3px 10px",
                                      }}
                                      onClick={() =>
                                        router.push({
                                          pathname:
                                          `/partnership/manajemen-mitra/edit/${item.id}`
                                        },undefined, { shallow: true }
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
                                    </button> */}


                                    <button
                                        className="btn btn-link-action bg-blue-secondary mx-3"
                                        onClick={() =>
                                        router.push({
                                          pathname:
                                          `/partnership/manajemen-mitra/edit/${item.id}`
                                        },undefined, { shallow: true }
                                        )
                                      }
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 24 24"
                                          width="14"
                                          height="12"
                                        >
                                          <path fill="none" d="M0 0h24v24H0z" />
                                          <path
                                            d="M12.9 6.858l4.242 4.243L7.242 21H3v-4.243l9.9-9.9zm1.414-1.414l2.121-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z"
                                            fill="rgba(255,255,255,1)"
                                          />
                                        </svg>
                                      </button>



                                     {/* <button
                                      style={{
                                        background: "#F3F6F9",
                                        borderRadius: "6px",
                                        padding: "8px 10px 3px 10px",
                                      }}
                                      className="ml-3 btn position-relative btn-delete"
                                      onClick={() => handleDelete(item.id)}
                                      
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
                                    </button> */}

                                    <button
                                        className="btn btn-link-action bg-blue-secondary"
                                        onClick={() => handleDelete(item.id)}
                                      >
                                        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="14"
          height="12"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"
            fill="rgba(255,255,255,1)"
          />
        </svg>
                                      </button>




                                    </div>
                                  </td>
                                </tr>
                              );
                            }
                          )
                      : <LoadingTable />
                  }
                  pagination={
                    <Pagination
                    activePage={allMitra.page}
                    itemsCountPerPage={allMitra?.mitraAll?.data?.perPage}
                    totalItemsCount={allMitra?.mitraAll?.data?.total}
                    pageRangeDisplayed={3}
                    onChange={(page) => dispatch(setPage(page))}
                    nextPageText={">"}
                    prevPageText={"<"}
                    firstPageText={"<<"}
                    lastPageText={">>"}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                  }
                  onChangeLimit={(e) => dispatch(setLimit(e.target.value))}
                  totalData={allMitra.totalDataMitra}
                  /> </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Table;
