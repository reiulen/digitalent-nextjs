import {
  GET_TRAINING_STEP1,
  STORE_TRAINING_STEP1,
  GET_REGISTRATION_STEP2,
  STORE_REGISTRATION_STEP2,
  GET_COMMITMENT_STEP3,
  STORE_COMMITMENT_STEP3,
  RESET_COMMITMENT_STEP3,
} from "../../types/pelatihan/function.type";

export const getTrainingStep1 = () => async (dispatch) => {
  const data = {
    program_dts: "",
    ketentuan_peserta: false,
    name: "",
    level_pelatihan: "",
    akademi_id: "",
    tema_id: "",
    logoFile: "",
    logo: "",
    logoName: "Belum ada file",
    thumbnailFile: "",
    thumbnail: "",
    thumbnailName: "Belum ada file",
    silabusFile: "",
    silabus: "",
    silabusName: "Belum ada file",
    metode_pelaksanaan: "",
    penyelenggara: "",
    mitra: "",
    pendaftaran_mulai: "",
    pendaftaran_selesai: "",
    pelatihan_mulai: "",
    pelatihan_selesai: "",
    deskripsi: "",
    kuota_pendaftar: "",
    kuota_peserta: "",
    status_kuota: "",
    alur_pendaftaran: "",
    sertifikasi: "",
    lpj_peserta: "",
    zonasi_id: "",
    batch: "",
    metode_pelatihan: "",
    alamat: "",
    provinsi: "",
    kabupaten: "",
    umum: false,
    tuna_netra: false,
    tuna_rungu: false,
    tuna_daksa: false,
  };
  dispatch({
    type: GET_TRAINING_STEP1,
    payload: data,
  });
};

export const storeTrainingStep1 = (data) => async (dispatch) => {
  dispatch({
    type: STORE_TRAINING_STEP1,
    payload: data,
  });
};

export const getRegistrationStep2 = () => async (dispatch) => {
  const data = {
    judul_form: "",
    formBuilder: [
      {
        key: 1,
        name: "",
        element: "",
        size: "",
        option: "",
        dataOption: "",
        required: false,
      },
    ],
  };

  dispatch({
    type: GET_REGISTRATION_STEP2,
    payload: data,
  });
};

export const storeRegistrationStep2 = (data) => async (dispatch) => {
  dispatch({
    type: STORE_REGISTRATION_STEP2,
    payload: data,
  });
};

export const getCommitmentStep3 = () => async (dispatch) => {
  const data = {
    komitmen: "",
    deskripsi: "",
  };
  dispatch({
    type: GET_COMMITMENT_STEP3,
    payload: data,
  });
};

export const storeCommitmentStep3 = (data) => async (dispatch) => {
  dispatch({
    type: STORE_COMMITMENT_STEP3,
    payload: data,
  });
};
