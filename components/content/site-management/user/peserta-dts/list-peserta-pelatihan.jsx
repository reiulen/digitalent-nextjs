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
import AlertBar from "../../../partnership/components/BarAlert";
import Image from "next/image";
import IconArrow from "../../../../assets/icon/Arrow";

const Table = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const onNewReset = () => {
    router.replace("/site-management/role", undefined, {
      shallow: true,
    });
  };

  // style color
  const colorText = {
    color: "#6C6C6C",
  };
  const listUl = {
    listStyle: "none",
    padding: "0",
    margin: "0",
    marginTop: "1rem",
  };

  const allListPelatihanByPeserta = useSelector(
    (state) => state.allListPelatihanByPeserta
  );

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState(null);


    const listPelatihan =allListPelatihanByPeserta.data.data.map((item, index) => {
      return  <tr key={index}>
      <td className="align-middle text-left">{index + limit * (page - 1) + 1}</td>
      <td className="align-middle text-left">{item.name}</td>
      <td className="align-middle text-left">{item.id}</td>
      <td className="align-middle text-left">
        <div className="position-relative w-max-content">
          <span className="badge badge-success">{item.status}</span>
        </div>
      </td>
      <td className="align-middle text-left">
        <div className="d-flex align-items-center">
          <button
            className="btn btn-link-action bg-blue-secondary position-relative btn-delete"
            onClick={() =>
              router.push(`/site-management/role/ubah-role`)
            }
          >
            <IconPencil width="16" height="16" />
            <div className="text-hover-show-hapus">Ubah</div>
          </button>
          <button
            className="btn btn-link-action bg-blue-secondary ml-3 position-relative btn-delete"
            onClick={() =>
              router.push(`/site-management/role/detail-role`)
            }
          >
            <IconEye width="16" height="16" />
            <div className="text-hover-show-hapus">Detail</div>
          </button>
        </div>
      </td>
    </tr>
    })

  return (
    <PageWrapper>
      <div
        className="col-12 col-xl-12 order-1 p-0"
        style={{ marginLeft: "-10px" }}
      >
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark"
              style={{ fontSize: "24px" }}
            >
              List Data Pelatihan
            </h3>
          </div>
          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-12 col-xl-12">
                  <form
                    // onSubmit={handleSubmit}
                    className="d-flex align-items-center w-100"
                  >
                    <div className="row w-100">
                      <div className="col-12 col-sm-6">
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
                            // onChange={(e) =>
                            //   handleChangeValueSearch(e.target.value)
                            // }
                          />
                          <button
                            type="submit"
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
                  </form>
                </div>
              </div>
            </div>
            <div className="table-page mt-5">
              <div className="table-responsive">
                <table className="table table-separate table-head-custom table-checkable">
                  <thead style={{ background: "#F3F6F9" }}>
                    <tr>
                      <th className="text-left">No</th>
                      <th className="text-left align-middle">Nama Pelatihan</th>
                      <th className="text-left align-middle">ID Pelatihan</th>
                      <th className="text-left align-middle">Status</th>
                      <th className="text-left align-middle">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                   {listPelatihan}
                  </tbody>
                </table>
              </div>

              <div className="row">
                <div className="table-pagination paginate-cs">
                  pagination
                  {/* <Pagination
                    activePage={allMKCooporation.page}
                    itemsCountPerPage={
                      allMKCooporation?.mk_cooporation?.data?.perPage
                    }
                    totalItemsCount={
                      allMKCooporation?.mk_cooporation?.data?.total
                    }
                    pageRangeDisplayed={3}
                    onChange={(page) => dispatch(setPage(page))}
                    nextPageText={">"}
                    prevPageText={"<"}
                    firstPageText={"<<"}
                    lastPageText={">>"}
                    itemclassName="page-item"
                    linkclassName="page-link"
                  /> */}
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
                        Total Data 9 List Data
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
