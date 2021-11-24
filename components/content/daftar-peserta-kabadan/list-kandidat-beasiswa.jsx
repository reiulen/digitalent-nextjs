import React, { useState } from "react";
import PageWrapper from "../../wrapper/page.wrapper";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import Pagination from "react-js-pagination";

const ListKandidatBeasiswa = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const handleSearch = () => {
    setPage(1);
  };

  const handleFilter = () => {
    setShowModal(false);
    setPage(1);
  };

  const handleReset = () => {
    setShowModal(false);
  };

  const handlePagination = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleLimit = (val) => {
    setLimit(val);
    setPage(1);
  };

  const options = [{ label: "Buahh", value: "Buah" }];
  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-strech gutter-b">
          <div className="card-header border-0 mt-3">
            <h1
              className="card-title text-dark mt-2"
              style={{ fontSize: "24px" }}
            >
              Daftar Kandidat Beasiswa
            </h1>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-6 col-xl-6 col-md-6">
                  <div className="position-relative overflow-hidden mt-3 mb-2">
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
                      <th>Kategori Beasiswa</th>
                      <th>Beasiswa Tujuan</th>
                      <th>Tahap Seleksi</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((row, i) => (
                      <tr key={i}>
                        <td className="text-center align-middle">
                          {limit === null
                            ? i + 1 * (page * 5) - (5 - 1)
                            : i + 1 * (page * limit) - (limit - 1)}
                        </td>
                        <td className="align-middle">
                          <p className="mb-0">Dendy</p>
                        </td>
                        <td className="align-middle">
                          <p className="fz-15 mb-0">
                            Beasiswa Regular Bagi ASN
                          </p>
                        </td>
                        <td className="align-middle">
                          <p className="font-weight-bolder my-0">
                            Unversitas Indonesia
                          </p>
                          <p className="my-0">Manajemen Teknologi Informasi</p>
                        </td>
                        <td className="align-middle">
                          <p className="fz-15 mb-0">Tahap 1</p>
                        </td>
                        <td className="align-middle">
                          <span className="label label-inline label-light-success font-weight-bold py-5">
                            Menunggu Verifikasi
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="row">
              <div className="table-pagination table-pagination pagination-custom col-12 col-md-6">
                <Pagination
                  activePage={page}
                  itemsCountPerPage={3}
                  totalItemsCount={5}
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
                      Total Data 5
                    </p>
                  </div>
                </div>
              </div>
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
            <label className="p-0">Tipe Beasiswa</label>
            <Select options={options} placeholder="Pilih Tipe Beasiswa" />
          </div>
          <div className="form-group mb-5">
            <label className="p-0">Kategori Beasiswa</label>
            <Select options={options} placeholder="Pilih Kategori Beasiswa" />
          </div>
          <div className="form-group mb-5">
            <label className="p-0">Beasiswa Tujuan</label>
            <Select options={options} placeholder="Pilih Beasiswa Tujuan" />
          </div>
          <div className="form-group mb-5">
            <label className="p-0">Tahap Seleksi</label>
            <Select options={options} placeholder="Pilih Tahap Seleksi" />
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

export default ListKandidatBeasiswa;
