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
import Image from "next/image";
import IconPlus from "../../../../../public/assets/icon/Plus.svg";
import IconMinus from "../../../../../public/assets/icon/Minus.svg";

const TambahApi = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const onNewReset = () => {
    router.replace("/site-management/api", undefined, {
      shallow: true,
    });
  };

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
              className="card-title font-weight-bolder text-dark border-bottom w-100 pb-5 mb-5 mt-5"
              style={{ fontSize: "24px" }}
            >
              Tambah Mitra
            </h3>
          </div>
          <div className="card-body pt-0">
            <form>
              <div className="form-group">
                <label>Nama Lengkap</label>
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
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Placeholder"
                />
                <span className="form-text text-muted">
                  Please enter your full name
                </span>
              </div>
              <div className="form-group">
                <label htmlFor="exampleSelect1">Status</label>
                <select className="form-control" id="exampleSelect1">
                  <option>Placeholder</option>
                </select>
                <span className="form-text text-muted">
                  Please enter your full name
                </span>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Placeholder"
                />
                <span className="form-text text-muted">
                  Please enter your full name
                </span>
              </div>
              <div className="form-group">
                <label>Konfirmasi Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Placeholder"
                />
                <span className="form-text text-muted">
                  Please enter your full name
                </span>
              </div>
              <div className="form-group">
                <label htmlFor="exampleSelect1">Role</label>
                <select className="form-control" id="exampleSelect1">
                  <option>Placeholder</option>
                </select>
                <span className="form-text text-muted">
                  Please enter your full name
                </span>
              </div>
              <div className="form-group">
                <label htmlFor="exampleSelect1">Satuan Kerja</label>
                <select className="form-control" id="exampleSelect1">
                  <option>Placeholder</option>
                </select>
                <span className="form-text text-muted">
                  Please enter your full name
                </span>
              </div> </form>
            <div className="form-group row">
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
