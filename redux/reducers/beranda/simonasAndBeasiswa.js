import {
  GET_BEASISWA_SUCCESS,
  GET_BEASISWA_FAIL,
  GET_SIMONAS_FAIL,
  GET_SIMONAS_SUCCESS,
  CLEAR_ERRORS,
} from "../../types/pelatihan/dashboard-peserta.type";

export const allBeasiswaReducer = (state = { beasiswa: [] }, action) => {
  switch (action.type) {
    case GET_BEASISWA_SUCCESS:
      return {
        loading: false,
        beasiswa: action.payload.data,
      };

    case GET_BEASISWA_FAIL:
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

export const allSimonasReducer = (state = { simonas: [] }, action) => {
  switch (action.type) {
    case GET_SIMONAS_SUCCESS:
      return {
        loading: false,
        simonas: action.payload.data,
      };

    case GET_SIMONAS_FAIL:
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
