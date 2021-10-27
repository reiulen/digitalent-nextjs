import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import Swal from "sweetalert2";
import moment from "moment";
import styles from "../../../../styles/previewGaleri.module.css";
import stylesPag from "../../../../styles/pagination.module.css";

import PageWrapper from "../../../wrapper/page.wrapper";
import CardPage from "../../../CardPage";
import ButtonAction from "../../../ButtonAction";
import LoadingTable from "../../../LoadingTable";
import ButtonNewTab from "../../../ButtonNewTab";
import IconArrow from "../../../assets/icon/Arrow";
import IconClose from "../../../assets/icon/Close";
import IconFilter from "../../../assets/icon/Filter";

import { useDispatch, useSelector } from "react-redux";

import {
  deleteArtikel,
  clearErrors,
} from "../../../../redux/actions/publikasi/artikel.actions";

import { DELETE_ARTIKEL_RESET } from "../../../../redux/types/publikasi/artikel.type";

const Artikel = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    loading: allLoading,
    error,
    artikel,
  } = useSelector((state) => state.allArtikel);
  const {
    loading: deleteLoading,
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.deleteArtikel);

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [publishValue, setPublishValue] = useState(null);
  const [disableEndDate, setDisableEndDate] = useState(true)

  let loading = false;
  let { page = 1, keyword, success } = router.query;
  if (allLoading) {
    loading = allLoading;
  } else if (deleteLoading) {
    loading = deleteLoading;
  }
  page = Number(page);

  useEffect(() => {
    if (isDeleted) {
      Swal.fire("Berhasil ", "Data berhasil dihapus.", "success").then(
        (result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        }
      );
      dispatch({
        type: DELETE_ARTIKEL_RESET,
      });
    }

  }, [limit, isDeleted, publishValue, dispatch, search]);

  const onNewReset = () => {
    router.replace("/publikasi/artikel", undefined, { shallow: true });
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
        dispatch(deleteArtikel(id, token));
      }
    });
  };

  const handlePagination = (pageNumber) => {
    if (limit !== null && search === "" && startDate === null && endDate === null && publishValue === null) {
      router.push(`${router.pathname}?page=${pageNumber}&limit=${limit}`)

    } else if (limit !== null && search !== "" && startDate === null && endDate === null && publishValue === null) {
      router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&limit=${limit}`)

    } else if (limit === null && search !== "" && startDate === null && endDate === null && publishValue === null) {
      router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}`)

    } else if (limit !== null && search === "" && startDate !== null && endDate !== null && publishValue === null) {
      router.push(`${router.pathname}?page=${pageNumber}&limit=${limit}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)

    } else if (limit !== null && search !== "" && startDate !== null && endDate !== null && publishValue === null) {
      router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&limit=${limit}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)

    } else if (limit === null && search !== "" && startDate !== null && endDate !== null && publishValue === null) {
      router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)

    } else if (limit !== null && search === "" && startDate === null && endDate === null && publishValue !== null) {
      router.push(`${router.pathname}?page=${pageNumber}&limit=${limit}&publish=${publishValue}`)

    } else if (limit !== null && search !== "" && startDate === null && endDate === null && publishValue !== null) {
      router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&limit=${limit}&publish=${publishValue}`)

    } else if (limit === null && search !== "" && startDate === null && endDate === null && publishValue !== null) {
      router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&publish=${publishValue}`)

    } else if (limit === null && search === "" && startDate === null && endDate === null && publishValue !== null) {
      router.push(`${router.pathname}?page=${pageNumber}&publish=${publishValue}`)

    } else if (limit !== null && search === "" && startDate !== null && endDate !== null && publishValue !== null) {
      router.push(`${router.pathname}?page=${pageNumber}&limit=${limit}&publish=${publishValue}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)

    } else if (limit !== null && search !== "" && startDate !== null && endDate !== null && publishValue !== null) {
      router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&limit=${limit}&publish=${publishValue}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)

    } else if (limit === null && search !== "" && startDate !== null && endDate !== null && publishValue !== null) {
      router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&publish=${publishValue}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)

    } else {
      router.push(`${router.pathname}?page=${pageNumber}`)
    }
  }

  const handleSearch = () => {
    if (limit != null && startDate === null && endDate === null) {
      router.push(`${router.pathname}?page=1&keyword=${search}&limit=${limit}`)

    } else if (limit !== null && startDate !== null && endDate !== null) {
      router.push(`${router.pathname}?page=1&keyword=${search}&limit=${limit}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)

    } else {
      router.push(`${router.pathname}?page=1&keyword=${search}`)
    }

  };

  const handleSearchDate = () => {
    if (moment(startDate).format("YYYY-MM-DD") > moment(endDate).format("YYYY-MM-DD")) {
      Swal.fire(
        'Oops !',
        'Tanggal sebelum tidak boleh melebihi tanggal sesudah.',
        'error'
      )
      setStartDate(null)
      setEndDate(null)

    } else if (startDate === null && endDate !== null) {
      Swal.fire(
        'Oops !',
        'Tanggal sebelum tidak boleh kosong',
        'error'
      )
      setStartDate(null)
      setEndDate(null)

    } else if (startDate !== null && endDate === null) {
      Swal.fire(
        'Oops !',
        'Tanggal sesudah tidak boleh kosong',
        'error'
      )
      setStartDate(null)
      setEndDate(null)

    } else if (startDate === null && endDate === null) {
      Swal.fire(
        'Oops !',
        'Harap mengisi tanggal terlebih dahulu.',
        'error'
      )
      setStartDate(null)
      setEndDate(null)

    } else {
      if (limit !== null && search !== null && startDate !== null && endDate !== null) {
        router.push(
          `${router.pathname}?page=1&keyword=${search}startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}&limit=${limit}`
        );

      } else if (limit !== null && search === null && startDate !== null && endDate !== null) {
        router.push(
          `${router.pathname}?page=1&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}&limit=${limit}`
        )


      } else if (limit !== null && search === null && startDate === null && endDate === null) {
        router.push(
          `${router.pathname}?page=1&limit=${limit}`
        )

      } else if (limit !== null && search !== null && startDate === null && endDate === null) {
        router.push(
          `${router.pathname}?page=1&limit=${limit}&keyword=${search}`
        )

      } else {
        router.push(
          `${router.pathname}?page=1&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`
        );
      }
    }
  };

  const handleLimit = (val) => {
    setLimit(val)
    if (search === "" && publishValue === null) {
      router.push(`${router.pathname}?page=1&limit=${val}`);

    } else if (search !== "" && publishValue === null) {
      router.push(`${router.pathname}?page=1&keyword=${search}&limit=${val}`)

    } else if (search === "" && publishValue !== null) {
      router.push(`${router.pathname}?page=1&limit=${val}&publish=${publishValue}`);

    } else if (search !== "" && publishValue !== null) {
      router.push(`${router.pathname}?page=1&keyword=${search}&limit=${val}&publish=${publishValue}`)
    }

  };

  const handlePublish = (val) => {
    if (val !== null || val !== "") {
      setPublishValue(val)

      if (startDate === null && endDate === null && limit === null && search === null) {
        router.push(`${router.pathname}?publish=${val}`);

      } else if (startDate !== null && endDate !== null && limit === null && search === null) {
        router.push(`${router.pathname}?publish=${val}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)

      } else if (startDate !== null && endDate !== null && limit !== null && search === null) {
        router.push(`${router.pathname}?publish=${val}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}&limit=${limit}`)

      } else if (startDate !== null && endDate !== null && limit === null && search !== null) {
        // router.push(`${router.pathname}?publish=${val}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}&keyword=${search}`)
        router.push(`${router.pathname}?publish=${val}`)

      } else if (startDate === null && endDate === null && limit !== null && search === null) {
        router.push(`${router.pathname}?publish=${val}&limit=${limit}`);

      } else if (startDate === null && endDate === null && limit === null && search !== null) {
        router.push(`${router.pathname}?publish=${val}`);
        setSearch("")
        // router.push(`${router.pathname}?publish=${val}&keyword=${search}`);

      } else if (startDate === null && endDate === null && limit !== null && search !== null) {
        router.push(`${router.pathname}?publish=${val}&limit=${limit}&keyword=${search}`);

      } else if (startDate !== null && endDate !== null && limit !== null && search !== null) {
        router.push(`${router.pathname}?publish=${val}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}&limit=${limit}&keyword=${search}`)
      }
    }

  }

  const resetValueSort = () => {
    setStartDate(null)
    setEndDate(null)
    setDisableEndDate(true)
    router.push('/publikasi/artikel', undefined, { shallow: false })
  }

  const handleStartDate = (date) => {
    setStartDate(date)
    setDisableEndDate(false)
  }

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
          <div className="alert-text">Berhasil Menyimpan Data !</div>
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

      <div className="col-lg-12 col-md-12">
        <div className="row">
          <CardPage
            background="bg-light-info"
            icon="new/open-book.svg"
            color='#ffffff'
            value={artikel && artikel.publish != "" ? artikel.publish : 0}
            titleValue="Artikel"
            title="Total Publish"
            publishedVal="1"
            routePublish={() => handlePublish("1")}
          />

          <CardPage
            background="bg-light-warning"
            icon="new/mail-white.svg"
            color='#ffffff'
            value="0"
            titleValue="Orang"
            title="Total Author"
            publishedVal=""
            routePublish={() => handlePublish("")}
          />
          <CardPage
            background="bg-light-success"
            icon='user-white.svg'
            color='#ffffff'
            value="0"
            titleValue="Orang"
            title="Total Pembaca"
            publishedVal=""
            routePublish={() => handlePublish("")}
          />
          <CardPage
            background="bg-light-danger"
            icon="Library.svg"
            color='#ffffff'
            value={artikel && artikel.unpublish != "" ? artikel.unpublish : 0}
            titleValue="Artikel"
            title="Total Belum Dipublish"
            publishedVal="0"
            routePublish={() => handlePublish("0")}
          />
        </div>
      </div>

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className={`${styles.headTitle}`}>
              Artikel
            </h3>
            <div className="card-toolbar">
              <Link href="/publikasi/artikel/tambah">
                <a className={`${styles.btnTambah} btn btn-primary-rounded-full px-6 font-weight-bold btn-block`}>
                  <i className="ri-add-line pb-1 text-white mr-2 "></i>
                  Tambah Artikel
                </a>
              </Link>
            </div>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div className="position-relative overflow-hidden mt-3"
                    style={{ maxWidth: "330px" }}
                  >
                    <i className="ri-search-line left-center-absolute ml-2"></i>
                    <input
                      type="text"
                      className="form-control pl-10"
                      placeholder="Ketik disini untuk Pencarian..."
                      value={search}
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
                <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div className="d-flex flex-wrap align-items-center justify-content-end mt-2">
                    {/* sortir by modal */}
                    <button
                      className="col-sm-12 col-md-6 avatar item-rtl btn border d-flex align-items-center justify-content-between mt-2"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                      style={{ color: "#464646", minWidth: "230px" }}
                    >
                      <div className="d-flex align-items-center">
                        <IconFilter className="mr-3" />
                        Pilih Filter
                      </div>
                      <IconArrow fill="#E4E6EF" width="11" height="11" />
                    </button>

                    {/* modal */}
                    <form
                      className="form text-left"
                    >
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
                              style={{ height: "200px" }}
                            >
                              <div className="mb-10 col-12">
                                <label className="required fw-bold fs-6 mb-2">
                                  Tanggal
                                </label>

                                <div>
                                  <DatePicker
                                    className="form-search-date form-control-sm form-control"
                                    selected={startDate}
                                    onChange={(date) => handleStartDate(date)}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Silahkan Isi Tanggal Dari"
                                    wrapperClassName="col-12 col-lg-12 col-xl-12"
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
                                    onChange={(date) => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    dateFormat="dd/MM/yyyy"
                                    minDate={startDate}
                                    maxDate={addDays(startDate, 20)}
                                    placeholderText="Silahkan Isi Tanggal Sampai"
                                    wrapperClassName="col-12 col-lg-12 col-xl-12"
                                    disabled={disableEndDate === true || disableEndDate === null}
                                  />
                                </div>
                                {
                                  disableEndDate === true || disableEndDate === null ?
                                    <small className="text-muted">
                                      Mohon isi Tanggal Dari terlebih dahulu
                                    </small>
                                    :
                                    null
                                }
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
                    {/* end modal */}

                  </div>
                </div>
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
                        <th>Thumbnail</th>
                        <th>Kategori</th>
                        <th>Judul</th>
                        <th>Tanggal Publish</th>
                        <th>Dibuat</th>
                        <th>Status</th>
                        <th>Role</th>
                        <th style={{ width: '9.5vw' }}>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!artikel || (artikel && artikel.artikel.length === 0) ? (
                        <td className='align-middle text-center' colSpan={9}>Data Tidak Ditemukan</td>
                      ) : (
                        artikel && artikel.artikel.map((artikel, i) => {
                          return (
                            <tr key={artikel.id}>
                              <td className='align-middle text-center'>
                                {
                                  limit === null ?
                                    <span>
                                      {i + 1 * (page * 5) - (5 - 1)}
                                    </span>
                                    :
                                    <span>
                                      {i + 1 * (page * limit) - (limit - 1)}
                                    </span>
                                }
                              </td>

                              <td>
                                <Image
                                  alt={artikel.judul_artikel}
                                  unoptimized={
                                    process.env.ENVIRONMENT !== "PRODUCTION"
                                  }
                                  loader={process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                    "publikasi/images/" +
                                    artikel.gambar
                                  }
                                  src={
                                    process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                    "publikasi/images/" +
                                    artikel.gambar
                                  }
                                  width={80}
                                  height={50}
                                />
                              </td>
                              <td className="align-middle">
                                {artikel.nama_kategori}
                              </td>
                              <td className="align-middle" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxHeight: '50rem' }}>
                                {artikel.judul_artikel}
                              </td>
                              <td className="align-middle">
                                {artikel.publish === 1 ? (
                                  artikel.tanggal_publish
                                ) : (
                                  <span className="label label-inline label-light-danger font-weight-bold">
                                    Belum dipublish
                                  </span>
                                )}
                              </td>
                              <td className="align-middle">
                                {artikel.name}
                              </td>
                              <td className="align-middle">
                                {artikel.publish === 1 ? (
                                  <span className="label label-inline label-light-success font-weight-bold">
                                    Publish
                                  </span>
                                ) : (
                                  <span className="label label-inline label-light-warning font-weight-bold">
                                    Belum dipublish
                                  </span>
                                )}
                              </td>
                              <td className="align-middle">
                                {artikel.role[0].name}
                                {/* {
                                  typeof row.role === "string" ?
                                    row.role
                                    : row.role[0].name
                                } */}
                              </td>
                              <td className="align-middle d-flex">

                                <Link
                                  href={`/publikasi/artikel/preview/${artikel.id}`}
                                >
                                  <a className="btn btn-link-action bg-blue-secondary text-white mr-2 my-5 position-relative btn-delete" target="_blank">
                                    <i className="ri-todo-fill p-0 text-white"></i>
                                    <div className="text-hover-show-hapus">
                                      Pratinjau
                                    </div>
                                  </a>
                                </Link>

                                <Link
                                  href={`/publikasi/artikel/${artikel.id}`}
                                >
                                  <a className="btn btn-link-action bg-blue-secondary text-white mr-2 my-5 position-relative btn-delete">
                                    <i className="ri-pencil-fill p-0 text-white"></i>
                                    <div className="text-hover-show-hapus">
                                      Ubah
                                    </div>
                                  </a>
                                </Link>

                                <button
                                  className="btn btn-link-action bg-blue-secondary text-white my-5 position-relative btn-delete"
                                  onClick={() => handleDelete(artikel.id)}
                                >
                                  <i className="ri-delete-bin-fill p-0 text-white"></i>
                                  <div className="text-hover-show-hapus">
                                    Hapus
                                  </div>
                                </button>
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
                {artikel && artikel.perPage < artikel.total && (
                  <div className={`${stylesPag.pagination} table-pagination`}>
                    <Pagination
                      activePage={page}
                      itemsCountPerPage={artikel.perPage}
                      totalItemsCount={artikel.total}
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
                {artikel ? (
                  <div className={`${stylesPag.rightPag} table-total ml-auto`}>
                    <div className="row">
                      <div className="col-4 mr-0 mt-3">
                        <select
                          className="form-control"
                          id="exampleFormControlSelect2"
                          style={{
                            width: "70px",
                            background: "#F3F6F9",
                            borderColor: "#F3F6F9",
                            color: "#9E9E9E",
                          }}
                          onChange={(e) => handleLimit(e.target.value)}
                          onBlur={(e) => handleLimit(e.target.value)}
                        >
                          <option value='5' selected={limit == "5" ? true : false}>5</option>
                          <option value='10' selected={limit == "10" ? true : false}>10</option>
                          <option value='30' selected={limit == "30" ? true : false}>30</option>
                          <option value='40' selected={limit == "40" ? true : false}>40</option>
                          <option value='50' selected={limit == "50" ? true : false}>50</option>
                        </select>
                      </div>
                      <div className="col-8 my-auto">
                        <p
                          className="align-middle mt-5 pt-1"
                          style={{ color: "#B5B5C3" }}
                        >
                          Total Data {artikel.total} List Data
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


export default Artikel;
