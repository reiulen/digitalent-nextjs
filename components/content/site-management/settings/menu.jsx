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
import Image from "next/image";

const Table = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  // function delete
  const apiDelete = (id) => {
    Swal.fire({
      title: "Apakah anda yakin ingin menghapus data ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya !",
      dismissOnDestroy: false,
    }).then(async (result) => {
      if (result.value) {
        // dispatch delete
      }
    });
  };

  const onNewReset = () => {
    router.replace("/site-management/setting/api", undefined, {
      shallow: true,
    });
  };
  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-b">
            <h3
              className="card-title font-weight-bolder text-dark"
              style={{ fontSize: "24px" }}
            >
              Menu
            </h3>
            <div className="card-toolbar">
              <Link
                href="/site-management/master-data/master-satuan-kerja-penyelenggara/tambah-satuan-kerja-penyelenggara"
                passHref
              >
                <a className="btn btn-rounded-full bg-blue-primary text-white">
                  <IconAdd className="mr-3" width="14" height="14" />
                  Tambah Menu
                </a>
              </Link>
            </div>
          </div>
          <div className="card-body pt-0 mt-10">
             {/* main */}
            <div className="d-flex align-items-center">
              <div className="col-12 col-sm-5">
                <div className="form-group">
                  <label>Menu 1</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Placeholder"
                  />
                  <span className="form-text text-muted">
                    Please enter your full name
                  </span>
                </div>
              </div>
              <div className="col-12 col-sm-5">
                <div className="form-group">
                  <label>Link</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Placeholder"
                  />
                  <span className="form-text text-muted">
                    Please enter your full name
                  </span>
                </div>
              </div>
              <div className="col-12 col-sm-2">
                <div className="d-flex align-items-center h-100">
                  <button
                    type="button"
                    className="btn mr-4 mb-5"
                    style={{ backgroundColor: "#4299E1" }}
                  >
                    <IconAdd />
                  </button>
                  <button
                    type="button"
                    className="btn mr-4 mb-5"
                    style={{ backgroundColor: "#4299E1" }}
                  >
                    <Image
                      src="/assets/icon/link.svg"
                      alt="link"
                      width={16}
                      height={16}
                    />
                  </button>
                  <button
                    type="button"
                    className="btn mb-5"
                    style={{ backgroundColor: "#EE2D41" }}
                  >
                    <IconDelete />
                  </button>
                </div>
              </div>
            </div> 
          
            {/* main */}
            <div className="d-flex align-items-center">
              <div className="col-12 col-sm-5">
                <div className="form-group">
                  <label>Menu 1</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Placeholder"
                  />
                  <span className="form-text text-muted">
                    Please enter your full name
                  </span>
                </div>
              </div>
              <div className="col-12 col-sm-5">
                <div className="form-group">
                  <label>Link</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Placeholder"
                  />
                  <span className="form-text text-muted">
                    Please enter your full name
                  </span>
                </div>
              </div>
              <div className="col-12 col-sm-2">
                <div className="d-flex align-items-center h-100">
                  <button
                    type="button"
                    className="btn mr-4 mb-5"
                    style={{ backgroundColor: "#4299E1" }}
                  >
                    <IconAdd />
                  </button>
                  <button
                    type="button"
                    className="btn mr-4 mb-5"
                    style={{ backgroundColor: "#4299E1" }}
                  >
                    <Image
                      src="/assets/icon/link.svg"
                      alt="link"
                      width={16}
                      height={16}
                    />
                  </button>
                  <button
                    type="button"
                    className="btn mb-5"
                    style={{ backgroundColor: "#EE2D41" }}
                  >
                    <IconDelete />
                  </button>
                </div>
              </div>
            </div> 
            {/* sub main */}
            <div className="d-flex align-items-center pl-10">
              <div className="col-12 col-sm-5">
                <div className="form-group">
                  <label>Sub Menu 1</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Placeholder"
                  />
                  <span className="form-text text-muted">
                    Please enter your full name
                  </span>
                </div>
              </div>
              <div className="col-12 col-sm-5">
                <div className="form-group">
                  <label>Link</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Placeholder"
                  />
                  <span className="form-text text-muted">
                    Please enter your full name
                  </span>
                </div>
              </div>
              <div className="col-12 col-sm-2">
                <div className="d-flex align-items-center h-100">
                  <button
                    type="button"
                    className="btn mr-4 mb-5"
                    style={{ backgroundColor: "#4299E1" }}
                  >
                    <IconAdd />
                  </button>
                  <button
                    type="button"
                    className="btn mb-5"
                    style={{ backgroundColor: "#EE2D41" }}
                  >
                    <IconDelete />
                  </button>
                </div>
              </div>
            </div>
           
           
           
            <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link href="/site-management/setting">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
                    </a>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
                    // onClick={e => handleSubmit(e)}
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

export default Table;
