// #Next & React
import React, { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// #Page, Component & Library
import PageWrapper from "../../../../wrapper/page.wrapper";
import LoadingTable from "../../../../LoadingTable";
import Pagination from "react-js-pagination";
import Select from "react-select";
// #Icon
import IconArrow from "../../../../assets/icon/Arrow";
import IconClose from "../../../../assets/icon/Close";
import IconFilter from "../../../../assets/icon/Filter";
import { useSelector } from "react-redux";
import { clearErrors } from "../../../../../redux/actions/sertifikat/kelola-sertifikat.action";
import Cookies from "js-cookie";

export default function NamaPelatihanID({ token }) {
  const router = useRouter();
  const { query } = router;
  const {
    loading,
    error,
    certificate: certificates,
  } = useSelector((state) => state.detailCertificates);
  // #Pagination
  const [limit, setLimit] = useState(null);
  const [search, setSearch] = useState("");
  // #Pagination

  const [listPermission, setListPermission] = useState([]);
  const { permission } = useSelector((state) => state.adminPermission);
  useEffect(() => {
    const filterPermission = permission.permissions.filter((item) =>
      item.includes("sertifi")
    );
    setListPermission(filterPermission);
  }, []);

  console.log(certificates);

  const [status, setStatus] = useState(null);

  let { page = 1 } = router.query;

  const handleLimit = (val) => {
    setLimit(val);
    router.push(
      `/sertifikat/kelola-sertifikat/${router.query.tema_pelatihan_id}?id=${
        router.query.id ? router.query.id : Cookies.get("nama_pelatihan_id")
      }&page=1&limit=${val}`
    );
  };

  const handleSearch = () => {
    let link = `/sertifikat/kelola-sertifikat/${
      router.query.tema_pelatihan_id
    }?id=${
      router.query.id ? router.query.id : Cookies.get("nama_pelatihan_id")
    }&page=1&keyword=${search}`;
    if (limit) link = link.concat(`&limit=${limit}`);
    router.push(link);
  };
  const options = [
    { value: "draft", label: "Draft" },
    { value: "not-yet-available", label: "Belum Tersedia" },
    { value: "publish", label: "Publish" },
  ];

  const handleFilter = (e) => {
    if (!status) {
      Swal.fire("Oops !", "Harap memilih Status terlebih dahulu.", "error");
    } else {
      let link = `/sertifikat/kelola-sertifikat/${
        router.query.tema_pelatihan_id
      }?id=${
        router.query.id ? router.query.id : Cookies.get("nama_pelatihan_id")
      }&page=${page}`;
      if (limit) link = link.concat(`&limit=${limit}`);
      if (status) link = link.concat(`&status=${status}`);
      router.push(link);
    }
  };

  const handlePagination = (pageNumber) => {
    let link = `/sertifikat/kelola-sertifikat/${router.query.tema_pelatihan_id}?page=${pageNumber}`;
    if (search) link = link.concat(`&keyword=${search}`);
    if (limit) link = link.concat(`&limit=${limit}`);
    router.push(link);
  };

  let refSelect = null;
  const resetValueSort = () => {
    refSelect.select.clearValue();
    setStatus(null);

    router.push(
      `/sertifikat/kelola-sertifikat/${router.query.tema_pelatihan_id}?id=${
        router.query.id ? router.query.id : Cookies.get("nama_pelatihan_id")
      }`
    );
  };

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  const onNewReset = () => {
    router.replace(
      `/sertifikat/kelola-sertifikat/${query.tema_pelatihan_id}?id=${query.id}`,
      null,
      { shallow: true }
    );
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

      {router.query.update ? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
          style={{ backgroundColor: "#C9F7F5" }}
        >
          <div className="alert-icon">
            <i className="flaticon2-checkmark" style={{ color: "#1BC5BD" }}></i>
          </div>
          <div className="alert-text" style={{ color: "#1BC5BD" }}>
            {router.query.message}
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
      {router.query.created ? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
          style={{ backgroundColor: "#C9F7F5" }}
        >
          <div className="alert-icon">
            <i className="flaticon2-checkmark" style={{ color: "#1BC5BD" }}></i>
          </div>
          <div className="alert-text" style={{ color: "#1BC5BD" }}>
            {router.query.message}
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
      {/* error END */}
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              {certificates?.data?.tema?.name}
            </h3>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                {/* <div className="col-lg-6 col-xl-6 col-sm-6">
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
                </div> */}
                <div className="col-lg-12 col-xl-12 col-sm-12">
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
                                className="modal-title"
                                id="exampleModalLongTitle"
                              >
                                Filter
                              </h5>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <IconClose />
                              </button>
                            </div>

                            <div className="modal-body text-left">
                              <div className="fv-row mb-10">
                                <label className="required fw-bold fs-6 mb-2">
                                  Status
                                </label>
                                <Select
                                  ref={(ref) => (refSelect = ref)}
                                  className="basic-single"
                                  classNamePrefix="select"
                                  placeholder="Semua"
                                  isDisabled={false}
                                  isLoading={false}
                                  isClearable={false}
                                  isRtl={false}
                                  isSearchable={true}
                                  name="color"
                                  onChange={(e) => {
                                    setStatus(e?.value);
                                  }}
                                  options={options}
                                />
                              </div>
                            </div>
                            <div className="modal-footer">
                              <div className="d-flex justify-content-end align-items-center">
                                <button
                                  className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5"
                                  type="button"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                  onClick={() => resetValueSort()}
                                >
                                  Reset
                                </button>
                                <button
                                  className="btn btn-sm btn-rounded-full bg-blue-primary text-white "
                                  type="button"
                                  onClick={handleFilter}
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
                      {!certificates ||
                      (certificates &&
                        certificates.data.pelatihan.list.length === 0) ? (
                        <tr>
                          <td className="text-center" colSpan={6}>
                            Data Tidak Ditemukan
                          </td>
                        </tr>
                      ) : (
                        certificates &&
                        certificates.data.pelatihan.list.map(
                          (certificate, i) => {
                            return (
                              <tr key={certificate.id}>
                                <td className="align-middle text-center">
                                  {limit === null ? (
                                    <span className="badge">
                                      {i + 1 * (page * 5) - (5 - 1)}
                                    </span>
                                  ) : (
                                    <span className="badge">
                                      {i + 1 * (page * limit) - (limit - 1)}
                                    </span>
                                  )}
                                </td>
                                {/* START TABLE DATA */}
                                <td className="align-middle">
                                  {certificate.academy}
                                </td>
                                <td className="align-middle">
                                  {certificate.training}
                                </td>
                                <td className="align-middle">
                                  {certificate.name || "-"}
                                </td>
                                <td className="align-middle">
                                  {certificate.certificate_type || "-"}
                                </td>

                                <td className="align-middle text-capitalize">
                                  {certificate.status_migrate_id == "1" ? (
                                    <span className="label label-inline label-light-success font-weight-bold">
                                      tersedia
                                    </span>
                                  ) : certificate.status_migrate_id == "2" ? (
                                    <span className="label label-inline label-light-warning font-weight-bold">
                                      draft
                                    </span>
                                  ) : (
                                    <span className="label label-inline label-light-danger font-weight-bold">
                                      tidak tersedia
                                    </span>
                                  )}
                                </td>
                                {/* START AKSI sertifikat */}
                                <td className="align-middle d-flex">
                                  {certificate.status_migrate_id == "2" ? (
                                    <>
                                      {listPermission.includes(
                                        "sertifikat.view"
                                      ) && (
                                        <Link
                                          href={`/sertifikat/kelola-sertifikat/${query.tema_pelatihan_id}/${certificate.name}?id=${certificate.id}&theme_id=${certificate.theme_id}&status=view`}
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
                                      )}
                                      {listPermission.includes(
                                        "sertifikat.manage"
                                      ) && (
                                        <Link
                                          href={`/sertifikat/kelola-sertifikat/${query.tema_pelatihan_id}/${certificate.name}?id=${certificate.id}&theme_id=${certificate.theme_id}&status=edit`}
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
                                      )}
                                    </>
                                  ) : certificate.status_migrate_id == "1" ? (
                                    <>
                                      {listPermission.includes(
                                        "sertifikat.view"
                                      ) && (
                                        <Fragment>
                                          <Link
                                            passHref
                                            href={`/sertifikat/kelola-sertifikat/${query.tema_pelatihan_id}/${certificate.name}?status=${certificate.status_migrate_id}&id=${certificate.id}&theme_id=${certificate.theme_id}`}
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
                                            href={`/sertifikat/kelola-sertifikat/${query.tema_pelatihan_id}/sertifikat-peserta?id=${certificate.id}`}
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
                                        </Fragment>
                                      )}
                                    </>
                                  ) : (
                                    <Fragment>
                                      {listPermission.includes(
                                        "sertifikat.manage"
                                      ) && (
                                        <Link
                                          href={`/sertifikat/kelola-sertifikat/certificate-builder?id=${certificate.id}&theme_id=${certificates.data.tema.id}&theme_name=${certificates.data.tema.name}`}
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
                                    </Fragment>
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
                {certificates && certificates?.data?.pelatihan?.total < 5 && (
                  <div className="table-pagination col">
                    <Pagination
                      activePage={+page}
                      itemsCountPerPage={certificates.data.perPage}
                      totalItemsCount={certificates.data.total}
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
                {certificates && certificates.data.pelatihan.total < 5 ? (
                  <div className="table-total ml-au qto">
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
                      <div className="col my-auto">
                        <p
                          className="align-middle my-auto"
                          style={{ color: "#B5B5C3" }}
                        >
                          Total Data {certificates.data.total}
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
