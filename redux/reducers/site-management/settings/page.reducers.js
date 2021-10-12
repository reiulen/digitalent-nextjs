import {
  PAGE_REQUEST,
  PAGE_SUCCESS,
  PAGE_FAIL,
  SET_PAGE,
  LIMIT_CONFIGURATION,
  SEARCH_COORPORATION,
  POST_PAGE_REQUEST,
  POST_PAGE_SUCCESS,
  POST_PAGE_FAIL,
  POST_PAGE_RESET,
  DELETE_PAGE_REQUEST,
  DELETE_PAGE_SUCCESS,
  DELETE_PAGE_FAIL,
  DELETE_PAGE_RESET,
  DETAIL_PAGE_REQUEST,
  DETAIL_PAGE_SUCCESS,
  DETAIL_PAGE_FAIL,
  DETAIL_PAGE_RESET,
  UPDATE_PAGE_REQUEST,
  UPDATE_PAGE_SUCCESS,
  UPDATE_PAGE_FAIL,
  UPDATE_PAGE_RESET,
  CLEAR_ERRORS,
} from "../../../types/site-management/settings/page.type";

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

export const allPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAGE_REQUEST:
      return {
        ...state,
        status: statuslist.process,
      };

    case PAGE_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        data: action.payload.data,
      };

    case PAGE_FAIL:
      return {
        ...state,
        status: statuslist.error,
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

export const deletePageReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PAGE_REQUEST:
      return {
        loading: true,
      };

    case DELETE_PAGE_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_PAGE_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case DELETE_PAGE_FAIL:
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

export const newPageReducer = (state = { pages: {} }, action) => {
  switch (action.type) {
    case POST_PAGE_REQUEST:
      return {
        loading: true,
      };

    case POST_PAGE_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        pages: action.payload.data,
      };

    case POST_PAGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case POST_PAGE_RESET:
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

export const detailPageReducer = (state = { pages: {} }, action) => {
  switch (action.type) {
    case DETAIL_PAGE_REQUEST:
      return {
        loading: true,
      };

    case DETAIL_PAGE_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        pages: action.payload.data,
      };

    case DETAIL_PAGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case DETAIL_PAGE_RESET:
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

export const updatePageReducer = (state = { pages: {} }, action) => {
  switch (action.type) {
    case UPDATE_PAGE_REQUEST:
      return {
        loadingUpdate: true,
      };

    case UPDATE_PAGE_SUCCESS:
      return {
        loadingUpdate: false,
        isUpdateSuccess: action.payload.message,
        pagesUpdate: action.payload.data,
      };

    case UPDATE_PAGE_FAIL:
      return {
        loadingUpdate: false,
        errorUpdate: action.payload,
      };

    case UPDATE_PAGE_RESET:
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
