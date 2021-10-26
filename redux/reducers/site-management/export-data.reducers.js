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
