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

const TambahPage = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const onNewReset = () => {
    router.replace("/site-management/api", undefined, {
      shallow: true,
    });
  };
  return (
    <PageWrapper>
      <div className="row">
        <div className="col-12 col-xl-8 order-1">
          <div className="card card-custom card-stretch gutter-b">
            <div className="card-header border-0">
              <h3
                className="card-title font-weight-bolder text-dark border-bottom w-100 pb-5 mb-5 mt-5"
                style={{ fontSize: "24px" }}
              >
                Tambah Page
              </h3>
            </div>
            <div className="card-body pt-0">
              <div>
                <h3
                  className="card-title font-weight-bolder text-dark border-0 w-100 pb-5 mb-5 mt-5"
                  style={{ fontSize: "16px" }}
                >
                  Konten Page
                </h3>
                <div
                  className="my-10"
                  style={{
                    height: "10rem",
                    width: "100%",
                    border: "1px solid black",
                  }}
                >
                  ck editor
                </div>
                <div className="form-group row">
                  <div className="col-sm-12 d-flex justify-content-end">
                    <Link href="/site-management/setting/page" passHref>
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
        </div>
        <div className="col-12 col-xl-4 order-1">
          <div className="card card-custom card-stretch gutter-b">
            <div className="card-header border-0">
              <h3
                className="card-title font-weight-bolder text-dark border-0 w-100 pb-5 mb-5 mt-5"
                style={{ fontSize: "24px" }}
              >
                Page Attributes
              </h3>
              <form className="w-100">
                <div className="form-group">
                  <label style={{ fontSize: "16px" }}>Page Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Placeholder"
                  />
                  <span className="form-text text-muted">
                    Please enter your full name
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleSelect1">Page Status</label>
                  <select className="form-control" id="exampleSelect1">
                    <option>Placeholder</option>
                  </select>
                  <span className="form-text text-muted">
                    Please enter your full name
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default TambahPage;
