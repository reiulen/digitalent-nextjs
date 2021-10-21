import {
  LIST_PESERTA_REQUEST,
  LIST_PESERTA_SUCCESS,
  LIST_PESERTA_FAIL,
  DETAIL_LIST_PESERTA_REQUEST,
  DETAIL_LIST_PESERTA_SUCCESS,
  DETAIL_LIST_PESERTA_FAIL,
  CLEAR_ERRORS,
} from "../../types/sertifikat/list-peserta.type";

export const allPesertaReducers = (state = { participant: [] }, action) => {
  switch (action.type) {
    case LIST_PESERTA_REQUEST:
      return {
        loading: true,
      };
    case LIST_PESERTA_SUCCESS:
      return {
        loading: false,
        participant: action.payload.data,
      };
    case LIST_PESERTA_FAIL:
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

export const detailPesertaReducer = (state = { participant: {} }, action) => {
  switch (action.type) {
    case DETAIL_LIST_PESERTA_REQUEST:
      return {
        loading: true,
      };
    case DETAIL_LIST_PESERTA_SUCCESS:
      return {
        loading: false,
        participant: action.payload,
      };

    case DETAIL_LIST_PESERTA_FAIL:
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
