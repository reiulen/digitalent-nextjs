import {
  EXPORT_DATA_REQUEST,
  EXPORT_DATA_SUCCESS,
  EXPORT_DATA_FAIL,
  DETAIL_EXPORT_DATA_REQUEST,
  DETAIL_EXPORT_DATA_SUCCESS,
  DETAIL_EXPORT_DATA_FAIL,
  DETAIL_EXPORT_DATA_RESET,
  DELETE_EXPORT_DATA_SUCCESS,
  DELETE_EXPORT_DATA_FAIL,
  DELETE_EXPORT_DATA_REQUEST,
  DELETE_EXPORT_DATA_RESET,
  POST_EXPORT_DATA_REQUEST,
  POST_EXPORT_DATA_SUCCESS,
  POST_EXPORT_DATA_FAIL,
  POST_EXPORT_DATA_RESET,
  UPDATE_EXPORT_DATA_REQUEST,
  UPDATE_EXPORT_DATA_SUCCESS,
  UPDATE_EXPORT_DATA_FAIL,
  UPDATE_EXPORT_DATA_RESET,
  LIMIT_CONFIGURATION,
  SET_PAGE,
  SEARCH_COORPORATION,
  CLEAR_ERRORS,
} from "../../types/site-management/export-data.type";

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
};

export const allExportDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXPORT_DATA_REQUEST:
      return {
        ...state,
        status: statuslist.process,
      };

    case EXPORT_DATA_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        data: action.payload.data,
      };

    case EXPORT_DATA_FAIL:
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

export const detailExportDataReducer = (state = {}, action) => {
  switch (action.type) {
    case DETAIL_EXPORT_DATA_REQUEST:
      return {
        ...state,
        loading: true
      };

    case DETAIL_EXPORT_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false
      };

    case DETAIL_EXPORT_DATA_FAIL:
      return {
        ...state,
        error: null,
      };
    case CLEAR_ERRORS:
      return {
        error: null,
      };

    default:
      return state;
  }
};

export const filterExportDataReducer = (state = {loading: true}, action) => {
  switch (action.type) {
    case POST_EXPORT_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case POST_EXPORT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case POST_EXPORT_DATA_FAIL:
      return {
        ...state,
        error: null,
      };
    case CLEAR_ERRORS:
      return {
        error: null,
      };

    default:
      return state;
  }
};

export const updateExportDataReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_EXPORT_DATA_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_EXPORT_DATA_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_EXPORT_DATA_RESET:
      return {
        loading: false,
        isUpdated: false,
      };

    case UPDATE_EXPORT_DATA_FAIL:
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

export const deleteExportDataReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_EXPORT_DATA_REQUEST:
      return {
        loading: true,
      };

    case DELETE_EXPORT_DATA_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_EXPORT_DATA_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case DELETE_EXPORT_DATA_FAIL:
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
