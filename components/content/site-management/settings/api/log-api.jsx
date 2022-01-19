import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../../wrapper/page.wrapper";
import { useDispatch, useSelector } from "react-redux";
import LoadingTable from "../../../../LoadingTable";
import IconSearch from "../../../../assets/icon/Search";
import IconClose from "../../../../assets/icon/Close";
import IconFilter from "../../../../assets/icon/Filter";
import IconArrow from "../../../../assets/icon/Arrow";
import {
  changeDates,
  getDetailLog,
  setPage,
  searchCooporation,
  limitCooporation,
  exportFileCSV,
} from "../../../../../redux/actions/site-management/settings/api.actions";
import moment from "moment";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import IconCalender from "../../../../assets/icon/Calender";
import { RESET_VALUE_SORTIR } from "../../../../../redux/types/site-management/settings/api.type";
import styles from "../../../../../styles/sitemanagement/logApi.module.css";
import Cookies from 'js-cookie'
import { Modal } from "react-bootstrap"

import styles2 from "../../../../../styles/previewGaleri.module.css";
import stylesPag from "../../../../../styles/pagination.module.css";

const Table = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const listLog = useSelector((state) => state.listLog);
  const [valueSearch, setValueSearch] = useState("");
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const handleChangeValueSearch = (value) => {
    setValueSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchCooporation(valueSearch));
    dispatch(getDetailLog(router.query.id, token, Cookies.get("token_permission")));
  };

  const [froms, setFroms] = useState("");
  const [tos, setTos] = useState("");

  const onChangePeriodeDateStart = (date) => {
    setFroms(moment(date).format("YYYY-MM-DD"));
    setTos("");
  };
  const onChangePeriodeDateEnd = (date) => {
    setTos(moment(date).format("YYYY-MM-DD"));
  };

  const handleSubmitSearchMany = (event) => {
    event.preventDefault();
    if (froms === "") {
      Swal.fire('Oops !', 'Tanggal tidak boleh kosong', 'error')
    } else if (tos === "") {
      Swal.fire('Oops !', 'Tanggal tidak boleh kosong', 'error')
    } else {
      dispatch(changeDates(froms, tos));
      dispatch(getDetailLog(router.query.id, token, Cookies.get("token_permission")));
      setShowModal(false)
    }
  };

  const resetValueSort = () => {
    setFroms("");
    setTos("");
    dispatch({
      type: RESET_VALUE_SORTIR,
    });
    dispatch(
      getDetailLog(router.query.id, token, Cookies.get("token_permission"))
    );
    setShowModal(false)
  };

  // useEffect(() => {
  //   dispatch(
  //     getDetailLog(router.query.id, token, Cookies.get("token_permission"))
  //   );
  // }, [
  //   dispatch,
  //   router.query.id,
  //   listLog?.limit,
  //   token,
  // ]);

  return (
    <PageWrapper>
      {/* {error ? (
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
      )} */}

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header row border-0">
            <h3
              className={`${styles2.headTitle} col-12 col-sm-8 col-md-8 col-lg-8 col-xl-9`}
            >
              Log API
            </h3>
          </div>
          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-12 col-xl-12">
                  <div className="row d-flex">
                    <div className="col-12 col-md-5 col-lg-4 col-xl-4">
                      <div className="position-relative overflow-hidden w-100 mt-5">
                        <form onSubmit={(e) => handleSubmit(e)}>
                          <IconSearch
                            style={{ left: "10" }}
                            className="left-center-absolute"
                          />
                          <input
                            type="text"
                            className={`${styles.btnCari} form-control pl-10`}
                            placeholder="Ketik disini untuk Pencarian..."
                            onChange={(e) =>
                              handleChangeValueSearch(e.target.value)
                            }
                          />
                          <button
                            type="button"
                            onClick={(e) => handleSubmit(e)}
                            className="btn bg-blue-primary text-white right-center-absolute"
                            style={{
                              borderTopLeftRadius: "0",
                              borderBottomLeftRadius: "0",
                            }}
                          >
                            Cari
                          </button>
                        </form>
                      </div>
                    </div>

                    <div className="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 ml-auto">
                      <div
                        className={`${styles.rightBtnHead} row flex-wrap align-items-center justify-content-end mt-2`}
                      >
                        {/* sorotir by modal check */}
                        <div className="col-12 col-md-5 col-lg-5 col-xl-5 mb-2">
                          <button
                            type="button"
                            className={`${styles.filterBtn} avatar item-rtl btn border d-flex align-items-center justify-content-between mt-2`}
                            onClick={() => setShowModal(true)}
                            style={{ color: "#464646" }}
                          >
                            <div
                              className={`${styles.iconFilter} d-flex align-items-center`}
                            >
                              <IconFilter className="mr-3" />
                              Filter
                            </div>
                            <IconArrow fill="#E4E6EF" width="11" height="11" />
                          </button>

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
                              <div
                                className="modal-body text-left"
                              >
                                <div className="fv-row mb-10">
                                  <label>From</label>
                                  <div className="d-flex align-items-center position-relative datepicker-w mt-2">
                                    <DatePicker
                                      className="form-search-date form-control cursor-pointer"
                                      onChange={(date) =>
                                        onChangePeriodeDateStart(date)
                                      }
                                      value={froms}
                                      dateFormat="YYYY-MM-DD"
                                      placeholderText="From"
                                      minDate={moment().toDate()}
                                    />
                                    <IconCalender
                                      className="right-center-absolute"
                                      style={{ right: "10px" }}
                                    />
                                  </div>
                                </div>
                                <div className="fv-row mb-10">
                                  <label>To</label>
                                  <div className="d-flex align-items-center position-relative datepicker-w mt-2">
                                    <DatePicker
                                      className="form-search-date form-control cursor-pointer"
                                      onChange={(date) =>
                                        onChangePeriodeDateEnd(date)
                                      }
                                      value={tos}
                                      disabled={!froms}
                                      dateFormat="YYYY-MM-DD"
                                      placeholderText="To"
                                      minDate={moment(froms).toDate()}
                                    />
                                    <IconCalender
                                      className="right-center-absolute"
                                      style={{ right: "10px" }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </Modal.Body>
                            <Modal.Footer>
                              <button
                                className="btn btn-white-ghost-rounded-full"
                                type="button"
                                onClick={() => resetValueSort()}
                              >
                                Reset
                              </button>
                              <button
                                className="btn btn-primary-rounded-full"
                                type="button"
                                onClick={(e) =>
                                  handleSubmitSearchMany(e)
                                }
                              >
                                Terapkan
                              </button>
                            </Modal.Footer>
                          </Modal>
                        </div>

                        {/* btn export */}
                        <div className="col-12 col-md-6 col-lg-6 col-xl-4">
                          <button
                            className={`${styles.btnExport} btn btn-rounded-full bg-blue-secondary text-white mt-2`}
                            type="button"
                            onClick={() =>
                              dispatch(exportFileCSV(token, router.query.id, Cookies.get("token_permission")))
                            }
                          >
                            Export .xlsx
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="table-page mt-5">
              <div className="table-responsive">
                {listLog?.status === "process" ? (
                  <LoadingTable />
                ) : (
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-left">No</th>
                        <th className="text-left align-middle">API</th>
                        <th className="text-left align-middle">URL</th>
                        <th className="text-left align-middle">Key</th>
                        <th className="text-left align-middle">Pengguna</th>
                        <th className="text-left align-middle">Waktu Akses</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!listLog ||
                        (listLog && listLog?.data?.length === 0) ||
                        listLog?.data === undefined ? (
                        <td className="align-middle text-center" colSpan={6}>
                          Data kosong
                        </td>
                      ) : (
                        listLog?.data?.map((items, index) => {
                          return (
                            <tr key={index}>
                              <td className="align-middle text-left">
                                {index + limit * (pages - 1) + 1}
                                {/* {listLog.page === 1
                                  ? index + 1
                                  : (listLog.page - 1) * listLog.limit +
                                  (index + 1)} */}
                              </td>
                              <td className="align-middle text-left text-overflow-ens">
                                {items.api_name}
                              </td>
                              <td className="align-middle text-left text-overflow-ens">
                                {items.api_url}
                              </td>
                              <td className="align-middle text-left text-overflow-ens">
                                {items.api_key}
                              </td>
                              <td className="align-middle text-left text-overflow-ens">
                                {items.username}
                              </td>
                              <td className="align-middle text-left text-overflow-ens">
                                <b>
                                  {" "}
                                  {moment(items.from_date).format(
                                    "DD MMMM YYYY"
                                  )}{" "}
                                  s/d{" "}
                                  {moment(items.to_date).format("DD MMMM YYYY")}{" "}
                                </b>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="row">
                {listLog && listLog?.data?.perPage < listLog?.data?.total && (
                  <div className={`${stylesPag.pagination} table-pagination`}>
                    <Pagination
                      activePage={listLog?.page}
                      itemsCountPerPage={listLog?.data?.perPage}
                      totalItemsCount={listLog?.data?.total}
                      pageRangeDisplayed={3}
                      onChange={(page) => dispatch(setPage(page))}
                      nextPageText={">"}
                      prevPageText={"<"}
                      firstPageText={"<<"}
                      lastPageText={">>"}
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  </div>
                )}

                {listLog ? (
                  <div className={`${stylesPag.rightPag} table-total ml-auto`}>
                    <div className="row mt-4">
                      <div className="col-4 mr-0 mt-3">
                        <select
                          className="form-control cursor-pointer pr-2 "
                          id="exampleFormControlSelect2"
                          defaultValue=""
                          style={{
                            width: "70px",
                            background: "#F3F6F9",
                            borderColor: "#F3F6F9",
                            color: "#9E9E9E",
                          }}
                          onChange={(e) =>
                            dispatch(limitCooporation(e.target.value, token))
                          }
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
                          style={{ color: "#B5B5C3", whiteSpace: "nowrap" }}
                        >
                          Total Data {listLog?.data && listLog?.data?.total}{" "}
                          List Data
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
