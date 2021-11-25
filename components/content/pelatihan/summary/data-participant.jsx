import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { SweatAlert } from "../../../../utils/middleware/helper";
import Select from "react-select";
import moment from "moment";

import PageWrapper from "../../../wrapper/page.wrapper";
import CardPage from "../../../CardPage";
import StepParticipantPelatihan from "../../../StepParticipantPelatihan";
import LoadingTable from "../../../LoadingTable";

import ProfileUser from "./participant/profile";
import HistoryPage from "./participant/history";
import FileRegister from "./participant/file-register";
import SuportDocument from "./participant/suport-document";

import {
  updateStatusPeserta,
  updateReminder,
  getDataPribadi,
  getReminderBerkas,
  getRiwayatPelatihan,
  getBerkasPendaftaran,
  getFormKomitmen,
  getFormLpj,
  clearErrors,
} from "../../../../redux/actions/pelatihan/summary.actions";
import { getEditTrainingStep1 } from "../../../../redux/actions/pelatihan/training.actions";
import {
  UPDATE_STATUS_RESET,
  UPDATE_REMINDER_RESET,
} from "../../../../redux/types/pelatihan/summary.type";

import { useDispatch, useSelector } from "react-redux";

const DataParticipant = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  let { pelatihan_id, index } = router.query;
  index = Number(index);

  const { error: errorDataPeserta, peserta } = useSelector(
    (state) => state.getPendaftaranPeserta
  );
  const { error: errorReminder, reminder } = useSelector(
    (state) => state.getReminderBerkas
  );
  const { error: errorRiwayat, riwayat } = useSelector(
    (state) => state.getRiwayatPelatihan
  );
  const { error: errorBerkasPendaftaran, berkas } = useSelector(
    (state) => state.getBerkasPendaftaran
  );
  const { error: errorFormKomitmen, formKomitmen } = useSelector(
    (state) => state.getFormKomitmen
  );
  const { error: errorFormLpj, formLpj } = useSelector(
    (state) => state.getFormLpj
  );
  const { error: errorDataPribadiRow, dataPeserta } = useSelector(
    (state) => state.getDataPribadiRow
  );
  const { error: errorDataPelatihan, data: dataTraining } = useSelector(
    (state) => state.getEditTraining
  );
  const {
    error: errorUpdateStatus,
    loading,
    status: statusRes,
    success: successStatus,
  } = useSelector((state) => state.updateStatusPeserta);
  const {
    error: errorReminderUp,
    reminder: reminderRes,
    success: successReminder,
  } = useSelector((state) => state.updateReminder);

  const [step, setStep] = useState(1);

  const [dataProfile, setDataProfile] = useState({
    image:
      dataPeserta.file_path + dataPeserta.foto || "/assets/media/default.jpg",
    namaLengkap: dataPeserta.name,
    email: dataPeserta.email,
    nik: dataPeserta.nik,
    jenisKelamin: dataPeserta.jenis_kelamin,
    noHp: dataPeserta.nomor_handphone,
    pendidikan: dataPeserta.asal_pendidikan,
    namaKontakDarurat: dataPeserta.Nama_kontak_darurat,
    nomorKontakDarurat: dataPeserta.nomor_handphone_darurat,
    tempatLahir: dataPeserta.tempat_lahir,
    tanggalLahir: moment(dataPeserta.tanggal_lahir).format("DD MMMM YYYY"),
  });

  let optionsPeserta = [
    { value: "seleksi administrasi", label: "Seleksi Administrasi" },
    { value: "tidak lulus administrasi", label: "Tidak Lulus Administrasi" },
    { value: "tes substansi", label: "Tes Substansi" },
    { value: "tidak lulus tes substansi", label: "Tidak Lulus Tes Substansi" },
    { value: "seleksi akhir", label: "Seleksi Akhir" },
    { value: "ditolak", label: "Ditolak" },
    { value: "diterima", label: "Diterima" },
    { value: "pelatihan", label: "Pelatihan" },
    { value: "administrasi akhir", label: "Administrasi Akhir" },
    { value: "lulus pelatihan", label: "Lulus Pelatihan" },
    { value: "tidak lulus pelatihan", label: "Tidak Lulus Pelatihan" },
  ];

  switch (dataTraining && dataTraining.alur_pendaftaran) {
    case "Tes Substansi - Administrasi":
      switch (peserta.list[0].status) {
        case "seleksi akhir":
          optionsPeserta = [
            { value: "ditolak", label: "Ditolak" },
            { value: "diterima", label: "Diterima" },
          ];
          break;
      }
      break;
    case "Administrasi - Test Substansi":
      switch (peserta.list[0].status) {
        case "seleksi akhir":
          optionsPeserta = [
            { value: "seleksi akhir", label: "Seleksi Akhir" },
            { value: "ditolak", label: "Ditolak" },
            { value: "diterima", label: "Diterima" },
          ];
          break;
      }
      break;
    case "Tanpa Tes Substansi dan Administrasi":
      switch (peserta.list[0].status) {
        case "seleksi akhir":
          optionsPeserta = [
            { value: "seleksi akhir", label: "Seleksi Akhir" },
            { value: "ditolak", label: "Ditolak" },
            { value: "diterima", label: "Diterima" },
          ];
          break;
      }
      break;

    default:
      break;
  }

  switch (peserta.list[0].status) {
    case "ditolak":
      optionsPeserta = [{ value: "ditolak", label: "Ditolak" }];
      break;
    case "diterima":
      optionsPeserta = [
        { value: "diterima", label: "Diterima" },
        { value: "pelatihan", label: "Pelatihan" },
      ];
      break;
    case "pelatihan":
      optionsPeserta = [
        { value: "pelatihan", label: "Pelatihan" },
        { value: "administrasi akhir", label: "Administrasi Akhir" },
      ];
      break;
    case "administrasi akhir":
      optionsPeserta = [
        { value: "administrasi akhir", label: "Administrasi Akhir" },
        { value: "lulus pelatihan", label: "Lulus Pelatihan" },
        { value: "tidak lulus pelatihan", label: "Tidak Lulus Pelatihan" },
      ];
      break;
    case "tidak lulus pelatihan":
      optionsPeserta = [
        { value: "tidak lulus pelatihan", label: "Tidak Lulus Pelatihan" },
      ];
      break;
    case "lulus pelatihan":
      optionsPeserta = [{ value: "lulus pelatihan", label: "Lulus Pelatihan" }];
      break;
  }

  const optionsAdministrasi = [
    { value: "unverified", label: "Unverified" },
    { value: "verified", label: "Verified" },
    { value: "incomplete", label: "Incomplete" },
  ];

  const [statusAdministrasi, setStatusAdministrasi] = useState(
    peserta.list[0].administrasi || null
  );
  const [statusPeserta, setStatusPeserta] = useState(
    peserta.list[0].status || null
  );

  useEffect(() => {
    if (peserta) {
      dispatch(getDataPribadi(token, peserta.list[0].id));
      dispatch(getReminderBerkas(token, peserta.list[0].id));
      dispatch(getRiwayatPelatihan(token, peserta.list[0].id));
      dispatch(getBerkasPendaftaran(token, peserta.list[0].id));
      dispatch(getFormKomitmen(token, peserta.list[0].id));
      dispatch(getFormLpj(token, peserta.list[0].id));
      dispatch(getEditTrainingStep1(peserta.list[0].pelatian_id, token));
    }

    if (errorUpdateStatus) {
      SweatAlert("Gagal", errorUpdateStatus, "error");
      dispatch(clearErrors());
    }

    if (errorReminderUp) {
      SweatAlert("Gagal", errorReminderUp, "error");
      dispatch(clearErrors());
    }

    if (successStatus) {
      dispatch(getDataPribadi(token, peserta.list[0].id));
      dispatch(getReminderBerkas(token, peserta.list[0].id));
      dispatch(getRiwayatPelatihan(token, peserta.list[0].id));
      dispatch(getBerkasPendaftaran(token, peserta.list[0].id));
      dispatch(getFormKomitmen(token, peserta.list[0].id));
      dispatch(getFormLpj(token, peserta.list[0].id));
      SweatAlert("Berhasil", "Berhasil Mengubah Status", "success");
      dispatch({ type: UPDATE_STATUS_RESET });
    }

    if (successReminder) {
      dispatch(getDataPribadi(token, peserta.list[0].id));
      dispatch(getReminderBerkas(token, peserta.list[0].id));
      dispatch(getRiwayatPelatihan(token, peserta.list[0].id));
      dispatch(getBerkasPendaftaran(token, peserta.list[0].id));
      dispatch(getFormKomitmen(token, peserta.list[0].id));
      dispatch(getFormLpj(token, peserta.list[0].id));
      dispatch({ type: UPDATE_REMINDER_RESET });
    }
  }, [
    dispatch,
    peserta,
    token,
    errorUpdateStatus,
    errorReminderUp,
    successStatus,
    successReminder,
  ]);

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  const handleViewParticipant = () => {
    switch (step) {
      case 1:
        return <ProfileUser profile={dataPeserta} />;
        break;
      case 2:
        return <HistoryPage history={riwayat} />;
        break;
      case 3:
        return <FileRegister file={berkas} />;
        break;
      case 4:
        return <SuportDocument commitment={formKomitmen} lpj={formLpj} />;
        break;
      default:
        return <ProfileUser profile={dataProfile} />;
        break;
    }
  };

  const handleStatusPeserta = () => {
    const administrasi = statusAdministrasi.value || statusAdministrasi;
    const status = statusPeserta.value || statusPeserta;

    const data = {
      id: peserta.list[0].id,
      status,
      administrasi,
    };

    dispatch(updateStatusPeserta(data, token));
  };

  const handleUpdateReminder = (type, value) => {
    const data = {
      id: peserta.list[0].id,
      status: value ? "1" : "0",
      kolom: type,
    };
    dispatch(updateReminder(data, token));
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const capitalize = (s) => {
    let a = s.split(" ");
    let result = [];
    for (let i = 0; i < a.length; i++) {
      result.push(a[i].charAt(0).toUpperCase() + a[i].slice(1, a[i].length));
    }
    return result.join(" ");
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
              {peserta.list[0].name} - {peserta.list[0].nik}
            </h1>
            <div className="card-toolbar">
              {index + 1 <= peserta.total && (
                <Link
                  href={`/pelatihan/rekap-pendaftaran/detail-rekap-pendaftaran/data-peserta?pelatihan_id=${pelatihan_id}&index=${
                    index + 1
                  }`}
                >
                  <a className="btn btn-primary-rounded-full px-6 font-weight-bolder px-5 py-2 mt-2">
                    Peserta Selanjutnya
                    <i className="ri-skip-forward-mini-fill ml-2"></i>
                  </a>
                </Link>
              )}
            </div>
          </div>

          <div className="card-body pb-0">
            <div className="row">
              <div className="col-md-6">
                <p className="text-neutral-body my-0">Test Substansi</p>
                <p className="text-success">
                  {peserta.list[0].subtansi_status || "-"}
                </p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body my-0">Survey</p>
                <p className="text-success">
                  {peserta.list[0].survey_status || "Belum Tersedia"}
                </p>
              </div>
            </div>
            {/* PENYESUAIAN STATUS PESERTA PELATIHAN */}
            {dataTraining &&
              dataTraining.alur_pendaftaran ===
                "Tes Substansi - Administrasi" && (
                <div className="form-group row mb-2">
                  <div className="col-sm-12 col-md-6">
                    <label className="col-form-label font-weight-bold">
                      Administrasi
                    </label>
                    <Select
                      options={optionsAdministrasi}
                      placeholder={
                        capitalize(peserta.list[0].administrasi) || "-"
                      }
                      onChange={(e) =>
                        setStatusAdministrasi({
                          label: e.label,
                          value: e.value,
                        })
                      }
                      isDisabled={
                        peserta.list[0].status !== "seleksi administrasi" ||
                        (peserta.list[0].status !== "tidak lulus administrasi"
                          ? true
                          : false)
                      }
                    />
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <label className="col-form-label font-weight-bold">
                      Status Peserta
                    </label>
                    <Select
                      options={optionsPeserta}
                      placeholder={
                        capitalize(peserta.list[0].status)
                         || "-"
                      }
                      onChange={(e) =>
                        setStatusPeserta({ label: e.label, value: e.value })
                      }
                      isDisabled={
                        peserta.list[0].status !== "seleksi akhir"
                          ? true
                          : false
                      }
                    />
                  </div>
                </div>
              )}
            {dataTraining &&
              dataTraining.alur_pendaftaran ===
                "Administrasi - Test Substansi" && (
                <div className="form-group row mb-2">
                  <div className="col-sm-12 col-md-6">
                    <label className="col-form-label font-weight-bold">
                      Administrasi
                    </label>
                    <Select
                      options={optionsAdministrasi}
                      placeholder={
                        capitalize(peserta.list[0].administrasi)
                        || "-"
                      }
                      onChange={(e) =>
                        setStatusAdministrasi({
                          label: e.label,
                          value: e.value,
                        })
                      }
                      isDisabled={
                        peserta.list[0].status !== "tes substansi" ||
                        peserta.list[0].status !==
                          "tidak lulus tes substansi" ||
                        (peserta.list[0].status !== "seleksi akhir"
                          ? false
                          : true)
                      }
                    />
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <label className="col-form-label font-weight-bold">
                      Status Peserta
                    </label>
                    <Select
                      options={optionsPeserta}
                      placeholder={
                        capitalize(peserta.list[0].status)|| "-"
                      }
                      onChange={(e) =>
                        setStatusPeserta({ label: e.label, value: e.value })
                      }
                      isDisabled={
                        peserta.list[0].status === "seleksi administrasi" ||
                        peserta.list[0].status === "tidak lulus administrasi" ||
                        peserta.list[0].status === "tes substansi" ||
                        peserta.list[0].status === "tidak lulus tes substansi"
                          ? true
                          : false
                      }
                    />
                  </div>
                </div>
              )}
            {dataTraining &&
              dataTraining.alur_pendaftaran ===
                "Tanpa Tes Substansi dan Administrasi" && (
                <div className="form-group row mb-2">
                  <div className="col-sm-12 col-md-6">
                    <label className="col-form-label font-weight-bold">
                      Administrasi
                    </label>
                    <Select
                      options={optionsAdministrasi}
                      placeholder={
                        capitalize(peserta.list[0].administrasi) || "-"
                      }
                      onChange={(e) =>
                        setStatusAdministrasi({
                          label: e.label,
                          value: e.value,
                        })
                      }
                      isDisabled
                    />
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <label className="col-form-label font-weight-bold">
                      Status Peserta
                    </label>
                    <Select
                      options={optionsPeserta}
                      placeholder={
                        capitalize(peserta.list[0].status) || "-"
                      }
                      onChange={(e) =>
                        setStatusPeserta({ label: e.label, value: e.value })
                      }
                    />
                  </div>
                </div>
              )}
            {/* END PENYESUAIAN STATUS PESERTA PELATIHAN */}

            <div className="form-group mt-7">
              <div className="text-right">
                {loading !== true ? (
                  <>
                    <button
                      className="btn btn-light-ghost-rounded-full mr-2"
                      type="button"
                      onClick={() => router.back()}
                    >
                      Batal
                    </button>
                    <button
                      className="btn btn-primary-rounded-full"
                      type="button"
                      onClick={() => handleStatusPeserta()}
                    >
                      Simpan
                    </button>
                  </>
                ) : (
                  <LoadingTable loading={loading} />
                )}
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
                name="remender"
                className="form-check-input"
                checked={reminder.reminder_profile}
                onClick={() =>
                  handleUpdateReminder(
                    "reminder_profile",
                    !reminder.reminder_profile
                  )
                }
              />
              <label className="form-check-label">Profile</label>
            </div>
            <div className="form-check form-check-inline mr-5">
              <input
                type="checkbox"
                name="remender"
                className="form-check-input"
                checked={reminder.reminder_riwayat}
                onClick={() =>
                  handleUpdateReminder(
                    "reminder_riwayat",
                    !reminder.reminder_riwayat
                  )
                }
              />
              <label className="form-check-label">Riwayat Pelatihan</label>
            </div>
            <div className="form-check form-check-inline mr-5">
              <input
                type="checkbox"
                name="remender"
                className="form-check-input"
                checked={reminder.reminder_berkas}
                onClick={() =>
                  handleUpdateReminder(
                    "reminder_berkas",
                    !reminder.reminder_berkas
                  )
                }
              />
              <label className="form-check-label">Berkas Pendaftaran</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="checkbox"
                name="remender"
                className="form-check-input"
                checked={reminder.reminder_dokumen}
                onClick={() =>
                  handleUpdateReminder(
                    "reminder_dokumen",
                    !reminder.reminder_dokumen
                  )
                }
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
