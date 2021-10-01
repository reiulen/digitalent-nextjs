import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";
import Swal from "sweetalert2";

import PageWrapper from "../../../wrapper/page.wrapper";
import LoadingTable from "../../../LoadingTable";

import { useDispatch, useSelector } from "react-redux";

const ListAcademy = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  let { page = 1, success } = router.query;
  page = Number(page);

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(null);

  const handlePagination = (pageNumber) => {
    let link = `${router.pathname}?page=${pageNumber}`;
    if (limit) link = link.concat(`&limit=${limit}`);
    if (search) link = link.concat(`&keyword=${search}`);
    router.push(link);
  };

  const handleSearch = () => {
    let link = `${router.pathname}?page=1&keyword=${search}`;
    if (limit) link = link.concat(`&limit=${limit}`);
    router.push(link);
  };

  const handleLimit = (val) => {
    setLimit(val);
    router.push(`${router.pathname}?page=1&limit=${val}`);
  };

  const onNewReset = () => {
    router.replace("/pelatihan/akademi", undefined, { shallow: true });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah anda yakin ?",
      text: "Data ini tidak bisa dikembalikan !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya !",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
      }
    });
  };

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  return (
    <PageWrapper>
      {success ? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
        >
          <div className="alert-icon">
            <i className="flaticon2-checkmark"></i>
          </div>
          <div className="alert-text">Berhasil Menyimpan Data</div>
          <div className="alert-close">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={onNewReset}
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

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0 mt-3">
            <h1
              className="card-title text-dark mt-2"
              style={{ fontSize: "24px" }}
            >
              List Akademi
            </h1>
            <div className="card-toolbar">
              <Link href="/pelatihan/akademi/tambah">
                <a className="btn btn-primary-rounded-full px-6 font-weight-bolder px-5 py-3 mt-2">
                  <i className="ri-add-fill"></i>
                  Tambah Akademi
                </a>
              </Link>
            </div>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-12 col-xl-12">
                  <div
                    className="position-relative overflow-hidden mt-3"
                    style={{ maxWidth: "330px" }}
                  >
                    <i className="ri-search-line left-center-absolute ml-2"></i>
                    <input
                      type="text"
                      className="form-control pl-10"
                      placeholder="Ketik disini untuk Pencarian..."
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                      className="btn bg-blue-primary text-white right-center-absolute"
                      style={{
                        borderTopLeftRadius: "0",
                        borderBottomLeftRadius: "0",
                      }}
                      onClick={handleSearch}
                    >
                      Cari
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="table-page mt-5">
              <div className="table-responsive">
                {/* <LoadingTable loading={loading} /> */}

                <table className="table table-separate table-head-custom table-checkable">
                  <thead
                    style={{ background: "#F3F6F9" }}
                    className="font-weight-bolder"
                  >
                    <tr>
                      <th className="text-center">No</th>
                      <th>Logo</th>
                      <th>Akademi</th>
                      <th>Tema</th>
                      <th>Pelatihan</th>
                      <th>Penyelenggara</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">1</td>
                      <td></td>
                      <td>
                        <p className="font-weight-bolder my-0 h6">SVGA</p>
                        <p className="my-0">Vocation School Graduate Academy</p>
                      </td>
                      <td>50</td>
                      <td>150</td>
                      <td>50 Mitra</td>
                      <td>
                        <span className="label label-inline label-light-success font-weight-bold">
                          Publish
                        </span>
                      </td>
                      <td>
                        <div className="d-flex">
                          <Link href={`/pelatihan/akademi/${1}`}>
                            <a
                              className="btn btn-link-action bg-blue-secondary text-white mr-2"
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="Edit"
                            >
                              <i className="ri-pencil-fill p-0 text-white"></i>
                            </a>
                          </Link>
                          <button
                            className="btn btn-link-action bg-blue-secondary text-white"
                            onClick={() => handleDelete(1)}
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Hapus"
                          >
                            <i className="ri-delete-bin-fill p-0 text-white"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="row">
                <div className="table-pagination table-pagination pagination-custom col-12 col-md-6">
                  <Pagination
                    activePage={1}
                    itemsCountPerPage={5}
                    totalItemsCount={10}
                    pageRangeDisplayed={3}
                    onChange={handlePagination}
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
                    <div className="col-4 mr-0 p-0 mt-3">
                      <select
                        className="form-control"
                        id="exampleFormControlSelect2"
                        style={{
                          width: "65px",
                          background: "#F3F6F9",
                          borderColor: "#F3F6F9",
                          color: "#9E9E9E",
                        }}
                        onChange={(e) => handleLimit(e.target.value)}
                        onBlur={(e) => handleLimit(e.target.value)}
                      >
                        <option>5</option>
                        <option>10</option>
                        <option>30</option>
                        <option>40</option>
                        <option>50</option>
                      </select>
                    </div>
                    <div className="col-8 my-auto pt-3">
                      <p
                        className="align-middle mt-3"
                        style={{ color: "#B5B5C3" }}
                      >
                        Total Data 6
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

export default ListAcademy;
