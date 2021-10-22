import {
  MITRA_SITE_REQUEST,
  MITRA_SITE_SUCCESS,
  MITRA_SITE_FAIL,
  GET_LIST_MITRA_SITE_REQUEST,
  GET_LIST_MITRA_SITE_SUCCESS,
  GET_LIST_MITRA_SITE_FAIL,
  GET_LIST_FIELD_REQUEST,
  GET_LIST_FIELD_SUCCESS,
  GET_LIST_FIELD_FAIL,
  DETAIL_MITRA_SITE_REQUEST,
  DETAIL_MITRA_SITE_SUCCESS,
  DETAIL_MITRA_SITE_FAIL,
  DETAIL_MITRA_SITE_RESET,
  DELETE_MITRA_SITE_SUCCESS,
  DELETE_MITRA_SITE_FAIL,
  DELETE_MITRA_SITE_REQUEST,
  DELETE_MITRA_SITE_RESET,
  POST_MITRA_SITE_REQUEST,
  POST_MITRA_SITE_SUCCESS,
  POST_MITRA_SITE_FAIL,
  POST_MITRA_SITE_RESET,
  UPDATE_MITRA_SITE_REQUEST,
  UPDATE_MITRA_SITE_SUCCESS,
  UPDATE_MITRA_SITE_FAIL,
  UPDATE_MITRA_SITE_RESET,
  LIMIT_CONFIGURATION,
  SET_PAGE,
  SEARCH_COORPORATION,
  CLEAR_ERRORS,
} from "../../../types/site-management/user/mitra-site.type";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  page: 1,
  limit: 5,
  keyword: "",
  status: statuslist.idle,
};

export const allMitraSiteReducer = (state = initialState, action) => {
  switch (action.type) {
    case MITRA_SITE_REQUEST:
      return {
        ...state,
        status: statuslist.process,
      };

    case MITRA_SITE_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        data: action.payload.data,
      };

    case MITRA_SITE_FAIL:
      return {
        ...state,
        status: statuslist.error,
        error: null,
      };

    case SEARCH_COORPORATION:
      return {
        ...state,
        keyword: action.text,
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

    default:
      return state;
  }
};

export const newMitraSiteReducer = (state = { mitaSite: {} }, action) => {
  switch (action.type) {
    case POST_MITRA_SITE_REQUEST:
      return {
        loading: true,
      };

    case POST_MITRA_SITE_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        mitaSite: action.payload.data,
      };

    case POST_MITRA_SITE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case POST_MITRA_SITE_RESET:
      return {
        success: false,
        error: false,
      };

    case CLEAR_ERRORS:
      return {
        error: null,
      };

    default:
      return state;
  }
};

export const detailMitraSiteReducer = (state = { mitaSite: {} }, action) => {
  switch (action.type) {
    case DETAIL_MITRA_SITE_REQUEST:
      return {
        loading: true,
      };

    case DETAIL_MITRA_SITE_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        mitaSite: action.payload.data,
      };

    case DETAIL_MITRA_SITE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case DETAIL_MITRA_SITE_RESET:
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

export const updateMitraSiteReducer = (state = { mitaSite: {} }, action) => {
  switch (action.type) {
    case UPDATE_MITRA_SITE_REQUEST:
      return {
        loadingUpdate: true,
      };

    case UPDATE_MITRA_SITE_SUCCESS:
      return {
        loading: false,
        isUpdate: action.payload.message,
        mitaSite: action.payload.data,
      };

    case UPDATE_MITRA_SITE_FAIL:
      return {
        loadingUpdate: false,
        errorUpdate: action.payload,
      };

    case UPDATE_MITRA_SITE_RESET:
      return {
        isUpdateSuccess: false,
      };

    case CLEAR_ERRORS:
      return {
        errorUpdate: null,
      };

    default:
      return state;
  }
};
