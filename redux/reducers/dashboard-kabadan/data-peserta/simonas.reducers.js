import {
  SIMONAS_KANDIDAT_REQUEST,
  SIMONAS_KANDIDAT_SUCCESS,
  SIMONAS_KANDIDAT_FAIL,
  SIMONAS_FILTER_COMPANY_REQUEST,
  SIMONAS_FILTER_COMPANY_SUCCESS,
  SIMONAS_FILTER_COMPANY_FAIL,
  SIMONAS_FILTER_STATUS_REQUEST,
  SIMONAS_FILTER_STATUS_SUCCESS,
  SIMONAS_FILTER_STATUS_FAIL,
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

export const allSimonasFilterCompanyReducer = (
  state = { company: [] },
  action
) => {
  switch (action.type) {
    case SIMONAS_FILTER_COMPANY_REQUEST:
      return {
        loading: true,
      };

    case SIMONAS_FILTER_COMPANY_SUCCESS:
      return {
        loading: false,
        company: action.payload.data,
      };

    case SIMONAS_FILTER_COMPANY_FAIL:
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

export const allSimonasFilterStatusReducer = (
  state = { status: [] },
  action
) => {
  switch (action.type) {
    case SIMONAS_FILTER_STATUS_REQUEST:
      return {
        loading: true,
      };

    case SIMONAS_FILTER_STATUS_SUCCESS:
      return {
        loading: false,
        status: action.payload.data,
      };

    case SIMONAS_FILTER_STATUS_FAIL:
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
