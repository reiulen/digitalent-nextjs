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
import AlertBar from "../../../partnership/components/BarAlert";
import Image from "next/image";
import IconArrow from "../../../../assets/icon/Arrow";

const Table = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const onNewReset = () => {
    router.replace("/site-management/role", undefined, {
      shallow: true,
    });
  };

  // style color
  const colorText = {
    color: "#6C6C6C",
  };
  const listUl = {
    listStyle: "none",
    padding: "0",
    margin: "0",
    marginTop: "1rem",
  };
  const listLi = {};
  return (
    <PageWrapper>
      <div className="row">
        {" "}
        <div className="col-12 order-1 px-0">
          <div
            className="card card-custom card-stretch gutter-b"
            style={{ height: "max-content" }}
          >
            <div className="card-header border-0 d-flex flex-column">
              <h3
                className="card-title font-weight-bolder text-dark mt-8"
                style={{ fontSize: "24px" }}
              >
                Data Pelatihan
              </h3>
            </div>
            <div className="card-body pt-0">
              <div>
                <p className="mb-2" style={colorText}>
                  Nama Pelatihan
                </p>
                <p className="fz-16">Ui / Ux Design</p>
                <div>
                  <p className="mb-2" style={colorText}>
                    ID Pelatihan
                  </p>
                  <p className="fz-16">123457514257</p>
                  <p className="mb-2 mt-4" style={colorText}>
                    Status Pelatihan
                  </p>
                  <p className="fz-16">Diterima</p>
                  <div className="d-flex align-items-center">
                    <input type="checkbox" className="mr-4" />
                    <p className="mb-0">Ubah data</p>
                  </div>
                  <div className="form-group mt-4">
                    <label htmlFor="exampleSelect1">ID Pelatihan</label>
                    <select className="form-control" id="exampleSelect1">
                      <option>123456 - UI.UX Design</option>
                    </select>
                    <span className="form-text text-muted">
                      Please enter your full name
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-12 d-flex justify-content-end">
                    <Link href="/site-management/user" passHref>
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
      </div>
    </PageWrapper>
  );
};

export default Table;
