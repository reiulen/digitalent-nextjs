import {
  SUMMARY_REQUEST,
  SUMMARY_SUCCESS,
  SUMMARY_FAIL,
  GET_AKADEMI_BY_PELATIHAN_SUCCESS,
  GET_AKADEMI_BY_PELATIHAN_FAIL,
  GET_REKAP_PENDAFTARAN_PESERTA_REQUEST,
  GET_REKAP_PENDAFTARAN_PESERTA_SUCCESS,
  GET_REKAP_PENDAFTARAN_PESERTA_FAIL,
  GET_STATUS_PENDAFTAR_SUCCESS,
  GET_STATUS_PENDAFTAR_FAIL,
  GET_REMINDER_BERKAS_SUCCESS,
  GET_REMINDER_BERKAS_FAIL,
  GET_DATA_PRIBADI_SUCCESS,
  GET_DATA_PRIBADI_FAIL,
  GET_RIWAYAT_PELATIHAN_SUCCESS,
  GET_RIWAYAT_PELATIHAN_FAIL,
  GET_BERKAS_PENDAFTARAN_SUCCESS,
  GET_BERKAS_PENDAFTARAN_FAIL,
  GET_FORM_KOMITMEN_SUCCESS,
  GET_FORM_KOMITMEN_FAIL,
  GET_FORM_LPJ_SUCCESS,
  GET_FORM_LPJ_FAIL,
  NEW_LPJ_REQUEST,
  NEW_LPJ_SUCCESS,
  NEW_LPJ_FAIL,
  NEW_LPJ_RESET,
  UPDATE_STATUS_REQUEST,
  UPDATE_STATUS_SUCCESS,
  UPDATE_STATUS_FAIL,
  UPDATE_REMINDER_SUCCESS,
  UPDATE_REMINDER_FAIL,
  CLEAR_ERRORS,
} from "../../types/pelatihan/summary.type";

import axios from "axios";

//ALL SUMMARY
export const getAllSummary =
  (
    page = 1,
    keyword = "",
    limit = 5,
    pendaftaran_mulai,
    pelatihan_mulai,
    status_substansi,
    status_pelatihan,
    penyelenggara,
    akademi,
    tema,
    token
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: SUMMARY_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN +
        `api/v1/pelatihan/find-revisi?page=${page}`;
      if (keyword) link = link.concat(`&cari=${keyword}`);
      if (limit) link = link.concat(`&limit=${limit}`);
      if (pendaftaran_mulai)
        link = link.concat(`&pendaftaran_mulai=${pendaftaran_mulai}`);
      if (pelatihan_mulai)
        link = link.concat(`&pelatihan_mulai=${pelatihan_mulai}`);
      if (status_substansi)
        link = link.concat(`&status_substansi=${status_substansi}`);
      if (status_pelatihan)
        link = link.concat(`&status_pelatihan=${status_pelatihan}`);
      if (penyelenggara) link = link.concat(`&penyelenggara=${penyelenggara}`);
      if (akademi) link = link.concat(`&akademi=${akademi}`);
      if (tema) link = link.concat(`&tema=${tema}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: SUMMARY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SUMMARY_FAIL,
        payload: error.response.data.message,
      });
    }
  };
//END ALL SUMMARY

export const getAkademiByPelatihan = (token, id) => async (dispatch) => {
  try {
    let link =
      process.env.END_POINT_API_PELATIHAN +
      `api/v1/akademi/akademi-by-pelatihan?pelatian_id=${id}`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: GET_AKADEMI_BY_PELATIHAN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_AKADEMI_BY_PELATIHAN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getPendaftaranPeserta =
  (
    token,
    pelatihanId,
    keyword = "",
    limit = 5,
    page = 1,
    administrasi = "",
    pelatihan = "",
    subtansi = ""
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_REKAP_PENDAFTARAN_PESERTA_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN +
        `api/v1/formPendaftaran/list-detail-rekap-pendaftaran?pelatian_id=${pelatihanId}`;
      if (keyword) link = link.concat(`&cari=${keyword}`);
      if (limit) link = link.concat(`&limit=${limit}`);
      if (page) link = link.concat(`&page=${page}`);
      if (administrasi) link = link.concat(`&administrasi=${administrasi}`);
      if (pelatihan) link = link.concat(`&pelatihan=${pelatihan}`);
      if (subtansi) link = link.concat(`&subtansi=${subtansi}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: GET_REKAP_PENDAFTARAN_PESERTA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_REKAP_PENDAFTARAN_PESERTA_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getStatusPendaftar = (token, id) => async (dispatch) => {
  try {
    let link =
      process.env.END_POINT_API_PELATIHAN +
      `api/v1/formPendaftaran/jumlah-pendaftar?pelatian_id=${id}`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: GET_STATUS_PENDAFTAR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_STATUS_PENDAFTAR_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getReminderBerkas = (token, index) => async (dispatch) => {
  try {
    let link =
      process.env.END_POINT_API_PELATIHAN +
      `api/v1/formPendaftaran/get-reminder?id=${index}`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: GET_REMINDER_BERKAS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_REMINDER_BERKAS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getDataPribadi = (token, index) => async (dispatch) => {
  try {
    let link =
      process.env.END_POINT_API_PELATIHAN +
      `api/v1/formPendaftaran/get-data-pribadi?id=${index}`;

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
  } catch (error) {
    dispatch({
      type: GET_DATA_PRIBADI_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getRiwayatPelatihan = (token, index) => async (dispatch) => {
  try {
    let link =
      process.env.END_POINT_API_PELATIHAN +
      `api/v1/formPendaftaran/list-pelatihan-user?id=${index}`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: GET_RIWAYAT_PELATIHAN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_RIWAYAT_PELATIHAN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getBerkasPendaftaran = (token, index) => async (dispatch) => {
  try {
    let link =
      process.env.END_POINT_API_PELATIHAN +
      `api/v1/formPendaftaran/list-form-Pendaftran?id=${index}`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: GET_BERKAS_PENDAFTARAN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_BERKAS_PENDAFTARAN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getFormKomitmen = (token, index) => async (dispatch) => {
  try {
    let link =
      process.env.END_POINT_API_PELATIHAN +
      `api/v1/formPendaftaran/data-form-komitmen?id=${index}`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: GET_FORM_KOMITMEN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_FORM_KOMITMEN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// LPJ
export const newLPJ = (setData, token) => async (dispatch) => {
  try {
    dispatch({ type: NEW_LPJ_REQUEST });
    let link =
      process.env.END_POINT_API_PELATIHAN + "api/v1/formPendaftaran/create-lpj";

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.post(link, setData, config);

    if (data) {
      dispatch({ type: NEW_LPJ_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: NEW_LPJ_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getFormLpj = (token, index) => async (dispatch) => {
  try {
    let link =
      process.env.END_POINT_API_PELATIHAN +
      `api/v1/formPendaftaran/list-form-lpj?id=${index}`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: GET_FORM_LPJ_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_FORM_LPJ_FAIL,
      payload: error.response.data.message,
    });
  }
};
// END LPJ

export const updateStatusPeserta = (statusData, token) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_STATUS_REQUEST,
    });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.post(
      process.env.END_POINT_API_PELATIHAN +
        "api/v1/formPendaftaran/update-status",
      statusData,
      config
    );

    dispatch({
      type: UPDATE_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_STATUS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateReminder = (reminderData, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.post(
      process.env.END_POINT_API_PELATIHAN +
        "api/v1/formPendaftaran/update-reminder",
      reminderData,
      config
    );

    dispatch({
      type: UPDATE_REMINDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_REMINDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
