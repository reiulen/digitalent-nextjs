// #Next & React
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// #Page, Component & Library
import PageWrapper from "../../../../wrapper/page.wrapper";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import LoadingTable from "../../../../LoadingTable";
import Pagination from "react-js-pagination";

// #Icon
import IconArrow from "../../../../assets/icon/Arrow";
import IconClose from "../../../../assets/icon/Close";
import IconFilter from "../../../../assets/icon/Filter";
import { useSelector } from "react-redux";

export default function NamaPelatihanID({ token }) {
  const router = useRouter();
  const { query } = router;
  // console.log(query);
  // #DatePicker
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const resetValueSort = () => {
    setStartDate(null);
    setEndDate(null);
  };
  // #DatePicker

  // #Pagination
  const [limit, setLimit] = useState(null);
  const [search, setSearch] = useState("");
  // #Pagination

  // #REDUX STATE
  const { loading, error, certificate } = useSelector(
    state => state.detailCertificates
  );

  // console.log(certificate, "ini sertifikat nya");
  // #REDUX STATE
  let { page = 1, keyword, success } = router.query;

  const handleLimit = val => {
    setLimit(val);
    router.push(`${router.pathname}?page=1&limit=${limit}`);
  };

  const handleSearch = () => {
    let link = `${router.pathname}?page=1&keyword=${search}`;
    if (limit) link = link.concat(`&limit=${limit}`);
    router.push(link);
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
              {certificate.theme}
            </h3>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-6 col-xl-6 col-sm-9">
                  <div
                    className="position-relative overflow-hidden mt-3"
                    style={{ maxWidth: "330px" }}
                  >
                    <i className="ri-search-line left-center-absolute ml-2"></i>
                    <input
                      type="text"
                      className="form-control pl-10"
                      placeholder="Ketik disini untuk Pencarian..."
                      onChange={e => setSearch(e.target.value)}
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
                <div className="col-lg-6 col-xl-6 col-sm-9">
                  <div className="d-flex flex-wrap align-items-center justify-content-end mt-2">
                    {/* sortir by modal */}
                    <button
                      className="avatar item-rtl btn border d-flex align-items-center justify-content-between mt-2"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                      style={{
                        color: "#464646",
                        minWidth: "230px",
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <IconFilter className="mr-3" />
                        Pilih Filter
                      </div>
                      <IconArrow fill="#E4E6EF" width="11" height="11" />
                    </button>

                    <form className="form text-left">
                      <div
                        className="modal fade"
                        id="exampleModalCenter"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalCenterTitle"
                        aria-hidden="true"
                      >
                        <div
                          className="modal-dialog modal-dialog-centered"
                          role="document"
                        >
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title font-weight-bold"
                                id="exampleModalLongTitle"
                              >
                                Filter
                              </h5>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={() => resetValueSort()}
                              >
                                <IconClose />
                              </button>
                            </div>

                            <div
                              className="modal-body text-left"
                              style={{
                                height: "200px",
                              }}
                            >
                              <div className="mb-10 col-12">
                                <label className="required fw-bold fs-6 mb-2">
                                  Tanggal
                                </label>

                                <div>
                                  <DatePicker
                                    className="form-search-date form-control-sm form-control"
                                    selected={startDate}
                                    onChange={date => setStartDate(date)}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Silahkan Isi Tanggal Dari"
                                    wrapperClassName="col-12 col-lg-12 col-xl-12"
                                    minDate={moment().toDate()}
                                  />
                                </div>
                              </div>

                              <div className="mb-10 col-12">
                                <label className="required fw-bold fs-6 mb-2">
                                  Tanggal
                                </label>

                                <div>
                                  <DatePicker
                                    className="form-search-date form-control-sm form-control"
                                    selected={endDate}
                                    onChange={date => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    dateFormat="dd/MM/yyyy"
                                    minDate={moment().toDate()}
                                    maxDate={addDays(startDate, 20)}
                                    placeholderText="Silahkan Isi Tanggal Sampai"
                                    wrapperClassName="col-12 col-lg-12 col-xl-12"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <div className="d-flex justify-content-end align-items-center">
                                <button
                                  className="btn btn-white-ghost-rounded-full"
                                  type="button"
                                  onClick={() => resetValueSort()}
                                >
                                  Reset
                                </button>
                                <button
                                  className="btn btn-primary-rounded-full ml-4"
                                  type="button"
                                  data-dismiss="modal"
                                  onClick={() => handleSearchDate()}
                                >
                                  Terapkan
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                    {/* END modal */}
                  </div>
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
                        <th>Akademi</th>
                        <th>Nama Pelatihan</th>
                        <th>Nama Sertifikat</th>
                        <th>Jenis Sertifikat</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!certificate ||
                      (certificate &&
                        certificate.data.list_certificate.length === 0) ? (
                        <tr>
                          <td className="text-center" colSpan={6}>
                            Data Masih Kosong
                          </td>
                        </tr>
                      ) : (
                        certificate &&
                        certificate.data.list_certificate.map(
                          (certificate, i) => {
                            return (
                              <tr key={certificate.id}>
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
                                  {certificate.academy.name}
                                </td>
                                <td className="align-middle">
                                  {certificate.theme.name}
                                </td>
                                <td className="align-middle">
                                  {certificate.nama_sertifikat}
                                </td>
                                <td className="align-middle">
                                  {certificate.certificate_type}
                                </td>

                                <td className="align-middle text-capitalize">
                                  {certificate.status.name == "publish" ? (
                                    <span className="label label-inline label-light-success font-weight-bold">
                                      publish
                                    </span>
                                  ) : certificate.status.name == "draft" ? (
                                    <span className="label label-inline label-light-warning font-weight-bold">
                                      draft
                                    </span>
                                  ) : (
                                    <span className="label label-inline label-light-danger font-weight-bold">
                                      belum tersedia
                                    </span>
                                  )}
                                </td>
                                {/* START AKSI sertifikat */}
                                <td className="align-middle d-flex">
                                  {certificate.status.name == "draft" ? (
                                    <>
                                      <Link
                                        href={`/sertifikat/kelola-sertifikat/${query.tema_pelatihan_id}/${certificate.id}`}
                                        passHref
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
                                      <Link
                                        href={`/sertifikat/kelola-sertifikat/${query.tema_pelatihan_id}/${certificate.id}/edit`}
                                        passHref
                                      >
                                        <a
                                          className="btn btn-link-action bg-blue-secondary text-white mr-2"
                                          data-toggle="tooltip"
                                          data-placement="bottom"
                                          title="Edit"
                                        >
                                          <i className="ri-pencil-fill p-0 text-white"></i>
                                        </a>
                                      </Link>
                                    </>
                                  ) : certificate.status.name == "publish" ? (
                                    <>
                                      <Link
                                        passHref
                                        href={`/sertifikat/kelola-sertifikat/${query.tema_pelatihan_id}/${certificate.id}/published`}
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
                                      <Link
                                        passHref
                                        href={`/sertifikat/kelola-sertifikat/${query.tema_pelatihan_id}/${certificate.id}/list-peserta`}
                                      >
                                        <a
                                          className="btn btn-link-action bg-blue-secondary text-white mr-2"
                                          data-toggle="tooltip"
                                          data-placement="bottom"
                                          title="Detail"
                                        >
                                          <i className="ri-file-user-fill p-0 text-white"></i>
                                        </a>
                                      </Link>
                                    </>
                                  ) : (
                                    <Link
                                      href={`/sertifikat/kelola-sertifikat/${query.tema_pelatihan_id}/${certificate.id}/add`}
                                      passHref
                                    >
                                      <a
                                        className="btn btn-link-action bg-blue-secondary text-white mr-2"
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="Tambah"
                                      >
                                        <i className="ri-add-circle-fill p-0 text-white"></i>
                                      </a>
                                    </Link>
                                  )}
                                </td>
                                {/* END TABLE DATA */}
                              </tr>
                            );
                          }
                        )
                      )}
                    </tbody>
                  </table>
                ) : (
                  ""
                )}
              </div>
              {/* START Pagination */}
              <div className="row">
                {certificate &&
                  certificate.data.perPage < certificate.data.total && (
                    <div className="table-pagination">
                      <Pagination
                        activePage={page}
                        itemsCountPerPage={certificate.perPage}
                        totalItemsCount={certificate.total}
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
                {certificate ? (
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
                          onChange={e => handleLimit(e.target.value)}
                          onBlur={e => handleLimit(e.target.value)}
                        >
                          <option
                            value="5"
                            selected={limit == "5" ? true : false}
                          >
                            5
                          </option>
                          <option
                            value="10"
                            selected={limit == "10" ? true : false}
                          >
                            10
                          </option>
                          <option
                            value="15"
                            selected={limit == "15" ? true : false}
                          >
                            15
                          </option>
                          <option
                            value="20"
                            selected={limit == "20" ? true : false}
                          >
                            20
                          </option>
                        </select>
                      </div>
                      <div className="col-8 my-auto">
                        <p
                          className="align-middle my-auto"
                          style={{ color: "#B5B5C3" }}
                        >
                          Total Data {certificate.data.list_certificate.length}
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
        </div>
      </div>
    </PageWrapper>
  );
}
