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
  CLEAR_ERRORS,
} from "../../../types/pelatihan/summary.type";

export const allSummaryReducer = (state = { summary: [] }, action) => {
  switch (action.type) {
    case SUMMARY_REQUEST:
      return {
        loading: true,
      };

    case SUMMARY_SUCCESS:
      return {
        loading: false,
        summary: action.payload.data,
      };

    case SUMMARY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getAkademiByPelatihanReducer = (state = { data: {} }, action) => {
  switch (action.type) {
    case GET_AKADEMI_BY_PELATIHAN_SUCCESS:
      return {
        data: action.payload.data,
      };

    case GET_AKADEMI_BY_PELATIHAN_FAIL:
      return {
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getPendaftaranPesertaReducer = (
  state = { peserta: [] },
  action
) => {
  switch (action.type) {
    case GET_REKAP_PENDAFTARAN_PESERTA_REQUEST:
      return {
        loading: true,
      };

    case GET_REKAP_PENDAFTARAN_PESERTA_SUCCESS:
      return {
        loading: false,
        peserta: action.payload.data,
      };

    case GET_REKAP_PENDAFTARAN_PESERTA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getStatusPendaftarReducer = (
  state = { statusPendaftar: [] },
  action
) => {
  switch (action.type) {
    case GET_STATUS_PENDAFTAR_SUCCESS:
      return {
        statusPendaftar: action.payload.data,
      };

    case GET_STATUS_PENDAFTAR_FAIL:
      return {
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getReminderBerkasReducer = (state = { reminder: [] }, action) => {
  switch (action.type) {
    case GET_REMINDER_BERKAS_SUCCESS:
      return {
        reminder: action.payload.data,
      };

    case GET_REMINDER_BERKAS_FAIL:
      return {
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getDataPribadiRowReducer = (
  state = { dataPeserta: [] },
  action
) => {
  switch (action.type) {
    case GET_DATA_PRIBADI_SUCCESS:
      return {
        dataPeserta: action.payload.data,
      };

    case GET_DATA_PRIBADI_FAIL:
      return {
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getRiwayatPelatihanReducer = (state = { riwayat: [] }, action) => {
  switch (action.type) {
    case GET_RIWAYAT_PELATIHAN_SUCCESS:
      return {
        riwayat: action.payload.data,
      };

    case GET_RIWAYAT_PELATIHAN_FAIL:
      return {
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getBerkasPendaftaranReducer = (state = { berkas: [] }, action) => {
  switch (action.type) {
    case GET_BERKAS_PENDAFTARAN_SUCCESS:
      return {
        berkas: action.payload.data,
      };

    case GET_BERKAS_PENDAFTARAN_FAIL:
      return {
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getFormKomitmenReducer = (
  state = { formKomitmen: [] },
  action
) => {
  switch (action.type) {
    case GET_FORM_KOMITMEN_SUCCESS:
      return {
        formKomitmen: action.payload.data,
      };

    case GET_FORM_KOMITMEN_FAIL:
      return {
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getFormLpjReducer = (state = { formLpj: [] }, action) => {
  switch (action.type) {
    case GET_FORM_LPJ_SUCCESS:
      return {
        formLpj: action.payload.data,
      };

    case GET_FORM_LPJ_FAIL:
      return {
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
