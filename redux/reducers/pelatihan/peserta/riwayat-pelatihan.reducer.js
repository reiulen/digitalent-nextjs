import {
  RIWAYAT_PELATIHAN_FAIL,
  RIWAYAT_PELATIHAN_REQUEST,
  RIWAYAT_PELATIHAN_SUCCESS,
  SET_PESERTA_VALUE,
  SET_PAGE_VALUE,
  SET_LIMIT_VALUE,
  SET_KEYWORD_VALUE,
  RIWAYAT_PELATIHAN_DETAIL_SUCCESS,
  RIWAYAT_PELATIHAN_DETAIL_REQUEST,
  RIWAYAT_PELATIHAN_DETAIL_FAIL,
  SET_PELATIHAN_SELESAI_VALUE,
  SET_PELATIHAN_BERJALAN_VALUE,
  RESET_FILTER,
} from "../../../types/pelatihan/riwayat-pelatihan.type";

const initialStates = {
  listPelatihan: [],
  peserta: "all",
  keyword: "",
  page: 1,
  limit: 5,
  sedang_berjalan: "0",
  selesai: "0",
};

export const getAllRiwayatPelatihanPesertaReducer = (
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
    case SET_PELATIHAN_BERJALAN_VALUE: {
      return {
        ...state,
        sedang_berjalan: action.text,
        selesai: "0",
      };
    }
    case SET_PELATIHAN_SELESAI_VALUE: {
      return {
        ...state,
        selesai: action.text,
        sedang_berjalan: "0",
      };
    }
    case RESET_FILTER: {
      return {
        ...state,
        peserta: "all",
        keyword: "",
        page: 1,
        sedang_berjalan: "0",
        selesai: "0",
      };
    }
    case SET_PAGE_VALUE: {
      return {
        ...state,
        page: action.text,
      };
    }
    default:
      return state;
  }
};

export const getDetailRiwayatPelatihanReducer = (state = {}, action) => {
  switch (action.type) {
    case RIWAYAT_PELATIHAN_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RIWAYAT_PELATIHAN_DETAIL_SUCCESS:
      return {
        ...state,
        state: action.payload.data,
        loading: false,
      };
    case RIWAYAT_PELATIHAN_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
