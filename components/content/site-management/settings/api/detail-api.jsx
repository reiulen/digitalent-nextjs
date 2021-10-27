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
  const detailApi = useSelector(state => state.detailApi)

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
                <p htmlFor="exampleSelect1" style={{color: "#6C6C6C"}}>Nama API </p>
                <p htmlFor="exampleSelect1" className="fw-400 fz-16" style={{color: "#1F1F1F"}}>{detailApi.apies.data.api_name}</p>
              </div>
              <div className="form-group d-flex flex-column mt-4">
                <p htmlFor="exampleSelect1" style={{color: "#6C6C6C"}}>Status</p>
                <p htmlFor="exampleSelect1" className="fw-400 fz-16" style={{color: "#1F1F1F"}}>{detailApi.apies.data.status == 1 ?"Aktif":"Tidak Aktif"}</p>
              </div>
              <div className="form-group d-flex flex-column mt-4">
                <p htmlFor="exampleSelect1" style={{color: "#6C6C6C"}}>Pengguna</p>
                <p htmlFor="exampleSelect1" className="fw-400 fz-16" style={{color: "#1F1F1F"}}>{detailApi.apies.data.username}</p>
              </div>
              <div className="form-group d-flex flex-column mt-4">
                <p htmlFor="exampleSelect1" style={{color: "#6C6C6C"}}>Masa Berlaku</p>
                <p htmlFor="exampleSelect1" className="fw-400 fz-16" style={{color: "#1F1F1F"}}>22 Maret 2021 sd 25 Mei 2021 </p>
              </div>
              <div className="form-group d-flex flex-column mt-4">
                <p htmlFor="exampleSelect1" style={{color: "#6C6C6C"}}>URL</p>
                <p htmlFor="exampleSelect1" className="fw-400 fz-16" style={{color: "#1F1F1F"}}>{detailApi.apies.data.api_url}</p>
              </div>
              <div className="form-group d-flex flex-column mt-4">
                <p htmlFor="exampleSelect1" style={{color: "#6C6C6C"}}>API Key</p>
                <p htmlFor="exampleSelect1" className="fw-400 fz-16" style={{color: "#1F1F1F"}}>{detailApi.apies.data.api_key}</p>
              </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link href="/site-management/setting/api" passHref>
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
                    </a>
                  </Link>

                  <Link href={`/site-management/setting/api/log-api/${router.query.id}`} passHref>

                    <a className="btn btn-sm btn-rounded-full bg-blue-primary text-white">
                      View log
                    </a>
                  </Link>

                </div>
              </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default DetailApi;
