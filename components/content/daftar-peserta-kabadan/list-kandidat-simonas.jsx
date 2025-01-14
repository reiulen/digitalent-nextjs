import React, { useState } from "react";
import PageWrapper from "../../wrapper/page.wrapper";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import Pagination from "react-js-pagination";
import {
  getAllSimonasKandidat,
  getSimonasFilterStatus,
  clearErrors,
} from "../../../redux/actions/dashboard-kabadan/data-peserta/simonas.actions";
import { useDispatch, useSelector } from "react-redux";
import LoadingTable from "../../LoadingTable";

const ListKandidatSimonas = ({ token }) => {
  const dispatch = useDispatch();

  const { loading, error, kandidat } = useSelector(
    (state) => state.allSimonasKandidat
  );
  const {
    loading: loadingCompany,
    error: errorCompany,
    company,
  } = useSelector((state) => state.allSimonasFilterCompany);
  const {
    loading: loadingStatus,
    error: errorStatus,
    status,
  } = useSelector((state) => state.allSimonasFilterStatus);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(null);

  const [companyFilter, setCompanyFilter] = useState(null);
  const [statusJobFilter, setStatusJobFilter] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);

  const [showModal, setShowModal] = useState(false);

  let count = kandidat?.data?.total;
  if (search) {
    count = kandidat?.data?.totalFiltered;
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1);
    const data = {
      companyFilter: companyFilter !== null ? companyFilter.value : null,
      statusJobFilter: statusJobFilter !== null ? statusJobFilter.value : null,
      categoryFilter: categoryFilter !== null ? categoryFilter.value : null,
      statusFilter: statusFilter !== null ? statusFilter.value : null,
    };
    dispatch(
      getAllSimonasKandidat(
        token,
        1,
        search,
        limit,
        data.companyFilter,
        data.statusJobFilter,
        data.categoryFilter,
        data.statusFilter
      )
    );
  };

  const handleFilter = () => {
    setShowModal(false);
    setPage(1);
    const data = {
      companyFilter: companyFilter !== null ? companyFilter.value : null,
      statusJobFilter: statusJobFilter !== null ? statusJobFilter.value : null,
      categoryFilter: categoryFilter !== null ? categoryFilter.value : null,
      statusFilter: statusFilter !== null ? statusFilter.value : null,
    };
    dispatch(
      getAllSimonasKandidat(
        token,
        1,
        search,
        limit,
        data.companyFilter,
        data.statusJobFilter,
        data.categoryFilter,
        data.statusFilter
      )
    );
  };

  const handleReset = () => {
    setShowModal(false);
    setLimit(null);
    setPage(1);
    setSearch("");
    setLimit(null);
    setCompanyFilter(null);
    setStatusJobFilter(null);
    setCategoryFilter(null);
    setStatusFilter(null);
    dispatch(
      getAllSimonasKandidat(token, 1, null, null, null, null, null, null)
    );
  };

  const handlePagination = (pageNumber) => {
    setPage(pageNumber);
    const data = {
      companyFilter: companyFilter !== null ? companyFilter.value : null,
      statusJobFilter: statusJobFilter !== null ? statusJobFilter.value : null,
      categoryFilter: categoryFilter !== null ? categoryFilter.value : null,
      statusFilter: statusFilter !== null ? statusFilter.value : null,
    };
    dispatch(
      getAllSimonasKandidat(
        token,
        pageNumber,
        search,
        limit,
        data.companyFilter,
        data.statusJobFilter,
        data.categoryFilter,
        data.statusFilter
      )
    );
  };

  const handleLimit = (val) => {
    setLimit(val);
    setPage(1);
    const data = {
      companyFilter: companyFilter !== null ? companyFilter.value : null,
      statusJobFilter: statusJobFilter !== null ? statusJobFilter.value : null,
      categoryFilter: categoryFilter !== null ? categoryFilter.value : null,
      statusFilter: statusFilter !== null ? statusFilter.value : null,
    };
    dispatch(
      getAllSimonasKandidat(
        token,
        1,
        search,
        val,
        data.companyFilter,
        data.statusJobFilter,
        data.categoryFilter,
        data.statusFilter
      )
    );
  };

  const optionsCompany = [];
  if (company) {
    company.map((row, i) => {
      let val = {
        value: row.id_perusahaan,
        label: row.nama_perusahaan,
      };
      optionsCompany.push(val);
    });
  }

  const optionsCategoryCompany = [
    { value: "vacancy", label: "Vacancy" },
    { value: "project", label: "Project" },
  ];

  const optionsStatusWork = [
    { value: "closed", label: "Closed" },
    { value: "opened", label: "Opened" },
  ];

  const optionsStatus = [];
  if (status) {
    status.map((row, i) => {
      let val = {
        value: row.id,
        label: row.name,
      };
      optionsStatus.push(val);
    });
  }

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-strech gutter-b">
          <div className="card-header border-0 mt-3">
            <h1
              className="card-title text-dark mt-2"
              style={{ fontSize: "24px" }}
            >
              Daftar Kandidat Simonas
            </h1>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-6 col-xl-6 col-md-6">
                  <div className="position-relative overflow-hidden mt-3 mb-2">
                    <form onSubmit={e => handleSearch(e)}>

                    <i className="ri-search-line left-center-absolute ml-2"></i>
                    <input
                      type="text"
                      className="form-control pl-10"
                      value={search}
                      placeholder="Ketik disini untuk Pencarian..."
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    </form>
                    <button
                      className="btn bg-blue-primary text-white right-center-absolute"
                      style={{
                        borderTopLeftRadius: "0",
                        borderBottomLeftRadius: "0",
                      }}
                      onClick={e => handleSearch(e)}
                    >
                      Cari
                    </button>
                  </div>
                </div>
                <div className="col-lg-6 col-xl-6 col-md-6 justify-content-end d-flex mt-3">
                  <button
                    className="btn border d-flex align-items-center justify-content-between mb-2 w-lg-50 w-md-100 w-100"
                    style={{
                      color: "#bdbdbd",
                      float: "right",
                    }}
                    onClick={() => setShowModal(true)}
                  >
                    <div className="d-flex align-items-center">
                      <i className="ri-filter-fill mr-3"></i>
                      Filter
                    </div>
                    <i className="ri-arrow-down-s-line"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="table-page mt-5">
              <div className="table-responsive">
                <LoadingTable loading={loading} />
                {loading !== true && (
                  <table
                    className="table table-separate table-head-custom table-checkable"
                    style={{
                      WebkitColumnWidth: "100%",
                      MozColumnWidth: "100%",
                    }}
                  >
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-center ">No</th>
                        <th>Nama Lengkap</th>
                        <th>Nama Pekerjaan</th>
                        <th>Kategori Pekerjaan</th>
                        <th>Status Pekerjaan</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!kandidat ||
                      (kandidat &&
                        kandidat.data &&
                        kandidat.data.list.length === 0) ? (
                        <td className="align-middle text-center" colSpan={6}>
                          Data Kosong
                        </td>
                      ) : (
                        kandidat.data.list.map((row, i) => (
                          <tr key={i}>
                            <td className="text-center align-middle">
                              {limit === null
                                ? i + 1 * (page * 5) - (5 - 1)
                                : i + 1 * (page * limit) - (limit - 1)}
                            </td>
                            <td className="align-middle">
                              <p className="mb-0">{row.nama}</p>
                            </td>
                            <td className="align-middle">
                              <p className="font-weight-bolder my-0">
                                {row.nama_pekerjaan}
                              </p>
                              <p className="my-0">{row.nama_perusahaan}</p>
                            </td>
                            <td className="align-middle">
                              <p className="fz-15 mb-0">
                                {row.kategori_pekerjaan}
                              </p>
                            </td>

                            <td className="align-middle">
                              <p className="fz-15 mb-0">
                                {row.status_pekerjaann}
                              </p>
                            </td>
                            <td className="align-middle">
                              {row.status_melamar === "Submitted" && (
                                <span
                                  className={`label label-inline label-light-primary font-weight-bold py-5`}
                                >
                                  {row.status_melamar}
                                </span>
                              )}
                              {row.status_melamar === "Selection" && (
                                <span
                                  className={`label label-inline label-light-warning font-weight-bold py-5`}
                                >
                                  {row.status_melamar}
                                </span>
                              )}
                              {row.status_melamar === "Rejected" && (
                                <span
                                  className={`label label-inline label-light-danger font-weight-bold py-5`}
                                >
                                  {row.status_melamar}
                                </span>
                              )}
                              {row.status_melamar === "Hired" && (
                                <span
                                  className={`label label-inline label-light-success font-weight-bold py-5`}
                                >
                                  {row.status_melamar}
                                </span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            <div className="row">
              {kandidat &&
                kandidat.data &&
                kandidat.data.list.length > 0 &&
                kandidat.data.perPage < kandidat.data.total && (
                  <div className="table-pagination table-pagination pagination-custom col-12 col-md-6">
                    <Pagination
                      activePage={page}
                      itemsCountPerPage={kandidat.data.perPage}
                      totalItemsCount={kandidat.data.total}
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
              {kandidat && kandidat.data && kandidat.data.total > 5 && (
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
                        value={limit}
                      >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                      </select>
                    </div>
                    <div className="col-8 my-auto pt-3">
                      <p
                        className="align-middle mt-3"
                        style={{ color: "#B5B5C3" }}
                      >
                        Total Data {kandidat.data.total}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Filter</Modal.Title>
          <button
            type="button"
            className="close"
            onClick={() => setShowModal(false)}
          >
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mb-5">
            <label className="p-0">Perusahaan</label>
            <Select
              options={optionsCompany}
              placeholder="Pilih Perusahaan"
              defaultValue={companyFilter}
              onChange={(e) =>
                setCompanyFilter({ label: e.label, value: e.value })
              }
            />
          </div>
          <div className="form-group mb-5">
            <label className="p-0">Kategori Pekerjaan</label>
            <Select
              options={optionsCategoryCompany}
              placeholder="Pilih Kategori Pekerjaan"
              defaultValue={categoryFilter}
              onChange={(e) => {
                setCategoryFilter({ label: e.label, value: e.value });
                dispatch(getSimonasFilterStatus(token, e.value));
              }}
            />
          </div>
          <div className="form-group mb-5">
            <label className="p-0">Status Pekerjaan</label>
            <Select
              options={optionsStatusWork}
              placeholder="Pilih Status Pekerjaan"
              defaultValue={statusJobFilter}
              onChange={(e) => {
                setStatusJobFilter({ label: e.label, value: e.value });
              }}
            />
          </div>
          <div className="form-group mb-5">
            <label className="p-0">Status</label>
            <Select
              options={optionsStatus}
              placeholder="Pilih Tahap Status"
              defaultValue={statusFilter}
              onChange={(e) =>
                setStatusFilter({ label: e.label, value: e.value })
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-light-ghost-rounded-full mr-2"
            type="button"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            className="btn btn-primary-rounded-full"
            type="button"
            onClick={handleFilter}
          >
            Terapkan
          </button>
        </Modal.Footer>
      </Modal>
    </PageWrapper>
  );
};

export default ListKandidatSimonas;
