import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import Select from "react-select";

import PageWrapper from "../../../wrapper/page.wrapper";
import CardPage from "../../../CardPage";

import { useDispatch, useSelector } from "react-redux";

const ImportParticipant = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  let { page = 1, success } = router.query;
  page = Number(page);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

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
            <h1
              className="card-title text-dark mt-2"
              style={{ fontSize: "24px" }}
            >
              Import Peserta Pelatihan / _nama pelatihan_
            </h1>
          </div>

          <div className="card-body pb-0">
            <div className="form-group row mb-2">
              <div className="col-sm-6 col-md-6">
                <label className="col-form-label">
                  Untuh Template Form Peserta
                </label>
                <button
                  className="btn btn-rounded-full bg-blue-secondary text-white"
                  type="button"
                >
                  Unduh
                  <i className="ri-arrow-down-s-line ml-3 mt-1 text-white"></i>
                </button>
              </div>
              <div className="col-sm-6 col-md-6">
                <label className="col-form-label">Upload Data Peserta</label>
                <button
                  className="btn btn-rounded-full bg-success text-white"
                  type="button"
                >
                  <i className="ri-download-2-line mr-2 mt-1 text-white"></i>
                  Upload
                </button>
              </div>
            </div>

            <div className="form-group mt-7">
              <div className="text-right">
                <button
                  className="btn btn-light-ghost-rounded-full mr-2"
                  type="button"
                  onClick={() => router.back()}
                >
                  Batal
                </button>
                <button className="btn btn-primary-rounded-full" type="button">
                  Tambahkan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ImportParticipant;
