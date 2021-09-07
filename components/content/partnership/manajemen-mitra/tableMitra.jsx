import React, { useEffect, useState } from "react";

import Link from "next/link";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";
import Tables from "../../../Table/Table";
import IconSearch from "../../../assets/icon/Search";
import IconEye from "../../../assets/icon/Eye";
import IconDelete from "../../../assets/icon/Delete";
import IconPencil from "../../../assets/icon/Pencil";
import IconAdd from "../../../assets/icon/Add";

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
  cancelChangeProvinces,
} from "../../../../redux/actions/partnership/mitra.actions";
import LoadingTable from "../../../LoadingTable";

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
  useEffect(() => {
    dispatch(fetchMitra());
    dispatch(cancelChangeProvinces());
  }, [
    dispatch,
    allMitra.keyword,
    allMitra.status_reload,
    allMitra.page,
    allMitra.limit,
    allMitra.card,
    update,
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
      {successDelete ? (
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
        <CardPage
          background="bg-light-success "
          icon="user-blue.svg"
          color="#ffffff"
          value={allMitra.totalDataMitra}
          titleValue="Mitra"
          title="Total Mitra"
        />
      </div>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="d-flex flex-wrap align-items-center justify-content-between p-8">
            <h1
              className="card-title font-weight-bolder text-dark"
              style={{ fontSize: "24px" }}
            >
              Manajemen Mitra
            </h1>
            <Link href="/partnership/manajemen-mitra/tambah">
              <a className="btn btn-rounded-full bg-blue-primary text-white">
                <IconAdd
                  className="mr-3"
                  width="16"
                  height="16"
                  fill="rgba(255,255,255,1)"
                />
                Tambah Mitra Baru
              </a>
            </Link>
          </div>
          {/*  */}

          <div className="card-body pt-0">
            <form onSubmit={handleSubmit}>
              <div className="row w-100">
                <div className="col-12 col-sm-6">
                  <div className="position-relative overflow-hidden w-100 mt-3">
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
                  <div className="d-flex align-items-center justify-content-end mt-2">
                    {/* disini sortir modal */}

                    <button
                      type="button"
                      onClick={() => dispatch(exportFileCSV())}
                      className="btn btn-rounded-full bg-blue-secondary text-white ml-0"
                      style={{ width: "max-content" }}
                    >
                      Export .csv
                    </button>
                  </div>
                </div>
              </div>
            </form>
            {allMitra.status === "process" ? (
              <LoadingTable />
            ) : (
              <Tables
                tableHead={
                  <tr>
                    <th className="text-left">No</th>
                    <th className="text-left align-middle">Logo</th>
                    <th className="text-left align-middle">Mitra</th>
                    <th className="text-left align-middle">
                      Website Website Website
                    </th>
                    <th className="text-left align-middle">Kerjasama</th>
                    <th className="text-left align-middle">Aksi</th>
                  </tr>
                }
                tableBody={
                  allMitra.mitraAll.data &&
                  allMitra.mitraAll.data.list_mitras.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        <h4>Data tidak ditemukan</h4>
                      </td>
                    </tr>
                  ) : (
                    allMitra.mitraAll.data &&
                    allMitra.mitraAll.data.list_mitras.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-left align-middle">
                            <p className="mb-0">
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
                                process.env.END_POINT_API_IMAGE_PARTNERSHIP +
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
                              <button
                                className="btn btn-link-action bg-blue-secondary"
                                onClick={() =>
                                  router.push(
                                    `/partnership/manajemen-mitra/detail/${item.id}`
                                  )
                                }
                              >
                                <IconEye
                                  width="14"
                                  height="12"
                                  fill="rgba(255,255,255,1)"
                                />
                              </button>

                              <button
                                className="btn btn-link-action bg-blue-secondary mx-3"
                                onClick={() =>
                                  router.push(
                                    {
                                      pathname: `/partnership/manajemen-mitra/edit/${item.id}`,
                                    },
                                    undefined,
                                    { shallow: true }
                                  )
                                }
                              >
                                <IconPencil />
                              </button>

                              <button
                                className="btn btn-link-action bg-blue-secondary"
                                onClick={() => handleDelete(item.id)}
                              >
                                <IconDelete />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )
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
              />
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Table;
