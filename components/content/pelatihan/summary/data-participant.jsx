import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import Select from "react-select";
import { toast } from "react-toastify";
import moment from "moment";

import PageWrapper from "../../../wrapper/page.wrapper";
import CardPage from "../../../CardPage";
import StepParticipantPelatihan from "../../../StepParticipantPelatihan";

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

  const optionsPeserta = [
    { value: "menunggu", label: "Menunggu" },
    { value: "tidak lulus administrasi", label: "Tidak Lulus Administrasi" },
    { value: "tes substansi", label: "Tes Substansi" },
    { value: "tidak lulus tes substansi", label: "Tidak Lulus Tes Substansi" },
    { value: "lulus tes substansi", label: "Lulus Tes Substansi" },
    { value: "ditolak", label: "Ditolak" },
    { value: "diterima", label: "Diterima" },
    { value: "pelatihan", label: "Pelatihan" },
    { value: "lulus pelatihan", label: "Lulus Pelatihan" },
    { value: "tidak lulus pelatihan", label: "Tidak Lulus Pelatihan" },
  ];

  const optionsAdministrasi = [
    { value: "unverified", label: "Unverified" },
    { value: "verified", label: "Verified" },
    { value: "incomplete", label: "Incomplete" },
  ];

  const [statusAdministrasi, setStatusAdministrasi] = useState(null);
  const [statusPeserta, setStatusPeserta] = useState(null);

  useEffect(() => {
    if (peserta) {
      dispatch(getDataPribadi(token, peserta.list[0].id));
      dispatch(getReminderBerkas(token, peserta.list[0].id));
      dispatch(getRiwayatPelatihan(token, peserta.list[0].id));
      dispatch(getBerkasPendaftaran(token, peserta.list[0].id));
      dispatch(getFormKomitmen(token, peserta.list[0].id));
      dispatch(getFormLpj(token, peserta.list[0].id));
    }

    if (errorUpdateStatus) {
      toast.error(errorUpdateStatus);
      dispatch(clearErrors());
    }

    if (errorReminderUp) {
      toast.error(errorReminderUp);
      dispatch(clearErrors());
    }

    if (successStatus) {
      dispatch(getDataPribadi(token, peserta.list[0].id));
      dispatch(getReminderBerkas(token, peserta.list[0].id));
      dispatch(getRiwayatPelatihan(token, peserta.list[0].id));
      dispatch(getBerkasPendaftaran(token, peserta.list[0].id));
      dispatch(getFormKomitmen(token, peserta.list[0].id));
      dispatch(getFormLpj(token, peserta.list[0].id));
      toast.success("Berhasil Mengubah Status");
      dispatch({ type: UPDATE_STATUS_RESET });
    }

    if (successReminder) {
      dispatch(getDataPribadi(token, peserta.list[0].id));
      dispatch(getReminderBerkas(token, peserta.list[0].id));
      dispatch(getRiwayatPelatihan(token, peserta.list[0].id));
      dispatch(getBerkasPendaftaran(token, peserta.list[0].id));
      dispatch(getFormKomitmen(token, peserta.list[0].id));
      dispatch(getFormLpj(token, peserta.list[0].id));
      // toast.success("Berhasil Mengubah Reminder");
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
    const administrasi = statusAdministrasi.value;
    const status = statusPeserta.value;

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
              <div className="col-md-12">
                <p className="text-neutral-body my-0">Test Substansi</p>
                <p className="text-success">
                  {peserta.list[0].subtansi_status || "-"}
                </p>
              </div>
            </div>
            <div className="form-group row mb-2">
              <div className="col-sm-12 col-md-6">
                <label className="col-form-label font-weight-bold">
                  Administrasi
                </label>
                <Select
                  options={optionsAdministrasi}
                  placeholder={peserta.list[0].administrasi || "-"}
                  onChange={(e) =>
                    setStatusAdministrasi({ label: e.label, value: e.value })
                  }
                />
              </div>
              <div className="col-sm-12 col-md-6">
                <label className="col-form-label font-weight-bold">
                  Status Peserta
                </label>
                <Select
                  options={optionsPeserta}
                  placeholder={peserta.list[0].status || "-"}
                  onChange={(e) =>
                    setStatusPeserta({ label: e.label, value: e.value })
                  }
                />
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
                <button
                  className="btn btn-primary-rounded-full"
                  type="button"
                  onClick={() => handleStatusPeserta()}
                >
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
