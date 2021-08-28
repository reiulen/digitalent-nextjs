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
  deleteMitra,
  setPage,
  setLimit,
  exportFileCSV,
  cancelChangeProvinces
} from "../../../../redux/actions/partnership/mitra.actions";

import Swal from "sweetalert2";

const Table = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { success, update } = router.query;

  const allMitra = useSelector((state) => state.allMitra);
  console.log("state allMitra", allMitra);

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
        <div className="row">
          <div
            className={`col bg-light-success cursor-pointer px-6 py-8 rounded-xl mb-7`}
            // onClick={() => dispatch(changeValueStatusCard("active"))}
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
                  {/* {allMK.totalDataActive}  */}
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
        </div>
      </div>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
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
                {/* <Link href="/partnership/manajemen-mitra/tambah">
                <a className="btn btn-primary px-6 font-weight-bold btn-block ">
                  Export Csv
                </a>
              </Link> */}
                <button
                  type="button"
                  onClick={() => dispatch(exportFileCSV())}
                  className="btn btn-primary px-6 font-weight-bold btn-block"
                >
                  Export .csv
                </button>
              </div>
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
                    {allMitra.status === "success"
                      ? allMitra.mitraAll.length === 0
                        ? "Tidak ada data"
                        : allMitra.mitraAll.data.list_mitras.map(
                            (item, index) => {
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
                                      {allMitra.page === 1
                                        ? index + 1
                                        : (allMitra.page - 1) * allMitra.limit +
                                          (index + 1)}
                                    </button>
                                  </td>
                                  <td className="align-middle text-center">
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
                                    <button
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
                                    </button>

                                    {/* <ButtonAction
                                  icon="detail.svg"
                                  link="/partnership/manajemen-mitra/detail-data-kerjasama"
                                /> */}
                                    {/* <button
                                        className="btn ml-3 position-relative btn-delete"
                                        style={{
                                          background: "#F3F6F9",
                                          borderRadius: "6px",
                                          padding: "8px 10px 3px 10px",
                                        }}
                                        onClick={() =>
                                          router.push(
                                            `/partnership/manajemen-mitra/edit/${item.id}`
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

                                        // router.push('/partnership/manajemen-mitra/', `/partnership/manajemen-mitra/edit/${item.id}`, { shallow: true })


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
                                    {/* <button
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
                                </button> */}

                                    <button
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
                                    </button>
                                  </td>
                                </tr>
                              );
                            }
                          )
                      : "Loading .. / silahkan reload halaman"}
                  </tbody>
                </table>
              </div>

              <div className="row">
                {/* {allMitra && allMitra.perPage < allMitra.total && ( */}
                <div className="table-pagination">
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
                        onChange={(e) => dispatch(setLimit(e.target.value))}
                      >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                      </select>
                    </div>
                    <div className="col-8 my-auto">
                      <p
                        className="align-middle mt-3 ml-3"
                        style={{ color: "#B5B5C3" }}
                      >
                        Total Data {allMitra.totalDataMitra}
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
