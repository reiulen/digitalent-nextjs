import {
  // Tanda Tangan
  TANDA_TANGAN_REQUEST,
  TANDA_TANGAN_SUCCESS,
  TANDA_TANGAN_FAIL,

  // new tanda tangan
  NEW_TANDA_TANGAN_REQUEST,
  NEW_TANDA_TANGAN_SUCCESS,
  NEW_TANDA_TANGAN_FAIL,
  NEW_TANDA_TANGAN_RESET,

  // hapus tanda tangan
  DELETE_TANDA_TANGAN_REQUEST,
  DELETE_TANDA_TANGAN_SUCCESS,
  DELETE_TANDA_TANGAN_FAIL,
  DELETE_TANDA_TANGAN_RESET,

  // update tanda tangan
  UPDATE_TANDA_TANGAN_REQUEST,
  UPDATE_TANDA_TANGAN_SUCCESS,
  UPDATE_TANDA_TANGAN_FAIL,
  UPDATE_TANDA_TANGAN_RESET,

  // clear errors
  CLEAR_ERRORS,
} from "../../types/partnership/tandaTangan.type";

export const allTandaTanganReducer = (state = { tandaTangan: [] }, action) => {
  switch (action.type) {
    case TANDA_TANGAN_REQUEST:
      return {
        loading: true,
      };

    case TANDA_TANGAN_SUCCESS:
      return {
        loading: false,
        tandaTangan: action.payload.data,
      };

    case TANDA_TANGAN_FAIL:
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

export const newTandaTanganReducer = (
  state = { newTandaTangan: {} },
  action
) => {
  switch (action.type) {
    case NEW_TANDA_TANGAN_REQUEST:
      return {
        loading: true,
      };

    case NEW_TANDA_TANGAN_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        newTandaTangan: action.payload.data,
      };

    case NEW_TANDA_TANGAN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case NEW_TANDA_TANGAN_RESET:
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

export const deleteTandaTanganReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TANDA_TANGAN_REQUEST:
      return {
        loading: true,
      };

    case DELETE_TANDA_TANGAN_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_TANDA_TANGAN_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case DELETE_TANDA_TANGAN_FAIL:
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

export const updateTandaTanganReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TANDA_TANGAN_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_TANDA_TANGAN_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_TANDA_TANGAN_RESET:
      return {
        loading: false,
        isUpdated: false,
      };

    case UPDATE_TANDA_TANGAN_FAIL:
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
