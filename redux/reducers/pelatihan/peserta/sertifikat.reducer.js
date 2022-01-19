import {
  SERTIFIKAT_FAIL,
  SERTIFIKAT_REQUEST,
  SERTIFIKAT_SUCCESS,
} from "../../../types/pelatihan/sertifikat.type";

export const sertifikatPesertaReducer = (state = {}, action) => {
  switch (action.type) {
    case SERTIFIKAT_REQUEST:
      return {
        loading: true,
      };
    case SERTIFIKAT_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case SERTIFIKAT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
