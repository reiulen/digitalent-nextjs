import React, { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Swal from "sweetalert2";

import Pagination from "react-js-pagination";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import SimpleReactValidator from "simple-react-validator";

import PageWrapper from "../../../wrapper/page.wrapper";
import ButtonAction from "../../../ButtonAction";
import LoadingTable from "../../../LoadingTable";
import IconArrow from "../../../assets/icon/Arrow";
import IconClose from "../../../assets/icon/Close";
import IconFilter from "../../../assets/icon/Filter";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteKategori,
  clearErrors,
  getAllKategori,
} from "../../../../redux/actions/publikasi/kategori.actions";
import { DELETE_KATEGORI_RESET } from "../../../../redux/types/publikasi/kategori.type";

const Kategori = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, kategori } = useSelector(state => state.allKategori);
  const { paginateKategori } = useSelector(state => state.paginationKategori);
  const { error: deleteError, isDeleted } = useSelector(
    state => state.deleteKategori
  );
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  // console.log("PAGINATION KATEGORI : ", paginateKategori)

  let { page = 1, success } = router.query;
  page = Number(page);

  const [limit, setLimit] = useState(null);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [publishValue, setPublishValue] = useState(null);
  const [searchKategori, setSearchKategori] = useState(null);

  // useEffect (() => {
  //     dispatch (getAllKategori())
  // }, [])

  useEffect(() => {
    // if (limit !== null && search === "") {
    //     router.push(`${router.pathname}?page=1&limit=${limit}`)

    // } else if (limit !== null && search !== ""){
    //     router.push(`${router.pathname}?page=1&keyword=${search}&limit=${limit}`)
    // }

    if (isDeleted) {
      Swal.fire("Berhasil ", "Data berhasil dihapus.", "success").then(
        result => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        }
      );
      dispatch({
        type: DELETE_KATEGORI_RESET,
      });
    }
  }, [dispatch, isDeleted]);

  const handleDelete = id => {
    Swal.fire({
      title: "Apakah anda yakin ?",
      text: "Data ini tidak bisa dikembalikan !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya !",
      cancelButtonText: "Batal",
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(deleteKategori(id, token));
      }
    });
  };

  const onNewReset = () => {
    router.replace("/publikasi/kategori", undefined, { shallow: true });
  };

  // const handleSearchDate = () => {
  //     if (moment(startDate).format("YYYY-MM-DD") > moment(endDate).format("YYYY-MM-DD")) {
  //         Swal.fire(
  //             'Oops !',
  //             'Tanggal sebelum tidak boleh melebihi tanggal sesudah.',
  //             'error'
  //         )
  //         setStartDate(null)
  //         setEndDate(null)

  //     } else if (startDate === null && endDate !== null) {
  //         Swal.fire(
  //             'Oops !',
  //             'Tanggal sebelum tidak boleh kosong',
  //             'error'
  //         )
  //         setStartDate(null)
  //         setEndDate(null)

  //     } else if (startDate !== null && endDate === null) {
  //         Swal.fire(
  //             'Oops !',
  //             'Tanggal sesudah tidak boleh kosong',
  //             'error'
  //         )
  //         setStartDate(null)
  //         setEndDate(null)

  //     } else if (startDate === null && endDate === null) {
  //         Swal.fire(
  //             'Oops !',
  //             'Harap mengisi tanggal terlebih dahulu.',
  //             'error'
  //         )
  //         setStartDate(null)
  //         setEndDate(null)

  //     } else {
  //         if (limit !== null && search !== null && startDate !== null && endDate !== null) {
  //             router.push(
  //                 `${router.pathname}?page=1&keyword=${search}startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}&limit=${limit}`
  //             );

  //         } else if (limit !== null && search === null && startDate !== null && endDate !== null) {
  //             router.push(
  //                 `${router.pathname}?page=1&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}&limit=${limit}`
  //             )

  //         } else if (limit !== null && search === null && startDate === null && endDate === null) {
  //             router.push(
  //                 `${router.pathname}?page=1&limit=${limit}`
  //             )

  //         } else if (limit !== null && search !== null && startDate === null && endDate === null) {
  //             router.push(
  //                 `${router.pathname}?page=1&limit=${limit}&keyword=${search}`
  //             )

  //         } else {
  //             router.push(
  //                 `${router.pathname}?page=1&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`
  //             );
  //         }
  //     }
  // };

  const handleSearchKategori = () => {
    if (searchKategori === null) {
      Swal.fire("Oops !", "Harap memilih kategori terlebih dahulu.", "error");
    } else {
      if (searchKategori === null) {
        router.push(`${router.pathname}?page=1&limit=${limit}`);
      } else {
        router.push(`${router.pathname}?page=1&keyword=${searchKategori}`);
      }
    }
  };

  const handlePagination = pageNumber => {
    if (limit !== null && search === "" && searchKategori === null) {
      router.push(`${router.pathname}?page=${pageNumber}&limit=${limit}`);
    } else if (limit !== null && search !== "" && searchKategori === null) {
      router.push(
        `${router.pathname}?page=${pageNumber}&keyword=${search}&limit=${limit}`
      );
    } else if (limit === null && search !== "" && searchKategori === null) {
      router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}`);
    } else if (limit !== null && search === "" && searchKategori !== null) {
      router.push(
        `${router.pathname}?page=${pageNumber}&limit=${limit}&keyword=${searchKategori}`
      );

      // } else if (limit !== null && search !== "" && startDate !== null && endDate !== null && publishValue === null) {
      //     router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&limit=${limit}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)

      // } else if (limit === null && search !== "" && startDate !== null && endDate !== null && publishValue === null) {
      //     router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)

      // } else if (limit !== null && search === "" && startDate === null && endDate === null && publishValue !== null) {
      //     router.push(`${router.pathname}?page=${pageNumber}&limit=${limit}&publish=${publishValue}`)

      // } else if (limit !== null && search !== "" && startDate === null && endDate === null && publishValue !== null) {
      //     router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&limit=${limit}&publish=${publishValue}`)

      // } else if (limit === null && search !== "" && startDate === null && endDate === null && publishValue !== null) {
      //     router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&publish=${publishValue}`)

      // } else if (limit === null && search === "" && startDate === null && endDate === null && publishValue !== null) {
      //     router.push(`${router.pathname}?page=${pageNumber}&publish=${publishValue}`)

      // } else if (limit !== null && search === "" && startDate !== null && endDate !== null && publishValue !== null) {
      //     router.push(`${router.pathname}?page=${pageNumber}&limit=${limit}&publish=${publishValue}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)

      // } else if (limit !== null && search !== "" && startDate !== null && endDate !== null && publishValue !== null) {
      //     router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&limit=${limit}&publish=${publishValue}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)

      // } else if (limit === null && search !== "" && startDate !== null && endDate !== null && publishValue !== null) {
      //     router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&publish=${publishValue}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)
    } else {
      router.push(`${router.pathname}?page=${pageNumber}`);
    }
  };

  const handleSearch = () => {
    // console.log("SEARCH : ", `${router.pathname}?page=1&keyword=${search}&limit=${limit}`)
    if (limit != null && startDate === null && endDate === null) {
      router.push(`${router.pathname}?page=1&keyword=${search}&limit=${limit}`);
    } else if (limit !== null && startDate !== null && endDate !== null) {
      router.push(
        `${router.pathname
        }?page=1&keyword=${search}&limit=${limit}&startdate=${moment(
          startDate
        ).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`
      );
    } else {
      router.push(`${router.pathname}?page=1&keyword=${search}`);
    }
  };

  const handleLimit = val => {
    setLimit(val);
    if (search === "" && searchKategori === null) {
      router.push(`${router.pathname}?page=1&limit=${val}`);
    } else if (search !== "" && searchKategori === null) {
      router.push(`${router.pathname}?page=1&keyword=${search}&limit=${val}`);
    } else if (search === "" && searchKategori !== null) {
      router.push(
        `${router.pathname}?page=1&keyword=${searchKategori}&limit=${val}`
      );
    } else if (search !== "" && searchKategori !== null) {
      router.push(
        `${router.pathname}?page=1&keyword=${searchKategori}&limit=${val}`
      );
    }
  };

  // const handleLimit = (val) => {
  //     setLimit(val)
  //     if (search === "") {
  //         router.push(`${router.pathname}?page=1&limit=${val}`);

  //     } else {
  //         router.push(`${router.pathname}?page=1&keyword=${val}&limit=${limit}`)
  //     }

  // };

  const resetValueSort = () => {
    setSearchKategori(null);
    $("#selectKategori").prop("selectedIndex", 0);
  };

  return (
    <PageWrapper>
      {/* {
                console.log(kategori)
            }
            {
                console.log(paginateKategori)
            } */}
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

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              Kategori
            </h3>
            <div className="card-toolbar">
              <Link href="/publikasi/kategori/tambah">
                <a className="btn btn-primary-rounded-full px-6 font-weight-bold btn-block ">
                  <i className="ri-add-fill pb-1 text-white mr-2 "></i>
                  Tambah Kategori
                </a>
              </Link>
            </div>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
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
                <div className=" col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div className="d-flex flex-wrap align-items-center justify-content-end mt-2">
                    {/* sortir by modal */}
                    <button
                      className="col-sm-6 avatar item-rtl btn border d-flex align-items-center justify-content-between mt-2"
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
                      // id="kt_docs_formvalidation_text"
                      className="form text-left"
                    // action="#"
                    // autoComplete="off"
                    // onSubmit={handleSubmitSearchMany}
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
                                <select
                                  id="selectKategori"
                                  value={searchKategori}
                                  className="form-control"
                                  onChange={e =>
                                    setSearchKategori(e.target.value)
                                  }
                                  onBlur={e => {
                                    setSearchKategori(e.target.value);
                                    simpleValidator.current.showMessageFor(
                                      "jenis kategori"
                                    );
                                  }}
                                >
                                  <option value="" disabled selected>
                                    -- Pilih Kategori --
                                  </option>
                                  <option value="Berita">Berita</option>
                                  <option value="Artikel">Artikel</option>
                                  <option value="Galeri">Galeri</option>
                                  <option value="Video">Video</option>
                                  <option value="Imagetron">Imagetron</option>
                                  <option value="Faq">Faq</option>
                                </select>
                              </div>
                              {/* <label className="required fw-bold fs-6 mb-2">
                                                                    Tanggal
                                                                    </label>

                                                                    <div>
                                                                    <DatePicker
                                                                        className="form-search-date form-control-sm form-control"
                                                                        selected={startDate}
                                                                        onChange={(date) => setStartDate(date)}
                                                                        selectsStart
                                                                        startDate={startDate}
                                                                        endDate={endDate}
                                                                        dateFormat="dd/MM/yyyy"
                                                                        placeholderText="Silahkan Isi Tanggal Dari"
                                                                        wrapperClassName="col-12 col-lg-12 col-xl-12"
                                                                        minDate={moment().toDate()}
                                                                    // minDate={addDays(new Date(), 20)}
                                                                    />
                                                                    </div> */}

                              {/* <div className="mb-10 col-12">
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
                                                                        // minDate={startDate}
                                                                        minDate={moment().toDate()}
                                                                        maxDate={addDays(startDate, 20)}
                                                                        placeholderText="Silahkan Isi Tanggal Sampai"
                                                                        wrapperClassName="col-12 col-lg-12 col-xl-12"
                                                                    // minDate={addDays(new Date(), 20)}
                                                                    />
                                                                    </div>
                                                                </div> */}
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
                                  onClick={() => handleSearchKategori()}
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
                        <th>Nama</th>
                        <th>Jenis Kategori</th>
                        <th className="text-center">Aksi</th>
                      </tr>
                    </thead>

                    <tbody>
                      {!paginateKategori ||
                        (paginateKategori &&
                          paginateKategori.kategori.length === 0) ? (
                        <td className="align-middle text-center" colSpan={4}>
                          Data Tidak Ditemukan
                        </td>
                      ) : (
                        paginateKategori &&
                        paginateKategori.kategori.map((row, i) => {
                          return (
                            <tr key={row.id}>
                              {/* {console.log("KATEGORI : ",row.nama_kategori)} */}
                              {/* <td className='align-middle text-center'>{i + 1 * (page * 5 || limit) - 4}</td> */}
                              <td className="align-middle text-center">
                                {limit === null ? (
                                  <span>
                                    {i + 1 * (page * 5) - (5 - 1)}
                                  </span>
                                ) : (
                                  <span>
                                    {i + 1 * (page * limit) - (limit - 1)}
                                  </span>
                                )}
                              </td>
                              <td className="align-middle">
                                {row.nama_kategori}
                              </td>
                              <td className="align-middle">
                                {row.jenis_kategori}
                              </td>
                              <td className="align-middle d-flex justify-content-center">
                                <Link href={`/publikasi/kategori/${row.id}`}>
                                  <a className="btn btn-link-action bg-blue-secondary text-white mr-2 position-relative btn-delete">
                                    <i className="ri-pencil-fill p-0 text-white"></i>
                                    <div className="text-hover-show-hapus">
                                      Ubah
                                    </div>
                                  </a>
                                </Link>

                                <button
                                  className="btn btn-link-action bg-blue-secondary text-white position-relative btn-delete"
                                  onClick={() => handleDelete(row.id)}
                                >
                                  <i className="ri-delete-bin-fill p-0 text-white"></i>
                                  <div className="text-hover-show-hapus">
                                    Hapus
                                  </div>
                                </button>
                              </td>
                              {/* <td className='align-middle text-center'>
                                <ButtonAction icon='write.svg' link={`/publikasi/kategori/${row.id}`} title="Edit" />
                                <button
                                  onClick={() => handleDelete(row.id)}
                                  className='btn mr-1'
                                  style={{ background: '#F3F6F9', borderRadius: '6px' }}
                                  data-toggle="tooltip"
                                  data-placement="bottom"
                                  title="Hapus"
                                >
                                  <Image alt='button-action' src={`/assets/icon/trash.svg`} width={18} height={18} />
                                </button>
                              </td> */}
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

              {/* {
                                console.log("KATEGORI : ", kategori)
                            }
                            {
                                console.log("PAGINATE KATEGORI : ", paginateKategori)
                            } */}
              {kategori && paginateKategori ? (
                <div className="row">
                  {paginateKategori.perPage < kategori.total && (
                    <div className="table-pagination">
                      <Pagination
                        activePage={page}
                        itemsCountPerPage={paginateKategori.perPage}
                        totalItemsCount={paginateKategori.total}
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
                  {/* {kategori && kategori.total > 5 ?
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
                                                            onChange={e => handleLimit(e.target.value)}
                                                            onBlur={e => handleLimit(e.target.value)}
                                                        >
                                                            <option value='5' selected={limit == "5" ? true: false}>5</option>
                                                            <option value='10' selected={limit == "10" ? true: false}>10</option>
                                                            <option value='15' selected={limit === "15" ? true: false}>15</option>
                                                            <option value='20' selected={limit === "20" ? true: false}>20</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-8 my-auto">
                                                        <p className='align-middle mt-3' style={{ color: '#B5B5C3' }}>Total Data {kategori.total}</p>
                                                    </div>
                                                </div>
                                            </div> : ''
                                        } */}
                  <div className="table-total ml-auto">
                    <div className="row">
                      <div className="col-4 mr-0 mt-3">
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
                          Total Data {paginateKategori.total} List Data
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Kategori;
