import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../wrapper/page.wrapper";
import { useDispatch, useSelector } from "react-redux";
import LoadingTable from "../../../LoadingTable";
import IconEye from "../../../assets/icon/Eye";
import IconPencil from "../../../assets/icon/Pencil";
import IconDelete from "../../../assets/icon/Delete";
import IconAdd from "../../../assets/icon/Add";
import IconSearch from "../../../assets/icon/Search";
import AlertBar from "../../partnership/components/BarAlert";
import Image from "next/image";

import {
  getDetailExportData,
  setPage,
  limitCooporation,
  searchCooporation,
  exportFileCSV,
} from "../../../../redux/actions/site-management/export-data.actions";
import moment from "moment";

const Table = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const detailExportData = useSelector((state) => state.detailExportData);
  console.log("detailExportData", detailExportData);

  const [valueSearch, setValueSearch] = useState("");
  const handleChangeValueSearch = (value) => {
    setValueSearch(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(searchCooporation(valueSearch));
  };

  useEffect(() => {
    dispatch(getDetailExportData(router.query.id, token));
  }, [
    dispatch,
    detailExportData.cari,
    detailExportData.page,
    detailExportData.limit,
    token,
    router.query.id,
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
              Export Data
            </h3>
          </div>
          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="d-flex align-items-center w-100">
                    <div className="position-relative overflow-hidden w-100">
                      <IconSearch
                        style={{ left: "10" }}
                        className="left-center-absolute"
                      />
                      <input
                        id="kt_datatable_search_query"
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
                  </div>
                </div>
              </div>
            </div>
            <div className="table-page mt-5">
              <div className="table-responsive">
                {detailExportData.status === "process" ? (
                  <LoadingTable />
                ) : (
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-left">No</th>
                        <th className="text-left align-middle">Nama Peserta</th>
                        <th className="text-left align-middle">Pelatihan</th>
                        <th className="text-left align-middle">
                          Tanggal Pelatihan
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {detailExportData.data.export.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            <h4>Data tidak ditemukan</h4>
                          </td>
                        </tr>
                      ) : (
                        detailExportData.data.export.map((items, index) => {
                          return (
                            <tr key={index}>
                              <td className="align-middle text-left">
                                {detailExportData.page === 1
                                  ? index + 1
                                  : (detailExportData.page - 1) *
                                      detailExportData.limit +
                                    (index + 1)}
                              </td>
                              <td className="align-middle text-left">
                                {items.name}
                              </td>
                              <td className="align-middle text-left">
                                {items.training}
                              </td>
                              <td className="align-middle text-left">
                                {moment(items.training_date).format(
                                  "DD MMMM YYYY"
                                )}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                )}
              </div>

              {/* start footer btn */}
              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link href="/site-management/export-data" passHref>
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
                    </a>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
                    onClick={() =>
                      dispatch(exportFileCSV(router.query.id, token))
                    }
                  >
                    Export Data
                  </button>
                </div>
              </div>
              {/* end footer btn */}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Table;
