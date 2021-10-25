import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { Badge } from "react-bootstrap";

import Layout from "../../../wrapper/layout.wrapper";
import SubHeaderComponent from "../../../../components/template/Subheader.component";
import TrainingReminder from "../../../../components/TrainingReminder";
import style from "../../../../../styles/peserta/dashboard.module.css";
import IconLove from "../../../../../components/assets/icon/Love";
import IconShare from "../../../../../components/assets/icon/Share";
// import DownloadButton from "../../../../components/DownloadButton";
// import FilterBar from "../../../../components/FilterBar";

const DetailPelatihan = () => {
  const { pelatihan } = useSelector((state) => state.detailPelatihan);

  return (
    <Layout title="Detail Pelatihan">
      {/* <FilterBar /> */}
      <SubHeaderComponent />

      {pelatihan ? (
        <div className="row mt-13">
          <div className="col-12 col-xl-8">
            <div className="bg-white">
              <div className="ml-2 mb-3">
                <h1 className="fw-700 fz-36">{pelatihan.name}</h1>
                <div className="d-flex align-items-center">
                  <p className="mr-6 fz-18 fw-600">{pelatihan.akademi}</p>
                  <p className="badgess-green">{pelatihan.Status}</p>
                </div>

                <div className="row mt-8">
                  <div className="col-6 col-sm-5">
                    <div>
                      <p className="mb-2" style={{ color: "#6C6C6C" }}>
                        Registrasi
                      </p>
                      <p className="fz-16">
                        {moment(pelatihan.pendaftaran_mulai).format(
                          "DD MMMM YYYY"
                        )}{" "}
                        -{" "}
                        {moment(pelatihan.pendaftaran_selesai).format(
                          "DD MMMM YYYY"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="col-6 col-sm-2">
                    <div>
                      <p className="mb-2" style={{ color: "#6C6C6C" }}>
                        Pelaksanaan
                      </p>
                      <p className="fz-16">{pelatihan.metode_pelatihan}</p>
                    </div>
                  </div>
                  <div className="col-6 col-sm-3">
                    <div>
                      <p className="mb-2" style={{ color: "#6C6C6C" }}>
                        Pendaftar
                      </p>
                      <p className="fz-16">{pelatihan.kuota_peserta} Peserta</p>
                    </div>
                  </div>
                  <div className="col-6 col-sm-2">
                    <div className="d-flex align-items-center justify-content-end">
                      <button className="btn btn-white roundedss-border mr-4">
                        {/* <i className="ri-share-line"></i> */}
                        <IconShare />
                      </button>
                      <button className="btn btn-white roundedss-border">
                        {/* <i className="ri-heart-line"></i> */}
                        <IconLove />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <Image
                // src={`/assets/media/image_28.svg`}
                src={`https://dts-beasiswa-dev.s3-ap-southeast-1.amazonaws.com/${pelatihan.logo}`}
                objectFit="cover"
                width="1500vh"
                height="500vh"
                className="rounded"
              />

              {/* Border */}
              {/* <div
                className="row ml-3 my-5 mr-5"
                style={{ height: "2px", backgroundColor: "#ADB5BD" }}
              ></div> */}

              <div className="p-4 border rounded mt-10">
                {pelatihan.deskripsi}
              </div>
            </div>
          </div>

          <div className="col-12 col-xl-4">
            <div className="bg-white border rounded p-6">
              <h4 className="fz-20 fw-600">Ikuti Pelatihan</h4>
              <span className="fz-16">
                {moment(pelatihan.pelatihan_mulai).format("DD MMMM YYYY")} -{" "}
                {moment(pelatihan.pelatihan_selesai).format("DD MMMM YYYY")}
              </span>

              {pelatihan.status === "Closed" ? (
                <Link
                  href={`/peserta/form-pendaftaran?id=${pelatihan.id}`}
                  passHref
                >
                  <a>
                    <button className="btn btn-primary rounded-pill btn-block mt-10  py-4">
                      Daftar Pelatihan
                    </button>
                  </a>
                </Link>
              ) : null}

              <button className="btn btn-outline-primary-new mt-4 rounded-pill mb-8 btn-block py-4">
                <i className="ri-download-cloud-fill"></i>
                <span>Unduh Silabus</span>
              </button>

              <hr />
              <div className="d-flex flex-wrap align-items-start mt-10">
                <Image
                  src={`/assets/icon/alamat-1.svg`}
                  width={30}
                  height={30}
                />
                <div className="ml-4">
                  <p className="fw-600 fz-18 mb-2">Alamat</p>
                  <p className="fz-16">{pelatihan.alamat}</p>
                </div>
              </div>

              <div className="d-flex flex-wrap align-items-start mt-4">
                <Image src={`/assets/icon/jam-1.svg`} width={30} height={30} />
                <div className="ml-4">
                  <p className="fw-600 fz-18 mb-2">Jadwal Pelatihan</p>
                  <p className="fz-16">
                    {moment(pelatihan.pelatihan_mulai).format("DD MMMM YYYY")} -{" "}
                    {moment(pelatihan.pelatihan_selesai).format("DD MMMM YYYY")}
                  </p>
                </div>
              </div>

              <div className="d-flex flex-wrap align-items-start mt-4">
                <Image src={`/assets/icon/jam-1.svg`} width={30} height={30} />
                <div className="ml-4">
                  <p className="fw-600 fz-18 mb-2">Jadwal Pelatihan</p>
                  <p className="fz-16">
                    {moment(pelatihan.pelatihan_mulai).format("DD MMMM YYYY")} -{" "}
                    {moment(pelatihan.pelatihan_selesai).format("DD MMMM YYYY")}
                  </p>
                </div>
              </div>

              <div className="d-flex flex-wrap align-items-start mt-4">
                <Image
                  src={`/assets/icon/kuota-1.svg`}
                  width={30}
                  height={30}
                />
                <div className="ml-4">
                  <p className="fw-600 fz-18 mb-2">Kuota</p>
                  <p className="fz-16">{pelatihan.kuota_pendaftar} peserta</p>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded mt-5 p-6">
                <h4 className="fz-20 fw-600">Mitra Pelatihan</h4>
             

              <div className="d-flex align-items-center mt-6">
                <div>
                  <Image
                    src={`/assets/icon/kuota-1.svg`}
                    // src={`https://dts-beasiswa-dev.s3-ap-southeast-1.amazonaws.com/${pelatihan.gambar_mitra}`}
                    width={50}
                    height={50}
                  />
                </div>


                <div className="ml-6">
                  <p className="fw-600 fz-16 mb-2">
                    Mitra Nama {pelatihan.mitra_nama}
                  </p>
                  <p style={{color:"#6C6C6C"}}>Mitra {pelatihan.mitra}</p>
                </div>



              </div>
            </div>

            <TrainingReminder />
          </div>
        </div>
      ) : null}
    </Layout>
  );
};

export default DetailPelatihan;
