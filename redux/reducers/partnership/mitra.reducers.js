import {
  // MITRA
  MITRA_REQUEST,
  MITRA_SUCCESS,
  MITRA_FAIL,
  CLEAR_ERRORS,

  // NEW MITRA
  NEW_MITRA_REQUEST,
  NEW_MITRA_SUCCESS,
  NEW_MITRA_RESET,
  NEW_MITRA_FAIL,
} from "../../types/partnership/mitra.type";

export const allMitraReducer = (state = { allMitra: [] }, action) => {
  switch (action.type) {
    case MITRA_REQUEST:
      return {
        loading: true,
      };

    case MITRA_SUCCESS:
      return {
        loading: false,
        allMitra: action.payload.data,
      };

    case MITRA_FAIL:
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

export const newMitraReducer = (state = { newMitra: {} }, action) => {
  switch (action.type) {
    case NEW_MITRA_REQUEST:
      return {
        loading: true,
      };

    case NEW_MITRA_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        newMitra: action.payload.data,
      };

    case NEW_MITRA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case NEW_MITRA_RESET:
      return {
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        error: null,
      };

    default:
      return state;
  }
};
