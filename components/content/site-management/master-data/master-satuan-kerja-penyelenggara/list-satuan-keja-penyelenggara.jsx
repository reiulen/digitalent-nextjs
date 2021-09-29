import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";

import PageWrapper from "../../../../wrapper/page.wrapper";
import LoadingTable from "../../../../LoadingTable";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../../../../redux/actions/site-management/master-satuan-kerja-penyelenggara.actions";
const ListSatuanKerjaPenyelenggara = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, master_satuan_kerja_penyelenggara } = useSelector(
    (state) => state.allMasterSatuanKerjaPenyelenggaras
  );

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
    if (limit != null) {
      router.push(`${router.pathname}?page=1&keyword=${search}&limit=${limit}`);
    } else {
      router.push(`${router.pathname}?page=1&keyword=${search}`);
    }
  };

  const handleLimit = (val) => {
    setLimit(val);
    router.push(`${router.pathname}?page=1&limit=${val}`);
  };

  const onNewReset = () => {
    router.replace(
      "/site-management/master-data/master-satuan-kerja-penyelenggara",
      undefined,
      { shallow: true }
    );
  };

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  return (
    <PageWrapper>
      {error ? (
        <div
          className="alert alert-custom alert-light-danger fade show mb-5"
          role="alert"
        >
          <div className="alert-icon">
            <i className="flaticon-warning"></i>
          </div>
          <div className="alert-text">{error}</div>
          <div className="alert-close">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={handleResetError}
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
              List Master Satuan Kerjasama
            </h1>
            <div className="card-toolbar">
              <Link href="/site-management/master-data/master-satuan-kerja-penyelenggara/tambah">
                <a className="btn btn-primary-rounded-full px-6 font-weight-bolder px-5 py-3 mt-2">
                  <i className="ri-add-fill"></i>
                  Tambah Satuan Kerja
                </a>
              </Link>
            </div>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-5 col-xl-5">
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

                <div className="col-lg-2 col-xl-2 justify-content-end d-flex"></div>
                <div className="col-lg-2 col-xl-2 justify-content-end d-flex"></div>
                <div className="col-lg-2 col-xl-2 justify-content-end d-flex"></div>
              </div>
            </div>

            <div className="table-page mt-5">
              <div className="table-responsive">
                <LoadingTable loading={loading} />

                {loading === false ? (
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-center">No</th>
                        <th>Nama Satuan Kerja</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!master_satuan_kerja_penyelenggara ||
                      (master_satuan_kerja_penyelenggara &&
                        master_satuan_kerja_penyelenggara.length === 0) ? (
                        <td className="align-middle text-center" colSpan={8}>
                          Data Masih Kosong
                        </td>
                      ) : (
                        master_satuan_kerja_penyelenggara &&
                        master_satuan_kerja_penyelenggara &&
                        master_satuan_kerja_penyelenggara.map((master, i) => {
                          return (
                            <tr key={master_satuan_kerja_penyelenggara.id}>
                              <td className="align-middle text-center">
                                <span className="">
                                  {i + 1 * (page * 5 || limit) - 4}
                                </span>
                              </td>
                              <td className="align-middle">
                                <b>{master.name}</b>
                              </td>
                              <td className="align-middle">
                                <span
                                  className={
                                    master.status == "Aktif"
                                      ? "label label-inline label-light-success font-weight-bold"
                                      : "label label-inline label-light-danger font-weight-bold"
                                  }
                                >
                                  {master.status}
                                </span>
                              </td>
                              <td className="align-middle d-flex">
                                <Link
                                  href={`/site-management/master-data/master-satuan-kerja-penyelenggara/${master.id}`}
                                >
                                  <a className="btn btn-link-action bg-blue-secondary text-white mr-2 my-5 position-relative">
                                    <i className="ri-pencil-fill p-0 text-white"></i>
                                    <div className="text-hover-show-hapus">
                                      Ubah
                                    </div>
                                  </a>
                                </Link>

                                <Link
                                  href={`/site-management/master-data/master-satuan-kerja-penyelenggara/datail/${master.id}`}
                                >
                                  <a
                                    className="btn btn-link-action bg-blue-secondary text-white mr-2 my-5 position-relative"
                                    target="_blank"
                                  >
                                    <i className="ri-eye-fill p-0 text-white"></i>
                                    <div className="text-hover-show-hapus">
                                      Detail
                                    </div>
                                  </a>
                                </Link>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                ) : (
                  ""
                )}
              </div>

              <div className="row">
                {master_satuan_kerja_penyelenggara &&
                  master_satuan_kerja_penyelenggara.perPage <
                    master_satuan_kerja_penyelenggara.total && (
                    <div className="table-pagination table-pagination pagination-custom col-12 col-md-6">
                      <Pagination
                        activePage={page}
                        itemsCountPerPage={
                          master_satuan_kerja_penyelenggara.perPage
                        }
                        totalItemsCount={
                          master_satuan_kerja_penyelenggara.total
                        }
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
                  )}
                {master_satuan_kerja_penyelenggara &&
                master_satuan_kerja_penyelenggara.total > 5 ? (
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
                      <div className="col-8 my-auto">
                        <p
                          className="align-middle mt-3"
                          style={{ color: "#B5B5C3" }}
                        >
                          Total Data {master_satuan_kerja_penyelenggara.total}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ListSatuanKerjaPenyelenggara;
