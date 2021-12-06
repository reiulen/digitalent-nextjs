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
import ListPeserta from "./list-peserta-pelatihan";
import Tables from "./detail-list-peserta-pelatihan";

const Table = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const allDetailPeserta = useSelector((state) => state.allDetailPeserta);
  const [sideBar, setSideBar] = useState(true);

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

  return (
    <PageWrapper>
      <div className="row ">
        <div className="col-12 col-xl-3 order-0 d-flex align-items-self">
          <div className="card card-custom card-stretch gutter-b px-10 py-12">
            <div className="form-group" style={{ maxWidth: "19rem" }}>
              <div>
                <div
                  className="image-input image-input-outline w-100"
                  style={{ height: "19rem" }}
                >
                  <div
                    className="image-input-wrapper w-100"
                    style={{ height: "19rem" }}
                  >
                    <Image
                      src={
                        allDetailPeserta.data.data?.foto
                          ? allDetailPeserta.data.data.file_path +
                            allDetailPeserta.data.data.foto
                          : "/assets/media/logos/default.png"
                      }
                      width="1000"
                      height="1000"
                      alt="user2"
                    />
                  </div>

                  <span
                    className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                    data-action="cancel"
                    data-toggle="tooltip"
                    title="Cancel avatar"
                  >
                    <i className="ki ki-bold-close icon-xs text-muted"></i>
                  </span>
                </div>
                <div className="mt-4 w-100">
                  <Link
                    href={`/site-management/user/peserta-dts/ubah-peserta-dts/${router.query.id}`}
                  >
                    <a className="btn btn-outline-primary rounded-full w-100">
                      Ubah Data
                    </a>
                  </Link>
                  <ul style={listUl}>
                    <li
                      className={
                        sideBar
                          ? "p-4 listDTS isactive mb-2"
                          : "p-4 listDTS mb-2"
                      }
                      style={{ fontSize: "15px" }}
                      onClick={() => {
                        setSideBar(true);
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <Image
                          src={
                            sideBar
                              ? "/assets/icon/user2.svg"
                              : "/assets/icon/useract.svg"
                          }
                          width="20"
                          height="20"
                          alt="user2"
                        />
                        <p className="m-0 ml-4 mt-1">Informasi Data Pribadi</p>
                      </div>
                    </li>
                    <li
                      className={
                        sideBar ? "p-4 listDTS" : "p-4 listDTS isactive"
                      }
                      style={{ fontSize: "15px" }}
                      onClick={() => {
                        setSideBar(false);
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <Image
                          src={
                            sideBar
                              ? "/assets/icon/Briefcase.svg"
                              : "/assets/icon/BriefcaseAct.svg"
                          }
                          width="20"
                          height="20"
                          alt="user2"
                        />
                        <p className="m-0 ml-4 mt-1">Data Pelatihan</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {sideBar && (
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
                      <p className="fz-16">
                        {allDetailPeserta.data.data?.name}
                      </p>
                      <p className="mb-2 mt-4" style={colorText}>
                        Nomer Identitas (KTP)
                      </p>
                      <p className="fz-16">{allDetailPeserta.data.data?.nik}</p>
                      <p className="mb-2 mt-4" style={colorText}>
                        No Handphone
                      </p>
                      <p className="fz-16">
                        {allDetailPeserta.data.data?.nomor_handphone}
                      </p>
                      <p className="mb-2 mt-4" style={colorText}>
                        Nama Kontak Darurat
                      </p>
                      <p className="fz-16">
                        {allDetailPeserta.data.data?.Nama_kontak_darurat}
                      </p>
                      <p className="mb-2 mt-4" style={colorText}>
                        Tempat Lahir
                      </p>
                      <p className="fz-16">
                        {allDetailPeserta.data.data?.tempat_lahir}
                      </p>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div>
                      <p className="mb-2" style={colorText}>
                        Email
                      </p>
                      <p className="fz-16">
                        {allDetailPeserta.data.data?.email}
                      </p>
                      <p className="mb-2 mt-4" style={colorText}>
                        Jenis Kelamin
                      </p>
                      <p className="fz-16">
                        {allDetailPeserta.data.data?.jenis_kelamin}
                      </p>
                      <p className="mb-2 mt-4" style={colorText}>
                        Pendidikan
                      </p>
                      <p className="fz-16">
                        {allDetailPeserta.data.data?.jenjang}
                      </p>
                      <p className="mb-2 mt-4" style={colorText}>
                        Nomor Kontak Darurat
                      </p>
                      <p className="fz-16">
                        {allDetailPeserta.data.data?.nomor_handphone_darurat}
                      </p>
                      <p className="mb-2 mt-4" style={colorText}>
                        Tanggal Lahir
                      </p>
                      <p className="fz-16">
                        {moment(allDetailPeserta.data.data?.tanggal_lahir).format("D MMMM YYYY")}
                      </p>
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
                  {allDetailPeserta.data.data?.address_ktp}
                </p>
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <div>
                      <p className="mb-2" style={colorText}>
                        Provinsi
                      </p>
                      <p className="fz-16">
                        {allDetailPeserta.data.data?.provinsi_ktp}
                      </p>
                      <p className="mb-2 mt-4" style={colorText}>
                        Kode Pos
                      </p>
                      <p className="fz-16">
                        {allDetailPeserta.data.data?.kode_pos_ktp}
                      </p>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div>
                      <p className="mb-2" style={colorText}>
                        Kota
                      </p>
                      <p className="fz-16">
                        {allDetailPeserta.data.data?.kota_ktp}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mb-2 mt-6" style={colorText}>
                  Alamat Domisili
                </p>
                <p className="fz-16">{allDetailPeserta.data.data?.address}</p>
                <div className="row">
                  <div className="col-6">
                    <div>
                      <p className="mb-2" style={colorText}>
                        Provinsi
                      </p>
                      <p className="fz-16">
                        {allDetailPeserta.data.data?.provinsi}
                      </p>
                      <p className="mb-2 mt-4" style={colorText}>
                        Kode Pos
                      </p>
                      <p className="fz-16">
                        {allDetailPeserta.data.data?.kode_pos}
                      </p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <p className="mb-2" style={colorText}>
                        Kota
                      </p>
                      <p className="fz-16">
                        {allDetailPeserta.data.data?.kota}
                      </p>
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
                      <p className="fz-16">
                        {allDetailPeserta.data.data?.File_ktp}
                      </p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <p className="mb-2" style={colorText}>
                        Ijazah
                      </p>
                      <p className="fz-16">
                        {allDetailPeserta.data.data?.ijazah}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!sideBar && <ListPeserta token={token} />}
      </div>
    </PageWrapper>
  );
};

export default Table;
