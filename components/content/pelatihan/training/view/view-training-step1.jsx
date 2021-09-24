import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import PageWrapper from "../../../../wrapper/page.wrapper";
import StepViewPelatihan from "../../../../StepViewPelatihan";

const ViewTrainingStep1 = () => {
  const [dataPelatihan, setDataPelatihan] = useState({
    peserta: "Tidak",
    ketentuanPeserta:
      "Peserta dapat mengikuti pelatihan ini ditahun yang sama pada Akademi ini",
    namaPelatihan: "UI UX Design",
    levelPelatihan: "Hard",
    akademi: "Konoha",
    tema: "Anime",
    logoReference: "/assets/media/default.jpg",
    silabus: "file.pdf",
    metodePelatihan: "Jalan Ninja",
    penyelenggara: "Naruto",
    mitra: "Sasuke",
    tanggalPendaftaran: "15 Maret 2021 sd 21 Juni 2021",
    tanggalPelatihan: "16 Maret 2021 sd 22 Juni 2021",
    deskripsi: "Lorep Ipsum dicampur dengan bumbu",
  });
  const [kuotaPelatihan, setKuotaPelatihan] = useState({
    kuotaTargetPendaftar: "1000",
    kuotaTargetPeserta: "500",
    komitmenPeserta: "Iya",
    lpjPeserta: "Iya",
    infoSertifikasi: "Ada",
    metodePelatihan: "Offnine",
    statusKuota: "Full",
    alurPendaftaran: "Administrasi - Test Substansi",
    zonasi: "1",
    batch: "2",
  });
  const [alamatPelatihan, setAlamatPelatihan] = useState({
    alamat: "Jalan Konoha no 2 deket rumah jiraya",
    provinsi: "Jawabarat",
    kota: "Ciamis",
    disabilitas: "Umum",
  });

  const router = useRouter();

  return (
    <PageWrapper>
      <StepViewPelatihan
        step={1}
        title1="Data Pelatihan"
        title2="Form Pendaftaran"
        title3="Form Komitmen"
        title4="Parameter"
        link1={`/pelatihan/pelatihan/view-pelatihan/${1}`}
        link2={`/pelatihan/pelatihan/view-pelatihan/view-form-pendaftaran/${1}`}
        link3={`/pelatihan/pelatihan/view-pelatihan/view-komitmen/${1}`}
        link4={`/pelatihan/pelatihan/view-pelatihan/view-parameter/${1}`}
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
              <div className="col-md-12">
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
                <p className="text-dark">{dataPelatihan.deskripsi}</p>
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
