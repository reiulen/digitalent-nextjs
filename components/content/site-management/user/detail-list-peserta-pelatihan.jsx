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
import AlertBar from "../../partnership/components/BarAlert";
import Image from "next/image";
import IconArrow from "../../../assets/icon/Arrow";

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
        <div className="col-12 col-xl-3 order-1">
          <div className="card card-custom card-stretch gutter-b px-10 py-12">
            <div className="form-group">
              <div>
                <div
                  className="image-input image-input-outline w-100"
                  style={{ height: "19rem" }}
                >
                  <div
                    className="image-input-wrapper w-100"
                    style={{ height: "19rem" }}
                  ></div>

                  <label
                    className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                    data-action="change"
                    data-toggle="tooltip"
                    title=""
                    data-original-title="Change avatar"
                  >
                    <i className="fa fa-pen icon-sm text-muted"></i>
                    <input
                      type="file"
                      name="profile_avatar"
                      accept=".png, .jpg, .jpeg"
                    />
                    <input type="hidden" name="profile_avatar_remove" />
                  </label>

                  <span
                    className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                    data-action="cancel"
                    data-toggle="tooltip"
                    title="Cancel avatar"
                  >
                    <i className="ki ki-bold-close icon-xs text-muted"></i>
                  </span>

                  <span
                    className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                    data-action="remove"
                    data-toggle="tooltip"
                  >
                    <i className="ki ki-bold-close icon-xs text-muted"></i>
                  </span>
                </div>
                <span className="form-text text-muted">
                  Please enter your full name
                </span>
                <div className="mt-4 w-100">
                  <button
                    type="button"
                    className="btn btn-outline-primary rounded-full w-100"
                  >
                    Ubah Data
                  </button>
                  <ul style={listUl}>
                    <li style={listLi} className="p-4 listDTS">
                      <div className="d-flex align-items-center">
                        <Image
                          src="/assets/icon/user2.svg"
                          width="20"
                          height="20"
                          alt="user2"
                        />
                        <p className="m-0 ml-4">Informasi Data Pribadi</p>
                      </div>
                    </li>
                    <li style={listLi} className="p-4 listDTS">
                      <div className="d-flex align-items-center">
                        <Image
                          src="/assets/icon/Briefcase.svg"
                          width="20"
                          height="20"
                          alt="user2"
                        />
                        <p className="m-0 ml-4">Data Pelatihan</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-9 order-1 px-0">
          <div
            className="card card-custom card-stretch gutter-b"
            style={{ height: "max-content" }}
          >
            <div className="card-header border-0 d-flex flex-column">
              <h3
                className="card-title font-weight-bolder text-dark mt-8"
                style={{ fontSize: "24px" }}
              >
                Pilih Pelatihan
              </h3>
              <div className="form-group">
                <label htmlFor="exampleSelect1">Pilih Pelatihan</label>
                <select className="form-control" id="exampleSelect1">
                  <option>Ui / Ux Design</option>
                </select>
                <span className="form-text text-muted">
                  Please enter your full name
                </span>
              </div>
            </div>
          </div>
          <div className="card card-custom card-stretch gutter-b" style={{ height: "max-content" }}>
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
                  Akademi
                </p>
                <p className="fz-16">VSGA</p>
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <div>
                      <p className="mb-2" style={colorText}>
                        Status Pelatihan
                      </p>
                      <p className="fz-16">Lulus</p>
                      <p className="mb-2 mt-4" style={colorText}>
                        Penyelenggara
                      </p>
                      <p className="fz-16">Gojek</p>
                      <p className="mb-2 mt-4" style={colorText}>
                        Provinsi
                      </p>
                      <p className="fz-16">Jawabarat</p>
                      <p className="mb-2 mt-4" style={colorText}>
                        Tanggal Pelatihan
                      </p>
                      <p className="fz-16">20 Maret 2020</p>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div>
                      <p className="mb-2" style={colorText}>
                        Tema
                      </p>
                      <p className="fz-16">Designer</p>
                      <p className="mb-2 mt-4" style={colorText}>
                        Pelatihan
                      </p>
                      <p className="fz-16">Ui / Ux Design</p>
                      <p className="mb-2 mt-4" style={colorText}>
                        Kota/Kabupaten
                      </p>
                      <p className="fz-16">Depok</p>
                      <p className="mb-2 mt-4" style={colorText}>
                        Berkas Hasil Upload
                      </p>
                      <p className="fz-16">Pelatihan.docx</p>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
              <div className="col-sm-12 d-flex justify-content-end">
                <Link href="/site-management/user">
                  <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                    Kembali
                  </a>
                </Link>
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
