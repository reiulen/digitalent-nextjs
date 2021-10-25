import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../../wrapper/page.wrapper";
import { useDispatch, useSelector } from "react-redux";
import LoadingTable from "../../../../LoadingTable";
import IconEye from "../../../../assets/icon/Eye";
import IconPencil from "../../../../assets/icon/Pencil";
import IconDelete from "../../../../assets/icon/Delete";
import IconAdd from "../../../../assets/icon/Add";
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
  exportFileCSV
} from "../../../../../redux/actions/site-management/settings/api.actions";
import moment from "moment";
import DatePicker from "react-datepicker";
import IconCalender from "../../../../assets/icon/Calender";
import { RESET_VALUE_SORTIR } from "../../../../../redux/types/site-management/settings/api.type";
const Table = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const listLog = useSelector((state) => state.listLog);
  console.log("listLog", listLog);

  const [valueSearch, setValueSearch] = useState("");
  const handleChangeValueSearch = (value) => {
    setValueSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchCooporation(valueSearch));
  };

  const [froms, setFroms] = useState("");
  const [tos, setTos] = useState("");

  const onChangePeriodeDateStart = (date) => {
    setFroms(moment(date).format("YYYY-MM-DD"));
  };
  const onChangePeriodeDateEnd = (date) => {
    setTos(moment(date).format("YYYY-MM-DD"));
  };

  const handleSubmitSearchMany = (event) => {
    event.preventDefault();
    dispatch(changeDates(froms,tos));
  };

  const resetValueSort = () => {
    setFroms("");
    setTos("")
    dispatch({
      type: RESET_VALUE_SORTIR,
    });
  };

  useEffect(() => {
    dispatch(getDetailLog(router.query.id, token));
  }, [
    dispatch,
    router.query.id,
    listLog.cari,
    listLog.page,
    listLog.limit,
    listLog.from,
    listLog.to,
    token,
  ]);

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark"
              style={{ fontSize: "24px" }}
            >
              Log API
            </h3>
          </div>
          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-12 col-xl-12">
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <form onSubmit={handleSubmit}>
                        <div className="position-relative overflow-hidden w-100 mt-5">
                          <IconSearch
                            style={{ left: "10" }}
                            className="left-center-absolute"
                          />
                          <input
                            type="text"
                            className="form-control pl-10"
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
                        </div>
                      </form>
                    </div>

                    <div className="col-12 col-sm-6">
                      <div className="d-flex flex-wrap align-items-center justify-content-end mt-2">
                        {/* sorotir by modal */}
                        <button
                          type="button"
                          className="avatar item-rtl btn border d-flex align-items-center justify-content-between mt-2"
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

                                <div
                                  className="modal-body text-left"
                                  style={{ height: "400px" }}
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
                                        dateFormat="YYYY-MM-DD"
                                        placeholderText="To"
                                        minDate={moment().toDate()}
                                      />
                                      <IconCalender
                                        className="right-center-absolute"
                                        style={{ right: "10px" }}
                                      />
                                    </div>
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
                                      onClick={(e) => handleSubmitSearchMany(e)}
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

                        {/* btn export */}
                        <button
                          className="btn btn-rounded-full bg-blue-secondary text-white ml-4 mt-2"
                          type="button"
                          onClick={() => dispatch(exportFileCSV(token,router.query.id))}
                        >
                          Export .xlsx
                        </button>
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
                      {listLog?.data?.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="text-center">
                            <h4>Data tidak ditemukan</h4>
                          </td>
                        </tr>
                      ) : (
                        listLog?.data?.map((items, index) => {
                          return (
                            <tr key={index}>
                              <td className="align-middle text-left">
                                {listLog.page === 1
                                  ? index + 1
                                  : (listLog.page - 1) * listLog.limit +
                                    (index + 1)}
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
                <div className="table-pagination paginate-cs">
                  <div className="table-pagination">
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
                </div>

                <div className="table-total ml-auto">
                  <div className="row">
                    <div className="col-4 mr-0 p-0">
                      <select
                        className="form-control mr-5 cursor-pointer"
                        id="exampleFormControlSelect2"
                        defaultValue=""
                        style={{
                          width: "63px",
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
                    <div className="col-8 my-auto">
                      <p
                        className="align-middle mt-3"
                        style={{ color: "#B5B5C3", whiteSpace: "nowrap" }}
                      >
                        Total Data {listLog?.data && listLog?.data?.total} List
                        Data
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Table;
