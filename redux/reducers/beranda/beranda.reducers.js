import {
  BERANDA_PENYELENGGARA_REQUEST,
  BERANDA_PENYELENGGARA_SUCCESS,
  BERANDA_PENYELENGGARA_FAIL,
  BERANDA_AKADEMI_REQUEST,
  BERANDA_AKADEMI_SUCCESS,
  BERANDA_AKADEMI_FAIL,
  BERANDA_NOTIF_TEMA_REQUEST,
  BERANDA_NOTIF_TEMA_SUCCESS,
  BERANDA_NOTIF_TEMA_RESET,
  BERANDA_NOTIF_TEMA_FAIL,
  CLEAR_ERRORS_NOTIF,
  BERANDA_TEMA_REQUEST,
  BERANDA_TEMA_SUCCESS,
  BERANDA_TEMA_FAIL,
  BERANDA_KOTA_REQUEST,
  BERANDA_KOTA_SUCCESS,
  BERANDA_KOTA_FAIL,
  BERANDA_PELATIHAN_REQUEST,
  BERANDA_PELATIHAN_SUCCESS,
  BERANDA_PELATIHAN_FAIL,
  BERANDA_PUBLIKASI_REQUEST,
  BERANDA_PUBLIKASI_SUCCESS,
  BERANDA_PUBLIKASI_FAIL,
  CLEAR_ERRORS,
} from "../../types/beranda/beranda.type";

export const addNotifTemaReducer = (state = { notifikasiTema: {} }, action) => {
  switch (action.type) {
    case BERANDA_NOTIF_TEMA_REQUEST:
      return {
        loading: true,
      };

    case BERANDA_NOTIF_TEMA_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        notifikasiTema: action.payload.data,
      };

    case BERANDA_NOTIF_TEMA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case BERANDA_NOTIF_TEMA_RESET:
      return {
        success: false,
      };

    case CLEAR_ERRORS_NOTIF:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const allPenyelenggaraPesertaReducer = (
  state = { penyelenggara: [] },
  action
) => {
  switch (action.type) {
    case BERANDA_PENYELENGGARA_REQUEST:
      return {
        loading: true,
      };

    case BERANDA_PENYELENGGARA_SUCCESS:
      return {
        loading: false,
        penyelenggara: action.payload,
      };

    case BERANDA_PENYELENGGARA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        error: null,
      };

    default:
      return state;
  }
};

export const allAkademiReducer = (state = { akademi: [] }, action) => {
  switch (action.type) {
    case BERANDA_AKADEMI_REQUEST:
      return {
        loading: true,
      };

    case BERANDA_AKADEMI_SUCCESS:
      return {
        loading: false,
        akademi: action.payload.data,
      };

    case BERANDA_AKADEMI_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        error: null,
      };

    default:
      return state;
  }
};

export const allKotaPesertaReducer = (state = { kota: [] }, action) => {
  switch (action.type) {
    case BERANDA_KOTA_REQUEST:
      return {
        loading: true,
      };

    case BERANDA_KOTA_SUCCESS:
      return {
        loading: false,
        kota: action.payload.data,
      };

    case BERANDA_KOTA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        error: null,
      };

    default:
      return state;
  }
};

export const temaByAkademiReducer = (state = { tema: [] }, action) => {
  switch (action.type) {
    case BERANDA_TEMA_REQUEST:
      return {
        loading: true,
      };

    case BERANDA_TEMA_SUCCESS:
      return {
        loading: false,
        tema: action.payload.data,
      };

    case BERANDA_TEMA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        error: null,
      };

    default:
      return state;
  }
};

export const pelatihanByTemaReducer = (state = { pelatihan: [] }, action) => {
  switch (action.type) {
    case BERANDA_PELATIHAN_REQUEST:
      return {
        loading: true,
      };

    case BERANDA_PELATIHAN_SUCCESS:
      return {
        loading: false,
        pelatihan: action.payload.data,
      };

    case BERANDA_PELATIHAN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        error: null,
      };

    default:
      return state;
  }
};

export const allPublikasiBerandaReducer = (
  state = { publikasi: {} },
  action
) => {
  switch (action.type) {
    case BERANDA_PUBLIKASI_REQUEST:
      return {
        loading: true,
      };

    case BERANDA_PUBLIKASI_SUCCESS:
      return {
        loading: false,
        publikasi: action.payload.data,
      };

    case BERANDA_PUBLIKASI_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        error: null,
      };

    default:
      return state;
  }
};
