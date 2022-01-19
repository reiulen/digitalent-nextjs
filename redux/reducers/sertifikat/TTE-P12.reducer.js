import {
  TTE_P12_FAIL,
  TTE_P12_REQUEST,
  TTE_P12_SUCCESS,
  NEW_TTE_P12_FAIL,
  NEW_TTE_P12_REQUEST,
  NEW_TTE_P12_SUCCESS,
  SIGN_PDF_FAIL,
  SIGN_PDF_REQUEST,
  SIGN_PDF_SUCCESS,
} from "../../types/sertifikat/TTE-P12.type";

export const TTEP12DataReducer = (state = { ttep12: {} }, action) => {
  switch (action.type) {
    case TTE_P12_REQUEST:
      return {
        loading: true,
      };

    case TTE_P12_SUCCESS:
      return {
        loading: false,
        ttep12: action.payload,
      };

    case TTE_P12_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
