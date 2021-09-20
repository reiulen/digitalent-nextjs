import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";
import Swal from "sweetalert2";

import PageWrapper from "../../../wrapper/page.wrapper";
import LoadingPage from "../../../LoadingPage";

import { useDispatch, useSelector } from "react-redux";

const AddAcademy = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header mt-3">
            <h2
              className="card-title text-dark mt-2"
              style={{ fontSize: "24px" }}
            >
              Tambah Akademi
            </h2>
            {/* <div className="card-toolbar">
              <Link href="/subvit/substansi/tambah-step-1">
                <a className="btn btn-primary-rounded-full px-6 font-weight-bolder px-5 py-3 mt-2">
                  <i className="ri-pencil-fill"></i>
                  Tambah Akademi
                </a>
              </Link>
            </div> */}
          </div>

          <div className="card-body pt-0"></div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AddAcademy;
