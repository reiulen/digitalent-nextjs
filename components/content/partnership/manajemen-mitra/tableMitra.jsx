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
  deleteMitra,
  clearErrors,
} from "../../../../redux/actions/partnership/mitra.actions";

import {
  DELETE_MITRA_RESET,
  CLEAR_ERRORS,
} from "../../../../redux/types/partnership/mitra.type";

const Table = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { totalMitraCardRes } = useSelector(
    (state) => state.totalMitraCardGlobal
  );

  const { activeMitraCardRes } = useSelector(
    (state) => state.activeMitraCardGlobal
  );

  const { nonActiveMitraCardRes } = useSelector(
    (state) => state.nonActiveMitraCardGlobal
  );

  const {
    loading: allLoading,
    error,
    allMitra,
  } = useSelector((state) => state.allMitra);

  const {
    loading: deleteLoading,
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.deleteMitra);

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
        dispatch(deleteMitra(id));
      }
    });
  };

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(null);
  const [totalMitra, setTotalMitra] = useState(totalMitraCardRes.total);
  const [activeMitra, setActiveMitra] = useState(activeMitraCardRes.total);
  const [nonActiveMitra, setNonActiveMitra] = useState(
    nonActiveMitraCardRes.total
  );

  let { page = 1, keyword, success } = router.query;
  // if (allLoading) {
  //   loading = allLoading;
  // } else if (deleteLoading) {
  //   loading = deleteLoading;
  // }

  page = Number(page);
  const handleLimit = (val) => {
    setLimit(val);
  };

  const handleFilterCard = (status) => {
    if (status) {
      router.push(
        `${router.pathname}?page=1&keyword=${search}&limit=${limit}&card=${status}`
      );
    } else {
      // router.push(`${router.pathname}?page=1&keyword=${search}`);
      router.push(`${router.pathname}?page=1&keyword=${search}&limit=${limit}`);
    }
  };
  useEffect(() => {
    if (limit) {
      router.push(`${router.pathname}?page=1&limit=${limit}`);
    }
    if (isDeleted) {
      Swal.fire("Berhasil ", "Data berhasil dihapus.", "success").then(
        (result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        }
      );
      dispatch({
        type: DELETE_MITRA_RESET,
      });
    }
  }, [limit, isDeleted]);

  const handlePagination = (pageNumber) => {
    if (limit != null) {
      router.push(`${router.pathname}?page=${pageNumber}&limit=${limit}`);
    } else {
      router.push(`${router.pathname}?page=${pageNumber}`);
    }
  };

  const handleSearch = () => {
    if (limit != null) {
      router.push(`${router.pathname}?page=1&keyword=${search}&limit=${limit}`);
    } else {
      router.push(`${router.pathname}?page=1&keyword=${search}`);
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
          <div className="alert-text">Berhasil Menambah Data</div>
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
      <div className="col-lg-10 col-md-10">
        <div className="row">
          <CardPage
            background="bg-light-success"
            icon="user-blue.svg"
            color="#74BBB7"
            value={totalMitra}
            titleValue="Mitra"
            title="Total Mitra"
            publishedVal="all"
            routePublish={() => handleFilterCard("all")}
            // routePublish={() => setAllStatus("all")}
          />
          <CardPage
            background="bg-light-warning"
            icon="user-orange.svg"
            color="#634100"
            value={activeMitra}
            titleValue="Mitra"
            title="Mitra Yang Aktif"
            publishedVal="active"
            routePublish={() => handleFilterCard("active")}
            // routePublish={() => setStatusActive("active")}
          />
          <CardPage
            background="bg-light-danger"
            icon="info-danger.svg"
            color="#F65464"
            value={nonActiveMitra}
            titleValue="Mitra"
            title="Mitra Yang Tidak Aktif"
            publishedVal="non-active"
            routePublish={() => handleFilterCard("non-active")}
            // routePublish={() => setStatusNonActive("non-active")}
          />
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
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <span>
                      <i className="flaticon2-search-1 text-muted"></i>
                    </span>
                  </div>
                </div>
                <div className="col-lg-2 col-xl-2">
                  <button
                    type="button"
                    className="btn btn-light-primary btn-block"
                    onClick={handleSearch}
                  >
                    Cari
                  </button>
                </div>
              </div>
            </div>
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
                    {/* {allMitra && console.log(allMitra)} */}
                    {allMitra &&
                      allMitra.list_mitras.map((dataMitra, i) => {
                        return (
                          <>
                            <tr>
                              <td className="text-center align-middle">
                                <button
                                  className="btn"
                                  style={{
                                    background: "#F3F6F9",
                                    borderRadius: "6px",
                                  }}
                                >
                                  {i + 1 * (page * 5 || limit) - 4}
                                </button>
                              </td>
                              <td className="align-middle text-center">
                                <Image
                                  src={`/assets/icon/${dataMitra.agency_logo}`}
                                  width={40}
                                  height={40}
                                  alt="logo"
                                />
                              </td>
                              <td className="align-middle text-center">
                                {dataMitra.user.name}
                              </td>
                              <td className="align-middle text-center">
                                {dataMitra.website}
                              </td>
                              <td className="align-middle text-center">
                                {dataMitra.cooperations_count} Kerjasama
                              </td>
                              <td className="align-middle text-center">
                                <ButtonAction
                                  icon="detail.svg"
                                  link="/partnership/manajemen-mitra/detail-data-kerjasama"
                                />
                                <ButtonAction
                                  icon="write.svg"
                                  link={`/partnership/manajemen-mitra/${dataMitra.id}`}
                                />
                                <button
                                  onClick={() => handleDelete(dataMitra.id)}
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
                          </>
                        );
                      })}
                  </tbody>
                </table>
              </div>

              <div className="row">
                {allMitra && allMitra.perPage < allMitra.total && (
                  <div className="table-pagination">
                    <Pagination
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
                    />
                  </div>
                )}
                {allMitra && allMitra.total > 5 ? (
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
                          Total Data {allMitra.total}
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

export default Table;
