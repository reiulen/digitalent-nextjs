import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";
import LoadingTable from "../../../../LoadingTable";
import Select from "react-select";

import Swal from "sweetalert2";

import PageWrapper from "../../../../wrapper/page.wrapper";
import CardPage from "../../../../CardPage";
import IconTodoLine from "../../../../assets/icon/TodoLine";
import axios from "axios";
import moment from "moment";

import {
  reqCooperationUser,
  searchCooporation,
  setPage,
  changeValueStatus,
  changeValueKerjaSama,
  fetchListSelectStatus,
  fetchListSelectCooperation,
  changeValueStatusCard,
  limitCooporation,
  deleteCooperation,
} from "../../../../../redux/actions/partnership/user/cooperation.actions";

import { RESET_VALUE_SORTIR } from "../../../../../redux/types/partnership/user/cooperation.type";

// icon
import IconSearch from "../../../../assets/icon/Search";
import IconReview from "../../../../assets/icon/Review";
import IconArrow from "../../../../assets/icon/Arrow";
import IconAdd from "../../../../assets/icon/Add";
import IconClose from "../../../../assets/icon/Close";
import IconFilter from "../../../../assets/icon/Filter";
import IconEye from "../../../../assets/icon/Eye";
import IconDelete from "../../../../assets/icon/Delete";
import AlertBar from "../../components/BarAlert";

const Table = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { successInputProfile, successSubmitDokumentKerjasama, successUpdateStatus } = router.query;
  let selectRefKerjasama = null;
  let selectRefStatus = null;

  const allCooperationUser = useSelector((state) => state.allCooperationUser);

  const [valueSearch, setValueSearch] = useState("");
  const [valueStatus, setValueStatus] = useState("");
  const [valueKerjaSama, setValueKerjaSama] = useState("");

  const [deleteBar, setDeleteBar] = useState(false);
  const onNewReset = () => {
    setDeleteBar(false);
    router.replace("/partnership/user/kerjasama", undefined, { shallow: true });
  };

  const handleChangeValueSearch = (value) => {
    setValueSearch(value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(searchCooporation(valueSearch));
  };

  const handleSubmitSearchMany = (event) => {
    event.preventDefault();
    dispatch(changeValueStatus(valueStatus));
    dispatch(changeValueKerjaSama(valueKerjaSama));
  };

  const resetValueSort = () => {
    selectRefKerjasama.select.clearValue();
    selectRefStatus.select.clearValue();
    dispatch({
      type: RESET_VALUE_SORTIR,
    });
  };

  useEffect(() => {
    dispatch(reqCooperationUser(token));
  }, [
    dispatch,
    allCooperationUser.page,
    allCooperationUser.keyword,
    allCooperationUser.status,
    allCooperationUser.categories_cooporation,
    allCooperationUser.limit,
    allCooperationUser.status,
    allCooperationUser.card,
    allCooperationUser.status_delete,
    token,
  ]);

  const [isProfile, setIsProfile] = useState("");
  const getProfiles = async (token) => {
    try {
      let { data } = await axios.get(`${process.env.END_POINT_API_PARTNERSHIP_MITRA}api/profiles`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (data.data.pic_email === "-") {
        setIsProfile(false);
      } else {
        setIsProfile(true);
      }
    } catch (error) {
      Swal.fire("Gagal", `${error.response.data.message}`, "error");
    }
  };

  const [sumWillExpire, setSumWillExpire] = useState(0);
  const getWillExpire = async (token) => {
    try {
      let { data } = await axios.get(`${process.env.END_POINT_API_PARTNERSHIP_MITRA}api/cooperations/proposal/index?page=1&card=will_expire&limit=1000`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setSumWillExpire(data.data.total);
    } catch (error) {
      Swal.fire("Gagal", `${error.response.data.message}`, "error");
    }
  };

  const cooperationDelete = (id, token) => {
    Swal.fire({
      title: "Apakah anda yakin ingin menghapus data ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya !",
      dismissOnDestroy: false,
    }).then(async (result) => {
      if (result.value) {
        dispatch(deleteCooperation(id, token));
        setDeleteBar(true);
      } else {
        dispatch(reloadTable());
      }
    });
  };

  useEffect(() => {
    dispatch(fetchListSelectStatus(token));
    dispatch(fetchListSelectCooperation(token));
    getProfiles(token);
    getWillExpire(token);
  }, [dispatch, token]);

  return (
    <PageWrapper>
      {deleteBar ? (
        <AlertBar
          text="Berhasil menghapus data"
          className="alert-light-success"
          onClick={() => onNewReset()}
        />
      ) : (
        ""
      )}
      {successInputProfile ? (
        <AlertBar
          text="Berhasil menyimpan data"
          className="alert-light-success"
          onClick={() => onNewReset()}
        />
      ) : (
        ""
      )}
      {successSubmitDokumentKerjasama ? (
        <AlertBar
          text="Berhasil menyimpan data"
          className="alert-light-success"
          onClick={() => onNewReset()}
        />
      ) : (
        ""
      )}
      {successUpdateStatus ? (
        <AlertBar
          text="Berhasil membatalkan kerjasama"
          className="alert-light-success"
          onClick={() => onNewReset()}
        />
      ) : (
        ""
      )}
      <div>
        <div className="row pl-0 ml-n7 pr-3">
          {/* card Kerjasama Aktif */}
          <div className="col-12 col-md-6 col-lg-6 col-xl-4">
            <CardPage
              background="bg-light-success "
              icon="Done-circle1.svg"
              color="#ffffff"
              value={allCooperationUser.totalDataActive}
              titleValue=""
              title="Kerjasama Aktif"
              publishedVal="1"
              routePublish={() => dispatch(changeValueStatusCard("active"))}
              backgroundCard="/assets/icon/clipboard-check-green.svg"
            />
          </div>
          
          {/* card Pengajuan Kerjasama */}
          <div className="col-12 col-md-6 col-lg-6 col-xl-4">
            <CardPage
              background="bg-light-warning"
              icon="Info-circle.svg"
              color="#ffffff"
              value={allCooperationUser.totalDataAnother}
              titleValue=""
              title="Pengajuan Kerjasama"
              publishedVal="1"
              routePublish={() => dispatch(changeValueStatusCard("submission"))}
              backgroundCard="/assets/icon/clipboard-list-yellow.svg"
            />
          </div>
          
          {/* card Kerjasama Akan Habis */}
          <div className="col-12 col-xl-4">
            <CardPage
              background="bg-light-danger"
              icon="Error-circle.svg"
              color="#ffffff"
              value={sumWillExpire}
              titleValue=""
              title="Kerjasama akan Habis"
              publishedVal="1"
              routePublish={() => dispatch(changeValueStatusCard("will_expire"))}
              backgroundCard="/assets/icon/clipboard-cross-red.svg"
            />
          </div>
        </div>
      </div>

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="d-flex flex-wrap align-items-center justify-content-between p-8">
            <h1 className="card-title font-weight-bolder text-dark titles-1">Kerjasama</h1>

            {isProfile === "" ? (
              ""
            ) : isProfile === false ? (
              <Link
                href={{
                  pathname: "/partnership/user/profile-lembaga",
                  query: { isProfile: false },
                }}
                passHref
              >
                <a className="btn btn-rounded-full bg-blue-primary text-white">
                  <IconAdd className="mr-3" width="18" height="16" />
                  Tambah kerjasama
                </a>
              </Link>
            ) : (
              <Link href="/partnership/user/kerjasama/submit-kerjasama" passHref>
                <a className="btn btn-rounded-full bg-blue-primary text-white">
                  <IconAdd className="mr-3" width="18" height="16" />
                  Tambah kerjasama
                </a>
              </Link>
            )}
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-12 col-xl-12">
                  <div className="row mb-3">
                    <div className="col-12 col-xl-4 ">
                      <div className="position-relative overflow-hidden w-100 mt-5">
                        <IconSearch style={{ left: "10" }} className="left-center-absolute" />
                        <input
                          id="kt_datatable_search_query"
                          type="text"
                          className="form-control pl-10"
                          placeholder="Cari..."
                          onChange={(e) => handleChangeValueSearch(e.target.value)}
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
                    <div className="col-12 col-xl-8 ">
                      <div className="d-flex flex-wrap align-items-center justify-content-xl-end mt-2">
                        {/* sorotir by modal */}
                        <button
                          className="avatar item-rtl btn border col-12 col-xl-4 d-flex align-items-center justify-content-between mt-2 mt-xl-0 mt-7"
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                          style={{ color: "#464646", minWidth: "230px" }}
                          type="button"
                        >
                          <div className="d-flex align-items-center">
                            <IconFilter className="mr-3" />
                            Pilih Filter
                          </div>
                          <IconArrow fill="#E4E6EF" width="11" height="11" />
                        </button>
                        {/* modal */}
                        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                          <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">
                                  Filter
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                  <IconClose />
                                </button>
                              </div>

                              <div className="modal-body text-left" style={{ height: "400px" }}>
                                <div className="fv-row mb-10">
                                  <label className="required fw-bold fs-6 mb-2">Kategori</label>
                                  <Select
                                    ref={(ref) => (selectRefKerjasama = ref)}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Semua"
                                    defaultValue={allCooperationUser.stateListKerjaSama[0]}
                                    isDisabled={false}
                                    isLoading={false}
                                    isClearable={false}
                                    isRtl={false}
                                    isSearchable={true}
                                    name="color"
                                    onChange={(e) => setValueKerjaSama(e?.cooperation_categories)}
                                    options={allCooperationUser.stateListKerjaSama}
                                  />
                                </div>
                                <div className="fv-row mb-10">
                                  <label className="required fw-bold fs-6 mb-2">Status</label>
                                  <Select
                                    ref={(ref) => (selectRefStatus = ref)}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Semua"
                                    defaultValue={allCooperationUser.stateListStatus[0]}
                                    isDisabled={false}
                                    isLoading={false}
                                    isClearable={false}
                                    isRtl={false}
                                    isSearchable={true}
                                    name="color"
                                    onChange={(e) => setValueStatus(e?.name_en)}
                                    options={allCooperationUser.stateListStatus}
                                  />
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
                                  <button data-dismiss="modal" className="btn btn-sm btn-rounded-full bg-blue-primary text-white " type="button" onClick={(e) => handleSubmitSearchMany(e)}>
                                    Terapkan
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* end modal */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="table-page mt-5">
              <div className="table-responsive">
                {allCooperationUser.statusLoad === "process" ? (
                  <LoadingTable />
                ) : (
                  <table 
                    className="table table-separate table-head-custom table-checkable" 
                  >
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-left">No</th>
                        <th className="text-left align-middle">Judul Kerjasama</th>
                        <th className="text-left align-middle">Periode</th>
                        <th className="text-left align-middle">Tanggal Awal Kerjasama</th>
                        <th className="text-left align-middle">Tanggal Selesai Kerjasama</th>
                        <th className="text-left align-middle">Status</th>
                        <th 
                          className="text-left align-middle"
                          style={{minWidth:"8rem"}}
                        >
                          Aksi
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {allCooperationUser.cooperationMitra.data && allCooperationUser?.cooperationMitra?.data?.list_cooperations?.length === 0 ? (
                        valueSearch ?
                            <tr>
                              <td colSpan="8" className="text-center">
                                <h4>Data tidak ditemukan</h4>
                              </td>
                            </tr>
                          :
                            <tr>
                              <td colSpan="8" className="text-center">
                                <h4>Data kosong</h4>
                              </td>
                            </tr>
                      ) : (
                        allCooperationUser?.cooperationMitra?.data?.list_cooperations?.map((items, index) => {
                          return (
                            <tr key={index}>
                              <td>{allCooperationUser.page === 1 ? index + 1 : (allCooperationUser.page - 1) * allCooperationUser.limit + (index + 1)}</td>
                              <td className="d-flex justify-content-start">
                                <div className="d-flex align-items-start justify-content-center flex-column">
                                  <p className="p-part-t text-overflow-ens">{items.title}</p>
                                  <p className="p-part-d text-overflow-ens">
                                    ({items.cooperation_category === null ? "tidak ada kategori kerjasama" : items.cooperation_category.cooperation_categories})
                                  </p>
                                </div>
                                <br />
                              </td>
                              <td className="align-middle text-left">
                                <p className="p-part-t">
                                  {items.period} {items.period_unit}
                                </p>{" "}
                              </td>
                              <td className="align-middle text-left">
                                <p className="p-part-t">{items.period_date_start === null ? "-" : moment(items.period_date_start).format("DD MMMM YYYY")}</p>
                              </td>
                              <td className="align-middle text-left">
                                <p className="p-part-t">{items.period_date_end === null ? "-" : moment(items.period_date_end).format("DD MMMM YYYY")}</p>
                              </td>
                              <td className="align-middle text-left">
                                {items.status.name === "aktif" && moment(items.period_date_start).format("YYYY MM DD") > moment().format("YYYY MM DD") ? (
                                  <div className="position-relative w-max-content">
                                    <select name="" id="" disabled className="form-control remove-icon-default dropdown-arrows-green" key={index}>
                                      <option value="1">Disetujui</option>
                                      <option value="2">Tidak Aktif</option>
                                    </select>
                                  </div>
                                ) : items.status.name === "aktif" && moment(items.period_date_start).format("YYYY MM DD") <= moment().format("YYYY MM DD") ? (
                                  <div className="position-relative w-max-content">
                                    <select disabled name="" id="" className="form-control remove-icon-default dropdown-arrows-green" key={index}>
                                      <option value="1">Aktif</option>
                                      <option value="2">Tidak Aktif</option>
                                    </select>
                                  </div>
                                ) : items.status.name === "tidak aktif" ? (
                                  <div className="position-relative w-max-content">
                                    <select disabled name="" id="" className="form-control remove-icon-default dropdown-arrows-red-primary  pr-10" key={index}>
                                      <option value="2">Tidak Aktif</option>
                                      <option value="1">Aktif</option>
                                    </select>
                                  </div>
                                ) : items.status.name === "pengajuan-review" ? (
                                  <div className="position-relative w-max-content">
                                    <select disabled name="" id="" className="form-control remove-icon-default dropdown-arrows-blue">
                                      <option value="">Pengajuan - Review</option>
                                    </select>
                                  </div>
                                ) : items.status.name === "pengajuan-revisi" ? (
                                  <div className="position-relative w-max-content">
                                    <select disabled name="" id="" className="form-control remove-icon-default dropdown-arrows-yellow">
                                      <option value="">Pengajuan - Revisi</option>
                                    </select>
                                  </div>
                                ) : items.status.name === "pengajuan-pembahasan" ? (
                                  <div className="position-relative w-max-content">
                                    <select disabled name="" id="" className="form-control remove-icon-default dropdown-arrows-blue pr-10">
                                      <option value="5">Pengajuan-Pembahasan</option>
                                      <option value="6">Pengajuan-Selesai</option>
                                    </select>
                                  </div>
                                ) : items.status.name === "pengajuan-selesai" ? (
                                  <div className="position-relative w-max-content">
                                    <select disabled name="" id="" className="form-control remove-icon-default dropdown-arrows-blue">
                                      <option value="">Pengajuan - Selesai</option>
                                    </select>
                                  </div>
                                ) : items.status.name === "pengajuan-document" ? (
                                  <div className="position-relative w-max-content">
                                    <select disabled name="" id="" className="form-control remove-icon-default dropdown-arrows-blue">
                                      <option value="">Pengajuan - Dokumen</option>
                                    </select>
                                  </div>
                                ) : (
                                  <div className="position-relative w-max-content">
                                    <select disabled name="" id="" className="form-control remove-icon-default dropdown-arrows-red-primary">
                                      <option value="">Ditolak</option>
                                    </select>
                                  </div>
                                )}
                              </td>

                              <td className="align-middle text-left">
                                <div className="d-flex align-items-center">
                                  {items.status.name === "aktif" && moment(items.period_date_start).format("YYYY MM DD") > moment().format("YYYY MM DD") ? (
                                    <div className="d-flex align-items-center">
                                      <button
                                        className="btn btn-link-action bg-blue-secondary position-relative btn-delete mr-3"
                                        onClick={() => router.push(`/partnership/user/kerjasama/${items.id}`)}
                                      >
                                        <IconEye width="16" height="16" fill="rgba(255,255,255,1)" />
                                        <div className="text-hover-show-hapus">Detail</div>
                                      </button>
                                      <Link
                                        href={{
                                          pathname: "/partnership/user/kerjasama/hasil",
                                          query: {
                                            statusKerjasama: items.status.name,
                                            id: items.id,
                                          },
                                        }}
                                      >
                                        <a className="btn btn-link-action bg-blue-secondary position-relative btn-delete">
                                          <IconReview />
                                          <div className="text-hover-show-hapus">Review</div>
                                        </a>
                                      </Link>
                                    </div>
                                  ) : items.status.name === "aktif" && moment(items.period_date_start).format("YYYY MM DD") <= moment().format("YYYY MM DD") ? (
                                    <div className="d-flex align-items-center">
                                      <button
                                        className="btn btn-link-action bg-blue-secondary position-relative btn-delete mr-3"
                                        onClick={() => router.push(`/partnership/user/kerjasama/${items.id}`)}
                                      >
                                        <IconEye width="16" height="16" fill="rgba(255,255,255,1)" />
                                        <div className="text-hover-show-hapus">Detail</div>
                                      </button>
                                      <Link
                                        href={{
                                          pathname: "/partnership/user/kerjasama/hasil",
                                          query: {
                                            statusKerjasama: items.status.name,
                                            id: items.id,
                                          },
                                        }}
                                      >
                                        <a className="btn btn-link-action bg-blue-secondary position-relative btn-delete">
                                          <IconTodoLine />
                                          <div className="text-hover-show-hapus">Review</div>
                                        </a>
                                      </Link>
                                    </div>
                                  ) : items.status.name === "tidak aktif" ? (
                                    <div className="d-flex align-items-center">
                                      <Link
                                        href={{
                                          pathname: "/partnership/user/kerjasama/hasil",
                                          query: {
                                            statusKerjasama: items.status.name,
                                            id: items.id,
                                          },
                                        }}
                                      >
                                        <a className="btn btn-link-action bg-blue-secondary position-relative btn-delete mr-3">
                                          <IconEye width="16" height="16" fill="rgba(255,255,255,1)" />
                                          <div className="text-hover-show-hapus">Review</div>
                                        </a>
                                      </Link>

                                      <button className="btn btn-link-action bg-blue-secondary position-relative btn-delete" onClick={() => cooperationDelete(items.id)}>
                                        <IconDelete width="16" height="16" />
                                        <div className="text-hover-show-hapus">Hapus</div>
                                      </button>
                                    </div>
                                  ) : items.status.name === "pengajuan-review" ? (
                                    <Link
                                      href={{
                                        pathname: "/partnership/user/kerjasama/review-kerjasama",
                                        query: { id: items.id },
                                      }}
                                      passHref
                                    >
                                      <a className="btn btn-link-action bg-blue-secondary position-relative btn-delete">
                                        <IconReview />
                                        <div className="text-hover-show-hapus">Review</div>
                                      </a>
                                    </Link>
                                  ) : items.status.name === "pengajuan-revisi" ? (
                                    <Link
                                      href={{
                                        pathname: "/partnership/user/kerjasama/review-list-kerjasama",
                                        query: { id: items.id },
                                      }}
                                      passHref
                                    >
                                      <a className="btn btn-link-action bg-blue-secondary position-relative btn-delete">
                                        <IconReview />
                                        <div className="text-hover-show-hapus">Review</div>
                                      </a>
                                    </Link>
                                  ) : items.status.name === "pengajuan-pembahasan" ? (
                                    <Link
                                      href={{
                                        pathname: "/partnership/user/kerjasama/pembahasan",
                                        query: { id: items.id },
                                      }}
                                      passHref
                                    >
                                      <a className="btn btn-link-action bg-blue-secondary position-relative btn-delete">
                                        <IconReview />
                                        <div className="text-hover-show-hapus">Review</div>
                                      </a>
                                    </Link>
                                  ) : items.status.name === "pengajuan-selesai" ? (
                                    <Link
                                      href={{
                                        pathname: "/partnership/user/kerjasama/pembahasan",
                                        query: { id: items.id },
                                      }}
                                      passHref
                                    >
                                      <a className="btn btn-link-action bg-blue-secondary position-relative btn-delete">
                                        <IconReview />
                                        <div className="text-hover-show-hapus">Review</div>
                                      </a>
                                    </Link>
                                  ) : items.status.name === "pengajuan-document" ? (
                                    <Link
                                      href={{
                                        pathname: "/partnership/user/kerjasama/review-dokumen-kerjasama",
                                        query: { id: items.id },
                                      }}
                                      passHref
                                    >
                                      <a className="btn btn-link-action bg-blue-secondary position-relative btn-delete">
                                        <IconReview />
                                        <div className="text-hover-show-hapus">Review</div>
                                      </a>
                                    </Link>
                                  ) : (
                                    <div className="d-flex align-items-center">
                                      <Link
                                        href={{
                                          pathname: "/partnership/user/kerjasama/hasil",
                                          query: {
                                            statusKerjasama: items.status.name,
                                            id: items.id,
                                          },
                                        }}
                                      >
                                        <a className="btn btn-link-action bg-blue-secondary position-relative btn-delete mr-3">
                                          <IconEye width="16" height="16" fill="rgba(255,255,255,1)" />
                                          <div className="text-hover-show-hapus">Review</div>
                                        </a>
                                      </Link>
                                      <button className="btn btn-link-action bg-blue-secondary position-relative btn-delete" onClick={() => cooperationDelete(items.id)}>
                                        <IconDelete width="16" height="16" />
                                        <div className="text-hover-show-hapus">Hapus</div>
                                      </button>
                                    </div>
                                  )}
                                </div>
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
                <div className="table-pagination col-12 col-md-8">
                  <Pagination
                    activePage={allCooperationUser.page}
                    itemsCountPerPage={allCooperationUser?.cooperationMitra?.data?.perPage}
                    totalItemsCount={allCooperationUser?.cooperationMitra?.data?.total}
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
                <div className="table-total col-12 col-md-4 d-flex justify-content-md-end ml-md-0 ml-4">
                  <div className="row mt-4">
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
                        onChange={(e) => dispatch(limitCooporation(e.target.value))}
                      >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                      </select>
                    </div>
                    <div className="col-8 my-auto">
                      <p className="align-middle mt-3" style={{ color: "#B5B5C3" }}>
                        Total Data {allCooperationUser.cooperationMitra.data && allCooperationUser.cooperationMitra.data.total}
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
