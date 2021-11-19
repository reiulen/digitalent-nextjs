import {
  GET_TRAINING_STEP1,
  STORE_TRAINING_STEP1,
  GET_REGISTRATION_STEP2,
  STORE_REGISTRATION_STEP2,
  GET_COMMITMENT_STEP3,
  STORE_COMMITMENT_STEP3,
  //dropdown
  GET_DROPDOWN_AGAMA,
  ERROR_DROPDOWN_AGAMA,
  GET_DROPDOWN_AKADEMI,
  ERROR_DROPDOWN_AKADEMI,
  GET_DROPDOWN_TEMA,
  ERROR_DROPDOWN_TEMA,
  GET_DROPDOWN_PELATIHAN,
  ERROR_DROPDOWN_PELATIHAN,
  GET_DROPDOWN_STATUS_PEKERJAAN,
  ERROR_DROPDOWN_STATUS_PEKERJAAN,
  GET_DROPDOWN_PENDIDIKAN,
  ERROR_DROPDOWN_PENDIDIKAN,
  GET_DROPDOWN_LEVEL_PELATIHAN,
  ERROR_DROPDOWN_LEVEL_PELATIHAN,
  GET_DROPDOWN_MITRA,
  ERROR_DROPDOWN_MITRA,
  GET_DROPDOWN_ZONASI,
  ERROR_DROPDOWN_ZONASI,
  GET_DROPDOWN_PROVINSI,
  ERROR_DROPDOWN_PROVINSI,
  GET_DROPDOWN_KABUPATEN,
  ERROR_DROPDOWN_KABUPATEN,
  GET_DROPDOWN_TEMPAT_LAHIR,
  ERROR_DROPDOWN_TEMPAT_LAHIR,
  GET_DROPDOWN_KABUPATEN_DOMISILI,
  ERROR_DROPDOWN_KABUPATEN_DOMISILI,
  GET_DROPDOWN_PROVINSI_TO_DESA,
  ERROR_DROPDOWN_PROVINSI_TO_DESA,
  GET_DROPDOWN_KECAMATAN_TO_DESA,
  ERROR_DROPDOWN_KECAMATAN_TO_DESA,
  GET_DROPDOWN_PENYELENGGARA,
  ERROR_DROPDOWN_PENYELENGGARA,
  GET_DATA_PRIBADI_SUCCESS,
  GET_DATA_PRIBADI_FAIL,
  CLEAR_ERRORS,
  GET_DROPDOWN_TEMA_BY_AKADEMI,
  ERROR_DROPDOWN_TEMA_BY_AKADEMI,
  GET_DROPDOWN_PELATIHAN_BY_TEMA,
  ERROR_DROPDOWN_PELATIHAN_BY_TEMA,
  GET_DROPDOWN_FORM_BUILDER,
  ERROR_DROPDOWN_FORM_BUILDER,
} from "../../types/pelatihan/function.type";

import axios from "axios";
import { getAllAkademi } from "../beranda/beranda.actions";

export const getDataPribadi = (token) => async (dispatch) => {
  try {
    let link =
      process.env.END_POINT_API_PELATIHAN + `api/v1/auth/get-data-pribadi`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: GET_DATA_PRIBADI_SUCCESS,
      payload: data,
    });
    dispatch(getAllAkademi());
    return data;
  } catch (error) {
    dispatch({
      type: GET_DATA_PRIBADI_FAIL,
      payload: error.response.data.message,
    });
  }
};

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
    type_form: "0",
    formBuilder: [
      {
        key: 1,
        name: "",
        element: "",
        size: "",
        option: "",
        dataOption: "",
        required: "0",
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
    deskripsi_komitmen: "",
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

export const dropdownAkademi = (token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const { data } = await axios.get(
      process.env.END_POINT_API_PELATIHAN + `api/v1/akademi/dropdown`,
      config
    );
    dispatch({
      type: GET_DROPDOWN_AKADEMI,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_DROPDOWN_AKADEMI,
      payload: error.response.data.message,
    });
  }
};

export const drowpdownFormBuilder = (token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const { data } = await axios.get(
      process.env.END_POINT_API_PELATIHAN + `api/v1/formBuilder/dropdown`,
      config
    );
    dispatch({
      type: GET_DROPDOWN_FORM_BUILDER,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_DROPDOWN_FORM_BUILDER,
      payload: error.response.data.message,
    });
  }
};

export const dropdownTema = (token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const { data } = await axios.get(
      process.env.END_POINT_API_PELATIHAN + `api/v1/tema/dropdown`,
      config
    );
    dispatch({
      type: GET_DROPDOWN_TEMA,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_DROPDOWN_TEMA,
      payload: error.response.data.message,
    });
  }
};

export const dropdownTemabyAkademi = (id, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const { data } = await axios.get(
      process.env.END_POINT_API_PELATIHAN +
        `api/v1/tema/dropdown-tema-by-akademi?akademi_id=${id}`,
      config
    );

    dispatch({
      type: GET_DROPDOWN_TEMA_BY_AKADEMI,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_DROPDOWN_TEMA_BY_AKADEMI,
      payload: error.response.data.message,
    });
  }
};

export const dropdownPelatihan = (token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const { data } = await axios.get(
      process.env.END_POINT_API_PELATIHAN + `api/v1/pelatihan/dropdown`,
      config
    );
    dispatch({
      type: GET_DROPDOWN_PELATIHAN,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_DROPDOWN_PELATIHAN,
      payload: error.response.data.message,
    });
  }
};

export const dropdownPelatihanbyTema = (id, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const { data } = await axios.get(
      process.env.END_POINT_API_PELATIHAN +
        `api/v1/pelatihan/dropdown-pelatihan-tema?id=${id}`,
      config
    );
    dispatch({
      type: GET_DROPDOWN_PELATIHAN_BY_TEMA,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_DROPDOWN_PELATIHAN_BY_TEMA,
      payload: error.response.data.message,
    });
  }
};

export const dropdownAgama = (token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const { data } = await axios.get(
      process.env.END_POINT_API_SITE_MANAGEMENT + `api/option/religion`,
      config
    );
    dispatch({
      type: GET_DROPDOWN_AGAMA,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_DROPDOWN_AGAMA,
      payload: error.response.data.message,
    });
  }
};

export const dropdownStatusPekerjaan = (token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const { data } = await axios.get(
      process.env.END_POINT_API_SITE_MANAGEMENT + `api/option/job-status`,
      config
    );
    dispatch({
      type: GET_DROPDOWN_STATUS_PEKERJAAN,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_DROPDOWN_STATUS_PEKERJAAN,
      payload: error.response.data.message,
    });
  }
};

export const dropdownPendidikan = (token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const { data } = await axios.get(
      process.env.END_POINT_API_SITE_MANAGEMENT + `api/option/education`,
      config
    );
    dispatch({
      type: GET_DROPDOWN_PENDIDIKAN,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_DROPDOWN_PENDIDIKAN,
      payload: error.response.data.message,
    });
  }
};

export const dropdownLevelPelatihan = (token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const { data } = await axios.get(
      process.env.END_POINT_API_SITE_MANAGEMENT + `api/option/training-level`,
      config
    );
    dispatch({
      type: GET_DROPDOWN_LEVEL_PELATIHAN,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_DROPDOWN_LEVEL_PELATIHAN,
      payload: error.response.data.message,
    });
  }
};

export const dropdownMitra = (token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const { data } = await axios.get(
      process.env.END_POINT_API_PARTNERSHIP_MITRA + `api/option/mitra`,
      config
    );
    dispatch({
      type: GET_DROPDOWN_MITRA,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_DROPDOWN_MITRA,
      payload: error.response.data.message,
    });
  }
};

export const dropdownZonasi = (token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const { data } = await axios.get(
      process.env.END_POINT_API_SITE_MANAGEMENT + `api/zonasi/list`,
      config
    );
    dispatch({
      type: GET_DROPDOWN_ZONASI,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_DROPDOWN_ZONASI,
      payload: error.response.data.message,
    });
  }
};

export const dropdownProvinsi = (token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const { data } = await axios.get(
      process.env.END_POINT_API_SITE_MANAGEMENT + `api/option/provinsi`,
      config
    );
    dispatch({
      type: GET_DROPDOWN_PROVINSI,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_DROPDOWN_PROVINSI,
      payload: error.response.data.message,
    });
  }
};

export const dropdownKabupaten = (token, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const { data } = await axios.get(
      process.env.END_POINT_API_SITE_MANAGEMENT +
        `api/option/provinsi-choose/${id}`,
      config
    );

    dispatch({
      type: GET_DROPDOWN_KABUPATEN,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_DROPDOWN_KABUPATEN,
      payload: error.response.data.message,
    });
  }
};

export const dropdownKabupatenDomisili = (token, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const { data } = await axios.get(
      process.env.END_POINT_API_SITE_MANAGEMENT +
        `api/option/provinsi-choose/${id}`,
      config
    );
    dispatch({
      type: GET_DROPDOWN_KABUPATEN_DOMISILI,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_DROPDOWN_KABUPATEN_DOMISILI,
      payload: error.response.data.message,
    });
  }
};

export const dropdownProvinsiToDesa = (token, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const { data } = await axios.get(
      process.env.END_POINT_API_SITE_MANAGEMENT +
        `api/option/provincial-descent/${id}`,
      config
    );

    dispatch({
      type: GET_DROPDOWN_PROVINSI_TO_DESA,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_DROPDOWN_PROVINSI_TO_DESA,
      payload: error.response.data.message,
    });
  }
};

export const dropdownKecamatanToDesa = (token, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const { data } = await axios.get(
      process.env.END_POINT_API_SITE_MANAGEMENT +
        `api/option/provincial-descent/${id}`,
      config
    );

    dispatch({
      type: GET_DROPDOWN_KECAMATAN_TO_DESA,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_DROPDOWN_KECAMATAN_TO_DESA,
      payload: error.response.data.message,
    });
  }
};

export const dropdownTempatLahir = (token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const { data } = await axios.get(
      process.env.END_POINT_API_SITE_MANAGEMENT +
        `api/option/city?page=1&limit=500`,
      config
    );

    console.log(data);

    dispatch({
      type: GET_DROPDOWN_TEMPAT_LAHIR,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_DROPDOWN_TEMPAT_LAHIR,
      payload: error.response.data.message,
    });
  }
};

export const dropdownPenyelenggara = (token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const { data } = await axios.get(
      process.env.END_POINT_API_SITE_MANAGEMENT + `api/option/organizer`,
      config
    );
    dispatch({
      type: GET_DROPDOWN_PENYELENGGARA,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_DROPDOWN_PENYELENGGARA,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
