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
import IconPlus from "../../../../public/assets/icon/Plus.svg";
import IconMinus from "../../../../public/assets/icon/Minus.svg";
import Image from "next/image";

const TambahRole = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const [status, setStatus] = useState("")
  const [editTable, setEditTable] = useState("")
  const [nameRole, setNameRole] = useState("")




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
    backgroundColor: "#4299E1",
  };

  
  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark border-bottom w-100 pb-5 mb-5 mt-5 titles-1"
  
            >
              Tambah Role
            </h3>
          </div>
          <div className="card-body pt-0 px-4 px-sm-8">
            <form>
              <div className="form-group">
                <label>Nama Role</label>
                <input
                onChange={(e)=>setNameRole(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Masukan nama role"
                />
                
              </div>
              <div className="form-group">
                <label>Status</label>
                <select onChange={(e)=>setStatus(e.target.value)} className="form-control">
                  <option value="">Pilih status</option>
                  <option value="1">Aktif</option>
                  <option value="0">Tidak Aktif</option>
                </select>
                
              </div>
              <div className="form-group">
                <label>Editable</label>
                <select onChange={(e)=>setEditTable(e.target.value)} className="form-control">
                  <option value="">Pilih Editable</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>
            </form>

            <div>
              <h3
                className="card-title font-weight-bolder text-dark w-100 pb-5 mb-5 mt-5 titles-1"
              >
                Access Role
              </h3>

              <div className="table-page mt-5">
                <div className="table-responsive">
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th
                          colSpan="3"
                          className="text-left permision"
                          style={{ textAlignLast: "right" }}
                        >
                          Permission
                        </th>
                      </tr>
                      <tr>
                        <th className="text-left">Menu</th>
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
                        <td className="text-left">
                          <div className="d-flex align-items-center">
                            <div
                              style={btnIconPlus}
                              className="cursor-pointer mr-3"
                            >
                              <Image
                                src={IconPlus}
                                width={12}
                                height={12}
                                alt="plus-icon"
                              />
                            </div>
                            <p className="mb-0">Dashboard</p>
                          </div>
                        </td>
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
                        <td className="text-left">
                          <div className="d-flex align-items-center">
                            <div
                              style={btnMin}
                              className="cursor-pointer mr-3"
                            >
                              <Image
                                src={IconMinus}
                                width={12}
                                height={12}
                                alt="plus-icon"
                              />
                            </div>
                            <p className="mb-0">Dashboard</p>
                          </div>
                        </td>
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
