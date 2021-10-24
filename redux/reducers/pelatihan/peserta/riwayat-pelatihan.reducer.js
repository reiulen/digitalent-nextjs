import {
  RIWAYAT_PELATIHAN_FAIL,
  RIWAYAT_PELATIHAN_REQUEST,
  RIWAYAT_PELATIHAN_SUCCESS,
  SET_PESERTA_VALUE,
  SET_PAGE_VALUE,
  SET_LIMIT_VALUE,
  SET_KEYWORD_VALUE,
} from "../../../types/pelatihan/riwayat-pelatihan.type";

const initialStates = {
  listPelatihan: [],
  peserta: "all",
  keyword: "",
  page: 1,
  limit: 5,
};

export const geAllRiwayatPelatihanPesertaReducer = (
  state = initialStates,
  action
) => {
  switch (action.type) {
    case RIWAYAT_PELATIHAN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RIWAYAT_PELATIHAN_SUCCESS:
      return {
        ...state,
        listPelatihan: action.payload.data,
        loading: false,
      };
    case RIWAYAT_PELATIHAN_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case SET_PESERTA_VALUE: {
      return {
        ...state,
        peserta: action.text,
        page: 1,
      };
    }
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
        keyword: action.text,
        page: 1,
      };
    }
    case SET_LIMIT_VALUE: {
      return {
        ...state,
        limit: action.text,
        page: 1,
      };
    }

    default:
      return state;
  }
};
