import {
  ZONASI_REQUEST,
  ZONASI_SUCCESS,
  ZONASI_FAIL,
  DETAIL_ZONASI_REQUEST,
  DETAIL_ZONASI_SUCCESS,
  DETAIL_ZONASI_FAIL,
  DETAIL_ZONASI_RESET,
  DELETE_ZONASI_SUCCESS,
  DELETE_ZONASI_FAIL,
  DELETE_ZONASI_REQUEST,
  DELETE_ZONASI_RESET,
  POST_ZONASI_REQUEST,
  POST_ZONASI_SUCCESS,
  POST_ZONASI_FAIL,
  POST_ZONASI_RESET,
  UPDATE_ZONASI_REQUEST,
  UPDATE_ZONASI_SUCCESS,
  UPDATE_ZONASI_FAIL,
  UPDATE_ZONASI_RESET,
  LIMIT_CONFIGURATION,
  SET_PAGE,
  SEARCH_COORPORATION,
  CLEAR_ERRORS,
} from "../../types/site-management/zonasi.type";

export const allZonasiReducer = (state = { zonasi: [] }, action) => {
  switch (action.type) {
    case ZONASI_REQUEST:
      return {
        loading: true,
      };

    case ZONASI_SUCCESS:
      return {
        loading: false,
        zonasi: action.payload.data,
        page: 1,
      };

    case ZONASI_FAIL:
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

export const deleteZonasiReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ZONASI_REQUEST:
      return {
        loading: true,
      };

    case DELETE_ZONASI_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_ZONASI_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case DELETE_ZONASI_FAIL:
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

export const newZonasiReducer = (state = { zonasi: {} }, action) => {
  switch (action.type) {
    case POST_ZONASI_REQUEST:
      return {
        loading: true,
      };

    case POST_ZONASI_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        zonasi: action.payload.data,
      };

    case POST_ZONASI_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case POST_ZONASI_RESET:
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

export const detailZonasiReducer = (state = { zonasi: {} }, action) => {
  switch (action.type) {
    case DETAIL_ZONASI_REQUEST:
      return {
        loading: true,
      };

    case DETAIL_ZONASI_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        zonasi: action.payload.data,
      };

    case DETAIL_ZONASI_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case DETAIL_ZONASI_RESET:
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

export const updateZonasiReducer = (state = { zonasi: {} }, action) => {
  switch (action.type) {
    case UPDATE_ZONASI_REQUEST:
      return {
        loadingUpdate: true,
      };

    case UPDATE_ZONASI_SUCCESS:
      return {
        loadingUpdate: false,
        isUpdate: action.payload.message,
        zonasi: action.payload.data,
      };

    case UPDATE_ZONASI_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case UPDATE_ZONASI_RESET:
      return {
        isUpdate: false,
      };

    case CLEAR_ERRORS:
      return {
        error: null,
      };

    default:
      return state;
  }
};
