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
  DELETE_PAGE_REQUEST,
  DELETE_PAGE_SUCCESS,
  DELETE_PAGE_FAIL,
} from "../../../types/site-management/settings/page.type";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  status: statuslist.idle,
  dataPage: [],
  page: 1,
  keyword: "",
  limit: 5,
};

export const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAGE_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        dataPage: action.payload,
      };
    case PAGE_FAIL:
      return {
        ...state,
        status: statuslist.error,
        errorPage: action.payload,
      };
    case PAGE_REQUEST:
      return {
        ...state,
        status: statuslist.process,
      };

    case POST_PAGE_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        dataSuccesPost: action.payload,
      };
    case POST_PAGE_FAIL:
      return {
        ...state,
        status: statuslist.error,
        errorPostPage: action.payload,
      };
    case POST_PAGE_REQUEST:
      return {
        ...state,
        status: statuslist.process,
      };
    case DELETE_PAGE_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        dataSuccesDelete: action.payload,
      };
    case DELETE_PAGE_FAIL:
      return {
        ...state,
        status: statuslist.error,
        errorDeletePage: action.payload,
      };
    case DELETE_PAGE_REQUEST:
      return {
        ...state,
        status: statuslist.process,
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

    case SEARCH_COORPORATION:
      return {
        ...state,
        page: 1,
        keyword: action.text,
      };

    default:
      return state;
  }
};
