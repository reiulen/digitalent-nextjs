import {
  // MITRA
  MITRA_REQUEST,
  MITRA_SUCCESS,
  MITRA_FAIL,

  // NEW MITRA
  NEW_MITRA_REQUEST,
  NEW_MITRA_SUCCESS,
  NEW_MITRA_RESET,
  NEW_MITRA_FAIL,

  // detail
  DETAIL_MITRA_REQUEST,
  DETAIL_MITRA_SUCCESS,
  DETAIL_MITRA_FAIL,

  // update
  UPDATE_MITRA_REQUEST,
  UPDATE_MITRA_SUCCESS,
  UPDATE_MITRA_FAIL,
  UPDATE_MITRA_RESET,

  // delete
  DELETE_MITRA_REQUEST,
  DELETE_MITRA_SUCCESS,
  DELETE_MITRA_FAIL,
  DELETE_MITRA_RESET,

  // card dashboard type
  CARD_TOTAL_MITRA_REQUEST,
  CARD_TOTAL_MITRA_SUCCESS,
  CARD_TOTAL_MITRA_FAIL,
  CARD_ACTIVE_MITRA_REQUEST,
  CARD_ACTIVE_MITRA_SUCCESS,
  CARD_ACTIVE_MITRA_FAIL,

  // ---
  CLEAR_ERRORS,
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

export const detailMitraReducer = (state = { detailMitraRes: {} }, action) => {
  switch (action.type) {
    case DETAIL_MITRA_SUCCESS:
      return {
        detailMitraRes: action.payload,
      };

    case DETAIL_MITRA_FAIL:
      return {
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

export const updateMitraReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_MITRA_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_MITRA_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_MITRA_RESET:
      return {
        loading: false,
        isUpdated: false,
      };

    case UPDATE_MITRA_FAIL:
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

export const deleteMitraReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_MITRA_REQUEST:
      return {
        loading: true,
      };

    case DELETE_MITRA_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_MITRA_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case DELETE_MITRA_FAIL:
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

// card dashboard type
export const totalMitraCardReducer = (
  state = { totalMitraCardRes: [] },
  action
) => {
  switch (action.type) {
    case CARD_TOTAL_MITRA_REQUEST:
      return {
        loading: true,
      };

    case CARD_TOTAL_MITRA_SUCCESS:
      return {
        loading: false,
        totalMitraCardRes: action.payload.data,
      };

    case CARD_TOTAL_MITRA_FAIL:
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

export const totalActiveMitraCardReducer = (
  state = { activeMitraCardRes: [] },
  action
) => {
  switch (action.type) {
    case CARD_ACTIVE_MITRA_REQUEST:
      return {
        loading: true,
      };

    case CARD_ACTIVE_MITRA_SUCCESS:
      return {
        loading: false,
        activeMitraCardRes: action.payload.data,
      };

    case CARD_ACTIVE_MITRA_FAIL:
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
