import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import Select from "react-select";

import PageWrapper from "../../../wrapper/page.wrapper";
import CardPage from "../../../CardPage";
import StepParticipantPelatihan from "../../../StepParticipantPelatihan";

import ProfileUser from "./participant/profile";
import HistoryPage from "./participant/history";
import FileRegister from "./participant/file-register";
import SuportDocument from "./participant/suport-document";

import { useDispatch, useSelector } from "react-redux";

const DataParticipant = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  let { page = 1, success } = router.query;
  page = Number(page);

  const [step, setStep] = useState(1);

  const [dataProfile, setDataProfile] = useState({
    image: "/assets/media/default.jpg",
    namaLengkap: "Lala Racing",
    email: "lalaracing@gmail.com",
    nik: "12344455324566",
    jenisKelamin: "Perempuan",
    noHp: "0855765456876",
    pendidikan: "S1",
    namaKontakDarurat: "Rany Febrianti",
    nomorKontakDarurat: "0868687867",
    tempatLahir: "Depok",
    tanggalLahir: "1 Januari 2000",
  });

  const [dataCommitment, setDataCommitment] = useState({
    date: "1 Oktober 2021",
    time: "12:00:11",
  });

  const [dataFileRegister, setFileRegister] = useState({
    universitas: "Universitas Indonesia",
    ipk: "4.2",
    tahunDaftar: "1992",
    tahunLulus: "2020",
  });

  const [dataLpj, setDataLpj] = useState([
    {
      uraian:
        "Self-paced Learning : Peserta pelatihan belajar secara mandiri melalui laptop/komputer, jadwal pelaksanaan Self-paced Learning diatur secara mandiri oleh peserta dalam batas durasi pelatihan",
      value: true,
    },
    {
      uraian:
        "Live Session : Sesi tatap muka secara daring/online antara instruktur dan peserta pelatihan, peserta pelatihan mendapatkan kesempatan bertanya dan berinteraksi dengan instruktur pada tema pelatihan tertentu",
      value: false,
    },
    {
      uraian:
        "Hands-on Lab : Peserta akan mengerjakan suatu project secara mandiri pada Virtual Lab. Sesi pelatihan tanya-jawab antara instruktur dan peserta pelatihan, peserta pelatihan mendapatkan kesempatan bertanya dan berinteraksi dengan instruktur pada tema pelatihan tertentu di Program Pelatihan melalui Grup Komunikasi Kelas.",
      value: true,
    },
    {
      uraian:
        "Certificate of Completion : diberikan kepada peserta yang menyelesaikan seluruh sesi pelatihan, mengisi survey dan mengunggah/upload Laporan Pertanggungjawaban di digitalent.kominfo.go.id",
      value: true,
    },
    {
      uraian:
        "Bantuan Biaya Komunikasi : diberikan kepada peserta yang mengikuti pelatihan secara aktif di LMS maupun Live session sesuai ketentuan yang berlaku",
      value: true,
    },
  ]);

  const [dataHistory, setDataHistory] = useState([
    {
      pelatihan: "Web Programming",
      pelaksanaan: "1 Oktober 2021 sd 2 Desember 2021",
      status: "Lulus",
    },
    {
      pelatihan: "Pemasaran",
      pelaksanaan: "3 Oktober 2021 sd 5 Desember 2021",
      status: "Tidak Lulus",
    },
  ]);

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

  const handleViewParticipant = () => {
    switch (step) {
      case 1:
        return <ProfileUser profile={dataProfile} />;
        break;
      case 2:
        return <HistoryPage history={dataHistory} />;
        break;
      case 3:
        return <FileRegister file={dataFileRegister} />;
        break;
      case 4:
        return (
          <SuportDocument
            commitment={dataCommitment}
            lpj={dataLpj}
            saran="Kalau Saran dari saya, Bantuan Biaya Komunikasi masih harus diperhatikan. karena kita dimasa PPKM, segalanya harus serba Online. tolong agar dipercepat respon ketika online saja. Terima Kasih"
          />
        );
        break;
      default:
        return <ProfileUser />;
        break;
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
              Cristiano Messi - 34293482734928347
            </h1>
            <div className="card-toolbar">
              <Link href="/pelatihan/pelatihan/tambah-pelatihan">
                <a className="btn btn-primary-rounded-full px-6 font-weight-bolder px-5 py-2 mt-2">
                  Peserta Selanjutnya
                  <i className="ri-skip-forward-mini-fill ml-2"></i>
                </a>
              </Link>
            </div>
          </div>

          <div className="card-body pb-0">
            <div className="row">
              <div className="col-md-12">
                <p className="text-neutral-body my-0">Test Substansi</p>
                <p className="text-success">Lulus Substansi</p>
              </div>
            </div>
            <div className="form-group row mb-2">
              <div className="col-sm-12 col-md-6">
                <label className="col-form-label font-weight-bold">
                  Administrasi
                </label>
                <Select options={options} />
              </div>
              <div className="col-sm-12 col-md-6">
                <label className="col-form-label font-weight-bold">
                  Status Peserta
                </label>
                <Select options={options} />
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
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0 mt-3">
            <h1
              className="card-title text-dark mt-2"
              style={{ fontSize: "24px" }}
            >
              Reminder Kelengkapan Berkas
            </h1>
          </div>

          <div className="card-body pt-0">
            <div className="form-check form-check-inline mr-5">
              <input
                type="checkbox"
                name="reminder"
                className="form-check-input"
                value="profile"
              />
              <label className="form-check-label">Profile</label>
            </div>
            <div className="form-check form-check-inline mr-5">
              <input
                type="checkbox"
                name="reminder"
                className="form-check-input"
                value="riwayat_pelatihan"
              />
              <label className="form-check-label">Riwayat Pelatihan</label>
            </div>
            <div className="form-check form-check-inline mr-5">
              <input
                type="checkbox"
                name="reminder"
                className="form-check-input"
                value="berkas_pendaftaran"
              />
              <label className="form-check-label">Berkas Pendaftaran</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="checkbox"
                name="reminder"
                className="form-check-input"
                value="dokumen_pendukung"
              />
              <label className="form-check-label">Dokumen Pendukung</label>
            </div>
          </div>
        </div>
      </div>

      <StepParticipantPelatihan
        step={step}
        title1="Profile"
        title2="Riwayat Pelatihan"
        title3="Berkas Pendaftaran"
        title4="Dokumen Pendukung"
        setStepProps={(val) => setStep(val)}
      />
      <div className="col-lg-12 order-1 px-0">{handleViewParticipant()}</div>
    </PageWrapper>
  );
};

export default DataParticipant;
