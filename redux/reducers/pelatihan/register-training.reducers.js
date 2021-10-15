import {
  GET_FORM_BUILDER_SUCCESS,
  GET_FORM_BUILDER_FAIL,
  PENDAFTARAN_PELATIHAN_REQUEST,
  PENDAFTARAN_PELATIHAN_SUCCESS,
  PENDAFTARAN_PELATIHAN_RESET,
  PENDAFTARAN_PELATIHAN_FAIL,
  CLEAR_ERRORS,
} from "../../types/pelatihan/register-training.type";

export const getFormBuilderReducer = (state = { formBuilder: [] }, action) => {
  switch (action.type) {
    case GET_FORM_BUILDER_SUCCESS:
      return {
        formBuilder: action.payload.data,
      };

    case GET_FORM_BUILDER_FAIL:
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

export const newPendaftaranPelatihanReducer = (
  state = { pendaftaran: {} },
  action
) => {
  switch (action.type) {
    case PENDAFTARAN_PELATIHAN_REQUEST:
      return {
        loading: true,
      };

    case PENDAFTARAN_PELATIHAN_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        pendaftaran: action.payload.data,
      };

    case PENDAFTARAN_PELATIHAN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case PENDAFTARAN_PELATIHAN_RESET:
      return {
        success: false,
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
