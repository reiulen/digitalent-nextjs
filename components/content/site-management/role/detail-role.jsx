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

const DetailRole = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

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

  const onNewReset = () => {
    router.replace("/site-management/api", undefined, {
      shallow: true,
    });
  };
  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark border-bottom w-100 pb-5 mb-5 mt-5"
              style={{ fontSize: "24px" }}
            >
              Detail Role
            </h3>
          </div>
          <div className="card-body pt-0">
            <div className="form-group d-flex flex-column mt-4">
              <p htmlFor="exampleSelect1" style={{ color: "#6C6C6C" }}>
                Nama Role
              </p>
              <p
                htmlFor="exampleSelect1"
                className="fw-400 fz-16"
                style={{ color: "#1F1F1F" }}
              >
                Verifikator
              </p>
            </div>

            <div className="row">
              <div className="col-12 col-sm-6">

            <div className="form-group d-flex flex-column mt-4">
              <p htmlFor="exampleSelect1" style={{ color: "#6C6C6C" }}>
                Status Role
              </p>
              <p
                htmlFor="exampleSelect1"
                className="fw-400 fz-16"
                style={{ color: "#1F1F1F" }}
              >
                Aktif
              </p>
            </div>
              </div>
              <div className="col-12 col-sm-6">

            <div className="form-group d-flex flex-column mt-4">
              <p htmlFor="exampleSelect1" style={{ color: "#6C6C6C" }}>
                Status Role
              </p>
              <p
                htmlFor="exampleSelect1"
                className="fw-400 fz-16"
                style={{ color: "#1F1F1F" }}
              >
                Aktif
              </p>
            </div>
              </div>
            </div>

            <div>
              <h3
                className="card-title font-weight-bolder text-dark w-100 pb-5 mb-5 mt-5"
                style={{ fontSize: "24px" }}
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
                            <div style={btnMin} className="cursor-pointer mr-3">
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
            <div className="form-group row">
              <div className="col-sm-12 d-flex justify-content-end">
                <Link href="/partnership/master-kategori-kerjasama">
                  <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                    Kembali
                  </a>
                </Link>
              </div>
            </div>
            {/* end footer btn */}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default DetailRole;
