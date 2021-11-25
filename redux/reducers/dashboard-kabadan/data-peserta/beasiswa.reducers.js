import {
  BEASISWA_KANDIDAT_REQUEST,
  BEASISWA_KANDIDAT_SUCCESS,
  BEASISWA_KANDIDAT_FAIL,
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
