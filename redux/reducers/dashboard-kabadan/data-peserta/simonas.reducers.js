import {
  SIMONAS_KANDIDAT_REQUEST,
  SIMONAS_KANDIDAT_SUCCESS,
  SIMONAS_KANDIDAT_FAIL,
  CLEAR_ERRORS,
} from "../../../types/dashboard-kabadan/data-peserta/simonas.type";

export const allSimonasKandidatReducer = (state = { kandidat: [] }, action) => {
  switch (action.type) {
    case SIMONAS_KANDIDAT_REQUEST:
      return {
        loading: true,
      };

    case SIMONAS_KANDIDAT_SUCCESS:
      return {
        loading: false,
        kandidat: action.payload.data,
      };

    case SIMONAS_KANDIDAT_FAIL:
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
