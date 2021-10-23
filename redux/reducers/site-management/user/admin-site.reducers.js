import {
  ADMIN_SITE_REQUEST,
  ADMIN_SITE_SUCCESS,
  ADMIN_SITE_FAIL,
  GET_LIST_ADMIN_SITE_REQUEST,
  GET_LIST_ADMIN_SITE_SUCCESS,
  GET_LIST_ADMIN_SITE_FAIL,
  DETAIL_ADMIN_SITE_REQUEST,
  DETAIL_ADMIN_SITE_SUCCESS,
  DETAIL_ADMIN_SITE_FAIL,
  DETAIL_ADMIN_SITE_RESET,
  DELETE_ADMIN_SITE_SUCCESS,
  DELETE_ADMIN_SITE_FAIL,
  DELETE_ADMIN_SITE_RESET,
  DELETE_ADMIN_SITE_REQUEST,
  POST_ADMIN_SITE_REQUEST,
  POST_ADMIN_SITE_SUCCESS,
  POST_ADMIN_SITE_FAIL,
  POST_ADMIN_SITE_RESET,
  UPDATE_ADMIN_SITE_REQUEST,
  UPDATE_ADMIN_SITE_SUCCESS,
  UPDATE_ADMIN_SITE_FAIL,
  UPDATE_ADMIN_SITE_RESET,
  LIMIT_CONFIGURATION,
  SET_PAGE,
  SEARCH_COORPORATION,
  CLEAR_ERRORS,
} from "../../../types/site-management/user/admin-site.type";

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

export const allAdminSiteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_SITE_REQUEST:
      return {
        ...state,
        status: statuslist.process,
      };

    case ADMIN_SITE_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        data: action.payload.data,
      };

    case ADMIN_SITE_FAIL:
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

    default:
      return state;
  }
};

export const deleteAdminSiteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ADMIN_SITE_REQUEST:
      return {
        loading: true,
      };

    case DELETE_ADMIN_SITE_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_ADMIN_SITE_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case DELETE_ADMIN_SITE_FAIL:
      return {
        loading: false,
        error: null,
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

export const newAdminSiteReducer = (state = { adminSite: {} }, action) => {
  switch (action.type) {
    case POST_ADMIN_SITE_REQUEST:
      return {
        loading: true,
      };

    case POST_ADMIN_SITE_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        adminSite: action.payload.data,
      };

    case POST_ADMIN_SITE_FAIL:
      return {
        loading: false,
        error: null,
      };

    case POST_ADMIN_SITE_RESET:
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

export const detailAdminSiteReducer = (state = { adminSite: {} }, action) => {
  switch (action.type) {
    case DETAIL_ADMIN_SITE_REQUEST:
      return {
        loading: true,
      };

    case DETAIL_ADMIN_SITE_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        adminSite: action.payload.data,
      };

    case DETAIL_ADMIN_SITE_FAIL:
      return {
        loading: false,
        error: null,
      };

    case DETAIL_ADMIN_SITE_RESET:
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

export const updateAdminSiteReducer = (state = { adminSite: {} }, action) => {
  switch (action.type) {
    case UPDATE_ADMIN_SITE_REQUEST:
      return {
        loadingUpdate: true,
      };

    case UPDATE_ADMIN_SITE_SUCCESS:
      return {
        loadingUpdate: false,
        isUpdateSuccess: action.payload.message,
        adminSite: action.payload.data,
      };

    case UPDATE_ADMIN_SITE_FAIL:
      return {
        loadingUpdate: false,
        error: null,
      };

    case UPDATE_ADMIN_SITE_RESET:
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
