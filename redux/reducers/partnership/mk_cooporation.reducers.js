import {
  MK_COOPORATION_REQUEST,
  MK_COOPORATION_SUCCESS,
  MK_COOPORATION_FAIL,
  SEARCH_COORPORATION,
  LIMIT_CONFIGURATION,
  SUCCESS_GET_SINGLE_COOPORATION,
  FAIL_GET_SINGLE_COOPORATION,
  DELETE_COOPORATION_REQUEST,
  SUCCESS_DELETE_COOPORATION_REQUEST,
  ERROR_DELETE_COOPORATION_REQUEST,
  SUCCESS_CHANGE_STATUS_LIST,
  SET_PAGE,
} from "../../types/partnership/mk_cooporation.type";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  status: statuslist.idle,
  error: "",
  mk_cooporation: [],
  mk_single_cooporation: [],
  keyword: "",
  status_delete: "",
  status_list: "",
  limit: 5,
  page: 1,
};

export const allMKCooporationReducer = (state = initialState, action) => {
  switch (action.type) {
    case MK_COOPORATION_REQUEST:
      return {
        ...state,
        status: statuslist.process,
      };

    case MK_COOPORATION_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        mk_cooporation: action.data,
      };

    case MK_COOPORATION_FAIL:
      return {
        ...state,
        status: statuslist.error,
        error: data,
      };
    case SEARCH_COORPORATION:
      return {
        ...state,
        page: 1,
        keyword: action.text,
      };

    case LIMIT_CONFIGURATION:
      return {
        ...state,
        limit: action.limitValue,
        page: 1,
      };

    case SUCCESS_GET_SINGLE_COOPORATION:
      return {
        ...state,
        status: statuslist.success,
        mk_single_cooporation: action.data,
      };
    case FAIL_GET_SINGLE_COOPORATION:
      return {
        ...state,
        status: statuslist.error,
        error: data,
      };
    case ERROR_DELETE_COOPORATION_REQUEST:
      return {
        ...state,
        status: statuslist.error,
        error: data,
      };

    case SUCCESS_DELETE_COOPORATION_REQUEST:
      return {
        ...state,
        status_delete: state.status_delete === "" ? "delete" : "",
      };
    case SET_PAGE:
      console.log("sdfasf");
      console.log(action);
      return {
        ...state,
        page: action.page,
      };

    default:
      return state;
  }
};
