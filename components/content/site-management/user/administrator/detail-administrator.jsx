import React, { useState } from "react";
import Link from "next/link";
import PageWrapper from "../../../../wrapper/page.wrapper";
import { useDispatch, useSelector } from "react-redux";
import IconSearch from "../../../../assets/icon/Search";
import {
  geteditAdminSite,
  getListRoles,
  getListUnitWorks,
  getListAcademy,
  getAllListPelatihan,
} from "../../../../../redux/actions/site-management/user/admin-site.action";

const DetailAdmin = ({ token }) => {
  let dispatch = useDispatch();

  const editAdminSite = useSelector((state) => state.editAdminSite);
  const detailAdminSite = useSelector((state) => state.detailAdminSite);
  const [search, setSearch] = useState(null);

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark border-bottom w-100 pb-5 mb-5 mt-5 titles-1">
              Detail Administrator
            </h3>
          </div>
          <div className="card-body pt-0 px-4 px-sm-8">
            <div className="form-group d-flex flex-column mt-4">
              <p htmlFor="exampleSelect1" style={{ color: "#6C6C6C" }}>
                Nama Lengkap
              </p>
              <p
                htmlFor="exampleSelect1"
                className="fw-400 fz-16"
                style={{ color: "#1F1F1F" }}
              >
                {detailAdminSite.adminSite?.data.name}
              </p>
            </div>
            <div className="form-group d-flex flex-column mt-4">
              <p htmlFor="exampleSelect1" style={{ color: "#6C6C6C" }}>
                Email
              </p>
              <p
                htmlFor="exampleSelect1"
                className="fw-400 fz-16"
                style={{ color: "#1F1F1F" }}
              >
                {detailAdminSite.adminSite?.data.email}
              </p>
            </div>
            <div className="form-group d-flex flex-column mt-4">
              <p htmlFor="exampleSelect1" style={{ color: "#6C6C6C" }}>
                Status
              </p>
              <p
                htmlFor="exampleSelect1"
                className="fw-400 fz-16"
                style={{ color: "#1F1F1F" }}
              >
                {detailAdminSite.adminSite?.data.status == 1
                  ? "Aktif"
                  : "Tidak Aktif"}
              </p>
            </div>
            <div className="form-group d-flex flex-column mt-4">
              <p style={{ color: "#6C6C6C" }}>Role</p>
              <div className="d-flex ailgn-items-center">
                {detailAdminSite.adminSite?.data.roles.map((items, index) => {
                  return (
                    <span
                      className="label label-lg label-inline"
                      style={{
                        width: "max-content",
                        backgroundColor: "#F2F7FC",
                        color: "#ADB5BD",
                      }}
                      key={index}
                    >
                      {items.name}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="form-group d-flex flex-column mt-4 pb-6">
              <p htmlFor="exampleSelect1" style={{ color: "#6C6C6C" }}>
                Satuan Kerja
              </p>
              <div className="d-flex ailgn-items-center">
                {detailAdminSite.adminSite?.data.unit_works.map(
                  (item, index) => {
                    return (
                      <span
                        className="label label-lg label-inline"
                        style={{
                          width: "max-content",
                          backgroundColor: "#F2F7FC",
                          color: "#ADB5BD",
                        }}
                        key={index}
                      >
                        {item.name}
                      </span>
                    );
                  }
                )}
              </div>
            </div>

            {detailAdminSite.adminSite?.data.type_access === "akademi" ? (
              <div className="border-top pt-6">
                <h3 className="card-title font-weight-bolder text-dark w-100 pb-5 mb-5 mt-5 titles-1">
                  Hak Akses Pelatihan
                </h3>

                <div className="form-group d-flex flex-column mt-4 pb-6">
                  <div className="d-flex ailgn-items-center">
                    {detailAdminSite.adminSite?.data.training_access.map(
                      (item, index) => {
                        return (
                          <span
                            className="label label-lg label-inline mr-2"
                            style={{
                              width: "max-content",
                              backgroundColor: "#F2F7FC",
                              color: "#ADB5BD",
                            }}
                            key={index}
                          >
                            {item.name}
                          </span>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="table-page mt-5">
                <h3 className="card-title font-weight-bolder text-dark w-100 pb-5 mb-5 mt-5 titles-1">
                  Hak Akses Pelatihan
                </h3>
                <div className="table-responsive">
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead style={{ backgroundColor: "#F2F7FC" }}>
                      <tr>
                        <th className="align-middle fz-16 fw-600">No</th>
                        <th className="align-middle fz-16 fw-600">
                          ID Pelatihan
                        </th>
                        <th className="align-middle fz-16 fw-600">
                          Nama Pelatihan
                        </th>
                        <th className="align-middle text-center fz-16 fw-600">
                          Access
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {detailAdminSite.adminSite?.data.training_access.map(
                        (items, index) => {
                          return (
                            <tr key={index}>
                              <td className="py-8 border-bottom">
                                {index + 1}
                              </td>
                              <td className="py-8 border-bottom">{items.id}</td>
                              <td className="py-8 border-bottom">
                                {items.name}
                              </td>
                              <td className="text-center py-8 border-bottom">
                                <label className="checkbox checkbox-disabled d-flex justify-content-center">
                                  <input
                                    type="checkbox"
                                    disabled="disabled"
                                    checked={items.manage && items.view}
                                    name="Checkboxes1"
                                  />
                                  <span></span>
                                </label>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* start footer btn */}
            <div className="form-group row mt-8">
              <div className="col-sm-12 d-flex justify-content-end">
                <Link href="/site-management/user/administrator" passHref>
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

export default DetailAdmin;
