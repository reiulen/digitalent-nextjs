import {
  LIST_PESERTA_REQUEST,
  LIST_PESERTA_SUCCESS,
  LIST_PESERTA_FAIL,
  DETAIL_PESERTA_REQUEST,
  DETAIL_PESERTA_SUCCESS,
  DETAIL_PESERTA_FAIL,
  LIST_PELATIHAN_BY_PESERTA_REQUEST,
  LIST_PELATIHAN_BY_PESERTA_SUCCESS,
  LIST_PELATIHAN_BY_PESERTA_FAIL,
  DETAIL_PELATIHAN_PESERTA_REQUEST,
  DETAIL_PELATIHAN_PESERTA_SUCCESS,
  DETAIL_PELATIHAN_PESERTA_FAIL,
  UPDATE_DATA_PESERTA_REQUEST,
  UPDATE_DATA_PESERTA_SUCCESS,
  UPDATE_DATA_PESERTA_FAIL,
} from "../../../types/site-management/user/peserta-dts.type";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  page: 1,
  limit: 5,
  keyword: "",
  status: statuslist.idle,
  listPeserta: [],
  detailPeserta: [],
  listPelatihanByPeserta: [],
};

export const allListPesertaReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_PESERTA_REQUEST:
      return {
        ...state,
        status: statuslist.process,
      };

    case LIST_PESERTA_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        listPeserta: action.payload,
      };

    case LIST_PESERTA_FAIL:
      return {
        ...state,
        status: statuslist.error,
        error: null,
      };

    case SEARCH_COORPORATION:
      return {
        ...state,
        keyword: action.text,
        page: 1,
      };

    case SET_PAGE:
      return {
        ...state,
        page: action.page,
      };

    case LIMIT_CONFIGURATION:
      return {
        ...state,
        limit: action.limitValue,
        page: 1,
      };

    default:
      return state;
  }
};
export const allDetailPesertaReducer = (state = initialState, action) => {
  switch (action.type) {
    case DETAIL_PESERTA_REQUEST:
      return {
        ...state,
        status: statuslist.process,
      };

    case DETAIL_PESERTA_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        detailPeserta: action.payload,
      };

    case DETAIL_PESERTA_FAIL:
      return {
        ...state,
        status: statuslist.error,
        error: null,
      };

    default:
      return state;
  }
};
export const allListPelatihanByPesertaReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LIST_PELATIHAN_BY_PESERTA_REQUEST:
      return {
        ...state,
        status: statuslist.process,
      };

    case LIST_PELATIHAN_BY_PESERTA_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        listPelatihanByPeserta: action.payload,
      };

    case LIST_PELATIHAN_BY_PESERTA_FAIL:
      return {
        ...state,
        status: statuslist.error,
        error: null,
      };

    default:
      return state;
  }
};
export const allListPelatihanByPesertaReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LIST_PELATIHAN_BY_PESERTA_REQUEST:
      return {
        ...state,
        status: statuslist.process,
      };

    case LIST_PELATIHAN_BY_PESERTA_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        listPelatihanByPeserta: action.payload,
      };

    case LIST_PELATIHAN_BY_PESERTA_FAIL:
      return {
        ...state,
        status: statuslist.error,
        error: null,
      };

    default:
      return state;
  }
};
