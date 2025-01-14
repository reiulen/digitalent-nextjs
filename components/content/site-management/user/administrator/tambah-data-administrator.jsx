import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PageWrapper from "../../../../wrapper/page.wrapper";
import { useSelector, useDispatch } from "react-redux";
import IconSearch from "../../../../assets/icon/Search";
import Select from "react-select";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";
import {
  getDetailAdminSite,
  getListRoles,
  getListUnitWorks,
  getListAcademy,
  getAllListPelatihan,
  searchCooporation
} from "../../../../../redux/actions/site-management/user/admin-site.action";
import Cookies from 'js-cookie'

const TambahApi = ({ token }) => {
  const router = useRouter();
  let dispatch = useDispatch();

  const [name, setName] = useState(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [roleOption, setRoleOption] = useState([]);
  const [role, setRole] = useState([]);
  const [unitWork, setUnitWork] = useState([]);
  const [unitWorkOption, setUnitWorkOption] = useState([]);
  const [statusAcademy, setStatusAcademy] = useState([]);
  const [typeAccess, setTypeAccess] = useState("akademi");
  const [search, setSearch] = useState(null);

  const [pelatihan, setPelatihan] = useState([]);
  const allUnitWorkList = useSelector((state) => state.allUnitWorkList);
  const allRolesList = useSelector((state) => state.allRolesList);
  const allAcademyList = useSelector((state) => state.allAcademyList);
  const [, forceUpdate] = useState();

  const allListPelatihan = useSelector((state) => state.allListPelatihan);
  const sortListPelatihan = allListPelatihan.data.map((items) => {
    return {
      ...items,
      manage: false,
      view: false,
      allSelect: false,
    };
  })

  useEffect(() => {
    if(allListPelatihan){
      let cari = []
      allListPelatihan.data.map((items) => {
        const val = {
          ...items,
          manage: false,
          view: false,
          allSelect: false,
        };
        cari.push(val)
      })
      setSortPelatihan(cari)
    }
  }, [allListPelatihan])

  const [sortPelatihan, setSortPelatihan] = useState(sortListPelatihan)

  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

  const handlerShowPassword = (value) => {
    setHidePassword(value);
    var input = document.getElementById("input-password");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  };

  const handlerShowPasswordConfirm = (value) => {
    setHidePasswordConfirm(value);
    var input = document.getElementById("confirm-input-password");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  };

  const changeListAcademy = (e) => {
    setStatusAcademy(e);
  };

  const handleChangePelatihan = (e, index) => {
    let _temp = [...sortPelatihan];
    if (e.target.name === "select-all") {
      if (_temp[index].allSelect) {
        _temp[index] = {
          ..._temp[index],
          allSelect: false,
          view: false,
          manage: false,
        };
      } else {
        _temp[index] = {
          ..._temp[index],
          allSelect: true,
          view: true,
          manage: true,
        };
      }
    } else if (e.target.name === "select-manage") {
      if (_temp[index].manage) {
        _temp[index] = { ..._temp[index], manage: false };
      } else {
        _temp[index] = { ..._temp[index], manage: true };
      }
    } else {
      if (_temp[index].view) {
        _temp[index] = { ..._temp[index], view: false };
      } else {
        _temp[index] = { ..._temp[index], view: true };
      }
    }
    setSortPelatihan(_temp);
  };

  const handleSubmit = async () => {
    let newData = sortPelatihan?.map((items) => {
      return { ...items, training_id: items.value };
    });

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password harus sama dengan Confirmation Password !",
      });
    } else {
      if (simpleValidator.current.allValid()) {
        Swal.fire({
          title: "Apakah anda yakin simpan ?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Batal",
          confirmButtonText: "Ya !",
          dismissOnDestroy: false,
        }).then(async (result) => {
          if (result.value) {
            if (typeAccess === "akademi") {
              const sendData = {
                name: name,
                email: email,
                password: password,
                password_confirmation: confirmPassword,
                role: role,
                unit_work_ids: unitWork,
                type_access: typeAccess,

                academy_ids: statusAcademy.map((items) => {
                  return items.value;
                }),
                status: status,
              };
              try {
                let { data } = await axios.post(
                  `${process.env.END_POINT_API_SITE_MANAGEMENT}/api/user/store`,
                  sendData,
                  {
                    headers: {
                      authorization: `Bearer ${token}`,
                      "Permission": Cookies.get("token_permission")
                    },
                  }
                );

                Swal.fire("Berhasil", "Data berhasil disimpan", "success").then(
                  () => {
                    router.push(`/site-management/user/administrator`);
                  }
                );
              } catch (error) {
                Swal.fire(
                  "Gagal simpan",
                  `${error.response.data.message}`,
                  "error"
                );
              }
            } else {
              const trainings = newData.map((item) => {
                return {
                  id: item.value,
                  view: item.view === true ? 1 : 0,
                  manage: item.manage === true ? 1 : 0,
                };
              });
              const sendData = {
                name: name,
                email: email,
                password: password,
                password_confirmation: confirmPassword,
                role: role,
                unit_work_ids: unitWork,
                type_access: typeAccess,
                training_access: trainings,
                status: 1,
              };
              try {
                let { data } = await axios.post(
                  `${process.env.END_POINT_API_SITE_MANAGEMENT}/api/user/store`,
                  sendData,
                  {
                    headers: {
                      authorization: `Bearer ${token}`,
                      "Permission": Cookies.get("token_permission")
                    },
                  }
                );

                Swal.fire("Berhasil", "Data berhasil disimpan", "success").then(
                  () => {
                    router.push(`/site-management/user/administrator`);
                  }
                );
              } catch (error) {
                Swal.fire(
                  "Gagal simpan",
                  `${error.response.data.message}`,
                  "error"
                );
              }
            }
          }
        });
      } else {
        simpleValidator.current.showMessages();
        forceUpdate(1);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Isi data dengan benar !",
        });
      }
    }
  };

  const handleChangeRole = (e) => {
    let data = e.map((items) => {
      return items.id;
    });
    setRole(data);
    setRoleOption(e);
  };
  const handleChangeUnitWork = (e) => {
    let data = e.map((items) => {
      return items.id;
    });
    setUnitWork(data);
    setUnitWorkOption(e);
  };

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark border-bottom w-100 pb-5 mb-5 mt-5 titles-1">
              Tambah Data Administrator
            </h3>
          </div>
          <div className="card-body pt-0 px-4 px-sm-8">
            {/* <form> */}
            <div className="form-group">
              <label>Nama Lengkap</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Masukkan nama lengkap"
                onBlur={(e) => {
                  simpleValidator.current.showMessageFor("name");
                }}
              />
              {simpleValidator.current.message("name", name, "required", {
                className: "text-danger",
              })}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value.replace(/[^A-Za-z0-9@._ ]/g, ""))
                }
                type="email"
                className="form-control"
                placeholder="Masukkan email"
                onBlur={(e) => {
                  simpleValidator.current.showMessageFor("email");
                }}
              />
              {simpleValidator.current.message("email", email, "required", {
                className: "text-danger",
              })}
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={status}
                className="form-control"
                onChange={(e) => setStatus(e.target.value)}
                onBlur={(e) => {
                  simpleValidator.current.showMessageFor("status");
                }}
              >
                <option value="" selected disabled hidden>
                  Pilih status
                </option>
                <option value="1">Aktif</option>
                <option value="0">Tidak Aktif</option>
              </select>
              {simpleValidator.current.message("status", status, "required", {
                className: "text-danger",
              })}
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="position-relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="input-password"
                  className="form-control"
                  placeholder="Masukkan password"
                  onBlur={(e) => {
                    simpleValidator.current.showMessageFor("password");
                  }}
                />
                {hidePassword === true ? (
                  <i
                    className="ri-eye-fill right-center-absolute cursor-pointer"
                    style={{ right: "10px" }}
                    onClick={() => handlerShowPassword(false)}
                  />
                ) : (
                  <i
                    className="ri-eye-off-fill right-center-absolute cursor-pointer"
                    style={{ right: "10px" }}
                    onClick={() => handlerShowPassword(true)}
                  />
                )}
              </div>
              {simpleValidator.current.message(
                "password",
                password,
                "required",
                {
                  className: "text-danger",
                }
              )}
              <p style={{ color: "#b7b5cf" }}>
                Min 8 Karakter,
                <br />
                Case Sensitivity (min t.d 1 Uppercase, 1 lowercase)
                <br />
                Min 1 Simbol dan Angka
              </p>
            </div>
            <div className="form-group mb-2">
              <label>Konfirmasi Password</label>
              <div className="position-relative">
                <input
                  value={confirmPassword}
                  id="confirm-input-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  className="form-control"
                  placeholder="Masukkan konfirmasi password"
                  onBlur={(e) => {
                    simpleValidator.current.showMessageFor("confirmPassword");
                  }}
                />
                {hidePasswordConfirm === true ? (
                  <i
                    className="ri-eye-fill right-center-absolute cursor-pointer"
                    style={{ right: "10px" }}
                    onClick={() => handlerShowPasswordConfirm(false)}
                  />
                ) : (
                  <i
                    className="ri-eye-off-fill right-center-absolute cursor-pointer"
                    style={{ right: "10px" }}
                    onClick={() => handlerShowPasswordConfirm(true)}
                  />
                )}
              </div>
              {simpleValidator.current.message(
                "confirmPassword",
                confirmPassword,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </div>
            <div className="form-group">
              <label>Role</label>
              <Select
                value={roleOption}
                className="basic-single"
                classNamePrefix="select"
                placeholder="Pilih data role"
                isDisabled={false}
                isLoading={false}
                isMulti
                isClearable={false}
                isRtl={false}
                isSearchable={true}
                name="color"
                onChange={(e) => handleChangeRole(e)}
                options={allRolesList?.data?.list_role
                  ?.filter((items) => {
                    if (items.status === 1) {
                      return {
                        ...items,
                        label: items.name,
                        value: items.name,
                      };
                    }
                  })
                  .map((item) => {
                    return { ...item, label: item.name, value: item.name };
                  })}
                onBlur={(e) => {
                  simpleValidator.current.showMessageFor("roleOption");
                }}
              />
              {simpleValidator.current.message(
                "roleOption",
                roleOption,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </div>
            <div className="form-group">
              <label>Satuan Kerja</label>
              <Select
                value={unitWorkOption}
                className="basic-single"
                classNamePrefix="select"
                placeholder="Pilih data satuan kerja"
                isDisabled={false}
                isLoading={false}
                isMulti
                isClearable={false}
                isRtl={false}
                isSearchable={true}
                name="color"
                onChange={(e) => handleChangeUnitWork(e)}
                options={allUnitWorkList?.data?.unit_work
                  ?.filter((items) => {
                    if (items.status === "1") {
                      return {
                        ...items,
                        label: items.name,
                        value: items.name,
                      };
                    }
                  })
                  .map((item) => {
                    return { ...item, label: item.name, value: item.name };
                  })}
                onBlur={(e) => {
                  simpleValidator.current.showMessageFor("unitWorkOption");
                }}
              />
              {simpleValidator.current.message(
                "unitWorkOption",
                unitWorkOption,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </div>{" "}
            {/* hak akses disini */}
            <h3 className="card-title font-weight-bolder text-dark border-bottom w-100 pb-5 mb-5 mt-5 titles-1">
              Hak Akses Pelatihan
            </h3>
            <ul
              className="nav nav-tabs tabs-admin-site"
              id="myTab"
              role="tablist"
            >
              <li
                className="nav-item position-relative"
                role="presentation"
                onClick={() => setTypeAccess("akademi")}
              >
                <a
                  className="nav-link active"
                  id="home-tab"
                  data-toggle="tab"
                  href="#home"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  By Akademi
                </a>
              </li>
              <li
                className="nav-item position-relative"
                role="presentation"
                onClick={() => setTypeAccess("pelatihan")}
              >
                <a
                  className="nav-link"
                  id="profile-tab"
                  data-toggle="tab"
                  href="#profile"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  By Pelatihan
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
                  <label>Akademi</label>
                  <Select
                    value={statusAcademy}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Pilih Akademi"
                    isMulti
                    isDisabled={false}
                    isLoading={false}
                    isClearable={false}
                    isRtl={false}
                    isSearchable={true}
                    name="color"
                    onChange={(e) => changeListAcademy(e)}
                    options={allAcademyList.data.data}
                  />
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
                          <div className="d-flex align-items-center w-100">
                            <div className="row w-100">
                              <div className="col-12 col-sm-6">
                                <div className="position-relative overflow-hidden w-100">
                                  <form
                                    onSubmit={(e) => {
                                      e.preventDefault();
                                      dispatch(
                                        getAllListPelatihan(token, search)
                                      );
                                    }}
                                  >
                                    <IconSearch
                                      style={{ left: "10" }}
                                      className="left-center-absolute"
                                    />
                                    <input
                                      id="kt_datatable_search_query"
                                      type="text"
                                      value={search}
                                      className="form-control pl-10"
                                      placeholder="Ketik disini untuk Pencarian..."
                                      onChange={(e) =>
                                        setSearch(e.target.value)
                                      }
                                    />
                                    <button
                                      type="button"
                                      className="btn bg-blue-primary text-white right-center-absolute"
                                      style={{
                                        borderTopLeftRadius: "0",
                                        borderBottomLeftRadius: "0",
                                      }}
                                      onClick={(e) => {
                                        dispatch(
                                          getAllListPelatihan(token, search)
                                        );
                                      }}
                                    >
                                      Cari
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ height: '340px', overflowY: 'auto' }}>
                      <table className="table table-separate table-head-custom table-checkable mt-5">
                        <thead style={{ backgroundColor: "#F2F7FC" }}>
                          <tr>
                            <th
                              className="align-middle fz-16 fw-600"
                            >
                              No
                            </th>
                            <th
                              className="align-middle fz-16 fw-600"
                            >
                              ID Pelatihan
                            </th>
                            <th
                              className="align-middle fz-16 fw-600"
                            >
                              Nama Pelatihan
                            </th>
                            <th
                              className="align-middle text-center fz-16 fw-600"
                            >
                              Access
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortListPelatihan && sortListPelatihan.length === 0 ?
                            <tr>
                              <td className='align-middle text-center' colSpan={4}>Data Kosong</td>
                            </tr>
                            : sortPelatihan.map((items, index) => {
                              return (
                                <tr key={index}>
                                  <td className="py-8 border-bottom">
                                    {index + 1}
                                  </td>

                                  <td className="py-8 border-bottom">
                                    {items.value}
                                  </td>
                                  <td className="py-8 border-bottom">
                                    {items.label}
                                  </td>
                                  <td className="text-center py-8 border-bottom">
                                    <label className="checkbox d-flex justify-content-center">
                                      <input
                                        type="checkbox"
                                        checked={items.allSelect}
                                        name="select-all"
                                        onChange={(e) =>
                                          handleChangePelatihan(e, index)
                                        }
                                      />
                                      <span></span>
                                    </label>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </form> */}
            <div className="form-group row mt-8">
              <div className="col-sm-12 d-flex justify-content-end">
                <Link href="/site-management/user/administrator" passHref>
                  <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                    Kembali
                  </a>
                </Link>
                <button
                  type="button"
                  onClick={handleSubmit}
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
