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
import {
  deletePage,
  getAllPage,
  setPage,
  searchCooporation,
  limitCooporation,
} from "../../../../../redux/actions/site-management/settings/page.actions";

import { DELETE_PAGE_RESET } from "../../../../../redux/types/site-management/settings/page.type";

const PilihTemplate = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark titles-1">
              Pilih Template
            </h3>
          </div>
          <div className="card-body pt-0">
            <div className="row d-flex justify-content-center mt-4">
              <div className="card col-xl-5 rounded shadow p-3 mb-5 bg-white text-center mx-4">
                <div className="">
                  <div className="card-body">
                    <div
                      className="container text-center mb-4"
                      style={{
                        backgroundColor: "#F2F7FC",
                        border: "dashed #ADB5BD",
                      }}
                    >
                      <h3 className="py-3 text-gray font-weight-bolder">
                        Title Page
                      </h3>
                    </div>

                    <div
                      className="container text-center mb-4"
                      style={{
                        backgroundColor: "#F2F7FC",
                        border: "dashed #ADB5BD",
                      }}
                    >
                      <h3 className="py-10 text-gray font-weight-bolder">
                        Image
                      </h3>
                    </div>

                    <div
                      className="container text-center"
                      style={{
                        backgroundColor: "#F2F7FC",
                        border: "dashed #ADB5BD",
                      }}
                    >
                      <h3 className="py-10 text-gray font-weight-bolder">
                        Content
                      </h3>
                    </div>
                    <h3 className="my-7 text-center">Template 1</h3>
                    <div className="text-center">
                      <Link href="/site-management/setting/tambah-page">
                        <a
                          className="btn btn-rounded-full bg-blue-primary text-white d-block"
                          onClick={() => {
                            localStorage.setItem("template", 0);
                          }}
                        >
                          Pilih Template
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card col-xl-5 rounded shadow p-3 mb-5 bg-white text-center mx-4">
                <div className="">
                  <div className="card-body">
                    <div
                      className="container text-center mb-4"
                      style={{
                        backgroundColor: "#F2F7FC",
                        border: "dashed #ADB5BD",
                      }}
                    >
                      <h3 className="py-3 text-gray font-weight-bolder">
                        Title Page
                      </h3>
                    </div>

                    <div
                      className="container"
                      style={{
                        backgroundColor: "#F2F7FC",
                        border: "dashed #ADB5BD",
                        height: "215px",
                        lineHeight: "215px",
                      }}
                    >
                      <h3
                        className="text-gray font-weight-bolder"
                        style={{
                          paddingTop: "100px",
                        }}
                      >
                        Content
                      </h3>
                    </div>
                    <h3 className="my-7 text-center">Template 2</h3>
                    <div className="text-center">
                      <Link href="/site-management/setting/tambah-page">
                        <a
                          className="btn btn-rounded-full bg-blue-primary text-white d-block"
                          onClick={() => {
                            localStorage.setItem("template", 1);
                          }}
                        >
                          Pilih Template
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card col-xl-5 rounded shadow p-3 mb-5 bg-white text-center mx-4">
                <div className="">
                  <div className="card-body">
                    <div className="row">
                      <div
                        className="container text-center mb-4 col-md-12"
                        style={{
                          backgroundColor: "#F2F7FC",
                          border: "dashed #ADB5BD",
                        }}
                      >
                        <h3 className="py-3 text-gray font-weight-bolder">
                          Title Page
                        </h3>
                      </div>
                    </div>
                    <div className="row d-flex">
                      <div
                        className="container text-center mb-4 col-12 col-md-6 col-xl-5 m-0"
                        style={{
                          backgroundColor: "#F2F7FC",
                          border: "dashed #ADB5BD",
                          height: "100px",
                        }}
                      >
                        <h3 className="py-10 text-gray font-weight-bolder">
                          Image
                        </h3>
                      </div>

                      <div
                        className="container text-center col-12 col-md-6 col-xl-6 mr-0"
                        style={{
                          backgroundColor: "#F2F7FC",
                          border: "dashed #ADB5BD",
                          paddingTop: "66px",
                          height: "215px",
                          lineHeight: "215px",
                        }}
                      >
                        <h3 className="py-10 text-gray font-weight-bolder">
                          Content
                        </h3>
                      </div>
                    </div>

                    <h3 className="my-7 text-center">Template 3</h3>
                    <div className="text-center">
                      <Link href="/site-management/setting/tambah-page">
                        <a
                          className="btn btn-rounded-full bg-blue-primary text-white d-block"
                          onClick={() => {
                            localStorage.setItem("template", 2);
                          }}
                        >
                          Pilih Template
                        </a>
                      </Link>
                    </div>
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

export default PilihTemplate;
