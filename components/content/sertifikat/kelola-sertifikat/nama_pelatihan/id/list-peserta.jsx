// #Next & React
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// #Page, Component & Library
import PageWrapper from "../../../../../wrapper/page.wrapper";
import LoadingTable from "../../../../../LoadingTable";
import Pagination from "react-js-pagination";

import { useSelector } from "react-redux";
import { clearErrors } from "../../../../../../redux/actions/sertifikat/kelola-sertifikat.action";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

export default function ListPeserta() {
  const router = useRouter();
  const { query } = router;
  const dispatch = useDispatch();
  // #DatePicker
  const { loading, error, participant } = useSelector(
    (state) => state.allParticipant
  );

  // #Pagination
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(null);
  // #Pagination

  let { page = 1 } = router.query;

  const handleLimit = (val) => {
    setLimit(val);
    router.push(
      `/sertifikat/kelola-sertifikat/${
        query.tema_pelatihan_id
      }/sertifikat-peserta?id=${query.id || ""}&page=1&limit=${val}`
    );
  };

  const handleSearch = () => {
    let link = `/sertifikat/kelola-sertifikat/${
      query.tema_pelatihan_id
    }/sertifikat-peserta?id=${query.id || ""}&page=1&keyword=${search}`;
    if (limit) link = link.concat(`&limit=${limit}`);
    router.push(link);
  };

  const handlePagination = (pageNumber) => {
    let link = `/sertifikat/kelola-sertifikat/${
      query.tema_pelatihan_id
    }/sertifikat-peserta?id=${query.id || ""}&page=${pageNumber}`;
    if (search) link = link.concat(`&keyword=${search}`);
    if (limit) link = link.concat(`&limit=${limit}`);
    router.push(link);
  };

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  return (
    <PageWrapper>
      {/* error START */}
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
      {/* error END */}
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              Sertifikat Peserta {participant?.data?.list[0]?.pelatihan}
            </h3>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-6 col-xl-6 col-sm-9">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSearch();
                    }}
                  >
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
                        onClick={() => {
                          handleSearch();
                        }}
                      >
                        Cari
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* START TABLE */}
            <div className="table-page mt-5">
              <div className="table-responsive">
                <LoadingTable loading={loading} />

                {loading === false ? (
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-center">No</th>
                        <th>Nama Peserta</th>
                        <th>Akademi</th>
                        <th>Nama Pelatihan</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!participant.status ||
                      participant?.data?.list?.length == 0 ? (
                        <tr>
                          <td className="text-center" colSpan={6}>
                            Data Tidak Ditemukan
                          </td>
                        </tr>
                      ) : (
                        participant &&
                        participant?.data?.list?.map((participant, i) => {
                          return (
                            <tr key={i}>
                              <td className="align-middle text-center">
                                {limit === null ? (
                                  <span className="badge badge-secondary text-muted">
                                    {i + 1 * (page * 5) - (5 - 1)}
                                  </span>
                                ) : (
                                  <span className="badge badge-secondary text-muted">
                                    {i + 1 * (page * limit) - (limit - 1)}
                                  </span>
                                )}
                              </td>
                              {/* START TABLE DATA */}
                              <td className="align-middle">
                                {participant.user}
                              </td>
                              <td className="align-middle">
                                {participant.akademi}
                              </td>
                              <td className="align-middle">
                                {participant.pelatihan}
                              </td>

                              <td className="align-middle text-capitalize">
                                <span className="label label-inline label-light-success font-weight-bold">
                                  tersedia
                                </span>
                              </td>
                              {/* START AKSI sertifikat */}
                              <td className="align-middle text-capitalize ">
                                <>
                                  <Link
                                    href={`/sertifikat/kelola-sertifikat/${query.tema_pelatihan_id}/sertifikat-peserta/${participant.user}?id=${participant.user_id}&id_pelatihan=${query.id}`}
                                  >
                                    <a
                                      className="btn btn-link-action bg-blue-secondary text-white mr-2"
                                      data-toggle="tooltip"
                                      data-placement="bottom"
                                      title="Detail"
                                    >
                                      <i className="ri-eye-fill p-0 text-white"></i>
                                    </a>
                                  </Link>
                                </>
                              </td>
                              {/* END TABLE DATA */}
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
              {/* START Pagination */}
              <div className="row">
                {participant && (
                  <div className="table-pagination">
                    <Pagination
                      activePage={+page}
                      itemsCountPerPage={participant?.data?.perPage}
                      totalItemsCount={participant?.data?.total}
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
                {participant ? (
                  <div className="table-total ml-auto">
                    <div className="row mt-3">
                      <div className="col-4 mr-0 p-0 my-auto">
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
                          className="align-middle my-auto"
                          style={{ color: "#B5B5C3" }}
                        >
                          Total Data{" "}
                          {participant?.data?.list_certificate?.length || "-"}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {/* End Pagination */}
            </div>
            {/* END TABLE */}
          </div>
          {/* START MODAL */}
          <div
            className="modal fade"
            id="historyModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    Pratinjau Gambar
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div
                  className="modal-body text-center"
                  style={{ height: "400px" }}
                ></div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
