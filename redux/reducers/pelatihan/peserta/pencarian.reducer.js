import {
  LIST_TRAINING_REQUEST,
  LIST_TRAINING_SUCCESS,
  LIST_TRAINING_FAIL,
  CLEAR_ERRORS,
  RESET_STATUS_FILTER,
  SET_KATEGORI_PESERTA_VALUE,
  SET_KEYWORD_VALUE,
  SET_LIMIT_VALUE,
  SET_PAGE_VALUE,
  SET_PELATIHAN_AKHIR_VALUE,
  SET_PELATIHAN_MULAI_VALUE,
  SET_PENYELENGGARA_VALUE,
} from "../../../types/pelatihan/pencarian.type";

const initialStates = {
  pelatihan: [],
  keyword: "",
  page: 1,
  limit: 5,
  penyelenggara: "",
  kategori_peserta: "",
  pelatihan_mulai: "",
  pelatihan_akhir: "",
};

export const allPencarianReducer = (state = initialStates, action) => {
  switch (action.type) {
    case LIST_TRAINING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LIST_TRAINING_SUCCESS:
      return {
        ...state,
        pelatihan: action.payload.data,
        loading: false,
      };
    case LIST_TRAINING_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case SET_KEYWORD_VALUE: {
      return {
        ...state,
        keyword: action.text,
        page: 1,
      };
    }
    case SET_PAGE_VALUE: {
      return {
        ...state,
        page: action.text,
      };
    }

    case SET_LIMIT_VALUE: {
      return {
        ...state,
        limit: action.text,
        page: 1,
      };
    }
    case SET_PENYELENGGARA_VALUE: {
      return {
        ...state,
        penyelenggara: action.text,
        page: 1,
      };
    }
    case SET_PELATIHAN_MULAI_VALUE: {
      return {
        ...state,
        pelatihan_mulai: action.text,
        page: 1,
      };
    }

    case SET_PELATIHAN_AKHIR_VALUE: {
      return {
        ...state,
        pelatihan_akhir: action.text,
        page: 1,
      };
    }
    case SET_KATEGORI_PESERTA_VALUE: {
      return {
        ...state,
        kategori_peserta: action.text,
        page: 1,
      };
    }
    case RESET_STATUS_FILTER: {
      return {
        ...state,
        keyword: "",
        page: 1,
        limit: 5,
        penyelenggara: "",
        kategori_peserta: "",
        pelatihan_mulai: "",
        pelatihan_akhir: "",
      };
    }
    default:
      return state;
  }
};
