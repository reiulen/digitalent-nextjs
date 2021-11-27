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
import ListPeserta from './list-peserta-pelatihan'

const Table = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const allDetailPeserta = useSelector(state => state.allDetailPeserta)

  console.log(allDetailPeserta)

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
            <div className="form-group" style={{maxWidth:"19rem"}}>
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
        <div className="col-12 col-xl-9 order-1">
          <div className="card card-custom card-stretch gutter-b px-4 px-sm-8 py-4">
            {/* Data Probadi */}
            <div>
              <h3 className="card-title font-weight-bolder text-dark w-100 pb-5 mb-5 mt-5 titles-1">
                Data Pribadi
              </h3>
              <div className="row">
                <div className="col-12 col-sm-6">
                  <div>
                    <p className="mb-2" style={colorText}>
                      Nama Lengkap
                    </p>
                    <p className="fz-16">Lala Racing</p>
                    <p className="mb-2 mt-4" style={colorText}>
                      Nomer Identitas (KTP)
                    </p>
                    <p className="fz-16">123412312412312434312</p>
                    <p className="mb-2 mt-4" style={colorText}>
                      No Handphone
                    </p>
                    <p className="fz-16">082129320223</p>
                    <p className="mb-2 mt-4" style={colorText}>
                      Nama Kontak Darurat
                    </p>
                    <p className="fz-16">Rany Febrianty</p>
                    <p className="mb-2 mt-4" style={colorText}>
                      Tempat Lahir
                    </p>
                    <p className="fz-16">Depok</p>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div>
                    <p className="mb-2" style={colorText}>
                      Email
                    </p>
                    <p className="fz-16">Lalaracing@gmail.com</p>
                    <p className="mb-2 mt-4" style={colorText}>
                      Jenis Kelamin
                    </p>
                    <p className="fz-16">Perempuan</p>
                    <p className="mb-2 mt-4" style={colorText}>
                      Pendidikan
                    </p>
                    <p className="fz-16">S1</p>
                    <p className="mb-2 mt-4" style={colorText}>
                      Nomor Kontak Darurat
                    </p>
                    <p className="fz-16">08172615241542</p>
                    <p className="mb-2 mt-4" style={colorText}>
                      Tanggal Lahir
                    </p>
                    <p className="fz-16">1 Januari 2000</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Alamat */}
            <div>
              <h3 className="card-title font-weight-bolder text-dark border-top w-100 pt-5 mb-5 mt-5 titles-1">
                Alamat
              </h3>
              <p className="mb-2" style={colorText}>
                Alamat (Sesuai KTP)
              </p>
              <p className="fz-16">
                Jl. Almuwahiddin Kp. Kaum Kidul Desa Karang Tengah No. 1 Depok
                Jawabarat
              </p>
              <div className="row">
                <div className="col-12 col-sm-6">
                  <div>
                    <p className="mb-2" style={colorText}>
                      Provinsi
                    </p>
                    <p className="fz-16">Jawa Barat</p>
                    <p className="mb-2 mt-4" style={colorText}>
                      Kode Pos
                    </p>
                    <p className="fz-16">12423</p>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div>
                    <p className="mb-2" style={colorText}>
                      Provinsi
                    </p>
                    <p className="fz-16">Jawa Barat</p>
                    <p className="mb-2 mt-4" style={colorText}>
                      Kode Pos
                    </p>
                    <p className="fz-16">12423</p>
                  </div>
                </div>
              </div>
              <p className="mb-2 mt-6" style={colorText}>
                Alamat (Sesuai KTP)
              </p>
              <p className="fz-16">
                Jl. Almuwahiddin Kp. Kaum Kidul Desa Karang Tengah No. 1 Depok
                Jawabarat
              </p>
              <div className="row">
                <div className="col-6">
                  <div>
                    <p className="mb-2" style={colorText}>
                      Provinsi
                    </p>
                    <p className="fz-16">Jawa Barat</p>
                    <p className="mb-2 mt-4" style={colorText}>
                      Kode Pos
                    </p>
                    <p className="fz-16">12423</p>
                  </div>
                </div>
                <div className="col-6">
                  <div>
                    <p className="mb-2" style={colorText}>
                      Provinsi
                    </p>
                    <p className="fz-16">Jawa Barat</p>
                    <p className="mb-2 mt-4" style={colorText}>
                      Kode Pos
                    </p>
                    <p className="fz-16">12423</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Berkas Pribadi */}
            <div>
              <h3 className="card-title font-weight-bolder text-dark border-top w-100 pt-5 mb-5 mt-5 titles-1">
                Berkas Pribadi
              </h3>
              <div className="row">
                <div className="col-6">
                  <div>
                    <p className="mb-2" style={colorText}>
                      KTP
                    </p>
                    <p className="fz-16">Scan Ktp.pdf</p>
                  </div>
                </div>
                <div className="col-6">
                  <div>
                    <p className="mb-2" style={colorText}>
                      Email
                    </p>
                    <p className="fz-16">Scan Ijazah.jpg</p>
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
