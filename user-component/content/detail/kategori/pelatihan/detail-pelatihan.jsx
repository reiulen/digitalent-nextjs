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
import IconLove from '../../../../../components/assets/icon/Love'
import IconShare from '../../../../../components/assets/icon/Share'
// import DownloadButton from "../../../../components/DownloadButton";
// import FilterBar from "../../../../components/FilterBar";

const DetailPelatihan = () => {
  const { pelatihan } = useSelector((state) => state.detailPelatihan);

  return (
    <Layout title="Detail Pelatihan">
      {/* <FilterBar /> */}
      <SubHeaderComponent />

      {pelatihan ? (
        <div className="row mt-3">
          <div className="col-12 col-md-9">
            <div className="bg-white">
              <div className="ml-2 mb-3">
                <h1 className="fw-700 fz-36 mt-10">{pelatihan.name}</h1>
                <div className="d-flex align-items-center">
                  <p className="mr-6 fz-18 fw-600">{pelatihan.akademi}</p>
                  <p className="badgess-green">{pelatihan.Status}</p>
                </div>

                <div className="row mt-8">
                  <div className="col-3">
                    <div>
                      <p className="mb-2" style={{color: "#6C6C6C"}}>Registrasi</p>
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
                  <div className="col-3">
                    <div>
                      <p className="mb-2" style={{color: "#6C6C6C"}}>Pelaksanaan</p>
                      <p className="fz-16">{pelatihan.metode_pelatihan}</p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div>
                      <p className="mb-2" style={{color: "#6C6C6C"}}>Pendaftar</p>
                      <p className="fz-16">{pelatihan.kuota_peserta} Peserta</p>
                    </div>
                  </div>
                  <div className="col-3">
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

          <div className="col-12 col-md-3">
            <div className="bg-white border rounded">
              <div className="row mt-5 p-3">
                <h4 className="font-weight-bolder ml-3">Ikuti Pelatihan</h4>
                <div className="ml-3 mb-5">
                  {moment(pelatihan.pelatihan_mulai).format("DD MMMM YYYY")} -{" "}
                  {moment(pelatihan.pelatihan_selesai).format("DD MMMM YYYY")}
                </div>
                {pelatihan.status === "Closed" ? (
                  <div className="col-12 my-3">
                    <Link
                      href={`/peserta/form-pendaftaran?id=${pelatihan.id}`}
                      passHref
                    >
                      <a>
                        <button className="btn btn-primary-dashboard rounded-pill btn-block ">
                          Daftar Pelatihan
                        </button>
                      </a>
                    </Link>
                  </div>
                ) : null}

                <button className="btn btn-outline-primary-new  rounded-pill btn-block col-11 mx-3">
                  <i className="ri-download-cloud-fill"></i>
                  <span>Unduh Silabus</span>
                </button>
              </div>

              {/* Border */}
              <div
                className="row ml-3 my-5 mr-5"
                style={{
                  height: "2px",
                  backgroundColor: "#ADB5BD",
                  opacity: "0.4",
                }}
              ></div>
              <div className="row mt-5 p-3">
                <div className="col-2">
                  <Image
                    src={`/assets/icon/alamat-1.svg`}
                    width={50}
                    height={50}
                  />
                </div>
                <div className="col-10">
                  <div className="font-weight-bolder">Alamat</div>
                  <div>{pelatihan.alamat}</div>
                </div>
              </div>

              <div className="row mt-5 p-3">
                <div className="col-2">
                  <Image
                    src={`/assets/icon/jam-1.svg`}
                    width={50}
                    height={50}
                  />
                </div>
                <div className="col-10">
                  <div className="font-weight-bolder">Jadwal Pelatihan</div>
                  <div>
                    {moment(pelatihan.pelatihan_mulai).format("DD MMMM YYYY")} -{" "}
                    {moment(pelatihan.pelatihan_selesai).format("DD MMMM YYYY")}
                  </div>
                </div>
              </div>

              <div className="row mt-5 p-3">
                <div className="col-2">
                  <Image
                    src={`/assets/icon/kuota-1.svg`}
                    width={50}
                    height={50}
                  />
                </div>
                <div className="col-10">
                  <div className="font-weight-bolder">Kuota</div>
                  <div>{pelatihan.kuota_pendaftar} orang</div>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded mt-5">
              <div className="row">
                <h4 className="font-weight-bolder ml-5 p-3">Mitra Pelatihan</h4>
              </div>

              <div className="row mb-3">
                <div className="col-3 ml-3">
                  <Image
                    src={`/assets/icon/kuota-1.svg`}
                    // src={`https://dts-beasiswa-dev.s3-ap-southeast-1.amazonaws.com/${pelatihan.gambar_mitra}`}
                    width={50}
                    height={50}
                  />
                </div>
                <div className="col-5">
                  <div className="font-weight-bolder">
                    Mitra Nama {pelatihan.mitra_nama}
                  </div>
                  <div className="text-muted">Mitra {pelatihan.mitra}</div>
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
