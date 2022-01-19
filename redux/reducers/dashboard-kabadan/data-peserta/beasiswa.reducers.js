import {
  BEASISWA_KANDIDAT_REQUEST,
  BEASISWA_KANDIDAT_SUCCESS,
  BEASISWA_KANDIDAT_FAIL,
  BEASISWA_FILTER_REQUEST,
  BEASISWA_FILTER_SUCCESS,
  BEASISWA_FILTER_FAIL,
  CLEAR_ERRORS,
} from "../../../types/dashboard-kabadan/data-peserta/beasiswa.type";

export const allBeasiswaKandidatReducer = (
  state = { kandidat: [] },
  action
) => {
  switch (action.type) {
    case BEASISWA_KANDIDAT_REQUEST:
      return {
        loading: true,
      };

    case BEASISWA_KANDIDAT_SUCCESS:
      return {
        loading: false,
        kandidat: action.payload.data,
      };

    case BEASISWA_KANDIDAT_FAIL:
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

export const allBeasiswaFilterReducer = (
  state = { filterData: [] },
  action
) => {
  switch (action.type) {
    case BEASISWA_FILTER_REQUEST:
      return {
        loading: true,
      };

    case BEASISWA_FILTER_SUCCESS:
      return {
        loading: false,
        filterData: action.payload.data,
      };

    case BEASISWA_FILTER_FAIL:
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
