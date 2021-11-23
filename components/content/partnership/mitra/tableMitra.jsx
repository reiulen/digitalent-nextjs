import React, { useEffect, useState } from "react";

import Link from "next/link";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";
import Tables from "../../../Table/Table";
import IconSearch from "../../../assets/icon/Search";
import IconEye from "../../../assets/icon/Eye";
import IconDelete from "../../../assets/icon/Delete";
import IconPencil from "../../../assets/icon/Pencil";
import IconAdd from "../../../assets/icon/Add";
import IconArrow from "../../../assets/icon/Arrow";
import AlertBar from "../components/BarAlert";
import PageWrapper from "../../../wrapper/page.wrapper";
import {
  fetchMitra,
  searchByKey,
  deleteMitra,
  setPage,
  setLimit,
  exportFileCSV,
  cancelChangeProvinces,
  changeStatusList,
  reloadTable,
} from "../../../../redux/actions/partnership/mitra.actions";
import LoadingTable from "../../../LoadingTable";

import Swal from "sweetalert2";

const Table = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { success, update } = router.query;

  const allMitra = useSelector((state) => state.allMitra);

  const [keyWord, setKeyWord] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchByKey(keyWord));
  };

  const [isStatusBar, setIsStatusBar] = useState(false);
  const changeListStatus = (token, e, id) => {
    Swal.fire({
      title: "Apakah anda yakin ingin merubah status ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya !",
      dismissOnDestroy: false,
    }).then((result) => {
      if (result.value) {
        let formData = new FormData();
        formData.append("_method", "put");
        formData.append("status", e.target.value);
        dispatch(changeStatusList(token, formData, id));
        setSuccessDelete(false);
        setIsStatusBar(true);
        router.replace("/partnership/mitra", undefined, { shallow: true });
      } else {
        dispatch(reloadTable());
      }
    });
  };

  const [successDelete, setSuccessDelete] = useState(false);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah anda yakin ingin menghapus data mitra ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya !",
      dismissOnDestroy: false,
    }).then(async (result) => {
      if (result.value) {
        dispatch(deleteMitra(token, id));
        setSuccessDelete(true);
        router.replace(`/partnership/mitra`);
      }
    });
  };
  const onNewReset = () => {
    setSuccessDelete(false);
    setIsStatusBar(false);
    router.replace("/partnership/mitra", undefined, { shallow: true });
  };

  useEffect(() => {
    dispatch(fetchMitra(token));
    dispatch(cancelChangeProvinces(token));
  }, [
    dispatch,
    allMitra.keyword,
    allMitra.status_reload,
    allMitra.page,
    allMitra.limit,
    allMitra.card,
    update,
    token,
  ]);

  return (
    <PageWrapper>
      {success ? (
        <AlertBar
          text="Berhasil menyimpan data"
          className="alert-light-success"
          onClick={() => onNewReset()}
        />
      ) : (
        ""
      )}
      {update ? (
        <AlertBar
          text="Berhasil mengubah data"
          className="alert-light-success"
          onClick={() => onNewReset()}
        />
      ) : (
        ""
      )}
      {successDelete ? (
        <AlertBar
          text="Berhasil menghapus data"
          className="alert-light-success"
          onClick={() => onNewReset()}
        />
      ) : (
        ""
      )}
      {isStatusBar ? (
        <AlertBar
          text="Berhasil mengubah data"
          className="alert-light-success"
          onClick={() => onNewReset()}
        />
      ) : (
        ""
      )}
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="d-flex  flex-column flex-xl-row flex-wrap align-items-xl-center justify-content-xl-between pl-xl-8 px-6 py-4">
            <h1 className="card-title font-weight-bolder text-dark mb-0 mt-4 titles-1">
              Master Mitra
            </h1>
            
            <div className="col-12 col-md-5 col-xl-3 ml-n5">
              <Link href="/partnership/mitra/tambah">
                <a className="btn btn-rounded-full bg-blue-primary text-white mt-4 d-flex justify-content-center">
                  <IconAdd
                    className="mr-3"
                    width="16"
                    height="16"
                    fill="rgba(255,255,255,1)"
                  />
                  Tambah Mitra Baru
                </a>
              </Link>
            </div>
           
          </div>

          <div className="card-body pt-0 px-4 px-sm-8">
            <div className="row">
              <div className="col-12 col-md-8 col-xl-4">
                <div className="position-relative overflow-hidden w-100 mt-3">
                  <IconSearch
                    style={{ left: "10" }}
                    className="left-center-absolute"
                  />
                  <input
                    id="kt_datatable_search_query"
                    type="text"
                    className="form-control pl-10"
                    placeholder="Cari..."
                    onChange={(e) => setKeyWord(e.target.value)}
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

              <div className="col-12 col-md-4 col-xl-8 ">
                <div className="d-flex align-items-center justify-content-md-end justify-content-start mt-2">
                  {/* disini sortir modal */}

                  <button
                    type="button"
                    onClick={() => dispatch(exportFileCSV(token))}
                    className="btn btn-rounded-full bg-blue-secondary text-white ml-0"
                    style={{ width: "max-content" }}
                  >
                    Export .xlsx
                  </button>
                </div>
              </div>
            </div>
            {/* </form> */}
            {
              <Tables
                tableHead={
                  <tr>
                    <th className="text-left">No</th>
                    <th className="text-left align-middle">Logo</th>
                    <th className="text-left align-middle">Mitra</th>
                    <th className="text-left align-middle">Status</th>
                    <th className="text-left align-middle">Website</th>
                    <th className="text-left align-middle">Kerjasama</th>
                    <th className="text-left align-middle">Aksi</th>
                  </tr>
                }
                tableBody={
                  allMitra.status === "process" ? (
                    <tr>
                      <td colSpan="7" className="text-center">
                        <LoadingTable />
                      </td>
                    </tr>
                  ) : allMitra.mitraAll.data &&
                    allMitra.mitraAll.data.list_mitras.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        <h4>Data tidak ditemukan</h4>
                      </td>
                    </tr>
                  ) : (
                    allMitra.mitraAll.data &&
                    allMitra.mitraAll.data.list_mitras.map((item, index) => {
                      return (
                        <tr key={index} style={{backgroundColor:item.visit == 0 ?"#f8f8ff":"inherit"}}>
                          <td className="text-left align-middle">
                            {allMitra.page === 1
                              ? index + 1
                              : (allMitra.page - 1) * allMitra.limit +
                                (index + 1)}
                          </td>
                          <td className="align-middle text-left">
                            {!item.agency_logo ? (
                              ""
                            ) : (
                              <Image
                                unoptimized={
                                  process.env.ENVIRONMENT !== "PRODUCTION"
                                }
                                src={
                                  process.env.END_POINT_API_IMAGE_PARTNERSHIP +
                                  item.agency_logo
                                }
                                width={40}
                                height={40}
                                alt="logo"
                              />
                            )}
                          </td>
                           
                          <td className="align-middle text-left text-overflow-ens">
                            {item.user.name}
                         
                          </td>
                          <td className="align-middle text-left ">
                            {item.status == "1" ? (
                              <div className="position-relative w-max-content">
                                <select
                                  name=""
                                  id=""
                                  className="form-control remove-icon-default dropdown-arrows-green"
                                  key={index}
                                  onChange={(e) =>
                                    changeListStatus(token, e, item.id)
                                  }
                                >
                                  <option value="1">Aktif</option>
                                  <option value="0">Tidak Aktif</option>
                                </select>
                                <IconArrow
                                  className="right-center-absolute"
                                  style={{ right: "10px" }}
                                  width="7"
                                  height="7"
                                />
                              </div>
                            ) : (
                              <div className="position-relative w-max-content">
                                <select
                                  name=""
                                  id=""
                                  className="form-control remove-icon-default dropdown-arrows-red-primary  pr-10"
                                  key={index}
                                  onChange={(e) =>
                                    changeListStatus(token, e, item.id)
                                  }
                                >
                                  <option value="0">Tidak Aktif</option>
                                  <option value="1">Aktif</option>
                                </select>
                                <IconArrow
                                  className="right-center-absolute"
                                  style={{ right: "10px" }}
                                  fill="#F65464"
                                  width="7"
                                  height="7"
                                />
                              </div>
                            )}
                          </td>
                          <td className="align-middle text-left text-overflow-ens">
                            {item.website}
                          </td>
                          <td className="align-middle text-left text-overflow-ens">
                            {item.cooperations_count} Kerjasama
                          </td>
                          <td className="align-middle text-left">
                            <div className="d-flex align-items-center">
                              <Link
                                href={{
                                  pathname:
                                    "/partnership/mitra/detail-data-kerjasama-mitra",
                                  query: { id: item.id },
                                }}
                              >
                                <a
                                  className="btn btn-link-action bg-blue-secondary position-relative btn-delete"
                                >
                                  <IconEye
                                    width="14"
                                    height="12"
                                    fill="rgba(255,255,255,1)"
                                  />
                                  <div className="text-hover-show-hapus">
                                    Detail
                                  </div>
                                </a>
                              </Link>

                              <button
                                className="btn btn-link-action bg-blue-secondary mx-3 position-relative btn-delete"
                                onClick={() =>
                                  router.push(
                                    {
                                      pathname: `/partnership/mitra/edit/${item.id}`,
                                    },
                                    undefined,
                                    { shallow: true }
                                  )
                                }
                              >
                                <IconPencil />
                                <div className="text-hover-show-hapus">
                                  Ubah
                                </div>
                              </button>

                              <button
                                className="btn btn-link-action bg-blue-secondary position-relative btn-delete"
                                onClick={() => handleDelete(item.id)}
                              >
                                <IconDelete />
                                <div className="text-hover-show-hapus">
                                  Hapus
                                </div>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )
                }
                pagination={
                  <Pagination
                    activePage={allMitra.page}
                    itemsCountPerPage={allMitra?.mitraAll?.data?.perPage}
                    totalItemsCount={allMitra?.mitraAll?.data?.total}
                    pageRangeDisplayed={3}
                    onChange={(page) => dispatch(setPage(page))}
                    nextPageText={">"}
                    prevPageText={"<"}
                    firstPageText={"<<"}
                    lastPageText={">>"}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                }
                onChangeLimit={(e) => dispatch(setLimit(e.target.value))}
                totalData={allMitra.totalDataMitra}
              />
            }
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Table;
