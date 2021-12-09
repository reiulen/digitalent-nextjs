import React, { useEffect, useState, useRef } from "react";
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
import IconPlus from "../../../../public/assets/icon/Plus.svg";
import IconMinus from "../../../../public/assets/icon/Minus.svg";
import Image from "next/image";
import { postRoles } from "../../../../redux/actions/site-management/role.actions";
import SimpleReactValidator from "simple-react-validator";
import Cookies from 'js-cookie'

const TambahRole = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

  const [status, setStatus] = useState("");
  const [editTable, setEditTable] = useState("");
  const [nameRole, setNameRole] = useState("");
  const [allCheck, setAllCheck] = useState(false);

  const allPermission = useSelector((state) => state.allPermission);

  const btnIconPlus = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "19px",
    height: "19px",
    borderRadius: "5px",
    backgroundColor: "#ADB5BD",
  };
  const btnMin = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "19px",
    height: "19px",
    borderRadius: "5px",
    backgroundColor: "#203E80",
  };

  let list = allPermission.data.data;

  let permission = [];

  for (let i = 0; i < allPermission.data.data.length; i++) {
    permission.push(allPermission.data.data[i]);
    if (allPermission.data.data[i].list_sub_menu.length > 0) {
      allPermission.data.data[i].list_sub_menu.forEach((item) => {
        permission.push(item);
      });
    }
  }

  const menu = list.map((item, index) => {
    if (item.list_sub_menu.length > 0) {
      return (
        <>
          <tr>
            <td className="text-left">
              <div className="d-flex align-items-center">
                <div style={btnIconPlus} className="cursor-pointer mr-3">
                  <Image
                    src={IconPlus}
                    width={12}
                    height={12}
                    alt="plus-icon"
                  />
                </div>
                <p className="mb-0">{item.name}</p>
              </div>
            </td>
            <td></td>

            <td
              className="text-right child-permission align-middle"
              style={{ width: "10rem" }}
            >
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="Checkboxes1"
                  onClick={() => {
                    permission.filter((filter) => {
                      if (item.id === filter.id) {
                        filter.view = !(
                          filter.view === true || filter.view === 1
                        );
                      }
                      return filter;
                    });
                  }}
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
                  name="Checkboxes1"
                  onClick={() => {
                    permission.filter((filter) => {
                      if (item.id === filter.id) {
                        filter.manage = !(
                          filter.manage === true || filter.manage === 1
                        );
                      }
                      return filter;
                    });
                  }}
                />
                <span></span>
              </label>
            </td>
          </tr>

          {item.list_sub_menu.map((sub) => {
            return (
              <tr className="" key={sub.id}>
                <td className="text-left">
                  <div className="d-flex align-items-center ml-6">
                    <div style={btnMin} className="cursor-pointer mr-3">
                      <Image
                        src={IconMinus}
                        width={12}
                        height={12}
                        alt="plus-icon"
                      />
                    </div>
                    <p className="mb-0">{sub.name}</p>
                  </div>
                </td>

                {sub.name === "Artikel" ? (
                  <td
                    className="text-right child-permission align-middle"
                    style={{ width: "10rem" }}
                  >
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        name="Checkboxes1"
                        onClick={() => {
                          permission.filter((filter) => {
                            if (sub.id === filter.id) {
                              filter.publish = !(
                                filter.publish === true || filter.publish === 1
                              );
                            }
                            return filter;
                          });
                        }}
                      />
                      <span></span>
                    </label>
                  </td>
                ) : sub.name === "Berita" ? (
                  <td
                    className="text-right child-permission align-middle"
                    style={{ width: "10rem" }}
                  >
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        name="Checkboxes1"
                        onClick={() => {
                          permission.filter((filter) => {
                            if (sub.id === filter.id) {
                              filter.publish = !(
                                filter.publish === true || filter.publish === 1
                              );
                            }
                            return filter;
                          });
                        }}
                      />
                      <span></span>
                    </label>
                  </td>
                ) : sub.name === "Video" ? (
                  <td
                    className="text-right child-permission align-middle"
                    style={{ width: "10rem" }}
                  >
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        name="Checkboxes1"
                        onClick={() => {
                          permission.filter((filter) => {
                            if (sub.id === filter.id) {
                              filter.publish = !(
                                filter.publish === true || filter.publish === 1
                              );
                            }
                            return filter;
                          });
                        }}
                      />
                      <span></span>
                    </label>
                  </td>
                ) : sub.name === "FAQ" ? (
                  <td
                    className="text-right child-permission align-middle"
                    style={{ width: "10rem" }}
                  >
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        name="Checkboxes1"
                        onClick={() => {
                          permission.filter((filter) => {
                            if (sub.id === filter.id) {
                              filter.publish = !(
                                filter.publish === true || filter.publish === 1
                              );
                            }
                            return filter;
                          });
                        }}
                      />
                      <span></span>
                    </label>
                  </td>
                ) : sub.name === "Imagetron" ? (
                  <td
                    className="text-right child-permission align-middle"
                    style={{ width: "10rem" }}
                  >
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        name="Checkboxes1"
                        onClick={() => {
                          permission.filter((filter) => {
                            if (sub.id === filter.id) {
                              filter.publish = !(
                                filter.publish === true || filter.publish === 1
                              );
                            }
                            return filter;
                          });
                        }}
                      />
                      <span></span>
                    </label>
                  </td>
                ) : sub.name === "Galeri" ? (
                  <td
                    className="text-right child-permission align-middle"
                    style={{ width: "10rem" }}
                  >
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        name="Checkboxes1"
                        onClick={() => {
                          permission.filter((filter) => {
                            if (sub.id === filter.id) {
                              filter.publish = !(
                                filter.publish === true || filter.publish === 1
                              );
                            }
                            return filter;
                          });
                        }}
                      />
                      <span></span>
                    </label>
                  </td>
                ) : (
                  <td
                    className="text-right child-permission align-middle"
                    style={{ width: "10rem" }}
                  ></td>
                )}
                <td
                  className="text-right child-permission align-middle"
                  style={{ width: "10rem" }}
                >
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      name="Checkboxes1"
                      checked={sub.manage}
                      onClick={() => {
                        permission.filter((filter) => {
                          if (sub.id === filter.id) {
                            filter.view = !(
                              filter.view === true || filter.view === 1
                            ) || (filter.manage === true || filter.manage === 1)
                          }
                          return filter;
                        });
                      }}
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
                      name="Checkboxes1"
                      onClick={() => {
                        permission.filter((filter) => {
                          if (sub.id === filter.id) {
                            filter.manage = !(
                              filter.manage === true || filter.manage === 1
                            );
                            filter.view =
                              filter.manage === true || filter.manage === 1;
                          }
                          return filter;
                        });
                      }}
                    />
                    <span></span>
                  </label>
                </td>
              </tr>
            );
          })}
        </>
      );
    } else {
      return (
        <tr>
          <td className="text-left">
            <div className="d-flex align-items-center">
              <div style={btnIconPlus} className="cursor-pointer mr-3">
                <Image src={IconPlus} width={12} height={12} alt="plus-icon" />
              </div>
              <p className="mb-0">{item.name}</p>
            </div>
          </td>
          <td></td>
          <td
            className="text-right child-permission align-middle"
            style={{ width: "10rem" }}
          >
            <label className="checkbox">
              <input
                type="checkbox"
                name="Checkboxes1"
                onClick={() => {
                  permission.filter((filter) => {
                    if (item.id === filter.id) {
                      filter.view = !(
                        filter.view === true || filter.view === 1
                      );
                    }
                    return filter;
                  });
                }}
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
                name="Checkboxes1"
                onClick={() => {
                  permission.filter((filter) => {
                    if (item.id === filter.id) {
                      filter.manage = !(
                        filter.manage === true || filter.manage === 1
                      );
                    }
                    return filter;
                  });
                }}
              />
              <span></span>
            </label>
          </td>
        </tr>
      );
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: nameRole,
      status: status,
      type: editTable,
      permissions_id: permission.map((item) => {
        return {
          id: item.id,
          view: item.view === true ? 1 : 0,
          manage: item.manage === true ? 1 : 0,
          publish: item.publish === true ? 1 : 0,
        };
      }),
    };

    if (simpleValidator.current.allValid()) {
      dispatch(postRoles(data, token, Cookies.get("token_permission")));
    } else {
      simpleValidator.current.showMessages();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi data dengan benar !",
      });
    }
  };

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark border-bottom w-100 pb-5 mb-5 mt-5 titles-1">
              Tambah Role
            </h3>
          </div>
          <div className="card-body pt-0 px-4 px-sm-8">
            <form>
              <div className="form-group">
                <label>Nama Role</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setNameRole(e.target.value)}
                  value={nameRole}
                  placeholder="Masukkan nama role"
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("Nama Role")
                  }
                />
                {simpleValidator.current.message(
                  "Nama Role",
                  nameRole,
                  "required",
                  { className: "text-danger" }
                )}
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  className="form-control"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("status")
                  }
                >
                  <option value="" disabled selected hidden>
                    Pilih Status
                  </option>
                  <option value="1">Aktif</option>
                  <option value="0">Tidak Aktif</option>
                </select>
                {simpleValidator.current.message("Status", status, "required", {
                  className: "text-danger",
                })}
              </div>
              <div className="form-group">
                <label>Editable</label>
                <select
                  className="form-control"
                  onChange={(e) => setEditTable(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("editable")
                  }
                >
                  <option value="" disabled selected hidden>
                    Pilih Editable
                  </option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
                {simpleValidator.current.message(
                  "editable",
                  editTable,
                  "required",
                  { className: "text-danger" }
                )}
              </div>
            </form>

            <div>
              <h3 className="card-title font-weight-bolder text-dark w-100 pb-5 mb-5 mt-5 titles-1">
                Access Role
              </h3>

              <div className="table-page mt-5">
                <div className="table-responsive">
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th rowSpan="2" className="align-middle">
                          Menu
                        </th>
                        <th
                          colSpan="3"
                          className="text-left permision"
                          style={{ textAlignLast: "right" }}
                        >
                          Permission
                        </th>
                        {/* <th className="border-0">
                          <label className="checkbox">
                            Pilih Semua
                            <input
                              type="checkbox"
                              name="Checkboxes1"
                              onClick={() => {
                                setAllCheck(!allCheck);
                                permission.filter((filter) => {
                                  filter.view = !(
                                    filter.view === true || filter.view === 1
                                  );
                                  filter.manage = !(
                                    filter.manage === true ||
                                    filter.manage === 1
                                  );
                                  filter.publish = !(
                                    filter.publish === true ||
                                    filter.publish === 1
                                  );
                                  return filter;
                                });
                              }}
                            />
                            <span></span>
                          </label>
                        </th> */}
                      </tr>
                      <tr>
                        <th
                          className="text-right child-permission align-middle"
                          style={{ width: "10rem" }}
                        >
                          Publish
                        </th>
                        <th
                          className="text-right child-permission align-middle"
                          style={{ width: "0" }}
                        >
                          View
                        </th>
                        <th
                          className="text-right child-permission align-middle"
                          style={{ width: "10rem" }}
                        >
                          Manage
                        </th>
                      </tr>
                    </thead>
                    <tbody>{menu}</tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* start footer btn */}
            <div className="form-group row mt-8">
              <div className="col-sm-12 d-flex justify-content-end">
                <Link href="/site-management/role" passHref>
                  <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                    Kembali
                  </a>
                </Link>
                <button
                  type="button"
                  className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
                  onClick={onSubmit}
                >
                  Simpan
                </button>
              </div>
            </div>
            {/* end footer btn */}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default TambahRole;
