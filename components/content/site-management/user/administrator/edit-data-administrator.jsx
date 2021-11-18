import React, { useEffect, useState,useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PageWrapper from "../../../../wrapper/page.wrapper";
import { useDispatch, useSelector } from "react-redux";
import IconSearch from "../../../../assets/icon/Search";
import Select from "react-select";
import axios from "axios";
import {
  getDetailAdminSite,
  getListRoles,
  getListUnitWorks,
  getListAcademy,
  getAllListPelatihan,
} from "../../../../../redux/actions/site-management/user/admin-site.action";

const TambahApi = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();
  
  const allUnitWorkList = useSelector((state) => state.allUnitWorkList);
  // console.log("allUnitWorkList",allUnitWorkList)
  
  const allRolesList = useSelector((state) => state.allRolesList);
  // console.log("allRolesList",allRolesList)
  
  const allAcademyList = useSelector((state) => state.allAcademyList);
  // console.log("allAcademyList",allAcademyList)
  
  const allListPelatihan = useSelector((state) => state.allListPelatihan);
  // console.log("allListPelatihan",allListPelatihan)
  
  const detailAdminSite = useSelector((state) => state.detailAdminSite);
  console.log("detailAdminSite",detailAdminSite)

  const [formData, setFormData] = useState({
    name:detailAdminSite?.adminSite?.data?.name,
    email:detailAdminSite?.adminSite?.data?.email,
    status:detailAdminSite?.adminSite?.data?.status,
    password:"",
    confirmPassword:"",
    roleOption:allRolesList?.data?.list_role?.map((items) => {
                    return { ...items, label: items.name, value: items.name };
                  }),
    role:detailAdminSite?.adminSite?.data?.roles?.map((items)=>{
      return {...items,value:items.name,label:items.name}
    }),
    unitWorkOption:allUnitWorkList?.data?.unit_work?.map((items) => {
                    return { ...items, label: items.name, value: items.name };
                  }),
    unitWorksIds:detailAdminSite?.adminSite?.data?.unit_work_ids,
    typeAcces:detailAdminSite?.adminSite?.data?.type_access,
    trainingAccess:detailAdminSite?.adminSite?.data?.training_access,
    academyIds:detailAdminSite?.adminSite?.data?.academy_ids
  })
  // console.log("formData",formData)

  const handleChangeRole = (e) => {
    let data = e.map((items) => {
      return items.id;
    });
    setFormData({...formData,role:data,roleOption:e})
  };
  const handleChangeUnitWork = (e) => {
    let data = e.map((items) => {
      return items.id;
    });
    setFormData({...formData,unitWorksIds:data,unitWorkOption:e})
  };

  useEffect(() => {
    // dispatch(getDetailAdminSite(router.query.id, token));
    dispatch(getListRoles(token));
    dispatch(getListUnitWorks(token));
    dispatch(getListAcademy(token));
    dispatch(getAllListPelatihan(token));
  }, [router.query.id, token,dispatch]);
  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark border-bottom w-100 pb-5 mb-5 mt-5 titles-1">
              Edit Data Administrator
            </h3>
          </div>
          <div className="card-body pt-0">
            <form>
              <div className="form-group">
                <label>Nama Lengkap</label>
                <input
                value={formData.name}
                  type="text"
                  className="form-control"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                value={formData.email}
                  type="email"
                  className="form-control"
                  placeholder="Masukkan email"
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                {detailAdminSite?.adminSite?.data?.status == 1 ?
                
                <select className="form-control">
                  <option value="1">Aktif</option>
                  <option value="0">Tidak Aktif</option>
                </select>
                :
                <select className="form-control">
                  <option value="0">Tidak Aktif</option>
                  <option value="1">Aktif</option>
                </select>
                
              }
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                value={formData.password}
                  type="password"
                  className="form-control"
                  placeholder="Masukkan password"
                />
              </div>
              <div className="form-group">
                <label>Konfirmasi Password</label>
                <input
                value={formData.confirmPassword}
                  type="password"
                  className="form-control"
                  placeholder="Masukkan konfirmasi password"
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <Select
                  value={formData.role}
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder="Pilih data role"
                  isDisabled={false}
                  isLoading={false}
                  isMulti
                  // defaultInputValue={}
                  isClearable={false}
                  isRtl={false}
                  isSearchable={true}
                  name="color"
                  onChange={(e) => handleChangeRole(e)}
                  options={formData.roleOption}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleSelect1">Satuan Kerja</label>
                <Select
                  value={formData.unitWorksIds}
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder="Pilih data satuan kerja"
                  isDisabled={false}
                  isLoading={false}
                  isMulti
                  // defaultInputValue={}
                  isClearable={false}
                  isRtl={false}
                  isSearchable={true}
                  name="color"
                  onChange={(e) => handleChangeUnitWork(e)}
                  options={formData.unitWorkOption}
                />
              </div>{" "}
              {/* hak akses disini */}
              <h3 className="card-title font-weight-bolder text-dark border-bottom w-100 pb-5 mb-5 mt-5 titles-1">
                Hak Akses Pelatihan
              </h3>
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link active"
                    id="home-tab"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    Akademi
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link"
                    id="profile-tab"
                    data-toggle="tab"
                    href="#profile"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Pelatihan
                  </a>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="form-group mt-6">
                    <label htmlFor="exampleSelect1">Status</label>
                    <select className="form-control" id="exampleSelect1">
                      <option>Placeholder</option>
                    </select>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="table-page mt-5">
                    <div className="table-responsive">
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

                      <table className="table table-separate table-head-custom table-checkable mt-5">
                        <thead style={{ background: "#F3F6F9" }}>
                          <tr>
                            <th
                              colSpan="6"
                              className="text-left permision"
                              style={{ textAlignLast: "right" }}
                            >
                              Permission
                            </th>
                          </tr>
                          <tr>
                            <th className="text-left">No</th>
                            <th className="text-left">ID Pelatihan</th>
                            <th className="text-left">Nama Pelatihan</th>
                            <th className="text-left">Accsess</th>
                            <th
                              className="text-right child-permission align-middle"
                              style={{ width: "10rem" }}
                            >
                              Manage
                            </th>
                            <th
                              className="text-right child-permission align-middle"
                              style={{ width: "0" }}
                            >
                              View
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="text-left">1</td>

                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td
                              className="text-right child-permission align-middle"
                              style={{ width: "10rem" }}
                            >
                              <label className="checkbox">
                                <input
                                  type="checkbox"
                                  checked="checked"
                                  name="Checkboxes1"
                                />
                                <span></span>
                              </label>
                            </td>
                            <td
                              className="text-right child-permission align-middle"
                              style={{ width: "0" }}
                            >
                              <label className="checkbox">
                                <input
                                  type="checkbox"
                                  checked="checked"
                                  name="Checkboxes1"
                                />
                                <span></span>
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left">1</td>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td
                              className="text-right child-permission align-middle"
                              style={{ width: "10rem" }}
                            >
                              <label className="checkbox">
                                <input
                                  type="checkbox"
                                  checked="checked"
                                  name="Checkboxes1"
                                />
                                <span></span>
                              </label>
                            </td>
                            <td
                              className="text-right child-permission align-middle"
                              style={{ width: "0" }}
                            >
                              <label className="checkbox">
                                <input
                                  type="checkbox"
                                  checked="checked"
                                  name="Checkboxes1"
                                />
                                <span></span>
                              </label>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="form-group row mt-8">
              <div className="col-sm-12 d-flex justify-content-end">
                <Link href="/site-management/user/administrator" passHref>
                  <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                    Kembali
                  </a>
                </Link>
                <button
                  type="button"
                  className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default TambahApi;
