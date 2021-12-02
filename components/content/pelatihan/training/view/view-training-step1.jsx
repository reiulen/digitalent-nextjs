import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import PageWrapper from "../../../../wrapper/page.wrapper";
import StepViewPelatihan from "../../../../StepViewPelatihan";

const ViewTrainingStep1 = () => {
  const router = useRouter();

  const { error: errorReview, review } = useSelector(
    (state) => state.getReviewStep1
  );

  const { id } = router.query;

  const [dataPelatihan, setDataPelatihan] = useState({
    peserta: review.program_dts === "1" ? "Ya" : "Tidak",
    ketentuanPeserta:
      review.ketentuan_peserta === "1"
        ? "Peserta dapat mengikuti pelatihan ini ditahun yang sama pada Akademi ini"
        : "",
    namaPelatihan: review.name,
    levelPelatihan: review.level_pelatihan,
    akademi: review.akademi,
    tema: review.tema,
    logoReference:
      review.logo && review.logo !== "Belum ada file"
        ? process.env.END_POINT_API_IMAGE_BEASISWA + review.logo
        : "/assets/media/default.jpg",
    thumbnail:
      review.thumbnail && review.thumbnail !== "Belum ada file"
        ? process.env.END_POINT_API_IMAGE_BEASISWA + review.thumbnail
        : "/assets/media/default.jpg",
    silabus: review.silabus,
    metodePelatihan: review.metode_pelatihan,
    penyelenggara: review.penyelenggara,
    mitra: review.mitra_nama,
    tanggalPendaftaran:
      moment(review.pendaftaran_mulai).utc().format("DD MMMM YYYY") +
      " sd " +
      moment(review.pendaftaran_selesai).utc().format("DD MMMM YYYY"),
    tanggalPelatihan:
      moment(review.pelatihan_mulai).utc().format("DD MMMM YYYY") +
      " sd " +
      moment(review.pelatihan_selesai).utc().format("DD MMMM YYYY"),
    deskripsi: review.deskripsi,
  });
  const [kuotaPelatihan, setKuotaPelatihan] = useState({
    kuotaTargetPendaftar: review.kuota_pendaftar,
    kuotaTargetPeserta: review.kuota_peserta,
    komitmenPeserta: review.komitmen === "1" ? "Iya" : "Tidak",
    lpjPeserta: review.lpj_peserta === "1" ? "Iya" : "Tidak",
    infoSertifikasi: review.sertifikasi === "1" ? "Iya" : "Tidak",
    metodePelatihan: review.metode_pelatihan,
    statusKuota: review.status_kuota,
    alurPendaftaran: review.alur_pendaftaran,
    zonasi: review.zonasi,
    batch: "2",
  });
  const [alamatPelatihan, setAlamatPelatihan] = useState({
    alamat: review.alamat,
    provinsi: review.provinsi,
    kota: review.kabupaten,
  });

  return (
    <PageWrapper>
      <StepViewPelatihan
        step={1}
        title1="Data Pelatihan"
        title2="Form Pendaftaran"
        title3="Form Komitmen"
        title4="Parameter"
        link1={`/pelatihan/pelatihan/view-pelatihan/${id}`}
        link2={`/pelatihan/pelatihan/view-pelatihan/view-form-pendaftaran/${id}`}
        link3={`/pelatihan/pelatihan/view-pelatihan/view-komitmen/${id}`}
        link4={`/pelatihan/pelatihan/view-pelatihan/view-parameter/${id}`}
      />

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-body py-4">
            <h3 className="font-weight-bolder pb-5 pt-4">Data Pelatihan</h3>
            <div className="row">
              <div className="col-md-6">
                <p className="text-neutral-body mb-2 fz-14">Peserta DTS</p>
                <p className="fz-16" style={{ color: "#1f1f1f" }}>
                  {dataPelatihan.peserta}
                </p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <p className="text-neutral-body mb-2 fz-14">Nama Pelatihan</p>
                <p className="fz-16" style={{ color: "#1f1f1f" }}>
                  {dataPelatihan.namaPelatihan}
                </p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body mb-2 fz-14">Level Pelatihan</p>
                <p className="fz-16" style={{ color: "#1f1f1f" }}>
                  {dataPelatihan.levelPelatihan}
                </p>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <p className="text-neutral-body mb-2 fz-14">Akademi</p>
                <p className="fz-16" style={{ color: "#1f1f1f" }}>
                  {dataPelatihan.akademi}
                </p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body mb-2 fz-14">Tema</p>
                <p className="fz-16" style={{ color: "#1f1f1f" }}>
                  {dataPelatihan.tema}
                </p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <p className="text-neutral-body mb-2 fz-14">Logo Reference</p>
                <div className="">
                  {dataPelatihan.logoReference.includes("default") && <p>-</p>}
                  {dataPelatihan.logoReference.includes("https") && (
                    <figure
                      className="avatar item-rtl"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                    >
                      <Image
                        src={dataPelatihan.logoReference}
                        alt="image"
                        width={160}
                        height={160}
                        objectFit="cover"
                      />
                    </figure>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body mb-2 fz-14">Thumbnail</p>
                <div className="">
                  {dataPelatihan.logoReference.includes("default") && <p>-</p>}
                  {dataPelatihan.logoReference.includes("https") && (
                    <figure
                      className="avatar item-rtl"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                    >
                      <Image
                        src={dataPelatihan.thumbnail}
                        alt="image"
                        width={160}
                        height={160}
                        objectFit="cover"
                      />
                    </figure>
                  )}
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <p className="text-neutral-body mb-2 fz-14">Silabus</p>
                <p className="fz-16" style={{ color: "#1f1f1f" }}>
                  {dataPelatihan.silabus.split("/")[2]}
                </p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body mb-2 fz-14">Metode Pelatihan</p>
                <p className="fz-16" style={{ color: "#1f1f1f" }}>
                  {dataPelatihan.metodePelatihan}
                </p>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <p className="text-neutral-body mb-2 fz-14">Penyelenggara</p>
                <p className="fz-16" style={{ color: "#1f1f1f" }}>
                  {dataPelatihan.penyelenggara}
                </p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body mb-2 fz-14">Mitra</p>
                <p className="fz-16" style={{ color: "#1f1f1f" }}>
                  {dataPelatihan.mitra}
                </p>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <p className="text-neutral-body mb-2 fz-14">
                  Tanggal Pendaftaran
                </p>
                <p className="fz-16" style={{ color: "#1f1f1f" }}>
                  {dataPelatihan.tanggalPendaftaran}
                </p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body mb-2 fz-14">
                  Tanggal Pelatihan
                </p>
                <p className="fz-16" style={{ color: "#1f1f1f" }}>
                  {dataPelatihan.tanggalPelatihan}
                </p>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-12">
                <p className="text-neutral-body mb-2 fz-14">Deskripsi</p>

                <div
                  dangerouslySetInnerHTML={{ __html: dataPelatihan.deskripsi }}
                  style={{ overflowWrap: "break-word" }}
                ></div>
              </div>
            </div>

            <h3 className="font-weight-bolder pb-5 pt-4">Kuota Pelatihan</h3>
            <div className="row">
              <div className="col-md-6">
                <p className="text-neutral-body mb-2 fz-14">
                  Kuota Target Pendaftar
                </p>
                <p className="fz-16" style={{ color: "#1f1f1f" }}>
                  {kuotaPelatihan.kuotaTargetPendaftar}
                </p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body mb-2 fz-14">
                  Kuota Target Peserta
                </p>
                <p className="fz-16" style={{ color: "#1f1f1f" }}>
                  {kuotaPelatihan.kuotaTargetPeserta}
                </p>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <p className="text-neutral-body mb-2 fz-14">Komitmen Peserta</p>
                <p className="fz-16" style={{ color: "#1f1f1f" }}>
                  {kuotaPelatihan.komitmenPeserta}
                </p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body mb-2 fz-14">LPJ Peserta</p>
                <p className="fz-16" style={{ color: "#1f1f1f" }}>
                  {kuotaPelatihan.lpjPeserta}
                </p>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <p className="text-neutral-body mb-2 fz-14">Info Sertifikasi</p>
                <p className="fz-16" style={{ color: "#1f1f1f" }}>
                  {" "}
                  {kuotaPelatihan.infoSertifikasi}
                </p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body mb-2 fz-14">Metode Pelatihan</p>
                <p className="fz-16" style={{ color: "#1f1f1f" }}>
                  {" "}
                  {kuotaPelatihan.metodePelatihan}
                </p>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <p className="text-neutral-body mb-2 fz-14">Status Kuota</p>
                <p className="fz-16" style={{ color: "#1f1f1f" }}>
                  {" "}
                  {kuotaPelatihan.statusKuota}
                </p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body mb-2 fz-14">Alur Pendaftaran</p>
                <p className="fz-16" style={{ color: "#1f1f1f" }}>
                  {" "}
                  {kuotaPelatihan.alurPendaftaran}
                </p>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <p className="text-neutral-body mb-2 fz-14">Zonasi</p>
                <p className="fz-16" style={{ color: "#1f1f1f" }}>
                  {" "}
                  {kuotaPelatihan.zonasi}
                </p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body mb-2 fz-14">Batch</p>
                <p className="fz-16" style={{ color: "#1f1f1f" }}>
                  {" "}
                  {kuotaPelatihan.batch}
                </p>
              </div>
            </div>
            <h3 className="font-weight-bolder pb-5 pt-4">Alamat</h3>
            <div className="row">
              <div className="col-md-12">
                <p className="text-neutral-body mb-2 fz-14">Alamat</p>
                <p className="fz-16" style={{ color: "#1f1f1f" }}>
                  {alamatPelatihan.alamat}
                </p>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <p className="text-neutral-body mb-2 fz-14">Provinsi</p>
                <p className="fz-16" style={{ color: "#1f1f1f" }}>
                  {alamatPelatihan.provinsi}
                </p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body mb-2 fz-14">Kota / Kabupaten</p>
                <p className="fz-16" style={{ color: "#1f1f1f" }}>
                  {alamatPelatihan.kota}
                </p>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-12">
                <p className="text-neutral-body mb-2 fz-14">Disabilitas</p>
                {review.umum === "1" && <p className="text-dark mb-1">Umum</p>}
                {review.tuna_netra === "1" && (
                  <p className="text-dark mb-1">Tuna Netra</p>
                )}
                {review.tuna_rungu === "1" && (
                  <p className="text-dark mb-1">Tuna Rungu</p>
                )}
                {review.tuna_daksa === "1" && (
                  <p className="text-dark mb-1">Tuna Daksa</p>
                )}
              </div>
            </div>

            <div className="button my-5">
              <div className="text-right">
                <button
                  className="btn btn-primary-rounded-full mr-2"
                  type="button"
                  onClick={() => router.push("/pelatihan/pelatihan")}
                >
                  Kembali
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ViewTrainingStep1;
