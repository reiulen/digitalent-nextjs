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

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  page: 1,
  limit: 5,
  cari: "",
  status: statuslist.idle,
};

export const allZonasiReducer = (state = initialState, action) => {
  switch (action.type) {
    case ZONASI_REQUEST:
      return {
        ...state,
        status: statuslist.process,
      };

    case ZONASI_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        data: action.payload.data,
      };

    case ZONASI_FAIL:
      return {
        ...state,
        status: statuslist.error,
        error: null,
      };

    case SEARCH_COORPORATION:
      return {
        ...state,
        cari: action.text,
        page: 1,
      };

    case SET_PAGE:
      return {
        ...state,
        page: action.page,
      };

    case LIMIT_CONFIGURATION:
      return {
        ...state,
        limit: action.limitValue,
        page: 1,
      };

    case CLEAR_ERRORS:
      return {
        error: null,
      };

    default:
      return state;
  }
};

// delete gak ada
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

export const detailZonasiReducer = (state = initialState, action) => {
  switch (action.type) {
    case DETAIL_ZONASI_REQUEST:
      return {
        ...state,
        status: statuslist.process,
      };

    case DETAIL_ZONASI_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        data: action.payload,
      };

    case DETAIL_ZONASI_FAIL:
      return {
        ...state,
        status: statuslist.error,
        error: null,
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
