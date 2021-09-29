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

const DetailApi = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

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
              Detail API
            </h3>
          </div>
          <div className="card-body pt-0">
            <div>
              <div className="form-group d-flex flex-column mt-4">
                <p htmlFor="exampleSelect1" style={{color: "#6C6C6C"}}>Field</p>
                <p htmlFor="exampleSelect1" className="fw-400 fz-16" style={{color: "#1F1F1F"}}>Field</p>
              </div>
              <div className="form-group d-flex flex-column mt-4">
                <p htmlFor="exampleSelect1" style={{color: "#6C6C6C"}}>Field</p>
                <p htmlFor="exampleSelect1" className="fw-400 fz-16" style={{color: "#1F1F1F"}}>Field</p>
              </div>
              <div className="form-group d-flex flex-column mt-4">
                <p htmlFor="exampleSelect1" style={{color: "#6C6C6C"}}>Field</p>
                <p htmlFor="exampleSelect1" className="fw-400 fz-16" style={{color: "#1F1F1F"}}>Field</p>
              </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link href="/partnership/master-kategori-kerjasama">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
                    </a>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
                  >
                    View log
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default DetailApi;
