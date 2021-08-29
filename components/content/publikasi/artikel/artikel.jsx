import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import Swal from "sweetalert2";
import moment from "moment";

import PageWrapper from "../../../wrapper/page.wrapper";
import CardPage from "../../../CardPage";
import ButtonAction from "../../../ButtonAction";
import LoadingTable from "../../../LoadingTable";
import ButtonNewTab from "../../../ButtonNewTab";

import { useDispatch, useSelector } from "react-redux";

import {
  deleteArtikel,
  clearErrors,
} from "../../../../redux/actions/publikasi/artikel.actions";

import { DELETE_ARTIKEL_RESET } from "../../../../redux/types/publikasi/artikel.type";

const Artikel = () => {
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

  let loading = false;
  let { page = 1, keyword, success } = router.query;
  if (allLoading) {
    loading = allLoading;
  } else if (deleteLoading) {
    loading = deleteLoading;
  }
  page = Number(page);

  useEffect(() => {
    // if (limit) {
    //   router.push(`${router.pathname}?page=1&limit=${limit}`);
    // }

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
        dispatch(deleteArtikel(id));
      }
    });
  };

  const handlePagination = (pageNumber) => {
    if (limit !== null  && search === "" && startDate === null && endDate === null) {
        router.push(`${router.pathname}?page=${pageNumber}&limit=${limit}`)
    
    } else if (limit !== null && search !== "" && startDate === null && endDate === null) {
        router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&limit=${limit}`)

    } else if (limit === null && search !== "" && startDate === null && endDate === null) {
        router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}`)

    } else if (limit !== null  && search === "" && startDate !== null && endDate !== null) {
        router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)

    } else if (limit !== null  && search !== "" && startDate !== null && endDate !== null) {
        router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&limit=${limit}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)
    
    } else if (limit === null  && search !== "" && startDate !== null && endDate !== null) {
        router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)
    
    } else {
        router.push(`${router.pathname}?page=${pageNumber}`)
    }
  }

  const handleSearch = () => {
    if (limit != null && startDate === null && endDate === null) {
       router.push(`${router.pathname}?page=1&keyword=${search}&limit=${limit}`)

    } else if (limit !== null && startDate !== null && endDate !== null ) {
       router.push(`${router.pathname}?page=1&keyword=${search}&limit=${limit}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)

    } else {
      router.push(`${router.pathname}?page=1&keyword=${search}`)
    }

  };

  const handleSearchDate = () => {
    if (moment(startDate).format("YYYY-MM-DD") > moment(endDate).format("YYYY-MM-DD")){
        Swal.fire(
            'Oops !',
            'Tanggal sebelum tidak boleh melebihi tanggal sesudah.',
            'error'
        )
        setStartDate (null)
        setEndDate (null)

    } else {
        if (limit !== null && search === null) {
            router.push(
                `${router.pathname}?page=1&keyword=${search}startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}&limit=${limit}`
            );

        } else if (limit !== null && search !== null) {
          `${router.pathname}?page=1&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}&limit=${limit}`

        } else {
            router.push(
                `${router.pathname}?page=1&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`
            ); 
        }
    }
  };

  const handleLimit = (val) => {
    setLimit(val)
    if (search === "") {
        router.push(`${router.pathname}?page=1&limit=${val}`);
    
    } else {
        router.push(`${router.pathname}?page=1&keyword=${val}&limit=${limit}`)
    }
    
  };

  const handlePublish = (val) => {
    if (val !== null || val !== "") {
      setPublishValue (val)

      if ( startDate === null && endDate === null && limit === null && search === null){
        router.push(`${router.pathname}?publish=${val}`);
  
      } else if ( startDate !== null && endDate !== null && limit === null && search === null) {
          router.push(`${router.pathname}?publish=${val}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)
  
      } else if ( startDate !== null && endDate !== null && limit !== null && search === null) {
          router.push(`${router.pathname}?publish=${val}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}&limit=${limit}`)
      
      } else if ( startDate !== null && endDate !== null && limit === null && search !== null) {
          router.push(`${router.pathname}?publish=${val}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}&keyword=${search}`)
  
      } else if ( startDate === null && endDate === null && limit !== null && search === null) {
          router.push(`${router.pathname}?publish=${val}&limit=${limit}`);
  
      } else if ( startDate === null && endDate === null && limit === null && search !== null) {
          router.push(`${router.pathname}?publish=${val}&keyword=${search}`);
      
      } else if ( startDate === null && endDate === null && limit !== null && search !== null) {
          router.push(`${router.pathname}?publish=${val}&limit=${limit}&keyword=${search}`);
      
      } else if ( startDate !== null && endDate !== null && limit !== null && search !== null) {
          router.push(`${router.pathname}?publish=${val}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}&limit=${limit}&keyword=${search}`)
      }
    }
    
  }

  return (
    <PageWrapper>
      {console.log(artikel)}
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

      <div className="col-lg-12 col-md-12">
        <div className="row">
          <CardPage
            background="bg-light-info"
            icon="mail-purple.svg"
            color="#8A50FC"
            value={artikel && artikel.publish != "" ? artikel.publish : 0}
            titleValue="Artikel"
            title="Total Publish"
            publishedVal="1"
            routePublish={() => handlePublish("1")}
          />

          <CardPage
            background="bg-light-warning"
            icon="garis-yellow.svg"
            color="#634100"
            value="64"
            titleValue="Artikel"
            title="Total Author"
            publishedVal=""
            routePublish={() => handlePublish("")}
          />
          <CardPage
            background="bg-light-success"
            icon="orang-tambah-green.svg"
            color="#74BBB7"
            value="64"
            titleValue="K"
            title="Total Yang Baca"
            publishedVal=""
            routePublish={() => handlePublish("")}
          />
          <CardPage
            background="bg-light-danger"
            icon="kotak-kotak-red.svg"
            color="#F65464"
            value={artikel && artikel.unpublish != "" ? artikel.unpublish : 0}
            titleValue="Artikel"
            title="Total Belum Publish"
            publishedVal="0"
            routePublish={() => handlePublish("0")}
          />
        </div>
      </div>

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              Manajemen Artikel
            </h3>
            <div className="card-toolbar">
              <Link href="/publikasi/artikel/tambah">
                <a className="btn btn-light-success px-6 font-weight-bold btn-block ">
                  Tambah Artikel
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
              <div className="row align-items-right">
                <div className="col-lg-2 col-xl-2 mt-5 mt-lg-5">
                  <DatePicker
                    className="form-search-date form-control-sm form-control"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="dd/MM/yyyy"
                  />
                  <small className="form-text text-muted">Dari Tanggal</small>
                </div>
                <div className="col-lg-2 col-xl-2 mt-5 mt-lg-5">
                  <DatePicker
                    className="form-search-date form-control-sm form-control"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    maxDate={addDays(startDate, 20)}
                    dateFormat="dd/MM/yyyy"
                  />
                  <small className="form-text text-muted">Sampai Tanggal</small>
                </div>
                <div className="col-lg-2 col-xl-2 mt-5 mt-lg-5">
                  <button
                    type="button"
                    className="btn btn-sm btn-light-primary px-6 font-weight-bold btn-block"
                    onClick={handleSearchDate}
                  >
                    Cari
                  </button>
                </div>
              </div>
            </div>
            {/* {
              console.log (artikel)
            } */}

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
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!artikel || (artikel && artikel.artikel.length === 0) ? (
                        <td className="align-middle text-center" colSpan={8}>
                          Data Masih Kosong
                        </td>
                      ) : (
                        artikel &&
                        // artikel.artikel &&
                        artikel.artikel.map((artikel, i) => {
                          return (
                            <tr key={artikel.id}>
                              {/* <td className="align-middle text-center">
                                <span className="badge badge-secondary text-muted">
                                  {i + 1 * (page * 5 || limit) - 4}
                                </span>
                              </td> */}
                        
                              <td className='align-middle text-center'>
                                  {
                                    limit === null ?
                                      <span className="badge badge-secondary text-muted">
                                        {i + 1 * (page * 5 ) - (5 - 1 )}
                                      </span>
                                    :
                                      <span className="badge badge-secondary text-muted">
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
                                  // loader={() => process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                  //   "publikasi/images/" +
                                  //   artikel.gambar + `?w=80&q=75`
                                  // }
                                  // src={artikel.gambar}
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
                                {/* {artikel.jenis_kategori} */}
                                {artikel.nama_kategori}
                              </td>
                              <td className="align-middle">
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
                                {/* {artikel.dibuat} */}
                                Super Admin
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
                              <td className="align-middle">Super Admin</td>
                              <td className="align-middle">
                                {/* conflict nih cuy */}
                                {/* <ButtonAction icon="setting.svg" />
                                <ButtonAction
                                  icon="write.svg"
                                  link={`/publikasi/artikel/${artikel.id}`}
                                /> */}

                                <ButtonNewTab
                                  icon="setting.svg"
                                  link={`/publikasi/artikel/preview/${artikel.id}`}
                                  title="Preview"
                                />
                                <ButtonAction
                                  icon="write.svg"
                                  link={`/publikasi/artikel/${artikel.id}`}
                                  title="Edit"
                                />
                                <button
                                  onClick={() => handleDelete(artikel.id)}
                                  className="btn mr-1"
                                  style={{
                                    background: "#F3F6F9",
                                    borderRadius: "6px",
                                  }}
                                  data-toggle="tooltip" 
                                  data-placement="bottom" 
                                  title="Hapus"
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
                  <div className="table-pagination">
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
                {artikel  ? (
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
                          <option value='5' selected={limit == "5" ? true: false}>5</option>
                          <option value='10' selected={limit == "10" ? true: false}>10</option>
                          <option value='15' selected={limit == "15" ? true: false}>15</option>
                          <option value='20' selected={limit == "20" ? true: false}>20</option>
                        </select>
                      </div>
                      <div className="col-8 my-auto">
                        <p
                          className="align-middle mt-3"
                          style={{ color: "#B5B5C3" }}
                        >
                          Total Data {artikel.total}
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
