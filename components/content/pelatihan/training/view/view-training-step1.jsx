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
    logoReference: review.logo
      ? process.env.END_POINT_API_IMAGE_BEASISWA + review.logo
      : "/assets/media/default.jpg",
    thumbnail: review.thumbnail
      ? process.env.END_POINT_API_IMAGE_BEASISWA + review.thumbnail
      : "/assets/media/default.jpg",
    silabus: review.silabus,
    metodePelatihan: review.metode_pelatihan,
    penyelenggara: review.penyelenggara,
    mitra: review.mitra,
    tanggalPendaftaran:
      moment(review.pendaftaran_mulai).format("DD MMMM YYYY") +
      " sd " +
      moment(review.pendaftaran_selesai).format("DD MMMM YYYY"),
    tanggalPelatihan:
      moment(review.pelatihan_mulai).format("DD MMMM YYYY") +
      " sd " +
      moment(review.pelatihan_selesai).format("DD MMMM YYYY"),
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
    disabilitas: "Umum",
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
                <p className="text-neutral-body">Peserta DTS</p>
                <p>{dataPelatihan.peserta}</p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Ketentuan Peserta</p>
                <p className="font-weight-bold">
                  {dataPelatihan.ketentuanPeserta}
                </p>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <p className="text-neutral-body">Nama Pelatihan</p>
                <p className="text-dark">{dataPelatihan.namaPelatihan}</p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Level Pelatihan</p>
                <p className="text-dark">{dataPelatihan.levelPelatihan}</p>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <p className="text-neutral-body">Akademi</p>
                <p className="text-dark">{dataPelatihan.akademi}</p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Tema</p>
                <p className="text-dark">{dataPelatihan.tema}</p>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <p className="text-neutral-body">Logo Reference</p>
                <div className="">
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
                </div>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Thumbnail</p>
                <div className="">
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
                </div>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <p className="text-neutral-body">Silabus</p>
                <p className="text-dark">{dataPelatihan.silabus}</p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Metode Pelatihan</p>
                <p className="text-dark">{dataPelatihan.metodePelatihan}</p>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <p className="text-neutral-body">Penyelenggara</p>
                <p className="text-dark">{dataPelatihan.penyelenggara}</p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Mitra</p>
                <p className="text-dark">{dataPelatihan.mitra}</p>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <p className="text-neutral-body">Tanggal Pendaftaran</p>
                <p className="text-dark">{dataPelatihan.tanggalPendaftaran}</p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Tanggal Pelatihan</p>
                <p className="text-dark">{dataPelatihan.tanggalPelatihan}</p>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-12">
                <p className="text-neutral-body">Deskripsi</p>

                <div
                  dangerouslySetInnerHTML={{ __html: dataPelatihan.deskripsi }}
                  style={{ overflowWrap: "break-word" }}
                ></div>
              </div>
            </div>

            <h3 className="font-weight-bolder pb-5 pt-4">Kuota Pelatihan</h3>
            <div className="row">
              <div className="col-md-6">
                <p className="text-neutral-body">Kuota Target Pendaftar</p>
                <p className="text-dark">
                  {kuotaPelatihan.kuotaTargetPendaftar}
                </p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Kuota Target Peserta</p>
                <p className="text-dark">{kuotaPelatihan.kuotaTargetPeserta}</p>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <p className="text-neutral-body">Komitmen Peserta</p>
                <p className="text-dark">{kuotaPelatihan.komitmenPeserta}</p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">LPJ Peserta</p>
                <p className="text-dark">{kuotaPelatihan.lpjPeserta}</p>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <p className="text-neutral-body">Info Sertifikasi</p>
                <p className="text-dark"> {kuotaPelatihan.infoSertifikasi}</p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Metode Pelatihan</p>
                <p className="text-dark"> {kuotaPelatihan.metodePelatihan}</p>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <p className="text-neutral-body">Status Kuota</p>
                <p className="text-dark"> {kuotaPelatihan.statusKuota}</p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Alur Pendaftaran</p>
                <p className="text-dark"> {kuotaPelatihan.alurPendaftaran}</p>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <p className="text-neutral-body">Zonasi</p>
                <p className="text-dark"> {kuotaPelatihan.zonasi}</p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Batch</p>
                <p className="text-dark"> {kuotaPelatihan.batch}</p>
              </div>
            </div>

            <h3 className="font-weight-bolder pb-5 pt-4">Alamat</h3>
            <div className="row">
              <div className="col-md-12">
                <p className="text-neutral-body">Alamat</p>
                <p className="text-dark">{alamatPelatihan.alamat}</p>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <p className="text-neutral-body">Provinsi</p>
                <p className="text-dark">{alamatPelatihan.provinsi}</p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Kota / Kabupaten</p>
                <p className="text-dark">{alamatPelatihan.kota}</p>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-12">
                <p className="text-neutral-body">Disabilitas</p>
                <p className="text-dark">{alamatPelatihan.disabilitas}</p>
              </div>
            </div>

            <div className="button my-5">
              <div className="text-right">
                <button
                  className="btn btn-primary-rounded-full mr-2"
                  type="button"
                  onClick={() => router.back()}
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
